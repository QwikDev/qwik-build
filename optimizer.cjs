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

var __markAsModule = target => __defProp(target, "__esModule", {
  value: true
});

var __export = (target, all) => {
  for (var name in all) {
    __defProp(target, name, {
      get: all[name],
      enumerable: true
    });
  }
};

var __reExport = (target, module2, copyDefault, desc) => {
  if (module2 && "object" === typeof module2 || "function" === typeof module2) {
    for (let key of __getOwnPropNames(module2)) {
      __hasOwnProp.call(target, key) || !copyDefault && "default" === key || __defProp(target, key, {
        get: () => module2[key],
        enumerable: !(desc = __getOwnPropDesc(module2, key)) || desc.enumerable
      });
    }
  }
  return target;
};

var __toCommonJS = (cache => (module2, temp) => cache && cache.get(module2) || (temp = __reExport(__markAsModule({}), module2, 1), 
cache && cache.set(module2, temp), temp))("undefined" !== typeof WeakMap ? new WeakMap : 0);

var src_exports = {};

__export(src_exports, {
  createOptimizer: () => createOptimizer,
  qwikRollup: () => qwikRollup,
  qwikVite: () => qwikVite,
  versions: () => versions
});

var qDev = false !== globalThis.qDev;

var qTest = void 0 !== globalThis.describe;

var STYLE = qDev ? "background: #564CE0; color: white; padding: 2px 3px; border-radius: 2px; font-size: 0.8em;" : "";

