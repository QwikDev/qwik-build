/**
 * @license
 * @builder.io/qwik/optimizer
 * Copyright Builder.io, Inc. All Rights Reserved.
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/BuilderIO/qwik/blob/main/LICENSE
 */
if ("undefined" == typeof globalThis) {
  const g = "undefined" != typeof global ? global : "undefined" != typeof window ? window : "undefined" != typeof self ? self : {};
  g.globalThis = g;
}

globalThis.qwikOptimizer = function(module) {
  var __defProp = Object.defineProperty;
  var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
  var __getOwnPropNames = Object.getOwnPropertyNames;
  var __getOwnPropSymbols = Object.getOwnPropertySymbols;
  var __hasOwnProp = Object.prototype.hasOwnProperty;
  var __propIsEnum = Object.prototype.propertyIsEnumerable;
  var __defNormalProp = (obj, key, value) => key in obj ? __defProp(obj, key, {
    enumerable: true,
    configurable: true,
    writable: true,
    value: value
  }) : obj[key] = value;
  var __spreadValues = (a, b) => {
    for (var prop in b || (b = {})) {
      __hasOwnProp.call(b, prop) && __defNormalProp(a, prop, b[prop]);
    }
    if (__getOwnPropSymbols) {
      for (var prop of __getOwnPropSymbols(b)) {
        __propIsEnum.call(b, prop) && __defNormalProp(a, prop, b[prop]);
      }
    }
    return a;
  };
  var __export = (target, all) => {
    for (var name in all) {
      __defProp(target, name, {
        get: all[name],
        enumerable: true
      });
    }
  };
  var __copyProps = (to, from, except, desc) => {
    if (from && "object" === typeof from || "function" === typeof from) {
      for (let key of __getOwnPropNames(from)) {
        __hasOwnProp.call(to, key) || key === except || __defProp(to, key, {
          get: () => from[key],
          enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable
        });
      }
    }
    return to;
  };
  var __toCommonJS = mod => __copyProps(__defProp({}, "__esModule", {
    value: true
  }), mod);
  var src_exports = {};
  __export(src_exports, {
    createOptimizer: () => createOptimizer,
    qwikRollup: () => qwikRollup,
    qwikVite: () => qwikVite,
    versions: () => versions
  });
  module.exports = __toCommonJS(src_exports);
  var qDev = false !== globalThis.qDev;
  globalThis.describe;
  var STYLE = qDev ? "background: #564CE0; color: white; padding: 2px 3px; border-radius: 2px; font-size: 0.8em;" : "";
  var logWarn = (message, ...optionalParams) => {
    console.warn("%cQWIK WARN", STYLE, message, ...optionalParams);
  };
  var path_exports = {};
  __export(path_exports, {
    _makeLong: () => _makeLong,
    basename: () => basename,
    delimiter: () => delimiter,
    dirname: () => dirname,
    extname: () => extname,
    format: () => format,
    isAbsolute: () => isAbsolute,
    join: () => join,
    normalize: () => normalize,
    parse: () => parse,
    posix: () => posix,
    relative: () => relative,
    resolve: () => resolve,
    sep: () => sep,
    win32: () => win32
  });
  function assertPath(path) {
    if ("string" !== typeof path) {
      throw new TypeError("Path must be a string. Received " + JSON.stringify(path));
    }
  }
  function normalizeStringPosix(path, allowAboveRoot) {
    let res = "";
    let lastSegmentLength = 0;
    let lastSlash = -1;
    let dots = 0;
    let code;
    for (let i = 0; i <= path.length; ++i) {
      if (i < path.length) {
        code = path.charCodeAt(i);
      } else {
        if (47 === code) {
          break;
        }
        code = 47;
      }
      if (47 === code) {
        if (lastSlash === i - 1 || 1 === dots) {} else if (lastSlash !== i - 1 && 2 === dots) {
          if (res.length < 2 || 2 !== lastSegmentLength || 46 !== res.charCodeAt(res.length - 1) || 46 !== res.charCodeAt(res.length - 2)) {
            if (res.length > 2) {
              const lastSlashIndex = res.lastIndexOf("/");
              if (lastSlashIndex !== res.length - 1) {
                if (-1 === lastSlashIndex) {
                  res = "";
                  lastSegmentLength = 0;
                } else {
                  res = res.slice(0, lastSlashIndex);
                  lastSegmentLength = res.length - 1 - res.lastIndexOf("/");
                }
                lastSlash = i;
                dots = 0;
                continue;
              }
            } else if (2 === res.length || 1 === res.length) {
              res = "";
              lastSegmentLength = 0;
              lastSlash = i;
              dots = 0;
              continue;
            }
          }
          if (allowAboveRoot) {
            res.length > 0 ? res += "/.." : res = "..";
            lastSegmentLength = 2;
          }
        } else {
          res.length > 0 ? res += "/" + path.slice(lastSlash + 1, i) : res = path.slice(lastSlash + 1, i);
          lastSegmentLength = i - lastSlash - 1;
        }
        lastSlash = i;
        dots = 0;
      } else {
        46 === code && -1 !== dots ? ++dots : dots = -1;
      }
    }
    return res;
  }
  function _format(sep2, pathObject) {
    const dir = pathObject.dir || pathObject.root;
    const base = pathObject.base || (pathObject.name || "") + (pathObject.ext || "");
    if (!dir) {
      return base;
    }
    if (dir === pathObject.root) {
      return dir + base;
    }
    return dir + sep2 + base;
  }
  var resolve = function(...paths) {
    let resolvedPath = "";
    let resolvedAbsolute = false;
    let cwd;
    for (let i = paths.length - 1; i >= -1 && !resolvedAbsolute; i--) {
      let path;
      if (i >= 0) {
        path = paths[i];
      } else {
        void 0 === cwd && (cwd = "undefined" !== typeof process && "function" === typeof process.cwd ? process.cwd() : "/");
        path = cwd;
      }
      assertPath(path);
      if (0 === path.length) {
        continue;
      }
      resolvedPath = path + "/" + resolvedPath;
      resolvedAbsolute = 47 === path.charCodeAt(0);
    }
    resolvedPath = normalizeStringPosix(resolvedPath, !resolvedAbsolute);
    return resolvedAbsolute ? resolvedPath.length > 0 ? "/" + resolvedPath : "/" : resolvedPath.length > 0 ? resolvedPath : ".";
  };
  var normalize = function(path) {
    assertPath(path);
    if (0 === path.length) {
      return ".";
    }
    const isAbsolute3 = 47 === path.charCodeAt(0);
    const trailingSeparator = 47 === path.charCodeAt(path.length - 1);
    path = normalizeStringPosix(path, !isAbsolute3);
    0 !== path.length || isAbsolute3 || (path = ".");
    path.length > 0 && trailingSeparator && (path += "/");
    if (isAbsolute3) {
      return "/" + path;
    }
    return path;
  };
  var isAbsolute = function(path) {
    assertPath(path);
    return path.length > 0 && 47 === path.charCodeAt(0);
  };
  var join = function(...paths) {
    if (0 === paths.length) {
      return ".";
    }
    let joined;
    for (let i = 0; i < paths.length; ++i) {
      const arg = paths[i];
      assertPath(arg);
      arg.length > 0 && (void 0 === joined ? joined = arg : joined += "/" + arg);
    }
    if (void 0 === joined) {
      return ".";
    }
    return normalize(joined);
  };
  var relative = function(from, to) {
    assertPath(from);
    assertPath(to);
    if (from === to) {
      return "";
    }
    from = resolve(from);
    to = resolve(to);
    if (from === to) {
      return "";
    }
    let fromStart = 1;
    for (;fromStart < from.length; ++fromStart) {
      if (47 !== from.charCodeAt(fromStart)) {
        break;
      }
    }
    const fromEnd = from.length;
    const fromLen = fromEnd - fromStart;
    let toStart = 1;
    for (;toStart < to.length; ++toStart) {
      if (47 !== to.charCodeAt(toStart)) {
        break;
      }
    }
    const toEnd = to.length;
    const toLen = toEnd - toStart;
    const length = fromLen < toLen ? fromLen : toLen;
    let lastCommonSep = -1;
    let i = 0;
    for (;i <= length; ++i) {
      if (i === length) {
        if (toLen > length) {
          if (47 === to.charCodeAt(toStart + i)) {
            return to.slice(toStart + i + 1);
          }
          if (0 === i) {
            return to.slice(toStart + i);
          }
        } else {
          fromLen > length && (47 === from.charCodeAt(fromStart + i) ? lastCommonSep = i : 0 === i && (lastCommonSep = 0));
        }
        break;
      }
      const fromCode = from.charCodeAt(fromStart + i);
      const toCode = to.charCodeAt(toStart + i);
      if (fromCode !== toCode) {
        break;
      }
      47 === fromCode && (lastCommonSep = i);
    }
    let out = "";
    for (i = fromStart + lastCommonSep + 1; i <= fromEnd; ++i) {
      i !== fromEnd && 47 !== from.charCodeAt(i) || (0 === out.length ? out += ".." : out += "/..");
    }
    if (out.length > 0) {
      return out + to.slice(toStart + lastCommonSep);
    }
    toStart += lastCommonSep;
    47 === to.charCodeAt(toStart) && ++toStart;
    return to.slice(toStart);
  };
  var _makeLong = function(path) {
    return path;
  };
  var dirname = function(path) {
    assertPath(path);
    if (0 === path.length) {
      return ".";
    }
    let code = path.charCodeAt(0);
    const hasRoot = 47 === code;
    let end = -1;
    let matchedSlash = true;
    for (let i = path.length - 1; i >= 1; --i) {
      code = path.charCodeAt(i);
      if (47 === code) {
        if (!matchedSlash) {
          end = i;
          break;
        }
      } else {
        matchedSlash = false;
      }
    }
    if (-1 === end) {
      return hasRoot ? "/" : ".";
    }
    if (hasRoot && 1 === end) {
      return "//";
    }
    return path.slice(0, end);
  };
  var basename = function(path, ext) {
    if (void 0 !== ext && "string" !== typeof ext) {
      throw new TypeError('"ext" argument must be a string');
    }
    assertPath(path);
    let start = 0;
    let end = -1;
    let matchedSlash = true;
    let i;
    if (void 0 !== ext && ext.length > 0 && ext.length <= path.length) {
      if (ext.length === path.length && ext === path) {
        return "";
      }
      let extIdx = ext.length - 1;
      let firstNonSlashEnd = -1;
      for (i = path.length - 1; i >= 0; --i) {
        const code = path.charCodeAt(i);
        if (47 === code) {
          if (!matchedSlash) {
            start = i + 1;
            break;
          }
        } else {
          if (-1 === firstNonSlashEnd) {
            matchedSlash = false;
            firstNonSlashEnd = i + 1;
          }
          if (extIdx >= 0) {
            if (code === ext.charCodeAt(extIdx)) {
              -1 === --extIdx && (end = i);
            } else {
              extIdx = -1;
              end = firstNonSlashEnd;
            }
          }
        }
      }
      start === end ? end = firstNonSlashEnd : -1 === end && (end = path.length);
      return path.slice(start, end);
    }
    for (i = path.length - 1; i >= 0; --i) {
      if (47 === path.charCodeAt(i)) {
        if (!matchedSlash) {
          start = i + 1;
          break;
        }
      } else if (-1 === end) {
        matchedSlash = false;
        end = i + 1;
      }
    }
    if (-1 === end) {
      return "";
    }
    return path.slice(start, end);
  };
  var extname = function(path) {
    assertPath(path);
    let startDot = -1;
    let startPart = 0;
    let end = -1;
    let matchedSlash = true;
    let preDotState = 0;
    for (let i = path.length - 1; i >= 0; --i) {
      const code = path.charCodeAt(i);
      if (47 === code) {
        if (!matchedSlash) {
          startPart = i + 1;
          break;
        }
        continue;
      }
      if (-1 === end) {
        matchedSlash = false;
        end = i + 1;
      }
      46 === code ? -1 === startDot ? startDot = i : 1 !== preDotState && (preDotState = 1) : -1 !== startDot && (preDotState = -1);
    }
    if (-1 === startDot || -1 === end || 0 === preDotState || 1 === preDotState && startDot === end - 1 && startDot === startPart + 1) {
      return "";
    }
    return path.slice(startDot, end);
  };
  var format = function(pathObject) {
    if (null === pathObject || "object" !== typeof pathObject) {
      throw new TypeError('The "pathObject" argument must be of type Object. Received type ' + typeof pathObject);
    }
    return _format("/", pathObject);
  };
  var parse = function(path) {
    assertPath(path);
    const ret = {
      root: "",
      dir: "",
      base: "",
      ext: "",
      name: ""
    };
    if (0 === path.length) {
      return ret;
    }
    let code = path.charCodeAt(0);
    let start;
    const isAbsolute3 = 47 === code;
    if (isAbsolute3) {
      ret.root = "/";
      start = 1;
    } else {
      start = 0;
    }
    let startDot = -1;
    let startPart = 0;
    let end = -1;
    let matchedSlash = true;
    let i = path.length - 1;
    let preDotState = 0;
    for (;i >= start; --i) {
      code = path.charCodeAt(i);
      if (47 === code) {
        if (!matchedSlash) {
          startPart = i + 1;
          break;
        }
        continue;
      }
      if (-1 === end) {
        matchedSlash = false;
        end = i + 1;
      }
      46 === code ? -1 === startDot ? startDot = i : 1 !== preDotState && (preDotState = 1) : -1 !== startDot && (preDotState = -1);
    }
    if (-1 === startDot || -1 === end || 0 === preDotState || 1 === preDotState && startDot === end - 1 && startDot === startPart + 1) {
      -1 !== end && (ret.base = ret.name = 0 === startPart && isAbsolute3 ? path.slice(1, end) : path.slice(startPart, end));
    } else {
      if (0 === startPart && isAbsolute3) {
        ret.name = path.slice(1, startDot);
        ret.base = path.slice(1, end);
      } else {
        ret.name = path.slice(startPart, startDot);
        ret.base = path.slice(startPart, end);
      }
      ret.ext = path.slice(startDot, end);
    }
    startPart > 0 ? ret.dir = path.slice(0, startPart - 1) : isAbsolute3 && (ret.dir = "/");
    return ret;
  };
  var sep = "/";
  var delimiter = ":";
  var win32 = null;
  var posix = {
    relative: relative,
    resolve: resolve,
    parse: parse,
    format: format,
    join: join,
    isAbsolute: isAbsolute,
    basename: basename,
    normalize: normalize,
    dirname: dirname,
    extname: extname,
    delimiter: delimiter,
    sep: sep,
    win32: null,
    posix: null
  };
  var QWIK_BINDING_MAP = {
    darwin: {
      arm64: [ {
        platform: "darwin",
        arch: "arm64",
        abi: null,
        platformArchABI: "qwik.darwin-arm64.node"
      } ],
      x64: [ {
        platform: "darwin",
        arch: "x64",
        abi: null,
        platformArchABI: "qwik.darwin-x64.node"
      } ]
    },
    win32: {
      x64: [ {
        platform: "win32",
        arch: "x64",
        abi: "msvc",
        platformArchABI: "qwik.win32-x64-msvc.node"
      } ]
    }
  };
  var versions = {
    qwik: true
  };
  async function getSystem() {
    const sys = {
      dynamicImport: () => {
        throw new Error("Qwik Optimizer sys.dynamicImport() not implemented");
      },
      path: path_exports
    };
    false;
    if (isNodeJs()) {
      sys.dynamicImport = path => require(path);
      if ("undefined" === typeof TextEncoder) {
        const nodeUtil = sys.dynamicImport("util");
        global.TextEncoder = nodeUtil.TextEncoder;
        global.TextDecoder = nodeUtil.TextDecoder;
      }
    } else {
      (isWebWorker() || isBrowserMain()) && (sys.dynamicImport = async path => {
        const cjsRsp = await fetch(path);
        const cjsCode = await cjsRsp.text();
        const cjsModule = {
          exports: {}
        };
        const cjsRun = new Function("module", "exports", cjsCode);
        cjsRun(cjsModule, cjsModule.exports);
        return cjsModule.exports;
      });
    }
    isNodeJs() && (sys.path = await sys.dynamicImport("path"));
    return sys;
  }
  var getPlatformInputFiles = async sys => {
    if ("function" === typeof sys.getInputFiles) {
      return sys.getInputFiles;
    }
    if (isNodeJs()) {
      const fs = await sys.dynamicImport("fs");
      return async rootDir => {
        const getChildFilePaths = async dir => {
          const dirItems = await fs.promises.readdir(dir);
          const files = await Promise.all(dirItems.map((async subdir => {
            const resolvedPath = sys.path.resolve(dir, subdir);
            const stats = await fs.promises.stat(resolvedPath);
            return stats.isDirectory() ? getChildFilePaths(resolvedPath) : [ resolvedPath ];
          })));
          const flatted = [];
          for (const file of files) {
            flatted.push(...file);
          }
          return flatted.filter((a => extensions[sys.path.extname(a)]));
        };
        const filePaths = await getChildFilePaths(rootDir);
        const inputs = (await Promise.all(filePaths.map((async filePath => {
          const input = {
            code: await fs.promises.readFile(filePath, "utf8"),
            path: filePath.slice(rootDir.length + 1)
          };
          return input;
        })))).sort(((a, b) => {
          if (a.path < b.path) {
            return -1;
          }
          if (a.path > b.path) {
            return 1;
          }
          return 0;
        }));
        return inputs;
      };
    }
    return null;
  };
  async function loadPlatformBinding(sys) {
    if (isNodeJs()) {
      const platform = QWIK_BINDING_MAP[process.platform];
      if (platform) {
        const triples = platform[process.arch];
        if (triples) {
          for (const triple of triples) {
            try {
              const platformBindingPath = sys.path.join("bindings", triple.platformArchABI);
              const mod = await sys.dynamicImport("./" + platformBindingPath);
              return mod;
            } catch (e) {
              logWarn(e);
            }
          }
        }
      }
    }
    if (isNodeJs()) {
      const cjsWasmPath = sys.path.join("bindings", "qwik.wasm.cjs");
      const wasmPath = sys.path.join(__dirname, "bindings", "qwik_wasm_bg.wasm");
      const mod = await sys.dynamicImport("./" + cjsWasmPath);
      const fs = await sys.dynamicImport("fs");
      return new Promise(((resolve3, reject) => {
        fs.readFile(wasmPath, ((err, buf) => {
          null != err ? reject(err) : resolve3(buf);
        }));
      })).then((buf => WebAssembly.compile(buf))).then((wasm => mod.default(wasm))).then((() => mod));
    }
    if (isWebWorker() || isBrowserMain()) {
      const cdnUrl = `https://cdn.jsdelivr.net/npm/@builder.io/qwik@${versions.qwik}/bindings/`;
      const cjsModuleUrl = new URL("./qwik.wasm.cjs", cdnUrl).href;
      const wasmUrl = new URL("./qwik_wasm_bg.wasm", cdnUrl).href;
      const rsps = await Promise.all([ fetch(cjsModuleUrl), fetch(wasmUrl) ]);
      for (const rsp of rsps) {
        if (!rsp.ok) {
          throw new Error(`Unable to fetch Qwik WASM binding from ${rsp.url}`);
        }
      }
      const cjsRsp = rsps[0];
      const wasmRsp = rsps[1];
      const cjsCode = await cjsRsp.text();
      const cjsModule = {
        exports: {}
      };
      const cjsRun = new Function("module", "exports", cjsCode);
      cjsRun(cjsModule, cjsModule.exports);
      const mod = cjsModule.exports;
      await mod.default(wasmRsp);
      return mod;
    }
    false;
    throw new Error("Platform not supported");
  }
  function isNodeJs() {
    return "undefined" !== typeof process && process.versions && process.versions.node && "undefined" !== typeof global;
  }
  function isBrowserMain() {
    return "undefined" !== typeof window && "undefined" !== typeof document && "undefined" !== typeof location && "undefined" !== typeof navigator && "function" === typeof Window && "function" === typeof fetch;
  }
  function isWebWorker() {
    return "undefined" !== typeof self && "undefined" !== typeof location && "undefined" !== typeof navigator && "function" === typeof fetch && "function" === typeof WorkerGlobalScope && "function" === typeof self.importScripts;
  }
  var extensions = {
    ".js": true,
    ".ts": true,
    ".tsx": true,
    ".jsx": true
  };
  var createOptimizer = async () => {
    const sys = await getSystem();
    const binding = await loadPlatformBinding(sys);
    const optimizer = {
      transformModules: async opts => transformModulesSync(binding, opts),
      transformModulesSync: opts => transformModulesSync(binding, opts),
      transformFs: async opts => transformFsAsync(sys, binding, opts),
      transformFsSync: opts => transformFsSync(binding, opts),
      sys: sys
    };
    return optimizer;
  };
  var transformModulesSync = (binding, opts) => binding.transform_modules(convertOptions(opts));
  var transformFsSync = (binding, opts) => {
    if (binding.transform_fs) {
      return binding.transform_fs(convertOptions(opts));
    }
    throw new Error("Not implemented");
  };
  var transformFsAsync = async (sys, binding, fsOpts) => {
    if (binding.transform_fs && !sys.getInputFiles) {
      return binding.transform_fs(convertOptions(fsOpts));
    }
    const getInputFiles = await getPlatformInputFiles(sys);
    if (getInputFiles) {
      const input = await getInputFiles(fsOpts.rootDir);
      const modulesOpts = {
        rootDir: fsOpts.rootDir,
        entryStrategy: fsOpts.entryStrategy,
        minify: fsOpts.minify,
        sourceMaps: fsOpts.sourceMaps,
        transpile: fsOpts.transpile,
        input: input
      };
      return binding.transform_modules(convertOptions(modulesOpts));
    }
    throw new Error("Not implemented");
  };
  var convertOptions = opts => {
    var _a, _b;
    const output = {
      minify: "simplify",
      sourceMaps: false,
      transpile: false,
      explicityExtensions: false
    };
    Object.entries(opts).forEach((([key, value]) => {
      null != value && (output[key] = value);
    }));
    output.entryStrategy = null != (_b = null == (_a = opts.entryStrategy) ? void 0 : _a.type) ? _b : "smart";
    return output;
  };
  var QWIK_LOADER_DEFAULT_MINIFIED = '((e,t,n)=>{const o="__q_context__",r=["on:","on-window:","on-document:"],s=(t,n,o)=>{n=n.replace(/([A-Z])/g,(e=>"-"+e.toLowerCase())),e.querySelectorAll("[on"+t+"\\\\:"+n+"]").forEach((e=>l(e,n,o)))},a=(e,t)=>e.dispatchEvent(new CustomEvent("qSymbol",{detail:{name:t},bubbles:!0,composed:!0})),c=e=>{throw Error("QWIK "+e)},i=(t,n)=>(t=t.closest("[q\\\\:container]"),new URL(n,new URL(t?t.getAttribute("q:base"):e.baseURI,e.baseURI))),l=async(t,n,s)=>{for(const l of r){const r=t.getAttribute(l+n);if(r){t.hasAttribute("preventdefault:"+n)&&s.preventDefault();for(const n of r.split("\\n")){const r=i(t,n);if(r){const n=p(r),i=(window[r.pathname]||await import(r.href.split("#")[0]))[n]||c(r+" does not export "+n),l=e[o];try{e[o]=[t,s,r],i(s,t,r)}finally{e[o]=l,a(t,n)}}}}}},p=e=>e.hash.replace(/^#?([^?[|]*).*$/,"$1")||"default",u=(t,n)=>{if((n=t.target)==e)setTimeout((()=>s("-document",t.type,t)));else for(;n&&n.getAttribute;)l(n,t.type,t),n=t.bubbles?n.parentElement:null},f=e=>(n||(n=new Worker(URL.createObjectURL(new Blob([\'addEventListener("message",(e=>e.data.map((e=>fetch(e)))));\'],{type:"text/javascript"})))),n.postMessage(e.getAttribute("q:prefetch").split("\\n").map((t=>i(e,t)+""))),n),d=n=>{n=e.readyState,t||"interactive"!=n&&"complete"!=n||(t=1,s("","q-resume",new CustomEvent("qResume")),e.querySelectorAll("[q\\\\:prefetch]").forEach(f))},b=t=>e.addEventListener(t,u,{capture:!0});if(!e.qR){e.qR=1;{const t=e.querySelector("script[events]");if(t)t.getAttribute("events").split(/[\\s,;]+/).forEach(b);else for(const t in e)t.startsWith("on")&&b(t.slice(2))}e.addEventListener("readystatechange",d),d()}})(document);';
  var QWIK_BUILD = "@builder.io/qwik/build";
  function qwikVite(opts) {
    var _a, _b, _c, _d;
    const plugin = qwikRollup(opts);
    if (false !== opts.ssr) {
      const entry = null != (_b = null == (_a = opts.ssr) ? void 0 : _a.entry) ? _b : "/src/entry.server.tsx";
      const main = null != (_d = null == (_c = opts.ssr) ? void 0 : _c.main) ? _d : "/src/main.tsx";
      Object.assign(plugin, {
        name: "qwik-vite",
        handleHotUpdate(ctx) {
          plugin.log("handleHotUpdate()", ctx);
          if (ctx.file.endsWith(".css")) {
            plugin.log("handleHotUpdate()", "force css reload");
            ctx.server.ws.send({
              type: "full-reload"
            });
            return [];
          }
          return null;
        },
        configureServer(server) {
          plugin.log("configureServer()");
          server.middlewares.use((async (req, res, next) => {
            var _a2;
            const url = req.originalUrl;
            const hasExtension = /\.[\w?=&]+$/.test(url);
            const isViteMod = url.startsWith("/@");
            const isVitePing = url.endsWith("__vite_ping");
            const skipSSR = url.includes("ssr=false");
            if (hasExtension || isViteMod || isVitePing || skipSSR) {
              next();
            } else {
              plugin.log(`handleSSR("${url}")`);
              try {
                const {render: render} = await server.ssrLoadModule(entry);
                if (render) {
                  const symbols = {
                    version: "1",
                    mapping: {},
                    injections: []
                  };
                  Array.from(server.moduleGraph.fileToModulesMap.entries()).forEach((entry2 => {
                    entry2[1].forEach((v => {
                      var _a3, _b2;
                      const hook = null == (_b2 = null == (_a3 = v.info) ? void 0 : _a3.meta) ? void 0 : _b2.hook;
                      hook && v.lastHMRTimestamp && (symbols.mapping[hook.name] = `${v.url}?t=${v.lastHMRTimestamp}`);
                    }));
                  }));
                  plugin.log("handleSSR()", "symbols", symbols);
                  const mod = await server.moduleGraph.getModuleByUrl(main);
                  mod && mod.importedModules.forEach((value => {
                    value.url.endsWith(".css") && symbols.injections.push({
                      tag: "link",
                      location: "head",
                      attributes: {
                        rel: "stylesheet",
                        href: value.url
                      }
                    });
                  }));
                  const host = null != (_a2 = req.headers.host) ? _a2 : "localhost";
                  const result = await render({
                    url: new URL(`http://${host}${url}`),
                    debug: true,
                    symbols: symbols
                  });
                  const html = await server.transformIndexHtml(url, result.html);
                  res.setHeader("Content-Type", "text/html; charset=utf-8");
                  res.writeHead(200);
                  res.end(html);
                }
              } catch (e) {
                server.ssrFixStacktrace(e);
                next(e);
              }
            }
          }));
        }
      });
    }
    return plugin;
  }
  function qwikRollup(opts) {
    const ID = `${Math.round(8999 * Math.random()) + 1e3}`;
    const debug = !!opts.debug;
    const results = new Map;
    const injections = [];
    const transformedOutputs = new Map;
    let optimizer;
    let isSSR = false;
    let outputCount = 0;
    let isBuild = true;
    let entryStrategy = __spreadValues({
      type: "single"
    }, opts.entryStrategy);
    const log = debug ? (...str) => {
      console.debug(`[QWIK PLUGIN: ${ID}]`, ...str);
    } : () => {};
    log("New", opts);
    const createRollupError = (rootDir, diagnostic) => {
      var _a, _b;
      const loc = null != (_b = null == (_a = diagnostic.code_highlights[0]) ? void 0 : _a.loc) ? _b : {};
      const id = optimizer.sys.path.join(rootDir, diagnostic.origin);
      const err = Object.assign(new Error(diagnostic.message), {
        id: id,
        plugin: "qwik",
        loc: {
          column: loc.start_col,
          line: loc.start_line
        },
        stack: ""
      });
      return err;
    };
    const handleDiagnostics = (ctx, rootDir, diagnostics) => {
      diagnostics.forEach((d => {
        "Error" === d.severity ? ctx.error(createRollupError(rootDir, d)) : (d.severity, 
        ctx.warn(createRollupError(rootDir, d)));
      }));
    };
    const plugin = {
      name: "qwik",
      enforce: "pre",
      log: log,
      async config(config, {command: command}) {
        optimizer || (optimizer = await createOptimizer());
        if ("serve" === command) {
          isBuild = false;
          entryStrategy = {
            type: "hook"
          };
          config.ssr && (config.ssr.noExternal = false);
        }
        "build" === command && fixSSRInput(config, optimizer);
        log("vite command", command);
        return {
          esbuild: {
            include: /\.js$/
          },
          optimizeDeps: {
            include: [ "@builder.io/qwik", "@builder.io/qwik/jsx-runtime" ]
          },
          build: {
            polyfillModulePreload: false,
            dynamicImportVarsOptions: {
              exclude: [ /./ ]
            }
          }
        };
      },
      options(inputOptions) {
        inputOptions.onwarn = (warning, warn) => {
          if ("typescript" === warning.plugin && warning.message.includes("outputToFilesystem")) {
            return;
          }
          warn(warning);
        };
        return inputOptions;
      },
      transformIndexHtml(html, ctx) {
        ctx.bundle && Object.entries(ctx.bundle).forEach((([key, value]) => {
          "asset" === value.type && key.endsWith(".css") && injections.push({
            tag: "link",
            location: "head",
            attributes: {
              rel: "stylesheet",
              href: `/${key}`
            }
          });
        }));
        html = html.replace("</head>", `<script>${QWIK_LOADER_DEFAULT_MINIFIED}<\/script>\n</head>`);
        return html;
      },
      async buildStart() {
        if ("string" !== typeof opts.srcDir && !Array.isArray(opts.srcInputs)) {
          throw new Error('Qwik plugin must have either a "srcDir" or "srcInputs" option.');
        }
        if ("string" === typeof opts.srcDir && Array.isArray(opts.srcInputs)) {
          throw new Error('Qwik plugin cannot have both the "srcDir" and "srcInputs" options.');
        }
        optimizer || (optimizer = await createOptimizer());
        const fullBuild = "hook" !== entryStrategy.type;
        log("buildStart()", fullBuild ? "full build" : "isolated build");
        if (fullBuild) {
          outputCount = 0;
          let rootDir = "/";
          "string" === typeof opts.srcDir ? rootDir = optimizer.sys.path.isAbsolute(opts.srcDir) ? opts.srcDir : optimizer.sys.path.resolve(opts.srcDir) : Array.isArray(opts.srcInputs) && (optimizer.sys.getInputFiles = async () => opts.srcInputs);
          const transformOpts = {
            rootDir: rootDir,
            entryStrategy: opts.entryStrategy,
            minify: opts.minify,
            transpile: true,
            explicityExtensions: true
          };
          const result = await optimizer.transformFs(transformOpts);
          for (const output of result.modules) {
            const key = optimizer.sys.path.join(rootDir, output.path);
            log("buildStart()", "qwik module", key);
            transformedOutputs.set(key, [ output, key ]);
          }
          handleDiagnostics(this, rootDir, result.diagnostics);
          results.set("@buildStart", result);
        }
      },
      async resolveId(originalID, importer, localOpts) {
        true === localOpts.ssr && (isSSR = true);
        log(`resolveId("${originalID}", "${importer}")`);
        if ((isBuild || "boolean" === typeof opts.ssrBuild) && originalID === QWIK_BUILD) {
          log("resolveId()", "Resolved", QWIK_BUILD);
          return {
            id: QWIK_BUILD,
            moduleSideEffects: false
          };
        }
        optimizer || (optimizer = await createOptimizer());
        let id = removeQueryParams(originalID);
        if (importer) {
          const filteredImporter = removeQueryParams(importer);
          const dir = optimizer.sys.path.dirname(filteredImporter);
          id = filteredImporter.endsWith(".html") && !id.endsWith(".html") ? optimizer.sys.path.join(dir, id) : optimizer.sys.path.resolve(dir, id);
        }
        const tries = [ forceJSExtension(optimizer.sys.path, id) ];
        for (const tryId of tries) {
          log("resolveId()", "Try", tryId);
          const transformedOutput = transformedOutputs.get(tryId);
          if (transformedOutput) {
            log("resolveId()", "Resolved", tryId);
            const transformedModule = transformedOutput[0];
            const sideEffects = !transformedModule.isEntry || !transformedModule.hook;
            return {
              id: tryId,
              moduleSideEffects: sideEffects
            };
          }
        }
        return null;
      },
      load(id) {
        log(`load("${id}")`);
        if (id === QWIK_BUILD) {
          log("load()", QWIK_BUILD, isSSR ? "ssr" : "client");
          return {
            code: getBuildFile(isSSR)
          };
        }
        "hook" !== entryStrategy.type && (id = forceJSExtension(optimizer.sys.path, id));
        const transformedModule = transformedOutputs.get(id);
        if (transformedModule) {
          log("load()", "Found", id);
          return {
            code: transformedModule[0].code,
            map: transformedModule[0].map
          };
        }
      },
      async transform(code, id) {
        if ("hook" !== entryStrategy.type) {
          return null;
        }
        if (id.startsWith("\0")) {
          return null;
        }
        log(`transform("${id}")`);
        const pregenerated = transformedOutputs.get(id);
        if (pregenerated) {
          log("transform()", "addWatchFile", id, pregenerated[1]);
          this.addWatchFile(pregenerated[1]);
          return {
            meta: {
              hook: pregenerated[0].hook
            }
          };
        }
        optimizer || (optimizer = await createOptimizer());
        const filteredId = removeQueryParams(id);
        const {ext: ext, dir: dir, base: base} = optimizer.sys.path.parse(filteredId);
        if ([ ".tsx", ".ts", ".jsx" ].includes(ext)) {
          log("transform()", "Transforming", filteredId);
          const newOutput = optimizer.transformModulesSync({
            input: [ {
              code: code,
              path: base
            } ],
            entryStrategy: {
              type: "hook"
            },
            minify: opts.minify,
            sourceMaps: false,
            transpile: true,
            explicityExtensions: true,
            rootDir: dir
          });
          handleDiagnostics(this, base, newOutput.diagnostics);
          results.set(filteredId, newOutput);
          transformedOutputs.clear();
          for (const [id2, output] of results.entries()) {
            const justChanged = newOutput === output;
            const dir2 = optimizer.sys.path.dirname(id2);
            for (const mod of output.modules) {
              if (mod.isEntry) {
                const key = optimizer.sys.path.join(dir2, mod.path);
                transformedOutputs.set(key, [ mod, id2 ]);
                log("transform()", "emitting", justChanged, key);
              }
            }
          }
          const module2 = newOutput.modules.find((m => !m.isEntry));
          return {
            code: module2.code,
            map: module2.map,
            meta: {
              hook: module2.hook
            }
          };
        }
        return null;
      },
      outputOptions(outputOpts) {
        if ("cjs" === outputOpts.format && "string" !== typeof outputOpts.exports) {
          outputOpts.exports = "auto";
          return outputOpts;
        }
        return null;
      },
      async generateBundle(outputOpts, rollupBundle) {
        log("generateBundle()");
        const hooks = Array.from(results.values()).flatMap((r => r.modules)).map((mod => mod.hook)).filter((h => !!h));
        if (hooks.length > 0 && "es" === outputOpts.format && 0 === outputCount && !isSSR) {
          outputCount++;
          const output = Object.entries(rollupBundle);
          const outputEntryMap = {
            mapping: {},
            version: "1",
            injections: injections
          };
          hooks.forEach((h => {
            const symbolName = h.name;
            let filename = h.canonicalFilename + ".js";
            const found = output.find((([_, v]) => "chunk" == v.type && true === v.isDynamicEntry && Object.keys(v.modules).find((f => f.endsWith(filename)))));
            found && (filename = found[0]);
            outputEntryMap.mapping[symbolName] = filename;
          }));
          log("generateBundle()", outputEntryMap);
          if ("string" === typeof opts.symbolsOutput) {
            this.emitFile({
              fileName: opts.symbolsOutput,
              source: JSON.stringify(outputEntryMap, null, 2),
              type: "asset"
            });
          } else if ("function" === typeof opts.symbolsOutput) {
            const symbolsOutput = opts.symbolsOutput;
            setTimeout((async () => {
              await symbolsOutput(outputEntryMap, outputOpts);
            }));
          }
        }
      }
    };
    return plugin;
  }
  function removeQueryParams(id) {
    const [filteredId] = id.split("?");
    return filteredId;
  }
  var EXT = [ ".jsx", ".ts", ".tsx" ];
  function forceJSExtension(path, id) {
    const ext = path.extname(id);
    if ("" === ext) {
      return id + ".js";
    }
    if (EXT.includes(ext)) {
      return removeExtension(id) + ".js";
    }
    return id;
  }
  function removeExtension(id) {
    return id.split(".").slice(0, -1).join(".");
  }
  function getBuildFile(isSSR) {
    return `\nexport const isServer = ${isSSR};\nexport const isBrowser = ${!isSSR};\n`;
  }
  function slash(p) {
    return p.replace(/\\/g, "/");
  }
  function fixSSRInput(config, optimizer) {
    var _a, _b;
    if ("string" === typeof (null == (_a = null == config ? void 0 : config.build) ? void 0 : _a.ssr) && (null == (_b = null == config ? void 0 : config.build.rollupOptions) ? void 0 : _b.input)) {
      const cwd = "undefined" !== typeof process && "function" === typeof process.cwd ? process.cwd() : "/";
      const resolvedRoot = optimizer.sys.path.normalize(slash(config.root ? optimizer.sys.path.resolve(config.root) : cwd));
      config.build.rollupOptions.input = optimizer.sys.path.resolve(resolvedRoot, config.build.ssr);
    }
  }
  return module.exports;
}("object" === typeof module && module.exports ? module : {
  exports: {}
});