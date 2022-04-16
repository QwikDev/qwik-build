/**
 * @license
 * @builder.io/qwik/optimizer
 * Copyright Builder.io, Inc. All Rights Reserved.
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/BuilderIO/qwik/blob/main/LICENSE
 */
var __defProp = Object.defineProperty;

var __export = (target, all) => {
  for (var name in all) {
    __defProp(target, name, {
      get: all[name],
      enumerable: true
    });
  }
};

var qDev = false !== globalThis.qDev;

var qTest = void 0 !== globalThis.describe;

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
  sys.dynamicImport = path => import(path);
  false;
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
  false;
  {
    const mjsWasmPath = sys.path.join("bindings", "qwik.wasm.mjs");
    const module = await sys.dynamicImport("./" + mjsWasmPath);
    await module.default();
    return module;
  }
}

function isNodeJs() {
  return "undefined" !== typeof process && process.versions && process.versions.node && "undefined" !== typeof global;
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

function getBuildFile(isSSR) {
  return `\nexport const isServer = ${isSSR};\nexport const isBrowser = ${!isSSR};\n`;
}

function removeQueryParams(id) {
  const [filteredId] = id.split("?");
  return filteredId;
}

function forceJSExtension(path, id) {
  const ext = path.extname(id);
  if ("" === ext) {
    return id + ".js";
  }
  if (EXTS[ext]) {
    return removeExtension(id) + ".js";
  }
  return id;
}

function removeExtension(id) {
  return id.split(".").slice(0, -1).join(".");
}

var EXTS = {
  ".jsx": true,
  ".ts": true,
  ".tsx": true
};

var QWIK_BUILD_ID = "@builder.io/qwik/build";

var QWIK_CORE_ID = "@builder.io/qwik";

var QWIK_JSX_RUNTIME_ID = "@builder.io/qwik/jsx-runtime";

var ENTRY_SERVER_DEFAULT = "/src/entry.server.tsx";

var MAIN_DEFAULT = "/src/main.tsx";

function qwikRollup(opts) {
  const ID = `${Math.round(8999 * Math.random()) + 1e3}`;
  const debug = !!opts.debug;
  const injections = [];
  const api = {
    debug: debug,
    entryStrategy: {
      type: "single",
      ...opts.entryStrategy
    },
    isBuild: true,
    isSSR: false,
    log: debug ? (...str) => {
      console.debug(`[QWIK PLUGIN: ${ID}]`, ...str);
    } : () => {},
    optimizer: null,
    outputCount: 0,
    results: new Map,
    transformedOutputs: new Map
  };
  api.log("New", opts);
  const createRollupError = (rootDir, diagnostic) => {
    var _a, _b;
    const loc = null != (_b = null == (_a = diagnostic.code_highlights[0]) ? void 0 : _a.loc) ? _b : {};
    const id = api.optimizer ? api.optimizer.sys.path.join(rootDir, diagnostic.origin) : diagnostic.origin;
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
  const rollupPlugin = {
    name: "rollup-plugin-qwik",
    api: api,
    options(inputOptions) {
      inputOptions.onwarn = (warning, warn) => {
        if ("typescript" === warning.plugin && warning.message.includes("outputToFilesystem")) {
          return;
        }
        warn(warning);
      };
      return inputOptions;
    },
    async buildStart() {
      if ("string" !== typeof opts.srcDir && !Array.isArray(opts.srcInputs)) {
        throw new Error('Qwik plugin must have either a "srcDir" or "srcInputs" option.');
      }
      if ("string" === typeof opts.srcDir && Array.isArray(opts.srcInputs)) {
        throw new Error('Qwik plugin cannot have both the "srcDir" and "srcInputs" options.');
      }
      api.optimizer || (api.optimizer = await createOptimizer());
      const isFullBuild = "hook" !== api.entryStrategy.type;
      api.log("buildStart()", isFullBuild ? "full build" : "isolated build");
      if (isFullBuild) {
        api.outputCount = 0;
        let rootDir = "/";
        "string" === typeof opts.srcDir ? rootDir = api.optimizer.sys.path.isAbsolute(opts.srcDir) ? opts.srcDir : api.optimizer.sys.path.resolve(opts.srcDir) : Array.isArray(opts.srcInputs) && (api.optimizer.sys.getInputFiles = async () => opts.srcInputs);
        const transformOpts = {
          rootDir: rootDir,
          entryStrategy: opts.entryStrategy,
          minify: opts.minify,
          transpile: true,
          explicityExtensions: true
        };
        const result = await api.optimizer.transformFs(transformOpts);
        for (const output of result.modules) {
          const key = api.optimizer.sys.path.join(rootDir, output.path);
          api.log("buildStart()", "qwik module", key);
          api.transformedOutputs.set(key, [ output, key ]);
        }
        handleDiagnostics(this, rootDir, result.diagnostics);
        api.results.set("@buildStart", result);
      }
    },
    async resolveId(originalID, importer) {
      api.log(`resolveId("${originalID}", "${importer}")`);
      if ((api.isBuild || "boolean" === typeof opts.ssrBuild) && originalID === QWIK_BUILD_ID) {
        api.log("resolveId()", "Resolved", QWIK_BUILD_ID);
        return {
          id: QWIK_BUILD_ID,
          moduleSideEffects: false
        };
      }
      api.optimizer || (api.optimizer = await createOptimizer());
      let id = removeQueryParams(originalID);
      if (importer) {
        const filteredImporter = removeQueryParams(importer);
        const dir = api.optimizer.sys.path.dirname(filteredImporter);
        id = filteredImporter.endsWith(".html") && !id.endsWith(".html") ? api.optimizer.sys.path.join(dir, id) : api.optimizer.sys.path.resolve(dir, id);
      }
      const tries = [ forceJSExtension(api.optimizer.sys.path, id) ];
      for (const tryId of tries) {
        api.log("resolveId()", "Try", tryId);
        const transformedOutput = api.transformedOutputs.get(tryId);
        if (transformedOutput) {
          api.log("resolveId()", "Resolved", tryId);
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
    async load(id) {
      api.log(`load("${id}")`);
      if (id === QWIK_BUILD_ID) {
        api.log("load()", QWIK_BUILD_ID, api.isSSR ? "ssr" : "client");
        return {
          code: getBuildFile(api.isSSR)
        };
      }
      api.optimizer || (api.optimizer = await createOptimizer());
      "hook" !== api.entryStrategy.type && (id = forceJSExtension(api.optimizer.sys.path, id));
      const transformedModule = api.transformedOutputs.get(id);
      if (transformedModule) {
        api.log("load()", "Found", id);
        return {
          code: transformedModule[0].code,
          map: transformedModule[0].map
        };
      }
    },
    async transform(code, id) {
      if ("hook" !== api.entryStrategy.type) {
        return null;
      }
      if (id.startsWith("\0")) {
        return null;
      }
      api.log(`transform("${id}")`);
      const pregenerated = api.transformedOutputs.get(id);
      if (pregenerated) {
        api.log("transform()", "addWatchFile", id, pregenerated[1]);
        this.addWatchFile(pregenerated[1]);
        return {
          meta: {
            hook: pregenerated[0].hook
          }
        };
      }
      api.optimizer || (api.optimizer = await createOptimizer());
      const filteredId = removeQueryParams(id);
      const {ext: ext, dir: dir, base: base} = api.optimizer.sys.path.parse(filteredId);
      if ([ ".tsx", ".ts", ".jsx" ].includes(ext)) {
        api.log("transform()", "Transforming", filteredId);
        const newOutput = api.optimizer.transformModulesSync({
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
        api.results.set(filteredId, newOutput);
        api.transformedOutputs.clear();
        for (const [id2, output] of api.results.entries()) {
          const justChanged = newOutput === output;
          const dir2 = api.optimizer.sys.path.dirname(id2);
          for (const mod of output.modules) {
            if (mod.isEntry) {
              const key = api.optimizer.sys.path.join(dir2, mod.path);
              api.transformedOutputs.set(key, [ mod, id2 ]);
              api.log("transform()", "emitting", justChanged, key);
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
      api.log("generateBundle()");
      const hooks = Array.from(api.results.values()).flatMap((r => r.modules)).map((mod => mod.hook)).filter((h => !!h));
      if (hooks.length > 0 && "es" === outputOpts.format && 0 === api.outputCount && !api.isSSR) {
        api.outputCount++;
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
        api.log("generateBundle()", outputEntryMap);
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
  return rollupPlugin;
}

function qwikVite(opts) {
  const rollupPlugin = qwikRollup(opts);
  const api = rollupPlugin.api;
  const vitePlugin = {
    ...rollupPlugin,
    name: "vite-plugin-qwik",
    enforce: "pre",
    async config(config, {command: command}) {
      api.optimizer || (api.optimizer = await createOptimizer());
      if ("serve" === command) {
        api.isBuild = false;
        api.entryStrategy = {
          type: "hook"
        };
        config.ssr && (config.ssr.noExternal = false);
      }
      "build" === command && fixSSRInput(config, api.optimizer);
      api.log("vite command", command);
      return {
        esbuild: {
          include: /\.js$/
        },
        optimizeDeps: {
          include: [ QWIK_CORE_ID, QWIK_JSX_RUNTIME_ID ]
        },
        build: {
          polyfillModulePreload: false,
          dynamicImportVarsOptions: {
            exclude: [ /./ ]
          }
        }
      };
    },
    async resolveId(importee, importer, resolveOpts) {
      true === resolveOpts.ssr && (api.isSSR = true);
      return rollupPlugin.resolveId.call(this, importee, importer, resolveOpts);
    },
    configureServer(server) {
      var _a, _b, _c, _d;
      if (false === opts.ssr) {
        return;
      }
      const main = null != (_b = null == (_a = opts.ssr) ? void 0 : _a.main) ? _b : MAIN_DEFAULT;
      const entry = null != (_d = null == (_c = opts.ssr) ? void 0 : _c.entry) ? _d : ENTRY_SERVER_DEFAULT;
      api.log(`configureServer(), entry: ${entry}`);
      server.middlewares.use((async (req, res, next) => {
        var _a2;
        const url = req.originalUrl;
        const hasExtension = /\.[\w?=&]+$/.test(url);
        const isViteMod = url.startsWith("/@");
        const isVitePing = url.endsWith("__vite_ping");
        const skipSSR = url.includes("ssr=false");
        if (hasExtension || isViteMod || isVitePing || skipSSR) {
          next();
          return;
        }
        api.log(`handleSSR("${url}")`);
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
            api.log("handleSSR()", "symbols", symbols);
            const mainMod = await server.moduleGraph.getModuleByUrl(main);
            mainMod && mainMod.importedModules.forEach((moduleNode => {
              moduleNode.url.endsWith(".css") && symbols.injections.push({
                tag: "link",
                location: "head",
                attributes: {
                  rel: "stylesheet",
                  href: moduleNode.url
                }
              });
            }));
            const domain = "http://" + (null != (_a2 = req.headers.host) ? _a2 : "localhost");
            const renderToStringOpts = {
              url: new URL(url, domain),
              debug: true,
              symbols: symbols
            };
            const result = await render(renderToStringOpts);
            const html = await server.transformIndexHtml(url, result.html);
            res.setHeader("Content-Type", "text/html; charset=utf-8");
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
      if (false === opts.ssr) {
        return;
      }
      api.log("handleHotUpdate()", ctx);
      if (ctx.file.endsWith(".css")) {
        api.log("handleHotUpdate()", "force css reload");
        ctx.server.ws.send({
          type: "full-reload"
        });
        return [];
      }
    }
  };
  return vitePlugin;
}

function fixSSRInput(config, optimizer) {
  var _a, _b;
  if ("string" === typeof (null == (_a = null == config ? void 0 : config.build) ? void 0 : _a.ssr) && (null == (_b = null == config ? void 0 : config.build.rollupOptions) ? void 0 : _b.input)) {
    const cwd = "undefined" !== typeof process && "function" === typeof process.cwd ? process.cwd() : "/";
    const resolvedRoot = optimizer.sys.path.normalize(slash(config.root ? optimizer.sys.path.resolve(config.root) : cwd));
    config.build.rollupOptions.input = optimizer.sys.path.resolve(resolvedRoot, config.build.ssr);
  }
}

function slash(p) {
  return p.replace(/\\/g, "/");
}

export { createOptimizer, qwikRollup, qwikVite, versions };