var logWarn = (message, ...optionalParams) => {
  console.warn("%cQWIK", STYLE, message, ...optionalParams);
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
      void 0 === cwd && (cwd = process.cwd());
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

async function getSystem() {
  const sys = {};
  sys.path = path_exports;
  false;
  if ("undefined" !== typeof process && process.versions && process.versions.node && "undefined" !== typeof global) {
    sys.isNode = true;
    sys.arch = process.arch;
    sys.platform = process.platform;
  }
  if (sys.isNode) {
    sys.dynamicImport = path => require(path);
    "undefined" === typeof globalThis && (global.globalThis = global);
    if ("undefined" === typeof TextEncoder) {
      const nodeUtil = sys.dynamicImport("util");
      global.TextEncoder = nodeUtil.TextEncoder;
      global.TextDecoder = nodeUtil.TextDecoder;
    }
  }
  if (sys.isNode) {
    sys.fs = await sys.dynamicImport("fs");
    sys.path = await sys.dynamicImport("path");
  }
  sys.binding = await loadPlatformBinding(sys);
  return sys;
}

async function loadPlatformBinding(sys) {
  if (sys.isNode) {
    const platform = QWIK_BINDING_MAP[sys.platform];
    if (platform) {
      const triples = platform[sys.arch];
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
  {
    const cjsWasmPath = sys.path.join("bindings", "qwik.wasm.cjs");
    const mod = await sys.dynamicImport("./" + cjsWasmPath);
    return new Promise(((resolve3, reject) => {
      sys.fs.readFile(sys.path.join(__dirname, "bindings", "qwik_wasm_bg.wasm"), void 0, ((err, data) => {
        null != err ? reject(err) : resolve3(data);
      }));
    })).then((data => WebAssembly.compile(data))).then((module2 => mod.default(module2))).then((() => mod));
  }
}

var createOptimizer = async () => {
  const sys = await getSystem();
  const binding = sys.binding;
  return {
    async transformModules(opts) {
      const result = transformModules(binding, opts);
      return result;
    },
    transformModulesSync(opts) {
      const result = transformModules(binding, opts);
      return result;
    },
    async transformFs(opts) {
      const result = await transformFsAsync(sys, binding, opts);
      return result;
    },
    transformFsSync(opts) {
      const result = transformFs(binding, opts);
      return result;
    },
    path: sys.path
  };
};

var transformModules = (binding, opts) => binding.transform_modules(convertOptions(opts));

var transformFs = (binding, opts) => {
  if (binding.transform_fs) {
    return binding.transform_fs(convertOptions(opts));
  }
  throw new Error("not implemented");
};

var transformFsAsync = (sys, binding, opts) => {
  if (binding.transform_fs) {
    return binding.transform_fs(convertOptions(opts));
  }
  return transformFsVirtual(sys, opts);
};

var transformFsVirtual = async (sys, opts) => {
  const extensions = [ ".js", ".ts", ".tsx", ".jsx" ];
  async function getFiles(dir) {
    const subdirs = await readDir(sys, dir);
    const files2 = await Promise.all(subdirs.map((async subdir => {
      const res = sys.path.resolve(dir, subdir);
      const isDir = await isDirectory(sys, res);
      return isDir ? getFiles(res) : [ res ];
    })));
    const flatted = [];
    for (const file of files2) {
      flatted.push(...file);
    }
    return flatted.filter((a => extensions.includes(sys.path.extname(a))));
  }
  const files = await getFiles(opts.rootDir);
  const input = await Promise.all(files.map((async file => ({
    code: await readFile(sys, file),
    path: file.slice(opts.rootDir.length + 1)
  }))));
  const newOpts = {
    rootDir: opts.rootDir,
    entryStrategy: opts.entryStrategy,
    minify: opts.minify,
    sourceMaps: opts.sourceMaps,
    transpile: opts.transpile,
    input: input
  };
  return sys.binding.transform_modules(convertOptions(newOpts));
};

var readDir = (sys, dirPath) => new Promise(((resolve3, reject) => {
  sys.fs.readdir(dirPath, ((err, items) => {
    err ? reject(err) : resolve3(items);
  }));
}));

var readFile = (sys, filePath) => new Promise(((resolve3, reject) => {
  sys.fs.readFile(filePath, "utf-8", ((err, data) => {
    err ? reject(err) : resolve3(data);
  }));
}));

var isDirectory = (sys, path) => new Promise(((resolve3, reject) => {
  sys.fs.stat(path, ((err, stat) => {
    err ? reject(err) : resolve3(stat.isDirectory());
  }));
}));

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

var QWIK_BUILD = "@builder.io/qwik/build";

function qwikVite(opts) {
  var _a, _b, _c, _d;
  const plugin = qwikRollup(opts);
  if (false !== opts.ssr) {
    const entry = null != (_b = null == (_a = opts.ssr) ? void 0 : _a.entry) ? _b : "/src/entry.server.tsx";
    const main = null != (_d = null == (_c = opts.ssr) ? void 0 : _c.main) ? _d : "/src/main.tsx";
    Object.assign(plugin, {
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
    const id = optimizer.path.join(rootDir, diagnostic.origin);
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
    config(config, {command: command}) {
      if ("serve" === command) {
        isBuild = false;
        entryStrategy = {
          type: "hook"
        };
        config.ssr && (config.ssr.noExternal = false);
      }
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
    transformIndexHtml(_, ctx) {
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
    },
    async buildStart() {
      optimizer || (optimizer = await createOptimizer());
      const fullBuild = "hook" !== entryStrategy.type;
      log("buildStart()", fullBuild ? "full build" : "isolated build");
      if (fullBuild) {
        outputCount = 0;
        const rootDir = optimizer.path.isAbsolute(opts.srcDir) ? opts.srcDir : optimizer.path.resolve(opts.srcDir);
        const transformOpts = {
          rootDir: rootDir,
          entryStrategy: opts.entryStrategy,
          minify: opts.minify,
          transpile: true,
          explicityExtensions: true
        };
        const result = await optimizer.transformFs(transformOpts);
        for (const output of result.modules) {
          const key = optimizer.path.join(rootDir, output.path);
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
        const dir = optimizer.path.dirname(filteredImporter);
        id = filteredImporter.endsWith(".html") && !id.endsWith(".html") ? optimizer.path.join(dir, id) : optimizer.path.resolve(dir, id);
      }
      const tries = [ forceJSExtension(optimizer.path, id) ];
      for (const id2 of tries) {
        log("resolveId()", "Try", id2);
        const res = transformedOutputs.get(id2);
        if (res) {
          log("resolveId()", "Resolved", id2);
          const mod = res[0];
          const sideEffects = !mod.isEntry || !mod.hook;
          return {
            id: id2,
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
      "hook" !== entryStrategy.type && (id = forceJSExtension(optimizer.path, id));
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
      const {ext: ext, dir: dir, base: base} = optimizer.path.parse(filteredId);
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
          const dir2 = optimizer.path.dirname(id2);
          for (const mod of output.modules) {
            if (mod.isEntry) {
              const key = optimizer.path.join(dir2, mod.path);
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

var versions = {
  qwik: "0.0.18-0-dev20220311014644"
};

module.exports = __toCommonJS(src_exports);