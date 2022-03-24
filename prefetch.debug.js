const qrlResolver = (element, eventUrl) => {
    const doc = element.ownerDocument;
    const containerEl = element.closest("[q\\:container]");
    const base = new URL(containerEl?.getAttribute("q:base") ?? doc.baseURI, doc.baseURI);
    return new URL(eventUrl, base);
};

const setupPrefetching = (win, doc, IntersectionObserver) => {
    const intersectionObserverCallback = items => {
        items.forEach((item => {
            if (item.intersectionRatio > 0) {
                const element = item.target;
                const attrs = element.attributes;
                for (let i = 0; i < attrs.length; i++) {
                    const attr = attrs[i];
                    const name = attr.name;
                    const value = attr.value;
                    if (name.startsWith("on:") && value) {
                        const url = qrlResolver(element, value);
                        url.hash = url.search = "";
                        const key = url.toString() + ".js";
                        if (!qrlCache[key]) {
                            qrlCache[key] = key;
                            onEachNewQrl(key);
                        }
                    }
                }
            }
        }));
    };
    const qrlCache = {};
    const onEachNewQrl = qrl => {
        if (!worker) {
            const url = URL.createObjectURL(new Blob([ "/**\n * @license\n * Copyright Builder.io, Inc. All Rights Reserved.\n *\n * Use of this source code is governed by an MIT-style license that can be\n * found in the LICENSE file at https://github.com/BuilderIO/qwik/blob/main/LICENSE\n */\nconst setUpWebWorker = (self, fetch) => {\n  const cache = {};\n  const prefetch = async (_, url) => {\n    if (cache[url] !== 1) {\n      cache[url] = 1;\n      ((await fetch(url)).headers.get(\"Link\") || \"\").replace(/<([^>]*)>/g, prefetch);\n    }\n  };\n  self.addEventListener(\"message\", (event) => prefetch(\"\", event.data));\n};\n\nsetUpWebWorker(self, fetch);\n" ], {
                type: "text/javascript"
            }));
            worker = new Worker(url);
        }
        worker.postMessage(qrl);
    };
    let worker;
    win.addEventListener("load", (() => {
        const observer = new IntersectionObserver(intersectionObserverCallback);
        doc.querySelectorAll("[on\\:\\.]").forEach(observer.observe.bind(observer));
    }));
};

setupPrefetching(window, document, IntersectionObserver);