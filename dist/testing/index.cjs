/**
 * @license
 * @builder.io/qwik/testing 1.15.0-dev+1cd73f1
 * Copyright Builder.io, Inc. All Rights Reserved.
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/QwikDev/qwik/blob/main/LICENSE
 */
"use strict";
var __create = Object.create;
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __getProtoOf = Object.getPrototypeOf;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __commonJS = (cb, mod) => function __require() {
  return mod || (0, cb[__getOwnPropNames(cb)[0]])((mod = { exports: {} }).exports, mod), mod.exports;
};
var __export = (target, all) => {
  for (var name in all)
    __defProp(target, name, { get: all[name], enumerable: true });
};
var __copyProps = (to, from, except, desc) => {
  if (from && typeof from === "object" || typeof from === "function") {
    for (let key of __getOwnPropNames(from))
      if (!__hasOwnProp.call(to, key) && key !== except)
        __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
  }
  return to;
};
var __toESM = (mod, isNodeMode, target) => (target = mod != null ? __create(__getProtoOf(mod)) : {}, __copyProps(
  // If the importer is in node compatibility mode or this is not an ESM
  // file that has been converted to a CommonJS file using a Babel-
  // compatible transform (i.e. "__esModule" has not been set), then set
  // "default" to the CommonJS "module.exports" for node compatibility.
  isNodeMode || !mod || !mod.__esModule ? __defProp(target, "default", { value: mod, enumerable: true }) : target,
  mod
));
var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);

// packages/qwik-dom/lib/Event.js
var require_Event = __commonJS({
  "packages/qwik-dom/lib/Event.js"(exports2, module2) {
    "use strict";
    module2.exports = Event;
    Event.CAPTURING_PHASE = 1;
    Event.AT_TARGET = 2;
    Event.BUBBLING_PHASE = 3;
    function Event(type, dictionary) {
      this.type = "";
      this.target = null;
      this.currentTarget = null;
      this.eventPhase = Event.AT_TARGET;
      this.bubbles = false;
      this.cancelable = false;
      this.isTrusted = false;
      this.defaultPrevented = false;
      this.timeStamp = Date.now();
      this._propagationStopped = false;
      this._immediatePropagationStopped = false;
      this._initialized = true;
      this._dispatching = false;
      if (type) this.type = type;
      if (dictionary) {
        for (var p in dictionary) {
          this[p] = dictionary[p];
        }
      }
    }
    Event.prototype = Object.create(Object.prototype, {
      constructor: { value: Event },
      stopPropagation: {
        value: function stopPropagation() {
          this._propagationStopped = true;
        }
      },
      stopImmediatePropagation: {
        value: function stopImmediatePropagation() {
          this._propagationStopped = true;
          this._immediatePropagationStopped = true;
        }
      },
      preventDefault: {
        value: function preventDefault() {
          if (this.cancelable) this.defaultPrevented = true;
        }
      },
      initEvent: {
        value: function initEvent(type, bubbles, cancelable) {
          this._initialized = true;
          if (this._dispatching) return;
          this._propagationStopped = false;
          this._immediatePropagationStopped = false;
          this.defaultPrevented = false;
          this.isTrusted = false;
          this.target = null;
          this.type = type;
          this.bubbles = bubbles;
          this.cancelable = cancelable;
        }
      }
    });
  }
});

// packages/qwik-dom/lib/UIEvent.js
var require_UIEvent = __commonJS({
  "packages/qwik-dom/lib/UIEvent.js"(exports2, module2) {
    "use strict";
    var Event = require_Event();
    module2.exports = UIEvent;
    function UIEvent() {
      Event.call(this);
      this.view = null;
      this.detail = 0;
    }
    UIEvent.prototype = Object.create(Event.prototype, {
      constructor: { value: UIEvent },
      initUIEvent: {
        value: function(type, bubbles, cancelable, view, detail) {
          this.initEvent(type, bubbles, cancelable);
          this.view = view;
          this.detail = detail;
        }
      }
    });
  }
});

// packages/qwik-dom/lib/MouseEvent.js
var require_MouseEvent = __commonJS({
  "packages/qwik-dom/lib/MouseEvent.js"(exports2, module2) {
    "use strict";
    var UIEvent = require_UIEvent();
    module2.exports = MouseEvent;
    function MouseEvent() {
      UIEvent.call(this);
      this.screenX = this.screenY = this.clientX = this.clientY = 0;
      this.ctrlKey = this.altKey = this.shiftKey = this.metaKey = false;
      this.button = 0;
      this.buttons = 1;
      this.relatedTarget = null;
    }
    MouseEvent.prototype = Object.create(UIEvent.prototype, {
      constructor: { value: MouseEvent },
      initMouseEvent: {
        value: function(type, bubbles, cancelable, view, detail, screenX, screenY, clientX, clientY, ctrlKey, altKey, shiftKey, metaKey, button, relatedTarget) {
          this.initEvent(type, bubbles, cancelable, view, detail);
          this.screenX = screenX;
          this.screenY = screenY;
          this.clientX = clientX;
          this.clientY = clientY;
          this.ctrlKey = ctrlKey;
          this.altKey = altKey;
          this.shiftKey = shiftKey;
          this.metaKey = metaKey;
          this.button = button;
          switch (button) {
            case 0:
              this.buttons = 1;
              break;
            case 1:
              this.buttons = 4;
              break;
            case 2:
              this.buttons = 2;
              break;
            default:
              this.buttons = 0;
              break;
          }
          this.relatedTarget = relatedTarget;
        }
      },
      getModifierState: {
        value: function(key) {
          switch (key) {
            case "Alt":
              return this.altKey;
            case "Control":
              return this.ctrlKey;
            case "Shift":
              return this.shiftKey;
            case "Meta":
              return this.metaKey;
            default:
              return false;
          }
        }
      }
    });
  }
});

// packages/qwik-dom/lib/DOMException.js
var require_DOMException = __commonJS({
  "packages/qwik-dom/lib/DOMException.js"(exports2, module2) {
    "use strict";
    module2.exports = DOMException;
    var INDEX_SIZE_ERR = 1;
    var HIERARCHY_REQUEST_ERR = 3;
    var WRONG_DOCUMENT_ERR = 4;
    var INVALID_CHARACTER_ERR = 5;
    var NO_MODIFICATION_ALLOWED_ERR = 7;
    var NOT_FOUND_ERR = 8;
    var NOT_SUPPORTED_ERR = 9;
    var INVALID_STATE_ERR = 11;
    var SYNTAX_ERR = 12;
    var INVALID_MODIFICATION_ERR = 13;
    var NAMESPACE_ERR = 14;
    var INVALID_ACCESS_ERR = 15;
    var TYPE_MISMATCH_ERR = 17;
    var SECURITY_ERR = 18;
    var NETWORK_ERR = 19;
    var ABORT_ERR = 20;
    var URL_MISMATCH_ERR = 21;
    var QUOTA_EXCEEDED_ERR = 22;
    var TIMEOUT_ERR = 23;
    var INVALID_NODE_TYPE_ERR = 24;
    var DATA_CLONE_ERR = 25;
    var names = [
      null,
      // No error with code 0
      "INDEX_SIZE_ERR",
      null,
      // historical
      "HIERARCHY_REQUEST_ERR",
      "WRONG_DOCUMENT_ERR",
      "INVALID_CHARACTER_ERR",
      null,
      // historical
      "NO_MODIFICATION_ALLOWED_ERR",
      "NOT_FOUND_ERR",
      "NOT_SUPPORTED_ERR",
      "INUSE_ATTRIBUTE_ERR",
      // historical
      "INVALID_STATE_ERR",
      "SYNTAX_ERR",
      "INVALID_MODIFICATION_ERR",
      "NAMESPACE_ERR",
      "INVALID_ACCESS_ERR",
      null,
      // historical
      "TYPE_MISMATCH_ERR",
      "SECURITY_ERR",
      "NETWORK_ERR",
      "ABORT_ERR",
      "URL_MISMATCH_ERR",
      "QUOTA_EXCEEDED_ERR",
      "TIMEOUT_ERR",
      "INVALID_NODE_TYPE_ERR",
      "DATA_CLONE_ERR"
    ];
    var messages = [
      null,
      // No error with code 0
      "INDEX_SIZE_ERR (1): the index is not in the allowed range",
      null,
      "HIERARCHY_REQUEST_ERR (3): the operation would yield an incorrect nodes model",
      "WRONG_DOCUMENT_ERR (4): the object is in the wrong Document, a call to importNode is required",
      "INVALID_CHARACTER_ERR (5): the string contains invalid characters",
      null,
      "NO_MODIFICATION_ALLOWED_ERR (7): the object can not be modified",
      "NOT_FOUND_ERR (8): the object can not be found here",
      "NOT_SUPPORTED_ERR (9): this operation is not supported",
      "INUSE_ATTRIBUTE_ERR (10): setAttributeNode called on owned Attribute",
      "INVALID_STATE_ERR (11): the object is in an invalid state",
      "SYNTAX_ERR (12): the string did not match the expected pattern",
      "INVALID_MODIFICATION_ERR (13): the object can not be modified in this way",
      "NAMESPACE_ERR (14): the operation is not allowed by Namespaces in XML",
      "INVALID_ACCESS_ERR (15): the object does not support the operation or argument",
      null,
      "TYPE_MISMATCH_ERR (17): the type of the object does not match the expected type",
      "SECURITY_ERR (18): the operation is insecure",
      "NETWORK_ERR (19): a network error occurred",
      "ABORT_ERR (20): the user aborted an operation",
      "URL_MISMATCH_ERR (21): the given URL does not match another URL",
      "QUOTA_EXCEEDED_ERR (22): the quota has been exceeded",
      "TIMEOUT_ERR (23): a timeout occurred",
      "INVALID_NODE_TYPE_ERR (24): the supplied node is invalid or has an invalid ancestor for this operation",
      "DATA_CLONE_ERR (25): the object can not be cloned."
    ];
    var constants = {
      INDEX_SIZE_ERR,
      DOMSTRING_SIZE_ERR: 2,
      // historical
      HIERARCHY_REQUEST_ERR,
      WRONG_DOCUMENT_ERR,
      INVALID_CHARACTER_ERR,
      NO_DATA_ALLOWED_ERR: 6,
      // historical
      NO_MODIFICATION_ALLOWED_ERR,
      NOT_FOUND_ERR,
      NOT_SUPPORTED_ERR,
      INUSE_ATTRIBUTE_ERR: 10,
      // historical
      INVALID_STATE_ERR,
      SYNTAX_ERR,
      INVALID_MODIFICATION_ERR,
      NAMESPACE_ERR,
      INVALID_ACCESS_ERR,
      VALIDATION_ERR: 16,
      // historical
      TYPE_MISMATCH_ERR,
      SECURITY_ERR,
      NETWORK_ERR,
      ABORT_ERR,
      URL_MISMATCH_ERR,
      QUOTA_EXCEEDED_ERR,
      TIMEOUT_ERR,
      INVALID_NODE_TYPE_ERR,
      DATA_CLONE_ERR
    };
    function DOMException(code2) {
      Error.call(this);
      Error.captureStackTrace(this, this.constructor);
      this.code = code2;
      this.message = messages[code2];
      this.name = names[code2];
    }
    DOMException.prototype.__proto__ = Error.prototype;
    for (c in constants) {
      v = { value: constants[c] };
      Object.defineProperty(DOMException, c, v);
      Object.defineProperty(DOMException.prototype, c, v);
    }
    var v;
    var c;
  }
});

// packages/qwik-dom/lib/config.js
var require_config = __commonJS({
  "packages/qwik-dom/lib/config.js"(exports2) {
    "use strict";
    exports2.isApiWritable = !global.__domino_frozen__;
  }
});

// packages/qwik-dom/lib/utils.js
var require_utils = __commonJS({
  "packages/qwik-dom/lib/utils.js"(exports2) {
    "use strict";
    var DOMException = require_DOMException();
    var ERR = DOMException;
    var isApiWritable = require_config().isApiWritable;
    exports2.NAMESPACE = {
      HTML: "http://www.w3.org/1999/xhtml",
      XML: "http://www.w3.org/XML/1998/namespace",
      XMLNS: "http://www.w3.org/2000/xmlns/",
      MATHML: "http://www.w3.org/1998/Math/MathML",
      SVG: "http://www.w3.org/2000/svg",
      XLINK: "http://www.w3.org/1999/xlink"
    };
    exports2.IndexSizeError = function() {
      throw new DOMException(ERR.INDEX_SIZE_ERR);
    };
    exports2.HierarchyRequestError = function() {
      throw new DOMException(ERR.HIERARCHY_REQUEST_ERR);
    };
    exports2.WrongDocumentError = function() {
      throw new DOMException(ERR.WRONG_DOCUMENT_ERR);
    };
    exports2.InvalidCharacterError = function() {
      throw new DOMException(ERR.INVALID_CHARACTER_ERR);
    };
    exports2.NoModificationAllowedError = function() {
      throw new DOMException(ERR.NO_MODIFICATION_ALLOWED_ERR);
    };
    exports2.NotFoundError = function() {
      throw new DOMException(ERR.NOT_FOUND_ERR);
    };
    exports2.NotSupportedError = function() {
      throw new DOMException(ERR.NOT_SUPPORTED_ERR);
    };
    exports2.InvalidStateError = function() {
      throw new DOMException(ERR.INVALID_STATE_ERR);
    };
    exports2.SyntaxError = function() {
      throw new DOMException(ERR.SYNTAX_ERR);
    };
    exports2.InvalidModificationError = function() {
      throw new DOMException(ERR.INVALID_MODIFICATION_ERR);
    };
    exports2.NamespaceError = function() {
      throw new DOMException(ERR.NAMESPACE_ERR);
    };
    exports2.InvalidAccessError = function() {
      throw new DOMException(ERR.INVALID_ACCESS_ERR);
    };
    exports2.TypeMismatchError = function() {
      throw new DOMException(ERR.TYPE_MISMATCH_ERR);
    };
    exports2.SecurityError = function() {
      throw new DOMException(ERR.SECURITY_ERR);
    };
    exports2.NetworkError = function() {
      throw new DOMException(ERR.NETWORK_ERR);
    };
    exports2.AbortError = function() {
      throw new DOMException(ERR.ABORT_ERR);
    };
    exports2.UrlMismatchError = function() {
      throw new DOMException(ERR.URL_MISMATCH_ERR);
    };
    exports2.QuotaExceededError = function() {
      throw new DOMException(ERR.QUOTA_EXCEEDED_ERR);
    };
    exports2.TimeoutError = function() {
      throw new DOMException(ERR.TIMEOUT_ERR);
    };
    exports2.InvalidNodeTypeError = function() {
      throw new DOMException(ERR.INVALID_NODE_TYPE_ERR);
    };
    exports2.DataCloneError = function() {
      throw new DOMException(ERR.DATA_CLONE_ERR);
    };
    exports2.nyi = function() {
      throw new Error("NotYetImplemented");
    };
    exports2.shouldOverride = function() {
      throw new Error("Abstract function; should be overriding in subclass.");
    };
    exports2.assert = function(expr, msg) {
      if (!expr) {
        throw new Error("Assertion failed: " + (msg || "") + "\n" + new Error().stack);
      }
    };
    exports2.expose = function(src, c) {
      for (var n in src) {
        Object.defineProperty(c.prototype, n, { value: src[n], writable: isApiWritable });
      }
    };
    exports2.merge = function(a, b) {
      for (var n in b) {
        a[n] = b[n];
      }
    };
    exports2.escapeText = function(str) {
      return str;
    };
    exports2.documentOrder = function(n, m) {
      return 3 - (n.compareDocumentPosition(m) & 6);
    };
    exports2.toASCIILowerCase = function(s) {
      return s.replace(/[A-Z]+/g, function(c) {
        return c.toLowerCase();
      });
    };
    exports2.toASCIIUpperCase = function(s) {
      return s.replace(/[a-z]+/g, function(c) {
        return c.toUpperCase();
      });
    };
  }
});

// packages/qwik-dom/lib/EventTarget.js
var require_EventTarget = __commonJS({
  "packages/qwik-dom/lib/EventTarget.js"(exports2, module2) {
    "use strict";
    var Event = require_Event();
    var MouseEvent = require_MouseEvent();
    var utils = require_utils();
    module2.exports = EventTarget;
    function EventTarget() {
    }
    EventTarget.prototype = {
      // XXX
      // See WebIDL §4.8 for details on object event handlers
      // and how they should behave.  We actually have to accept
      // any object to addEventListener... Can't type check it.
      // on registration.
      // XXX:
      // Capturing event listeners are sort of rare.  I think I can optimize
      // them so that dispatchEvent can skip the capturing phase (or much of
      // it).  Each time a capturing listener is added, increment a flag on
      // the target node and each of its ancestors.  Decrement when removed.
      // And update the counter when nodes are added and removed from the
      // tree as well.  Then, in dispatch event, the capturing phase can
      // abort if it sees any node with a zero count.
      addEventListener: function addEventListener(type, listener, capture) {
        if (!listener) return;
        if (capture === void 0) capture = false;
        if (!this._listeners) this._listeners = /* @__PURE__ */ Object.create(null);
        if (!this._listeners[type]) this._listeners[type] = [];
        var list = this._listeners[type];
        for (var i = 0, n = list.length; i < n; i++) {
          var l = list[i];
          if (l.listener === listener && l.capture === capture) return;
        }
        var obj = { listener, capture };
        if (typeof listener === "function") obj.f = listener;
        list.push(obj);
      },
      removeEventListener: function removeEventListener(type, listener, capture) {
        if (capture === void 0) capture = false;
        if (this._listeners) {
          var list = this._listeners[type];
          if (list) {
            for (var i = 0, n = list.length; i < n; i++) {
              var l = list[i];
              if (l.listener === listener && l.capture === capture) {
                if (list.length === 1) {
                  this._listeners[type] = void 0;
                } else {
                  list.splice(i, 1);
                }
                return;
              }
            }
          }
        }
      },
      // This is the public API for dispatching untrusted public events.
      // See _dispatchEvent for the implementation
      dispatchEvent: function dispatchEvent(event) {
        return this._dispatchEvent(event, false);
      },
      //
      // See DOMCore §4.4
      // XXX: I'll probably need another version of this method for
      // internal use, one that does not set isTrusted to false.
      // XXX: see Document._dispatchEvent: perhaps that and this could
      // call a common internal function with different settings of
      // a trusted boolean argument
      //
      // XXX:
      // The spec has changed in how to deal with handlers registered
      // on idl or content attributes rather than with addEventListener.
      // Used to say that they always ran first.  That's how webkit does it
      // Spec now says that they run in a position determined by
      // when they were first set.  FF does it that way.  See:
      // http://www.whatwg.org/specs/web-apps/current-work/multipage/webappapis.html#event-handlers
      //
      _dispatchEvent: function _dispatchEvent(event, trusted) {
        if (typeof trusted !== "boolean") trusted = false;
        function invoke2(target, event2) {
          var type = event2.type, phase = event2.eventPhase;
          event2.currentTarget = target;
          if (phase !== Event.CAPTURING_PHASE && target._handlers && target._handlers[type]) {
            var handler = target._handlers[type];
            var rv;
            if (typeof handler === "function") {
              rv = handler.call(event2.currentTarget, event2);
            } else {
              var f = handler.handleEvent;
              if (typeof f !== "function")
                throw new TypeError(
                  "handleEvent property of event handler object isnot a function."
                );
              rv = f.call(handler, event2);
            }
            switch (event2.type) {
              case "mouseover":
                if (rv === true)
                  event2.preventDefault();
                break;
              case "beforeunload":
              // XXX: eventually we need a special case here
              /* falls through */
              default:
                if (rv === false) event2.preventDefault();
                break;
            }
          }
          var list = target._listeners && target._listeners[type];
          if (!list) return;
          list = list.slice();
          for (var i2 = 0, n2 = list.length; i2 < n2; i2++) {
            if (event2._immediatePropagationStopped) return;
            var l = list[i2];
            if (phase === Event.CAPTURING_PHASE && !l.capture || phase === Event.BUBBLING_PHASE && l.capture)
              continue;
            if (l.f) {
              l.f.call(event2.currentTarget, event2);
            } else {
              var fn = l.listener.handleEvent;
              if (typeof fn !== "function")
                throw new TypeError("handleEvent property of event listener object is not a function.");
              fn.call(l.listener, event2);
            }
          }
        }
        if (!event._initialized || event._dispatching) utils.InvalidStateError();
        event.isTrusted = trusted;
        event._dispatching = true;
        event.target = this;
        var ancestors = [];
        for (var n = this.parentNode; n; n = n.parentNode) ancestors.push(n);
        event.eventPhase = Event.CAPTURING_PHASE;
        for (var i = ancestors.length - 1; i >= 0; i--) {
          invoke2(ancestors[i], event);
          if (event._propagationStopped) break;
        }
        if (!event._propagationStopped) {
          event.eventPhase = Event.AT_TARGET;
          invoke2(this, event);
        }
        if (event.bubbles && !event._propagationStopped) {
          event.eventPhase = Event.BUBBLING_PHASE;
          for (var ii = 0, nn = ancestors.length; ii < nn; ii++) {
            invoke2(ancestors[ii], event);
            if (event._propagationStopped) break;
          }
        }
        event._dispatching = false;
        event.eventPhase = Event.AT_TARGET;
        event.currentTarget = null;
        if (trusted && !event.defaultPrevented && event instanceof MouseEvent) {
          switch (event.type) {
            case "mousedown":
              this._armed = {
                x: event.clientX,
                y: event.clientY,
                t: event.timeStamp
              };
              break;
            case "mouseout":
            case "mouseover":
              this._armed = null;
              break;
            case "mouseup":
              if (this._isClick(event)) this._doClick(event);
              this._armed = null;
              break;
          }
        }
        return !event.defaultPrevented;
      },
      // Determine whether a click occurred
      // XXX We don't support double clicks for now
      _isClick: function(event) {
        return this._armed !== null && event.type === "mouseup" && event.isTrusted && event.button === 0 && event.timeStamp - this._armed.t < 1e3 && Math.abs(event.clientX - this._armed.x) < 10 && Math.abs(event.clientY - this._armed.Y) < 10;
      },
      // Clicks are handled like this:
      // http://www.whatwg.org/specs/web-apps/current-work/multipage/elements.html#interactive-content-0
      //
      // Note that this method is similar to the HTMLElement.click() method
      // The event argument must be the trusted mouseup event
      _doClick: function(event) {
        if (this._click_in_progress) return;
        this._click_in_progress = true;
        var activated = this;
        while (activated && !activated._post_click_activation_steps) activated = activated.parentNode;
        if (activated && activated._pre_click_activation_steps) {
          activated._pre_click_activation_steps();
        }
        var click = this.ownerDocument.createEvent("MouseEvent");
        click.initMouseEvent(
          "click",
          true,
          true,
          this.ownerDocument.defaultView,
          1,
          event.screenX,
          event.screenY,
          event.clientX,
          event.clientY,
          event.ctrlKey,
          event.altKey,
          event.shiftKey,
          event.metaKey,
          event.button,
          null
        );
        var result = this._dispatchEvent(click, true);
        if (activated) {
          if (result) {
            if (activated._post_click_activation_steps) activated._post_click_activation_steps(click);
          } else {
            if (activated._cancelled_activation_steps) activated._cancelled_activation_steps();
          }
        }
      },
      //
      // An event handler is like an event listener, but it registered
      // by setting an IDL or content attribute like onload or onclick.
      // There can only be one of these at a time for any event type.
      // This is an internal method for the attribute accessors and
      // content attribute handlers that need to register events handlers.
      // The type argument is the same as in addEventListener().
      // The handler argument is the same as listeners in addEventListener:
      // it can be a function or an object. Pass null to remove any existing
      // handler.  Handlers are always invoked before any listeners of
      // the same type.  They are not invoked during the capturing phase
      // of event dispatch.
      //
      _setEventHandler: function _setEventHandler(type, handler) {
        if (!this._handlers) this._handlers = /* @__PURE__ */ Object.create(null);
        this._handlers[type] = handler;
      },
      _getEventHandler: function _getEventHandler(type) {
        return this._handlers && this._handlers[type] || null;
      }
    };
  }
});

// packages/qwik-dom/lib/LinkedList.js
var require_LinkedList = __commonJS({
  "packages/qwik-dom/lib/LinkedList.js"(exports2, module2) {
    "use strict";
    var utils = require_utils();
    var LinkedList = module2.exports = {
      // basic validity tests on a circular linked list a
      valid: function(a) {
        utils.assert(a, "list falsy");
        utils.assert(a._previousSibling, "previous falsy");
        utils.assert(a._nextSibling, "next falsy");
        return true;
      },
      // insert a before b
      insertBefore: function(a, b) {
        utils.assert(LinkedList.valid(a) && LinkedList.valid(b));
        var a_first = a, a_last = a._previousSibling;
        var b_first = b, b_last = b._previousSibling;
        a_first._previousSibling = b_last;
        a_last._nextSibling = b_first;
        b_last._nextSibling = a_first;
        b_first._previousSibling = a_last;
        utils.assert(LinkedList.valid(a) && LinkedList.valid(b));
      },
      // replace a single node a with a list b (which could be null)
      replace: function(a, b) {
        utils.assert(LinkedList.valid(a) && (b === null || LinkedList.valid(b)));
        if (b !== null) {
          LinkedList.insertBefore(b, a);
        }
        LinkedList.remove(a);
        utils.assert(LinkedList.valid(a) && (b === null || LinkedList.valid(b)));
      },
      // remove single node a from its list
      remove: function(a) {
        utils.assert(LinkedList.valid(a));
        var prev = a._previousSibling;
        if (prev === a) {
          return;
        }
        var next = a._nextSibling;
        prev._nextSibling = next;
        next._previousSibling = prev;
        a._previousSibling = a._nextSibling = a;
        utils.assert(LinkedList.valid(a));
      }
    };
  }
});

// packages/qwik-dom/lib/NodeUtils.js
var require_NodeUtils = __commonJS({
  "packages/qwik-dom/lib/NodeUtils.js"(exports2, module2) {
    "use strict";
    module2.exports = {
      // NOTE: The `serializeOne()` function used to live on the `Node.prototype`
      // as a private method `Node#_serializeOne(child)`, however that requires
      // a megamorphic property access `this._serializeOne` just to get to the
      // method, and this is being done on lots of different `Node` subclasses,
      // which puts a lot of pressure on V8's megamorphic stub cache. So by
      // moving the helper off of the `Node.prototype` and into a separate
      // function in this helper module, we get a monomorphic property access
      // `NodeUtils.serializeOne` to get to the function and reduce pressure
      // on the megamorphic stub cache.
      // See https://github.com/fgnass/domino/pull/142 for more information.
      serializeOne
    };
    var utils = require_utils();
    var NAMESPACE = utils.NAMESPACE;
    var hasRawContent = {
      STYLE: true,
      SCRIPT: true,
      XMP: true,
      IFRAME: true,
      NOEMBED: true,
      NOFRAMES: true,
      PLAINTEXT: true
    };
    var emptyElements = {
      area: true,
      base: true,
      basefont: true,
      bgsound: true,
      br: true,
      col: true,
      embed: true,
      frame: true,
      hr: true,
      img: true,
      input: true,
      keygen: true,
      link: true,
      meta: true,
      param: true,
      source: true,
      track: true,
      wbr: true
    };
    var extraNewLine = {
      /* Removed in https://github.com/whatwg/html/issues/944
      pre: true,
      textarea: true,
      listing: true
      */
    };
    function escape2(s) {
      return s.replace(/[&<>\u00A0]/g, function(c) {
        switch (c) {
          case "&":
            return "&amp;";
          case "<":
            return "&lt;";
          case ">":
            return "&gt;";
          case "\xA0":
            return "&nbsp;";
        }
      });
    }
    function escapeAttr(s) {
      var toEscape = /[&"\u00A0]/g;
      if (!toEscape.test(s)) {
        return s;
      } else {
        return s.replace(toEscape, function(c) {
          switch (c) {
            case "&":
              return "&amp;";
            case '"':
              return "&quot;";
            case "\xA0":
              return "&nbsp;";
          }
        });
      }
    }
    function attrname(a) {
      var ns = a.namespaceURI;
      if (!ns) return a.localName;
      if (ns === NAMESPACE.XML) return "xml:" + a.localName;
      if (ns === NAMESPACE.XLINK) return "xlink:" + a.localName;
      if (ns === NAMESPACE.XMLNS) {
        if (a.localName === "xmlns") return "xmlns";
        else return "xmlns:" + a.localName;
      }
      return a.name;
    }
    function serializeOne(kid, parent) {
      var s = "";
      switch (kid.nodeType) {
        case 1:
          var ns = kid.namespaceURI;
          var html = ns === NAMESPACE.HTML;
          var tagname = html || ns === NAMESPACE.SVG || ns === NAMESPACE.MATHML ? kid.localName : kid.tagName;
          s += "<" + tagname;
          for (var j = 0, k = kid._numattrs; j < k; j++) {
            var a = kid._attr(j);
            s += " " + attrname(a);
            if (a.value !== void 0) s += '="' + escapeAttr(a.value) + '"';
          }
          s += ">";
          if (!(html && emptyElements[tagname])) {
            var ss = kid.serialize();
            if (html && extraNewLine[tagname] && ss.charAt(0) === "\n") s += "\n";
            s += ss;
            s += "</" + tagname + ">";
          }
          break;
        case 3:
        //TEXT_NODE
        case 4:
          var parenttag;
          if (parent.nodeType === 1 && parent.namespaceURI === NAMESPACE.HTML)
            parenttag = parent.tagName;
          else parenttag = "";
          if (hasRawContent[parenttag] || parenttag === "NOSCRIPT" && parent.ownerDocument._scripting_enabled) {
            s += kid.data;
          } else {
            s += escape2(kid.data);
          }
          break;
        case 8:
          s += "<!--" + kid.data + "-->";
          break;
        case 7:
          s += "<?" + kid.target + " " + kid.data + "?>";
          break;
        case 10:
          s += "<!DOCTYPE " + kid.name;
          if (false) {
            if (kid.publicID) {
              s += ' PUBLIC "' + kid.publicId + '"';
            }
            if (kid.systemId) {
              s += ' "' + kid.systemId + '"';
            }
          }
          s += ">";
          break;
        default:
          utils.InvalidStateError();
      }
      return s;
    }
  }
});

// packages/qwik-dom/lib/Node.js
var require_Node = __commonJS({
  "packages/qwik-dom/lib/Node.js"(exports2, module2) {
    "use strict";
    module2.exports = Node;
    var EventTarget = require_EventTarget();
    var LinkedList = require_LinkedList();
    var NodeUtils = require_NodeUtils();
    var utils = require_utils();
    function Node() {
      EventTarget.call(this);
      this.parentNode = null;
      this._nextSibling = this._previousSibling = this;
      this._index = void 0;
    }
    var ELEMENT_NODE = Node.ELEMENT_NODE = 1;
    var ATTRIBUTE_NODE = Node.ATTRIBUTE_NODE = 2;
    var TEXT_NODE = Node.TEXT_NODE = 3;
    var CDATA_SECTION_NODE = Node.CDATA_SECTION_NODE = 4;
    var ENTITY_REFERENCE_NODE = Node.ENTITY_REFERENCE_NODE = 5;
    var ENTITY_NODE = Node.ENTITY_NODE = 6;
    var PROCESSING_INSTRUCTION_NODE = Node.PROCESSING_INSTRUCTION_NODE = 7;
    var COMMENT_NODE = Node.COMMENT_NODE = 8;
    var DOCUMENT_NODE = Node.DOCUMENT_NODE = 9;
    var DOCUMENT_TYPE_NODE = Node.DOCUMENT_TYPE_NODE = 10;
    var DOCUMENT_FRAGMENT_NODE = Node.DOCUMENT_FRAGMENT_NODE = 11;
    var NOTATION_NODE = Node.NOTATION_NODE = 12;
    var DOCUMENT_POSITION_DISCONNECTED = Node.DOCUMENT_POSITION_DISCONNECTED = 1;
    var DOCUMENT_POSITION_PRECEDING = Node.DOCUMENT_POSITION_PRECEDING = 2;
    var DOCUMENT_POSITION_FOLLOWING = Node.DOCUMENT_POSITION_FOLLOWING = 4;
    var DOCUMENT_POSITION_CONTAINS = Node.DOCUMENT_POSITION_CONTAINS = 8;
    var DOCUMENT_POSITION_CONTAINED_BY = Node.DOCUMENT_POSITION_CONTAINED_BY = 16;
    var DOCUMENT_POSITION_IMPLEMENTATION_SPECIFIC = Node.DOCUMENT_POSITION_IMPLEMENTATION_SPECIFIC = 32;
    Node.prototype = Object.create(EventTarget.prototype, {
      // Node that are not inserted into the tree inherit a null parent
      // XXX: the baseURI attribute is defined by dom core, but
      // a correct implementation of it requires HTML features, so
      // we'll come back to this later.
      baseURI: { get: utils.nyi },
      parentElement: {
        get: function() {
          return this.parentNode && this.parentNode.nodeType === ELEMENT_NODE ? this.parentNode : null;
        }
      },
      hasChildNodes: { value: utils.shouldOverride },
      firstChild: { get: utils.shouldOverride },
      lastChild: { get: utils.shouldOverride },
      isConnected: {
        get: function() {
          let node = this;
          while (node != null) {
            if (node.nodeType === Node.DOCUMENT_NODE) {
              return true;
            }
            node = node.parentNode;
            if (node != null && node.nodeType === Node.DOCUMENT_FRAGMENT_NODE) {
              node = node.host;
            }
          }
          return false;
        }
      },
      previousSibling: {
        get: function() {
          var parent = this.parentNode;
          if (!parent) return null;
          if (this === parent.firstChild) return null;
          return this._previousSibling;
        }
      },
      nextSibling: {
        get: function() {
          var parent = this.parentNode, next = this._nextSibling;
          if (!parent) return null;
          if (next === parent.firstChild) return null;
          return next;
        }
      },
      textContent: {
        // Should override for DocumentFragment/Element/Attr/Text/PI/Comment
        get: function() {
          return null;
        },
        set: function(v) {
        }
      },
      _countChildrenOfType: {
        value: function(type) {
          var sum = 0;
          for (var kid = this.firstChild; kid !== null; kid = kid.nextSibling) {
            if (kid.nodeType === type) sum++;
          }
          return sum;
        }
      },
      _ensureInsertValid: {
        value: function _ensureInsertValid(node, child, isPreinsert) {
          var parent = this, i, kid;
          if (!node.nodeType) throw new TypeError("not a node");
          switch (parent.nodeType) {
            case DOCUMENT_NODE:
            case DOCUMENT_FRAGMENT_NODE:
            case ELEMENT_NODE:
              break;
            default:
              utils.HierarchyRequestError();
          }
          if (node.isAncestor(parent)) utils.HierarchyRequestError();
          if (child !== null || !isPreinsert) {
            if (child.parentNode !== parent) utils.NotFoundError();
          }
          switch (node.nodeType) {
            case DOCUMENT_FRAGMENT_NODE:
            case DOCUMENT_TYPE_NODE:
            case ELEMENT_NODE:
            case TEXT_NODE:
            case PROCESSING_INSTRUCTION_NODE:
            case COMMENT_NODE:
              break;
            default:
              utils.HierarchyRequestError();
          }
          if (parent.nodeType === DOCUMENT_NODE) {
            switch (node.nodeType) {
              case TEXT_NODE:
                utils.HierarchyRequestError();
                break;
              case DOCUMENT_FRAGMENT_NODE:
                if (node._countChildrenOfType(TEXT_NODE) > 0) utils.HierarchyRequestError();
                switch (node._countChildrenOfType(ELEMENT_NODE)) {
                  case 0:
                    break;
                  case 1:
                    if (child !== null) {
                      if (isPreinsert && child.nodeType === DOCUMENT_TYPE_NODE)
                        utils.HierarchyRequestError();
                      for (kid = child.nextSibling; kid !== null; kid = kid.nextSibling) {
                        if (kid.nodeType === DOCUMENT_TYPE_NODE) utils.HierarchyRequestError();
                      }
                    }
                    i = parent._countChildrenOfType(ELEMENT_NODE);
                    if (isPreinsert) {
                      if (i > 0) utils.HierarchyRequestError();
                    } else {
                      if (i > 1 || i === 1 && child.nodeType !== ELEMENT_NODE)
                        utils.HierarchyRequestError();
                    }
                    break;
                  default:
                    utils.HierarchyRequestError();
                }
                break;
              case ELEMENT_NODE:
                if (child !== null) {
                  if (isPreinsert && child.nodeType === DOCUMENT_TYPE_NODE)
                    utils.HierarchyRequestError();
                  for (kid = child.nextSibling; kid !== null; kid = kid.nextSibling) {
                    if (kid.nodeType === DOCUMENT_TYPE_NODE) utils.HierarchyRequestError();
                  }
                }
                i = parent._countChildrenOfType(ELEMENT_NODE);
                if (isPreinsert) {
                  if (i > 0) utils.HierarchyRequestError();
                } else {
                  if (i > 1 || i === 1 && child.nodeType !== ELEMENT_NODE)
                    utils.HierarchyRequestError();
                }
                break;
              case DOCUMENT_TYPE_NODE:
                if (child === null) {
                  if (parent._countChildrenOfType(ELEMENT_NODE)) utils.HierarchyRequestError();
                } else {
                  for (kid = parent.firstChild; kid !== null; kid = kid.nextSibling) {
                    if (kid === child) break;
                    if (kid.nodeType === ELEMENT_NODE) utils.HierarchyRequestError();
                  }
                }
                i = parent._countChildrenOfType(DOCUMENT_TYPE_NODE);
                if (isPreinsert) {
                  if (i > 0) utils.HierarchyRequestError();
                } else {
                  if (i > 1 || i === 1 && child.nodeType !== DOCUMENT_TYPE_NODE)
                    utils.HierarchyRequestError();
                }
                break;
            }
          } else {
            if (node.nodeType === DOCUMENT_TYPE_NODE) utils.HierarchyRequestError();
          }
        }
      },
      insertBefore: {
        value: function insertBefore2(node, child) {
          var parent = this;
          parent._ensureInsertValid(node, child, true);
          var refChild = child;
          if (refChild === node) {
            refChild = node.nextSibling;
          }
          parent.doc.adoptNode(node);
          node._insertOrReplace(parent, refChild, false);
          return node;
        }
      },
      appendChild: {
        value: function(child) {
          return this.insertBefore(child, null);
        }
      },
      _appendChild: {
        value: function(child) {
          child._insertOrReplace(this, null, false);
        }
      },
      removeChild: {
        value: function removeChild(child) {
          var parent = this;
          if (!child.nodeType) throw new TypeError("not a node");
          if (child.parentNode !== parent) utils.NotFoundError();
          child.remove();
          return child;
        }
      },
      // To replace a `child` with `node` within a `parent` (this)
      replaceChild: {
        value: function replaceChild(node, child) {
          var parent = this;
          parent._ensureInsertValid(node, child, false);
          if (node.doc !== parent.doc) {
            parent.doc.adoptNode(node);
          }
          node._insertOrReplace(parent, child, true);
          return child;
        }
      },
      // See: http://ejohn.org/blog/comparing-document-position/
      contains: {
        value: function contains(node) {
          if (node === null) {
            return false;
          }
          if (this === node) {
            return true;
          }
          return (this.compareDocumentPosition(node) & DOCUMENT_POSITION_CONTAINED_BY) !== 0;
        }
      },
      compareDocumentPosition: {
        value: function compareDocumentPosition(that) {
          if (this === that) return 0;
          if (this.doc !== that.doc || this.rooted !== that.rooted)
            return DOCUMENT_POSITION_DISCONNECTED + DOCUMENT_POSITION_IMPLEMENTATION_SPECIFIC;
          var these = [], those = [];
          for (var n = this; n !== null; n = n.parentNode) these.push(n);
          for (n = that; n !== null; n = n.parentNode) those.push(n);
          these.reverse();
          those.reverse();
          if (these[0] !== those[0])
            return DOCUMENT_POSITION_DISCONNECTED + DOCUMENT_POSITION_IMPLEMENTATION_SPECIFIC;
          n = Math.min(these.length, those.length);
          for (var i = 1; i < n; i++) {
            if (these[i] !== those[i]) {
              if (these[i].index < those[i].index) return DOCUMENT_POSITION_FOLLOWING;
              else return DOCUMENT_POSITION_PRECEDING;
            }
          }
          if (these.length < those.length)
            return DOCUMENT_POSITION_FOLLOWING + DOCUMENT_POSITION_CONTAINED_BY;
          else return DOCUMENT_POSITION_PRECEDING + DOCUMENT_POSITION_CONTAINS;
        }
      },
      isSameNode: {
        value: function isSameNode(node) {
          return this === node;
        }
      },
      // This method implements the generic parts of node equality testing
      // and defers to the (non-recursive) type-specific isEqual() method
      // defined by subclasses
      isEqualNode: {
        value: function isEqualNode(node) {
          if (!node) return false;
          if (node.nodeType !== this.nodeType) return false;
          if (!this.isEqual(node)) return false;
          for (var c1 = this.firstChild, c2 = node.firstChild; c1 && c2; c1 = c1.nextSibling, c2 = c2.nextSibling) {
            if (!c1.isEqualNode(c2)) return false;
          }
          return c1 === null && c2 === null;
        }
      },
      // This method delegates shallow cloning to a clone() method
      // that each concrete subclass must implement
      cloneNode: {
        value: function(deep) {
          var clone = this.clone();
          if (deep) {
            for (var kid = this.firstChild; kid !== null; kid = kid.nextSibling) {
              clone._appendChild(kid.cloneNode(true));
            }
          }
          return clone;
        }
      },
      lookupPrefix: {
        value: function lookupPrefix(ns) {
          var e;
          if (ns === "" || ns === null || ns === void 0) return null;
          switch (this.nodeType) {
            case ELEMENT_NODE:
              return this._lookupNamespacePrefix(ns, this);
            case DOCUMENT_NODE:
              e = this.documentElement;
              return e ? e.lookupPrefix(ns) : null;
            case ENTITY_NODE:
            case NOTATION_NODE:
            case DOCUMENT_FRAGMENT_NODE:
            case DOCUMENT_TYPE_NODE:
              return null;
            case ATTRIBUTE_NODE:
              e = this.ownerElement;
              return e ? e.lookupPrefix(ns) : null;
            default:
              e = this.parentElement;
              return e ? e.lookupPrefix(ns) : null;
          }
        }
      },
      lookupNamespaceURI: {
        value: function lookupNamespaceURI(prefix) {
          if (prefix === "" || prefix === void 0) {
            prefix = null;
          }
          var e;
          switch (this.nodeType) {
            case ELEMENT_NODE:
              return utils.shouldOverride();
            case DOCUMENT_NODE:
              e = this.documentElement;
              return e ? e.lookupNamespaceURI(prefix) : null;
            case ENTITY_NODE:
            case NOTATION_NODE:
            case DOCUMENT_TYPE_NODE:
            case DOCUMENT_FRAGMENT_NODE:
              return null;
            case ATTRIBUTE_NODE:
              e = this.ownerElement;
              return e ? e.lookupNamespaceURI(prefix) : null;
            default:
              e = this.parentElement;
              return e ? e.lookupNamespaceURI(prefix) : null;
          }
        }
      },
      isDefaultNamespace: {
        value: function isDefaultNamespace(ns) {
          if (ns === "" || ns === void 0) {
            ns = null;
          }
          var defaultNamespace = this.lookupNamespaceURI(null);
          return defaultNamespace === ns;
        }
      },
      // Utility methods for nodes.  Not part of the DOM
      // Return the index of this node in its parent.
      // Throw if no parent, or if this node is not a child of its parent
      index: {
        get: function() {
          var parent = this.parentNode;
          if (this === parent.firstChild) return 0;
          var kids = parent.childNodes;
          if (this._index === void 0 || kids[this._index] !== this) {
            for (var i = 0; i < kids.length; i++) {
              kids[i]._index = i;
            }
            utils.assert(kids[this._index] === this);
          }
          return this._index;
        }
      },
      // Return true if this node is equal to or is an ancestor of that node
      // Note that nodes are considered to be ancestors of themselves
      isAncestor: {
        value: function(that) {
          if (this.doc !== that.doc) return false;
          if (this.rooted !== that.rooted) return false;
          for (var e = that; e; e = e.parentNode) {
            if (e === this) return true;
          }
          return false;
        }
      },
      // DOMINO Changed the behavior to conform with the specs. See:
      // https://groups.google.com/d/topic/mozilla.dev.platform/77sIYcpdDmc/discussion
      ensureSameDoc: {
        value: function(that) {
          if (that.ownerDocument === null) {
            that.ownerDocument = this.doc;
          } else if (that.ownerDocument !== this.doc) {
            utils.WrongDocumentError();
          }
        }
      },
      removeChildren: { value: utils.shouldOverride },
      // Insert this node as a child of parent before the specified child,
      // or insert as the last child of parent if specified child is null,
      // or replace the specified child with this node, firing mutation events as
      // necessary
      _insertOrReplace: {
        value: function _insertOrReplace(parent, before, isReplace) {
          var child = this, before_index, i;
          if (child.nodeType === DOCUMENT_FRAGMENT_NODE && child.rooted) {
            utils.HierarchyRequestError();
          }
          if (parent._childNodes) {
            before_index = before === null ? parent._childNodes.length : before.index;
            if (child.parentNode === parent) {
              var child_index = child.index;
              if (child_index < before_index) {
                before_index--;
              }
            }
          }
          if (isReplace) {
            if (before.rooted) before.doc.mutateRemove(before);
            before.parentNode = null;
          }
          var n = before;
          if (n === null) {
            n = parent.firstChild;
          }
          var bothRooted = child.rooted && parent.rooted;
          if (child.nodeType === DOCUMENT_FRAGMENT_NODE) {
            var spliceArgs = [0, isReplace ? 1 : 0], next;
            for (var kid = child.firstChild; kid !== null; kid = next) {
              next = kid.nextSibling;
              spliceArgs.push(kid);
              kid.parentNode = parent;
            }
            var len = spliceArgs.length;
            if (isReplace) {
              LinkedList.replace(n, len > 2 ? spliceArgs[2] : null);
            } else if (len > 2 && n !== null) {
              LinkedList.insertBefore(spliceArgs[2], n);
            }
            if (parent._childNodes) {
              spliceArgs[0] = before === null ? parent._childNodes.length : before._index;
              parent._childNodes.splice.apply(parent._childNodes, spliceArgs);
              for (i = 2; i < len; i++) {
                spliceArgs[i]._index = spliceArgs[0] + (i - 2);
              }
            } else if (parent._firstChild === before) {
              if (len > 2) {
                parent._firstChild = spliceArgs[2];
              } else if (isReplace) {
                parent._firstChild = null;
              }
            }
            if (child._childNodes) {
              child._childNodes.length = 0;
            } else {
              child._firstChild = null;
            }
            if (parent.rooted) {
              parent.modify();
              for (i = 2; i < len; i++) {
                parent.doc.mutateInsert(spliceArgs[i]);
              }
            }
          } else {
            if (before === child) {
              return;
            }
            if (bothRooted) {
              child._remove();
            } else if (child.parentNode) {
              child.remove();
            }
            child.parentNode = parent;
            if (isReplace) {
              LinkedList.replace(n, child);
              if (parent._childNodes) {
                child._index = before_index;
                parent._childNodes[before_index] = child;
              } else if (parent._firstChild === before) {
                parent._firstChild = child;
              }
            } else {
              if (n !== null) {
                LinkedList.insertBefore(child, n);
              }
              if (parent._childNodes) {
                child._index = before_index;
                parent._childNodes.splice(before_index, 0, child);
              } else if (parent._firstChild === before) {
                parent._firstChild = child;
              }
            }
            if (bothRooted) {
              parent.modify();
              parent.doc.mutateMove(child);
            } else if (parent.rooted) {
              parent.modify();
              parent.doc.mutateInsert(child);
            }
          }
        }
      },
      // Return the lastModTime value for this node. (For use as a
      // cache invalidation mechanism. If the node does not already
      // have one, initialize it from the owner document's modclock
      // property. (Note that modclock does not return the actual
      // time; it is simply a counter incremented on each document
      // modification)
      lastModTime: {
        get: function() {
          if (!this._lastModTime) {
            this._lastModTime = this.doc.modclock;
          }
          return this._lastModTime;
        }
      },
      // Increment the owner document's modclock and use the new
      // value to update the lastModTime value for this node and
      // all of its ancestors. Nodes that have never had their
      // lastModTime value queried do not need to have a
      // lastModTime property set on them since there is no
      // previously queried value to ever compare the new value
      // against, so only update nodes that already have a
      // _lastModTime property.
      modify: {
        value: function() {
          if (this.doc.modclock) {
            var time = ++this.doc.modclock;
            for (var n = this; n; n = n.parentElement) {
              if (n._lastModTime) {
                n._lastModTime = time;
              }
            }
          }
        }
      },
      // This attribute is not part of the DOM but is quite helpful.
      // It returns the document with which a node is associated.  Usually
      // this is the ownerDocument. But ownerDocument is null for the
      // document object itself, so this is a handy way to get the document
      // regardless of the node type
      doc: {
        get: function() {
          return this.ownerDocument || this;
        }
      },
      // If the node has a nid (node id), then it is rooted in a document
      rooted: {
        get: function() {
          return !!this._nid;
        }
      },
      normalize: {
        value: function() {
          var next;
          for (var child = this.firstChild; child !== null; child = next) {
            next = child.nextSibling;
            if (child.normalize) {
              child.normalize();
            }
            if (child.nodeType !== Node.TEXT_NODE) {
              continue;
            }
            if (child.nodeValue === "") {
              this.removeChild(child);
              continue;
            }
            var prevChild = child.previousSibling;
            if (prevChild === null) {
              continue;
            } else if (prevChild.nodeType === Node.TEXT_NODE) {
              prevChild.appendData(child.nodeValue);
              this.removeChild(child);
            }
          }
        }
      },
      // Convert the children of a node to an HTML string.
      // This is used by the innerHTML getter
      // The serialization spec is at:
      // http://www.whatwg.org/specs/web-apps/current-work/multipage/the-end.html#serializing-html-fragments
      //
      // The serialization logic is intentionally implemented in a separate
      // `NodeUtils` helper instead of the more obvious choice of a private
      // `_serializeOne()` method on the `Node.prototype` in order to avoid
      // the megamorphic `this._serializeOne` property access, which reduces
      // performance unnecessarily. If you need specialized behavior for a
      // certain subclass, you'll need to implement that in `NodeUtils`.
      // See https://github.com/fgnass/domino/pull/142 for more information.
      serialize: {
        value: function() {
          if (this._innerHTML) {
            return this._innerHTML;
          }
          var s = "";
          for (var kid = this.firstChild; kid !== null; kid = kid.nextSibling) {
            s += NodeUtils.serializeOne(kid, this);
          }
          return s;
        }
      },
      // Non-standard, but often useful for debugging.
      outerHTML: {
        get: function() {
          return NodeUtils.serializeOne(this, { nodeType: 0 });
        },
        set: utils.nyi
      },
      // mirror node type properties in the prototype, so they are present
      // in instances of Node (and subclasses)
      ELEMENT_NODE: { value: ELEMENT_NODE },
      ATTRIBUTE_NODE: { value: ATTRIBUTE_NODE },
      TEXT_NODE: { value: TEXT_NODE },
      CDATA_SECTION_NODE: { value: CDATA_SECTION_NODE },
      ENTITY_REFERENCE_NODE: { value: ENTITY_REFERENCE_NODE },
      ENTITY_NODE: { value: ENTITY_NODE },
      PROCESSING_INSTRUCTION_NODE: { value: PROCESSING_INSTRUCTION_NODE },
      COMMENT_NODE: { value: COMMENT_NODE },
      DOCUMENT_NODE: { value: DOCUMENT_NODE },
      DOCUMENT_TYPE_NODE: { value: DOCUMENT_TYPE_NODE },
      DOCUMENT_FRAGMENT_NODE: { value: DOCUMENT_FRAGMENT_NODE },
      NOTATION_NODE: { value: NOTATION_NODE },
      DOCUMENT_POSITION_DISCONNECTED: { value: DOCUMENT_POSITION_DISCONNECTED },
      DOCUMENT_POSITION_PRECEDING: { value: DOCUMENT_POSITION_PRECEDING },
      DOCUMENT_POSITION_FOLLOWING: { value: DOCUMENT_POSITION_FOLLOWING },
      DOCUMENT_POSITION_CONTAINS: { value: DOCUMENT_POSITION_CONTAINS },
      DOCUMENT_POSITION_CONTAINED_BY: { value: DOCUMENT_POSITION_CONTAINED_BY },
      DOCUMENT_POSITION_IMPLEMENTATION_SPECIFIC: { value: DOCUMENT_POSITION_IMPLEMENTATION_SPECIFIC }
    });
  }
});

// packages/qwik-dom/lib/NodeList.es6.js
var require_NodeList_es6 = __commonJS({
  "packages/qwik-dom/lib/NodeList.es6.js"(exports2, module2) {
    "use strict";
    module2.exports = class NodeList extends Array {
      constructor(a) {
        super(a && a.length || 0);
        if (a) {
          for (var idx in a) {
            this[idx] = a[idx];
          }
        }
      }
      item(i) {
        return this[i] || null;
      }
    };
  }
});

// packages/qwik-dom/lib/NodeList.es5.js
var require_NodeList_es5 = __commonJS({
  "packages/qwik-dom/lib/NodeList.es5.js"(exports2, module2) {
    "use strict";
    function item(i) {
      return this[i] || null;
    }
    function NodeList(a) {
      if (!a) a = [];
      a.item = item;
      return a;
    }
    module2.exports = NodeList;
  }
});

// packages/qwik-dom/lib/NodeList.js
var require_NodeList = __commonJS({
  "packages/qwik-dom/lib/NodeList.js"(exports2, module2) {
    "use strict";
    var NodeList;
    try {
      NodeList = require_NodeList_es6();
    } catch (e) {
      NodeList = require_NodeList_es5();
    }
    module2.exports = NodeList;
  }
});

// packages/qwik-dom/lib/ContainerNode.js
var require_ContainerNode = __commonJS({
  "packages/qwik-dom/lib/ContainerNode.js"(exports2, module2) {
    "use strict";
    module2.exports = ContainerNode;
    var Node = require_Node();
    var NodeList = require_NodeList();
    function ContainerNode() {
      Node.call(this);
      this._firstChild = this._childNodes = null;
    }
    ContainerNode.prototype = Object.create(Node.prototype, {
      hasChildNodes: {
        value: function() {
          if (this._childNodes) {
            return this._childNodes.length > 0;
          }
          return this._firstChild !== null;
        }
      },
      childNodes: {
        get: function() {
          this._ensureChildNodes();
          return this._childNodes;
        }
      },
      firstChild: {
        get: function() {
          if (this._childNodes) {
            return this._childNodes.length === 0 ? null : this._childNodes[0];
          }
          return this._firstChild;
        }
      },
      lastChild: {
        get: function() {
          var kids = this._childNodes, first;
          if (kids) {
            return kids.length === 0 ? null : kids[kids.length - 1];
          }
          first = this._firstChild;
          if (first === null) {
            return null;
          }
          return first._previousSibling;
        }
      },
      _ensureChildNodes: {
        value: function() {
          if (this._childNodes) {
            return;
          }
          var first = this._firstChild, kid = first, childNodes = this._childNodes = new NodeList();
          if (first)
            do {
              childNodes.push(kid);
              kid = kid._nextSibling;
            } while (kid !== first);
          this._firstChild = null;
        }
      },
      replaceChildren: {
        value: function replaceChildren() {
          this.removeChildren();
        }
      },
      // Remove all of this node's children.  This is a minor
      // optimization that only calls modify() once.
      removeChildren: {
        value: function removeChildren() {
          var root = this.rooted ? this.ownerDocument : null, next = this.firstChild, kid;
          while (next !== null) {
            kid = next;
            next = kid.nextSibling;
            if (root) root.mutateRemove(kid);
            kid.parentNode = null;
          }
          if (this._childNodes) {
            this._childNodes.length = 0;
          } else {
            this._firstChild = null;
          }
          this.modify();
        }
      }
    });
  }
});

// packages/qwik-dom/lib/xmlnames.js
var require_xmlnames = __commonJS({
  "packages/qwik-dom/lib/xmlnames.js"(exports2) {
    "use strict";
    exports2.isValidName = isValidName;
    exports2.isValidQName = isValidQName;
    var simplename = /^[_:A-Za-z][-.:\w]+$/;
    var simpleqname = /^([_A-Za-z][-.\w]+|[_A-Za-z][-.\w]+:[_A-Za-z][-.\w]+)$/;
    var ncnamestartchars = "_A-Za-z\xC0-\xD6\xD8-\xF6\xF8-\u02FF\u0370-\u037D\u037F-\u1FFF\u200C-\u200D\u2070-\u218F\u2C00-\u2FEF\u3001-\uD7FF\uF900-\uFDCF\uFDF0-\uFFFD";
    var ncnamechars = "-._A-Za-z0-9\xB7\xC0-\xD6\xD8-\xF6\xF8-\u02FF\u0300-\u037D\u037F-\u1FFF\u200C\u200D\u203F\u2040\u2070-\u218F\u2C00-\u2FEF\u3001-\uD7FF\uF900-\uFDCF\uFDF0-\uFFFD";
    var ncname = "[" + ncnamestartchars + "][" + ncnamechars + "]*";
    var namestartchars = ncnamestartchars + ":";
    var namechars = ncnamechars + ":";
    var name = new RegExp("^[" + namestartchars + "][" + namechars + "]*$");
    var qname = new RegExp("^(" + ncname + "|" + ncname + ":" + ncname + ")$");
    var hassurrogates = /[\uD800-\uDB7F\uDC00-\uDFFF]/;
    var surrogatechars = /[\uD800-\uDB7F\uDC00-\uDFFF]/g;
    var surrogatepairs = /[\uD800-\uDB7F][\uDC00-\uDFFF]/g;
    ncnamestartchars += "\uD800-\u{EFC00}-\uDFFF";
    ncnamechars += "\uD800-\u{EFC00}-\uDFFF";
    ncname = "[" + ncnamestartchars + "][" + ncnamechars + "]*";
    namestartchars = ncnamestartchars + ":";
    namechars = ncnamechars + ":";
    var surrogatename = new RegExp("^[" + namestartchars + "][" + namechars + "]*$");
    var surrogateqname = new RegExp("^(" + ncname + "|" + ncname + ":" + ncname + ")$");
    function isValidName(s) {
      if (simplename.test(s)) return true;
      if (name.test(s)) return true;
      if (!hassurrogates.test(s)) return false;
      if (!surrogatename.test(s)) return false;
      var chars = s.match(surrogatechars), pairs = s.match(surrogatepairs);
      return pairs !== null && 2 * pairs.length === chars.length;
    }
    function isValidQName(s) {
      if (simpleqname.test(s)) return true;
      if (qname.test(s)) return true;
      if (!hassurrogates.test(s)) return false;
      if (!surrogateqname.test(s)) return false;
      var chars = s.match(surrogatechars), pairs = s.match(surrogatepairs);
      return pairs !== null && 2 * pairs.length === chars.length;
    }
  }
});

// packages/qwik-dom/lib/attributes.js
var require_attributes = __commonJS({
  "packages/qwik-dom/lib/attributes.js"(exports2) {
    "use strict";
    var utils = require_utils();
    exports2.property = function(attr) {
      if (Array.isArray(attr.type)) {
        var valid = /* @__PURE__ */ Object.create(null);
        attr.type.forEach(function(val) {
          valid[val.value || val] = val.alias || val;
        });
        var missingValueDefault = attr.missing;
        if (missingValueDefault === void 0) {
          missingValueDefault = null;
        }
        var invalidValueDefault = attr.invalid;
        if (invalidValueDefault === void 0) {
          invalidValueDefault = missingValueDefault;
        }
        return {
          get: function() {
            var v = this._getattr(attr.name);
            if (v === null) return missingValueDefault;
            v = valid[v.toLowerCase()];
            if (v !== void 0) return v;
            if (invalidValueDefault !== null) return invalidValueDefault;
            return v;
          },
          set: function(v) {
            this._setattr(attr.name, v);
          }
        };
      } else if (attr.type === Boolean) {
        return {
          get: function() {
            return this.hasAttribute(attr.name);
          },
          set: function(v) {
            if (v) {
              this._setattr(attr.name, "");
            } else {
              this.removeAttribute(attr.name);
            }
          }
        };
      } else if (attr.type === Number || attr.type === "long" || attr.type === "unsigned long" || attr.type === "limited unsigned long with fallback") {
        return numberPropDesc(attr);
      } else if (!attr.type || attr.type === String) {
        return {
          get: function() {
            return this._getattr(attr.name) || "";
          },
          set: function(v) {
            if (attr.treatNullAsEmptyString && v === null) {
              v = "";
            }
            this._setattr(attr.name, v);
          }
        };
      } else if (typeof attr.type === "function") {
        return attr.type(attr.name, attr);
      }
      throw new Error("Invalid attribute definition");
    };
    function numberPropDesc(a) {
      var def;
      if (typeof a.default === "function") {
        def = a.default;
      } else if (typeof a.default === "number") {
        def = function() {
          return a.default;
        };
      } else {
        def = function() {
          utils.assert(false, typeof a.default);
        };
      }
      var unsigned_long = a.type === "unsigned long";
      var signed_long = a.type === "long";
      var unsigned_fallback = a.type === "limited unsigned long with fallback";
      var min = a.min, max = a.max, setmin = a.setmin;
      if (min === void 0) {
        if (unsigned_long) min = 0;
        if (signed_long) min = -2147483648;
        if (unsigned_fallback) min = 1;
      }
      if (max === void 0) {
        if (unsigned_long || signed_long || unsigned_fallback) max = 2147483647;
      }
      return {
        get: function() {
          var v = this._getattr(a.name);
          var n = a.float ? parseFloat(v) : parseInt(v, 10);
          if (v === null || !isFinite(n) || min !== void 0 && n < min || max !== void 0 && n > max) {
            return def.call(this);
          }
          if (unsigned_long || signed_long || unsigned_fallback) {
            if (!/^[ \t\n\f\r]*[-+]?[0-9]/.test(v)) {
              return def.call(this);
            }
            n = n | 0;
          }
          return n;
        },
        set: function(v) {
          if (!a.float) {
            v = Math.floor(v);
          }
          if (setmin !== void 0 && v < setmin) {
            utils.IndexSizeError(a.name + " set to " + v);
          }
          if (unsigned_long) {
            v = v < 0 || v > 2147483647 ? def.call(this) : v | 0;
          } else if (unsigned_fallback) {
            v = v < 1 || v > 2147483647 ? def.call(this) : v | 0;
          } else if (signed_long) {
            v = v < -2147483648 || v > 2147483647 ? def.call(this) : v | 0;
          }
          this._setattr(a.name, String(v));
        }
      };
    }
    exports2.registerChangeHandler = function(c, name, handler) {
      var p = c.prototype;
      if (!Object.prototype.hasOwnProperty.call(p, "_attributeChangeHandlers")) {
        p._attributeChangeHandlers = Object.create(p._attributeChangeHandlers || null);
      }
      p._attributeChangeHandlers[name] = handler;
    };
  }
});

// packages/qwik-dom/lib/FilteredElementList.js
var require_FilteredElementList = __commonJS({
  "packages/qwik-dom/lib/FilteredElementList.js"(exports2, module2) {
    "use strict";
    module2.exports = FilteredElementList;
    var Node = require_Node();
    function FilteredElementList(root, filter) {
      this.root = root;
      this.filter = filter;
      this.lastModTime = root.lastModTime;
      this.done = false;
      this.cache = [];
      this.traverse();
    }
    FilteredElementList.prototype = Object.create(Object.prototype, {
      length: {
        get: function() {
          this.checkcache();
          if (!this.done) this.traverse();
          return this.cache.length;
        }
      },
      item: {
        value: function(n) {
          this.checkcache();
          if (!this.done && n >= this.cache.length) {
            this.traverse(
              /*n*/
            );
          }
          return this.cache[n];
        }
      },
      checkcache: {
        value: function() {
          if (this.lastModTime !== this.root.lastModTime) {
            for (var i = this.cache.length - 1; i >= 0; i--) {
              this[i] = void 0;
            }
            this.cache.length = 0;
            this.done = false;
            this.lastModTime = this.root.lastModTime;
          }
        }
      },
      // If n is specified, then traverse the tree until we've found the nth
      // item (or until we've found all items).  If n is not specified,
      // traverse until we've found all items.
      traverse: {
        value: function(n) {
          if (n !== void 0) n++;
          var elt;
          while ((elt = this.next()) !== null) {
            this[this.cache.length] = elt;
            this.cache.push(elt);
            if (n && this.cache.length === n) return;
          }
          this.done = true;
        }
      },
      // Return the next element under root that matches filter
      next: {
        value: function() {
          var start = this.cache.length === 0 ? this.root : this.cache[this.cache.length - 1];
          var elt;
          if (start.nodeType === Node.DOCUMENT_NODE) elt = start.documentElement;
          else elt = start.nextElement(this.root);
          while (elt) {
            if (this.filter(elt)) {
              return elt;
            }
            elt = elt.nextElement(this.root);
          }
          return null;
        }
      }
    });
  }
});

// packages/qwik-dom/lib/DOMTokenList.js
var require_DOMTokenList = __commonJS({
  "packages/qwik-dom/lib/DOMTokenList.js"(exports2, module2) {
    "use strict";
    var utils = require_utils();
    module2.exports = DOMTokenList;
    function DOMTokenList(getter, setter) {
      this._getString = getter;
      this._setString = setter;
      this._length = 0;
      this._lastStringValue = "";
      this._update();
    }
    Object.defineProperties(DOMTokenList.prototype, {
      length: {
        get: function() {
          return this._length;
        }
      },
      item: {
        value: function(index) {
          var list = getList(this);
          if (index < 0 || index >= list.length) {
            return null;
          }
          return list[index];
        }
      },
      contains: {
        value: function(token) {
          token = String(token);
          var list = getList(this);
          return list.indexOf(token) > -1;
        }
      },
      add: {
        value: function() {
          var list = getList(this);
          for (var i = 0, len = arguments.length; i < len; i++) {
            var token = handleErrors(arguments[i]);
            if (list.indexOf(token) < 0) {
              list.push(token);
            }
          }
          this._update(list);
        }
      },
      remove: {
        value: function() {
          var list = getList(this);
          for (var i = 0, len = arguments.length; i < len; i++) {
            var token = handleErrors(arguments[i]);
            var index = list.indexOf(token);
            if (index > -1) {
              list.splice(index, 1);
            }
          }
          this._update(list);
        }
      },
      toggle: {
        value: function toggle(token, force) {
          token = handleErrors(token);
          if (this.contains(token)) {
            if (force === void 0 || force === false) {
              this.remove(token);
              return false;
            }
            return true;
          } else {
            if (force === void 0 || force === true) {
              this.add(token);
              return true;
            }
            return false;
          }
        }
      },
      replace: {
        value: function replace(token, newToken) {
          if (String(newToken) === "") {
            utils.SyntaxError();
          }
          token = handleErrors(token);
          newToken = handleErrors(newToken);
          var list = getList(this);
          var idx = list.indexOf(token);
          if (idx < 0) {
            return false;
          }
          var idx2 = list.indexOf(newToken);
          if (idx2 < 0) {
            list[idx] = newToken;
          } else {
            if (idx < idx2) {
              list[idx] = newToken;
              list.splice(idx2, 1);
            } else {
              list.splice(idx, 1);
            }
          }
          this._update(list);
          return true;
        }
      },
      toString: {
        value: function() {
          return this._getString();
        }
      },
      value: {
        get: function() {
          return this._getString();
        },
        set: function(v) {
          this._setString(v);
          this._update();
        }
      },
      // Called when the setter is called from outside this interface.
      _update: {
        value: function(list) {
          if (list) {
            fixIndex(this, list);
            this._setString(list.join(" ").trim());
          } else {
            fixIndex(this, getList(this));
          }
          this._lastStringValue = this._getString();
        }
      }
    });
    function fixIndex(clist, list) {
      var oldLength = clist._length;
      var i;
      clist._length = list.length;
      for (i = 0; i < list.length; i++) {
        clist[i] = list[i];
      }
      for (; i < oldLength; i++) {
        clist[i] = void 0;
      }
    }
    function handleErrors(token) {
      token = String(token);
      if (token === "") {
        utils.SyntaxError();
      }
      if (/[ \t\r\n\f]/.test(token)) {
        utils.InvalidCharacterError();
      }
      return token;
    }
    function toArray(clist) {
      var length = clist._length;
      var arr = Array(length);
      for (var i = 0; i < length; i++) {
        arr[i] = clist[i];
      }
      return arr;
    }
    function getList(clist) {
      var strProp = clist._getString();
      if (strProp === clist._lastStringValue) {
        return toArray(clist);
      }
      var str = strProp.replace(/(^[ \t\r\n\f]+)|([ \t\r\n\f]+$)/g, "");
      if (str === "") {
        return [];
      } else {
        var seen = /* @__PURE__ */ Object.create(null);
        return str.split(/[ \t\r\n\f]+/g).filter(function(n) {
          var key = "$" + n;
          if (seen[key]) {
            return false;
          }
          seen[key] = true;
          return true;
        });
      }
    }
  }
});

// packages/qwik-dom/lib/select.js
var require_select = __commonJS({
  "packages/qwik-dom/lib/select.js"(exports2, module2) {
    "use strict";
    var window2 = Object.create(null, {
      location: {
        get: function() {
          throw new Error("window.location is not supported.");
        }
      }
    });
    var compareDocumentPosition = function(a, b) {
      return a.compareDocumentPosition(b);
    };
    var order = function(a, b) {
      return compareDocumentPosition(a, b) & 2 ? 1 : -1;
    };
    var next = function(el) {
      while ((el = el.nextSibling) && el.nodeType !== 1) ;
      return el;
    };
    var prev = function(el) {
      while ((el = el.previousSibling) && el.nodeType !== 1) ;
      return el;
    };
    var child = function(el) {
      if (el = el.firstChild) {
        while (el.nodeType !== 1 && (el = el.nextSibling)) ;
      }
      return el;
    };
    var lastChild = function(el) {
      if (el = el.lastChild) {
        while (el.nodeType !== 1 && (el = el.previousSibling)) ;
      }
      return el;
    };
    var parentIsElement = function(n) {
      if (!n.parentNode) {
        return false;
      }
      var nodeType = n.parentNode.nodeType;
      return nodeType === 1 || nodeType === 9;
    };
    var unquote = function(str) {
      if (!str) return str;
      var ch = str[0];
      if (ch === '"' || ch === "'") {
        if (str[str.length - 1] === ch) {
          str = str.slice(1, -1);
        } else {
          str = str.slice(1);
        }
        return str.replace(rules.str_escape, function(s) {
          var m = /^\\(?:([0-9A-Fa-f]+)|([\r\n\f]+))/.exec(s);
          if (!m) {
            return s.slice(1);
          }
          if (m[2]) {
            return "";
          }
          var cp = parseInt(m[1], 16);
          return String.fromCodePoint ? String.fromCodePoint(cp) : (
            // Not all JavaScript implementations have String.fromCodePoint yet.
            String.fromCharCode(cp)
          );
        });
      } else if (rules.ident.test(str)) {
        return decodeid(str);
      } else {
        return str;
      }
    };
    var decodeid = function(str) {
      return str.replace(rules.escape, function(s) {
        var m = /^\\([0-9A-Fa-f]+)/.exec(s);
        if (!m) {
          return s[1];
        }
        var cp = parseInt(m[1], 16);
        return String.fromCodePoint ? String.fromCodePoint(cp) : (
          // Not all JavaScript implementations have String.fromCodePoint yet.
          String.fromCharCode(cp)
        );
      });
    };
    var indexOf2 = function() {
      if (Array.prototype.indexOf) {
        return Array.prototype.indexOf;
      }
      return function(obj, item) {
        var i = this.length;
        while (i--) {
          if (this[i] === item) return i;
        }
        return -1;
      };
    }();
    var makeInside = function(start, end) {
      var regex = rules.inside.source.replace(/</g, start).replace(/>/g, end);
      return new RegExp(regex);
    };
    var replace = function(regex, name, val) {
      regex = regex.source;
      regex = regex.replace(name, val.source || val);
      return new RegExp(regex);
    };
    var truncateUrl = function(url, num) {
      return url.replace(/^(?:\w+:\/\/|\/+)/, "").replace(/(?:\/+|\/*#.*?)$/, "").split("/", num).join("/");
    };
    var parseNth = function(param_, test) {
      var param = param_.replace(/\s+/g, ""), cap;
      if (param === "even") {
        param = "2n+0";
      } else if (param === "odd") {
        param = "2n+1";
      } else if (param.indexOf("n") === -1) {
        param = "0n" + param;
      }
      cap = /^([+-])?(\d+)?n([+-])?(\d+)?$/.exec(param);
      return {
        group: cap[1] === "-" ? -(cap[2] || 1) : +(cap[2] || 1),
        offset: cap[4] ? cap[3] === "-" ? -cap[4] : +cap[4] : 0
      };
    };
    var nth = function(param_, test, last) {
      var param = parseNth(param_), group = param.group, offset = param.offset, find2 = !last ? child : lastChild, advance = !last ? next : prev;
      return function(el) {
        if (!parentIsElement(el)) return;
        var rel2 = find2(el.parentNode), pos = 0;
        while (rel2) {
          if (test(rel2, el)) pos++;
          if (rel2 === el) {
            pos -= offset;
            return group && pos ? pos % group === 0 && pos < 0 === group < 0 : !pos;
          }
          rel2 = advance(rel2);
        }
      };
    };
    var selectors = {
      "*": function() {
        if (false) {
          return function(el) {
            if (el.nodeType === 1) return true;
          };
        }
        return function() {
          return true;
        };
      }(),
      type: function(type) {
        type = type.toLowerCase();
        return function(el) {
          return el.nodeName.toLowerCase() === type;
        };
      },
      attr: function(key, op, val, i) {
        op = operators[op];
        return function(el) {
          var attr;
          switch (key) {
            case "for":
              attr = el.htmlFor;
              break;
            case "class":
              attr = el.className;
              if (attr === "" && el.getAttribute("class") == null) {
                attr = null;
              }
              break;
            case "href":
            case "src":
              attr = el.getAttribute(key, 2);
              break;
            case "title":
              attr = el.getAttribute("title") || null;
              break;
            // careful with attributes with special getter functions
            case "id":
            case "lang":
            case "dir":
            case "accessKey":
            case "hidden":
            case "tabIndex":
            case "style":
              if (el.getAttribute) {
                attr = el.getAttribute(key);
                break;
              }
            /* falls through */
            default:
              if (el.hasAttribute && !el.hasAttribute(key)) {
                break;
              }
              attr = el[key] != null ? el[key] : el.getAttribute && el.getAttribute(key);
              break;
          }
          if (attr == null) return;
          attr = attr + "";
          if (i) {
            attr = attr.toLowerCase();
            val = val.toLowerCase();
          }
          return op(attr, val);
        };
      },
      ":first-child": function(el) {
        return !prev(el) && parentIsElement(el);
      },
      ":last-child": function(el) {
        return !next(el) && parentIsElement(el);
      },
      ":only-child": function(el) {
        return !prev(el) && !next(el) && parentIsElement(el);
      },
      ":nth-child": function(param, last) {
        return nth(
          param,
          function() {
            return true;
          },
          last
        );
      },
      ":nth-last-child": function(param) {
        return selectors[":nth-child"](param, true);
      },
      ":root": function(el) {
        return el.ownerDocument.documentElement === el;
      },
      ":empty": function(el) {
        return !el.firstChild;
      },
      ":not": function(sel) {
        var test = compileGroup(sel);
        return function(el) {
          return !test(el);
        };
      },
      ":first-of-type": function(el) {
        if (!parentIsElement(el)) return;
        var type = el.nodeName;
        while (el = prev(el)) {
          if (el.nodeName === type) return;
        }
        return true;
      },
      ":last-of-type": function(el) {
        if (!parentIsElement(el)) return;
        var type = el.nodeName;
        while (el = next(el)) {
          if (el.nodeName === type) return;
        }
        return true;
      },
      ":only-of-type": function(el) {
        return selectors[":first-of-type"](el) && selectors[":last-of-type"](el);
      },
      ":nth-of-type": function(param, last) {
        return nth(
          param,
          function(rel2, el) {
            return rel2.nodeName === el.nodeName;
          },
          last
        );
      },
      ":nth-last-of-type": function(param) {
        return selectors[":nth-of-type"](param, true);
      },
      ":checked": function(el) {
        return !!(el.checked || el.selected);
      },
      ":indeterminate": function(el) {
        return !selectors[":checked"](el);
      },
      ":enabled": function(el) {
        return !el.disabled && el.type !== "hidden";
      },
      ":disabled": function(el) {
        return !!el.disabled;
      },
      ":target": function(el) {
        return el.id === window2.location.hash.substring(1);
      },
      ":focus": function(el) {
        return el === el.ownerDocument.activeElement;
      },
      ":is": function(sel) {
        return compileGroup(sel);
      },
      // :matches is an older name for :is; see
      // https://github.com/w3c/csswg-drafts/issues/3258
      ":matches": function(sel) {
        return selectors[":is"](sel);
      },
      ":nth-match": function(param, last) {
        var args = param.split(/\s*,\s*/), arg = args.shift(), test = compileGroup(args.join(","));
        return nth(arg, test, last);
      },
      ":nth-last-match": function(param) {
        return selectors[":nth-match"](param, true);
      },
      ":links-here": function(el) {
        return el + "" === window2.location + "";
      },
      ":lang": function(param) {
        return function(el) {
          while (el) {
            if (el.lang) return el.lang.indexOf(param) === 0;
            el = el.parentNode;
          }
        };
      },
      ":dir": function(param) {
        return function(el) {
          while (el) {
            if (el.dir) return el.dir === param;
            el = el.parentNode;
          }
        };
      },
      ":scope": function(el, con) {
        var context = con || el.ownerDocument;
        if (context.nodeType === 9) {
          return el === context.documentElement;
        }
        return el === context;
      },
      ":any-link": function(el) {
        return typeof el.href === "string";
      },
      ":local-link": function(el) {
        if (el.nodeName) {
          return el.href && el.host === window2.location.host;
        }
        var param = +el + 1;
        return function(el2) {
          if (!el2.href) return;
          var url = window2.location + "", href = el2 + "";
          return truncateUrl(url, param) === truncateUrl(href, param);
        };
      },
      ":default": function(el) {
        return !!el.defaultSelected;
      },
      ":valid": function(el) {
        return el.willValidate || el.validity && el.validity.valid;
      },
      ":invalid": function(el) {
        return !selectors[":valid"](el);
      },
      ":in-range": function(el) {
        return el.value > el.min && el.value <= el.max;
      },
      ":out-of-range": function(el) {
        return !selectors[":in-range"](el);
      },
      ":required": function(el) {
        return !!el.required;
      },
      ":optional": function(el) {
        return !el.required;
      },
      ":read-only": function(el) {
        if (el.readOnly) return true;
        var attr = el.getAttribute("contenteditable"), prop = el.contentEditable, name = el.nodeName.toLowerCase();
        name = name !== "input" && name !== "textarea";
        return (name || el.disabled) && attr == null && prop !== "true";
      },
      ":read-write": function(el) {
        return !selectors[":read-only"](el);
      },
      ":hover": function() {
        throw new Error(":hover is not supported.");
      },
      ":active": function() {
        throw new Error(":active is not supported.");
      },
      ":link": function() {
        throw new Error(":link is not supported.");
      },
      ":visited": function() {
        throw new Error(":visited is not supported.");
      },
      ":column": function() {
        throw new Error(":column is not supported.");
      },
      ":nth-column": function() {
        throw new Error(":nth-column is not supported.");
      },
      ":nth-last-column": function() {
        throw new Error(":nth-last-column is not supported.");
      },
      ":current": function() {
        throw new Error(":current is not supported.");
      },
      ":past": function() {
        throw new Error(":past is not supported.");
      },
      ":future": function() {
        throw new Error(":future is not supported.");
      },
      // Non-standard, for compatibility purposes.
      ":contains": function(param) {
        return function(el) {
          var text = el.innerText || el.textContent || el.value || "";
          return text.indexOf(param) !== -1;
        };
      },
      ":has": function(param) {
        return function(el) {
          return find(param, el).length > 0;
        };
      }
      // Potentially add more pseudo selectors for
      // compatibility with sizzle and most other
      // selector engines (?).
    };
    var operators = {
      "-": function() {
        return true;
      },
      "=": function(attr, val) {
        return attr === val;
      },
      "*=": function(attr, val) {
        return attr.indexOf(val) !== -1;
      },
      "~=": function(attr, val) {
        var i, s, f, l;
        for (s = 0; true; s = i + 1) {
          i = attr.indexOf(val, s);
          if (i === -1) return false;
          f = attr[i - 1];
          l = attr[i + val.length];
          if ((!f || f === " ") && (!l || l === " ")) return true;
        }
      },
      "|=": function(attr, val) {
        var i = attr.indexOf(val), l;
        if (i !== 0) return;
        l = attr[i + val.length];
        return l === "-" || !l;
      },
      "^=": function(attr, val) {
        return attr.indexOf(val) === 0;
      },
      "$=": function(attr, val) {
        var i = attr.lastIndexOf(val);
        return i !== -1 && i + val.length === attr.length;
      },
      // non-standard
      "!=": function(attr, val) {
        return attr !== val;
      }
    };
    var combinators = {
      " ": function(test) {
        return function(el) {
          while (el = el.parentNode) {
            if (test(el)) return el;
          }
        };
      },
      ">": function(test) {
        return function(el) {
          if (el = el.parentNode) {
            return test(el) && el;
          }
        };
      },
      "+": function(test) {
        return function(el) {
          if (el = prev(el)) {
            return test(el) && el;
          }
        };
      },
      "~": function(test) {
        return function(el) {
          while (el = prev(el)) {
            if (test(el)) return el;
          }
        };
      },
      noop: function(test) {
        return function(el) {
          return test(el) && el;
        };
      },
      ref: function(test, name) {
        var node;
        function ref(el) {
          var doc2 = el.ownerDocument, nodes = doc2.getElementsByTagName("*"), i = nodes.length;
          while (i--) {
            node = nodes[i];
            if (ref.test(el)) {
              node = null;
              return true;
            }
          }
          node = null;
        }
        ref.combinator = function(el) {
          if (!node || !node.getAttribute) return;
          var attr = node.getAttribute(name) || "";
          if (attr[0] === "#") attr = attr.substring(1);
          if (attr === el.id && test(node)) {
            return node;
          }
        };
        return ref;
      }
    };
    var rules = {
      escape: /\\(?:[^0-9A-Fa-f\r\n]|[0-9A-Fa-f]{1,6}[\r\n\t ]?)/g,
      str_escape: /(escape)|\\(\n|\r\n?|\f)/g,
      nonascii: /[\u00A0-\uFFFF]/,
      cssid: /(?:(?!-?[0-9])(?:escape|nonascii|[-_a-zA-Z0-9])+)/,
      qname: /^ *(cssid|\*)/,
      simple: /^(?:([.#]cssid)|pseudo|attr)/,
      ref: /^ *\/(cssid)\/ */,
      combinator: /^(?: +([^ \w*.#\\]) +|( )+|([^ \w*.#\\]))(?! *$)/,
      attr: /^\[(cssid)(?:([^\w]?=)(inside))?\]/,
      pseudo: /^(:cssid)(?:\((inside)\))?/,
      inside: /(?:"(?:\\"|[^"])*"|'(?:\\'|[^'])*'|<[^"'>]*>|\\["'>]|[^"'>])*/,
      ident: /^(cssid)$/
    };
    rules.cssid = replace(rules.cssid, "nonascii", rules.nonascii);
    rules.cssid = replace(rules.cssid, "escape", rules.escape);
    rules.qname = replace(rules.qname, "cssid", rules.cssid);
    rules.simple = replace(rules.simple, "cssid", rules.cssid);
    rules.ref = replace(rules.ref, "cssid", rules.cssid);
    rules.attr = replace(rules.attr, "cssid", rules.cssid);
    rules.pseudo = replace(rules.pseudo, "cssid", rules.cssid);
    rules.inside = replace(rules.inside, `[^"'>]*`, rules.inside);
    rules.attr = replace(rules.attr, "inside", makeInside("\\[", "\\]"));
    rules.pseudo = replace(rules.pseudo, "inside", makeInside("\\(", "\\)"));
    rules.simple = replace(rules.simple, "pseudo", rules.pseudo);
    rules.simple = replace(rules.simple, "attr", rules.attr);
    rules.ident = replace(rules.ident, "cssid", rules.cssid);
    rules.str_escape = replace(rules.str_escape, "escape", rules.escape);
    var compile = function(sel_) {
      var sel = sel_.replace(/^\s+|\s+$/g, ""), test, filter = [], buff = [], subject, qname, cap, op, ref;
      while (sel) {
        if (cap = rules.qname.exec(sel)) {
          sel = sel.substring(cap[0].length);
          qname = decodeid(cap[1]);
          buff.push(tok(qname, true));
        } else if (cap = rules.simple.exec(sel)) {
          sel = sel.substring(cap[0].length);
          qname = "*";
          buff.push(tok(qname, true));
          buff.push(tok(cap));
        } else {
          throw new SyntaxError("Invalid selector.");
        }
        while (cap = rules.simple.exec(sel)) {
          sel = sel.substring(cap[0].length);
          buff.push(tok(cap));
        }
        if (sel[0] === "!") {
          sel = sel.substring(1);
          subject = makeSubject();
          subject.qname = qname;
          buff.push(subject.simple);
        }
        if (cap = rules.ref.exec(sel)) {
          sel = sel.substring(cap[0].length);
          ref = combinators.ref(makeSimple(buff), decodeid(cap[1]));
          filter.push(ref.combinator);
          buff = [];
          continue;
        }
        if (cap = rules.combinator.exec(sel)) {
          sel = sel.substring(cap[0].length);
          op = cap[1] || cap[2] || cap[3];
          if (op === ",") {
            filter.push(combinators.noop(makeSimple(buff)));
            break;
          }
        } else {
          op = "noop";
        }
        if (!combinators[op]) {
          throw new SyntaxError("Bad combinator.");
        }
        filter.push(combinators[op](makeSimple(buff)));
        buff = [];
      }
      test = makeTest(filter);
      test.qname = qname;
      test.sel = sel;
      if (subject) {
        subject.lname = test.qname;
        subject.test = test;
        subject.qname = subject.qname;
        subject.sel = test.sel;
        test = subject;
      }
      if (ref) {
        ref.test = test;
        ref.qname = test.qname;
        ref.sel = test.sel;
        test = ref;
      }
      return test;
    };
    var tok = function(cap, qname) {
      if (qname) {
        return cap === "*" ? selectors["*"] : selectors.type(cap);
      }
      if (cap[1]) {
        return cap[1][0] === "." ? (
          // XXX unescape here?  or in attr?
          selectors.attr("class", "~=", decodeid(cap[1].substring(1)), false)
        ) : selectors.attr("id", "=", decodeid(cap[1].substring(1)), false);
      }
      if (cap[2]) {
        return cap[3] ? selectors[decodeid(cap[2])](unquote(cap[3])) : selectors[decodeid(cap[2])];
      }
      if (cap[4]) {
        var value = cap[6];
        var i = /["'\s]\s*I$/i.test(value);
        if (i) {
          value = value.replace(/\s*I$/i, "");
        }
        return selectors.attr(decodeid(cap[4]), cap[5] || "-", unquote(value), i);
      }
      throw new SyntaxError("Unknown Selector.");
    };
    var makeSimple = function(func) {
      var l = func.length, i;
      if (l < 2) return func[0];
      return function(el) {
        if (!el) return;
        for (i = 0; i < l; i++) {
          if (!func[i](el)) return;
        }
        return true;
      };
    };
    var makeTest = function(func) {
      if (func.length < 2) {
        return function(el) {
          return !!func[0](el);
        };
      }
      return function(el) {
        var i = func.length;
        while (i--) {
          if (!(el = func[i](el))) return;
        }
        return true;
      };
    };
    var makeSubject = function() {
      var target;
      function subject(el) {
        var node = el.ownerDocument, scope = node.getElementsByTagName(subject.lname), i = scope.length;
        while (i--) {
          if (subject.test(scope[i]) && target === el) {
            target = null;
            return true;
          }
        }
        target = null;
      }
      subject.simple = function(el) {
        target = el;
        return true;
      };
      return subject;
    };
    var compileGroup = function(sel) {
      var test = compile(sel), tests = [test];
      while (test.sel) {
        test = compile(test.sel);
        tests.push(test);
      }
      if (tests.length < 2) return test;
      return function(el) {
        var l = tests.length, i = 0;
        for (; i < l; i++) {
          if (tests[i](el)) return true;
        }
      };
    };
    var find = function(sel, node) {
      var results = [], test = compile(sel), scope = node.getElementsByTagName(test.qname), i = 0, el;
      while (el = scope[i++]) {
        if (test(el)) results.push(el);
      }
      if (test.sel) {
        while (test.sel) {
          test = compile(test.sel);
          scope = node.getElementsByTagName(test.qname);
          i = 0;
          while (el = scope[i++]) {
            if (test(el) && indexOf2.call(results, el) === -1) {
              results.push(el);
            }
          }
        }
        results.sort(order);
      }
      return results;
    };
    module2.exports = exports2 = function(sel, context) {
      var id, r;
      if (context.nodeType !== 11 && sel.indexOf(" ") === -1) {
        if (sel[0] === "#" && context.rooted && /^#[A-Z_][-A-Z0-9_]*$/i.test(sel)) {
          if (context.doc._hasMultipleElementsWithId) {
            id = sel.substring(1);
            if (!context.doc._hasMultipleElementsWithId(id)) {
              r = context.doc.getElementById(id);
              return r ? [r] : [];
            }
          }
        }
        if (sel[0] === "." && /^\.\w+$/.test(sel)) {
          return context.getElementsByClassName(sel.substring(1));
        }
        if (/^\w+$/.test(sel)) {
          return context.getElementsByTagName(sel);
        }
      }
      return find(sel, context);
    };
    exports2.selectors = selectors;
    exports2.operators = operators;
    exports2.combinators = combinators;
    exports2.matches = function(el, sel) {
      var test = { sel };
      do {
        test = compile(test.sel);
        if (test(el)) {
          return true;
        }
      } while (test.sel);
      return false;
    };
  }
});

// packages/qwik-dom/lib/ChildNode.js
var require_ChildNode = __commonJS({
  "packages/qwik-dom/lib/ChildNode.js"(exports2, module2) {
    "use strict";
    var Node = require_Node();
    var LinkedList = require_LinkedList();
    var createDocumentFragmentFromArguments = function(document2, args) {
      var docFrag = document2.createDocumentFragment();
      for (var i = 0; i < args.length; i++) {
        var argItem = args[i];
        var isNode3 = argItem instanceof Node;
        docFrag.appendChild(isNode3 ? argItem : document2.createTextNode(String(argItem)));
      }
      return docFrag;
    };
    var ChildNode = {
      // Inserts a set of Node or String objects in the children list of this
      // ChildNode's parent, just after this ChildNode.  String objects are
      // inserted as the equivalent Text nodes.
      after: {
        value: function after() {
          var argArr = Array.prototype.slice.call(arguments);
          var parentNode = this.parentNode, nextSibling = this.nextSibling;
          if (parentNode === null) {
            return;
          }
          while (nextSibling && argArr.some(function(v) {
            return v === nextSibling;
          }))
            nextSibling = nextSibling.nextSibling;
          var docFrag = createDocumentFragmentFromArguments(this.doc, argArr);
          parentNode.insertBefore(docFrag, nextSibling);
        }
      },
      // Inserts a set of Node or String objects in the children list of this
      // ChildNode's parent, just before this ChildNode.  String objects are
      // inserted as the equivalent Text nodes.
      before: {
        value: function before() {
          var argArr = Array.prototype.slice.call(arguments);
          var parentNode = this.parentNode, prevSibling = this.previousSibling;
          if (parentNode === null) {
            return;
          }
          while (prevSibling && argArr.some(function(v) {
            return v === prevSibling;
          }))
            prevSibling = prevSibling.previousSibling;
          var docFrag = createDocumentFragmentFromArguments(this.doc, argArr);
          var nextSibling = prevSibling ? prevSibling.nextSibling : parentNode.firstChild;
          parentNode.insertBefore(docFrag, nextSibling);
        }
      },
      // Remove this node from its parent
      remove: {
        value: function remove() {
          if (this.parentNode === null) return;
          if (this.doc) {
            this.doc._preremoveNodeIterators(this);
            if (this.rooted) {
              this.doc.mutateRemove(this);
            }
          }
          this._remove();
          this.parentNode = null;
        }
      },
      // Remove this node w/o uprooting or sending mutation events
      // (But do update the structure id for all ancestors)
      _remove: {
        value: function _remove() {
          var parent = this.parentNode;
          if (parent === null) return;
          if (parent._childNodes) {
            parent._childNodes.splice(this.index, 1);
          } else if (parent._firstChild === this) {
            if (this._nextSibling === this) {
              parent._firstChild = null;
            } else {
              parent._firstChild = this._nextSibling;
            }
          }
          LinkedList.remove(this);
          parent.modify();
        }
      },
      // Replace this node with the nodes or strings provided as arguments.
      replaceWith: {
        value: function replaceWith() {
          var argArr = Array.prototype.slice.call(arguments);
          var parentNode = this.parentNode, nextSibling = this.nextSibling;
          if (parentNode === null) {
            return;
          }
          while (nextSibling && argArr.some(function(v) {
            return v === nextSibling;
          }))
            nextSibling = nextSibling.nextSibling;
          var docFrag = createDocumentFragmentFromArguments(this.doc, argArr);
          if (this.parentNode === parentNode) {
            parentNode.replaceChild(docFrag, this);
          } else {
            parentNode.insertBefore(docFrag, nextSibling);
          }
        }
      }
    };
    module2.exports = ChildNode;
  }
});

// packages/qwik-dom/lib/NonDocumentTypeChildNode.js
var require_NonDocumentTypeChildNode = __commonJS({
  "packages/qwik-dom/lib/NonDocumentTypeChildNode.js"(exports2, module2) {
    "use strict";
    var Node = require_Node();
    var NonDocumentTypeChildNode = {
      nextElementSibling: {
        get: function() {
          if (this.parentNode) {
            for (var kid = this.nextSibling; kid !== null; kid = kid.nextSibling) {
              if (kid.nodeType === Node.ELEMENT_NODE) return kid;
            }
          }
          return null;
        }
      },
      previousElementSibling: {
        get: function() {
          if (this.parentNode) {
            for (var kid = this.previousSibling; kid !== null; kid = kid.previousSibling) {
              if (kid.nodeType === Node.ELEMENT_NODE) return kid;
            }
          }
          return null;
        }
      }
    };
    module2.exports = NonDocumentTypeChildNode;
  }
});

// packages/qwik-dom/lib/NamedNodeMap.js
var require_NamedNodeMap = __commonJS({
  "packages/qwik-dom/lib/NamedNodeMap.js"(exports2, module2) {
    "use strict";
    module2.exports = NamedNodeMap;
    var utils = require_utils();
    function NamedNodeMap(element) {
      this.element = element;
    }
    Object.defineProperties(NamedNodeMap.prototype, {
      length: { get: utils.shouldOverride },
      item: { value: utils.shouldOverride },
      getNamedItem: {
        value: function getNamedItem(qualifiedName) {
          return this.element.getAttributeNode(qualifiedName);
        }
      },
      getNamedItemNS: {
        value: function getNamedItemNS(namespace, localName) {
          return this.element.getAttributeNodeNS(namespace, localName);
        }
      },
      setNamedItem: { value: utils.nyi },
      setNamedItemNS: { value: utils.nyi },
      removeNamedItem: {
        value: function removeNamedItem(qualifiedName) {
          var attr = this.element.getAttributeNode(qualifiedName);
          if (attr) {
            this.element.removeAttribute(qualifiedName);
            return attr;
          }
          utils.NotFoundError();
        }
      },
      removeNamedItemNS: {
        value: function removeNamedItemNS(ns, lname) {
          var attr = this.element.getAttributeNodeNS(ns, lname);
          if (attr) {
            this.element.removeAttributeNS(ns, lname);
            return attr;
          }
          utils.NotFoundError();
        }
      }
    });
  }
});

// packages/qwik-dom/lib/Element.js
var require_Element = __commonJS({
  "packages/qwik-dom/lib/Element.js"(exports2, module2) {
    "use strict";
    module2.exports = Element;
    var xml = require_xmlnames();
    var utils = require_utils();
    var NAMESPACE = utils.NAMESPACE;
    var attributes = require_attributes();
    var Node = require_Node();
    var NodeList = require_NodeList();
    var NodeUtils = require_NodeUtils();
    var FilteredElementList = require_FilteredElementList();
    var DOMException = require_DOMException();
    var DOMTokenList = require_DOMTokenList();
    var select = require_select();
    var ContainerNode = require_ContainerNode();
    var ChildNode = require_ChildNode();
    var NonDocumentTypeChildNode = require_NonDocumentTypeChildNode();
    var NamedNodeMap = require_NamedNodeMap();
    var uppercaseCache = /* @__PURE__ */ Object.create(null);
    function Element(doc2, localName, namespaceURI, prefix) {
      ContainerNode.call(this);
      this.nodeType = Node.ELEMENT_NODE;
      this.ownerDocument = doc2;
      this.localName = localName;
      this.namespaceURI = namespaceURI;
      this.prefix = prefix;
      this._tagName = void 0;
      this._attrsByQName = /* @__PURE__ */ Object.create(null);
      this._attrsByLName = /* @__PURE__ */ Object.create(null);
      this._attrKeys = [];
    }
    function recursiveGetText(node, a) {
      if (node.nodeType === Node.TEXT_NODE) {
        a.push(node._data);
      } else {
        for (var i = 0, n = node.childNodes.length; i < n; i++) recursiveGetText(node.childNodes[i], a);
      }
    }
    Element.prototype = Object.create(ContainerNode.prototype, {
      isHTML: {
        get: function isHTML() {
          return this.namespaceURI === NAMESPACE.HTML && this.ownerDocument.isHTML;
        }
      },
      tagName: {
        get: function tagName() {
          if (this._tagName === void 0) {
            var tn;
            if (this.prefix === null) {
              tn = this.localName;
            } else {
              tn = this.prefix + ":" + this.localName;
            }
            if (this.isHTML) {
              var up = uppercaseCache[tn];
              if (!up) {
                uppercaseCache[tn] = up = utils.toASCIIUpperCase(tn);
              }
              tn = up;
            }
            this._tagName = tn;
          }
          return this._tagName;
        }
      },
      nodeName: {
        get: function() {
          return this.tagName;
        }
      },
      nodeValue: {
        get: function() {
          return null;
        },
        set: function() {
        }
      },
      textContent: {
        get: function() {
          var strings = [];
          recursiveGetText(this, strings);
          return strings.join("");
        },
        set: function(newtext) {
          this.removeChildren();
          if (newtext !== null && newtext !== void 0 && newtext !== "") {
            this._appendChild(this.ownerDocument.createTextNode(newtext));
          }
        }
      },
      innerHTML: {
        get: function() {
          return this.serialize();
        },
        set: function(v) {
          var parser = this.ownerDocument.implementation.mozHTMLParser(
            this.ownerDocument._address,
            this
          );
          parser.parse(v === null ? "" : String(v), true);
          var target = this;
          while (target.hasChildNodes())
            target.removeChild(target.firstChild);
          target.appendChild(parser._asDocumentFragment());
        }
      },
      outerHTML: {
        get: function() {
          return NodeUtils.serializeOne(this, { nodeType: 0 });
        },
        set: function(v) {
          var document2 = this.ownerDocument;
          var parent = this.parentNode;
          if (parent === null) {
            return;
          }
          if (parent.nodeType === Node.DOCUMENT_NODE) {
            utils.NoModificationAllowedError();
          }
          if (parent.nodeType === Node.DOCUMENT_FRAGMENT_NODE) {
            parent = parent.ownerDocument.createElement("body");
          }
          var parser = document2.implementation.mozHTMLParser(document2._address, parent);
          parser.parse(v === null ? "" : String(v), true);
          this.replaceWith(parser._asDocumentFragment());
        }
      },
      _insertAdjacent: {
        value: function _insertAdjacent(position, node) {
          var first = false;
          switch (position) {
            case "beforebegin":
              first = true;
            /* falls through */
            case "afterend":
              var parent = this.parentNode;
              if (parent === null) {
                return null;
              }
              return parent.insertBefore(node, first ? this : this.nextSibling);
            case "afterbegin":
              first = true;
            /* falls through */
            case "beforeend":
              return this.insertBefore(node, first ? this.firstChild : null);
            default:
              return utils.SyntaxError();
          }
        }
      },
      insertAdjacentElement: {
        value: function insertAdjacentElement(position, element) {
          if (element.nodeType !== Node.ELEMENT_NODE) {
            throw new TypeError("not an element");
          }
          position = utils.toASCIILowerCase(String(position));
          return this._insertAdjacent(position, element);
        }
      },
      insertAdjacentText: {
        value: function insertAdjacentText(position, data) {
          var textNode = this.ownerDocument.createTextNode(data);
          position = utils.toASCIILowerCase(String(position));
          this._insertAdjacent(position, textNode);
        }
      },
      insertAdjacentHTML: {
        value: function insertAdjacentHTML(position, text) {
          position = utils.toASCIILowerCase(String(position));
          text = String(text);
          var context;
          switch (position) {
            case "beforebegin":
            case "afterend":
              context = this.parentNode;
              if (context === null || context.nodeType === Node.DOCUMENT_NODE) {
                utils.NoModificationAllowedError();
              }
              break;
            case "afterbegin":
            case "beforeend":
              context = this;
              break;
            default:
              utils.SyntaxError();
          }
          if (!(context instanceof Element) || context.ownerDocument.isHTML && context.localName === "html" && context.namespaceURI === NAMESPACE.HTML) {
            context = context.ownerDocument.createElementNS(NAMESPACE.HTML, "body");
          }
          var parser = this.ownerDocument.implementation.mozHTMLParser(
            this.ownerDocument._address,
            context
          );
          parser.parse(text, true);
          this._insertAdjacent(position, parser._asDocumentFragment());
        }
      },
      children: {
        get: function() {
          if (!this._children) {
            this._children = new ChildrenCollection(this);
          }
          return this._children;
        }
      },
      attributes: {
        get: function() {
          if (!this._attributes) {
            this._attributes = new AttributesArray(this);
          }
          return this._attributes;
        }
      },
      firstElementChild: {
        get: function() {
          for (var kid = this.firstChild; kid !== null; kid = kid.nextSibling) {
            if (kid.nodeType === Node.ELEMENT_NODE) return kid;
          }
          return null;
        }
      },
      lastElementChild: {
        get: function() {
          for (var kid = this.lastChild; kid !== null; kid = kid.previousSibling) {
            if (kid.nodeType === Node.ELEMENT_NODE) return kid;
          }
          return null;
        }
      },
      childElementCount: {
        get: function() {
          return this.children.length;
        }
      },
      // Return the next element, in source order, after this one or
      // null if there are no more.  If root element is specified,
      // then don't traverse beyond its subtree.
      //
      // This is not a DOM method, but is convenient for
      // lazy traversals of the tree.
      nextElement: {
        value: function(root) {
          if (!root) root = this.ownerDocument.documentElement;
          var next = this.firstElementChild;
          if (!next) {
            if (this === root) return null;
            next = this.nextElementSibling;
          }
          if (next) return next;
          for (var parent = this.parentElement; parent && parent !== root; parent = parent.parentElement) {
            next = parent.nextElementSibling;
            if (next) return next;
          }
          return null;
        }
      },
      // XXX:
      // Tests are currently failing for this function.
      // Awaiting resolution of:
      // http://lists.w3.org/Archives/Public/www-dom/2011JulSep/0016.html
      getElementsByTagName: {
        value: function getElementsByTagName(lname) {
          var filter;
          if (!lname) return new NodeList();
          if (lname === "*")
            filter = function() {
              return true;
            };
          else if (this.isHTML) filter = htmlLocalNameElementFilter(lname);
          else filter = localNameElementFilter(lname);
          return new FilteredElementList(this, filter);
        }
      },
      getElementsByTagNameNS: {
        value: function getElementsByTagNameNS(ns, lname) {
          var filter;
          if (ns === "*" && lname === "*")
            filter = function() {
              return true;
            };
          else if (ns === "*") filter = localNameElementFilter(lname);
          else if (lname === "*") filter = namespaceElementFilter(ns);
          else filter = namespaceLocalNameElementFilter(ns, lname);
          return new FilteredElementList(this, filter);
        }
      },
      getElementsByClassName: {
        value: function getElementsByClassName(names) {
          names = String(names).trim();
          if (names === "") {
            var result = new NodeList();
            return result;
          }
          names = names.split(/[ \t\r\n\f]+/);
          return new FilteredElementList(this, classNamesElementFilter(names));
        }
      },
      getElementsByName: {
        value: function getElementsByName(name) {
          return new FilteredElementList(this, elementNameFilter(String(name)));
        }
      },
      // Utility methods used by the public API methods above
      clone: {
        value: function clone() {
          var e;
          if (this.namespaceURI !== NAMESPACE.HTML || this.prefix || !this.ownerDocument.isHTML) {
            e = this.ownerDocument.createElementNS(
              this.namespaceURI,
              this.prefix !== null ? this.prefix + ":" + this.localName : this.localName
            );
          } else {
            e = this.ownerDocument.createElement(this.localName);
          }
          for (var i = 0, n = this._attrKeys.length; i < n; i++) {
            var lname = this._attrKeys[i];
            var a = this._attrsByLName[lname];
            var b = a.cloneNode();
            b._setOwnerElement(e);
            e._attrsByLName[lname] = b;
            e._addQName(b);
          }
          e._attrKeys = this._attrKeys.concat();
          return e;
        }
      },
      isEqual: {
        value: function isEqual(that) {
          if (this.localName !== that.localName || this.namespaceURI !== that.namespaceURI || this.prefix !== that.prefix || this._numattrs !== that._numattrs)
            return false;
          for (var i = 0, n = this._numattrs; i < n; i++) {
            var a = this._attr(i);
            if (!that.hasAttributeNS(a.namespaceURI, a.localName)) return false;
            if (that.getAttributeNS(a.namespaceURI, a.localName) !== a.value) return false;
          }
          return true;
        }
      },
      // This is the 'locate a namespace prefix' algorithm from the
      // DOM specification.  It is used by Node.lookupPrefix()
      // (Be sure to compare DOM3 and DOM4 versions of spec.)
      _lookupNamespacePrefix: {
        value: function _lookupNamespacePrefix(ns, originalElement) {
          if (this.namespaceURI && this.namespaceURI === ns && this.prefix !== null && originalElement.lookupNamespaceURI(this.prefix) === ns) {
            return this.prefix;
          }
          for (var i = 0, n = this._numattrs; i < n; i++) {
            var a = this._attr(i);
            if (a.prefix === "xmlns" && a.value === ns && originalElement.lookupNamespaceURI(a.localName) === ns) {
              return a.localName;
            }
          }
          var parent = this.parentElement;
          return parent ? parent._lookupNamespacePrefix(ns, originalElement) : null;
        }
      },
      // This is the 'locate a namespace' algorithm for Element nodes
      // from the DOM Core spec.  It is used by Node#lookupNamespaceURI()
      lookupNamespaceURI: {
        value: function lookupNamespaceURI(prefix) {
          if (prefix === "" || prefix === void 0) {
            prefix = null;
          }
          if (this.namespaceURI !== null && this.prefix === prefix) return this.namespaceURI;
          for (var i = 0, n = this._numattrs; i < n; i++) {
            var a = this._attr(i);
            if (a.namespaceURI === NAMESPACE.XMLNS) {
              if (a.prefix === "xmlns" && a.localName === prefix || prefix === null && a.prefix === null && a.localName === "xmlns") {
                return a.value || null;
              }
            }
          }
          var parent = this.parentElement;
          return parent ? parent.lookupNamespaceURI(prefix) : null;
        }
      },
      //
      // Attribute handling methods and utilities
      //
      /*
       * Attributes in the DOM are tricky:
       *
       * - there are the 8 basic get/set/has/removeAttribute{NS} methods
       *
       * - but many HTML attributes are also 'reflected' through IDL
       *   attributes which means that they can be queried and set through
       *   regular properties of the element.  There is just one attribute
       *   value, but two ways to get and set it.
       *
       * - Different HTML element types have different sets of reflected
         attributes.
       *
       * - attributes can also be queried and set through the .attributes
       *   property of an element.  This property behaves like an array of
       *   Attr objects.  The value property of each Attr is writeable, so
       *   this is a third way to read and write attributes.
       *
       * - for efficiency, we really want to store attributes in some kind
       *   of name->attr map.  But the attributes[] array is an array, not a
       *   map, which is kind of unnatural.
       *
       * - When using namespaces and prefixes, and mixing the NS methods
       *   with the non-NS methods, it is apparently actually possible for
       *   an attributes[] array to have more than one attribute with the
       *   same qualified name.  And certain methods must operate on only
       *   the first attribute with such a name.  So for these methods, an
       *   inefficient array-like data structure would be easier to
       *   implement.
       *
       * - The attributes[] array is live, not a snapshot, so changes to the
       *   attributes must be immediately visible through existing arrays.
       *
       * - When attributes are queried and set through IDL properties
       *   (instead of the get/setAttributes() method or the attributes[]
       *   array) they may be subject to type conversions, URL
       *   normalization, etc., so some extra processing is required in that
       *   case.
       *
       * - But access through IDL properties is probably the most common
       *   case, so we'd like that to be as fast as possible.
       *
       * - We can't just store attribute values in their parsed idl form,
       *   because setAttribute() has to return whatever string is passed to
       *   getAttribute even if it is not a legal, parseable value. So
       *   attribute values must be stored in unparsed string form.
       *
       * - We need to be able to send change notifications or mutation
       *   events of some sort to the renderer whenever an attribute value
       *   changes, regardless of the way in which it changes.
       *
       * - Some attributes, such as id and class affect other parts of the
       *   DOM API, like getElementById and getElementsByClassName and so
       *   for efficiency, we need to specially track changes to these
       *   special attributes.
       *
       * - Some attributes like class have different names (className) when
       *   reflected.
       *
       * - Attributes whose names begin with the string 'data-' are treated
         specially.
       *
       * - Reflected attributes that have a boolean type in IDL have special
       *   behavior: setting them to false (in IDL) is the same as removing
       *   them with removeAttribute()
       *
       * - numeric attributes (like HTMLElement.tabIndex) can have default
       *   values that must be returned by the idl getter even if the
       *   content attribute does not exist. (The default tabIndex value
       *   actually varies based on the type of the element, so that is a
       *   tricky one).
       *
       * See
       * http://www.whatwg.org/specs/web-apps/current-work/multipage/urls.html#reflect
       * for rules on how attributes are reflected.
       *
       */
      getAttribute: {
        value: function getAttribute(qname) {
          var attr = this.getAttributeNode(qname);
          return attr ? attr.value : null;
        }
      },
      getAttributeNS: {
        value: function getAttributeNS(ns, lname) {
          var attr = this.getAttributeNodeNS(ns, lname);
          return attr ? attr.value : null;
        }
      },
      getAttributeNode: {
        value: function getAttributeNode(qname) {
          qname = String(qname);
          if (/[A-Z]/.test(qname) && this.isHTML) qname = utils.toASCIILowerCase(qname);
          var attr = this._attrsByQName[qname];
          if (!attr) return null;
          if (Array.isArray(attr))
            attr = attr[0];
          return attr;
        }
      },
      getAttributeNodeNS: {
        value: function getAttributeNodeNS(ns, lname) {
          ns = ns === void 0 || ns === null ? "" : String(ns);
          lname = String(lname);
          var attr = this._attrsByLName[ns + "|" + lname];
          return attr ? attr : null;
        }
      },
      hasAttribute: {
        value: function hasAttribute(qname) {
          qname = String(qname);
          if (/[A-Z]/.test(qname) && this.isHTML) qname = utils.toASCIILowerCase(qname);
          return this._attrsByQName[qname] !== void 0;
        }
      },
      hasAttributeNS: {
        value: function hasAttributeNS(ns, lname) {
          ns = ns === void 0 || ns === null ? "" : String(ns);
          lname = String(lname);
          var key = ns + "|" + lname;
          return this._attrsByLName[key] !== void 0;
        }
      },
      hasAttributes: {
        value: function hasAttributes() {
          return this._numattrs > 0;
        }
      },
      toggleAttribute: {
        value: function toggleAttribute(qname, force) {
          qname = String(qname);
          if (!xml.isValidName(qname)) utils.InvalidCharacterError();
          if (/[A-Z]/.test(qname) && this.isHTML) qname = utils.toASCIILowerCase(qname);
          var a = this._attrsByQName[qname];
          if (a === void 0) {
            if (force === void 0 || force === true) {
              this._setAttribute(qname, "");
              return true;
            }
            return false;
          } else {
            if (force === void 0 || force === false) {
              this.removeAttribute(qname);
              return false;
            }
            return true;
          }
        }
      },
      // Set the attribute without error checking. The parser uses this.
      _setAttribute: {
        value: function _setAttribute2(qname, value) {
          var attr = this._attrsByQName[qname];
          var isnew;
          if (!attr) {
            attr = this._newattr(qname);
            isnew = true;
          } else {
            if (Array.isArray(attr)) attr = attr[0];
          }
          attr.value = value;
          if (this._attributes) this._attributes[qname] = attr;
          if (isnew && this._newattrhook) this._newattrhook(qname, value);
        }
      },
      // Check for errors, and then set the attribute
      setAttribute: {
        value: function setAttribute2(qname, value) {
          qname = String(qname);
          if (!xml.isValidName(qname)) utils.InvalidCharacterError();
          if (/[A-Z]/.test(qname) && this.isHTML) qname = utils.toASCIILowerCase(qname);
          this._setAttribute(qname, String(value));
        }
      },
      // The version with no error checking used by the parser
      _setAttributeNS: {
        value: function _setAttributeNS(ns, qname, value) {
          var pos = qname.indexOf(":"), prefix, lname;
          if (pos < 0) {
            prefix = null;
            lname = qname;
          } else {
            prefix = qname.substring(0, pos);
            lname = qname.substring(pos + 1);
          }
          if (ns === "" || ns === void 0) ns = null;
          var key = (ns === null ? "" : ns) + "|" + lname;
          var attr = this._attrsByLName[key];
          var isnew;
          if (!attr) {
            attr = new Attr(this, lname, prefix, ns);
            isnew = true;
            this._attrsByLName[key] = attr;
            if (this._attributes) {
              this._attributes[this._attrKeys.length] = attr;
            }
            this._attrKeys.push(key);
            this._addQName(attr);
          } else if (false) {
            if (attr.prefix !== prefix) {
              this._removeQName(attr);
              attr.prefix = prefix;
              this._addQName(attr);
            }
          }
          attr.value = value;
          if (isnew && this._newattrhook) this._newattrhook(qname, value);
        }
      },
      // Do error checking then call _setAttributeNS
      setAttributeNS: {
        value: function setAttributeNS(ns, qname, value) {
          ns = ns === null || ns === void 0 || ns === "" ? null : String(ns);
          qname = String(qname);
          if (!xml.isValidQName(qname)) utils.InvalidCharacterError();
          var pos = qname.indexOf(":");
          var prefix = pos < 0 ? null : qname.substring(0, pos);
          if (prefix !== null && ns === null || prefix === "xml" && ns !== NAMESPACE.XML || (qname === "xmlns" || prefix === "xmlns") && ns !== NAMESPACE.XMLNS || ns === NAMESPACE.XMLNS && !(qname === "xmlns" || prefix === "xmlns"))
            utils.NamespaceError();
          this._setAttributeNS(ns, qname, String(value));
        }
      },
      setAttributeNode: {
        value: function setAttributeNode(attr) {
          if (attr.ownerElement !== null && attr.ownerElement !== this) {
            throw new DOMException(DOMException.INUSE_ATTRIBUTE_ERR);
          }
          var result = null;
          var oldAttrs = this._attrsByQName[attr.name];
          if (oldAttrs) {
            if (!Array.isArray(oldAttrs)) {
              oldAttrs = [oldAttrs];
            }
            if (oldAttrs.some(function(a) {
              return a === attr;
            })) {
              return attr;
            } else if (attr.ownerElement !== null) {
              throw new DOMException(DOMException.INUSE_ATTRIBUTE_ERR);
            }
            oldAttrs.forEach(function(a) {
              this.removeAttributeNode(a);
            }, this);
            result = oldAttrs[0];
          }
          this.setAttributeNodeNS(attr);
          return result;
        }
      },
      setAttributeNodeNS: {
        value: function setAttributeNodeNS(attr) {
          if (attr.ownerElement !== null) {
            throw new DOMException(DOMException.INUSE_ATTRIBUTE_ERR);
          }
          var ns = attr.namespaceURI;
          var key = (ns === null ? "" : ns) + "|" + attr.localName;
          var oldAttr = this._attrsByLName[key];
          if (oldAttr) {
            this.removeAttributeNode(oldAttr);
          }
          attr._setOwnerElement(this);
          this._attrsByLName[key] = attr;
          if (this._attributes) {
            this._attributes[this._attrKeys.length] = attr;
          }
          this._attrKeys.push(key);
          this._addQName(attr);
          if (this._newattrhook) this._newattrhook(attr.name, attr.value);
          return oldAttr || null;
        }
      },
      removeAttribute: {
        value: function removeAttribute(qname) {
          qname = String(qname);
          if (/[A-Z]/.test(qname) && this.isHTML) qname = utils.toASCIILowerCase(qname);
          var attr = this._attrsByQName[qname];
          if (!attr) return;
          if (Array.isArray(attr)) {
            if (attr.length > 2) {
              attr = attr.shift();
            } else {
              this._attrsByQName[qname] = attr[1];
              attr = attr[0];
            }
          } else {
            this._attrsByQName[qname] = void 0;
          }
          var ns = attr.namespaceURI;
          var key = (ns === null ? "" : ns) + "|" + attr.localName;
          this._attrsByLName[key] = void 0;
          var i = this._attrKeys.indexOf(key);
          if (this._attributes) {
            Array.prototype.splice.call(this._attributes, i, 1);
            this._attributes[qname] = void 0;
          }
          this._attrKeys.splice(i, 1);
          var onchange = attr.onchange;
          attr._setOwnerElement(null);
          if (onchange) {
            onchange.call(attr, this, attr.localName, attr.value, null);
          }
          if (this.rooted) this.ownerDocument.mutateRemoveAttr(attr);
        }
      },
      removeAttributeNS: {
        value: function removeAttributeNS(ns, lname) {
          ns = ns === void 0 || ns === null ? "" : String(ns);
          lname = String(lname);
          var key = ns + "|" + lname;
          var attr = this._attrsByLName[key];
          if (!attr) return;
          this._attrsByLName[key] = void 0;
          var i = this._attrKeys.indexOf(key);
          if (this._attributes) {
            Array.prototype.splice.call(this._attributes, i, 1);
          }
          this._attrKeys.splice(i, 1);
          this._removeQName(attr);
          var onchange = attr.onchange;
          attr._setOwnerElement(null);
          if (onchange) {
            onchange.call(attr, this, attr.localName, attr.value, null);
          }
          if (this.rooted) this.ownerDocument.mutateRemoveAttr(attr);
        }
      },
      removeAttributeNode: {
        value: function removeAttributeNode(attr) {
          var ns = attr.namespaceURI;
          var key = (ns === null ? "" : ns) + "|" + attr.localName;
          if (this._attrsByLName[key] !== attr) {
            utils.NotFoundError();
          }
          this.removeAttributeNS(ns, attr.localName);
          return attr;
        }
      },
      getAttributeNames: {
        value: function getAttributeNames() {
          var elt = this;
          return this._attrKeys.map(function(key) {
            return elt._attrsByLName[key].name;
          });
        }
      },
      // This 'raw' version of getAttribute is used by the getter functions
      // of reflected attributes. It skips some error checking and
      // namespace steps
      _getattr: {
        value: function _getattr(qname) {
          var attr = this._attrsByQName[qname];
          return attr ? attr.value : null;
        }
      },
      // The raw version of setAttribute for reflected idl attributes.
      _setattr: {
        value: function _setattr(qname, value) {
          var attr = this._attrsByQName[qname];
          var isnew;
          if (!attr) {
            attr = this._newattr(qname);
            isnew = true;
          }
          attr.value = String(value);
          if (this._attributes) this._attributes[qname] = attr;
          if (isnew && this._newattrhook) this._newattrhook(qname, value);
        }
      },
      // Create a new Attr object, insert it, and return it.
      // Used by setAttribute() and by set()
      _newattr: {
        value: function _newattr(qname) {
          var attr = new Attr(this, qname, null, null);
          var key = "|" + qname;
          this._attrsByQName[qname] = attr;
          this._attrsByLName[key] = attr;
          if (this._attributes) {
            this._attributes[this._attrKeys.length] = attr;
          }
          this._attrKeys.push(key);
          return attr;
        }
      },
      // Add a qname->Attr mapping to the _attrsByQName object, taking into
      // account that there may be more than one attr object with the
      // same qname
      _addQName: {
        value: function(attr) {
          var qname = attr.name;
          var existing = this._attrsByQName[qname];
          if (!existing) {
            this._attrsByQName[qname] = attr;
          } else if (Array.isArray(existing)) {
            existing.push(attr);
          } else {
            this._attrsByQName[qname] = [existing, attr];
          }
          if (this._attributes) this._attributes[qname] = attr;
        }
      },
      // Remove a qname->Attr mapping to the _attrsByQName object, taking into
      // account that there may be more than one attr object with the
      // same qname
      _removeQName: {
        value: function(attr) {
          var qname = attr.name;
          var target = this._attrsByQName[qname];
          if (Array.isArray(target)) {
            var idx = target.indexOf(attr);
            utils.assert(idx !== -1);
            if (target.length === 2) {
              this._attrsByQName[qname] = target[1 - idx];
              if (this._attributes) {
                this._attributes[qname] = this._attrsByQName[qname];
              }
            } else {
              target.splice(idx, 1);
              if (this._attributes && this._attributes[qname] === attr) {
                this._attributes[qname] = target[0];
              }
            }
          } else {
            utils.assert(target === attr);
            this._attrsByQName[qname] = void 0;
            if (this._attributes) {
              this._attributes[qname] = void 0;
            }
          }
        }
      },
      // Return the number of attributes
      _numattrs: {
        get: function() {
          return this._attrKeys.length;
        }
      },
      // Return the nth Attr object
      _attr: {
        value: function(n) {
          return this._attrsByLName[this._attrKeys[n]];
        }
      },
      // Define getters and setters for an 'id' property that reflects
      // the content attribute 'id'.
      id: attributes.property({ name: "id" }),
      // Define getters and setters for a 'className' property that reflects
      // the content attribute 'class'.
      className: attributes.property({ name: "class" }),
      classList: {
        get: function() {
          var self2 = this;
          if (this._classList) {
            return this._classList;
          }
          var dtlist = new DOMTokenList(
            function() {
              return self2.className || "";
            },
            function(v) {
              self2.className = v;
            }
          );
          this._classList = dtlist;
          return dtlist;
        },
        set: function(v) {
          this.className = v;
        }
      },
      matches: {
        value: function(selector) {
          return select.matches(this, selector);
        }
      },
      closest: {
        value: function(selector) {
          var el = this;
          do {
            if (el.matches && el.matches(selector)) {
              return el;
            }
            el = el.parentElement || el.parentNode;
          } while (el !== null && el.nodeType === Node.ELEMENT_NODE);
          return null;
        }
      },
      querySelector: {
        value: function(selector) {
          return select(selector, this)[0];
        }
      },
      querySelectorAll: {
        value: function(selector) {
          var nodes = select(selector, this);
          return nodes.item ? nodes : new NodeList(nodes);
        }
      }
    });
    Object.defineProperties(Element.prototype, ChildNode);
    Object.defineProperties(Element.prototype, NonDocumentTypeChildNode);
    attributes.registerChangeHandler(Element, "id", function(element, lname, oldval, newval) {
      if (element.rooted) {
        if (oldval) {
          element.ownerDocument.delId(oldval, element);
        }
        if (newval) {
          element.ownerDocument.addId(newval, element);
        }
      }
    });
    attributes.registerChangeHandler(Element, "class", function(element, lname, oldval, newval) {
      if (element._classList) {
        element._classList._update();
      }
    });
    function Attr(elt, lname, prefix, namespace, value) {
      this.localName = lname;
      this.prefix = prefix === null || prefix === "" ? null : "" + prefix;
      this.namespaceURI = namespace === null || namespace === "" ? null : "" + namespace;
      this.data = value;
      this._setOwnerElement(elt);
    }
    Attr.prototype = Object.create(Object.prototype, {
      ownerElement: {
        get: function() {
          return this._ownerElement;
        }
      },
      _setOwnerElement: {
        value: function _setOwnerElement(elt) {
          this._ownerElement = elt;
          if (this.prefix === null && this.namespaceURI === null && elt) {
            this.onchange = elt._attributeChangeHandlers[this.localName];
          } else {
            this.onchange = null;
          }
        }
      },
      name: {
        get: function() {
          return this.prefix ? this.prefix + ":" + this.localName : this.localName;
        }
      },
      specified: {
        get: function() {
          return true;
        }
      },
      value: {
        get: function() {
          return this.data;
        },
        set: function(value) {
          var oldval = this.data;
          value = value === void 0 ? "" : value + "";
          if (value === oldval) return;
          this.data = value;
          if (this.ownerElement) {
            if (this.onchange) this.onchange(this.ownerElement, this.localName, oldval, value);
            if (this.ownerElement.rooted) this.ownerElement.ownerDocument.mutateAttr(this, oldval);
          }
        }
      },
      cloneNode: {
        value: function cloneNode(deep) {
          return new Attr(null, this.localName, this.prefix, this.namespaceURI, this.data);
        }
      },
      // Legacy aliases (see gh#70 and https://dom.spec.whatwg.org/#interface-attr)
      nodeType: {
        get: function() {
          return Node.ATTRIBUTE_NODE;
        }
      },
      nodeName: {
        get: function() {
          return this.name;
        }
      },
      nodeValue: {
        get: function() {
          return this.value;
        },
        set: function(v) {
          this.value = v;
        }
      },
      textContent: {
        get: function() {
          return this.value;
        },
        set: function(v) {
          if (v === null || v === void 0) {
            v = "";
          }
          this.value = v;
        }
      }
    });
    Element._Attr = Attr;
    function AttributesArray(elt) {
      NamedNodeMap.call(this, elt);
      for (var name in elt._attrsByQName) {
        this[name] = elt._attrsByQName[name];
      }
      for (var i = 0; i < elt._attrKeys.length; i++) {
        this[i] = elt._attrsByLName[elt._attrKeys[i]];
      }
    }
    AttributesArray.prototype = Object.create(NamedNodeMap.prototype, {
      length: {
        get: function() {
          return this.element._attrKeys.length;
        },
        set: function() {
        }
      },
      item: {
        value: function(n) {
          n = n >>> 0;
          if (n >= this.length) {
            return null;
          }
          return this.element._attrsByLName[this.element._attrKeys[n]];
        }
      }
    });
    if (global.Symbol && global.Symbol.iterator) {
      AttributesArray.prototype[global.Symbol.iterator] = function() {
        var i = 0, n = this.length, self2 = this;
        return {
          next: function() {
            if (i < n) return { value: self2.item(i++) };
            return { done: true };
          }
        };
      };
    }
    function ChildrenCollection(e) {
      this.element = e;
      this.updateCache();
    }
    ChildrenCollection.prototype = Object.create(Object.prototype, {
      length: {
        get: function() {
          this.updateCache();
          return this.childrenByNumber.length;
        }
      },
      item: {
        value: function item(n) {
          this.updateCache();
          return this.childrenByNumber[n] || null;
        }
      },
      namedItem: {
        value: function namedItem(name) {
          this.updateCache();
          return this.childrenByName[name] || null;
        }
      },
      // This attribute returns the entire name->element map.
      // It is not part of the HTMLCollection API, but we need it in
      // src/HTMLCollectionProxy
      namedItems: {
        get: function() {
          this.updateCache();
          return this.childrenByName;
        }
      },
      updateCache: {
        value: function updateCache() {
          var namedElts = /^(a|applet|area|embed|form|frame|frameset|iframe|img|object)$/;
          if (this.lastModTime !== this.element.lastModTime) {
            this.lastModTime = this.element.lastModTime;
            var n = this.childrenByNumber && this.childrenByNumber.length || 0;
            for (var i = 0; i < n; i++) {
              this[i] = void 0;
            }
            this.childrenByNumber = [];
            this.childrenByName = /* @__PURE__ */ Object.create(null);
            for (var c = this.element.firstChild; c !== null; c = c.nextSibling) {
              if (c.nodeType === Node.ELEMENT_NODE) {
                this[this.childrenByNumber.length] = c;
                this.childrenByNumber.push(c);
                var id = c.getAttribute("id");
                if (id && !this.childrenByName[id]) this.childrenByName[id] = c;
                var name = c.getAttribute("name");
                if (name && this.element.namespaceURI === NAMESPACE.HTML && namedElts.test(this.element.localName) && !this.childrenByName[name])
                  this.childrenByName[id] = c;
              }
            }
          }
        }
      }
    });
    function localNameElementFilter(lname) {
      return function(e) {
        return e.localName === lname;
      };
    }
    function htmlLocalNameElementFilter(lname) {
      var lclname = utils.toASCIILowerCase(lname);
      if (lclname === lname) return localNameElementFilter(lname);
      return function(e) {
        return e.isHTML ? e.localName === lclname : e.localName === lname;
      };
    }
    function namespaceElementFilter(ns) {
      return function(e) {
        return e.namespaceURI === ns;
      };
    }
    function namespaceLocalNameElementFilter(ns, lname) {
      return function(e) {
        return e.namespaceURI === ns && e.localName === lname;
      };
    }
    function classNamesElementFilter(names) {
      return function(e) {
        return names.every(function(n) {
          return e.classList.contains(n);
        });
      };
    }
    function elementNameFilter(name) {
      return function(e) {
        if (e.namespaceURI !== NAMESPACE.HTML) {
          return false;
        }
        return e.getAttribute("name") === name;
      };
    }
  }
});

// packages/qwik-dom/lib/Leaf.js
var require_Leaf = __commonJS({
  "packages/qwik-dom/lib/Leaf.js"(exports2, module2) {
    "use strict";
    module2.exports = Leaf;
    var Node = require_Node();
    var NodeList = require_NodeList();
    var utils = require_utils();
    var HierarchyRequestError = utils.HierarchyRequestError;
    var NotFoundError = utils.NotFoundError;
    function Leaf() {
      Node.call(this);
    }
    Leaf.prototype = Object.create(Node.prototype, {
      hasChildNodes: {
        value: function() {
          return false;
        }
      },
      firstChild: { value: null },
      lastChild: { value: null },
      insertBefore: {
        value: function(node, child) {
          if (!node.nodeType) throw new TypeError("not a node");
          HierarchyRequestError();
        }
      },
      replaceChild: {
        value: function(node, child) {
          if (!node.nodeType) throw new TypeError("not a node");
          HierarchyRequestError();
        }
      },
      removeChild: {
        value: function(node) {
          if (!node.nodeType) throw new TypeError("not a node");
          NotFoundError();
        }
      },
      removeChildren: {
        value: function() {
        }
      },
      childNodes: {
        get: function() {
          if (!this._childNodes) this._childNodes = new NodeList();
          return this._childNodes;
        }
      }
    });
  }
});

// packages/qwik-dom/lib/CharacterData.js
var require_CharacterData = __commonJS({
  "packages/qwik-dom/lib/CharacterData.js"(exports2, module2) {
    "use strict";
    module2.exports = CharacterData;
    var Leaf = require_Leaf();
    var utils = require_utils();
    var ChildNode = require_ChildNode();
    var NonDocumentTypeChildNode = require_NonDocumentTypeChildNode();
    function CharacterData() {
      Leaf.call(this);
    }
    CharacterData.prototype = Object.create(Leaf.prototype, {
      // DOMString substringData(unsigned long offset,
      //               unsigned long count);
      // The substringData(offset, count) method must run these steps:
      //
      //     If offset is greater than the context object's
      //     length, throw an INDEX_SIZE_ERR exception and
      //     terminate these steps.
      //
      //     If offset+count is greater than the context
      //     object's length, return a DOMString whose value is
      //     the UTF-16 code units from the offsetth UTF-16 code
      //     unit to the end of data.
      //
      //     Return a DOMString whose value is the UTF-16 code
      //     units from the offsetth UTF-16 code unit to the
      //     offset+countth UTF-16 code unit in data.
      substringData: {
        value: function substringData(offset, count) {
          if (arguments.length < 2) {
            throw new TypeError("Not enough arguments");
          }
          offset = offset >>> 0;
          count = count >>> 0;
          if (offset > this.data.length || offset < 0 || count < 0) {
            utils.IndexSizeError();
          }
          return this.data.substring(offset, offset + count);
        }
      },
      // void appendData(DOMString data);
      // The appendData(data) method must append data to the context
      // object's data.
      appendData: {
        value: function appendData(data) {
          if (arguments.length < 1) {
            throw new TypeError("Not enough arguments");
          }
          this.data += String(data);
        }
      },
      // void insertData(unsigned long offset, DOMString data);
      // The insertData(offset, data) method must run these steps:
      //
      //     If offset is greater than the context object's
      //     length, throw an INDEX_SIZE_ERR exception and
      //     terminate these steps.
      //
      //     Insert data into the context object's data after
      //     offset UTF-16 code units.
      //
      insertData: {
        value: function insertData(offset, data) {
          return this.replaceData(offset, 0, data);
        }
      },
      // void deleteData(unsigned long offset, unsigned long count);
      // The deleteData(offset, count) method must run these steps:
      //
      //     If offset is greater than the context object's
      //     length, throw an INDEX_SIZE_ERR exception and
      //     terminate these steps.
      //
      //     If offset+count is greater than the context
      //     object's length var count be length-offset.
      //
      //     Starting from offset UTF-16 code units remove count
      //     UTF-16 code units from the context object's data.
      deleteData: {
        value: function deleteData(offset, count) {
          return this.replaceData(offset, count, "");
        }
      },
      // void replaceData(unsigned long offset, unsigned long count,
      //          DOMString data);
      //
      // The replaceData(offset, count, data) method must act as
      // if the deleteData() method is invoked with offset and
      // count as arguments followed by the insertData() method
      // with offset and data as arguments and re-throw any
      // exceptions these methods might have thrown.
      replaceData: {
        value: function replaceData(offset, count, data) {
          var curtext = this.data, len = curtext.length;
          offset = offset >>> 0;
          count = count >>> 0;
          data = String(data);
          if (offset > len || offset < 0) utils.IndexSizeError();
          if (offset + count > len) count = len - offset;
          var prefix = curtext.substring(0, offset), suffix = curtext.substring(offset + count);
          this.data = prefix + data + suffix;
        }
      },
      // Utility method that Node.isEqualNode() calls to test Text and
      // Comment nodes for equality.  It is okay to put it here, since
      // Node will have already verified that nodeType is equal
      isEqual: {
        value: function isEqual(n) {
          return this._data === n._data;
        }
      },
      length: {
        get: function() {
          return this.data.length;
        }
      }
    });
    Object.defineProperties(CharacterData.prototype, ChildNode);
    Object.defineProperties(CharacterData.prototype, NonDocumentTypeChildNode);
  }
});

// packages/qwik-dom/lib/Text.js
var require_Text = __commonJS({
  "packages/qwik-dom/lib/Text.js"(exports2, module2) {
    "use strict";
    module2.exports = Text;
    var utils = require_utils();
    var Node = require_Node();
    var CharacterData = require_CharacterData();
    function Text(doc2, data) {
      CharacterData.call(this);
      this.nodeType = Node.TEXT_NODE;
      this.ownerDocument = doc2;
      this._data = utils.escapeText(data);
      this._index = void 0;
    }
    var nodeValue = {
      get: function() {
        return this._data;
      },
      set: function(v) {
        if (v === null || v === void 0) {
          v = "";
        } else {
          v = String(v);
        }
        if (v === this._data) return;
        this._data = utils.escapeText(v);
        if (this.rooted) this.ownerDocument.mutateValue(this);
        if (this.parentNode && this.parentNode._textchangehook) this.parentNode._textchangehook(this);
      }
    };
    Text.prototype = Object.create(CharacterData.prototype, {
      nodeName: { value: "#text" },
      // These three attributes are all the same.
      // The data attribute has a [TreatNullAs=EmptyString] but we'll
      // implement that at the interface level
      nodeValue,
      textContent: nodeValue,
      data: {
        get: nodeValue.get,
        set: function(v) {
          nodeValue.set.call(this, v === null ? "" : String(v));
        }
      },
      splitText: {
        value: function splitText(offset) {
          if (offset > this._data.length || offset < 0) utils.IndexSizeError();
          var newdata = this._data.substring(offset), newnode = this.ownerDocument.createTextNode(newdata);
          this.data = this.data.substring(0, offset);
          var parent = this.parentNode;
          if (parent !== null) parent.insertBefore(newnode, this.nextSibling);
          return newnode;
        }
      },
      wholeText: {
        get: function wholeText() {
          var result = this.textContent;
          for (var next = this.nextSibling; next; next = next.nextSibling) {
            if (next.nodeType !== Node.TEXT_NODE) {
              break;
            }
            result += next.textContent;
          }
          return result;
        }
      },
      // Obsolete, removed from spec.
      replaceWholeText: { value: utils.nyi },
      // Utility methods
      clone: {
        value: function clone() {
          return new Text(this.ownerDocument, this._data);
        }
      }
    });
  }
});

// packages/qwik-dom/lib/Comment.js
var require_Comment = __commonJS({
  "packages/qwik-dom/lib/Comment.js"(exports2, module2) {
    "use strict";
    module2.exports = Comment;
    var Node = require_Node();
    var utils = require_utils();
    var CharacterData = require_CharacterData();
    function Comment(doc2, data) {
      CharacterData.call(this);
      this.nodeType = Node.COMMENT_NODE;
      this.ownerDocument = doc2;
      this._data = utils.escapeText(data);
    }
    var nodeValue = {
      get: function() {
        return this._data;
      },
      set: function(v) {
        if (v === null || v === void 0) {
          v = "";
        } else {
          v = String(v);
        }
        this._data = utils.escapeText(v);
        if (this.rooted) this.ownerDocument.mutateValue(this);
      }
    };
    Comment.prototype = Object.create(CharacterData.prototype, {
      nodeName: { value: "#comment" },
      nodeValue,
      textContent: nodeValue,
      data: {
        get: nodeValue.get,
        set: function(v) {
          nodeValue.set.call(this, v === null ? "" : String(v));
        }
      },
      // Utility methods
      clone: {
        value: function clone() {
          return new Comment(this.ownerDocument, this._data);
        }
      }
    });
  }
});

// packages/qwik-dom/lib/DocumentFragment.js
var require_DocumentFragment = __commonJS({
  "packages/qwik-dom/lib/DocumentFragment.js"(exports2, module2) {
    "use strict";
    module2.exports = DocumentFragment;
    var Node = require_Node();
    var NodeList = require_NodeList();
    var ContainerNode = require_ContainerNode();
    var Element = require_Element();
    var select = require_select();
    var utils = require_utils();
    function DocumentFragment(doc2) {
      ContainerNode.call(this);
      this.nodeType = Node.DOCUMENT_FRAGMENT_NODE;
      this.ownerDocument = doc2;
    }
    DocumentFragment.prototype = Object.create(ContainerNode.prototype, {
      nodeName: { value: "#document-fragment" },
      nodeValue: {
        get: function() {
          return null;
        },
        set: function() {
        }
      },
      // Copy the text content getter/setter from Element
      textContent: Object.getOwnPropertyDescriptor(Element.prototype, "textContent"),
      querySelector: {
        value: function(selector) {
          var nodes = this.querySelectorAll(selector);
          return nodes.length ? nodes[0] : null;
        }
      },
      querySelectorAll: {
        value: function(selector) {
          var context = Object.create(this);
          context.isHTML = true;
          context.getElementsByTagName = Element.prototype.getElementsByTagName;
          context.nextElement = Object.getOwnPropertyDescriptor(
            Element.prototype,
            "firstElementChild"
          ).get;
          var nodes = select(selector, context);
          return nodes.item ? nodes : new NodeList(nodes);
        }
      },
      // Utility methods
      clone: {
        value: function clone() {
          return new DocumentFragment(this.ownerDocument);
        }
      },
      isEqual: {
        value: function isEqual(n) {
          return true;
        }
      },
      // Non-standard, but useful (github issue #73)
      innerHTML: {
        get: function() {
          return this.serialize();
        },
        set: utils.nyi
      },
      outerHTML: {
        get: function() {
          return this.serialize();
        },
        set: utils.nyi
      }
    });
  }
});

// packages/qwik-dom/lib/ProcessingInstruction.js
var require_ProcessingInstruction = __commonJS({
  "packages/qwik-dom/lib/ProcessingInstruction.js"(exports2, module2) {
    "use strict";
    module2.exports = ProcessingInstruction;
    var Node = require_Node();
    var CharacterData = require_CharacterData();
    var utils = require_utils();
    function ProcessingInstruction(doc2, target, data) {
      CharacterData.call(this);
      this.nodeType = Node.PROCESSING_INSTRUCTION_NODE;
      this.ownerDocument = doc2;
      this.target = target;
      this._data = data;
    }
    var nodeValue = {
      get: function() {
        return this._data;
      },
      set: function(v) {
        if (v === null || v === void 0) {
          v = "";
        } else {
          v = String(v);
        }
        this._data = utils.escapeText(v);
        if (this.rooted) this.ownerDocument.mutateValue(this);
      }
    };
    ProcessingInstruction.prototype = Object.create(CharacterData.prototype, {
      nodeName: {
        get: function() {
          return this.target;
        }
      },
      nodeValue,
      textContent: nodeValue,
      data: {
        get: nodeValue.get,
        set: function(v) {
          nodeValue.set.call(this, v === null ? "" : String(v));
        }
      },
      // Utility methods
      clone: {
        value: function clone() {
          return new ProcessingInstruction(this.ownerDocument, this.target, this._data);
        }
      },
      isEqual: {
        value: function isEqual(n) {
          return this.target === n.target && this._data === n._data;
        }
      }
    });
  }
});

// packages/qwik-dom/lib/NodeFilter.js
var require_NodeFilter = __commonJS({
  "packages/qwik-dom/lib/NodeFilter.js"(exports2, module2) {
    "use strict";
    var NodeFilter = {
      // Constants for acceptNode()
      FILTER_ACCEPT: 1,
      FILTER_REJECT: 2,
      FILTER_SKIP: 3,
      // Constants for whatToShow
      SHOW_ALL: 4294967295,
      SHOW_ELEMENT: 1,
      SHOW_ATTRIBUTE: 2,
      // historical
      SHOW_TEXT: 4,
      SHOW_CDATA_SECTION: 8,
      // historical
      SHOW_ENTITY_REFERENCE: 16,
      // historical
      SHOW_ENTITY: 32,
      // historical
      SHOW_PROCESSING_INSTRUCTION: 64,
      SHOW_COMMENT: 128,
      SHOW_DOCUMENT: 256,
      SHOW_DOCUMENT_TYPE: 512,
      SHOW_DOCUMENT_FRAGMENT: 1024,
      SHOW_NOTATION: 2048
      // historical
    };
    module2.exports = NodeFilter.constructor = NodeFilter.prototype = NodeFilter;
  }
});

// packages/qwik-dom/lib/NodeTraversal.js
var require_NodeTraversal = __commonJS({
  "packages/qwik-dom/lib/NodeTraversal.js"(exports2, module2) {
    "use strict";
    var NodeTraversal = module2.exports = {
      nextSkippingChildren,
      nextAncestorSibling,
      next,
      previous,
      deepLastChild
    };
    function nextSkippingChildren(node, stayWithin) {
      if (node === stayWithin) {
        return null;
      }
      if (node.nextSibling !== null) {
        return node.nextSibling;
      }
      return nextAncestorSibling(node, stayWithin);
    }
    function nextAncestorSibling(node, stayWithin) {
      for (node = node.parentNode; node !== null; node = node.parentNode) {
        if (node === stayWithin) {
          return null;
        }
        if (node.nextSibling !== null) {
          return node.nextSibling;
        }
      }
      return null;
    }
    function next(node, stayWithin) {
      var n;
      n = node.firstChild;
      if (n !== null) {
        return n;
      }
      if (node === stayWithin) {
        return null;
      }
      n = node.nextSibling;
      if (n !== null) {
        return n;
      }
      return nextAncestorSibling(node, stayWithin);
    }
    function deepLastChild(node) {
      while (node.lastChild) {
        node = node.lastChild;
      }
      return node;
    }
    function previous(node, stayWithin) {
      var p;
      p = node.previousSibling;
      if (p !== null) {
        return deepLastChild(p);
      }
      p = node.parentNode;
      if (p === stayWithin) {
        return null;
      }
      return p;
    }
  }
});

// packages/qwik-dom/lib/TreeWalker.js
var require_TreeWalker = __commonJS({
  "packages/qwik-dom/lib/TreeWalker.js"(exports2, module2) {
    "use strict";
    module2.exports = TreeWalker;
    var Node = require_Node();
    var NodeFilter = require_NodeFilter();
    var NodeTraversal = require_NodeTraversal();
    var utils = require_utils();
    var mapChild = {
      first: "firstChild",
      last: "lastChild",
      next: "firstChild",
      previous: "lastChild"
    };
    var mapSibling = {
      first: "nextSibling",
      last: "previousSibling",
      next: "nextSibling",
      previous: "previousSibling"
    };
    function traverseChildren(tw, type) {
      var child, node, parent, result, sibling;
      node = tw._currentNode[mapChild[type]];
      while (node !== null) {
        result = tw._internalFilter(node);
        if (result === NodeFilter.FILTER_ACCEPT) {
          tw._currentNode = node;
          return node;
        }
        if (result === NodeFilter.FILTER_SKIP) {
          child = node[mapChild[type]];
          if (child !== null) {
            node = child;
            continue;
          }
        }
        while (node !== null) {
          sibling = node[mapSibling[type]];
          if (sibling !== null) {
            node = sibling;
            break;
          }
          parent = node.parentNode;
          if (parent === null || parent === tw.root || parent === tw._currentNode) {
            return null;
          } else {
            node = parent;
          }
        }
      }
      return null;
    }
    function traverseSiblings(tw, type) {
      var node, result, sibling;
      node = tw._currentNode;
      if (node === tw.root) {
        return null;
      }
      while (true) {
        sibling = node[mapSibling[type]];
        while (sibling !== null) {
          node = sibling;
          result = tw._internalFilter(node);
          if (result === NodeFilter.FILTER_ACCEPT) {
            tw._currentNode = node;
            return node;
          }
          sibling = node[mapChild[type]];
          if (result === NodeFilter.FILTER_REJECT || sibling === null) {
            sibling = node[mapSibling[type]];
          }
        }
        node = node.parentNode;
        if (node === null || node === tw.root) {
          return null;
        }
        if (tw._internalFilter(node) === NodeFilter.FILTER_ACCEPT) {
          return null;
        }
      }
    }
    function TreeWalker(root, whatToShow, filter) {
      if (!root || !root.nodeType) {
        utils.NotSupportedError();
      }
      this._root = root;
      this._whatToShow = Number(whatToShow) || 0;
      this._filter = filter || null;
      this._active = false;
      this._currentNode = root;
    }
    Object.defineProperties(TreeWalker.prototype, {
      root: {
        get: function() {
          return this._root;
        }
      },
      whatToShow: {
        get: function() {
          return this._whatToShow;
        }
      },
      filter: {
        get: function() {
          return this._filter;
        }
      },
      currentNode: {
        get: function currentNode() {
          return this._currentNode;
        },
        set: function setCurrentNode(v) {
          if (!(v instanceof Node)) {
            throw new TypeError("Not a Node");
          }
          this._currentNode = v;
        }
      },
      /**
       * @method
       * @param {Node} node
       * @return {Number} Constant NodeFilter.FILTER_ACCEPT,
       *  NodeFilter.FILTER_REJECT or NodeFilter.FILTER_SKIP.
       */
      _internalFilter: {
        value: function _internalFilter(node) {
          var result, filter;
          if (this._active) {
            utils.InvalidStateError();
          }
          if (!(1 << node.nodeType - 1 & this._whatToShow)) {
            return NodeFilter.FILTER_SKIP;
          }
          filter = this._filter;
          if (filter === null) {
            result = NodeFilter.FILTER_ACCEPT;
          } else {
            this._active = true;
            try {
              if (typeof filter === "function") {
                result = filter(node);
              } else {
                result = filter.acceptNode(node);
              }
            } finally {
              this._active = false;
            }
          }
          return +result;
        }
      },
      /**
       * @spec https://dom.spec.whatwg.org/#dom-treewalker-parentnode
       * @based on WebKit's TreeWalker::parentNode
       * https://trac.webkit.org/browser/webkit/trunk/Source/WebCore/dom/TreeWalker.cpp?rev=220453#L50
       * @method
       * @return {Node|null}
       */
      parentNode: {
        value: function parentNode() {
          var node = this._currentNode;
          while (node !== this.root) {
            node = node.parentNode;
            if (node === null) {
              return null;
            }
            if (this._internalFilter(node) === NodeFilter.FILTER_ACCEPT) {
              this._currentNode = node;
              return node;
            }
          }
          return null;
        }
      },
      /**
       * @spec https://dom.spec.whatwg.org/#dom-treewalker-firstchild
       * @method
       * @return {Node|null}
       */
      firstChild: {
        value: function firstChild() {
          return traverseChildren(this, "first");
        }
      },
      /**
       * @spec https://dom.spec.whatwg.org/#dom-treewalker-lastchild
       * @method
       * @return {Node|null}
       */
      lastChild: {
        value: function lastChild() {
          return traverseChildren(this, "last");
        }
      },
      /**
       * @spec http://www.w3.org/TR/dom/#dom-treewalker-previoussibling
       * @method
       * @return {Node|null}
       */
      previousSibling: {
        value: function previousSibling() {
          return traverseSiblings(this, "previous");
        }
      },
      /**
       * @spec http://www.w3.org/TR/dom/#dom-treewalker-nextsibling
       * @method
       * @return {Node|null}
       */
      nextSibling: {
        value: function nextSibling() {
          return traverseSiblings(this, "next");
        }
      },
      /**
       * @spec https://dom.spec.whatwg.org/#dom-treewalker-previousnode
       * @based on WebKit's TreeWalker::previousNode
       * https://trac.webkit.org/browser/webkit/trunk/Source/WebCore/dom/TreeWalker.cpp?rev=220453#L181
       * @method
       * @return {Node|null}
       */
      previousNode: {
        value: function previousNode() {
          var node, result, previousSibling, lastChild;
          node = this._currentNode;
          while (node !== this._root) {
            for (previousSibling = node.previousSibling; previousSibling; previousSibling = node.previousSibling) {
              node = previousSibling;
              result = this._internalFilter(node);
              if (result === NodeFilter.FILTER_REJECT) {
                continue;
              }
              for (lastChild = node.lastChild; lastChild; lastChild = node.lastChild) {
                node = lastChild;
                result = this._internalFilter(node);
                if (result === NodeFilter.FILTER_REJECT) {
                  break;
                }
              }
              if (result === NodeFilter.FILTER_ACCEPT) {
                this._currentNode = node;
                return node;
              }
            }
            if (node === this.root || node.parentNode === null) {
              return null;
            }
            node = node.parentNode;
            if (this._internalFilter(node) === NodeFilter.FILTER_ACCEPT) {
              this._currentNode = node;
              return node;
            }
          }
          return null;
        }
      },
      /**
       * @spec https://dom.spec.whatwg.org/#dom-treewalker-nextnode
       * @based on WebKit's TreeWalker::nextNode
       * https://trac.webkit.org/browser/webkit/trunk/Source/WebCore/dom/TreeWalker.cpp?rev=220453#L228
       * @method
       * @return {Node|null}
       */
      nextNode: {
        value: function nextNode() {
          var node, result, firstChild, nextSibling;
          node = this._currentNode;
          result = NodeFilter.FILTER_ACCEPT;
          CHILDREN: while (true) {
            for (firstChild = node.firstChild; firstChild; firstChild = node.firstChild) {
              node = firstChild;
              result = this._internalFilter(node);
              if (result === NodeFilter.FILTER_ACCEPT) {
                this._currentNode = node;
                return node;
              } else if (result === NodeFilter.FILTER_REJECT) {
                break;
              }
            }
            for (nextSibling = NodeTraversal.nextSkippingChildren(node, this.root); nextSibling; nextSibling = NodeTraversal.nextSkippingChildren(node, this.root)) {
              node = nextSibling;
              result = this._internalFilter(node);
              if (result === NodeFilter.FILTER_ACCEPT) {
                this._currentNode = node;
                return node;
              } else if (result === NodeFilter.FILTER_SKIP) {
                continue CHILDREN;
              }
            }
            return null;
          }
        }
      },
      /** For compatibility with web-platform-tests. */
      toString: {
        value: function toString() {
          return "[object TreeWalker]";
        }
      }
    });
  }
});

// packages/qwik-dom/lib/NodeIterator.js
var require_NodeIterator = __commonJS({
  "packages/qwik-dom/lib/NodeIterator.js"(exports2, module2) {
    "use strict";
    module2.exports = NodeIterator;
    var NodeFilter = require_NodeFilter();
    var NodeTraversal = require_NodeTraversal();
    var utils = require_utils();
    function move(node, stayWithin, directionIsNext) {
      if (directionIsNext) {
        return NodeTraversal.next(node, stayWithin);
      } else {
        if (node === stayWithin) {
          return null;
        }
        return NodeTraversal.previous(node, null);
      }
    }
    function isInclusiveAncestor(node, possibleChild) {
      for (; possibleChild; possibleChild = possibleChild.parentNode) {
        if (node === possibleChild) {
          return true;
        }
      }
      return false;
    }
    function traverse(ni, directionIsNext) {
      var node, beforeNode;
      node = ni._referenceNode;
      beforeNode = ni._pointerBeforeReferenceNode;
      while (true) {
        if (beforeNode === directionIsNext) {
          beforeNode = !beforeNode;
        } else {
          node = move(node, ni._root, directionIsNext);
          if (node === null) {
            return null;
          }
        }
        var result = ni._internalFilter(node);
        if (result === NodeFilter.FILTER_ACCEPT) {
          break;
        }
      }
      ni._referenceNode = node;
      ni._pointerBeforeReferenceNode = beforeNode;
      return node;
    }
    function NodeIterator(root, whatToShow, filter) {
      if (!root || !root.nodeType) {
        utils.NotSupportedError();
      }
      this._root = root;
      this._referenceNode = root;
      this._pointerBeforeReferenceNode = true;
      this._whatToShow = Number(whatToShow) || 0;
      this._filter = filter || null;
      this._active = false;
      root.doc._attachNodeIterator(this);
    }
    Object.defineProperties(NodeIterator.prototype, {
      root: {
        get: function root() {
          return this._root;
        }
      },
      referenceNode: {
        get: function referenceNode() {
          return this._referenceNode;
        }
      },
      pointerBeforeReferenceNode: {
        get: function pointerBeforeReferenceNode() {
          return this._pointerBeforeReferenceNode;
        }
      },
      whatToShow: {
        get: function whatToShow() {
          return this._whatToShow;
        }
      },
      filter: {
        get: function filter() {
          return this._filter;
        }
      },
      /**
       * @method
       * @param {Node} node
       * @return {Number} Constant NodeFilter.FILTER_ACCEPT,
       *  NodeFilter.FILTER_REJECT or NodeFilter.FILTER_SKIP.
       */
      _internalFilter: {
        value: function _internalFilter(node) {
          var result, filter;
          if (this._active) {
            utils.InvalidStateError();
          }
          if (!(1 << node.nodeType - 1 & this._whatToShow)) {
            return NodeFilter.FILTER_SKIP;
          }
          filter = this._filter;
          if (filter === null) {
            result = NodeFilter.FILTER_ACCEPT;
          } else {
            this._active = true;
            try {
              if (typeof filter === "function") {
                result = filter(node);
              } else {
                result = filter.acceptNode(node);
              }
            } finally {
              this._active = false;
            }
          }
          return +result;
        }
      },
      /**
       * @spec https://dom.spec.whatwg.org/#nodeiterator-pre-removing-steps
       * @method
       * @return void
       */
      _preremove: {
        value: function _preremove(toBeRemovedNode) {
          if (isInclusiveAncestor(toBeRemovedNode, this._root)) {
            return;
          }
          if (!isInclusiveAncestor(toBeRemovedNode, this._referenceNode)) {
            return;
          }
          if (this._pointerBeforeReferenceNode) {
            var next = toBeRemovedNode;
            while (next.lastChild) {
              next = next.lastChild;
            }
            next = NodeTraversal.next(next, this.root);
            if (next) {
              this._referenceNode = next;
              return;
            }
            this._pointerBeforeReferenceNode = false;
          }
          if (toBeRemovedNode.previousSibling === null) {
            this._referenceNode = toBeRemovedNode.parentNode;
          } else {
            this._referenceNode = toBeRemovedNode.previousSibling;
            var lastChild;
            for (lastChild = this._referenceNode.lastChild; lastChild; lastChild = this._referenceNode.lastChild) {
              this._referenceNode = lastChild;
            }
          }
        }
      },
      /**
       * @spec http://www.w3.org/TR/dom/#dom-nodeiterator-nextnode
       * @method
       * @return {Node|null}
       */
      nextNode: {
        value: function nextNode() {
          return traverse(this, true);
        }
      },
      /**
       * @spec http://www.w3.org/TR/dom/#dom-nodeiterator-previousnode
       * @method
       * @return {Node|null}
       */
      previousNode: {
        value: function previousNode() {
          return traverse(this, false);
        }
      },
      /**
       * @spec http://www.w3.org/TR/dom/#dom-nodeiterator-detach
       * @method
       * @return void
       */
      detach: {
        value: function detach() {
        }
      },
      /** For compatibility with web-platform-tests. */
      toString: {
        value: function toString() {
          return "[object NodeIterator]";
        }
      }
    });
  }
});

// packages/qwik-dom/lib/URL.js
var require_URL = __commonJS({
  "packages/qwik-dom/lib/URL.js"(exports2, module2) {
    "use strict";
    module2.exports = URL2;
    function URL2(url) {
      if (!url) return Object.create(URL2.prototype);
      this.url = url.replace(/^[ \t\n\r\f]+|[ \t\n\r\f]+$/g, "");
      var match = URL2.pattern.exec(this.url);
      if (match) {
        if (match[2]) this.scheme = match[2];
        if (match[4]) {
          var userinfo = match[4].match(URL2.userinfoPattern);
          if (userinfo) {
            this.username = userinfo[1];
            this.password = userinfo[3];
            match[4] = match[4].substring(userinfo[0].length);
          }
          if (match[4].match(URL2.portPattern)) {
            var pos = match[4].lastIndexOf(":");
            this.host = match[4].substring(0, pos);
            this.port = match[4].substring(pos + 1);
          } else {
            this.host = match[4];
          }
        }
        if (match[5]) this.path = match[5];
        if (match[6]) this.query = match[7];
        if (match[8]) this.fragment = match[9];
      }
    }
    URL2.pattern = /^(([^:\/?#]+):)?(\/\/([^\/?#]*))?([^?#]*)(\?([^#]*))?(#(.*))?$/;
    URL2.userinfoPattern = /^([^@:]*)(:([^@]*))?@/;
    URL2.portPattern = /:\d+$/;
    URL2.authorityPattern = /^[^:\/?#]+:\/\//;
    URL2.hierarchyPattern = /^[^:\/?#]+:\//;
    URL2.percentEncode = function percentEncode(s) {
      var c = s.charCodeAt(0);
      if (c < 256) return "%" + c.toString(16);
      else throw Error("can't percent-encode codepoints > 255 yet");
    };
    URL2.prototype = {
      constructor: URL2,
      // XXX: not sure if this is the precise definition of absolute
      isAbsolute: function() {
        return !!this.scheme;
      },
      isAuthorityBased: function() {
        return URL2.authorityPattern.test(this.url);
      },
      isHierarchical: function() {
        return URL2.hierarchyPattern.test(this.url);
      },
      toString: function() {
        var s = "";
        if (this.scheme !== void 0) s += this.scheme + ":";
        if (this.isAbsolute()) {
          s += "//";
          if (this.username || this.password) {
            s += this.username || "";
            if (this.password) {
              s += ":" + this.password;
            }
            s += "@";
          }
          if (this.host) {
            s += this.host;
          }
        }
        if (this.port !== void 0) s += ":" + this.port;
        if (this.path !== void 0) s += this.path;
        if (this.query !== void 0) s += "?" + this.query;
        if (this.fragment !== void 0) s += "#" + this.fragment;
        return s;
      },
      // See: http://tools.ietf.org/html/rfc3986#section-5.2
      // and https://url.spec.whatwg.org/#constructors
      resolve: function(relative) {
        var base2 = this;
        var r = new URL2(relative);
        var t = new URL2();
        if (r.scheme !== void 0) {
          t.scheme = r.scheme;
          t.username = r.username;
          t.password = r.password;
          t.host = r.host;
          t.port = r.port;
          t.path = remove_dot_segments(r.path);
          t.query = r.query;
        } else {
          t.scheme = base2.scheme;
          if (r.host !== void 0) {
            t.username = r.username;
            t.password = r.password;
            t.host = r.host;
            t.port = r.port;
            t.path = remove_dot_segments(r.path);
            t.query = r.query;
          } else {
            t.username = base2.username;
            t.password = base2.password;
            t.host = base2.host;
            t.port = base2.port;
            if (!r.path) {
              t.path = base2.path;
              if (r.query !== void 0) t.query = r.query;
              else t.query = base2.query;
            } else {
              if (r.path.charAt(0) === "/") {
                t.path = remove_dot_segments(r.path);
              } else {
                t.path = merge(base2.path, r.path);
                t.path = remove_dot_segments(t.path);
              }
              t.query = r.query;
            }
          }
        }
        t.fragment = r.fragment;
        return t.toString();
        function merge(basepath, refpath) {
          if (base2.host !== void 0 && !base2.path) return "/" + refpath;
          var lastslash = basepath.lastIndexOf("/");
          if (lastslash === -1) return refpath;
          else return basepath.substring(0, lastslash + 1) + refpath;
        }
        function remove_dot_segments(path) {
          if (!path) return path;
          var output = "";
          while (path.length > 0) {
            if (path === "." || path === "..") {
              path = "";
              break;
            }
            var twochars = path.substring(0, 2);
            var threechars = path.substring(0, 3);
            var fourchars = path.substring(0, 4);
            if (threechars === "../") {
              path = path.substring(3);
            } else if (twochars === "./") {
              path = path.substring(2);
            } else if (threechars === "/./") {
              path = "/" + path.substring(3);
            } else if (twochars === "/." && path.length === 2) {
              path = "/";
            } else if (fourchars === "/../" || threechars === "/.." && path.length === 3) {
              path = "/" + path.substring(4);
              output = output.replace(/\/?[^\/]*$/, "");
            } else {
              var segment = path.match(/(\/?([^\/]*))/)[0];
              output += segment;
              path = path.substring(segment.length);
            }
          }
          return output;
        }
      }
    };
  }
});

// packages/qwik-dom/lib/CustomEvent.js
var require_CustomEvent = __commonJS({
  "packages/qwik-dom/lib/CustomEvent.js"(exports2, module2) {
    "use strict";
    module2.exports = CustomEvent2;
    var Event = require_Event();
    function CustomEvent2(type, dictionary) {
      Event.call(this, type, dictionary);
    }
    CustomEvent2.prototype = Object.create(Event.prototype, {
      constructor: { value: CustomEvent2 }
    });
  }
});

// packages/qwik-dom/lib/events.js
var require_events = __commonJS({
  "packages/qwik-dom/lib/events.js"(exports2, module2) {
    "use strict";
    module2.exports = {
      Event: require_Event(),
      UIEvent: require_UIEvent(),
      MouseEvent: require_MouseEvent(),
      CustomEvent: require_CustomEvent()
    };
  }
});

// packages/qwik-dom/lib/cssparser.js
var require_cssparser = __commonJS({
  "packages/qwik-dom/lib/cssparser.js"(exports2) {
    "use strict";
    var parserlib = /* @__PURE__ */ Object.create(null);
    (function() {
      function EventTarget() {
        this._listeners = /* @__PURE__ */ Object.create(null);
      }
      EventTarget.prototype = {
        //restore constructor
        constructor: EventTarget,
        /**
         * Adds a listener for a given event type.
         * @param {String} type The type of event to add a listener for.
         * @param {Function} listener The function to call when the event occurs.
         * @return {void}
         * @method addListener
         */
        addListener: function(type, listener) {
          if (!this._listeners[type]) {
            this._listeners[type] = [];
          }
          this._listeners[type].push(listener);
        },
        /**
         * Fires an event based on the passed-in object.
         * @param {Object|String} event An object with at least a 'type' attribute
         *      or a string indicating the event name.
         * @return {void}
         * @method fire
         */
        fire: function(event) {
          if (typeof event === "string") {
            event = { type: event };
          }
          if (typeof event.target !== "undefined") {
            event.target = this;
          }
          if (typeof event.type === "undefined") {
            throw new Error("Event object missing 'type' property.");
          }
          if (this._listeners[event.type]) {
            var listeners = this._listeners[event.type].concat();
            for (var i = 0, len = listeners.length; i < len; i++) {
              listeners[i].call(this, event);
            }
          }
        },
        /**
         * Removes a listener for a given event type.
         * @param {String} type The type of event to remove a listener from.
         * @param {Function} listener The function to remove from the event.
         * @return {void}
         * @method removeListener
         */
        removeListener: function(type, listener) {
          if (this._listeners[type]) {
            var listeners = this._listeners[type];
            for (var i = 0, len = listeners.length; i < len; i++) {
              if (listeners[i] === listener) {
                listeners.splice(i, 1);
                break;
              }
            }
          }
        }
      };
      function StringReader(text) {
        this._input = text.replace(/(\r|\n){1,2}/g, "\n");
        this._line = 1;
        this._col = 1;
        this._cursor = 0;
      }
      StringReader.prototype = {
        //restore constructor
        constructor: StringReader,
        //-------------------------------------------------------------------------
        // Position info
        //-------------------------------------------------------------------------
        /**
         * Returns the column of the character to be read next.
         * @return {int} The column of the character to be read next.
         * @method getCol
         */
        getCol: function() {
          return this._col;
        },
        /**
         * Returns the row of the character to be read next.
         * @return {int} The row of the character to be read next.
         * @method getLine
         */
        getLine: function() {
          return this._line;
        },
        /**
         * Determines if you're at the end of the input.
         * @return {Boolean} True if there's no more input, false otherwise.
         * @method eof
         */
        eof: function() {
          return this._cursor === this._input.length;
        },
        //-------------------------------------------------------------------------
        // Basic reading
        //-------------------------------------------------------------------------
        /**
         * Reads the next character without advancing the cursor.
         * @param {int} count How many characters to look ahead (default is 1).
         * @return {String} The next character or null if there is no next character.
         * @method peek
         */
        peek: function(count) {
          var c = null;
          count = typeof count === "undefined" ? 1 : count;
          if (this._cursor < this._input.length) {
            c = this._input.charAt(this._cursor + count - 1);
          }
          return c;
        },
        /**
         * Reads the next character from the input and adjusts the row and column
         * accordingly.
         * @return {String} The next character or null if there is no next character.
         * @method read
         */
        read: function() {
          var c = null;
          if (this._cursor < this._input.length) {
            if (this._input.charAt(this._cursor) === "\n") {
              this._line++;
              this._col = 1;
            } else {
              this._col++;
            }
            c = this._input.charAt(this._cursor++);
          }
          return c;
        },
        //-------------------------------------------------------------------------
        // Misc
        //-------------------------------------------------------------------------
        /**
         * Saves the current location so it can be returned to later.
         * @method mark
         * @return {void}
         */
        mark: function() {
          this._bookmark = {
            cursor: this._cursor,
            line: this._line,
            col: this._col
          };
        },
        reset: function() {
          if (this._bookmark) {
            this._cursor = this._bookmark.cursor;
            this._line = this._bookmark.line;
            this._col = this._bookmark.col;
            delete this._bookmark;
          }
        },
        //-------------------------------------------------------------------------
        // Advanced reading
        //-------------------------------------------------------------------------
        /**
         * Reads up to and including the given string. Throws an error if that
         * string is not found.
         * @param {String} pattern The string to read.
         * @return {String} The string when it is found.
         * @throws Error when the string pattern is not found.
         * @method readTo
         */
        readTo: function(pattern) {
          var buffer = "", c;
          while (buffer.length < pattern.length || buffer.lastIndexOf(pattern) !== buffer.length - pattern.length) {
            c = this.read();
            if (c) {
              buffer += c;
            } else {
              throw new Error(
                'Expected "' + pattern + '" at line ' + this._line + ", col " + this._col + "."
              );
            }
          }
          return buffer;
        },
        /**
         * Reads characters while each character causes the given
         * filter function to return true. The function is passed
         * in each character and either returns true to continue
         * reading or false to stop.
         * @param {Function} filter The function to read on each character.
         * @return {String} The string made up of all characters that passed the
         *      filter check.
         * @method readWhile
         */
        readWhile: function(filter) {
          var buffer = "", c = this.read();
          while (c !== null && filter(c)) {
            buffer += c;
            c = this.read();
          }
          return buffer;
        },
        /**
         * Reads characters that match either text or a regular expression and
         * returns those characters. If a match is found, the row and column
         * are adjusted; if no match is found, the reader's state is unchanged.
         * reading or false to stop.
         * @param {String|RegExp} matchter If a string, then the literal string
         *      value is searched for. If a regular expression, then any string
         *      matching the pattern is search for.
         * @return {String} The string made up of all characters that matched or
         *      null if there was no match.
         * @method readMatch
         */
        readMatch: function(matcher) {
          var source = this._input.substring(this._cursor), value = null;
          if (typeof matcher === "string") {
            if (source.indexOf(matcher) === 0) {
              value = this.readCount(matcher.length);
            }
          } else if (matcher instanceof RegExp) {
            if (matcher.test(source)) {
              value = this.readCount(RegExp.lastMatch.length);
            }
          }
          return value;
        },
        /**
         * Reads a given number of characters. If the end of the input is reached,
         * it reads only the remaining characters and does not throw an error.
         * @param {int} count The number of characters to read.
         * @return {String} The string made up the read characters.
         * @method readCount
         */
        readCount: function(count) {
          var buffer = "";
          while (count--) {
            buffer += this.read();
          }
          return buffer;
        }
      };
      function SyntaxError2(message, line, col) {
        Error.call(this);
        this.name = this.constructor.name;
        this.col = col;
        this.line = line;
        this.message = message;
      }
      SyntaxError2.prototype = Object.create(Error.prototype);
      SyntaxError2.prototype.constructor = SyntaxError2;
      function SyntaxUnit(text, line, col, type) {
        this.col = col;
        this.line = line;
        this.text = text;
        this.type = type;
      }
      SyntaxUnit.fromToken = function(token) {
        return new SyntaxUnit(token.value, token.startLine, token.startCol);
      };
      SyntaxUnit.prototype = {
        //restore constructor
        constructor: SyntaxUnit,
        /**
         * Returns the text representation of the unit.
         * @return {String} The text representation of the unit.
         * @method valueOf
         */
        valueOf: function() {
          return this.toString();
        },
        /**
         * Returns the text representation of the unit.
         * @return {String} The text representation of the unit.
         * @method toString
         */
        toString: function() {
          return this.text;
        }
      };
      function TokenStreamBase(input, tokenData) {
        this._reader = input ? new StringReader(input.toString()) : null;
        this._token = null;
        this._tokenData = tokenData;
        this._lt = [];
        this._ltIndex = 0;
        this._ltIndexCache = [];
      }
      TokenStreamBase.createTokenData = function(tokens) {
        var nameMap = [], typeMap = /* @__PURE__ */ Object.create(null), tokenData = tokens.concat([]), i = 0, len = tokenData.length + 1;
        tokenData.UNKNOWN = -1;
        tokenData.unshift({ name: "EOF" });
        for (; i < len; i++) {
          nameMap.push(tokenData[i].name);
          tokenData[tokenData[i].name] = i;
          if (tokenData[i].text) {
            typeMap[tokenData[i].text] = i;
          }
        }
        tokenData.name = function(tt) {
          return nameMap[tt];
        };
        tokenData.type = function(c) {
          return typeMap[c];
        };
        return tokenData;
      };
      TokenStreamBase.prototype = {
        //restore constructor
        constructor: TokenStreamBase,
        //-------------------------------------------------------------------------
        // Matching methods
        //-------------------------------------------------------------------------
        /**
         * Determines if the next token matches the given token type.
         * If so, that token is consumed; if not, the token is placed
         * back onto the token stream. You can pass in any number of
         * token types and this will return true if any of the token
         * types is found.
         * @param {int|int[]} tokenTypes Either a single token type or an array of
         *      token types that the next token might be. If an array is passed,
         *      it's assumed that the token can be any of these.
         * @param {variant} channel (Optional) The channel to read from. If not
         *      provided, reads from the default (unnamed) channel.
         * @return {Boolean} True if the token type matches, false if not.
         * @method match
         */
        match: function(tokenTypes, channel) {
          if (!(tokenTypes instanceof Array)) {
            tokenTypes = [tokenTypes];
          }
          var tt = this.get(channel), i = 0, len = tokenTypes.length;
          while (i < len) {
            if (tt === tokenTypes[i++]) {
              return true;
            }
          }
          this.unget();
          return false;
        },
        /**
         * Determines if the next token matches the given token type.
         * If so, that token is consumed; if not, an error is thrown.
         * @param {int|int[]} tokenTypes Either a single token type or an array of
         *      token types that the next token should be. If an array is passed,
         *      it's assumed that the token must be one of these.
         * @param {variant} channel (Optional) The channel to read from. If not
         *      provided, reads from the default (unnamed) channel.
         * @return {void}
         * @method mustMatch
         */
        mustMatch: function(tokenTypes, channel) {
          var token;
          if (!(tokenTypes instanceof Array)) {
            tokenTypes = [tokenTypes];
          }
          if (!this.match.apply(this, arguments)) {
            token = this.LT(1);
            throw new SyntaxError2(
              "Expected " + this._tokenData[tokenTypes[0]].name + " at line " + token.startLine + ", col " + token.startCol + ".",
              token.startLine,
              token.startCol
            );
          }
        },
        //-------------------------------------------------------------------------
        // Consuming methods
        //-------------------------------------------------------------------------
        /**
         * Keeps reading from the token stream until either one of the specified
         * token types is found or until the end of the input is reached.
         * @param {int|int[]} tokenTypes Either a single token type or an array of
         *      token types that the next token should be. If an array is passed,
         *      it's assumed that the token must be one of these.
         * @param {variant} channel (Optional) The channel to read from. If not
         *      provided, reads from the default (unnamed) channel.
         * @return {void}
         * @method advance
         */
        advance: function(tokenTypes, channel) {
          while (this.LA(0) !== 0 && !this.match(tokenTypes, channel)) {
            this.get();
          }
          return this.LA(0);
        },
        /**
         * Consumes the next token from the token stream.
         * @return {int} The token type of the token that was just consumed.
         * @method get
         */
        get: function(channel) {
          var tokenInfo = this._tokenData, i = 0, token, info;
          if (this._lt.length && this._ltIndex >= 0 && this._ltIndex < this._lt.length) {
            i++;
            this._token = this._lt[this._ltIndex++];
            info = tokenInfo[this._token.type];
            while (info.channel !== void 0 && channel !== info.channel && this._ltIndex < this._lt.length) {
              this._token = this._lt[this._ltIndex++];
              info = tokenInfo[this._token.type];
              i++;
            }
            if ((info.channel === void 0 || channel === info.channel) && this._ltIndex <= this._lt.length) {
              this._ltIndexCache.push(i);
              return this._token.type;
            }
          }
          token = this._getToken();
          if (token.type > -1 && !tokenInfo[token.type].hide) {
            token.channel = tokenInfo[token.type].channel;
            this._token = token;
            this._lt.push(token);
            this._ltIndexCache.push(this._lt.length - this._ltIndex + i);
            if (this._lt.length > 5) {
              this._lt.shift();
            }
            if (this._ltIndexCache.length > 5) {
              this._ltIndexCache.shift();
            }
            this._ltIndex = this._lt.length;
          }
          info = tokenInfo[token.type];
          if (info && (info.hide || info.channel !== void 0 && channel !== info.channel)) {
            return this.get(channel);
          } else {
            return token.type;
          }
        },
        /**
         * Looks ahead a certain number of tokens and returns the token type at
         * that position. This will throw an error if you lookahead past the
         * end of input, past the size of the lookahead buffer, or back past
         * the first token in the lookahead buffer.
         * @param {int} The index of the token type to retrieve. 0 for the
         *      current token, 1 for the next, -1 for the previous, etc.
         * @return {int} The token type of the token in the given position.
         * @method LA
         */
        LA: function(index) {
          var total = index, tt;
          if (index > 0) {
            if (index > 5) {
              throw new Error("Too much lookahead.");
            }
            while (total) {
              tt = this.get();
              total--;
            }
            while (total < index) {
              this.unget();
              total++;
            }
          } else if (index < 0) {
            if (this._lt[this._ltIndex + index]) {
              tt = this._lt[this._ltIndex + index].type;
            } else {
              throw new Error("Too much lookbehind.");
            }
          } else {
            tt = this._token.type;
          }
          return tt;
        },
        /**
         * Looks ahead a certain number of tokens and returns the token at
         * that position. This will throw an error if you lookahead past the
         * end of input, past the size of the lookahead buffer, or back past
         * the first token in the lookahead buffer.
         * @param {int} The index of the token type to retrieve. 0 for the
         *      current token, 1 for the next, -1 for the previous, etc.
         * @return {Object} The token of the token in the given position.
         * @method LA
         */
        LT: function(index) {
          this.LA(index);
          return this._lt[this._ltIndex + index - 1];
        },
        /**
         * Returns the token type for the next token in the stream without
         * consuming it.
         * @return {int} The token type of the next token in the stream.
         * @method peek
         */
        peek: function() {
          return this.LA(1);
        },
        /**
         * Returns the actual token object for the last consumed token.
         * @return {Token} The token object for the last consumed token.
         * @method token
         */
        token: function() {
          return this._token;
        },
        /**
         * Returns the name of the token for the given token type.
         * @param {int} tokenType The type of token to get the name of.
         * @return {String} The name of the token or "UNKNOWN_TOKEN" for any
         *      invalid token type.
         * @method tokenName
         */
        tokenName: function(tokenType) {
          if (tokenType < 0 || tokenType > this._tokenData.length) {
            return "UNKNOWN_TOKEN";
          } else {
            return this._tokenData[tokenType].name;
          }
        },
        /**
         * Returns the token type value for the given token name.
         * @param {String} tokenName The name of the token whose value should be returned.
         * @return {int} The token type value for the given token name or -1
         *      for an unknown token.
         * @method tokenName
         */
        tokenType: function(tokenName) {
          return this._tokenData[tokenName] || -1;
        },
        /**
         * Returns the last consumed token to the token stream.
         * @method unget
         */
        unget: function() {
          if (this._ltIndexCache.length) {
            this._ltIndex -= this._ltIndexCache.pop();
            this._token = this._lt[this._ltIndex - 1];
          } else {
            throw new Error("Too much lookahead.");
          }
        }
      };
      parserlib.util = {
        __proto__: null,
        StringReader,
        SyntaxError: SyntaxError2,
        SyntaxUnit,
        EventTarget,
        TokenStreamBase
      };
    })();
    (function() {
      var EventTarget = parserlib.util.EventTarget, TokenStreamBase = parserlib.util.TokenStreamBase, StringReader = parserlib.util.StringReader, SyntaxError2 = parserlib.util.SyntaxError, SyntaxUnit = parserlib.util.SyntaxUnit;
      var Colors = {
        __proto__: null,
        aliceblue: "#f0f8ff",
        antiquewhite: "#faebd7",
        aqua: "#00ffff",
        aquamarine: "#7fffd4",
        azure: "#f0ffff",
        beige: "#f5f5dc",
        bisque: "#ffe4c4",
        black: "#000000",
        blanchedalmond: "#ffebcd",
        blue: "#0000ff",
        blueviolet: "#8a2be2",
        brown: "#a52a2a",
        burlywood: "#deb887",
        cadetblue: "#5f9ea0",
        chartreuse: "#7fff00",
        chocolate: "#d2691e",
        coral: "#ff7f50",
        cornflowerblue: "#6495ed",
        cornsilk: "#fff8dc",
        crimson: "#dc143c",
        cyan: "#00ffff",
        darkblue: "#00008b",
        darkcyan: "#008b8b",
        darkgoldenrod: "#b8860b",
        darkgray: "#a9a9a9",
        darkgrey: "#a9a9a9",
        darkgreen: "#006400",
        darkkhaki: "#bdb76b",
        darkmagenta: "#8b008b",
        darkolivegreen: "#556b2f",
        darkorange: "#ff8c00",
        darkorchid: "#9932cc",
        darkred: "#8b0000",
        darksalmon: "#e9967a",
        darkseagreen: "#8fbc8f",
        darkslateblue: "#483d8b",
        darkslategray: "#2f4f4f",
        darkslategrey: "#2f4f4f",
        darkturquoise: "#00ced1",
        darkviolet: "#9400d3",
        deeppink: "#ff1493",
        deepskyblue: "#00bfff",
        dimgray: "#696969",
        dimgrey: "#696969",
        dodgerblue: "#1e90ff",
        firebrick: "#b22222",
        floralwhite: "#fffaf0",
        forestgreen: "#228b22",
        fuchsia: "#ff00ff",
        gainsboro: "#dcdcdc",
        ghostwhite: "#f8f8ff",
        gold: "#ffd700",
        goldenrod: "#daa520",
        gray: "#808080",
        grey: "#808080",
        green: "#008000",
        greenyellow: "#adff2f",
        honeydew: "#f0fff0",
        hotpink: "#ff69b4",
        indianred: "#cd5c5c",
        indigo: "#4b0082",
        ivory: "#fffff0",
        khaki: "#f0e68c",
        lavender: "#e6e6fa",
        lavenderblush: "#fff0f5",
        lawngreen: "#7cfc00",
        lemonchiffon: "#fffacd",
        lightblue: "#add8e6",
        lightcoral: "#f08080",
        lightcyan: "#e0ffff",
        lightgoldenrodyellow: "#fafad2",
        lightgray: "#d3d3d3",
        lightgrey: "#d3d3d3",
        lightgreen: "#90ee90",
        lightpink: "#ffb6c1",
        lightsalmon: "#ffa07a",
        lightseagreen: "#20b2aa",
        lightskyblue: "#87cefa",
        lightslategray: "#778899",
        lightslategrey: "#778899",
        lightsteelblue: "#b0c4de",
        lightyellow: "#ffffe0",
        lime: "#00ff00",
        limegreen: "#32cd32",
        linen: "#faf0e6",
        magenta: "#ff00ff",
        maroon: "#800000",
        mediumaquamarine: "#66cdaa",
        mediumblue: "#0000cd",
        mediumorchid: "#ba55d3",
        mediumpurple: "#9370d8",
        mediumseagreen: "#3cb371",
        mediumslateblue: "#7b68ee",
        mediumspringgreen: "#00fa9a",
        mediumturquoise: "#48d1cc",
        mediumvioletred: "#c71585",
        midnightblue: "#191970",
        mintcream: "#f5fffa",
        mistyrose: "#ffe4e1",
        moccasin: "#ffe4b5",
        navajowhite: "#ffdead",
        navy: "#000080",
        oldlace: "#fdf5e6",
        olive: "#808000",
        olivedrab: "#6b8e23",
        orange: "#ffa500",
        orangered: "#ff4500",
        orchid: "#da70d6",
        palegoldenrod: "#eee8aa",
        palegreen: "#98fb98",
        paleturquoise: "#afeeee",
        palevioletred: "#d87093",
        papayawhip: "#ffefd5",
        peachpuff: "#ffdab9",
        peru: "#cd853f",
        pink: "#ffc0cb",
        plum: "#dda0dd",
        powderblue: "#b0e0e6",
        purple: "#800080",
        red: "#ff0000",
        rosybrown: "#bc8f8f",
        royalblue: "#4169e1",
        saddlebrown: "#8b4513",
        salmon: "#fa8072",
        sandybrown: "#f4a460",
        seagreen: "#2e8b57",
        seashell: "#fff5ee",
        sienna: "#a0522d",
        silver: "#c0c0c0",
        skyblue: "#87ceeb",
        slateblue: "#6a5acd",
        slategray: "#708090",
        slategrey: "#708090",
        snow: "#fffafa",
        springgreen: "#00ff7f",
        steelblue: "#4682b4",
        tan: "#d2b48c",
        teal: "#008080",
        thistle: "#d8bfd8",
        tomato: "#ff6347",
        turquoise: "#40e0d0",
        violet: "#ee82ee",
        wheat: "#f5deb3",
        white: "#ffffff",
        whitesmoke: "#f5f5f5",
        yellow: "#ffff00",
        yellowgreen: "#9acd32",
        //'currentColor' color keyword http://www.w3.org/TR/css3-color/#currentcolor
        currentColor: "The value of the 'color' property.",
        //CSS2 system colors http://www.w3.org/TR/css3-color/#css2-system
        activeBorder: "Active window border.",
        activecaption: "Active window caption.",
        appworkspace: "Background color of multiple document interface.",
        background: "Desktop background.",
        buttonface: "The face background color for 3-D elements that appear 3-D due to one layer of surrounding border.",
        buttonhighlight: "The color of the border facing the light source for 3-D elements that appear 3-D due to one layer of surrounding border.",
        buttonshadow: "The color of the border away from the light source for 3-D elements that appear 3-D due to one layer of surrounding border.",
        buttontext: "Text on push buttons.",
        captiontext: "Text in caption, size box, and scrollbar arrow box.",
        graytext: "Grayed (disabled) text. This color is set to #000 if the current display driver does not support a solid gray color.",
        greytext: "Greyed (disabled) text. This color is set to #000 if the current display driver does not support a solid grey color.",
        highlight: "Item(s) selected in a control.",
        highlighttext: "Text of item(s) selected in a control.",
        inactiveborder: "Inactive window border.",
        inactivecaption: "Inactive window caption.",
        inactivecaptiontext: "Color of text in an inactive caption.",
        infobackground: "Background color for tooltip controls.",
        infotext: "Text color for tooltip controls.",
        menu: "Menu background.",
        menutext: "Text in menus.",
        scrollbar: "Scroll bar gray area.",
        threeddarkshadow: "The color of the darker (generally outer) of the two borders away from the light source for 3-D elements that appear 3-D due to two concentric layers of surrounding border.",
        threedface: "The face background color for 3-D elements that appear 3-D due to two concentric layers of surrounding border.",
        threedhighlight: "The color of the lighter (generally outer) of the two borders facing the light source for 3-D elements that appear 3-D due to two concentric layers of surrounding border.",
        threedlightshadow: "The color of the darker (generally inner) of the two borders facing the light source for 3-D elements that appear 3-D due to two concentric layers of surrounding border.",
        threedshadow: "The color of the lighter (generally inner) of the two borders away from the light source for 3-D elements that appear 3-D due to two concentric layers of surrounding border.",
        window: "Window background.",
        windowframe: "Window frame.",
        windowtext: "Text in windows."
      };
      function Combinator(text, line, col) {
        SyntaxUnit.call(this, text, line, col, Parser.COMBINATOR_TYPE);
        this.type = "unknown";
        if (/^\s+$/.test(text)) {
          this.type = "descendant";
        } else if (text === ">") {
          this.type = "child";
        } else if (text === "+") {
          this.type = "adjacent-sibling";
        } else if (text === "~") {
          this.type = "sibling";
        }
      }
      Combinator.prototype = new SyntaxUnit();
      Combinator.prototype.constructor = Combinator;
      function MediaFeature(name, value) {
        SyntaxUnit.call(
          this,
          "(" + name + (value !== null ? ":" + value : "") + ")",
          name.startLine,
          name.startCol,
          Parser.MEDIA_FEATURE_TYPE
        );
        this.name = name;
        this.value = value;
      }
      MediaFeature.prototype = new SyntaxUnit();
      MediaFeature.prototype.constructor = MediaFeature;
      function MediaQuery(modifier, mediaType, features, line, col) {
        SyntaxUnit.call(
          this,
          (modifier ? modifier + " " : "") + (mediaType ? mediaType : "") + (mediaType && features.length > 0 ? " and " : "") + features.join(" and "),
          line,
          col,
          Parser.MEDIA_QUERY_TYPE
        );
        this.modifier = modifier;
        this.mediaType = mediaType;
        this.features = features;
      }
      MediaQuery.prototype = new SyntaxUnit();
      MediaQuery.prototype.constructor = MediaQuery;
      function Parser(options2) {
        EventTarget.call(this);
        this.options = options2 || {};
        this._tokenStream = null;
      }
      Parser.DEFAULT_TYPE = 0;
      Parser.COMBINATOR_TYPE = 1;
      Parser.MEDIA_FEATURE_TYPE = 2;
      Parser.MEDIA_QUERY_TYPE = 3;
      Parser.PROPERTY_NAME_TYPE = 4;
      Parser.PROPERTY_VALUE_TYPE = 5;
      Parser.PROPERTY_VALUE_PART_TYPE = 6;
      Parser.SELECTOR_TYPE = 7;
      Parser.SELECTOR_PART_TYPE = 8;
      Parser.SELECTOR_SUB_PART_TYPE = 9;
      Parser.prototype = function() {
        var proto = new EventTarget(), prop, additions = {
          __proto__: null,
          //restore constructor
          constructor: Parser,
          //instance constants - yuck
          DEFAULT_TYPE: 0,
          COMBINATOR_TYPE: 1,
          MEDIA_FEATURE_TYPE: 2,
          MEDIA_QUERY_TYPE: 3,
          PROPERTY_NAME_TYPE: 4,
          PROPERTY_VALUE_TYPE: 5,
          PROPERTY_VALUE_PART_TYPE: 6,
          SELECTOR_TYPE: 7,
          SELECTOR_PART_TYPE: 8,
          SELECTOR_SUB_PART_TYPE: 9,
          //-----------------------------------------------------------------
          // Grammar
          //-----------------------------------------------------------------
          _stylesheet: function() {
            var tokenStream = this._tokenStream, count, token, tt;
            this.fire("startstylesheet");
            this._charset();
            this._skipCruft();
            while (tokenStream.peek() === Tokens.IMPORT_SYM) {
              this._import();
              this._skipCruft();
            }
            while (tokenStream.peek() === Tokens.NAMESPACE_SYM) {
              this._namespace();
              this._skipCruft();
            }
            tt = tokenStream.peek();
            while (tt > Tokens.EOF) {
              try {
                switch (tt) {
                  case Tokens.MEDIA_SYM:
                    this._media();
                    this._skipCruft();
                    break;
                  case Tokens.PAGE_SYM:
                    this._page();
                    this._skipCruft();
                    break;
                  case Tokens.FONT_FACE_SYM:
                    this._font_face();
                    this._skipCruft();
                    break;
                  case Tokens.KEYFRAMES_SYM:
                    this._keyframes();
                    this._skipCruft();
                    break;
                  case Tokens.VIEWPORT_SYM:
                    this._viewport();
                    this._skipCruft();
                    break;
                  case Tokens.DOCUMENT_SYM:
                    this._document();
                    this._skipCruft();
                    break;
                  case Tokens.UNKNOWN_SYM:
                    tokenStream.get();
                    if (!this.options.strict) {
                      this.fire({
                        type: "error",
                        error: null,
                        message: "Unknown @ rule: " + tokenStream.LT(0).value + ".",
                        line: tokenStream.LT(0).startLine,
                        col: tokenStream.LT(0).startCol
                      });
                      count = 0;
                      while (tokenStream.advance([Tokens.LBRACE, Tokens.RBRACE]) === Tokens.LBRACE) {
                        count++;
                      }
                      while (count) {
                        tokenStream.advance([Tokens.RBRACE]);
                        count--;
                      }
                    } else {
                      throw new SyntaxError2(
                        "Unknown @ rule.",
                        tokenStream.LT(0).startLine,
                        tokenStream.LT(0).startCol
                      );
                    }
                    break;
                  case Tokens.S:
                    this._readWhitespace();
                    break;
                  default:
                    if (!this._ruleset()) {
                      switch (tt) {
                        case Tokens.CHARSET_SYM:
                          token = tokenStream.LT(1);
                          this._charset(false);
                          throw new SyntaxError2(
                            "@charset not allowed here.",
                            token.startLine,
                            token.startCol
                          );
                        case Tokens.IMPORT_SYM:
                          token = tokenStream.LT(1);
                          this._import(false);
                          throw new SyntaxError2(
                            "@import not allowed here.",
                            token.startLine,
                            token.startCol
                          );
                        case Tokens.NAMESPACE_SYM:
                          token = tokenStream.LT(1);
                          this._namespace(false);
                          throw new SyntaxError2(
                            "@namespace not allowed here.",
                            token.startLine,
                            token.startCol
                          );
                        default:
                          tokenStream.get();
                          this._unexpectedToken(tokenStream.token());
                      }
                    }
                }
              } catch (ex) {
                if (ex instanceof SyntaxError2 && !this.options.strict) {
                  this.fire({
                    type: "error",
                    error: ex,
                    message: ex.message,
                    line: ex.line,
                    col: ex.col
                  });
                } else {
                  throw ex;
                }
              }
              tt = tokenStream.peek();
            }
            if (tt !== Tokens.EOF) {
              this._unexpectedToken(tokenStream.token());
            }
            this.fire("endstylesheet");
          },
          _charset: function(emit) {
            var tokenStream = this._tokenStream, charset, token, line, col;
            if (tokenStream.match(Tokens.CHARSET_SYM)) {
              line = tokenStream.token().startLine;
              col = tokenStream.token().startCol;
              this._readWhitespace();
              tokenStream.mustMatch(Tokens.STRING);
              token = tokenStream.token();
              charset = token.value;
              this._readWhitespace();
              tokenStream.mustMatch(Tokens.SEMICOLON);
              if (emit !== false) {
                this.fire({
                  type: "charset",
                  charset,
                  line,
                  col
                });
              }
            }
          },
          _import: function(emit) {
            var tokenStream = this._tokenStream, uri, importToken, mediaList = [];
            tokenStream.mustMatch(Tokens.IMPORT_SYM);
            importToken = tokenStream.token();
            this._readWhitespace();
            tokenStream.mustMatch([Tokens.STRING, Tokens.URI]);
            uri = tokenStream.token().value.replace(/^(?:url\()?["']?([^"']+?)["']?\)?$/, "$1");
            this._readWhitespace();
            mediaList = this._media_query_list();
            tokenStream.mustMatch(Tokens.SEMICOLON);
            this._readWhitespace();
            if (emit !== false) {
              this.fire({
                type: "import",
                uri,
                media: mediaList,
                line: importToken.startLine,
                col: importToken.startCol
              });
            }
          },
          _namespace: function(emit) {
            var tokenStream = this._tokenStream, line, col, prefix, uri;
            tokenStream.mustMatch(Tokens.NAMESPACE_SYM);
            line = tokenStream.token().startLine;
            col = tokenStream.token().startCol;
            this._readWhitespace();
            if (tokenStream.match(Tokens.IDENT)) {
              prefix = tokenStream.token().value;
              this._readWhitespace();
            }
            tokenStream.mustMatch([Tokens.STRING, Tokens.URI]);
            uri = tokenStream.token().value.replace(/(?:url\()?["']([^"']+)["']\)?/, "$1");
            this._readWhitespace();
            tokenStream.mustMatch(Tokens.SEMICOLON);
            this._readWhitespace();
            if (emit !== false) {
              this.fire({
                type: "namespace",
                prefix,
                uri,
                line,
                col
              });
            }
          },
          _media: function() {
            var tokenStream = this._tokenStream, line, col, mediaList;
            tokenStream.mustMatch(Tokens.MEDIA_SYM);
            line = tokenStream.token().startLine;
            col = tokenStream.token().startCol;
            this._readWhitespace();
            mediaList = this._media_query_list();
            tokenStream.mustMatch(Tokens.LBRACE);
            this._readWhitespace();
            this.fire({
              type: "startmedia",
              media: mediaList,
              line,
              col
            });
            while (true) {
              if (tokenStream.peek() === Tokens.PAGE_SYM) {
                this._page();
              } else if (tokenStream.peek() === Tokens.FONT_FACE_SYM) {
                this._font_face();
              } else if (tokenStream.peek() === Tokens.VIEWPORT_SYM) {
                this._viewport();
              } else if (tokenStream.peek() === Tokens.DOCUMENT_SYM) {
                this._document();
              } else if (!this._ruleset()) {
                break;
              }
            }
            tokenStream.mustMatch(Tokens.RBRACE);
            this._readWhitespace();
            this.fire({
              type: "endmedia",
              media: mediaList,
              line,
              col
            });
          },
          //CSS3 Media Queries
          _media_query_list: function() {
            var tokenStream = this._tokenStream, mediaList = [];
            this._readWhitespace();
            if (tokenStream.peek() === Tokens.IDENT || tokenStream.peek() === Tokens.LPAREN) {
              mediaList.push(this._media_query());
            }
            while (tokenStream.match(Tokens.COMMA)) {
              this._readWhitespace();
              mediaList.push(this._media_query());
            }
            return mediaList;
          },
          /*
                       * Note: "expression" in the grammar maps to the _media_expression
                       * method.
          
                       */
          _media_query: function() {
            var tokenStream = this._tokenStream, type = null, ident = null, token = null, expressions = [];
            if (tokenStream.match(Tokens.IDENT)) {
              ident = tokenStream.token().value.toLowerCase();
              if (ident !== "only" && ident !== "not") {
                tokenStream.unget();
                ident = null;
              } else {
                token = tokenStream.token();
              }
            }
            this._readWhitespace();
            if (tokenStream.peek() === Tokens.IDENT) {
              type = this._media_type();
              if (token === null) {
                token = tokenStream.token();
              }
            } else if (tokenStream.peek() === Tokens.LPAREN) {
              if (token === null) {
                token = tokenStream.LT(1);
              }
              expressions.push(this._media_expression());
            }
            if (type === null && expressions.length === 0) {
              return null;
            } else {
              this._readWhitespace();
              while (tokenStream.match(Tokens.IDENT)) {
                if (tokenStream.token().value.toLowerCase() !== "and") {
                  this._unexpectedToken(tokenStream.token());
                }
                this._readWhitespace();
                expressions.push(this._media_expression());
              }
            }
            return new MediaQuery(ident, type, expressions, token.startLine, token.startCol);
          },
          //CSS3 Media Queries
          _media_type: function() {
            return this._media_feature();
          },
          /**
           * Note: in CSS3 Media Queries, this is called "expression".
           * Renamed here to avoid conflict with CSS3 Selectors
           * definition of "expression". Also note that "expr" in the
           * grammar now maps to "expression" from CSS3 selectors.
           * @method _media_expression
           * @private
           */
          _media_expression: function() {
            var tokenStream = this._tokenStream, feature = null, token, expression = null;
            tokenStream.mustMatch(Tokens.LPAREN);
            feature = this._media_feature();
            this._readWhitespace();
            if (tokenStream.match(Tokens.COLON)) {
              this._readWhitespace();
              token = tokenStream.LT(1);
              expression = this._expression();
            }
            tokenStream.mustMatch(Tokens.RPAREN);
            this._readWhitespace();
            return new MediaFeature(
              feature,
              expression ? new SyntaxUnit(expression, token.startLine, token.startCol) : null
            );
          },
          //CSS3 Media Queries
          _media_feature: function() {
            var tokenStream = this._tokenStream;
            this._readWhitespace();
            tokenStream.mustMatch(Tokens.IDENT);
            return SyntaxUnit.fromToken(tokenStream.token());
          },
          //CSS3 Paged Media
          _page: function() {
            var tokenStream = this._tokenStream, line, col, identifier = null, pseudoPage = null;
            tokenStream.mustMatch(Tokens.PAGE_SYM);
            line = tokenStream.token().startLine;
            col = tokenStream.token().startCol;
            this._readWhitespace();
            if (tokenStream.match(Tokens.IDENT)) {
              identifier = tokenStream.token().value;
              if (identifier.toLowerCase() === "auto") {
                this._unexpectedToken(tokenStream.token());
              }
            }
            if (tokenStream.peek() === Tokens.COLON) {
              pseudoPage = this._pseudo_page();
            }
            this._readWhitespace();
            this.fire({
              type: "startpage",
              id: identifier,
              pseudo: pseudoPage,
              line,
              col
            });
            this._readDeclarations(true, true);
            this.fire({
              type: "endpage",
              id: identifier,
              pseudo: pseudoPage,
              line,
              col
            });
          },
          //CSS3 Paged Media
          _margin: function() {
            var tokenStream = this._tokenStream, line, col, marginSym = this._margin_sym();
            if (marginSym) {
              line = tokenStream.token().startLine;
              col = tokenStream.token().startCol;
              this.fire({
                type: "startpagemargin",
                margin: marginSym,
                line,
                col
              });
              this._readDeclarations(true);
              this.fire({
                type: "endpagemargin",
                margin: marginSym,
                line,
                col
              });
              return true;
            } else {
              return false;
            }
          },
          //CSS3 Paged Media
          _margin_sym: function() {
            var tokenStream = this._tokenStream;
            if (tokenStream.match([
              Tokens.TOPLEFTCORNER_SYM,
              Tokens.TOPLEFT_SYM,
              Tokens.TOPCENTER_SYM,
              Tokens.TOPRIGHT_SYM,
              Tokens.TOPRIGHTCORNER_SYM,
              Tokens.BOTTOMLEFTCORNER_SYM,
              Tokens.BOTTOMLEFT_SYM,
              Tokens.BOTTOMCENTER_SYM,
              Tokens.BOTTOMRIGHT_SYM,
              Tokens.BOTTOMRIGHTCORNER_SYM,
              Tokens.LEFTTOP_SYM,
              Tokens.LEFTMIDDLE_SYM,
              Tokens.LEFTBOTTOM_SYM,
              Tokens.RIGHTTOP_SYM,
              Tokens.RIGHTMIDDLE_SYM,
              Tokens.RIGHTBOTTOM_SYM
            ])) {
              return SyntaxUnit.fromToken(tokenStream.token());
            } else {
              return null;
            }
          },
          _pseudo_page: function() {
            var tokenStream = this._tokenStream;
            tokenStream.mustMatch(Tokens.COLON);
            tokenStream.mustMatch(Tokens.IDENT);
            return tokenStream.token().value;
          },
          _font_face: function() {
            var tokenStream = this._tokenStream, line, col;
            tokenStream.mustMatch(Tokens.FONT_FACE_SYM);
            line = tokenStream.token().startLine;
            col = tokenStream.token().startCol;
            this._readWhitespace();
            this.fire({
              type: "startfontface",
              line,
              col
            });
            this._readDeclarations(true);
            this.fire({
              type: "endfontface",
              line,
              col
            });
          },
          _viewport: function() {
            var tokenStream = this._tokenStream, line, col;
            tokenStream.mustMatch(Tokens.VIEWPORT_SYM);
            line = tokenStream.token().startLine;
            col = tokenStream.token().startCol;
            this._readWhitespace();
            this.fire({
              type: "startviewport",
              line,
              col
            });
            this._readDeclarations(true);
            this.fire({
              type: "endviewport",
              line,
              col
            });
          },
          _document: function() {
            var tokenStream = this._tokenStream, token, functions = [], prefix = "";
            tokenStream.mustMatch(Tokens.DOCUMENT_SYM);
            token = tokenStream.token();
            if (/^@\-([^\-]+)\-/.test(token.value)) {
              prefix = RegExp.$1;
            }
            this._readWhitespace();
            functions.push(this._document_function());
            while (tokenStream.match(Tokens.COMMA)) {
              this._readWhitespace();
              functions.push(this._document_function());
            }
            tokenStream.mustMatch(Tokens.LBRACE);
            this._readWhitespace();
            this.fire({
              type: "startdocument",
              functions,
              prefix,
              line: token.startLine,
              col: token.startCol
            });
            while (true) {
              if (tokenStream.peek() === Tokens.PAGE_SYM) {
                this._page();
              } else if (tokenStream.peek() === Tokens.FONT_FACE_SYM) {
                this._font_face();
              } else if (tokenStream.peek() === Tokens.VIEWPORT_SYM) {
                this._viewport();
              } else if (tokenStream.peek() === Tokens.MEDIA_SYM) {
                this._media();
              } else if (!this._ruleset()) {
                break;
              }
            }
            tokenStream.mustMatch(Tokens.RBRACE);
            this._readWhitespace();
            this.fire({
              type: "enddocument",
              functions,
              prefix,
              line: token.startLine,
              col: token.startCol
            });
          },
          _document_function: function() {
            var tokenStream = this._tokenStream, value;
            if (tokenStream.match(Tokens.URI)) {
              value = tokenStream.token().value;
              this._readWhitespace();
            } else {
              value = this._function();
            }
            return value;
          },
          _operator: function(inFunction) {
            var tokenStream = this._tokenStream, token = null;
            if (tokenStream.match([Tokens.SLASH, Tokens.COMMA]) || inFunction && tokenStream.match([Tokens.PLUS, Tokens.STAR, Tokens.MINUS])) {
              token = tokenStream.token();
              this._readWhitespace();
            }
            return token ? PropertyValuePart.fromToken(token) : null;
          },
          _combinator: function() {
            var tokenStream = this._tokenStream, value = null, token;
            if (tokenStream.match([Tokens.PLUS, Tokens.GREATER, Tokens.TILDE])) {
              token = tokenStream.token();
              value = new Combinator(token.value, token.startLine, token.startCol);
              this._readWhitespace();
            }
            return value;
          },
          _unary_operator: function() {
            var tokenStream = this._tokenStream;
            if (tokenStream.match([Tokens.MINUS, Tokens.PLUS])) {
              return tokenStream.token().value;
            } else {
              return null;
            }
          },
          _property: function() {
            var tokenStream = this._tokenStream, value = null, hack = null, tokenValue, token, line, col;
            if (tokenStream.peek() === Tokens.STAR && this.options.starHack) {
              tokenStream.get();
              token = tokenStream.token();
              hack = token.value;
              line = token.startLine;
              col = token.startCol;
            }
            if (tokenStream.match(Tokens.IDENT)) {
              token = tokenStream.token();
              tokenValue = token.value;
              if (tokenValue.charAt(0) === "_" && this.options.underscoreHack) {
                hack = "_";
                tokenValue = tokenValue.substring(1);
              }
              value = new PropertyName(
                tokenValue,
                hack,
                line || token.startLine,
                col || token.startCol
              );
              this._readWhitespace();
            }
            return value;
          },
          //Augmented with CSS3 Selectors
          _ruleset: function() {
            var tokenStream = this._tokenStream, tt, selectors;
            try {
              selectors = this._selectors_group();
            } catch (ex) {
              if (ex instanceof SyntaxError2 && !this.options.strict) {
                this.fire({
                  type: "error",
                  error: ex,
                  message: ex.message,
                  line: ex.line,
                  col: ex.col
                });
                tt = tokenStream.advance([Tokens.RBRACE]);
                if (tt === Tokens.RBRACE) {
                } else {
                  throw ex;
                }
              } else {
                throw ex;
              }
              return true;
            }
            if (selectors) {
              this.fire({
                type: "startrule",
                selectors,
                line: selectors[0].line,
                col: selectors[0].col
              });
              this._readDeclarations(true);
              this.fire({
                type: "endrule",
                selectors,
                line: selectors[0].line,
                col: selectors[0].col
              });
            }
            return selectors;
          },
          //CSS3 Selectors
          _selectors_group: function() {
            var tokenStream = this._tokenStream, selectors = [], selector;
            selector = this._selector();
            if (selector !== null) {
              selectors.push(selector);
              while (tokenStream.match(Tokens.COMMA)) {
                this._readWhitespace();
                selector = this._selector();
                if (selector !== null) {
                  selectors.push(selector);
                } else {
                  this._unexpectedToken(tokenStream.LT(1));
                }
              }
            }
            return selectors.length ? selectors : null;
          },
          //CSS3 Selectors
          _selector: function() {
            var tokenStream = this._tokenStream, selector = [], nextSelector = null, combinator = null, ws = null;
            nextSelector = this._simple_selector_sequence();
            if (nextSelector === null) {
              return null;
            }
            selector.push(nextSelector);
            do {
              combinator = this._combinator();
              if (combinator !== null) {
                selector.push(combinator);
                nextSelector = this._simple_selector_sequence();
                if (nextSelector === null) {
                  this._unexpectedToken(tokenStream.LT(1));
                } else {
                  selector.push(nextSelector);
                }
              } else {
                if (this._readWhitespace()) {
                  ws = new Combinator(
                    tokenStream.token().value,
                    tokenStream.token().startLine,
                    tokenStream.token().startCol
                  );
                  combinator = this._combinator();
                  nextSelector = this._simple_selector_sequence();
                  if (nextSelector === null) {
                    if (combinator !== null) {
                      this._unexpectedToken(tokenStream.LT(1));
                    }
                  } else {
                    if (combinator !== null) {
                      selector.push(combinator);
                    } else {
                      selector.push(ws);
                    }
                    selector.push(nextSelector);
                  }
                } else {
                  break;
                }
              }
            } while (true);
            return new Selector(selector, selector[0].line, selector[0].col);
          },
          //CSS3 Selectors
          _simple_selector_sequence: function() {
            var tokenStream = this._tokenStream, elementName = null, modifiers = [], selectorText = "", components = [
              //HASH
              function() {
                return tokenStream.match(Tokens.HASH) ? new SelectorSubPart(
                  tokenStream.token().value,
                  "id",
                  tokenStream.token().startLine,
                  tokenStream.token().startCol
                ) : null;
              },
              this._class,
              this._attrib,
              this._pseudo,
              this._negation
            ], i = 0, len = components.length, component = null, line, col;
            line = tokenStream.LT(1).startLine;
            col = tokenStream.LT(1).startCol;
            elementName = this._type_selector();
            if (!elementName) {
              elementName = this._universal();
            }
            if (elementName !== null) {
              selectorText += elementName;
            }
            while (true) {
              if (tokenStream.peek() === Tokens.S) {
                break;
              }
              while (i < len && component === null) {
                component = components[i++].call(this);
              }
              if (component === null) {
                if (selectorText === "") {
                  return null;
                } else {
                  break;
                }
              } else {
                i = 0;
                modifiers.push(component);
                selectorText += component.toString();
                component = null;
              }
            }
            return selectorText !== "" ? new SelectorPart(elementName, modifiers, selectorText, line, col) : null;
          },
          //CSS3 Selectors
          _type_selector: function() {
            var tokenStream = this._tokenStream, ns = this._namespace_prefix(), elementName = this._element_name();
            if (!elementName) {
              if (ns) {
                tokenStream.unget();
                if (ns.length > 1) {
                  tokenStream.unget();
                }
              }
              return null;
            } else {
              if (ns) {
                elementName.text = ns + elementName.text;
                elementName.col -= ns.length;
              }
              return elementName;
            }
          },
          //CSS3 Selectors
          _class: function() {
            var tokenStream = this._tokenStream, token;
            if (tokenStream.match(Tokens.DOT)) {
              tokenStream.mustMatch(Tokens.IDENT);
              token = tokenStream.token();
              return new SelectorSubPart(
                "." + token.value,
                "class",
                token.startLine,
                token.startCol - 1
              );
            } else {
              return null;
            }
          },
          //CSS3 Selectors
          _element_name: function() {
            var tokenStream = this._tokenStream, token;
            if (tokenStream.match(Tokens.IDENT)) {
              token = tokenStream.token();
              return new SelectorSubPart(token.value, "elementName", token.startLine, token.startCol);
            } else {
              return null;
            }
          },
          //CSS3 Selectors
          _namespace_prefix: function() {
            var tokenStream = this._tokenStream, value = "";
            if (tokenStream.LA(1) === Tokens.PIPE || tokenStream.LA(2) === Tokens.PIPE) {
              if (tokenStream.match([Tokens.IDENT, Tokens.STAR])) {
                value += tokenStream.token().value;
              }
              tokenStream.mustMatch(Tokens.PIPE);
              value += "|";
            }
            return value.length ? value : null;
          },
          //CSS3 Selectors
          _universal: function() {
            var tokenStream = this._tokenStream, value = "", ns;
            ns = this._namespace_prefix();
            if (ns) {
              value += ns;
            }
            if (tokenStream.match(Tokens.STAR)) {
              value += "*";
            }
            return value.length ? value : null;
          },
          //CSS3 Selectors
          _attrib: function() {
            var tokenStream = this._tokenStream, value = null, ns, token;
            if (tokenStream.match(Tokens.LBRACKET)) {
              token = tokenStream.token();
              value = token.value;
              value += this._readWhitespace();
              ns = this._namespace_prefix();
              if (ns) {
                value += ns;
              }
              tokenStream.mustMatch(Tokens.IDENT);
              value += tokenStream.token().value;
              value += this._readWhitespace();
              if (tokenStream.match([
                Tokens.PREFIXMATCH,
                Tokens.SUFFIXMATCH,
                Tokens.SUBSTRINGMATCH,
                Tokens.EQUALS,
                Tokens.INCLUDES,
                Tokens.DASHMATCH
              ])) {
                value += tokenStream.token().value;
                value += this._readWhitespace();
                tokenStream.mustMatch([Tokens.IDENT, Tokens.STRING]);
                value += tokenStream.token().value;
                value += this._readWhitespace();
              }
              tokenStream.mustMatch(Tokens.RBRACKET);
              return new SelectorSubPart(value + "]", "attribute", token.startLine, token.startCol);
            } else {
              return null;
            }
          },
          //CSS3 Selectors
          _pseudo: function() {
            var tokenStream = this._tokenStream, pseudo = null, colons = ":", line, col;
            if (tokenStream.match(Tokens.COLON)) {
              if (tokenStream.match(Tokens.COLON)) {
                colons += ":";
              }
              if (tokenStream.match(Tokens.IDENT)) {
                pseudo = tokenStream.token().value;
                line = tokenStream.token().startLine;
                col = tokenStream.token().startCol - colons.length;
              } else if (tokenStream.peek() === Tokens.FUNCTION) {
                line = tokenStream.LT(1).startLine;
                col = tokenStream.LT(1).startCol - colons.length;
                pseudo = this._functional_pseudo();
              }
              if (pseudo) {
                pseudo = new SelectorSubPart(colons + pseudo, "pseudo", line, col);
              }
            }
            return pseudo;
          },
          //CSS3 Selectors
          _functional_pseudo: function() {
            var tokenStream = this._tokenStream, value = null;
            if (tokenStream.match(Tokens.FUNCTION)) {
              value = tokenStream.token().value;
              value += this._readWhitespace();
              value += this._expression();
              tokenStream.mustMatch(Tokens.RPAREN);
              value += ")";
            }
            return value;
          },
          //CSS3 Selectors
          _expression: function() {
            var tokenStream = this._tokenStream, value = "";
            while (tokenStream.match([
              Tokens.PLUS,
              Tokens.MINUS,
              Tokens.DIMENSION,
              Tokens.NUMBER,
              Tokens.STRING,
              Tokens.IDENT,
              Tokens.LENGTH,
              Tokens.FREQ,
              Tokens.ANGLE,
              Tokens.TIME,
              Tokens.RESOLUTION,
              Tokens.SLASH
            ])) {
              value += tokenStream.token().value;
              value += this._readWhitespace();
            }
            return value.length ? value : null;
          },
          //CSS3 Selectors
          _negation: function() {
            var tokenStream = this._tokenStream, line, col, value = "", arg, subpart = null;
            if (tokenStream.match(Tokens.NOT)) {
              value = tokenStream.token().value;
              line = tokenStream.token().startLine;
              col = tokenStream.token().startCol;
              value += this._readWhitespace();
              arg = this._negation_arg();
              value += arg;
              value += this._readWhitespace();
              tokenStream.match(Tokens.RPAREN);
              value += tokenStream.token().value;
              subpart = new SelectorSubPart(value, "not", line, col);
              subpart.args.push(arg);
            }
            return subpart;
          },
          //CSS3 Selectors
          _negation_arg: function() {
            var tokenStream = this._tokenStream, args = [
              this._type_selector,
              this._universal,
              function() {
                return tokenStream.match(Tokens.HASH) ? new SelectorSubPart(
                  tokenStream.token().value,
                  "id",
                  tokenStream.token().startLine,
                  tokenStream.token().startCol
                ) : null;
              },
              this._class,
              this._attrib,
              this._pseudo
            ], arg = null, i = 0, len = args.length, line, col, part;
            line = tokenStream.LT(1).startLine;
            col = tokenStream.LT(1).startCol;
            while (i < len && arg === null) {
              arg = args[i].call(this);
              i++;
            }
            if (arg === null) {
              this._unexpectedToken(tokenStream.LT(1));
            }
            if (arg.type === "elementName") {
              part = new SelectorPart(arg, [], arg.toString(), line, col);
            } else {
              part = new SelectorPart(null, [arg], arg.toString(), line, col);
            }
            return part;
          },
          _declaration: function() {
            var tokenStream = this._tokenStream, property = null, expr = null, prio = null, invalid = null, propertyName = "";
            property = this._property();
            if (property !== null) {
              tokenStream.mustMatch(Tokens.COLON);
              this._readWhitespace();
              expr = this._expr();
              if (!expr || expr.length === 0) {
                this._unexpectedToken(tokenStream.LT(1));
              }
              prio = this._prio();
              propertyName = property.toString();
              if (this.options.starHack && property.hack === "*" || this.options.underscoreHack && property.hack === "_") {
                propertyName = property.text;
              }
              try {
                this._validateProperty(propertyName, expr);
              } catch (ex) {
                invalid = ex;
              }
              this.fire({
                type: "property",
                property,
                value: expr,
                important: prio,
                line: property.line,
                col: property.col,
                invalid
              });
              return true;
            } else {
              return false;
            }
          },
          _prio: function() {
            var tokenStream = this._tokenStream, result = tokenStream.match(Tokens.IMPORTANT_SYM);
            this._readWhitespace();
            return result;
          },
          _expr: function(inFunction) {
            var values = [], value = null, operator = null;
            value = this._term(inFunction);
            if (value !== null) {
              values.push(value);
              do {
                operator = this._operator(inFunction);
                if (operator) {
                  values.push(operator);
                }
                value = this._term(inFunction);
                if (value === null) {
                  break;
                } else {
                  values.push(value);
                }
              } while (true);
            }
            return values.length > 0 ? new PropertyValue(values, values[0].line, values[0].col) : null;
          },
          _term: function(inFunction) {
            var tokenStream = this._tokenStream, unary = null, value = null, endChar = null, token, line, col;
            unary = this._unary_operator();
            if (unary !== null) {
              line = tokenStream.token().startLine;
              col = tokenStream.token().startCol;
            }
            if (tokenStream.peek() === Tokens.IE_FUNCTION && this.options.ieFilters) {
              value = this._ie_function();
              if (unary === null) {
                line = tokenStream.token().startLine;
                col = tokenStream.token().startCol;
              }
            } else if (inFunction && tokenStream.match([Tokens.LPAREN, Tokens.LBRACE, Tokens.LBRACKET])) {
              token = tokenStream.token();
              endChar = token.endChar;
              value = token.value + this._expr(inFunction).text;
              if (unary === null) {
                line = tokenStream.token().startLine;
                col = tokenStream.token().startCol;
              }
              tokenStream.mustMatch(Tokens.type(endChar));
              value += endChar;
              this._readWhitespace();
            } else if (tokenStream.match([
              Tokens.NUMBER,
              Tokens.PERCENTAGE,
              Tokens.LENGTH,
              Tokens.ANGLE,
              Tokens.TIME,
              Tokens.FREQ,
              Tokens.STRING,
              Tokens.IDENT,
              Tokens.URI,
              Tokens.UNICODE_RANGE
            ])) {
              value = tokenStream.token().value;
              if (unary === null) {
                line = tokenStream.token().startLine;
                col = tokenStream.token().startCol;
              }
              this._readWhitespace();
            } else {
              token = this._hexcolor();
              if (token === null) {
                if (unary === null) {
                  line = tokenStream.LT(1).startLine;
                  col = tokenStream.LT(1).startCol;
                }
                if (value === null) {
                  if (tokenStream.LA(3) === Tokens.EQUALS && this.options.ieFilters) {
                    value = this._ie_function();
                  } else {
                    value = this._function();
                  }
                }
              } else {
                value = token.value;
                if (unary === null) {
                  line = token.startLine;
                  col = token.startCol;
                }
              }
            }
            return value !== null ? new PropertyValuePart(unary !== null ? unary + value : value, line, col) : null;
          },
          _function: function() {
            var tokenStream = this._tokenStream, functionText = null, expr = null, lt;
            if (tokenStream.match(Tokens.FUNCTION)) {
              functionText = tokenStream.token().value;
              this._readWhitespace();
              expr = this._expr(true);
              functionText += expr;
              if (this.options.ieFilters && tokenStream.peek() === Tokens.EQUALS) {
                do {
                  if (this._readWhitespace()) {
                    functionText += tokenStream.token().value;
                  }
                  if (tokenStream.LA(0) === Tokens.COMMA) {
                    functionText += tokenStream.token().value;
                  }
                  tokenStream.match(Tokens.IDENT);
                  functionText += tokenStream.token().value;
                  tokenStream.match(Tokens.EQUALS);
                  functionText += tokenStream.token().value;
                  lt = tokenStream.peek();
                  while (lt !== Tokens.COMMA && lt !== Tokens.S && lt !== Tokens.RPAREN) {
                    tokenStream.get();
                    functionText += tokenStream.token().value;
                    lt = tokenStream.peek();
                  }
                } while (tokenStream.match([Tokens.COMMA, Tokens.S]));
              }
              tokenStream.match(Tokens.RPAREN);
              functionText += ")";
              this._readWhitespace();
            }
            return functionText;
          },
          _ie_function: function() {
            var tokenStream = this._tokenStream, functionText = null, lt;
            if (tokenStream.match([Tokens.IE_FUNCTION, Tokens.FUNCTION])) {
              functionText = tokenStream.token().value;
              do {
                if (this._readWhitespace()) {
                  functionText += tokenStream.token().value;
                }
                if (tokenStream.LA(0) === Tokens.COMMA) {
                  functionText += tokenStream.token().value;
                }
                tokenStream.match(Tokens.IDENT);
                functionText += tokenStream.token().value;
                tokenStream.match(Tokens.EQUALS);
                functionText += tokenStream.token().value;
                lt = tokenStream.peek();
                while (lt !== Tokens.COMMA && lt !== Tokens.S && lt !== Tokens.RPAREN) {
                  tokenStream.get();
                  functionText += tokenStream.token().value;
                  lt = tokenStream.peek();
                }
              } while (tokenStream.match([Tokens.COMMA, Tokens.S]));
              tokenStream.match(Tokens.RPAREN);
              functionText += ")";
              this._readWhitespace();
            }
            return functionText;
          },
          _hexcolor: function() {
            var tokenStream = this._tokenStream, token = null, color;
            if (tokenStream.match(Tokens.HASH)) {
              token = tokenStream.token();
              color = token.value;
              if (!/#[a-f0-9]{3,6}/i.test(color)) {
                throw new SyntaxError2(
                  "Expected a hex color but found '" + color + "' at line " + token.startLine + ", col " + token.startCol + ".",
                  token.startLine,
                  token.startCol
                );
              }
              this._readWhitespace();
            }
            return token;
          },
          //-----------------------------------------------------------------
          // Animations methods
          //-----------------------------------------------------------------
          _keyframes: function() {
            var tokenStream = this._tokenStream, token, tt, name, prefix = "";
            tokenStream.mustMatch(Tokens.KEYFRAMES_SYM);
            token = tokenStream.token();
            if (/^@\-([^\-]+)\-/.test(token.value)) {
              prefix = RegExp.$1;
            }
            this._readWhitespace();
            name = this._keyframe_name();
            this._readWhitespace();
            tokenStream.mustMatch(Tokens.LBRACE);
            this.fire({
              type: "startkeyframes",
              name,
              prefix,
              line: token.startLine,
              col: token.startCol
            });
            this._readWhitespace();
            tt = tokenStream.peek();
            while (tt === Tokens.IDENT || tt === Tokens.PERCENTAGE) {
              this._keyframe_rule();
              this._readWhitespace();
              tt = tokenStream.peek();
            }
            this.fire({
              type: "endkeyframes",
              name,
              prefix,
              line: token.startLine,
              col: token.startCol
            });
            this._readWhitespace();
            tokenStream.mustMatch(Tokens.RBRACE);
          },
          _keyframe_name: function() {
            var tokenStream = this._tokenStream;
            tokenStream.mustMatch([Tokens.IDENT, Tokens.STRING]);
            return SyntaxUnit.fromToken(tokenStream.token());
          },
          _keyframe_rule: function() {
            var keyList = this._key_list();
            this.fire({
              type: "startkeyframerule",
              keys: keyList,
              line: keyList[0].line,
              col: keyList[0].col
            });
            this._readDeclarations(true);
            this.fire({
              type: "endkeyframerule",
              keys: keyList,
              line: keyList[0].line,
              col: keyList[0].col
            });
          },
          _key_list: function() {
            var tokenStream = this._tokenStream, keyList = [];
            keyList.push(this._key());
            this._readWhitespace();
            while (tokenStream.match(Tokens.COMMA)) {
              this._readWhitespace();
              keyList.push(this._key());
              this._readWhitespace();
            }
            return keyList;
          },
          _key: function() {
            var tokenStream = this._tokenStream, token;
            if (tokenStream.match(Tokens.PERCENTAGE)) {
              return SyntaxUnit.fromToken(tokenStream.token());
            } else if (tokenStream.match(Tokens.IDENT)) {
              token = tokenStream.token();
              if (/from|to/i.test(token.value)) {
                return SyntaxUnit.fromToken(token);
              }
              tokenStream.unget();
            }
            this._unexpectedToken(tokenStream.LT(1));
          },
          //-----------------------------------------------------------------
          // Helper methods
          //-----------------------------------------------------------------
          /**
           * Not part of CSS grammar, but useful for skipping over
           * combination of white space and HTML-style comments.
           * @return {void}
           * @method _skipCruft
           * @private
           */
          _skipCruft: function() {
            while (this._tokenStream.match([Tokens.S, Tokens.CDO, Tokens.CDC])) {
            }
          },
          /**
           * Not part of CSS grammar, but this pattern occurs frequently
           * in the official CSS grammar. Split out here to eliminate
           * duplicate code.
           * @param {Boolean} checkStart Indicates if the rule should check
           *      for the left brace at the beginning.
           * @param {Boolean} readMargins Indicates if the rule should check
           *      for margin patterns.
           * @return {void}
           * @method _readDeclarations
           * @private
           */
          _readDeclarations: function(checkStart, readMargins) {
            var tokenStream = this._tokenStream, tt;
            this._readWhitespace();
            if (checkStart) {
              tokenStream.mustMatch(Tokens.LBRACE);
            }
            this._readWhitespace();
            try {
              while (true) {
                if (tokenStream.match(Tokens.SEMICOLON) || readMargins && this._margin()) {
                } else if (this._declaration()) {
                  if (!tokenStream.match(Tokens.SEMICOLON)) {
                    break;
                  }
                } else {
                  break;
                }
                this._readWhitespace();
              }
              tokenStream.mustMatch(Tokens.RBRACE);
              this._readWhitespace();
            } catch (ex) {
              if (ex instanceof SyntaxError2 && !this.options.strict) {
                this.fire({
                  type: "error",
                  error: ex,
                  message: ex.message,
                  line: ex.line,
                  col: ex.col
                });
                tt = tokenStream.advance([Tokens.SEMICOLON, Tokens.RBRACE]);
                if (tt === Tokens.SEMICOLON) {
                  this._readDeclarations(false, readMargins);
                } else if (tt !== Tokens.RBRACE) {
                  throw ex;
                }
              } else {
                throw ex;
              }
            }
          },
          /**
           * In some cases, you can end up with two white space tokens in a
           * row. Instead of making a change in every function that looks for
           * white space, this function is used to match as much white space
           * as necessary.
           * @method _readWhitespace
           * @return {String} The white space if found, empty string if not.
           * @private
           */
          _readWhitespace: function() {
            var tokenStream = this._tokenStream, ws = "";
            while (tokenStream.match(Tokens.S)) {
              ws += tokenStream.token().value;
            }
            return ws;
          },
          /**
           * Throws an error when an unexpected token is found.
           * @param {Object} token The token that was found.
           * @method _unexpectedToken
           * @return {void}
           * @private
           */
          _unexpectedToken: function(token) {
            throw new SyntaxError2(
              "Unexpected token '" + token.value + "' at line " + token.startLine + ", col " + token.startCol + ".",
              token.startLine,
              token.startCol
            );
          },
          /**
           * Helper method used for parsing subparts of a style sheet.
           * @return {void}
           * @method _verifyEnd
           * @private
           */
          _verifyEnd: function() {
            if (this._tokenStream.LA(1) !== Tokens.EOF) {
              this._unexpectedToken(this._tokenStream.LT(1));
            }
          },
          //-----------------------------------------------------------------
          // Validation methods
          //-----------------------------------------------------------------
          _validateProperty: function(property, value) {
            Validation.validate(property, value);
          },
          //-----------------------------------------------------------------
          // Parsing methods
          //-----------------------------------------------------------------
          parse: function(input) {
            this._tokenStream = new TokenStream(input, Tokens);
            this._stylesheet();
          },
          parseStyleSheet: function(input) {
            return this.parse(input);
          },
          parseMediaQuery: function(input) {
            this._tokenStream = new TokenStream(input, Tokens);
            var result = this._media_query();
            this._verifyEnd();
            return result;
          },
          /**
           * Parses a property value (everything after the semicolon).
           * @return {parserlib.css.PropertyValue} The property value.
           * @throws parserlib.util.SyntaxError If an unexpected token is found.
           * @method parserPropertyValue
           */
          parsePropertyValue: function(input) {
            this._tokenStream = new TokenStream(input, Tokens);
            this._readWhitespace();
            var result = this._expr();
            this._readWhitespace();
            this._verifyEnd();
            return result;
          },
          /**
           * Parses a complete CSS rule, including selectors and
           * properties.
           * @param {String} input The text to parser.
           * @return {Boolean} True if the parse completed successfully, false if not.
           * @method parseRule
           */
          parseRule: function(input) {
            this._tokenStream = new TokenStream(input, Tokens);
            this._readWhitespace();
            var result = this._ruleset();
            this._readWhitespace();
            this._verifyEnd();
            return result;
          },
          /**
           * Parses a single CSS selector (no comma)
           * @param {String} input The text to parse as a CSS selector.
           * @return {Selector} An object representing the selector.
           * @throws parserlib.util.SyntaxError If an unexpected token is found.
           * @method parseSelector
           */
          parseSelector: function(input) {
            this._tokenStream = new TokenStream(input, Tokens);
            this._readWhitespace();
            var result = this._selector();
            this._readWhitespace();
            this._verifyEnd();
            return result;
          },
          /**
           * Parses an HTML style attribute: a set of CSS declarations
           * separated by semicolons.
           * @param {String} input The text to parse as a style attribute
           * @return {void}
           * @method parseStyleAttribute
           */
          parseStyleAttribute: function(input) {
            input += "}";
            this._tokenStream = new TokenStream(input, Tokens);
            this._readDeclarations();
          }
        };
        for (prop in additions) {
          if (Object.prototype.hasOwnProperty.call(additions, prop)) {
            proto[prop] = additions[prop];
          }
        }
        return proto;
      }();
      var Properties = {
        __proto__: null,
        //A
        "align-items": "flex-start | flex-end | center | baseline | stretch",
        "align-content": "flex-start | flex-end | center | space-between | space-around | stretch",
        "align-self": "auto | flex-start | flex-end | center | baseline | stretch",
        "-webkit-align-items": "flex-start | flex-end | center | baseline | stretch",
        "-webkit-align-content": "flex-start | flex-end | center | space-between | space-around | stretch",
        "-webkit-align-self": "auto | flex-start | flex-end | center | baseline | stretch",
        "alignment-adjust": "auto | baseline | before-edge | text-before-edge | middle | central | after-edge | text-after-edge | ideographic | alphabetic | hanging | mathematical | <percentage> | <length>",
        "alignment-baseline": "baseline | use-script | before-edge | text-before-edge | after-edge | text-after-edge | central | middle | ideographic | alphabetic | hanging | mathematical",
        animation: 1,
        "animation-delay": { multi: "<time>", comma: true },
        "animation-direction": { multi: "normal | alternate", comma: true },
        "animation-duration": { multi: "<time>", comma: true },
        "animation-fill-mode": { multi: "none | forwards | backwards | both", comma: true },
        "animation-iteration-count": { multi: "<number> | infinite", comma: true },
        "animation-name": { multi: "none | <ident>", comma: true },
        "animation-play-state": { multi: "running | paused", comma: true },
        "animation-timing-function": 1,
        //vendor prefixed
        "-moz-animation-delay": { multi: "<time>", comma: true },
        "-moz-animation-direction": { multi: "normal | alternate", comma: true },
        "-moz-animation-duration": { multi: "<time>", comma: true },
        "-moz-animation-iteration-count": { multi: "<number> | infinite", comma: true },
        "-moz-animation-name": { multi: "none | <ident>", comma: true },
        "-moz-animation-play-state": { multi: "running | paused", comma: true },
        "-ms-animation-delay": { multi: "<time>", comma: true },
        "-ms-animation-direction": { multi: "normal | alternate", comma: true },
        "-ms-animation-duration": { multi: "<time>", comma: true },
        "-ms-animation-iteration-count": { multi: "<number> | infinite", comma: true },
        "-ms-animation-name": { multi: "none | <ident>", comma: true },
        "-ms-animation-play-state": { multi: "running | paused", comma: true },
        "-webkit-animation-delay": { multi: "<time>", comma: true },
        "-webkit-animation-direction": { multi: "normal | alternate", comma: true },
        "-webkit-animation-duration": { multi: "<time>", comma: true },
        "-webkit-animation-fill-mode": { multi: "none | forwards | backwards | both", comma: true },
        "-webkit-animation-iteration-count": { multi: "<number> | infinite", comma: true },
        "-webkit-animation-name": { multi: "none | <ident>", comma: true },
        "-webkit-animation-play-state": { multi: "running | paused", comma: true },
        "-o-animation-delay": { multi: "<time>", comma: true },
        "-o-animation-direction": { multi: "normal | alternate", comma: true },
        "-o-animation-duration": { multi: "<time>", comma: true },
        "-o-animation-iteration-count": { multi: "<number> | infinite", comma: true },
        "-o-animation-name": { multi: "none | <ident>", comma: true },
        "-o-animation-play-state": { multi: "running | paused", comma: true },
        appearance: "icon | window | desktop | workspace | document | tooltip | dialog | button | push-button | hyperlink | radio | radio-button | checkbox | menu-item | tab | menu | menubar | pull-down-menu | pop-up-menu | list-menu | radio-group | checkbox-group | outline-tree | range | field | combo-box | signature | password | normal | none | inherit",
        "aspect-ratio": 1,
        azimuth: function(expression) {
          var simple = "<angle> | leftwards | rightwards | inherit", direction = "left-side | far-left | left | center-left | center | center-right | right | far-right | right-side", behind = false, valid = false, part;
          if (!ValidationTypes.isAny(expression, simple)) {
            if (ValidationTypes.isAny(expression, "behind")) {
              behind = true;
              valid = true;
            }
            if (ValidationTypes.isAny(expression, direction)) {
              valid = true;
              if (!behind) {
                ValidationTypes.isAny(expression, "behind");
              }
            }
          }
          if (expression.hasNext()) {
            part = expression.next();
            if (valid) {
              throw new ValidationError(
                "Expected end of value but found '" + part + "'.",
                part.line,
                part.col
              );
            } else {
              throw new ValidationError(
                "Expected (<'azimuth'>) but found '" + part + "'.",
                part.line,
                part.col
              );
            }
          }
        },
        //B
        "backface-visibility": "visible | hidden",
        background: 1,
        "background-attachment": { multi: "<attachment>", comma: true },
        "background-clip": { multi: "<box>", comma: true },
        "background-color": "<color> | inherit",
        "background-image": { multi: "<bg-image>", comma: true },
        "background-origin": { multi: "<box>", comma: true },
        "background-position": { multi: "<bg-position>", comma: true },
        "background-repeat": { multi: "<repeat-style>" },
        "background-size": { multi: "<bg-size>", comma: true },
        "baseline-shift": "baseline | sub | super | <percentage> | <length>",
        behavior: 1,
        binding: 1,
        bleed: "<length>",
        "bookmark-label": "<content> | <attr> | <string>",
        "bookmark-level": "none | <integer>",
        "bookmark-state": "open | closed",
        "bookmark-target": "none | <uri> | <attr>",
        border: "<border-width> || <border-style> || <color>",
        "border-bottom": "<border-width> || <border-style> || <color>",
        "border-bottom-color": "<color> | inherit",
        "border-bottom-left-radius": "<x-one-radius>",
        "border-bottom-right-radius": "<x-one-radius>",
        "border-bottom-style": "<border-style>",
        "border-bottom-width": "<border-width>",
        "border-collapse": "collapse | separate | inherit",
        "border-color": { multi: "<color> | inherit", max: 4 },
        "border-image": 1,
        "border-image-outset": { multi: "<length> | <number>", max: 4 },
        "border-image-repeat": { multi: "stretch | repeat | round", max: 2 },
        "border-image-slice": function(expression) {
          var valid = false, numeric = "<number> | <percentage>", fill = false, count = 0, max = 4, part;
          if (ValidationTypes.isAny(expression, "fill")) {
            fill = true;
            valid = true;
          }
          while (expression.hasNext() && count < max) {
            valid = ValidationTypes.isAny(expression, numeric);
            if (!valid) {
              break;
            }
            count++;
          }
          if (!fill) {
            ValidationTypes.isAny(expression, "fill");
          } else {
            valid = true;
          }
          if (expression.hasNext()) {
            part = expression.next();
            if (valid) {
              throw new ValidationError(
                "Expected end of value but found '" + part + "'.",
                part.line,
                part.col
              );
            } else {
              throw new ValidationError(
                "Expected ([<number> | <percentage>]{1,4} && fill?) but found '" + part + "'.",
                part.line,
                part.col
              );
            }
          }
        },
        "border-image-source": "<image> | none",
        "border-image-width": { multi: "<length> | <percentage> | <number> | auto", max: 4 },
        "border-left": "<border-width> || <border-style> || <color>",
        "border-left-color": "<color> | inherit",
        "border-left-style": "<border-style>",
        "border-left-width": "<border-width>",
        "border-radius": function(expression) {
          var valid = false, simple = "<length> | <percentage> | inherit", slash = false, count = 0, max = 8, part;
          while (expression.hasNext() && count < max) {
            valid = ValidationTypes.isAny(expression, simple);
            if (!valid) {
              if (String(expression.peek()) === "/" && count > 0 && !slash) {
                slash = true;
                max = count + 5;
                expression.next();
              } else {
                break;
              }
            }
            count++;
          }
          if (expression.hasNext()) {
            part = expression.next();
            if (valid) {
              throw new ValidationError(
                "Expected end of value but found '" + part + "'.",
                part.line,
                part.col
              );
            } else {
              throw new ValidationError(
                "Expected (<'border-radius'>) but found '" + part + "'.",
                part.line,
                part.col
              );
            }
          }
        },
        "border-right": "<border-width> || <border-style> || <color>",
        "border-right-color": "<color> | inherit",
        "border-right-style": "<border-style>",
        "border-right-width": "<border-width>",
        "border-spacing": { multi: "<length> | inherit", max: 2 },
        "border-style": { multi: "<border-style>", max: 4 },
        "border-top": "<border-width> || <border-style> || <color>",
        "border-top-color": "<color> | inherit",
        "border-top-left-radius": "<x-one-radius>",
        "border-top-right-radius": "<x-one-radius>",
        "border-top-style": "<border-style>",
        "border-top-width": "<border-width>",
        "border-width": { multi: "<border-width>", max: 4 },
        bottom: "<margin-width> | inherit",
        "-moz-box-align": "start | end | center | baseline | stretch",
        "-moz-box-decoration-break": "slice |clone",
        "-moz-box-direction": "normal | reverse | inherit",
        "-moz-box-flex": "<number>",
        "-moz-box-flex-group": "<integer>",
        "-moz-box-lines": "single | multiple",
        "-moz-box-ordinal-group": "<integer>",
        "-moz-box-orient": "horizontal | vertical | inline-axis | block-axis | inherit",
        "-moz-box-pack": "start | end | center | justify",
        "-o-box-decoration-break": "slice | clone",
        "-webkit-box-align": "start | end | center | baseline | stretch",
        "-webkit-box-decoration-break": "slice |clone",
        "-webkit-box-direction": "normal | reverse | inherit",
        "-webkit-box-flex": "<number>",
        "-webkit-box-flex-group": "<integer>",
        "-webkit-box-lines": "single | multiple",
        "-webkit-box-ordinal-group": "<integer>",
        "-webkit-box-orient": "horizontal | vertical | inline-axis | block-axis | inherit",
        "-webkit-box-pack": "start | end | center | justify",
        "box-decoration-break": "slice | clone",
        "box-shadow": function(expression) {
          var part;
          if (!ValidationTypes.isAny(expression, "none")) {
            Validation.multiProperty("<shadow>", expression, true, Infinity);
          } else {
            if (expression.hasNext()) {
              part = expression.next();
              throw new ValidationError(
                "Expected end of value but found '" + part + "'.",
                part.line,
                part.col
              );
            }
          }
        },
        "box-sizing": "content-box | border-box | inherit",
        "break-after": "auto | always | avoid | left | right | page | column | avoid-page | avoid-column",
        "break-before": "auto | always | avoid | left | right | page | column | avoid-page | avoid-column",
        "break-inside": "auto | avoid | avoid-page | avoid-column",
        //C
        "caption-side": "top | bottom | inherit",
        clear: "none | right | left | both | inherit",
        clip: 1,
        color: "<color> | inherit",
        "color-profile": 1,
        "column-count": "<integer> | auto",
        //http://www.w3.org/TR/css3-multicol/
        "column-fill": "auto | balance",
        "column-gap": "<length> | normal",
        "column-rule": "<border-width> || <border-style> || <color>",
        "column-rule-color": "<color>",
        "column-rule-style": "<border-style>",
        "column-rule-width": "<border-width>",
        "column-span": "none | all",
        "column-width": "<length> | auto",
        columns: 1,
        content: 1,
        "counter-increment": 1,
        "counter-reset": 1,
        crop: "<shape> | auto",
        cue: "cue-after | cue-before | inherit",
        "cue-after": 1,
        "cue-before": 1,
        cursor: 1,
        //D
        direction: "ltr | rtl | inherit",
        display: "inline | block | list-item | inline-block | table | inline-table | table-row-group | table-header-group | table-footer-group | table-row | table-column-group | table-column | table-cell | table-caption | grid | inline-grid | run-in | ruby | ruby-base | ruby-text | ruby-base-container | ruby-text-container | contents | none | inherit | -moz-box | -moz-inline-block | -moz-inline-box | -moz-inline-grid | -moz-inline-stack | -moz-inline-table | -moz-grid | -moz-grid-group | -moz-grid-line | -moz-groupbox | -moz-deck | -moz-popup | -moz-stack | -moz-marker | -webkit-box | -webkit-inline-box | -ms-flexbox | -ms-inline-flexbox | flex | -webkit-flex | inline-flex | -webkit-inline-flex",
        "dominant-baseline": 1,
        "drop-initial-after-adjust": "central | middle | after-edge | text-after-edge | ideographic | alphabetic | mathematical | <percentage> | <length>",
        "drop-initial-after-align": "baseline | use-script | before-edge | text-before-edge | after-edge | text-after-edge | central | middle | ideographic | alphabetic | hanging | mathematical",
        "drop-initial-before-adjust": "before-edge | text-before-edge | central | middle | hanging | mathematical | <percentage> | <length>",
        "drop-initial-before-align": "caps-height | baseline | use-script | before-edge | text-before-edge | after-edge | text-after-edge | central | middle | ideographic | alphabetic | hanging | mathematical",
        "drop-initial-size": "auto | line | <length> | <percentage>",
        "drop-initial-value": "initial | <integer>",
        //E
        elevation: "<angle> | below | level | above | higher | lower | inherit",
        "empty-cells": "show | hide | inherit",
        //F
        filter: 1,
        fit: "fill | hidden | meet | slice",
        "fit-position": 1,
        flex: "<flex>",
        "flex-basis": "<width>",
        "flex-direction": "row | row-reverse | column | column-reverse",
        "flex-flow": "<flex-direction> || <flex-wrap>",
        "flex-grow": "<number>",
        "flex-shrink": "<number>",
        "flex-wrap": "nowrap | wrap | wrap-reverse",
        "-webkit-flex": "<flex>",
        "-webkit-flex-basis": "<width>",
        "-webkit-flex-direction": "row | row-reverse | column | column-reverse",
        "-webkit-flex-flow": "<flex-direction> || <flex-wrap>",
        "-webkit-flex-grow": "<number>",
        "-webkit-flex-shrink": "<number>",
        "-webkit-flex-wrap": "nowrap | wrap | wrap-reverse",
        "-ms-flex": "<flex>",
        "-ms-flex-align": "start | end | center | stretch | baseline",
        "-ms-flex-direction": "row | row-reverse | column | column-reverse | inherit",
        "-ms-flex-order": "<number>",
        "-ms-flex-pack": "start | end | center | justify",
        "-ms-flex-wrap": "nowrap | wrap | wrap-reverse",
        float: "left | right | none | inherit",
        "float-offset": 1,
        font: 1,
        "font-family": 1,
        "font-feature-settings": "<feature-tag-value> | normal | inherit",
        "font-kerning": "auto | normal | none | initial | inherit | unset",
        "font-size": "<absolute-size> | <relative-size> | <length> | <percentage> | inherit",
        "font-size-adjust": "<number> | none | inherit",
        "font-stretch": "normal | ultra-condensed | extra-condensed | condensed | semi-condensed | semi-expanded | expanded | extra-expanded | ultra-expanded | inherit",
        "font-style": "normal | italic | oblique | inherit",
        "font-variant": "normal | small-caps | inherit",
        "font-variant-caps": "normal | small-caps | all-small-caps | petite-caps | all-petite-caps | unicase | titling-caps",
        "font-variant-position": "normal | sub | super | inherit | initial | unset",
        "font-weight": "normal | bold | bolder | lighter | 100 | 200 | 300 | 400 | 500 | 600 | 700 | 800 | 900 | inherit",
        //G
        grid: 1,
        "grid-area": 1,
        "grid-auto-columns": 1,
        "grid-auto-flow": 1,
        "grid-auto-position": 1,
        "grid-auto-rows": 1,
        "grid-cell-stacking": "columns | rows | layer",
        "grid-column": 1,
        "grid-columns": 1,
        "grid-column-align": "start | end | center | stretch",
        "grid-column-sizing": 1,
        "grid-column-start": 1,
        "grid-column-end": 1,
        "grid-column-span": "<integer>",
        "grid-flow": "none | rows | columns",
        "grid-layer": "<integer>",
        "grid-row": 1,
        "grid-rows": 1,
        "grid-row-align": "start | end | center | stretch",
        "grid-row-start": 1,
        "grid-row-end": 1,
        "grid-row-span": "<integer>",
        "grid-row-sizing": 1,
        "grid-template": 1,
        "grid-template-areas": 1,
        "grid-template-columns": 1,
        "grid-template-rows": 1,
        //H
        "hanging-punctuation": 1,
        height: "<margin-width> | <content-sizing> | inherit",
        "hyphenate-after": "<integer> | auto",
        "hyphenate-before": "<integer> | auto",
        "hyphenate-character": "<string> | auto",
        "hyphenate-lines": "no-limit | <integer>",
        "hyphenate-resource": 1,
        hyphens: "none | manual | auto",
        //I
        icon: 1,
        "image-orientation": "angle | auto",
        "image-rendering": 1,
        "image-resolution": 1,
        "ime-mode": "auto | normal | active | inactive | disabled | inherit",
        "inline-box-align": "initial | last | <integer>",
        //J
        "justify-content": "flex-start | flex-end | center | space-between | space-around",
        "-webkit-justify-content": "flex-start | flex-end | center | space-between | space-around",
        //L
        left: "<margin-width> | inherit",
        "letter-spacing": "<length> | normal | inherit",
        "line-height": "<number> | <length> | <percentage> | normal | inherit",
        "line-break": "auto | loose | normal | strict",
        "line-stacking": 1,
        "line-stacking-ruby": "exclude-ruby | include-ruby",
        "line-stacking-shift": "consider-shifts | disregard-shifts",
        "line-stacking-strategy": "inline-line-height | block-line-height | max-height | grid-height",
        "list-style": 1,
        "list-style-image": "<uri> | none | inherit",
        "list-style-position": "inside | outside | inherit",
        "list-style-type": "disc | circle | square | decimal | decimal-leading-zero | lower-roman | upper-roman | lower-greek | lower-latin | upper-latin | armenian | georgian | lower-alpha | upper-alpha | none | inherit",
        //M
        margin: { multi: "<margin-width> | inherit", max: 4 },
        "margin-bottom": "<margin-width> | inherit",
        "margin-left": "<margin-width> | inherit",
        "margin-right": "<margin-width> | inherit",
        "margin-top": "<margin-width> | inherit",
        mark: 1,
        "mark-after": 1,
        "mark-before": 1,
        marks: 1,
        "marquee-direction": 1,
        "marquee-play-count": 1,
        "marquee-speed": 1,
        "marquee-style": 1,
        "max-height": "<length> | <percentage> | <content-sizing> | none | inherit",
        "max-width": "<length> | <percentage> | <content-sizing> | none | inherit",
        "min-height": "<length> | <percentage> | <content-sizing> | contain-floats | -moz-contain-floats | -webkit-contain-floats | inherit",
        "min-width": "<length> | <percentage> | <content-sizing> | contain-floats | -moz-contain-floats | -webkit-contain-floats | inherit",
        "move-to": 1,
        //N
        "nav-down": 1,
        "nav-index": 1,
        "nav-left": 1,
        "nav-right": 1,
        "nav-up": 1,
        //O
        "object-fit": "fill | contain | cover | none | scale-down",
        "object-position": "<bg-position>",
        opacity: "<number> | inherit",
        order: "<integer>",
        "-webkit-order": "<integer>",
        orphans: "<integer> | inherit",
        outline: 1,
        "outline-color": "<color> | invert | inherit",
        "outline-offset": 1,
        "outline-style": "<border-style> | inherit",
        "outline-width": "<border-width> | inherit",
        overflow: "visible | hidden | scroll | auto | inherit",
        "overflow-style": 1,
        "overflow-wrap": "normal | break-word",
        "overflow-x": 1,
        "overflow-y": 1,
        //P
        padding: { multi: "<padding-width> | inherit", max: 4 },
        "padding-bottom": "<padding-width> | inherit",
        "padding-left": "<padding-width> | inherit",
        "padding-right": "<padding-width> | inherit",
        "padding-top": "<padding-width> | inherit",
        page: 1,
        "page-break-after": "auto | always | avoid | left | right | inherit",
        "page-break-before": "auto | always | avoid | left | right | inherit",
        "page-break-inside": "auto | avoid | inherit",
        "page-policy": 1,
        pause: 1,
        "pause-after": 1,
        "pause-before": 1,
        perspective: 1,
        "perspective-origin": 1,
        phonemes: 1,
        pitch: 1,
        "pitch-range": 1,
        "play-during": 1,
        "pointer-events": "auto | none | visiblePainted | visibleFill | visibleStroke | visible | painted | fill | stroke | all | inherit",
        position: "static | relative | absolute | fixed | inherit",
        "presentation-level": 1,
        "punctuation-trim": 1,
        //Q
        quotes: 1,
        //R
        "rendering-intent": 1,
        resize: 1,
        rest: 1,
        "rest-after": 1,
        "rest-before": 1,
        richness: 1,
        right: "<margin-width> | inherit",
        rotation: 1,
        "rotation-point": 1,
        "ruby-align": 1,
        "ruby-overhang": 1,
        "ruby-position": 1,
        "ruby-span": 1,
        //S
        size: 1,
        speak: "normal | none | spell-out | inherit",
        "speak-header": "once | always | inherit",
        "speak-numeral": "digits | continuous | inherit",
        "speak-punctuation": "code | none | inherit",
        "speech-rate": 1,
        src: 1,
        stress: 1,
        "string-set": 1,
        "table-layout": "auto | fixed | inherit",
        "tab-size": "<integer> | <length>",
        target: 1,
        "target-name": 1,
        "target-new": 1,
        "target-position": 1,
        "text-align": "left | right | center | justify | match-parent | start | end | inherit",
        "text-align-last": 1,
        "text-decoration": 1,
        "text-emphasis": 1,
        "text-height": 1,
        "text-indent": "<length> | <percentage> | inherit",
        "text-justify": "auto | none | inter-word | inter-ideograph | inter-cluster | distribute | kashida",
        "text-outline": 1,
        "text-overflow": 1,
        "text-rendering": "auto | optimizeSpeed | optimizeLegibility | geometricPrecision | inherit",
        "text-shadow": 1,
        "text-transform": "capitalize | uppercase | lowercase | none | inherit",
        "text-wrap": "normal | none | avoid",
        top: "<margin-width> | inherit",
        "-ms-touch-action": "auto | none | pan-x | pan-y | pan-left | pan-right | pan-up | pan-down | manipulation",
        "touch-action": "auto | none | pan-x | pan-y | pan-left | pan-right | pan-up | pan-down | manipulation",
        transform: 1,
        "transform-origin": 1,
        "transform-style": 1,
        transition: 1,
        "transition-delay": 1,
        "transition-duration": 1,
        "transition-property": 1,
        "transition-timing-function": 1,
        //U
        "unicode-bidi": "normal | embed | isolate | bidi-override | isolate-override | plaintext | inherit",
        "user-modify": "read-only | read-write | write-only | inherit",
        "user-select": "none | text | toggle | element | elements | all | inherit",
        //V
        "vertical-align": "auto | use-script | baseline | sub | super | top | text-top | central | middle | bottom | text-bottom | <percentage> | <length> | inherit",
        visibility: "visible | hidden | collapse | inherit",
        "voice-balance": 1,
        "voice-duration": 1,
        "voice-family": 1,
        "voice-pitch": 1,
        "voice-pitch-range": 1,
        "voice-rate": 1,
        "voice-stress": 1,
        "voice-volume": 1,
        volume: 1,
        //W
        "white-space": "normal | pre | nowrap | pre-wrap | pre-line | inherit | -pre-wrap | -o-pre-wrap | -moz-pre-wrap | -hp-pre-wrap",
        //http://perishablepress.com/wrapping-content/
        "white-space-collapse": 1,
        widows: "<integer> | inherit",
        width: "<length> | <percentage> | <content-sizing> | auto | inherit",
        "will-change": { multi: "<ident>", comma: true },
        "word-break": "normal | keep-all | break-all",
        "word-spacing": "<length> | normal | inherit",
        "word-wrap": "normal | break-word",
        "writing-mode": "horizontal-tb | vertical-rl | vertical-lr | lr-tb | rl-tb | tb-rl | bt-rl | tb-lr | bt-lr | lr-bt | rl-bt | lr | rl | tb | inherit",
        //Z
        "z-index": "<integer> | auto | inherit",
        zoom: "<number> | <percentage> | normal"
      };
      function PropertyName(text, hack, line, col) {
        SyntaxUnit.call(this, text, line, col, Parser.PROPERTY_NAME_TYPE);
        this.hack = hack;
      }
      PropertyName.prototype = new SyntaxUnit();
      PropertyName.prototype.constructor = PropertyName;
      PropertyName.prototype.toString = function() {
        return (this.hack ? this.hack : "") + this.text;
      };
      function PropertyValue(parts, line, col) {
        SyntaxUnit.call(this, parts.join(" "), line, col, Parser.PROPERTY_VALUE_TYPE);
        this.parts = parts;
      }
      PropertyValue.prototype = new SyntaxUnit();
      PropertyValue.prototype.constructor = PropertyValue;
      function PropertyValueIterator(value) {
        this._i = 0;
        this._parts = value.parts;
        this._marks = [];
        this.value = value;
      }
      PropertyValueIterator.prototype.count = function() {
        return this._parts.length;
      };
      PropertyValueIterator.prototype.isFirst = function() {
        return this._i === 0;
      };
      PropertyValueIterator.prototype.hasNext = function() {
        return this._i < this._parts.length;
      };
      PropertyValueIterator.prototype.mark = function() {
        this._marks.push(this._i);
      };
      PropertyValueIterator.prototype.peek = function(count) {
        return this.hasNext() ? this._parts[this._i + (count || 0)] : null;
      };
      PropertyValueIterator.prototype.next = function() {
        return this.hasNext() ? this._parts[this._i++] : null;
      };
      PropertyValueIterator.prototype.previous = function() {
        return this._i > 0 ? this._parts[--this._i] : null;
      };
      PropertyValueIterator.prototype.restore = function() {
        if (this._marks.length) {
          this._i = this._marks.pop();
        }
      };
      function PropertyValuePart(text, line, col) {
        SyntaxUnit.call(this, text, line, col, Parser.PROPERTY_VALUE_PART_TYPE);
        this.type = "unknown";
        var temp;
        if (/^([+\-]?[\d\.]+)([a-z]+)$/i.test(text)) {
          this.type = "dimension";
          this.value = +RegExp.$1;
          this.units = RegExp.$2;
          switch (this.units.toLowerCase()) {
            case "em":
            case "rem":
            case "ex":
            case "px":
            case "cm":
            case "mm":
            case "in":
            case "pt":
            case "pc":
            case "ch":
            case "vh":
            case "vw":
            case "vmax":
            case "vmin":
              this.type = "length";
              break;
            case "fr":
              this.type = "grid";
              break;
            case "deg":
            case "rad":
            case "grad":
              this.type = "angle";
              break;
            case "ms":
            case "s":
              this.type = "time";
              break;
            case "hz":
            case "khz":
              this.type = "frequency";
              break;
            case "dpi":
            case "dpcm":
              this.type = "resolution";
              break;
          }
        } else if (/^([+\-]?[\d\.]+)%$/i.test(text)) {
          this.type = "percentage";
          this.value = +RegExp.$1;
        } else if (/^([+\-]?\d+)$/i.test(text)) {
          this.type = "integer";
          this.value = +RegExp.$1;
        } else if (/^([+\-]?[\d\.]+)$/i.test(text)) {
          this.type = "number";
          this.value = +RegExp.$1;
        } else if (/^#([a-f0-9]{3,6})/i.test(text)) {
          this.type = "color";
          temp = RegExp.$1;
          if (temp.length === 3) {
            this.red = parseInt(temp.charAt(0) + temp.charAt(0), 16);
            this.green = parseInt(temp.charAt(1) + temp.charAt(1), 16);
            this.blue = parseInt(temp.charAt(2) + temp.charAt(2), 16);
          } else {
            this.red = parseInt(temp.substring(0, 2), 16);
            this.green = parseInt(temp.substring(2, 4), 16);
            this.blue = parseInt(temp.substring(4, 6), 16);
          }
        } else if (/^rgb\(\s*(\d+)\s*,\s*(\d+)\s*,\s*(\d+)\s*\)/i.test(text)) {
          this.type = "color";
          this.red = +RegExp.$1;
          this.green = +RegExp.$2;
          this.blue = +RegExp.$3;
        } else if (/^rgb\(\s*(\d+)%\s*,\s*(\d+)%\s*,\s*(\d+)%\s*\)/i.test(text)) {
          this.type = "color";
          this.red = +RegExp.$1 * 255 / 100;
          this.green = +RegExp.$2 * 255 / 100;
          this.blue = +RegExp.$3 * 255 / 100;
        } else if (/^rgba\(\s*(\d+)\s*,\s*(\d+)\s*,\s*(\d+)\s*,\s*([\d\.]+)\s*\)/i.test(text)) {
          this.type = "color";
          this.red = +RegExp.$1;
          this.green = +RegExp.$2;
          this.blue = +RegExp.$3;
          this.alpha = +RegExp.$4;
        } else if (/^rgba\(\s*(\d+)%\s*,\s*(\d+)%\s*,\s*(\d+)%\s*,\s*([\d\.]+)\s*\)/i.test(text)) {
          this.type = "color";
          this.red = +RegExp.$1 * 255 / 100;
          this.green = +RegExp.$2 * 255 / 100;
          this.blue = +RegExp.$3 * 255 / 100;
          this.alpha = +RegExp.$4;
        } else if (/^hsl\(\s*(\d+)\s*,\s*(\d+)%\s*,\s*(\d+)%\s*\)/i.test(text)) {
          this.type = "color";
          this.hue = +RegExp.$1;
          this.saturation = +RegExp.$2 / 100;
          this.lightness = +RegExp.$3 / 100;
        } else if (/^hsla\(\s*(\d+)\s*,\s*(\d+)%\s*,\s*(\d+)%\s*,\s*([\d\.]+)\s*\)/i.test(text)) {
          this.type = "color";
          this.hue = +RegExp.$1;
          this.saturation = +RegExp.$2 / 100;
          this.lightness = +RegExp.$3 / 100;
          this.alpha = +RegExp.$4;
        } else if (/^url\(["']?([^\)"']+)["']?\)/i.test(text)) {
          this.type = "uri";
          this.uri = RegExp.$1;
        } else if (/^([^\(]+)\(/i.test(text)) {
          this.type = "function";
          this.name = RegExp.$1;
          this.value = text;
        } else if (/^"([^\n\r\f\\"]|\\\r\n|\\[^\r0-9a-f]|\\[0-9a-f]{1,6}(\r\n|[ \n\r\t\f])?)*"/i.test(text)) {
          this.type = "string";
          this.value = PropertyValuePart.parseString(text);
        } else if (/^'([^\n\r\f\\']|\\\r\n|\\[^\r0-9a-f]|\\[0-9a-f]{1,6}(\r\n|[ \n\r\t\f])?)*'/i.test(text)) {
          this.type = "string";
          this.value = PropertyValuePart.parseString(text);
        } else if (Colors[text.toLowerCase()]) {
          this.type = "color";
          temp = Colors[text.toLowerCase()].substring(1);
          this.red = parseInt(temp.substring(0, 2), 16);
          this.green = parseInt(temp.substring(2, 4), 16);
          this.blue = parseInt(temp.substring(4, 6), 16);
        } else if (/^[\,\/]$/.test(text)) {
          this.type = "operator";
          this.value = text;
        } else if (/^[a-z\-_\u0080-\uFFFF][a-z0-9\-_\u0080-\uFFFF]*$/i.test(text)) {
          this.type = "identifier";
          this.value = text;
        }
      }
      PropertyValuePart.prototype = new SyntaxUnit();
      PropertyValuePart.prototype.constructor = PropertyValuePart;
      PropertyValuePart.parseString = function(str) {
        str = str.slice(1, -1);
        var replacer = function(match, esc) {
          if (/^(\n|\r\n|\r|\f)$/.test(esc)) {
            return "";
          }
          var m = /^[0-9a-f]{1,6}/i.exec(esc);
          if (m) {
            var codePoint = parseInt(m[0], 16);
            if (String.fromCodePoint) {
              return String.fromCodePoint(codePoint);
            } else {
              return String.fromCharCode(codePoint);
            }
          }
          return esc;
        };
        return str.replace(/\\(\r\n|[^\r0-9a-f]|[0-9a-f]{1,6}(\r\n|[ \n\r\t\f])?)/gi, replacer);
      };
      PropertyValuePart.serializeString = function(value) {
        var replacer = function(match, c) {
          if (c === '"') {
            return "\\" + c;
          }
          var cp = String.codePointAt ? String.codePointAt(0) : (
            // We only escape non-surrogate chars, so using charCodeAt
            // is harmless here.
            String.charCodeAt(0)
          );
          return "\\" + cp.toString(16) + " ";
        };
        return '"' + value.replace(/["\r\n\f]/g, replacer) + '"';
      };
      PropertyValuePart.fromToken = function(token) {
        return new PropertyValuePart(token.value, token.startLine, token.startCol);
      };
      var Pseudos = {
        __proto__: null,
        ":first-letter": 1,
        ":first-line": 1,
        ":before": 1,
        ":after": 1
      };
      Pseudos.ELEMENT = 1;
      Pseudos.CLASS = 2;
      Pseudos.isElement = function(pseudo) {
        return pseudo.indexOf("::") === 0 || Pseudos[pseudo.toLowerCase()] === Pseudos.ELEMENT;
      };
      function Selector(parts, line, col) {
        SyntaxUnit.call(this, parts.join(" "), line, col, Parser.SELECTOR_TYPE);
        this.parts = parts;
        this.specificity = Specificity.calculate(this);
      }
      Selector.prototype = new SyntaxUnit();
      Selector.prototype.constructor = Selector;
      function SelectorPart(elementName, modifiers, text, line, col) {
        SyntaxUnit.call(this, text, line, col, Parser.SELECTOR_PART_TYPE);
        this.elementName = elementName;
        this.modifiers = modifiers;
      }
      SelectorPart.prototype = new SyntaxUnit();
      SelectorPart.prototype.constructor = SelectorPart;
      function SelectorSubPart(text, type, line, col) {
        SyntaxUnit.call(this, text, line, col, Parser.SELECTOR_SUB_PART_TYPE);
        this.type = type;
        this.args = [];
      }
      SelectorSubPart.prototype = new SyntaxUnit();
      SelectorSubPart.prototype.constructor = SelectorSubPart;
      function Specificity(a, b, c, d) {
        this.a = a;
        this.b = b;
        this.c = c;
        this.d = d;
      }
      Specificity.prototype = {
        constructor: Specificity,
        /**
         * Compare this specificity to another.
         * @param {Specificity} other The other specificity to compare to.
         * @return {int} -1 if the other specificity is larger, 1 if smaller, 0 if equal.
         * @method compare
         */
        compare: function(other) {
          var comps = ["a", "b", "c", "d"], i, len;
          for (i = 0, len = comps.length; i < len; i++) {
            if (this[comps[i]] < other[comps[i]]) {
              return -1;
            } else if (this[comps[i]] > other[comps[i]]) {
              return 1;
            }
          }
          return 0;
        },
        /**
         * Creates a numeric value for the specificity.
         * @return {int} The numeric value for the specificity.
         * @method valueOf
         */
        valueOf: function() {
          return this.a * 1e3 + this.b * 100 + this.c * 10 + this.d;
        },
        /**
         * Returns a string representation for specificity.
         * @return {String} The string representation of specificity.
         * @method toString
         */
        toString: function() {
          return this.a + "," + this.b + "," + this.c + "," + this.d;
        }
      };
      Specificity.calculate = function(selector) {
        var i, len, part, b = 0, c = 0, d = 0;
        function updateValues(part2) {
          var i2, j, len2, num, elementName = part2.elementName ? part2.elementName.text : "", modifier;
          if (elementName && elementName.charAt(elementName.length - 1) !== "*") {
            d++;
          }
          for (i2 = 0, len2 = part2.modifiers.length; i2 < len2; i2++) {
            modifier = part2.modifiers[i2];
            switch (modifier.type) {
              case "class":
              case "attribute":
                c++;
                break;
              case "id":
                b++;
                break;
              case "pseudo":
                if (Pseudos.isElement(modifier.text)) {
                  d++;
                } else {
                  c++;
                }
                break;
              case "not":
                for (j = 0, num = modifier.args.length; j < num; j++) {
                  updateValues(modifier.args[j]);
                }
            }
          }
        }
        for (i = 0, len = selector.parts.length; i < len; i++) {
          part = selector.parts[i];
          if (part instanceof SelectorPart) {
            updateValues(part);
          }
        }
        return new Specificity(0, b, c, d);
      };
      var h = /^[0-9a-fA-F]$/, nl = /\n|\r\n|\r|\f/;
      function isHexDigit(c) {
        return c !== null && h.test(c);
      }
      function isDigit(c) {
        return c !== null && /\d/.test(c);
      }
      function isWhitespace(c) {
        return c !== null && /\s/.test(c);
      }
      function isNewLine(c) {
        return c !== null && nl.test(c);
      }
      function isNameStart(c) {
        return c !== null && /[a-z_\u0080-\uFFFF\\]/i.test(c);
      }
      function isNameChar(c) {
        return c !== null && (isNameStart(c) || /[0-9\-\\]/.test(c));
      }
      function isIdentStart(c) {
        return c !== null && (isNameStart(c) || /\-\\/.test(c));
      }
      function mix(receiver, supplier) {
        for (var prop in supplier) {
          if (Object.prototype.hasOwnProperty.call(supplier, prop)) {
            receiver[prop] = supplier[prop];
          }
        }
        return receiver;
      }
      function TokenStream(input) {
        TokenStreamBase.call(this, input, Tokens);
      }
      TokenStream.prototype = mix(new TokenStreamBase(), {
        /**
         * Overrides the TokenStreamBase method of the same name
         * to produce CSS tokens.
         * @param {variant} channel The name of the channel to use
         *      for the next token.
         * @return {Object} A token object representing the next token.
         * @method _getToken
         * @private
         */
        _getToken: function(channel) {
          var c, reader = this._reader, token = null, startLine = reader.getLine(), startCol = reader.getCol();
          c = reader.read();
          while (c) {
            switch (c) {
              /*
               * Potential tokens:
               * - COMMENT
               * - SLASH
               * - CHAR
               */
              case "/":
                if (reader.peek() === "*") {
                  token = this.commentToken(c, startLine, startCol);
                } else {
                  token = this.charToken(c, startLine, startCol);
                }
                break;
              /*
               * Potential tokens:
               * - DASHMATCH
               * - INCLUDES
               * - PREFIXMATCH
               * - SUFFIXMATCH
               * - SUBSTRINGMATCH
               * - CHAR
               */
              case "|":
              case "~":
              case "^":
              case "$":
              case "*":
                if (reader.peek() === "=") {
                  token = this.comparisonToken(c, startLine, startCol);
                } else {
                  token = this.charToken(c, startLine, startCol);
                }
                break;
              /*
               * Potential tokens:
               * - STRING
               * - INVALID
               */
              case '"':
              case "'":
                token = this.stringToken(c, startLine, startCol);
                break;
              /*
               * Potential tokens:
               * - HASH
               * - CHAR
               */
              case "#":
                if (isNameChar(reader.peek())) {
                  token = this.hashToken(c, startLine, startCol);
                } else {
                  token = this.charToken(c, startLine, startCol);
                }
                break;
              /*
               * Potential tokens:
               * - DOT
               * - NUMBER
               * - DIMENSION
               * - PERCENTAGE
               */
              case ".":
                if (isDigit(reader.peek())) {
                  token = this.numberToken(c, startLine, startCol);
                } else {
                  token = this.charToken(c, startLine, startCol);
                }
                break;
              /*
               * Potential tokens:
               * - CDC
               * - MINUS
               * - NUMBER
               * - DIMENSION
               * - PERCENTAGE
               */
              case "-":
                if (reader.peek() === "-") {
                  token = this.htmlCommentEndToken(c, startLine, startCol);
                } else if (isNameStart(reader.peek())) {
                  token = this.identOrFunctionToken(c, startLine, startCol);
                } else {
                  token = this.charToken(c, startLine, startCol);
                }
                break;
              /*
               * Potential tokens:
               * - IMPORTANT_SYM
               * - CHAR
               */
              case "!":
                token = this.importantToken(c, startLine, startCol);
                break;
              /*
               * Any at-keyword or CHAR
               */
              case "@":
                token = this.atRuleToken(c, startLine, startCol);
                break;
              /*
               * Potential tokens:
               * - NOT
               * - CHAR
               */
              case ":":
                token = this.notToken(c, startLine, startCol);
                break;
              /*
               * Potential tokens:
               * - CDO
               * - CHAR
               */
              case "<":
                token = this.htmlCommentStartToken(c, startLine, startCol);
                break;
              /*
               * Potential tokens:
               * - UNICODE_RANGE
               * - URL
               * - CHAR
               */
              case "U":
              case "u":
                if (reader.peek() === "+") {
                  token = this.unicodeRangeToken(c, startLine, startCol);
                  break;
                }
              /* falls through */
              default:
                if (isDigit(c)) {
                  token = this.numberToken(c, startLine, startCol);
                } else if (isWhitespace(c)) {
                  token = this.whitespaceToken(c, startLine, startCol);
                } else if (isIdentStart(c)) {
                  token = this.identOrFunctionToken(c, startLine, startCol);
                } else {
                  token = this.charToken(c, startLine, startCol);
                }
            }
            break;
          }
          if (!token && c === null) {
            token = this.createToken(Tokens.EOF, null, startLine, startCol);
          }
          return token;
        },
        //-------------------------------------------------------------------------
        // Methods to create tokens
        //-------------------------------------------------------------------------
        /**
         * Produces a token based on available data and the current
         * reader position information. This method is called by other
         * private methods to create tokens and is never called directly.
         * @param {int} tt The token type.
         * @param {String} value The text value of the token.
         * @param {int} startLine The beginning line for the character.
         * @param {int} startCol The beginning column for the character.
         * @param {Object} options (Optional) Specifies a channel property
         *      to indicate that a different channel should be scanned
         *      and/or a hide property indicating that the token should
         *      be hidden.
         * @return {Object} A token object.
         * @method createToken
         */
        createToken: function(tt, value, startLine, startCol, options2) {
          var reader = this._reader;
          options2 = options2 || {};
          return {
            value,
            type: tt,
            channel: options2.channel,
            endChar: options2.endChar,
            hide: options2.hide || false,
            startLine,
            startCol,
            endLine: reader.getLine(),
            endCol: reader.getCol()
          };
        },
        //-------------------------------------------------------------------------
        // Methods to create specific tokens
        //-------------------------------------------------------------------------
        /**
         * Produces a token for any at-rule. If the at-rule is unknown, then
         * the token is for a single "@" character.
         * @param {String} first The first character for the token.
         * @param {int} startLine The beginning line for the character.
         * @param {int} startCol The beginning column for the character.
         * @return {Object} A token object.
         * @method atRuleToken
         */
        atRuleToken: function(first, startLine, startCol) {
          var rule = first, reader = this._reader, tt = Tokens.CHAR, ident;
          reader.mark();
          ident = this.readName();
          rule = first + ident;
          tt = Tokens.type(rule.toLowerCase());
          if (tt === Tokens.CHAR || tt === Tokens.UNKNOWN) {
            if (rule.length > 1) {
              tt = Tokens.UNKNOWN_SYM;
            } else {
              tt = Tokens.CHAR;
              rule = first;
              reader.reset();
            }
          }
          return this.createToken(tt, rule, startLine, startCol);
        },
        /**
         * Produces a character token based on the given character
         * and location in the stream. If there's a special (non-standard)
         * token name, this is used; otherwise CHAR is used.
         * @param {String} c The character for the token.
         * @param {int} startLine The beginning line for the character.
         * @param {int} startCol The beginning column for the character.
         * @return {Object} A token object.
         * @method charToken
         */
        charToken: function(c, startLine, startCol) {
          var tt = Tokens.type(c);
          var opts = {};
          if (tt === -1) {
            tt = Tokens.CHAR;
          } else {
            opts.endChar = Tokens[tt].endChar;
          }
          return this.createToken(tt, c, startLine, startCol, opts);
        },
        /**
         * Produces a character token based on the given character
         * and location in the stream. If there's a special (non-standard)
         * token name, this is used; otherwise CHAR is used.
         * @param {String} first The first character for the token.
         * @param {int} startLine The beginning line for the character.
         * @param {int} startCol The beginning column for the character.
         * @return {Object} A token object.
         * @method commentToken
         */
        commentToken: function(first, startLine, startCol) {
          var comment = this.readComment(first);
          return this.createToken(Tokens.COMMENT, comment, startLine, startCol);
        },
        /**
         * Produces a comparison token based on the given character
         * and location in the stream. The next character must be
         * read and is already known to be an equals sign.
         * @param {String} c The character for the token.
         * @param {int} startLine The beginning line for the character.
         * @param {int} startCol The beginning column for the character.
         * @return {Object} A token object.
         * @method comparisonToken
         */
        comparisonToken: function(c, startLine, startCol) {
          var reader = this._reader, comparison = c + reader.read(), tt = Tokens.type(comparison) || Tokens.CHAR;
          return this.createToken(tt, comparison, startLine, startCol);
        },
        /**
         * Produces a hash token based on the specified information. The
         * first character provided is the pound sign (#) and then this
         * method reads a name afterward.
         * @param {String} first The first character (#) in the hash name.
         * @param {int} startLine The beginning line for the character.
         * @param {int} startCol The beginning column for the character.
         * @return {Object} A token object.
         * @method hashToken
         */
        hashToken: function(first, startLine, startCol) {
          var name = this.readName(first);
          return this.createToken(Tokens.HASH, name, startLine, startCol);
        },
        /**
         * Produces a CDO or CHAR token based on the specified information. The
         * first character is provided and the rest is read by the function to determine
         * the correct token to create.
         * @param {String} first The first character in the token.
         * @param {int} startLine The beginning line for the character.
         * @param {int} startCol The beginning column for the character.
         * @return {Object} A token object.
         * @method htmlCommentStartToken
         */
        htmlCommentStartToken: function(first, startLine, startCol) {
          var reader = this._reader, text = first;
          reader.mark();
          text += reader.readCount(3);
          if (text === "<!--") {
            return this.createToken(Tokens.CDO, text, startLine, startCol);
          } else {
            reader.reset();
            return this.charToken(first, startLine, startCol);
          }
        },
        /**
         * Produces a CDC or CHAR token based on the specified information. The
         * first character is provided and the rest is read by the function to determine
         * the correct token to create.
         * @param {String} first The first character in the token.
         * @param {int} startLine The beginning line for the character.
         * @param {int} startCol The beginning column for the character.
         * @return {Object} A token object.
         * @method htmlCommentEndToken
         */
        htmlCommentEndToken: function(first, startLine, startCol) {
          var reader = this._reader, text = first;
          reader.mark();
          text += reader.readCount(2);
          if (text === "-->") {
            return this.createToken(Tokens.CDC, text, startLine, startCol);
          } else {
            reader.reset();
            return this.charToken(first, startLine, startCol);
          }
        },
        /**
         * Produces an IDENT or FUNCTION token based on the specified information. The
         * first character is provided and the rest is read by the function to determine
         * the correct token to create.
         * @param {String} first The first character in the identifier.
         * @param {int} startLine The beginning line for the character.
         * @param {int} startCol The beginning column for the character.
         * @return {Object} A token object.
         * @method identOrFunctionToken
         */
        identOrFunctionToken: function(first, startLine, startCol) {
          var reader = this._reader, ident = this.readName(first), tt = Tokens.IDENT, uriFns = ["url(", "url-prefix(", "domain("];
          if (reader.peek() === "(") {
            ident += reader.read();
            if (uriFns.indexOf(ident.toLowerCase()) > -1) {
              tt = Tokens.URI;
              ident = this.readURI(ident);
              if (uriFns.indexOf(ident.toLowerCase()) > -1) {
                tt = Tokens.FUNCTION;
              }
            } else {
              tt = Tokens.FUNCTION;
            }
          } else if (reader.peek() === ":") {
            if (ident.toLowerCase() === "progid") {
              ident += reader.readTo("(");
              tt = Tokens.IE_FUNCTION;
            }
          }
          return this.createToken(tt, ident, startLine, startCol);
        },
        /**
         * Produces an IMPORTANT_SYM or CHAR token based on the specified information. The
         * first character is provided and the rest is read by the function to determine
         * the correct token to create.
         * @param {String} first The first character in the token.
         * @param {int} startLine The beginning line for the character.
         * @param {int} startCol The beginning column for the character.
         * @return {Object} A token object.
         * @method importantToken
         */
        importantToken: function(first, startLine, startCol) {
          var reader = this._reader, important = first, tt = Tokens.CHAR, temp, c;
          reader.mark();
          c = reader.read();
          while (c) {
            if (c === "/") {
              if (reader.peek() !== "*") {
                break;
              } else {
                temp = this.readComment(c);
                if (temp === "") {
                  break;
                }
              }
            } else if (isWhitespace(c)) {
              important += c + this.readWhitespace();
            } else if (/i/i.test(c)) {
              temp = reader.readCount(8);
              if (/mportant/i.test(temp)) {
                important += c + temp;
                tt = Tokens.IMPORTANT_SYM;
              }
              break;
            } else {
              break;
            }
            c = reader.read();
          }
          if (tt === Tokens.CHAR) {
            reader.reset();
            return this.charToken(first, startLine, startCol);
          } else {
            return this.createToken(tt, important, startLine, startCol);
          }
        },
        /**
         * Produces a NOT or CHAR token based on the specified information. The
         * first character is provided and the rest is read by the function to determine
         * the correct token to create.
         * @param {String} first The first character in the token.
         * @param {int} startLine The beginning line for the character.
         * @param {int} startCol The beginning column for the character.
         * @return {Object} A token object.
         * @method notToken
         */
        notToken: function(first, startLine, startCol) {
          var reader = this._reader, text = first;
          reader.mark();
          text += reader.readCount(4);
          if (text.toLowerCase() === ":not(") {
            return this.createToken(Tokens.NOT, text, startLine, startCol);
          } else {
            reader.reset();
            return this.charToken(first, startLine, startCol);
          }
        },
        /**
         * Produces a number token based on the given character
         * and location in the stream. This may return a token of
         * NUMBER, EMS, EXS, LENGTH, ANGLE, TIME, FREQ, DIMENSION,
         * or PERCENTAGE.
         * @param {String} first The first character for the token.
         * @param {int} startLine The beginning line for the character.
         * @param {int} startCol The beginning column for the character.
         * @return {Object} A token object.
         * @method numberToken
         */
        numberToken: function(first, startLine, startCol) {
          var reader = this._reader, value = this.readNumber(first), ident, tt = Tokens.NUMBER, c = reader.peek();
          if (isIdentStart(c)) {
            ident = this.readName(reader.read());
            value += ident;
            if (/^em$|^ex$|^px$|^gd$|^rem$|^vw$|^vh$|^vmax$|^vmin$|^ch$|^cm$|^mm$|^in$|^pt$|^pc$/i.test(
              ident
            )) {
              tt = Tokens.LENGTH;
            } else if (/^deg|^rad$|^grad$/i.test(ident)) {
              tt = Tokens.ANGLE;
            } else if (/^ms$|^s$/i.test(ident)) {
              tt = Tokens.TIME;
            } else if (/^hz$|^khz$/i.test(ident)) {
              tt = Tokens.FREQ;
            } else if (/^dpi$|^dpcm$/i.test(ident)) {
              tt = Tokens.RESOLUTION;
            } else {
              tt = Tokens.DIMENSION;
            }
          } else if (c === "%") {
            value += reader.read();
            tt = Tokens.PERCENTAGE;
          }
          return this.createToken(tt, value, startLine, startCol);
        },
        /**
         * Produces a string token based on the given character
         * and location in the stream. Since strings may be indicated
         * by single or double quotes, a failure to match starting
         * and ending quotes results in an INVALID token being generated.
         * The first character in the string is passed in and then
         * the rest are read up to and including the final quotation mark.
         * @param {String} first The first character in the string.
         * @param {int} startLine The beginning line for the character.
         * @param {int} startCol The beginning column for the character.
         * @return {Object} A token object.
         * @method stringToken
         */
        stringToken: function(first, startLine, startCol) {
          var delim = first, string = first, reader = this._reader, prev = first, tt = Tokens.STRING, c = reader.read();
          while (c) {
            string += c;
            if (c === delim && prev !== "\\") {
              break;
            }
            if (isNewLine(reader.peek()) && c !== "\\") {
              tt = Tokens.INVALID;
              break;
            }
            prev = c;
            c = reader.read();
          }
          if (c === null) {
            tt = Tokens.INVALID;
          }
          return this.createToken(tt, string, startLine, startCol);
        },
        unicodeRangeToken: function(first, startLine, startCol) {
          var reader = this._reader, value = first, temp, tt = Tokens.CHAR;
          if (reader.peek() === "+") {
            reader.mark();
            value += reader.read();
            value += this.readUnicodeRangePart(true);
            if (value.length === 2) {
              reader.reset();
            } else {
              tt = Tokens.UNICODE_RANGE;
              if (value.indexOf("?") === -1) {
                if (reader.peek() === "-") {
                  reader.mark();
                  temp = reader.read();
                  temp += this.readUnicodeRangePart(false);
                  if (temp.length === 1) {
                    reader.reset();
                  } else {
                    value += temp;
                  }
                }
              }
            }
          }
          return this.createToken(tt, value, startLine, startCol);
        },
        /**
         * Produces a S token based on the specified information. Since whitespace
         * may have multiple characters, this consumes all whitespace characters
         * into a single token.
         * @param {String} first The first character in the token.
         * @param {int} startLine The beginning line for the character.
         * @param {int} startCol The beginning column for the character.
         * @return {Object} A token object.
         * @method whitespaceToken
         */
        whitespaceToken: function(first, startLine, startCol) {
          var value = first + this.readWhitespace();
          return this.createToken(Tokens.S, value, startLine, startCol);
        },
        //-------------------------------------------------------------------------
        // Methods to read values from the string stream
        //-------------------------------------------------------------------------
        readUnicodeRangePart: function(allowQuestionMark) {
          var reader = this._reader, part = "", c = reader.peek();
          while (isHexDigit(c) && part.length < 6) {
            reader.read();
            part += c;
            c = reader.peek();
          }
          if (allowQuestionMark) {
            while (c === "?" && part.length < 6) {
              reader.read();
              part += c;
              c = reader.peek();
            }
          }
          return part;
        },
        readWhitespace: function() {
          var reader = this._reader, whitespace = "", c = reader.peek();
          while (isWhitespace(c)) {
            reader.read();
            whitespace += c;
            c = reader.peek();
          }
          return whitespace;
        },
        readNumber: function(first) {
          var reader = this._reader, number = first, hasDot = first === ".", c = reader.peek();
          while (c) {
            if (isDigit(c)) {
              number += reader.read();
            } else if (c === ".") {
              if (hasDot) {
                break;
              } else {
                hasDot = true;
                number += reader.read();
              }
            } else {
              break;
            }
            c = reader.peek();
          }
          return number;
        },
        readString: function() {
          var reader = this._reader, delim = reader.read(), string = delim, prev = delim, c = reader.peek();
          while (c) {
            c = reader.read();
            string += c;
            if (c === delim && prev !== "\\") {
              break;
            }
            if (isNewLine(reader.peek()) && c !== "\\") {
              string = "";
              break;
            }
            prev = c;
            c = reader.peek();
          }
          if (c === null) {
            string = "";
          }
          return string;
        },
        readURI: function(first) {
          var reader = this._reader, uri = first, inner = "", c = reader.peek();
          reader.mark();
          while (c && isWhitespace(c)) {
            reader.read();
            c = reader.peek();
          }
          if (c === "'" || c === '"') {
            inner = this.readString();
          } else {
            inner = this.readURL();
          }
          c = reader.peek();
          while (c && isWhitespace(c)) {
            reader.read();
            c = reader.peek();
          }
          if (inner === "" || c !== ")") {
            uri = first;
            reader.reset();
          } else {
            uri += inner + reader.read();
          }
          return uri;
        },
        readURL: function() {
          var reader = this._reader, url = "", c = reader.peek();
          while (/^[!#$%&\\*-~]$/.test(c)) {
            url += reader.read();
            c = reader.peek();
          }
          return url;
        },
        readName: function(first) {
          var reader = this._reader, ident = first || "", c = reader.peek();
          while (true) {
            if (c === "\\") {
              ident += this.readEscape(reader.read());
              c = reader.peek();
            } else if (c && isNameChar(c)) {
              ident += reader.read();
              c = reader.peek();
            } else {
              break;
            }
          }
          return ident;
        },
        readEscape: function(first) {
          var reader = this._reader, cssEscape = first || "", i = 0, c = reader.peek();
          if (isHexDigit(c)) {
            do {
              cssEscape += reader.read();
              c = reader.peek();
            } while (c && isHexDigit(c) && ++i < 6);
          }
          if (cssEscape.length === 3 && /\s/.test(c) || cssEscape.length === 7 || cssEscape.length === 1) {
            reader.read();
          } else {
            c = "";
          }
          return cssEscape + c;
        },
        readComment: function(first) {
          var reader = this._reader, comment = first || "", c = reader.read();
          if (c === "*") {
            while (c) {
              comment += c;
              if (comment.length > 2 && c === "*" && reader.peek() === "/") {
                comment += reader.read();
                break;
              }
              c = reader.read();
            }
            return comment;
          } else {
            return "";
          }
        }
      });
      var Tokens = [
        /*
         * The following token names are defined in CSS3 Grammar: http://www.w3.org/TR/css3-syntax/#lexical
         */
        //HTML-style comments
        { name: "CDO" },
        { name: "CDC" },
        //ignorables
        {
          name: "S",
          whitespace: true
          /*, channel: "ws"*/
        },
        { name: "COMMENT", comment: true, hide: true, channel: "comment" },
        //attribute equality
        { name: "INCLUDES", text: "~=" },
        { name: "DASHMATCH", text: "|=" },
        { name: "PREFIXMATCH", text: "^=" },
        { name: "SUFFIXMATCH", text: "$=" },
        { name: "SUBSTRINGMATCH", text: "*=" },
        //identifier types
        { name: "STRING" },
        { name: "IDENT" },
        { name: "HASH" },
        //at-keywords
        { name: "IMPORT_SYM", text: "@import" },
        { name: "PAGE_SYM", text: "@page" },
        { name: "MEDIA_SYM", text: "@media" },
        { name: "FONT_FACE_SYM", text: "@font-face" },
        { name: "CHARSET_SYM", text: "@charset" },
        { name: "NAMESPACE_SYM", text: "@namespace" },
        { name: "VIEWPORT_SYM", text: ["@viewport", "@-ms-viewport", "@-o-viewport"] },
        { name: "DOCUMENT_SYM", text: ["@document", "@-moz-document"] },
        { name: "UNKNOWN_SYM" },
        //{ name: "ATKEYWORD"},
        //CSS3 animations
        {
          name: "KEYFRAMES_SYM",
          text: ["@keyframes", "@-webkit-keyframes", "@-moz-keyframes", "@-o-keyframes"]
        },
        //important symbol
        { name: "IMPORTANT_SYM" },
        //measurements
        { name: "LENGTH" },
        { name: "ANGLE" },
        { name: "TIME" },
        { name: "FREQ" },
        { name: "DIMENSION" },
        { name: "PERCENTAGE" },
        { name: "NUMBER" },
        //functions
        { name: "URI" },
        { name: "FUNCTION" },
        //Unicode ranges
        { name: "UNICODE_RANGE" },
        /*
         * The following token names are defined in CSS3 Selectors: http://www.w3.org/TR/css3-selectors/#selector-syntax
         */
        //invalid string
        { name: "INVALID" },
        //combinators
        { name: "PLUS", text: "+" },
        { name: "GREATER", text: ">" },
        { name: "COMMA", text: "," },
        { name: "TILDE", text: "~" },
        //modifier
        { name: "NOT" },
        /*
         * Defined in CSS3 Paged Media
         */
        { name: "TOPLEFTCORNER_SYM", text: "@top-left-corner" },
        { name: "TOPLEFT_SYM", text: "@top-left" },
        { name: "TOPCENTER_SYM", text: "@top-center" },
        { name: "TOPRIGHT_SYM", text: "@top-right" },
        { name: "TOPRIGHTCORNER_SYM", text: "@top-right-corner" },
        { name: "BOTTOMLEFTCORNER_SYM", text: "@bottom-left-corner" },
        { name: "BOTTOMLEFT_SYM", text: "@bottom-left" },
        { name: "BOTTOMCENTER_SYM", text: "@bottom-center" },
        { name: "BOTTOMRIGHT_SYM", text: "@bottom-right" },
        { name: "BOTTOMRIGHTCORNER_SYM", text: "@bottom-right-corner" },
        { name: "LEFTTOP_SYM", text: "@left-top" },
        { name: "LEFTMIDDLE_SYM", text: "@left-middle" },
        { name: "LEFTBOTTOM_SYM", text: "@left-bottom" },
        { name: "RIGHTTOP_SYM", text: "@right-top" },
        { name: "RIGHTMIDDLE_SYM", text: "@right-middle" },
        { name: "RIGHTBOTTOM_SYM", text: "@right-bottom" },
        /*
         * The following token names are defined in CSS3 Media Queries: http://www.w3.org/TR/css3-mediaqueries/#syntax
         */
        /*{ name: "MEDIA_ONLY", state: "media"},
        { name: "MEDIA_NOT", state: "media"},
        { name: "MEDIA_AND", state: "media"},*/
        { name: "RESOLUTION", state: "media" },
        /*
         * The following token names are not defined in any CSS specification but are used by the lexer.
         */
        //not a real token, but useful for stupid IE filters
        { name: "IE_FUNCTION" },
        //part of CSS3 grammar but not the Flex code
        { name: "CHAR" },
        //TODO: Needed?
        //Not defined as tokens, but might as well be
        {
          name: "PIPE",
          text: "|"
        },
        {
          name: "SLASH",
          text: "/"
        },
        {
          name: "MINUS",
          text: "-"
        },
        {
          name: "STAR",
          text: "*"
        },
        {
          name: "LBRACE",
          endChar: "}",
          text: "{"
        },
        {
          name: "RBRACE",
          text: "}"
        },
        {
          name: "LBRACKET",
          endChar: "]",
          text: "["
        },
        {
          name: "RBRACKET",
          text: "]"
        },
        {
          name: "EQUALS",
          text: "="
        },
        {
          name: "COLON",
          text: ":"
        },
        {
          name: "SEMICOLON",
          text: ";"
        },
        {
          name: "LPAREN",
          endChar: ")",
          text: "("
        },
        {
          name: "RPAREN",
          text: ")"
        },
        {
          name: "DOT",
          text: "."
        }
      ];
      (function() {
        var nameMap = [], typeMap = /* @__PURE__ */ Object.create(null);
        Tokens.UNKNOWN = -1;
        Tokens.unshift({ name: "EOF" });
        for (var i = 0, len = Tokens.length; i < len; i++) {
          nameMap.push(Tokens[i].name);
          Tokens[Tokens[i].name] = i;
          if (Tokens[i].text) {
            if (Tokens[i].text instanceof Array) {
              for (var j = 0; j < Tokens[i].text.length; j++) {
                typeMap[Tokens[i].text[j]] = i;
              }
            } else {
              typeMap[Tokens[i].text] = i;
            }
          }
        }
        Tokens.name = function(tt) {
          return nameMap[tt];
        };
        Tokens.type = function(c) {
          return typeMap[c] || -1;
        };
      })();
      var Validation = {
        validate: function(property, value) {
          var name = property.toString().toLowerCase(), expression = new PropertyValueIterator(value), spec = Properties[name];
          if (!spec) {
            if (name.indexOf("-") !== 0) {
              throw new ValidationError(
                "Unknown property '" + property + "'.",
                property.line,
                property.col
              );
            }
          } else if (typeof spec !== "number") {
            if (typeof spec === "string") {
              if (spec.indexOf("||") > -1) {
                this.groupProperty(spec, expression);
              } else {
                this.singleProperty(spec, expression, 1);
              }
            } else if (spec.multi) {
              this.multiProperty(spec.multi, expression, spec.comma, spec.max || Infinity);
            } else if (typeof spec === "function") {
              spec(expression);
            }
          }
        },
        singleProperty: function(types, expression, max, partial) {
          var result = false, value = expression.value, count = 0, part;
          while (expression.hasNext() && count < max) {
            result = ValidationTypes.isAny(expression, types);
            if (!result) {
              break;
            }
            count++;
          }
          if (!result) {
            if (expression.hasNext() && !expression.isFirst()) {
              part = expression.peek();
              throw new ValidationError(
                "Expected end of value but found '" + part + "'.",
                part.line,
                part.col
              );
            } else {
              throw new ValidationError(
                "Expected (" + types + ") but found '" + value + "'.",
                value.line,
                value.col
              );
            }
          } else if (expression.hasNext()) {
            part = expression.next();
            throw new ValidationError(
              "Expected end of value but found '" + part + "'.",
              part.line,
              part.col
            );
          }
        },
        multiProperty: function(types, expression, comma, max) {
          var result = false, value = expression.value, count = 0, part;
          while (expression.hasNext() && !result && count < max) {
            if (ValidationTypes.isAny(expression, types)) {
              count++;
              if (!expression.hasNext()) {
                result = true;
              } else if (comma) {
                if (String(expression.peek()) === ",") {
                  part = expression.next();
                } else {
                  break;
                }
              }
            } else {
              break;
            }
          }
          if (!result) {
            if (expression.hasNext() && !expression.isFirst()) {
              part = expression.peek();
              throw new ValidationError(
                "Expected end of value but found '" + part + "'.",
                part.line,
                part.col
              );
            } else {
              part = expression.previous();
              if (comma && String(part) === ",") {
                throw new ValidationError(
                  "Expected end of value but found '" + part + "'.",
                  part.line,
                  part.col
                );
              } else {
                throw new ValidationError(
                  "Expected (" + types + ") but found '" + value + "'.",
                  value.line,
                  value.col
                );
              }
            }
          } else if (expression.hasNext()) {
            part = expression.next();
            throw new ValidationError(
              "Expected end of value but found '" + part + "'.",
              part.line,
              part.col
            );
          }
        },
        groupProperty: function(types, expression, comma) {
          var result = false, value = expression.value, typeCount = types.split("||").length, groups = { count: 0 }, partial = false, name, part;
          while (expression.hasNext() && !result) {
            name = ValidationTypes.isAnyOfGroup(expression, types);
            if (name) {
              if (groups[name]) {
                break;
              } else {
                groups[name] = 1;
                groups.count++;
                partial = true;
                if (groups.count === typeCount || !expression.hasNext()) {
                  result = true;
                }
              }
            } else {
              break;
            }
          }
          if (!result) {
            if (partial && expression.hasNext()) {
              part = expression.peek();
              throw new ValidationError(
                "Expected end of value but found '" + part + "'.",
                part.line,
                part.col
              );
            } else {
              throw new ValidationError(
                "Expected (" + types + ") but found '" + value + "'.",
                value.line,
                value.col
              );
            }
          } else if (expression.hasNext()) {
            part = expression.next();
            throw new ValidationError(
              "Expected end of value but found '" + part + "'.",
              part.line,
              part.col
            );
          }
        }
      };
      function ValidationError(message, line, col) {
        this.col = col;
        this.line = line;
        this.message = message;
      }
      ValidationError.prototype = new Error();
      var ValidationTypes = {
        isLiteral: function(part, literals) {
          var text = part.text.toString().toLowerCase(), args = literals.split(" | "), i, len, found = false;
          for (i = 0, len = args.length; i < len && !found; i++) {
            if (text === args[i].toLowerCase()) {
              found = true;
            }
          }
          return found;
        },
        isSimple: function(type) {
          return !!this.simple[type];
        },
        isComplex: function(type) {
          return !!this.complex[type];
        },
        /**
         * Determines if the next part(s) of the given expression
         * are any of the given types.
         */
        isAny: function(expression, types) {
          var args = types.split(" | "), i, len, found = false;
          for (i = 0, len = args.length; i < len && !found && expression.hasNext(); i++) {
            found = this.isType(expression, args[i]);
          }
          return found;
        },
        /**
         * Determines if the next part(s) of the given expression
         * are one of a group.
         */
        isAnyOfGroup: function(expression, types) {
          var args = types.split(" || "), i, len, found = false;
          for (i = 0, len = args.length; i < len && !found; i++) {
            found = this.isType(expression, args[i]);
          }
          return found ? args[i - 1] : false;
        },
        /**
         * Determines if the next part(s) of the given expression
         * are of a given type.
         */
        isType: function(expression, type) {
          var part = expression.peek(), result = false;
          if (type.charAt(0) !== "<") {
            result = this.isLiteral(part, type);
            if (result) {
              expression.next();
            }
          } else if (this.simple[type]) {
            result = this.simple[type](part);
            if (result) {
              expression.next();
            }
          } else {
            result = this.complex[type](expression);
          }
          return result;
        },
        simple: {
          __proto__: null,
          "<absolute-size>": function(part) {
            return ValidationTypes.isLiteral(
              part,
              "xx-small | x-small | small | medium | large | x-large | xx-large"
            );
          },
          "<attachment>": function(part) {
            return ValidationTypes.isLiteral(part, "scroll | fixed | local");
          },
          "<attr>": function(part) {
            return part.type === "function" && part.name === "attr";
          },
          "<bg-image>": function(part) {
            return this["<image>"](part) || this["<gradient>"](part) || String(part) === "none";
          },
          "<gradient>": function(part) {
            return part.type === "function" && /^(?:\-(?:ms|moz|o|webkit)\-)?(?:repeating\-)?(?:radial\-|linear\-)?gradient/i.test(part);
          },
          "<box>": function(part) {
            return ValidationTypes.isLiteral(part, "padding-box | border-box | content-box");
          },
          "<content>": function(part) {
            return part.type === "function" && part.name === "content";
          },
          "<relative-size>": function(part) {
            return ValidationTypes.isLiteral(part, "smaller | larger");
          },
          //any identifier
          "<ident>": function(part) {
            return part.type === "identifier";
          },
          "<length>": function(part) {
            if (part.type === "function" && /^(?:\-(?:ms|moz|o|webkit)\-)?calc/i.test(part)) {
              return true;
            } else {
              return part.type === "length" || part.type === "number" || part.type === "integer" || String(part) === "0";
            }
          },
          "<color>": function(part) {
            return part.type === "color" || String(part) === "transparent" || String(part) === "currentColor";
          },
          "<number>": function(part) {
            return part.type === "number" || this["<integer>"](part);
          },
          "<integer>": function(part) {
            return part.type === "integer";
          },
          "<line>": function(part) {
            return part.type === "integer";
          },
          "<angle>": function(part) {
            return part.type === "angle";
          },
          "<uri>": function(part) {
            return part.type === "uri";
          },
          "<image>": function(part) {
            return this["<uri>"](part);
          },
          "<percentage>": function(part) {
            return part.type === "percentage" || String(part) === "0";
          },
          "<border-width>": function(part) {
            return this["<length>"](part) || ValidationTypes.isLiteral(part, "thin | medium | thick");
          },
          "<border-style>": function(part) {
            return ValidationTypes.isLiteral(
              part,
              "none | hidden | dotted | dashed | solid | double | groove | ridge | inset | outset"
            );
          },
          "<content-sizing>": function(part) {
            return ValidationTypes.isLiteral(
              part,
              "fill-available | -moz-available | -webkit-fill-available | max-content | -moz-max-content | -webkit-max-content | min-content | -moz-min-content | -webkit-min-content | fit-content | -moz-fit-content | -webkit-fit-content"
            );
          },
          "<margin-width>": function(part) {
            return this["<length>"](part) || this["<percentage>"](part) || ValidationTypes.isLiteral(part, "auto");
          },
          "<padding-width>": function(part) {
            return this["<length>"](part) || this["<percentage>"](part);
          },
          "<shape>": function(part) {
            return part.type === "function" && (part.name === "rect" || part.name === "inset-rect");
          },
          "<time>": function(part) {
            return part.type === "time";
          },
          "<flex-grow>": function(part) {
            return this["<number>"](part);
          },
          "<flex-shrink>": function(part) {
            return this["<number>"](part);
          },
          "<width>": function(part) {
            return this["<margin-width>"](part);
          },
          "<flex-basis>": function(part) {
            return this["<width>"](part);
          },
          "<flex-direction>": function(part) {
            return ValidationTypes.isLiteral(part, "row | row-reverse | column | column-reverse");
          },
          "<flex-wrap>": function(part) {
            return ValidationTypes.isLiteral(part, "nowrap | wrap | wrap-reverse");
          },
          "<feature-tag-value>": function(part) {
            return part.type === "function" && /^[A-Z0-9]{4}$/i.test(part);
          }
        },
        complex: {
          __proto__: null,
          "<bg-position>": function(expression) {
            var result = false, numeric = "<percentage> | <length>", xDir = "left | right", yDir = "top | bottom", count = 0;
            while (expression.peek(count) && expression.peek(count).text !== ",") {
              count++;
            }
            if (count < 3) {
              if (ValidationTypes.isAny(expression, xDir + " | center | " + numeric)) {
                result = true;
                ValidationTypes.isAny(expression, yDir + " | center | " + numeric);
              } else if (ValidationTypes.isAny(expression, yDir)) {
                result = true;
                ValidationTypes.isAny(expression, xDir + " | center");
              }
            } else {
              if (ValidationTypes.isAny(expression, xDir)) {
                if (ValidationTypes.isAny(expression, yDir)) {
                  result = true;
                  ValidationTypes.isAny(expression, numeric);
                } else if (ValidationTypes.isAny(expression, numeric)) {
                  if (ValidationTypes.isAny(expression, yDir)) {
                    result = true;
                    ValidationTypes.isAny(expression, numeric);
                  } else if (ValidationTypes.isAny(expression, "center")) {
                    result = true;
                  }
                }
              } else if (ValidationTypes.isAny(expression, yDir)) {
                if (ValidationTypes.isAny(expression, xDir)) {
                  result = true;
                  ValidationTypes.isAny(expression, numeric);
                } else if (ValidationTypes.isAny(expression, numeric)) {
                  if (ValidationTypes.isAny(expression, xDir)) {
                    result = true;
                    ValidationTypes.isAny(expression, numeric);
                  } else if (ValidationTypes.isAny(expression, "center")) {
                    result = true;
                  }
                }
              } else if (ValidationTypes.isAny(expression, "center")) {
                if (ValidationTypes.isAny(expression, xDir + " | " + yDir)) {
                  result = true;
                  ValidationTypes.isAny(expression, numeric);
                }
              }
            }
            return result;
          },
          "<bg-size>": function(expression) {
            var result = false, numeric = "<percentage> | <length> | auto";
            if (ValidationTypes.isAny(expression, "cover | contain")) {
              result = true;
            } else if (ValidationTypes.isAny(expression, numeric)) {
              result = true;
              ValidationTypes.isAny(expression, numeric);
            }
            return result;
          },
          "<repeat-style>": function(expression) {
            var result = false, values = "repeat | space | round | no-repeat", part;
            if (expression.hasNext()) {
              part = expression.next();
              if (ValidationTypes.isLiteral(part, "repeat-x | repeat-y")) {
                result = true;
              } else if (ValidationTypes.isLiteral(part, values)) {
                result = true;
                if (expression.hasNext() && ValidationTypes.isLiteral(expression.peek(), values)) {
                  expression.next();
                }
              }
            }
            return result;
          },
          "<shadow>": function(expression) {
            var result = false, count = 0, inset = false, color = false;
            if (expression.hasNext()) {
              if (ValidationTypes.isAny(expression, "inset")) {
                inset = true;
              }
              if (ValidationTypes.isAny(expression, "<color>")) {
                color = true;
              }
              while (ValidationTypes.isAny(expression, "<length>") && count < 4) {
                count++;
              }
              if (expression.hasNext()) {
                if (!color) {
                  ValidationTypes.isAny(expression, "<color>");
                }
                if (!inset) {
                  ValidationTypes.isAny(expression, "inset");
                }
              }
              result = count >= 2 && count <= 4;
            }
            return result;
          },
          "<x-one-radius>": function(expression) {
            var result = false, simple = "<length> | <percentage> | inherit";
            if (ValidationTypes.isAny(expression, simple)) {
              result = true;
              ValidationTypes.isAny(expression, simple);
            }
            return result;
          },
          "<flex>": function(expression) {
            var part, result = false;
            if (ValidationTypes.isAny(expression, "none | inherit")) {
              result = true;
            } else {
              if (ValidationTypes.isType(expression, "<flex-grow>")) {
                if (expression.peek()) {
                  if (ValidationTypes.isType(expression, "<flex-shrink>")) {
                    if (expression.peek()) {
                      result = ValidationTypes.isType(expression, "<flex-basis>");
                    } else {
                      result = true;
                    }
                  } else if (ValidationTypes.isType(expression, "<flex-basis>")) {
                    result = expression.peek() === null;
                  }
                } else {
                  result = true;
                }
              } else if (ValidationTypes.isType(expression, "<flex-basis>")) {
                result = true;
              }
            }
            if (!result) {
              part = expression.peek();
              throw new ValidationError(
                "Expected (none | [ <flex-grow> <flex-shrink>? || <flex-basis> ]) but found '" + expression.value.text + "'.",
                part.line,
                part.col
              );
            }
            return result;
          }
        }
      };
      parserlib.css = {
        __proto__: null,
        Colors,
        Combinator,
        Parser,
        PropertyName,
        PropertyValue,
        PropertyValuePart,
        MediaFeature,
        MediaQuery,
        Selector,
        SelectorPart,
        SelectorSubPart,
        Specificity,
        TokenStream,
        Tokens,
        ValidationError
      };
    })();
    (function() {
      for (var prop in parserlib) {
        exports2[prop] = parserlib[prop];
      }
    })();
  }
});

// packages/qwik-dom/lib/CSSStyleDeclaration.js
var require_CSSStyleDeclaration = __commonJS({
  "packages/qwik-dom/lib/CSSStyleDeclaration.js"(exports2, module2) {
    "use strict";
    var parserlib = require_cssparser();
    module2.exports = CSSStyleDeclaration;
    function CSSStyleDeclaration(elt) {
      this._element = elt;
    }
    function parseStyles(s) {
      var parser = new parserlib.css.Parser();
      var result = { property: /* @__PURE__ */ Object.create(null), priority: /* @__PURE__ */ Object.create(null) };
      parser.addListener("property", function(e) {
        if (e.invalid) return;
        result.property[e.property.text] = e.value.text;
        if (e.important) result.priority[e.property.text] = "important";
      });
      s = ("" + s).replace(/^;/, "");
      parser.parseStyleAttribute(s);
      return result;
    }
    var NO_CHANGE = {};
    CSSStyleDeclaration.prototype = Object.create(Object.prototype, {
      // Return the parsed form of the element's style attribute.
      // If the element's style attribute has never been parsed
      // or if it has changed since the last parse, then reparse it
      // Note that the styles don't get parsed until they're actually needed
      _parsed: {
        get: function() {
          if (!this._parsedStyles || this.cssText !== this._lastParsedText) {
            var text = this.cssText;
            this._parsedStyles = parseStyles(text);
            this._lastParsedText = text;
            delete this._names;
          }
          return this._parsedStyles;
        }
      },
      // Call this method any time the parsed representation of the
      // style changes.  It converts the style properties to a string and
      // sets cssText and the element's style attribute
      _serialize: {
        value: function() {
          var styles = this._parsed;
          var s = "";
          for (var name in styles.property) {
            if (s) s += " ";
            s += name + ": " + styles.property[name];
            if (styles.priority[name]) {
              s += " !" + styles.priority[name];
            }
            s += ";";
          }
          this.cssText = s;
          this._lastParsedText = s;
          delete this._names;
        }
      },
      cssText: {
        get: function() {
          return this._element.getAttribute("style");
        },
        set: function(value) {
          this._element.setAttribute("style", value);
        }
      },
      length: {
        get: function() {
          if (!this._names) this._names = Object.getOwnPropertyNames(this._parsed.property);
          return this._names.length;
        }
      },
      item: {
        value: function(n) {
          if (!this._names) this._names = Object.getOwnPropertyNames(this._parsed.property);
          return this._names[n];
        }
      },
      getPropertyValue: {
        value: function(property) {
          property = property.toLowerCase();
          return this._parsed.property[property] || "";
        }
      },
      getPropertyPriority: {
        value: function(property) {
          property = property.toLowerCase();
          return this._parsed.priority[property] || "";
        }
      },
      setProperty: {
        value: function(property, value, priority) {
          property = property.toLowerCase();
          if (value === null || value === void 0) {
            value = "";
          }
          if (priority === null || priority === void 0) {
            priority = "";
          }
          if (value !== NO_CHANGE) {
            value = "" + value;
          }
          if (value === "") {
            this.removeProperty(property);
            return;
          }
          if (priority !== "" && priority !== NO_CHANGE && !/^important$/i.test(priority)) {
            return;
          }
          var styles = this._parsed;
          if (value === NO_CHANGE) {
            if (!styles.property[property]) {
              return;
            }
            if (priority !== "") {
              styles.priority[property] = "important";
            } else {
              delete styles.priority[property];
            }
          } else {
            if (value.indexOf(";") !== -1) return;
            var newprops = parseStyles(property + ":" + value);
            if (Object.getOwnPropertyNames(newprops.property).length === 0) {
              return;
            }
            if (Object.getOwnPropertyNames(newprops.priority).length !== 0) {
              return;
            }
            for (var p in newprops.property) {
              styles.property[p] = newprops.property[p];
              if (priority === NO_CHANGE) {
                continue;
              } else if (priority !== "") {
                styles.priority[p] = "important";
              } else if (styles.priority[p]) {
                delete styles.priority[p];
              }
            }
          }
          this._serialize();
        }
      },
      setPropertyValue: {
        value: function(property, value) {
          return this.setProperty(property, value, NO_CHANGE);
        }
      },
      setPropertyPriority: {
        value: function(property, priority) {
          return this.setProperty(property, NO_CHANGE, priority);
        }
      },
      removeProperty: {
        value: function(property) {
          property = property.toLowerCase();
          var styles = this._parsed;
          if (property in styles.property) {
            delete styles.property[property];
            delete styles.priority[property];
            this._serialize();
          }
        }
      }
    });
    var cssProperties = {
      accentColor: "accent-color",
      additiveSymbols: "additive-symbols",
      alignContent: "align-content",
      alignItems: "align-items",
      alignSelf: "align-self",
      alignmentBaseline: "alignment-baseline",
      all: "all",
      animation: "animation",
      animationDelay: "animation-delay",
      animationDirection: "animation-direction",
      animationDuration: "animation-duration",
      animationFillMode: "animation-fill-mode",
      animationIterationCount: "animation-iteration-count",
      animationName: "animation-name",
      animationPlayState: "animation-play-state",
      animationTimingFunction: "animation-timing-function",
      appRegion: "app-region",
      appearance: "appearance",
      ascentOverride: "ascent-override",
      aspectRatio: "aspect-ratio",
      backdropFilter: "backdrop-filter",
      backfaceVisibility: "backface-visibility",
      background: "background",
      backgroundAttachment: "background-attachment",
      backgroundBlendMode: "background-blend-mode",
      backgroundClip: "background-clip",
      backgroundColor: "background-color",
      backgroundImage: "background-image",
      backgroundOrigin: "background-origin",
      backgroundPosition: "background-position",
      backgroundPositionX: "background-position-x",
      backgroundPositionY: "background-position-y",
      backgroundRepeat: "background-repeat",
      backgroundRepeatX: "background-repeat-x",
      backgroundRepeatY: "background-repeat-y",
      backgroundSize: "background-size",
      basePalette: "base-palette",
      baselineShift: "baseline-shift",
      blockSize: "block-size",
      border: "border",
      borderBlock: "border-block",
      borderBlockColor: "border-block-color",
      borderBlockEnd: "border-block-end",
      borderBlockEndColor: "border-block-end-color",
      borderBlockEndStyle: "border-block-end-style",
      borderBlockEndWidth: "border-block-end-width",
      borderBlockStart: "border-block-start",
      borderBlockStartColor: "border-block-start-color",
      borderBlockStartStyle: "border-block-start-style",
      borderBlockStartWidth: "border-block-start-width",
      borderBlockStyle: "border-block-style",
      borderBlockWidth: "border-block-width",
      borderBottom: "border-bottom",
      borderBottomColor: "border-bottom-color",
      borderBottomLeftRadius: "border-bottom-left-radius",
      borderBottomRightRadius: "border-bottom-right-radius",
      borderBottomStyle: "border-bottom-style",
      borderBottomWidth: "border-bottom-width",
      borderCollapse: "border-collapse",
      borderColor: "border-color",
      borderEndEndRadius: "border-end-end-radius",
      borderEndStartRadius: "border-end-start-radius",
      borderImage: "border-image",
      borderImageOutset: "border-image-outset",
      borderImageRepeat: "border-image-repeat",
      borderImageSlice: "border-image-slice",
      borderImageSource: "border-image-source",
      borderImageWidth: "border-image-width",
      borderInline: "border-inline",
      borderInlineColor: "border-inline-color",
      borderInlineEnd: "border-inline-end",
      borderInlineEndColor: "border-inline-end-color",
      borderInlineEndStyle: "border-inline-end-style",
      borderInlineEndWidth: "border-inline-end-width",
      borderInlineStart: "border-inline-start",
      borderInlineStartColor: "border-inline-start-color",
      borderInlineStartStyle: "border-inline-start-style",
      borderInlineStartWidth: "border-inline-start-width",
      borderInlineStyle: "border-inline-style",
      borderInlineWidth: "border-inline-width",
      borderLeft: "border-left",
      borderLeftColor: "border-left-color",
      borderLeftStyle: "border-left-style",
      borderLeftWidth: "border-left-width",
      borderRadius: "border-radius",
      borderRight: "border-right",
      borderRightColor: "border-right-color",
      borderRightStyle: "border-right-style",
      borderRightWidth: "border-right-width",
      borderSpacing: "border-spacing",
      borderStartEndRadius: "border-start-end-radius",
      borderStartStartRadius: "border-start-start-radius",
      borderStyle: "border-style",
      borderTop: "border-top",
      borderTopColor: "border-top-color",
      borderTopLeftRadius: "border-top-left-radius",
      borderTopRightRadius: "border-top-right-radius",
      borderTopStyle: "border-top-style",
      borderTopWidth: "border-top-width",
      borderWidth: "border-width",
      bottom: "bottom",
      boxShadow: "box-shadow",
      boxSizing: "box-sizing",
      breakAfter: "break-after",
      breakBefore: "break-before",
      breakInside: "break-inside",
      bufferedRendering: "buffered-rendering",
      captionSide: "caption-side",
      caretColor: "caret-color",
      clear: "clear",
      clip: "clip",
      clipPath: "clip-path",
      clipRule: "clip-rule",
      color: "color",
      colorInterpolation: "color-interpolation",
      colorInterpolationFilters: "color-interpolation-filters",
      colorRendering: "color-rendering",
      colorScheme: "color-scheme",
      columnCount: "column-count",
      columnFill: "column-fill",
      columnGap: "column-gap",
      columnRule: "column-rule",
      columnRuleColor: "column-rule-color",
      columnRuleStyle: "column-rule-style",
      columnRuleWidth: "column-rule-width",
      columnSpan: "column-span",
      columnWidth: "column-width",
      columns: "columns",
      contain: "contain",
      containIntrinsicBlockSize: "contain-intrinsic-block-size",
      containIntrinsicHeight: "contain-intrinsic-height",
      containIntrinsicInlineSize: "contain-intrinsic-inline-size",
      containIntrinsicSize: "contain-intrinsic-size",
      containIntrinsicWidth: "contain-intrinsic-width",
      container: "container",
      containerName: "container-name",
      containerType: "container-type",
      content: "content",
      contentVisibility: "content-visibility",
      counterIncrement: "counter-increment",
      counterReset: "counter-reset",
      counterSet: "counter-set",
      cursor: "cursor",
      cx: "cx",
      cy: "cy",
      d: "d",
      descentOverride: "descent-override",
      direction: "direction",
      display: "display",
      dominantBaseline: "dominant-baseline",
      emptyCells: "empty-cells",
      fallback: "fallback",
      fill: "fill",
      fillOpacity: "fill-opacity",
      fillRule: "fill-rule",
      filter: "filter",
      flex: "flex",
      flexBasis: "flex-basis",
      flexDirection: "flex-direction",
      flexFlow: "flex-flow",
      flexGrow: "flex-grow",
      flexShrink: "flex-shrink",
      flexWrap: "flex-wrap",
      float: "float",
      floodColor: "flood-color",
      floodOpacity: "flood-opacity",
      font: "font",
      fontDisplay: "font-display",
      fontFamily: "font-family",
      fontFeatureSettings: "font-feature-settings",
      fontKerning: "font-kerning",
      fontOpticalSizing: "font-optical-sizing",
      fontPalette: "font-palette",
      fontSize: "font-size",
      fontStretch: "font-stretch",
      fontStyle: "font-style",
      fontSynthesis: "font-synthesis",
      fontSynthesisSmallCaps: "font-synthesis-small-caps",
      fontSynthesisStyle: "font-synthesis-style",
      fontSynthesisWeight: "font-synthesis-weight",
      fontVariant: "font-variant",
      fontVariantCaps: "font-variant-caps",
      fontVariantEastAsian: "font-variant-east-asian",
      fontVariantLigatures: "font-variant-ligatures",
      fontVariantNumeric: "font-variant-numeric",
      fontVariationSettings: "font-variation-settings",
      fontWeight: "font-weight",
      forcedColorAdjust: "forced-color-adjust",
      gap: "gap",
      grid: "grid",
      gridArea: "grid-area",
      gridAutoColumns: "grid-auto-columns",
      gridAutoFlow: "grid-auto-flow",
      gridAutoRows: "grid-auto-rows",
      gridColumn: "grid-column",
      gridColumnEnd: "grid-column-end",
      gridColumnGap: "grid-column-gap",
      gridColumnStart: "grid-column-start",
      gridGap: "grid-gap",
      gridRow: "grid-row",
      gridRowEnd: "grid-row-end",
      gridRowGap: "grid-row-gap",
      gridRowStart: "grid-row-start",
      gridTemplate: "grid-template",
      gridTemplateAreas: "grid-template-areas",
      gridTemplateColumns: "grid-template-columns",
      gridTemplateRows: "grid-template-rows",
      height: "height",
      hyphenateCharacter: "hyphenate-character",
      hyphenateLimitChars: "hyphenate-limit-chars",
      hyphens: "hyphens",
      imageOrientation: "image-orientation",
      imageRendering: "image-rendering",
      inherits: "inherits",
      initialLetter: "initial-letter",
      initialValue: "initial-value",
      inlineSize: "inline-size",
      inset: "inset",
      insetBlock: "inset-block",
      insetBlockEnd: "inset-block-end",
      insetBlockStart: "inset-block-start",
      insetInline: "inset-inline",
      insetInlineEnd: "inset-inline-end",
      insetInlineStart: "inset-inline-start",
      isolation: "isolation",
      justifyContent: "justify-content",
      justifyItems: "justify-items",
      justifySelf: "justify-self",
      left: "left",
      letterSpacing: "letter-spacing",
      lightingColor: "lighting-color",
      lineBreak: "line-break",
      lineGapOverride: "line-gap-override",
      lineHeight: "line-height",
      listStyle: "list-style",
      listStyleImage: "list-style-image",
      listStylePosition: "list-style-position",
      listStyleType: "list-style-type",
      margin: "margin",
      marginBlock: "margin-block",
      marginBlockEnd: "margin-block-end",
      marginBlockStart: "margin-block-start",
      marginBottom: "margin-bottom",
      marginInline: "margin-inline",
      marginInlineEnd: "margin-inline-end",
      marginInlineStart: "margin-inline-start",
      marginLeft: "margin-left",
      marginRight: "margin-right",
      marginTop: "margin-top",
      marker: "marker",
      markerEnd: "marker-end",
      markerMid: "marker-mid",
      markerStart: "marker-start",
      mask: "mask",
      maskType: "mask-type",
      mathDepth: "math-depth",
      mathShift: "math-shift",
      mathStyle: "math-style",
      maxBlockSize: "max-block-size",
      maxHeight: "max-height",
      maxInlineSize: "max-inline-size",
      maxWidth: "max-width",
      minBlockSize: "min-block-size",
      minHeight: "min-height",
      minInlineSize: "min-inline-size",
      minWidth: "min-width",
      mixBlendMode: "mix-blend-mode",
      negative: "negative",
      objectFit: "object-fit",
      objectPosition: "object-position",
      objectViewBox: "object-view-box",
      offset: "offset",
      offsetDistance: "offset-distance",
      offsetPath: "offset-path",
      offsetRotate: "offset-rotate",
      opacity: "opacity",
      order: "order",
      orphans: "orphans",
      outline: "outline",
      outlineColor: "outline-color",
      outlineOffset: "outline-offset",
      outlineStyle: "outline-style",
      outlineWidth: "outline-width",
      overflow: "overflow",
      overflowAnchor: "overflow-anchor",
      overflowClipMargin: "overflow-clip-margin",
      overflowWrap: "overflow-wrap",
      overflowX: "overflow-x",
      overflowY: "overflow-y",
      overrideColors: "override-colors",
      overscrollBehavior: "overscroll-behavior",
      overscrollBehaviorBlock: "overscroll-behavior-block",
      overscrollBehaviorInline: "overscroll-behavior-inline",
      overscrollBehaviorX: "overscroll-behavior-x",
      overscrollBehaviorY: "overscroll-behavior-y",
      pad: "pad",
      padding: "padding",
      paddingBlock: "padding-block",
      paddingBlockEnd: "padding-block-end",
      paddingBlockStart: "padding-block-start",
      paddingBottom: "padding-bottom",
      paddingInline: "padding-inline",
      paddingInlineEnd: "padding-inline-end",
      paddingInlineStart: "padding-inline-start",
      paddingLeft: "padding-left",
      paddingRight: "padding-right",
      paddingTop: "padding-top",
      page: "page",
      pageBreakAfter: "page-break-after",
      pageBreakBefore: "page-break-before",
      pageBreakInside: "page-break-inside",
      pageOrientation: "page-orientation",
      paintOrder: "paint-order",
      perspective: "perspective",
      perspectiveOrigin: "perspective-origin",
      placeContent: "place-content",
      placeItems: "place-items",
      placeSelf: "place-self",
      pointerEvents: "pointer-events",
      position: "position",
      prefix: "prefix",
      quotes: "quotes",
      r: "r",
      range: "range",
      resize: "resize",
      right: "right",
      rotate: "rotate",
      rowGap: "row-gap",
      rubyPosition: "ruby-position",
      rx: "rx",
      ry: "ry",
      scale: "scale",
      scrollBehavior: "scroll-behavior",
      scrollMargin: "scroll-margin",
      scrollMarginBlock: "scroll-margin-block",
      scrollMarginBlockEnd: "scroll-margin-block-end",
      scrollMarginBlockStart: "scroll-margin-block-start",
      scrollMarginBottom: "scroll-margin-bottom",
      scrollMarginInline: "scroll-margin-inline",
      scrollMarginInlineEnd: "scroll-margin-inline-end",
      scrollMarginInlineStart: "scroll-margin-inline-start",
      scrollMarginLeft: "scroll-margin-left",
      scrollMarginRight: "scroll-margin-right",
      scrollMarginTop: "scroll-margin-top",
      scrollPadding: "scroll-padding",
      scrollPaddingBlock: "scroll-padding-block",
      scrollPaddingBlockEnd: "scroll-padding-block-end",
      scrollPaddingBlockStart: "scroll-padding-block-start",
      scrollPaddingBottom: "scroll-padding-bottom",
      scrollPaddingInline: "scroll-padding-inline",
      scrollPaddingInlineEnd: "scroll-padding-inline-end",
      scrollPaddingInlineStart: "scroll-padding-inline-start",
      scrollPaddingLeft: "scroll-padding-left",
      scrollPaddingRight: "scroll-padding-right",
      scrollPaddingTop: "scroll-padding-top",
      scrollSnapAlign: "scroll-snap-align",
      scrollSnapStop: "scroll-snap-stop",
      scrollSnapType: "scroll-snap-type",
      scrollbarGutter: "scrollbar-gutter",
      shapeImageThreshold: "shape-image-threshold",
      shapeMargin: "shape-margin",
      shapeOutside: "shape-outside",
      shapeRendering: "shape-rendering",
      size: "size",
      sizeAdjust: "size-adjust",
      speak: "speak",
      speakAs: "speak-as",
      src: "src",
      stopColor: "stop-color",
      stopOpacity: "stop-opacity",
      stroke: "stroke",
      strokeDasharray: "stroke-dasharray",
      strokeDashoffset: "stroke-dashoffset",
      strokeLinecap: "stroke-linecap",
      strokeLinejoin: "stroke-linejoin",
      strokeMiterlimit: "stroke-miterlimit",
      strokeOpacity: "stroke-opacity",
      strokeWidth: "stroke-width",
      suffix: "suffix",
      symbols: "symbols",
      syntax: "syntax",
      system: "system",
      tabSize: "tab-size",
      tableLayout: "table-layout",
      textAlign: "text-align",
      textAlignLast: "text-align-last",
      textAnchor: "text-anchor",
      textCombineUpright: "text-combine-upright",
      textDecoration: "text-decoration",
      textDecorationColor: "text-decoration-color",
      textDecorationLine: "text-decoration-line",
      textDecorationSkipInk: "text-decoration-skip-ink",
      textDecorationStyle: "text-decoration-style",
      textDecorationThickness: "text-decoration-thickness",
      textEmphasis: "text-emphasis",
      textEmphasisColor: "text-emphasis-color",
      textEmphasisPosition: "text-emphasis-position",
      textEmphasisStyle: "text-emphasis-style",
      textIndent: "text-indent",
      textOrientation: "text-orientation",
      textOverflow: "text-overflow",
      textRendering: "text-rendering",
      textShadow: "text-shadow",
      textSizeAdjust: "text-size-adjust",
      textTransform: "text-transform",
      textUnderlineOffset: "text-underline-offset",
      textUnderlinePosition: "text-underline-position",
      top: "top",
      touchAction: "touch-action",
      transform: "transform",
      transformBox: "transform-box",
      transformOrigin: "transform-origin",
      transformStyle: "transform-style",
      transition: "transition",
      transitionDelay: "transition-delay",
      transitionDuration: "transition-duration",
      transitionProperty: "transition-property",
      transitionTimingFunction: "transition-timing-function",
      translate: "translate",
      unicodeBidi: "unicode-bidi",
      unicodeRange: "unicode-range",
      userSelect: "user-select",
      vectorEffect: "vector-effect",
      verticalAlign: "vertical-align",
      visibility: "visibility",
      webkitAlignContent: "-webkit-align-content",
      webkitAlignItems: "-webkit-align-items",
      webkitAlignSelf: "-webkit-align-self",
      webkitAnimation: "-webkit-animation",
      webkitAnimationDelay: "-webkit-animation-delay",
      webkitAnimationDirection: "-webkit-animation-direction",
      webkitAnimationDuration: "-webkit-animation-duration",
      webkitAnimationFillMode: "-webkit-animation-fill-mode",
      webkitAnimationIterationCount: "-webkit-animation-iteration-count",
      webkitAnimationName: "-webkit-animation-name",
      webkitAnimationPlayState: "-webkit-animation-play-state",
      webkitAnimationTimingFunction: "-webkit-animation-timing-function",
      webkitAppRegion: "-webkit-app-region",
      webkitAppearance: "-webkit-appearance",
      webkitBackfaceVisibility: "-webkit-backface-visibility",
      webkitBackgroundClip: "-webkit-background-clip",
      webkitBackgroundOrigin: "-webkit-background-origin",
      webkitBackgroundSize: "-webkit-background-size",
      webkitBorderAfter: "-webkit-border-after",
      webkitBorderAfterColor: "-webkit-border-after-color",
      webkitBorderAfterStyle: "-webkit-border-after-style",
      webkitBorderAfterWidth: "-webkit-border-after-width",
      webkitBorderBefore: "-webkit-border-before",
      webkitBorderBeforeColor: "-webkit-border-before-color",
      webkitBorderBeforeStyle: "-webkit-border-before-style",
      webkitBorderBeforeWidth: "-webkit-border-before-width",
      webkitBorderBottomLeftRadius: "-webkit-border-bottom-left-radius",
      webkitBorderBottomRightRadius: "-webkit-border-bottom-right-radius",
      webkitBorderEnd: "-webkit-border-end",
      webkitBorderEndColor: "-webkit-border-end-color",
      webkitBorderEndStyle: "-webkit-border-end-style",
      webkitBorderEndWidth: "-webkit-border-end-width",
      webkitBorderHorizontalSpacing: "-webkit-border-horizontal-spacing",
      webkitBorderImage: "-webkit-border-image",
      webkitBorderRadius: "-webkit-border-radius",
      webkitBorderStart: "-webkit-border-start",
      webkitBorderStartColor: "-webkit-border-start-color",
      webkitBorderStartStyle: "-webkit-border-start-style",
      webkitBorderStartWidth: "-webkit-border-start-width",
      webkitBorderTopLeftRadius: "-webkit-border-top-left-radius",
      webkitBorderTopRightRadius: "-webkit-border-top-right-radius",
      webkitBorderVerticalSpacing: "-webkit-border-vertical-spacing",
      webkitBoxAlign: "-webkit-box-align",
      webkitBoxDecorationBreak: "-webkit-box-decoration-break",
      webkitBoxDirection: "-webkit-box-direction",
      webkitBoxFlex: "-webkit-box-flex",
      webkitBoxOrdinalGroup: "-webkit-box-ordinal-group",
      webkitBoxOrient: "-webkit-box-orient",
      webkitBoxPack: "-webkit-box-pack",
      webkitBoxReflect: "-webkit-box-reflect",
      webkitBoxShadow: "-webkit-box-shadow",
      webkitBoxSizing: "-webkit-box-sizing",
      webkitClipPath: "-webkit-clip-path",
      webkitColumnBreakAfter: "-webkit-column-break-after",
      webkitColumnBreakBefore: "-webkit-column-break-before",
      webkitColumnBreakInside: "-webkit-column-break-inside",
      webkitColumnCount: "-webkit-column-count",
      webkitColumnGap: "-webkit-column-gap",
      webkitColumnRule: "-webkit-column-rule",
      webkitColumnRuleColor: "-webkit-column-rule-color",
      webkitColumnRuleStyle: "-webkit-column-rule-style",
      webkitColumnRuleWidth: "-webkit-column-rule-width",
      webkitColumnSpan: "-webkit-column-span",
      webkitColumnWidth: "-webkit-column-width",
      webkitColumns: "-webkit-columns",
      webkitFilter: "-webkit-filter",
      webkitFlex: "-webkit-flex",
      webkitFlexBasis: "-webkit-flex-basis",
      webkitFlexDirection: "-webkit-flex-direction",
      webkitFlexFlow: "-webkit-flex-flow",
      webkitFlexGrow: "-webkit-flex-grow",
      webkitFlexShrink: "-webkit-flex-shrink",
      webkitFlexWrap: "-webkit-flex-wrap",
      webkitFontFeatureSettings: "-webkit-font-feature-settings",
      webkitFontSmoothing: "-webkit-font-smoothing",
      webkitHighlight: "-webkit-highlight",
      webkitHyphenateCharacter: "-webkit-hyphenate-character",
      webkitJustifyContent: "-webkit-justify-content",
      webkitLineBreak: "-webkit-line-break",
      webkitLineClamp: "-webkit-line-clamp",
      webkitLocale: "-webkit-locale",
      webkitLogicalHeight: "-webkit-logical-height",
      webkitLogicalWidth: "-webkit-logical-width",
      webkitMarginAfter: "-webkit-margin-after",
      webkitMarginBefore: "-webkit-margin-before",
      webkitMarginEnd: "-webkit-margin-end",
      webkitMarginStart: "-webkit-margin-start",
      webkitMask: "-webkit-mask",
      webkitMaskBoxImage: "-webkit-mask-box-image",
      webkitMaskBoxImageOutset: "-webkit-mask-box-image-outset",
      webkitMaskBoxImageRepeat: "-webkit-mask-box-image-repeat",
      webkitMaskBoxImageSlice: "-webkit-mask-box-image-slice",
      webkitMaskBoxImageSource: "-webkit-mask-box-image-source",
      webkitMaskBoxImageWidth: "-webkit-mask-box-image-width",
      webkitMaskClip: "-webkit-mask-clip",
      webkitMaskComposite: "-webkit-mask-composite",
      webkitMaskImage: "-webkit-mask-image",
      webkitMaskOrigin: "-webkit-mask-origin",
      webkitMaskPosition: "-webkit-mask-position",
      webkitMaskPositionX: "-webkit-mask-position-x",
      webkitMaskPositionY: "-webkit-mask-position-y",
      webkitMaskRepeat: "-webkit-mask-repeat",
      webkitMaskRepeatX: "-webkit-mask-repeat-x",
      webkitMaskRepeatY: "-webkit-mask-repeat-y",
      webkitMaskSize: "-webkit-mask-size",
      webkitMaxLogicalHeight: "-webkit-max-logical-height",
      webkitMaxLogicalWidth: "-webkit-max-logical-width",
      webkitMinLogicalHeight: "-webkit-min-logical-height",
      webkitMinLogicalWidth: "-webkit-min-logical-width",
      webkitOpacity: "-webkit-opacity",
      webkitOrder: "-webkit-order",
      webkitPaddingAfter: "-webkit-padding-after",
      webkitPaddingBefore: "-webkit-padding-before",
      webkitPaddingEnd: "-webkit-padding-end",
      webkitPaddingStart: "-webkit-padding-start",
      webkitPerspective: "-webkit-perspective",
      webkitPerspectiveOrigin: "-webkit-perspective-origin",
      webkitPerspectiveOriginX: "-webkit-perspective-origin-x",
      webkitPerspectiveOriginY: "-webkit-perspective-origin-y",
      webkitPrintColorAdjust: "-webkit-print-color-adjust",
      webkitRtlOrdering: "-webkit-rtl-ordering",
      webkitRubyPosition: "-webkit-ruby-position",
      webkitShapeImageThreshold: "-webkit-shape-image-threshold",
      webkitShapeMargin: "-webkit-shape-margin",
      webkitShapeOutside: "-webkit-shape-outside",
      webkitTapHighlightColor: "-webkit-tap-highlight-color",
      webkitTextCombine: "-webkit-text-combine",
      webkitTextDecorationsInEffect: "-webkit-text-decorations-in-effect",
      webkitTextEmphasis: "-webkit-text-emphasis",
      webkitTextEmphasisColor: "-webkit-text-emphasis-color",
      webkitTextEmphasisPosition: "-webkit-text-emphasis-position",
      webkitTextEmphasisStyle: "-webkit-text-emphasis-style",
      webkitTextFillColor: "-webkit-text-fill-color",
      webkitTextOrientation: "-webkit-text-orientation",
      webkitTextSecurity: "-webkit-text-security",
      webkitTextSizeAdjust: "-webkit-text-size-adjust",
      webkitTextStroke: "-webkit-text-stroke",
      webkitTextStrokeColor: "-webkit-text-stroke-color",
      webkitTextStrokeWidth: "-webkit-text-stroke-width",
      webkitTransform: "-webkit-transform",
      webkitTransformOrigin: "-webkit-transform-origin",
      webkitTransformOriginX: "-webkit-transform-origin-x",
      webkitTransformOriginY: "-webkit-transform-origin-y",
      webkitTransformOriginZ: "-webkit-transform-origin-z",
      webkitTransformStyle: "-webkit-transform-style",
      webkitTransition: "-webkit-transition",
      webkitTransitionDelay: "-webkit-transition-delay",
      webkitTransitionDuration: "-webkit-transition-duration",
      webkitTransitionProperty: "-webkit-transition-property",
      webkitTransitionTimingFunction: "-webkit-transition-timing-function",
      webkitUserDrag: "-webkit-user-drag",
      webkitUserModify: "-webkit-user-modify",
      webkitUserSelect: "-webkit-user-select",
      webkitWritingMode: "-webkit-writing-mode",
      whiteSpace: "white-space",
      widows: "widows",
      width: "width",
      willChange: "will-change",
      wordBreak: "word-break",
      wordSpacing: "word-spacing",
      wordWrap: "word-wrap",
      writingMode: "writing-mode",
      x: "x",
      y: "y",
      zIndex: "z-index",
      zoom: "zoom"
    };
    for (prop in cssProperties) defineStyleProperty(prop);
    var prop;
    function defineStyleProperty(jsname) {
      var cssname = cssProperties[jsname];
      Object.defineProperty(CSSStyleDeclaration.prototype, jsname, {
        get: function() {
          return this.getPropertyValue(cssname);
        },
        set: function(value) {
          this.setProperty(cssname, value);
        }
      });
      if (!CSSStyleDeclaration.prototype.hasOwnProperty(cssname)) {
        Object.defineProperty(CSSStyleDeclaration.prototype, cssname, {
          get: function() {
            return this.getPropertyValue(cssname);
          },
          set: function(value) {
            this.setProperty(cssname, value);
          }
        });
      }
    }
  }
});

// packages/qwik-dom/lib/URLUtils.js
var require_URLUtils = __commonJS({
  "packages/qwik-dom/lib/URLUtils.js"(exports2, module2) {
    "use strict";
    var URL2 = require_URL();
    module2.exports = URLUtils;
    function URLUtils() {
    }
    URLUtils.prototype = Object.create(Object.prototype, {
      _url: {
        get: function() {
          return new URL2(this.href);
        }
      },
      protocol: {
        get: function() {
          var url = this._url;
          if (url && url.scheme) return url.scheme + ":";
          else return ":";
        },
        set: function(v) {
          var output = this.href;
          var url = new URL2(output);
          if (url.isAbsolute()) {
            v = v.replace(/:+$/, "");
            v = v.replace(/[^-+\.a-zA-Z0-9]/g, URL2.percentEncode);
            if (v.length > 0) {
              url.scheme = v;
              output = url.toString();
            }
          }
          this.href = output;
        }
      },
      host: {
        get: function() {
          var url = this._url;
          if (url.isAbsolute() && url.isAuthorityBased())
            return url.host + (url.port ? ":" + url.port : "");
          else return "";
        },
        set: function(v) {
          var output = this.href;
          var url = new URL2(output);
          if (url.isAbsolute() && url.isAuthorityBased()) {
            v = v.replace(/[^-+\._~!$&'()*,;:=a-zA-Z0-9]/g, URL2.percentEncode);
            if (v.length > 0) {
              url.host = v;
              delete url.port;
              output = url.toString();
            }
          }
          this.href = output;
        }
      },
      hostname: {
        get: function() {
          var url = this._url;
          if (url.isAbsolute() && url.isAuthorityBased()) return url.host;
          else return "";
        },
        set: function(v) {
          var output = this.href;
          var url = new URL2(output);
          if (url.isAbsolute() && url.isAuthorityBased()) {
            v = v.replace(/^\/+/, "");
            v = v.replace(/[^-+\._~!$&'()*,;:=a-zA-Z0-9]/g, URL2.percentEncode);
            if (v.length > 0) {
              url.host = v;
              output = url.toString();
            }
          }
          this.href = output;
        }
      },
      port: {
        get: function() {
          var url = this._url;
          if (url.isAbsolute() && url.isAuthorityBased() && url.port !== void 0) return url.port;
          else return "";
        },
        set: function(v) {
          var output = this.href;
          var url = new URL2(output);
          if (url.isAbsolute() && url.isAuthorityBased()) {
            v = "" + v;
            v = v.replace(/[^0-9].*$/, "");
            v = v.replace(/^0+/, "");
            if (v.length === 0) v = "0";
            if (parseInt(v, 10) <= 65535) {
              url.port = v;
              output = url.toString();
            }
          }
          this.href = output;
        }
      },
      pathname: {
        get: function() {
          var url = this._url;
          if (url.isAbsolute() && url.isHierarchical()) return url.path;
          else return "";
        },
        set: function(v) {
          var output = this.href;
          var url = new URL2(output);
          if (url.isAbsolute() && url.isHierarchical()) {
            if (v.charAt(0) !== "/") v = "/" + v;
            v = v.replace(/[^-+\._~!$&'()*,;:=@\/a-zA-Z0-9]/g, URL2.percentEncode);
            url.path = v;
            output = url.toString();
          }
          this.href = output;
        }
      },
      search: {
        get: function() {
          var url = this._url;
          if (url.isAbsolute() && url.isHierarchical() && url.query !== void 0)
            return "?" + url.query;
          else return "";
        },
        set: function(v) {
          var output = this.href;
          var url = new URL2(output);
          if (url.isAbsolute() && url.isHierarchical()) {
            if (v.charAt(0) === "?") v = v.substring(1);
            v = v.replace(/[^-+\._~!$&'()*,;:=@\/?a-zA-Z0-9]/g, URL2.percentEncode);
            url.query = v;
            output = url.toString();
          }
          this.href = output;
        }
      },
      hash: {
        get: function() {
          var url = this._url;
          if (url == null || url.fragment == null || url.fragment === "") {
            return "";
          } else {
            return "#" + url.fragment;
          }
        },
        set: function(v) {
          var output = this.href;
          var url = new URL2(output);
          if (v.charAt(0) === "#") v = v.substring(1);
          v = v.replace(/[^-+\._~!$&'()*,;:=@\/?a-zA-Z0-9]/g, URL2.percentEncode);
          url.fragment = v;
          output = url.toString();
          this.href = output;
        }
      },
      username: {
        get: function() {
          var url = this._url;
          return url.username || "";
        },
        set: function(v) {
          var output = this.href;
          var url = new URL2(output);
          if (url.isAbsolute()) {
            v = v.replace(/[\x00-\x1F\x7F-\uFFFF "#<>?`\/@\\:]/g, URL2.percentEncode);
            url.username = v;
            output = url.toString();
          }
          this.href = output;
        }
      },
      password: {
        get: function() {
          var url = this._url;
          return url.password || "";
        },
        set: function(v) {
          var output = this.href;
          var url = new URL2(output);
          if (url.isAbsolute()) {
            if (v === "") {
              url.password = null;
            } else {
              v = v.replace(/[\x00-\x1F\x7F-\uFFFF "#<>?`\/@\\]/g, URL2.percentEncode);
              url.password = v;
            }
            output = url.toString();
          }
          this.href = output;
        }
      },
      origin: {
        get: function() {
          var url = this._url;
          if (url == null) {
            return "";
          }
          var originForPort = function(defaultPort) {
            var origin = [url.scheme, url.host, +url.port || defaultPort];
            return origin[0] + "://" + origin[1] + (origin[2] === defaultPort ? "" : ":" + origin[2]);
          };
          switch (url.scheme) {
            case "ftp":
              return originForPort(21);
            case "gopher":
              return originForPort(70);
            case "http":
            case "ws":
              return originForPort(80);
            case "https":
            case "wss":
              return originForPort(443);
            default:
              return url.scheme + "://";
          }
        }
      }
      /*
      searchParams: {
        get: function() {
          var url = this._url;
          // XXX
        },
        set: function(v) {
          var output = this.href;
          var url = new URL(output);
          // XXX
          this.href = output;
        },
      },
      */
    });
    URLUtils._inherit = function(proto) {
      Object.getOwnPropertyNames(URLUtils.prototype).forEach(function(p) {
        if (p === "constructor" || p === "href") {
          return;
        }
        var desc = Object.getOwnPropertyDescriptor(URLUtils.prototype, p);
        Object.defineProperty(proto, p, desc);
      });
    };
  }
});

// packages/qwik-dom/lib/defineElement.js
var require_defineElement = __commonJS({
  "packages/qwik-dom/lib/defineElement.js"(exports2, module2) {
    "use strict";
    var attributes = require_attributes();
    var isApiWritable = require_config().isApiWritable;
    module2.exports = function(spec, defaultConstructor, tagList, tagNameToImpl) {
      var c = spec.ctor;
      if (c) {
        var props = spec.props || {};
        if (spec.attributes) {
          for (var n in spec.attributes) {
            var attr = spec.attributes[n];
            if (typeof attr !== "object" || Array.isArray(attr)) attr = { type: attr };
            if (!attr.name) attr.name = n.toLowerCase();
            props[n] = attributes.property(attr);
          }
        }
        props.constructor = { value: c, writable: isApiWritable };
        c.prototype = Object.create((spec.superclass || defaultConstructor).prototype, props);
        if (spec.events) {
          addEventHandlers(c, spec.events);
        }
        tagList[spec.name] = c;
      } else {
        c = defaultConstructor;
      }
      (spec.tags || spec.tag && [spec.tag] || []).forEach(function(tag) {
        tagNameToImpl[tag] = c;
      });
      return c;
    };
    function EventHandlerBuilder(body, document2, form, element) {
      this.body = body;
      this.document = document2;
      this.form = form;
      this.element = element;
    }
    EventHandlerBuilder.prototype.build = function() {
      return () => {
      };
    };
    function EventHandlerChangeHandler(elt, name, oldval, newval) {
      var doc2 = elt.ownerDocument || /* @__PURE__ */ Object.create(null);
      var form = elt.form || /* @__PURE__ */ Object.create(null);
      elt[name] = new EventHandlerBuilder(newval, doc2, form, elt).build();
    }
    function addEventHandlers(c, eventHandlerTypes) {
      var p = c.prototype;
      eventHandlerTypes.forEach(function(type) {
        Object.defineProperty(p, "on" + type, {
          get: function() {
            return this._getEventHandler(type);
          },
          set: function(v) {
            this._setEventHandler(type, v);
          }
        });
        attributes.registerChangeHandler(c, "on" + type, EventHandlerChangeHandler);
      });
    }
  }
});

// packages/qwik-dom/lib/htmlelts.js
var require_htmlelts = __commonJS({
  "packages/qwik-dom/lib/htmlelts.js"(exports2) {
    "use strict";
    var Node = require_Node();
    var Element = require_Element();
    var CSSStyleDeclaration = require_CSSStyleDeclaration();
    var utils = require_utils();
    var URLUtils = require_URLUtils();
    var defineElement = require_defineElement();
    var htmlElements = exports2.elements = {};
    var htmlNameToImpl = /* @__PURE__ */ Object.create(null);
    exports2.createElement = function(doc2, localName, prefix) {
      var impl = htmlNameToImpl[localName] || HTMLUnknownElement;
      return new impl(doc2, localName, prefix);
    };
    function define(spec) {
      return defineElement(spec, HTMLElement, htmlElements, htmlNameToImpl);
    }
    function URL2(attr) {
      return {
        get: function() {
          var v = this._getattr(attr);
          if (v === null) {
            return "";
          }
          var url = this.doc._resolve(v);
          return url === null ? v : url;
        },
        set: function(value) {
          this._setattr(attr, value);
        }
      };
    }
    function CORS(attr) {
      return {
        get: function() {
          var v = this._getattr(attr);
          if (v === null) {
            return null;
          }
          if (v.toLowerCase() === "use-credentials") {
            return "use-credentials";
          }
          return "anonymous";
        },
        set: function(value) {
          if (value === null || value === void 0) {
            this.removeAttribute(attr);
          } else {
            this._setattr(attr, value);
          }
        }
      };
    }
    var REFERRER = {
      type: [
        "",
        "no-referrer",
        "no-referrer-when-downgrade",
        "same-origin",
        "origin",
        "strict-origin",
        "origin-when-cross-origin",
        "strict-origin-when-cross-origin",
        "unsafe-url"
      ],
      missing: ""
    };
    var focusableElements = {
      A: true,
      LINK: true,
      BUTTON: true,
      INPUT: true,
      SELECT: true,
      TEXTAREA: true,
      COMMAND: true
    };
    var HTMLFormElement = function(doc2, localName, prefix) {
      HTMLElement.call(this, doc2, localName, prefix);
      this._form = null;
    };
    var HTMLElement = exports2.HTMLElement = define({
      superclass: Element,
      name: "HTMLElement",
      ctor: function HTMLElement2(doc2, localName, prefix) {
        Element.call(this, doc2, localName, utils.NAMESPACE.HTML, prefix);
      },
      props: {
        dangerouslySetInnerHTML: {
          set: function(v) {
            this._innerHTML = v;
          }
        },
        innerHTML: {
          get: function() {
            return this.serialize();
          },
          set: function(v) {
            var parser = this.ownerDocument.implementation.mozHTMLParser(
              this.ownerDocument._address,
              this
            );
            parser.parse(v === null ? "" : String(v), true);
            var target = this instanceof htmlNameToImpl.template ? this.content : this;
            while (target.hasChildNodes()) target.removeChild(target.firstChild);
            target.appendChild(parser._asDocumentFragment());
          }
        },
        style: {
          get: function() {
            if (!this._style) this._style = new CSSStyleDeclaration(this);
            return this._style;
          },
          set: function(v) {
            if (v === null || v === void 0) {
              v = "";
            }
            this._setattr("style", String(v));
          }
        },
        // These can't really be implemented server-side in a reasonable way.
        blur: { value: function() {
        } },
        focus: { value: function() {
        } },
        forceSpellCheck: { value: function() {
        } },
        click: {
          value: function() {
            if (this._click_in_progress) return;
            this._click_in_progress = true;
            try {
              if (this._pre_click_activation_steps) this._pre_click_activation_steps();
              var event = this.ownerDocument.createEvent("MouseEvent");
              event.initMouseEvent(
                "click",
                true,
                true,
                this.ownerDocument.defaultView,
                1,
                0,
                0,
                0,
                0,
                // These 4 should be initialized with
                // the actually current keyboard state
                // somehow...
                false,
                false,
                false,
                false,
                0,
                null
              );
              var success = this.dispatchEvent(event);
              if (success) {
                if (this._post_click_activation_steps) this._post_click_activation_steps(event);
              } else {
                if (this._cancelled_activation_steps) this._cancelled_activation_steps();
              }
            } finally {
              this._click_in_progress = false;
            }
          }
        },
        submit: { value: utils.nyi }
      },
      attributes: {
        title: String,
        lang: String,
        dir: { type: ["ltr", "rtl", "auto"], missing: "" },
        accessKey: String,
        hidden: Boolean,
        tabIndex: {
          type: "long",
          default: function() {
            if (this.tagName in focusableElements || this.contentEditable) return 0;
            else return -1;
          }
        }
      },
      events: [
        "abort",
        "canplay",
        "canplaythrough",
        "change",
        "click",
        "contextmenu",
        "cuechange",
        "dblclick",
        "drag",
        "dragend",
        "dragenter",
        "dragleave",
        "dragover",
        "dragstart",
        "drop",
        "durationchange",
        "emptied",
        "ended",
        "input",
        "invalid",
        "keydown",
        "keypress",
        "keyup",
        "loadeddata",
        "loadedmetadata",
        "loadstart",
        "mousedown",
        "mousemove",
        "mouseout",
        "mouseover",
        "mouseup",
        "mousewheel",
        "pause",
        "play",
        "playing",
        "progress",
        "ratechange",
        "readystatechange",
        "reset",
        "seeked",
        "seeking",
        "select",
        "show",
        "stalled",
        "submit",
        "suspend",
        "timeupdate",
        "volumechange",
        "waiting",
        // These last 5 event types will be overriden by HTMLBodyElement
        "blur",
        "error",
        "focus",
        "load",
        "scroll"
      ]
    });
    var HTMLUnknownElement = define({
      name: "HTMLUnknownElement",
      ctor: function HTMLUnknownElement2(doc2, localName, prefix) {
        HTMLElement.call(this, doc2, localName, prefix);
      }
    });
    var formAssociatedProps = {
      // See http://www.w3.org/TR/html5/association-of-controls-and-forms.html#form-owner
      form: {
        get: function() {
          return this._form;
        }
      }
    };
    define({
      tag: "a",
      name: "HTMLAnchorElement",
      ctor: function HTMLAnchorElement(doc2, localName, prefix) {
        HTMLElement.call(this, doc2, localName, prefix);
      },
      props: {
        _post_click_activation_steps: {
          value: function(e) {
            if (this.href) {
              this.ownerDocument.defaultView.location = this.href;
            }
          }
        }
      },
      attributes: {
        href: URL2,
        ping: String,
        download: String,
        target: String,
        rel: String,
        media: String,
        hreflang: String,
        type: String,
        referrerPolicy: REFERRER,
        // Obsolete
        coords: String,
        charset: String,
        name: String,
        rev: String,
        shape: String
      }
    });
    URLUtils._inherit(htmlNameToImpl.a.prototype);
    define({
      tag: "area",
      name: "HTMLAreaElement",
      ctor: function HTMLAreaElement(doc2, localName, prefix) {
        HTMLElement.call(this, doc2, localName, prefix);
      },
      attributes: {
        alt: String,
        target: String,
        download: String,
        rel: String,
        media: String,
        href: URL2,
        hreflang: String,
        type: String,
        shape: String,
        coords: String,
        ping: String,
        // XXX: also reflect relList
        referrerPolicy: REFERRER,
        // Obsolete
        noHref: Boolean
      }
    });
    URLUtils._inherit(htmlNameToImpl.area.prototype);
    define({
      tag: "br",
      name: "HTMLBRElement",
      ctor: function HTMLBRElement(doc2, localName, prefix) {
        HTMLElement.call(this, doc2, localName, prefix);
      },
      attributes: {
        // Obsolete
        clear: String
      }
    });
    define({
      tag: "base",
      name: "HTMLBaseElement",
      ctor: function HTMLBaseElement(doc2, localName, prefix) {
        HTMLElement.call(this, doc2, localName, prefix);
      },
      attributes: {
        target: String
      }
    });
    define({
      tag: "body",
      name: "HTMLBodyElement",
      ctor: function HTMLBodyElement(doc2, localName, prefix) {
        HTMLElement.call(this, doc2, localName, prefix);
      },
      // Certain event handler attributes on a <body> tag actually set
      // handlers for the window rather than just that element.  Define
      // getters and setters for those here.  Note that some of these override
      // properties on HTMLElement.prototype.
      // XXX: If I add support for <frameset>, these have to go there, too
      // XXX
      // When the Window object is implemented, these attribute will have
      // to work with the same-named attributes on the Window.
      events: [
        "afterprint",
        "beforeprint",
        "beforeunload",
        "blur",
        "error",
        "focus",
        "hashchange",
        "load",
        "message",
        "offline",
        "online",
        "pagehide",
        "pageshow",
        "popstate",
        "resize",
        "scroll",
        "storage",
        "unload"
      ],
      attributes: {
        // Obsolete
        text: { type: String, treatNullAsEmptyString: true },
        link: { type: String, treatNullAsEmptyString: true },
        vLink: { type: String, treatNullAsEmptyString: true },
        aLink: { type: String, treatNullAsEmptyString: true },
        bgColor: { type: String, treatNullAsEmptyString: true },
        background: String
      }
    });
    define({
      tag: "button",
      name: "HTMLButtonElement",
      ctor: function HTMLButtonElement(doc2, localName, prefix) {
        HTMLFormElement.call(this, doc2, localName, prefix);
      },
      props: formAssociatedProps,
      attributes: {
        name: String,
        value: String,
        disabled: Boolean,
        autofocus: Boolean,
        type: { type: ["submit", "reset", "button", "menu"], missing: "submit" },
        formTarget: String,
        formNoValidate: Boolean,
        formMethod: { type: ["get", "post", "dialog"], invalid: "get", missing: "" },
        formEnctype: {
          type: ["application/x-www-form-urlencoded", "multipart/form-data", "text/plain"],
          invalid: "application/x-www-form-urlencoded",
          missing: ""
        }
      }
    });
    define({
      tag: "dl",
      name: "HTMLDListElement",
      ctor: function HTMLDListElement(doc2, localName, prefix) {
        HTMLElement.call(this, doc2, localName, prefix);
      },
      attributes: {
        // Obsolete
        compact: Boolean
      }
    });
    define({
      tag: "data",
      name: "HTMLDataElement",
      ctor: function HTMLDataElement(doc2, localName, prefix) {
        HTMLElement.call(this, doc2, localName, prefix);
      },
      attributes: {
        value: String
      }
    });
    define({
      tag: "datalist",
      name: "HTMLDataListElement",
      ctor: function HTMLDataListElement(doc2, localName, prefix) {
        HTMLElement.call(this, doc2, localName, prefix);
      }
    });
    define({
      tag: "details",
      name: "HTMLDetailsElement",
      ctor: function HTMLDetailsElement(doc2, localName, prefix) {
        HTMLElement.call(this, doc2, localName, prefix);
      },
      attributes: {
        open: Boolean
      }
    });
    define({
      tag: "div",
      name: "HTMLDivElement",
      ctor: function HTMLDivElement(doc2, localName, prefix) {
        HTMLElement.call(this, doc2, localName, prefix);
      },
      attributes: {
        // Obsolete
        align: String
      }
    });
    define({
      tag: "embed",
      name: "HTMLEmbedElement",
      ctor: function HTMLEmbedElement(doc2, localName, prefix) {
        HTMLElement.call(this, doc2, localName, prefix);
      },
      attributes: {
        src: URL2,
        type: String,
        width: String,
        height: String,
        // Obsolete
        align: String,
        name: String
      }
    });
    define({
      tag: "fieldset",
      name: "HTMLFieldSetElement",
      ctor: function HTMLFieldSetElement(doc2, localName, prefix) {
        HTMLFormElement.call(this, doc2, localName, prefix);
      },
      props: formAssociatedProps,
      attributes: {
        disabled: Boolean,
        name: String
      }
    });
    define({
      tag: "form",
      name: "HTMLFormElement",
      ctor: function HTMLFormElement2(doc2, localName, prefix) {
        HTMLElement.call(this, doc2, localName, prefix);
      },
      attributes: {
        action: String,
        autocomplete: { type: ["on", "off"], missing: "on" },
        name: String,
        acceptCharset: { name: "accept-charset" },
        target: String,
        noValidate: Boolean,
        method: { type: ["get", "post", "dialog"], invalid: "get", missing: "get" },
        // Both enctype and encoding reflect the enctype content attribute
        enctype: {
          type: ["application/x-www-form-urlencoded", "multipart/form-data", "text/plain"],
          invalid: "application/x-www-form-urlencoded",
          missing: "application/x-www-form-urlencoded"
        },
        encoding: {
          name: "enctype",
          type: ["application/x-www-form-urlencoded", "multipart/form-data", "text/plain"],
          invalid: "application/x-www-form-urlencoded",
          missing: "application/x-www-form-urlencoded"
        }
      }
    });
    define({
      tag: "hr",
      name: "HTMLHRElement",
      ctor: function HTMLHRElement(doc2, localName, prefix) {
        HTMLElement.call(this, doc2, localName, prefix);
      },
      attributes: {
        // Obsolete
        align: String,
        color: String,
        noShade: Boolean,
        size: String,
        width: String
      }
    });
    define({
      tag: "head",
      name: "HTMLHeadElement",
      ctor: function HTMLHeadElement(doc2, localName, prefix) {
        HTMLElement.call(this, doc2, localName, prefix);
      }
    });
    define({
      tags: ["h1", "h2", "h3", "h4", "h5", "h6"],
      name: "HTMLHeadingElement",
      ctor: function HTMLHeadingElement(doc2, localName, prefix) {
        HTMLElement.call(this, doc2, localName, prefix);
      },
      attributes: {
        // Obsolete
        align: String
      }
    });
    define({
      tag: "html",
      name: "HTMLHtmlElement",
      ctor: function HTMLHtmlElement(doc2, localName, prefix) {
        HTMLElement.call(this, doc2, localName, prefix);
      },
      attributes: {
        // Obsolete
        version: String
      }
    });
    define({
      tag: "iframe",
      name: "HTMLIFrameElement",
      ctor: function HTMLIFrameElement(doc2, localName, prefix) {
        HTMLElement.call(this, doc2, localName, prefix);
      },
      attributes: {
        src: URL2,
        srcdoc: String,
        name: String,
        width: String,
        height: String,
        // XXX: sandbox is a reflected settable token list
        seamless: Boolean,
        allowFullscreen: Boolean,
        allowUserMedia: Boolean,
        allowPaymentRequest: Boolean,
        referrerPolicy: REFERRER,
        // Obsolete
        align: String,
        scrolling: String,
        frameBorder: String,
        longDesc: URL2,
        marginHeight: { type: String, treatNullAsEmptyString: true },
        marginWidth: { type: String, treatNullAsEmptyString: true }
      }
    });
    define({
      tag: "img",
      name: "HTMLImageElement",
      ctor: function HTMLImageElement(doc2, localName, prefix) {
        HTMLElement.call(this, doc2, localName, prefix);
      },
      attributes: {
        alt: String,
        src: URL2,
        srcset: String,
        crossOrigin: CORS,
        useMap: String,
        isMap: Boolean,
        height: { type: "unsigned long", default: 0 },
        width: { type: "unsigned long", default: 0 },
        referrerPolicy: REFERRER,
        // Obsolete:
        name: String,
        lowsrc: URL2,
        align: String,
        hspace: { type: "unsigned long", default: 0 },
        vspace: { type: "unsigned long", default: 0 },
        longDesc: URL2,
        border: { type: String, treatNullAsEmptyString: true }
      }
    });
    define({
      tag: "input",
      name: "HTMLInputElement",
      ctor: function HTMLInputElement(doc2, localName, prefix) {
        HTMLFormElement.call(this, doc2, localName, prefix);
      },
      props: {
        form: formAssociatedProps.form,
        _post_click_activation_steps: {
          value: function(e) {
            if (this.type === "checkbox") {
              this.checked = !this.checked;
            } else if (this.type === "radio") {
              var group = this.form.getElementsByName(this.name);
              for (var i = group.length - 1; i >= 0; i--) {
                var el = group[i];
                el.checked = el === this;
              }
            }
          }
        }
      },
      attributes: {
        name: String,
        disabled: Boolean,
        autofocus: Boolean,
        accept: String,
        alt: String,
        max: String,
        min: String,
        pattern: String,
        placeholder: String,
        step: String,
        dirName: String,
        defaultValue: { name: "value" },
        multiple: Boolean,
        required: Boolean,
        readOnly: Boolean,
        checked: Boolean,
        value: String,
        src: URL2,
        defaultChecked: { name: "checked", type: Boolean },
        size: { type: "unsigned long", default: 20, min: 1, setmin: 1 },
        width: { type: "unsigned long", min: 0, setmin: 0, default: 0 },
        height: { type: "unsigned long", min: 0, setmin: 0, default: 0 },
        minLength: { type: "unsigned long", min: 0, setmin: 0, default: -1 },
        maxLength: { type: "unsigned long", min: 0, setmin: 0, default: -1 },
        autocomplete: String,
        // It's complicated
        type: {
          type: [
            "text",
            "hidden",
            "search",
            "tel",
            "url",
            "email",
            "password",
            "datetime",
            "date",
            "month",
            "week",
            "time",
            "datetime-local",
            "number",
            "range",
            "color",
            "checkbox",
            "radio",
            "file",
            "submit",
            "image",
            "reset",
            "button"
          ],
          missing: "text"
        },
        formTarget: String,
        formNoValidate: Boolean,
        formMethod: { type: ["get", "post"], invalid: "get", missing: "" },
        formEnctype: {
          type: ["application/x-www-form-urlencoded", "multipart/form-data", "text/plain"],
          invalid: "application/x-www-form-urlencoded",
          missing: ""
        },
        inputMode: {
          type: [
            "verbatim",
            "latin",
            "latin-name",
            "latin-prose",
            "full-width-latin",
            "kana",
            "kana-name",
            "katakana",
            "numeric",
            "tel",
            "email",
            "url"
          ],
          missing: ""
        },
        // Obsolete
        align: String,
        useMap: String
      }
    });
    define({
      tag: "keygen",
      name: "HTMLKeygenElement",
      ctor: function HTMLKeygenElement(doc2, localName, prefix) {
        HTMLFormElement.call(this, doc2, localName, prefix);
      },
      props: formAssociatedProps,
      attributes: {
        name: String,
        disabled: Boolean,
        autofocus: Boolean,
        challenge: String,
        keytype: { type: ["rsa"], missing: "" }
      }
    });
    define({
      tag: "li",
      name: "HTMLLIElement",
      ctor: function HTMLLIElement(doc2, localName, prefix) {
        HTMLElement.call(this, doc2, localName, prefix);
      },
      attributes: {
        value: { type: "long", default: 0 },
        // Obsolete
        type: String
      }
    });
    define({
      tag: "label",
      name: "HTMLLabelElement",
      ctor: function HTMLLabelElement(doc2, localName, prefix) {
        HTMLFormElement.call(this, doc2, localName, prefix);
      },
      props: formAssociatedProps,
      attributes: {
        htmlFor: { name: "for", type: String }
      }
    });
    define({
      tag: "legend",
      name: "HTMLLegendElement",
      ctor: function HTMLLegendElement(doc2, localName, prefix) {
        HTMLElement.call(this, doc2, localName, prefix);
      },
      attributes: {
        // Obsolete
        align: String
      }
    });
    define({
      tag: "link",
      name: "HTMLLinkElement",
      ctor: function HTMLLinkElement(doc2, localName, prefix) {
        HTMLElement.call(this, doc2, localName, prefix);
      },
      attributes: {
        // XXX Reflect DOMSettableTokenList sizes also DOMTokenList relList
        href: URL2,
        rel: String,
        media: String,
        hreflang: String,
        type: String,
        crossOrigin: CORS,
        nonce: String,
        integrity: String,
        referrerPolicy: REFERRER,
        // Obsolete
        charset: String,
        rev: String,
        target: String
      }
    });
    define({
      tag: "map",
      name: "HTMLMapElement",
      ctor: function HTMLMapElement(doc2, localName, prefix) {
        HTMLElement.call(this, doc2, localName, prefix);
      },
      attributes: {
        name: String
      }
    });
    define({
      tag: "menu",
      name: "HTMLMenuElement",
      ctor: function HTMLMenuElement(doc2, localName, prefix) {
        HTMLElement.call(this, doc2, localName, prefix);
      },
      attributes: {
        // XXX: not quite right, default should be popup if parent element is
        // popup.
        type: { type: ["context", "popup", "toolbar"], missing: "toolbar" },
        label: String,
        // Obsolete
        compact: Boolean
      }
    });
    define({
      tag: "meta",
      name: "HTMLMetaElement",
      ctor: function HTMLMetaElement(doc2, localName, prefix) {
        HTMLElement.call(this, doc2, localName, prefix);
      },
      attributes: {
        name: String,
        content: String,
        httpEquiv: { name: "http-equiv", type: String },
        // Obsolete
        scheme: String
      }
    });
    define({
      tag: "meter",
      name: "HTMLMeterElement",
      ctor: function HTMLMeterElement(doc2, localName, prefix) {
        HTMLFormElement.call(this, doc2, localName, prefix);
      },
      props: formAssociatedProps
    });
    define({
      tags: ["ins", "del"],
      name: "HTMLModElement",
      ctor: function HTMLModElement(doc2, localName, prefix) {
        HTMLElement.call(this, doc2, localName, prefix);
      },
      attributes: {
        cite: URL2,
        dateTime: String
      }
    });
    define({
      tag: "ol",
      name: "HTMLOListElement",
      ctor: function HTMLOListElement(doc2, localName, prefix) {
        HTMLElement.call(this, doc2, localName, prefix);
      },
      props: {
        // Utility function (see the start attribute default value). Returns
        // the number of <li> children of this element
        _numitems: {
          get: function() {
            var items = 0;
            this.childNodes.forEach(function(n) {
              if (n.nodeType === Node.ELEMENT_NODE && n.tagName === "LI") items++;
            });
            return items;
          }
        }
      },
      attributes: {
        type: String,
        reversed: Boolean,
        start: {
          type: "long",
          default: function() {
            if (this.reversed) return this._numitems;
            else return 1;
          }
        },
        // Obsolete
        compact: Boolean
      }
    });
    define({
      tag: "object",
      name: "HTMLObjectElement",
      ctor: function HTMLObjectElement(doc2, localName, prefix) {
        HTMLFormElement.call(this, doc2, localName, prefix);
      },
      props: formAssociatedProps,
      attributes: {
        data: URL2,
        type: String,
        name: String,
        useMap: String,
        typeMustMatch: Boolean,
        width: String,
        height: String,
        // Obsolete
        align: String,
        archive: String,
        code: String,
        declare: Boolean,
        hspace: { type: "unsigned long", default: 0 },
        standby: String,
        vspace: { type: "unsigned long", default: 0 },
        codeBase: URL2,
        codeType: String,
        border: { type: String, treatNullAsEmptyString: true }
      }
    });
    define({
      tag: "optgroup",
      name: "HTMLOptGroupElement",
      ctor: function HTMLOptGroupElement(doc2, localName, prefix) {
        HTMLElement.call(this, doc2, localName, prefix);
      },
      attributes: {
        disabled: Boolean,
        label: String
      }
    });
    define({
      tag: "option",
      name: "HTMLOptionElement",
      ctor: function HTMLOptionElement(doc2, localName, prefix) {
        HTMLElement.call(this, doc2, localName, prefix);
      },
      props: {
        form: {
          get: function() {
            var p = this.parentNode;
            while (p && p.nodeType === Node.ELEMENT_NODE) {
              if (p.localName === "select") return p.form;
              p = p.parentNode;
            }
          }
        },
        value: {
          get: function() {
            return this._getattr("value") || this.text;
          },
          set: function(v) {
            this._setattr("value", v);
          }
        },
        text: {
          get: function() {
            return this.textContent.replace(/[ \t\n\f\r]+/g, " ").trim();
          },
          set: function(v) {
            this.textContent = v;
          }
        }
        // missing: index
      },
      attributes: {
        disabled: Boolean,
        defaultSelected: { name: "selected", type: Boolean },
        label: String
      }
    });
    define({
      tag: "output",
      name: "HTMLOutputElement",
      ctor: function HTMLOutputElement(doc2, localName, prefix) {
        HTMLFormElement.call(this, doc2, localName, prefix);
      },
      props: formAssociatedProps,
      attributes: {
        // XXX Reflect for/htmlFor as a settable token list
        name: String
      }
    });
    define({
      tag: "p",
      name: "HTMLParagraphElement",
      ctor: function HTMLParagraphElement(doc2, localName, prefix) {
        HTMLElement.call(this, doc2, localName, prefix);
      },
      attributes: {
        // Obsolete
        align: String
      }
    });
    define({
      tag: "param",
      name: "HTMLParamElement",
      ctor: function HTMLParamElement(doc2, localName, prefix) {
        HTMLElement.call(this, doc2, localName, prefix);
      },
      attributes: {
        name: String,
        value: String,
        // Obsolete
        type: String,
        valueType: String
      }
    });
    define({
      tags: [
        "pre",
        /*legacy elements:*/
        "listing",
        "xmp"
      ],
      name: "HTMLPreElement",
      ctor: function HTMLPreElement(doc2, localName, prefix) {
        HTMLElement.call(this, doc2, localName, prefix);
      },
      attributes: {
        // Obsolete
        width: { type: "long", default: 0 }
      }
    });
    define({
      tag: "progress",
      name: "HTMLProgressElement",
      ctor: function HTMLProgressElement(doc2, localName, prefix) {
        HTMLFormElement.call(this, doc2, localName, prefix);
      },
      props: formAssociatedProps,
      attributes: {
        max: { type: Number, float: true, default: 1, min: 0 }
      }
    });
    define({
      tags: ["q", "blockquote"],
      name: "HTMLQuoteElement",
      ctor: function HTMLQuoteElement(doc2, localName, prefix) {
        HTMLElement.call(this, doc2, localName, prefix);
      },
      attributes: {
        cite: URL2
      }
    });
    define({
      tag: "script",
      name: "HTMLScriptElement",
      ctor: function HTMLScriptElement(doc2, localName, prefix) {
        HTMLElement.call(this, doc2, localName, prefix);
      },
      props: {
        text: {
          get: function() {
            var s = "";
            for (var i = 0, n = this.childNodes.length; i < n; i++) {
              var child = this.childNodes[i];
              if (child.nodeType === Node.TEXT_NODE) s += child._data;
            }
            return s;
          },
          set: function(value) {
            this.removeChildren();
            if (value !== null && value !== "") {
              this.appendChild(this.ownerDocument.createTextNode(value));
            }
          }
        }
      },
      attributes: {
        src: URL2,
        type: String,
        charset: String,
        defer: Boolean,
        async: Boolean,
        crossOrigin: CORS,
        nonce: String,
        integrity: String
      }
    });
    define({
      tag: "select",
      name: "HTMLSelectElement",
      ctor: function HTMLSelectElement(doc2, localName, prefix) {
        HTMLFormElement.call(this, doc2, localName, prefix);
      },
      props: {
        form: formAssociatedProps.form,
        options: {
          get: function() {
            return this.getElementsByTagName("option");
          }
        }
      },
      attributes: {
        autocomplete: String,
        // It's complicated
        name: String,
        disabled: Boolean,
        autofocus: Boolean,
        multiple: Boolean,
        required: Boolean,
        size: { type: "unsigned long", default: 0 }
      }
    });
    define({
      tag: "source",
      name: "HTMLSourceElement",
      ctor: function HTMLSourceElement(doc2, localName, prefix) {
        HTMLElement.call(this, doc2, localName, prefix);
      },
      attributes: {
        src: URL2,
        type: String,
        media: String
      }
    });
    define({
      tag: "span",
      name: "HTMLSpanElement",
      ctor: function HTMLSpanElement(doc2, localName, prefix) {
        HTMLElement.call(this, doc2, localName, prefix);
      }
    });
    define({
      tag: "style",
      name: "HTMLStyleElement",
      ctor: function HTMLStyleElement(doc2, localName, prefix) {
        HTMLElement.call(this, doc2, localName, prefix);
      },
      attributes: {
        media: String,
        type: String,
        scoped: Boolean
      }
    });
    define({
      tag: "caption",
      name: "HTMLTableCaptionElement",
      ctor: function HTMLTableCaptionElement(doc2, localName, prefix) {
        HTMLElement.call(this, doc2, localName, prefix);
      },
      attributes: {
        // Obsolete
        align: String
      }
    });
    define({
      name: "HTMLTableCellElement",
      ctor: function HTMLTableCellElement(doc2, localName, prefix) {
        HTMLElement.call(this, doc2, localName, prefix);
      },
      attributes: {
        colSpan: { type: "unsigned long", default: 1 },
        rowSpan: { type: "unsigned long", default: 1 },
        //XXX Also reflect settable token list headers
        scope: { type: ["row", "col", "rowgroup", "colgroup"], missing: "" },
        abbr: String,
        // Obsolete
        align: String,
        axis: String,
        height: String,
        width: String,
        ch: { name: "char", type: String },
        chOff: { name: "charoff", type: String },
        noWrap: Boolean,
        vAlign: String,
        bgColor: { type: String, treatNullAsEmptyString: true }
      }
    });
    define({
      tags: ["col", "colgroup"],
      name: "HTMLTableColElement",
      ctor: function HTMLTableColElement(doc2, localName, prefix) {
        HTMLElement.call(this, doc2, localName, prefix);
      },
      attributes: {
        span: { type: "limited unsigned long with fallback", default: 1, min: 1 },
        // Obsolete
        align: String,
        ch: { name: "char", type: String },
        chOff: { name: "charoff", type: String },
        vAlign: String,
        width: String
      }
    });
    define({
      tag: "table",
      name: "HTMLTableElement",
      ctor: function HTMLTableElement(doc2, localName, prefix) {
        HTMLElement.call(this, doc2, localName, prefix);
      },
      props: {
        rows: {
          get: function() {
            return this.getElementsByTagName("tr");
          }
        }
      },
      attributes: {
        // Obsolete
        align: String,
        border: String,
        frame: String,
        rules: String,
        summary: String,
        width: String,
        bgColor: { type: String, treatNullAsEmptyString: true },
        cellPadding: { type: String, treatNullAsEmptyString: true },
        cellSpacing: { type: String, treatNullAsEmptyString: true }
      }
    });
    define({
      tag: "template",
      name: "HTMLTemplateElement",
      ctor: function HTMLTemplateElement(doc2, localName, prefix) {
        HTMLElement.call(this, doc2, localName, prefix);
        this._contentFragment = doc2._templateDoc.createDocumentFragment();
      },
      props: {
        content: {
          get: function() {
            return this._contentFragment;
          }
        },
        serialize: {
          value: function() {
            return this.content.serialize();
          }
        }
      }
    });
    define({
      tag: "tr",
      name: "HTMLTableRowElement",
      ctor: function HTMLTableRowElement(doc2, localName, prefix) {
        HTMLElement.call(this, doc2, localName, prefix);
      },
      props: {
        cells: {
          get: function() {
            return this.querySelectorAll("td,th");
          }
        }
      },
      attributes: {
        // Obsolete
        align: String,
        ch: { name: "char", type: String },
        chOff: { name: "charoff", type: String },
        vAlign: String,
        bgColor: { type: String, treatNullAsEmptyString: true }
      }
    });
    define({
      tags: ["thead", "tfoot", "tbody"],
      name: "HTMLTableSectionElement",
      ctor: function HTMLTableSectionElement(doc2, localName, prefix) {
        HTMLElement.call(this, doc2, localName, prefix);
      },
      props: {
        rows: {
          get: function() {
            return this.getElementsByTagName("tr");
          }
        }
      },
      attributes: {
        // Obsolete
        align: String,
        ch: { name: "char", type: String },
        chOff: { name: "charoff", type: String },
        vAlign: String
      }
    });
    define({
      tag: "textarea",
      name: "HTMLTextAreaElement",
      ctor: function HTMLTextAreaElement(doc2, localName, prefix) {
        HTMLFormElement.call(this, doc2, localName, prefix);
      },
      props: {
        form: formAssociatedProps.form,
        type: {
          get: function() {
            return "textarea";
          }
        },
        defaultValue: {
          get: function() {
            return this.textContent;
          },
          set: function(v) {
            this.textContent = v;
          }
        },
        value: {
          get: function() {
            return this.defaultValue;
          },
          set: function(v) {
            this.defaultValue = v;
          }
        },
        textLength: {
          get: function() {
            return this.value.length;
          }
        }
      },
      attributes: {
        autocomplete: String,
        // It's complicated
        name: String,
        disabled: Boolean,
        autofocus: Boolean,
        placeholder: String,
        wrap: String,
        dirName: String,
        required: Boolean,
        readOnly: Boolean,
        rows: { type: "limited unsigned long with fallback", default: 2 },
        cols: { type: "limited unsigned long with fallback", default: 20 },
        maxLength: { type: "unsigned long", min: 0, setmin: 0, default: -1 },
        minLength: { type: "unsigned long", min: 0, setmin: 0, default: -1 },
        inputMode: {
          type: [
            "verbatim",
            "latin",
            "latin-name",
            "latin-prose",
            "full-width-latin",
            "kana",
            "kana-name",
            "katakana",
            "numeric",
            "tel",
            "email",
            "url"
          ],
          missing: ""
        }
      }
    });
    define({
      tag: "time",
      name: "HTMLTimeElement",
      ctor: function HTMLTimeElement(doc2, localName, prefix) {
        HTMLElement.call(this, doc2, localName, prefix);
      },
      attributes: {
        dateTime: String,
        pubDate: Boolean
      }
    });
    define({
      tag: "title",
      name: "HTMLTitleElement",
      ctor: function HTMLTitleElement(doc2, localName, prefix) {
        HTMLElement.call(this, doc2, localName, prefix);
      },
      props: {
        text: {
          get: function() {
            return this.textContent;
          }
        }
      }
    });
    define({
      tag: "ul",
      name: "HTMLUListElement",
      ctor: function HTMLUListElement(doc2, localName, prefix) {
        HTMLElement.call(this, doc2, localName, prefix);
      },
      attributes: {
        type: String,
        // Obsolete
        compact: Boolean
      }
    });
    define({
      name: "HTMLMediaElement",
      ctor: function HTMLMediaElement(doc2, localName, prefix) {
        HTMLElement.call(this, doc2, localName, prefix);
      },
      attributes: {
        src: URL2,
        crossOrigin: CORS,
        preload: { type: ["metadata", "none", "auto", { value: "", alias: "auto" }], missing: "auto" },
        loop: Boolean,
        autoplay: Boolean,
        mediaGroup: String,
        controls: Boolean,
        defaultMuted: { name: "muted", type: Boolean }
      }
    });
    define({
      tag: "audio",
      superclass: htmlElements.HTMLMediaElement,
      name: "HTMLAudioElement",
      ctor: function HTMLAudioElement(doc2, localName, prefix) {
        htmlElements.HTMLMediaElement.call(this, doc2, localName, prefix);
      }
    });
    define({
      tag: "video",
      superclass: htmlElements.HTMLMediaElement,
      name: "HTMLVideoElement",
      ctor: function HTMLVideoElement(doc2, localName, prefix) {
        htmlElements.HTMLMediaElement.call(this, doc2, localName, prefix);
      },
      attributes: {
        poster: URL2,
        width: { type: "unsigned long", min: 0, default: 0 },
        height: { type: "unsigned long", min: 0, default: 0 }
      }
    });
    define({
      tag: "td",
      superclass: htmlElements.HTMLTableCellElement,
      name: "HTMLTableDataCellElement",
      ctor: function HTMLTableDataCellElement(doc2, localName, prefix) {
        htmlElements.HTMLTableCellElement.call(this, doc2, localName, prefix);
      }
    });
    define({
      tag: "th",
      superclass: htmlElements.HTMLTableCellElement,
      name: "HTMLTableHeaderCellElement",
      ctor: function HTMLTableHeaderCellElement(doc2, localName, prefix) {
        htmlElements.HTMLTableCellElement.call(this, doc2, localName, prefix);
      }
    });
    define({
      tag: "frameset",
      name: "HTMLFrameSetElement",
      ctor: function HTMLFrameSetElement(doc2, localName, prefix) {
        HTMLElement.call(this, doc2, localName, prefix);
      }
    });
    define({
      tag: "frame",
      name: "HTMLFrameElement",
      ctor: function HTMLFrameElement(doc2, localName, prefix) {
        HTMLElement.call(this, doc2, localName, prefix);
      }
    });
    define({
      tag: "canvas",
      name: "HTMLCanvasElement",
      ctor: function HTMLCanvasElement(doc2, localName, prefix) {
        HTMLElement.call(this, doc2, localName, prefix);
      },
      props: {
        getContext: { value: utils.nyi },
        probablySupportsContext: { value: utils.nyi },
        setContext: { value: utils.nyi },
        transferControlToProxy: { value: utils.nyi },
        toDataURL: { value: utils.nyi },
        toBlob: { value: utils.nyi }
      },
      attributes: {
        width: { type: "unsigned long", default: 300 },
        height: { type: "unsigned long", default: 150 }
      }
    });
    define({
      tag: "dialog",
      name: "HTMLDialogElement",
      ctor: function HTMLDialogElement(doc2, localName, prefix) {
        HTMLElement.call(this, doc2, localName, prefix);
      },
      props: {
        show: { value: utils.nyi },
        showModal: { value: utils.nyi },
        close: { value: utils.nyi }
      },
      attributes: {
        open: Boolean,
        returnValue: String
      }
    });
    define({
      tag: "menuitem",
      name: "HTMLMenuItemElement",
      ctor: function HTMLMenuItemElement(doc2, localName, prefix) {
        HTMLElement.call(this, doc2, localName, prefix);
      },
      props: {
        // The menuitem's label
        _label: {
          get: function() {
            var val = this._getattr("label");
            if (val !== null && val !== "") {
              return val;
            }
            val = this.textContent;
            return val.replace(/[ \t\n\f\r]+/g, " ").trim();
          }
        },
        // The menuitem label IDL attribute
        label: {
          get: function() {
            var val = this._getattr("label");
            if (val !== null) {
              return val;
            }
            return this._label;
          },
          set: function(v) {
            this._setattr("label", v);
          }
        }
      },
      attributes: {
        type: { type: ["command", "checkbox", "radio"], missing: "command" },
        icon: URL2,
        disabled: Boolean,
        checked: Boolean,
        radiogroup: String,
        default: Boolean
      }
    });
    define({
      tag: "source",
      name: "HTMLSourceElement",
      ctor: function HTMLSourceElement(doc2, localName, prefix) {
        HTMLElement.call(this, doc2, localName, prefix);
      },
      attributes: {
        srcset: String,
        sizes: String,
        media: String,
        src: URL2,
        type: String
      }
    });
    define({
      tag: "track",
      name: "HTMLTrackElement",
      ctor: function HTMLTrackElement(doc2, localName, prefix) {
        HTMLElement.call(this, doc2, localName, prefix);
      },
      attributes: {
        src: URL2,
        srclang: String,
        label: String,
        default: Boolean,
        kind: {
          type: ["subtitles", "captions", "descriptions", "chapters", "metadata"],
          missing: "subtitles",
          invalid: "metadata"
        }
      },
      props: {
        NONE: {
          get: function() {
            return 0;
          }
        },
        LOADING: {
          get: function() {
            return 1;
          }
        },
        LOADED: {
          get: function() {
            return 2;
          }
        },
        ERROR: {
          get: function() {
            return 3;
          }
        },
        readyState: { get: utils.nyi },
        track: { get: utils.nyi }
      }
    });
    define({
      // obsolete
      tag: "font",
      name: "HTMLFontElement",
      ctor: function HTMLFontElement(doc2, localName, prefix) {
        HTMLElement.call(this, doc2, localName, prefix);
      },
      attributes: {
        color: { type: String, treatNullAsEmptyString: true },
        face: { type: String },
        size: { type: String }
      }
    });
    define({
      // obsolete
      tag: "dir",
      name: "HTMLDirectoryElement",
      ctor: function HTMLDirectoryElement(doc2, localName, prefix) {
        HTMLElement.call(this, doc2, localName, prefix);
      },
      attributes: {
        compact: Boolean
      }
    });
    define({
      tags: [
        "abbr",
        "address",
        "article",
        "aside",
        "b",
        "bdi",
        "bdo",
        "cite",
        "code",
        "dd",
        "dfn",
        "dt",
        "em",
        "figcaption",
        "figure",
        "footer",
        "header",
        "hgroup",
        "i",
        "kbd",
        "main",
        "mark",
        "nav",
        "noscript",
        "rb",
        "rp",
        "rt",
        "rtc",
        "ruby",
        "s",
        "samp",
        "section",
        "small",
        "strong",
        "sub",
        "summary",
        "sup",
        "u",
        "var",
        "wbr",
        // Legacy elements
        "acronym",
        "basefont",
        "big",
        "center",
        "nobr",
        "noembed",
        "noframes",
        "plaintext",
        "strike",
        "tt"
      ]
    });
  }
});

// packages/qwik-dom/lib/svg.js
var require_svg = __commonJS({
  "packages/qwik-dom/lib/svg.js"(exports2) {
    "use strict";
    var Element = require_Element();
    var defineElement = require_defineElement();
    var utils = require_utils();
    var CSSStyleDeclaration = require_CSSStyleDeclaration();
    var svgElements = exports2.elements = {};
    var svgNameToImpl = /* @__PURE__ */ Object.create(null);
    exports2.createElement = function(doc2, localName, prefix) {
      var impl = svgNameToImpl[localName] || SVGElement;
      return new impl(doc2, localName, prefix);
    };
    function define(spec) {
      return defineElement(spec, SVGElement, svgElements, svgNameToImpl);
    }
    var SVGElement = define({
      superclass: Element,
      name: "SVGElement",
      ctor: function SVGElement2(doc2, localName, prefix) {
        Element.call(this, doc2, localName, utils.NAMESPACE.SVG, prefix);
      },
      props: {
        style: {
          get: function() {
            if (!this._style) this._style = new CSSStyleDeclaration(this);
            return this._style;
          }
        }
      }
    });
    define({
      name: "SVGSVGElement",
      ctor: function SVGSVGElement(doc2, localName, prefix) {
        SVGElement.call(this, doc2, localName, prefix);
      },
      tag: "svg",
      props: {
        createSVGRect: {
          value: function() {
            return exports2.createElement(this.ownerDocument, "rect", null);
          }
        }
      }
    });
    define({
      tags: [
        "a",
        "altGlyph",
        "altGlyphDef",
        "altGlyphItem",
        "animate",
        "animateColor",
        "animateMotion",
        "animateTransform",
        "circle",
        "clipPath",
        "color-profile",
        "cursor",
        "defs",
        "desc",
        "ellipse",
        "feBlend",
        "feColorMatrix",
        "feComponentTransfer",
        "feComposite",
        "feConvolveMatrix",
        "feDiffuseLighting",
        "feDisplacementMap",
        "feDistantLight",
        "feFlood",
        "feFuncA",
        "feFuncB",
        "feFuncG",
        "feFuncR",
        "feGaussianBlur",
        "feImage",
        "feMerge",
        "feMergeNode",
        "feMorphology",
        "feOffset",
        "fePointLight",
        "feSpecularLighting",
        "feSpotLight",
        "feTile",
        "feTurbulence",
        "filter",
        "font",
        "font-face",
        "font-face-format",
        "font-face-name",
        "font-face-src",
        "font-face-uri",
        "foreignObject",
        "g",
        "glyph",
        "glyphRef",
        "hkern",
        "image",
        "line",
        "linearGradient",
        "marker",
        "mask",
        "metadata",
        "missing-glyph",
        "mpath",
        "path",
        "pattern",
        "polygon",
        "polyline",
        "radialGradient",
        "rect",
        "script",
        "set",
        "stop",
        "style",
        "switch",
        "symbol",
        "text",
        "textPath",
        "title",
        "tref",
        "tspan",
        "use",
        "view",
        "vkern"
      ]
    });
  }
});

// packages/qwik-dom/lib/MutationConstants.js
var require_MutationConstants = __commonJS({
  "packages/qwik-dom/lib/MutationConstants.js"(exports2, module2) {
    "use strict";
    module2.exports = {
      VALUE: 1,
      // The value of a Text, Comment or PI node changed
      ATTR: 2,
      // A new attribute was added or an attribute value and/or prefix changed
      REMOVE_ATTR: 3,
      // An attribute was removed
      REMOVE: 4,
      // A node was removed
      MOVE: 5,
      // A node was moved
      INSERT: 6
      // A node (or a subtree of nodes) was inserted
    };
  }
});

// packages/qwik-dom/lib/Document.js
var require_Document = __commonJS({
  "packages/qwik-dom/lib/Document.js"(exports2, module2) {
    "use strict";
    module2.exports = Document;
    var Node = require_Node();
    var NodeList = require_NodeList();
    var ContainerNode = require_ContainerNode();
    var Element = require_Element();
    var Text = require_Text();
    var Comment = require_Comment();
    var Event = require_Event();
    var DocumentFragment = require_DocumentFragment();
    var ProcessingInstruction = require_ProcessingInstruction();
    var DOMImplementation = require_DOMImplementation();
    var TreeWalker = require_TreeWalker();
    var NodeIterator = require_NodeIterator();
    var NodeFilter = require_NodeFilter();
    var URL2 = require_URL();
    var select = require_select();
    var events = require_events();
    var xml = require_xmlnames();
    var html = require_htmlelts();
    var svg = require_svg();
    var utils = require_utils();
    var MUTATE = require_MutationConstants();
    var NAMESPACE = utils.NAMESPACE;
    var isApiWritable = require_config().isApiWritable;
    function Document(isHTML, address) {
      ContainerNode.call(this);
      this.nodeType = Node.DOCUMENT_NODE;
      this.isHTML = isHTML;
      this._address = address || "about:blank";
      this.readyState = "loading";
      this.implementation = new DOMImplementation(this);
      this.ownerDocument = null;
      this._contentType = isHTML ? "text/html" : "application/xml";
      this.doctype = null;
      this.documentElement = null;
      this._templateDocCache = null;
      this._nodeIterators = null;
      this._nid = 1;
      this._nextnid = 2;
      this._nodes = [null, this];
      this.byId = /* @__PURE__ */ Object.create(null);
      this.modclock = 0;
    }
    var supportedEvents = {
      event: "Event",
      customevent: "CustomEvent",
      uievent: "UIEvent",
      mouseevent: "MouseEvent"
    };
    var replacementEvent = {
      events: "event",
      htmlevents: "event",
      mouseevents: "mouseevent",
      mutationevents: "mutationevent",
      uievents: "uievent"
    };
    var mirrorAttr = function(f, name, defaultValue) {
      return {
        get: function() {
          var o = f.call(this);
          if (o) {
            return o[name];
          }
          return defaultValue;
        },
        set: function(value) {
          var o = f.call(this);
          if (o) {
            o[name] = value;
          }
        }
      };
    };
    function validateAndExtract(namespace, qualifiedName) {
      var prefix, localName, pos;
      if (namespace === "") {
        namespace = null;
      }
      if (!xml.isValidQName(qualifiedName)) {
        utils.InvalidCharacterError();
      }
      prefix = null;
      localName = qualifiedName;
      pos = qualifiedName.indexOf(":");
      if (pos >= 0) {
        prefix = qualifiedName.substring(0, pos);
        localName = qualifiedName.substring(pos + 1);
      }
      if (prefix !== null && namespace === null) {
        utils.NamespaceError();
      }
      if (prefix === "xml" && namespace !== NAMESPACE.XML) {
        utils.NamespaceError();
      }
      if ((prefix === "xmlns" || qualifiedName === "xmlns") && namespace !== NAMESPACE.XMLNS) {
        utils.NamespaceError();
      }
      if (namespace === NAMESPACE.XMLNS && !(prefix === "xmlns" || qualifiedName === "xmlns")) {
        utils.NamespaceError();
      }
      return { namespace, prefix, localName };
    }
    Document.prototype = Object.create(ContainerNode.prototype, {
      // This method allows dom.js to communicate with a renderer
      // that displays the document in some way
      // XXX: I should probably move this to the window object
      _setMutationHandler: {
        value: function(handler) {
          this.mutationHandler = handler;
        }
      },
      // This method allows dom.js to receive event notifications
      // from the renderer.
      // XXX: I should probably move this to the window object
      _dispatchRendererEvent: {
        value: function(targetNid, type, details) {
          var target = this._nodes[targetNid];
          if (!target) return;
          target._dispatchEvent(new Event(type, details), true);
        }
      },
      nodeName: { value: "#document" },
      nodeValue: {
        get: function() {
          return null;
        },
        set: function() {
        }
      },
      // XXX: DOMCore may remove documentURI, so it is NYI for now
      documentURI: {
        get: function() {
          return this._address;
        },
        set: utils.nyi
      },
      compatMode: {
        get: function() {
          return this._quirks ? "BackCompat" : "CSS1Compat";
        }
      },
      createTextNode: {
        value: function(data) {
          return new Text(this, String(data));
        }
      },
      createComment: {
        value: function(data) {
          return new Comment(this, data);
        }
      },
      createDocumentFragment: {
        value: function() {
          return new DocumentFragment(this);
        }
      },
      createProcessingInstruction: {
        value: function(target, data) {
          if (!xml.isValidName(target) || data.indexOf("?>") !== -1) utils.InvalidCharacterError();
          return new ProcessingInstruction(this, target, data);
        }
      },
      createAttribute: {
        value: function(localName) {
          localName = String(localName);
          if (!xml.isValidName(localName)) utils.InvalidCharacterError();
          if (this.isHTML) {
            localName = utils.toASCIILowerCase(localName);
          }
          return new Element._Attr(null, localName, null, null, "");
        }
      },
      createAttributeNS: {
        value: function(namespace, qualifiedName) {
          namespace = namespace === null || namespace === void 0 || namespace === "" ? null : String(namespace);
          qualifiedName = String(qualifiedName);
          var ve = validateAndExtract(namespace, qualifiedName);
          return new Element._Attr(null, ve.localName, ve.prefix, ve.namespace, "");
        }
      },
      createElement: {
        value: function(localName) {
          localName = String(localName);
          if (!xml.isValidName(localName)) utils.InvalidCharacterError();
          if (this.isHTML) {
            if (/[A-Z]/.test(localName)) localName = utils.toASCIILowerCase(localName);
            return html.createElement(this, localName, null);
          } else if (this.contentType === "application/xhtml+xml") {
            return html.createElement(this, localName, null);
          } else {
            return new Element(this, localName, null, null);
          }
        },
        writable: isApiWritable
      },
      createElementNS: {
        value: function(namespace, qualifiedName) {
          namespace = namespace === null || namespace === void 0 || namespace === "" ? null : String(namespace);
          qualifiedName = String(qualifiedName);
          var ve = validateAndExtract(namespace, qualifiedName);
          return this._createElementNS(ve.localName, ve.namespace, ve.prefix);
        },
        writable: isApiWritable
      },
      // This is used directly by HTML parser, which allows it to create
      // elements with localNames containing ':' and non-default namespaces
      _createElementNS: {
        value: function(localName, namespace, prefix) {
          if (namespace === NAMESPACE.HTML) {
            return html.createElement(this, localName, prefix);
          } else if (namespace === NAMESPACE.SVG) {
            return svg.createElement(this, localName, prefix);
          }
          return new Element(this, localName, namespace, prefix);
        }
      },
      createEvent: {
        value: function createEvent(interfaceName) {
          interfaceName = interfaceName.toLowerCase();
          var name = replacementEvent[interfaceName] || interfaceName;
          var constructor = events[supportedEvents[name]];
          if (constructor) {
            var e = new constructor();
            e._initialized = false;
            return e;
          } else {
            utils.NotSupportedError();
          }
        }
      },
      // See: http://www.w3.org/TR/dom/#dom-document-createtreewalker
      createTreeWalker: {
        value: function(root2, whatToShow, filter) {
          if (!root2) {
            throw new TypeError("root argument is required");
          }
          if (!(root2 instanceof Node)) {
            throw new TypeError("root not a node");
          }
          whatToShow = whatToShow === void 0 ? NodeFilter.SHOW_ALL : +whatToShow;
          filter = filter === void 0 ? null : filter;
          return new TreeWalker(root2, whatToShow, filter);
        }
      },
      // See: http://www.w3.org/TR/dom/#dom-document-createnodeiterator
      createNodeIterator: {
        value: function(root2, whatToShow, filter) {
          if (!root2) {
            throw new TypeError("root argument is required");
          }
          if (!(root2 instanceof Node)) {
            throw new TypeError("root not a node");
          }
          whatToShow = whatToShow === void 0 ? NodeFilter.SHOW_ALL : +whatToShow;
          filter = filter === void 0 ? null : filter;
          return new NodeIterator(root2, whatToShow, filter);
        }
      },
      _attachNodeIterator: {
        value: function(ni) {
          if (!this._nodeIterators) {
            this._nodeIterators = [];
          }
          this._nodeIterators.push(ni);
        }
      },
      _detachNodeIterator: {
        value: function(ni) {
          var idx = this._nodeIterators.indexOf(ni);
          this._nodeIterators.splice(idx, 1);
        }
      },
      _preremoveNodeIterators: {
        value: function(toBeRemoved) {
          if (this._nodeIterators) {
            this._nodeIterators.forEach(function(ni) {
              ni._preremove(toBeRemoved);
            });
          }
        }
      },
      // Maintain the documentElement and
      // doctype properties of the document.  Each of the following
      // methods chains to the Node implementation of the method
      // to do the actual inserting, removal or replacement.
      _updateDocTypeElement: {
        value: function _updateDocTypeElement() {
          this.doctype = this.documentElement = null;
          for (var kid = this.firstChild; kid !== null; kid = kid.nextSibling) {
            if (kid.nodeType === Node.DOCUMENT_TYPE_NODE) this.doctype = kid;
            else if (kid.nodeType === Node.ELEMENT_NODE) this.documentElement = kid;
          }
        }
      },
      insertBefore: {
        value: function insertBefore2(child, refChild) {
          Node.prototype.insertBefore.call(this, child, refChild);
          this._updateDocTypeElement();
          return child;
        }
      },
      replaceChild: {
        value: function replaceChild(node, child) {
          Node.prototype.replaceChild.call(this, node, child);
          this._updateDocTypeElement();
          return child;
        }
      },
      removeChild: {
        value: function removeChild(child) {
          Node.prototype.removeChild.call(this, child);
          this._updateDocTypeElement();
          return child;
        }
      },
      getElementById: {
        value: function(id) {
          var n = this.byId[id];
          if (!n) return null;
          if (n instanceof MultiId) {
            return n.getFirst();
          }
          return n;
        }
      },
      _hasMultipleElementsWithId: {
        value: function(id) {
          return this.byId[id] instanceof MultiId;
        }
      },
      // Just copy this method from the Element prototype
      getElementsByName: { value: Element.prototype.getElementsByName },
      getElementsByTagName: { value: Element.prototype.getElementsByTagName },
      getElementsByTagNameNS: { value: Element.prototype.getElementsByTagNameNS },
      getElementsByClassName: { value: Element.prototype.getElementsByClassName },
      adoptNode: {
        value: function adoptNode(node) {
          if (node.nodeType === Node.DOCUMENT_NODE) utils.NotSupportedError();
          if (node.nodeType === Node.ATTRIBUTE_NODE) {
            return node;
          }
          if (node.parentNode) node.parentNode.removeChild(node);
          if (node.ownerDocument !== this) recursivelySetOwner(node, this);
          return node;
        }
      },
      importNode: {
        value: function importNode(node, deep) {
          return this.adoptNode(node.cloneNode(deep));
        },
        writable: isApiWritable
      },
      // The following attributes and methods are from the HTML spec
      origin: {
        get: function origin() {
          return null;
        }
      },
      characterSet: {
        get: function characterSet() {
          return "UTF-8";
        }
      },
      contentType: {
        get: function contentType() {
          return this._contentType;
        }
      },
      URL: {
        get: function URL3() {
          return this._address;
        }
      },
      domain: { get: utils.nyi, set: utils.nyi },
      referrer: { get: utils.nyi },
      cookie: { get: utils.nyi, set: utils.nyi },
      lastModified: { get: utils.nyi },
      location: {
        get: function() {
          return this.defaultView ? this.defaultView.location : null;
        },
        set: utils.nyi
      },
      _titleElement: {
        get: function() {
          return this.getElementsByTagName("title").item(0) || null;
        }
      },
      title: {
        get: function() {
          var elt = this._titleElement;
          var value = elt ? elt.textContent : "";
          return value.replace(/[ \t\n\r\f]+/g, " ").replace(/(^ )|( $)/g, "");
        },
        set: function(value) {
          var elt = this._titleElement;
          var head = this.head;
          if (!elt && !head) {
            return;
          }
          if (!elt) {
            elt = this.createElement("title");
            head.appendChild(elt);
          }
          elt.textContent = value;
        }
      },
      dir: mirrorAttr(
        function() {
          var htmlElement = this.documentElement;
          if (htmlElement && htmlElement.tagName === "HTML") {
            return htmlElement;
          }
        },
        "dir",
        ""
      ),
      fgColor: mirrorAttr(
        function() {
          return this.body;
        },
        "text",
        ""
      ),
      linkColor: mirrorAttr(
        function() {
          return this.body;
        },
        "link",
        ""
      ),
      vlinkColor: mirrorAttr(
        function() {
          return this.body;
        },
        "vLink",
        ""
      ),
      alinkColor: mirrorAttr(
        function() {
          return this.body;
        },
        "aLink",
        ""
      ),
      bgColor: mirrorAttr(
        function() {
          return this.body;
        },
        "bgColor",
        ""
      ),
      // Historical aliases of Document#characterSet
      charset: {
        get: function() {
          return this.characterSet;
        }
      },
      inputEncoding: {
        get: function() {
          return this.characterSet;
        }
      },
      scrollingElement: {
        get: function() {
          return this._quirks ? this.body : this.documentElement;
        }
      },
      // Return the first <body> child of the document element.
      // XXX For now, setting this attribute is not implemented.
      body: {
        get: function() {
          return namedHTMLChild(this.documentElement, "body");
        },
        set: utils.nyi
      },
      // Return the first <head> child of the document element.
      head: {
        get: function() {
          return namedHTMLChild(this.documentElement, "head");
        }
      },
      images: { get: utils.nyi },
      embeds: { get: utils.nyi },
      plugins: { get: utils.nyi },
      links: { get: utils.nyi },
      forms: { get: utils.nyi },
      scripts: { get: utils.nyi },
      applets: {
        get: function() {
          return [];
        }
      },
      activeElement: {
        get: function() {
          return null;
        }
      },
      innerHTML: {
        get: function() {
          return this.serialize();
        },
        set: utils.nyi
      },
      outerHTML: {
        get: function() {
          return this.serialize();
        },
        set: utils.nyi
      },
      write: {
        value: function(args) {
          if (!this.isHTML) utils.InvalidStateError();
          if (!this._parser) return;
          if (!this._parser) {
          }
          var s = arguments.join("");
          this._parser.parse(s);
        }
      },
      writeln: {
        value: function writeln(args) {
          this.write(Array.prototype.join.call(arguments, "") + "\n");
        }
      },
      open: {
        value: function() {
          this.documentElement = null;
        }
      },
      close: {
        value: function() {
          this.readyState = "interactive";
          this._dispatchEvent(new Event("readystatechange"), true);
          this._dispatchEvent(new Event("DOMContentLoaded"), true);
          this.readyState = "complete";
          this._dispatchEvent(new Event("readystatechange"), true);
          if (this.defaultView) {
            this.defaultView._dispatchEvent(new Event("load"), true);
          }
        }
      },
      // Utility methods
      clone: {
        value: function clone() {
          var d = new Document(this.isHTML, this._address);
          d._quirks = this._quirks;
          d._contentType = this._contentType;
          return d;
        }
      },
      // We need to adopt the nodes if we do a deep clone
      cloneNode: {
        value: function cloneNode(deep) {
          var clone = Node.prototype.cloneNode.call(this, false);
          if (deep) {
            for (var kid = this.firstChild; kid !== null; kid = kid.nextSibling) {
              clone._appendChild(clone.importNode(kid, true));
            }
          }
          clone._updateDocTypeElement();
          return clone;
        }
      },
      isEqual: {
        value: function isEqual(n) {
          return true;
        }
      },
      // Implementation-specific function.  Called when a text, comment,
      // or pi value changes.
      mutateValue: {
        value: function(node) {
          if (this.mutationHandler) {
            this.mutationHandler({
              type: MUTATE.VALUE,
              target: node,
              data: node.data
            });
          }
        }
      },
      // Invoked when an attribute's value changes. Attr holds the new
      // value.  oldval is the old value.  Attribute mutations can also
      // involve changes to the prefix (and therefore the qualified name)
      mutateAttr: {
        value: function(attr, oldval) {
          if (this.mutationHandler) {
            this.mutationHandler({
              type: MUTATE.ATTR,
              target: attr.ownerElement,
              attr
            });
          }
        }
      },
      // Used by removeAttribute and removeAttributeNS for attributes.
      mutateRemoveAttr: {
        value: function(attr) {
          if (this.mutationHandler) {
            this.mutationHandler({
              type: MUTATE.REMOVE_ATTR,
              target: attr.ownerElement,
              attr
            });
          }
        }
      },
      // Called by Node.removeChild, etc. to remove a rooted element from
      // the tree. Only needs to generate a single mutation event when a
      // node is removed, but must recursively mark all descendants as not
      // rooted.
      mutateRemove: {
        value: function(node) {
          if (this.mutationHandler) {
            this.mutationHandler({
              type: MUTATE.REMOVE,
              target: node.parentNode,
              node
            });
          }
          recursivelyUproot(node);
        }
      },
      // Called when a new element becomes rooted.  It must recursively
      // generate mutation events for each of the children, and mark them all
      // as rooted.
      mutateInsert: {
        value: function(node) {
          recursivelyRoot(node);
          if (this.mutationHandler) {
            this.mutationHandler({
              type: MUTATE.INSERT,
              target: node.parentNode,
              node
            });
          }
        }
      },
      // Called when a rooted element is moved within the document
      mutateMove: {
        value: function(node) {
          if (this.mutationHandler) {
            this.mutationHandler({
              type: MUTATE.MOVE,
              target: node
            });
          }
        }
      },
      // Add a mapping from  id to n for n.ownerDocument
      addId: {
        value: function addId(id, n) {
          var val = this.byId[id];
          if (!val) {
            this.byId[id] = n;
          } else {
            if (!(val instanceof MultiId)) {
              val = new MultiId(val);
              this.byId[id] = val;
            }
            val.add(n);
          }
        }
      },
      // Delete the mapping from id to n for n.ownerDocument
      delId: {
        value: function delId(id, n) {
          var val = this.byId[id];
          utils.assert(val);
          if (val instanceof MultiId) {
            val.del(n);
            if (val.length === 1) {
              this.byId[id] = val.downgrade();
            }
          } else {
            this.byId[id] = void 0;
          }
        }
      },
      _resolve: {
        value: function(href) {
          return new URL2(this._documentBaseURL).resolve(href);
        }
      },
      _documentBaseURL: {
        get: function() {
          var url = this._address;
          if (url === "about:blank") url = "/";
          var base2 = this.querySelector("base[href]");
          if (base2) {
            return new URL2(url).resolve(base2.getAttribute("href"));
          }
          return url;
        }
      },
      _templateDoc: {
        get: function() {
          if (!this._templateDocCache) {
            var newDoc = new Document(this.isHTML, this._address);
            this._templateDocCache = newDoc._templateDocCache = newDoc;
          }
          return this._templateDocCache;
        }
      },
      querySelector: {
        value: function(selector) {
          return select(selector, this)[0];
        }
      },
      querySelectorAll: {
        value: function(selector) {
          var nodes = select(selector, this);
          return nodes.item ? nodes : new NodeList(nodes);
        }
      }
    });
    var eventHandlerTypes = [
      "abort",
      "canplay",
      "canplaythrough",
      "change",
      "click",
      "contextmenu",
      "cuechange",
      "dblclick",
      "drag",
      "dragend",
      "dragenter",
      "dragleave",
      "dragover",
      "dragstart",
      "drop",
      "durationchange",
      "emptied",
      "ended",
      "input",
      "invalid",
      "keydown",
      "keypress",
      "keyup",
      "loadeddata",
      "loadedmetadata",
      "loadstart",
      "mousedown",
      "mousemove",
      "mouseout",
      "mouseover",
      "mouseup",
      "mousewheel",
      "pause",
      "play",
      "playing",
      "progress",
      "ratechange",
      "readystatechange",
      "reset",
      "seeked",
      "seeking",
      "select",
      "show",
      "stalled",
      "submit",
      "suspend",
      "timeupdate",
      "volumechange",
      "waiting",
      "blur",
      "error",
      "focus",
      "load",
      "scroll"
    ];
    eventHandlerTypes.forEach(function(type) {
      Object.defineProperty(Document.prototype, "on" + type, {
        get: function() {
          return this._getEventHandler(type);
        },
        set: function(v) {
          this._setEventHandler(type, v);
        }
      });
    });
    function namedHTMLChild(parent, name) {
      if (parent && parent.isHTML) {
        for (var kid = parent.firstChild; kid !== null; kid = kid.nextSibling) {
          if (kid.nodeType === Node.ELEMENT_NODE && kid.localName === name && kid.namespaceURI === NAMESPACE.HTML) {
            return kid;
          }
        }
      }
      return null;
    }
    function root(n) {
      n._nid = n.ownerDocument._nextnid++;
      n.ownerDocument._nodes[n._nid] = n;
      if (n.nodeType === Node.ELEMENT_NODE) {
        var id = n.getAttribute("id");
        if (id) n.ownerDocument.addId(id, n);
        if (n._roothook) n._roothook();
      }
    }
    function uproot(n) {
      if (n.nodeType === Node.ELEMENT_NODE) {
        var id = n.getAttribute("id");
        if (id) n.ownerDocument.delId(id, n);
      }
      n.ownerDocument._nodes[n._nid] = void 0;
      n._nid = void 0;
    }
    function recursivelyRoot(node) {
      root(node);
      if (node.nodeType === Node.ELEMENT_NODE) {
        for (var kid = node.firstChild; kid !== null; kid = kid.nextSibling) recursivelyRoot(kid);
      }
    }
    function recursivelyUproot(node) {
      uproot(node);
      for (var kid = node.firstChild; kid !== null; kid = kid.nextSibling) recursivelyUproot(kid);
    }
    function recursivelySetOwner(node, owner) {
      node.ownerDocument = owner;
      node._lastModTime = void 0;
      if (Object.prototype.hasOwnProperty.call(node, "_tagName")) {
        node._tagName = void 0;
      }
      for (var kid = node.firstChild; kid !== null; kid = kid.nextSibling)
        recursivelySetOwner(kid, owner);
    }
    function MultiId(node) {
      this.nodes = /* @__PURE__ */ Object.create(null);
      this.nodes[node._nid] = node;
      this.length = 1;
      this.firstNode = void 0;
    }
    MultiId.prototype.add = function(node) {
      if (!this.nodes[node._nid]) {
        this.nodes[node._nid] = node;
        this.length++;
        this.firstNode = void 0;
      }
    };
    MultiId.prototype.del = function(node) {
      if (this.nodes[node._nid]) {
        delete this.nodes[node._nid];
        this.length--;
        this.firstNode = void 0;
      }
    };
    MultiId.prototype.getFirst = function() {
      if (!this.firstNode) {
        var nid;
        for (nid in this.nodes) {
          if (this.firstNode === void 0 || this.firstNode.compareDocumentPosition(this.nodes[nid]) & Node.DOCUMENT_POSITION_PRECEDING) {
            this.firstNode = this.nodes[nid];
          }
        }
      }
      return this.firstNode;
    };
    MultiId.prototype.downgrade = function() {
      if (this.length === 1) {
        var nid;
        for (nid in this.nodes) {
          return this.nodes[nid];
        }
      }
      return this;
    };
  }
});

// packages/qwik-dom/lib/DocumentType.js
var require_DocumentType = __commonJS({
  "packages/qwik-dom/lib/DocumentType.js"(exports2, module2) {
    "use strict";
    module2.exports = DocumentType;
    var Node = require_Node();
    var Leaf = require_Leaf();
    var ChildNode = require_ChildNode();
    function DocumentType(ownerDocument, name, publicId, systemId) {
      Leaf.call(this);
      this.nodeType = Node.DOCUMENT_TYPE_NODE;
      this.ownerDocument = ownerDocument || null;
      this.name = name;
      this.publicId = publicId || "";
      this.systemId = systemId || "";
    }
    DocumentType.prototype = Object.create(Leaf.prototype, {
      nodeName: {
        get: function() {
          return this.name;
        }
      },
      nodeValue: {
        get: function() {
          return null;
        },
        set: function() {
        }
      },
      // Utility methods
      clone: {
        value: function clone() {
          return new DocumentType(this.ownerDocument, this.name, this.publicId, this.systemId);
        }
      },
      isEqual: {
        value: function isEqual(n) {
          return this.name === n.name && this.publicId === n.publicId && this.systemId === n.systemId;
        }
      }
    });
    Object.defineProperties(DocumentType.prototype, ChildNode);
  }
});

// packages/qwik-dom/lib/HTMLParser.js
var require_HTMLParser = __commonJS({
  "packages/qwik-dom/lib/HTMLParser.js"(exports2, module2) {
    "use strict";
    module2.exports = HTMLParser;
    var Document = require_Document();
    var DocumentType = require_DocumentType();
    var Node = require_Node();
    var NAMESPACE = require_utils().NAMESPACE;
    var html = require_htmlelts();
    var impl = html.elements;
    var pushAll = Function.prototype.apply.bind(Array.prototype.push);
    var EOF = -1;
    var TEXT = 1;
    var TAG = 2;
    var ENDTAG = 3;
    var COMMENT = 4;
    var DOCTYPE = 5;
    var NOATTRS = [];
    var quirkyPublicIds = /^HTML$|^-\/\/W3O\/\/DTD W3 HTML Strict 3\.0\/\/EN\/\/$|^-\/W3C\/DTD HTML 4\.0 Transitional\/EN$|^\+\/\/Silmaril\/\/dtd html Pro v0r11 19970101\/\/|^-\/\/AdvaSoft Ltd\/\/DTD HTML 3\.0 asWedit \+ extensions\/\/|^-\/\/AS\/\/DTD HTML 3\.0 asWedit \+ extensions\/\/|^-\/\/IETF\/\/DTD HTML 2\.0 Level 1\/\/|^-\/\/IETF\/\/DTD HTML 2\.0 Level 2\/\/|^-\/\/IETF\/\/DTD HTML 2\.0 Strict Level 1\/\/|^-\/\/IETF\/\/DTD HTML 2\.0 Strict Level 2\/\/|^-\/\/IETF\/\/DTD HTML 2\.0 Strict\/\/|^-\/\/IETF\/\/DTD HTML 2\.0\/\/|^-\/\/IETF\/\/DTD HTML 2\.1E\/\/|^-\/\/IETF\/\/DTD HTML 3\.0\/\/|^-\/\/IETF\/\/DTD HTML 3\.2 Final\/\/|^-\/\/IETF\/\/DTD HTML 3\.2\/\/|^-\/\/IETF\/\/DTD HTML 3\/\/|^-\/\/IETF\/\/DTD HTML Level 0\/\/|^-\/\/IETF\/\/DTD HTML Level 1\/\/|^-\/\/IETF\/\/DTD HTML Level 2\/\/|^-\/\/IETF\/\/DTD HTML Level 3\/\/|^-\/\/IETF\/\/DTD HTML Strict Level 0\/\/|^-\/\/IETF\/\/DTD HTML Strict Level 1\/\/|^-\/\/IETF\/\/DTD HTML Strict Level 2\/\/|^-\/\/IETF\/\/DTD HTML Strict Level 3\/\/|^-\/\/IETF\/\/DTD HTML Strict\/\/|^-\/\/IETF\/\/DTD HTML\/\/|^-\/\/Metrius\/\/DTD Metrius Presentational\/\/|^-\/\/Microsoft\/\/DTD Internet Explorer 2\.0 HTML Strict\/\/|^-\/\/Microsoft\/\/DTD Internet Explorer 2\.0 HTML\/\/|^-\/\/Microsoft\/\/DTD Internet Explorer 2\.0 Tables\/\/|^-\/\/Microsoft\/\/DTD Internet Explorer 3\.0 HTML Strict\/\/|^-\/\/Microsoft\/\/DTD Internet Explorer 3\.0 HTML\/\/|^-\/\/Microsoft\/\/DTD Internet Explorer 3\.0 Tables\/\/|^-\/\/Netscape Comm\. Corp\.\/\/DTD HTML\/\/|^-\/\/Netscape Comm\. Corp\.\/\/DTD Strict HTML\/\/|^-\/\/O'Reilly and Associates\/\/DTD HTML 2\.0\/\/|^-\/\/O'Reilly and Associates\/\/DTD HTML Extended 1\.0\/\/|^-\/\/O'Reilly and Associates\/\/DTD HTML Extended Relaxed 1\.0\/\/|^-\/\/SoftQuad Software\/\/DTD HoTMetaL PRO 6\.0::19990601::extensions to HTML 4\.0\/\/|^-\/\/SoftQuad\/\/DTD HoTMetaL PRO 4\.0::19971010::extensions to HTML 4\.0\/\/|^-\/\/Spyglass\/\/DTD HTML 2\.0 Extended\/\/|^-\/\/SQ\/\/DTD HTML 2\.0 HoTMetaL \+ extensions\/\/|^-\/\/Sun Microsystems Corp\.\/\/DTD HotJava HTML\/\/|^-\/\/Sun Microsystems Corp\.\/\/DTD HotJava Strict HTML\/\/|^-\/\/W3C\/\/DTD HTML 3 1995-03-24\/\/|^-\/\/W3C\/\/DTD HTML 3\.2 Draft\/\/|^-\/\/W3C\/\/DTD HTML 3\.2 Final\/\/|^-\/\/W3C\/\/DTD HTML 3\.2\/\/|^-\/\/W3C\/\/DTD HTML 3\.2S Draft\/\/|^-\/\/W3C\/\/DTD HTML 4\.0 Frameset\/\/|^-\/\/W3C\/\/DTD HTML 4\.0 Transitional\/\/|^-\/\/W3C\/\/DTD HTML Experimental 19960712\/\/|^-\/\/W3C\/\/DTD HTML Experimental 970421\/\/|^-\/\/W3C\/\/DTD W3 HTML\/\/|^-\/\/W3O\/\/DTD W3 HTML 3\.0\/\/|^-\/\/WebTechs\/\/DTD Mozilla HTML 2\.0\/\/|^-\/\/WebTechs\/\/DTD Mozilla HTML\/\//i;
    var quirkySystemId = "http://www.ibm.com/data/dtd/v11/ibmxhtml1-transitional.dtd";
    var conditionallyQuirkyPublicIds = /^-\/\/W3C\/\/DTD HTML 4\.01 Frameset\/\/|^-\/\/W3C\/\/DTD HTML 4\.01 Transitional\/\//i;
    var limitedQuirkyPublicIds = /^-\/\/W3C\/\/DTD XHTML 1\.0 Frameset\/\/|^-\/\/W3C\/\/DTD XHTML 1\.0 Transitional\/\//i;
    var specialSet = /* @__PURE__ */ Object.create(null);
    specialSet[NAMESPACE.HTML] = {
      __proto__: null,
      address: true,
      applet: true,
      area: true,
      article: true,
      aside: true,
      base: true,
      basefont: true,
      bgsound: true,
      blockquote: true,
      body: true,
      br: true,
      button: true,
      caption: true,
      center: true,
      col: true,
      colgroup: true,
      dd: true,
      details: true,
      dir: true,
      div: true,
      dl: true,
      dt: true,
      embed: true,
      fieldset: true,
      figcaption: true,
      figure: true,
      footer: true,
      form: true,
      frame: true,
      frameset: true,
      h1: true,
      h2: true,
      h3: true,
      h4: true,
      h5: true,
      h6: true,
      head: true,
      header: true,
      hgroup: true,
      hr: true,
      html: true,
      iframe: true,
      img: true,
      input: true,
      li: true,
      link: true,
      listing: true,
      main: true,
      marquee: true,
      menu: true,
      meta: true,
      nav: true,
      noembed: true,
      noframes: true,
      noscript: true,
      object: true,
      ol: true,
      p: true,
      param: true,
      plaintext: true,
      pre: true,
      script: true,
      section: true,
      select: true,
      source: true,
      style: true,
      summary: true,
      table: true,
      tbody: true,
      td: true,
      template: true,
      textarea: true,
      tfoot: true,
      th: true,
      thead: true,
      title: true,
      tr: true,
      track: true,
      // Note that "xmp" was removed from the "special" set in the latest
      // spec, apparently by accident; see
      // https://github.com/whatwg/html/pull/1919
      ul: true,
      wbr: true,
      xmp: true
    };
    specialSet[NAMESPACE.SVG] = {
      __proto__: null,
      foreignObject: true,
      desc: true,
      title: true
    };
    specialSet[NAMESPACE.MATHML] = {
      __proto__: null,
      mi: true,
      mo: true,
      mn: true,
      ms: true,
      mtext: true,
      "annotation-xml": true
    };
    var addressdivpSet = /* @__PURE__ */ Object.create(null);
    addressdivpSet[NAMESPACE.HTML] = {
      __proto__: null,
      address: true,
      div: true,
      p: true
    };
    var dddtSet = /* @__PURE__ */ Object.create(null);
    dddtSet[NAMESPACE.HTML] = {
      __proto__: null,
      dd: true,
      dt: true
    };
    var tablesectionrowSet = /* @__PURE__ */ Object.create(null);
    tablesectionrowSet[NAMESPACE.HTML] = {
      __proto__: null,
      table: true,
      thead: true,
      tbody: true,
      tfoot: true,
      tr: true
    };
    var impliedEndTagsSet = /* @__PURE__ */ Object.create(null);
    impliedEndTagsSet[NAMESPACE.HTML] = {
      __proto__: null,
      dd: true,
      dt: true,
      li: true,
      menuitem: true,
      optgroup: true,
      option: true,
      p: true,
      rb: true,
      rp: true,
      rt: true,
      rtc: true
    };
    var thoroughImpliedEndTagsSet = /* @__PURE__ */ Object.create(null);
    thoroughImpliedEndTagsSet[NAMESPACE.HTML] = {
      __proto__: null,
      caption: true,
      colgroup: true,
      dd: true,
      dt: true,
      li: true,
      optgroup: true,
      option: true,
      p: true,
      rb: true,
      rp: true,
      rt: true,
      rtc: true,
      tbody: true,
      td: true,
      tfoot: true,
      th: true,
      thead: true,
      tr: true
    };
    var tableContextSet = /* @__PURE__ */ Object.create(null);
    tableContextSet[NAMESPACE.HTML] = {
      __proto__: null,
      table: true,
      template: true,
      html: true
    };
    var tableBodyContextSet = /* @__PURE__ */ Object.create(null);
    tableBodyContextSet[NAMESPACE.HTML] = {
      __proto__: null,
      tbody: true,
      tfoot: true,
      thead: true,
      template: true,
      html: true
    };
    var tableRowContextSet = /* @__PURE__ */ Object.create(null);
    tableRowContextSet[NAMESPACE.HTML] = {
      __proto__: null,
      tr: true,
      template: true,
      html: true
    };
    var formassociatedSet = /* @__PURE__ */ Object.create(null);
    formassociatedSet[NAMESPACE.HTML] = {
      __proto__: null,
      button: true,
      fieldset: true,
      input: true,
      keygen: true,
      object: true,
      output: true,
      select: true,
      textarea: true,
      img: true
    };
    var inScopeSet = /* @__PURE__ */ Object.create(null);
    inScopeSet[NAMESPACE.HTML] = {
      __proto__: null,
      applet: true,
      caption: true,
      html: true,
      table: true,
      td: true,
      th: true,
      marquee: true,
      object: true,
      template: true
    };
    inScopeSet[NAMESPACE.MATHML] = {
      __proto__: null,
      mi: true,
      mo: true,
      mn: true,
      ms: true,
      mtext: true,
      "annotation-xml": true
    };
    inScopeSet[NAMESPACE.SVG] = {
      __proto__: null,
      foreignObject: true,
      desc: true,
      title: true
    };
    var inListItemScopeSet = Object.create(inScopeSet);
    inListItemScopeSet[NAMESPACE.HTML] = Object.create(inScopeSet[NAMESPACE.HTML]);
    inListItemScopeSet[NAMESPACE.HTML].ol = true;
    inListItemScopeSet[NAMESPACE.HTML].ul = true;
    var inButtonScopeSet = Object.create(inScopeSet);
    inButtonScopeSet[NAMESPACE.HTML] = Object.create(inScopeSet[NAMESPACE.HTML]);
    inButtonScopeSet[NAMESPACE.HTML].button = true;
    var inTableScopeSet = /* @__PURE__ */ Object.create(null);
    inTableScopeSet[NAMESPACE.HTML] = {
      __proto__: null,
      html: true,
      table: true,
      template: true
    };
    var invertedSelectScopeSet = /* @__PURE__ */ Object.create(null);
    invertedSelectScopeSet[NAMESPACE.HTML] = {
      __proto__: null,
      optgroup: true,
      option: true
    };
    var mathmlTextIntegrationPointSet = /* @__PURE__ */ Object.create(null);
    mathmlTextIntegrationPointSet[NAMESPACE.MATHML] = {
      __proto__: null,
      mi: true,
      mo: true,
      mn: true,
      ms: true,
      mtext: true
    };
    var htmlIntegrationPointSet = /* @__PURE__ */ Object.create(null);
    htmlIntegrationPointSet[NAMESPACE.SVG] = {
      __proto__: null,
      foreignObject: true,
      desc: true,
      title: true
    };
    var foreignAttributes = {
      __proto__: null,
      "xlink:actuate": NAMESPACE.XLINK,
      "xlink:arcrole": NAMESPACE.XLINK,
      "xlink:href": NAMESPACE.XLINK,
      "xlink:role": NAMESPACE.XLINK,
      "xlink:show": NAMESPACE.XLINK,
      "xlink:title": NAMESPACE.XLINK,
      "xlink:type": NAMESPACE.XLINK,
      "xml:base": NAMESPACE.XML,
      "xml:lang": NAMESPACE.XML,
      "xml:space": NAMESPACE.XML,
      xmlns: NAMESPACE.XMLNS,
      "xmlns:xlink": NAMESPACE.XMLNS
    };
    var svgAttrAdjustments = {
      __proto__: null,
      attributename: "attributeName",
      attributetype: "attributeType",
      basefrequency: "baseFrequency",
      baseprofile: "baseProfile",
      calcmode: "calcMode",
      clippathunits: "clipPathUnits",
      diffuseconstant: "diffuseConstant",
      edgemode: "edgeMode",
      filterunits: "filterUnits",
      glyphref: "glyphRef",
      gradienttransform: "gradientTransform",
      gradientunits: "gradientUnits",
      kernelmatrix: "kernelMatrix",
      kernelunitlength: "kernelUnitLength",
      keypoints: "keyPoints",
      keysplines: "keySplines",
      keytimes: "keyTimes",
      lengthadjust: "lengthAdjust",
      limitingconeangle: "limitingConeAngle",
      markerheight: "markerHeight",
      markerunits: "markerUnits",
      markerwidth: "markerWidth",
      maskcontentunits: "maskContentUnits",
      maskunits: "maskUnits",
      numoctaves: "numOctaves",
      pathlength: "pathLength",
      patterncontentunits: "patternContentUnits",
      patterntransform: "patternTransform",
      patternunits: "patternUnits",
      pointsatx: "pointsAtX",
      pointsaty: "pointsAtY",
      pointsatz: "pointsAtZ",
      preservealpha: "preserveAlpha",
      preserveaspectratio: "preserveAspectRatio",
      primitiveunits: "primitiveUnits",
      refx: "refX",
      refy: "refY",
      repeatcount: "repeatCount",
      repeatdur: "repeatDur",
      requiredextensions: "requiredExtensions",
      requiredfeatures: "requiredFeatures",
      specularconstant: "specularConstant",
      specularexponent: "specularExponent",
      spreadmethod: "spreadMethod",
      startoffset: "startOffset",
      stddeviation: "stdDeviation",
      stitchtiles: "stitchTiles",
      surfacescale: "surfaceScale",
      systemlanguage: "systemLanguage",
      tablevalues: "tableValues",
      targetx: "targetX",
      targety: "targetY",
      textlength: "textLength",
      viewbox: "viewBox",
      viewtarget: "viewTarget",
      xchannelselector: "xChannelSelector",
      ychannelselector: "yChannelSelector",
      zoomandpan: "zoomAndPan"
    };
    var svgTagNameAdjustments = {
      __proto__: null,
      altglyph: "altGlyph",
      altglyphdef: "altGlyphDef",
      altglyphitem: "altGlyphItem",
      animatecolor: "animateColor",
      animatemotion: "animateMotion",
      animatetransform: "animateTransform",
      clippath: "clipPath",
      feblend: "feBlend",
      fecolormatrix: "feColorMatrix",
      fecomponenttransfer: "feComponentTransfer",
      fecomposite: "feComposite",
      feconvolvematrix: "feConvolveMatrix",
      fediffuselighting: "feDiffuseLighting",
      fedisplacementmap: "feDisplacementMap",
      fedistantlight: "feDistantLight",
      feflood: "feFlood",
      fefunca: "feFuncA",
      fefuncb: "feFuncB",
      fefuncg: "feFuncG",
      fefuncr: "feFuncR",
      fegaussianblur: "feGaussianBlur",
      feimage: "feImage",
      femerge: "feMerge",
      femergenode: "feMergeNode",
      femorphology: "feMorphology",
      feoffset: "feOffset",
      fepointlight: "fePointLight",
      fespecularlighting: "feSpecularLighting",
      fespotlight: "feSpotLight",
      fetile: "feTile",
      feturbulence: "feTurbulence",
      foreignobject: "foreignObject",
      glyphref: "glyphRef",
      lineargradient: "linearGradient",
      radialgradient: "radialGradient",
      textpath: "textPath"
    };
    var numericCharRefReplacements = {
      __proto__: null,
      0: 65533,
      128: 8364,
      130: 8218,
      131: 402,
      132: 8222,
      133: 8230,
      134: 8224,
      135: 8225,
      136: 710,
      137: 8240,
      138: 352,
      139: 8249,
      140: 338,
      142: 381,
      145: 8216,
      146: 8217,
      147: 8220,
      148: 8221,
      149: 8226,
      150: 8211,
      151: 8212,
      152: 732,
      153: 8482,
      154: 353,
      155: 8250,
      156: 339,
      158: 382,
      159: 376
    };
    var namedCharRefs = {
      __proto__: null,
      AElig: 198,
      "AElig;": 198,
      AMP: 38,
      "AMP;": 38,
      Aacute: 193,
      "Aacute;": 193,
      "Abreve;": 258,
      Acirc: 194,
      "Acirc;": 194,
      "Acy;": 1040,
      "Afr;": [55349, 56580],
      Agrave: 192,
      "Agrave;": 192,
      "Alpha;": 913,
      "Amacr;": 256,
      "And;": 10835,
      "Aogon;": 260,
      "Aopf;": [55349, 56632],
      "ApplyFunction;": 8289,
      Aring: 197,
      "Aring;": 197,
      "Ascr;": [55349, 56476],
      "Assign;": 8788,
      Atilde: 195,
      "Atilde;": 195,
      Auml: 196,
      "Auml;": 196,
      "Backslash;": 8726,
      "Barv;": 10983,
      "Barwed;": 8966,
      "Bcy;": 1041,
      "Because;": 8757,
      "Bernoullis;": 8492,
      "Beta;": 914,
      "Bfr;": [55349, 56581],
      "Bopf;": [55349, 56633],
      "Breve;": 728,
      "Bscr;": 8492,
      "Bumpeq;": 8782,
      "CHcy;": 1063,
      COPY: 169,
      "COPY;": 169,
      "Cacute;": 262,
      "Cap;": 8914,
      "CapitalDifferentialD;": 8517,
      "Cayleys;": 8493,
      "Ccaron;": 268,
      Ccedil: 199,
      "Ccedil;": 199,
      "Ccirc;": 264,
      "Cconint;": 8752,
      "Cdot;": 266,
      "Cedilla;": 184,
      "CenterDot;": 183,
      "Cfr;": 8493,
      "Chi;": 935,
      "CircleDot;": 8857,
      "CircleMinus;": 8854,
      "CirclePlus;": 8853,
      "CircleTimes;": 8855,
      "ClockwiseContourIntegral;": 8754,
      "CloseCurlyDoubleQuote;": 8221,
      "CloseCurlyQuote;": 8217,
      "Colon;": 8759,
      "Colone;": 10868,
      "Congruent;": 8801,
      "Conint;": 8751,
      "ContourIntegral;": 8750,
      "Copf;": 8450,
      "Coproduct;": 8720,
      "CounterClockwiseContourIntegral;": 8755,
      "Cross;": 10799,
      "Cscr;": [55349, 56478],
      "Cup;": 8915,
      "CupCap;": 8781,
      "DD;": 8517,
      "DDotrahd;": 10513,
      "DJcy;": 1026,
      "DScy;": 1029,
      "DZcy;": 1039,
      "Dagger;": 8225,
      "Darr;": 8609,
      "Dashv;": 10980,
      "Dcaron;": 270,
      "Dcy;": 1044,
      "Del;": 8711,
      "Delta;": 916,
      "Dfr;": [55349, 56583],
      "DiacriticalAcute;": 180,
      "DiacriticalDot;": 729,
      "DiacriticalDoubleAcute;": 733,
      "DiacriticalGrave;": 96,
      "DiacriticalTilde;": 732,
      "Diamond;": 8900,
      "DifferentialD;": 8518,
      "Dopf;": [55349, 56635],
      "Dot;": 168,
      "DotDot;": 8412,
      "DotEqual;": 8784,
      "DoubleContourIntegral;": 8751,
      "DoubleDot;": 168,
      "DoubleDownArrow;": 8659,
      "DoubleLeftArrow;": 8656,
      "DoubleLeftRightArrow;": 8660,
      "DoubleLeftTee;": 10980,
      "DoubleLongLeftArrow;": 10232,
      "DoubleLongLeftRightArrow;": 10234,
      "DoubleLongRightArrow;": 10233,
      "DoubleRightArrow;": 8658,
      "DoubleRightTee;": 8872,
      "DoubleUpArrow;": 8657,
      "DoubleUpDownArrow;": 8661,
      "DoubleVerticalBar;": 8741,
      "DownArrow;": 8595,
      "DownArrowBar;": 10515,
      "DownArrowUpArrow;": 8693,
      "DownBreve;": 785,
      "DownLeftRightVector;": 10576,
      "DownLeftTeeVector;": 10590,
      "DownLeftVector;": 8637,
      "DownLeftVectorBar;": 10582,
      "DownRightTeeVector;": 10591,
      "DownRightVector;": 8641,
      "DownRightVectorBar;": 10583,
      "DownTee;": 8868,
      "DownTeeArrow;": 8615,
      "Downarrow;": 8659,
      "Dscr;": [55349, 56479],
      "Dstrok;": 272,
      "ENG;": 330,
      ETH: 208,
      "ETH;": 208,
      Eacute: 201,
      "Eacute;": 201,
      "Ecaron;": 282,
      Ecirc: 202,
      "Ecirc;": 202,
      "Ecy;": 1069,
      "Edot;": 278,
      "Efr;": [55349, 56584],
      Egrave: 200,
      "Egrave;": 200,
      "Element;": 8712,
      "Emacr;": 274,
      "EmptySmallSquare;": 9723,
      "EmptyVerySmallSquare;": 9643,
      "Eogon;": 280,
      "Eopf;": [55349, 56636],
      "Epsilon;": 917,
      "Equal;": 10869,
      "EqualTilde;": 8770,
      "Equilibrium;": 8652,
      "Escr;": 8496,
      "Esim;": 10867,
      "Eta;": 919,
      Euml: 203,
      "Euml;": 203,
      "Exists;": 8707,
      "ExponentialE;": 8519,
      "Fcy;": 1060,
      "Ffr;": [55349, 56585],
      "FilledSmallSquare;": 9724,
      "FilledVerySmallSquare;": 9642,
      "Fopf;": [55349, 56637],
      "ForAll;": 8704,
      "Fouriertrf;": 8497,
      "Fscr;": 8497,
      "GJcy;": 1027,
      GT: 62,
      "GT;": 62,
      "Gamma;": 915,
      "Gammad;": 988,
      "Gbreve;": 286,
      "Gcedil;": 290,
      "Gcirc;": 284,
      "Gcy;": 1043,
      "Gdot;": 288,
      "Gfr;": [55349, 56586],
      "Gg;": 8921,
      "Gopf;": [55349, 56638],
      "GreaterEqual;": 8805,
      "GreaterEqualLess;": 8923,
      "GreaterFullEqual;": 8807,
      "GreaterGreater;": 10914,
      "GreaterLess;": 8823,
      "GreaterSlantEqual;": 10878,
      "GreaterTilde;": 8819,
      "Gscr;": [55349, 56482],
      "Gt;": 8811,
      "HARDcy;": 1066,
      "Hacek;": 711,
      "Hat;": 94,
      "Hcirc;": 292,
      "Hfr;": 8460,
      "HilbertSpace;": 8459,
      "Hopf;": 8461,
      "HorizontalLine;": 9472,
      "Hscr;": 8459,
      "Hstrok;": 294,
      "HumpDownHump;": 8782,
      "HumpEqual;": 8783,
      "IEcy;": 1045,
      "IJlig;": 306,
      "IOcy;": 1025,
      Iacute: 205,
      "Iacute;": 205,
      Icirc: 206,
      "Icirc;": 206,
      "Icy;": 1048,
      "Idot;": 304,
      "Ifr;": 8465,
      Igrave: 204,
      "Igrave;": 204,
      "Im;": 8465,
      "Imacr;": 298,
      "ImaginaryI;": 8520,
      "Implies;": 8658,
      "Int;": 8748,
      "Integral;": 8747,
      "Intersection;": 8898,
      "InvisibleComma;": 8291,
      "InvisibleTimes;": 8290,
      "Iogon;": 302,
      "Iopf;": [55349, 56640],
      "Iota;": 921,
      "Iscr;": 8464,
      "Itilde;": 296,
      "Iukcy;": 1030,
      Iuml: 207,
      "Iuml;": 207,
      "Jcirc;": 308,
      "Jcy;": 1049,
      "Jfr;": [55349, 56589],
      "Jopf;": [55349, 56641],
      "Jscr;": [55349, 56485],
      "Jsercy;": 1032,
      "Jukcy;": 1028,
      "KHcy;": 1061,
      "KJcy;": 1036,
      "Kappa;": 922,
      "Kcedil;": 310,
      "Kcy;": 1050,
      "Kfr;": [55349, 56590],
      "Kopf;": [55349, 56642],
      "Kscr;": [55349, 56486],
      "LJcy;": 1033,
      LT: 60,
      "LT;": 60,
      "Lacute;": 313,
      "Lambda;": 923,
      "Lang;": 10218,
      "Laplacetrf;": 8466,
      "Larr;": 8606,
      "Lcaron;": 317,
      "Lcedil;": 315,
      "Lcy;": 1051,
      "LeftAngleBracket;": 10216,
      "LeftArrow;": 8592,
      "LeftArrowBar;": 8676,
      "LeftArrowRightArrow;": 8646,
      "LeftCeiling;": 8968,
      "LeftDoubleBracket;": 10214,
      "LeftDownTeeVector;": 10593,
      "LeftDownVector;": 8643,
      "LeftDownVectorBar;": 10585,
      "LeftFloor;": 8970,
      "LeftRightArrow;": 8596,
      "LeftRightVector;": 10574,
      "LeftTee;": 8867,
      "LeftTeeArrow;": 8612,
      "LeftTeeVector;": 10586,
      "LeftTriangle;": 8882,
      "LeftTriangleBar;": 10703,
      "LeftTriangleEqual;": 8884,
      "LeftUpDownVector;": 10577,
      "LeftUpTeeVector;": 10592,
      "LeftUpVector;": 8639,
      "LeftUpVectorBar;": 10584,
      "LeftVector;": 8636,
      "LeftVectorBar;": 10578,
      "Leftarrow;": 8656,
      "Leftrightarrow;": 8660,
      "LessEqualGreater;": 8922,
      "LessFullEqual;": 8806,
      "LessGreater;": 8822,
      "LessLess;": 10913,
      "LessSlantEqual;": 10877,
      "LessTilde;": 8818,
      "Lfr;": [55349, 56591],
      "Ll;": 8920,
      "Lleftarrow;": 8666,
      "Lmidot;": 319,
      "LongLeftArrow;": 10229,
      "LongLeftRightArrow;": 10231,
      "LongRightArrow;": 10230,
      "Longleftarrow;": 10232,
      "Longleftrightarrow;": 10234,
      "Longrightarrow;": 10233,
      "Lopf;": [55349, 56643],
      "LowerLeftArrow;": 8601,
      "LowerRightArrow;": 8600,
      "Lscr;": 8466,
      "Lsh;": 8624,
      "Lstrok;": 321,
      "Lt;": 8810,
      "Map;": 10501,
      "Mcy;": 1052,
      "MediumSpace;": 8287,
      "Mellintrf;": 8499,
      "Mfr;": [55349, 56592],
      "MinusPlus;": 8723,
      "Mopf;": [55349, 56644],
      "Mscr;": 8499,
      "Mu;": 924,
      "NJcy;": 1034,
      "Nacute;": 323,
      "Ncaron;": 327,
      "Ncedil;": 325,
      "Ncy;": 1053,
      "NegativeMediumSpace;": 8203,
      "NegativeThickSpace;": 8203,
      "NegativeThinSpace;": 8203,
      "NegativeVeryThinSpace;": 8203,
      "NestedGreaterGreater;": 8811,
      "NestedLessLess;": 8810,
      "NewLine;": 10,
      "Nfr;": [55349, 56593],
      "NoBreak;": 8288,
      "NonBreakingSpace;": 160,
      "Nopf;": 8469,
      "Not;": 10988,
      "NotCongruent;": 8802,
      "NotCupCap;": 8813,
      "NotDoubleVerticalBar;": 8742,
      "NotElement;": 8713,
      "NotEqual;": 8800,
      "NotEqualTilde;": [8770, 824],
      "NotExists;": 8708,
      "NotGreater;": 8815,
      "NotGreaterEqual;": 8817,
      "NotGreaterFullEqual;": [8807, 824],
      "NotGreaterGreater;": [8811, 824],
      "NotGreaterLess;": 8825,
      "NotGreaterSlantEqual;": [10878, 824],
      "NotGreaterTilde;": 8821,
      "NotHumpDownHump;": [8782, 824],
      "NotHumpEqual;": [8783, 824],
      "NotLeftTriangle;": 8938,
      "NotLeftTriangleBar;": [10703, 824],
      "NotLeftTriangleEqual;": 8940,
      "NotLess;": 8814,
      "NotLessEqual;": 8816,
      "NotLessGreater;": 8824,
      "NotLessLess;": [8810, 824],
      "NotLessSlantEqual;": [10877, 824],
      "NotLessTilde;": 8820,
      "NotNestedGreaterGreater;": [10914, 824],
      "NotNestedLessLess;": [10913, 824],
      "NotPrecedes;": 8832,
      "NotPrecedesEqual;": [10927, 824],
      "NotPrecedesSlantEqual;": 8928,
      "NotReverseElement;": 8716,
      "NotRightTriangle;": 8939,
      "NotRightTriangleBar;": [10704, 824],
      "NotRightTriangleEqual;": 8941,
      "NotSquareSubset;": [8847, 824],
      "NotSquareSubsetEqual;": 8930,
      "NotSquareSuperset;": [8848, 824],
      "NotSquareSupersetEqual;": 8931,
      "NotSubset;": [8834, 8402],
      "NotSubsetEqual;": 8840,
      "NotSucceeds;": 8833,
      "NotSucceedsEqual;": [10928, 824],
      "NotSucceedsSlantEqual;": 8929,
      "NotSucceedsTilde;": [8831, 824],
      "NotSuperset;": [8835, 8402],
      "NotSupersetEqual;": 8841,
      "NotTilde;": 8769,
      "NotTildeEqual;": 8772,
      "NotTildeFullEqual;": 8775,
      "NotTildeTilde;": 8777,
      "NotVerticalBar;": 8740,
      "Nscr;": [55349, 56489],
      Ntilde: 209,
      "Ntilde;": 209,
      "Nu;": 925,
      "OElig;": 338,
      Oacute: 211,
      "Oacute;": 211,
      Ocirc: 212,
      "Ocirc;": 212,
      "Ocy;": 1054,
      "Odblac;": 336,
      "Ofr;": [55349, 56594],
      Ograve: 210,
      "Ograve;": 210,
      "Omacr;": 332,
      "Omega;": 937,
      "Omicron;": 927,
      "Oopf;": [55349, 56646],
      "OpenCurlyDoubleQuote;": 8220,
      "OpenCurlyQuote;": 8216,
      "Or;": 10836,
      "Oscr;": [55349, 56490],
      Oslash: 216,
      "Oslash;": 216,
      Otilde: 213,
      "Otilde;": 213,
      "Otimes;": 10807,
      Ouml: 214,
      "Ouml;": 214,
      "OverBar;": 8254,
      "OverBrace;": 9182,
      "OverBracket;": 9140,
      "OverParenthesis;": 9180,
      "PartialD;": 8706,
      "Pcy;": 1055,
      "Pfr;": [55349, 56595],
      "Phi;": 934,
      "Pi;": 928,
      "PlusMinus;": 177,
      "Poincareplane;": 8460,
      "Popf;": 8473,
      "Pr;": 10939,
      "Precedes;": 8826,
      "PrecedesEqual;": 10927,
      "PrecedesSlantEqual;": 8828,
      "PrecedesTilde;": 8830,
      "Prime;": 8243,
      "Product;": 8719,
      "Proportion;": 8759,
      "Proportional;": 8733,
      "Pscr;": [55349, 56491],
      "Psi;": 936,
      QUOT: 34,
      "QUOT;": 34,
      "Qfr;": [55349, 56596],
      "Qopf;": 8474,
      "Qscr;": [55349, 56492],
      "RBarr;": 10512,
      REG: 174,
      "REG;": 174,
      "Racute;": 340,
      "Rang;": 10219,
      "Rarr;": 8608,
      "Rarrtl;": 10518,
      "Rcaron;": 344,
      "Rcedil;": 342,
      "Rcy;": 1056,
      "Re;": 8476,
      "ReverseElement;": 8715,
      "ReverseEquilibrium;": 8651,
      "ReverseUpEquilibrium;": 10607,
      "Rfr;": 8476,
      "Rho;": 929,
      "RightAngleBracket;": 10217,
      "RightArrow;": 8594,
      "RightArrowBar;": 8677,
      "RightArrowLeftArrow;": 8644,
      "RightCeiling;": 8969,
      "RightDoubleBracket;": 10215,
      "RightDownTeeVector;": 10589,
      "RightDownVector;": 8642,
      "RightDownVectorBar;": 10581,
      "RightFloor;": 8971,
      "RightTee;": 8866,
      "RightTeeArrow;": 8614,
      "RightTeeVector;": 10587,
      "RightTriangle;": 8883,
      "RightTriangleBar;": 10704,
      "RightTriangleEqual;": 8885,
      "RightUpDownVector;": 10575,
      "RightUpTeeVector;": 10588,
      "RightUpVector;": 8638,
      "RightUpVectorBar;": 10580,
      "RightVector;": 8640,
      "RightVectorBar;": 10579,
      "Rightarrow;": 8658,
      "Ropf;": 8477,
      "RoundImplies;": 10608,
      "Rrightarrow;": 8667,
      "Rscr;": 8475,
      "Rsh;": 8625,
      "RuleDelayed;": 10740,
      "SHCHcy;": 1065,
      "SHcy;": 1064,
      "SOFTcy;": 1068,
      "Sacute;": 346,
      "Sc;": 10940,
      "Scaron;": 352,
      "Scedil;": 350,
      "Scirc;": 348,
      "Scy;": 1057,
      "Sfr;": [55349, 56598],
      "ShortDownArrow;": 8595,
      "ShortLeftArrow;": 8592,
      "ShortRightArrow;": 8594,
      "ShortUpArrow;": 8593,
      "Sigma;": 931,
      "SmallCircle;": 8728,
      "Sopf;": [55349, 56650],
      "Sqrt;": 8730,
      "Square;": 9633,
      "SquareIntersection;": 8851,
      "SquareSubset;": 8847,
      "SquareSubsetEqual;": 8849,
      "SquareSuperset;": 8848,
      "SquareSupersetEqual;": 8850,
      "SquareUnion;": 8852,
      "Sscr;": [55349, 56494],
      "Star;": 8902,
      "Sub;": 8912,
      "Subset;": 8912,
      "SubsetEqual;": 8838,
      "Succeeds;": 8827,
      "SucceedsEqual;": 10928,
      "SucceedsSlantEqual;": 8829,
      "SucceedsTilde;": 8831,
      "SuchThat;": 8715,
      "Sum;": 8721,
      "Sup;": 8913,
      "Superset;": 8835,
      "SupersetEqual;": 8839,
      "Supset;": 8913,
      THORN: 222,
      "THORN;": 222,
      "TRADE;": 8482,
      "TSHcy;": 1035,
      "TScy;": 1062,
      "Tab;": 9,
      "Tau;": 932,
      "Tcaron;": 356,
      "Tcedil;": 354,
      "Tcy;": 1058,
      "Tfr;": [55349, 56599],
      "Therefore;": 8756,
      "Theta;": 920,
      "ThickSpace;": [8287, 8202],
      "ThinSpace;": 8201,
      "Tilde;": 8764,
      "TildeEqual;": 8771,
      "TildeFullEqual;": 8773,
      "TildeTilde;": 8776,
      "Topf;": [55349, 56651],
      "TripleDot;": 8411,
      "Tscr;": [55349, 56495],
      "Tstrok;": 358,
      Uacute: 218,
      "Uacute;": 218,
      "Uarr;": 8607,
      "Uarrocir;": 10569,
      "Ubrcy;": 1038,
      "Ubreve;": 364,
      Ucirc: 219,
      "Ucirc;": 219,
      "Ucy;": 1059,
      "Udblac;": 368,
      "Ufr;": [55349, 56600],
      Ugrave: 217,
      "Ugrave;": 217,
      "Umacr;": 362,
      "UnderBar;": 95,
      "UnderBrace;": 9183,
      "UnderBracket;": 9141,
      "UnderParenthesis;": 9181,
      "Union;": 8899,
      "UnionPlus;": 8846,
      "Uogon;": 370,
      "Uopf;": [55349, 56652],
      "UpArrow;": 8593,
      "UpArrowBar;": 10514,
      "UpArrowDownArrow;": 8645,
      "UpDownArrow;": 8597,
      "UpEquilibrium;": 10606,
      "UpTee;": 8869,
      "UpTeeArrow;": 8613,
      "Uparrow;": 8657,
      "Updownarrow;": 8661,
      "UpperLeftArrow;": 8598,
      "UpperRightArrow;": 8599,
      "Upsi;": 978,
      "Upsilon;": 933,
      "Uring;": 366,
      "Uscr;": [55349, 56496],
      "Utilde;": 360,
      Uuml: 220,
      "Uuml;": 220,
      "VDash;": 8875,
      "Vbar;": 10987,
      "Vcy;": 1042,
      "Vdash;": 8873,
      "Vdashl;": 10982,
      "Vee;": 8897,
      "Verbar;": 8214,
      "Vert;": 8214,
      "VerticalBar;": 8739,
      "VerticalLine;": 124,
      "VerticalSeparator;": 10072,
      "VerticalTilde;": 8768,
      "VeryThinSpace;": 8202,
      "Vfr;": [55349, 56601],
      "Vopf;": [55349, 56653],
      "Vscr;": [55349, 56497],
      "Vvdash;": 8874,
      "Wcirc;": 372,
      "Wedge;": 8896,
      "Wfr;": [55349, 56602],
      "Wopf;": [55349, 56654],
      "Wscr;": [55349, 56498],
      "Xfr;": [55349, 56603],
      "Xi;": 926,
      "Xopf;": [55349, 56655],
      "Xscr;": [55349, 56499],
      "YAcy;": 1071,
      "YIcy;": 1031,
      "YUcy;": 1070,
      Yacute: 221,
      "Yacute;": 221,
      "Ycirc;": 374,
      "Ycy;": 1067,
      "Yfr;": [55349, 56604],
      "Yopf;": [55349, 56656],
      "Yscr;": [55349, 56500],
      "Yuml;": 376,
      "ZHcy;": 1046,
      "Zacute;": 377,
      "Zcaron;": 381,
      "Zcy;": 1047,
      "Zdot;": 379,
      "ZeroWidthSpace;": 8203,
      "Zeta;": 918,
      "Zfr;": 8488,
      "Zopf;": 8484,
      "Zscr;": [55349, 56501],
      aacute: 225,
      "aacute;": 225,
      "abreve;": 259,
      "ac;": 8766,
      "acE;": [8766, 819],
      "acd;": 8767,
      acirc: 226,
      "acirc;": 226,
      acute: 180,
      "acute;": 180,
      "acy;": 1072,
      aelig: 230,
      "aelig;": 230,
      "af;": 8289,
      "afr;": [55349, 56606],
      agrave: 224,
      "agrave;": 224,
      "alefsym;": 8501,
      "aleph;": 8501,
      "alpha;": 945,
      "amacr;": 257,
      "amalg;": 10815,
      amp: 38,
      "amp;": 38,
      "and;": 8743,
      "andand;": 10837,
      "andd;": 10844,
      "andslope;": 10840,
      "andv;": 10842,
      "ang;": 8736,
      "ange;": 10660,
      "angle;": 8736,
      "angmsd;": 8737,
      "angmsdaa;": 10664,
      "angmsdab;": 10665,
      "angmsdac;": 10666,
      "angmsdad;": 10667,
      "angmsdae;": 10668,
      "angmsdaf;": 10669,
      "angmsdag;": 10670,
      "angmsdah;": 10671,
      "angrt;": 8735,
      "angrtvb;": 8894,
      "angrtvbd;": 10653,
      "angsph;": 8738,
      "angst;": 197,
      "angzarr;": 9084,
      "aogon;": 261,
      "aopf;": [55349, 56658],
      "ap;": 8776,
      "apE;": 10864,
      "apacir;": 10863,
      "ape;": 8778,
      "apid;": 8779,
      "apos;": 39,
      "approx;": 8776,
      "approxeq;": 8778,
      aring: 229,
      "aring;": 229,
      "ascr;": [55349, 56502],
      "ast;": 42,
      "asymp;": 8776,
      "asympeq;": 8781,
      atilde: 227,
      "atilde;": 227,
      auml: 228,
      "auml;": 228,
      "awconint;": 8755,
      "awint;": 10769,
      "bNot;": 10989,
      "backcong;": 8780,
      "backepsilon;": 1014,
      "backprime;": 8245,
      "backsim;": 8765,
      "backsimeq;": 8909,
      "barvee;": 8893,
      "barwed;": 8965,
      "barwedge;": 8965,
      "bbrk;": 9141,
      "bbrktbrk;": 9142,
      "bcong;": 8780,
      "bcy;": 1073,
      "bdquo;": 8222,
      "becaus;": 8757,
      "because;": 8757,
      "bemptyv;": 10672,
      "bepsi;": 1014,
      "bernou;": 8492,
      "beta;": 946,
      "beth;": 8502,
      "between;": 8812,
      "bfr;": [55349, 56607],
      "bigcap;": 8898,
      "bigcirc;": 9711,
      "bigcup;": 8899,
      "bigodot;": 10752,
      "bigoplus;": 10753,
      "bigotimes;": 10754,
      "bigsqcup;": 10758,
      "bigstar;": 9733,
      "bigtriangledown;": 9661,
      "bigtriangleup;": 9651,
      "biguplus;": 10756,
      "bigvee;": 8897,
      "bigwedge;": 8896,
      "bkarow;": 10509,
      "blacklozenge;": 10731,
      "blacksquare;": 9642,
      "blacktriangle;": 9652,
      "blacktriangledown;": 9662,
      "blacktriangleleft;": 9666,
      "blacktriangleright;": 9656,
      "blank;": 9251,
      "blk12;": 9618,
      "blk14;": 9617,
      "blk34;": 9619,
      "block;": 9608,
      "bne;": [61, 8421],
      "bnequiv;": [8801, 8421],
      "bnot;": 8976,
      "bopf;": [55349, 56659],
      "bot;": 8869,
      "bottom;": 8869,
      "bowtie;": 8904,
      "boxDL;": 9559,
      "boxDR;": 9556,
      "boxDl;": 9558,
      "boxDr;": 9555,
      "boxH;": 9552,
      "boxHD;": 9574,
      "boxHU;": 9577,
      "boxHd;": 9572,
      "boxHu;": 9575,
      "boxUL;": 9565,
      "boxUR;": 9562,
      "boxUl;": 9564,
      "boxUr;": 9561,
      "boxV;": 9553,
      "boxVH;": 9580,
      "boxVL;": 9571,
      "boxVR;": 9568,
      "boxVh;": 9579,
      "boxVl;": 9570,
      "boxVr;": 9567,
      "boxbox;": 10697,
      "boxdL;": 9557,
      "boxdR;": 9554,
      "boxdl;": 9488,
      "boxdr;": 9484,
      "boxh;": 9472,
      "boxhD;": 9573,
      "boxhU;": 9576,
      "boxhd;": 9516,
      "boxhu;": 9524,
      "boxminus;": 8863,
      "boxplus;": 8862,
      "boxtimes;": 8864,
      "boxuL;": 9563,
      "boxuR;": 9560,
      "boxul;": 9496,
      "boxur;": 9492,
      "boxv;": 9474,
      "boxvH;": 9578,
      "boxvL;": 9569,
      "boxvR;": 9566,
      "boxvh;": 9532,
      "boxvl;": 9508,
      "boxvr;": 9500,
      "bprime;": 8245,
      "breve;": 728,
      brvbar: 166,
      "brvbar;": 166,
      "bscr;": [55349, 56503],
      "bsemi;": 8271,
      "bsim;": 8765,
      "bsime;": 8909,
      "bsol;": 92,
      "bsolb;": 10693,
      "bsolhsub;": 10184,
      "bull;": 8226,
      "bullet;": 8226,
      "bump;": 8782,
      "bumpE;": 10926,
      "bumpe;": 8783,
      "bumpeq;": 8783,
      "cacute;": 263,
      "cap;": 8745,
      "capand;": 10820,
      "capbrcup;": 10825,
      "capcap;": 10827,
      "capcup;": 10823,
      "capdot;": 10816,
      "caps;": [8745, 65024],
      "caret;": 8257,
      "caron;": 711,
      "ccaps;": 10829,
      "ccaron;": 269,
      ccedil: 231,
      "ccedil;": 231,
      "ccirc;": 265,
      "ccups;": 10828,
      "ccupssm;": 10832,
      "cdot;": 267,
      cedil: 184,
      "cedil;": 184,
      "cemptyv;": 10674,
      cent: 162,
      "cent;": 162,
      "centerdot;": 183,
      "cfr;": [55349, 56608],
      "chcy;": 1095,
      "check;": 10003,
      "checkmark;": 10003,
      "chi;": 967,
      "cir;": 9675,
      "cirE;": 10691,
      "circ;": 710,
      "circeq;": 8791,
      "circlearrowleft;": 8634,
      "circlearrowright;": 8635,
      "circledR;": 174,
      "circledS;": 9416,
      "circledast;": 8859,
      "circledcirc;": 8858,
      "circleddash;": 8861,
      "cire;": 8791,
      "cirfnint;": 10768,
      "cirmid;": 10991,
      "cirscir;": 10690,
      "clubs;": 9827,
      "clubsuit;": 9827,
      "colon;": 58,
      "colone;": 8788,
      "coloneq;": 8788,
      "comma;": 44,
      "commat;": 64,
      "comp;": 8705,
      "compfn;": 8728,
      "complement;": 8705,
      "complexes;": 8450,
      "cong;": 8773,
      "congdot;": 10861,
      "conint;": 8750,
      "copf;": [55349, 56660],
      "coprod;": 8720,
      copy: 169,
      "copy;": 169,
      "copysr;": 8471,
      "crarr;": 8629,
      "cross;": 10007,
      "cscr;": [55349, 56504],
      "csub;": 10959,
      "csube;": 10961,
      "csup;": 10960,
      "csupe;": 10962,
      "ctdot;": 8943,
      "cudarrl;": 10552,
      "cudarrr;": 10549,
      "cuepr;": 8926,
      "cuesc;": 8927,
      "cularr;": 8630,
      "cularrp;": 10557,
      "cup;": 8746,
      "cupbrcap;": 10824,
      "cupcap;": 10822,
      "cupcup;": 10826,
      "cupdot;": 8845,
      "cupor;": 10821,
      "cups;": [8746, 65024],
      "curarr;": 8631,
      "curarrm;": 10556,
      "curlyeqprec;": 8926,
      "curlyeqsucc;": 8927,
      "curlyvee;": 8910,
      "curlywedge;": 8911,
      curren: 164,
      "curren;": 164,
      "curvearrowleft;": 8630,
      "curvearrowright;": 8631,
      "cuvee;": 8910,
      "cuwed;": 8911,
      "cwconint;": 8754,
      "cwint;": 8753,
      "cylcty;": 9005,
      "dArr;": 8659,
      "dHar;": 10597,
      "dagger;": 8224,
      "daleth;": 8504,
      "darr;": 8595,
      "dash;": 8208,
      "dashv;": 8867,
      "dbkarow;": 10511,
      "dblac;": 733,
      "dcaron;": 271,
      "dcy;": 1076,
      "dd;": 8518,
      "ddagger;": 8225,
      "ddarr;": 8650,
      "ddotseq;": 10871,
      deg: 176,
      "deg;": 176,
      "delta;": 948,
      "demptyv;": 10673,
      "dfisht;": 10623,
      "dfr;": [55349, 56609],
      "dharl;": 8643,
      "dharr;": 8642,
      "diam;": 8900,
      "diamond;": 8900,
      "diamondsuit;": 9830,
      "diams;": 9830,
      "die;": 168,
      "digamma;": 989,
      "disin;": 8946,
      "div;": 247,
      divide: 247,
      "divide;": 247,
      "divideontimes;": 8903,
      "divonx;": 8903,
      "djcy;": 1106,
      "dlcorn;": 8990,
      "dlcrop;": 8973,
      "dollar;": 36,
      "dopf;": [55349, 56661],
      "dot;": 729,
      "doteq;": 8784,
      "doteqdot;": 8785,
      "dotminus;": 8760,
      "dotplus;": 8724,
      "dotsquare;": 8865,
      "doublebarwedge;": 8966,
      "downarrow;": 8595,
      "downdownarrows;": 8650,
      "downharpoonleft;": 8643,
      "downharpoonright;": 8642,
      "drbkarow;": 10512,
      "drcorn;": 8991,
      "drcrop;": 8972,
      "dscr;": [55349, 56505],
      "dscy;": 1109,
      "dsol;": 10742,
      "dstrok;": 273,
      "dtdot;": 8945,
      "dtri;": 9663,
      "dtrif;": 9662,
      "duarr;": 8693,
      "duhar;": 10607,
      "dwangle;": 10662,
      "dzcy;": 1119,
      "dzigrarr;": 10239,
      "eDDot;": 10871,
      "eDot;": 8785,
      eacute: 233,
      "eacute;": 233,
      "easter;": 10862,
      "ecaron;": 283,
      "ecir;": 8790,
      ecirc: 234,
      "ecirc;": 234,
      "ecolon;": 8789,
      "ecy;": 1101,
      "edot;": 279,
      "ee;": 8519,
      "efDot;": 8786,
      "efr;": [55349, 56610],
      "eg;": 10906,
      egrave: 232,
      "egrave;": 232,
      "egs;": 10902,
      "egsdot;": 10904,
      "el;": 10905,
      "elinters;": 9191,
      "ell;": 8467,
      "els;": 10901,
      "elsdot;": 10903,
      "emacr;": 275,
      "empty;": 8709,
      "emptyset;": 8709,
      "emptyv;": 8709,
      "emsp13;": 8196,
      "emsp14;": 8197,
      "emsp;": 8195,
      "eng;": 331,
      "ensp;": 8194,
      "eogon;": 281,
      "eopf;": [55349, 56662],
      "epar;": 8917,
      "eparsl;": 10723,
      "eplus;": 10865,
      "epsi;": 949,
      "epsilon;": 949,
      "epsiv;": 1013,
      "eqcirc;": 8790,
      "eqcolon;": 8789,
      "eqsim;": 8770,
      "eqslantgtr;": 10902,
      "eqslantless;": 10901,
      "equals;": 61,
      "equest;": 8799,
      "equiv;": 8801,
      "equivDD;": 10872,
      "eqvparsl;": 10725,
      "erDot;": 8787,
      "erarr;": 10609,
      "escr;": 8495,
      "esdot;": 8784,
      "esim;": 8770,
      "eta;": 951,
      eth: 240,
      "eth;": 240,
      euml: 235,
      "euml;": 235,
      "euro;": 8364,
      "excl;": 33,
      "exist;": 8707,
      "expectation;": 8496,
      "exponentiale;": 8519,
      "fallingdotseq;": 8786,
      "fcy;": 1092,
      "female;": 9792,
      "ffilig;": 64259,
      "fflig;": 64256,
      "ffllig;": 64260,
      "ffr;": [55349, 56611],
      "filig;": 64257,
      "fjlig;": [102, 106],
      "flat;": 9837,
      "fllig;": 64258,
      "fltns;": 9649,
      "fnof;": 402,
      "fopf;": [55349, 56663],
      "forall;": 8704,
      "fork;": 8916,
      "forkv;": 10969,
      "fpartint;": 10765,
      frac12: 189,
      "frac12;": 189,
      "frac13;": 8531,
      frac14: 188,
      "frac14;": 188,
      "frac15;": 8533,
      "frac16;": 8537,
      "frac18;": 8539,
      "frac23;": 8532,
      "frac25;": 8534,
      frac34: 190,
      "frac34;": 190,
      "frac35;": 8535,
      "frac38;": 8540,
      "frac45;": 8536,
      "frac56;": 8538,
      "frac58;": 8541,
      "frac78;": 8542,
      "frasl;": 8260,
      "frown;": 8994,
      "fscr;": [55349, 56507],
      "gE;": 8807,
      "gEl;": 10892,
      "gacute;": 501,
      "gamma;": 947,
      "gammad;": 989,
      "gap;": 10886,
      "gbreve;": 287,
      "gcirc;": 285,
      "gcy;": 1075,
      "gdot;": 289,
      "ge;": 8805,
      "gel;": 8923,
      "geq;": 8805,
      "geqq;": 8807,
      "geqslant;": 10878,
      "ges;": 10878,
      "gescc;": 10921,
      "gesdot;": 10880,
      "gesdoto;": 10882,
      "gesdotol;": 10884,
      "gesl;": [8923, 65024],
      "gesles;": 10900,
      "gfr;": [55349, 56612],
      "gg;": 8811,
      "ggg;": 8921,
      "gimel;": 8503,
      "gjcy;": 1107,
      "gl;": 8823,
      "glE;": 10898,
      "gla;": 10917,
      "glj;": 10916,
      "gnE;": 8809,
      "gnap;": 10890,
      "gnapprox;": 10890,
      "gne;": 10888,
      "gneq;": 10888,
      "gneqq;": 8809,
      "gnsim;": 8935,
      "gopf;": [55349, 56664],
      "grave;": 96,
      "gscr;": 8458,
      "gsim;": 8819,
      "gsime;": 10894,
      "gsiml;": 10896,
      gt: 62,
      "gt;": 62,
      "gtcc;": 10919,
      "gtcir;": 10874,
      "gtdot;": 8919,
      "gtlPar;": 10645,
      "gtquest;": 10876,
      "gtrapprox;": 10886,
      "gtrarr;": 10616,
      "gtrdot;": 8919,
      "gtreqless;": 8923,
      "gtreqqless;": 10892,
      "gtrless;": 8823,
      "gtrsim;": 8819,
      "gvertneqq;": [8809, 65024],
      "gvnE;": [8809, 65024],
      "hArr;": 8660,
      "hairsp;": 8202,
      "half;": 189,
      "hamilt;": 8459,
      "hardcy;": 1098,
      "harr;": 8596,
      "harrcir;": 10568,
      "harrw;": 8621,
      "hbar;": 8463,
      "hcirc;": 293,
      "hearts;": 9829,
      "heartsuit;": 9829,
      "hellip;": 8230,
      "hercon;": 8889,
      "hfr;": [55349, 56613],
      "hksearow;": 10533,
      "hkswarow;": 10534,
      "hoarr;": 8703,
      "homtht;": 8763,
      "hookleftarrow;": 8617,
      "hookrightarrow;": 8618,
      "hopf;": [55349, 56665],
      "horbar;": 8213,
      "hscr;": [55349, 56509],
      "hslash;": 8463,
      "hstrok;": 295,
      "hybull;": 8259,
      "hyphen;": 8208,
      iacute: 237,
      "iacute;": 237,
      "ic;": 8291,
      icirc: 238,
      "icirc;": 238,
      "icy;": 1080,
      "iecy;": 1077,
      iexcl: 161,
      "iexcl;": 161,
      "iff;": 8660,
      "ifr;": [55349, 56614],
      igrave: 236,
      "igrave;": 236,
      "ii;": 8520,
      "iiiint;": 10764,
      "iiint;": 8749,
      "iinfin;": 10716,
      "iiota;": 8489,
      "ijlig;": 307,
      "imacr;": 299,
      "image;": 8465,
      "imagline;": 8464,
      "imagpart;": 8465,
      "imath;": 305,
      "imof;": 8887,
      "imped;": 437,
      "in;": 8712,
      "incare;": 8453,
      "infin;": 8734,
      "infintie;": 10717,
      "inodot;": 305,
      "int;": 8747,
      "intcal;": 8890,
      "integers;": 8484,
      "intercal;": 8890,
      "intlarhk;": 10775,
      "intprod;": 10812,
      "iocy;": 1105,
      "iogon;": 303,
      "iopf;": [55349, 56666],
      "iota;": 953,
      "iprod;": 10812,
      iquest: 191,
      "iquest;": 191,
      "iscr;": [55349, 56510],
      "isin;": 8712,
      "isinE;": 8953,
      "isindot;": 8949,
      "isins;": 8948,
      "isinsv;": 8947,
      "isinv;": 8712,
      "it;": 8290,
      "itilde;": 297,
      "iukcy;": 1110,
      iuml: 239,
      "iuml;": 239,
      "jcirc;": 309,
      "jcy;": 1081,
      "jfr;": [55349, 56615],
      "jmath;": 567,
      "jopf;": [55349, 56667],
      "jscr;": [55349, 56511],
      "jsercy;": 1112,
      "jukcy;": 1108,
      "kappa;": 954,
      "kappav;": 1008,
      "kcedil;": 311,
      "kcy;": 1082,
      "kfr;": [55349, 56616],
      "kgreen;": 312,
      "khcy;": 1093,
      "kjcy;": 1116,
      "kopf;": [55349, 56668],
      "kscr;": [55349, 56512],
      "lAarr;": 8666,
      "lArr;": 8656,
      "lAtail;": 10523,
      "lBarr;": 10510,
      "lE;": 8806,
      "lEg;": 10891,
      "lHar;": 10594,
      "lacute;": 314,
      "laemptyv;": 10676,
      "lagran;": 8466,
      "lambda;": 955,
      "lang;": 10216,
      "langd;": 10641,
      "langle;": 10216,
      "lap;": 10885,
      laquo: 171,
      "laquo;": 171,
      "larr;": 8592,
      "larrb;": 8676,
      "larrbfs;": 10527,
      "larrfs;": 10525,
      "larrhk;": 8617,
      "larrlp;": 8619,
      "larrpl;": 10553,
      "larrsim;": 10611,
      "larrtl;": 8610,
      "lat;": 10923,
      "latail;": 10521,
      "late;": 10925,
      "lates;": [10925, 65024],
      "lbarr;": 10508,
      "lbbrk;": 10098,
      "lbrace;": 123,
      "lbrack;": 91,
      "lbrke;": 10635,
      "lbrksld;": 10639,
      "lbrkslu;": 10637,
      "lcaron;": 318,
      "lcedil;": 316,
      "lceil;": 8968,
      "lcub;": 123,
      "lcy;": 1083,
      "ldca;": 10550,
      "ldquo;": 8220,
      "ldquor;": 8222,
      "ldrdhar;": 10599,
      "ldrushar;": 10571,
      "ldsh;": 8626,
      "le;": 8804,
      "leftarrow;": 8592,
      "leftarrowtail;": 8610,
      "leftharpoondown;": 8637,
      "leftharpoonup;": 8636,
      "leftleftarrows;": 8647,
      "leftrightarrow;": 8596,
      "leftrightarrows;": 8646,
      "leftrightharpoons;": 8651,
      "leftrightsquigarrow;": 8621,
      "leftthreetimes;": 8907,
      "leg;": 8922,
      "leq;": 8804,
      "leqq;": 8806,
      "leqslant;": 10877,
      "les;": 10877,
      "lescc;": 10920,
      "lesdot;": 10879,
      "lesdoto;": 10881,
      "lesdotor;": 10883,
      "lesg;": [8922, 65024],
      "lesges;": 10899,
      "lessapprox;": 10885,
      "lessdot;": 8918,
      "lesseqgtr;": 8922,
      "lesseqqgtr;": 10891,
      "lessgtr;": 8822,
      "lesssim;": 8818,
      "lfisht;": 10620,
      "lfloor;": 8970,
      "lfr;": [55349, 56617],
      "lg;": 8822,
      "lgE;": 10897,
      "lhard;": 8637,
      "lharu;": 8636,
      "lharul;": 10602,
      "lhblk;": 9604,
      "ljcy;": 1113,
      "ll;": 8810,
      "llarr;": 8647,
      "llcorner;": 8990,
      "llhard;": 10603,
      "lltri;": 9722,
      "lmidot;": 320,
      "lmoust;": 9136,
      "lmoustache;": 9136,
      "lnE;": 8808,
      "lnap;": 10889,
      "lnapprox;": 10889,
      "lne;": 10887,
      "lneq;": 10887,
      "lneqq;": 8808,
      "lnsim;": 8934,
      "loang;": 10220,
      "loarr;": 8701,
      "lobrk;": 10214,
      "longleftarrow;": 10229,
      "longleftrightarrow;": 10231,
      "longmapsto;": 10236,
      "longrightarrow;": 10230,
      "looparrowleft;": 8619,
      "looparrowright;": 8620,
      "lopar;": 10629,
      "lopf;": [55349, 56669],
      "loplus;": 10797,
      "lotimes;": 10804,
      "lowast;": 8727,
      "lowbar;": 95,
      "loz;": 9674,
      "lozenge;": 9674,
      "lozf;": 10731,
      "lpar;": 40,
      "lparlt;": 10643,
      "lrarr;": 8646,
      "lrcorner;": 8991,
      "lrhar;": 8651,
      "lrhard;": 10605,
      "lrm;": 8206,
      "lrtri;": 8895,
      "lsaquo;": 8249,
      "lscr;": [55349, 56513],
      "lsh;": 8624,
      "lsim;": 8818,
      "lsime;": 10893,
      "lsimg;": 10895,
      "lsqb;": 91,
      "lsquo;": 8216,
      "lsquor;": 8218,
      "lstrok;": 322,
      lt: 60,
      "lt;": 60,
      "ltcc;": 10918,
      "ltcir;": 10873,
      "ltdot;": 8918,
      "lthree;": 8907,
      "ltimes;": 8905,
      "ltlarr;": 10614,
      "ltquest;": 10875,
      "ltrPar;": 10646,
      "ltri;": 9667,
      "ltrie;": 8884,
      "ltrif;": 9666,
      "lurdshar;": 10570,
      "luruhar;": 10598,
      "lvertneqq;": [8808, 65024],
      "lvnE;": [8808, 65024],
      "mDDot;": 8762,
      macr: 175,
      "macr;": 175,
      "male;": 9794,
      "malt;": 10016,
      "maltese;": 10016,
      "map;": 8614,
      "mapsto;": 8614,
      "mapstodown;": 8615,
      "mapstoleft;": 8612,
      "mapstoup;": 8613,
      "marker;": 9646,
      "mcomma;": 10793,
      "mcy;": 1084,
      "mdash;": 8212,
      "measuredangle;": 8737,
      "mfr;": [55349, 56618],
      "mho;": 8487,
      micro: 181,
      "micro;": 181,
      "mid;": 8739,
      "midast;": 42,
      "midcir;": 10992,
      middot: 183,
      "middot;": 183,
      "minus;": 8722,
      "minusb;": 8863,
      "minusd;": 8760,
      "minusdu;": 10794,
      "mlcp;": 10971,
      "mldr;": 8230,
      "mnplus;": 8723,
      "models;": 8871,
      "mopf;": [55349, 56670],
      "mp;": 8723,
      "mscr;": [55349, 56514],
      "mstpos;": 8766,
      "mu;": 956,
      "multimap;": 8888,
      "mumap;": 8888,
      "nGg;": [8921, 824],
      "nGt;": [8811, 8402],
      "nGtv;": [8811, 824],
      "nLeftarrow;": 8653,
      "nLeftrightarrow;": 8654,
      "nLl;": [8920, 824],
      "nLt;": [8810, 8402],
      "nLtv;": [8810, 824],
      "nRightarrow;": 8655,
      "nVDash;": 8879,
      "nVdash;": 8878,
      "nabla;": 8711,
      "nacute;": 324,
      "nang;": [8736, 8402],
      "nap;": 8777,
      "napE;": [10864, 824],
      "napid;": [8779, 824],
      "napos;": 329,
      "napprox;": 8777,
      "natur;": 9838,
      "natural;": 9838,
      "naturals;": 8469,
      nbsp: 160,
      "nbsp;": 160,
      "nbump;": [8782, 824],
      "nbumpe;": [8783, 824],
      "ncap;": 10819,
      "ncaron;": 328,
      "ncedil;": 326,
      "ncong;": 8775,
      "ncongdot;": [10861, 824],
      "ncup;": 10818,
      "ncy;": 1085,
      "ndash;": 8211,
      "ne;": 8800,
      "neArr;": 8663,
      "nearhk;": 10532,
      "nearr;": 8599,
      "nearrow;": 8599,
      "nedot;": [8784, 824],
      "nequiv;": 8802,
      "nesear;": 10536,
      "nesim;": [8770, 824],
      "nexist;": 8708,
      "nexists;": 8708,
      "nfr;": [55349, 56619],
      "ngE;": [8807, 824],
      "nge;": 8817,
      "ngeq;": 8817,
      "ngeqq;": [8807, 824],
      "ngeqslant;": [10878, 824],
      "nges;": [10878, 824],
      "ngsim;": 8821,
      "ngt;": 8815,
      "ngtr;": 8815,
      "nhArr;": 8654,
      "nharr;": 8622,
      "nhpar;": 10994,
      "ni;": 8715,
      "nis;": 8956,
      "nisd;": 8954,
      "niv;": 8715,
      "njcy;": 1114,
      "nlArr;": 8653,
      "nlE;": [8806, 824],
      "nlarr;": 8602,
      "nldr;": 8229,
      "nle;": 8816,
      "nleftarrow;": 8602,
      "nleftrightarrow;": 8622,
      "nleq;": 8816,
      "nleqq;": [8806, 824],
      "nleqslant;": [10877, 824],
      "nles;": [10877, 824],
      "nless;": 8814,
      "nlsim;": 8820,
      "nlt;": 8814,
      "nltri;": 8938,
      "nltrie;": 8940,
      "nmid;": 8740,
      "nopf;": [55349, 56671],
      not: 172,
      "not;": 172,
      "notin;": 8713,
      "notinE;": [8953, 824],
      "notindot;": [8949, 824],
      "notinva;": 8713,
      "notinvb;": 8951,
      "notinvc;": 8950,
      "notni;": 8716,
      "notniva;": 8716,
      "notnivb;": 8958,
      "notnivc;": 8957,
      "npar;": 8742,
      "nparallel;": 8742,
      "nparsl;": [11005, 8421],
      "npart;": [8706, 824],
      "npolint;": 10772,
      "npr;": 8832,
      "nprcue;": 8928,
      "npre;": [10927, 824],
      "nprec;": 8832,
      "npreceq;": [10927, 824],
      "nrArr;": 8655,
      "nrarr;": 8603,
      "nrarrc;": [10547, 824],
      "nrarrw;": [8605, 824],
      "nrightarrow;": 8603,
      "nrtri;": 8939,
      "nrtrie;": 8941,
      "nsc;": 8833,
      "nsccue;": 8929,
      "nsce;": [10928, 824],
      "nscr;": [55349, 56515],
      "nshortmid;": 8740,
      "nshortparallel;": 8742,
      "nsim;": 8769,
      "nsime;": 8772,
      "nsimeq;": 8772,
      "nsmid;": 8740,
      "nspar;": 8742,
      "nsqsube;": 8930,
      "nsqsupe;": 8931,
      "nsub;": 8836,
      "nsubE;": [10949, 824],
      "nsube;": 8840,
      "nsubset;": [8834, 8402],
      "nsubseteq;": 8840,
      "nsubseteqq;": [10949, 824],
      "nsucc;": 8833,
      "nsucceq;": [10928, 824],
      "nsup;": 8837,
      "nsupE;": [10950, 824],
      "nsupe;": 8841,
      "nsupset;": [8835, 8402],
      "nsupseteq;": 8841,
      "nsupseteqq;": [10950, 824],
      "ntgl;": 8825,
      ntilde: 241,
      "ntilde;": 241,
      "ntlg;": 8824,
      "ntriangleleft;": 8938,
      "ntrianglelefteq;": 8940,
      "ntriangleright;": 8939,
      "ntrianglerighteq;": 8941,
      "nu;": 957,
      "num;": 35,
      "numero;": 8470,
      "numsp;": 8199,
      "nvDash;": 8877,
      "nvHarr;": 10500,
      "nvap;": [8781, 8402],
      "nvdash;": 8876,
      "nvge;": [8805, 8402],
      "nvgt;": [62, 8402],
      "nvinfin;": 10718,
      "nvlArr;": 10498,
      "nvle;": [8804, 8402],
      "nvlt;": [60, 8402],
      "nvltrie;": [8884, 8402],
      "nvrArr;": 10499,
      "nvrtrie;": [8885, 8402],
      "nvsim;": [8764, 8402],
      "nwArr;": 8662,
      "nwarhk;": 10531,
      "nwarr;": 8598,
      "nwarrow;": 8598,
      "nwnear;": 10535,
      "oS;": 9416,
      oacute: 243,
      "oacute;": 243,
      "oast;": 8859,
      "ocir;": 8858,
      ocirc: 244,
      "ocirc;": 244,
      "ocy;": 1086,
      "odash;": 8861,
      "odblac;": 337,
      "odiv;": 10808,
      "odot;": 8857,
      "odsold;": 10684,
      "oelig;": 339,
      "ofcir;": 10687,
      "ofr;": [55349, 56620],
      "ogon;": 731,
      ograve: 242,
      "ograve;": 242,
      "ogt;": 10689,
      "ohbar;": 10677,
      "ohm;": 937,
      "oint;": 8750,
      "olarr;": 8634,
      "olcir;": 10686,
      "olcross;": 10683,
      "oline;": 8254,
      "olt;": 10688,
      "omacr;": 333,
      "omega;": 969,
      "omicron;": 959,
      "omid;": 10678,
      "ominus;": 8854,
      "oopf;": [55349, 56672],
      "opar;": 10679,
      "operp;": 10681,
      "oplus;": 8853,
      "or;": 8744,
      "orarr;": 8635,
      "ord;": 10845,
      "order;": 8500,
      "orderof;": 8500,
      ordf: 170,
      "ordf;": 170,
      ordm: 186,
      "ordm;": 186,
      "origof;": 8886,
      "oror;": 10838,
      "orslope;": 10839,
      "orv;": 10843,
      "oscr;": 8500,
      oslash: 248,
      "oslash;": 248,
      "osol;": 8856,
      otilde: 245,
      "otilde;": 245,
      "otimes;": 8855,
      "otimesas;": 10806,
      ouml: 246,
      "ouml;": 246,
      "ovbar;": 9021,
      "par;": 8741,
      para: 182,
      "para;": 182,
      "parallel;": 8741,
      "parsim;": 10995,
      "parsl;": 11005,
      "part;": 8706,
      "pcy;": 1087,
      "percnt;": 37,
      "period;": 46,
      "permil;": 8240,
      "perp;": 8869,
      "pertenk;": 8241,
      "pfr;": [55349, 56621],
      "phi;": 966,
      "phiv;": 981,
      "phmmat;": 8499,
      "phone;": 9742,
      "pi;": 960,
      "pitchfork;": 8916,
      "piv;": 982,
      "planck;": 8463,
      "planckh;": 8462,
      "plankv;": 8463,
      "plus;": 43,
      "plusacir;": 10787,
      "plusb;": 8862,
      "pluscir;": 10786,
      "plusdo;": 8724,
      "plusdu;": 10789,
      "pluse;": 10866,
      plusmn: 177,
      "plusmn;": 177,
      "plussim;": 10790,
      "plustwo;": 10791,
      "pm;": 177,
      "pointint;": 10773,
      "popf;": [55349, 56673],
      pound: 163,
      "pound;": 163,
      "pr;": 8826,
      "prE;": 10931,
      "prap;": 10935,
      "prcue;": 8828,
      "pre;": 10927,
      "prec;": 8826,
      "precapprox;": 10935,
      "preccurlyeq;": 8828,
      "preceq;": 10927,
      "precnapprox;": 10937,
      "precneqq;": 10933,
      "precnsim;": 8936,
      "precsim;": 8830,
      "prime;": 8242,
      "primes;": 8473,
      "prnE;": 10933,
      "prnap;": 10937,
      "prnsim;": 8936,
      "prod;": 8719,
      "profalar;": 9006,
      "profline;": 8978,
      "profsurf;": 8979,
      "prop;": 8733,
      "propto;": 8733,
      "prsim;": 8830,
      "prurel;": 8880,
      "pscr;": [55349, 56517],
      "psi;": 968,
      "puncsp;": 8200,
      "qfr;": [55349, 56622],
      "qint;": 10764,
      "qopf;": [55349, 56674],
      "qprime;": 8279,
      "qscr;": [55349, 56518],
      "quaternions;": 8461,
      "quatint;": 10774,
      "quest;": 63,
      "questeq;": 8799,
      quot: 34,
      "quot;": 34,
      "rAarr;": 8667,
      "rArr;": 8658,
      "rAtail;": 10524,
      "rBarr;": 10511,
      "rHar;": 10596,
      "race;": [8765, 817],
      "racute;": 341,
      "radic;": 8730,
      "raemptyv;": 10675,
      "rang;": 10217,
      "rangd;": 10642,
      "range;": 10661,
      "rangle;": 10217,
      raquo: 187,
      "raquo;": 187,
      "rarr;": 8594,
      "rarrap;": 10613,
      "rarrb;": 8677,
      "rarrbfs;": 10528,
      "rarrc;": 10547,
      "rarrfs;": 10526,
      "rarrhk;": 8618,
      "rarrlp;": 8620,
      "rarrpl;": 10565,
      "rarrsim;": 10612,
      "rarrtl;": 8611,
      "rarrw;": 8605,
      "ratail;": 10522,
      "ratio;": 8758,
      "rationals;": 8474,
      "rbarr;": 10509,
      "rbbrk;": 10099,
      "rbrace;": 125,
      "rbrack;": 93,
      "rbrke;": 10636,
      "rbrksld;": 10638,
      "rbrkslu;": 10640,
      "rcaron;": 345,
      "rcedil;": 343,
      "rceil;": 8969,
      "rcub;": 125,
      "rcy;": 1088,
      "rdca;": 10551,
      "rdldhar;": 10601,
      "rdquo;": 8221,
      "rdquor;": 8221,
      "rdsh;": 8627,
      "real;": 8476,
      "realine;": 8475,
      "realpart;": 8476,
      "reals;": 8477,
      "rect;": 9645,
      reg: 174,
      "reg;": 174,
      "rfisht;": 10621,
      "rfloor;": 8971,
      "rfr;": [55349, 56623],
      "rhard;": 8641,
      "rharu;": 8640,
      "rharul;": 10604,
      "rho;": 961,
      "rhov;": 1009,
      "rightarrow;": 8594,
      "rightarrowtail;": 8611,
      "rightharpoondown;": 8641,
      "rightharpoonup;": 8640,
      "rightleftarrows;": 8644,
      "rightleftharpoons;": 8652,
      "rightrightarrows;": 8649,
      "rightsquigarrow;": 8605,
      "rightthreetimes;": 8908,
      "ring;": 730,
      "risingdotseq;": 8787,
      "rlarr;": 8644,
      "rlhar;": 8652,
      "rlm;": 8207,
      "rmoust;": 9137,
      "rmoustache;": 9137,
      "rnmid;": 10990,
      "roang;": 10221,
      "roarr;": 8702,
      "robrk;": 10215,
      "ropar;": 10630,
      "ropf;": [55349, 56675],
      "roplus;": 10798,
      "rotimes;": 10805,
      "rpar;": 41,
      "rpargt;": 10644,
      "rppolint;": 10770,
      "rrarr;": 8649,
      "rsaquo;": 8250,
      "rscr;": [55349, 56519],
      "rsh;": 8625,
      "rsqb;": 93,
      "rsquo;": 8217,
      "rsquor;": 8217,
      "rthree;": 8908,
      "rtimes;": 8906,
      "rtri;": 9657,
      "rtrie;": 8885,
      "rtrif;": 9656,
      "rtriltri;": 10702,
      "ruluhar;": 10600,
      "rx;": 8478,
      "sacute;": 347,
      "sbquo;": 8218,
      "sc;": 8827,
      "scE;": 10932,
      "scap;": 10936,
      "scaron;": 353,
      "sccue;": 8829,
      "sce;": 10928,
      "scedil;": 351,
      "scirc;": 349,
      "scnE;": 10934,
      "scnap;": 10938,
      "scnsim;": 8937,
      "scpolint;": 10771,
      "scsim;": 8831,
      "scy;": 1089,
      "sdot;": 8901,
      "sdotb;": 8865,
      "sdote;": 10854,
      "seArr;": 8664,
      "searhk;": 10533,
      "searr;": 8600,
      "searrow;": 8600,
      sect: 167,
      "sect;": 167,
      "semi;": 59,
      "seswar;": 10537,
      "setminus;": 8726,
      "setmn;": 8726,
      "sext;": 10038,
      "sfr;": [55349, 56624],
      "sfrown;": 8994,
      "sharp;": 9839,
      "shchcy;": 1097,
      "shcy;": 1096,
      "shortmid;": 8739,
      "shortparallel;": 8741,
      shy: 173,
      "shy;": 173,
      "sigma;": 963,
      "sigmaf;": 962,
      "sigmav;": 962,
      "sim;": 8764,
      "simdot;": 10858,
      "sime;": 8771,
      "simeq;": 8771,
      "simg;": 10910,
      "simgE;": 10912,
      "siml;": 10909,
      "simlE;": 10911,
      "simne;": 8774,
      "simplus;": 10788,
      "simrarr;": 10610,
      "slarr;": 8592,
      "smallsetminus;": 8726,
      "smashp;": 10803,
      "smeparsl;": 10724,
      "smid;": 8739,
      "smile;": 8995,
      "smt;": 10922,
      "smte;": 10924,
      "smtes;": [10924, 65024],
      "softcy;": 1100,
      "sol;": 47,
      "solb;": 10692,
      "solbar;": 9023,
      "sopf;": [55349, 56676],
      "spades;": 9824,
      "spadesuit;": 9824,
      "spar;": 8741,
      "sqcap;": 8851,
      "sqcaps;": [8851, 65024],
      "sqcup;": 8852,
      "sqcups;": [8852, 65024],
      "sqsub;": 8847,
      "sqsube;": 8849,
      "sqsubset;": 8847,
      "sqsubseteq;": 8849,
      "sqsup;": 8848,
      "sqsupe;": 8850,
      "sqsupset;": 8848,
      "sqsupseteq;": 8850,
      "squ;": 9633,
      "square;": 9633,
      "squarf;": 9642,
      "squf;": 9642,
      "srarr;": 8594,
      "sscr;": [55349, 56520],
      "ssetmn;": 8726,
      "ssmile;": 8995,
      "sstarf;": 8902,
      "star;": 9734,
      "starf;": 9733,
      "straightepsilon;": 1013,
      "straightphi;": 981,
      "strns;": 175,
      "sub;": 8834,
      "subE;": 10949,
      "subdot;": 10941,
      "sube;": 8838,
      "subedot;": 10947,
      "submult;": 10945,
      "subnE;": 10955,
      "subne;": 8842,
      "subplus;": 10943,
      "subrarr;": 10617,
      "subset;": 8834,
      "subseteq;": 8838,
      "subseteqq;": 10949,
      "subsetneq;": 8842,
      "subsetneqq;": 10955,
      "subsim;": 10951,
      "subsub;": 10965,
      "subsup;": 10963,
      "succ;": 8827,
      "succapprox;": 10936,
      "succcurlyeq;": 8829,
      "succeq;": 10928,
      "succnapprox;": 10938,
      "succneqq;": 10934,
      "succnsim;": 8937,
      "succsim;": 8831,
      "sum;": 8721,
      "sung;": 9834,
      sup1: 185,
      "sup1;": 185,
      sup2: 178,
      "sup2;": 178,
      sup3: 179,
      "sup3;": 179,
      "sup;": 8835,
      "supE;": 10950,
      "supdot;": 10942,
      "supdsub;": 10968,
      "supe;": 8839,
      "supedot;": 10948,
      "suphsol;": 10185,
      "suphsub;": 10967,
      "suplarr;": 10619,
      "supmult;": 10946,
      "supnE;": 10956,
      "supne;": 8843,
      "supplus;": 10944,
      "supset;": 8835,
      "supseteq;": 8839,
      "supseteqq;": 10950,
      "supsetneq;": 8843,
      "supsetneqq;": 10956,
      "supsim;": 10952,
      "supsub;": 10964,
      "supsup;": 10966,
      "swArr;": 8665,
      "swarhk;": 10534,
      "swarr;": 8601,
      "swarrow;": 8601,
      "swnwar;": 10538,
      szlig: 223,
      "szlig;": 223,
      "target;": 8982,
      "tau;": 964,
      "tbrk;": 9140,
      "tcaron;": 357,
      "tcedil;": 355,
      "tcy;": 1090,
      "tdot;": 8411,
      "telrec;": 8981,
      "tfr;": [55349, 56625],
      "there4;": 8756,
      "therefore;": 8756,
      "theta;": 952,
      "thetasym;": 977,
      "thetav;": 977,
      "thickapprox;": 8776,
      "thicksim;": 8764,
      "thinsp;": 8201,
      "thkap;": 8776,
      "thksim;": 8764,
      thorn: 254,
      "thorn;": 254,
      "tilde;": 732,
      times: 215,
      "times;": 215,
      "timesb;": 8864,
      "timesbar;": 10801,
      "timesd;": 10800,
      "tint;": 8749,
      "toea;": 10536,
      "top;": 8868,
      "topbot;": 9014,
      "topcir;": 10993,
      "topf;": [55349, 56677],
      "topfork;": 10970,
      "tosa;": 10537,
      "tprime;": 8244,
      "trade;": 8482,
      "triangle;": 9653,
      "triangledown;": 9663,
      "triangleleft;": 9667,
      "trianglelefteq;": 8884,
      "triangleq;": 8796,
      "triangleright;": 9657,
      "trianglerighteq;": 8885,
      "tridot;": 9708,
      "trie;": 8796,
      "triminus;": 10810,
      "triplus;": 10809,
      "trisb;": 10701,
      "tritime;": 10811,
      "trpezium;": 9186,
      "tscr;": [55349, 56521],
      "tscy;": 1094,
      "tshcy;": 1115,
      "tstrok;": 359,
      "twixt;": 8812,
      "twoheadleftarrow;": 8606,
      "twoheadrightarrow;": 8608,
      "uArr;": 8657,
      "uHar;": 10595,
      uacute: 250,
      "uacute;": 250,
      "uarr;": 8593,
      "ubrcy;": 1118,
      "ubreve;": 365,
      ucirc: 251,
      "ucirc;": 251,
      "ucy;": 1091,
      "udarr;": 8645,
      "udblac;": 369,
      "udhar;": 10606,
      "ufisht;": 10622,
      "ufr;": [55349, 56626],
      ugrave: 249,
      "ugrave;": 249,
      "uharl;": 8639,
      "uharr;": 8638,
      "uhblk;": 9600,
      "ulcorn;": 8988,
      "ulcorner;": 8988,
      "ulcrop;": 8975,
      "ultri;": 9720,
      "umacr;": 363,
      uml: 168,
      "uml;": 168,
      "uogon;": 371,
      "uopf;": [55349, 56678],
      "uparrow;": 8593,
      "updownarrow;": 8597,
      "upharpoonleft;": 8639,
      "upharpoonright;": 8638,
      "uplus;": 8846,
      "upsi;": 965,
      "upsih;": 978,
      "upsilon;": 965,
      "upuparrows;": 8648,
      "urcorn;": 8989,
      "urcorner;": 8989,
      "urcrop;": 8974,
      "uring;": 367,
      "urtri;": 9721,
      "uscr;": [55349, 56522],
      "utdot;": 8944,
      "utilde;": 361,
      "utri;": 9653,
      "utrif;": 9652,
      "uuarr;": 8648,
      uuml: 252,
      "uuml;": 252,
      "uwangle;": 10663,
      "vArr;": 8661,
      "vBar;": 10984,
      "vBarv;": 10985,
      "vDash;": 8872,
      "vangrt;": 10652,
      "varepsilon;": 1013,
      "varkappa;": 1008,
      "varnothing;": 8709,
      "varphi;": 981,
      "varpi;": 982,
      "varpropto;": 8733,
      "varr;": 8597,
      "varrho;": 1009,
      "varsigma;": 962,
      "varsubsetneq;": [8842, 65024],
      "varsubsetneqq;": [10955, 65024],
      "varsupsetneq;": [8843, 65024],
      "varsupsetneqq;": [10956, 65024],
      "vartheta;": 977,
      "vartriangleleft;": 8882,
      "vartriangleright;": 8883,
      "vcy;": 1074,
      "vdash;": 8866,
      "vee;": 8744,
      "veebar;": 8891,
      "veeeq;": 8794,
      "vellip;": 8942,
      "verbar;": 124,
      "vert;": 124,
      "vfr;": [55349, 56627],
      "vltri;": 8882,
      "vnsub;": [8834, 8402],
      "vnsup;": [8835, 8402],
      "vopf;": [55349, 56679],
      "vprop;": 8733,
      "vrtri;": 8883,
      "vscr;": [55349, 56523],
      "vsubnE;": [10955, 65024],
      "vsubne;": [8842, 65024],
      "vsupnE;": [10956, 65024],
      "vsupne;": [8843, 65024],
      "vzigzag;": 10650,
      "wcirc;": 373,
      "wedbar;": 10847,
      "wedge;": 8743,
      "wedgeq;": 8793,
      "weierp;": 8472,
      "wfr;": [55349, 56628],
      "wopf;": [55349, 56680],
      "wp;": 8472,
      "wr;": 8768,
      "wreath;": 8768,
      "wscr;": [55349, 56524],
      "xcap;": 8898,
      "xcirc;": 9711,
      "xcup;": 8899,
      "xdtri;": 9661,
      "xfr;": [55349, 56629],
      "xhArr;": 10234,
      "xharr;": 10231,
      "xi;": 958,
      "xlArr;": 10232,
      "xlarr;": 10229,
      "xmap;": 10236,
      "xnis;": 8955,
      "xodot;": 10752,
      "xopf;": [55349, 56681],
      "xoplus;": 10753,
      "xotime;": 10754,
      "xrArr;": 10233,
      "xrarr;": 10230,
      "xscr;": [55349, 56525],
      "xsqcup;": 10758,
      "xuplus;": 10756,
      "xutri;": 9651,
      "xvee;": 8897,
      "xwedge;": 8896,
      yacute: 253,
      "yacute;": 253,
      "yacy;": 1103,
      "ycirc;": 375,
      "ycy;": 1099,
      yen: 165,
      "yen;": 165,
      "yfr;": [55349, 56630],
      "yicy;": 1111,
      "yopf;": [55349, 56682],
      "yscr;": [55349, 56526],
      "yucy;": 1102,
      yuml: 255,
      "yuml;": 255,
      "zacute;": 378,
      "zcaron;": 382,
      "zcy;": 1079,
      "zdot;": 380,
      "zeetrf;": 8488,
      "zeta;": 950,
      "zfr;": [55349, 56631],
      "zhcy;": 1078,
      "zigrarr;": 8669,
      "zopf;": [55349, 56683],
      "zscr;": [55349, 56527],
      "zwj;": 8205,
      "zwnj;": 8204
    };
    var NAMEDCHARREF = /(A(?:Elig;?|MP;?|acute;?|breve;|c(?:irc;?|y;)|fr;|grave;?|lpha;|macr;|nd;|o(?:gon;|pf;)|pplyFunction;|ring;?|s(?:cr;|sign;)|tilde;?|uml;?)|B(?:a(?:ckslash;|r(?:v;|wed;))|cy;|e(?:cause;|rnoullis;|ta;)|fr;|opf;|reve;|scr;|umpeq;)|C(?:Hcy;|OPY;?|a(?:cute;|p(?:;|italDifferentialD;)|yleys;)|c(?:aron;|edil;?|irc;|onint;)|dot;|e(?:dilla;|nterDot;)|fr;|hi;|ircle(?:Dot;|Minus;|Plus;|Times;)|lo(?:ckwiseContourIntegral;|seCurly(?:DoubleQuote;|Quote;))|o(?:lon(?:;|e;)|n(?:gruent;|int;|tourIntegral;)|p(?:f;|roduct;)|unterClockwiseContourIntegral;)|ross;|scr;|up(?:;|Cap;))|D(?:D(?:;|otrahd;)|Jcy;|Scy;|Zcy;|a(?:gger;|rr;|shv;)|c(?:aron;|y;)|el(?:;|ta;)|fr;|i(?:a(?:critical(?:Acute;|Do(?:t;|ubleAcute;)|Grave;|Tilde;)|mond;)|fferentialD;)|o(?:pf;|t(?:;|Dot;|Equal;)|uble(?:ContourIntegral;|Do(?:t;|wnArrow;)|L(?:eft(?:Arrow;|RightArrow;|Tee;)|ong(?:Left(?:Arrow;|RightArrow;)|RightArrow;))|Right(?:Arrow;|Tee;)|Up(?:Arrow;|DownArrow;)|VerticalBar;)|wn(?:Arrow(?:;|Bar;|UpArrow;)|Breve;|Left(?:RightVector;|TeeVector;|Vector(?:;|Bar;))|Right(?:TeeVector;|Vector(?:;|Bar;))|Tee(?:;|Arrow;)|arrow;))|s(?:cr;|trok;))|E(?:NG;|TH;?|acute;?|c(?:aron;|irc;?|y;)|dot;|fr;|grave;?|lement;|m(?:acr;|pty(?:SmallSquare;|VerySmallSquare;))|o(?:gon;|pf;)|psilon;|qu(?:al(?:;|Tilde;)|ilibrium;)|s(?:cr;|im;)|ta;|uml;?|x(?:ists;|ponentialE;))|F(?:cy;|fr;|illed(?:SmallSquare;|VerySmallSquare;)|o(?:pf;|rAll;|uriertrf;)|scr;)|G(?:Jcy;|T;?|amma(?:;|d;)|breve;|c(?:edil;|irc;|y;)|dot;|fr;|g;|opf;|reater(?:Equal(?:;|Less;)|FullEqual;|Greater;|Less;|SlantEqual;|Tilde;)|scr;|t;)|H(?:ARDcy;|a(?:cek;|t;)|circ;|fr;|ilbertSpace;|o(?:pf;|rizontalLine;)|s(?:cr;|trok;)|ump(?:DownHump;|Equal;))|I(?:Ecy;|Jlig;|Ocy;|acute;?|c(?:irc;?|y;)|dot;|fr;|grave;?|m(?:;|a(?:cr;|ginaryI;)|plies;)|n(?:t(?:;|e(?:gral;|rsection;))|visible(?:Comma;|Times;))|o(?:gon;|pf;|ta;)|scr;|tilde;|u(?:kcy;|ml;?))|J(?:c(?:irc;|y;)|fr;|opf;|s(?:cr;|ercy;)|ukcy;)|K(?:Hcy;|Jcy;|appa;|c(?:edil;|y;)|fr;|opf;|scr;)|L(?:Jcy;|T;?|a(?:cute;|mbda;|ng;|placetrf;|rr;)|c(?:aron;|edil;|y;)|e(?:ft(?:A(?:ngleBracket;|rrow(?:;|Bar;|RightArrow;))|Ceiling;|Do(?:ubleBracket;|wn(?:TeeVector;|Vector(?:;|Bar;)))|Floor;|Right(?:Arrow;|Vector;)|T(?:ee(?:;|Arrow;|Vector;)|riangle(?:;|Bar;|Equal;))|Up(?:DownVector;|TeeVector;|Vector(?:;|Bar;))|Vector(?:;|Bar;)|arrow;|rightarrow;)|ss(?:EqualGreater;|FullEqual;|Greater;|Less;|SlantEqual;|Tilde;))|fr;|l(?:;|eftarrow;)|midot;|o(?:ng(?:Left(?:Arrow;|RightArrow;)|RightArrow;|left(?:arrow;|rightarrow;)|rightarrow;)|pf;|wer(?:LeftArrow;|RightArrow;))|s(?:cr;|h;|trok;)|t;)|M(?:ap;|cy;|e(?:diumSpace;|llintrf;)|fr;|inusPlus;|opf;|scr;|u;)|N(?:Jcy;|acute;|c(?:aron;|edil;|y;)|e(?:gative(?:MediumSpace;|Thi(?:ckSpace;|nSpace;)|VeryThinSpace;)|sted(?:GreaterGreater;|LessLess;)|wLine;)|fr;|o(?:Break;|nBreakingSpace;|pf;|t(?:;|C(?:ongruent;|upCap;)|DoubleVerticalBar;|E(?:lement;|qual(?:;|Tilde;)|xists;)|Greater(?:;|Equal;|FullEqual;|Greater;|Less;|SlantEqual;|Tilde;)|Hump(?:DownHump;|Equal;)|Le(?:ftTriangle(?:;|Bar;|Equal;)|ss(?:;|Equal;|Greater;|Less;|SlantEqual;|Tilde;))|Nested(?:GreaterGreater;|LessLess;)|Precedes(?:;|Equal;|SlantEqual;)|R(?:everseElement;|ightTriangle(?:;|Bar;|Equal;))|S(?:quareSu(?:bset(?:;|Equal;)|perset(?:;|Equal;))|u(?:bset(?:;|Equal;)|cceeds(?:;|Equal;|SlantEqual;|Tilde;)|perset(?:;|Equal;)))|Tilde(?:;|Equal;|FullEqual;|Tilde;)|VerticalBar;))|scr;|tilde;?|u;)|O(?:Elig;|acute;?|c(?:irc;?|y;)|dblac;|fr;|grave;?|m(?:acr;|ega;|icron;)|opf;|penCurly(?:DoubleQuote;|Quote;)|r;|s(?:cr;|lash;?)|ti(?:lde;?|mes;)|uml;?|ver(?:B(?:ar;|rac(?:e;|ket;))|Parenthesis;))|P(?:artialD;|cy;|fr;|hi;|i;|lusMinus;|o(?:incareplane;|pf;)|r(?:;|ecedes(?:;|Equal;|SlantEqual;|Tilde;)|ime;|o(?:duct;|portion(?:;|al;)))|s(?:cr;|i;))|Q(?:UOT;?|fr;|opf;|scr;)|R(?:Barr;|EG;?|a(?:cute;|ng;|rr(?:;|tl;))|c(?:aron;|edil;|y;)|e(?:;|verse(?:E(?:lement;|quilibrium;)|UpEquilibrium;))|fr;|ho;|ight(?:A(?:ngleBracket;|rrow(?:;|Bar;|LeftArrow;))|Ceiling;|Do(?:ubleBracket;|wn(?:TeeVector;|Vector(?:;|Bar;)))|Floor;|T(?:ee(?:;|Arrow;|Vector;)|riangle(?:;|Bar;|Equal;))|Up(?:DownVector;|TeeVector;|Vector(?:;|Bar;))|Vector(?:;|Bar;)|arrow;)|o(?:pf;|undImplies;)|rightarrow;|s(?:cr;|h;)|uleDelayed;)|S(?:H(?:CHcy;|cy;)|OFTcy;|acute;|c(?:;|aron;|edil;|irc;|y;)|fr;|hort(?:DownArrow;|LeftArrow;|RightArrow;|UpArrow;)|igma;|mallCircle;|opf;|q(?:rt;|uare(?:;|Intersection;|Su(?:bset(?:;|Equal;)|perset(?:;|Equal;))|Union;))|scr;|tar;|u(?:b(?:;|set(?:;|Equal;))|c(?:ceeds(?:;|Equal;|SlantEqual;|Tilde;)|hThat;)|m;|p(?:;|erset(?:;|Equal;)|set;)))|T(?:HORN;?|RADE;|S(?:Hcy;|cy;)|a(?:b;|u;)|c(?:aron;|edil;|y;)|fr;|h(?:e(?:refore;|ta;)|i(?:ckSpace;|nSpace;))|ilde(?:;|Equal;|FullEqual;|Tilde;)|opf;|ripleDot;|s(?:cr;|trok;))|U(?:a(?:cute;?|rr(?:;|ocir;))|br(?:cy;|eve;)|c(?:irc;?|y;)|dblac;|fr;|grave;?|macr;|n(?:der(?:B(?:ar;|rac(?:e;|ket;))|Parenthesis;)|ion(?:;|Plus;))|o(?:gon;|pf;)|p(?:Arrow(?:;|Bar;|DownArrow;)|DownArrow;|Equilibrium;|Tee(?:;|Arrow;)|arrow;|downarrow;|per(?:LeftArrow;|RightArrow;)|si(?:;|lon;))|ring;|scr;|tilde;|uml;?)|V(?:Dash;|bar;|cy;|dash(?:;|l;)|e(?:e;|r(?:bar;|t(?:;|ical(?:Bar;|Line;|Separator;|Tilde;))|yThinSpace;))|fr;|opf;|scr;|vdash;)|W(?:circ;|edge;|fr;|opf;|scr;)|X(?:fr;|i;|opf;|scr;)|Y(?:Acy;|Icy;|Ucy;|acute;?|c(?:irc;|y;)|fr;|opf;|scr;|uml;)|Z(?:Hcy;|acute;|c(?:aron;|y;)|dot;|e(?:roWidthSpace;|ta;)|fr;|opf;|scr;)|a(?:acute;?|breve;|c(?:;|E;|d;|irc;?|ute;?|y;)|elig;?|f(?:;|r;)|grave;?|l(?:e(?:fsym;|ph;)|pha;)|m(?:a(?:cr;|lg;)|p;?)|n(?:d(?:;|and;|d;|slope;|v;)|g(?:;|e;|le;|msd(?:;|a(?:a;|b;|c;|d;|e;|f;|g;|h;))|rt(?:;|vb(?:;|d;))|s(?:ph;|t;)|zarr;))|o(?:gon;|pf;)|p(?:;|E;|acir;|e;|id;|os;|prox(?:;|eq;))|ring;?|s(?:cr;|t;|ymp(?:;|eq;))|tilde;?|uml;?|w(?:conint;|int;))|b(?:Not;|a(?:ck(?:cong;|epsilon;|prime;|sim(?:;|eq;))|r(?:vee;|wed(?:;|ge;)))|brk(?:;|tbrk;)|c(?:ong;|y;)|dquo;|e(?:caus(?:;|e;)|mptyv;|psi;|rnou;|t(?:a;|h;|ween;))|fr;|ig(?:c(?:ap;|irc;|up;)|o(?:dot;|plus;|times;)|s(?:qcup;|tar;)|triangle(?:down;|up;)|uplus;|vee;|wedge;)|karow;|l(?:a(?:ck(?:lozenge;|square;|triangle(?:;|down;|left;|right;))|nk;)|k(?:1(?:2;|4;)|34;)|ock;)|n(?:e(?:;|quiv;)|ot;)|o(?:pf;|t(?:;|tom;)|wtie;|x(?:D(?:L;|R;|l;|r;)|H(?:;|D;|U;|d;|u;)|U(?:L;|R;|l;|r;)|V(?:;|H;|L;|R;|h;|l;|r;)|box;|d(?:L;|R;|l;|r;)|h(?:;|D;|U;|d;|u;)|minus;|plus;|times;|u(?:L;|R;|l;|r;)|v(?:;|H;|L;|R;|h;|l;|r;)))|prime;|r(?:eve;|vbar;?)|s(?:cr;|emi;|im(?:;|e;)|ol(?:;|b;|hsub;))|u(?:ll(?:;|et;)|mp(?:;|E;|e(?:;|q;))))|c(?:a(?:cute;|p(?:;|and;|brcup;|c(?:ap;|up;)|dot;|s;)|r(?:et;|on;))|c(?:a(?:ps;|ron;)|edil;?|irc;|ups(?:;|sm;))|dot;|e(?:dil;?|mptyv;|nt(?:;|erdot;|))|fr;|h(?:cy;|eck(?:;|mark;)|i;)|ir(?:;|E;|c(?:;|eq;|le(?:arrow(?:left;|right;)|d(?:R;|S;|ast;|circ;|dash;)))|e;|fnint;|mid;|scir;)|lubs(?:;|uit;)|o(?:lon(?:;|e(?:;|q;))|m(?:ma(?:;|t;)|p(?:;|fn;|le(?:ment;|xes;)))|n(?:g(?:;|dot;)|int;)|p(?:f;|rod;|y(?:;|sr;|)))|r(?:arr;|oss;)|s(?:cr;|u(?:b(?:;|e;)|p(?:;|e;)))|tdot;|u(?:darr(?:l;|r;)|e(?:pr;|sc;)|larr(?:;|p;)|p(?:;|brcap;|c(?:ap;|up;)|dot;|or;|s;)|r(?:arr(?:;|m;)|ly(?:eq(?:prec;|succ;)|vee;|wedge;)|ren;?|vearrow(?:left;|right;))|vee;|wed;)|w(?:conint;|int;)|ylcty;)|d(?:Arr;|Har;|a(?:gger;|leth;|rr;|sh(?:;|v;))|b(?:karow;|lac;)|c(?:aron;|y;)|d(?:;|a(?:gger;|rr;)|otseq;)|e(?:g;?|lta;|mptyv;)|f(?:isht;|r;)|har(?:l;|r;)|i(?:am(?:;|ond(?:;|suit;)|s;)|e;|gamma;|sin;|v(?:;|ide(?:;|ontimes;|)|onx;))|jcy;|lc(?:orn;|rop;)|o(?:llar;|pf;|t(?:;|eq(?:;|dot;)|minus;|plus;|square;)|ublebarwedge;|wn(?:arrow;|downarrows;|harpoon(?:left;|right;)))|r(?:bkarow;|c(?:orn;|rop;))|s(?:c(?:r;|y;)|ol;|trok;)|t(?:dot;|ri(?:;|f;))|u(?:arr;|har;)|wangle;|z(?:cy;|igrarr;))|e(?:D(?:Dot;|ot;)|a(?:cute;?|ster;)|c(?:aron;|ir(?:;|c;?)|olon;|y;)|dot;|e;|f(?:Dot;|r;)|g(?:;|rave;?|s(?:;|dot;))|l(?:;|inters;|l;|s(?:;|dot;))|m(?:acr;|pty(?:;|set;|v;)|sp(?:1(?:3;|4;)|;))|n(?:g;|sp;)|o(?:gon;|pf;)|p(?:ar(?:;|sl;)|lus;|si(?:;|lon;|v;))|q(?:c(?:irc;|olon;)|s(?:im;|lant(?:gtr;|less;))|u(?:als;|est;|iv(?:;|DD;))|vparsl;)|r(?:Dot;|arr;)|s(?:cr;|dot;|im;)|t(?:a;|h;?)|u(?:ml;?|ro;)|x(?:cl;|ist;|p(?:ectation;|onentiale;)))|f(?:allingdotseq;|cy;|emale;|f(?:ilig;|l(?:ig;|lig;)|r;)|ilig;|jlig;|l(?:at;|lig;|tns;)|nof;|o(?:pf;|r(?:all;|k(?:;|v;)))|partint;|r(?:a(?:c(?:1(?:2;?|3;|4;?|5;|6;|8;)|2(?:3;|5;)|3(?:4;?|5;|8;)|45;|5(?:6;|8;)|78;)|sl;)|own;)|scr;)|g(?:E(?:;|l;)|a(?:cute;|mma(?:;|d;)|p;)|breve;|c(?:irc;|y;)|dot;|e(?:;|l;|q(?:;|q;|slant;)|s(?:;|cc;|dot(?:;|o(?:;|l;))|l(?:;|es;)))|fr;|g(?:;|g;)|imel;|jcy;|l(?:;|E;|a;|j;)|n(?:E;|ap(?:;|prox;)|e(?:;|q(?:;|q;))|sim;)|opf;|rave;|s(?:cr;|im(?:;|e;|l;))|t(?:;|c(?:c;|ir;)|dot;|lPar;|quest;|r(?:a(?:pprox;|rr;)|dot;|eq(?:less;|qless;)|less;|sim;)|)|v(?:ertneqq;|nE;))|h(?:Arr;|a(?:irsp;|lf;|milt;|r(?:dcy;|r(?:;|cir;|w;)))|bar;|circ;|e(?:arts(?:;|uit;)|llip;|rcon;)|fr;|ks(?:earow;|warow;)|o(?:arr;|mtht;|ok(?:leftarrow;|rightarrow;)|pf;|rbar;)|s(?:cr;|lash;|trok;)|y(?:bull;|phen;))|i(?:acute;?|c(?:;|irc;?|y;)|e(?:cy;|xcl;?)|f(?:f;|r;)|grave;?|i(?:;|i(?:int;|nt;)|nfin;|ota;)|jlig;|m(?:a(?:cr;|g(?:e;|line;|part;)|th;)|of;|ped;)|n(?:;|care;|fin(?:;|tie;)|odot;|t(?:;|cal;|e(?:gers;|rcal;)|larhk;|prod;))|o(?:cy;|gon;|pf;|ta;)|prod;|quest;?|s(?:cr;|in(?:;|E;|dot;|s(?:;|v;)|v;))|t(?:;|ilde;)|u(?:kcy;|ml;?))|j(?:c(?:irc;|y;)|fr;|math;|opf;|s(?:cr;|ercy;)|ukcy;)|k(?:appa(?:;|v;)|c(?:edil;|y;)|fr;|green;|hcy;|jcy;|opf;|scr;)|l(?:A(?:arr;|rr;|tail;)|Barr;|E(?:;|g;)|Har;|a(?:cute;|emptyv;|gran;|mbda;|ng(?:;|d;|le;)|p;|quo;?|rr(?:;|b(?:;|fs;)|fs;|hk;|lp;|pl;|sim;|tl;)|t(?:;|ail;|e(?:;|s;)))|b(?:arr;|brk;|r(?:ac(?:e;|k;)|k(?:e;|sl(?:d;|u;))))|c(?:aron;|e(?:dil;|il;)|ub;|y;)|d(?:ca;|quo(?:;|r;)|r(?:dhar;|ushar;)|sh;)|e(?:;|ft(?:arrow(?:;|tail;)|harpoon(?:down;|up;)|leftarrows;|right(?:arrow(?:;|s;)|harpoons;|squigarrow;)|threetimes;)|g;|q(?:;|q;|slant;)|s(?:;|cc;|dot(?:;|o(?:;|r;))|g(?:;|es;)|s(?:approx;|dot;|eq(?:gtr;|qgtr;)|gtr;|sim;)))|f(?:isht;|loor;|r;)|g(?:;|E;)|h(?:ar(?:d;|u(?:;|l;))|blk;)|jcy;|l(?:;|arr;|corner;|hard;|tri;)|m(?:idot;|oust(?:;|ache;))|n(?:E;|ap(?:;|prox;)|e(?:;|q(?:;|q;))|sim;)|o(?:a(?:ng;|rr;)|brk;|ng(?:left(?:arrow;|rightarrow;)|mapsto;|rightarrow;)|oparrow(?:left;|right;)|p(?:ar;|f;|lus;)|times;|w(?:ast;|bar;)|z(?:;|enge;|f;))|par(?:;|lt;)|r(?:arr;|corner;|har(?:;|d;)|m;|tri;)|s(?:aquo;|cr;|h;|im(?:;|e;|g;)|q(?:b;|uo(?:;|r;))|trok;)|t(?:;|c(?:c;|ir;)|dot;|hree;|imes;|larr;|quest;|r(?:Par;|i(?:;|e;|f;))|)|ur(?:dshar;|uhar;)|v(?:ertneqq;|nE;))|m(?:DDot;|a(?:cr;?|l(?:e;|t(?:;|ese;))|p(?:;|sto(?:;|down;|left;|up;))|rker;)|c(?:omma;|y;)|dash;|easuredangle;|fr;|ho;|i(?:cro;?|d(?:;|ast;|cir;|dot;?)|nus(?:;|b;|d(?:;|u;)))|l(?:cp;|dr;)|nplus;|o(?:dels;|pf;)|p;|s(?:cr;|tpos;)|u(?:;|ltimap;|map;))|n(?:G(?:g;|t(?:;|v;))|L(?:eft(?:arrow;|rightarrow;)|l;|t(?:;|v;))|Rightarrow;|V(?:Dash;|dash;)|a(?:bla;|cute;|ng;|p(?:;|E;|id;|os;|prox;)|tur(?:;|al(?:;|s;)))|b(?:sp;?|ump(?:;|e;))|c(?:a(?:p;|ron;)|edil;|ong(?:;|dot;)|up;|y;)|dash;|e(?:;|Arr;|ar(?:hk;|r(?:;|ow;))|dot;|quiv;|s(?:ear;|im;)|xist(?:;|s;))|fr;|g(?:E;|e(?:;|q(?:;|q;|slant;)|s;)|sim;|t(?:;|r;))|h(?:Arr;|arr;|par;)|i(?:;|s(?:;|d;)|v;)|jcy;|l(?:Arr;|E;|arr;|dr;|e(?:;|ft(?:arrow;|rightarrow;)|q(?:;|q;|slant;)|s(?:;|s;))|sim;|t(?:;|ri(?:;|e;)))|mid;|o(?:pf;|t(?:;|in(?:;|E;|dot;|v(?:a;|b;|c;))|ni(?:;|v(?:a;|b;|c;))|))|p(?:ar(?:;|allel;|sl;|t;)|olint;|r(?:;|cue;|e(?:;|c(?:;|eq;))))|r(?:Arr;|arr(?:;|c;|w;)|ightarrow;|tri(?:;|e;))|s(?:c(?:;|cue;|e;|r;)|hort(?:mid;|parallel;)|im(?:;|e(?:;|q;))|mid;|par;|qsu(?:be;|pe;)|u(?:b(?:;|E;|e;|set(?:;|eq(?:;|q;)))|cc(?:;|eq;)|p(?:;|E;|e;|set(?:;|eq(?:;|q;)))))|t(?:gl;|ilde;?|lg;|riangle(?:left(?:;|eq;)|right(?:;|eq;)))|u(?:;|m(?:;|ero;|sp;))|v(?:Dash;|Harr;|ap;|dash;|g(?:e;|t;)|infin;|l(?:Arr;|e;|t(?:;|rie;))|r(?:Arr;|trie;)|sim;)|w(?:Arr;|ar(?:hk;|r(?:;|ow;))|near;))|o(?:S;|a(?:cute;?|st;)|c(?:ir(?:;|c;?)|y;)|d(?:ash;|blac;|iv;|ot;|sold;)|elig;|f(?:cir;|r;)|g(?:on;|rave;?|t;)|h(?:bar;|m;)|int;|l(?:arr;|c(?:ir;|ross;)|ine;|t;)|m(?:acr;|ega;|i(?:cron;|d;|nus;))|opf;|p(?:ar;|erp;|lus;)|r(?:;|arr;|d(?:;|er(?:;|of;)|f;?|m;?)|igof;|or;|slope;|v;)|s(?:cr;|lash;?|ol;)|ti(?:lde;?|mes(?:;|as;))|uml;?|vbar;)|p(?:ar(?:;|a(?:;|llel;|)|s(?:im;|l;)|t;)|cy;|er(?:cnt;|iod;|mil;|p;|tenk;)|fr;|h(?:i(?:;|v;)|mmat;|one;)|i(?:;|tchfork;|v;)|l(?:an(?:ck(?:;|h;)|kv;)|us(?:;|acir;|b;|cir;|d(?:o;|u;)|e;|mn;?|sim;|two;))|m;|o(?:intint;|pf;|und;?)|r(?:;|E;|ap;|cue;|e(?:;|c(?:;|approx;|curlyeq;|eq;|n(?:approx;|eqq;|sim;)|sim;))|ime(?:;|s;)|n(?:E;|ap;|sim;)|o(?:d;|f(?:alar;|line;|surf;)|p(?:;|to;))|sim;|urel;)|s(?:cr;|i;)|uncsp;)|q(?:fr;|int;|opf;|prime;|scr;|u(?:at(?:ernions;|int;)|est(?:;|eq;)|ot;?))|r(?:A(?:arr;|rr;|tail;)|Barr;|Har;|a(?:c(?:e;|ute;)|dic;|emptyv;|ng(?:;|d;|e;|le;)|quo;?|rr(?:;|ap;|b(?:;|fs;)|c;|fs;|hk;|lp;|pl;|sim;|tl;|w;)|t(?:ail;|io(?:;|nals;)))|b(?:arr;|brk;|r(?:ac(?:e;|k;)|k(?:e;|sl(?:d;|u;))))|c(?:aron;|e(?:dil;|il;)|ub;|y;)|d(?:ca;|ldhar;|quo(?:;|r;)|sh;)|e(?:al(?:;|ine;|part;|s;)|ct;|g;?)|f(?:isht;|loor;|r;)|h(?:ar(?:d;|u(?:;|l;))|o(?:;|v;))|i(?:ght(?:arrow(?:;|tail;)|harpoon(?:down;|up;)|left(?:arrows;|harpoons;)|rightarrows;|squigarrow;|threetimes;)|ng;|singdotseq;)|l(?:arr;|har;|m;)|moust(?:;|ache;)|nmid;|o(?:a(?:ng;|rr;)|brk;|p(?:ar;|f;|lus;)|times;)|p(?:ar(?:;|gt;)|polint;)|rarr;|s(?:aquo;|cr;|h;|q(?:b;|uo(?:;|r;)))|t(?:hree;|imes;|ri(?:;|e;|f;|ltri;))|uluhar;|x;)|s(?:acute;|bquo;|c(?:;|E;|a(?:p;|ron;)|cue;|e(?:;|dil;)|irc;|n(?:E;|ap;|sim;)|polint;|sim;|y;)|dot(?:;|b;|e;)|e(?:Arr;|ar(?:hk;|r(?:;|ow;))|ct;?|mi;|swar;|tm(?:inus;|n;)|xt;)|fr(?:;|own;)|h(?:arp;|c(?:hcy;|y;)|ort(?:mid;|parallel;)|y;?)|i(?:gma(?:;|f;|v;)|m(?:;|dot;|e(?:;|q;)|g(?:;|E;)|l(?:;|E;)|ne;|plus;|rarr;))|larr;|m(?:a(?:llsetminus;|shp;)|eparsl;|i(?:d;|le;)|t(?:;|e(?:;|s;)))|o(?:ftcy;|l(?:;|b(?:;|ar;))|pf;)|pa(?:des(?:;|uit;)|r;)|q(?:c(?:ap(?:;|s;)|up(?:;|s;))|su(?:b(?:;|e;|set(?:;|eq;))|p(?:;|e;|set(?:;|eq;)))|u(?:;|ar(?:e;|f;)|f;))|rarr;|s(?:cr;|etmn;|mile;|tarf;)|t(?:ar(?:;|f;)|r(?:aight(?:epsilon;|phi;)|ns;))|u(?:b(?:;|E;|dot;|e(?:;|dot;)|mult;|n(?:E;|e;)|plus;|rarr;|s(?:et(?:;|eq(?:;|q;)|neq(?:;|q;))|im;|u(?:b;|p;)))|cc(?:;|approx;|curlyeq;|eq;|n(?:approx;|eqq;|sim;)|sim;)|m;|ng;|p(?:1;?|2;?|3;?|;|E;|d(?:ot;|sub;)|e(?:;|dot;)|hs(?:ol;|ub;)|larr;|mult;|n(?:E;|e;)|plus;|s(?:et(?:;|eq(?:;|q;)|neq(?:;|q;))|im;|u(?:b;|p;))))|w(?:Arr;|ar(?:hk;|r(?:;|ow;))|nwar;)|zlig;?)|t(?:a(?:rget;|u;)|brk;|c(?:aron;|edil;|y;)|dot;|elrec;|fr;|h(?:e(?:re(?:4;|fore;)|ta(?:;|sym;|v;))|i(?:ck(?:approx;|sim;)|nsp;)|k(?:ap;|sim;)|orn;?)|i(?:lde;|mes(?:;|b(?:;|ar;)|d;|)|nt;)|o(?:ea;|p(?:;|bot;|cir;|f(?:;|ork;))|sa;)|prime;|r(?:ade;|i(?:angle(?:;|down;|left(?:;|eq;)|q;|right(?:;|eq;))|dot;|e;|minus;|plus;|sb;|time;)|pezium;)|s(?:c(?:r;|y;)|hcy;|trok;)|w(?:ixt;|ohead(?:leftarrow;|rightarrow;)))|u(?:Arr;|Har;|a(?:cute;?|rr;)|br(?:cy;|eve;)|c(?:irc;?|y;)|d(?:arr;|blac;|har;)|f(?:isht;|r;)|grave;?|h(?:ar(?:l;|r;)|blk;)|l(?:c(?:orn(?:;|er;)|rop;)|tri;)|m(?:acr;|l;?)|o(?:gon;|pf;)|p(?:arrow;|downarrow;|harpoon(?:left;|right;)|lus;|si(?:;|h;|lon;)|uparrows;)|r(?:c(?:orn(?:;|er;)|rop;)|ing;|tri;)|scr;|t(?:dot;|ilde;|ri(?:;|f;))|u(?:arr;|ml;?)|wangle;)|v(?:Arr;|Bar(?:;|v;)|Dash;|a(?:ngrt;|r(?:epsilon;|kappa;|nothing;|p(?:hi;|i;|ropto;)|r(?:;|ho;)|s(?:igma;|u(?:bsetneq(?:;|q;)|psetneq(?:;|q;)))|t(?:heta;|riangle(?:left;|right;))))|cy;|dash;|e(?:e(?:;|bar;|eq;)|llip;|r(?:bar;|t;))|fr;|ltri;|nsu(?:b;|p;)|opf;|prop;|rtri;|s(?:cr;|u(?:bn(?:E;|e;)|pn(?:E;|e;)))|zigzag;)|w(?:circ;|e(?:d(?:bar;|ge(?:;|q;))|ierp;)|fr;|opf;|p;|r(?:;|eath;)|scr;)|x(?:c(?:ap;|irc;|up;)|dtri;|fr;|h(?:Arr;|arr;)|i;|l(?:Arr;|arr;)|map;|nis;|o(?:dot;|p(?:f;|lus;)|time;)|r(?:Arr;|arr;)|s(?:cr;|qcup;)|u(?:plus;|tri;)|vee;|wedge;)|y(?:ac(?:ute;?|y;)|c(?:irc;|y;)|en;?|fr;|icy;|opf;|scr;|u(?:cy;|ml;?))|z(?:acute;|c(?:aron;|y;)|dot;|e(?:etrf;|ta;)|fr;|hcy;|igrarr;|opf;|scr;|w(?:j;|nj;)))|[\s\S]/g;
    var NAMEDCHARREF_MAXLEN = 32;
    var DBLQUOTEATTRVAL = /[^\r"&\u0000]+/g;
    var SINGLEQUOTEATTRVAL = /[^\r'&\u0000]+/g;
    var UNQUOTEDATTRVAL = /[^\r\t\n\f &>\u0000]+/g;
    var TAGNAME = /[^\r\t\n\f \/>A-Z\u0000]+/g;
    var ATTRNAME = /[^\r\t\n\f \/=>A-Z\u0000]+/g;
    var CDATATEXT = /[^\]\r\u0000\uffff]*/g;
    var DATATEXT = /[^&<\r\u0000\uffff]*/g;
    var RAWTEXT = /[^<\r\u0000\uffff]*/g;
    var PLAINTEXT = /[^\r\u0000\uffff]*/g;
    var SIMPLETAG = /(?:(\/)?([a-z]+)>)|[\s\S]/g;
    var SIMPLEATTR = /(?:([-a-z]+)[ \t\n\f]*=[ \t\n\f]*('[^'&\r\u0000]*'|"[^"&\r\u0000]*"|[^\t\n\r\f "&'\u0000>][^&> \t\n\r\f\u0000]*[ \t\n\f]))|[\s\S]/g;
    var NONWS = /[^\x09\x0A\x0C\x0D\x20]/;
    var ALLNONWS = /[^\x09\x0A\x0C\x0D\x20]/g;
    var NONWSNONNUL = /[^\x00\x09\x0A\x0C\x0D\x20]/;
    var LEADINGWS = /^[\x09\x0A\x0C\x0D\x20]+/;
    var NULCHARS = /\x00/g;
    function buf2str(buf) {
      var CHUNKSIZE = 16384;
      if (buf.length < CHUNKSIZE) {
        return String.fromCharCode.apply(String, buf);
      }
      var result = "";
      for (var i = 0; i < buf.length; i += CHUNKSIZE) {
        result += String.fromCharCode.apply(String, buf.slice(i, i + CHUNKSIZE));
      }
      return result;
    }
    function str2buf(s) {
      var result = [];
      for (var i = 0; i < s.length; i++) {
        result[i] = s.charCodeAt(i);
      }
      return result;
    }
    function isA(elt, set) {
      if (typeof set === "string") {
        return elt.namespaceURI === NAMESPACE.HTML && elt.localName === set;
      }
      var tagnames = set[elt.namespaceURI];
      return tagnames && tagnames[elt.localName];
    }
    function isMathmlTextIntegrationPoint(n) {
      return isA(n, mathmlTextIntegrationPointSet);
    }
    function isHTMLIntegrationPoint(n) {
      if (isA(n, htmlIntegrationPointSet)) return true;
      if (n.namespaceURI === NAMESPACE.MATHML && n.localName === "annotation-xml") {
        var encoding = n.getAttribute("encoding");
        if (encoding) encoding = encoding.toLowerCase();
        if (encoding === "text/html" || encoding === "application/xhtml+xml") return true;
      }
      return false;
    }
    function adjustSVGTagName(name) {
      if (name in svgTagNameAdjustments) return svgTagNameAdjustments[name];
      else return name;
    }
    function adjustSVGAttributes(attrs) {
      for (var i = 0, n = attrs.length; i < n; i++) {
        if (attrs[i][0] in svgAttrAdjustments) {
          attrs[i][0] = svgAttrAdjustments[attrs[i][0]];
        }
      }
    }
    function adjustMathMLAttributes(attrs) {
      for (var i = 0, n = attrs.length; i < n; i++) {
        if (attrs[i][0] === "definitionurl") {
          attrs[i][0] = "definitionURL";
          break;
        }
      }
    }
    function adjustForeignAttributes(attrs) {
      for (var i = 0, n = attrs.length; i < n; i++) {
        if (attrs[i][0] in foreignAttributes) {
          attrs[i].push(foreignAttributes[attrs[i][0]]);
        }
      }
    }
    function transferAttributes(attrs, elt) {
      for (var i = 0, n = attrs.length; i < n; i++) {
        var name = attrs[i][0], value = attrs[i][1];
        if (elt.hasAttribute(name)) continue;
        elt._setAttribute(name, value);
      }
    }
    HTMLParser.ElementStack = function ElementStack() {
      this.elements = [];
      this.top = null;
    };
    HTMLParser.ElementStack.prototype.push = function(e) {
      this.elements.push(e);
      this.top = e;
    };
    HTMLParser.ElementStack.prototype.pop = function(e) {
      this.elements.pop();
      this.top = this.elements[this.elements.length - 1];
    };
    HTMLParser.ElementStack.prototype.popTag = function(tag) {
      for (var i = this.elements.length - 1; i > 0; i--) {
        var e = this.elements[i];
        if (isA(e, tag)) break;
      }
      this.elements.length = i;
      this.top = this.elements[i - 1];
    };
    HTMLParser.ElementStack.prototype.popElementType = function(type) {
      for (var i = this.elements.length - 1; i > 0; i--) {
        if (this.elements[i] instanceof type) break;
      }
      this.elements.length = i;
      this.top = this.elements[i - 1];
    };
    HTMLParser.ElementStack.prototype.popElement = function(e) {
      for (var i = this.elements.length - 1; i > 0; i--) {
        if (this.elements[i] === e) break;
      }
      this.elements.length = i;
      this.top = this.elements[i - 1];
    };
    HTMLParser.ElementStack.prototype.removeElement = function(e) {
      if (this.top === e) this.pop();
      else {
        var idx = this.elements.lastIndexOf(e);
        if (idx !== -1) this.elements.splice(idx, 1);
      }
    };
    HTMLParser.ElementStack.prototype.clearToContext = function(set) {
      for (var i = this.elements.length - 1; i > 0; i--) {
        if (isA(this.elements[i], set)) break;
      }
      this.elements.length = i + 1;
      this.top = this.elements[i];
    };
    HTMLParser.ElementStack.prototype.contains = function(tag) {
      return this.inSpecificScope(tag, /* @__PURE__ */ Object.create(null));
    };
    HTMLParser.ElementStack.prototype.inSpecificScope = function(tag, set) {
      for (var i = this.elements.length - 1; i >= 0; i--) {
        var elt = this.elements[i];
        if (isA(elt, tag)) return true;
        if (isA(elt, set)) return false;
      }
      return false;
    };
    HTMLParser.ElementStack.prototype.elementInSpecificScope = function(target, set) {
      for (var i = this.elements.length - 1; i >= 0; i--) {
        var elt = this.elements[i];
        if (elt === target) return true;
        if (isA(elt, set)) return false;
      }
      return false;
    };
    HTMLParser.ElementStack.prototype.elementTypeInSpecificScope = function(target, set) {
      for (var i = this.elements.length - 1; i >= 0; i--) {
        var elt = this.elements[i];
        if (elt instanceof target) return true;
        if (isA(elt, set)) return false;
      }
      return false;
    };
    HTMLParser.ElementStack.prototype.inScope = function(tag) {
      return this.inSpecificScope(tag, inScopeSet);
    };
    HTMLParser.ElementStack.prototype.elementInScope = function(e) {
      return this.elementInSpecificScope(e, inScopeSet);
    };
    HTMLParser.ElementStack.prototype.elementTypeInScope = function(type) {
      return this.elementTypeInSpecificScope(type, inScopeSet);
    };
    HTMLParser.ElementStack.prototype.inButtonScope = function(tag) {
      return this.inSpecificScope(tag, inButtonScopeSet);
    };
    HTMLParser.ElementStack.prototype.inListItemScope = function(tag) {
      return this.inSpecificScope(tag, inListItemScopeSet);
    };
    HTMLParser.ElementStack.prototype.inTableScope = function(tag) {
      return this.inSpecificScope(tag, inTableScopeSet);
    };
    HTMLParser.ElementStack.prototype.inSelectScope = function(tag) {
      for (var i = this.elements.length - 1; i >= 0; i--) {
        var elt = this.elements[i];
        if (elt.namespaceURI !== NAMESPACE.HTML) return false;
        var localname = elt.localName;
        if (localname === tag) return true;
        if (localname !== "optgroup" && localname !== "option") return false;
      }
      return false;
    };
    HTMLParser.ElementStack.prototype.generateImpliedEndTags = function(butnot, thorough) {
      var endTagSet = thorough ? thoroughImpliedEndTagsSet : impliedEndTagsSet;
      for (var i = this.elements.length - 1; i >= 0; i--) {
        var e = this.elements[i];
        if (butnot && isA(e, butnot)) break;
        if (!isA(this.elements[i], endTagSet)) break;
      }
      this.elements.length = i + 1;
      this.top = this.elements[i];
    };
    HTMLParser.ActiveFormattingElements = function AFE() {
      this.list = [];
      this.attrs = [];
    };
    HTMLParser.ActiveFormattingElements.prototype.MARKER = { localName: "|" };
    HTMLParser.ActiveFormattingElements.prototype.insertMarker = function() {
      this.list.push(this.MARKER);
      this.attrs.push(this.MARKER);
    };
    HTMLParser.ActiveFormattingElements.prototype.push = function(elt, attrs) {
      var count = 0;
      for (var i = this.list.length - 1; i >= 0; i--) {
        if (this.list[i] === this.MARKER) break;
        if (equal2(elt, this.list[i], this.attrs[i])) {
          count++;
          if (count === 3) {
            this.list.splice(i, 1);
            this.attrs.splice(i, 1);
            break;
          }
        }
      }
      this.list.push(elt);
      var attrcopy = [];
      for (var ii = 0; ii < attrs.length; ii++) {
        attrcopy[ii] = attrs[ii];
      }
      this.attrs.push(attrcopy);
      function equal2(newelt, oldelt, oldattrs) {
        if (newelt.localName !== oldelt.localName) return false;
        if (newelt._numattrs !== oldattrs.length) return false;
        for (var i2 = 0, n = oldattrs.length; i2 < n; i2++) {
          var oldname = oldattrs[i2][0];
          var oldval = oldattrs[i2][1];
          if (!newelt.hasAttribute(oldname)) return false;
          if (newelt.getAttribute(oldname) !== oldval) return false;
        }
        return true;
      }
    };
    HTMLParser.ActiveFormattingElements.prototype.clearToMarker = function() {
      for (var i = this.list.length - 1; i >= 0; i--) {
        if (this.list[i] === this.MARKER) break;
      }
      if (i < 0) i = 0;
      this.list.length = i;
      this.attrs.length = i;
    };
    HTMLParser.ActiveFormattingElements.prototype.findElementByTag = function(tag) {
      for (var i = this.list.length - 1; i >= 0; i--) {
        var elt = this.list[i];
        if (elt === this.MARKER) break;
        if (elt.localName === tag) return elt;
      }
      return null;
    };
    HTMLParser.ActiveFormattingElements.prototype.indexOf = function(e) {
      return this.list.lastIndexOf(e);
    };
    HTMLParser.ActiveFormattingElements.prototype.remove = function(e) {
      var idx = this.list.lastIndexOf(e);
      if (idx !== -1) {
        this.list.splice(idx, 1);
        this.attrs.splice(idx, 1);
      }
    };
    HTMLParser.ActiveFormattingElements.prototype.replace = function(a, b, attrs) {
      var idx = this.list.lastIndexOf(a);
      if (idx !== -1) {
        this.list[idx] = b;
        this.attrs[idx] = attrs;
      }
    };
    HTMLParser.ActiveFormattingElements.prototype.insertAfter = function(a, b) {
      var idx = this.list.lastIndexOf(a);
      if (idx !== -1) {
        this.list.splice(idx, 0, b);
        this.attrs.splice(idx, 0, b);
      }
    };
    function HTMLParser(address, fragmentContext, options2) {
      var chars = null;
      var numchars = 0;
      var nextchar = 0;
      var input_complete = false;
      var scanner_skip_newline = false;
      var reentrant_invocations = 0;
      var saved_scanner_state = [];
      var leftovers = "";
      var first_batch = true;
      var paused = 0;
      var tokenizer = data_state;
      var return_state;
      var character_reference_code;
      var tagnamebuf = "";
      var lasttagname = "";
      var tempbuf = [];
      var attrnamebuf = "";
      var attrvaluebuf = "";
      var commentbuf = [];
      var doctypenamebuf = [];
      var doctypepublicbuf = [];
      var doctypesystembuf = [];
      var attributes = [];
      var is_end_tag = false;
      var parser = initial_mode;
      var originalInsertionMode = null;
      var templateInsertionModes = [];
      var stack = new HTMLParser.ElementStack();
      var afe = new HTMLParser.ActiveFormattingElements();
      var fragment = fragmentContext !== void 0;
      var head_element_pointer = null;
      var form_element_pointer = null;
      var scripting_enabled = true;
      if (fragmentContext) {
        scripting_enabled = fragmentContext.ownerDocument._scripting_enabled;
      }
      if (options2 && options2.scripting_enabled === false) scripting_enabled = false;
      var frameset_ok = true;
      var force_quirks = false;
      var pending_table_text;
      var text_integration_mode;
      var textrun = [];
      var textIncludesNUL = false;
      var ignore_linefeed = false;
      var htmlparser = {
        document: function() {
          return doc2;
        },
        // Convenience function for internal use. Can only be called once,
        // as it removes the nodes from `doc` to add them to fragment.
        _asDocumentFragment: function() {
          var frag = doc2.createDocumentFragment();
          var root2 = doc2.firstChild;
          while (root2.hasChildNodes()) {
            frag.appendChild(root2.firstChild);
          }
          return frag;
        },
        // Internal function used from HTMLScriptElement to pause the
        // parser while a script is being loaded from the network
        pause: function() {
          paused++;
        },
        // Called when a script finishes loading
        resume: function() {
          paused--;
          this.parse("");
        },
        // Parse the HTML text s.
        // The second argument should be true if there is no more
        // text to be parsed, and should be false or omitted otherwise.
        // The second argument must not be set for recursive invocations
        // from document.write()
        parse: function(s, end, shouldPauseFunc) {
          var moreToDo;
          if (paused > 0) {
            leftovers += s;
            return true;
          }
          if (reentrant_invocations === 0) {
            if (leftovers) {
              s = leftovers + s;
              leftovers = "";
            }
            if (end) {
              s += "\uFFFF";
              input_complete = true;
            }
            chars = s;
            numchars = s.length;
            nextchar = 0;
            if (first_batch) {
              first_batch = false;
              if (chars.charCodeAt(0) === 65279) nextchar = 1;
            }
            reentrant_invocations++;
            moreToDo = scanChars(shouldPauseFunc);
            leftovers = chars.substring(nextchar, numchars);
            reentrant_invocations--;
          } else {
            reentrant_invocations++;
            saved_scanner_state.push(chars, numchars, nextchar);
            chars = s;
            numchars = s.length;
            nextchar = 0;
            scanChars();
            moreToDo = false;
            leftovers = chars.substring(nextchar, numchars);
            nextchar = saved_scanner_state.pop();
            numchars = saved_scanner_state.pop();
            chars = saved_scanner_state.pop();
            if (leftovers) {
              chars = leftovers + chars.substring(nextchar);
              numchars = chars.length;
              nextchar = 0;
              leftovers = "";
            }
            reentrant_invocations--;
          }
          return moreToDo;
        }
      };
      var doc2 = new Document(true, address);
      doc2._parser = htmlparser;
      doc2._scripting_enabled = scripting_enabled;
      if (fragmentContext) {
        if (fragmentContext.ownerDocument._quirks) doc2._quirks = true;
        if (fragmentContext.ownerDocument._limitedQuirks) doc2._limitedQuirks = true;
        if (fragmentContext.namespaceURI === NAMESPACE.HTML) {
          switch (fragmentContext.localName) {
            case "title":
            case "textarea":
              tokenizer = rcdata_state;
              break;
            case "style":
            case "xmp":
            case "iframe":
            case "noembed":
            case "noframes":
            case "script":
            case "plaintext":
              tokenizer = plaintext_state;
              break;
            case "noscript":
              if (scripting_enabled) tokenizer = plaintext_state;
          }
        }
        var root = doc2.createElement("html");
        doc2._appendChild(root);
        stack.push(root);
        if (fragmentContext instanceof impl.HTMLTemplateElement) {
          templateInsertionModes.push(in_template_mode);
        }
        resetInsertionMode();
        for (var e = fragmentContext; e !== null; e = e.parentElement) {
          if (e instanceof impl.HTMLFormElement) {
            form_element_pointer = e;
            break;
          }
        }
      }
      function scanChars(shouldPauseFunc) {
        var codepoint, s, pattern, eof;
        while (nextchar < numchars) {
          if (paused > 0 || shouldPauseFunc && shouldPauseFunc()) {
            return true;
          }
          switch (typeof tokenizer.lookahead) {
            case "undefined":
              codepoint = chars.charCodeAt(nextchar++);
              if (scanner_skip_newline) {
                scanner_skip_newline = false;
                if (codepoint === 10) {
                  nextchar++;
                  continue;
                }
              }
              switch (codepoint) {
                case 13:
                  if (nextchar < numchars) {
                    if (chars.charCodeAt(nextchar) === 10) nextchar++;
                  } else {
                    scanner_skip_newline = true;
                  }
                  tokenizer(10);
                  break;
                case 65535:
                  if (input_complete && nextchar === numchars) {
                    tokenizer(EOF);
                    break;
                  }
                /* falls through */
                default:
                  tokenizer(codepoint);
                  break;
              }
              break;
            case "number":
              codepoint = chars.charCodeAt(nextchar);
              var n = tokenizer.lookahead;
              var needsString = true;
              if (n < 0) {
                needsString = false;
                n = -n;
              }
              if (n < numchars - nextchar) {
                s = needsString ? chars.substring(nextchar, nextchar + n) : null;
                eof = false;
              } else {
                if (input_complete) {
                  s = needsString ? chars.substring(nextchar, numchars) : null;
                  eof = true;
                  if (codepoint === 65535 && nextchar === numchars - 1) codepoint = EOF;
                } else {
                  return true;
                }
              }
              tokenizer(codepoint, s, eof);
              break;
            case "string":
              codepoint = chars.charCodeAt(nextchar);
              pattern = tokenizer.lookahead;
              var pos = chars.indexOf(pattern, nextchar);
              if (pos !== -1) {
                s = chars.substring(nextchar, pos + pattern.length);
                eof = false;
              } else {
                if (!input_complete) return true;
                s = chars.substring(nextchar, numchars);
                if (codepoint === 65535 && nextchar === numchars - 1) codepoint = EOF;
                eof = true;
              }
              tokenizer(codepoint, s, eof);
              break;
          }
        }
        return false;
      }
      function addAttribute(name, value) {
        for (var i = 0; i < attributes.length; i++) {
          if (attributes[i][0] === name) return;
        }
        if (value !== void 0) {
          attributes.push([name, value]);
        } else {
          attributes.push([name]);
        }
      }
      function handleSimpleAttribute() {
        SIMPLEATTR.lastIndex = nextchar - 1;
        var matched = SIMPLEATTR.exec(chars);
        if (!matched) throw new Error("should never happen");
        var name = matched[1];
        if (!name) return false;
        var value = matched[2];
        var len = value.length;
        switch (value[0]) {
          case '"':
          case "'":
            value = value.substring(1, len - 1);
            nextchar += matched[0].length - 1;
            tokenizer = after_attribute_value_quoted_state;
            break;
          default:
            tokenizer = before_attribute_name_state;
            nextchar += matched[0].length - 1;
            value = value.substring(0, len - 1);
            break;
        }
        for (var i = 0; i < attributes.length; i++) {
          if (attributes[i][0] === name) return true;
        }
        attributes.push([name, value]);
        return true;
      }
      function beginTagName() {
        is_end_tag = false;
        tagnamebuf = "";
        attributes.length = 0;
      }
      function beginEndTagName() {
        is_end_tag = true;
        tagnamebuf = "";
        attributes.length = 0;
      }
      function beginTempBuf() {
        tempbuf.length = 0;
      }
      function beginAttrName() {
        attrnamebuf = "";
      }
      function beginAttrValue() {
        attrvaluebuf = "";
      }
      function beginComment() {
        commentbuf.length = 0;
      }
      function beginDoctype() {
        doctypenamebuf.length = 0;
        doctypepublicbuf = null;
        doctypesystembuf = null;
      }
      function beginDoctypePublicId() {
        doctypepublicbuf = [];
      }
      function beginDoctypeSystemId() {
        doctypesystembuf = [];
      }
      function forcequirks() {
        force_quirks = true;
      }
      function cdataAllowed() {
        return stack.top && stack.top.namespaceURI !== "http://www.w3.org/1999/xhtml";
      }
      function appropriateEndTag(buf) {
        return lasttagname === buf;
      }
      function flushText() {
        if (textrun.length > 0) {
          var s = buf2str(textrun);
          textrun.length = 0;
          if (ignore_linefeed) {
            ignore_linefeed = false;
            if (s[0] === "\n") s = s.substring(1);
            if (s.length === 0) return;
          }
          insertToken(TEXT, s);
          textIncludesNUL = false;
        }
        ignore_linefeed = false;
      }
      function getMatchingChars(pattern) {
        pattern.lastIndex = nextchar - 1;
        var match = pattern.exec(chars);
        if (match && match.index === nextchar - 1) {
          match = match[0];
          nextchar += match.length - 1;
          if (input_complete && nextchar === numchars) {
            match = match.slice(0, -1);
            nextchar--;
          }
          return match;
        } else {
          throw new Error("should never happen");
        }
      }
      function emitCharsWhile(pattern) {
        pattern.lastIndex = nextchar - 1;
        var match = pattern.exec(chars)[0];
        if (!match) return false;
        emitCharString(match);
        nextchar += match.length - 1;
        return true;
      }
      function emitCharString(s) {
        if (textrun.length > 0) flushText();
        if (ignore_linefeed) {
          ignore_linefeed = false;
          if (s[0] === "\n") s = s.substring(1);
          if (s.length === 0) return;
        }
        insertToken(TEXT, s);
      }
      function emitTag() {
        if (is_end_tag) insertToken(ENDTAG, tagnamebuf);
        else {
          var tagname = tagnamebuf;
          tagnamebuf = "";
          lasttagname = tagname;
          insertToken(TAG, tagname, attributes);
        }
      }
      function emitSimpleTag() {
        if (nextchar === numchars) {
          return false;
        }
        SIMPLETAG.lastIndex = nextchar;
        var matched = SIMPLETAG.exec(chars);
        if (!matched) throw new Error("should never happen");
        var tagname = matched[2];
        if (!tagname) return false;
        var endtag = matched[1];
        if (endtag) {
          nextchar += tagname.length + 2;
          insertToken(ENDTAG, tagname);
        } else {
          nextchar += tagname.length + 1;
          lasttagname = tagname;
          insertToken(TAG, tagname, NOATTRS);
        }
        return true;
      }
      function emitSelfClosingTag() {
        if (is_end_tag) insertToken(ENDTAG, tagnamebuf, null, true);
        else {
          insertToken(TAG, tagnamebuf, attributes, true);
        }
      }
      function emitDoctype() {
        insertToken(
          DOCTYPE,
          buf2str(doctypenamebuf),
          doctypepublicbuf ? buf2str(doctypepublicbuf) : void 0,
          doctypesystembuf ? buf2str(doctypesystembuf) : void 0
        );
      }
      function emitEOF() {
        flushText();
        parser(EOF);
        doc2.modclock = 1;
      }
      var insertToken = htmlparser.insertToken = function insertToken2(t, value, arg3, arg4) {
        flushText();
        var current = stack.top;
        if (!current || current.namespaceURI === NAMESPACE.HTML) {
          parser(t, value, arg3, arg4);
        } else {
          if (t !== TAG && t !== TEXT) {
            insertForeignToken(t, value, arg3, arg4);
          } else {
            if (isMathmlTextIntegrationPoint(current) && (t === TEXT || t === TAG && value !== "mglyph" && value !== "malignmark") || t === TAG && value === "svg" && current.namespaceURI === NAMESPACE.MATHML && current.localName === "annotation-xml" || isHTMLIntegrationPoint(current)) {
              text_integration_mode = true;
              parser(t, value, arg3, arg4);
              text_integration_mode = false;
            } else {
              insertForeignToken(t, value, arg3, arg4);
            }
          }
        }
      };
      function insertComment(data) {
        var parent = stack.top;
        if (foster_parent_mode && isA(parent, tablesectionrowSet)) {
          fosterParent(function(doc3) {
            return doc3.createComment(data);
          });
        } else {
          if (parent instanceof impl.HTMLTemplateElement) {
            parent = parent.content;
          }
          parent._appendChild(parent.ownerDocument.createComment(data));
        }
      }
      function insertText(s) {
        var parent = stack.top;
        if (foster_parent_mode && isA(parent, tablesectionrowSet)) {
          fosterParent(function(doc3) {
            return doc3.createTextNode(s);
          });
        } else {
          if (parent instanceof impl.HTMLTemplateElement) {
            parent = parent.content;
          }
          var lastChild = parent.lastChild;
          if (lastChild && lastChild.nodeType === Node.TEXT_NODE) {
            lastChild.appendData(s);
          } else {
            parent._appendChild(parent.ownerDocument.createTextNode(s));
          }
        }
      }
      function createHTMLElt(doc3, name, attrs) {
        var elt = html.createElement(doc3, name, null);
        if (attrs) {
          for (var i = 0, n = attrs.length; i < n; i++) {
            elt._setAttribute(attrs[i][0], attrs[i][1]);
          }
        }
        return elt;
      }
      var foster_parent_mode = false;
      function insertHTMLElement(name, attrs) {
        var elt = insertElement(function(doc3) {
          return createHTMLElt(doc3, name, attrs);
        });
        if (isA(elt, formassociatedSet)) {
          elt._form = form_element_pointer;
        }
        return elt;
      }
      function insertElement(eltFunc) {
        var elt;
        if (foster_parent_mode && isA(stack.top, tablesectionrowSet)) {
          elt = fosterParent(eltFunc);
        } else if (stack.top instanceof impl.HTMLTemplateElement) {
          elt = eltFunc(stack.top.content.ownerDocument);
          stack.top.content._appendChild(elt);
        } else {
          elt = eltFunc(stack.top.ownerDocument);
          stack.top._appendChild(elt);
        }
        stack.push(elt);
        return elt;
      }
      function insertForeignElement(name, attrs, ns) {
        return insertElement(function(doc3) {
          var elt = doc3._createElementNS(name, ns, null);
          if (attrs) {
            for (var i = 0, n = attrs.length; i < n; i++) {
              var attr = attrs[i];
              if (attr.length === 2) elt._setAttribute(attr[0], attr[1]);
              else {
                elt._setAttributeNS(attr[2], attr[0], attr[1]);
              }
            }
          }
          return elt;
        });
      }
      function lastElementOfType(type) {
        for (var i = stack.elements.length - 1; i >= 0; i--) {
          if (stack.elements[i] instanceof type) {
            return i;
          }
        }
        return -1;
      }
      function fosterParent(eltFunc) {
        var parent, before, lastTable = -1, lastTemplate = -1, elt;
        lastTable = lastElementOfType(impl.HTMLTableElement);
        lastTemplate = lastElementOfType(impl.HTMLTemplateElement);
        if (lastTemplate >= 0 && (lastTable < 0 || lastTemplate > lastTable)) {
          parent = stack.elements[lastTemplate];
        } else if (lastTable >= 0) {
          parent = stack.elements[lastTable].parentNode;
          if (parent) {
            before = stack.elements[lastTable];
          } else {
            parent = stack.elements[lastTable - 1];
          }
        }
        if (!parent) parent = stack.elements[0];
        if (parent instanceof impl.HTMLTemplateElement) {
          parent = parent.content;
        }
        elt = eltFunc(parent.ownerDocument);
        if (elt.nodeType === Node.TEXT_NODE) {
          var prev;
          if (before) prev = before.previousSibling;
          else prev = parent.lastChild;
          if (prev && prev.nodeType === Node.TEXT_NODE) {
            prev.appendData(elt.data);
            return elt;
          }
        }
        if (before) parent.insertBefore(elt, before);
        else parent._appendChild(elt);
        return elt;
      }
      function resetInsertionMode() {
        var last = false;
        for (var i = stack.elements.length - 1; i >= 0; i--) {
          var node = stack.elements[i];
          if (i === 0) {
            last = true;
            if (fragment) {
              node = fragmentContext;
            }
          }
          if (node.namespaceURI === NAMESPACE.HTML) {
            var tag = node.localName;
            switch (tag) {
              case "select":
                for (var j = i; j > 0; ) {
                  var ancestor = stack.elements[--j];
                  if (ancestor instanceof impl.HTMLTemplateElement) {
                    break;
                  } else if (ancestor instanceof impl.HTMLTableElement) {
                    parser = in_select_in_table_mode;
                    return;
                  }
                }
                parser = in_select_mode;
                return;
              case "tr":
                parser = in_row_mode;
                return;
              case "tbody":
              case "tfoot":
              case "thead":
                parser = in_table_body_mode;
                return;
              case "caption":
                parser = in_caption_mode;
                return;
              case "colgroup":
                parser = in_column_group_mode;
                return;
              case "table":
                parser = in_table_mode;
                return;
              case "template":
                parser = templateInsertionModes[templateInsertionModes.length - 1];
                return;
              case "body":
                parser = in_body_mode;
                return;
              case "frameset":
                parser = in_frameset_mode;
                return;
              case "html":
                if (head_element_pointer === null) {
                  parser = before_head_mode;
                } else {
                  parser = after_head_mode;
                }
                return;
              default:
                if (!last) {
                  if (tag === "head") {
                    parser = in_head_mode;
                    return;
                  }
                  if (tag === "td" || tag === "th") {
                    parser = in_cell_mode;
                    return;
                  }
                }
            }
          }
          if (last) {
            parser = in_body_mode;
            return;
          }
        }
      }
      function parseRawText(name, attrs) {
        insertHTMLElement(name, attrs);
        tokenizer = rawtext_state;
        originalInsertionMode = parser;
        parser = text_mode;
      }
      function parseRCDATA(name, attrs) {
        insertHTMLElement(name, attrs);
        tokenizer = rcdata_state;
        originalInsertionMode = parser;
        parser = text_mode;
      }
      function afeclone(doc3, i) {
        return {
          elt: createHTMLElt(doc3, afe.list[i].localName, afe.attrs[i]),
          attrs: afe.attrs[i]
        };
      }
      function afereconstruct() {
        if (afe.list.length === 0) return;
        var entry = afe.list[afe.list.length - 1];
        if (entry === afe.MARKER) return;
        if (stack.elements.lastIndexOf(entry) !== -1) return;
        for (var i = afe.list.length - 2; i >= 0; i--) {
          entry = afe.list[i];
          if (entry === afe.MARKER) break;
          if (stack.elements.lastIndexOf(entry) !== -1) break;
        }
        for (i = i + 1; i < afe.list.length; i++) {
          var newelt = insertElement(function(doc3) {
            return afeclone(doc3, i).elt;
          });
          afe.list[i] = newelt;
        }
      }
      var BOOKMARK = { localName: "BM" };
      function adoptionAgency(tag) {
        if (isA(stack.top, tag) && afe.indexOf(stack.top) === -1) {
          stack.pop();
          return true;
        }
        var outer = 0;
        while (outer < 8) {
          outer++;
          var fmtelt = afe.findElementByTag(tag);
          if (!fmtelt) {
            return false;
          }
          var index = stack.elements.lastIndexOf(fmtelt);
          if (index === -1) {
            afe.remove(fmtelt);
            return true;
          }
          if (!stack.elementInScope(fmtelt)) {
            return true;
          }
          var furthestblock = null, furthestblockindex;
          for (var i = index + 1; i < stack.elements.length; i++) {
            if (isA(stack.elements[i], specialSet)) {
              furthestblock = stack.elements[i];
              furthestblockindex = i;
              break;
            }
          }
          if (!furthestblock) {
            stack.popElement(fmtelt);
            afe.remove(fmtelt);
            return true;
          } else {
            var ancestor = stack.elements[index - 1];
            afe.insertAfter(fmtelt, BOOKMARK);
            var node = furthestblock;
            var lastnode = furthestblock;
            var nodeindex = furthestblockindex;
            var nodeafeindex;
            var inner = 0;
            while (true) {
              inner++;
              node = stack.elements[--nodeindex];
              if (node === fmtelt) break;
              nodeafeindex = afe.indexOf(node);
              if (inner > 3 && nodeafeindex !== -1) {
                afe.remove(node);
                nodeafeindex = -1;
              }
              if (nodeafeindex === -1) {
                stack.removeElement(node);
                continue;
              }
              var newelt = afeclone(ancestor.ownerDocument, nodeafeindex);
              afe.replace(node, newelt.elt, newelt.attrs);
              stack.elements[nodeindex] = newelt.elt;
              node = newelt.elt;
              if (lastnode === furthestblock) {
                afe.remove(BOOKMARK);
                afe.insertAfter(newelt.elt, BOOKMARK);
              }
              node._appendChild(lastnode);
              lastnode = node;
            }
            if (foster_parent_mode && isA(ancestor, tablesectionrowSet)) {
              fosterParent(function() {
                return lastnode;
              });
            } else if (ancestor instanceof impl.HTMLTemplateElement) {
              ancestor.content._appendChild(lastnode);
            } else {
              ancestor._appendChild(lastnode);
            }
            var newelt2 = afeclone(furthestblock.ownerDocument, afe.indexOf(fmtelt));
            while (furthestblock.hasChildNodes()) {
              newelt2.elt._appendChild(furthestblock.firstChild);
            }
            furthestblock._appendChild(newelt2.elt);
            afe.remove(fmtelt);
            afe.replace(BOOKMARK, newelt2.elt, newelt2.attrs);
            stack.removeElement(fmtelt);
            var pos = stack.elements.lastIndexOf(furthestblock);
            stack.elements.splice(pos + 1, 0, newelt2.elt);
          }
        }
        return true;
      }
      function handleScriptEnd() {
        stack.pop();
        parser = originalInsertionMode;
        return;
      }
      function stopParsing() {
        delete doc2._parser;
        stack.elements.length = 0;
        if (doc2.defaultView) {
          doc2.defaultView.dispatchEvent(new impl.Event("load", {}));
        }
      }
      function reconsume(c, new_state) {
        tokenizer = new_state;
        nextchar--;
      }
      function data_state(c) {
        switch (c) {
          case 38:
            return_state = data_state;
            tokenizer = character_reference_state;
            break;
          case 60:
            if (emitSimpleTag())
              break;
            tokenizer = tag_open_state;
            break;
          case 0:
            textrun.push(c);
            textIncludesNUL = true;
            break;
          case -1:
            emitEOF();
            break;
          default:
            emitCharsWhile(DATATEXT) || textrun.push(c);
            break;
        }
      }
      function rcdata_state(c) {
        switch (c) {
          case 38:
            return_state = rcdata_state;
            tokenizer = character_reference_state;
            break;
          case 60:
            tokenizer = rcdata_less_than_sign_state;
            break;
          case 0:
            textrun.push(65533);
            textIncludesNUL = true;
            break;
          case -1:
            emitEOF();
            break;
          default:
            textrun.push(c);
            break;
        }
      }
      function rawtext_state(c) {
        switch (c) {
          case 60:
            tokenizer = rawtext_less_than_sign_state;
            break;
          case 0:
            textrun.push(65533);
            break;
          case -1:
            emitEOF();
            break;
          default:
            emitCharsWhile(RAWTEXT) || textrun.push(c);
            break;
        }
      }
      function script_data_state(c) {
        switch (c) {
          case 60:
            tokenizer = script_data_less_than_sign_state;
            break;
          case 0:
            textrun.push(65533);
            break;
          case -1:
            emitEOF();
            break;
          default:
            emitCharsWhile(RAWTEXT) || textrun.push(c);
            break;
        }
      }
      function plaintext_state(c) {
        switch (c) {
          case 0:
            textrun.push(65533);
            break;
          case -1:
            emitEOF();
            break;
          default:
            emitCharsWhile(PLAINTEXT) || textrun.push(c);
            break;
        }
      }
      function tag_open_state(c) {
        switch (c) {
          case 33:
            tokenizer = markup_declaration_open_state;
            break;
          case 47:
            tokenizer = end_tag_open_state;
            break;
          case 65:
          // [A-Z]
          case 66:
          case 67:
          case 68:
          case 69:
          case 70:
          case 71:
          case 72:
          case 73:
          case 74:
          case 75:
          case 76:
          case 77:
          case 78:
          case 79:
          case 80:
          case 81:
          case 82:
          case 83:
          case 84:
          case 85:
          case 86:
          case 87:
          case 88:
          case 89:
          case 90:
          case 97:
          // [a-z]
          case 98:
          case 99:
          case 100:
          case 101:
          case 102:
          case 103:
          case 104:
          case 105:
          case 106:
          case 107:
          case 108:
          case 109:
          case 110:
          case 111:
          case 112:
          case 113:
          case 114:
          case 115:
          case 116:
          case 117:
          case 118:
          case 119:
          case 120:
          case 121:
          case 122:
            beginTagName();
            reconsume(c, tag_name_state);
            break;
          case 63:
            reconsume(c, bogus_comment_state);
            break;
          default:
            textrun.push(60);
            reconsume(c, data_state);
            break;
        }
      }
      function end_tag_open_state(c) {
        switch (c) {
          case 65:
          // [A-Z]
          case 66:
          case 67:
          case 68:
          case 69:
          case 70:
          case 71:
          case 72:
          case 73:
          case 74:
          case 75:
          case 76:
          case 77:
          case 78:
          case 79:
          case 80:
          case 81:
          case 82:
          case 83:
          case 84:
          case 85:
          case 86:
          case 87:
          case 88:
          case 89:
          case 90:
          case 97:
          // [a-z]
          case 98:
          case 99:
          case 100:
          case 101:
          case 102:
          case 103:
          case 104:
          case 105:
          case 106:
          case 107:
          case 108:
          case 109:
          case 110:
          case 111:
          case 112:
          case 113:
          case 114:
          case 115:
          case 116:
          case 117:
          case 118:
          case 119:
          case 120:
          case 121:
          case 122:
            beginEndTagName();
            reconsume(c, tag_name_state);
            break;
          case 62:
            tokenizer = data_state;
            break;
          case -1:
            textrun.push(60);
            textrun.push(47);
            emitEOF();
            break;
          default:
            reconsume(c, bogus_comment_state);
            break;
        }
      }
      function tag_name_state(c) {
        switch (c) {
          case 9:
          // CHARACTER TABULATION (tab)
          case 10:
          // LINE FEED (LF)
          case 12:
          // FORM FEED (FF)
          case 32:
            tokenizer = before_attribute_name_state;
            break;
          case 47:
            tokenizer = self_closing_start_tag_state;
            break;
          case 62:
            tokenizer = data_state;
            emitTag();
            break;
          case 65:
          // [A-Z]
          case 66:
          case 67:
          case 68:
          case 69:
          case 70:
          case 71:
          case 72:
          case 73:
          case 74:
          case 75:
          case 76:
          case 77:
          case 78:
          case 79:
          case 80:
          case 81:
          case 82:
          case 83:
          case 84:
          case 85:
          case 86:
          case 87:
          case 88:
          case 89:
          case 90:
            tagnamebuf += String.fromCharCode(c + 32);
            break;
          case 0:
            tagnamebuf += String.fromCharCode(
              65533
              /* REPLACEMENT CHARACTER */
            );
            break;
          case -1:
            emitEOF();
            break;
          default:
            tagnamebuf += getMatchingChars(TAGNAME);
            break;
        }
      }
      function rcdata_less_than_sign_state(c) {
        if (c === 47) {
          beginTempBuf();
          tokenizer = rcdata_end_tag_open_state;
        } else {
          textrun.push(60);
          reconsume(c, rcdata_state);
        }
      }
      function rcdata_end_tag_open_state(c) {
        switch (c) {
          case 65:
          // [A-Z]
          case 66:
          case 67:
          case 68:
          case 69:
          case 70:
          case 71:
          case 72:
          case 73:
          case 74:
          case 75:
          case 76:
          case 77:
          case 78:
          case 79:
          case 80:
          case 81:
          case 82:
          case 83:
          case 84:
          case 85:
          case 86:
          case 87:
          case 88:
          case 89:
          case 90:
          case 97:
          // [a-z]
          case 98:
          case 99:
          case 100:
          case 101:
          case 102:
          case 103:
          case 104:
          case 105:
          case 106:
          case 107:
          case 108:
          case 109:
          case 110:
          case 111:
          case 112:
          case 113:
          case 114:
          case 115:
          case 116:
          case 117:
          case 118:
          case 119:
          case 120:
          case 121:
          case 122:
            beginEndTagName();
            reconsume(c, rcdata_end_tag_name_state);
            break;
          default:
            textrun.push(60);
            textrun.push(47);
            reconsume(c, rcdata_state);
            break;
        }
      }
      function rcdata_end_tag_name_state(c) {
        switch (c) {
          case 9:
          // CHARACTER TABULATION (tab)
          case 10:
          // LINE FEED (LF)
          case 12:
          // FORM FEED (FF)
          case 32:
            if (appropriateEndTag(tagnamebuf)) {
              tokenizer = before_attribute_name_state;
              return;
            }
            break;
          case 47:
            if (appropriateEndTag(tagnamebuf)) {
              tokenizer = self_closing_start_tag_state;
              return;
            }
            break;
          case 62:
            if (appropriateEndTag(tagnamebuf)) {
              tokenizer = data_state;
              emitTag();
              return;
            }
            break;
          case 65:
          // [A-Z]
          case 66:
          case 67:
          case 68:
          case 69:
          case 70:
          case 71:
          case 72:
          case 73:
          case 74:
          case 75:
          case 76:
          case 77:
          case 78:
          case 79:
          case 80:
          case 81:
          case 82:
          case 83:
          case 84:
          case 85:
          case 86:
          case 87:
          case 88:
          case 89:
          case 90:
            tagnamebuf += String.fromCharCode(c + 32);
            tempbuf.push(c);
            return;
          case 97:
          // [a-z]
          case 98:
          case 99:
          case 100:
          case 101:
          case 102:
          case 103:
          case 104:
          case 105:
          case 106:
          case 107:
          case 108:
          case 109:
          case 110:
          case 111:
          case 112:
          case 113:
          case 114:
          case 115:
          case 116:
          case 117:
          case 118:
          case 119:
          case 120:
          case 121:
          case 122:
            tagnamebuf += String.fromCharCode(c);
            tempbuf.push(c);
            return;
          default:
            break;
        }
        textrun.push(60);
        textrun.push(47);
        pushAll(textrun, tempbuf);
        reconsume(c, rcdata_state);
      }
      function rawtext_less_than_sign_state(c) {
        if (c === 47) {
          beginTempBuf();
          tokenizer = rawtext_end_tag_open_state;
        } else {
          textrun.push(60);
          reconsume(c, rawtext_state);
        }
      }
      function rawtext_end_tag_open_state(c) {
        switch (c) {
          case 65:
          // [A-Z]
          case 66:
          case 67:
          case 68:
          case 69:
          case 70:
          case 71:
          case 72:
          case 73:
          case 74:
          case 75:
          case 76:
          case 77:
          case 78:
          case 79:
          case 80:
          case 81:
          case 82:
          case 83:
          case 84:
          case 85:
          case 86:
          case 87:
          case 88:
          case 89:
          case 90:
          case 97:
          // [a-z]
          case 98:
          case 99:
          case 100:
          case 101:
          case 102:
          case 103:
          case 104:
          case 105:
          case 106:
          case 107:
          case 108:
          case 109:
          case 110:
          case 111:
          case 112:
          case 113:
          case 114:
          case 115:
          case 116:
          case 117:
          case 118:
          case 119:
          case 120:
          case 121:
          case 122:
            beginEndTagName();
            reconsume(c, rawtext_end_tag_name_state);
            break;
          default:
            textrun.push(60);
            textrun.push(47);
            reconsume(c, rawtext_state);
            break;
        }
      }
      function rawtext_end_tag_name_state(c) {
        switch (c) {
          case 9:
          // CHARACTER TABULATION (tab)
          case 10:
          // LINE FEED (LF)
          case 12:
          // FORM FEED (FF)
          case 32:
            if (appropriateEndTag(tagnamebuf)) {
              tokenizer = before_attribute_name_state;
              return;
            }
            break;
          case 47:
            if (appropriateEndTag(tagnamebuf)) {
              tokenizer = self_closing_start_tag_state;
              return;
            }
            break;
          case 62:
            if (appropriateEndTag(tagnamebuf)) {
              tokenizer = data_state;
              emitTag();
              return;
            }
            break;
          case 65:
          // [A-Z]
          case 66:
          case 67:
          case 68:
          case 69:
          case 70:
          case 71:
          case 72:
          case 73:
          case 74:
          case 75:
          case 76:
          case 77:
          case 78:
          case 79:
          case 80:
          case 81:
          case 82:
          case 83:
          case 84:
          case 85:
          case 86:
          case 87:
          case 88:
          case 89:
          case 90:
            tagnamebuf += String.fromCharCode(c + 32);
            tempbuf.push(c);
            return;
          case 97:
          // [a-z]
          case 98:
          case 99:
          case 100:
          case 101:
          case 102:
          case 103:
          case 104:
          case 105:
          case 106:
          case 107:
          case 108:
          case 109:
          case 110:
          case 111:
          case 112:
          case 113:
          case 114:
          case 115:
          case 116:
          case 117:
          case 118:
          case 119:
          case 120:
          case 121:
          case 122:
            tagnamebuf += String.fromCharCode(c);
            tempbuf.push(c);
            return;
          default:
            break;
        }
        textrun.push(60);
        textrun.push(47);
        pushAll(textrun, tempbuf);
        reconsume(c, rawtext_state);
      }
      function script_data_less_than_sign_state(c) {
        switch (c) {
          case 47:
            beginTempBuf();
            tokenizer = script_data_end_tag_open_state;
            break;
          case 33:
            tokenizer = script_data_escape_start_state;
            textrun.push(60);
            textrun.push(33);
            break;
          default:
            textrun.push(60);
            reconsume(c, script_data_state);
            break;
        }
      }
      function script_data_end_tag_open_state(c) {
        switch (c) {
          case 65:
          // [A-Z]
          case 66:
          case 67:
          case 68:
          case 69:
          case 70:
          case 71:
          case 72:
          case 73:
          case 74:
          case 75:
          case 76:
          case 77:
          case 78:
          case 79:
          case 80:
          case 81:
          case 82:
          case 83:
          case 84:
          case 85:
          case 86:
          case 87:
          case 88:
          case 89:
          case 90:
          case 97:
          // [a-z]
          case 98:
          case 99:
          case 100:
          case 101:
          case 102:
          case 103:
          case 104:
          case 105:
          case 106:
          case 107:
          case 108:
          case 109:
          case 110:
          case 111:
          case 112:
          case 113:
          case 114:
          case 115:
          case 116:
          case 117:
          case 118:
          case 119:
          case 120:
          case 121:
          case 122:
            beginEndTagName();
            reconsume(c, script_data_end_tag_name_state);
            break;
          default:
            textrun.push(60);
            textrun.push(47);
            reconsume(c, script_data_state);
            break;
        }
      }
      function script_data_end_tag_name_state(c) {
        switch (c) {
          case 9:
          // CHARACTER TABULATION (tab)
          case 10:
          // LINE FEED (LF)
          case 12:
          // FORM FEED (FF)
          case 32:
            if (appropriateEndTag(tagnamebuf)) {
              tokenizer = before_attribute_name_state;
              return;
            }
            break;
          case 47:
            if (appropriateEndTag(tagnamebuf)) {
              tokenizer = self_closing_start_tag_state;
              return;
            }
            break;
          case 62:
            if (appropriateEndTag(tagnamebuf)) {
              tokenizer = data_state;
              emitTag();
              return;
            }
            break;
          case 65:
          // [A-Z]
          case 66:
          case 67:
          case 68:
          case 69:
          case 70:
          case 71:
          case 72:
          case 73:
          case 74:
          case 75:
          case 76:
          case 77:
          case 78:
          case 79:
          case 80:
          case 81:
          case 82:
          case 83:
          case 84:
          case 85:
          case 86:
          case 87:
          case 88:
          case 89:
          case 90:
            tagnamebuf += String.fromCharCode(c + 32);
            tempbuf.push(c);
            return;
          case 97:
          // [a-z]
          case 98:
          case 99:
          case 100:
          case 101:
          case 102:
          case 103:
          case 104:
          case 105:
          case 106:
          case 107:
          case 108:
          case 109:
          case 110:
          case 111:
          case 112:
          case 113:
          case 114:
          case 115:
          case 116:
          case 117:
          case 118:
          case 119:
          case 120:
          case 121:
          case 122:
            tagnamebuf += String.fromCharCode(c);
            tempbuf.push(c);
            return;
          default:
            break;
        }
        textrun.push(60);
        textrun.push(47);
        pushAll(textrun, tempbuf);
        reconsume(c, script_data_state);
      }
      function script_data_escape_start_state(c) {
        if (c === 45) {
          tokenizer = script_data_escape_start_dash_state;
          textrun.push(45);
        } else {
          reconsume(c, script_data_state);
        }
      }
      function script_data_escape_start_dash_state(c) {
        if (c === 45) {
          tokenizer = script_data_escaped_dash_dash_state;
          textrun.push(45);
        } else {
          reconsume(c, script_data_state);
        }
      }
      function script_data_escaped_state(c) {
        switch (c) {
          case 45:
            tokenizer = script_data_escaped_dash_state;
            textrun.push(45);
            break;
          case 60:
            tokenizer = script_data_escaped_less_than_sign_state;
            break;
          case 0:
            textrun.push(65533);
            break;
          case -1:
            emitEOF();
            break;
          default:
            textrun.push(c);
            break;
        }
      }
      function script_data_escaped_dash_state(c) {
        switch (c) {
          case 45:
            tokenizer = script_data_escaped_dash_dash_state;
            textrun.push(45);
            break;
          case 60:
            tokenizer = script_data_escaped_less_than_sign_state;
            break;
          case 0:
            tokenizer = script_data_escaped_state;
            textrun.push(65533);
            break;
          case -1:
            emitEOF();
            break;
          default:
            tokenizer = script_data_escaped_state;
            textrun.push(c);
            break;
        }
      }
      function script_data_escaped_dash_dash_state(c) {
        switch (c) {
          case 45:
            textrun.push(45);
            break;
          case 60:
            tokenizer = script_data_escaped_less_than_sign_state;
            break;
          case 62:
            tokenizer = script_data_state;
            textrun.push(62);
            break;
          case 0:
            tokenizer = script_data_escaped_state;
            textrun.push(65533);
            break;
          case -1:
            emitEOF();
            break;
          default:
            tokenizer = script_data_escaped_state;
            textrun.push(c);
            break;
        }
      }
      function script_data_escaped_less_than_sign_state(c) {
        switch (c) {
          case 47:
            beginTempBuf();
            tokenizer = script_data_escaped_end_tag_open_state;
            break;
          case 65:
          // [A-Z]
          case 66:
          case 67:
          case 68:
          case 69:
          case 70:
          case 71:
          case 72:
          case 73:
          case 74:
          case 75:
          case 76:
          case 77:
          case 78:
          case 79:
          case 80:
          case 81:
          case 82:
          case 83:
          case 84:
          case 85:
          case 86:
          case 87:
          case 88:
          case 89:
          case 90:
          case 97:
          // [a-z]
          case 98:
          case 99:
          case 100:
          case 101:
          case 102:
          case 103:
          case 104:
          case 105:
          case 106:
          case 107:
          case 108:
          case 109:
          case 110:
          case 111:
          case 112:
          case 113:
          case 114:
          case 115:
          case 116:
          case 117:
          case 118:
          case 119:
          case 120:
          case 121:
          case 122:
            beginTempBuf();
            textrun.push(60);
            reconsume(c, script_data_double_escape_start_state);
            break;
          default:
            textrun.push(60);
            reconsume(c, script_data_escaped_state);
            break;
        }
      }
      function script_data_escaped_end_tag_open_state(c) {
        switch (c) {
          case 65:
          // [A-Z]
          case 66:
          case 67:
          case 68:
          case 69:
          case 70:
          case 71:
          case 72:
          case 73:
          case 74:
          case 75:
          case 76:
          case 77:
          case 78:
          case 79:
          case 80:
          case 81:
          case 82:
          case 83:
          case 84:
          case 85:
          case 86:
          case 87:
          case 88:
          case 89:
          case 90:
          case 97:
          // [a-z]
          case 98:
          case 99:
          case 100:
          case 101:
          case 102:
          case 103:
          case 104:
          case 105:
          case 106:
          case 107:
          case 108:
          case 109:
          case 110:
          case 111:
          case 112:
          case 113:
          case 114:
          case 115:
          case 116:
          case 117:
          case 118:
          case 119:
          case 120:
          case 121:
          case 122:
            beginEndTagName();
            reconsume(c, script_data_escaped_end_tag_name_state);
            break;
          default:
            textrun.push(60);
            textrun.push(47);
            reconsume(c, script_data_escaped_state);
            break;
        }
      }
      function script_data_escaped_end_tag_name_state(c) {
        switch (c) {
          case 9:
          // CHARACTER TABULATION (tab)
          case 10:
          // LINE FEED (LF)
          case 12:
          // FORM FEED (FF)
          case 32:
            if (appropriateEndTag(tagnamebuf)) {
              tokenizer = before_attribute_name_state;
              return;
            }
            break;
          case 47:
            if (appropriateEndTag(tagnamebuf)) {
              tokenizer = self_closing_start_tag_state;
              return;
            }
            break;
          case 62:
            if (appropriateEndTag(tagnamebuf)) {
              tokenizer = data_state;
              emitTag();
              return;
            }
            break;
          case 65:
          // [A-Z]
          case 66:
          case 67:
          case 68:
          case 69:
          case 70:
          case 71:
          case 72:
          case 73:
          case 74:
          case 75:
          case 76:
          case 77:
          case 78:
          case 79:
          case 80:
          case 81:
          case 82:
          case 83:
          case 84:
          case 85:
          case 86:
          case 87:
          case 88:
          case 89:
          case 90:
            tagnamebuf += String.fromCharCode(c + 32);
            tempbuf.push(c);
            return;
          case 97:
          // [a-z]
          case 98:
          case 99:
          case 100:
          case 101:
          case 102:
          case 103:
          case 104:
          case 105:
          case 106:
          case 107:
          case 108:
          case 109:
          case 110:
          case 111:
          case 112:
          case 113:
          case 114:
          case 115:
          case 116:
          case 117:
          case 118:
          case 119:
          case 120:
          case 121:
          case 122:
            tagnamebuf += String.fromCharCode(c);
            tempbuf.push(c);
            return;
          default:
            break;
        }
        textrun.push(60);
        textrun.push(47);
        pushAll(textrun, tempbuf);
        reconsume(c, script_data_escaped_state);
      }
      function script_data_double_escape_start_state(c) {
        switch (c) {
          case 9:
          // CHARACTER TABULATION (tab)
          case 10:
          // LINE FEED (LF)
          case 12:
          // FORM FEED (FF)
          case 32:
          // SPACE
          case 47:
          // SOLIDUS
          case 62:
            if (buf2str(tempbuf) === "script") {
              tokenizer = script_data_double_escaped_state;
            } else {
              tokenizer = script_data_escaped_state;
            }
            textrun.push(c);
            break;
          case 65:
          // [A-Z]
          case 66:
          case 67:
          case 68:
          case 69:
          case 70:
          case 71:
          case 72:
          case 73:
          case 74:
          case 75:
          case 76:
          case 77:
          case 78:
          case 79:
          case 80:
          case 81:
          case 82:
          case 83:
          case 84:
          case 85:
          case 86:
          case 87:
          case 88:
          case 89:
          case 90:
            tempbuf.push(c + 32);
            textrun.push(c);
            break;
          case 97:
          // [a-z]
          case 98:
          case 99:
          case 100:
          case 101:
          case 102:
          case 103:
          case 104:
          case 105:
          case 106:
          case 107:
          case 108:
          case 109:
          case 110:
          case 111:
          case 112:
          case 113:
          case 114:
          case 115:
          case 116:
          case 117:
          case 118:
          case 119:
          case 120:
          case 121:
          case 122:
            tempbuf.push(c);
            textrun.push(c);
            break;
          default:
            reconsume(c, script_data_escaped_state);
            break;
        }
      }
      function script_data_double_escaped_state(c) {
        switch (c) {
          case 45:
            tokenizer = script_data_double_escaped_dash_state;
            textrun.push(45);
            break;
          case 60:
            tokenizer = script_data_double_escaped_less_than_sign_state;
            textrun.push(60);
            break;
          case 0:
            textrun.push(65533);
            break;
          case -1:
            emitEOF();
            break;
          default:
            textrun.push(c);
            break;
        }
      }
      function script_data_double_escaped_dash_state(c) {
        switch (c) {
          case 45:
            tokenizer = script_data_double_escaped_dash_dash_state;
            textrun.push(45);
            break;
          case 60:
            tokenizer = script_data_double_escaped_less_than_sign_state;
            textrun.push(60);
            break;
          case 0:
            tokenizer = script_data_double_escaped_state;
            textrun.push(65533);
            break;
          case -1:
            emitEOF();
            break;
          default:
            tokenizer = script_data_double_escaped_state;
            textrun.push(c);
            break;
        }
      }
      function script_data_double_escaped_dash_dash_state(c) {
        switch (c) {
          case 45:
            textrun.push(45);
            break;
          case 60:
            tokenizer = script_data_double_escaped_less_than_sign_state;
            textrun.push(60);
            break;
          case 62:
            tokenizer = script_data_state;
            textrun.push(62);
            break;
          case 0:
            tokenizer = script_data_double_escaped_state;
            textrun.push(65533);
            break;
          case -1:
            emitEOF();
            break;
          default:
            tokenizer = script_data_double_escaped_state;
            textrun.push(c);
            break;
        }
      }
      function script_data_double_escaped_less_than_sign_state(c) {
        if (c === 47) {
          beginTempBuf();
          tokenizer = script_data_double_escape_end_state;
          textrun.push(47);
        } else {
          reconsume(c, script_data_double_escaped_state);
        }
      }
      function script_data_double_escape_end_state(c) {
        switch (c) {
          case 9:
          // CHARACTER TABULATION (tab)
          case 10:
          // LINE FEED (LF)
          case 12:
          // FORM FEED (FF)
          case 32:
          // SPACE
          case 47:
          // SOLIDUS
          case 62:
            if (buf2str(tempbuf) === "script") {
              tokenizer = script_data_escaped_state;
            } else {
              tokenizer = script_data_double_escaped_state;
            }
            textrun.push(c);
            break;
          case 65:
          // [A-Z]
          case 66:
          case 67:
          case 68:
          case 69:
          case 70:
          case 71:
          case 72:
          case 73:
          case 74:
          case 75:
          case 76:
          case 77:
          case 78:
          case 79:
          case 80:
          case 81:
          case 82:
          case 83:
          case 84:
          case 85:
          case 86:
          case 87:
          case 88:
          case 89:
          case 90:
            tempbuf.push(c + 32);
            textrun.push(c);
            break;
          case 97:
          // [a-z]
          case 98:
          case 99:
          case 100:
          case 101:
          case 102:
          case 103:
          case 104:
          case 105:
          case 106:
          case 107:
          case 108:
          case 109:
          case 110:
          case 111:
          case 112:
          case 113:
          case 114:
          case 115:
          case 116:
          case 117:
          case 118:
          case 119:
          case 120:
          case 121:
          case 122:
            tempbuf.push(c);
            textrun.push(c);
            break;
          default:
            reconsume(c, script_data_double_escaped_state);
            break;
        }
      }
      function before_attribute_name_state(c) {
        switch (c) {
          case 9:
          // CHARACTER TABULATION (tab)
          case 10:
          // LINE FEED (LF)
          case 12:
          // FORM FEED (FF)
          case 32:
            break;
          // For SOLIDUS, GREATER-THAN SIGN, and EOF, spec says "reconsume in
          // the after attribute name state", but in our implementation that
          // state always has an active attribute in attrnamebuf.  Just clone
          // the rules here, without the addAttribute business.
          case 47:
            tokenizer = self_closing_start_tag_state;
            break;
          case 62:
            tokenizer = data_state;
            emitTag();
            break;
          case -1:
            emitEOF();
            break;
          case 61:
            beginAttrName();
            attrnamebuf += String.fromCharCode(c);
            tokenizer = attribute_name_state;
            break;
          default:
            if (handleSimpleAttribute()) break;
            beginAttrName();
            reconsume(c, attribute_name_state);
            break;
        }
      }
      function attribute_name_state(c) {
        switch (c) {
          case 9:
          // CHARACTER TABULATION (tab)
          case 10:
          // LINE FEED (LF)
          case 12:
          // FORM FEED (FF)
          case 32:
          // SPACE
          case 47:
          // SOLIDUS
          case 62:
          // GREATER-THAN SIGN
          case -1:
            reconsume(c, after_attribute_name_state);
            break;
          case 61:
            tokenizer = before_attribute_value_state;
            break;
          case 65:
          // [A-Z]
          case 66:
          case 67:
          case 68:
          case 69:
          case 70:
          case 71:
          case 72:
          case 73:
          case 74:
          case 75:
          case 76:
          case 77:
          case 78:
          case 79:
          case 80:
          case 81:
          case 82:
          case 83:
          case 84:
          case 85:
          case 86:
          case 87:
          case 88:
          case 89:
          case 90:
            attrnamebuf += String.fromCharCode(c + 32);
            break;
          case 0:
            attrnamebuf += String.fromCharCode(
              65533
              /* REPLACEMENT CHARACTER */
            );
            break;
          case 34:
          // QUOTATION MARK
          case 39:
          // APOSTROPHE
          case 60:
          // LESS-THAN SIGN
          /* falls through */
          default:
            attrnamebuf += getMatchingChars(ATTRNAME);
            break;
        }
      }
      function after_attribute_name_state(c) {
        switch (c) {
          case 9:
          // CHARACTER TABULATION (tab)
          case 10:
          // LINE FEED (LF)
          case 12:
          // FORM FEED (FF)
          case 32:
            break;
          case 47:
            addAttribute(attrnamebuf);
            tokenizer = self_closing_start_tag_state;
            break;
          case 61:
            tokenizer = before_attribute_value_state;
            break;
          case 62:
            tokenizer = data_state;
            addAttribute(attrnamebuf);
            emitTag();
            break;
          case -1:
            addAttribute(attrnamebuf);
            emitEOF();
            break;
          default:
            addAttribute(attrnamebuf);
            beginAttrName();
            reconsume(c, attribute_name_state);
            break;
        }
      }
      function before_attribute_value_state(c) {
        switch (c) {
          case 9:
          // CHARACTER TABULATION (tab)
          case 10:
          // LINE FEED (LF)
          case 12:
          // FORM FEED (FF)
          case 32:
            break;
          case 34:
            beginAttrValue();
            tokenizer = attribute_value_double_quoted_state;
            break;
          case 39:
            beginAttrValue();
            tokenizer = attribute_value_single_quoted_state;
            break;
          case 62:
          // GREATER-THAN SIGN
          /* falls through */
          default:
            beginAttrValue();
            reconsume(c, attribute_value_unquoted_state);
            break;
        }
      }
      function attribute_value_double_quoted_state(c) {
        switch (c) {
          case 34:
            addAttribute(attrnamebuf, attrvaluebuf);
            tokenizer = after_attribute_value_quoted_state;
            break;
          case 38:
            return_state = attribute_value_double_quoted_state;
            tokenizer = character_reference_state;
            break;
          case 0:
            attrvaluebuf += String.fromCharCode(
              65533
              /* REPLACEMENT CHARACTER */
            );
            break;
          case -1:
            emitEOF();
            break;
          case 10:
            attrvaluebuf += String.fromCharCode(c);
            break;
          default:
            attrvaluebuf += getMatchingChars(DBLQUOTEATTRVAL);
            break;
        }
      }
      function attribute_value_single_quoted_state(c) {
        switch (c) {
          case 39:
            addAttribute(attrnamebuf, attrvaluebuf);
            tokenizer = after_attribute_value_quoted_state;
            break;
          case 38:
            return_state = attribute_value_single_quoted_state;
            tokenizer = character_reference_state;
            break;
          case 0:
            attrvaluebuf += String.fromCharCode(
              65533
              /* REPLACEMENT CHARACTER */
            );
            break;
          case -1:
            emitEOF();
            break;
          case 10:
            attrvaluebuf += String.fromCharCode(c);
            break;
          default:
            attrvaluebuf += getMatchingChars(SINGLEQUOTEATTRVAL);
            break;
        }
      }
      function attribute_value_unquoted_state(c) {
        switch (c) {
          case 9:
          // CHARACTER TABULATION (tab)
          case 10:
          // LINE FEED (LF)
          case 12:
          // FORM FEED (FF)
          case 32:
            addAttribute(attrnamebuf, attrvaluebuf);
            tokenizer = before_attribute_name_state;
            break;
          case 38:
            return_state = attribute_value_unquoted_state;
            tokenizer = character_reference_state;
            break;
          case 62:
            addAttribute(attrnamebuf, attrvaluebuf);
            tokenizer = data_state;
            emitTag();
            break;
          case 0:
            attrvaluebuf += String.fromCharCode(
              65533
              /* REPLACEMENT CHARACTER */
            );
            break;
          case -1:
            nextchar--;
            tokenizer = data_state;
            break;
          case 34:
          // QUOTATION MARK
          case 39:
          // APOSTROPHE
          case 60:
          // LESS-THAN SIGN
          case 61:
          // EQUALS SIGN
          case 96:
          // GRAVE ACCENT
          /* falls through */
          default:
            attrvaluebuf += getMatchingChars(UNQUOTEDATTRVAL);
            break;
        }
      }
      function after_attribute_value_quoted_state(c) {
        switch (c) {
          case 9:
          // CHARACTER TABULATION (tab)
          case 10:
          // LINE FEED (LF)
          case 12:
          // FORM FEED (FF)
          case 32:
            tokenizer = before_attribute_name_state;
            break;
          case 47:
            tokenizer = self_closing_start_tag_state;
            break;
          case 62:
            tokenizer = data_state;
            emitTag();
            break;
          case -1:
            emitEOF();
            break;
          default:
            reconsume(c, before_attribute_name_state);
            break;
        }
      }
      function self_closing_start_tag_state(c) {
        switch (c) {
          case 62:
            tokenizer = data_state;
            emitSelfClosingTag(true);
            break;
          case -1:
            emitEOF();
            break;
          default:
            reconsume(c, before_attribute_name_state);
            break;
        }
      }
      function bogus_comment_state(c, lookahead, eof) {
        var len = lookahead.length;
        if (eof) {
          nextchar += len - 1;
        } else {
          nextchar += len;
        }
        var comment = lookahead.substring(0, len - 1);
        comment = comment.replace(/\u0000/g, "\uFFFD");
        comment = comment.replace(/\u000D\u000A/g, "\n");
        comment = comment.replace(/\u000D/g, "\n");
        insertToken(COMMENT, comment);
        tokenizer = data_state;
      }
      bogus_comment_state.lookahead = ">";
      function markup_declaration_open_state(c, lookahead, eof) {
        if (lookahead[0] === "-" && lookahead[1] === "-") {
          nextchar += 2;
          beginComment();
          tokenizer = comment_start_state;
          return;
        }
        if (lookahead.toUpperCase() === "DOCTYPE") {
          nextchar += 7;
          tokenizer = doctype_state;
        } else if (lookahead === "[CDATA[" && cdataAllowed()) {
          nextchar += 7;
          tokenizer = cdata_section_state;
        } else {
          tokenizer = bogus_comment_state;
        }
      }
      markup_declaration_open_state.lookahead = 7;
      function comment_start_state(c) {
        beginComment();
        switch (c) {
          case 45:
            tokenizer = comment_start_dash_state;
            break;
          case 62:
            tokenizer = data_state;
            insertToken(COMMENT, buf2str(commentbuf));
            break;
          /* see comment in comment end state */
          default:
            reconsume(c, comment_state);
            break;
        }
      }
      function comment_start_dash_state(c) {
        switch (c) {
          case 45:
            tokenizer = comment_end_state;
            break;
          case 62:
            tokenizer = data_state;
            insertToken(COMMENT, buf2str(commentbuf));
            break;
          case -1:
            insertToken(COMMENT, buf2str(commentbuf));
            emitEOF();
            break;
          /* see comment in comment end state */
          default:
            commentbuf.push(
              45
              /* HYPHEN-MINUS */
            );
            reconsume(c, comment_state);
            break;
        }
      }
      function comment_state(c) {
        switch (c) {
          case 60:
            commentbuf.push(c);
            tokenizer = comment_less_than_sign_state;
            break;
          case 45:
            tokenizer = comment_end_dash_state;
            break;
          case 0:
            commentbuf.push(
              65533
              /* REPLACEMENT CHARACTER */
            );
            break;
          case -1:
            insertToken(COMMENT, buf2str(commentbuf));
            emitEOF();
            break;
          /* see comment in comment end state */
          default:
            commentbuf.push(c);
            break;
        }
      }
      function comment_less_than_sign_state(c) {
        switch (c) {
          case 33:
            commentbuf.push(c);
            tokenizer = comment_less_than_sign_bang_state;
            break;
          case 60:
            commentbuf.push(c);
            break;
          default:
            reconsume(c, comment_state);
            break;
        }
      }
      function comment_less_than_sign_bang_state(c) {
        switch (c) {
          case 45:
            tokenizer = comment_less_than_sign_bang_dash_state;
            break;
          default:
            reconsume(c, comment_state);
            break;
        }
      }
      function comment_less_than_sign_bang_dash_state(c) {
        switch (c) {
          case 45:
            tokenizer = comment_less_than_sign_bang_dash_dash_state;
            break;
          default:
            reconsume(c, comment_end_dash_state);
            break;
        }
      }
      function comment_less_than_sign_bang_dash_dash_state(c) {
        switch (c) {
          case 62:
          // GREATER-THAN SIGN
          case -1:
            reconsume(c, comment_end_state);
            break;
          default:
            reconsume(c, comment_end_state);
            break;
        }
      }
      function comment_end_dash_state(c) {
        switch (c) {
          case 45:
            tokenizer = comment_end_state;
            break;
          case -1:
            insertToken(COMMENT, buf2str(commentbuf));
            emitEOF();
            break;
          /* see comment in comment end state */
          default:
            commentbuf.push(
              45
              /* HYPHEN-MINUS */
            );
            reconsume(c, comment_state);
            break;
        }
      }
      function comment_end_state(c) {
        switch (c) {
          case 62:
            tokenizer = data_state;
            insertToken(COMMENT, buf2str(commentbuf));
            break;
          case 33:
            tokenizer = comment_end_bang_state;
            break;
          case 45:
            commentbuf.push(45);
            break;
          case -1:
            insertToken(COMMENT, buf2str(commentbuf));
            emitEOF();
            break;
          /* For security reasons: otherwise, hostile user could put a script in a comment e.g. in a blog comment and then DOS the server so that the end tag isn't read, and then the commented script tag would be treated as live code */
          default:
            commentbuf.push(45);
            commentbuf.push(45);
            reconsume(c, comment_state);
            break;
        }
      }
      function comment_end_bang_state(c) {
        switch (c) {
          case 45:
            commentbuf.push(45);
            commentbuf.push(45);
            commentbuf.push(33);
            tokenizer = comment_end_dash_state;
            break;
          case 62:
            tokenizer = data_state;
            insertToken(COMMENT, buf2str(commentbuf));
            break;
          case -1:
            insertToken(COMMENT, buf2str(commentbuf));
            emitEOF();
            break;
          /* see comment in comment end state */
          default:
            commentbuf.push(45);
            commentbuf.push(45);
            commentbuf.push(33);
            reconsume(c, comment_state);
            break;
        }
      }
      function doctype_state(c) {
        switch (c) {
          case 9:
          // CHARACTER TABULATION (tab)
          case 10:
          // LINE FEED (LF)
          case 12:
          // FORM FEED (FF)
          case 32:
            tokenizer = before_doctype_name_state;
            break;
          case -1:
            beginDoctype();
            forcequirks();
            emitDoctype();
            emitEOF();
            break;
          default:
            reconsume(c, before_doctype_name_state);
            break;
        }
      }
      function before_doctype_name_state(c) {
        switch (c) {
          case 9:
          // CHARACTER TABULATION (tab)
          case 10:
          // LINE FEED (LF)
          case 12:
          // FORM FEED (FF)
          case 32:
            break;
          case 65:
          // [A-Z]
          case 66:
          case 67:
          case 68:
          case 69:
          case 70:
          case 71:
          case 72:
          case 73:
          case 74:
          case 75:
          case 76:
          case 77:
          case 78:
          case 79:
          case 80:
          case 81:
          case 82:
          case 83:
          case 84:
          case 85:
          case 86:
          case 87:
          case 88:
          case 89:
          case 90:
            beginDoctype();
            doctypenamebuf.push(c + 32);
            tokenizer = doctype_name_state;
            break;
          case 0:
            beginDoctype();
            doctypenamebuf.push(65533);
            tokenizer = doctype_name_state;
            break;
          case 62:
            beginDoctype();
            forcequirks();
            tokenizer = data_state;
            emitDoctype();
            break;
          case -1:
            beginDoctype();
            forcequirks();
            emitDoctype();
            emitEOF();
            break;
          default:
            beginDoctype();
            doctypenamebuf.push(c);
            tokenizer = doctype_name_state;
            break;
        }
      }
      function doctype_name_state(c) {
        switch (c) {
          case 9:
          // CHARACTER TABULATION (tab)
          case 10:
          // LINE FEED (LF)
          case 12:
          // FORM FEED (FF)
          case 32:
            tokenizer = after_doctype_name_state;
            break;
          case 62:
            tokenizer = data_state;
            emitDoctype();
            break;
          case 65:
          // [A-Z]
          case 66:
          case 67:
          case 68:
          case 69:
          case 70:
          case 71:
          case 72:
          case 73:
          case 74:
          case 75:
          case 76:
          case 77:
          case 78:
          case 79:
          case 80:
          case 81:
          case 82:
          case 83:
          case 84:
          case 85:
          case 86:
          case 87:
          case 88:
          case 89:
          case 90:
            doctypenamebuf.push(c + 32);
            break;
          case 0:
            doctypenamebuf.push(
              65533
              /* REPLACEMENT CHARACTER */
            );
            break;
          case -1:
            forcequirks();
            emitDoctype();
            emitEOF();
            break;
          default:
            doctypenamebuf.push(c);
            break;
        }
      }
      function after_doctype_name_state(c, lookahead, eof) {
        switch (c) {
          case 9:
          // CHARACTER TABULATION (tab)
          case 10:
          // LINE FEED (LF)
          case 12:
          // FORM FEED (FF)
          case 32:
            nextchar += 1;
            break;
          case 62:
            tokenizer = data_state;
            nextchar += 1;
            emitDoctype();
            break;
          case -1:
            forcequirks();
            emitDoctype();
            emitEOF();
            break;
          default:
            lookahead = lookahead.toUpperCase();
            if (lookahead === "PUBLIC") {
              nextchar += 6;
              tokenizer = after_doctype_public_keyword_state;
            } else if (lookahead === "SYSTEM") {
              nextchar += 6;
              tokenizer = after_doctype_system_keyword_state;
            } else {
              forcequirks();
              tokenizer = bogus_doctype_state;
            }
            break;
        }
      }
      after_doctype_name_state.lookahead = 6;
      function after_doctype_public_keyword_state(c) {
        switch (c) {
          case 9:
          // CHARACTER TABULATION (tab)
          case 10:
          // LINE FEED (LF)
          case 12:
          // FORM FEED (FF)
          case 32:
            tokenizer = before_doctype_public_identifier_state;
            break;
          case 34:
            beginDoctypePublicId();
            tokenizer = doctype_public_identifier_double_quoted_state;
            break;
          case 39:
            beginDoctypePublicId();
            tokenizer = doctype_public_identifier_single_quoted_state;
            break;
          case 62:
            forcequirks();
            tokenizer = data_state;
            emitDoctype();
            break;
          case -1:
            forcequirks();
            emitDoctype();
            emitEOF();
            break;
          default:
            forcequirks();
            tokenizer = bogus_doctype_state;
            break;
        }
      }
      function before_doctype_public_identifier_state(c) {
        switch (c) {
          case 9:
          // CHARACTER TABULATION (tab)
          case 10:
          // LINE FEED (LF)
          case 12:
          // FORM FEED (FF)
          case 32:
            break;
          case 34:
            beginDoctypePublicId();
            tokenizer = doctype_public_identifier_double_quoted_state;
            break;
          case 39:
            beginDoctypePublicId();
            tokenizer = doctype_public_identifier_single_quoted_state;
            break;
          case 62:
            forcequirks();
            tokenizer = data_state;
            emitDoctype();
            break;
          case -1:
            forcequirks();
            emitDoctype();
            emitEOF();
            break;
          default:
            forcequirks();
            tokenizer = bogus_doctype_state;
            break;
        }
      }
      function doctype_public_identifier_double_quoted_state(c) {
        switch (c) {
          case 34:
            tokenizer = after_doctype_public_identifier_state;
            break;
          case 0:
            doctypepublicbuf.push(
              65533
              /* REPLACEMENT CHARACTER */
            );
            break;
          case 62:
            forcequirks();
            tokenizer = data_state;
            emitDoctype();
            break;
          case -1:
            forcequirks();
            emitDoctype();
            emitEOF();
            break;
          default:
            doctypepublicbuf.push(c);
            break;
        }
      }
      function doctype_public_identifier_single_quoted_state(c) {
        switch (c) {
          case 39:
            tokenizer = after_doctype_public_identifier_state;
            break;
          case 0:
            doctypepublicbuf.push(
              65533
              /* REPLACEMENT CHARACTER */
            );
            break;
          case 62:
            forcequirks();
            tokenizer = data_state;
            emitDoctype();
            break;
          case -1:
            forcequirks();
            emitDoctype();
            emitEOF();
            break;
          default:
            doctypepublicbuf.push(c);
            break;
        }
      }
      function after_doctype_public_identifier_state(c) {
        switch (c) {
          case 9:
          // CHARACTER TABULATION (tab)
          case 10:
          // LINE FEED (LF)
          case 12:
          // FORM FEED (FF)
          case 32:
            tokenizer = between_doctype_public_and_system_identifiers_state;
            break;
          case 62:
            tokenizer = data_state;
            emitDoctype();
            break;
          case 34:
            beginDoctypeSystemId();
            tokenizer = doctype_system_identifier_double_quoted_state;
            break;
          case 39:
            beginDoctypeSystemId();
            tokenizer = doctype_system_identifier_single_quoted_state;
            break;
          case -1:
            forcequirks();
            emitDoctype();
            emitEOF();
            break;
          default:
            forcequirks();
            tokenizer = bogus_doctype_state;
            break;
        }
      }
      function between_doctype_public_and_system_identifiers_state(c) {
        switch (c) {
          case 9:
          // CHARACTER TABULATION (tab)
          case 10:
          // LINE FEED (LF)
          case 12:
          // FORM FEED (FF)
          case 32:
            break;
          case 62:
            tokenizer = data_state;
            emitDoctype();
            break;
          case 34:
            beginDoctypeSystemId();
            tokenizer = doctype_system_identifier_double_quoted_state;
            break;
          case 39:
            beginDoctypeSystemId();
            tokenizer = doctype_system_identifier_single_quoted_state;
            break;
          case -1:
            forcequirks();
            emitDoctype();
            emitEOF();
            break;
          default:
            forcequirks();
            tokenizer = bogus_doctype_state;
            break;
        }
      }
      function after_doctype_system_keyword_state(c) {
        switch (c) {
          case 9:
          // CHARACTER TABULATION (tab)
          case 10:
          // LINE FEED (LF)
          case 12:
          // FORM FEED (FF)
          case 32:
            tokenizer = before_doctype_system_identifier_state;
            break;
          case 34:
            beginDoctypeSystemId();
            tokenizer = doctype_system_identifier_double_quoted_state;
            break;
          case 39:
            beginDoctypeSystemId();
            tokenizer = doctype_system_identifier_single_quoted_state;
            break;
          case 62:
            forcequirks();
            tokenizer = data_state;
            emitDoctype();
            break;
          case -1:
            forcequirks();
            emitDoctype();
            emitEOF();
            break;
          default:
            forcequirks();
            tokenizer = bogus_doctype_state;
            break;
        }
      }
      function before_doctype_system_identifier_state(c) {
        switch (c) {
          case 9:
          // CHARACTER TABULATION (tab)
          case 10:
          // LINE FEED (LF)
          case 12:
          // FORM FEED (FF)
          case 32:
            break;
          case 34:
            beginDoctypeSystemId();
            tokenizer = doctype_system_identifier_double_quoted_state;
            break;
          case 39:
            beginDoctypeSystemId();
            tokenizer = doctype_system_identifier_single_quoted_state;
            break;
          case 62:
            forcequirks();
            tokenizer = data_state;
            emitDoctype();
            break;
          case -1:
            forcequirks();
            emitDoctype();
            emitEOF();
            break;
          default:
            forcequirks();
            tokenizer = bogus_doctype_state;
            break;
        }
      }
      function doctype_system_identifier_double_quoted_state(c) {
        switch (c) {
          case 34:
            tokenizer = after_doctype_system_identifier_state;
            break;
          case 0:
            doctypesystembuf.push(
              65533
              /* REPLACEMENT CHARACTER */
            );
            break;
          case 62:
            forcequirks();
            tokenizer = data_state;
            emitDoctype();
            break;
          case -1:
            forcequirks();
            emitDoctype();
            emitEOF();
            break;
          default:
            doctypesystembuf.push(c);
            break;
        }
      }
      function doctype_system_identifier_single_quoted_state(c) {
        switch (c) {
          case 39:
            tokenizer = after_doctype_system_identifier_state;
            break;
          case 0:
            doctypesystembuf.push(
              65533
              /* REPLACEMENT CHARACTER */
            );
            break;
          case 62:
            forcequirks();
            tokenizer = data_state;
            emitDoctype();
            break;
          case -1:
            forcequirks();
            emitDoctype();
            emitEOF();
            break;
          default:
            doctypesystembuf.push(c);
            break;
        }
      }
      function after_doctype_system_identifier_state(c) {
        switch (c) {
          case 9:
          // CHARACTER TABULATION (tab)
          case 10:
          // LINE FEED (LF)
          case 12:
          // FORM FEED (FF)
          case 32:
            break;
          case 62:
            tokenizer = data_state;
            emitDoctype();
            break;
          case -1:
            forcequirks();
            emitDoctype();
            emitEOF();
            break;
          default:
            tokenizer = bogus_doctype_state;
            break;
        }
      }
      function bogus_doctype_state(c) {
        switch (c) {
          case 62:
            tokenizer = data_state;
            emitDoctype();
            break;
          case -1:
            emitDoctype();
            emitEOF();
            break;
          default:
            break;
        }
      }
      function cdata_section_state(c) {
        switch (c) {
          case 93:
            tokenizer = cdata_section_bracket_state;
            break;
          case -1:
            emitEOF();
            break;
          case 0:
            textIncludesNUL = true;
          /* fall through */
          default:
            emitCharsWhile(CDATATEXT) || textrun.push(c);
            break;
        }
      }
      function cdata_section_bracket_state(c) {
        switch (c) {
          case 93:
            tokenizer = cdata_section_end_state;
            break;
          default:
            textrun.push(93);
            reconsume(c, cdata_section_state);
            break;
        }
      }
      function cdata_section_end_state(c) {
        switch (c) {
          case 93:
            textrun.push(93);
            break;
          case 62:
            flushText();
            tokenizer = data_state;
            break;
          default:
            textrun.push(93);
            textrun.push(93);
            reconsume(c, cdata_section_state);
            break;
        }
      }
      function character_reference_state(c) {
        beginTempBuf();
        tempbuf.push(38);
        switch (c) {
          case 9:
          // TAB
          case 10:
          // LINE FEED
          case 12:
          // FORM FEED
          case 32:
          // SPACE
          case 60:
          // LESS-THAN SIGN
          case 38:
          // AMPERSAND
          case -1:
            reconsume(c, character_reference_end_state);
            break;
          case 35:
            tempbuf.push(c);
            tokenizer = numeric_character_reference_state;
            break;
          default:
            reconsume(c, named_character_reference_state);
            break;
        }
      }
      function named_character_reference_state(c) {
        NAMEDCHARREF.lastIndex = nextchar;
        var matched = NAMEDCHARREF.exec(chars);
        if (!matched) throw new Error("should never happen");
        var name = matched[1];
        if (!name) {
          tokenizer = character_reference_end_state;
          return;
        }
        nextchar += name.length;
        pushAll(tempbuf, str2buf(name));
        switch (return_state) {
          case attribute_value_double_quoted_state:
          case attribute_value_single_quoted_state:
          case attribute_value_unquoted_state:
            if (name[name.length - 1] !== ";") {
              if (/[=A-Za-z0-9]/.test(chars[nextchar])) {
                tokenizer = character_reference_end_state;
                return;
              }
            }
            break;
          default:
            break;
        }
        beginTempBuf();
        var rv = namedCharRefs[name];
        if (typeof rv === "number") {
          tempbuf.push(rv);
        } else {
          pushAll(tempbuf, rv);
        }
        tokenizer = character_reference_end_state;
      }
      named_character_reference_state.lookahead = -NAMEDCHARREF_MAXLEN;
      function numeric_character_reference_state(c) {
        character_reference_code = 0;
        switch (c) {
          case 120:
          // x
          case 88:
            tempbuf.push(c);
            tokenizer = hexadecimal_character_reference_start_state;
            break;
          default:
            reconsume(c, decimal_character_reference_start_state);
            break;
        }
      }
      function hexadecimal_character_reference_start_state(c) {
        switch (c) {
          case 48:
          case 49:
          case 50:
          case 51:
          case 52:
          case 53:
          case 54:
          case 55:
          case 56:
          case 57:
          // [0-9]
          case 65:
          case 66:
          case 67:
          case 68:
          case 69:
          case 70:
          // [A-F]
          case 97:
          case 98:
          case 99:
          case 100:
          case 101:
          case 102:
            reconsume(c, hexadecimal_character_reference_state);
            break;
          default:
            reconsume(c, character_reference_end_state);
            break;
        }
      }
      function decimal_character_reference_start_state(c) {
        switch (c) {
          case 48:
          case 49:
          case 50:
          case 51:
          case 52:
          case 53:
          case 54:
          case 55:
          case 56:
          case 57:
            reconsume(c, decimal_character_reference_state);
            break;
          default:
            reconsume(c, character_reference_end_state);
            break;
        }
      }
      function hexadecimal_character_reference_state(c) {
        switch (c) {
          case 65:
          case 66:
          case 67:
          case 68:
          case 69:
          case 70:
            character_reference_code *= 16;
            character_reference_code += c - 55;
            break;
          case 97:
          case 98:
          case 99:
          case 100:
          case 101:
          case 102:
            character_reference_code *= 16;
            character_reference_code += c - 87;
            break;
          case 48:
          case 49:
          case 50:
          case 51:
          case 52:
          case 53:
          case 54:
          case 55:
          case 56:
          case 57:
            character_reference_code *= 16;
            character_reference_code += c - 48;
            break;
          case 59:
            tokenizer = numeric_character_reference_end_state;
            break;
          default:
            reconsume(c, numeric_character_reference_end_state);
            break;
        }
      }
      function decimal_character_reference_state(c) {
        switch (c) {
          case 48:
          case 49:
          case 50:
          case 51:
          case 52:
          case 53:
          case 54:
          case 55:
          case 56:
          case 57:
            character_reference_code *= 10;
            character_reference_code += c - 48;
            break;
          case 59:
            tokenizer = numeric_character_reference_end_state;
            break;
          default:
            reconsume(c, numeric_character_reference_end_state);
            break;
        }
      }
      function numeric_character_reference_end_state(c) {
        if (character_reference_code in numericCharRefReplacements) {
          character_reference_code = numericCharRefReplacements[character_reference_code];
        } else if (character_reference_code > 1114111 || character_reference_code >= 55296 && character_reference_code < 57344) {
          character_reference_code = 65533;
        }
        beginTempBuf();
        if (character_reference_code <= 65535) {
          tempbuf.push(character_reference_code);
        } else {
          character_reference_code = character_reference_code - 65536;
          tempbuf.push(55296 + (character_reference_code >> 10));
          tempbuf.push(56320 + (character_reference_code & 1023));
        }
        reconsume(c, character_reference_end_state);
      }
      function character_reference_end_state(c) {
        switch (return_state) {
          case attribute_value_double_quoted_state:
          case attribute_value_single_quoted_state:
          case attribute_value_unquoted_state:
            attrvaluebuf += buf2str(tempbuf);
            break;
          default:
            pushAll(textrun, tempbuf);
            break;
        }
        reconsume(c, return_state);
      }
      function initial_mode(t, value, arg3, arg4) {
        switch (t) {
          case 1:
            value = value.replace(LEADINGWS, "");
            if (value.length === 0) return;
            break;
          // Handle anything non-space text below
          case 4:
            doc2._appendChild(doc2.createComment(value));
            return;
          case 5:
            var name = value;
            var publicid = arg3;
            var systemid = arg4;
            doc2.appendChild(new DocumentType(doc2, name, publicid, systemid));
            if (force_quirks || name.toLowerCase() !== "html" || quirkyPublicIds.test(publicid) || systemid && systemid.toLowerCase() === quirkySystemId || systemid === void 0 && conditionallyQuirkyPublicIds.test(publicid))
              doc2._quirks = true;
            else if (limitedQuirkyPublicIds.test(publicid) || systemid !== void 0 && conditionallyQuirkyPublicIds.test(publicid))
              doc2._limitedQuirks = true;
            parser = before_html_mode;
            return;
        }
        doc2._quirks = true;
        parser = before_html_mode;
        parser(t, value, arg3, arg4);
      }
      function before_html_mode(t, value, arg3, arg4) {
        var elt;
        switch (t) {
          case 1:
            value = value.replace(LEADINGWS, "");
            if (value.length === 0) return;
            break;
          // Handle anything non-space text below
          case 5:
            return;
          case 4:
            doc2._appendChild(doc2.createComment(value));
            return;
          case 2:
            if (value === "html") {
              elt = createHTMLElt(doc2, value, arg3);
              stack.push(elt);
              doc2.appendChild(elt);
              parser = before_head_mode;
              return;
            }
            break;
          case 3:
            switch (value) {
              case "html":
              case "head":
              case "body":
              case "br":
                break;
              // fall through on these
              default:
                return;
            }
        }
        elt = createHTMLElt(doc2, "html", null);
        stack.push(elt);
        doc2.appendChild(elt);
        parser = before_head_mode;
        parser(t, value, arg3, arg4);
      }
      function before_head_mode(t, value, arg3, arg4) {
        switch (t) {
          case 1:
            value = value.replace(LEADINGWS, "");
            if (value.length === 0) return;
            break;
          // Handle anything non-space text below
          case 5:
            return;
          case 4:
            insertComment(value);
            return;
          case 2:
            switch (value) {
              case "html":
                in_body_mode(t, value, arg3, arg4);
                return;
              case "head":
                var elt = insertHTMLElement(value, arg3);
                head_element_pointer = elt;
                parser = in_head_mode;
                return;
            }
            break;
          case 3:
            switch (value) {
              case "html":
              case "head":
              case "body":
              case "br":
                break;
              default:
                return;
            }
        }
        before_head_mode(TAG, "head", null);
        parser(t, value, arg3, arg4);
      }
      function in_head_mode(t, value, arg3, arg4) {
        switch (t) {
          case 1:
            var ws = value.match(LEADINGWS);
            if (ws) {
              insertText(ws[0]);
              value = value.substring(ws[0].length);
            }
            if (value.length === 0) return;
            break;
          // Handle non-whitespace below
          case 4:
            insertComment(value);
            return;
          case 5:
            return;
          case 2:
            switch (value) {
              case "html":
                in_body_mode(t, value, arg3, arg4);
                return;
              case "meta":
              // XXX:
              // May need to change the encoding based on this tag
              /* falls through */
              case "base":
              case "basefont":
              case "bgsound":
              case "link":
                insertHTMLElement(value, arg3);
                stack.pop();
                return;
              case "title":
                parseRCDATA(value, arg3);
                return;
              case "noscript":
                if (!scripting_enabled) {
                  insertHTMLElement(value, arg3);
                  parser = in_head_noscript_mode;
                  return;
                }
              // Otherwise, if scripting is enabled...
              /* falls through */
              case "noframes":
              case "style":
                parseRawText(value, arg3);
                return;
              case "script":
                insertElement(function(doc3) {
                  var elt = createHTMLElt(doc3, value, arg3);
                  elt._parser_inserted = true;
                  elt._force_async = false;
                  if (fragment) elt._already_started = true;
                  flushText();
                  return elt;
                });
                tokenizer = script_data_state;
                originalInsertionMode = parser;
                parser = text_mode;
                return;
              case "template":
                insertHTMLElement(value, arg3);
                afe.insertMarker();
                frameset_ok = false;
                parser = in_template_mode;
                templateInsertionModes.push(parser);
                return;
              case "head":
                return;
            }
            break;
          case 3:
            switch (value) {
              case "head":
                stack.pop();
                parser = after_head_mode;
                return;
              case "body":
              case "html":
              case "br":
                break;
              // handle these at the bottom of the function
              case "template":
                if (!stack.contains("template")) {
                  return;
                }
                stack.generateImpliedEndTags(null, "thorough");
                stack.popTag("template");
                afe.clearToMarker();
                templateInsertionModes.pop();
                resetInsertionMode();
                return;
              default:
                return;
            }
            break;
        }
        in_head_mode(ENDTAG, "head", null);
        parser(t, value, arg3, arg4);
      }
      function in_head_noscript_mode(t, value, arg3, arg4) {
        switch (t) {
          case 5:
            return;
          case 4:
            in_head_mode(t, value);
            return;
          case 1:
            var ws = value.match(LEADINGWS);
            if (ws) {
              in_head_mode(t, ws[0]);
              value = value.substring(ws[0].length);
            }
            if (value.length === 0) return;
            break;
          // Handle non-whitespace below
          case 2:
            switch (value) {
              case "html":
                in_body_mode(t, value, arg3, arg4);
                return;
              case "basefont":
              case "bgsound":
              case "link":
              case "meta":
              case "noframes":
              case "style":
                in_head_mode(t, value, arg3);
                return;
              case "head":
              case "noscript":
                return;
            }
            break;
          case 3:
            switch (value) {
              case "noscript":
                stack.pop();
                parser = in_head_mode;
                return;
              case "br":
                break;
              // goes to the outer default
              default:
                return;
            }
            break;
        }
        in_head_noscript_mode(ENDTAG, "noscript", null);
        parser(t, value, arg3, arg4);
      }
      function after_head_mode(t, value, arg3, arg4) {
        switch (t) {
          case 1:
            var ws = value.match(LEADINGWS);
            if (ws) {
              insertText(ws[0]);
              value = value.substring(ws[0].length);
            }
            if (value.length === 0) return;
            break;
          // Handle non-whitespace below
          case 4:
            insertComment(value);
            return;
          case 5:
            return;
          case 2:
            switch (value) {
              case "html":
                in_body_mode(t, value, arg3, arg4);
                return;
              case "body":
                insertHTMLElement(value, arg3);
                frameset_ok = false;
                parser = in_body_mode;
                return;
              case "frameset":
                insertHTMLElement(value, arg3);
                parser = in_frameset_mode;
                return;
              case "base":
              case "basefont":
              case "bgsound":
              case "link":
              case "meta":
              case "noframes":
              case "script":
              case "style":
              case "template":
              case "title":
                stack.push(head_element_pointer);
                in_head_mode(TAG, value, arg3);
                stack.removeElement(head_element_pointer);
                return;
              case "head":
                return;
            }
            break;
          case 3:
            switch (value) {
              case "template":
                return in_head_mode(t, value, arg3, arg4);
              case "body":
              case "html":
              case "br":
                break;
              default:
                return;
            }
            break;
        }
        after_head_mode(TAG, "body", null);
        frameset_ok = true;
        parser(t, value, arg3, arg4);
      }
      function in_body_mode(t, value, arg3, arg4) {
        var body, i, node, elt;
        switch (t) {
          case 1:
            if (textIncludesNUL) {
              value = value.replace(NULCHARS, "");
              if (value.length === 0) return;
            }
            if (frameset_ok && NONWS.test(value)) frameset_ok = false;
            afereconstruct();
            insertText(value);
            return;
          case 5:
            return;
          case 4:
            insertComment(value);
            return;
          case -1:
            if (templateInsertionModes.length) {
              return in_template_mode(t);
            }
            stopParsing();
            return;
          case 2:
            switch (value) {
              case "html":
                if (stack.contains("template")) {
                  return;
                }
                transferAttributes(arg3, stack.elements[0]);
                return;
              case "base":
              case "basefont":
              case "bgsound":
              case "link":
              case "meta":
              case "noframes":
              case "script":
              case "style":
              case "template":
              case "title":
                in_head_mode(TAG, value, arg3);
                return;
              case "body":
                body = stack.elements[1];
                if (!body || !(body instanceof impl.HTMLBodyElement) || stack.contains("template"))
                  return;
                frameset_ok = false;
                transferAttributes(arg3, body);
                return;
              case "frameset":
                if (!frameset_ok) return;
                body = stack.elements[1];
                if (!body || !(body instanceof impl.HTMLBodyElement)) return;
                if (body.parentNode) body.parentNode.removeChild(body);
                while (!(stack.top instanceof impl.HTMLHtmlElement)) stack.pop();
                insertHTMLElement(value, arg3);
                parser = in_frameset_mode;
                return;
              case "address":
              case "article":
              case "aside":
              case "blockquote":
              case "center":
              case "details":
              case "dialog":
              case "dir":
              case "div":
              case "dl":
              case "fieldset":
              case "figcaption":
              case "figure":
              case "footer":
              case "header":
              case "hgroup":
              case "main":
              case "nav":
              case "ol":
              case "p":
              case "section":
              case "summary":
              case "ul":
                if (stack.inButtonScope("p")) in_body_mode(ENDTAG, "p");
                insertHTMLElement(value, arg3);
                return;
              case "menu":
                if (stack.inButtonScope("p")) in_body_mode(ENDTAG, "p");
                if (isA(stack.top, "menuitem")) {
                  stack.pop();
                }
                insertHTMLElement(value, arg3);
                return;
              case "h1":
              case "h2":
              case "h3":
              case "h4":
              case "h5":
              case "h6":
                if (stack.inButtonScope("p")) in_body_mode(ENDTAG, "p");
                if (stack.top instanceof impl.HTMLHeadingElement) stack.pop();
                insertHTMLElement(value, arg3);
                return;
              case "pre":
              case "listing":
                if (stack.inButtonScope("p")) in_body_mode(ENDTAG, "p");
                insertHTMLElement(value, arg3);
                ignore_linefeed = true;
                frameset_ok = false;
                return;
              case "form":
                if (form_element_pointer && !stack.contains("template")) return;
                if (stack.inButtonScope("p")) in_body_mode(ENDTAG, "p");
                elt = insertHTMLElement(value, arg3);
                if (!stack.contains("template")) form_element_pointer = elt;
                return;
              case "li":
                frameset_ok = false;
                for (i = stack.elements.length - 1; i >= 0; i--) {
                  node = stack.elements[i];
                  if (node instanceof impl.HTMLLIElement) {
                    in_body_mode(ENDTAG, "li");
                    break;
                  }
                  if (isA(node, specialSet) && !isA(node, addressdivpSet)) break;
                }
                if (stack.inButtonScope("p")) in_body_mode(ENDTAG, "p");
                insertHTMLElement(value, arg3);
                return;
              case "dd":
              case "dt":
                frameset_ok = false;
                for (i = stack.elements.length - 1; i >= 0; i--) {
                  node = stack.elements[i];
                  if (isA(node, dddtSet)) {
                    in_body_mode(ENDTAG, node.localName);
                    break;
                  }
                  if (isA(node, specialSet) && !isA(node, addressdivpSet)) break;
                }
                if (stack.inButtonScope("p")) in_body_mode(ENDTAG, "p");
                insertHTMLElement(value, arg3);
                return;
              case "plaintext":
                if (stack.inButtonScope("p")) in_body_mode(ENDTAG, "p");
                insertHTMLElement(value, arg3);
                tokenizer = plaintext_state;
                return;
              case "button":
                if (stack.inScope("button")) {
                  in_body_mode(ENDTAG, "button");
                  parser(t, value, arg3, arg4);
                } else {
                  afereconstruct();
                  insertHTMLElement(value, arg3);
                  frameset_ok = false;
                }
                return;
              case "a":
                var activeElement = afe.findElementByTag("a");
                if (activeElement) {
                  in_body_mode(ENDTAG, value);
                  afe.remove(activeElement);
                  stack.removeElement(activeElement);
                }
              /* falls through */
              case "b":
              case "big":
              case "code":
              case "em":
              case "font":
              case "i":
              case "s":
              case "small":
              case "strike":
              case "strong":
              case "tt":
              case "u":
                afereconstruct();
                afe.push(insertHTMLElement(value, arg3), arg3);
                return;
              case "nobr":
                afereconstruct();
                if (stack.inScope(value)) {
                  in_body_mode(ENDTAG, value);
                  afereconstruct();
                }
                afe.push(insertHTMLElement(value, arg3), arg3);
                return;
              case "applet":
              case "marquee":
              case "object":
                afereconstruct();
                insertHTMLElement(value, arg3);
                afe.insertMarker();
                frameset_ok = false;
                return;
              case "table":
                if (!doc2._quirks && stack.inButtonScope("p")) {
                  in_body_mode(ENDTAG, "p");
                }
                insertHTMLElement(value, arg3);
                frameset_ok = false;
                parser = in_table_mode;
                return;
              case "area":
              case "br":
              case "embed":
              case "img":
              case "keygen":
              case "wbr":
                afereconstruct();
                insertHTMLElement(value, arg3);
                stack.pop();
                frameset_ok = false;
                return;
              case "input":
                afereconstruct();
                elt = insertHTMLElement(value, arg3);
                stack.pop();
                var type = elt.getAttribute("type");
                if (!type || type.toLowerCase() !== "hidden") frameset_ok = false;
                return;
              case "param":
              case "source":
              case "track":
                insertHTMLElement(value, arg3);
                stack.pop();
                return;
              case "hr":
                if (stack.inButtonScope("p")) in_body_mode(ENDTAG, "p");
                if (isA(stack.top, "menuitem")) {
                  stack.pop();
                }
                insertHTMLElement(value, arg3);
                stack.pop();
                frameset_ok = false;
                return;
              case "image":
                in_body_mode(TAG, "img", arg3, arg4);
                return;
              case "textarea":
                insertHTMLElement(value, arg3);
                ignore_linefeed = true;
                frameset_ok = false;
                tokenizer = rcdata_state;
                originalInsertionMode = parser;
                parser = text_mode;
                return;
              case "xmp":
                if (stack.inButtonScope("p")) in_body_mode(ENDTAG, "p");
                afereconstruct();
                frameset_ok = false;
                parseRawText(value, arg3);
                return;
              case "iframe":
                frameset_ok = false;
                parseRawText(value, arg3);
                return;
              case "noembed":
                parseRawText(value, arg3);
                return;
              case "noscript":
                if (scripting_enabled) {
                  parseRawText(value, arg3);
                  return;
                }
                break;
              // XXX Otherwise treat it as any other open tag?
              case "select":
                afereconstruct();
                insertHTMLElement(value, arg3);
                frameset_ok = false;
                if (parser === in_table_mode || parser === in_caption_mode || parser === in_table_body_mode || parser === in_row_mode || parser === in_cell_mode)
                  parser = in_select_in_table_mode;
                else parser = in_select_mode;
                return;
              case "optgroup":
              case "option":
                if (stack.top instanceof impl.HTMLOptionElement) {
                  in_body_mode(ENDTAG, "option");
                }
                afereconstruct();
                insertHTMLElement(value, arg3);
                return;
              case "menuitem":
                if (isA(stack.top, "menuitem")) {
                  stack.pop();
                }
                afereconstruct();
                insertHTMLElement(value, arg3);
                return;
              case "rb":
              case "rtc":
                if (stack.inScope("ruby")) {
                  stack.generateImpliedEndTags();
                }
                insertHTMLElement(value, arg3);
                return;
              case "rp":
              case "rt":
                if (stack.inScope("ruby")) {
                  stack.generateImpliedEndTags("rtc");
                }
                insertHTMLElement(value, arg3);
                return;
              case "math":
                afereconstruct();
                adjustMathMLAttributes(arg3);
                adjustForeignAttributes(arg3);
                insertForeignElement(value, arg3, NAMESPACE.MATHML);
                if (arg4)
                  stack.pop();
                return;
              case "svg":
                afereconstruct();
                adjustSVGAttributes(arg3);
                adjustForeignAttributes(arg3);
                insertForeignElement(value, arg3, NAMESPACE.SVG);
                if (arg4)
                  stack.pop();
                return;
              case "caption":
              case "col":
              case "colgroup":
              case "frame":
              case "head":
              case "tbody":
              case "td":
              case "tfoot":
              case "th":
              case "thead":
              case "tr":
                return;
            }
            afereconstruct();
            insertHTMLElement(value, arg3);
            return;
          case 3:
            switch (value) {
              case "template":
                in_head_mode(ENDTAG, value, arg3);
                return;
              case "body":
                if (!stack.inScope("body")) return;
                parser = after_body_mode;
                return;
              case "html":
                if (!stack.inScope("body")) return;
                parser = after_body_mode;
                parser(t, value, arg3);
                return;
              case "address":
              case "article":
              case "aside":
              case "blockquote":
              case "button":
              case "center":
              case "details":
              case "dialog":
              case "dir":
              case "div":
              case "dl":
              case "fieldset":
              case "figcaption":
              case "figure":
              case "footer":
              case "header":
              case "hgroup":
              case "listing":
              case "main":
              case "menu":
              case "nav":
              case "ol":
              case "pre":
              case "section":
              case "summary":
              case "ul":
                if (!stack.inScope(value)) return;
                stack.generateImpliedEndTags();
                stack.popTag(value);
                return;
              case "form":
                if (!stack.contains("template")) {
                  var openform = form_element_pointer;
                  form_element_pointer = null;
                  if (!openform || !stack.elementInScope(openform)) return;
                  stack.generateImpliedEndTags();
                  stack.removeElement(openform);
                } else {
                  if (!stack.inScope("form")) return;
                  stack.generateImpliedEndTags();
                  stack.popTag("form");
                }
                return;
              case "p":
                if (!stack.inButtonScope(value)) {
                  in_body_mode(TAG, value, null);
                  parser(t, value, arg3, arg4);
                } else {
                  stack.generateImpliedEndTags(value);
                  stack.popTag(value);
                }
                return;
              case "li":
                if (!stack.inListItemScope(value)) return;
                stack.generateImpliedEndTags(value);
                stack.popTag(value);
                return;
              case "dd":
              case "dt":
                if (!stack.inScope(value)) return;
                stack.generateImpliedEndTags(value);
                stack.popTag(value);
                return;
              case "h1":
              case "h2":
              case "h3":
              case "h4":
              case "h5":
              case "h6":
                if (!stack.elementTypeInScope(impl.HTMLHeadingElement)) return;
                stack.generateImpliedEndTags();
                stack.popElementType(impl.HTMLHeadingElement);
                return;
              case "sarcasm":
                break;
              case "a":
              case "b":
              case "big":
              case "code":
              case "em":
              case "font":
              case "i":
              case "nobr":
              case "s":
              case "small":
              case "strike":
              case "strong":
              case "tt":
              case "u":
                var result = adoptionAgency(value);
                if (result) return;
                break;
              // Go to the "any other end tag" case
              case "applet":
              case "marquee":
              case "object":
                if (!stack.inScope(value)) return;
                stack.generateImpliedEndTags();
                stack.popTag(value);
                afe.clearToMarker();
                return;
              case "br":
                in_body_mode(TAG, value, null);
                return;
            }
            for (i = stack.elements.length - 1; i >= 0; i--) {
              node = stack.elements[i];
              if (isA(node, value)) {
                stack.generateImpliedEndTags(value);
                stack.popElement(node);
                break;
              } else if (isA(node, specialSet)) {
                return;
              }
            }
            return;
        }
      }
      function text_mode(t, value, arg3, arg4) {
        switch (t) {
          case 1:
            insertText(value);
            return;
          case -1:
            if (stack.top instanceof impl.HTMLScriptElement) stack.top._already_started = true;
            stack.pop();
            parser = originalInsertionMode;
            parser(t);
            return;
          case 3:
            if (value === "script") {
              handleScriptEnd();
            } else {
              stack.pop();
              parser = originalInsertionMode;
            }
            return;
          default:
            return;
        }
      }
      function in_table_mode(t, value, arg3, arg4) {
        function getTypeAttr(attrs) {
          for (var i = 0, n = attrs.length; i < n; i++) {
            if (attrs[i][0] === "type") return attrs[i][1].toLowerCase();
          }
          return null;
        }
        switch (t) {
          case 1:
            if (text_integration_mode) {
              in_body_mode(t, value, arg3, arg4);
              return;
            } else if (isA(stack.top, tablesectionrowSet)) {
              pending_table_text = [];
              originalInsertionMode = parser;
              parser = in_table_text_mode;
              parser(t, value, arg3, arg4);
              return;
            }
            break;
          case 4:
            insertComment(value);
            return;
          case 5:
            return;
          case 2:
            switch (value) {
              case "caption":
                stack.clearToContext(tableContextSet);
                afe.insertMarker();
                insertHTMLElement(value, arg3);
                parser = in_caption_mode;
                return;
              case "colgroup":
                stack.clearToContext(tableContextSet);
                insertHTMLElement(value, arg3);
                parser = in_column_group_mode;
                return;
              case "col":
                in_table_mode(TAG, "colgroup", null);
                parser(t, value, arg3, arg4);
                return;
              case "tbody":
              case "tfoot":
              case "thead":
                stack.clearToContext(tableContextSet);
                insertHTMLElement(value, arg3);
                parser = in_table_body_mode;
                return;
              case "td":
              case "th":
              case "tr":
                in_table_mode(TAG, "tbody", null);
                parser(t, value, arg3, arg4);
                return;
              case "table":
                if (!stack.inTableScope(value)) {
                  return;
                }
                in_table_mode(ENDTAG, value);
                parser(t, value, arg3, arg4);
                return;
              case "style":
              case "script":
              case "template":
                in_head_mode(t, value, arg3, arg4);
                return;
              case "input":
                var type = getTypeAttr(arg3);
                if (type !== "hidden") break;
                insertHTMLElement(value, arg3);
                stack.pop();
                return;
              case "form":
                if (form_element_pointer || stack.contains("template")) return;
                form_element_pointer = insertHTMLElement(value, arg3);
                stack.popElement(form_element_pointer);
                return;
            }
            break;
          case 3:
            switch (value) {
              case "table":
                if (!stack.inTableScope(value)) return;
                stack.popTag(value);
                resetInsertionMode();
                return;
              case "body":
              case "caption":
              case "col":
              case "colgroup":
              case "html":
              case "tbody":
              case "td":
              case "tfoot":
              case "th":
              case "thead":
              case "tr":
                return;
              case "template":
                in_head_mode(t, value, arg3, arg4);
                return;
            }
            break;
          case -1:
            in_body_mode(t, value, arg3, arg4);
            return;
        }
        foster_parent_mode = true;
        in_body_mode(t, value, arg3, arg4);
        foster_parent_mode = false;
      }
      function in_table_text_mode(t, value, arg3, arg4) {
        if (t === TEXT) {
          if (textIncludesNUL) {
            value = value.replace(NULCHARS, "");
            if (value.length === 0) return;
          }
          pending_table_text.push(value);
        } else {
          var s = pending_table_text.join("");
          pending_table_text.length = 0;
          if (NONWS.test(s)) {
            foster_parent_mode = true;
            in_body_mode(TEXT, s);
            foster_parent_mode = false;
          } else {
            insertText(s);
          }
          parser = originalInsertionMode;
          parser(t, value, arg3, arg4);
        }
      }
      function in_caption_mode(t, value, arg3, arg4) {
        function end_caption() {
          if (!stack.inTableScope("caption")) return false;
          stack.generateImpliedEndTags();
          stack.popTag("caption");
          afe.clearToMarker();
          parser = in_table_mode;
          return true;
        }
        switch (t) {
          case 2:
            switch (value) {
              case "caption":
              case "col":
              case "colgroup":
              case "tbody":
              case "td":
              case "tfoot":
              case "th":
              case "thead":
              case "tr":
                if (end_caption()) parser(t, value, arg3, arg4);
                return;
            }
            break;
          case 3:
            switch (value) {
              case "caption":
                end_caption();
                return;
              case "table":
                if (end_caption()) parser(t, value, arg3, arg4);
                return;
              case "body":
              case "col":
              case "colgroup":
              case "html":
              case "tbody":
              case "td":
              case "tfoot":
              case "th":
              case "thead":
              case "tr":
                return;
            }
            break;
        }
        in_body_mode(t, value, arg3, arg4);
      }
      function in_column_group_mode(t, value, arg3, arg4) {
        switch (t) {
          case 1:
            var ws = value.match(LEADINGWS);
            if (ws) {
              insertText(ws[0]);
              value = value.substring(ws[0].length);
            }
            if (value.length === 0) return;
            break;
          // Handle non-whitespace below
          case 4:
            insertComment(value);
            return;
          case 5:
            return;
          case 2:
            switch (value) {
              case "html":
                in_body_mode(t, value, arg3, arg4);
                return;
              case "col":
                insertHTMLElement(value, arg3);
                stack.pop();
                return;
              case "template":
                in_head_mode(t, value, arg3, arg4);
                return;
            }
            break;
          case 3:
            switch (value) {
              case "colgroup":
                if (!isA(stack.top, "colgroup")) {
                  return;
                }
                stack.pop();
                parser = in_table_mode;
                return;
              case "col":
                return;
              case "template":
                in_head_mode(t, value, arg3, arg4);
                return;
            }
            break;
          case -1:
            in_body_mode(t, value, arg3, arg4);
            return;
        }
        if (!isA(stack.top, "colgroup")) {
          return;
        }
        in_column_group_mode(ENDTAG, "colgroup");
        parser(t, value, arg3, arg4);
      }
      function in_table_body_mode(t, value, arg3, arg4) {
        function endsect() {
          if (!stack.inTableScope("tbody") && !stack.inTableScope("thead") && !stack.inTableScope("tfoot"))
            return;
          stack.clearToContext(tableBodyContextSet);
          in_table_body_mode(ENDTAG, stack.top.localName, null);
          parser(t, value, arg3, arg4);
        }
        switch (t) {
          case 2:
            switch (value) {
              case "tr":
                stack.clearToContext(tableBodyContextSet);
                insertHTMLElement(value, arg3);
                parser = in_row_mode;
                return;
              case "th":
              case "td":
                in_table_body_mode(TAG, "tr", null);
                parser(t, value, arg3, arg4);
                return;
              case "caption":
              case "col":
              case "colgroup":
              case "tbody":
              case "tfoot":
              case "thead":
                endsect();
                return;
            }
            break;
          case 3:
            switch (value) {
              case "table":
                endsect();
                return;
              case "tbody":
              case "tfoot":
              case "thead":
                if (stack.inTableScope(value)) {
                  stack.clearToContext(tableBodyContextSet);
                  stack.pop();
                  parser = in_table_mode;
                }
                return;
              case "body":
              case "caption":
              case "col":
              case "colgroup":
              case "html":
              case "td":
              case "th":
              case "tr":
                return;
            }
            break;
        }
        in_table_mode(t, value, arg3, arg4);
      }
      function in_row_mode(t, value, arg3, arg4) {
        function endrow() {
          if (!stack.inTableScope("tr")) return false;
          stack.clearToContext(tableRowContextSet);
          stack.pop();
          parser = in_table_body_mode;
          return true;
        }
        switch (t) {
          case 2:
            switch (value) {
              case "th":
              case "td":
                stack.clearToContext(tableRowContextSet);
                insertHTMLElement(value, arg3);
                parser = in_cell_mode;
                afe.insertMarker();
                return;
              case "caption":
              case "col":
              case "colgroup":
              case "tbody":
              case "tfoot":
              case "thead":
              case "tr":
                if (endrow()) parser(t, value, arg3, arg4);
                return;
            }
            break;
          case 3:
            switch (value) {
              case "tr":
                endrow();
                return;
              case "table":
                if (endrow()) parser(t, value, arg3, arg4);
                return;
              case "tbody":
              case "tfoot":
              case "thead":
                if (stack.inTableScope(value)) {
                  if (endrow()) parser(t, value, arg3, arg4);
                }
                return;
              case "body":
              case "caption":
              case "col":
              case "colgroup":
              case "html":
              case "td":
              case "th":
                return;
            }
            break;
        }
        in_table_mode(t, value, arg3, arg4);
      }
      function in_cell_mode(t, value, arg3, arg4) {
        switch (t) {
          case 2:
            switch (value) {
              case "caption":
              case "col":
              case "colgroup":
              case "tbody":
              case "td":
              case "tfoot":
              case "th":
              case "thead":
              case "tr":
                if (stack.inTableScope("td")) {
                  in_cell_mode(ENDTAG, "td");
                  parser(t, value, arg3, arg4);
                } else if (stack.inTableScope("th")) {
                  in_cell_mode(ENDTAG, "th");
                  parser(t, value, arg3, arg4);
                }
                return;
            }
            break;
          case 3:
            switch (value) {
              case "td":
              case "th":
                if (!stack.inTableScope(value)) return;
                stack.generateImpliedEndTags();
                stack.popTag(value);
                afe.clearToMarker();
                parser = in_row_mode;
                return;
              case "body":
              case "caption":
              case "col":
              case "colgroup":
              case "html":
                return;
              case "table":
              case "tbody":
              case "tfoot":
              case "thead":
              case "tr":
                if (!stack.inTableScope(value)) return;
                in_cell_mode(ENDTAG, stack.inTableScope("td") ? "td" : "th");
                parser(t, value, arg3, arg4);
                return;
            }
            break;
        }
        in_body_mode(t, value, arg3, arg4);
      }
      function in_select_mode(t, value, arg3, arg4) {
        switch (t) {
          case 1:
            if (textIncludesNUL) {
              value = value.replace(NULCHARS, "");
              if (value.length === 0) return;
            }
            insertText(value);
            return;
          case 4:
            insertComment(value);
            return;
          case 5:
            return;
          case -1:
            in_body_mode(t, value, arg3, arg4);
            return;
          case 2:
            switch (value) {
              case "html":
                in_body_mode(t, value, arg3, arg4);
                return;
              case "option":
                if (stack.top instanceof impl.HTMLOptionElement) in_select_mode(ENDTAG, value);
                insertHTMLElement(value, arg3);
                return;
              case "optgroup":
                if (stack.top instanceof impl.HTMLOptionElement) in_select_mode(ENDTAG, "option");
                if (stack.top instanceof impl.HTMLOptGroupElement) in_select_mode(ENDTAG, value);
                insertHTMLElement(value, arg3);
                return;
              case "select":
                in_select_mode(ENDTAG, value);
                return;
              case "input":
              case "keygen":
              case "textarea":
                if (!stack.inSelectScope("select")) return;
                in_select_mode(ENDTAG, "select");
                parser(t, value, arg3, arg4);
                return;
              case "script":
              case "template":
                in_head_mode(t, value, arg3, arg4);
                return;
            }
            break;
          case 3:
            switch (value) {
              case "optgroup":
                if (stack.top instanceof impl.HTMLOptionElement && stack.elements[stack.elements.length - 2] instanceof impl.HTMLOptGroupElement) {
                  in_select_mode(ENDTAG, "option");
                }
                if (stack.top instanceof impl.HTMLOptGroupElement) stack.pop();
                return;
              case "option":
                if (stack.top instanceof impl.HTMLOptionElement) stack.pop();
                return;
              case "select":
                if (!stack.inSelectScope(value)) return;
                stack.popTag(value);
                resetInsertionMode();
                return;
              case "template":
                in_head_mode(t, value, arg3, arg4);
                return;
            }
            break;
        }
      }
      function in_select_in_table_mode(t, value, arg3, arg4) {
        switch (value) {
          case "caption":
          case "table":
          case "tbody":
          case "tfoot":
          case "thead":
          case "tr":
          case "td":
          case "th":
            switch (t) {
              case 2:
                in_select_in_table_mode(ENDTAG, "select");
                parser(t, value, arg3, arg4);
                return;
              case 3:
                if (stack.inTableScope(value)) {
                  in_select_in_table_mode(ENDTAG, "select");
                  parser(t, value, arg3, arg4);
                }
                return;
            }
        }
        in_select_mode(t, value, arg3, arg4);
      }
      function in_template_mode(t, value, arg3, arg4) {
        function switchModeAndReprocess(mode) {
          parser = mode;
          templateInsertionModes[templateInsertionModes.length - 1] = parser;
          parser(t, value, arg3, arg4);
        }
        switch (t) {
          case 1:
          // TEXT
          case 4:
          // COMMENT
          case 5:
            in_body_mode(t, value, arg3, arg4);
            return;
          case -1:
            if (!stack.contains("template")) {
              stopParsing();
            } else {
              stack.popTag("template");
              afe.clearToMarker();
              templateInsertionModes.pop();
              resetInsertionMode();
              parser(t, value, arg3, arg4);
            }
            return;
          case 2:
            switch (value) {
              case "base":
              case "basefont":
              case "bgsound":
              case "link":
              case "meta":
              case "noframes":
              case "script":
              case "style":
              case "template":
              case "title":
                in_head_mode(t, value, arg3, arg4);
                return;
              case "caption":
              case "colgroup":
              case "tbody":
              case "tfoot":
              case "thead":
                switchModeAndReprocess(in_table_mode);
                return;
              case "col":
                switchModeAndReprocess(in_column_group_mode);
                return;
              case "tr":
                switchModeAndReprocess(in_table_body_mode);
                return;
              case "td":
              case "th":
                switchModeAndReprocess(in_row_mode);
                return;
            }
            switchModeAndReprocess(in_body_mode);
            return;
          case 3:
            switch (value) {
              case "template":
                in_head_mode(t, value, arg3, arg4);
                return;
              default:
                return;
            }
        }
      }
      function after_body_mode(t, value, arg3, arg4) {
        switch (t) {
          case 1:
            if (NONWS.test(value)) break;
            in_body_mode(t, value);
            return;
          case 4:
            stack.elements[0]._appendChild(doc2.createComment(value));
            return;
          case 5:
            return;
          case -1:
            stopParsing();
            return;
          case 2:
            if (value === "html") {
              in_body_mode(t, value, arg3, arg4);
              return;
            }
            break;
          // for any other tags
          case 3:
            if (value === "html") {
              if (fragment) return;
              parser = after_after_body_mode;
              return;
            }
            break;
        }
        parser = in_body_mode;
        parser(t, value, arg3, arg4);
      }
      function in_frameset_mode(t, value, arg3, arg4) {
        switch (t) {
          case 1:
            value = value.replace(ALLNONWS, "");
            if (value.length > 0) insertText(value);
            return;
          case 4:
            insertComment(value);
            return;
          case 5:
            return;
          case -1:
            stopParsing();
            return;
          case 2:
            switch (value) {
              case "html":
                in_body_mode(t, value, arg3, arg4);
                return;
              case "frameset":
                insertHTMLElement(value, arg3);
                return;
              case "frame":
                insertHTMLElement(value, arg3);
                stack.pop();
                return;
              case "noframes":
                in_head_mode(t, value, arg3, arg4);
                return;
            }
            break;
          case 3:
            if (value === "frameset") {
              if (fragment && stack.top instanceof impl.HTMLHtmlElement) return;
              stack.pop();
              if (!fragment && !(stack.top instanceof impl.HTMLFrameSetElement))
                parser = after_frameset_mode;
              return;
            }
            break;
        }
      }
      function after_frameset_mode(t, value, arg3, arg4) {
        switch (t) {
          case 1:
            value = value.replace(ALLNONWS, "");
            if (value.length > 0) insertText(value);
            return;
          case 4:
            insertComment(value);
            return;
          case 5:
            return;
          case -1:
            stopParsing();
            return;
          case 2:
            switch (value) {
              case "html":
                in_body_mode(t, value, arg3, arg4);
                return;
              case "noframes":
                in_head_mode(t, value, arg3, arg4);
                return;
            }
            break;
          case 3:
            if (value === "html") {
              parser = after_after_frameset_mode;
              return;
            }
            break;
        }
      }
      function after_after_body_mode(t, value, arg3, arg4) {
        switch (t) {
          case 1:
            if (NONWS.test(value)) break;
            in_body_mode(t, value, arg3, arg4);
            return;
          case 4:
            doc2._appendChild(doc2.createComment(value));
            return;
          case 5:
            in_body_mode(t, value, arg3, arg4);
            return;
          case -1:
            stopParsing();
            return;
          case 2:
            if (value === "html") {
              in_body_mode(t, value, arg3, arg4);
              return;
            }
            break;
        }
        parser = in_body_mode;
        parser(t, value, arg3, arg4);
      }
      function after_after_frameset_mode(t, value, arg3, arg4) {
        switch (t) {
          case 1:
            value = value.replace(ALLNONWS, "");
            if (value.length > 0) in_body_mode(t, value, arg3, arg4);
            return;
          case 4:
            doc2._appendChild(doc2.createComment(value));
            return;
          case 5:
            in_body_mode(t, value, arg3, arg4);
            return;
          case -1:
            stopParsing();
            return;
          case 2:
            switch (value) {
              case "html":
                in_body_mode(t, value, arg3, arg4);
                return;
              case "noframes":
                in_head_mode(t, value, arg3, arg4);
                return;
            }
            break;
        }
      }
      function insertForeignToken(t, value, arg3, arg4) {
        function isHTMLFont(attrs) {
          for (var i2 = 0, n = attrs.length; i2 < n; i2++) {
            switch (attrs[i2][0]) {
              case "color":
              case "face":
              case "size":
                return true;
            }
          }
          return false;
        }
        var current;
        switch (t) {
          case 1:
            if (frameset_ok && NONWSNONNUL.test(value)) frameset_ok = false;
            if (textIncludesNUL) {
              value = value.replace(NULCHARS, "\uFFFD");
            }
            insertText(value);
            return;
          case 4:
            insertComment(value);
            return;
          case 5:
            return;
          case 2:
            switch (value) {
              case "font":
                if (!isHTMLFont(arg3)) break;
              /* falls through */
              case "b":
              case "big":
              case "blockquote":
              case "body":
              case "br":
              case "center":
              case "code":
              case "dd":
              case "div":
              case "dl":
              case "dt":
              case "em":
              case "embed":
              case "h1":
              case "h2":
              case "h3":
              case "h4":
              case "h5":
              case "h6":
              case "head":
              case "hr":
              case "i":
              case "img":
              case "li":
              case "listing":
              case "menu":
              case "meta":
              case "nobr":
              case "ol":
              case "p":
              case "pre":
              case "ruby":
              case "s":
              case "small":
              case "span":
              case "strong":
              case "strike":
              case "sub":
              case "sup":
              case "table":
              case "tt":
              case "u":
              case "ul":
              case "var":
                if (fragment) {
                  break;
                }
                do {
                  stack.pop();
                  current = stack.top;
                } while (current.namespaceURI !== NAMESPACE.HTML && !isMathmlTextIntegrationPoint(current) && !isHTMLIntegrationPoint(current));
                insertToken(t, value, arg3, arg4);
                return;
            }
            current = stack.elements.length === 1 && fragment ? fragmentContext : stack.top;
            if (current.namespaceURI === NAMESPACE.MATHML) {
              adjustMathMLAttributes(arg3);
            } else if (current.namespaceURI === NAMESPACE.SVG) {
              value = adjustSVGTagName(value);
              adjustSVGAttributes(arg3);
            }
            adjustForeignAttributes(arg3);
            insertForeignElement(value, arg3, current.namespaceURI);
            if (arg4) {
              if (value === "script" && current.namespaceURI === NAMESPACE.SVG) {
              }
              stack.pop();
            }
            return;
          case 3:
            current = stack.top;
            if (value === "script" && current.namespaceURI === NAMESPACE.SVG && current.localName === "script") {
              stack.pop();
            } else {
              var i = stack.elements.length - 1;
              var node = stack.elements[i];
              for (; ; ) {
                if (node.localName.toLowerCase() === value) {
                  stack.popElement(node);
                  break;
                }
                node = stack.elements[--i];
                if (node.namespaceURI !== NAMESPACE.HTML) continue;
                parser(t, value, arg3, arg4);
                break;
              }
            }
            return;
        }
      }
      htmlparser.testTokenizer = function(input, initialState, lastStartTag, charbychar) {
        var tokens = [];
        switch (initialState) {
          case "PCDATA state":
            tokenizer = data_state;
            break;
          case "RCDATA state":
            tokenizer = rcdata_state;
            break;
          case "RAWTEXT state":
            tokenizer = rawtext_state;
            break;
          case "PLAINTEXT state":
            tokenizer = plaintext_state;
            break;
        }
        if (lastStartTag) {
          lasttagname = lastStartTag;
        }
        insertToken = function(t, value, arg3, arg4) {
          flushText();
          switch (t) {
            case 1:
              if (tokens.length > 0 && tokens[tokens.length - 1][0] === "Character") {
                tokens[tokens.length - 1][1] += value;
              } else tokens.push(["Character", value]);
              break;
            case 4:
              tokens.push(["Comment", value]);
              break;
            case 5:
              tokens.push([
                "DOCTYPE",
                value,
                arg3 === void 0 ? null : arg3,
                arg4 === void 0 ? null : arg4,
                !force_quirks
              ]);
              break;
            case 2:
              var attrs = /* @__PURE__ */ Object.create(null);
              for (var i2 = 0; i2 < arg3.length; i2++) {
                var a = arg3[i2];
                if (a.length === 1) {
                  attrs[a[0]] = "";
                } else {
                  attrs[a[0]] = a[1];
                }
              }
              var token = ["StartTag", value, attrs];
              if (arg4) token.push(true);
              tokens.push(token);
              break;
            case 3:
              tokens.push(["EndTag", value]);
              break;
            case -1:
              break;
          }
        };
        if (!charbychar) {
          this.parse(input, true);
        } else {
          for (var i = 0; i < input.length; i++) {
            this.parse(input[i]);
          }
          this.parse("", true);
        }
        return tokens;
      };
      return htmlparser;
    }
  }
});

// packages/qwik-dom/lib/DOMImplementation.js
var require_DOMImplementation = __commonJS({
  "packages/qwik-dom/lib/DOMImplementation.js"(exports2, module2) {
    "use strict";
    module2.exports = DOMImplementation;
    var Document = require_Document();
    var DocumentType = require_DocumentType();
    var HTMLParser = require_HTMLParser();
    var utils = require_utils();
    var xml = require_xmlnames();
    function DOMImplementation(contextObject) {
      this.contextObject = contextObject;
    }
    var supportedFeatures = {
      xml: { "": true, "1.0": true, "2.0": true },
      // DOM Core
      core: { "": true, "2.0": true },
      // DOM Core
      html: { "": true, "1.0": true, "2.0": true },
      // HTML
      xhtml: { "": true, "1.0": true, "2.0": true }
      // HTML
    };
    DOMImplementation.prototype = {
      hasFeature: function hasFeature(feature, version2) {
        var f = supportedFeatures[(feature || "").toLowerCase()];
        return f && f[version2 || ""] || false;
      },
      createDocumentType: function createDocumentType(qualifiedName, publicId, systemId) {
        if (!xml.isValidQName(qualifiedName)) utils.InvalidCharacterError();
        return new DocumentType(this.contextObject, qualifiedName, publicId, systemId);
      },
      createDocument: function createDocument2(namespace, qualifiedName, doctype) {
        var d = new Document(false, null);
        var e;
        if (qualifiedName) e = d.createElementNS(namespace, qualifiedName);
        else e = null;
        if (doctype) {
          d.appendChild(doctype);
        }
        if (e) d.appendChild(e);
        if (namespace === utils.NAMESPACE.HTML) {
          d._contentType = "application/xhtml+xml";
        } else if (namespace === utils.NAMESPACE.SVG) {
          d._contentType = "image/svg+xml";
        } else {
          d._contentType = "application/xml";
        }
        return d;
      },
      createHTMLDocument: function createHTMLDocument(titleText) {
        var d = new Document(true, null);
        d.appendChild(new DocumentType(d, "html"));
        var html = d.createElement("html");
        d.appendChild(html);
        var head = d.createElement("head");
        html.appendChild(head);
        if (titleText !== void 0) {
          var title = d.createElement("title");
          head.appendChild(title);
          title.appendChild(d.createTextNode(titleText));
        }
        html.appendChild(d.createElement("body"));
        d.modclock = 1;
        return d;
      },
      mozSetOutputMutationHandler: function(doc2, handler) {
        doc2.mutationHandler = handler;
      },
      mozGetInputMutationHandler: function(doc2) {
        utils.nyi();
      },
      mozHTMLParser: HTMLParser
    };
  }
});

// packages/qwik-dom/lib/Location.js
var require_Location = __commonJS({
  "packages/qwik-dom/lib/Location.js"(exports2, module2) {
    "use strict";
    var URL2 = require_URL();
    var URLUtils = require_URLUtils();
    module2.exports = Location;
    function Location(window2, href) {
      this._window = window2;
      this._href = href;
    }
    Location.prototype = Object.create(URLUtils.prototype, {
      constructor: { value: Location },
      // Special behavior when href is set
      href: {
        get: function() {
          return this._href;
        },
        set: function(v) {
          this.assign(v);
        }
      },
      assign: {
        value: function(url) {
          var current = new URL2(this._href);
          var newurl = current.resolve(url);
          this._href = newurl;
        }
      },
      replace: {
        value: function(url) {
          this.assign(url);
        }
      },
      reload: {
        value: function() {
          this.assign(this.href);
        }
      },
      toString: {
        value: function() {
          return this.href;
        }
      }
    });
  }
});

// packages/qwik-dom/lib/NavigatorID.js
var require_NavigatorID = __commonJS({
  "packages/qwik-dom/lib/NavigatorID.js"(exports2, module2) {
    "use strict";
    var NavigatorID = Object.create(null, {
      appCodeName: { value: "Mozilla" },
      appName: { value: "Netscape" },
      appVersion: { value: "4.0" },
      platform: { value: "" },
      product: { value: "Gecko" },
      productSub: { value: "20100101" },
      userAgent: { value: "" },
      vendor: { value: "" },
      vendorSub: { value: "" },
      taintEnabled: {
        value: function() {
          return false;
        }
      }
    });
    module2.exports = NavigatorID;
  }
});

// packages/qwik-dom/lib/WindowTimers.js
var require_WindowTimers = __commonJS({
  "packages/qwik-dom/lib/WindowTimers.js"(exports2, module2) {
    "use strict";
    var WindowTimers = {
      setTimeout,
      clearTimeout,
      setInterval,
      clearInterval
    };
    module2.exports = WindowTimers;
  }
});

// packages/qwik-dom/lib/impl.js
var require_impl = __commonJS({
  "packages/qwik-dom/lib/impl.js"(exports2, module2) {
    "use strict";
    var utils = require_utils();
    exports2 = module2.exports = {
      CSSStyleDeclaration: require_CSSStyleDeclaration(),
      CharacterData: require_CharacterData(),
      Comment: require_Comment(),
      DOMException: require_DOMException(),
      DOMImplementation: require_DOMImplementation(),
      DOMTokenList: require_DOMTokenList(),
      Document: require_Document(),
      DocumentFragment: require_DocumentFragment(),
      DocumentType: require_DocumentType(),
      Element: require_Element(),
      HTMLParser: require_HTMLParser(),
      NamedNodeMap: require_NamedNodeMap(),
      Node: require_Node(),
      NodeList: require_NodeList(),
      NodeFilter: require_NodeFilter(),
      ProcessingInstruction: require_ProcessingInstruction(),
      Text: require_Text(),
      Window: require_Window()
    };
    utils.merge(exports2, require_events());
    utils.merge(exports2, require_htmlelts().elements);
    utils.merge(exports2, require_svg().elements);
  }
});

// packages/qwik-dom/lib/Window.js
var require_Window = __commonJS({
  "packages/qwik-dom/lib/Window.js"(exports2, module2) {
    "use strict";
    var DOMImplementation = require_DOMImplementation();
    var EventTarget = require_EventTarget();
    var Location = require_Location();
    var utils = require_utils();
    module2.exports = Window;
    function Window(document2) {
      this.document = document2 || new DOMImplementation(null).createHTMLDocument("");
      this.document._scripting_enabled = true;
      this.document.defaultView = this;
      this.location = new Location(this, this.document._address || "about:blank");
    }
    Window.prototype = Object.create(EventTarget.prototype, {
      console: { value: console },
      history: {
        value: {
          back: utils.nyi,
          forward: utils.nyi,
          go: utils.nyi
        }
      },
      navigator: { value: require_NavigatorID() },
      // Self-referential properties
      window: {
        get: function() {
          return this;
        }
      },
      self: {
        get: function() {
          return this;
        }
      },
      frames: {
        get: function() {
          return this;
        }
      },
      // Self-referential properties for a top-level window
      parent: {
        get: function() {
          return this;
        }
      },
      top: {
        get: function() {
          return this;
        }
      },
      // We don't support any other windows for now
      length: { value: 0 },
      // no frames
      frameElement: { value: null },
      // not part of a frame
      opener: { value: null },
      // not opened by another window
      // The onload event handler.
      // XXX: need to support a bunch of other event types, too,
      // and have them interoperate with document.body.
      onload: {
        get: function() {
          return this._getEventHandler("load");
        },
        set: function(v) {
          this._setEventHandler("load", v);
        }
      },
      // XXX This is a completely broken implementation
      getComputedStyle: {
        value: function getComputedStyle(elt) {
          return elt.style;
        }
      }
    });
    utils.expose(require_WindowTimers(), Window);
    utils.expose(require_impl(), Window);
  }
});

// packages/qwik-dom/lib/index.js
var require_lib = __commonJS({
  "packages/qwik-dom/lib/index.js"(exports2) {
    "use strict";
    var DOMImplementation = require_DOMImplementation();
    var HTMLParser = require_HTMLParser();
    var Window = require_Window();
    exports2.createDOMImplementation = function() {
      return new DOMImplementation(null);
    };
    exports2.createDocument = function(html, force) {
      if (html || force) {
        var parser = new HTMLParser();
        parser.parse(html || "", true);
        return parser.document();
      }
      return new DOMImplementation(null).createHTMLDocument("");
    };
    exports2.createIncrementalHTMLParser = function() {
      var parser = new HTMLParser();
      return {
        /** Provide an additional chunk of text to be parsed. */
        write: function(s) {
          if (s.length > 0) {
            parser.parse(s, false, function() {
              return true;
            });
          }
        },
        /**
         * Signal that we are done providing input text, optionally
         * providing one last chunk as a parameter.
         */
        end: function(s) {
          parser.parse(s || "", true, function() {
            return true;
          });
        },
        /**
         * Performs a chunk of parsing work, returning at the end of
         * the next token as soon as shouldPauseFunc() returns true.
         * Returns true iff there is more work to do.
         *
         * For example:
         * ```
         *  var incrParser = domino.createIncrementalHTMLParser();
         *  incrParser.end('...long html document...');
         *  while (true) {
         *    // Pause every 10ms
         *    var start = Date.now();
         *    var pauseIn10 = function() { return (Date.now() - start) >= 10; };
         *    if (!incrParser.process(pauseIn10)) {
         *      break;
         *    }
         *    ...yield to other tasks, do other housekeeping, etc...
         *  }
         * ```
         */
        process: function(shouldPauseFunc) {
          return parser.parse("", false, shouldPauseFunc);
        },
        /**
         * Returns the result of the incremental parse.  Valid after
         * `this.end()` has been called and `this.process()` has returned
         * false.
         */
        document: function() {
          return parser.document();
        }
      };
    };
    exports2.impl = require_impl();
  }
});

// packages/qwik/src/testing/index.ts
var index_exports = {};
__export(index_exports, {
  createDOM: () => createDOM
});
module.exports = __toCommonJS(index_exports);

// packages/qwik/src/core/util/element.ts
var isNode = (value) => {
  return value && typeof value.nodeType === "number";
};
var isDocument = (value) => {
  return value.nodeType === 9;
};
var isElement = (value) => {
  return value.nodeType === 1;
};
var isQwikElement = (value) => {
  const nodeType = value.nodeType;
  return nodeType === 1 || nodeType === 111;
};
var isNodeElement = (value) => {
  const nodeType = value.nodeType;
  return nodeType === 1 || nodeType === 111 || nodeType === 3;
};
var isVirtualElement = (value) => {
  return value.nodeType === 111;
};
var isComment = (value) => {
  return value.nodeType === 8;
};

// packages/qwik/src/core/util/qdev.ts
var qDev = globalThis.qDev !== false;
var qInspector = globalThis.qInspector === true;
var qSerialize = globalThis.qSerialize !== false;
var qDynamicPlatform = globalThis.qDynamicPlatform !== false;
var qTest = globalThis.qTest === true;
var qRuntimeQrl = globalThis.qRuntimeQrl === true;
var seal = (obj) => {
  if (qDev) {
    Object.seal(obj);
  }
};

// packages/qwik/src/core/util/log.ts
var STYLE = qDev ? `background: #564CE0; color: white; padding: 2px 3px; border-radius: 2px; font-size: 0.8em;` : "";
var logError = (message, ...optionalParams) => {
  return createAndLogError(false, message, ...optionalParams);
};
var throwErrorAndStop = (message, ...optionalParams) => {
  const error = createAndLogError(false, message, ...optionalParams);
  debugger;
  throw error;
};
var logErrorAndStop = (message, ...optionalParams) => {
  const err = createAndLogError(qDev, message, ...optionalParams);
  debugger;
  return err;
};
var _printed = /* @__PURE__ */ new Set();
var logOnceWarn = (message, ...optionalParams) => {
  if (qDev) {
    const key = "warn" + String(message);
    if (!_printed.has(key)) {
      _printed.add(key);
      logWarn(message, ...optionalParams);
    }
  }
};
var logWarn = (message, ...optionalParams) => {
  if (qDev) {
    console.warn("%cQWIK WARN", STYLE, message, ...printParams(optionalParams));
  }
};
var tryGetContext = (element) => {
  return element["_qc_"];
};
var printParams = (optionalParams) => {
  if (qDev) {
    return optionalParams.map((p) => {
      if (isNode(p) && isElement(p)) {
        return printElement(p);
      }
      return p;
    });
  }
  return optionalParams;
};
var printElement = (el) => {
  var _a;
  const ctx = tryGetContext(el);
  const isServer2 = /* @__PURE__ */ (() => typeof process !== "undefined" && !!process.versions && !!process.versions.node)();
  return {
    tagName: el.tagName,
    renderQRL: (_a = ctx == null ? void 0 : ctx.$componentQrl$) == null ? void 0 : _a.getSymbol(),
    element: isServer2 ? void 0 : el,
    ctx: isServer2 ? void 0 : ctx
  };
};
var createAndLogError = (asyncThrow, message, ...optionalParams) => {
  const err = message instanceof Error ? message : new Error(message);
  console.error("%cQWIK ERROR", STYLE, err.message, ...printParams(optionalParams), err.stack);
  asyncThrow && !qTest && setTimeout(() => {
    throw err;
  }, 0);
  return err;
};

// packages/qwik/src/core/error/assert.ts
var ASSERT_DISCLAIMER = "Internal assert, this is likely caused by a bug in Qwik: ";
function assertDefined(value, text, ...parts) {
  if (qDev) {
    if (value != null) {
      return;
    }
    throwErrorAndStop(ASSERT_DISCLAIMER + text, ...parts);
  }
}
function assertEqual(value1, value2, text, ...parts) {
  if (qDev) {
    if (value1 === value2) {
      return;
    }
    throwErrorAndStop(ASSERT_DISCLAIMER + text, ...parts);
  }
}
function assertFail(text, ...parts) {
  if (qDev) {
    throwErrorAndStop(ASSERT_DISCLAIMER + text, ...parts);
  }
}
function assertTrue(value1, text, ...parts) {
  if (qDev) {
    if (value1 === true) {
      return;
    }
    throwErrorAndStop(ASSERT_DISCLAIMER + text, ...parts);
  }
}
function assertNumber(value1, text, ...parts) {
  if (qDev) {
    if (typeof value1 === "number") {
      return;
    }
    throwErrorAndStop(ASSERT_DISCLAIMER + text, ...parts);
  }
}
function assertString(value1, text, ...parts) {
  if (qDev) {
    if (typeof value1 === "string") {
      return;
    }
    throwErrorAndStop(ASSERT_DISCLAIMER + text, ...parts);
  }
}
function assertQwikElement(el) {
  if (qDev) {
    if (!isQwikElement(el)) {
      console.error("Not a Qwik Element, got", el);
      throwErrorAndStop(ASSERT_DISCLAIMER + "Not a Qwik Element");
    }
  }
}

// packages/qwik/src/core/error/error.ts
var codeToText = (code2, ...parts) => {
  if (qDev) {
    const MAP = [
      "Error while serializing class or style attributes",
      // 0
      "Can not serialize a HTML Node that is not an Element",
      // 1
      "Runtime but no instance found on element.",
      // 2
      "Only primitive and object literals can be serialized",
      // 3
      "Crash while rendering",
      // 4
      "You can render over a existing q:container. Skipping render().",
      // 5
      "Set property {{0}}",
      // 6
      "Only function's and 'string's are supported.",
      // 7
      "Only objects can be wrapped in 'QObject'",
      // 8
      `Only objects literals can be wrapped in 'QObject'`,
      // 9
      "QRL is not a function",
      // 10
      "Dynamic import not found",
      // 11
      "Unknown type argument",
      // 12
      `Actual value for useContext({{0}}) can not be found, make sure some ancestor component has set a value using useContextProvider(). In the browser make sure that the context was used during SSR so its state was serialized.`,
      // 13
      "Invoking 'use*()' method outside of invocation context.",
      // 14
      "Cant access renderCtx for existing context",
      // 15
      "Cant access document for existing context",
      // 16
      "props are immutable",
      // 17
      "<div> component can only be used at the root of a Qwik component$()",
      // 18
      "Props are immutable by default.",
      // 19
      `Calling a 'use*()' method outside 'component$(() => { HERE })' is not allowed. 'use*()' methods provide hooks to the 'component$' state and lifecycle, ie 'use' hooks can only be called synchronously within the 'component$' function or another 'use' method.
See https://qwik.dev/docs/components/tasks/#use-method-rules`,
      // 20
      "Container is already paused. Skipping",
      // 21
      "",
      // 22 -- unused
      "When rendering directly on top of Document, the root node must be a <html>",
      // 23
      "A <html> node must have 2 children. The first one <head> and the second one a <body>",
      // 24
      'Invalid JSXNode type "{{0}}". It must be either a function or a string. Found:',
      // 25
      "Tracking value changes can only be done to useStore() objects and component props",
      // 26
      "Missing Object ID for captured object",
      // 27
      'The provided Context reference "{{0}}" is not a valid context created by createContextId()',
      // 28
      "<html> is the root container, it can not be rendered inside a component",
      // 29
      "QRLs can not be resolved because it does not have an attached container. This means that the QRL does not know where it belongs inside the DOM, so it cant dynamically import() from a relative path.",
      // 30
      "QRLs can not be dynamically resolved, because it does not have a chunk path",
      // 31
      "The JSX ref attribute must be a Signal"
      // 32
    ];
    let text = MAP[code2] ?? "";
    if (parts.length) {
      text = text.replaceAll(/{{(\d+)}}/g, (_, index) => {
        let v = parts[index];
        if (v && typeof v === "object" && v.constructor === Object) {
          v = JSON.stringify(v).slice(0, 50);
        }
        return v;
      });
    }
    return `Code(${code2}): ${text}`;
  } else {
    return `Code(${code2}) https://github.com/QwikDev/qwik/blob/main/packages/qwik/src/core/error/error.ts#L${8 + code2}`;
  }
};
var QError_verifySerializable = 3;
var QError_setProperty = 6;
var QError_qrlIsNotFunction = 10;
var QError_immutableProps = 17;
var QError_useInvokeContext = 20;
var QError_qrlMissingContainer = 30;
var QError_qrlMissingChunk = 31;
var qError = (code2, ...parts) => {
  const text = codeToText(code2, ...parts);
  return logErrorAndStop(text, ...parts);
};

// packages/qwik/src/core/util/types.ts
var isSerializableObject = (v) => {
  const proto = Object.getPrototypeOf(v);
  return proto === Object.prototype || proto === null;
};
var isObject = (v) => {
  return !!v && typeof v === "object";
};
var isArray = (v) => {
  return Array.isArray(v);
};
var isString = (v) => {
  return typeof v === "string";
};
var isFunction = (v) => {
  return typeof v === "function";
};

// packages/qwik/src/core/util/case.ts
var fromCamelToKebabCase = (text) => {
  return text.replace(/([A-Z])/g, "-$1").toLowerCase();
};

// packages/qwik/src/core/util/markers.ts
var OnRenderProp = "q:renderFn";
var QSlot = "q:slot";
var QSlotS = "q:s";
var QScopedStyle = "q:sstyle";
var QInstance = "q:instance";
var QFuncsPrefix = "qFuncs_";
var getQFuncs = (document2, hash) => {
  return document2[QFuncsPrefix + hash] || [];
};
var QLocaleAttr = "q:locale";
var QContainerSelector = "[q\\:container]";
var ResourceEvent = "qResource";
var ComputedEvent = "qComputed";
var RenderEvent = "qRender";

// packages/qwik/src/core/util/promises.ts
var isPromise = (value) => {
  return value && typeof value.then === "function";
};
var maybeThen = (promise, thenFn) => {
  return isPromise(promise) ? promise.then(thenFn) : thenFn(promise);
};

// packages/qwik/src/core/util/implicit_dollar.ts
var implicit$FirstArg = (fn) => {
  return function(first, ...rest) {
    return fn.call(null, $(first), ...rest);
  };
};

// packages/qwik/src/core/platform/platform.ts
var import_build = require("@builder.io/qwik/build");
var createPlatform = () => {
  return {
    isServer: import_build.isServer,
    importSymbol(containerEl, url, symbolName) {
      var _a;
      if (import_build.isServer) {
        const hash = getSymbolHash(symbolName);
        const regSym = (_a = globalThis.__qwik_reg_symbols) == null ? void 0 : _a.get(hash);
        if (regSym) {
          return regSym;
        }
      }
      if (!url) {
        throw qError(QError_qrlMissingChunk, symbolName);
      }
      if (!containerEl) {
        throw qError(QError_qrlMissingContainer, url, symbolName);
      }
      const urlDoc = toUrl(containerEl.ownerDocument, containerEl, url).toString();
      const urlCopy = new URL(urlDoc);
      urlCopy.hash = "";
      const importURL = urlCopy.href;
      return import(
        /* @vite-ignore */
        importURL
      ).then((mod) => {
        return mod[symbolName];
      });
    },
    raf: (fn) => {
      return new Promise((resolve) => {
        requestAnimationFrame(() => {
          resolve(fn());
        });
      });
    },
    nextTick: (fn) => {
      return new Promise((resolve) => {
        setTimeout(() => {
          resolve(fn());
        });
      });
    },
    chunkForSymbol(symbolName, chunk) {
      return [symbolName, chunk ?? "_"];
    }
  };
};
var toUrl = (doc2, containerEl, url) => {
  const baseURI = doc2.baseURI;
  const base2 = new URL(containerEl.getAttribute("q:base") ?? baseURI, baseURI);
  return new URL(url, base2);
};
var _platform = /* @__PURE__ */ createPlatform();
var getPlatform = () => {
  return _platform;
};
var isServerPlatform = () => {
  if (qDynamicPlatform) {
    return _platform.isServer;
  }
  return false;
};

// packages/qwik/src/core/use/use-locale.ts
var _locale = void 0;
function setLocale(locale) {
  _locale = locale;
}

// packages/qwik/src/core/use/use-core.ts
var _context;
var tryGetInvokeContext = () => {
  if (!_context) {
    const context = typeof document !== "undefined" && document && document.__q_context__;
    if (!context) {
      return void 0;
    }
    if (isArray(context)) {
      return document.__q_context__ = newInvokeContextFromTuple(context);
    }
    return context;
  }
  return _context;
};
var useInvokeContext = () => {
  const ctx = tryGetInvokeContext();
  if (!ctx || ctx.$event$ !== RenderEvent) {
    throw qError(QError_useInvokeContext);
  }
  assertDefined(ctx.$hostElement$, `invoke: $hostElement$ must be defined`, ctx);
  assertDefined(ctx.$waitOn$, `invoke: $waitOn$ must be defined`, ctx);
  assertDefined(ctx.$renderCtx$, `invoke: $renderCtx$ must be defined`, ctx);
  assertDefined(ctx.$subscriber$, `invoke: $subscriber$ must be defined`, ctx);
  return ctx;
};
function invoke(context, fn, ...args) {
  return invokeApply.call(this, context, fn, args);
}
function invokeApply(context, fn, args) {
  const previousContext = _context;
  let returnValue;
  try {
    _context = context;
    returnValue = fn.apply(this, args);
  } finally {
    _context = previousContext;
  }
  return returnValue;
}
var waitAndRun = (ctx, callback) => {
  const waitOn = ctx.$waitOn$;
  if (waitOn.length === 0) {
    const result = callback();
    if (isPromise(result)) {
      waitOn.push(result);
    }
  } else {
    waitOn.push(Promise.all(waitOn).then(callback));
  }
};
var newInvokeContextFromTuple = ([element, event, url]) => {
  const container2 = element.closest(QContainerSelector);
  const locale = (container2 == null ? void 0 : container2.getAttribute(QLocaleAttr)) || void 0;
  locale && setLocale(locale);
  return newInvokeContext(locale, void 0, element, event, url);
};
var newInvokeContext = (locale, hostElement, element, event, url) => {
  const $locale$ = locale || (typeof event === "object" && event && "locale" in event ? event.locale : void 0);
  const ctx = {
    $url$: url,
    $i$: 0,
    $hostElement$: hostElement,
    $element$: element,
    $event$: event,
    $qrl$: void 0,
    $waitOn$: void 0,
    $subscriber$: void 0,
    $renderCtx$: void 0,
    $locale$
  };
  seal(ctx);
  return ctx;
};
var getWrappingContainer = (el) => {
  return el.closest(QContainerSelector);
};
var untrack = (fn) => {
  return invoke(void 0, fn);
};

// packages/qwik/src/core/state/constants.ts
var QObjectRecursive = 1 << 0;
var QObjectImmutable = 1 << 1;
var QOjectTargetSymbol = Symbol("proxy target");
var QObjectFlagsSymbol = Symbol("proxy flags");
var QObjectManagerSymbol = Symbol("proxy manager");
var _IMMUTABLE = Symbol("IMMUTABLE");
var _IMMUTABLE_PREFIX = "$$";
var VIRTUAL_SYMBOL = "__virtual";
var Q_CTX = "_qc_";

// packages/qwik/src/core/qrl/inlined-fn.ts
var serializeDerivedSignalFunc = (signal) => {
  const fnBody = qSerialize ? signal.$funcStr$ : "null";
  assertDefined(fnBody, "If qSerialize is true then fnStr must be provided.");
  let args = "";
  for (let i = 0; i < signal.$args$.length; i++) {
    args += `p${i},`;
  }
  return `(${args})=>(${fnBody})`;
};

// packages/qwik/src/core/state/signal.ts
var _createSignal = (value, containerState, flags, subscriptions) => {
  const manager = containerState.$subsManager$.$createManager$(subscriptions);
  const signal = new SignalImpl(value, manager, flags);
  return signal;
};
var QObjectSignalFlags = Symbol("proxy manager");
var SIGNAL_IMMUTABLE = 1 << 0;
var SIGNAL_UNASSIGNED = 1 << 1;
var SignalUnassignedException = Symbol("unassigned signal");
var SignalBase = class {
};
var SignalImpl = class extends SignalBase {
  untrackedValue;
  [QObjectManagerSymbol];
  [QObjectSignalFlags] = 0;
  constructor(v, manager, flags) {
    super();
    this.untrackedValue = v;
    this[QObjectManagerSymbol] = manager;
    this[QObjectSignalFlags] = flags;
  }
  // prevent accidental use as value
  valueOf() {
    if (qDev) {
      throw new TypeError("Cannot coerce a Signal, use `.value` instead");
    }
  }
  toString() {
    return `[Signal ${String(this.value)}]`;
  }
  toJSON() {
    return { value: this.value };
  }
  get value() {
    var _a;
    if (this[QObjectSignalFlags] & SIGNAL_UNASSIGNED) {
      throw SignalUnassignedException;
    }
    const sub = (_a = tryGetInvokeContext()) == null ? void 0 : _a.$subscriber$;
    if (sub) {
      this[QObjectManagerSymbol].$addSub$(sub);
    }
    return this.untrackedValue;
  }
  set value(v) {
    if (qDev) {
      if (this[QObjectSignalFlags] & SIGNAL_IMMUTABLE) {
        throw new Error("Cannot mutate immutable signal");
      }
      if (qSerialize) {
        verifySerializable(v);
      }
      const invokeCtx = tryGetInvokeContext();
      if (invokeCtx) {
        if (invokeCtx.$event$ === RenderEvent) {
          logWarn(
            "State mutation inside render function. Use useTask$() instead.",
            invokeCtx.$hostElement$
          );
        } else if (invokeCtx.$event$ === ComputedEvent) {
          logWarn(
            "State mutation inside useComputed$() is an antipattern. Use useTask$() instead",
            invokeCtx.$hostElement$
          );
        } else if (invokeCtx.$event$ === ResourceEvent) {
          logWarn(
            "State mutation inside useResource$() is an antipattern. Use useTask$() instead",
            invokeCtx.$hostElement$
          );
        }
      }
    }
    const manager = this[QObjectManagerSymbol];
    const oldValue = this.untrackedValue;
    if (manager && oldValue !== v) {
      this.untrackedValue = v;
      manager.$notifySubs$();
    }
  }
};
var SignalDerived = class extends SignalBase {
  constructor($func$, $args$, $funcStr$) {
    super();
    this.$func$ = $func$;
    this.$args$ = $args$;
    this.$funcStr$ = $funcStr$;
  }
  get value() {
    return this.$func$.apply(void 0, this.$args$);
  }
};
var SignalWrapper = class extends SignalBase {
  constructor(ref, prop) {
    super();
    this.ref = ref;
    this.prop = prop;
  }
  get [QObjectManagerSymbol]() {
    return getSubscriptionManager(this.ref);
  }
  get value() {
    return this.ref[this.prop];
  }
  set value(value) {
    this.ref[this.prop] = value;
  }
};
var isSignal = (obj) => {
  return obj instanceof SignalBase;
};

// packages/qwik/dist/preloader.mjs
var import_build2 = require("@builder.io/qwik/build");
var doc = import_build2.isBrowser ? document : void 0;
var modulePreloadStr = "modulepreload";
var preloadStr = "preload";
var config = { t: 0, o: 25, l: 0.65 };
var rel = import_build2.isBrowser && doc.createElement("link").relList.supports(modulePreloadStr) ? modulePreloadStr : preloadStr;
var loadStart = Date.now();
var isJSRegex = /\.[mc]?js$/;
var BundleImportState_None = 0;
var BundleImportState_Queued = 1;
var BundleImportState_Preload = 2;
var BundleImportState_Alias = 3;
var BundleImportState_Loaded = 4;
var bundles = /* @__PURE__ */ new Map();
var queueDirty;
var preloadCount = 0;
var queue = [];
var log = (...e) => {
  console.log(`Preloader ${Date.now() - loadStart}ms ${preloadCount}/${queue.length} queued>`, ...e);
};
var sortQueue = () => {
  if (queueDirty) {
    queue.sort((e, t) => e.u - t.u);
    queueDirty = 0;
  }
};
var trigger = () => {
  if (!queue.length) return;
  sortQueue();
  while (queue.length) {
    const e = queue[0];
    const t = e.u;
    const o = 1 - t;
    const n = graph ? (
      // The more likely the bundle, the more simultaneous preloads we want to allow
      Math.max(1, config.o * o)
    ) : (
      // While the graph is not available, we limit to 2 preloads
      2
    );
    if (o >= 0.99 || preloadCount < n) {
      queue.shift();
      preloadOne(e);
    } else break;
  }
  if (config.t && !queue.length) {
    const e = [...bundles.values()].filter((e2) => e2.i > BundleImportState_None);
    const t = e.reduce((e2, t2) => e2 + t2.p, 0);
    const o = e.reduce((e2, t2) => e2 + t2.$, 0);
    log(`>>>> done ${e.length}/${bundles.size} total: ${t}ms waited, ${o}ms loaded`);
  }
};
var preloadOne = (e) => {
  if (e.i >= BundleImportState_Preload) return;
  preloadCount++;
  const t = Date.now();
  e.p = t - e.m;
  e.i = BundleImportState_Preload;
  config.t && log(`<< load ${Math.round((1 - e.u) * 100)}% after ${`${e.p}ms`}`, e.B);
  const o = doc.createElement("link");
  o.href = new URL(`${base}${e.B}`, doc.baseURI).toString();
  o.rel = rel;
  o.as = "script";
  o.onload = o.onerror = () => {
    preloadCount--;
    const n = Date.now();
    e.$ = n - t;
    e.i = BundleImportState_Loaded;
    config.t && log(`>> done after ${e.$}ms`, e.B);
    o.remove();
    trigger();
  };
  doc.head.appendChild(o);
};
var adjustProbabilities = (e, t, o) => {
  if (o == null ? void 0 : o.has(e)) return;
  const n = e.u;
  e.u = t;
  if (n - e.u < 0.01) return;
  if (
    // don't queue until we have initialized the preloader
    base != null && e.i < BundleImportState_Preload && e.u < config.l
  ) {
    if (e.i === BundleImportState_None) {
      e.i = BundleImportState_Queued;
      queue.push(e);
      config.t && log(`queued ${Math.round((1 - e.u) * 100)}%`, e.B);
    }
    queueDirty = 1;
  }
  if (e.h) {
    o || (o = /* @__PURE__ */ new Set());
    o.add(e);
    const t2 = 1 - e.u;
    for (const n2 of e.h) {
      const e2 = getBundle(n2.B);
      if (e2.u === 0) continue;
      let r;
      if (n2.S > 0.5 && (t2 === 1 || t2 >= 0.99 && depsCount < 100)) {
        depsCount++;
        r = Math.min(0.01, 1 - n2.S);
      } else {
        const o2 = 1 - n2.S * t2;
        const l = n2.q;
        const s = o2 / l;
        r = Math.max(0.02, e2.u * s);
        n2.q = s;
      }
      adjustProbabilities(e2, r, o);
    }
  }
};
var handleBundle = (e, t) => {
  const o = getBundle(e);
  if (o && o.u > t) adjustProbabilities(o, t);
};
var depsCount;
var preload = (e, t) => {
  if (!(e == null ? void 0 : e.length)) return;
  depsCount = 0;
  let o = t ? 1 - t : 0.4;
  if (Array.isArray(e)) for (let t2 = e.length - 1; t2 >= 0; t2--) {
    const n = e[t2];
    if (typeof n === "number") o = 1 - n / 10;
    else handleBundle(n, o);
  }
  else handleBundle(e, o);
  if (import_build2.isBrowser) trigger();
};
if (import_build2.isBrowser) document.addEventListener("qsymbol", (e) => {
  const { symbol: t, href: o } = e.detail;
  if (o) {
    const e2 = t.slice(t.lastIndexOf("_") + 1);
    preload(e2, 1);
  }
});
var base;
var graph;
var makeBundle = (e, t) => ({ B: e, i: isJSRegex.test(e) ? BundleImportState_None : BundleImportState_Alias, h: t, u: 1, m: Date.now(), p: 0, $: 0 });
var getBundle = (e) => {
  let t = bundles.get(e);
  if (!t) {
    let o;
    if (graph) {
      o = graph.get(e);
      if (!o) return;
      if (!o.length) o = void 0;
    }
    t = makeBundle(e, o);
    bundles.set(e, t);
  }
  return t;
};

// packages/qwik/src/core/qrl/qrl-class.ts
var import_build3 = require("@builder.io/qwik/build");
var isQrl = (value) => {
  return typeof value === "function" && typeof value.getSymbol === "function";
};
var SYNC_QRL = "<sync>";
var isSyncQrl = (value) => {
  return isQrl(value) && value.$symbol$ == SYNC_QRL;
};
var createQRL = (chunk, symbol, symbolRef, symbolFn, capture, captureRef, refSymbol) => {
  if (qDev && qSerialize) {
    if (captureRef) {
      for (const item of captureRef) {
        verifySerializable(item, "Captured variable in the closure can not be serialized");
      }
    }
  }
  let _containerEl;
  const qrl = async function(...args) {
    const fn = invokeFn.call(this, tryGetInvokeContext());
    const result = await fn(...args);
    return result;
  };
  const setContainer = (el) => {
    if (!_containerEl) {
      _containerEl = el;
    }
    return _containerEl;
  };
  const wrapFn = (fn) => {
    if (typeof fn !== "function" || !(capture == null ? void 0 : capture.length) && !(captureRef == null ? void 0 : captureRef.length)) {
      return fn;
    }
    return function(...args) {
      let context = tryGetInvokeContext();
      if (context) {
        const prevQrl = context.$qrl$;
        context.$qrl$ = qrl;
        const prevEvent = context.$event$;
        if (context.$event$ === void 0) {
          context.$event$ = this;
        }
        try {
          return fn.apply(this, args);
        } finally {
          context.$qrl$ = prevQrl;
          context.$event$ = prevEvent;
        }
      }
      context = newInvokeContext();
      context.$qrl$ = qrl;
      context.$event$ = this;
      return invoke.call(this, context, fn, ...args);
    };
  };
  const resolve = async (containerEl) => {
    if (symbolRef !== null) {
      return symbolRef;
    }
    if (containerEl) {
      setContainer(containerEl);
    }
    if (chunk === "") {
      assertDefined(_containerEl, "Sync QRL must have container element");
      const hash2 = _containerEl.getAttribute(QInstance);
      const doc2 = _containerEl.ownerDocument;
      const qFuncs2 = getQFuncs(doc2, hash2);
      return qrl.resolved = symbolRef = qFuncs2[Number(symbol)];
    }
    if (import_build3.isBrowser && chunk) {
      preload(chunk, 1);
    }
    const start = now();
    const ctx = tryGetInvokeContext();
    if (symbolFn !== null) {
      symbolRef = symbolFn().then((module2) => qrl.resolved = symbolRef = wrapFn(module2[symbol]));
    } else {
      const imported = getPlatform().importSymbol(_containerEl, chunk, symbol);
      symbolRef = maybeThen(imported, (ref) => qrl.resolved = symbolRef = wrapFn(ref));
    }
    if (typeof symbolRef === "object" && isPromise(symbolRef)) {
      symbolRef.then(
        () => emitUsedSymbol(symbol, ctx == null ? void 0 : ctx.$element$, start),
        (err) => {
          console.error(`qrl ${symbol} failed to load`, err);
          symbolRef = null;
        }
      );
    }
    return symbolRef;
  };
  const resolveLazy = (containerEl) => {
    return symbolRef !== null ? symbolRef : resolve(containerEl);
  };
  function invokeFn(currentCtx, beforeFn) {
    return (...args) => maybeThen(resolveLazy(), (f) => {
      if (!isFunction(f)) {
        throw qError(QError_qrlIsNotFunction);
      }
      if (beforeFn && beforeFn() === false) {
        return;
      }
      const context = createOrReuseInvocationContext(currentCtx);
      return invoke.call(this, context, f, ...args);
    });
  }
  const createOrReuseInvocationContext = (invoke2) => {
    if (invoke2 == null) {
      return newInvokeContext();
    } else if (isArray(invoke2)) {
      return newInvokeContextFromTuple(invoke2);
    } else {
      return invoke2;
    }
  };
  const resolvedSymbol = refSymbol ?? symbol;
  const hash = getSymbolHash(resolvedSymbol);
  Object.assign(qrl, {
    getSymbol: () => resolvedSymbol,
    getHash: () => hash,
    getCaptured: () => captureRef,
    resolve,
    $resolveLazy$: resolveLazy,
    $setContainer$: setContainer,
    $chunk$: chunk,
    $symbol$: symbol,
    $refSymbol$: refSymbol,
    $hash$: hash,
    getFn: invokeFn,
    $capture$: capture,
    $captureRef$: captureRef,
    dev: null,
    resolved: void 0
  });
  if (symbolRef) {
    symbolRef = maybeThen(symbolRef, (resolved) => qrl.resolved = symbolRef = wrapFn(resolved));
  }
  if (qDev) {
    seal(qrl);
  }
  if (import_build3.isBrowser && resolvedSymbol) {
    preload(resolvedSymbol, 0.8);
  }
  return qrl;
};
var getSymbolHash = (symbolName) => {
  const index = symbolName.lastIndexOf("_");
  if (index > -1) {
    return symbolName.slice(index + 1);
  }
  return symbolName;
};
function assertQrl(qrl) {
  if (qDev) {
    if (!isQrl(qrl)) {
      throw new Error("Not a QRL");
    }
  }
}
function assertSignal(obj) {
  if (qDev) {
    if (!isSignal(obj)) {
      throw new Error("Not a Signal");
    }
  }
}
var EMITTED = /* @__PURE__ */ new Set();
var emitUsedSymbol = (symbol, element, reqTime) => {
  if (!EMITTED.has(symbol)) {
    EMITTED.add(symbol);
    emitEvent("qsymbol", {
      symbol,
      element,
      reqTime
    });
  }
};
var emitEvent = (eventName, detail) => {
  if (!qTest && !isServerPlatform() && typeof document === "object") {
    document.dispatchEvent(
      new CustomEvent(eventName, {
        bubbles: false,
        detail
      })
    );
  }
};
var now = () => {
  if (qTest || isServerPlatform()) {
    return 0;
  }
  if (typeof performance === "object") {
    return performance.now();
  }
  return 0;
};

// packages/qwik/src/core/qrl/qrl.public.ts
var runtimeSymbolId = 0;
var $ = (expression) => {
  if (!qRuntimeQrl && qDev) {
    throw new Error(
      "Optimizer should replace all usages of $() with some special syntax. If you need to create a QRL manually, use inlinedQrl() instead."
    );
  }
  return createQRL(null, "s" + runtimeSymbolId++, expression, null, null, null, null);
};
var eventQrl = (qrl) => {
  return qrl;
};
var event$ = implicit$FirstArg(eventQrl);

// packages/qwik/src/core/render/jsx/utils.public.ts
var SkipRender = Symbol("skip render");

// packages/qwik/src/core/util/flyweight.ts
var EMPTY_ARRAY = [];
var EMPTY_OBJ = {};
if (qDev) {
  Object.freeze(EMPTY_ARRAY);
  Object.freeze(EMPTY_OBJ);
}

// packages/qwik/src/core/qrl/qrl.ts
var serializeQRL = (qrl, opts = {}) => {
  var _a, _b;
  assertTrue(qSerialize, "In order to serialize a QRL, qSerialize must be true");
  assertQrl(qrl);
  let symbol = qrl.$symbol$;
  let chunk = qrl.$chunk$;
  const refSymbol = qrl.$refSymbol$ ?? symbol;
  const platform = getPlatform();
  if (platform) {
    const result = platform.chunkForSymbol(refSymbol, chunk, (_a = qrl.dev) == null ? void 0 : _a.file);
    if (result) {
      chunk = result[1];
      if (!qrl.$refSymbol$) {
        symbol = result[0];
      }
    } else {
      console.error("serializeQRL: Cannot resolve symbol", symbol, "in", chunk, (_b = qrl.dev) == null ? void 0 : _b.file);
    }
  }
  if (qRuntimeQrl && chunk == null) {
    chunk = "/runtimeQRL";
    symbol = "_";
  }
  if (chunk == null) {
    throw qError(QError_qrlMissingChunk, qrl.$symbol$);
  }
  if (chunk.startsWith("./")) {
    chunk = chunk.slice(2);
  }
  if (isSyncQrl(qrl)) {
    if (opts.$containerState$) {
      const fn = qrl.resolved;
      const containerState = opts.$containerState$;
      const fnStrKey = fn.serialized || fn.toString();
      let id = containerState.$inlineFns$.get(fnStrKey);
      if (id === void 0) {
        id = containerState.$inlineFns$.size;
        containerState.$inlineFns$.set(fnStrKey, id);
      }
      symbol = String(id);
    } else {
      throwErrorAndStop("Sync QRL without containerState");
    }
  }
  let output = `${chunk}#${symbol}`;
  const capture = qrl.$capture$;
  const captureRef = qrl.$captureRef$;
  if (captureRef && captureRef.length) {
    if (opts.$getObjId$) {
      output += `[${mapJoin(captureRef, opts.$getObjId$, " ")}]`;
    } else if (opts.$addRefMap$) {
      output += `[${mapJoin(captureRef, opts.$addRefMap$, " ")}]`;
    }
  } else if (capture && capture.length > 0) {
    output += `[${capture.join(" ")}]`;
  }
  return output;
};
var parseQRL = (qrl, containerEl) => {
  const endIdx = qrl.length;
  const hashIdx = indexOf(qrl, 0, "#");
  const captureIdx = indexOf(qrl, hashIdx, "[");
  const chunkEndIdx = Math.min(hashIdx, captureIdx);
  const chunk = qrl.substring(0, chunkEndIdx);
  const symbolStartIdx = hashIdx == endIdx ? hashIdx : hashIdx + 1;
  const symbolEndIdx = captureIdx;
  const symbol = symbolStartIdx == symbolEndIdx ? "default" : qrl.substring(symbolStartIdx, symbolEndIdx);
  const captureStartIdx = captureIdx;
  const captureEndIdx = endIdx;
  const capture = captureStartIdx === captureEndIdx ? EMPTY_ARRAY : qrl.substring(captureStartIdx + 1, captureEndIdx - 1).split(" ");
  const iQrl = createQRL(chunk, symbol, null, null, capture, null, null);
  if (containerEl) {
    iQrl.$setContainer$(containerEl);
  }
  return iQrl;
};
var indexOf = (text, startIdx, char) => {
  const endIdx = text.length;
  const charIdx = text.indexOf(char, startIdx == endIdx ? 0 : startIdx);
  return charIdx == -1 ? endIdx : charIdx;
};
var inflateQrl = (qrl, elCtx) => {
  assertDefined(qrl.$capture$, "invoke: qrl capture must be defined inside useLexicalScope()", qrl);
  return qrl.$captureRef$ = qrl.$capture$.map((idx) => {
    const int = parseInt(idx, 10);
    const obj = elCtx.$refMap$[int];
    assertTrue(elCtx.$refMap$.length > int, "out of bounds inflate access", idx);
    return obj;
  });
};

// packages/qwik/src/core/render/fast-calls.ts
var directSetAttribute = (el, prop, value) => {
  return el.setAttribute(prop, value);
};
var directGetAttribute = (el, prop) => {
  return el.getAttribute(prop);
};

// packages/qwik/src/core/state/listeners.ts
var PREFIXES = ["on", "window:on", "document:on"];
var SCOPED = ["on", "on-window", "on-document"];
var normalizeOnProp = (prop) => {
  let scope = "on";
  for (let i = 0; i < PREFIXES.length; i++) {
    const prefix = PREFIXES[i];
    if (prop.startsWith(prefix)) {
      scope = SCOPED[i];
      prop = prop.slice(prefix.length);
      break;
    }
  }
  if (prop.startsWith("-")) {
    prop = fromCamelToKebabCase(prop.slice(1));
  } else {
    prop = prop.toLowerCase();
  }
  return scope + ":" + prop;
};
var getDomListeners = (elCtx, containerEl) => {
  const attributes = elCtx.$element$.attributes;
  const listeners = [];
  for (let i = 0; i < attributes.length; i++) {
    const { name, value } = attributes.item(i);
    if (name.startsWith("on:") || name.startsWith("on-window:") || name.startsWith("on-document:")) {
      const urls = value.split("\n");
      for (const url of urls) {
        const qrl = parseQRL(url, containerEl);
        if (qrl.$capture$) {
          inflateQrl(qrl, elCtx);
        }
        listeners.push([name, qrl]);
      }
    }
  }
  return listeners;
};

// packages/qwik/src/core/use/use-sequential-scope.ts
var useSequentialScope = () => {
  const iCtx = useInvokeContext();
  const hostElement = iCtx.$hostElement$;
  const elCtx = getContext(hostElement, iCtx.$renderCtx$.$static$.$containerState$);
  const seq = elCtx.$seq$ ||= [];
  const i = iCtx.$i$++;
  const set = (value) => {
    if (qDev && qSerialize) {
      verifySerializable(value);
    }
    return seq[i] = value;
  };
  return {
    val: seq[i],
    set,
    i,
    iCtx,
    elCtx
  };
};

// packages/qwik/src/core/use/use-context.ts
var createContextId = (name) => {
  assertTrue(/^[\w/.-]+$/.test(name), "Context name must only contain A-Z,a-z,0-9, _", name);
  return /* @__PURE__ */ Object.freeze({
    id: fromCamelToKebabCase(name)
  });
};
var findParentCtx = (el, containerState) => {
  var _a;
  let node = el;
  let stack = 1;
  while (node && !((_a = node.hasAttribute) == null ? void 0 : _a.call(node, "q:container"))) {
    while (node = node.previousSibling) {
      if (isComment(node)) {
        const virtual = node[VIRTUAL_SYMBOL];
        if (virtual) {
          const qtx = virtual[Q_CTX];
          if (node === virtual.open) {
            return qtx ?? getContext(virtual, containerState);
          }
          if (qtx == null ? void 0 : qtx.$parentCtx$) {
            return qtx.$parentCtx$;
          }
          node = virtual;
          continue;
        }
        if (node.data === "/qv") {
          stack++;
        } else if (node.data.startsWith("qv ")) {
          stack--;
          if (stack === 0) {
            return getContext(getVirtualElement(node), containerState);
          }
        }
      }
    }
    node = el.parentElement;
    el = node;
  }
  return null;
};
var getParentProvider = (ctx, containerState) => {
  if (ctx.$parentCtx$ === void 0) {
    ctx.$parentCtx$ = findParentCtx(ctx.$element$, containerState);
  }
  return ctx.$parentCtx$;
};
var resolveContext = (context, hostCtx, containerState) => {
  var _a;
  const contextID = context.id;
  if (!hostCtx) {
    return;
  }
  let ctx = hostCtx;
  while (ctx) {
    const found = (_a = ctx.$contexts$) == null ? void 0 : _a.get(contextID);
    if (found) {
      return found;
    }
    ctx = getParentProvider(ctx, containerState);
  }
};

// packages/qwik/src/core/render/error-handling.ts
var ERROR_CONTEXT = /* @__PURE__ */ createContextId("qk-error");
var handleError = (err, hostElement, rCtx) => {
  const elCtx = tryGetContext2(hostElement);
  if (qDev) {
    if (!isServerPlatform() && typeof document !== "undefined" && isVirtualElement(hostElement)) {
      elCtx.$vdom$ = null;
      const errorDiv = document.createElement("errored-host");
      if (err && err instanceof Error) {
        errorDiv.props = { error: err };
      }
      errorDiv.setAttribute("q:key", "_error_");
      errorDiv.append(...hostElement.childNodes);
      hostElement.appendChild(errorDiv);
    }
    if (err && err instanceof Error) {
      if (!("hostElement" in err)) {
        err["hostElement"] = hostElement;
      }
    }
    if (!isRecoverable(err)) {
      throw err;
    }
  }
  if (isServerPlatform()) {
    throw err;
  } else {
    const errorStore = resolveContext(ERROR_CONTEXT, elCtx, rCtx.$static$.$containerState$);
    if (errorStore === void 0) {
      throw err;
    }
    errorStore.error = err;
  }
};
var isRecoverable = (err) => {
  if (err && err instanceof Error) {
    if ("plugin" in err) {
      return false;
    }
  }
  return true;
};

// packages/qwik/src/core/util/event.ts
var import_build4 = require("@builder.io/qwik/build");

// packages/qwik/src/core/state/store.ts
var getOrCreateProxy = (target, containerState, flags = 0) => {
  const proxy = containerState.$proxyMap$.get(target);
  if (proxy) {
    return proxy;
  }
  if (flags !== 0) {
    setObjectFlags(target, flags);
  }
  return createProxy(target, containerState, void 0);
};
var createProxy = (target, containerState, subs) => {
  assertEqual(unwrapProxy(target), target, "Unexpected proxy at this location", target);
  assertTrue(!containerState.$proxyMap$.has(target), "Proxy was already created", target);
  assertTrue(isObject(target), "Target must be an object");
  assertTrue(
    isSerializableObject(target) || isArray(target),
    "Target must be a serializable object"
  );
  const manager = containerState.$subsManager$.$createManager$(subs);
  const proxy = new Proxy(target, new ReadWriteProxyHandler(containerState, manager));
  containerState.$proxyMap$.set(target, proxy);
  return proxy;
};
var createPropsState = () => {
  const props = {};
  setObjectFlags(props, QObjectImmutable);
  return props;
};
var setObjectFlags = (obj, flags) => {
  Object.defineProperty(obj, QObjectFlagsSymbol, { value: flags, enumerable: false });
};
var ReadWriteProxyHandler = class {
  constructor($containerState$, $manager$) {
    this.$containerState$ = $containerState$;
    this.$manager$ = $manager$;
  }
  deleteProperty(target, prop) {
    if (target[QObjectFlagsSymbol] & QObjectImmutable) {
      throw qError(QError_immutableProps);
    }
    if (typeof prop != "string" || !delete target[prop]) {
      return false;
    }
    this.$manager$.$notifySubs$(isArray(target) ? void 0 : prop);
    return true;
  }
  get(target, prop) {
    var _a;
    if (typeof prop === "symbol") {
      if (prop === QOjectTargetSymbol) {
        return target;
      }
      if (prop === QObjectManagerSymbol) {
        return this.$manager$;
      }
      return target[prop];
    }
    const flags = target[QObjectFlagsSymbol] ?? 0;
    assertNumber(flags, "flags must be an number");
    const invokeCtx = tryGetInvokeContext();
    const recursive = (flags & QObjectRecursive) !== 0;
    const immutable = (flags & QObjectImmutable) !== 0;
    const hiddenSignal = target[_IMMUTABLE_PREFIX + prop];
    let subscriber;
    let value;
    if (invokeCtx) {
      subscriber = invokeCtx.$subscriber$;
    }
    if (immutable && (!(prop in target) || immutableValue((_a = target[_IMMUTABLE]) == null ? void 0 : _a[prop]))) {
      subscriber = null;
    }
    if (hiddenSignal) {
      assertTrue(isSignal(hiddenSignal), "$$ prop must be a signal");
      value = hiddenSignal.value;
      subscriber = null;
    } else {
      value = target[prop];
    }
    if (subscriber) {
      const isA = isArray(target);
      this.$manager$.$addSub$(subscriber, isA ? void 0 : prop);
    }
    return recursive ? wrap(value, this.$containerState$) : value;
  }
  set(target, prop, newValue) {
    if (typeof prop === "symbol") {
      target[prop] = newValue;
      return true;
    }
    const flags = target[QObjectFlagsSymbol] ?? 0;
    assertNumber(flags, "flags must be an number");
    const immutable = (flags & QObjectImmutable) !== 0;
    if (immutable) {
      throw qError(QError_immutableProps);
    }
    const recursive = (flags & QObjectRecursive) !== 0;
    const unwrappedNewValue = recursive ? unwrapProxy(newValue) : newValue;
    if (qDev) {
      if (qSerialize) {
        verifySerializable(unwrappedNewValue);
      }
      const invokeCtx = tryGetInvokeContext();
      if (invokeCtx) {
        if (invokeCtx.$event$ === RenderEvent) {
          logError(
            "State mutation inside render function. Move mutation to useTask$() or useVisibleTask$()",
            prop
          );
        } else if (invokeCtx.$event$ === ComputedEvent) {
          logWarn(
            "State mutation inside useComputed$() is an antipattern. Use useTask$() instead",
            invokeCtx.$hostElement$
          );
        } else if (invokeCtx.$event$ === ResourceEvent) {
          logWarn(
            "State mutation inside useResource$() is an antipattern. Use useTask$() instead",
            invokeCtx.$hostElement$
          );
        }
      }
    }
    const isA = isArray(target);
    if (isA) {
      target[prop] = unwrappedNewValue;
      this.$manager$.$notifySubs$();
      return true;
    }
    const oldValue = target[prop];
    target[prop] = unwrappedNewValue;
    if (oldValue !== unwrappedNewValue) {
      this.$manager$.$notifySubs$(prop);
    }
    return true;
  }
  has(target, prop) {
    if (prop === QOjectTargetSymbol) {
      return true;
    }
    const invokeCtx = tryGetInvokeContext();
    if (typeof prop === "string" && invokeCtx) {
      const subscriber = invokeCtx.$subscriber$;
      if (subscriber) {
        const isA = isArray(target);
        this.$manager$.$addSub$(subscriber, isA ? void 0 : prop);
      }
    }
    const hasOwnProperty = Object.prototype.hasOwnProperty;
    if (hasOwnProperty.call(target, prop)) {
      return true;
    }
    if (typeof prop === "string" && hasOwnProperty.call(target, _IMMUTABLE_PREFIX + prop)) {
      return true;
    }
    return false;
  }
  ownKeys(target) {
    const flags = target[QObjectFlagsSymbol] ?? 0;
    assertNumber(flags, "flags must be an number");
    const immutable = (flags & QObjectImmutable) !== 0;
    if (!immutable) {
      let subscriber = null;
      const invokeCtx = tryGetInvokeContext();
      if (invokeCtx) {
        subscriber = invokeCtx.$subscriber$;
      }
      if (subscriber) {
        this.$manager$.$addSub$(subscriber);
      }
    }
    if (isArray(target)) {
      return Reflect.ownKeys(target);
    }
    return Reflect.ownKeys(target).map((a) => {
      return typeof a === "string" && a.startsWith(_IMMUTABLE_PREFIX) ? a.slice(_IMMUTABLE_PREFIX.length) : a;
    });
  }
  getOwnPropertyDescriptor(target, prop) {
    const descriptor = Reflect.getOwnPropertyDescriptor(target, prop);
    if (isArray(target) || typeof prop === "symbol") {
      return descriptor;
    }
    if (descriptor && !descriptor.configurable) {
      return descriptor;
    }
    return {
      enumerable: true,
      configurable: true
    };
  }
};
var immutableValue = (value) => {
  return value === _IMMUTABLE || isSignal(value);
};
var wrap = (value, containerState) => {
  if (isObject(value)) {
    if (Object.isFrozen(value)) {
      return value;
    }
    const nakedValue = unwrapProxy(value);
    if (nakedValue !== value) {
      return value;
    }
    if (fastSkipSerialize(nakedValue)) {
      return value;
    }
    if (isSerializableObject(nakedValue) || isArray(nakedValue)) {
      const proxy = containerState.$proxyMap$.get(nakedValue);
      return proxy ? proxy : getOrCreateProxy(nakedValue, containerState, QObjectRecursive);
    }
  }
  return value;
};

// packages/qwik/src/core/render/execute-component.ts
var static_listeners = 1 << 0;
var static_subtree = 1 << 1;
var dangerouslySetInnerHTML = "dangerouslySetInnerHTML";

// packages/qwik/src/core/render/dom/visitor.ts
var import_build5 = require("@builder.io/qwik/build");
var SVG_NS = "http://www.w3.org/2000/svg";
var IS_SVG = 1 << 0;
var IS_HEAD = 1 << 1;
var IS_IMMUTABLE = 1 << 2;
var getChildren = (elm, filter) => {
  const end = isVirtualElement(elm) ? elm.close : null;
  const nodes = [];
  let node = elm.firstChild;
  while (node = processVirtualNodes(node)) {
    if (filter(node)) {
      nodes.push(node);
    }
    node = node.nextSibling;
    if (node === end) {
      break;
    }
  }
  return nodes;
};
var handleStyle = (ctx, elm, newValue) => {
  setProperty(ctx, elm.style, "cssText", newValue);
  return true;
};
var handleClass = (ctx, elm, newValue) => {
  assertTrue(
    newValue == null || typeof newValue === "string",
    "class newValue must be either nullish or string",
    newValue
  );
  if (elm.namespaceURI === SVG_NS) {
    setAttribute(ctx, elm, "class", newValue);
  } else {
    setProperty(ctx, elm, "className", newValue);
  }
  return true;
};
var checkBeforeAssign = (ctx, elm, newValue, prop) => {
  if (prop in elm) {
    if (elm[prop] !== newValue || prop === "value" && !elm.hasAttribute(prop)) {
      if (
        // we must set value last so that it adheres to min,max,step
        prop === "value" && // but we must also set options first so they are present before updating select
        elm.tagName !== "OPTION"
      ) {
        setPropertyPost(ctx, elm, prop, newValue);
      } else {
        setProperty(ctx, elm, prop, newValue);
      }
    }
    return true;
  }
  return false;
};
var forceAttribute = (ctx, elm, newValue, prop) => {
  setAttribute(ctx, elm, prop.toLowerCase(), newValue);
  return true;
};
var setInnerHTML = (ctx, elm, newValue) => {
  setProperty(ctx, elm, "innerHTML", newValue);
  return true;
};
var noop = () => {
  return true;
};
var PROP_HANDLER_MAP = {
  style: handleStyle,
  class: handleClass,
  className: handleClass,
  value: checkBeforeAssign,
  checked: checkBeforeAssign,
  href: forceAttribute,
  list: forceAttribute,
  form: forceAttribute,
  tabIndex: forceAttribute,
  download: forceAttribute,
  innerHTML: noop,
  [dangerouslySetInnerHTML]: setInnerHTML
};

// packages/qwik/src/core/render/dom/operations.ts
var setAttribute = (staticCtx, el, prop, value) => {
  staticCtx.$operations$.push({
    $operation$: _setAttribute,
    $args$: [el, prop, value]
  });
};
var _setAttribute = (el, prop, value) => {
  if (value == null || value === false) {
    el.removeAttribute(prop);
  } else {
    const str = value === true ? "" : String(value);
    directSetAttribute(el, prop, str);
  }
};
var setProperty = (staticCtx, node, key, value) => {
  staticCtx.$operations$.push({
    $operation$: _setProperty,
    $args$: [node, key, value]
  });
};
var setPropertyPost = (staticCtx, node, key, value) => {
  staticCtx.$postOperations$.push({
    $operation$: _setProperty,
    $args$: [node, key, value]
  });
};
var _setProperty = (node, key, value) => {
  try {
    node[key] = value == null ? "" : value;
    if (value == null && isNode(node) && isElement(node)) {
      node.removeAttribute(key);
    }
  } catch (err) {
    logError(codeToText(QError_setProperty), key, { node, value }, err);
  }
};
var createElement = (doc2, expectTag, isSvg) => {
  const el = isSvg ? doc2.createElementNS(SVG_NS, expectTag) : doc2.createElement(expectTag);
  return el;
};

// packages/qwik/src/core/render/dom/virtual-element.ts
var parseVirtualAttributes = (str) => {
  if (!str) {
    return {};
  }
  const attributes = str.split(" ");
  return Object.fromEntries(
    attributes.map((attr) => {
      const index = attr.indexOf("=");
      if (index >= 0) {
        return [attr.slice(0, index), unescape(attr.slice(index + 1))];
      } else {
        return [attr, ""];
      }
    })
  );
};
var serializeVirtualAttributes = (map) => {
  const attributes = [];
  Object.entries(map).forEach(([key, value]) => {
    if (!value) {
      attributes.push(`${key}`);
    } else {
      attributes.push(`${key}=${escape(value)}`);
    }
  });
  return attributes.join(" ");
};
var escape = (s) => {
  return s.replace(/ /g, "+");
};
var unescape = (s) => {
  return s.replace(/\+/g, " ");
};
var VIRTUAL = ":virtual";
var VirtualElementImpl = class {
  constructor(open, close, isSvg) {
    this.open = open;
    this.close = close;
    this.isSvg = isSvg;
    const doc2 = this.ownerDocument = open.ownerDocument;
    this.$template$ = createElement(doc2, "template", false);
    this.$attributes$ = parseVirtualAttributes(open.data.slice(3));
    assertTrue(open.data.startsWith("qv "), "comment is not a qv");
    open[VIRTUAL_SYMBOL] = this;
    close[VIRTUAL_SYMBOL] = this;
    seal(this);
  }
  ownerDocument;
  _qc_ = null;
  nodeType = 111;
  localName = VIRTUAL;
  nodeName = VIRTUAL;
  $attributes$;
  $template$;
  insertBefore(node, ref) {
    const parent = this.parentElement;
    if (parent) {
      const ref2 = ref ? ref : this.close;
      parent.insertBefore(node, ref2);
    } else {
      this.$template$.insertBefore(node, ref);
    }
    return node;
  }
  remove() {
    const parent = this.parentElement;
    if (parent) {
      const ch = this.childNodes;
      assertEqual(this.$template$.childElementCount, 0, "children should be empty");
      parent.removeChild(this.open);
      for (let i = 0; i < ch.length; i++) {
        this.$template$.appendChild(ch[i]);
      }
      parent.removeChild(this.close);
    }
  }
  appendChild(node) {
    return this.insertBefore(node, null);
  }
  insertBeforeTo(newParent, child) {
    const ch = this.childNodes;
    newParent.insertBefore(this.open, child);
    for (const c of ch) {
      newParent.insertBefore(c, child);
    }
    newParent.insertBefore(this.close, child);
    assertEqual(this.$template$.childElementCount, 0, "children should be empty");
  }
  appendTo(newParent) {
    this.insertBeforeTo(newParent, null);
  }
  get namespaceURI() {
    var _a;
    return ((_a = this.parentElement) == null ? void 0 : _a.namespaceURI) ?? "";
  }
  removeChild(child) {
    if (this.parentElement) {
      this.parentElement.removeChild(child);
    } else {
      this.$template$.removeChild(child);
    }
  }
  getAttribute(prop) {
    return this.$attributes$[prop] ?? null;
  }
  hasAttribute(prop) {
    return prop in this.$attributes$;
  }
  setAttribute(prop, value) {
    this.$attributes$[prop] = value;
    if (qSerialize) {
      this.open.data = updateComment(this.$attributes$);
    }
  }
  removeAttribute(prop) {
    delete this.$attributes$[prop];
    if (qSerialize) {
      this.open.data = updateComment(this.$attributes$);
    }
  }
  matches(_) {
    return false;
  }
  compareDocumentPosition(other) {
    return this.open.compareDocumentPosition(other);
  }
  closest(query) {
    const parent = this.parentElement;
    if (parent) {
      return parent.closest(query);
    }
    return null;
  }
  querySelectorAll(query) {
    const result = [];
    const ch = getChildren(this, isNodeElement);
    ch.forEach((el) => {
      if (isQwikElement(el)) {
        if (el.matches(query)) {
          result.push(el);
        }
        result.concat(Array.from(el.querySelectorAll(query)));
      }
    });
    return result;
  }
  querySelector(query) {
    for (const el of this.childNodes) {
      if (isElement(el)) {
        if (el.matches(query)) {
          return el;
        }
        const v = el.querySelector(query);
        if (v !== null) {
          return v;
        }
      }
    }
    return null;
  }
  get innerHTML() {
    return "";
  }
  set innerHTML(html) {
    const parent = this.parentElement;
    if (parent) {
      this.childNodes.forEach((a) => this.removeChild(a));
      this.$template$.innerHTML = html;
      parent.insertBefore(this.$template$.content, this.close);
    } else {
      this.$template$.innerHTML = html;
    }
  }
  get firstChild() {
    if (this.parentElement) {
      const first = this.open.nextSibling;
      if (first === this.close) {
        return null;
      }
      return first;
    } else {
      return this.$template$.firstChild;
    }
  }
  get nextSibling() {
    return this.close.nextSibling;
  }
  get previousSibling() {
    return this.open.previousSibling;
  }
  get childNodes() {
    if (!this.parentElement) {
      return Array.from(this.$template$.childNodes);
    }
    const nodes = [];
    let node = this.open;
    while (node = node.nextSibling) {
      if (node === this.close) {
        break;
      }
      nodes.push(node);
    }
    return nodes;
  }
  get isConnected() {
    return this.open.isConnected;
  }
  /** The DOM parent element (not the vDOM parent, use findVirtual for that) */
  get parentElement() {
    return this.open.parentElement;
  }
};
var updateComment = (attributes) => {
  return `qv ${serializeVirtualAttributes(attributes)}`;
};
var processVirtualNodes = (node) => {
  if (node == null) {
    return null;
  }
  if (isComment(node)) {
    const virtual = getVirtualElement(node);
    if (virtual) {
      return virtual;
    }
  }
  return node;
};
var findClose = (open) => {
  let node = open;
  let stack = 1;
  while (node = node.nextSibling) {
    if (isComment(node)) {
      const virtual = node[VIRTUAL_SYMBOL];
      if (virtual) {
        node = virtual;
      } else if (node.data.startsWith("qv ")) {
        stack++;
      } else if (node.data === "/qv") {
        stack--;
        if (stack === 0) {
          return node;
        }
      }
    }
  }
  assertFail("close not found");
};
var getVirtualElement = (open) => {
  var _a;
  const virtual = open[VIRTUAL_SYMBOL];
  if (virtual) {
    return virtual;
  }
  if (open.data.startsWith("qv ")) {
    const close = findClose(open);
    return new VirtualElementImpl(open, close, ((_a = open.parentElement) == null ? void 0 : _a.namespaceURI) === SVG_NS);
  }
  return null;
};

// packages/qwik/src/core/container/pause.ts
var mapJoin = (objects, getObjectId, sep) => {
  let output = "";
  for (const obj of objects) {
    const id = getObjectId(obj);
    if (id !== null) {
      if (output !== "") {
        output += sep;
      }
      output += id;
    }
  }
  return output;
};
var collectDeferElement = (el, collector) => {
  const ctx = tryGetContext2(el);
  if (collector.$elements$.includes(ctx)) {
    return;
  }
  collector.$elements$.push(ctx);
  if (ctx.$flags$ & HOST_FLAG_DYNAMIC) {
    collector.$prefetch$++;
    collectElementData(ctx, collector, true);
    collector.$prefetch$--;
  } else {
    collector.$deferElements$.push(ctx);
  }
};
var collectElementData = (elCtx, collector, dynamicCtx) => {
  if (elCtx.$props$ && !isEmptyObj(elCtx.$props$)) {
    collectValue(elCtx.$props$, collector, dynamicCtx);
    collectSubscriptions(getSubscriptionManager(elCtx.$props$), collector, dynamicCtx);
  }
  if (elCtx.$componentQrl$) {
    collectValue(elCtx.$componentQrl$, collector, dynamicCtx);
  }
  if (elCtx.$seq$) {
    for (const obj of elCtx.$seq$) {
      collectValue(obj, collector, dynamicCtx);
    }
  }
  if (elCtx.$tasks$) {
    const map = collector.$containerState$.$subsManager$.$groupToManagers$;
    for (const obj of elCtx.$tasks$) {
      if (map.has(obj)) {
        collectValue(obj, collector, dynamicCtx);
      }
    }
  }
  if (dynamicCtx === true) {
    collectContext(elCtx, collector);
    if (elCtx.$dynamicSlots$) {
      for (const slotCtx of elCtx.$dynamicSlots$) {
        collectContext(slotCtx, collector);
      }
    }
  }
};
var collectContext = (elCtx, collector) => {
  while (elCtx) {
    if (elCtx.$contexts$) {
      for (const obj of elCtx.$contexts$.values()) {
        collectValue(obj, collector, true);
      }
    }
    elCtx = elCtx.$parentCtx$;
  }
};
var collectSubscriptions = (manager, collector, leaks) => {
  if (collector.$seen$.has(manager)) {
    return;
  }
  collector.$seen$.add(manager);
  const subs = manager.$subs$;
  assertDefined(subs, "subs must be defined");
  for (const sub of subs) {
    const type = sub[0];
    if (type > 0) {
      collectValue(sub[2], collector, leaks);
    }
    if (leaks === true) {
      const host = sub[1];
      if (isNode(host) && isVirtualElement(host)) {
        if (sub[0] === 0) {
          collectDeferElement(host, collector);
        }
      } else {
        collectValue(host, collector, true);
      }
    }
  }
};
var PROMISE_VALUE = Symbol();
var resolvePromise = (promise) => {
  return promise.then(
    (value) => {
      const v = {
        resolved: true,
        value
      };
      promise[PROMISE_VALUE] = v;
      return value;
    },
    (value) => {
      const v = {
        resolved: false,
        value
      };
      promise[PROMISE_VALUE] = v;
      return value;
    }
  );
};
var collectValue = (obj, collector, leaks) => {
  if (obj != null) {
    const objType = typeof obj;
    switch (objType) {
      case "function":
      case "object": {
        if (collector.$seen$.has(obj)) {
          return;
        }
        collector.$seen$.add(obj);
        if (fastSkipSerialize(obj)) {
          collector.$objSet$.add(void 0);
          collector.$noSerialize$.push(obj);
          return;
        }
        const input = obj;
        const target = getProxyTarget(obj);
        if (target) {
          obj = target;
          const mutable = (getProxyFlags(obj) & QObjectImmutable) === 0;
          if (leaks && mutable) {
            collectSubscriptions(getSubscriptionManager(input), collector, leaks);
          }
          if (fastWeakSerialize(input)) {
            collector.$objSet$.add(obj);
            return;
          }
        }
        const collected = collectDeps(obj, collector, leaks);
        if (collected) {
          collector.$objSet$.add(obj);
          return;
        }
        if (isPromise(obj)) {
          collector.$promises$.push(
            resolvePromise(obj).then((value) => {
              collectValue(value, collector, leaks);
            })
          );
          return;
        }
        if (objType === "object") {
          if (isNode(obj)) {
            return;
          }
          if (isArray(obj)) {
            for (let i = 0; i < obj.length; i++) {
              collectValue(input[i], collector, leaks);
            }
          } else if (isSerializableObject(obj)) {
            for (const key in obj) {
              collectValue(input[key], collector, leaks);
            }
          }
        }
        break;
      }
    }
  }
  collector.$objSet$.add(obj);
};
var isEmptyObj = (obj) => {
  return Object.keys(obj).length === 0;
};

// packages/qwik/src/core/version.ts
var version = globalThis.QWIK_VERSION;

// packages/qwik/src/core/render/ssr/render-ssr.ts
var IS_HEAD2 = 1 << 0;
var IS_HTML = 1 << 2;
var IS_TEXT = 1 << 3;
var IS_INVISIBLE = 1 << 4;
var IS_PHASING = 1 << 5;
var IS_ANCHOR = 1 << 6;
var IS_BUTTON = 1 << 7;
var IS_TABLE = 1 << 8;
var IS_PHRASING_CONTAINER = 1 << 9;
var IS_IMMUTABLE2 = 1 << 10;
var MockElement = class {
  constructor(nodeType) {
    this.nodeType = nodeType;
    seal(this);
  }
  [Q_CTX] = null;
};

// packages/qwik/src/core/render/jsx/jsx-runtime.ts
var import_build6 = require("@builder.io/qwik/build");
var _jsxQ = (type, mutableProps, immutableProps, children, flags, key, dev) => {
  assertString(type, "jsx type must be a string");
  const processed = key == null ? null : String(key);
  const node = new JSXNodeImpl(
    type,
    mutableProps || EMPTY_OBJ,
    immutableProps,
    children,
    flags,
    processed
  );
  if (qDev && dev) {
    node.dev = {
      stack: new Error().stack,
      ...dev
    };
  }
  validateJSXNode(node);
  seal(node);
  return node;
};
var _jsxC = (type, mutableProps, flags, key, dev) => {
  const processed = key == null ? null : String(key);
  const props = mutableProps ?? {};
  if (typeof type === "string" && _IMMUTABLE in props) {
    const immutableProps = props[_IMMUTABLE];
    delete props[_IMMUTABLE];
    const children = props.children;
    delete props.children;
    for (const [k, v] of Object.entries(immutableProps)) {
      if (v !== _IMMUTABLE) {
        delete props[k];
        props[k] = v;
      }
    }
    return _jsxQ(type, null, props, children, flags, key, dev);
  }
  const node = new JSXNodeImpl(
    type,
    props,
    null,
    props.children,
    flags,
    processed
  );
  if (typeof type === "string" && mutableProps) {
    delete mutableProps.children;
  }
  if (qDev && dev) {
    node.dev = {
      stack: new Error().stack,
      ...dev
    };
  }
  validateJSXNode(node);
  seal(node);
  return node;
};
var JSXNodeImpl = class {
  constructor(type, props, immutableProps, children, flags, key = null) {
    this.type = type;
    this.props = props;
    this.immutableProps = immutableProps;
    this.children = children;
    this.flags = flags;
    this.key = key;
  }
  dev;
};
var Virtual = (props) => props.children;
var validateJSXNode = (node) => {
  if (qDev) {
    const { type, props, immutableProps, children } = node;
    invoke(void 0, () => {
      const isQwikC = isQwikComponent(type);
      if (!isString(type) && !isFunction(type)) {
        throw new Error(
          `The <Type> of the JSX element must be either a string or a function. Instead, it's a "${typeof type}": ${String(
            type
          )}.`
        );
      }
      if (children) {
        const flatChildren = isArray(children) ? children.flat() : [children];
        if (isString(type) || isQwikC) {
          flatChildren.forEach((child) => {
            if (!isValidJSXChild(child)) {
              const typeObj = typeof child;
              let explanation = "";
              if (typeObj === "object") {
                if (child == null ? void 0 : child.constructor) {
                  explanation = `it's an instance of "${child == null ? void 0 : child.constructor.name}".`;
                } else {
                  explanation = `it's a object literal: ${printObjectLiteral(child)} `;
                }
              } else if (typeObj === "function") {
                explanation += `it's a function named "${child.name}".`;
              } else {
                explanation = `it's a "${typeObj}": ${String(child)}.`;
              }
              throw new Error(
                `One of the children of <${type}> is not an accepted value. JSX children must be either: string, boolean, number, <element>, Array, undefined/null, or a Promise/Signal. Instead, ${explanation}
`
              );
            }
          });
        }
        if (import_build6.isBrowser) {
          if (isFunction(type) || immutableProps) {
            const keys = {};
            flatChildren.forEach((child) => {
              if (isJSXNode(child) && child.key != null) {
                const key = String(child.type) + ":" + child.key;
                if (keys[key]) {
                  const err = createJSXError(
                    `Multiple JSX sibling nodes with the same key.
This is likely caused by missing a custom key in a for loop`,
                    child
                  );
                  if (err) {
                    if (isString(child.type)) {
                      logOnceWarn(err);
                    } else {
                      logOnceWarn(err);
                    }
                  }
                } else {
                  keys[key] = true;
                }
              }
            });
          }
        }
      }
      const allProps = [
        ...Object.entries(props),
        ...immutableProps ? Object.entries(immutableProps) : []
      ];
      if (!qRuntimeQrl) {
        for (const [prop, value] of allProps) {
          if (prop.endsWith("$") && value) {
            if (!isQrl(value) && !Array.isArray(value)) {
              throw new Error(
                `The value passed in ${prop}={...}> must be a QRL, instead you passed a "${typeof value}". Make sure your ${typeof value} is wrapped with $(...), so it can be serialized. Like this:
$(${String(
                  value
                )})`
              );
            }
          }
          if (prop !== "children" && isQwikC && value) {
            verifySerializable(
              value,
              `The value of the JSX attribute "${prop}" can not be serialized`
            );
          }
        }
      }
      if (isString(type)) {
        const hasSetInnerHTML = allProps.some((a) => a[0] === "dangerouslySetInnerHTML");
        if (hasSetInnerHTML && children) {
          const err = createJSXError(
            `The JSX element <${type}> can not have both 'dangerouslySetInnerHTML' and children.`,
            node
          );
          logError(err);
        }
        if (allProps.some((a) => a[0] === "children")) {
          throw new Error(`The JSX element <${type}> can not have both 'children' as a property.`);
        }
        if (type === "style") {
          if (children) {
            logOnceWarn(`jsx: Using <style>{content}</style> will escape the content, effectively breaking the CSS.
In order to disable content escaping use '<style dangerouslySetInnerHTML={content}/>'

However, if the use case is to inject component styleContent, use 'useStyles$()' instead, it will be a lot more efficient.
See https://qwik.dev/docs/components/styles/#usestyles for more information.`);
          }
        }
        if (type === "script") {
          if (children) {
            logOnceWarn(`jsx: Using <script>{content}</script> will escape the content, effectively breaking the inlined JS.
In order to disable content escaping use '<script dangerouslySetInnerHTML={content}/>'`);
          }
        }
      }
    });
  }
};
var printObjectLiteral = (obj) => {
  return `{ ${Object.keys(obj).map((key) => `"${key}"`).join(", ")} }`;
};
var isJSXNode = (n) => {
  if (qDev) {
    if (n instanceof JSXNodeImpl) {
      return true;
    }
    if (isObject(n) && "key" in n && "props" in n && "type" in n) {
      logWarn(`Duplicate implementations of "JSXNode" found`);
      return true;
    }
    return false;
  } else {
    return n instanceof JSXNodeImpl;
  }
};
var isValidJSXChild = (node) => {
  if (!node) {
    return true;
  } else if (node === SkipRender) {
    return true;
  } else if (isString(node) || typeof node === "number" || typeof node === "boolean") {
    return true;
  } else if (isJSXNode(node)) {
    return true;
  } else if (isArray(node)) {
    return node.every(isValidJSXChild);
  }
  if (isSignal(node)) {
    return isValidJSXChild(node.value);
  } else if (isPromise(node)) {
    return true;
  }
  return false;
};
var Fragment = (props) => props.children;
var createJSXError = (message, node) => {
  const error = new Error(message);
  if (!node.dev) {
    return error;
  }
  error.stack = `JSXError: ${message}
${filterStack(node.dev.stack, 1)}`;
  return error;
};
var filterStack = (stack, offset = 0) => {
  return stack.split("\n").slice(offset).join("\n");
};

// packages/qwik/src/core/component/component.public.ts
var componentQrl = (componentQrl2) => {
  function QwikComponent(props, key, flags) {
    assertQrl(componentQrl2);
    assertNumber(flags, "The Qwik Component was not invoked correctly");
    const hash = qTest ? "sX" : componentQrl2.$hash$.slice(0, 4);
    const finalKey = hash + ":" + (key ? key : "");
    return _jsxC(
      Virtual,
      {
        [OnRenderProp]: componentQrl2,
        [QSlot]: props[QSlot],
        [_IMMUTABLE]: props[_IMMUTABLE],
        children: props.children,
        props
      },
      flags,
      finalKey
    );
  }
  QwikComponent[SERIALIZABLE_STATE] = [componentQrl2];
  return QwikComponent;
};
var isQwikComponent = (component) => {
  return typeof component == "function" && component[SERIALIZABLE_STATE] !== void 0;
};

// packages/qwik/src/core/use/use-resource.ts
var _createResourceReturn = (opts) => {
  const resource = {
    __brand: "resource",
    value: void 0,
    loading: isServerPlatform() ? false : true,
    _resolved: void 0,
    _error: void 0,
    _state: "pending",
    _timeout: (opts == null ? void 0 : opts.timeout) ?? -1,
    _cache: 0
  };
  return resource;
};
var isResourceReturn = (obj) => {
  return isObject(obj) && obj.__brand === "resource";
};
var serializeResource = (resource, getObjId) => {
  const state = resource._state;
  if (state === "resolved") {
    return `0 ${getObjId(resource._resolved)}`;
  } else if (state === "pending") {
    return `1`;
  } else {
    return `2 ${getObjId(resource._error)}`;
  }
};
var parseResourceReturn = (data) => {
  const [first, id] = data.split(" ");
  const result = _createResourceReturn(void 0);
  result.value = Promise.resolve();
  if (first === "0") {
    result._state = "resolved";
    result._resolved = id;
    result.loading = false;
  } else if (first === "1") {
    result._state = "pending";
    result.value = new Promise(() => {
    });
    result.loading = true;
  } else if (first === "2") {
    result._state = "rejected";
    result._error = id;
    result.loading = false;
  }
  return result;
};

// packages/qwik/src/core/render/jsx/slot.public.ts
var Slot = (props) => {
  return _jsxC(
    Virtual,
    {
      [QSlotS]: ""
    },
    0,
    props.name ?? ""
  );
};

// packages/qwik/src/core/container/serializers.ts
var UNDEFINED_PREFIX = "";
function serializer(serializer2) {
  return {
    $prefixCode$: serializer2.$prefix$.charCodeAt(0),
    $prefixChar$: serializer2.$prefix$,
    $test$: serializer2.$test$,
    $serialize$: serializer2.$serialize$,
    $prepare$: serializer2.$prepare$,
    $fill$: serializer2.$fill$,
    $collect$: serializer2.$collect$,
    $subs$: serializer2.$subs$
  };
}
var QRLSerializer = /* @__PURE__ */ serializer({
  $prefix$: "",
  $test$: (v) => isQrl(v),
  $collect$: (v, collector, leaks) => {
    if (v.$captureRef$) {
      for (const item of v.$captureRef$) {
        collectValue(item, collector, leaks);
      }
    }
    if (collector.$prefetch$ === 0) {
      collector.$qrls$.push(v);
    }
  },
  $serialize$: (obj, getObjId) => {
    return serializeQRL(obj, {
      $getObjId$: getObjId
    });
  },
  $prepare$: (data, containerState) => {
    return parseQRL(data, containerState.$containerEl$);
  },
  $fill$: (qrl, getObject) => {
    if (qrl.$capture$ && qrl.$capture$.length > 0) {
      qrl.$captureRef$ = qrl.$capture$.map(getObject);
      qrl.$capture$ = null;
    }
  }
});
var TaskSerializer = /* @__PURE__ */ serializer({
  $prefix$: "",
  $test$: (v) => isSubscriberDescriptor(v),
  $collect$: (v, collector, leaks) => {
    collectValue(v.$qrl$, collector, leaks);
    if (v.$state$) {
      collectValue(v.$state$, collector, leaks);
      if (leaks === true && v.$state$ instanceof SignalImpl) {
        collectSubscriptions(v.$state$[QObjectManagerSymbol], collector, true);
      }
    }
  },
  $serialize$: (obj, getObjId) => serializeTask(obj, getObjId),
  $prepare$: (data) => parseTask(data),
  $fill$: (task, getObject) => {
    task.$el$ = getObject(task.$el$);
    task.$qrl$ = getObject(task.$qrl$);
    if (task.$state$) {
      task.$state$ = getObject(task.$state$);
    }
  }
});
var ResourceSerializer = /* @__PURE__ */ serializer({
  $prefix$: "",
  $test$: (v) => isResourceReturn(v),
  $collect$: (obj, collector, leaks) => {
    collectValue(obj.value, collector, leaks);
    collectValue(obj._resolved, collector, leaks);
  },
  $serialize$: (obj, getObjId) => {
    return serializeResource(obj, getObjId);
  },
  $prepare$: (data) => {
    return parseResourceReturn(data);
  },
  $fill$: (resource, getObject) => {
    if (resource._state === "resolved") {
      resource._resolved = getObject(resource._resolved);
      resource.value = Promise.resolve(resource._resolved);
    } else if (resource._state === "rejected") {
      const p = Promise.reject(resource._error);
      p.catch(() => null);
      resource._error = getObject(resource._error);
      resource.value = p;
    }
  }
});
var URLSerializer = /* @__PURE__ */ serializer({
  $prefix$: "",
  $test$: (v) => v instanceof URL,
  $serialize$: (obj) => obj.href,
  $prepare$: (data) => new URL(data)
});
var DateSerializer = /* @__PURE__ */ serializer({
  $prefix$: "",
  $test$: (v) => v instanceof Date,
  $serialize$: (obj) => obj.toISOString(),
  $prepare$: (data) => new Date(data)
});
var RegexSerializer = /* @__PURE__ */ serializer({
  $prefix$: "\x07",
  $test$: (v) => v instanceof RegExp,
  $serialize$: (obj) => `${obj.flags} ${obj.source}`,
  $prepare$: (data) => {
    const space = data.indexOf(" ");
    const source = data.slice(space + 1);
    const flags = data.slice(0, space);
    return new RegExp(source, flags);
  }
});
var ErrorSerializer = /* @__PURE__ */ serializer({
  $prefix$: "",
  $test$: (v) => v instanceof Error,
  $serialize$: (obj) => {
    return obj.message;
  },
  $prepare$: (text) => {
    const err = new Error(text);
    err.stack = void 0;
    return err;
  }
});
var DocumentSerializer = /* @__PURE__ */ serializer({
  $prefix$: "",
  $test$: (v) => !!v && typeof v === "object" && isDocument(v),
  $prepare$: (_, _c, doc2) => {
    return doc2;
  }
});
var SERIALIZABLE_STATE = Symbol("serializable-data");
var ComponentSerializer = /* @__PURE__ */ serializer({
  $prefix$: "",
  $test$: (obj) => isQwikComponent(obj),
  $serialize$: (obj, getObjId) => {
    const [qrl] = obj[SERIALIZABLE_STATE];
    return serializeQRL(qrl, {
      $getObjId$: getObjId
    });
  },
  $prepare$: (data, containerState) => {
    const qrl = parseQRL(data, containerState.$containerEl$);
    return componentQrl(qrl);
  },
  $fill$: (component, getObject) => {
    var _a;
    const [qrl] = component[SERIALIZABLE_STATE];
    if ((_a = qrl.$capture$) == null ? void 0 : _a.length) {
      qrl.$captureRef$ = qrl.$capture$.map(getObject);
      qrl.$capture$ = null;
    }
  }
});
var DerivedSignalSerializer = /* @__PURE__ */ serializer({
  $prefix$: "",
  $test$: (obj) => obj instanceof SignalDerived,
  $collect$: (obj, collector, leaks) => {
    if (obj.$args$) {
      for (const arg of obj.$args$) {
        collectValue(arg, collector, leaks);
      }
    }
  },
  $serialize$: (signal, getObjID, collector) => {
    const serialized = serializeDerivedSignalFunc(signal);
    let index = collector.$inlinedFunctions$.indexOf(serialized);
    if (index < 0) {
      index = collector.$inlinedFunctions$.length;
      collector.$inlinedFunctions$.push(serialized);
    }
    return mapJoin(signal.$args$, getObjID, " ") + " @" + intToStr(index);
  },
  $prepare$: (data) => {
    const ids = data.split(" ");
    const args = ids.slice(0, -1);
    const fn = ids[ids.length - 1];
    return new SignalDerived(fn, args, fn);
  },
  $fill$: (fn, getObject) => {
    assertString(fn.$func$, "fn.$func$ should be a string");
    fn.$func$ = getObject(fn.$func$);
    fn.$args$ = fn.$args$.map(getObject);
  }
});
var SignalSerializer = /* @__PURE__ */ serializer({
  $prefix$: "",
  $test$: (v) => v instanceof SignalImpl,
  $collect$: (obj, collector, leaks) => {
    collectValue(obj.untrackedValue, collector, leaks);
    const mutable = (obj[QObjectSignalFlags] & SIGNAL_IMMUTABLE) === 0;
    if (leaks === true && mutable) {
      collectSubscriptions(obj[QObjectManagerSymbol], collector, true);
    }
    return obj;
  },
  $serialize$: (obj, getObjId) => {
    return getObjId(obj.untrackedValue);
  },
  $prepare$: (data, containerState) => {
    var _a;
    return new SignalImpl(data, (_a = containerState == null ? void 0 : containerState.$subsManager$) == null ? void 0 : _a.$createManager$(), 0);
  },
  $subs$: (signal, subs) => {
    signal[QObjectManagerSymbol].$addSubs$(subs);
  },
  $fill$: (signal, getObject) => {
    signal.untrackedValue = getObject(signal.untrackedValue);
  }
});
var SignalWrapperSerializer = /* @__PURE__ */ serializer({
  $prefix$: "",
  $test$: (v) => v instanceof SignalWrapper,
  $collect$(obj, collector, leaks) {
    collectValue(obj.ref, collector, leaks);
    if (fastWeakSerialize(obj.ref)) {
      const localManager = getSubscriptionManager(obj.ref);
      if (isTreeShakeable(collector.$containerState$.$subsManager$, localManager, leaks)) {
        collectValue(obj.ref[obj.prop], collector, leaks);
      }
    }
    return obj;
  },
  $serialize$: (obj, getObjId) => {
    return `${getObjId(obj.ref)} ${obj.prop}`;
  },
  $prepare$: (data) => {
    const [id, prop] = data.split(" ");
    return new SignalWrapper(id, prop);
  },
  $fill$: (signal, getObject) => {
    signal.ref = getObject(signal.ref);
  }
});
var NoFiniteNumberSerializer = /* @__PURE__ */ serializer({
  $prefix$: "",
  $test$: (v) => typeof v === "number",
  $serialize$: (v) => {
    return String(v);
  },
  $prepare$: (data) => {
    return Number(data);
  }
});
var URLSearchParamsSerializer = /* @__PURE__ */ serializer({
  $prefix$: "",
  $test$: (v) => v instanceof URLSearchParams,
  $serialize$: (obj) => obj.toString(),
  $prepare$: (data) => new URLSearchParams(data)
});
var FormDataSerializer = /* @__PURE__ */ serializer({
  $prefix$: "",
  $test$: (v) => typeof FormData !== "undefined" && v instanceof globalThis.FormData,
  $serialize$: (formData) => {
    const array = [];
    formData.forEach((value, key) => {
      if (typeof value === "string") {
        array.push([key, value]);
      } else {
        array.push([key, value.name]);
      }
    });
    return JSON.stringify(array);
  },
  $prepare$: (data) => {
    const array = JSON.parse(data);
    const formData = new FormData();
    for (const [key, value] of array) {
      formData.append(key, value);
    }
    return formData;
  }
});
var JSXNodeSerializer = /* @__PURE__ */ serializer({
  $prefix$: "",
  $test$: (v) => isJSXNode(v),
  $collect$: (node, collector, leaks) => {
    collectValue(node.children, collector, leaks);
    collectValue(node.props, collector, leaks);
    collectValue(node.immutableProps, collector, leaks);
    collectValue(node.key, collector, leaks);
    let type = node.type;
    if (type === Slot) {
      type = ":slot";
    } else if (type === Fragment) {
      type = ":fragment";
    }
    collectValue(type, collector, leaks);
  },
  $serialize$: (node, getObjID) => {
    let type = node.type;
    if (type === Slot) {
      type = ":slot";
    } else if (type === Fragment) {
      type = ":fragment";
    }
    return `${getObjID(type)} ${getObjID(node.props)} ${getObjID(node.immutableProps)} ${getObjID(
      node.key
    )} ${getObjID(node.children)} ${node.flags}`;
  },
  $prepare$: (data) => {
    const [type, props, immutableProps, key, children, flags] = data.split(" ");
    const node = new JSXNodeImpl(
      type,
      props,
      immutableProps,
      children,
      parseInt(flags, 10),
      key
    );
    return node;
  },
  $fill$: (node, getObject) => {
    node.type = getResolveJSXType(getObject(node.type));
    node.props = getObject(node.props);
    node.immutableProps = getObject(node.immutableProps);
    node.key = getObject(node.key);
    node.children = getObject(node.children);
  }
});
var BigIntSerializer = /* @__PURE__ */ serializer({
  $prefix$: "",
  $test$: (v) => typeof v === "bigint",
  $serialize$: (v) => {
    return v.toString();
  },
  $prepare$: (data) => {
    return BigInt(data);
  }
});
var Uint8ArraySerializer = /* @__PURE__ */ serializer({
  $prefix$: "",
  $test$: (v) => v instanceof Uint8Array,
  $serialize$: (v) => {
    let buf = "";
    for (const c of v) {
      buf += String.fromCharCode(c);
    }
    return btoa(buf).replace(/=+$/, "");
  },
  $prepare$: (data) => {
    const buf = atob(data);
    const bytes = new Uint8Array(buf.length);
    let i = 0;
    for (const s of buf) {
      bytes[i++] = s.charCodeAt(0);
    }
    return bytes;
  },
  $fill$: void 0
});
var DATA = Symbol();
var SetSerializer = /* @__PURE__ */ serializer({
  $prefix$: "",
  $test$: (v) => v instanceof Set,
  $collect$: (set, collector, leaks) => {
    set.forEach((value) => collectValue(value, collector, leaks));
  },
  $serialize$: (v, getObjID) => {
    return Array.from(v).map(getObjID).join(" ");
  },
  $prepare$: (data) => {
    const set = /* @__PURE__ */ new Set();
    set[DATA] = data;
    return set;
  },
  $fill$: (set, getObject) => {
    const data = set[DATA];
    set[DATA] = void 0;
    assertString(data, "SetSerializer should be defined");
    const items = data.length === 0 ? [] : data.split(" ");
    for (const id of items) {
      set.add(getObject(id));
    }
  }
});
var MapSerializer = /* @__PURE__ */ serializer({
  $prefix$: "",
  $test$: (v) => v instanceof Map,
  $collect$: (map, collector, leaks) => {
    map.forEach((value, key) => {
      collectValue(value, collector, leaks);
      collectValue(key, collector, leaks);
    });
  },
  $serialize$: (map, getObjID) => {
    const result = [];
    map.forEach((value, key) => {
      result.push(getObjID(key) + " " + getObjID(value));
    });
    return result.join(" ");
  },
  $prepare$: (data) => {
    const set = /* @__PURE__ */ new Map();
    set[DATA] = data;
    return set;
  },
  $fill$: (set, getObject) => {
    const data = set[DATA];
    set[DATA] = void 0;
    assertString(data, "SetSerializer should be defined");
    const items = data.length === 0 ? [] : data.split(" ");
    assertTrue(items.length % 2 === 0, "MapSerializer should have even number of items");
    for (let i = 0; i < items.length; i += 2) {
      set.set(getObject(items[i]), getObject(items[i + 1]));
    }
  }
});
var StringSerializer = /* @__PURE__ */ serializer({
  $prefix$: "\x1B",
  $test$: (v) => !!getSerializer(v) || v === UNDEFINED_PREFIX,
  $serialize$: (v) => v,
  $prepare$: (data) => data
});
var serializers = [
  // NULL                       \u0000
  // UNDEFINED_PREFIX           \u0001
  QRLSerializer,
  ////////////// \u0002
  TaskSerializer,
  ///////////// \u0003
  ResourceSerializer,
  ///////// \u0004
  URLSerializer,
  ////////////// \u0005
  DateSerializer,
  ///////////// \u0006
  RegexSerializer,
  //////////// \u0007
  // BACKSPACE                  \u0008
  // HORIZONTAL TAB             \u0009
  // NEW LINE                   \u000A
  // VERTICAL TAB               \u000B
  // FORM FEED                  \u000C
  // CARRIAGE RETURN            \u000D
  ErrorSerializer,
  //////////// \u000E
  DocumentSerializer,
  ///////// \u000F
  ComponentSerializer,
  //////// \u0010
  DerivedSignalSerializer,
  //// \u0011
  SignalSerializer,
  /////////// \u0012
  SignalWrapperSerializer,
  //// \u0013
  NoFiniteNumberSerializer,
  /// \u0014
  URLSearchParamsSerializer,
  // \u0015
  FormDataSerializer,
  ///////// \u0016
  JSXNodeSerializer,
  ////////// \u0017
  BigIntSerializer,
  /////////// \u0018
  SetSerializer,
  ////////////// \u0019
  MapSerializer,
  ////////////// \u001a
  StringSerializer,
  /////////// \u001b
  Uint8ArraySerializer
  /////// \u001c
];
var serializerByPrefix = /* @__PURE__ */ (() => {
  const serializerByPrefix2 = [];
  serializers.forEach((s) => {
    const prefix = s.$prefixCode$;
    while (serializerByPrefix2.length < prefix) {
      serializerByPrefix2.push(void 0);
    }
    serializerByPrefix2.push(s);
  });
  return serializerByPrefix2;
})();
function getSerializer(obj) {
  if (typeof obj === "string") {
    const prefix = obj.charCodeAt(0);
    if (prefix < serializerByPrefix.length) {
      return serializerByPrefix[prefix];
    }
  }
  return void 0;
}
var collectorSerializers = /* @__PURE__ */ serializers.filter((a) => a.$collect$);
var canSerialize = (obj) => {
  for (const s of serializers) {
    if (s.$test$(obj)) {
      return true;
    }
  }
  return false;
};
var collectDeps = (obj, collector, leaks) => {
  for (const s of collectorSerializers) {
    if (s.$test$(obj)) {
      s.$collect$(obj, collector, leaks);
      return true;
    }
  }
  return false;
};
var isTreeShakeable = (manager, target, leaks) => {
  if (typeof leaks === "boolean") {
    return leaks;
  }
  const localManager = manager.$groupToManagers$.get(leaks);
  if (localManager && localManager.length > 0) {
    if (localManager.length === 1) {
      return localManager[0] !== target;
    }
    return true;
  }
  return false;
};
var getResolveJSXType = (type) => {
  if (type === ":slot") {
    return Slot;
  }
  if (type === ":fragment") {
    return Fragment;
  }
  return type;
};

// packages/qwik/src/core/state/common.ts
var verifySerializable = (value, preMessage) => {
  const seen = /* @__PURE__ */ new Set();
  return _verifySerializable(value, seen, "_", preMessage);
};
var _verifySerializable = (value, seen, ctx, preMessage) => {
  const unwrapped = unwrapProxy(value);
  if (unwrapped == null) {
    return value;
  }
  if (shouldSerialize(unwrapped)) {
    if (seen.has(unwrapped)) {
      return value;
    }
    seen.add(unwrapped);
    if (canSerialize(unwrapped)) {
      return value;
    }
    const typeObj = typeof unwrapped;
    switch (typeObj) {
      case "object":
        if (isPromise(unwrapped)) {
          return value;
        }
        if (isNode(unwrapped)) {
          return value;
        }
        if (isArray(unwrapped)) {
          let expectIndex = 0;
          unwrapped.forEach((v, i) => {
            if (i !== expectIndex) {
              throw qError(QError_verifySerializable, unwrapped);
            }
            _verifySerializable(v, seen, ctx + "[" + i + "]");
            expectIndex = i + 1;
          });
          return value;
        }
        if (isSerializableObject(unwrapped)) {
          for (const [key, item] of Object.entries(unwrapped)) {
            _verifySerializable(item, seen, ctx + "." + key);
          }
          return value;
        }
        break;
      case "boolean":
      case "string":
      case "number":
        return value;
    }
    let message = "";
    if (preMessage) {
      message = preMessage;
    } else {
      message = "Value cannot be serialized";
    }
    if (ctx !== "_") {
      message += ` in ${ctx},`;
    }
    if (typeObj === "object") {
      message += ` because it's an instance of "${value == null ? void 0 : value.constructor.name}". You might need to use 'noSerialize()' or use an object literal instead. Check out https://qwik.dev/docs/advanced/dollar/`;
    } else if (typeObj === "function") {
      const fnName = value.name;
      message += ` because it's a function named "${fnName}". You might need to convert it to a QRL using $(fn):

const ${fnName} = $(${String(
        value
      )});

Please check out https://qwik.dev/docs/advanced/qrl/ for more information.`;
    }
    console.error("Trying to serialize", value);
    throwErrorAndStop(message);
  }
  return value;
};
var noSerializeSet = /* @__PURE__ */ new WeakSet();
var weakSerializeSet = /* @__PURE__ */ new WeakSet();
var shouldSerialize = (obj) => {
  if (isObject(obj) || isFunction(obj)) {
    return !noSerializeSet.has(obj);
  }
  return true;
};
var fastSkipSerialize = (obj) => {
  return noSerializeSet.has(obj);
};
var fastWeakSerialize = (obj) => {
  return weakSerializeSet.has(obj);
};
var unwrapProxy = (proxy) => {
  return isObject(proxy) ? getProxyTarget(proxy) ?? proxy : proxy;
};
var getProxyTarget = (obj) => {
  return obj[QOjectTargetSymbol];
};
var getSubscriptionManager = (obj) => {
  return obj[QObjectManagerSymbol];
};
var getProxyFlags = (obj) => {
  return obj[QObjectFlagsSymbol];
};

// packages/qwik/src/core/container/container.ts
var CONTAINER_STATE = Symbol("ContainerState");
var intToStr = (nu) => {
  return nu.toString(36);
};
var strToInt = (nu) => {
  return parseInt(nu, 36);
};

// packages/qwik/src/core/use/use-signal.ts
var useConstant = (value) => {
  const { val, set } = useSequentialScope();
  if (val != null) {
    return val;
  }
  value = isFunction(value) && !isQwikComponent(value) ? value() : value;
  return set(value);
};

// packages/qwik/src/core/use/use-task.ts
var TaskFlagsIsVisibleTask = 1 << 0;
var TaskFlagsIsTask = 1 << 1;
var TaskFlagsIsResource = 1 << 2;
var TaskFlagsIsComputed = 1 << 3;
var TaskFlagsIsDirty = 1 << 4;
var TaskFlagsIsCleanup = 1 << 5;
var createComputedQrl = (qrl) => {
  assertQrl(qrl);
  const iCtx = useInvokeContext();
  const hostElement = iCtx.$hostElement$;
  const containerState = iCtx.$renderCtx$.$static$.$containerState$;
  const elCtx = getContext(hostElement, containerState);
  const signal = _createSignal(
    void 0,
    containerState,
    SIGNAL_UNASSIGNED | SIGNAL_IMMUTABLE,
    void 0
  );
  const task = new Task(
    TaskFlagsIsDirty | TaskFlagsIsTask | TaskFlagsIsComputed,
    // Computed signals should update immediately
    0,
    elCtx.$element$,
    qrl,
    signal
  );
  qrl.$resolveLazy$(containerState.$containerEl$);
  (elCtx.$tasks$ ||= []).push(task);
  waitAndRun(iCtx, () => runComputed(task, containerState, iCtx.$renderCtx$));
  return signal;
};
var useComputedQrl = (qrl) => {
  return useConstant(() => createComputedQrl(qrl));
};
var useComputed$ = implicit$FirstArg(useComputedQrl);
var createComputed$ = implicit$FirstArg(createComputedQrl);
var runComputed = (task, containerState, rCtx) => {
  assertSignal(task.$state$);
  task.$flags$ &= ~TaskFlagsIsDirty;
  cleanupTask(task);
  const hostElement = task.$el$;
  const iCtx = newInvokeContext(rCtx.$static$.$locale$, hostElement, void 0, ComputedEvent);
  iCtx.$subscriber$ = [0, task];
  iCtx.$renderCtx$ = rCtx;
  const { $subsManager$: subsManager } = containerState;
  const taskFn = task.$qrl$.getFn(iCtx, () => {
    subsManager.$clearSub$(task);
  });
  const ok = (returnValue) => {
    untrack(() => {
      const signal = task.$state$;
      signal[QObjectSignalFlags] &= ~SIGNAL_UNASSIGNED;
      signal.untrackedValue = returnValue;
      signal[QObjectManagerSymbol].$notifySubs$();
    });
  };
  const fail = (reason) => {
    handleError(reason, hostElement, rCtx);
  };
  try {
    return maybeThen(task.$qrl$.$resolveLazy$(containerState.$containerEl$), () => {
      const result = taskFn();
      if (isPromise(result)) {
        const warningMessage = "useComputed$: Async functions in computed tasks are deprecated and will stop working in v2. Use useTask$ or useResource$ instead.";
        const stack = new Error(warningMessage).stack;
        if (!stack) {
          logOnceWarn(warningMessage);
        } else {
          const lessScaryStack = stack.replace(/^Error:\s*/, "");
          logOnceWarn(lessScaryStack);
        }
        return result.then(ok, fail);
      } else {
        ok(result);
      }
    });
  } catch (reason) {
    fail(reason);
  }
};
var cleanupTask = (task) => {
  const destroy = task.$destroy$;
  if (destroy) {
    task.$destroy$ = void 0;
    try {
      destroy();
    } catch (err) {
      logError(err);
    }
  }
};
var isSubscriberDescriptor = (obj) => {
  return isObject(obj) && obj instanceof Task;
};
var serializeTask = (task, getObjId) => {
  let value = `${intToStr(task.$flags$)} ${intToStr(task.$index$)} ${getObjId(
    task.$qrl$
  )} ${getObjId(task.$el$)}`;
  if (task.$state$) {
    value += ` ${getObjId(task.$state$)}`;
  }
  return value;
};
var parseTask = (data) => {
  const [flags, index, qrl, el, resource] = data.split(" ");
  return new Task(strToInt(flags), strToInt(index), el, qrl, resource);
};
var Task = class {
  constructor($flags$, $index$, $el$, $qrl$, $state$) {
    this.$flags$ = $flags$;
    this.$index$ = $index$;
    this.$el$ = $el$;
    this.$qrl$ = $qrl$;
    this.$state$ = $state$;
  }
};

// packages/qwik/src/testing/html.ts
function isElement2(value) {
  return isNode2(value) && value.nodeType === 1;
}
function isNode2(value) {
  return value && typeof value.nodeType === "number";
}

// packages/qwik/src/core/state/context.ts
var HOST_FLAG_DIRTY = 1 << 0;
var HOST_FLAG_NEED_ATTACH_LISTENER = 1 << 1;
var HOST_FLAG_MOUNTED = 1 << 2;
var HOST_FLAG_DYNAMIC = 1 << 3;
var HOST_REMOVED = 1 << 4;
var tryGetContext2 = (element) => {
  return element[Q_CTX];
};
var getContext = (el, containerState) => {
  assertQwikElement(el);
  const ctx = tryGetContext2(el);
  if (ctx) {
    return ctx;
  }
  const elCtx = createContext(el);
  const elementID = directGetAttribute(el, "q:id");
  if (elementID) {
    const pauseCtx = containerState.$pauseCtx$;
    elCtx.$id$ = elementID;
    if (pauseCtx) {
      const { getObject, meta, refs } = pauseCtx;
      if (isElement2(el)) {
        const refMap = refs[elementID];
        if (refMap) {
          elCtx.$refMap$ = refMap.split(" ").map(getObject);
          elCtx.li = getDomListeners(elCtx, containerState.$containerEl$);
        }
      } else {
        const styleIds = el.getAttribute(QScopedStyle);
        elCtx.$scopeIds$ = styleIds ? styleIds.split("|") : null;
        const ctxMeta = meta[elementID];
        if (ctxMeta) {
          const seq = ctxMeta.s;
          const host = ctxMeta.h;
          const contexts = ctxMeta.c;
          const tasks = ctxMeta.w;
          if (seq) {
            elCtx.$seq$ = seq.split(" ").map(getObject);
          }
          if (tasks) {
            elCtx.$tasks$ = tasks.split(" ").map(getObject);
          }
          if (contexts) {
            elCtx.$contexts$ = /* @__PURE__ */ new Map();
            for (const part of contexts.split(" ")) {
              const [key, value] = part.split("=");
              elCtx.$contexts$.set(key, getObject(value));
            }
          }
          if (host) {
            const [renderQrl, props] = host.split(" ");
            elCtx.$flags$ = HOST_FLAG_MOUNTED;
            if (renderQrl) {
              elCtx.$componentQrl$ = getObject(renderQrl);
            }
            if (props) {
              const propsObj = getObject(props);
              elCtx.$props$ = propsObj;
              setObjectFlags(propsObj, QObjectImmutable);
              propsObj[_IMMUTABLE] = getImmutableFromProps(propsObj);
            } else {
              elCtx.$props$ = createProxy(createPropsState(), containerState);
            }
          }
        }
      }
    }
  }
  return elCtx;
};
var getImmutableFromProps = (props) => {
  const immutable = {};
  const target = getProxyTarget(props);
  for (const key in target) {
    if (key.startsWith(_IMMUTABLE_PREFIX)) {
      immutable[key.slice(_IMMUTABLE_PREFIX.length)] = target[key];
    }
  }
  return immutable;
};
var createContext = (element) => {
  const ctx = {
    $flags$: 0,
    $id$: "",
    $element$: element,
    $refMap$: [],
    li: [],
    $tasks$: null,
    $seq$: null,
    $slots$: null,
    $scopeIds$: null,
    $appendStyles$: null,
    $props$: null,
    $vdom$: null,
    $componentQrl$: null,
    $contexts$: null,
    $dynamicSlots$: null,
    $parentCtx$: void 0,
    $realParentCtx$: void 0
  };
  seal(ctx);
  element[Q_CTX] = ctx;
  return ctx;
};

// packages/qwik/src/testing/document.ts
var import_qwik_dom = __toESM(require_lib(), 1);

// packages/qwik/src/testing/util.ts
function normalizeUrl(url) {
  if (url != null) {
    if (typeof url === "string") {
      return new URL(url || "/", BASE_URI);
    }
    if (typeof url.href === "string") {
      return new URL(url.href || "/", BASE_URI);
    }
  }
  return new URL(BASE_URI);
}
var BASE_URI = `http://document.qwik.dev/`;
var __self = typeof self !== "undefined" && typeof WorkerGlobalScope !== "undefined" && self instanceof WorkerGlobalScope && self;

// packages/qwik/src/testing/document.ts
function createDocument(opts) {
  const doc2 = import_qwik_dom.default.createDocument(opts == null ? void 0 : opts.html);
  ensureGlobals(doc2, opts);
  return doc2;
}
function createWindow(opts = {}) {
  return createDocument(opts).defaultView;
}
function ensureGlobals(doc2, opts) {
  if (doc2 && doc2[QWIK_DOC]) {
    return doc2.defaultView;
  }
  if (!doc2 || doc2.nodeType !== 9) {
    throw new Error(`Invalid document`);
  }
  doc2[QWIK_DOC] = true;
  const loc = normalizeUrl(opts == null ? void 0 : opts.url);
  Object.defineProperty(doc2, "baseURI", {
    get: () => loc.href,
    set: (url) => loc.href = normalizeUrl(url).href
  });
  doc2.defaultView = {
    get document() {
      return doc2;
    },
    get location() {
      return loc;
    },
    get origin() {
      return loc.origin;
    },
    addEventListener: noop2,
    removeEventListener: noop2,
    history: {
      pushState: noop2,
      replaceState: noop2,
      go: noop2,
      back: noop2,
      forward: noop2
    },
    CustomEvent: class CustomEvent {
      type;
      constructor(type, details) {
        Object.assign(this, details);
        this.type = type;
      }
    }
  };
  return doc2.defaultView;
}
var noop2 = () => {
};
var QWIK_DOC = Symbol();

// packages/qwik/src/testing/platform.ts
var import_node_fs = require("node:fs");
var import_node_url = require("node:url");
function createPlatform2() {
  let render = null;
  const moduleCache = /* @__PURE__ */ new Map();
  const testPlatform2 = {
    isServer: false,
    importSymbol(containerEl, url, symbolName) {
      if (!url) {
        throw new Error("Missing URL");
      }
      if (!containerEl) {
        throw new Error("Missing Container");
      }
      const urlDoc = toUrl2(containerEl.ownerDocument, containerEl, url);
      const importPath = toPath(urlDoc);
      const mod = moduleCache.get(importPath);
      if (mod) {
        if (!mod || !(symbolName in mod)) {
          throw new Error(`Q-ERROR: missing symbol '${symbolName}' in module '${url}'.`);
        }
        return mod[symbolName];
      }
      return import(importPath).then((mod2) => {
        moduleCache.set(importPath, mod2);
        if (!mod2 || !(symbolName in mod2)) {
          throw new Error(`Q-ERROR: missing symbol '${symbolName}' in module '${url}'.`);
        }
        return mod2[symbolName];
      });
    },
    nextTick: (renderMarked) => {
      if (!render) {
        render = {
          fn: renderMarked,
          promise: null,
          resolve: null,
          reject: null
        };
        render.promise = new Promise((resolve, reject) => {
          render.resolve = resolve;
          render.reject = reject;
        });
      } else if (renderMarked !== render.fn) {
        throw new Error("Must be same function");
      }
      return render.promise;
    },
    raf: (fn) => {
      return new Promise((resolve) => {
        setTimeout(() => {
          resolve(fn());
        });
      });
    },
    flush: async () => {
      await Promise.resolve();
      if (render) {
        try {
          render.resolve(await render.fn());
        } catch (e) {
          render.reject(e);
        }
        render = null;
      }
    },
    chunkForSymbol() {
      return void 0;
    }
  };
  return testPlatform2;
}
function setTestPlatform(_setPlatform) {
  _setPlatform(testPlatform);
}
function toUrl2(doc2, containerEl, url) {
  const base2 = new URL((containerEl == null ? void 0 : containerEl.getAttribute("q:base")) ?? doc2.baseURI, doc2.baseURI);
  return new URL(url, base2);
}
function toPath(url) {
  const normalizedUrl = new URL(String(url));
  normalizedUrl.hash = "";
  normalizedUrl.search = "";
  const path = (0, import_node_url.fileURLToPath)(String(normalizedUrl));
  const importPaths = [path, ...testExts.map((ext) => path + ext)];
  for (const importPath of importPaths) {
    if ((0, import_node_fs.existsSync)(importPath)) {
      return importPath;
    }
  }
  throw new Error(`Unable to find path for import "${url}"`);
}
var testPlatform = createPlatform2();
function getTestPlatform() {
  return testPlatform;
}
var testExts = [".ts", ".tsx", ".js", ".cjs", ".mjs", ".jsx"];

// packages/qwik/src/testing/element-fixture.ts
var ElementFixture = class {
  window;
  document;
  superParent;
  parent;
  host;
  child;
  constructor(options = {}) {
    this.window = createWindow();
    this.document = this.window.document;
    this.superParent = this.document.createElement("super-parent");
    this.document.body.appendChild(this.superParent);
    this.parent = this.document.createElement("parent");
    this.superParent.appendChild(this.parent);
    if (options.html) {
      this.parent.innerHTML = options.html;
      this.host = this.parent.firstElementChild;
      assertDefined(this.host, "host element must be defined");
      this.host.querySelectorAll('script[q\\:func="qwik/json"]').forEach((script) => {
        const code = script.textContent;
        if (code == null ? void 0 : code.match(Q_FUNCS_PREFIX)) {
          const equal = code.indexOf("=");
          const qFuncs = eval(code.substring(equal + 1));
          const container = this.host.closest(QContainerSelector2);
          container.qFuncs = qFuncs;
        }
      });
      this.child = null;
    } else {
      this.host = this.document.createElement(options.tagName || "host");
      this.child = this.document.createElement("child");
      this.parent.appendChild(this.host);
      this.host.appendChild(this.child);
    }
  }
};
async function trigger2(root, queryOrElement, eventNameCamel, eventPayload = {}) {
  const elements = typeof queryOrElement === "string" ? Array.from(root.querySelectorAll(queryOrElement)) : [queryOrElement];
  for (const element of elements) {
    const kebabEventName = fromCamelToKebabCase(eventNameCamel);
    const event = root.ownerDocument.createEvent("Event");
    event.initEvent(kebabEventName, true, true);
    Object.assign(event, eventPayload);
    const attrName = "on:" + kebabEventName;
    await dispatch(element, attrName, event);
  }
  await getTestPlatform().flush();
}
var PREVENT_DEFAULT2 = "preventdefault:";
var STOP_PROPAGATION = "stoppropagation:";
var Q_FUNCS_PREFIX = /document.qdata\["qFuncs_(.+)"\]=/;
var QContainerSelector2 = "[q\\:container]";
var dispatch = async (element, attrName, event) => {
  const preventAttributeName = PREVENT_DEFAULT2 + event.type;
  const stopPropagationName = STOP_PROPAGATION + event.type;
  const collectListeners = [];
  while (element) {
    const preventDefault = element.hasAttribute(preventAttributeName);
    const stopPropagation = element.hasAttribute(stopPropagationName);
    if (preventDefault) {
      event.preventDefault();
    }
    if (stopPropagation) {
      event.stopPropagation();
    }
    const ctx = tryGetContext2(element);
    if (ctx) {
      for (const li of ctx.li) {
        if (li[0] === attrName) {
          const qrl = li[1];
          if (isSyncQrl2(qrl)) {
            qrl(event, element);
          } else {
            collectListeners.push({ element, qrl });
          }
        }
      }
    }
    element = element.parentElement;
  }
  for (let i = 0; i < collectListeners.length; i++) {
    const { element: element2, qrl } = collectListeners[i];
    await qrl.getFn([element2, event], () => element2.isConnected)(event, element2);
  }
};
function getEvent(elCtx, prop) {
  return qPropReadQRL(elCtx, normalizeOnProp(prop));
}
function qPropReadQRL(elCtx, prop) {
  const allListeners = elCtx.li;
  const containerEl = getWrappingContainer(elCtx.$element$);
  assertDefined(containerEl, "container element must be defined");
  return (event) => {
    return Promise.all(
      allListeners.filter((li) => li[0] === prop).map(([_, qrl]) => {
        qrl.$setContainer$(containerEl);
        return qrl(event);
      })
    );
  };
}
function isSyncQrl2(qrl) {
  return qrl.$chunk$ == "";
}

// packages/qwik/src/testing/library.ts
var createDOM = async function({ html } = {}) {
  const qwik = await getQwik();
  setTestPlatform(qwik.setPlatform);
  const host = new ElementFixture({ html }).host;
  return {
    render: function(jsxElement) {
      return qwik.render(host, jsxElement);
    },
    screen: host,
    userEvent: async function(queryOrElement, eventNameCamel, eventPayload = {}) {
      return trigger2(host, queryOrElement, eventNameCamel, eventPayload);
    }
  };
};
var getQwik = async () => {
  if (false) {
    return await null;
  } else {
    return await import("../core.cjs");
  }
};
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  createDOM
});
/*!
Parser-Lib
Copyright (c) 2009-2011 Nicholas C. Zakas. All rights reserved.

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in
all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
THE SOFTWARE.

*/
