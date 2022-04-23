(() => {
    ((doc, hasInitialized, prefetchWorker) => {
        const ON_PREFIXES = [ "on:", "on-window:", "on-document:" ];
        const broadcast = (infix, type, ev) => {
            type = type.replace(/([A-Z])/g, (a => "-" + a.toLowerCase()));
            doc.querySelectorAll("[on" + infix + "\\:" + type + "]").forEach((target => dispatch(target, type, ev)));
        };
        const symbolUsed = (el, symbolName) => el.dispatchEvent(new CustomEvent("qSymbol", {
            detail: {
                name: symbolName
            },
            bubbles: !0,
            composed: !0
        }));
        const error = msg => {
            throw new Error("QWIK " + msg);
        };
        const qrlResolver = (element, qrl) => {
            element = element.closest("[q\\:container]");
            return new URL(qrl, new URL(element ? element.getAttribute("q:base") : doc.baseURI, doc.baseURI));
        };
        const dispatch = async (element, eventName, ev) => {
            for (const onPrefix of ON_PREFIXES) {
                const attrValue = element.getAttribute(onPrefix + eventName);
                if (attrValue) {
                    element.hasAttribute("preventdefault:" + eventName) && ev.preventDefault();
                    for (const qrl of attrValue.split("\n")) {
                        const url = qrlResolver(element, qrl);
                        if (url) {
                            const symbolName = getSymbolName(url);
                            const handler = (window[url.pathname] || await import(url.href.split("#")[0]))[symbolName] || error(url + " does not export " + symbolName);
                            const previousCtx = doc.__q_context__;
                            try {
                                doc.__q_context__ = [ element, ev, url ];
                                handler(ev, element, url);
                            } finally {
                                doc.__q_context__ = previousCtx;
                                symbolUsed(element, symbolName);
                            }
                        }
                    }
                }
            }
        };
        const getSymbolName = url => url.hash.replace(/^#?([^?[|]*).*$/, "$1") || "default";
        const processEvent = (ev, element) => {
            if ((element = ev.target) == doc) {
                setTimeout((() => broadcast("-document", ev.type, ev)));
            } else {
                while (element && element.getAttribute) {
                    dispatch(element, ev.type, ev);
                    element = ev.bubbles ? element.parentElement : null;
                }
            }
        };
        const qrlPrefetch = element => {
            prefetchWorker || (prefetchWorker = new Worker(URL.createObjectURL(new Blob([ 'addEventListener("message",(e=>e.data.map((e=>fetch(e)))));' ], {
                type: "text/javascript"
            }))));
            prefetchWorker.postMessage(element.getAttribute("q:prefetch").split("\n").map((qrl => qrlResolver(element, qrl) + "")));
            return prefetchWorker;
        };
        const processReadyStateChange = readyState => {
            readyState = doc.readyState;
            if (!hasInitialized && ("interactive" == readyState || "complete" == readyState)) {
                hasInitialized = 1;
                broadcast("", "q-resume", new CustomEvent("qResume"));
                doc.querySelectorAll("[q\\:prefetch]").forEach(qrlPrefetch);
                if ("undefined" != typeof IntersectionObserver) {
                    const observer = new IntersectionObserver((entries => {
                        for (const entry of entries) {
                            if (entry.isIntersecting) {
                                observer.unobserve(entry.target);
                                dispatch(entry.target, "q-visible", new CustomEvent("qVisible", {
                                    bubbles: !1,
                                    detail: entry
                                }));
                            }
                        }
                    }));
                    new MutationObserver((mutations => {
                        for (const mutation2 of mutations) {
                            mutation2.target.hasAttribute("on:q-visible") && observer.observe(mutation2.target);
                        }
                    })).observe(document.body, {
                        attributeFilter: [ "on:q-visible" ],
                        subtree: !0
                    });
                    doc.querySelectorAll("[on\\:q-visible]").forEach((el => observer.observe(el)));
                }
            }
        };
        const addDocEventListener = eventName => doc.addEventListener(eventName, processEvent, {
            capture: !0
        });
        if (!doc.qR) {
            doc.qR = 1;
            {
                const scriptTag = doc.querySelector("script[events]");
                if (scriptTag) {
                    scriptTag.getAttribute("events").split(/[\s,;]+/).forEach(addDocEventListener);
                } else {
                    for (const key in doc) {
                        key.startsWith("on") && addDocEventListener(key.slice(2));
                    }
                }
            }
            doc.addEventListener("readystatechange", processReadyStateChange);
            processReadyStateChange();
        }
    })(document);
})();