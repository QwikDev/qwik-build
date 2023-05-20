/**
 * @license
 * @builder.io/qwik/optimizer 1.1.4
 * Copyright Builder.io, Inc. All Rights Reserved.
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/BuilderIO/qwik/blob/main/LICENSE
 */
function createPath(opts = {}) {
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
  const resolve = function(...paths) {
    let resolvedPath = "";
    let resolvedAbsolute = false;
    let cwd;
    for (let i = paths.length - 1; i >= -1 && !resolvedAbsolute; i--) {
      let path;
      if (i >= 0) {
        path = paths[i];
      } else {
        void 0 === cwd && (cwd = opts && "function" === typeof opts.cwd ? opts.cwd() : "undefined" !== typeof process && "function" === typeof process.cwd ? process.cwd() : "/");
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
  const normalize = function(path) {
    assertPath(path);
    if (0 === path.length) {
      return ".";
    }
    const isAbsolute2 = 47 === path.charCodeAt(0);
    const trailingSeparator = 47 === path.charCodeAt(path.length - 1);
    path = normalizeStringPosix(path, !isAbsolute2);
    0 !== path.length || isAbsolute2 || (path = ".");
    path.length > 0 && trailingSeparator && (path += "/");
    if (isAbsolute2) {
      return "/" + path;
    }
    return path;
  };
  const isAbsolute = function(path) {
    assertPath(path);
    return path.length > 0 && 47 === path.charCodeAt(0);
  };
  const join = function(...paths) {
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
  const relative = function(from, to) {
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
  const dirname = function(path) {
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
  const basename = function(path, ext) {
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
  const extname = function(path) {
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
  const format = function(pathObject) {
    if (null === pathObject || "object" !== typeof pathObject) {
      throw new TypeError('The "pathObject" argument must be of type Object. Received type ' + typeof pathObject);
    }
    return _format("/", pathObject);
  };
  const parse = function(path) {
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
    const isAbsolute2 = 47 === code;
    if (isAbsolute2) {
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
      -1 !== end && (ret.base = ret.name = 0 === startPart && isAbsolute2 ? path.slice(1, end) : path.slice(startPart, end));
    } else {
      if (0 === startPart && isAbsolute2) {
        ret.name = path.slice(1, startDot);
        ret.base = path.slice(1, end);
      } else {
        ret.name = path.slice(startPart, startDot);
        ret.base = path.slice(startPart, end);
      }
      ret.ext = path.slice(startDot, end);
    }
    startPart > 0 ? ret.dir = path.slice(0, startPart - 1) : isAbsolute2 && (ret.dir = "/");
    return ret;
  };
  const sep = "/";
  const delimiter = ":";
  return {
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
    posix: {
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
    }
  };
}

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
  qwik: "1.1.4"
};

async function getSystem() {
  const sysEnv = getEnv();
  const sys = {
    dynamicImport: path => {
      throw new Error(`Qwik Optimizer sys.dynamicImport() not implemented, trying to import: "${path}"`);
    },
    strictDynamicImport: path => {
      throw new Error(`Qwik Optimizer sys.strictDynamicImport() not implemented, trying to import: "${path}"`);
    },
    path: null,
    cwd: () => "/",
    os: "unknown",
    env: sysEnv
  };
  sys.path = createPath(sys);
  sys.strictDynamicImport = sys.dynamicImport = path => import(path);
  false;
  if ("node" === sysEnv) {
    sys.path = await sys.dynamicImport("node:path");
    sys.cwd = () => process.cwd();
    sys.os = process.platform;
  }
  return sys;
}

var getPlatformInputFiles = async sys => {
  if ("function" === typeof sys.getInputFiles) {
    return sys.getInputFiles;
  }
  if ("node" === sys.env) {
    const fs = await sys.dynamicImport("node:fs");
    return async rootDir => {
      const getChildFilePaths = async dir => {
        const stats = await fs.promises.stat(dir);
        const flatted = [];
        if (stats.isDirectory()) {
          const dirItems = await fs.promises.readdir(dir);
          const files = await Promise.all(dirItems.map((async subdir => {
            const resolvedPath = sys.path.resolve(dir, subdir);
            const stats2 = await fs.promises.stat(resolvedPath);
            return stats2.isDirectory() ? getChildFilePaths(resolvedPath) : [ resolvedPath ];
          })));
          for (const file of files) {
            flatted.push(...file);
          }
        } else {
          flatted.push(dir);
        }
        return flatted.filter((a => extensions[sys.path.extname(a)]));
      };
      const filePaths = await getChildFilePaths(rootDir);
      const inputs = (await Promise.all(filePaths.map((async filePath => {
        const input = {
          code: await fs.promises.readFile(filePath, "utf8"),
          path: filePath
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
  const sysEnv = getEnv();
  if ("node" === sysEnv) {
    const platform = QWIK_BINDING_MAP[process.platform];
    if (platform) {
      const triples = platform[process.arch];
      if (triples) {
        for (const triple of triples) {
          try {
            {
              const module = await sys.dynamicImport("node:module");
              const mod2 = module.default.createRequire(import.meta.url)(`./bindings/${triple.platformArchABI}`);
              return mod2;
            }
          } catch (e) {
            console.warn(e);
          }
        }
      }
    }
  }
  false;
  if ("node" === sysEnv) {
    const url = await sys.dynamicImport("node:url");
    const __dirname2 = sys.path.dirname(url.fileURLToPath(import.meta.url));
    const wasmPath = sys.path.join(__dirname2, "bindings", "qwik_wasm_bg.wasm");
    const mod = await sys.dynamicImport("./bindings/qwik.wasm.mjs");
    const fs = await sys.dynamicImport("node:fs");
    return new Promise(((resolve, reject) => {
      fs.readFile(wasmPath, ((err, buf) => {
        null != err ? reject(err) : resolve(buf);
      }));
    })).then((buf => WebAssembly.compile(buf))).then((wasm => mod.default(wasm))).then((() => mod));
  }
  {
    const module = await sys.dynamicImport("./bindings/qwik.wasm.mjs");
    await module.default();
    return module;
  }
}

var getEnv = () => {
  if ("undefined" !== typeof Deno) {
    return "deno";
  }
  if ("undefined" !== typeof process && "undefined" !== typeof global && process.versions && process.versions.node) {
    return "node";
  }
  if ("undefined" !== typeof self && "undefined" !== typeof location && "undefined" !== typeof navigator && "function" === typeof fetch && "function" === typeof WorkerGlobalScope && "function" === typeof self.importScripts) {
    return "webworker";
  }
  if ("undefined" !== typeof window && "undefined" !== typeof document && "undefined" !== typeof location && "undefined" !== typeof navigator && "function" === typeof Window && "function" === typeof fetch) {
    return "browsermain";
  }
  return "unknown";
};

var extensions = {
  ".js": true,
  ".ts": true,
  ".tsx": true,
  ".jsx": true,
  ".mjs": true
};

var createOptimizer = async (optimizerOptions = {}) => {
  const sys = optimizerOptions?.sys || await getSystem();
  const binding = optimizerOptions?.binding || await loadPlatformBinding(sys);
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
    const input = await getInputFiles(fsOpts.srcDir);
    for (const root of fsOpts.vendorRoots) {
      const rootFiles = await getInputFiles(root);
      input.push(...rootFiles);
    }
    input.forEach((file => {
      file.path = sys.path.relative(fsOpts.srcDir, file.path);
    }));
    const modulesOpts = {
      srcDir: fsOpts.srcDir,
      rootDir: fsOpts.rootDir,
      entryStrategy: fsOpts.entryStrategy,
      minify: fsOpts.minify,
      sourceMaps: fsOpts.sourceMaps,
      transpileTs: fsOpts.transpileTs,
      transpileJsx: fsOpts.transpileJsx,
      explicitExtensions: fsOpts.explicitExtensions,
      preserveFilenames: fsOpts.preserveFilenames,
      mode: fsOpts.mode,
      scope: fsOpts.scope,
      input: input,
      regCtxName: fsOpts.regCtxName,
      stripEventHandlers: fsOpts.stripEventHandlers,
      stripCtxName: fsOpts.stripCtxName,
      stripExports: fsOpts.stripExports,
      isServer: fsOpts.isServer
    };
    return binding.transform_modules(convertOptions(modulesOpts));
  }
  throw new Error("Not implemented");
};

var convertOptions = opts => {
  const output = {
    minify: "simplify",
    sourceMaps: false,
    transpileTs: false,
    transpileJsx: false,
    preserveFilenames: false,
    explicitExtensions: false,
    mode: "lib",
    manualChunks: void 0,
    scope: void 0,
    regCtxName: void 0,
    stripEventHandlers: false,
    rootDir: void 0,
    stripExports: void 0,
    stripCtxName: void 0,
    isServer: void 0
  };
  Object.entries(opts).forEach((([key, value]) => {
    null != value && (output[key] = value);
  }));
  output.entryStrategy = opts.entryStrategy?.type ?? "smart";
  output.manualChunks = opts.entryStrategy?.manual ?? void 0;
  return output;
};

function prioritizeSymbolNames(manifest) {
  const symbols = manifest.symbols;
  return Object.keys(symbols).sort(((symbolNameA, symbolNameB) => {
    const a = symbols[symbolNameA];
    const b = symbols[symbolNameB];
    if ("event" === a.ctxKind && "event" !== b.ctxKind) {
      return -1;
    }
    if ("event" !== a.ctxKind && "event" === b.ctxKind) {
      return 1;
    }
    if ("event" === a.ctxKind && "event" === b.ctxKind) {
      const aIndex = EVENT_PRIORITY.indexOf(a.ctxName.toLowerCase());
      const bIndex = EVENT_PRIORITY.indexOf(b.ctxName.toLowerCase());
      if (aIndex > -1 && bIndex > -1) {
        if (aIndex < bIndex) {
          return -1;
        }
        if (aIndex > bIndex) {
          return 1;
        }
      } else {
        if (aIndex > -1) {
          return -1;
        }
        if (bIndex > -1) {
          return 1;
        }
      }
    } else if ("function" === a.ctxKind && "function" === b.ctxKind) {
      const aIndex = FUNCTION_PRIORITY.indexOf(a.ctxName.toLowerCase());
      const bIndex = FUNCTION_PRIORITY.indexOf(b.ctxName.toLowerCase());
      if (aIndex > -1 && bIndex > -1) {
        if (aIndex < bIndex) {
          return -1;
        }
        if (aIndex > bIndex) {
          return 1;
        }
      } else {
        if (aIndex > -1) {
          return -1;
        }
        if (bIndex > -1) {
          return 1;
        }
      }
    }
    if (!a.parent && b.parent) {
      return -1;
    }
    if (a.parent && !b.parent) {
      return 1;
    }
    if (a.hash < b.hash) {
      return -1;
    }
    if (a.hash > b.hash) {
      return 1;
    }
    return 0;
  }));
}

var EVENT_PRIORITY = (() => [ "click", "dblclick", "contextmenu", "auxclick", "pointerdown", "pointerup", "pointermove", "pointerover", "pointerenter", "pointerleave", "pointerout", "pointercancel", "gotpointercapture", "lostpointercapture", "touchstart", "touchend", "touchmove", "touchcancel", "mousedown", "mouseup", "mousemove", "mouseenter", "mouseleave", "mouseover", "mouseout", "wheel", "gesturestart", "gesturechange", "gestureend", "keydown", "keyup", "keypress", "input", "change", "search", "invalid", "beforeinput", "select", "focusin", "focusout", "focus", "blur", "submit", "reset", "scroll" ].map((n => `on${n.toLowerCase()}$`)))();

var FUNCTION_PRIORITY = (() => [ "useTask$", "useVisibleTask$", "component$", "useStyles$", "useStylesScoped$" ].map((n => n.toLowerCase())))();

function sortBundleNames(manifest) {
  return Object.keys(manifest.bundles).sort(sortAlphabetical);
}

function updateSortAndPriorities(manifest) {
  const prioritizedSymbolNames = prioritizeSymbolNames(manifest);
  const prioritizedSymbols = {};
  const prioritizedMapping = {};
  for (const symbolName of prioritizedSymbolNames) {
    prioritizedSymbols[symbolName] = manifest.symbols[symbolName];
    prioritizedMapping[symbolName] = manifest.mapping[symbolName];
  }
  const sortedBundleNames = sortBundleNames(manifest);
  const sortedBundles = {};
  for (const bundleName of sortedBundleNames) {
    sortedBundles[bundleName] = manifest.bundles[bundleName];
    const bundle = manifest.bundles[bundleName];
    Array.isArray(bundle.imports) && bundle.imports.sort(sortAlphabetical);
    Array.isArray(bundle.dynamicImports) && bundle.dynamicImports.sort(sortAlphabetical);
    const symbols = [];
    for (const symbolName of prioritizedSymbolNames) {
      bundleName === prioritizedMapping[symbolName] && symbols.push(symbolName);
    }
    if (symbols.length > 0) {
      symbols.sort(sortAlphabetical);
      bundle.symbols = symbols;
    }
  }
  manifest.symbols = prioritizedSymbols;
  manifest.mapping = prioritizedMapping;
  manifest.bundles = sortedBundles;
  return manifest;
}

function sortAlphabetical(a, b) {
  a = a.toLocaleLowerCase();
  b = b.toLocaleLowerCase();
  if (a < b) {
    return -1;
  }
  if (a > b) {
    return 1;
  }
  return 0;
}

function getValidManifest(manifest) {
  if (null != manifest && null != manifest.mapping && "object" === typeof manifest.mapping && null != manifest.symbols && "object" === typeof manifest.symbols && null != manifest.bundles && "object" === typeof manifest.bundles) {
    return manifest;
  }
  return;
}

function generateManifestFromBundles(path, hooks, injections, outputBundles, opts) {
  const manifest = {
    symbols: {},
    mapping: {},
    bundles: {},
    injections: injections,
    version: "1",
    options: {
      target: opts.target,
      buildMode: opts.buildMode,
      forceFullBuild: opts.forceFullBuild,
      entryStrategy: opts.entryStrategy
    }
  };
  for (const hook of hooks) {
    const buildFilePath = `${hook.canonicalFilename}.${hook.extension}`;
    const outputBundle = outputBundles.find((b => Object.keys(b.modules).find((f => f.endsWith(buildFilePath)))));
    if (outputBundle) {
      const symbolName = hook.name;
      const bundleFileName = path.basename(outputBundle.fileName);
      manifest.mapping[symbolName] = bundleFileName;
      manifest.symbols[symbolName] = {
        origin: hook.origin,
        displayName: hook.displayName,
        canonicalFilename: hook.canonicalFilename,
        hash: hook.hash,
        ctxKind: hook.ctxKind,
        ctxName: hook.ctxName,
        captures: hook.captures,
        parent: hook.parent
      };
      addBundleToManifest(path, manifest, outputBundle, bundleFileName);
    }
  }
  for (const outputBundle of outputBundles) {
    const bundleFileName = path.basename(outputBundle.fileName);
    addBundleToManifest(path, manifest, outputBundle, bundleFileName);
  }
  return updateSortAndPriorities(manifest);
}

function addBundleToManifest(path, manifest, outputBundle, bundleFileName) {
  if (!manifest.bundles[bundleFileName]) {
    const buildDirName = path.dirname(outputBundle.fileName);
    const bundle = {
      size: outputBundle.size
    };
    const bundleImports = outputBundle.imports.filter((i => path.dirname(i) === buildDirName)).map((i => path.relative(buildDirName, i)));
    bundleImports.length > 0 && (bundle.imports = bundleImports);
    const bundleDynamicImports = outputBundle.dynamicImports.filter((i => path.dirname(i) === buildDirName)).map((i => path.relative(buildDirName, i)));
    bundleDynamicImports.length > 0 && (bundle.dynamicImports = bundleDynamicImports);
    const modulePaths = Object.keys(outputBundle.modules).filter((m => !m.startsWith("\0")));
    modulePaths.length > 0 && (bundle.origins = modulePaths);
    manifest.bundles[bundleFileName] = bundle;
  }
}

async function createLinter(sys, rootDir, tsconfigFileNames) {
  const module = await sys.dynamicImport("eslint");
  const options = {
    cache: true,
    useEslintrc: false,
    overrideConfig: {
      root: true,
      env: {
        browser: true,
        es2021: true,
        node: true
      },
      extends: [ "plugin:qwik/recommended" ],
      parser: "@typescript-eslint/parser",
      parserOptions: {
        tsconfigRootDir: rootDir,
        project: tsconfigFileNames,
        ecmaVersion: 2021,
        sourceType: "module",
        ecmaFeatures: {
          jsx: true
        }
      }
    }
  };
  const eslint = new module.ESLint(options);
  return {
    async lint(ctx, code, id) {
      try {
        const filePath = parseRequest(id);
        if (await eslint.isPathIgnored(filePath)) {
          return null;
        }
        const report = await eslint.lintText(code, {
          filePath: filePath
        });
        report.forEach((file => {
          for (const message of file.messages) {
            const err = createRollupError(file.filePath, message);
            ctx.warn(err);
          }
        }));
      } catch (err) {
        console.warn(err);
      }
    }
  };
}

function parseRequest(id) {
  return id.split("?", 2)[0];
}

function createRollupError(id, reportMessage) {
  const err = Object.assign(new Error(reportMessage.message), {
    id: id,
    plugin: "vite-plugin-eslint",
    loc: {
      file: id,
      column: reportMessage.column,
      line: reportMessage.line
    },
    stack: ""
  });
  return err;
}

var REG_CTX_NAME = [ "server" ];

var SERVER_STRIP_EXPORTS = [ "onGet", "onPost", "onPut", "onRequest", "onDelete", "onHead", "onOptions", "onPatch", "onStaticGenerate" ];

var SERVER_STRIP_CTX_NAME = [ "useServer", "route", "server", "action$", "loader$", "zod$", "validator$", "globalAction$" ];

var CLIENT_STRIP_CTX_NAME = [ "useClient", "useBrowser", "useVisibleTask", "client", "browser", "event$" ];

function createPlugin(optimizerOptions = {}) {
  const id = `${Math.round(899 * Math.random()) + 100}`;
  const results = new Map;
  const transformedOutputs = new Map;
  const ssrResults = new Map;
  const ssrTransformedOutputs = new Map;
  let internalOptimizer = null;
  let linter;
  let diagnosticsCallback = () => {};
  const opts = {
    target: "client",
    buildMode: "development",
    debug: false,
    rootDir: null,
    tsconfigFileNames: [ "./tsconfig.json" ],
    input: null,
    outDir: null,
    resolveQwikBuild: true,
    forceFullBuild: false,
    entryStrategy: null,
    srcDir: null,
    srcInputs: null,
    manifestInput: null,
    manifestOutput: null,
    transformedModuleOutput: null,
    vendorRoots: [],
    scope: null,
    devTools: {
      clickToSource: [ "Alt" ]
    }
  };
  const init2 = async () => {
    internalOptimizer || (internalOptimizer = await createOptimizer(optimizerOptions));
  };
  const getOptimizer = () => {
    if (!internalOptimizer) {
      throw new Error("Qwik plugin has not been initialized");
    }
    return internalOptimizer;
  };
  const getSys = () => {
    const optimizer = getOptimizer();
    return optimizer.sys;
  };
  const getPath = () => {
    const optimizer = getOptimizer();
    return optimizer.sys.path;
  };
  const normalizeOptions = inputOpts => {
    const updatedOpts = Object.assign({}, inputOpts);
    const optimizer = getOptimizer();
    const path = optimizer.sys.path;
    opts.debug = !!updatedOpts.debug;
    updatedOpts.target;
    "ssr" === updatedOpts.target || "client" === updatedOpts.target || "lib" === updatedOpts.target || "test" === updatedOpts.target ? opts.target = updatedOpts.target : opts.target = "client";
    "lib" === opts.target ? opts.buildMode = "development" : "production" === updatedOpts.buildMode || "development" === updatedOpts.buildMode ? opts.buildMode = updatedOpts.buildMode : opts.buildMode = "development";
    updatedOpts.entryStrategy && "object" === typeof updatedOpts.entryStrategy && (opts.entryStrategy = {
      ...updatedOpts.entryStrategy
    });
    opts.entryStrategy || ("ssr" === opts.target || "test" === opts.target ? opts.entryStrategy = {
      type: "hoist"
    } : "lib" === opts.target ? opts.entryStrategy = {
      type: "inline"
    } : "production" === opts.buildMode ? opts.entryStrategy = {
      type: "smart"
    } : opts.entryStrategy = {
      type: "hook"
    });
    "string" === typeof updatedOpts.rootDir && (opts.rootDir = updatedOpts.rootDir);
    "string" !== typeof opts.rootDir && (opts.rootDir = optimizer.sys.cwd());
    opts.rootDir = normalizePath(path.resolve(optimizer.sys.cwd(), opts.rootDir));
    let srcDir = normalizePath(path.resolve(opts.rootDir, SRC_DIR_DEFAULT));
    if ("string" === typeof updatedOpts.srcDir) {
      opts.srcDir = normalizePath(path.resolve(opts.rootDir, updatedOpts.srcDir));
      srcDir = opts.srcDir;
      opts.srcInputs = null;
    } else if (Array.isArray(updatedOpts.srcInputs)) {
      opts.srcInputs = [ ...updatedOpts.srcInputs ];
      opts.srcDir = null;
    } else {
      opts.srcDir = srcDir;
    }
    "boolean" === typeof updatedOpts.forceFullBuild ? opts.forceFullBuild = updatedOpts.forceFullBuild : opts.forceFullBuild = "hook" !== opts.entryStrategy.type && "inline" !== opts.entryStrategy.type && "hoist" !== opts.entryStrategy.type || !!updatedOpts.srcInputs;
    if (false === opts.forceFullBuild && "hook" !== opts.entryStrategy.type && "inline" !== opts.entryStrategy.type && "hoist" !== opts.entryStrategy.type) {
      console.error(`forceFullBuild cannot be false with entryStrategy ${opts.entryStrategy.type}`);
      opts.forceFullBuild = true;
    }
    if (false === opts.forceFullBuild && !!updatedOpts.srcInputs) {
      console.error('forceFullBuild reassigned to "true" since "srcInputs" have been provided');
      opts.forceFullBuild = true;
    }
    Array.isArray(opts.srcInputs) ? opts.srcInputs.forEach((i => {
      i.path = normalizePath(path.resolve(opts.rootDir, i.path));
    })) : "string" === typeof opts.srcDir && (opts.srcDir = normalizePath(path.resolve(opts.rootDir, normalizePath(opts.srcDir))));
    Array.isArray(updatedOpts.input) ? opts.input = [ ...updatedOpts.input ] : "string" === typeof updatedOpts.input ? opts.input = [ updatedOpts.input ] : "ssr" === opts.target ? opts.input = [ path.resolve(srcDir, "entry.ssr.tsx") ] : "client" === opts.target ? opts.input = [ path.resolve(srcDir, "root.tsx") ] : "lib" === opts.target ? opts.input = [ path.resolve(srcDir, "index.ts") ] : opts.input = [];
    opts.input = opts.input.reduce(((inputs, i) => {
      let input = i;
      i.startsWith("@") || i.startsWith("~") || (input = normalizePath(path.resolve(opts.rootDir, i)));
      inputs.includes(input) || inputs.push(input);
      return inputs;
    }), []);
    "string" === typeof updatedOpts.outDir ? opts.outDir = normalizePath(path.resolve(opts.rootDir, normalizePath(updatedOpts.outDir))) : "ssr" === opts.target ? opts.outDir = normalizePath(path.resolve(opts.rootDir, SSR_OUT_DIR)) : "lib" === opts.target ? opts.outDir = normalizePath(path.resolve(opts.rootDir, LIB_OUT_DIR)) : opts.outDir = normalizePath(path.resolve(opts.rootDir, CLIENT_OUT_DIR));
    "function" === typeof updatedOpts.manifestOutput && (opts.manifestOutput = updatedOpts.manifestOutput);
    const clientManifest = getValidManifest(updatedOpts.manifestInput);
    clientManifest && (opts.manifestInput = clientManifest);
    "function" === typeof updatedOpts.transformedModuleOutput && (opts.transformedModuleOutput = updatedOpts.transformedModuleOutput);
    opts.vendorRoots = updatedOpts.vendorRoots ? updatedOpts.vendorRoots : [];
    opts.scope = updatedOpts.scope ?? null;
    "boolean" === typeof updatedOpts.resolveQwikBuild && (opts.resolveQwikBuild = updatedOpts.resolveQwikBuild);
    "object" === typeof updatedOpts.devTools && "clickToSource" in updatedOpts.devTools && (opts.devTools.clickToSource = updatedOpts.devTools.clickToSource);
    return {
      ...opts
    };
  };
  let hasValidatedSource = false;
  const validateSource = async resolver => {
    if (!hasValidatedSource) {
      hasValidatedSource = true;
      const sys = getSys();
      if ("node" === sys.env) {
        const fs = await sys.dynamicImport("node:fs");
        if (!fs.existsSync(opts.rootDir)) {
          throw new Error(`Qwik rootDir "${opts.rootDir}" not found.`);
        }
        if ("string" === typeof opts.srcDir && !fs.existsSync(opts.srcDir)) {
          throw new Error(`Qwik srcDir "${opts.srcDir}" not found.`);
        }
        for (const alias in opts.input) {
          const input = opts.input[alias];
          const resolved = await resolver(input);
          if (!resolved) {
            throw new Error(`Qwik input "${input}" not found.`);
          }
        }
      }
    }
  };
  const buildStart = async ctx => {
    log("buildStart()", opts.buildMode, opts.forceFullBuild ? "full build" : "isolated build", opts.scope);
    const optimizer = getOptimizer();
    if ("node" === optimizer.sys.env && "ssr" !== opts.target) {
      try {
        linter = await createLinter(optimizer.sys, opts.rootDir, opts.tsconfigFileNames);
      } catch (err) {}
    }
    if (opts.forceFullBuild) {
      const path = getPath();
      let srcDir = "/";
      if ("string" === typeof opts.srcDir) {
        srcDir = normalizePath(opts.srcDir);
        log("buildStart() srcDir", opts.srcDir);
      } else if (Array.isArray(opts.srcInputs)) {
        optimizer.sys.getInputFiles = async rootDir => opts.srcInputs.map((i => {
          const relInput = {
            path: normalizePath(path.relative(rootDir, i.path)),
            code: i.code
          };
          return relInput;
        }));
        log(`buildStart() opts.srcInputs (${opts.srcInputs.length})`);
      }
      const vendorRoots = opts.vendorRoots;
      vendorRoots.length > 0 && log("vendorRoots", vendorRoots);
      log("transformedOutput.clear()");
      transformedOutputs.clear();
      const mode = "lib" === opts.target ? "lib" : "development" === opts.buildMode ? "dev" : "prod";
      const transformOpts = {
        srcDir: srcDir,
        rootDir: opts.rootDir,
        vendorRoots: vendorRoots,
        entryStrategy: opts.entryStrategy,
        minify: "simplify",
        transpileTs: true,
        transpileJsx: true,
        explicitExtensions: true,
        preserveFilenames: true,
        mode: mode,
        scope: opts.scope ? opts.scope : void 0
      };
      if ("client" === opts.target) {
        transformOpts.stripCtxName = SERVER_STRIP_CTX_NAME;
        transformOpts.stripExports = SERVER_STRIP_EXPORTS;
        transformOpts.isServer = false;
      } else if ("ssr" === opts.target) {
        transformOpts.stripCtxName = CLIENT_STRIP_CTX_NAME;
        transformOpts.stripEventHandlers = true;
        transformOpts.isServer = true;
        transformOpts.regCtxName = REG_CTX_NAME;
      }
      const result = await optimizer.transformFs(transformOpts);
      for (const output of result.modules) {
        const key = normalizePath(path.join(srcDir, output.path));
        log("buildStart() add transformedOutput", key, output.hook?.displayName);
        transformedOutputs.set(key, [ output, key ]);
        ssrTransformedOutputs.set(key, [ output, key ]);
        output.isEntry && ctx.emitFile({
          id: key,
          type: "chunk"
        });
      }
      diagnosticsCallback(result.diagnostics, optimizer, srcDir);
      results.set("@buildStart", result);
      ssrResults.set("@buildStart", result);
    }
  };
  const resolveId = async (_ctx, id2, importer, resolveIdOpts) => {
    log("resolveId()", "Start", id2, importer);
    if (id2.startsWith("\0")) {
      return;
    }
    if (id2.startsWith("/@fs")) {
      return;
    }
    if ("lib" === opts.target && id2.startsWith(QWIK_CORE_ID)) {
      return {
        external: true,
        id: id2
      };
    }
    if (opts.resolveQwikBuild && id2 === QWIK_BUILD_ID) {
      log("resolveId()", "Resolved", QWIK_BUILD_ID);
      return {
        id: normalizePath(getPath().resolve(opts.rootDir, QWIK_BUILD_ID)),
        moduleSideEffects: false
      };
    }
    if (id2.endsWith(QWIK_CLIENT_MANIFEST_ID)) {
      log("resolveId()", "Resolved", QWIK_CLIENT_MANIFEST_ID);
      if ("lib" === opts.target) {
        return {
          id: id2,
          external: true,
          moduleSideEffects: false
        };
      }
      return {
        id: normalizePath(getPath().resolve(opts.input[0], QWIK_CLIENT_MANIFEST_ID)),
        moduleSideEffects: false
      };
    }
    const path = getPath();
    if (importer) {
      if (!id2.startsWith(".") && !path.isAbsolute(id2)) {
        return;
      }
      const parsedId = parseId(id2);
      let importeePathId = normalizePath(parsedId.pathId);
      const ext = path.extname(importeePathId);
      if (RESOLVE_EXTS[ext]) {
        importer = normalizePath(importer);
        log(`resolveId("${importeePathId}", "${importer}")`);
        const parsedImporterId = parseId(importer);
        const dir = path.dirname(parsedImporterId.pathId);
        importeePathId = parsedImporterId.pathId.endsWith(".html") && !importeePathId.endsWith(".html") ? normalizePath(path.join(dir, importeePathId)) : normalizePath(path.resolve(dir, importeePathId));
        const transformedOutput = resolveIdOpts?.ssr ? ssrTransformedOutputs.get(importeePathId) : transformedOutputs.get(importeePathId);
        if (transformedOutput) {
          log(`resolveId() Resolved ${importeePathId} from transformedOutputs`);
          return {
            id: importeePathId + parsedId.query
          };
        }
      }
    } else if (path.isAbsolute(id2)) {
      const parsedId = parseId(id2);
      const importeePathId = normalizePath(parsedId.pathId);
      const ext = path.extname(importeePathId);
      if (RESOLVE_EXTS[ext]) {
        log(`resolveId("${importeePathId}", "${importer}")`);
        const transformedOutput = resolveIdOpts?.ssr ? ssrTransformedOutputs.get(importeePathId) : transformedOutputs.get(importeePathId);
        if (transformedOutput) {
          log(`resolveId() Resolved ${importeePathId} from transformedOutputs`);
          return {
            id: importeePathId + parsedId.query
          };
        }
      }
    }
    return null;
  };
  const load = async (_ctx, id2, loadOpts = {}) => {
    if (id2.startsWith("\0") || id2.startsWith("/@fs/")) {
      return;
    }
    if (opts.resolveQwikBuild && id2.endsWith(QWIK_BUILD_ID)) {
      log("load()", QWIK_BUILD_ID, opts.buildMode);
      return {
        moduleSideEffects: false,
        code: getQwikBuildModule(loadOpts, opts.target)
      };
    }
    if (id2.endsWith(QWIK_CLIENT_MANIFEST_ID)) {
      log("load()", QWIK_CLIENT_MANIFEST_ID, opts.buildMode);
      return {
        moduleSideEffects: false,
        code: await getQwikServerManifestModule(loadOpts)
      };
    }
    const parsedId = parseId(id2);
    const path = getPath();
    id2 = normalizePath(parsedId.pathId);
    const transformedModule = loadOpts?.ssr ? ssrTransformedOutputs.get(id2) : transformedOutputs.get(id2);
    if (transformedModule) {
      log("load()", "Found", id2);
      let code = transformedModule[0].code;
      "ssr" === opts.target && (code = code.replace(/@qwik-client-manifest/g, normalizePath(path.resolve(opts.input[0], QWIK_CLIENT_MANIFEST_ID))));
      return {
        code: code,
        map: transformedModule[0].map,
        meta: {
          hook: transformedModule[0].hook
        }
      };
    }
    return null;
  };
  const transform = async function(ctx, code, id2, ssrOpts = {}) {
    if (opts.forceFullBuild) {
      return null;
    }
    const optimizer = getOptimizer();
    const path = getPath();
    const {pathId: pathId} = parseId(id2);
    const {ext: ext, dir: dir, base: base} = path.parse(pathId);
    if (TRANSFORM_EXTS[ext] || TRANSFORM_REGEX.test(pathId) || insideRoots(ext, dir, opts.srcDir, opts.vendorRoots)) {
      const strip = "client" === opts.target || "ssr" === opts.target;
      const normalizedID = normalizePath(pathId);
      log("transform()", "Transforming", pathId);
      let filePath = base;
      opts.srcDir && (filePath = path.relative(opts.srcDir, pathId));
      filePath = normalizePath(filePath);
      const srcDir = opts.srcDir ? opts.srcDir : normalizePath(dir);
      const mode = "development" === opts.buildMode ? "dev" : "prod";
      const transformOpts = {
        input: [ {
          code: code,
          path: filePath
        } ],
        entryStrategy: opts.entryStrategy,
        minify: "simplify",
        sourceMaps: "development" === opts.buildMode,
        transpileTs: true,
        transpileJsx: true,
        explicitExtensions: true,
        preserveFilenames: true,
        srcDir: srcDir,
        rootDir: opts.rootDir,
        mode: mode,
        scope: opts.scope ? opts.scope : void 0
      };
      const isSSR = !!ssrOpts.ssr;
      if (strip) {
        if (isSSR) {
          transformOpts.stripCtxName = CLIENT_STRIP_CTX_NAME;
          transformOpts.stripEventHandlers = true;
          transformOpts.entryStrategy = {
            type: "hoist"
          };
          transformOpts.regCtxName = REG_CTX_NAME;
          transformOpts.isServer = true;
        } else {
          transformOpts.stripCtxName = SERVER_STRIP_CTX_NAME;
          transformOpts.stripExports = SERVER_STRIP_EXPORTS;
          transformOpts.isServer = false;
        }
      }
      const newOutput = optimizer.transformModulesSync(transformOpts);
      diagnosticsCallback(newOutput.diagnostics, optimizer, srcDir);
      if (isSSR) {
        0 === newOutput.diagnostics.length && linter && await linter.lint(ctx, code, id2);
        ssrResults.set(normalizedID, newOutput);
      } else {
        results.set(normalizedID, newOutput);
      }
      const deps = new Set;
      for (const mod of newOutput.modules) {
        if (mod.isEntry) {
          const key = normalizePath(path.join(srcDir, mod.path));
          isSSR ? ssrTransformedOutputs.set(key, [ mod, id2 ]) : transformedOutputs.set(key, [ mod, id2 ]);
          deps.add(key);
        }
      }
      if (isSSR && strip) {
        const clientTransformOpts = {
          input: [ {
            code: code,
            path: filePath
          } ],
          entryStrategy: opts.entryStrategy,
          minify: "simplify",
          sourceMaps: "development" === opts.buildMode,
          transpileTs: true,
          transpileJsx: true,
          explicitExtensions: true,
          preserveFilenames: true,
          srcDir: srcDir,
          rootDir: opts.rootDir,
          mode: mode,
          scope: opts.scope ? opts.scope : void 0
        };
        clientTransformOpts.stripCtxName = SERVER_STRIP_CTX_NAME;
        clientTransformOpts.stripExports = SERVER_STRIP_EXPORTS;
        clientTransformOpts.isServer = false;
        const clientNewOutput = optimizer.transformModulesSync(clientTransformOpts);
        diagnosticsCallback(clientNewOutput.diagnostics, optimizer, srcDir);
        results.set(normalizedID, clientNewOutput);
        for (const mod of clientNewOutput.modules) {
          if (mod.isEntry) {
            const key = normalizePath(path.join(srcDir, mod.path));
            ctx.addWatchFile(key);
            transformedOutputs.set(key, [ mod, id2 ]);
            deps.add(key);
          }
        }
      }
      const module = newOutput.modules.find((m => !m.isEntry));
      return {
        code: module.code,
        map: module.map,
        meta: {
          hook: module.hook,
          qwikdeps: Array.from(deps)
        }
      };
    }
    log("transform()", "No Transforming", id2);
    return null;
  };
  const createOutputAnalyzer = () => {
    const outputBundles = [];
    const injections = [];
    const addBundle = b => outputBundles.push(b);
    const addInjection = b => injections.push(b);
    const generateManifest = async () => {
      const optimizer = getOptimizer();
      const path = optimizer.sys.path;
      const hooks = Array.from(results.values()).flatMap((r => r.modules)).map((mod => mod.hook)).filter((h => !!h));
      const manifest = generateManifestFromBundles(path, hooks, injections, outputBundles, opts);
      for (const symbol of Object.values(manifest.symbols)) {
        symbol.origin && (symbol.origin = normalizePath(symbol.origin));
      }
      for (const bundle of Object.values(manifest.bundles)) {
        bundle.origins && (bundle.origins = bundle.origins.map((abs => {
          const relPath = path.relative(opts.rootDir, abs);
          return normalizePath(relPath);
        })).sort());
      }
      return manifest;
    };
    return {
      addBundle: addBundle,
      addInjection: addInjection,
      generateManifest: generateManifest
    };
  };
  const getOptions = () => opts;
  const getTransformedOutputs = () => Array.from(transformedOutputs.values()).map((t => t[0]));
  const log = (...str) => {
    opts.debug && console.debug(`[QWIK PLUGIN: ${id}]`, ...str);
  };
  const onDiagnostics = cb => {
    diagnosticsCallback = cb;
  };
  const normalizePath = id2 => {
    if ("string" === typeof id2) {
      const sys = getSys();
      if ("win32" === sys.os) {
        const isExtendedLengthPath = /^\\\\\?\\/.test(id2);
        if (!isExtendedLengthPath) {
          const hasNonAscii = /[^\u0000-\u0080]+/.test(id2);
          hasNonAscii || (id2 = id2.replace(/\\/g, "/"));
        }
        return sys.path.posix.normalize(id2);
      }
      return sys.path.normalize(id2);
    }
    return id2;
  };
  function getQwikBuildModule(loadOpts, target) {
    const isServer = !!loadOpts.ssr || "test" === target;
    const isDev = "development" === opts.buildMode;
    return `// @builder.io/qwik/build\nexport const isServer = ${JSON.stringify(isServer)};\nexport const isBrowser = ${JSON.stringify(!isServer)};\nexport const isDev = ${JSON.stringify(isDev)};\n`;
  }
  async function getQwikServerManifestModule(loadOpts) {
    const isServer = "ssr" === opts.target || !!loadOpts.ssr;
    const manifest = isServer ? opts.manifestInput : null;
    return `// @qwik-client-manifest\nexport const manifest = ${JSON.stringify(manifest)};\n`;
  }
  return {
    buildStart: buildStart,
    createOutputAnalyzer: createOutputAnalyzer,
    getQwikBuildModule: getQwikBuildModule,
    getOptimizer: getOptimizer,
    getOptions: getOptions,
    getPath: getPath,
    getSys: getSys,
    getTransformedOutputs: getTransformedOutputs,
    init: init2,
    load: load,
    log: log,
    normalizeOptions: normalizeOptions,
    normalizePath: normalizePath,
    onDiagnostics: onDiagnostics,
    resolveId: resolveId,
    transform: transform,
    validateSource: validateSource
  };
}

var insideRoots = (ext, dir, srcDir, vendorRoots) => {
  if (".js" !== ext) {
    return false;
  }
  if (null != srcDir && dir.startsWith(srcDir)) {
    return true;
  }
  for (const root of vendorRoots) {
    if (dir.startsWith(root)) {
      return true;
    }
  }
  return false;
};

function parseId(originalId) {
  const [pathId, query] = originalId.split("?");
  const queryStr = query || "";
  return {
    originalId: originalId,
    pathId: pathId,
    query: queryStr ? `?${query}` : "",
    params: new URLSearchParams(queryStr)
  };
}

var TRANSFORM_EXTS = {
  ".jsx": true,
  ".ts": true,
  ".tsx": true
};

var RESOLVE_EXTS = {
  ".tsx": true,
  ".ts": true,
  ".jsx": true,
  ".js": true,
  ".mjs": true,
  ".cjs": true
};

var TRANSFORM_REGEX = /\.qwik\.[mc]?js$/;

var QWIK_CORE_ID = "@builder.io/qwik";

var QWIK_BUILD_ID = "@builder.io/qwik/build";

var QWIK_JSX_RUNTIME_ID = "@builder.io/qwik/jsx-runtime";

var QWIK_JSX_DEV_RUNTIME_ID = "@builder.io/qwik/jsx-dev-runtime";

var QWIK_CORE_SERVER = "@builder.io/qwik/server";

var QWIK_CLIENT_MANIFEST_ID = "@qwik-client-manifest";

var SRC_DIR_DEFAULT = "src";

var CLIENT_OUT_DIR = "dist";

var SSR_OUT_DIR = "server";

var LIB_OUT_DIR = "lib";

var Q_MANIFEST_FILENAME = "q-manifest.json";

function qwikRollup(qwikRollupOpts = {}) {
  const qwikPlugin = createPlugin(qwikRollupOpts.optimizerOptions);
  const rollupPlugin = {
    name: "rollup-plugin-qwik",
    api: {
      getOptimizer: () => qwikPlugin.getOptimizer(),
      getOptions: () => qwikPlugin.getOptions()
    },
    async options(inputOpts) {
      await qwikPlugin.init();
      inputOpts.onwarn = (warning, warn) => {
        if ("typescript" === warning.plugin && warning.message.includes("outputToFilesystem")) {
          return;
        }
        warn(warning);
      };
      const pluginOpts = {
        target: qwikRollupOpts.target,
        buildMode: qwikRollupOpts.buildMode,
        debug: qwikRollupOpts.debug,
        forceFullBuild: qwikRollupOpts.forceFullBuild ?? true,
        entryStrategy: qwikRollupOpts.entryStrategy,
        rootDir: qwikRollupOpts.rootDir,
        srcDir: qwikRollupOpts.srcDir,
        srcInputs: qwikRollupOpts.srcInputs,
        input: inputOpts.input,
        resolveQwikBuild: true,
        manifestOutput: qwikRollupOpts.manifestOutput,
        manifestInput: qwikRollupOpts.manifestInput,
        transformedModuleOutput: qwikRollupOpts.transformedModuleOutput
      };
      const opts = qwikPlugin.normalizeOptions(pluginOpts);
      inputOpts.input || (inputOpts.input = opts.input);
      return inputOpts;
    },
    outputOptions: rollupOutputOpts => normalizeRollupOutputOptions(qwikPlugin.getPath(), qwikPlugin.getOptions(), rollupOutputOpts),
    async buildStart() {
      qwikPlugin.onDiagnostics(((diagnostics, optimizer, srcDir) => {
        diagnostics.forEach((d => {
          const id = qwikPlugin.normalizePath(optimizer.sys.path.join(srcDir, d.file));
          "error" === d.category ? this.error(createRollupError2(id, d)) : this.warn(createRollupError2(id, d));
        }));
      }));
      await qwikPlugin.buildStart(this);
    },
    resolveId(id, importer) {
      if (id.startsWith("\0")) {
        return null;
      }
      return qwikPlugin.resolveId(this, id, importer);
    },
    load(id) {
      if (id.startsWith("\0")) {
        return null;
      }
      return qwikPlugin.load(this, id);
    },
    transform(code, id) {
      if (id.startsWith("\0")) {
        return null;
      }
      return qwikPlugin.transform(this, code, id);
    },
    async generateBundle(_, rollupBundle) {
      const opts = qwikPlugin.getOptions();
      if ("client" === opts.target) {
        const outputAnalyzer = qwikPlugin.createOutputAnalyzer();
        for (const fileName in rollupBundle) {
          const b = rollupBundle[fileName];
          "chunk" === b.type && outputAnalyzer.addBundle({
            fileName: fileName,
            modules: b.modules,
            imports: b.imports,
            dynamicImports: b.dynamicImports,
            size: b.code.length
          });
        }
        const optimizer = qwikPlugin.getOptimizer();
        const manifest = await outputAnalyzer.generateManifest();
        manifest.platform = {
          ...versions,
          rollup: this.meta?.rollupVersion || "",
          env: optimizer.sys.env,
          os: optimizer.sys.os
        };
        "node" === optimizer.sys.env && (manifest.platform.node = process.versions.node);
        "function" === typeof opts.manifestOutput && await opts.manifestOutput(manifest);
        "function" === typeof opts.transformedModuleOutput && await opts.transformedModuleOutput(qwikPlugin.getTransformedOutputs());
        this.emitFile({
          type: "asset",
          fileName: Q_MANIFEST_FILENAME,
          source: JSON.stringify(manifest, null, 2)
        });
      }
    }
  };
  return rollupPlugin;
}

function normalizeRollupOutputOptions(path, opts, rollupOutputOpts) {
  const outputOpts = {};
  rollupOutputOpts && !Array.isArray(rollupOutputOpts) && Object.assign(outputOpts, rollupOutputOpts);
  if ("ssr" === opts.target) {
    "production" === opts.buildMode && (outputOpts.assetFileNames || (outputOpts.assetFileNames = "build/q-[hash].[ext]"));
  } else if ("client" === opts.target) {
    if ("production" === opts.buildMode) {
      outputOpts.entryFileNames || (outputOpts.entryFileNames = "build/q-[hash].js");
      outputOpts.assetFileNames || (outputOpts.assetFileNames = "build/q-[hash].[ext]");
      outputOpts.chunkFileNames || (outputOpts.chunkFileNames = "build/q-[hash].js");
    } else {
      outputOpts.entryFileNames || (outputOpts.entryFileNames = "build/[name].js");
      outputOpts.assetFileNames || (outputOpts.assetFileNames = "build/[name].[ext]");
      outputOpts.chunkFileNames || (outputOpts.chunkFileNames = "build/[name].js");
    }
  }
  "client" === opts.target && (outputOpts.format = "es");
  outputOpts.dir || (outputOpts.dir = opts.outDir);
  "cjs" === outputOpts.format && "string" !== typeof outputOpts.exports && (outputOpts.exports = "auto");
  return outputOpts;
}

function createRollupError2(id, diagnostic) {
  const loc = diagnostic.highlights[0] ?? {};
  const err = Object.assign(new Error(diagnostic.message), {
    id: id,
    plugin: "qwik",
    loc: {
      column: loc.startCol,
      line: loc.startLine
    },
    stack: ""
  });
  return err;
}

var FORCE_COLOR;

var NODE_DISABLE_COLORS;

var NO_COLOR;

var TERM;

var isTTY = true;

if ("undefined" !== typeof process) {
  ({FORCE_COLOR: FORCE_COLOR, NODE_DISABLE_COLORS: NODE_DISABLE_COLORS, NO_COLOR: NO_COLOR, TERM: TERM} = process.env || {});
  isTTY = process.stdout && process.stdout.isTTY;
}

var $ = {
  enabled: !NODE_DISABLE_COLORS && null == NO_COLOR && "dumb" !== TERM && (null != FORCE_COLOR && "0" !== FORCE_COLOR || isTTY)
};

function init(x, y) {
  let rgx = new RegExp(`\\x1b\\[${y}m`, "g");
  let open = `[${x}m`, close = `[${y}m`;
  return function(txt) {
    if (!$.enabled || null == txt) {
      return txt;
    }
    return open + (!~("" + txt).indexOf(close) ? txt : txt.replace(rgx, close + open)) + close;
  };
}

var reset = init(0, 0);

var bold = init(1, 22);

var dim = init(2, 22);

var italic = init(3, 23);

var underline = init(4, 24);

var inverse = init(7, 27);

var hidden = init(8, 28);

var strikethrough = init(9, 29);

var black = init(30, 39);

var red = init(31, 39);

var green = init(32, 39);

var yellow = init(33, 39);

var blue = init(34, 39);

var magenta = init(35, 39);

var cyan = init(36, 39);

var white = init(37, 39);

var gray = init(90, 39);

var grey = init(90, 39);

var bgBlack = init(40, 49);

var bgRed = init(41, 49);

var bgGreen = init(42, 49);

var bgYellow = init(43, 49);

var bgBlue = init(44, 49);

var bgMagenta = init(45, 49);

var bgCyan = init(46, 49);

var bgWhite = init(47, 49);

var ERROR_HOST = '\n<script>\n/**\n * Usage:\n *\n *  <errored-host></errored-host>\n *\n */\nclass ErroredHost extends HTMLElement {\n  get _root() {\n    return this.shadowRoot || this;\n  }\n\n  constructor() {\n    super();\n    const self = this;\n\n    this.state = {};\n    if (!this.props) {\n      this.props = {};\n    }\n\n    this.componentProps = ["children", "error"];\n\n    // used to keep track of all nodes created by show/for\n    this.nodesToDestroy = [];\n    // batch updates\n    this.pendingUpdate = false;\n\n    this.attachShadow({ mode: "open" });\n  }\n\n  destroyAnyNodes() {\n    // destroy current view template refs before rendering again\n    this.nodesToDestroy.forEach((el) => el.remove());\n    this.nodesToDestroy = [];\n  }\n\n  connectedCallback() {\n    this.getAttributeNames().forEach((attr) => {\n      const jsVar = attr.replace(/-/g, "");\n      const regexp = new RegExp(jsVar, "i");\n      this.componentProps.forEach((prop) => {\n        if (regexp.test(prop)) {\n          const attrValue = this.getAttribute(attr);\n          if (this.props[prop] !== attrValue) {\n            this.props[prop] = attrValue;\n          }\n        }\n      });\n    });\n\n    this._root.innerHTML = `\n\n      <template data-el="show-errored-host">\n      <div class="error">\n        <template data-el="div-errored-host-2">\n          \x3c!-- String(props.error) --\x3e\n        </template>\n      </div>\n      </template>\n\n      <div class="arrow">👇 Uncaught error happened here 👇\n        <span class="dev-tools">DevTools: Cmd+Alt+I</span>\n      </div>\n      <div class="div">\n        <slot></slot>\n      </div>\n\n      <style>\n        .error {\n          border-radius: 5px 5px 0px 0;\n          background: black;\n          color: white;\n          font-family: monospace;\n          font-size: 12px;\n          margin: 0;\n          padding: 10px;\n        }\n        .arrow {\n          background: #f47e81;\n          color: black;\n          font-size: 14px;\n          padding: 10px;\n          text-align: center;\n          font-family: sans-serif;\n        }\n        .dev-tools {\n          background: red;\n          padding: 2px 5px;\n          border-radius: 3px;\n          font-weight: 800;\n        }\n        .div {\n          outline: 5px solid red;\n          border-radius: 10px;\n        }\n      </style>`;\n    this.pendingUpdate = true;\n\n    this.render();\n    this.onMount();\n    this.pendingUpdate = false;\n    this.update();\n  }\n\n  showContent(el) {\n    // https://developer.mozilla.org/en-US/docs/Web/API/HTMLTemplateElement/content\n    // grabs the content of a node that is between <template> tags\n    // iterates through child nodes to register all content including text elements\n    // attaches the content after the template\n\n    const elementFragment = el.content.cloneNode(true);\n    const children = Array.from(elementFragment.childNodes);\n    children.forEach((child) => {\n      if (el?.scope) {\n        child.scope = el.scope;\n      }\n      if (el?.context) {\n        child.context = el.context;\n      }\n      this.nodesToDestroy.push(child);\n    });\n    el.after(elementFragment);\n  }\n\n  onMount() {}\n\n  onUpdate() {}\n\n  update() {\n    if (this.pendingUpdate === true) {\n      return;\n    }\n    this.pendingUpdate = true;\n    this.render();\n    this.onUpdate();\n    this.pendingUpdate = false;\n  }\n\n  render() {\n    // re-rendering needs to ensure that all nodes generated by for/show are refreshed\n    this.destroyAnyNodes();\n    this.updateBindings();\n  }\n\n  updateBindings() {\n    this._root\n      .querySelectorAll("[data-el=\'show-errored-host\']")\n      .forEach((el) => {\n        const whenCondition = this.props.error;\n        if (whenCondition) {\n          this.showContent(el);\n        }\n      });\n\n    this._root\n      .querySelectorAll("[data-el=\'div-errored-host-2\']")\n      .forEach((el) => {\n        this.renderTextNode(el, String(this.props.error));\n      });\n  }\n\n  // Helper to render content\n  renderTextNode(el, text) {\n    const textNode = document.createTextNode(text);\n    if (el?.scope) {\n      textNode.scope = el.scope;\n    }\n    if (el?.context) {\n      textNode.context = el.context;\n    }\n    el.after(textNode);\n    this.nodesToDestroy.push(el.nextSibling);\n  }\n}\n\ncustomElements.define("errored-host", ErroredHost);\n<\/script>\n';

async function formatError(sys, e) {
  const err = e;
  let loc = err.loc;
  if (!err.frame && !err.plugin) {
    loc || (loc = findLocation(err));
    if (loc) {
      err.loc = loc;
      if (loc.file) {
        const fs = await sys.dynamicImport("node:fs");
        const {normalizePath: normalizePath} = await sys.dynamicImport("vite");
        err.id = normalizePath(err.loc.file);
        try {
          const code = fs.readFileSync(err.loc.file, "utf-8");
          err.frame = generateCodeFrame(code, err.loc);
        } catch {}
      }
    }
  }
  return e;
}

var findLocation = e => {
  const stack = e.stack;
  if ("string" === typeof stack) {
    const lines = stack.split("\n").filter((l => !l.includes("/node_modules/") && !l.includes("(node:")));
    for (let i = 1; i < lines.length; i++) {
      const line = lines[i].replace("file:///", "/");
      if (/^\s+at/.test(line)) {
        const start = line.indexOf("/");
        const end = line.lastIndexOf(")", start);
        if (start > 0) {
          const path = line.slice(start, end);
          const parts = path.split(":");
          const nu0 = safeParseInt(parts[parts.length - 1]);
          const nu1 = safeParseInt(parts[parts.length - 2]);
          if ("number" === typeof nu0 && "number" === typeof nu1) {
            parts.length -= 2;
            return {
              file: parts.join(":"),
              line: nu1,
              column: nu0
            };
          }
          if ("number" === typeof nu0) {
            parts.length -= 1;
            return {
              file: parts.join(":"),
              line: nu0,
              column: void 0
            };
          }
          return {
            file: parts.join(":"),
            line: void 0,
            column: void 0
          };
        }
      }
    }
  }
  return;
};

var safeParseInt = nu => {
  try {
    return parseInt(nu, 10);
  } catch {
    return;
  }
};

var splitRE = /\r?\n/;

var range = 2;

function posToNumber(source, pos) {
  if ("number" === typeof pos) {
    return pos;
  }
  if (null != pos.lo) {
    return pos.lo;
  }
  const lines = source.split(splitRE);
  const {line: line, column: column} = pos;
  let start = 0;
  for (let i = 0; i < line - 1 && i < lines.length; i++) {
    start += lines[i].length + 1;
  }
  return start + column;
}

function generateCodeFrame(source, start = 0, end) {
  start = posToNumber(source, start);
  end = end || start;
  const lines = source.split(splitRE);
  let count = 0;
  const res = [];
  for (let i = 0; i < lines.length; i++) {
    count += lines[i].length + 1;
    if (count >= start) {
      for (let j = i - range; j <= i + range || end > count; j++) {
        if (j < 0 || j >= lines.length) {
          continue;
        }
        const line = j + 1;
        res.push(`${line}${" ".repeat(Math.max(3 - String(line).length, 0))}|  ${lines[j]}`);
        const lineLength = lines[j].length;
        if (j === i) {
          const pad = Math.max(start - (count - lineLength) + 1, 0);
          const length = Math.max(1, end > count ? lineLength - pad : end - start);
          res.push("   |  " + " ".repeat(pad) + "^".repeat(length));
        } else if (j > i) {
          if (end > count) {
            const length = Math.max(Math.min(end - count, lineLength), 1);
            res.push("   |  " + "^".repeat(length));
          }
          count += lineLength + 1;
        }
      }
      break;
    }
  }
  return res.join("\n");
}

var VITE_ERROR_OVERLAY_STYLES = "\nvite-error-overlay {\n  --color-bright: rgba(255, 255, 255, 0.8);\n  --color-yellow: rgba(255,246,85,0.8);\n  --qwik-dark-blue: #006ce9;\n  --qwik-light-blue: #3ec2f7;\n  --qwik-light-purple: #ac7ff4;\n  --qwik-dark-purple: #713fc2;\n  --yellow: #fff;                   /* override vite yellow */\n  --purple: var(--color-bright);    /* override vite purple */\n  --red: var(--qwik-light-blue);    /* override vite red */\n\n  --vertical-box-spacing: 15px;\n  --box-padding: 20px;\n  --box-margin: 0 0 var(--vertical-box-spacing) 0;\n  --box-background: rgba(0, 0, 0, 0.5);\n  --box-border-radius: 8px;\n}\n\nvite-error-overlay::part(backdrop) {\n  background: rgb(2 11 17 / 60%);\n  backdrop-filter: blur(20px) brightness(0.4) saturate(3);\n}\n\nvite-error-overlay::part(window) {\n  background: transparent;\n  border: none;\n  box-shadow: none;\n  box-sizing: border-box;\n  margin: 50px auto;\n  max-width: 1200px;\n  padding: var(--box-padding);\n  width: 90%;\n}\n\nvite-error-overlay::part(message) {\n  display: flex;\n  flex-direction: column;\n  font-size: 1.6rem;\n  line-height: 1.7;\n  margin-bottom: 30px;\n}\n\nvite-error-overlay::part(plugin) {\n  font-size: 0.8rem;\n  font-weight: 100;\n}\n\nvite-error-overlay::part(file),\nvite-error-overlay::part(frame),\nvite-error-overlay::part(stack),\nvite-error-overlay::part(tip) {\n  background: var(--box-background);\n  border-left: 5px solid transparent;\n  border-radius: var(--box-border-radius);\n  margin: var(--box-margin);\n  min-height: 50px;\n  padding: var(--box-padding);\n  position: relative;\n}\n\nvite-error-overlay::part(file) {\n  border-left-color: rgb(25 182 246);\n  color: var(--color-bright);\n}\n\nvite-error-overlay::part(frame) {\n  border-left-color: var(--color-yellow);\n  color: var(--color-yellow);\n}\n\nvite-error-overlay::part(stack) {\n  border-left-color: #FF5722;\n}\n\n\nvite-error-overlay::part(tip) {\n  border-top: none;\n  border-left-color: rgb(172, 127, 244);\n}\n\nvite-error-overlay::part(file):before,\nvite-error-overlay::part(frame):before,\nvite-error-overlay::part(stack):before {\n  border-bottom: 1px solid #222;\n  color: var(--color-bright);\n  display: block;\n  margin-bottom: 15px;\n  padding-bottom: 5px;\n  padding-left: 30px; /* space for icon */\n  font-size: .8rem;\n}\n\nvite-error-overlay::part(file):before {\n  content: 'File';\n}\n\nvite-error-overlay::part(frame):before {\n  content: 'Frame';\n}\n\nvite-error-overlay::part(stack):before {\n  content: 'Stack Trace';\n}\n\nvite-error-overlay::part(file):after,\nvite-error-overlay::part(frame):after,\nvite-error-overlay::part(stack):after {\n  content: '';\n  display: block;\n  height: 20px;\n  position: absolute;\n  left: var(--box-padding);\n  top: var(--box-padding);\n  width: 20px;\n}\n\nvite-error-overlay::part(file):after {\n  background-image: url(\"data:image/svg+xml,%3Csvg width='20px' height='20px' viewBox='0 0 24 24' version='1.1' xmlns='http://www.w3.org/2000/svg' xmlns:xlink='http://www.w3.org/1999/xlink'%3E%3Ctitle%3EFile-Generic%3C/title%3E%3Cg id='Page-1' stroke='none' stroke-width='1' fill='none' fill-rule='evenodd'%3E%3Cg id='File-Generic'%3E%3Crect id='Rectangle' fill-rule='nonzero' x='0' y='0' width='24' height='24'%3E%3C/rect%3E%3Cpath d='M4 5 C4 3.89543 4.89543 3 6 3 L15.1716 3 C15.702 3 16.2107 3.21071 16.5858 3.58579 L19.4142 6.41421 C19.7893 6.78929 20 7.29799 20 7.82843 L20 19 C20 20.1046 19.1046 21 18 21 L6 21 C4.89543 21 4 20.1046 4 19 L4 5 Z' id='Path' stroke='rgba(255,255,255,0.7)' stroke-width='1' stroke-linecap='round'%3E%3C/path%3E%3Cpath d='M15 4 L15 6 C15 7.10457 15.8954 8 17 8 L19 8' id='Path' stroke='rgba(255,255,255,0.7)' stroke-width='1' stroke-linecap='round'%3E%3C/path%3E%3C/g%3E%3C/g%3E%3C/svg%3E\");\n}\n\nvite-error-overlay::part(frame):after {\n  background-image: url(\"data:image/svg+xml,%3Csvg width='20px' height='20px' viewBox='0 0 24 24' fill='none' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M15.6602 2.84952H19.1516C20.2555 2.84952 21.1504 3.74444 21.1504 4.84839V8.3398' stroke='rgba(255,255,255,0.7)' stroke-width='1.69904' stroke-linecap='round'/%3E%3Cpath d='M2.84949 8.33981L2.84949 4.8484C2.84949 3.74446 3.74441 2.84953 4.84836 2.84953L8.33977 2.84953' stroke='rgba(255,255,255,0.7)' stroke-width='1.69904' stroke-linecap='round'/%3E%3Cpath d='M21.1505 15.6602L21.1505 19.1516C21.1505 20.2555 20.2556 21.1505 19.1516 21.1505L15.6602 21.1505' stroke='rgba(255,255,255,0.7)' stroke-width='1.69904' stroke-linecap='round'/%3E%3Cpath d='M8.33984 21.1505L4.84843 21.1505C3.74449 21.1505 2.84956 20.2555 2.84956 19.1516L2.84956 15.6602' stroke='rgba(255,255,255,0.7)' stroke-width='1.69904' stroke-linecap='round'/%3E%3C/svg%3E\");\n}\n\nvite-error-overlay::part(stack):after {\n  background-image: url(\"data:image/svg+xml,%3Csvg width='20px' height='20px' viewBox='0 0 24 24' fill='none' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M14.78 20H9.78C7.98 20 4.58 19.09 4.58 15.64C4.58 12.19 7.98 11.28 9.78 11.28H14.22C14.37 11.28 17.92 11.23 17.92 8.42C17.92 5.61 14.37 5.56 14.22 5.56H9.22C9.02109 5.56 8.83032 5.48098 8.68967 5.34033C8.54902 5.19968 8.47 5.00891 8.47 4.81C8.47 4.61109 8.54902 4.42032 8.68967 4.27967C8.83032 4.13902 9.02109 4.06 9.22 4.06H14.22C16.02 4.06 19.42 4.97 19.42 8.42C19.42 11.87 16.02 12.78 14.22 12.78H9.78C9.63 12.78 6.08 12.83 6.08 15.64C6.08 18.45 9.63 18.5 9.78 18.5H14.78C14.9789 18.5 15.1697 18.579 15.3103 18.7197C15.451 18.8603 15.53 19.0511 15.53 19.25C15.53 19.4489 15.451 19.6397 15.3103 19.7803C15.1697 19.921 14.9789 20 14.78 20Z' fill='rgba(255,255,255,0.7)'/%3E%3Cpath d='M6.44 8.31C5.74314 8.30407 5.06363 8.09202 4.48708 7.70056C3.91054 7.30909 3.46276 6.75573 3.20018 6.11021C2.93759 5.46469 2.87195 4.75589 3.01153 4.07312C3.1511 3.39036 3.48965 2.76418 3.9845 2.2735C4.47935 1.78281 5.10837 1.44958 5.79229 1.31579C6.47622 1.182 7.18444 1.25363 7.82771 1.52167C8.47099 1.78971 9.02054 2.24215 9.40711 2.82199C9.79368 3.40182 9.99998 4.08311 10 4.78C10 5.2461 9.90773 5.70759 9.72846 6.13783C9.54919 6.56808 9.28648 6.95856 8.95551 7.28675C8.62453 7.61494 8.23184 7.87433 7.80009 8.04995C7.36834 8.22558 6.90609 8.31396 6.44 8.31ZM6.44 2.75C6.04444 2.75 5.65776 2.86729 5.32886 3.08706C4.99996 3.30682 4.74362 3.61918 4.59224 3.98463C4.44087 4.35008 4.40126 4.75221 4.47843 5.14018C4.5556 5.52814 4.74609 5.8845 5.02579 6.16421C5.3055 6.44391 5.66186 6.6344 6.04982 6.71157C6.43779 6.78874 6.83992 6.74913 7.20537 6.59776C7.57082 6.44638 7.88318 6.19003 8.10294 5.86114C8.32271 5.53224 8.44 5.14556 8.44 4.75C8.44 4.48735 8.38827 4.22728 8.28776 3.98463C8.18725 3.74198 8.03993 3.5215 7.85422 3.33578C7.6685 3.15007 7.44802 3.00275 7.20537 2.90224C6.96272 2.80173 6.70265 2.75 6.44 2.75Z' fill='rgba(255,255,255,0.7)'/%3E%3Cpath d='M17.56 22.75C16.8614 22.752 16.1779 22.5466 15.5961 22.1599C15.0143 21.7733 14.5603 21.2227 14.2916 20.5778C14.0229 19.933 13.9515 19.2229 14.0866 18.5375C14.2217 17.8521 14.5571 17.2221 15.0504 16.7275C15.5437 16.2328 16.1726 15.8956 16.8577 15.7586C17.5427 15.6215 18.253 15.6909 18.8986 15.9577C19.5442 16.2246 20.0961 16.6771 20.4844 17.2578C20.8727 17.8385 21.08 18.5214 21.08 19.22C21.08 20.1545 20.7095 21.0508 20.0496 21.7125C19.3898 22.3743 18.4945 22.7473 17.56 22.75ZM17.56 17.19C17.1644 17.19 16.7778 17.3073 16.4489 17.5271C16.12 17.7468 15.8636 18.0592 15.7122 18.4246C15.5609 18.7901 15.5213 19.1922 15.5984 19.5802C15.6756 19.9681 15.8661 20.3245 16.1458 20.6042C16.4255 20.8839 16.7819 21.0744 17.1698 21.1516C17.5578 21.2287 17.9599 21.1891 18.3254 21.0377C18.6908 20.8864 19.0032 20.63 19.2229 20.3011C19.4427 19.9722 19.56 19.5856 19.56 19.19C19.56 18.6596 19.3493 18.1508 18.9742 17.7758C18.5991 17.4007 18.0904 17.19 17.56 17.19Z' fill='rgba(255,255,255,0.7)'/%3E%3C/svg%3E\");\n}\n\nvite-error-overlay::part(tip):before {\n  content: \"Not sure how to solve this? Visit https://qwik.builder.io or connect with the community on Discord.\";\n  display: block;\n  margin-bottom: 1em;\n}\n";

function getOrigin(req) {
  const {PROTOCOL_HEADER: PROTOCOL_HEADER, HOST_HEADER: HOST_HEADER} = process.env;
  const headers = req.headers;
  const protocol = PROTOCOL_HEADER && headers[PROTOCOL_HEADER] || (req.socket.encrypted || req.connection.encrypted ? "https" : "http");
  const host = HOST_HEADER && headers[HOST_HEADER] || headers[":authority"] || headers.host;
  return `${protocol}://${host}`;
}

async function configureDevServer(server, opts, sys, path, isClientDevOnly, clientDevInput) {
  if ("function" !== typeof fetch && "node" === sys.env) {
    try {
      if (!globalThis.fetch) {
        const undici = await sys.strictDynamicImport("undici");
        globalThis.fetch = undici.fetch;
        globalThis.Headers = undici.Headers;
        globalThis.Request = undici.Request;
        globalThis.Response = undici.Response;
        globalThis.FormData = undici.FormData;
      }
    } catch {
      console.warn("Global fetch() was not installed");
    }
  }
  server.middlewares.use((async (req, res, next) => {
    try {
      const {ORIGIN: ORIGIN} = process.env;
      const domain = ORIGIN ?? getOrigin(req);
      const url = new URL(req.originalUrl, domain);
      if (shouldSsrRender(req, url)) {
        const serverData = {
          ...res._qwikEnvData,
          url: url.href
        };
        const status = "number" === typeof res.statusCode ? res.statusCode : 200;
        if (isClientDevOnly) {
          const relPath = path.relative(opts.rootDir, clientDevInput);
          const entryUrl = "/" + relPath.replace(/\\/g, "/");
          let html = getViteDevIndexHtml(entryUrl, serverData);
          html = await server.transformIndexHtml(url.pathname, html);
          res.setHeader("Content-Type", "text/html; charset=utf-8");
          res.setHeader("Cache-Control", "no-cache, no-store, max-age=0");
          res.setHeader("Access-Control-Allow-Origin", "*");
          res.setHeader("X-Powered-By", "Qwik Vite Dev Server");
          res.writeHead(status);
          res.end(html);
          return;
        }
        const ssrModule = await server.ssrLoadModule(opts.input[0]);
        const render = ssrModule.default ?? ssrModule.render;
        if ("function" === typeof render) {
          const manifest = {
            symbols: {},
            mapping: {},
            bundles: {},
            injections: [],
            version: "1"
          };
          const added = new Set;
          Array.from(server.moduleGraph.fileToModulesMap.entries()).forEach((entry => {
            entry[1].forEach((v => {
              const hook = v.info?.meta?.hook;
              let url2 = v.url;
              v.lastHMRTimestamp && (url2 += `?t=${v.lastHMRTimestamp}`);
              hook && (manifest.mapping[hook.name] = url2);
              const {pathId: pathId, query: query} = parseId(v.url);
              if ("" === query && [ ".css", ".scss", ".sass" ].some((ext => pathId.endsWith(ext)))) {
                added.add(url2);
                manifest.injections.push({
                  tag: "link",
                  location: "head",
                  attributes: {
                    rel: "stylesheet",
                    href: url2
                  }
                });
              }
            }));
          }));
          const srcBase = opts.srcDir ? path.relative(opts.rootDir, opts.srcDir).replace(/\\/g, "/") : "src";
          const renderOpts = {
            debug: true,
            locale: serverData.locale,
            stream: res,
            snapshot: !isClientDevOnly,
            manifest: isClientDevOnly ? void 0 : manifest,
            symbolMapper: isClientDevOnly ? void 0 : (symbolName, mapper) => {
              const defaultChunk = [ symbolName, `/${srcBase}/${symbolName.toLowerCase()}.js` ];
              if (mapper) {
                const hash = getSymbolHash(symbolName);
                return mapper[hash] ?? defaultChunk;
              }
              return defaultChunk;
            },
            prefetchStrategy: null,
            serverData: serverData
          };
          res.setHeader("Content-Type", "text/html; charset=utf-8");
          res.setHeader("Cache-Control", "no-cache, no-store, max-age=0");
          res.setHeader("Access-Control-Allow-Origin", "*");
          res.setHeader("X-Powered-By", "Qwik Vite Dev Server");
          res.writeHead(status);
          const result = await render(renderOpts);
          Array.from(server.moduleGraph.fileToModulesMap.entries()).forEach((entry => {
            entry[1].forEach((v => {
              const {pathId: pathId, query: query} = parseId(v.url);
              !added.has(v.url) && "" === query && [ ".css", ".scss", ".sass" ].some((ext => pathId.endsWith(ext))) && res.write(`<link rel="stylesheet" href="${v.url}">`);
            }));
          }));
          "html" in result && res.write(result.html);
          res.write(END_SSR_SCRIPT(opts, opts.srcDir ? opts.srcDir : path.join(opts.rootDir, "src")));
          res.end();
        } else {
          next();
        }
      } else {
        next();
      }
    } catch (e) {
      if (e instanceof Error) {
        server.ssrFixStacktrace(e);
        await formatError(sys, e);
      }
      next(e);
    } finally {
      "function" === typeof res._qwikRenderResolve && res._qwikRenderResolve();
    }
  }));
  server.middlewares.use((function(err, _req, res, next) {
    res.writableEnded || res.write(`<style>${VITE_ERROR_OVERLAY_STYLES}</style>`);
    return next(err);
  }));
  setTimeout((() => {
    console.log(`\n  ❗️ ${magenta("Expect significant performance loss in development.")}`);
    console.log(`  ❗️ ${magenta("Disabling the browser's cache results in waterfall requests.")}`);
  }), 1e3);
}

async function configurePreviewServer(middlewares, ssrOutDir, sys, path) {
  const fs = await sys.dynamicImport("node:fs");
  const url = await sys.dynamicImport("node:url");
  const entryPreviewPaths = [ "mjs", "cjs", "js" ].map((ext => path.join(ssrOutDir, `entry.preview.${ext}`)));
  const entryPreviewModulePath = entryPreviewPaths.find((p => fs.existsSync(p)));
  if (!entryPreviewModulePath) {
    return invalidPreviewMessage(middlewares, `Unable to find output "${ssrOutDir}/entry.preview" module.\n\nPlease ensure "src/entry.preview.tsx" has been built before the "preview" command.`);
  }
  try {
    const entryPreviewImportPath = url.pathToFileURL(entryPreviewModulePath).href;
    const previewModuleImport = await sys.strictDynamicImport(entryPreviewImportPath);
    let previewMiddleware = null;
    let preview404Middleware = null;
    if (previewModuleImport.default) {
      if ("function" === typeof previewModuleImport.default) {
        previewMiddleware = previewModuleImport.default;
      } else if ("object" === typeof previewModuleImport.default) {
        previewMiddleware = previewModuleImport.default.router;
        preview404Middleware = previewModuleImport.default.notFound;
      }
    }
    if ("function" !== typeof previewMiddleware) {
      return invalidPreviewMessage(middlewares, `Entry preview module "${entryPreviewModulePath}" does not export a default middleware function`);
    }
    middlewares.use(previewMiddleware);
    "function" === typeof preview404Middleware && middlewares.use(preview404Middleware);
  } catch (e) {
    return invalidPreviewMessage(middlewares, String(e));
  }
}

function invalidPreviewMessage(middlewares, msg) {
  console.log(`\n❌ ${msg}\n`);
  middlewares.use(((_, res) => {
    res.writeHead(400, {
      "Content-Type": "text/plain"
    });
    res.end(msg);
  }));
}

var FS_PREFIX = "/@fs/";

var VALID_ID_PREFIX = "/@id/";

var VITE_PUBLIC_PATH = "/@vite/";

var internalPrefixes = [ FS_PREFIX, VALID_ID_PREFIX, VITE_PUBLIC_PATH ];

var InternalPrefixRE = new RegExp(`^(?:${internalPrefixes.join("|")})`);

var shouldSsrRender = (req, url) => {
  const pathname = url.pathname;
  if (/\.[\w?=&]+$/.test(pathname) && !pathname.endsWith(".html")) {
    return false;
  }
  if (pathname.includes("_-vite-ping")) {
    return false;
  }
  if (pathname.includes("__open-in-editor")) {
    return false;
  }
  if (url.searchParams.has("html-proxy")) {
    return false;
  }
  if ("false" === url.searchParams.get("ssr")) {
    return false;
  }
  if (InternalPrefixRE.test(url.pathname)) {
    return false;
  }
  const acceptHeader = req.headers.accept || "";
  if (!acceptHeader.includes("text/html")) {
    return false;
  }
  return true;
};

var DEV_ERROR_HANDLING = "\n<script>\n\ndocument.addEventListener('qerror', ev => {\n  const ErrorOverlay = customElements.get('vite-error-overlay');\n  if (!ErrorOverlay) {\n    return;\n  }\n  const err = ev.detail.error;\n  const overlay = new ErrorOverlay(err);\n  document.body.appendChild(overlay);\n});\n<\/script>";

var DEV_QWIK_INSPECTOR = (opts, srcDir) => {
  if (!opts.clickToSource) {
    return "";
  }
  const hotKeys = opts.clickToSource;
  return `\n<style>\n#qwik-inspector-overlay {\n  position: fixed;\n  background: rgba(24, 182, 246, 0.27);\n  pointer-events: none;\n  box-sizing: border-box;\n  border: 2px solid rgba(172, 126, 244, 0.46);\n  border-radius: 4px;\n  contain: strict;\n  cursor: pointer;\n  z-index: 999999;\n}\n#qwik-inspector-info-popup {\n  position: fixed;\n  bottom: 10px;\n  right: 10px;\n  font-family: monospace;\n  background: #000000c2;\n  color: white;\n  padding: 10px 20px;\n  border-radius: 8px;\n  box-shadow: 0 20px 25px -5px rgb(0 0 0 / 34%), 0 8px 10px -6px rgb(0 0 0 / 24%);\n  backdrop-filter: blur(4px);\n  -webkit-animation: fadeOut 0.3s 3s ease-in-out forwards;\n  animation: fadeOut 0.3s 3s ease-in-out forwards;\n  z-index: 999999;\n}\n#qwik-inspector-info-popup p {\n  margin: 0px;\n}\n@-webkit-keyframes fadeOut {\n  0% {opacity: 1;}\n  100% {opacity: 0;}\n}\n\n@keyframes fadeOut {\n  0% {opacity: 1;}\n  100% {opacity: 0; visibility: hidden;}\n}\n</style>\n<script>\n(function() {\n  console.debug("%c🔍 Qwik Click-To-Source","background: #564CE0; color: white; padding: 2px 3px; border-radius: 2px; font-size: 0.8em;","Hold-press the '${hotKeys.join(" + ")}' key${hotKeys.length > 1 ? "s" : ""} and click a component to jump directly to the source code in your IDE!");\n  window.__qwik_inspector_state = {\n    pressedKeys: new Set(),\n  };\n  const origin = 'http://local.local';\n  const srcDir = new URL(${JSON.stringify(srcDir + "/")}, origin);\n  const body = document.body;\n  const overlay = document.createElement('div');\n  overlay.id = 'qwik-inspector-overlay';\n  overlay.setAttribute('aria-hidden', 'true');\n  body.appendChild(overlay);\n\n  document.addEventListener(\n    'keydown',\n    (event) => {\n      window.__qwik_inspector_state.pressedKeys.add(event.code);\n      updateOverlay();\n    },\n    { capture: true }\n  );\n\n  document.addEventListener(\n    'keyup',\n    (event) => {\n      window.__qwik_inspector_state.pressedKeys.delete(event.code);\n      updateOverlay();\n    },\n    { capture: true }\n  );\n\n  document.addEventListener(\n    'mouseover',\n    (event) => {\n      if (event.target && event.target instanceof HTMLElement && event.target.dataset.qwikInspector) {\n        window.__qwik_inspector_state.hoveredElement = event.target;\n      } else {\n        window.__qwik_inspector_state.hoveredElement = undefined;\n      }\n      updateOverlay();\n    },\n    { capture: true }\n  );\n\n  document.addEventListener(\n    'click',\n    (event) => {\n      if (isActive()) {\n        window.__qwik_inspector_state.pressedKeys.clear();\n        if (event.target && event.target instanceof HTMLElement) {\n          if (event.target.dataset.qwikInspector) {\n            event.preventDefault();\n            const resolvedURL = new URL(event.target.dataset.qwikInspector, srcDir);\n            body.style.setProperty('cursor', 'progress');\n            if (resolvedURL.origin === origin) {\n              const params = new URLSearchParams();\n              params.set('file', resolvedURL.pathname);\n              fetch('/__open-in-editor?' + params.toString());\n            } else {\n              location.href = resolvedURL.href;\n            }\n          }\n        }\n      }\n    },\n    { capture: true }\n  );\n\n  document.addEventListener(\n    'contextmenu',\n    (event) => {\n      if (isActive()) {\n        window.__qwik_inspector_state.pressedKeys.clear();\n        if (event.target && event.target instanceof HTMLElement) {\n          if (event.target.dataset.qwikInspector) {\n            event.preventDefault();\n          }\n        }\n      }\n    },\n    { capture: true }\n  );\n\n  function updateOverlay() {\n    const hoverElement = window.__qwik_inspector_state.hoveredElement;\n    if (hoverElement && isActive()) {\n      const rect = hoverElement.getBoundingClientRect();\n      overlay.style.setProperty('height', rect.height + 'px');\n      overlay.style.setProperty('width', rect.width + 'px');\n      overlay.style.setProperty('top', rect.top + 'px');\n      overlay.style.setProperty('left', rect.left + 'px');\n      overlay.style.setProperty('visibility', 'visible');\n      body.style.setProperty('cursor', 'pointer');\n    } else {\n      overlay.style.setProperty('height', '0px');\n      overlay.style.setProperty('width', '0px');\n      overlay.style.setProperty('visibility', 'hidden');\n      body.style.removeProperty('cursor');\n    }\n  }\n\n  function checkKeysArePressed() {\n    const activeKeys = Array.from(window.__qwik_inspector_state.pressedKeys)\n      .map((key) => key ? key.replace(/(Left|Right)$/g, '') : undefined);\n    const clickToSourceKeys = ${JSON.stringify(hotKeys)};\n    return clickToSourceKeys.every((key) => activeKeys.includes(key));\n  }\n\n  function isActive() {\n    return checkKeysArePressed();\n  }\n\n  window.addEventListener('resize', updateOverlay);\n  document.addEventListener('scroll', updateOverlay);\n\n})();\n<\/script>\n<div id="qwik-inspector-info-popup" aria-hidden="true">Click-to-Source: ${hotKeys.join(" + ")}</div>\n`;
};

var PERF_WARNING = '\n<script>\nif (!window.__qwikViteLog) {\n  window.__qwikViteLog = true;\n  console.debug("%c⭐️ Qwik Dev SSR Mode","background: #0c75d2; color: white; padding: 2px 3px; border-radius: 2px; font-size: 0.8em;","App is running in SSR development mode!\\n - Additional JS is loaded by Vite for debugging and live reloading\\n - Rendering performance might not be optimal\\n - Delayed interactivity because prefetching is disabled\\n - Vite dev bundles do not represent production output\\n\\nProduction build can be tested running \'npm run preview\'");\n}\n<\/script>';

var END_SSR_SCRIPT = (opts, srcDir) => `\n<style>${VITE_ERROR_OVERLAY_STYLES}</style>\n<script type="module" src="/@vite/client"><\/script>\n${DEV_ERROR_HANDLING}\n${ERROR_HOST}\n${PERF_WARNING}\n${DEV_QWIK_INSPECTOR(opts.devTools, srcDir)}\n`;

function getViteDevIndexHtml(entryUrl, serverData) {
  return `<!DOCTYPE html>\n<html lang="en">\n  <head>\n  </head>\n  <body>\n    <script type="module">\n    async function main() {\n      const mod = await import("${entryUrl}?${VITE_DEV_CLIENT_QS}=");\n      if (mod.default) {\n        const serverData = JSON.parse(${JSON.stringify(JSON.stringify(serverData))})\n        mod.default({\n          serverData,\n        });\n      }\n    }\n    main();\n    <\/script>\n    ${DEV_ERROR_HANDLING}\n  </body>\n</html>`;
}

var VITE_DEV_CLIENT_QS = "qwik-vite-dev-client";

var getSymbolHash = symbolName => {
  const index = symbolName.lastIndexOf("_");
  if (index > -1) {
    return symbolName.slice(index + 1);
  }
  return symbolName;
};

var QWIK_LOADER_DEFAULT_MINIFIED = '((e,t)=>{const n="__q_context__",o=window,i=new Set,s=t=>e.querySelectorAll(t),a=(e,t,n=t.type)=>{s("[on"+e+"\\\\:"+n+"]").forEach((o=>f(o,e,t,n)))},r=(e,t)=>e.getAttribute(t),l=t=>{if(void 0===t._qwikjson_){let n=(t===e.documentElement?e.body:t).lastElementChild;for(;n;){if("SCRIPT"===n.tagName&&"qwik/json"===r(n,"type")){t._qwikjson_=JSON.parse(n.textContent.replace(/\\\\x3C(\\/?script)/g,"<$1"));break}n=n.previousElementSibling}}},c=(e,t)=>new CustomEvent(e,{detail:t}),f=async(t,o,i,s=i.type)=>{const a="on"+o+":"+s;t.hasAttribute("preventdefault:"+s)&&i.preventDefault();const c=t._qc_,f=null==c?void 0:c.li.filter((e=>e[0]===a));if(f&&f.length>0){for(const e of f)await e[1].getFn([t,i],(()=>t.isConnected))(i,t);return}const b=r(t,a);if(b){const o=t.closest("[q\\\\:container]"),s=new URL(r(o,"q:base"),e.baseURI);for(const a of b.split("\\n")){const r=new URL(a,s),c=r.hash.replace(/^#?([^?[|]*).*$/,"$1")||"default",f=performance.now(),b=import(r.href.split("#")[0]);l(o);const u=(await b)[c],p=e[n];if(t.isConnected)try{e[n]=[t,i,r],d("qsymbol",{symbol:c,element:t,reqTime:f}),await u(i,t)}finally{e[n]=p}}}},d=(t,n)=>{e.dispatchEvent(c(t,n))},b=e=>e.replace(/([A-Z])/g,(e=>"-"+e.toLowerCase())),u=async e=>{let t=b(e.type),n=e.target;for(a("-document",e,t);n&&n.getAttribute;)await f(n,"",e,t),n=e.bubbles&&!0!==e.cancelBubble?n.parentElement:null},p=e=>{a("-window",e,b(e.type))},w=()=>{var n;const a=e.readyState;if(!t&&("interactive"==a||"complete"==a)&&(t=1,d("qinit"),(null!=(n=o.requestIdleCallback)?n:o.setTimeout).bind(o)((()=>d("qidle"))),i.has("qvisible"))){const e=s("[on\\\\:qvisible]"),t=new IntersectionObserver((e=>{for(const n of e)n.isIntersecting&&(t.unobserve(n.target),f(n.target,"",c("qvisible",n)))}));e.forEach((e=>t.observe(e)))}},q=(e,t,n,o=!1)=>e.addEventListener(t,n,{capture:o}),v=t=>{for(const n of t)i.has(n)||(q(e,n,u,!0),q(o,n,p),i.add(n))};if(!e.qR){const t=o.qwikevents;Array.isArray(t)&&v(t),o.qwikevents={push:(...e)=>v(e)},q(e,"readystatechange",w),w()}})(document);';

var QWIK_LOADER_DEFAULT_DEBUG = '(() => {\n    ((doc, hasInitialized) => {\n        const win = window;\n        const events =  new Set;\n        const querySelectorAll = query => doc.querySelectorAll(query);\n        const broadcast = (infix, ev, type = ev.type) => {\n            querySelectorAll("[on" + infix + "\\\\:" + type + "]").forEach((target => dispatch(target, infix, ev, type)));\n        };\n        const getAttribute = (el, name) => el.getAttribute(name);\n        const resolveContainer = containerEl => {\n            if (void 0 === containerEl._qwikjson_) {\n                let script = (containerEl === doc.documentElement ? doc.body : containerEl).lastElementChild;\n                while (script) {\n                    if ("SCRIPT" === script.tagName && "qwik/json" === getAttribute(script, "type")) {\n                        containerEl._qwikjson_ = JSON.parse(script.textContent.replace(/\\\\x3C(\\/?script)/g, "<$1"));\n                        break;\n                    }\n                    script = script.previousElementSibling;\n                }\n            }\n        };\n        const createEvent = (eventName, detail) => new CustomEvent(eventName, {\n            detail: detail\n        });\n        const dispatch = async (element, onPrefix, ev, eventName = ev.type) => {\n            const attrName = "on" + onPrefix + ":" + eventName;\n            element.hasAttribute("preventdefault:" + eventName) && ev.preventDefault();\n            const ctx = element._qc_;\n            const qrls = null == ctx ? void 0 : ctx.li.filter((li => li[0] === attrName));\n            if (qrls && qrls.length > 0) {\n                for (const q of qrls) {\n                    await q[1].getFn([ element, ev ], (() => element.isConnected))(ev, element);\n                }\n                return;\n            }\n            const attrValue = getAttribute(element, attrName);\n            if (attrValue) {\n                const container = element.closest("[q\\\\:container]");\n                const base = new URL(getAttribute(container, "q:base"), doc.baseURI);\n                for (const qrl of attrValue.split("\\n")) {\n                    const url = new URL(qrl, base);\n                    const symbolName = url.hash.replace(/^#?([^?[|]*).*$/, "$1") || "default";\n                    const reqTime = performance.now();\n                    const module = import(url.href.split("#")[0]);\n                    resolveContainer(container);\n                    const handler = (await module)[symbolName];\n                    const previousCtx = doc.__q_context__;\n                    if (element.isConnected) {\n                        try {\n                            doc.__q_context__ = [ element, ev, url ];\n                            emitEvent("qsymbol", {\n                                symbol: symbolName,\n                                element: element,\n                                reqTime: reqTime\n                            });\n                            await handler(ev, element);\n                        } finally {\n                            doc.__q_context__ = previousCtx;\n                        }\n                    }\n                }\n            }\n        };\n        const emitEvent = (eventName, detail) => {\n            doc.dispatchEvent(createEvent(eventName, detail));\n        };\n        const camelToKebab = str => str.replace(/([A-Z])/g, (a => "-" + a.toLowerCase()));\n        const processDocumentEvent = async ev => {\n            let type = camelToKebab(ev.type);\n            let element = ev.target;\n            broadcast("-document", ev, type);\n            while (element && element.getAttribute) {\n                await dispatch(element, "", ev, type);\n                element = ev.bubbles && !0 !== ev.cancelBubble ? element.parentElement : null;\n            }\n        };\n        const processWindowEvent = ev => {\n            broadcast("-window", ev, camelToKebab(ev.type));\n        };\n        const processReadyStateChange = () => {\n            var _a;\n            const readyState = doc.readyState;\n            if (!hasInitialized && ("interactive" == readyState || "complete" == readyState)) {\n                hasInitialized = 1;\n                emitEvent("qinit");\n                (null != (_a = win.requestIdleCallback) ? _a : win.setTimeout).bind(win)((() => emitEvent("qidle")));\n                if (events.has("qvisible")) {\n                    const results = querySelectorAll("[on\\\\:qvisible]");\n                    const observer = new IntersectionObserver((entries => {\n                        for (const entry of entries) {\n                            if (entry.isIntersecting) {\n                                observer.unobserve(entry.target);\n                                dispatch(entry.target, "", createEvent("qvisible", entry));\n                            }\n                        }\n                    }));\n                    results.forEach((el => observer.observe(el)));\n                }\n            }\n        };\n        const addEventListener = (el, eventName, handler, capture = !1) => el.addEventListener(eventName, handler, {\n            capture: capture\n        });\n        const push = eventNames => {\n            for (const eventName of eventNames) {\n                if (!events.has(eventName)) {\n                    addEventListener(doc, eventName, processDocumentEvent, !0);\n                    addEventListener(win, eventName, processWindowEvent);\n                    events.add(eventName);\n                }\n            }\n        };\n        if (!doc.qR) {\n            const qwikevents = win.qwikevents;\n            Array.isArray(qwikevents) && push(qwikevents);\n            win.qwikevents = {\n                push: (...e) => push(e)\n            };\n            addEventListener(doc, "readystatechange", processReadyStateChange);\n            processReadyStateChange();\n        }\n    })(document);\n})();';

var DEDUPE = [ QWIK_CORE_ID, QWIK_JSX_RUNTIME_ID, QWIK_JSX_DEV_RUNTIME_ID ];

function qwikVite(qwikViteOpts = {}) {
  let isClientDevOnly = false;
  let clientDevInput;
  let tmpClientManifestPath;
  let viteCommand = "serve";
  let manifestInput = null;
  let clientOutDir = null;
  let clientPublicOutDir = null;
  let ssrOutDir = null;
  const injections = [];
  const qwikPlugin = createPlugin(qwikViteOpts.optimizerOptions);
  const api = {
    getOptimizer: () => qwikPlugin.getOptimizer(),
    getOptions: () => qwikPlugin.getOptions(),
    getManifest: () => manifestInput,
    getRootDir: () => qwikPlugin.getOptions().rootDir,
    getClientOutDir: () => clientOutDir,
    getClientPublicOutDir: () => clientPublicOutDir
  };
  const vitePlugin = {
    name: "vite-plugin-qwik",
    enforce: "pre",
    api: api,
    async config(viteConfig, viteEnv) {
      await qwikPlugin.init();
      const sys = qwikPlugin.getSys();
      const path = qwikPlugin.getPath();
      viteCommand = viteEnv.command;
      isClientDevOnly = "serve" === viteCommand && "ssr" !== viteEnv.mode;
      qwikPlugin.log(`vite config(), command: ${viteCommand}, env.mode: ${viteEnv.mode}`);
      let target;
      target = viteConfig.build?.ssr || "ssr" === viteEnv.mode ? "ssr" : "lib" === viteEnv.mode ? "lib" : "test" === viteEnv.mode ? "test" : "client";
      let buildMode;
      buildMode = "production" === viteEnv.mode ? "production" : "development" === viteEnv.mode ? "development" : "build" === viteCommand && "client" === target ? "production" : "development";
      let forceFullBuild = true;
      if ("serve" === viteCommand) {
        qwikViteOpts.entryStrategy = {
          type: "hook"
        };
        forceFullBuild = false;
      } else {
        "ssr" === target ? qwikViteOpts.entryStrategy = {
          type: "hoist"
        } : "lib" === target && (qwikViteOpts.entryStrategy = {
          type: "inline"
        });
        forceFullBuild = true;
      }
      const shouldFindVendors = "lib" !== target || "serve" === viteCommand;
      const vendorRoots = shouldFindVendors ? await findQwikRoots(sys, path.join(sys.cwd(), "package.json")) : [];
      const pluginOpts = {
        target: target,
        buildMode: buildMode,
        debug: qwikViteOpts.debug,
        entryStrategy: qwikViteOpts.entryStrategy,
        srcDir: qwikViteOpts.srcDir,
        rootDir: viteConfig.root,
        resolveQwikBuild: true,
        transformedModuleOutput: qwikViteOpts.transformedModuleOutput,
        forceFullBuild: forceFullBuild,
        vendorRoots: [ ...qwikViteOpts.vendorRoots ?? [], ...vendorRoots.map((v => v.path)) ],
        outDir: viteConfig.build?.outDir,
        devTools: qwikViteOpts.devTools
      };
      if ("ssr" === target) {
        "string" === typeof viteConfig.build?.ssr ? pluginOpts.input = viteConfig.build.ssr : "string" === typeof qwikViteOpts.ssr?.input && (pluginOpts.input = qwikViteOpts.ssr.input);
        qwikViteOpts.ssr?.outDir && (pluginOpts.outDir = qwikViteOpts.ssr.outDir);
        pluginOpts.manifestInput = qwikViteOpts.ssr?.manifestInput;
      } else if ("client" === target) {
        pluginOpts.input = qwikViteOpts.client?.input;
        qwikViteOpts.client?.outDir && (pluginOpts.outDir = qwikViteOpts.client.outDir);
        pluginOpts.manifestOutput = qwikViteOpts.client?.manifestOutput;
      } else {
        "object" === typeof viteConfig.build?.lib && (pluginOpts.input = viteConfig.build?.lib.entry);
      }
      if ("node" === sys.env) {
        const fs = await sys.dynamicImport("node:fs");
        try {
          const rootDir = pluginOpts.rootDir ?? sys.cwd();
          const packageJsonPath = sys.path.join(rootDir, "package.json");
          const pkgString = await fs.promises.readFile(packageJsonPath, "utf-8");
          try {
            const data = JSON.parse(pkgString);
            "string" === typeof data.name && (pluginOpts.scope = data.name);
          } catch (e) {
            console.error(e);
          }
        } catch (e) {}
        const nodeOs = await sys.dynamicImport("node:os");
        const scopeSuffix = pluginOpts.scope ? `-${pluginOpts.scope.replace(/\//g, "--")}` : "";
        tmpClientManifestPath = path.join(nodeOs.tmpdir(), `vite-plugin-qwik-q-manifest${scopeSuffix}.json`);
        if ("ssr" === target && !pluginOpts.manifestInput) {
          try {
            const clientManifestStr = await fs.promises.readFile(tmpClientManifestPath, "utf-8");
            pluginOpts.manifestInput = JSON.parse(clientManifestStr);
          } catch (e) {}
        }
      }
      const opts = qwikPlugin.normalizeOptions(pluginOpts);
      manifestInput = pluginOpts.manifestInput || null;
      clientOutDir = qwikPlugin.normalizePath(sys.path.resolve(opts.rootDir, qwikViteOpts.client?.outDir || CLIENT_OUT_DIR));
      clientPublicOutDir = viteConfig.base ? path.join(clientOutDir, viteConfig.base) : clientOutDir;
      ssrOutDir = qwikPlugin.normalizePath(sys.path.resolve(opts.rootDir, qwikViteOpts.ssr?.outDir || SSR_OUT_DIR));
      clientDevInput = "string" === typeof qwikViteOpts.client?.devInput ? path.resolve(opts.rootDir, qwikViteOpts.client.devInput) : opts.srcDir ? path.resolve(opts.srcDir, CLIENT_DEV_INPUT) : path.resolve(opts.rootDir, "src", CLIENT_DEV_INPUT);
      clientDevInput = qwikPlugin.normalizePath(clientDevInput);
      const vendorIds = vendorRoots.map((v => v.id));
      const buildOutputDir = "client" === target && viteConfig.base ? path.join(opts.outDir, viteConfig.base) : opts.outDir;
      const updatedViteConfig = {
        ssr: {
          noExternal: [ QWIK_CORE_ID, QWIK_CORE_SERVER, QWIK_BUILD_ID, ...vendorIds ]
        },
        envPrefix: [ "VITE_", "PUBLIC_" ],
        resolve: {
          dedupe: [ ...DEDUPE, ...vendorIds ],
          conditions: "production" === buildMode && "client" === target ? [ "min" ] : []
        },
        esbuild: "serve" !== viteCommand && {
          logLevel: "error",
          jsx: "automatic"
        },
        optimizeDeps: {
          exclude: [ "@vite/client", "@vite/env", "node-fetch", "undici", QWIK_CORE_ID, QWIK_CORE_SERVER, QWIK_JSX_RUNTIME_ID, QWIK_JSX_DEV_RUNTIME_ID, QWIK_BUILD_ID, QWIK_CLIENT_MANIFEST_ID, ...vendorIds ]
        },
        build: {
          outDir: buildOutputDir,
          cssCodeSplit: false,
          rollupOptions: {
            input: opts.input,
            preserveEntrySignatures: "exports-only",
            output: {
              ...normalizeRollupOutputOptions(path, opts, viteConfig.build?.rollupOptions?.output),
              dir: buildOutputDir
            },
            onwarn: (warning, warn) => {
              if ("typescript" === warning.plugin && warning.message.includes("outputToFilesystem")) {
                return;
              }
              warn(warning);
            }
          },
          modulePreload: {
            polyfill: false
          },
          dynamicImportVarsOptions: {
            exclude: [ /./ ]
          }
        }
      };
      const isDevelopment = "development" === buildMode;
      const qDevKey = "globalThis.qDev";
      const qInspectorKey = "globalThis.qInspector";
      const qSerializeKey = "globalThis.qSerialize";
      const qDev = viteConfig?.define?.[qDevKey] ?? isDevelopment;
      const qInspector = viteConfig?.define?.[qInspectorKey] ?? isDevelopment;
      const qSerialize = viteConfig?.define?.[qSerializeKey] ?? isDevelopment;
      updatedViteConfig.define = {
        [qDevKey]: qDev,
        [qInspectorKey]: qInspector,
        [qSerializeKey]: qSerialize
      };
      globalThis.qDev = qDev;
      globalThis.qInspector = qInspector;
      if ("ssr" === opts.target) {
        if ("build" === viteCommand) {
          updatedViteConfig.publicDir = false;
          updatedViteConfig.build.ssr = true;
          null == viteConfig.build?.minify && "production" === buildMode && (updatedViteConfig.build.minify = "esbuild");
        }
      } else if ("client" === opts.target) {
        isClientDevOnly && (updatedViteConfig.build.rollupOptions.input = clientDevInput);
      } else if ("lib" === opts.target) {
        updatedViteConfig.build.minify = false;
      } else {
        const qDevKey2 = "globalThis.qDev";
        const qTestKey = "globalThis.qTest";
        const qInspectorKey2 = "globalThis.qInspector";
        updatedViteConfig.define = {
          [qDevKey2]: true,
          [qTestKey]: true,
          [qInspectorKey2]: false
        };
      }
      return updatedViteConfig;
    },
    async buildStart() {
      const resolver = this.resolve.bind(this);
      await qwikPlugin.validateSource(resolver);
      qwikPlugin.onDiagnostics(((diagnostics, optimizer, srcDir) => {
        diagnostics.forEach((d => {
          const id = qwikPlugin.normalizePath(optimizer.sys.path.join(srcDir, d.file));
          "error" === d.category ? this.error(createRollupError2(id, d)) : this.warn(createRollupError2(id, d));
        }));
      }));
      await qwikPlugin.buildStart(this);
    },
    resolveId(id, importer, resolveIdOpts) {
      if (id.startsWith("\0")) {
        return null;
      }
      if (isClientDevOnly && id === VITE_CLIENT_MODULE) {
        return id;
      }
      return qwikPlugin.resolveId(this, id, importer, resolveIdOpts);
    },
    load(id, loadOpts) {
      if (id.startsWith("\0")) {
        return null;
      }
      id = qwikPlugin.normalizePath(id);
      const opts = qwikPlugin.getOptions();
      if (isClientDevOnly && id === VITE_CLIENT_MODULE) {
        return getViteDevModule(opts);
      }
      if ("serve" === viteCommand && id.endsWith(QWIK_CLIENT_MANIFEST_ID)) {
        return {
          code: "export const manifest = undefined;"
        };
      }
      return qwikPlugin.load(this, id, loadOpts);
    },
    transform(code, id, transformOpts) {
      if (id.startsWith("\0")) {
        return null;
      }
      if (isClientDevOnly) {
        const parsedId = parseId(id);
        parsedId.params.has(VITE_DEV_CLIENT_QS) && (code = updateEntryDev(code));
      }
      return qwikPlugin.transform(this, code, id, transformOpts);
    },
    generateBundle: {
      order: "post",
      async handler(_, rollupBundle) {
        const opts = qwikPlugin.getOptions();
        if ("client" === opts.target) {
          const outputAnalyzer = qwikPlugin.createOutputAnalyzer();
          for (const fileName in rollupBundle) {
            const b = rollupBundle[fileName];
            "chunk" === b.type ? outputAnalyzer.addBundle({
              fileName: fileName,
              modules: b.modules,
              imports: b.imports,
              dynamicImports: b.dynamicImports,
              size: b.code.length
            }) : [ ".css", ".scss", ".sass", ".less" ].some((ext => fileName.endsWith(ext))) && ("string" === typeof b.source && b.source.length < 2e4 ? injections.push({
              tag: "style",
              location: "head",
              attributes: {
                "data-src": `/${fileName}`,
                dangerouslySetInnerHTML: b.source
              }
            }) : injections.push({
              tag: "link",
              location: "head",
              attributes: {
                rel: "stylesheet",
                href: `/${fileName}`
              }
            }));
          }
          for (const i of injections) {
            outputAnalyzer.addInjection(i);
          }
          const optimizer = qwikPlugin.getOptimizer();
          const manifest = await outputAnalyzer.generateManifest();
          manifest.platform = {
            ...versions,
            vite: "",
            rollup: this.meta?.rollupVersion || "",
            env: optimizer.sys.env,
            os: optimizer.sys.os
          };
          "node" === optimizer.sys.env && (manifest.platform.node = process.versions.node);
          const clientManifestStr = JSON.stringify(manifest, null, 2);
          this.emitFile({
            type: "asset",
            fileName: Q_MANIFEST_FILENAME,
            source: clientManifestStr
          });
          "function" === typeof opts.manifestOutput && await opts.manifestOutput(manifest);
          "function" === typeof opts.transformedModuleOutput && await opts.transformedModuleOutput(qwikPlugin.getTransformedOutputs());
          const sys = qwikPlugin.getSys();
          if (tmpClientManifestPath && "node" === sys.env) {
            const fs = await sys.dynamicImport("node:fs");
            await fs.promises.writeFile(tmpClientManifestPath, clientManifestStr);
          }
        }
      }
    },
    async writeBundle(_, rollupBundle) {
      const opts = qwikPlugin.getOptions();
      if ("ssr" === opts.target) {
        const sys = qwikPlugin.getSys();
        if ("node" === sys.env) {
          const outputs = Object.keys(rollupBundle);
          const patchModuleFormat = async bundeName => {
            try {
              const bundleFileName = sys.path.basename(bundeName);
              const ext = sys.path.extname(bundleFileName);
              if (bundleFileName.startsWith("entry.") && !bundleFileName.includes("preview") && (".mjs" === ext || ".cjs" === ext)) {
                const extlessName = sys.path.basename(bundleFileName, ext);
                const js = `${extlessName}.js`;
                const moduleName = extlessName + ext;
                const hasJsScript = outputs.some((f => sys.path.basename(f) === js));
                if (!hasJsScript) {
                  const bundleOutDir = sys.path.dirname(bundeName);
                  const fs = await sys.dynamicImport("node:fs");
                  const folder = sys.path.join(opts.outDir, bundleOutDir);
                  await fs.promises.mkdir(folder, {
                    recursive: true
                  });
                  await fs.promises.writeFile(sys.path.join(folder, js), `export * from "./${moduleName}";`);
                }
              }
            } catch (e) {
              console.error("patchModuleFormat", e);
            }
          };
          await Promise.all(outputs.map(patchModuleFormat));
        }
      }
    },
    configureServer(server) {
      const plugin = async () => {
        const opts = qwikPlugin.getOptions();
        const sys = qwikPlugin.getSys();
        const path = qwikPlugin.getPath();
        await configureDevServer(server, opts, sys, path, isClientDevOnly, clientDevInput);
      };
      const isNEW = true === globalThis.__qwikCityNew;
      return isNEW ? plugin : plugin();
    },
    configurePreviewServer: server => async () => {
      const sys = qwikPlugin.getSys();
      const path = qwikPlugin.getPath();
      await configurePreviewServer(server.middlewares, ssrOutDir, sys, path);
    },
    handleHotUpdate(ctx) {
      qwikPlugin.log("handleHotUpdate()", ctx);
      for (const mod of ctx.modules) {
        const deps = mod.info?.meta?.qwikdeps;
        if (deps) {
          for (const dep of deps) {
            const mod2 = ctx.server.moduleGraph.getModuleById(dep);
            mod2 && ctx.server.moduleGraph.invalidateModule(mod2);
          }
        }
      }
      if ([ ".css", ".scss", ".sass" ].some((ext => ctx.file.endsWith(ext)))) {
        qwikPlugin.log("handleHotUpdate()", "force css reload");
        ctx.server.ws.send({
          type: "full-reload"
        });
        return [];
      }
    }
  };
  return vitePlugin;
}

function updateEntryDev(code) {
  code = code.replace(/["']@builder.io\/qwik["']/g, `'${VITE_CLIENT_MODULE}'`);
  return code;
}

function getViteDevModule(opts) {
  const qwikLoader = JSON.stringify(opts.debug ? QWIK_LOADER_DEFAULT_DEBUG : QWIK_LOADER_DEFAULT_MINIFIED);
  return `// Qwik Vite Dev Module\nimport { render as qwikRender } from '@builder.io/qwik';\n\nexport async function render(document, rootNode, opts) {\n\n  await qwikRender(document, rootNode, opts);\n\n  let qwikLoader = document.getElementById('qwikloader');\n  if (!qwikLoader) {\n    qwikLoader = document.createElement('script');\n    qwikLoader.id = 'qwikloader';\n    qwikLoader.innerHTML = ${qwikLoader};\n    const parent = document.head ?? document.body ?? document.documentElement;\n    parent.appendChild(qwikLoader);\n  }\n\n  if (!window.__qwikViteLog) {\n    window.__qwikViteLog = true;\n    console.debug("%c⭐️ Qwik Client Mode","background: #0c75d2; color: white; padding: 2px 3px; border-radius: 2px; font-size: 0.8em;","Do not use this mode in production!\\n - No portion of the application is pre-rendered on the server\\n - All of the application is running eagerly in the browser\\n - Optimizer/Serialization/Deserialization code is not exercised!");\n  }\n}`;
}

var findQwikRoots = async (sys, packageJsonPath) => {
  if ("node" === sys.env) {
    const fs = await sys.dynamicImport("node:fs");
    const {resolvePackageData: resolvePackageData} = await sys.strictDynamicImport("vite");
    try {
      const data = await fs.promises.readFile(packageJsonPath, {
        encoding: "utf-8"
      });
      try {
        const packageJson = JSON.parse(data);
        const dependencies = packageJson.dependencies;
        const devDependencies = packageJson.devDependencies;
        const packages = [];
        "object" === typeof dependencies && packages.push(...Object.keys(dependencies));
        "object" === typeof devDependencies && packages.push(...Object.keys(devDependencies));
        const basedir = sys.cwd();
        const qwikDirs = packages.map((id => {
          const pkgData = resolvePackageData(id, basedir);
          if (pkgData) {
            const qwikPath = pkgData.data.qwik;
            if (qwikPath) {
              return {
                id: id,
                path: sys.path.resolve(pkgData.dir, qwikPath)
              };
            }
          }
        })).filter(isNotNullable);
        return qwikDirs;
      } catch (e) {
        console.error(e);
      }
    } catch (e) {}
  }
  return [];
};

var isNotNullable = v => null != v;

var VITE_CLIENT_MODULE = "@builder.io/qwik/vite-client";

var CLIENT_DEV_INPUT = "entry.dev.tsx";

export { createOptimizer, qwikRollup, qwikVite, versions };