import { isBrowser } from "@builder.io/qwik/build";
const doc = isBrowser ? document : void 0;
const modulePreloadStr = "modulepreload";
const preloadStr = "preload";
const config = { t: 0, o: 25, l: 0.65 };
const rel = isBrowser && doc.createElement("link").relList.supports(modulePreloadStr) ? modulePreloadStr : preloadStr;
const loadStart = Date.now();
const isJSRegex = /\.[mc]?js$/;
const BundleImportState_None = 0;
const BundleImportState_Queued = 1;
const BundleImportState_Preload = 2;
const BundleImportState_Alias = 3;
const BundleImportState_Loaded = 4;
const bundles = /* @__PURE__ */ new Map();
let queueDirty;
let preloadCount = 0;
const queue = [];
const log = (...e) => {
  console.log(`Preloader ${Date.now() - loadStart}ms ${preloadCount}/${queue.length} queued>`, ...e);
};
const sortQueue = () => {
  if (queueDirty) {
    queue.sort((e, t) => e.u - t.u);
    queueDirty = 0;
  }
};
const trigger = () => {
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
const preloadOne = (e) => {
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
const adjustProbabilities = (e, t, o) => {
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
const handleBundle = (e, t) => {
  const o = getBundle(e);
  if (o && o.u > t) adjustProbabilities(o, t);
};
let depsCount;
const preload = (e, t) => {
  if (!(e == null ? void 0 : e.length)) return;
  depsCount = 0;
  let o = t ? 1 - t : 0.4;
  if (Array.isArray(e)) for (let t2 = e.length - 1; t2 >= 0; t2--) {
    const n = e[t2];
    if (typeof n === "number") o = 1 - n / 10;
    else handleBundle(n, o);
  }
  else handleBundle(e, o);
  if (isBrowser) trigger();
};
if (isBrowser) document.addEventListener("qsymbol", (e) => {
  const { symbol: t, href: o } = e.detail;
  if (o) {
    const e2 = t.slice(t.lastIndexOf("_") + 1);
    preload(e2, 1);
  }
});
let base;
let graph;
const makeBundle = (e, t) => ({ B: e, i: isJSRegex.test(e) ? BundleImportState_None : BundleImportState_Alias, h: t, u: 1, m: Date.now(), p: 0, $: 0 });
const parseBundleGraph = (e) => {
  const t = /* @__PURE__ */ new Map();
  let o = 0;
  while (o < e.length) {
    const n = e[o++];
    const r = [];
    let l;
    let s = 1;
    while (l = e[o], typeof l === "number") {
      if (l < 0) s = -l / 10;
      else r.push({ B: e[l], S: s, q: 1 });
      o++;
    }
    t.set(n, r);
  }
  return t;
};
const getBundle = (e) => {
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
const loadBundleGraph = (e, t, o) => {
  if (o) {
    if ("d" in o) config.t = !!o.d;
    if ("P" in o) config.o = o["P"];
    if ("Q" in o) config.l = 1 - o["Q"];
  }
  if (!isBrowser || e == null) return;
  base = e;
  if (t) t.then((e2) => e2.text()).then((e2) => {
    graph = parseBundleGraph(JSON.parse(e2));
    const t2 = [];
    for (const [e3, o2] of graph.entries()) {
      const n = getBundle(e3);
      n.h = o2;
      if (n.u < 1) {
        t2.push([n, n.u]);
        n.u = 1;
      }
    }
    config.t && log(`parseBundleGraph got ${graph.size} bundles, adjusting ${t2.length}`);
    for (const [e3, o2] of t2) adjustProbabilities(e3, o2);
    trigger();
  }).catch(console.warn);
};
export {
  parseBundleGraph as g,
  handleBundle as h,
  loadBundleGraph as l,
  preload as p
};
