!function() {
    const qrlResolver = (doc, element, eventUrl, _url, _base) => {
        if (void 0 === eventUrl) {
            if (element) {
                _url = element.getAttribute("q:base");
                _base = qrlResolver(doc, element.parentNode && element.parentNode.closest("[q\\:base]"));
            } else {
                _url = doc.baseURI;
            }
        } else if (eventUrl) {
            _url = eventUrl;
            _base = qrlResolver(doc, element.closest("[q\\:base]"));
        }
        return _url ? new URL(_url, _base) : void 0;
    };
    ((doc, hasInitialized) => {
        const ON_PREFIXES = [ "on:", "on-window:", "on-document:" ];
        const broadcast = async (infix, type, event) => {
            type = type.replace(/([A-Z])/g, (a => "-" + a.toLowerCase()));
            doc.querySelectorAll("[on" + infix + "\\:" + type + "]").forEach((target => dispatch(target, type, event)));
        };
        const dispatch = async (element, eventName, ev, url, previousCtx, attrValue) => {
            for (const on of ON_PREFIXES) {
                attrValue = element.getAttribute(on + eventName) || "";
                for (const qrl of attrValue.split("\n")) {
                    if (url = qrlResolver(doc, element, qrl)) {
                        const handler = getModuleExport(url, window[url.pathname] || await import(String(url).split("#")[0]));
                        previousCtx = document.__q_context__;
                        try {
                            document.__q_context__ = [ element, ev, url ];
                            handler(element, ev, url);
                        } finally {
                            document.__q_context__ = previousCtx;
                        }
                    }
                }
            }
        };
        const getModuleExport = (url, module, exportName) => module[exportName = url.hash.replace(/^#?([^?[|]*).*$/, "$1") || "default"] || (msg => {
            throw new Error("QWIK: " + msg);
        })(url + " does not export " + exportName);
        const processEvent = async (ev, element) => {
            if ((element = ev.target) == doc) {
                setTimeout((() => broadcast("-document", ev.type, ev)));
            } else {
                while (element && element.getAttribute) {
                    dispatch(element, ev.type, ev);
                    element = ev.bubbles ? element.parentElement : null;
                }
            }
        };
        const addEventListener = eventName => doc.addEventListener(eventName, processEvent, {
            capture: !0
        });
        const processReadyStateChange = readyState => {
            readyState = doc.readyState;
            if (!hasInitialized && ("interactive" == readyState || "complete" == readyState)) {
                hasInitialized = 1;
                broadcast("", "q-init", new CustomEvent("qInit"));
            }
        };
        window.qEvents.forEach(addEventListener);
        doc.addEventListener("readystatechange", processReadyStateChange);
        processReadyStateChange();
    })(document);
}();