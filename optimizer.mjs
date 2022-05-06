/**
 * @license
 * @builder.io/qwik/optimizer
 * Copyright Builder.io, Inc. All Rights Reserved.
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/BuilderIO/qwik/blob/main/LICENSE
 */
var qDev = false !== globalThis.qDev;

var qTest = void 0 !== globalThis.describe;

var STYLE = qDev ? "background: #564CE0; color: white; padding: 2px 3px; border-radius: 2px; font-size: 0.8em;" : "";

var logWarn = (message, ...optionalParams) => {
  console.warn("%cQWIK WARN", STYLE, message, ...optionalParams);
};

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
  qwik: "0.0.20-0"
};

async function getSystem() {
  const sys = {
    dynamicImport: path => {
      throw new Error(`Qwik Optimizer sys.dynamicImport() not implemented, trying to import: "${path}"`);
    },
    path: null,
    cwd: () => "/",
    env: env
  };
  const sysEnv = env();
  sys.path = createPath(sys);
  sys.dynamicImport = path => import(path);
  false;
  if ("node" === sysEnv) {
    sys.path = await sys.dynamicImport("path");
    sys.cwd = () => process.cwd();
  }
  return sys;
}

var getPlatformInputFiles = async sys => {
  if ("function" === typeof sys.getInputFiles) {
    return sys.getInputFiles;
  }
  if ("node" === sys.env()) {
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
          path: sys.path.relative(rootDir, filePath)
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
  const sysEnv = env();
  if ("node" === sysEnv) {
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
  false;
  {
    const mjsWasmPath = sys.path.join("bindings", "qwik.wasm.mjs");
    const module = await sys.dynamicImport("./" + mjsWasmPath);
    await module.default();
    return module;
  }
}

var env = () => {
  if ("undefined" !== typeof Deno) {
    return "deno";
  }
  if ("undefined" !== typeof process && process.versions && process.versions.node && "undefined" !== typeof global) {
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
  ".jsx": true
};

var createOptimizer = async (optimizerOptions = {}) => {
  const sys = (null == optimizerOptions ? void 0 : optimizerOptions.sys) || await getSystem();
  const binding = (null == optimizerOptions ? void 0 : optimizerOptions.binding) || await loadPlatformBinding(sys);
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
      dev: fsOpts.dev,
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
    explicityExtensions: false,
    dev: true
  };
  Object.entries(opts).forEach((([key, value]) => {
    null != value && (output[key] = value);
  }));
  output.entryStrategy = null != (_b = null == (_a = opts.entryStrategy) ? void 0 : _a.type) ? _b : "smart";
  return output;
};

function prioritorizeSymbolNames(manifest) {
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

var EVENT_PRIORITY = [ "onClick$", "onDblClick$", "onContextMenu$", "onAuxClick$", "onPointerDown$", "onPointerUp$", "onPointerMove$", "onPointerOver$", "onPointerEnter$", "onPointerLeave$", "onPointerOut$", "onPointerCancel$", "onGotPointerCapture$", "onLostPointerCapture$", "onTouchStart$", "onTouchEnd$", "onTouchMove$", "onTouchCancel$", "onMouseDown$", "onMouseUp$", "onMouseMove$", "onMouseEnter$", "onMouseLeave$", "onMouseOver$", "onMouseOut$", "onWheel$", "onGestureStart$", "onGestureChange$", "onGestureEnd$", "onKeyDown$", "onKeyUp$", "onKeyPress$", "onInput$", "onChange$", "onSearch$", "onInvalid$", "onBeforeInput$", "onSelect$", "onFocusIn$", "onFocusOut$", "onFocus$", "onBlur$", "onSubmit$", "onReset$", "onScroll$" ].map((n => n.toLowerCase()));

var FUNCTION_PRIORITY = [ "useClientEffect$", "useEffect$", "component$", "useStyles$", "useScopedStyles$" ].map((n => n.toLowerCase()));

function prioritorizeBundles(manifest) {
  return Object.keys(manifest.bundles).sort(((a, b) => {
    if (a < b) {
      return -1;
    }
    if (a > b) {
      return 1;
    }
    return 0;
  }));
}

function updateManifestPriorities(manifest) {
  const prioritorizedSymbolNames = prioritorizeSymbolNames(manifest);
  const prioritorizedSymbols = {};
  const prioritorizedMapping = {};
  for (const symbolName of prioritorizedSymbolNames) {
    prioritorizedSymbols[symbolName] = manifest.symbols[symbolName];
    prioritorizedMapping[symbolName] = manifest.mapping[symbolName];
  }
  const prioritorizedBundleNames = prioritorizeBundles(manifest);
  const prioritorizedBundles = {};
  for (const bundleName of prioritorizedBundleNames) {
    const entry = prioritorizedBundles[bundleName] = manifest.bundles[bundleName];
    entry.imports && entry.imports.sort();
    entry.dynamicImports && entry.dynamicImports.sort();
  }
  manifest.symbols = prioritorizedSymbols;
  manifest.mapping = prioritorizedMapping;
  manifest.bundles = prioritorizedBundles;
  manifest.injections && manifest.injections.sort();
  return manifest;
}

function getValidManifest(manifest) {
  if (null != manifest && null != manifest.mapping && "object" === typeof manifest.mapping && null != manifest.symbols && "object" === typeof manifest.symbols && null != manifest.bundles && "object" === typeof manifest.bundles) {
    return manifest;
  }
  return;
}

function createPlugin(optimizerOptions = {}) {
  const id = `${Math.round(899 * Math.random()) + 100}`;
  const results = new Map;
  const injections = [];
  const transformedOutputs = new Map;
  let optimizer = null;
  let addWatchFileCallback = () => {};
  let diagnosticsCallback = () => {};
  const opts = {
    buildMode: "development",
    debug: false,
    rootDir: null,
    outClientDir: null,
    outServerDir: null,
    forceFullBuild: false,
    entryStrategy: null,
    srcDir: null,
    srcInputs: null,
    srcRootInput: null,
    srcEntryServerInput: null,
    manifestInput: null,
    manifestOutput: null,
    transformedModuleOutput: null
  };
  const getOptimizer = async () => {
    optimizer || (optimizer = await createOptimizer(optimizerOptions));
    return optimizer;
  };
  const normalizeOptions = async inputOpts => {
    const updatedOpts = Object.assign({}, inputOpts);
    const optimizer2 = await getOptimizer();
    opts.debug = !!updatedOpts.debug;
    opts.buildMode = "development";
    "ssr" === updatedOpts.buildMode ? opts.buildMode = "ssr" : "production" === updatedOpts.buildMode && (opts.buildMode = "production");
    updatedOpts.entryStrategy && "object" === typeof updatedOpts.entryStrategy && (opts.entryStrategy = {
      ...updatedOpts.entryStrategy
    });
    opts.entryStrategy || (opts.entryStrategy = {
      type: "hook"
    });
    "string" === typeof updatedOpts.rootDir && (opts.rootDir = updatedOpts.rootDir);
    "string" !== typeof opts.rootDir && (opts.rootDir = optimizer2.sys.cwd());
    opts.rootDir = optimizer2.sys.path.resolve(optimizer2.sys.cwd(), opts.rootDir);
    let srcDir = optimizer2.sys.path.resolve(opts.rootDir, SRC_DIR_DEFAULT);
    if ("string" === typeof updatedOpts.srcDir) {
      opts.srcDir = optimizer2.sys.path.resolve(opts.rootDir, updatedOpts.srcDir);
      srcDir = opts.srcDir;
      opts.srcInputs = null;
    } else if (Array.isArray(updatedOpts.srcInputs)) {
      opts.srcInputs = [ ...updatedOpts.srcInputs ];
      opts.srcDir = null;
    } else {
      opts.srcDir = srcDir;
    }
    "boolean" === typeof updatedOpts.forceFullBuild ? opts.forceFullBuild = updatedOpts.forceFullBuild : opts.forceFullBuild = "hook" !== opts.entryStrategy.type || !!updatedOpts.srcInputs;
    Array.isArray(opts.srcInputs) ? opts.srcInputs.forEach((i => {
      i.path = optimizer2.sys.path.resolve(opts.rootDir, i.path);
    })) : "string" === typeof opts.srcDir && (opts.srcDir = optimizer2.sys.path.resolve(opts.rootDir, opts.srcDir));
    "string" === typeof updatedOpts.srcRootInput ? opts.srcRootInput = [ updatedOpts.srcRootInput ] : Array.isArray(updatedOpts.srcRootInput) ? opts.srcRootInput = [ ...updatedOpts.srcRootInput ] : opts.srcRootInput = [ ROOT_FILENAME_DEFAULT ];
    opts.srcRootInput = opts.srcRootInput.map((p => optimizer2.sys.path.resolve(srcDir, p)));
    "string" === typeof updatedOpts.srcEntryServerInput ? opts.srcEntryServerInput = optimizer2.sys.path.resolve(srcDir, updatedOpts.srcEntryServerInput) : opts.srcEntryServerInput = optimizer2.sys.path.resolve(srcDir, ENTRY_SERVER_FILENAME_DEFAULT);
    "string" === typeof updatedOpts.outClientDir && (opts.outClientDir = updatedOpts.outClientDir);
    "string" !== typeof opts.outClientDir && (opts.outClientDir = DIST_DIR_DEFAULT);
    opts.outClientDir = optimizer2.sys.path.resolve(opts.rootDir, opts.outClientDir);
    "string" === typeof updatedOpts.outServerDir && (opts.outServerDir = updatedOpts.outServerDir);
    "string" !== typeof opts.outServerDir && (opts.outServerDir = SERVER_DIR_DEFAULT);
    opts.outServerDir = optimizer2.sys.path.resolve(opts.rootDir, opts.outServerDir);
    const manifestInput = getValidManifest(updatedOpts.manifestInput);
    manifestInput && (opts.manifestInput = manifestInput);
    "function" === typeof updatedOpts.manifestOutput && (opts.manifestOutput = updatedOpts.manifestOutput);
    return {
      ...opts
    };
  };
  const validateSource = async () => {
    const optimizer2 = await getOptimizer();
    if ("node" === optimizer2.sys.env()) {
      const fs = await optimizer2.sys.dynamicImport("fs");
      if (!fs.existsSync(opts.rootDir)) {
        throw new Error(`Qwik rootDir "${opts.rootDir}" not found`);
      }
      if ("string" === typeof opts.srcDir && !fs.existsSync(opts.srcDir)) {
        throw new Error(`Qwik srcDir "${opts.srcDir}" not found`);
      }
      if (!fs.existsSync(opts.srcEntryServerInput)) {
        throw new Error(`Qwik srcEntryServerInput "${opts.srcEntryServerInput}" not found`);
      }
      opts.srcRootInput.forEach((input => {
        if (!fs.existsSync(input)) {
          throw new Error(`Qwik srcRootInput "${input}" not found`);
        }
      }));
    }
  };
  const buildStart = async () => {
    log("buildStart()", opts.buildMode, opts.forceFullBuild ? "full build" : "isolated build");
    if (opts.forceFullBuild) {
      const optimizer2 = await getOptimizer();
      let rootDir = "/";
      if ("string" === typeof opts.srcDir) {
        rootDir = opts.srcDir;
        log("buildStart() srcDir", opts.srcDir);
      } else if (Array.isArray(opts.srcInputs)) {
        optimizer2.sys.getInputFiles = async rootDir2 => opts.srcInputs.map((i => {
          const relInput = {
            path: optimizer2.sys.path.relative(rootDir2, i.path),
            code: i.code
          };
          return relInput;
        }));
        log(`buildStart() opts.srcInputs (${opts.srcInputs.length})`);
      }
      log("transformedOutput.clear()");
      transformedOutputs.clear();
      const transformOpts = {
        rootDir: rootDir,
        entryStrategy: opts.entryStrategy,
        minify: "simplify",
        transpile: true,
        explicityExtensions: true,
        dev: "development" === opts.buildMode
      };
      const result = await optimizer2.transformFs(transformOpts);
      for (const output of result.modules) {
        const key = optimizer2.sys.path.join(rootDir, output.path);
        log("buildStart() add transformedOutput", key);
        transformedOutputs.set(key, [ output, key ]);
      }
      diagnosticsCallback(result.diagnostics, optimizer2);
      results.set("@buildStart", result);
    }
  };
  const resolveId = async (id2, importer, _resolveIdOpts = {}) => {
    if (id2 === QWIK_BUILD_ID) {
      log("resolveId()", "Resolved", QWIK_BUILD_ID);
      return {
        id: QWIK_BUILD_ID,
        moduleSideEffects: false
      };
    }
    const optimizer2 = await getOptimizer();
    const parsedId = parseId(id2);
    let importeePathId = parsedId.pathId;
    if (importer) {
      log(`resolveId("${importeePathId}", "${importer}")`);
      const parsedImporterId = parseId(importer);
      const dir = optimizer2.sys.path.dirname(parsedImporterId.pathId);
      importeePathId = parsedImporterId.pathId.endsWith(".html") && !importeePathId.endsWith(".html") ? optimizer2.sys.path.join(dir, importeePathId) : optimizer2.sys.path.resolve(dir, importeePathId);
    } else {
      log(`resolveId("${importeePathId}"), No importer`);
    }
    const tryImportPathIds = [ forceJSExtension(optimizer2.sys.path, importeePathId) ];
    for (const tryId of tryImportPathIds) {
      const transformedOutput = transformedOutputs.get(tryId);
      if (transformedOutput) {
        log(`resolveId() Resolved ${tryId} from transformedOutputs`);
        const transformedModule = transformedOutput[0];
        const sideEffects = !transformedModule.isEntry || !transformedModule.hook;
        return {
          id: tryId,
          moduleSideEffects: sideEffects
        };
      }
      log(`resolveId() id ${tryId} not found in transformedOutputs`);
    }
    return null;
  };
  const load = async (id2, loadOpts = {}) => {
    const optimizer2 = await getOptimizer();
    if (id2 === QWIK_BUILD_ID) {
      log("load()", QWIK_BUILD_ID, opts.buildMode);
      return {
        code: getBuildTimeModule(opts, loadOpts)
      };
    }
    opts.forceFullBuild && (id2 = forceJSExtension(optimizer2.sys.path, id2));
    const transformedModule = transformedOutputs.get(id2);
    if (transformedModule) {
      log("load()", "Found", id2);
      return {
        code: transformedModule[0].code,
        map: transformedModule[0].map
      };
    }
    log("load()", "Not Found", id2);
    return null;
  };
  const transform = async (code, id2) => {
    if (opts.forceFullBuild) {
      return null;
    }
    const pregenerated = transformedOutputs.get(id2);
    if (pregenerated) {
      log("transform() pregenerated, addWatchFile", id2, pregenerated[1]);
      addWatchFileCallback(pregenerated[1]);
      return {
        meta: {
          hook: pregenerated[0].hook
        }
      };
    }
    const optimizer2 = await getOptimizer();
    const {pathId: pathId} = parseId(id2);
    const {ext: ext, dir: dir, base: base} = optimizer2.sys.path.parse(pathId);
    if (TRANSFORM_EXTS[ext]) {
      log("transform()", "Transforming", pathId);
      let path = base;
      opts.srcDir && (path = optimizer2.sys.path.relative(opts.srcDir, pathId));
      const newOutput = optimizer2.transformModulesSync({
        input: [ {
          code: code,
          path: path
        } ],
        entryStrategy: {
          type: "hook"
        },
        minify: "simplify",
        sourceMaps: false,
        transpile: true,
        explicityExtensions: true,
        rootDir: dir,
        dev: "development" === opts.buildMode
      });
      diagnosticsCallback(newOutput.diagnostics, optimizer2);
      results.set(pathId, newOutput);
      for (const [id3, output] of results.entries()) {
        const justChanged = newOutput === output;
        const dir2 = opts.srcDir || optimizer2.sys.path.dirname(id3);
        for (const mod of output.modules) {
          if (mod.isEntry) {
            const key = optimizer2.sys.path.join(dir2, mod.path);
            transformedOutputs.set(key, [ mod, id3 ]);
            log("transform()", "emitting", justChanged, key);
          }
        }
      }
      const module = newOutput.modules.find((m => !m.isEntry));
      return {
        code: module.code,
        map: module.map,
        meta: {
          hook: module.hook
        }
      };
    }
    log("transform()", "No Transforming", id2);
    return null;
  };
  const createOutputAnalyzer = () => {
    const outputBundles = [];
    const addBundle = b => outputBundles.push(b);
    const generateManifest = async () => {
      const optimizer2 = await getOptimizer();
      const path = optimizer2.sys.path;
      const manifest = {
        symbols: {},
        mapping: {},
        bundles: {},
        injections: injections,
        version: "1"
      };
      const hooks = Array.from(results.values()).flatMap((r => r.modules)).map((mod => mod.hook)).filter((h => !!h));
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
      return updateManifestPriorities(manifest);
    };
    return {
      addBundle: addBundle,
      generateManifest: generateManifest
    };
  };
  const addBundleToManifest = (path, manifest, outputBundle, bundleFileName) => {
    if (!manifest.bundles[bundleFileName]) {
      const buildDirName = path.dirname(outputBundle.fileName);
      const bundle = {
        size: outputBundle.size
      };
      const bundleImports = outputBundle.imports.filter((i => path.dirname(i) === buildDirName)).map((i => path.relative(buildDirName, i)));
      bundleImports.length > 0 && (bundle.imports = bundleImports);
      const bundleDynamicImports = outputBundle.dynamicImports.filter((i => path.dirname(i) === buildDirName)).map((i => path.relative(buildDirName, i)));
      bundleDynamicImports.length > 0 && (bundle.dynamicImports = bundleDynamicImports);
      manifest.bundles[bundleFileName] = bundle;
    }
  };
  const getOptions = () => opts;
  const getTransformedOutputs = () => {
    const to = {};
    for (const [v, id2] of transformedOutputs.values()) {
      to[id2] = v;
    }
    return to;
  };
  const updateSsrManifestDefault = (symbolsStr, code) => code.replace(/("|')__QwikManifest__("|')/g, symbolsStr);
  const log = (...str) => {
    opts.debug && console.debug(`[QWIK PLUGIN: ${id}]`, ...str);
  };
  const onAddWatchFile = cb => {
    addWatchFileCallback = cb;
  };
  const onDiagnostics = cb => {
    diagnosticsCallback = cb;
  };
  return {
    buildStart: buildStart,
    createOutputAnalyzer: createOutputAnalyzer,
    getOptimizer: getOptimizer,
    getOptions: getOptions,
    getTransformedOutputs: getTransformedOutputs,
    load: load,
    log: log,
    normalizeOptions: normalizeOptions,
    onAddWatchFile: onAddWatchFile,
    onDiagnostics: onDiagnostics,
    resolveId: resolveId,
    transform: transform,
    updateSsrManifestDefault: updateSsrManifestDefault,
    validateSource: validateSource
  };
}

function getBuildTimeModule(pluginOpts, loadOpts) {
  const isServer = "ssr" === pluginOpts.buildMode || !!loadOpts.ssr;
  return `// @builder.io/qwik/build\nexport const isServer = ${JSON.stringify(isServer)};\nexport const isBrowser = ${JSON.stringify(!isServer)};\n`;
}

function parseId(originalId) {
  const [pathId, querystrings] = originalId.split("?");
  return {
    originalId: originalId,
    pathId: pathId,
    params: new URLSearchParams(querystrings || "")
  };
}

function forceJSExtension(path, id) {
  const ext = path.extname(id);
  if ("" === ext) {
    return id + ".js";
  }
  if (TRANSFORM_EXTS[ext]) {
    return removeExtension(id) + ".js";
  }
  return id;
}

function removeExtension(id) {
  return id.split(".").slice(0, -1).join(".");
}

var TRANSFORM_EXTS = {
  ".jsx": true,
  ".ts": true,
  ".tsx": true
};

var QWIK_CORE_ID = "@builder.io/qwik";

var QWIK_BUILD_ID = "@builder.io/qwik/build";

var QWIK_JSX_RUNTIME_ID = "@builder.io/qwik/jsx-runtime";

var SRC_DIR_DEFAULT = "src";

var ROOT_FILENAME_DEFAULT = "root.tsx";

var ENTRY_SERVER_FILENAME_DEFAULT = "entry.server.tsx";

var DIST_DIR_DEFAULT = "dist";

var SERVER_DIR_DEFAULT = "server";

var Q_MANIFEST_FILENAME = "q-manifest.json";

function qwikRollup(qwikRollupOpts = {}) {
  const qwikPlugin = createPlugin(qwikRollupOpts.optimizerOptions);
  const rollupPlugin = {
    name: "rollup-plugin-qwik",
    api: {
      getOptimizer: () => qwikPlugin.getOptimizer()
    },
    async options(inputOpts) {
      inputOpts.onwarn = (warning, warn) => {
        if ("typescript" === warning.plugin && warning.message.includes("outputToFilesystem")) {
          return;
        }
        warn(warning);
      };
      const opts = await qwikPlugin.normalizeOptions(qwikRollupOpts);
      if ("ssr" === opts.buildMode) {
        inputOpts.input || (inputOpts.input = opts.srcEntryServerInput);
        inputOpts.treeshake = false;
      } else {
        inputOpts.input || (inputOpts.input = opts.srcRootInput);
      }
      return inputOpts;
    },
    outputOptions(outputOpts) {
      const opts = qwikPlugin.getOptions();
      if ("ssr" === opts.buildMode) {
        outputOpts.dir || (outputOpts.dir = opts.outServerDir);
        outputOpts.format || (outputOpts.format = "cjs");
      } else {
        outputOpts.dir || (outputOpts.dir = opts.outClientDir);
        outputOpts.format || (outputOpts.format = "es");
      }
      "cjs" === outputOpts.format && "string" !== typeof outputOpts.exports && (outputOpts.exports = "auto");
      return outputOpts;
    },
    async buildStart() {
      qwikPlugin.onAddWatchFile((path => this.addWatchFile(path)));
      qwikPlugin.onDiagnostics(((diagnostics, optimizer) => {
        diagnostics.forEach((d => {
          "Error" === d.severity ? this.error(createRollupError(optimizer, d)) : this.warn(createRollupError(optimizer, d));
        }));
      }));
      await qwikPlugin.buildStart();
    },
    resolveId(id, importer) {
      if (id.startsWith("\0")) {
        return null;
      }
      return qwikPlugin.resolveId(id, importer);
    },
    load(id) {
      if (id.startsWith("\0")) {
        return null;
      }
      return qwikPlugin.load(id);
    },
    transform(code, id) {
      if (id.startsWith("\0")) {
        return null;
      }
      return qwikPlugin.transform(code, id);
    },
    async generateBundle(_, rollupBundle) {
      const opts = qwikPlugin.getOptions();
      if ("production" === opts.buildMode || "development" === opts.buildMode) {
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
        const manifest = await outputAnalyzer.generateManifest();
        "function" === typeof opts.manifestOutput && await opts.manifestOutput(manifest);
        this.emitFile({
          type: "asset",
          fileName: Q_MANIFEST_FILENAME,
          source: JSON.stringify(manifest, null, 2)
        });
        "function" === typeof opts.transformedModuleOutput && await opts.transformedModuleOutput(qwikPlugin.getTransformedOutputs());
      } else if ("ssr" === opts.buildMode) {
        const manifestInput = getValidManifest(opts.manifestInput);
        if (manifestInput) {
          const manifestStr = JSON.stringify(opts.manifestInput);
          for (const fileName in rollupBundle) {
            const b = rollupBundle[fileName];
            "chunk" === b.type && (b.code = qwikPlugin.updateSsrManifestDefault(manifestStr, b.code));
          }
        }
      }
    }
  };
  return rollupPlugin;
}

var createRollupError = (optimizer, diagnostic) => {
  var _a, _b;
  const loc = null != (_b = null == (_a = diagnostic.code_highlights[0]) ? void 0 : _a.loc) ? _b : {};
  const id = optimizer ? optimizer.sys.path.join(optimizer.sys.cwd(), diagnostic.origin) : diagnostic.origin;
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

var QWIK_LOADER_DEFAULT_MINIFIED = '((e,t)=>{const n="__q_context__",o=["on:","on-window:","on-document:"],r=(t,n,o)=>{n=n.replace(/([A-Z])/g,(e=>"-"+e.toLowerCase())),e.querySelectorAll("[on"+t+"\\\\:"+n+"]").forEach((e=>c(e,n,o)))},s=(e,t)=>e.dispatchEvent(new CustomEvent("qsymbol",{detail:{name:t},bubbles:!0,composed:!0})),i=e=>{throw Error("QWIK "+e)},a=(t,n)=>(t=t.closest("[q\\\\:container]"),new URL(n,new URL(t?t.getAttribute("q:base"):e.baseURI,e.baseURI))),c=async(t,r,c)=>{for(const u of o){const o=t.getAttribute(u+r);if(o){t.hasAttribute("preventdefault:"+r)&&c.preventDefault();for(const r of o.split("\\n")){const o=a(t,r);if(o){const r=l(o),a=(window[o.pathname]||await import(o.href.split("#")[0]))[r]||i(o+" does not export "+r),u=e[n];try{e[n]=[t,c,o],a(c,t,o)}finally{e[n]=u,s(t,r)}}}}}},l=e=>e.hash.replace(/^#?([^?[|]*).*$/,"$1")||"default",u=(t,n)=>{if((n=t.target)==e)setTimeout((()=>r("-document",t.type,t)));else for(;n&&n.getAttribute;)c(n,t.type,t),n=t.bubbles?n.parentElement:null},b=n=>{if(n=e.readyState,!t&&("interactive"==n||"complete"==n)&&(t=1,r("","qresume",new CustomEvent("qresume")),"undefined"!=typeof IntersectionObserver)){const t=new IntersectionObserver((e=>{for(const n of e)n.isIntersecting&&(t.unobserve(n.target),c(n.target,"qvisible",new CustomEvent("qvisible",{bubbles:!1,detail:n})))}));e.qO=t,new MutationObserver((e=>{for(const n of e)t.observe(n.target)})).observe(document.documentElement,{attributeFilter:["on:qvisible"],subtree:!0}),e.querySelectorAll("[on\\\\:qvisible]").forEach((e=>t.observe(e)))}},f=t=>e.addEventListener(t,u,{capture:!0});if(!e.qR){e.qR=1;{const t=e.querySelector("script[events]");if(t)t.getAttribute("events").split(/[\\s,;]+/).forEach(f);else for(const t in e)t.startsWith("on")&&f(t.slice(2))}e.addEventListener("readystatechange",b),b()}})(document);';

var QWIK_LOADER_DEFAULT_DEBUG = '(() => {\n    ((doc, hasInitialized, prefetchWorker) => {\n        const ON_PREFIXES = [ "on:", "on-window:", "on-document:" ];\n        const broadcast = (infix, type, ev) => {\n            type = type.replace(/([A-Z])/g, (a => "-" + a.toLowerCase()));\n            doc.querySelectorAll("[on" + infix + "\\\\:" + type + "]").forEach((target => dispatch(target, type, ev)));\n        };\n        const symbolUsed = (el, symbolName) => el.dispatchEvent(new CustomEvent("qsymbol", {\n            detail: {\n                name: symbolName\n            },\n            bubbles: !0,\n            composed: !0\n        }));\n        const error = msg => {\n            throw new Error("QWIK " + msg);\n        };\n        const qrlResolver = (element, qrl) => {\n            element = element.closest("[q\\\\:container]");\n            return new URL(qrl, new URL(element ? element.getAttribute("q:base") : doc.baseURI, doc.baseURI));\n        };\n        const dispatch = async (element, eventName, ev) => {\n            for (const onPrefix of ON_PREFIXES) {\n                const attrValue = element.getAttribute(onPrefix + eventName);\n                if (attrValue) {\n                    element.hasAttribute("preventdefault:" + eventName) && ev.preventDefault();\n                    for (const qrl of attrValue.split("\\n")) {\n                        const url = qrlResolver(element, qrl);\n                        if (url) {\n                            const symbolName = getSymbolName(url);\n                            const handler = (window[url.pathname] || await import(url.href.split("#")[0]))[symbolName] || error(url + " does not export " + symbolName);\n                            const previousCtx = doc.__q_context__;\n                            try {\n                                doc.__q_context__ = [ element, ev, url ];\n                                handler(ev, element, url);\n                            } finally {\n                                doc.__q_context__ = previousCtx;\n                                symbolUsed(element, symbolName);\n                            }\n                        }\n                    }\n                }\n            }\n        };\n        const getSymbolName = url => url.hash.replace(/^#?([^?[|]*).*$/, "$1") || "default";\n        const processEvent = (ev, element) => {\n            if ((element = ev.target) == doc) {\n                setTimeout((() => broadcast("-document", ev.type, ev)));\n            } else {\n                while (element && element.getAttribute) {\n                    dispatch(element, ev.type, ev);\n                    element = ev.bubbles ? element.parentElement : null;\n                }\n            }\n        };\n        const processReadyStateChange = readyState => {\n            readyState = doc.readyState;\n            if (!hasInitialized && ("interactive" == readyState || "complete" == readyState)) {\n                hasInitialized = 1;\n                broadcast("", "qresume", new CustomEvent("qresume"));\n                if ("undefined" != typeof IntersectionObserver) {\n                    const observer = new IntersectionObserver((entries => {\n                        for (const entry of entries) {\n                            if (entry.isIntersecting) {\n                                observer.unobserve(entry.target);\n                                dispatch(entry.target, "qvisible", new CustomEvent("qvisible", {\n                                    bubbles: !1,\n                                    detail: entry\n                                }));\n                            }\n                        }\n                    }));\n                    doc.qO = observer;\n                    new MutationObserver((mutations => {\n                        for (const mutation2 of mutations) {\n                            observer.observe(mutation2.target);\n                        }\n                    })).observe(document.documentElement, {\n                        attributeFilter: [ "on:qvisible" ],\n                        subtree: !0\n                    });\n                    doc.querySelectorAll("[on\\\\:qvisible]").forEach((el => observer.observe(el)));\n                }\n            }\n        };\n        const addDocEventListener = eventName => doc.addEventListener(eventName, processEvent, {\n            capture: !0\n        });\n        if (!doc.qR) {\n            doc.qR = 1;\n            {\n                const scriptTag = doc.querySelector("script[events]");\n                if (scriptTag) {\n                    scriptTag.getAttribute("events").split(/[\\s,;]+/).forEach(addDocEventListener);\n                } else {\n                    for (const key in doc) {\n                        key.startsWith("on") && addDocEventListener(key.slice(2));\n                    }\n                }\n            }\n            doc.addEventListener("readystatechange", processReadyStateChange);\n            processReadyStateChange();\n        }\n    })(document);\n})();';

function qwikVite(qwikViteOpts = {}) {
  let hasValidatedSource = false;
  let isClientOnly = false;
  let srcEntryDevInput = "";
  const qwikPlugin = createPlugin(qwikViteOpts.optimizerOptions);
  const vitePlugin = {
    name: "vite-plugin-qwik",
    enforce: "pre",
    api: {
      getOptions: qwikPlugin.getOptions
    },
    async config(viteConfig, viteEnv) {
      qwikPlugin.log(`vite config(), command: ${viteEnv.command}, env.mode: ${viteEnv.mode}`);
      isClientOnly = "serve" === viteEnv.command && "ssr" !== viteEnv.mode;
      let buildMode = "development";
      "build" === viteEnv.command && ("ssr" === viteEnv.mode ? buildMode = "ssr" : "production" === viteEnv.mode && (buildMode = "production"));
      const pluginOpts = {
        debug: qwikViteOpts.debug,
        buildMode: buildMode,
        entryStrategy: qwikViteOpts.entryStrategy,
        rootDir: viteConfig.root,
        outClientDir: qwikViteOpts.outClientDir,
        outServerDir: qwikViteOpts.outServerDir,
        srcInputs: qwikViteOpts.srcInputs,
        srcRootInput: qwikViteOpts.srcRootInput,
        srcEntryServerInput: qwikViteOpts.srcEntryServerInput,
        manifestInput: qwikViteOpts.manifestInput,
        manifestOutput: qwikViteOpts.manifestOutput
      };
      "production" === buildMode && (pluginOpts.forceFullBuild = true);
      const optimizer = await qwikPlugin.getOptimizer();
      const opts = await qwikPlugin.normalizeOptions(pluginOpts);
      srcEntryDevInput = "string" === typeof qwikViteOpts.srcEntryDevInput ? optimizer.sys.path.resolve(opts.srcDir ? opts.srcDir : opts.rootDir, qwikViteOpts.srcEntryDevInput) : optimizer.sys.path.resolve(opts.srcDir ? opts.srcDir : opts.rootDir, ENTRY_DEV_FILENAME_DEFAULT);
      const outputOptions = {};
      if ("ssr" === opts.buildMode) {
        outputOptions.assetFileNames = "[name].[ext]";
        outputOptions.entryFileNames = "[name].js";
        outputOptions.chunkFileNames = "[name].js";
      } else if ("production" === opts.buildMode) {
        outputOptions.assetFileNames = "build/q-[hash].[ext]";
        outputOptions.entryFileNames = "build/q-[hash].js";
        outputOptions.chunkFileNames = "build/q-[hash].js";
      } else {
        outputOptions.assetFileNames = "build/[name].[ext]";
        outputOptions.entryFileNames = "build/[name].js";
        outputOptions.chunkFileNames = "build/[name].js";
      }
      const updatedViteConfig = {
        esbuild: {
          include: /\.js$/
        },
        optimizeDeps: {
          include: [ QWIK_CORE_ID, QWIK_JSX_RUNTIME_ID ],
          exclude: [ "@vite/client", "@vite/env" ]
        },
        build: {
          rollupOptions: {
            output: outputOptions,
            onwarn: (warning, warn) => {
              if ("typescript" === warning.plugin && warning.message.includes("outputToFilesystem")) {
                return;
              }
              warn(warning);
            }
          },
          polyfillModulePreload: false,
          dynamicImportVarsOptions: {
            exclude: [ /./ ]
          }
        }
      };
      "serve" === viteEnv.command && (pluginOpts.entryStrategy = {
        type: "hook"
      });
      if ("ssr" === opts.buildMode) {
        updatedViteConfig.build.rollupOptions.input = opts.srcEntryServerInput;
        updatedViteConfig.build.outDir = opts.outServerDir;
        updatedViteConfig.build.ssr = true;
        updatedViteConfig.ssr && false === updatedViteConfig.ssr.noExternal || (updatedViteConfig.ssr ? updatedViteConfig.ssr.noExternal = true : updatedViteConfig.ssr = {
          noExternal: true
        });
      } else {
        updatedViteConfig.build.rollupOptions.input = isClientOnly ? srcEntryDevInput : opts.srcRootInput;
        updatedViteConfig.build.outDir = opts.outClientDir;
      }
      return updatedViteConfig;
    },
    outputOptions(outputOpts) {
      "cjs" === outputOpts.format && "string" !== typeof outputOpts.exports && (outputOpts.exports = "auto");
      return outputOpts;
    },
    async buildStart() {
      if (!hasValidatedSource) {
        await qwikPlugin.validateSource();
        hasValidatedSource = true;
      }
      qwikPlugin.onAddWatchFile((path => this.addWatchFile(path)));
      qwikPlugin.onDiagnostics(((diagnostics, optimizer) => {
        diagnostics.forEach((d => {
          "Error" === d.severity ? this.error(createRollupError(optimizer, d)) : this.warn(createRollupError(optimizer, d));
        }));
      }));
      await qwikPlugin.buildStart();
    },
    resolveId(id, importer, resolveIdOpts) {
      if (id.startsWith("\0")) {
        return null;
      }
      if (isClientOnly && id === VITE_CLIENT_MODULE) {
        return id;
      }
      return qwikPlugin.resolveId(id, importer, resolveIdOpts);
    },
    async load(id, loadOpts) {
      if (id.startsWith("\0")) {
        return null;
      }
      if (isClientOnly && id === VITE_CLIENT_MODULE) {
        const opts = qwikPlugin.getOptions();
        return getViteDevModule(opts);
      }
      return qwikPlugin.load(id, loadOpts);
    },
    transform(code, id) {
      if (id.startsWith("\0")) {
        return null;
      }
      if (isClientOnly) {
        const parsedId = parseId(id);
        parsedId.params.has(VITE_DEV_CLIENT_QS) && (code = updateEntryDev(code));
      }
      return qwikPlugin.transform(code, id);
    },
    async generateBundle(_, rollupBundle) {
      const opts = qwikPlugin.getOptions();
      const optimizer = await qwikPlugin.getOptimizer();
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
      const manifest = await outputAnalyzer.generateManifest();
      "function" === typeof opts.manifestOutput && await opts.manifestOutput(manifest);
      if ("production" === opts.buildMode || "development" === opts.buildMode) {
        this.emitFile({
          type: "asset",
          fileName: Q_MANIFEST_FILENAME,
          source: JSON.stringify(manifest, null, 2)
        });
        "function" === typeof opts.transformedModuleOutput && await opts.transformedModuleOutput(qwikPlugin.getTransformedOutputs());
      } else if ("ssr" === opts.buildMode) {
        let clientManifestInput = opts.manifestInput;
        if (!clientManifestInput && "node" === optimizer.sys.env()) {
          try {
            const fs = await optimizer.sys.dynamicImport("fs");
            const qSymbolsPath = optimizer.sys.path.join(opts.outClientDir, Q_MANIFEST_FILENAME);
            const qSymbolsContent = fs.readFileSync(qSymbolsPath, "utf-8");
            clientManifestInput = JSON.parse(qSymbolsContent);
            fs.writeFileSync(optimizer.sys.path.join(opts.outServerDir, "q-manifest.server.json"), JSON.stringify(manifest, null, 2));
          } catch (e) {}
        }
        const clientManifest = getValidManifest(clientManifestInput);
        if (clientManifest) {
          const clientManifestStr = JSON.stringify(clientManifest);
          for (const fileName in rollupBundle) {
            const b = rollupBundle[fileName];
            "chunk" === b.type && (b.code = qwikPlugin.updateSsrManifestDefault(clientManifestStr, b.code));
          }
        }
      }
    },
    async configureServer(server) {
      const opts = qwikPlugin.getOptions();
      qwikPlugin.log(`configureServer(), entry module: ${opts.srcEntryServerInput}`);
      const optimizer = await qwikPlugin.getOptimizer();
      if ("function" !== typeof fetch && "node" === optimizer.sys.env()) {
        qwikPlugin.log("configureServer(), patch fetch()");
        const nodeFetch = await optimizer.sys.dynamicImport("node-fetch");
        global.fetch = nodeFetch;
        global.Headers = nodeFetch.Headers;
        global.Request = nodeFetch.Request;
        global.Response = nodeFetch.Response;
      }
      server.middlewares.use((async (req, res, next) => {
        var _a;
        const domain = "http://" + (null != (_a = req.headers.host) ? _a : "localhost");
        const url = new URL(req.originalUrl, domain);
        const pathname = url.pathname;
        const hasExtension = /\.[\w?=&]+$/.test(pathname);
        const isViteMod = pathname.startsWith("/@") || url.href.includes("?html-proxy");
        const isVitePing = url.href.includes("__vite_ping");
        const skipSSR = url.href.includes("ssr=false");
        if (hasExtension || isViteMod || isVitePing || skipSSR) {
          next();
          return;
        }
        try {
          if (isClientOnly) {
            qwikPlugin.log(`handleClientEntry("${url}")`);
            let entryUrl = optimizer.sys.path.relative(opts.rootDir, srcEntryDevInput);
            entryUrl = "/" + entryUrl.replace(/\\/g, "/");
            let html = getViteDevIndexHtml(entryUrl);
            html = await server.transformIndexHtml(pathname, html);
            res.setHeader("Content-Type", "text/html; charset=utf-8");
            res.setHeader("Cache-Control", "no-cache");
            res.setHeader("Access-Control-Allow-Origin", "*");
            res.setHeader("X-Powered-By", "Qwik Vite Dev Server");
            res.writeHead(200);
            res.end(html);
            return;
          }
          qwikPlugin.log(`handleSSR("${url}")`);
          const {render: render} = await server.ssrLoadModule(opts.srcEntryServerInput, {
            fixStacktrace: true
          });
          if (render) {
            const manifest = {
              symbols: {},
              mapping: {},
              bundles: {},
              injections: [],
              version: "1"
            };
            Array.from(server.moduleGraph.fileToModulesMap.entries()).forEach((entry => {
              entry[1].forEach((v => {
                var _a2, _b;
                const hook = null == (_b = null == (_a2 = v.info) ? void 0 : _a2.meta) ? void 0 : _b.hook;
                hook && v.lastHMRTimestamp && (manifest.mapping[hook.name] = `${v.url}?t=${v.lastHMRTimestamp}`);
              }));
            }));
            qwikPlugin.log("handleSSR()", "symbols", manifest);
            const mainMod = await server.moduleGraph.getModuleByUrl(opts.srcRootInput[0]);
            mainMod && mainMod.importedModules.forEach((moduleNode => {
              moduleNode.url.endsWith(".css") && manifest.injections.push({
                tag: "link",
                location: "head",
                attributes: {
                  rel: "stylesheet",
                  href: moduleNode.url
                }
              });
            }));
            const renderToStringOpts = {
              url: url.href,
              debug: true,
              manifest: isClientOnly ? void 0 : manifest,
              snapshot: !isClientOnly
            };
            const result = await render(renderToStringOpts);
            const html = await server.transformIndexHtml(pathname, result.html, req.originalUrl);
            res.setHeader("Content-Type", "text/html; charset=utf-8");
            res.setHeader("Cache-Control", "no-cache");
            res.setHeader("Access-Control-Allow-Origin", "*");
            res.setHeader("X-Powered-By", "Qwik Vite Dev Server");
            res.writeHead(200);
            res.end(html);
          } else {
            next();
          }
        } catch (e) {
          server.ssrFixStacktrace(e);
          next(e);
        }
      }));
    },
    handleHotUpdate(ctx) {
      qwikPlugin.log("handleHotUpdate()", ctx);
      if (ctx.file.endsWith(".css")) {
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

function getViteDevIndexHtml(entryUrl) {
  return `\x3c!-- Qwik Vite Dev Mode --\x3e\n<!DOCTYPE html>\n<html>\n  <head></head>\n  <body>\n    <script type="module" src="${entryUrl}?${VITE_DEV_CLIENT_QS}="><\/script>\n  </body>\n</html>`;
}

function updateEntryDev(code) {
  code = code.replace(/("|')@builder.io\/qwik("|')/g, `'${VITE_CLIENT_MODULE}'`);
  return code;
}

function getViteDevModule(opts) {
  const qwikLoader = JSON.stringify(opts.debug ? QWIK_LOADER_DEFAULT_DEBUG : QWIK_LOADER_DEFAULT_MINIFIED);
  return `// Qwik Vite Dev Module\nimport { render as qwikRender } from '@builder.io/qwik';\n\nexport function render(document, rootNode) {\n  const headNodes = [];\n  document.head.childNodes.forEach(n => headNodes.push(n));\n  document.head.textContent = '';\n\n  qwikRender(document, rootNode);\n\n  headNodes.forEach(n => document.head.appendChild(n));\n  \n  let qwikLoader = document.getElementById('qwikloader');\n  if (!qwikLoader) {\n    qwikLoader = document.createElement('script');\n    qwikLoader.id = 'qwikloader';\n    qwikLoader.innerHTML = ${qwikLoader};\n    document.head.appendChild(qwikLoader);\n  }\n\n  if (!window.__qwikViteLog) {\n    window.__qwikViteLog = true;\n    console.debug("%c⭐️ Qwik Dev Mode","background: #0c75d2; color: white; padding: 2px 3px; border-radius: 2px; font-size: 0.8em;","Do not use this mode in production!\\n - No portion of the application is pre-rendered on the server\\n - All of the application is running eagerly in the browser\\n - Optimizer/Serialization/Deserialization code is not exercised!");\n  }\n}`;
}

var VITE_CLIENT_MODULE = "@builder.io/qwik/vite-client";

var VITE_DEV_CLIENT_QS = "qwik-vite-dev-client";

var ENTRY_DEV_FILENAME_DEFAULT = "entry.dev.tsx";

export { createOptimizer, qwikRollup, qwikVite, versions };