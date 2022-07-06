/**
 * @license
 * @builder.io/qwik/testing
 * Copyright Builder.io, Inc. All Rights Reserved.
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/BuilderIO/qwik/blob/main/LICENSE
 */
// packages/qwik/src/testing/document.ts
import { _createDocument } from "../server.mjs";

// packages/qwik/src/testing/platform.ts
import { getPlatform, setPlatform } from "../core.mjs";
import { existsSync } from "fs";
import { fileURLToPath } from "url";

// packages/qwik/src/core/util/promises.ts
var isPromise = (value) => {
  return value instanceof Promise;
};

// packages/qwik/src/core/util/markers.ts
var QContainerSelector = "[q\\:container]";

// packages/qwik/src/core/use/use-core.ts
var CONTAINER = Symbol("container");
var getContainer = (el) => {
  let container = el[CONTAINER];
  if (!container) {
    container = el.closest(QContainerSelector);
    el[CONTAINER] = container;
  }
  return container;
};

// packages/qwik/src/testing/platform.ts
function createPlatform(document2) {
  if (!document2 || document2.nodeType !== 9) {
    throw new Error(`Invalid Document implementation`);
  }
  const doc = document2;
  let render = null;
  const moduleCache = /* @__PURE__ */ new Map();
  const testPlatform = {
    isServer: true,
    importSymbol(element, url, symbolName) {
      const urlDoc = toUrl(element.ownerDocument, element, url);
      const importPath = toPath(urlDoc);
      const mod = moduleCache.get(importPath);
      if (mod) {
        return mod[symbolName];
      }
      return import(importPath).then((mod2) => {
        moduleCache.set(importPath, mod2);
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
          render.resolve(await render.fn(doc));
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
  return testPlatform;
}
function setTestPlatform(document2) {
  const platform = createPlatform(document2);
  setPlatform(document2, platform);
}
function toUrl(doc, element, url) {
  const containerEl = getContainer(element);
  const base = new URL(containerEl?.getAttribute("q:base") ?? doc.baseURI, doc.baseURI);
  return new URL(url, base);
}
function toPath(url) {
  const normalizedUrl = new URL(String(url));
  normalizedUrl.hash = "";
  normalizedUrl.search = "";
  const path = fileURLToPath(String(normalizedUrl));
  const importPaths = [path, ...testExts.map((ext) => path + ext)];
  for (const importPath of importPaths) {
    if (existsSync(importPath)) {
      return importPath;
    }
  }
  throw new Error(`Unable to find path for import "${url}"`);
}
function getTestPlatform(document2) {
  const testPlatform = getPlatform(document2);
  if (!testPlatform) {
    throw new Error(`Test platform was not applied to the document`);
  }
  if (typeof testPlatform.flush !== "function") {
    throw new Error(`Invalid Test platform applied to the document`);
  }
  return testPlatform;
}
var testExts = [".ts", ".tsx", ".js", ".cjs", ".mjs", ".jsx"];

// packages/qwik/src/testing/document.ts
function createWindow(opts = {}) {
  const win = _createDocument(opts).defaultView;
  setTestPlatform(win.document);
  return win;
}
function createDocument(opts = {}) {
  const doc = _createDocument(opts);
  setTestPlatform(doc);
  return doc;
}

// packages/qwik/src/testing/element-fixture.ts
var ElementFixture = class {
  constructor(options = {}) {
    this.window = createWindow();
    this.document = this.window.document;
    this.superParent = this.document.createElement("super-parent");
    this.parent = this.document.createElement("parent");
    this.host = this.document.createElement(options.tagName || "host");
    this.child = this.document.createElement("child");
    this.superParent.appendChild(this.parent);
    this.parent.appendChild(this.host);
    this.host.appendChild(this.child);
    this.document.body.appendChild(this.superParent);
  }
};

// packages/qwik/src/testing/util.ts
import { pathToFileURL } from "url";
function toFileUrl(filePath) {
  return pathToFileURL(filePath).href;
}
var __self = typeof self !== "undefined" && typeof WorkerGlobalScope !== "undefined" && self instanceof WorkerGlobalScope && self;
export {
  ElementFixture,
  createDocument,
  createWindow,
  getTestPlatform,
  isPromise,
  toFileUrl
};
