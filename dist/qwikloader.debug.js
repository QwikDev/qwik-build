(() => {
  const doc = document;
  const win = window;
  const events = /* @__PURE__ */ new Set();
  const roots = /* @__PURE__ */ new Set([doc]);
  let hasInitialized;
  const nativeQuerySelectorAll = (root, selector) => Array.from(root.querySelectorAll(selector));
  const querySelectorAll = (query) => {
    const elements = [];
    roots.forEach((root) => elements.push(...nativeQuerySelectorAll(root, query)));
    return elements;
  };
  const findShadowRoots = (fragment) => {
    processEventOrNode(fragment);
    nativeQuerySelectorAll(fragment, "[q\\:shadowroot]").forEach((parent) => {
      const shadowRoot = parent.shadowRoot;
      shadowRoot && findShadowRoots(shadowRoot);
    });
  };
  const isPromise = (promise) => promise && typeof promise.then === "function";
  const broadcast = (infix, ev, type = ev.type) => {
    querySelectorAll("[on" + infix + "\\:" + type + "]").forEach(
      (el) => dispatch(el, infix, ev, type)
    );
  };
  const resolveContainer = (containerEl) => {
    if (containerEl._qwikjson_ === void 0) {
      const parentJSON = containerEl === doc.documentElement ? doc.body : containerEl;
      let script = parentJSON.lastElementChild;
      while (script) {
        if (script.tagName === "SCRIPT" && script.getAttribute("type") === "qwik/json") {
          containerEl._qwikjson_ = JSON.parse(
            script.textContent.replace(/\\x3C(\/?script)/gi, "<$1")
          );
          break;
        }
        script = script.previousElementSibling;
      }
    }
  };
  const createEvent = (eventName, detail) => new CustomEvent(eventName, {
    detail
  });
  const dispatch = async (element, onPrefix, ev, eventName = ev.type) => {
    const attrName = "on" + onPrefix + ":" + eventName;
    if (element.hasAttribute("preventdefault:" + eventName)) {
      ev.preventDefault();
    }
    if (element.hasAttribute("stoppropagation:" + eventName)) {
      ev.stopPropagation();
    }
    const ctx = element._qc_;
    const relevantListeners = ctx && ctx.li.filter((li) => li[0] === attrName);
    if (relevantListeners && relevantListeners.length > 0) {
      for (const listener of relevantListeners) {
        const results = listener[1].getFn([element, ev], () => element.isConnected)(ev, element);
        const cancelBubble = ev.cancelBubble;
        if (isPromise(results)) {
          await results;
        }
        if (cancelBubble) {
          ev.stopPropagation();
        }
      }
      return;
    }
    const attrValue = element.getAttribute(attrName);
    if (attrValue) {
      const container = element.closest("[q\\:container]");
      const qBase = container.getAttribute("q:base");
      const qVersion = container.getAttribute("q:version") || "unknown";
      const qManifest = container.getAttribute("q:manifest-hash") || "dev";
      const base = new URL(qBase, doc.baseURI);
      for (const qrl of attrValue.split("\n")) {
        const url = new URL(qrl, base);
        const href = url.href;
        const symbol = url.hash.replace(/^#?([^?[|]*).*$/, "$1") || "default";
        const reqTime = performance.now();
        let handler;
        let importError;
        let error;
        const isSync = qrl.startsWith("#");
        const eventData = {
          qBase,
          qManifest,
          qVersion,
          href,
          symbol,
          element,
          reqTime
        };
        if (isSync) {
          const hash = container.getAttribute("q:instance");
          handler = (doc["qFuncs_" + hash] || [])[Number.parseInt(symbol)];
          if (!handler) {
            importError = "sync";
            error = new Error("sym:" + symbol);
          }
        } else {
          emitEvent("qsymbol", eventData);
          const uri = url.href.split("#")[0];
          try {
            const module = import(
              /* @vite-ignore */
              uri
            );
            resolveContainer(container);
            handler = (await module)[symbol];
            if (!handler) {
              importError = "no-symbol";
              error = new Error(`${symbol} not in ${uri}`);
            }
          } catch (err) {
            importError || (importError = "async");
            error = err;
          }
        }
        if (!handler) {
          emitEvent("qerror", {
            importError,
            error,
            ...eventData
          });
          console.error(error);
          break;
        }
        const previousCtx = doc.__q_context__;
        if (element.isConnected) {
          try {
            doc.__q_context__ = [element, ev, url];
            const results = handler(ev, element);
            if (isPromise(results)) {
              await results;
            }
          } catch (error2) {
            emitEvent("qerror", { error: error2, ...eventData });
          } finally {
            doc.__q_context__ = previousCtx;
          }
        }
      }
    }
  };
  const emitEvent = (eventName, detail) => {
    doc.dispatchEvent(createEvent(eventName, detail));
  };
  const camelToKebab = (str) => str.replace(/([A-Z])/g, (a) => "-" + a.toLowerCase());
  const processDocumentEvent = async (ev) => {
    let type = camelToKebab(ev.type);
    let element = ev.target;
    broadcast("-document", ev, type);
    while (element && element.getAttribute) {
      const results = dispatch(element, "", ev, type);
      let cancelBubble = ev.cancelBubble;
      if (isPromise(results)) {
        await results;
      }
      cancelBubble = cancelBubble || ev.cancelBubble || element.hasAttribute("stoppropagation:" + ev.type);
      element = ev.bubbles && cancelBubble !== true ? element.parentElement : null;
    }
  };
  const processWindowEvent = (ev) => {
    broadcast("-window", ev, camelToKebab(ev.type));
  };
  const processReadyStateChange = () => {
    var _a;
    const readyState = doc.readyState;
    if (!hasInitialized && (readyState == "interactive" || readyState == "complete")) {
      roots.forEach(findShadowRoots);
      hasInitialized = 1;
      emitEvent("qinit");
      const riC = (_a = win.requestIdleCallback) != null ? _a : win.setTimeout;
      riC.bind(win)(() => emitEvent("qidle"));
      if (events.has("qvisible")) {
        const results = querySelectorAll("[on\\:qvisible]");
        const observer = new IntersectionObserver((entries) => {
          for (const entry of entries) {
            if (entry.isIntersecting) {
              observer.unobserve(entry.target);
              dispatch(entry.target, "", createEvent("qvisible", entry));
            }
          }
        });
        results.forEach((el) => observer.observe(el));
      }
    }
  };
  const addEventListener = (el, eventName, handler, capture = false) => {
    return el.addEventListener(eventName, handler, { capture, passive: false });
  };
  const processEventOrNode = (...eventNames) => {
    for (const eventNameOrNode of eventNames) {
      if (typeof eventNameOrNode === "string") {
        if (!events.has(eventNameOrNode)) {
          roots.forEach(
            (root) => addEventListener(root, eventNameOrNode, processDocumentEvent, true)
          );
          addEventListener(win, eventNameOrNode, processWindowEvent, true);
          events.add(eventNameOrNode);
        }
      } else {
        if (!roots.has(eventNameOrNode)) {
          events.forEach(
            (eventName) => addEventListener(eventNameOrNode, eventName, processDocumentEvent, true)
          );
          roots.add(eventNameOrNode);
        }
      }
    }
  };
  if (!("__q_context__" in doc)) {
    doc.__q_context__ = 0;
    const qwikevents = win.qwikevents;
    if (Array.isArray(qwikevents)) {
      processEventOrNode(...qwikevents);
    }
    win.qwikevents = {
      events,
      roots,
      push: processEventOrNode
    };
    addEventListener(doc, "readystatechange", processReadyStateChange);
    processReadyStateChange();
  }
})();
