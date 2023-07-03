/**
 * @license
 * @builder.io/qwik/cli 1.2.4
 * Copyright Builder.io, Inc. All Rights Reserved.
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/BuilderIO/qwik/blob/main/LICENSE
 */
"use strict";
var __create = Object.create;
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __getProtoOf = Object.getPrototypeOf;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __commonJS = (cb, mod) => function __require() {
  return mod || (0, cb[__getOwnPropNames(cb)[0]])((mod = { exports: {} }).exports, mod), mod.exports;
};
var __export = (target, all) => {
  for (var name in all)
    __defProp(target, name, { get: all[name], enumerable: true });
};
var __copyProps = (to, from, except, desc) => {
  if (from && typeof from === "object" || typeof from === "function") {
    for (let key of __getOwnPropNames(from))
      if (!__hasOwnProp.call(to, key) && key !== except)
        __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
  }
  return to;
};
var __toESM = (mod, isNodeMode, target) => (target = mod != null ? __create(__getProtoOf(mod)) : {}, __copyProps(
  // If the importer is in node compatibility mode or this is not an ESM
  // file that has been converted to a CommonJS file using a Babel-
  // compatible transform (i.e. "__esModule" has not been set), then set
  // "default" to the CommonJS "module.exports" for node compatibility.
  isNodeMode || !mod || !mod.__esModule ? __defProp(target, "default", { value: mod, enumerable: true }) : target,
  mod
));
var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);

// node_modules/.pnpm/sisteransi@1.0.5/node_modules/sisteransi/src/index.js
var require_src = __commonJS({
  "node_modules/.pnpm/sisteransi@1.0.5/node_modules/sisteransi/src/index.js"(exports, module2) {
    "use strict";
    var ESC = "\x1B";
    var CSI = `${ESC}[`;
    var beep = "\x07";
    var cursor = {
      to(x2, y3) {
        if (!y3)
          return `${CSI}${x2 + 1}G`;
        return `${CSI}${y3 + 1};${x2 + 1}H`;
      },
      move(x2, y3) {
        let ret = "";
        if (x2 < 0)
          ret += `${CSI}${-x2}D`;
        else if (x2 > 0)
          ret += `${CSI}${x2}C`;
        if (y3 < 0)
          ret += `${CSI}${-y3}A`;
        else if (y3 > 0)
          ret += `${CSI}${y3}B`;
        return ret;
      },
      up: (count = 1) => `${CSI}${count}A`,
      down: (count = 1) => `${CSI}${count}B`,
      forward: (count = 1) => `${CSI}${count}C`,
      backward: (count = 1) => `${CSI}${count}D`,
      nextLine: (count = 1) => `${CSI}E`.repeat(count),
      prevLine: (count = 1) => `${CSI}F`.repeat(count),
      left: `${CSI}G`,
      hide: `${CSI}?25l`,
      show: `${CSI}?25h`,
      save: `${ESC}7`,
      restore: `${ESC}8`
    };
    var scroll = {
      up: (count = 1) => `${CSI}S`.repeat(count),
      down: (count = 1) => `${CSI}T`.repeat(count)
    };
    var erase = {
      screen: `${CSI}2J`,
      up: (count = 1) => `${CSI}1J`.repeat(count),
      down: (count = 1) => `${CSI}J`.repeat(count),
      line: `${CSI}2K`,
      lineEnd: `${CSI}K`,
      lineStart: `${CSI}1K`,
      lines(count) {
        let clear = "";
        for (let i = 0; i < count; i++)
          clear += this.line + (i < count - 1 ? cursor.up() : "");
        if (count)
          clear += cursor.left;
        return clear;
      }
    };
    module2.exports = { cursor, scroll, erase, beep };
  }
});

// node_modules/.pnpm/picocolors@1.0.0/node_modules/picocolors/picocolors.js
var require_picocolors = __commonJS({
  "node_modules/.pnpm/picocolors@1.0.0/node_modules/picocolors/picocolors.js"(exports, module2) {
    var tty = require("tty");
    var isColorSupported = !("NO_COLOR" in process.env || process.argv.includes("--no-color")) && ("FORCE_COLOR" in process.env || process.argv.includes("--color") || process.platform === "win32" || tty.isatty(1) && process.env.TERM !== "dumb" || "CI" in process.env);
    var formatter = (open, close, replace = open) => (input) => {
      let string = "" + input;
      let index = string.indexOf(close, open.length);
      return ~index ? open + replaceClose(string, close, replace, index) + close : open + string + close;
    };
    var replaceClose = (string, close, replace, index) => {
      let start = string.substring(0, index) + replace;
      let end = string.substring(index + close.length);
      let nextIndex = end.indexOf(close);
      return ~nextIndex ? start + replaceClose(end, close, replace, nextIndex) : start + end;
    };
    var createColors = (enabled = isColorSupported) => ({
      isColorSupported: enabled,
      reset: enabled ? (s) => `\x1B[0m${s}\x1B[0m` : String,
      bold: enabled ? formatter("\x1B[1m", "\x1B[22m", "\x1B[22m\x1B[1m") : String,
      dim: enabled ? formatter("\x1B[2m", "\x1B[22m", "\x1B[22m\x1B[2m") : String,
      italic: enabled ? formatter("\x1B[3m", "\x1B[23m") : String,
      underline: enabled ? formatter("\x1B[4m", "\x1B[24m") : String,
      inverse: enabled ? formatter("\x1B[7m", "\x1B[27m") : String,
      hidden: enabled ? formatter("\x1B[8m", "\x1B[28m") : String,
      strikethrough: enabled ? formatter("\x1B[9m", "\x1B[29m") : String,
      black: enabled ? formatter("\x1B[30m", "\x1B[39m") : String,
      red: enabled ? formatter("\x1B[31m", "\x1B[39m") : String,
      green: enabled ? formatter("\x1B[32m", "\x1B[39m") : String,
      yellow: enabled ? formatter("\x1B[33m", "\x1B[39m") : String,
      blue: enabled ? formatter("\x1B[34m", "\x1B[39m") : String,
      magenta: enabled ? formatter("\x1B[35m", "\x1B[39m") : String,
      cyan: enabled ? formatter("\x1B[36m", "\x1B[39m") : String,
      white: enabled ? formatter("\x1B[37m", "\x1B[39m") : String,
      gray: enabled ? formatter("\x1B[90m", "\x1B[39m") : String,
      bgBlack: enabled ? formatter("\x1B[40m", "\x1B[49m") : String,
      bgRed: enabled ? formatter("\x1B[41m", "\x1B[49m") : String,
      bgGreen: enabled ? formatter("\x1B[42m", "\x1B[49m") : String,
      bgYellow: enabled ? formatter("\x1B[43m", "\x1B[49m") : String,
      bgBlue: enabled ? formatter("\x1B[44m", "\x1B[49m") : String,
      bgMagenta: enabled ? formatter("\x1B[45m", "\x1B[49m") : String,
      bgCyan: enabled ? formatter("\x1B[46m", "\x1B[49m") : String,
      bgWhite: enabled ? formatter("\x1B[47m", "\x1B[49m") : String
    });
    module2.exports = createColors();
    module2.exports.createColors = createColors;
  }
});

// node_modules/.pnpm/isexe@2.0.0/node_modules/isexe/windows.js
var require_windows = __commonJS({
  "node_modules/.pnpm/isexe@2.0.0/node_modules/isexe/windows.js"(exports, module2) {
    module2.exports = isexe;
    isexe.sync = sync;
    var fs8 = require("fs");
    function checkPathExt(path3, options) {
      var pathext = options.pathExt !== void 0 ? options.pathExt : process.env.PATHEXT;
      if (!pathext) {
        return true;
      }
      pathext = pathext.split(";");
      if (pathext.indexOf("") !== -1) {
        return true;
      }
      for (var i = 0; i < pathext.length; i++) {
        var p3 = pathext[i].toLowerCase();
        if (p3 && path3.substr(-p3.length).toLowerCase() === p3) {
          return true;
        }
      }
      return false;
    }
    function checkStat(stat, path3, options) {
      if (!stat.isSymbolicLink() && !stat.isFile()) {
        return false;
      }
      return checkPathExt(path3, options);
    }
    function isexe(path3, options, cb) {
      fs8.stat(path3, function(er, stat) {
        cb(er, er ? false : checkStat(stat, path3, options));
      });
    }
    function sync(path3, options) {
      return checkStat(fs8.statSync(path3), path3, options);
    }
  }
});

// node_modules/.pnpm/isexe@2.0.0/node_modules/isexe/mode.js
var require_mode = __commonJS({
  "node_modules/.pnpm/isexe@2.0.0/node_modules/isexe/mode.js"(exports, module2) {
    module2.exports = isexe;
    isexe.sync = sync;
    var fs8 = require("fs");
    function isexe(path3, options, cb) {
      fs8.stat(path3, function(er, stat) {
        cb(er, er ? false : checkStat(stat, options));
      });
    }
    function sync(path3, options) {
      return checkStat(fs8.statSync(path3), options);
    }
    function checkStat(stat, options) {
      return stat.isFile() && checkMode(stat, options);
    }
    function checkMode(stat, options) {
      var mod = stat.mode;
      var uid = stat.uid;
      var gid = stat.gid;
      var myUid = options.uid !== void 0 ? options.uid : process.getuid && process.getuid();
      var myGid = options.gid !== void 0 ? options.gid : process.getgid && process.getgid();
      var u2 = parseInt("100", 8);
      var g3 = parseInt("010", 8);
      var o2 = parseInt("001", 8);
      var ug = u2 | g3;
      var ret = mod & o2 || mod & g3 && gid === myGid || mod & u2 && uid === myUid || mod & ug && myUid === 0;
      return ret;
    }
  }
});

// node_modules/.pnpm/isexe@2.0.0/node_modules/isexe/index.js
var require_isexe = __commonJS({
  "node_modules/.pnpm/isexe@2.0.0/node_modules/isexe/index.js"(exports, module2) {
    var fs8 = require("fs");
    var core;
    if (process.platform === "win32" || global.TESTING_WINDOWS) {
      core = require_windows();
    } else {
      core = require_mode();
    }
    module2.exports = isexe;
    isexe.sync = sync;
    function isexe(path3, options, cb) {
      if (typeof options === "function") {
        cb = options;
        options = {};
      }
      if (!cb) {
        if (typeof Promise !== "function") {
          throw new TypeError("callback not provided");
        }
        return new Promise(function(resolve2, reject) {
          isexe(path3, options || {}, function(er, is) {
            if (er) {
              reject(er);
            } else {
              resolve2(is);
            }
          });
        });
      }
      core(path3, options || {}, function(er, is) {
        if (er) {
          if (er.code === "EACCES" || options && options.ignoreErrors) {
            er = null;
            is = false;
          }
        }
        cb(er, is);
      });
    }
    function sync(path3, options) {
      try {
        return core.sync(path3, options || {});
      } catch (er) {
        if (options && options.ignoreErrors || er.code === "EACCES") {
          return false;
        } else {
          throw er;
        }
      }
    }
  }
});

// node_modules/.pnpm/which@2.0.2/node_modules/which/which.js
var require_which = __commonJS({
  "node_modules/.pnpm/which@2.0.2/node_modules/which/which.js"(exports, module2) {
    var isWindows = process.platform === "win32" || process.env.OSTYPE === "cygwin" || process.env.OSTYPE === "msys";
    var path3 = require("path");
    var COLON = isWindows ? ";" : ":";
    var isexe = require_isexe();
    var getNotFoundError = (cmd) => Object.assign(new Error(`not found: ${cmd}`), { code: "ENOENT" });
    var getPathInfo = (cmd, opt) => {
      const colon = opt.colon || COLON;
      const pathEnv = cmd.match(/\//) || isWindows && cmd.match(/\\/) ? [""] : [
        // windows always checks the cwd first
        ...isWindows ? [process.cwd()] : [],
        ...(opt.path || process.env.PATH || /* istanbul ignore next: very unusual */
        "").split(colon)
      ];
      const pathExtExe = isWindows ? opt.pathExt || process.env.PATHEXT || ".EXE;.CMD;.BAT;.COM" : "";
      const pathExt = isWindows ? pathExtExe.split(colon) : [""];
      if (isWindows) {
        if (cmd.indexOf(".") !== -1 && pathExt[0] !== "")
          pathExt.unshift("");
      }
      return {
        pathEnv,
        pathExt,
        pathExtExe
      };
    };
    var which = (cmd, opt, cb) => {
      if (typeof opt === "function") {
        cb = opt;
        opt = {};
      }
      if (!opt)
        opt = {};
      const { pathEnv, pathExt, pathExtExe } = getPathInfo(cmd, opt);
      const found = [];
      const step = (i) => new Promise((resolve2, reject) => {
        if (i === pathEnv.length)
          return opt.all && found.length ? resolve2(found) : reject(getNotFoundError(cmd));
        const ppRaw = pathEnv[i];
        const pathPart = /^".*"$/.test(ppRaw) ? ppRaw.slice(1, -1) : ppRaw;
        const pCmd = path3.join(pathPart, cmd);
        const p3 = !pathPart && /^\.[\\\/]/.test(cmd) ? cmd.slice(0, 2) + pCmd : pCmd;
        resolve2(subStep(p3, i, 0));
      });
      const subStep = (p3, i, ii) => new Promise((resolve2, reject) => {
        if (ii === pathExt.length)
          return resolve2(step(i + 1));
        const ext = pathExt[ii];
        isexe(p3 + ext, { pathExt: pathExtExe }, (er, is) => {
          if (!er && is) {
            if (opt.all)
              found.push(p3 + ext);
            else
              return resolve2(p3 + ext);
          }
          return resolve2(subStep(p3, i, ii + 1));
        });
      });
      return cb ? step(0).then((res) => cb(null, res), cb) : step(0);
    };
    var whichSync = (cmd, opt) => {
      opt = opt || {};
      const { pathEnv, pathExt, pathExtExe } = getPathInfo(cmd, opt);
      const found = [];
      for (let i = 0; i < pathEnv.length; i++) {
        const ppRaw = pathEnv[i];
        const pathPart = /^".*"$/.test(ppRaw) ? ppRaw.slice(1, -1) : ppRaw;
        const pCmd = path3.join(pathPart, cmd);
        const p3 = !pathPart && /^\.[\\\/]/.test(cmd) ? cmd.slice(0, 2) + pCmd : pCmd;
        for (let j2 = 0; j2 < pathExt.length; j2++) {
          const cur = p3 + pathExt[j2];
          try {
            const is = isexe.sync(cur, { pathExt: pathExtExe });
            if (is) {
              if (opt.all)
                found.push(cur);
              else
                return cur;
            }
          } catch (ex) {
          }
        }
      }
      if (opt.all && found.length)
        return found;
      if (opt.nothrow)
        return null;
      throw getNotFoundError(cmd);
    };
    module2.exports = which;
    which.sync = whichSync;
  }
});

// node_modules/.pnpm/path-key@3.1.1/node_modules/path-key/index.js
var require_path_key = __commonJS({
  "node_modules/.pnpm/path-key@3.1.1/node_modules/path-key/index.js"(exports, module2) {
    "use strict";
    var pathKey2 = (options = {}) => {
      const environment = options.env || process.env;
      const platform = options.platform || process.platform;
      if (platform !== "win32") {
        return "PATH";
      }
      return Object.keys(environment).reverse().find((key) => key.toUpperCase() === "PATH") || "Path";
    };
    module2.exports = pathKey2;
    module2.exports.default = pathKey2;
  }
});

// node_modules/.pnpm/cross-spawn@7.0.3/node_modules/cross-spawn/lib/util/resolveCommand.js
var require_resolveCommand = __commonJS({
  "node_modules/.pnpm/cross-spawn@7.0.3/node_modules/cross-spawn/lib/util/resolveCommand.js"(exports, module2) {
    "use strict";
    var path3 = require("path");
    var which = require_which();
    var getPathKey = require_path_key();
    function resolveCommandAttempt(parsed, withoutPathExt) {
      const env = parsed.options.env || process.env;
      const cwd = process.cwd();
      const hasCustomCwd = parsed.options.cwd != null;
      const shouldSwitchCwd = hasCustomCwd && process.chdir !== void 0 && !process.chdir.disabled;
      if (shouldSwitchCwd) {
        try {
          process.chdir(parsed.options.cwd);
        } catch (err) {
        }
      }
      let resolved;
      try {
        resolved = which.sync(parsed.command, {
          path: env[getPathKey({ env })],
          pathExt: withoutPathExt ? path3.delimiter : void 0
        });
      } catch (e2) {
      } finally {
        if (shouldSwitchCwd) {
          process.chdir(cwd);
        }
      }
      if (resolved) {
        resolved = path3.resolve(hasCustomCwd ? parsed.options.cwd : "", resolved);
      }
      return resolved;
    }
    function resolveCommand(parsed) {
      return resolveCommandAttempt(parsed) || resolveCommandAttempt(parsed, true);
    }
    module2.exports = resolveCommand;
  }
});

// node_modules/.pnpm/cross-spawn@7.0.3/node_modules/cross-spawn/lib/util/escape.js
var require_escape = __commonJS({
  "node_modules/.pnpm/cross-spawn@7.0.3/node_modules/cross-spawn/lib/util/escape.js"(exports, module2) {
    "use strict";
    var metaCharsRegExp = /([()\][%!^"`<>&|;, *?])/g;
    function escapeCommand(arg) {
      arg = arg.replace(metaCharsRegExp, "^$1");
      return arg;
    }
    function escapeArgument(arg, doubleEscapeMetaChars) {
      arg = `${arg}`;
      arg = arg.replace(/(\\*)"/g, '$1$1\\"');
      arg = arg.replace(/(\\*)$/, "$1$1");
      arg = `"${arg}"`;
      arg = arg.replace(metaCharsRegExp, "^$1");
      if (doubleEscapeMetaChars) {
        arg = arg.replace(metaCharsRegExp, "^$1");
      }
      return arg;
    }
    module2.exports.command = escapeCommand;
    module2.exports.argument = escapeArgument;
  }
});

// node_modules/.pnpm/shebang-regex@3.0.0/node_modules/shebang-regex/index.js
var require_shebang_regex = __commonJS({
  "node_modules/.pnpm/shebang-regex@3.0.0/node_modules/shebang-regex/index.js"(exports, module2) {
    "use strict";
    module2.exports = /^#!(.*)/;
  }
});

// node_modules/.pnpm/shebang-command@2.0.0/node_modules/shebang-command/index.js
var require_shebang_command = __commonJS({
  "node_modules/.pnpm/shebang-command@2.0.0/node_modules/shebang-command/index.js"(exports, module2) {
    "use strict";
    var shebangRegex = require_shebang_regex();
    module2.exports = (string = "") => {
      const match = string.match(shebangRegex);
      if (!match) {
        return null;
      }
      const [path3, argument] = match[0].replace(/#! ?/, "").split(" ");
      const binary = path3.split("/").pop();
      if (binary === "env") {
        return argument;
      }
      return argument ? `${binary} ${argument}` : binary;
    };
  }
});

// node_modules/.pnpm/cross-spawn@7.0.3/node_modules/cross-spawn/lib/util/readShebang.js
var require_readShebang = __commonJS({
  "node_modules/.pnpm/cross-spawn@7.0.3/node_modules/cross-spawn/lib/util/readShebang.js"(exports, module2) {
    "use strict";
    var fs8 = require("fs");
    var shebangCommand = require_shebang_command();
    function readShebang(command) {
      const size = 150;
      const buffer = Buffer.alloc(size);
      let fd;
      try {
        fd = fs8.openSync(command, "r");
        fs8.readSync(fd, buffer, 0, size, 0);
        fs8.closeSync(fd);
      } catch (e2) {
      }
      return shebangCommand(buffer.toString());
    }
    module2.exports = readShebang;
  }
});

// node_modules/.pnpm/cross-spawn@7.0.3/node_modules/cross-spawn/lib/parse.js
var require_parse = __commonJS({
  "node_modules/.pnpm/cross-spawn@7.0.3/node_modules/cross-spawn/lib/parse.js"(exports, module2) {
    "use strict";
    var path3 = require("path");
    var resolveCommand = require_resolveCommand();
    var escape = require_escape();
    var readShebang = require_readShebang();
    var isWin = process.platform === "win32";
    var isExecutableRegExp = /\.(?:com|exe)$/i;
    var isCmdShimRegExp = /node_modules[\\/].bin[\\/][^\\/]+\.cmd$/i;
    function detectShebang(parsed) {
      parsed.file = resolveCommand(parsed);
      const shebang = parsed.file && readShebang(parsed.file);
      if (shebang) {
        parsed.args.unshift(parsed.file);
        parsed.command = shebang;
        return resolveCommand(parsed);
      }
      return parsed.file;
    }
    function parseNonShell(parsed) {
      if (!isWin) {
        return parsed;
      }
      const commandFile = detectShebang(parsed);
      const needsShell = !isExecutableRegExp.test(commandFile);
      if (parsed.options.forceShell || needsShell) {
        const needsDoubleEscapeMetaChars = isCmdShimRegExp.test(commandFile);
        parsed.command = path3.normalize(parsed.command);
        parsed.command = escape.command(parsed.command);
        parsed.args = parsed.args.map((arg) => escape.argument(arg, needsDoubleEscapeMetaChars));
        const shellCommand = [parsed.command].concat(parsed.args).join(" ");
        parsed.args = ["/d", "/s", "/c", `"${shellCommand}"`];
        parsed.command = process.env.comspec || "cmd.exe";
        parsed.options.windowsVerbatimArguments = true;
      }
      return parsed;
    }
    function parse(command, args, options) {
      if (args && !Array.isArray(args)) {
        options = args;
        args = null;
      }
      args = args ? args.slice(0) : [];
      options = Object.assign({}, options);
      const parsed = {
        command,
        args,
        options,
        file: void 0,
        original: {
          command,
          args
        }
      };
      return options.shell ? parsed : parseNonShell(parsed);
    }
    module2.exports = parse;
  }
});

// node_modules/.pnpm/cross-spawn@7.0.3/node_modules/cross-spawn/lib/enoent.js
var require_enoent = __commonJS({
  "node_modules/.pnpm/cross-spawn@7.0.3/node_modules/cross-spawn/lib/enoent.js"(exports, module2) {
    "use strict";
    var isWin = process.platform === "win32";
    function notFoundError(original, syscall) {
      return Object.assign(new Error(`${syscall} ${original.command} ENOENT`), {
        code: "ENOENT",
        errno: "ENOENT",
        syscall: `${syscall} ${original.command}`,
        path: original.command,
        spawnargs: original.args
      });
    }
    function hookChildProcess(cp, parsed) {
      if (!isWin) {
        return;
      }
      const originalEmit = cp.emit;
      cp.emit = function(name, arg1) {
        if (name === "exit") {
          const err = verifyENOENT(arg1, parsed, "spawn");
          if (err) {
            return originalEmit.call(cp, "error", err);
          }
        }
        return originalEmit.apply(cp, arguments);
      };
    }
    function verifyENOENT(status, parsed) {
      if (isWin && status === 1 && !parsed.file) {
        return notFoundError(parsed.original, "spawn");
      }
      return null;
    }
    function verifyENOENTSync(status, parsed) {
      if (isWin && status === 1 && !parsed.file) {
        return notFoundError(parsed.original, "spawnSync");
      }
      return null;
    }
    module2.exports = {
      hookChildProcess,
      verifyENOENT,
      verifyENOENTSync,
      notFoundError
    };
  }
});

// node_modules/.pnpm/cross-spawn@7.0.3/node_modules/cross-spawn/index.js
var require_cross_spawn = __commonJS({
  "node_modules/.pnpm/cross-spawn@7.0.3/node_modules/cross-spawn/index.js"(exports, module2) {
    "use strict";
    var cp = require("child_process");
    var parse = require_parse();
    var enoent = require_enoent();
    function spawn2(command, args, options) {
      const parsed = parse(command, args, options);
      const spawned = cp.spawn(parsed.command, parsed.args, parsed.options);
      enoent.hookChildProcess(spawned, parsed);
      return spawned;
    }
    function spawnSync(command, args, options) {
      const parsed = parse(command, args, options);
      const result = cp.spawnSync(parsed.command, parsed.args, parsed.options);
      result.error = result.error || enoent.verifyENOENTSync(result.status, parsed);
      return result;
    }
    module2.exports = spawn2;
    module2.exports.spawn = spawn2;
    module2.exports.sync = spawnSync;
    module2.exports._parse = parse;
    module2.exports._enoent = enoent;
  }
});

// node_modules/.pnpm/which-pm-runs@1.1.0/node_modules/which-pm-runs/index.js
var require_which_pm_runs = __commonJS({
  "node_modules/.pnpm/which-pm-runs@1.1.0/node_modules/which-pm-runs/index.js"(exports, module2) {
    "use strict";
    module2.exports = function() {
      if (!process.env.npm_config_user_agent) {
        return void 0;
      }
      return pmFromUserAgent(process.env.npm_config_user_agent);
    };
    function pmFromUserAgent(userAgent) {
      const pmSpec = userAgent.split(" ")[0];
      const separatorPos = pmSpec.lastIndexOf("/");
      const name = pmSpec.substring(0, separatorPos);
      return {
        name: name === "npminstall" ? "cnpm" : name,
        version: pmSpec.substring(separatorPos + 1)
      };
    }
  }
});

// node_modules/.pnpm/signal-exit@3.0.7/node_modules/signal-exit/signals.js
var require_signals = __commonJS({
  "node_modules/.pnpm/signal-exit@3.0.7/node_modules/signal-exit/signals.js"(exports, module2) {
    module2.exports = [
      "SIGABRT",
      "SIGALRM",
      "SIGHUP",
      "SIGINT",
      "SIGTERM"
    ];
    if (process.platform !== "win32") {
      module2.exports.push(
        "SIGVTALRM",
        "SIGXCPU",
        "SIGXFSZ",
        "SIGUSR2",
        "SIGTRAP",
        "SIGSYS",
        "SIGQUIT",
        "SIGIOT"
        // should detect profiler and enable/disable accordingly.
        // see #21
        // 'SIGPROF'
      );
    }
    if (process.platform === "linux") {
      module2.exports.push(
        "SIGIO",
        "SIGPOLL",
        "SIGPWR",
        "SIGSTKFLT",
        "SIGUNUSED"
      );
    }
  }
});

// node_modules/.pnpm/signal-exit@3.0.7/node_modules/signal-exit/index.js
var require_signal_exit = __commonJS({
  "node_modules/.pnpm/signal-exit@3.0.7/node_modules/signal-exit/index.js"(exports, module2) {
    var process5 = global.process;
    var processOk = function(process6) {
      return process6 && typeof process6 === "object" && typeof process6.removeListener === "function" && typeof process6.emit === "function" && typeof process6.reallyExit === "function" && typeof process6.listeners === "function" && typeof process6.kill === "function" && typeof process6.pid === "number" && typeof process6.on === "function";
    };
    if (!processOk(process5)) {
      module2.exports = function() {
        return function() {
        };
      };
    } else {
      assert = require("assert");
      signals = require_signals();
      isWin = /^win/i.test(process5.platform);
      EE = require("events");
      if (typeof EE !== "function") {
        EE = EE.EventEmitter;
      }
      if (process5.__signal_exit_emitter__) {
        emitter = process5.__signal_exit_emitter__;
      } else {
        emitter = process5.__signal_exit_emitter__ = new EE();
        emitter.count = 0;
        emitter.emitted = {};
      }
      if (!emitter.infinite) {
        emitter.setMaxListeners(Infinity);
        emitter.infinite = true;
      }
      module2.exports = function(cb, opts) {
        if (!processOk(global.process)) {
          return function() {
          };
        }
        assert.equal(typeof cb, "function", "a callback must be provided for exit handler");
        if (loaded === false) {
          load();
        }
        var ev = "exit";
        if (opts && opts.alwaysLast) {
          ev = "afterexit";
        }
        var remove = function() {
          emitter.removeListener(ev, cb);
          if (emitter.listeners("exit").length === 0 && emitter.listeners("afterexit").length === 0) {
            unload();
          }
        };
        emitter.on(ev, cb);
        return remove;
      };
      unload = function unload2() {
        if (!loaded || !processOk(global.process)) {
          return;
        }
        loaded = false;
        signals.forEach(function(sig) {
          try {
            process5.removeListener(sig, sigListeners[sig]);
          } catch (er) {
          }
        });
        process5.emit = originalProcessEmit;
        process5.reallyExit = originalProcessReallyExit;
        emitter.count -= 1;
      };
      module2.exports.unload = unload;
      emit = function emit2(event, code, signal) {
        if (emitter.emitted[event]) {
          return;
        }
        emitter.emitted[event] = true;
        emitter.emit(event, code, signal);
      };
      sigListeners = {};
      signals.forEach(function(sig) {
        sigListeners[sig] = function listener() {
          if (!processOk(global.process)) {
            return;
          }
          var listeners = process5.listeners(sig);
          if (listeners.length === emitter.count) {
            unload();
            emit("exit", null, sig);
            emit("afterexit", null, sig);
            if (isWin && sig === "SIGHUP") {
              sig = "SIGINT";
            }
            process5.kill(process5.pid, sig);
          }
        };
      });
      module2.exports.signals = function() {
        return signals;
      };
      loaded = false;
      load = function load2() {
        if (loaded || !processOk(global.process)) {
          return;
        }
        loaded = true;
        emitter.count += 1;
        signals = signals.filter(function(sig) {
          try {
            process5.on(sig, sigListeners[sig]);
            return true;
          } catch (er) {
            return false;
          }
        });
        process5.emit = processEmit;
        process5.reallyExit = processReallyExit;
      };
      module2.exports.load = load;
      originalProcessReallyExit = process5.reallyExit;
      processReallyExit = function processReallyExit2(code) {
        if (!processOk(global.process)) {
          return;
        }
        process5.exitCode = code || /* istanbul ignore next */
        0;
        emit("exit", process5.exitCode, null);
        emit("afterexit", process5.exitCode, null);
        originalProcessReallyExit.call(process5, process5.exitCode);
      };
      originalProcessEmit = process5.emit;
      processEmit = function processEmit2(ev, arg) {
        if (ev === "exit" && processOk(global.process)) {
          if (arg !== void 0) {
            process5.exitCode = arg;
          }
          var ret = originalProcessEmit.apply(this, arguments);
          emit("exit", process5.exitCode, null);
          emit("afterexit", process5.exitCode, null);
          return ret;
        } else {
          return originalProcessEmit.apply(this, arguments);
        }
      };
    }
    var assert;
    var signals;
    var isWin;
    var EE;
    var emitter;
    var unload;
    var emit;
    var sigListeners;
    var loaded;
    var load;
    var originalProcessReallyExit;
    var processReallyExit;
    var originalProcessEmit;
    var processEmit;
  }
});

// node_modules/.pnpm/get-stream@6.0.1/node_modules/get-stream/buffer-stream.js
var require_buffer_stream = __commonJS({
  "node_modules/.pnpm/get-stream@6.0.1/node_modules/get-stream/buffer-stream.js"(exports, module2) {
    "use strict";
    var { PassThrough: PassThroughStream } = require("stream");
    module2.exports = (options) => {
      options = { ...options };
      const { array } = options;
      let { encoding } = options;
      const isBuffer = encoding === "buffer";
      let objectMode = false;
      if (array) {
        objectMode = !(encoding || isBuffer);
      } else {
        encoding = encoding || "utf8";
      }
      if (isBuffer) {
        encoding = null;
      }
      const stream = new PassThroughStream({ objectMode });
      if (encoding) {
        stream.setEncoding(encoding);
      }
      let length = 0;
      const chunks = [];
      stream.on("data", (chunk) => {
        chunks.push(chunk);
        if (objectMode) {
          length = chunks.length;
        } else {
          length += chunk.length;
        }
      });
      stream.getBufferedValue = () => {
        if (array) {
          return chunks;
        }
        return isBuffer ? Buffer.concat(chunks, length) : chunks.join("");
      };
      stream.getBufferedLength = () => length;
      return stream;
    };
  }
});

// node_modules/.pnpm/get-stream@6.0.1/node_modules/get-stream/index.js
var require_get_stream = __commonJS({
  "node_modules/.pnpm/get-stream@6.0.1/node_modules/get-stream/index.js"(exports, module2) {
    "use strict";
    var { constants: BufferConstants } = require("buffer");
    var stream = require("stream");
    var { promisify } = require("util");
    var bufferStream = require_buffer_stream();
    var streamPipelinePromisified = promisify(stream.pipeline);
    var MaxBufferError = class extends Error {
      constructor() {
        super("maxBuffer exceeded");
        this.name = "MaxBufferError";
      }
    };
    async function getStream2(inputStream, options) {
      if (!inputStream) {
        throw new Error("Expected a stream");
      }
      options = {
        maxBuffer: Infinity,
        ...options
      };
      const { maxBuffer } = options;
      const stream2 = bufferStream(options);
      await new Promise((resolve2, reject) => {
        const rejectPromise = (error) => {
          if (error && stream2.getBufferedLength() <= BufferConstants.MAX_LENGTH) {
            error.bufferedData = stream2.getBufferedValue();
          }
          reject(error);
        };
        (async () => {
          try {
            await streamPipelinePromisified(inputStream, stream2);
            resolve2();
          } catch (error) {
            rejectPromise(error);
          }
        })();
        stream2.on("data", () => {
          if (stream2.getBufferedLength() > maxBuffer) {
            rejectPromise(new MaxBufferError());
          }
        });
      });
      return stream2.getBufferedValue();
    }
    module2.exports = getStream2;
    module2.exports.buffer = (stream2, options) => getStream2(stream2, { ...options, encoding: "buffer" });
    module2.exports.array = (stream2, options) => getStream2(stream2, { ...options, array: true });
    module2.exports.MaxBufferError = MaxBufferError;
  }
});

// node_modules/.pnpm/merge-stream@2.0.0/node_modules/merge-stream/index.js
var require_merge_stream = __commonJS({
  "node_modules/.pnpm/merge-stream@2.0.0/node_modules/merge-stream/index.js"(exports, module2) {
    "use strict";
    var { PassThrough } = require("stream");
    module2.exports = function() {
      var sources = [];
      var output = new PassThrough({ objectMode: true });
      output.setMaxListeners(0);
      output.add = add;
      output.isEmpty = isEmpty;
      output.on("unpipe", remove);
      Array.prototype.slice.call(arguments).forEach(add);
      return output;
      function add(source) {
        if (Array.isArray(source)) {
          source.forEach(add);
          return this;
        }
        sources.push(source);
        source.once("end", remove.bind(null, source));
        source.once("error", output.emit.bind(output, "error"));
        source.pipe(output, { end: false });
        return this;
      }
      function isEmpty() {
        return sources.length == 0;
      }
      function remove(source) {
        sources = sources.filter(function(it) {
          return it !== source;
        });
        if (!sources.length && output.readable) {
          output.end();
        }
      }
    };
  }
});

// packages/qwik/src/cli/index.ts
var cli_exports = {};
__export(cli_exports, {
  runCli: () => runCli,
  updateApp: () => updateApp
});
module.exports = __toCommonJS(cli_exports);

// node_modules/.pnpm/kleur@4.1.5/node_modules/kleur/colors.mjs
var FORCE_COLOR;
var NODE_DISABLE_COLORS;
var NO_COLOR;
var TERM;
var isTTY = true;
if (typeof process !== "undefined") {
  ({ FORCE_COLOR, NODE_DISABLE_COLORS, NO_COLOR, TERM } = process.env || {});
  isTTY = process.stdout && process.stdout.isTTY;
}
var $ = {
  enabled: !NODE_DISABLE_COLORS && NO_COLOR == null && TERM !== "dumb" && (FORCE_COLOR != null && FORCE_COLOR !== "0" || isTTY)
};
function init(x2, y3) {
  let rgx = new RegExp(`\\x1b\\[${y3}m`, "g");
  let open = `\x1B[${x2}m`, close = `\x1B[${y3}m`;
  return function(txt) {
    if (!$.enabled || txt == null)
      return txt;
    return open + (!!~("" + txt).indexOf(close) ? txt.replace(rgx, close + open) : txt) + close;
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

// packages/qwik/src/cli/utils/app-command.ts
var import_node_fs = require("fs");
var import_node_path = require("path");
var AppCommand = class {
  constructor(opts) {
    this._rootDir = opts.rootDir;
    this.cwd = opts.cwd;
    this.args = opts.args.slice();
    this.task = this.args[0];
  }
  get rootDir() {
    if (!this._rootDir) {
      const fsRoot = (0, import_node_path.resolve)("/");
      let testDir = process.cwd();
      for (let i = 0; i < 20; i++) {
        const pkgPath = (0, import_node_path.join)(testDir, "package.json");
        if ((0, import_node_fs.existsSync)(pkgPath)) {
          this._rootDir = testDir;
          break;
        }
        if (testDir === fsRoot) {
          break;
        }
        testDir = (0, import_node_path.dirname)(testDir);
      }
      if (!this._rootDir) {
        throw new Error(`Unable to find Qwik app package.json`);
      }
    }
    return this._rootDir;
  }
  set rootDir(rootDir) {
    this._rootDir = rootDir;
  }
  get packageJson() {
    if (!this._rootPkgJson) {
      const pkgJsonPath = (0, import_node_path.join)(this.rootDir, "package.json");
      this._rootPkgJson = JSON.parse((0, import_node_fs.readFileSync)(pkgJsonPath, "utf-8"));
    }
    return this._rootPkgJson;
  }
  getArg(name) {
    const key = `--${name}`;
    const matcher = new RegExp(`^${key}($|=)`);
    const index = this.args.findIndex((arg) => matcher.test(arg));
    if (index === -1) {
      return;
    }
    if (this.args[index].includes("=")) {
      return this.args[index].split("=")[1];
    }
    return this.args[index + 1];
  }
};

// packages/qwik/src/cli/utils/integrations.ts
var import_node_fs3 = __toESM(require("fs"), 1);
var import_node_path3 = require("path");

// packages/qwik/src/cli/utils/utils.ts
var import_node_fs2 = __toESM(require("fs"), 1);
var import_node_path2 = require("path");

// node_modules/.pnpm/@clack+core@0.3.2/node_modules/@clack/core/dist/index.mjs
var import_sisteransi = __toESM(require_src(), 1);
var import_node_process = require("process");
var f = __toESM(require("readline"), 1);
var import_node_readline = __toESM(require("readline"), 1);
var import_node_tty = require("tty");
var import_picocolors = __toESM(require_picocolors(), 1);
function z({ onlyFirst: t = false } = {}) {
  const u2 = ["[\\u001B\\u009B][[\\]()#;?]*(?:(?:(?:(?:;[-a-zA-Z\\d\\/#&.:=?%@~_]+)*|[a-zA-Z\\d]+(?:;[-a-zA-Z\\d\\/#&.:=?%@~_]*)*)?\\u0007)", "(?:(?:\\d{1,4}(?:;\\d{0,4})*)?[\\dA-PR-TZcf-ntqry=><~]))"].join("|");
  return new RegExp(u2, t ? void 0 : "g");
}
function $2(t) {
  if (typeof t != "string")
    throw new TypeError(`Expected a \`string\`, got \`${typeof t}\``);
  return t.replace(z(), "");
}
var m = {};
var G = { get exports() {
  return m;
}, set exports(t) {
  m = t;
} };
(function(t) {
  var u2 = {};
  t.exports = u2, u2.eastAsianWidth = function(e2) {
    var s = e2.charCodeAt(0), C2 = e2.length == 2 ? e2.charCodeAt(1) : 0, D2 = s;
    return 55296 <= s && s <= 56319 && 56320 <= C2 && C2 <= 57343 && (s &= 1023, C2 &= 1023, D2 = s << 10 | C2, D2 += 65536), D2 == 12288 || 65281 <= D2 && D2 <= 65376 || 65504 <= D2 && D2 <= 65510 ? "F" : D2 == 8361 || 65377 <= D2 && D2 <= 65470 || 65474 <= D2 && D2 <= 65479 || 65482 <= D2 && D2 <= 65487 || 65490 <= D2 && D2 <= 65495 || 65498 <= D2 && D2 <= 65500 || 65512 <= D2 && D2 <= 65518 ? "H" : 4352 <= D2 && D2 <= 4447 || 4515 <= D2 && D2 <= 4519 || 4602 <= D2 && D2 <= 4607 || 9001 <= D2 && D2 <= 9002 || 11904 <= D2 && D2 <= 11929 || 11931 <= D2 && D2 <= 12019 || 12032 <= D2 && D2 <= 12245 || 12272 <= D2 && D2 <= 12283 || 12289 <= D2 && D2 <= 12350 || 12353 <= D2 && D2 <= 12438 || 12441 <= D2 && D2 <= 12543 || 12549 <= D2 && D2 <= 12589 || 12593 <= D2 && D2 <= 12686 || 12688 <= D2 && D2 <= 12730 || 12736 <= D2 && D2 <= 12771 || 12784 <= D2 && D2 <= 12830 || 12832 <= D2 && D2 <= 12871 || 12880 <= D2 && D2 <= 13054 || 13056 <= D2 && D2 <= 19903 || 19968 <= D2 && D2 <= 42124 || 42128 <= D2 && D2 <= 42182 || 43360 <= D2 && D2 <= 43388 || 44032 <= D2 && D2 <= 55203 || 55216 <= D2 && D2 <= 55238 || 55243 <= D2 && D2 <= 55291 || 63744 <= D2 && D2 <= 64255 || 65040 <= D2 && D2 <= 65049 || 65072 <= D2 && D2 <= 65106 || 65108 <= D2 && D2 <= 65126 || 65128 <= D2 && D2 <= 65131 || 110592 <= D2 && D2 <= 110593 || 127488 <= D2 && D2 <= 127490 || 127504 <= D2 && D2 <= 127546 || 127552 <= D2 && D2 <= 127560 || 127568 <= D2 && D2 <= 127569 || 131072 <= D2 && D2 <= 194367 || 177984 <= D2 && D2 <= 196605 || 196608 <= D2 && D2 <= 262141 ? "W" : 32 <= D2 && D2 <= 126 || 162 <= D2 && D2 <= 163 || 165 <= D2 && D2 <= 166 || D2 == 172 || D2 == 175 || 10214 <= D2 && D2 <= 10221 || 10629 <= D2 && D2 <= 10630 ? "Na" : D2 == 161 || D2 == 164 || 167 <= D2 && D2 <= 168 || D2 == 170 || 173 <= D2 && D2 <= 174 || 176 <= D2 && D2 <= 180 || 182 <= D2 && D2 <= 186 || 188 <= D2 && D2 <= 191 || D2 == 198 || D2 == 208 || 215 <= D2 && D2 <= 216 || 222 <= D2 && D2 <= 225 || D2 == 230 || 232 <= D2 && D2 <= 234 || 236 <= D2 && D2 <= 237 || D2 == 240 || 242 <= D2 && D2 <= 243 || 247 <= D2 && D2 <= 250 || D2 == 252 || D2 == 254 || D2 == 257 || D2 == 273 || D2 == 275 || D2 == 283 || 294 <= D2 && D2 <= 295 || D2 == 299 || 305 <= D2 && D2 <= 307 || D2 == 312 || 319 <= D2 && D2 <= 322 || D2 == 324 || 328 <= D2 && D2 <= 331 || D2 == 333 || 338 <= D2 && D2 <= 339 || 358 <= D2 && D2 <= 359 || D2 == 363 || D2 == 462 || D2 == 464 || D2 == 466 || D2 == 468 || D2 == 470 || D2 == 472 || D2 == 474 || D2 == 476 || D2 == 593 || D2 == 609 || D2 == 708 || D2 == 711 || 713 <= D2 && D2 <= 715 || D2 == 717 || D2 == 720 || 728 <= D2 && D2 <= 731 || D2 == 733 || D2 == 735 || 768 <= D2 && D2 <= 879 || 913 <= D2 && D2 <= 929 || 931 <= D2 && D2 <= 937 || 945 <= D2 && D2 <= 961 || 963 <= D2 && D2 <= 969 || D2 == 1025 || 1040 <= D2 && D2 <= 1103 || D2 == 1105 || D2 == 8208 || 8211 <= D2 && D2 <= 8214 || 8216 <= D2 && D2 <= 8217 || 8220 <= D2 && D2 <= 8221 || 8224 <= D2 && D2 <= 8226 || 8228 <= D2 && D2 <= 8231 || D2 == 8240 || 8242 <= D2 && D2 <= 8243 || D2 == 8245 || D2 == 8251 || D2 == 8254 || D2 == 8308 || D2 == 8319 || 8321 <= D2 && D2 <= 8324 || D2 == 8364 || D2 == 8451 || D2 == 8453 || D2 == 8457 || D2 == 8467 || D2 == 8470 || 8481 <= D2 && D2 <= 8482 || D2 == 8486 || D2 == 8491 || 8531 <= D2 && D2 <= 8532 || 8539 <= D2 && D2 <= 8542 || 8544 <= D2 && D2 <= 8555 || 8560 <= D2 && D2 <= 8569 || D2 == 8585 || 8592 <= D2 && D2 <= 8601 || 8632 <= D2 && D2 <= 8633 || D2 == 8658 || D2 == 8660 || D2 == 8679 || D2 == 8704 || 8706 <= D2 && D2 <= 8707 || 8711 <= D2 && D2 <= 8712 || D2 == 8715 || D2 == 8719 || D2 == 8721 || D2 == 8725 || D2 == 8730 || 8733 <= D2 && D2 <= 8736 || D2 == 8739 || D2 == 8741 || 8743 <= D2 && D2 <= 8748 || D2 == 8750 || 8756 <= D2 && D2 <= 8759 || 8764 <= D2 && D2 <= 8765 || D2 == 8776 || D2 == 8780 || D2 == 8786 || 8800 <= D2 && D2 <= 8801 || 8804 <= D2 && D2 <= 8807 || 8810 <= D2 && D2 <= 8811 || 8814 <= D2 && D2 <= 8815 || 8834 <= D2 && D2 <= 8835 || 8838 <= D2 && D2 <= 8839 || D2 == 8853 || D2 == 8857 || D2 == 8869 || D2 == 8895 || D2 == 8978 || 9312 <= D2 && D2 <= 9449 || 9451 <= D2 && D2 <= 9547 || 9552 <= D2 && D2 <= 9587 || 9600 <= D2 && D2 <= 9615 || 9618 <= D2 && D2 <= 9621 || 9632 <= D2 && D2 <= 9633 || 9635 <= D2 && D2 <= 9641 || 9650 <= D2 && D2 <= 9651 || 9654 <= D2 && D2 <= 9655 || 9660 <= D2 && D2 <= 9661 || 9664 <= D2 && D2 <= 9665 || 9670 <= D2 && D2 <= 9672 || D2 == 9675 || 9678 <= D2 && D2 <= 9681 || 9698 <= D2 && D2 <= 9701 || D2 == 9711 || 9733 <= D2 && D2 <= 9734 || D2 == 9737 || 9742 <= D2 && D2 <= 9743 || 9748 <= D2 && D2 <= 9749 || D2 == 9756 || D2 == 9758 || D2 == 9792 || D2 == 9794 || 9824 <= D2 && D2 <= 9825 || 9827 <= D2 && D2 <= 9829 || 9831 <= D2 && D2 <= 9834 || 9836 <= D2 && D2 <= 9837 || D2 == 9839 || 9886 <= D2 && D2 <= 9887 || 9918 <= D2 && D2 <= 9919 || 9924 <= D2 && D2 <= 9933 || 9935 <= D2 && D2 <= 9953 || D2 == 9955 || 9960 <= D2 && D2 <= 9983 || D2 == 10045 || D2 == 10071 || 10102 <= D2 && D2 <= 10111 || 11093 <= D2 && D2 <= 11097 || 12872 <= D2 && D2 <= 12879 || 57344 <= D2 && D2 <= 63743 || 65024 <= D2 && D2 <= 65039 || D2 == 65533 || 127232 <= D2 && D2 <= 127242 || 127248 <= D2 && D2 <= 127277 || 127280 <= D2 && D2 <= 127337 || 127344 <= D2 && D2 <= 127386 || 917760 <= D2 && D2 <= 917999 || 983040 <= D2 && D2 <= 1048573 || 1048576 <= D2 && D2 <= 1114109 ? "A" : "N";
  }, u2.characterLength = function(e2) {
    var s = this.eastAsianWidth(e2);
    return s == "F" || s == "W" || s == "A" ? 2 : 1;
  };
  function F2(e2) {
    return e2.match(/[\uD800-\uDBFF][\uDC00-\uDFFF]|[^\uD800-\uDFFF]/g) || [];
  }
  u2.length = function(e2) {
    for (var s = F2(e2), C2 = 0, D2 = 0; D2 < s.length; D2++)
      C2 = C2 + this.characterLength(s[D2]);
    return C2;
  }, u2.slice = function(e2, s, C2) {
    textLen = u2.length(e2), s = s || 0, C2 = C2 || 1, s < 0 && (s = textLen + s), C2 < 0 && (C2 = textLen + C2);
    for (var D2 = "", i = 0, o2 = F2(e2), E2 = 0; E2 < o2.length; E2++) {
      var a2 = o2[E2], n = u2.length(a2);
      if (i >= s - (n == 2 ? 1 : 0))
        if (i + n <= C2)
          D2 += a2;
        else
          break;
      i += n;
    }
    return D2;
  };
})(G);
var K = m;
var Y = function() {
  return /\uD83C\uDFF4\uDB40\uDC67\uDB40\uDC62(?:\uDB40\uDC77\uDB40\uDC6C\uDB40\uDC73|\uDB40\uDC73\uDB40\uDC63\uDB40\uDC74|\uDB40\uDC65\uDB40\uDC6E\uDB40\uDC67)\uDB40\uDC7F|(?:\uD83E\uDDD1\uD83C\uDFFF\u200D\u2764\uFE0F\u200D(?:\uD83D\uDC8B\u200D)?\uD83E\uDDD1|\uD83D\uDC69\uD83C\uDFFF\u200D\uD83E\uDD1D\u200D(?:\uD83D[\uDC68\uDC69]))(?:\uD83C[\uDFFB-\uDFFE])|(?:\uD83E\uDDD1\uD83C\uDFFE\u200D\u2764\uFE0F\u200D(?:\uD83D\uDC8B\u200D)?\uD83E\uDDD1|\uD83D\uDC69\uD83C\uDFFE\u200D\uD83E\uDD1D\u200D(?:\uD83D[\uDC68\uDC69]))(?:\uD83C[\uDFFB-\uDFFD\uDFFF])|(?:\uD83E\uDDD1\uD83C\uDFFD\u200D\u2764\uFE0F\u200D(?:\uD83D\uDC8B\u200D)?\uD83E\uDDD1|\uD83D\uDC69\uD83C\uDFFD\u200D\uD83E\uDD1D\u200D(?:\uD83D[\uDC68\uDC69]))(?:\uD83C[\uDFFB\uDFFC\uDFFE\uDFFF])|(?:\uD83E\uDDD1\uD83C\uDFFC\u200D\u2764\uFE0F\u200D(?:\uD83D\uDC8B\u200D)?\uD83E\uDDD1|\uD83D\uDC69\uD83C\uDFFC\u200D\uD83E\uDD1D\u200D(?:\uD83D[\uDC68\uDC69]))(?:\uD83C[\uDFFB\uDFFD-\uDFFF])|(?:\uD83E\uDDD1\uD83C\uDFFB\u200D\u2764\uFE0F\u200D(?:\uD83D\uDC8B\u200D)?\uD83E\uDDD1|\uD83D\uDC69\uD83C\uDFFB\u200D\uD83E\uDD1D\u200D(?:\uD83D[\uDC68\uDC69]))(?:\uD83C[\uDFFC-\uDFFF])|\uD83D\uDC68(?:\uD83C\uDFFB(?:\u200D(?:\u2764\uFE0F\u200D(?:\uD83D\uDC8B\u200D\uD83D\uDC68(?:\uD83C[\uDFFB-\uDFFF])|\uD83D\uDC68(?:\uD83C[\uDFFB-\uDFFF]))|\uD83E\uDD1D\u200D\uD83D\uDC68(?:\uD83C[\uDFFC-\uDFFF])|[\u2695\u2696\u2708]\uFE0F|\uD83C[\uDF3E\uDF73\uDF7C\uDF93\uDFA4\uDFA8\uDFEB\uDFED]|\uD83D[\uDCBB\uDCBC\uDD27\uDD2C\uDE80\uDE92]|\uD83E[\uDDAF-\uDDB3\uDDBC\uDDBD]))?|(?:\uD83C[\uDFFC-\uDFFF])\u200D\u2764\uFE0F\u200D(?:\uD83D\uDC8B\u200D\uD83D\uDC68(?:\uD83C[\uDFFB-\uDFFF])|\uD83D\uDC68(?:\uD83C[\uDFFB-\uDFFF]))|\u200D(?:\u2764\uFE0F\u200D(?:\uD83D\uDC8B\u200D)?\uD83D\uDC68|(?:\uD83D[\uDC68\uDC69])\u200D(?:\uD83D\uDC66\u200D\uD83D\uDC66|\uD83D\uDC67\u200D(?:\uD83D[\uDC66\uDC67]))|\uD83D\uDC66\u200D\uD83D\uDC66|\uD83D\uDC67\u200D(?:\uD83D[\uDC66\uDC67])|\uD83C[\uDF3E\uDF73\uDF7C\uDF93\uDFA4\uDFA8\uDFEB\uDFED]|\uD83D[\uDCBB\uDCBC\uDD27\uDD2C\uDE80\uDE92]|\uD83E[\uDDAF-\uDDB3\uDDBC\uDDBD])|\uD83C\uDFFF\u200D(?:\uD83E\uDD1D\u200D\uD83D\uDC68(?:\uD83C[\uDFFB-\uDFFE])|\uD83C[\uDF3E\uDF73\uDF7C\uDF93\uDFA4\uDFA8\uDFEB\uDFED]|\uD83D[\uDCBB\uDCBC\uDD27\uDD2C\uDE80\uDE92]|\uD83E[\uDDAF-\uDDB3\uDDBC\uDDBD])|\uD83C\uDFFE\u200D(?:\uD83E\uDD1D\u200D\uD83D\uDC68(?:\uD83C[\uDFFB-\uDFFD\uDFFF])|\uD83C[\uDF3E\uDF73\uDF7C\uDF93\uDFA4\uDFA8\uDFEB\uDFED]|\uD83D[\uDCBB\uDCBC\uDD27\uDD2C\uDE80\uDE92]|\uD83E[\uDDAF-\uDDB3\uDDBC\uDDBD])|\uD83C\uDFFD\u200D(?:\uD83E\uDD1D\u200D\uD83D\uDC68(?:\uD83C[\uDFFB\uDFFC\uDFFE\uDFFF])|\uD83C[\uDF3E\uDF73\uDF7C\uDF93\uDFA4\uDFA8\uDFEB\uDFED]|\uD83D[\uDCBB\uDCBC\uDD27\uDD2C\uDE80\uDE92]|\uD83E[\uDDAF-\uDDB3\uDDBC\uDDBD])|\uD83C\uDFFC\u200D(?:\uD83E\uDD1D\u200D\uD83D\uDC68(?:\uD83C[\uDFFB\uDFFD-\uDFFF])|\uD83C[\uDF3E\uDF73\uDF7C\uDF93\uDFA4\uDFA8\uDFEB\uDFED]|\uD83D[\uDCBB\uDCBC\uDD27\uDD2C\uDE80\uDE92]|\uD83E[\uDDAF-\uDDB3\uDDBC\uDDBD])|(?:\uD83C\uDFFF\u200D[\u2695\u2696\u2708]|\uD83C\uDFFE\u200D[\u2695\u2696\u2708]|\uD83C\uDFFD\u200D[\u2695\u2696\u2708]|\uD83C\uDFFC\u200D[\u2695\u2696\u2708]|\u200D[\u2695\u2696\u2708])\uFE0F|\u200D(?:(?:\uD83D[\uDC68\uDC69])\u200D(?:\uD83D[\uDC66\uDC67])|\uD83D[\uDC66\uDC67])|\uD83C\uDFFF|\uD83C\uDFFE|\uD83C\uDFFD|\uD83C\uDFFC)?|(?:\uD83D\uDC69(?:\uD83C\uDFFB\u200D\u2764\uFE0F\u200D(?:\uD83D\uDC8B\u200D(?:\uD83D[\uDC68\uDC69])|\uD83D[\uDC68\uDC69])|(?:\uD83C[\uDFFC-\uDFFF])\u200D\u2764\uFE0F\u200D(?:\uD83D\uDC8B\u200D(?:\uD83D[\uDC68\uDC69])|\uD83D[\uDC68\uDC69]))|\uD83E\uDDD1(?:\uD83C[\uDFFB-\uDFFF])\u200D\uD83E\uDD1D\u200D\uD83E\uDDD1)(?:\uD83C[\uDFFB-\uDFFF])|\uD83D\uDC69\u200D\uD83D\uDC69\u200D(?:\uD83D\uDC66\u200D\uD83D\uDC66|\uD83D\uDC67\u200D(?:\uD83D[\uDC66\uDC67]))|\uD83D\uDC69(?:\u200D(?:\u2764\uFE0F\u200D(?:\uD83D\uDC8B\u200D(?:\uD83D[\uDC68\uDC69])|\uD83D[\uDC68\uDC69])|\uD83C[\uDF3E\uDF73\uDF7C\uDF93\uDFA4\uDFA8\uDFEB\uDFED]|\uD83D[\uDCBB\uDCBC\uDD27\uDD2C\uDE80\uDE92]|\uD83E[\uDDAF-\uDDB3\uDDBC\uDDBD])|\uD83C\uDFFF\u200D(?:\uD83C[\uDF3E\uDF73\uDF7C\uDF93\uDFA4\uDFA8\uDFEB\uDFED]|\uD83D[\uDCBB\uDCBC\uDD27\uDD2C\uDE80\uDE92]|\uD83E[\uDDAF-\uDDB3\uDDBC\uDDBD])|\uD83C\uDFFE\u200D(?:\uD83C[\uDF3E\uDF73\uDF7C\uDF93\uDFA4\uDFA8\uDFEB\uDFED]|\uD83D[\uDCBB\uDCBC\uDD27\uDD2C\uDE80\uDE92]|\uD83E[\uDDAF-\uDDB3\uDDBC\uDDBD])|\uD83C\uDFFD\u200D(?:\uD83C[\uDF3E\uDF73\uDF7C\uDF93\uDFA4\uDFA8\uDFEB\uDFED]|\uD83D[\uDCBB\uDCBC\uDD27\uDD2C\uDE80\uDE92]|\uD83E[\uDDAF-\uDDB3\uDDBC\uDDBD])|\uD83C\uDFFC\u200D(?:\uD83C[\uDF3E\uDF73\uDF7C\uDF93\uDFA4\uDFA8\uDFEB\uDFED]|\uD83D[\uDCBB\uDCBC\uDD27\uDD2C\uDE80\uDE92]|\uD83E[\uDDAF-\uDDB3\uDDBC\uDDBD])|\uD83C\uDFFB\u200D(?:\uD83C[\uDF3E\uDF73\uDF7C\uDF93\uDFA4\uDFA8\uDFEB\uDFED]|\uD83D[\uDCBB\uDCBC\uDD27\uDD2C\uDE80\uDE92]|\uD83E[\uDDAF-\uDDB3\uDDBC\uDDBD]))|\uD83E\uDDD1(?:\u200D(?:\uD83E\uDD1D\u200D\uD83E\uDDD1|\uD83C[\uDF3E\uDF73\uDF7C\uDF84\uDF93\uDFA4\uDFA8\uDFEB\uDFED]|\uD83D[\uDCBB\uDCBC\uDD27\uDD2C\uDE80\uDE92]|\uD83E[\uDDAF-\uDDB3\uDDBC\uDDBD])|\uD83C\uDFFF\u200D(?:\uD83C[\uDF3E\uDF73\uDF7C\uDF84\uDF93\uDFA4\uDFA8\uDFEB\uDFED]|\uD83D[\uDCBB\uDCBC\uDD27\uDD2C\uDE80\uDE92]|\uD83E[\uDDAF-\uDDB3\uDDBC\uDDBD])|\uD83C\uDFFE\u200D(?:\uD83C[\uDF3E\uDF73\uDF7C\uDF84\uDF93\uDFA4\uDFA8\uDFEB\uDFED]|\uD83D[\uDCBB\uDCBC\uDD27\uDD2C\uDE80\uDE92]|\uD83E[\uDDAF-\uDDB3\uDDBC\uDDBD])|\uD83C\uDFFD\u200D(?:\uD83C[\uDF3E\uDF73\uDF7C\uDF84\uDF93\uDFA4\uDFA8\uDFEB\uDFED]|\uD83D[\uDCBB\uDCBC\uDD27\uDD2C\uDE80\uDE92]|\uD83E[\uDDAF-\uDDB3\uDDBC\uDDBD])|\uD83C\uDFFC\u200D(?:\uD83C[\uDF3E\uDF73\uDF7C\uDF84\uDF93\uDFA4\uDFA8\uDFEB\uDFED]|\uD83D[\uDCBB\uDCBC\uDD27\uDD2C\uDE80\uDE92]|\uD83E[\uDDAF-\uDDB3\uDDBC\uDDBD])|\uD83C\uDFFB\u200D(?:\uD83C[\uDF3E\uDF73\uDF7C\uDF84\uDF93\uDFA4\uDFA8\uDFEB\uDFED]|\uD83D[\uDCBB\uDCBC\uDD27\uDD2C\uDE80\uDE92]|\uD83E[\uDDAF-\uDDB3\uDDBC\uDDBD]))|\uD83D\uDC69\u200D\uD83D\uDC66\u200D\uD83D\uDC66|\uD83D\uDC69\u200D\uD83D\uDC69\u200D(?:\uD83D[\uDC66\uDC67])|\uD83D\uDC69\u200D\uD83D\uDC67\u200D(?:\uD83D[\uDC66\uDC67])|(?:\uD83D\uDC41\uFE0F\u200D\uD83D\uDDE8|\uD83E\uDDD1(?:\uD83C\uDFFF\u200D[\u2695\u2696\u2708]|\uD83C\uDFFE\u200D[\u2695\u2696\u2708]|\uD83C\uDFFD\u200D[\u2695\u2696\u2708]|\uD83C\uDFFC\u200D[\u2695\u2696\u2708]|\uD83C\uDFFB\u200D[\u2695\u2696\u2708]|\u200D[\u2695\u2696\u2708])|\uD83D\uDC69(?:\uD83C\uDFFF\u200D[\u2695\u2696\u2708]|\uD83C\uDFFE\u200D[\u2695\u2696\u2708]|\uD83C\uDFFD\u200D[\u2695\u2696\u2708]|\uD83C\uDFFC\u200D[\u2695\u2696\u2708]|\uD83C\uDFFB\u200D[\u2695\u2696\u2708]|\u200D[\u2695\u2696\u2708])|\uD83D\uDE36\u200D\uD83C\uDF2B|\uD83C\uDFF3\uFE0F\u200D\u26A7|\uD83D\uDC3B\u200D\u2744|(?:(?:\uD83C[\uDFC3\uDFC4\uDFCA]|\uD83D[\uDC6E\uDC70\uDC71\uDC73\uDC77\uDC81\uDC82\uDC86\uDC87\uDE45-\uDE47\uDE4B\uDE4D\uDE4E\uDEA3\uDEB4-\uDEB6]|\uD83E[\uDD26\uDD35\uDD37-\uDD39\uDD3D\uDD3E\uDDB8\uDDB9\uDDCD-\uDDCF\uDDD4\uDDD6-\uDDDD])(?:\uD83C[\uDFFB-\uDFFF])|\uD83D\uDC6F|\uD83E[\uDD3C\uDDDE\uDDDF])\u200D[\u2640\u2642]|(?:\u26F9|\uD83C[\uDFCB\uDFCC]|\uD83D\uDD75)(?:\uFE0F|\uD83C[\uDFFB-\uDFFF])\u200D[\u2640\u2642]|\uD83C\uDFF4\u200D\u2620|(?:\uD83C[\uDFC3\uDFC4\uDFCA]|\uD83D[\uDC6E\uDC70\uDC71\uDC73\uDC77\uDC81\uDC82\uDC86\uDC87\uDE45-\uDE47\uDE4B\uDE4D\uDE4E\uDEA3\uDEB4-\uDEB6]|\uD83E[\uDD26\uDD35\uDD37-\uDD39\uDD3D\uDD3E\uDDB8\uDDB9\uDDCD-\uDDCF\uDDD4\uDDD6-\uDDDD])\u200D[\u2640\u2642]|[\xA9\xAE\u203C\u2049\u2122\u2139\u2194-\u2199\u21A9\u21AA\u2328\u23CF\u23ED-\u23EF\u23F1\u23F2\u23F8-\u23FA\u24C2\u25AA\u25AB\u25B6\u25C0\u25FB\u25FC\u2600-\u2604\u260E\u2611\u2618\u2620\u2622\u2623\u2626\u262A\u262E\u262F\u2638-\u263A\u2640\u2642\u265F\u2660\u2663\u2665\u2666\u2668\u267B\u267E\u2692\u2694-\u2697\u2699\u269B\u269C\u26A0\u26A7\u26B0\u26B1\u26C8\u26CF\u26D1\u26D3\u26E9\u26F0\u26F1\u26F4\u26F7\u26F8\u2702\u2708\u2709\u270F\u2712\u2714\u2716\u271D\u2721\u2733\u2734\u2744\u2747\u2763\u27A1\u2934\u2935\u2B05-\u2B07\u3030\u303D\u3297\u3299]|\uD83C[\uDD70\uDD71\uDD7E\uDD7F\uDE02\uDE37\uDF21\uDF24-\uDF2C\uDF36\uDF7D\uDF96\uDF97\uDF99-\uDF9B\uDF9E\uDF9F\uDFCD\uDFCE\uDFD4-\uDFDF\uDFF5\uDFF7]|\uD83D[\uDC3F\uDCFD\uDD49\uDD4A\uDD6F\uDD70\uDD73\uDD76-\uDD79\uDD87\uDD8A-\uDD8D\uDDA5\uDDA8\uDDB1\uDDB2\uDDBC\uDDC2-\uDDC4\uDDD1-\uDDD3\uDDDC-\uDDDE\uDDE1\uDDE3\uDDE8\uDDEF\uDDF3\uDDFA\uDECB\uDECD-\uDECF\uDEE0-\uDEE5\uDEE9\uDEF0\uDEF3])\uFE0F|\uD83C\uDFF3\uFE0F\u200D\uD83C\uDF08|\uD83D\uDC69\u200D\uD83D\uDC67|\uD83D\uDC69\u200D\uD83D\uDC66|\uD83D\uDE35\u200D\uD83D\uDCAB|\uD83D\uDE2E\u200D\uD83D\uDCA8|\uD83D\uDC15\u200D\uD83E\uDDBA|\uD83E\uDDD1(?:\uD83C\uDFFF|\uD83C\uDFFE|\uD83C\uDFFD|\uD83C\uDFFC|\uD83C\uDFFB)?|\uD83D\uDC69(?:\uD83C\uDFFF|\uD83C\uDFFE|\uD83C\uDFFD|\uD83C\uDFFC|\uD83C\uDFFB)?|\uD83C\uDDFD\uD83C\uDDF0|\uD83C\uDDF6\uD83C\uDDE6|\uD83C\uDDF4\uD83C\uDDF2|\uD83D\uDC08\u200D\u2B1B|\u2764\uFE0F\u200D(?:\uD83D\uDD25|\uD83E\uDE79)|\uD83D\uDC41\uFE0F|\uD83C\uDFF3\uFE0F|\uD83C\uDDFF(?:\uD83C[\uDDE6\uDDF2\uDDFC])|\uD83C\uDDFE(?:\uD83C[\uDDEA\uDDF9])|\uD83C\uDDFC(?:\uD83C[\uDDEB\uDDF8])|\uD83C\uDDFB(?:\uD83C[\uDDE6\uDDE8\uDDEA\uDDEC\uDDEE\uDDF3\uDDFA])|\uD83C\uDDFA(?:\uD83C[\uDDE6\uDDEC\uDDF2\uDDF3\uDDF8\uDDFE\uDDFF])|\uD83C\uDDF9(?:\uD83C[\uDDE6\uDDE8\uDDE9\uDDEB-\uDDED\uDDEF-\uDDF4\uDDF7\uDDF9\uDDFB\uDDFC\uDDFF])|\uD83C\uDDF8(?:\uD83C[\uDDE6-\uDDEA\uDDEC-\uDDF4\uDDF7-\uDDF9\uDDFB\uDDFD-\uDDFF])|\uD83C\uDDF7(?:\uD83C[\uDDEA\uDDF4\uDDF8\uDDFA\uDDFC])|\uD83C\uDDF5(?:\uD83C[\uDDE6\uDDEA-\uDDED\uDDF0-\uDDF3\uDDF7-\uDDF9\uDDFC\uDDFE])|\uD83C\uDDF3(?:\uD83C[\uDDE6\uDDE8\uDDEA-\uDDEC\uDDEE\uDDF1\uDDF4\uDDF5\uDDF7\uDDFA\uDDFF])|\uD83C\uDDF2(?:\uD83C[\uDDE6\uDDE8-\uDDED\uDDF0-\uDDFF])|\uD83C\uDDF1(?:\uD83C[\uDDE6-\uDDE8\uDDEE\uDDF0\uDDF7-\uDDFB\uDDFE])|\uD83C\uDDF0(?:\uD83C[\uDDEA\uDDEC-\uDDEE\uDDF2\uDDF3\uDDF5\uDDF7\uDDFC\uDDFE\uDDFF])|\uD83C\uDDEF(?:\uD83C[\uDDEA\uDDF2\uDDF4\uDDF5])|\uD83C\uDDEE(?:\uD83C[\uDDE8-\uDDEA\uDDF1-\uDDF4\uDDF6-\uDDF9])|\uD83C\uDDED(?:\uD83C[\uDDF0\uDDF2\uDDF3\uDDF7\uDDF9\uDDFA])|\uD83C\uDDEC(?:\uD83C[\uDDE6\uDDE7\uDDE9-\uDDEE\uDDF1-\uDDF3\uDDF5-\uDDFA\uDDFC\uDDFE])|\uD83C\uDDEB(?:\uD83C[\uDDEE-\uDDF0\uDDF2\uDDF4\uDDF7])|\uD83C\uDDEA(?:\uD83C[\uDDE6\uDDE8\uDDEA\uDDEC\uDDED\uDDF7-\uDDFA])|\uD83C\uDDE9(?:\uD83C[\uDDEA\uDDEC\uDDEF\uDDF0\uDDF2\uDDF4\uDDFF])|\uD83C\uDDE8(?:\uD83C[\uDDE6\uDDE8\uDDE9\uDDEB-\uDDEE\uDDF0-\uDDF5\uDDF7\uDDFA-\uDDFF])|\uD83C\uDDE7(?:\uD83C[\uDDE6\uDDE7\uDDE9-\uDDEF\uDDF1-\uDDF4\uDDF6-\uDDF9\uDDFB\uDDFC\uDDFE\uDDFF])|\uD83C\uDDE6(?:\uD83C[\uDDE8-\uDDEC\uDDEE\uDDF1\uDDF2\uDDF4\uDDF6-\uDDFA\uDDFC\uDDFD\uDDFF])|[#\*0-9]\uFE0F\u20E3|\u2764\uFE0F|(?:\uD83C[\uDFC3\uDFC4\uDFCA]|\uD83D[\uDC6E\uDC70\uDC71\uDC73\uDC77\uDC81\uDC82\uDC86\uDC87\uDE45-\uDE47\uDE4B\uDE4D\uDE4E\uDEA3\uDEB4-\uDEB6]|\uD83E[\uDD26\uDD35\uDD37-\uDD39\uDD3D\uDD3E\uDDB8\uDDB9\uDDCD-\uDDCF\uDDD4\uDDD6-\uDDDD])(?:\uD83C[\uDFFB-\uDFFF])|(?:\u26F9|\uD83C[\uDFCB\uDFCC]|\uD83D\uDD75)(?:\uFE0F|\uD83C[\uDFFB-\uDFFF])|\uD83C\uDFF4|(?:[\u270A\u270B]|\uD83C[\uDF85\uDFC2\uDFC7]|\uD83D[\uDC42\uDC43\uDC46-\uDC50\uDC66\uDC67\uDC6B-\uDC6D\uDC72\uDC74-\uDC76\uDC78\uDC7C\uDC83\uDC85\uDC8F\uDC91\uDCAA\uDD7A\uDD95\uDD96\uDE4C\uDE4F\uDEC0\uDECC]|\uD83E[\uDD0C\uDD0F\uDD18-\uDD1C\uDD1E\uDD1F\uDD30-\uDD34\uDD36\uDD77\uDDB5\uDDB6\uDDBB\uDDD2\uDDD3\uDDD5])(?:\uD83C[\uDFFB-\uDFFF])|(?:[\u261D\u270C\u270D]|\uD83D[\uDD74\uDD90])(?:\uFE0F|\uD83C[\uDFFB-\uDFFF])|[\u270A\u270B]|\uD83C[\uDF85\uDFC2\uDFC7]|\uD83D[\uDC08\uDC15\uDC3B\uDC42\uDC43\uDC46-\uDC50\uDC66\uDC67\uDC6B-\uDC6D\uDC72\uDC74-\uDC76\uDC78\uDC7C\uDC83\uDC85\uDC8F\uDC91\uDCAA\uDD7A\uDD95\uDD96\uDE2E\uDE35\uDE36\uDE4C\uDE4F\uDEC0\uDECC]|\uD83E[\uDD0C\uDD0F\uDD18-\uDD1C\uDD1E\uDD1F\uDD30-\uDD34\uDD36\uDD77\uDDB5\uDDB6\uDDBB\uDDD2\uDDD3\uDDD5]|\uD83C[\uDFC3\uDFC4\uDFCA]|\uD83D[\uDC6E\uDC70\uDC71\uDC73\uDC77\uDC81\uDC82\uDC86\uDC87\uDE45-\uDE47\uDE4B\uDE4D\uDE4E\uDEA3\uDEB4-\uDEB6]|\uD83E[\uDD26\uDD35\uDD37-\uDD39\uDD3D\uDD3E\uDDB8\uDDB9\uDDCD-\uDDCF\uDDD4\uDDD6-\uDDDD]|\uD83D\uDC6F|\uD83E[\uDD3C\uDDDE\uDDDF]|[\u231A\u231B\u23E9-\u23EC\u23F0\u23F3\u25FD\u25FE\u2614\u2615\u2648-\u2653\u267F\u2693\u26A1\u26AA\u26AB\u26BD\u26BE\u26C4\u26C5\u26CE\u26D4\u26EA\u26F2\u26F3\u26F5\u26FA\u26FD\u2705\u2728\u274C\u274E\u2753-\u2755\u2757\u2795-\u2797\u27B0\u27BF\u2B1B\u2B1C\u2B50\u2B55]|\uD83C[\uDC04\uDCCF\uDD8E\uDD91-\uDD9A\uDE01\uDE1A\uDE2F\uDE32-\uDE36\uDE38-\uDE3A\uDE50\uDE51\uDF00-\uDF20\uDF2D-\uDF35\uDF37-\uDF7C\uDF7E-\uDF84\uDF86-\uDF93\uDFA0-\uDFC1\uDFC5\uDFC6\uDFC8\uDFC9\uDFCF-\uDFD3\uDFE0-\uDFF0\uDFF8-\uDFFF]|\uD83D[\uDC00-\uDC07\uDC09-\uDC14\uDC16-\uDC3A\uDC3C-\uDC3E\uDC40\uDC44\uDC45\uDC51-\uDC65\uDC6A\uDC79-\uDC7B\uDC7D-\uDC80\uDC84\uDC88-\uDC8E\uDC90\uDC92-\uDCA9\uDCAB-\uDCFC\uDCFF-\uDD3D\uDD4B-\uDD4E\uDD50-\uDD67\uDDA4\uDDFB-\uDE2D\uDE2F-\uDE34\uDE37-\uDE44\uDE48-\uDE4A\uDE80-\uDEA2\uDEA4-\uDEB3\uDEB7-\uDEBF\uDEC1-\uDEC5\uDED0-\uDED2\uDED5-\uDED7\uDEEB\uDEEC\uDEF4-\uDEFC\uDFE0-\uDFEB]|\uD83E[\uDD0D\uDD0E\uDD10-\uDD17\uDD1D\uDD20-\uDD25\uDD27-\uDD2F\uDD3A\uDD3F-\uDD45\uDD47-\uDD76\uDD78\uDD7A-\uDDB4\uDDB7\uDDBA\uDDBC-\uDDCB\uDDD0\uDDE0-\uDDFF\uDE70-\uDE74\uDE78-\uDE7A\uDE80-\uDE86\uDE90-\uDEA8\uDEB0-\uDEB6\uDEC0-\uDEC2\uDED0-\uDED6]|(?:[\u231A\u231B\u23E9-\u23EC\u23F0\u23F3\u25FD\u25FE\u2614\u2615\u2648-\u2653\u267F\u2693\u26A1\u26AA\u26AB\u26BD\u26BE\u26C4\u26C5\u26CE\u26D4\u26EA\u26F2\u26F3\u26F5\u26FA\u26FD\u2705\u270A\u270B\u2728\u274C\u274E\u2753-\u2755\u2757\u2795-\u2797\u27B0\u27BF\u2B1B\u2B1C\u2B50\u2B55]|\uD83C[\uDC04\uDCCF\uDD8E\uDD91-\uDD9A\uDDE6-\uDDFF\uDE01\uDE1A\uDE2F\uDE32-\uDE36\uDE38-\uDE3A\uDE50\uDE51\uDF00-\uDF20\uDF2D-\uDF35\uDF37-\uDF7C\uDF7E-\uDF93\uDFA0-\uDFCA\uDFCF-\uDFD3\uDFE0-\uDFF0\uDFF4\uDFF8-\uDFFF]|\uD83D[\uDC00-\uDC3E\uDC40\uDC42-\uDCFC\uDCFF-\uDD3D\uDD4B-\uDD4E\uDD50-\uDD67\uDD7A\uDD95\uDD96\uDDA4\uDDFB-\uDE4F\uDE80-\uDEC5\uDECC\uDED0-\uDED2\uDED5-\uDED7\uDEEB\uDEEC\uDEF4-\uDEFC\uDFE0-\uDFEB]|\uD83E[\uDD0C-\uDD3A\uDD3C-\uDD45\uDD47-\uDD78\uDD7A-\uDDCB\uDDCD-\uDDFF\uDE70-\uDE74\uDE78-\uDE7A\uDE80-\uDE86\uDE90-\uDEA8\uDEB0-\uDEB6\uDEC0-\uDEC2\uDED0-\uDED6])|(?:[#\*0-9\xA9\xAE\u203C\u2049\u2122\u2139\u2194-\u2199\u21A9\u21AA\u231A\u231B\u2328\u23CF\u23E9-\u23F3\u23F8-\u23FA\u24C2\u25AA\u25AB\u25B6\u25C0\u25FB-\u25FE\u2600-\u2604\u260E\u2611\u2614\u2615\u2618\u261D\u2620\u2622\u2623\u2626\u262A\u262E\u262F\u2638-\u263A\u2640\u2642\u2648-\u2653\u265F\u2660\u2663\u2665\u2666\u2668\u267B\u267E\u267F\u2692-\u2697\u2699\u269B\u269C\u26A0\u26A1\u26A7\u26AA\u26AB\u26B0\u26B1\u26BD\u26BE\u26C4\u26C5\u26C8\u26CE\u26CF\u26D1\u26D3\u26D4\u26E9\u26EA\u26F0-\u26F5\u26F7-\u26FA\u26FD\u2702\u2705\u2708-\u270D\u270F\u2712\u2714\u2716\u271D\u2721\u2728\u2733\u2734\u2744\u2747\u274C\u274E\u2753-\u2755\u2757\u2763\u2764\u2795-\u2797\u27A1\u27B0\u27BF\u2934\u2935\u2B05-\u2B07\u2B1B\u2B1C\u2B50\u2B55\u3030\u303D\u3297\u3299]|\uD83C[\uDC04\uDCCF\uDD70\uDD71\uDD7E\uDD7F\uDD8E\uDD91-\uDD9A\uDDE6-\uDDFF\uDE01\uDE02\uDE1A\uDE2F\uDE32-\uDE3A\uDE50\uDE51\uDF00-\uDF21\uDF24-\uDF93\uDF96\uDF97\uDF99-\uDF9B\uDF9E-\uDFF0\uDFF3-\uDFF5\uDFF7-\uDFFF]|\uD83D[\uDC00-\uDCFD\uDCFF-\uDD3D\uDD49-\uDD4E\uDD50-\uDD67\uDD6F\uDD70\uDD73-\uDD7A\uDD87\uDD8A-\uDD8D\uDD90\uDD95\uDD96\uDDA4\uDDA5\uDDA8\uDDB1\uDDB2\uDDBC\uDDC2-\uDDC4\uDDD1-\uDDD3\uDDDC-\uDDDE\uDDE1\uDDE3\uDDE8\uDDEF\uDDF3\uDDFA-\uDE4F\uDE80-\uDEC5\uDECB-\uDED2\uDED5-\uDED7\uDEE0-\uDEE5\uDEE9\uDEEB\uDEEC\uDEF0\uDEF3-\uDEFC\uDFE0-\uDFEB]|\uD83E[\uDD0C-\uDD3A\uDD3C-\uDD45\uDD47-\uDD78\uDD7A-\uDDCB\uDDCD-\uDDFF\uDE70-\uDE74\uDE78-\uDE7A\uDE80-\uDE86\uDE90-\uDEA8\uDEB0-\uDEB6\uDEC0-\uDEC2\uDED0-\uDED6])\uFE0F|(?:[\u261D\u26F9\u270A-\u270D]|\uD83C[\uDF85\uDFC2-\uDFC4\uDFC7\uDFCA-\uDFCC]|\uD83D[\uDC42\uDC43\uDC46-\uDC50\uDC66-\uDC78\uDC7C\uDC81-\uDC83\uDC85-\uDC87\uDC8F\uDC91\uDCAA\uDD74\uDD75\uDD7A\uDD90\uDD95\uDD96\uDE45-\uDE47\uDE4B-\uDE4F\uDEA3\uDEB4-\uDEB6\uDEC0\uDECC]|\uD83E[\uDD0C\uDD0F\uDD18-\uDD1F\uDD26\uDD30-\uDD39\uDD3C-\uDD3E\uDD77\uDDB5\uDDB6\uDDB8\uDDB9\uDDBB\uDDCD-\uDDCF\uDDD1-\uDDDD])/g;
};
function c(t, u2 = {}) {
  if (typeof t != "string" || t.length === 0 || (u2 = { ambiguousIsNarrow: true, ...u2 }, t = $2(t), t.length === 0))
    return 0;
  t = t.replace(Y(), "  ");
  const F2 = u2.ambiguousIsNarrow ? 1 : 2;
  let e2 = 0;
  for (const s of t) {
    const C2 = s.codePointAt(0);
    if (C2 <= 31 || C2 >= 127 && C2 <= 159 || C2 >= 768 && C2 <= 879)
      continue;
    switch (K.eastAsianWidth(s)) {
      case "F":
      case "W":
        e2 += 2;
        break;
      case "A":
        e2 += F2;
        break;
      default:
        e2 += 1;
    }
  }
  return e2;
}
var v = 10;
var L = (t = 0) => (u2) => `\x1B[${u2 + t}m`;
var M = (t = 0) => (u2) => `\x1B[${38 + t};5;${u2}m`;
var T = (t = 0) => (u2, F2, e2) => `\x1B[${38 + t};2;${u2};${F2};${e2}m`;
var r = { modifier: { reset: [0, 0], bold: [1, 22], dim: [2, 22], italic: [3, 23], underline: [4, 24], overline: [53, 55], inverse: [7, 27], hidden: [8, 28], strikethrough: [9, 29] }, color: { black: [30, 39], red: [31, 39], green: [32, 39], yellow: [33, 39], blue: [34, 39], magenta: [35, 39], cyan: [36, 39], white: [37, 39], blackBright: [90, 39], gray: [90, 39], grey: [90, 39], redBright: [91, 39], greenBright: [92, 39], yellowBright: [93, 39], blueBright: [94, 39], magentaBright: [95, 39], cyanBright: [96, 39], whiteBright: [97, 39] }, bgColor: { bgBlack: [40, 49], bgRed: [41, 49], bgGreen: [42, 49], bgYellow: [43, 49], bgBlue: [44, 49], bgMagenta: [45, 49], bgCyan: [46, 49], bgWhite: [47, 49], bgBlackBright: [100, 49], bgGray: [100, 49], bgGrey: [100, 49], bgRedBright: [101, 49], bgGreenBright: [102, 49], bgYellowBright: [103, 49], bgBlueBright: [104, 49], bgMagentaBright: [105, 49], bgCyanBright: [106, 49], bgWhiteBright: [107, 49] } };
Object.keys(r.modifier);
var Z = Object.keys(r.color);
var H = Object.keys(r.bgColor);
[...Z, ...H];
function U() {
  const t = /* @__PURE__ */ new Map();
  for (const [u2, F2] of Object.entries(r)) {
    for (const [e2, s] of Object.entries(F2))
      r[e2] = { open: `\x1B[${s[0]}m`, close: `\x1B[${s[1]}m` }, F2[e2] = r[e2], t.set(s[0], s[1]);
    Object.defineProperty(r, u2, { value: F2, enumerable: false });
  }
  return Object.defineProperty(r, "codes", { value: t, enumerable: false }), r.color.close = "\x1B[39m", r.bgColor.close = "\x1B[49m", r.color.ansi = L(), r.color.ansi256 = M(), r.color.ansi16m = T(), r.bgColor.ansi = L(v), r.bgColor.ansi256 = M(v), r.bgColor.ansi16m = T(v), Object.defineProperties(r, { rgbToAnsi256: { value: (u2, F2, e2) => u2 === F2 && F2 === e2 ? u2 < 8 ? 16 : u2 > 248 ? 231 : Math.round((u2 - 8) / 247 * 24) + 232 : 16 + 36 * Math.round(u2 / 255 * 5) + 6 * Math.round(F2 / 255 * 5) + Math.round(e2 / 255 * 5), enumerable: false }, hexToRgb: { value: (u2) => {
    const F2 = /[a-f\d]{6}|[a-f\d]{3}/i.exec(u2.toString(16));
    if (!F2)
      return [0, 0, 0];
    let [e2] = F2;
    e2.length === 3 && (e2 = [...e2].map((C2) => C2 + C2).join(""));
    const s = Number.parseInt(e2, 16);
    return [s >> 16 & 255, s >> 8 & 255, s & 255];
  }, enumerable: false }, hexToAnsi256: { value: (u2) => r.rgbToAnsi256(...r.hexToRgb(u2)), enumerable: false }, ansi256ToAnsi: { value: (u2) => {
    if (u2 < 8)
      return 30 + u2;
    if (u2 < 16)
      return 90 + (u2 - 8);
    let F2, e2, s;
    if (u2 >= 232)
      F2 = ((u2 - 232) * 10 + 8) / 255, e2 = F2, s = F2;
    else {
      u2 -= 16;
      const i = u2 % 36;
      F2 = Math.floor(u2 / 36) / 5, e2 = Math.floor(i / 6) / 5, s = i % 6 / 5;
    }
    const C2 = Math.max(F2, e2, s) * 2;
    if (C2 === 0)
      return 30;
    let D2 = 30 + (Math.round(s) << 2 | Math.round(e2) << 1 | Math.round(F2));
    return C2 === 2 && (D2 += 60), D2;
  }, enumerable: false }, rgbToAnsi: { value: (u2, F2, e2) => r.ansi256ToAnsi(r.rgbToAnsi256(u2, F2, e2)), enumerable: false }, hexToAnsi: { value: (u2) => r.ansi256ToAnsi(r.hexToAnsi256(u2)), enumerable: false } }), r;
}
var q = U();
var p = /* @__PURE__ */ new Set(["\x1B", "\x9B"]);
var J = 39;
var b = "\x07";
var W = "[";
var Q = "]";
var I = "m";
var w = `${Q}8;;`;
var N = (t) => `${p.values().next().value}${W}${t}${I}`;
var j = (t) => `${p.values().next().value}${w}${t}${b}`;
var X = (t) => t.split(" ").map((u2) => c(u2));
var _ = (t, u2, F2) => {
  const e2 = [...u2];
  let s = false, C2 = false, D2 = c($2(t[t.length - 1]));
  for (const [i, o2] of e2.entries()) {
    const E2 = c(o2);
    if (D2 + E2 <= F2 ? t[t.length - 1] += o2 : (t.push(o2), D2 = 0), p.has(o2) && (s = true, C2 = e2.slice(i + 1).join("").startsWith(w)), s) {
      C2 ? o2 === b && (s = false, C2 = false) : o2 === I && (s = false);
      continue;
    }
    D2 += E2, D2 === F2 && i < e2.length - 1 && (t.push(""), D2 = 0);
  }
  !D2 && t[t.length - 1].length > 0 && t.length > 1 && (t[t.length - 2] += t.pop());
};
var DD = (t) => {
  const u2 = t.split(" ");
  let F2 = u2.length;
  for (; F2 > 0 && !(c(u2[F2 - 1]) > 0); )
    F2--;
  return F2 === u2.length ? t : u2.slice(0, F2).join(" ") + u2.slice(F2).join("");
};
var uD = (t, u2, F2 = {}) => {
  if (F2.trim !== false && t.trim() === "")
    return "";
  let e2 = "", s, C2;
  const D2 = X(t);
  let i = [""];
  for (const [E2, a2] of t.split(" ").entries()) {
    F2.trim !== false && (i[i.length - 1] = i[i.length - 1].trimStart());
    let n = c(i[i.length - 1]);
    if (E2 !== 0 && (n >= u2 && (F2.wordWrap === false || F2.trim === false) && (i.push(""), n = 0), (n > 0 || F2.trim === false) && (i[i.length - 1] += " ", n++)), F2.hard && D2[E2] > u2) {
      const B = u2 - n, A2 = 1 + Math.floor((D2[E2] - B - 1) / u2);
      Math.floor((D2[E2] - 1) / u2) < A2 && i.push(""), _(i, a2, u2);
      continue;
    }
    if (n + D2[E2] > u2 && n > 0 && D2[E2] > 0) {
      if (F2.wordWrap === false && n < u2) {
        _(i, a2, u2);
        continue;
      }
      i.push("");
    }
    if (n + D2[E2] > u2 && F2.wordWrap === false) {
      _(i, a2, u2);
      continue;
    }
    i[i.length - 1] += a2;
  }
  F2.trim !== false && (i = i.map((E2) => DD(E2)));
  const o2 = [...i.join(`
`)];
  for (const [E2, a2] of o2.entries()) {
    if (e2 += a2, p.has(a2)) {
      const { groups: B } = new RegExp(`(?:\\${W}(?<code>\\d+)m|\\${w}(?<uri>.*)${b})`).exec(o2.slice(E2).join("")) || { groups: {} };
      if (B.code !== void 0) {
        const A2 = Number.parseFloat(B.code);
        s = A2 === J ? void 0 : A2;
      } else
        B.uri !== void 0 && (C2 = B.uri.length === 0 ? void 0 : B.uri);
    }
    const n = q.codes.get(Number(s));
    o2[E2 + 1] === `
` ? (C2 && (e2 += j("")), s && n && (e2 += N(n))) : a2 === `
` && (s && n && (e2 += N(s)), C2 && (e2 += j(C2)));
  }
  return e2;
};
function P(t, u2, F2) {
  return String(t).normalize().replace(/\r\n/g, `
`).split(`
`).map((e2) => uD(e2, u2, F2)).join(`
`);
}
function FD(t, u2) {
  if (t === u2)
    return;
  const F2 = t.split(`
`), e2 = u2.split(`
`), s = [];
  for (let C2 = 0; C2 < Math.max(F2.length, e2.length); C2++)
    F2[C2] !== e2[C2] && s.push(C2);
  return s;
}
var R = Symbol("clack:cancel");
function eD(t) {
  return t === R;
}
function g(t, u2) {
  t.isTTY && t.setRawMode(u2);
}
var V = /* @__PURE__ */ new Map([["k", "up"], ["j", "down"], ["h", "left"], ["l", "right"]]);
var tD = /* @__PURE__ */ new Set(["up", "down", "left", "right", "space", "enter"]);
var h = class {
  constructor({ render: u2, input: F2 = import_node_process.stdin, output: e2 = import_node_process.stdout, ...s }, C2 = true) {
    this._track = false, this._cursor = 0, this.state = "initial", this.error = "", this.subscribers = /* @__PURE__ */ new Map(), this._prevFrame = "", this.opts = s, this.onKeypress = this.onKeypress.bind(this), this.close = this.close.bind(this), this.render = this.render.bind(this), this._render = u2.bind(this), this._track = C2, this.input = F2, this.output = e2;
  }
  prompt() {
    const u2 = new import_node_tty.WriteStream(0);
    return u2._write = (F2, e2, s) => {
      this._track && (this.value = this.rl.line.replace(/\t/g, ""), this._cursor = this.rl.cursor, this.emit("value", this.value)), s();
    }, this.input.pipe(u2), this.rl = import_node_readline.default.createInterface({ input: this.input, output: u2, tabSize: 2, prompt: "", escapeCodeTimeout: 50 }), import_node_readline.default.emitKeypressEvents(this.input, this.rl), this.rl.prompt(), this.opts.initialValue !== void 0 && this._track && this.rl.write(this.opts.initialValue), this.input.on("keypress", this.onKeypress), g(this.input, true), this.output.on("resize", this.render), this.render(), new Promise((F2, e2) => {
      this.once("submit", () => {
        this.output.write(import_sisteransi.cursor.show), this.output.off("resize", this.render), g(this.input, false), F2(this.value);
      }), this.once("cancel", () => {
        this.output.write(import_sisteransi.cursor.show), this.output.off("resize", this.render), g(this.input, false), F2(R);
      });
    });
  }
  on(u2, F2) {
    const e2 = this.subscribers.get(u2) ?? [];
    e2.push({ cb: F2 }), this.subscribers.set(u2, e2);
  }
  once(u2, F2) {
    const e2 = this.subscribers.get(u2) ?? [];
    e2.push({ cb: F2, once: true }), this.subscribers.set(u2, e2);
  }
  emit(u2, ...F2) {
    const e2 = this.subscribers.get(u2) ?? [], s = [];
    for (const C2 of e2)
      C2.cb(...F2), C2.once && s.push(() => e2.splice(e2.indexOf(C2), 1));
    for (const C2 of s)
      C2();
  }
  unsubscribe() {
    this.subscribers.clear();
  }
  onKeypress(u2, F2) {
    if (this.state === "error" && (this.state = "active"), (F2 == null ? void 0 : F2.name) && !this._track && V.has(F2.name) && this.emit("cursor", V.get(F2.name)), (F2 == null ? void 0 : F2.name) && tD.has(F2.name) && this.emit("cursor", F2.name), u2 && (u2.toLowerCase() === "y" || u2.toLowerCase() === "n") && this.emit("confirm", u2.toLowerCase() === "y"), u2 && this.emit("key", u2.toLowerCase()), (F2 == null ? void 0 : F2.name) === "return") {
      if (this.opts.validate) {
        const e2 = this.opts.validate(this.value);
        e2 && (this.error = e2, this.state = "error", this.rl.write(this.value));
      }
      this.state !== "error" && (this.state = "submit");
    }
    u2 === "" && (this.state = "cancel"), (this.state === "submit" || this.state === "cancel") && this.emit("finalize"), this.render(), (this.state === "submit" || this.state === "cancel") && this.close();
  }
  close() {
    this.input.unpipe(), this.input.removeListener("keypress", this.onKeypress), this.output.write(`
`), g(this.input, false), this.rl.close(), this.emit(`${this.state}`, this.value), this.unsubscribe();
  }
  restoreCursor() {
    const u2 = P(this._prevFrame, process.stdout.columns, { hard: true }).split(`
`).length - 1;
    this.output.write(import_sisteransi.cursor.move(-999, u2 * -1));
  }
  render() {
    const u2 = P(this._render(this) ?? "", process.stdout.columns, { hard: true });
    if (u2 !== this._prevFrame) {
      if (this.state === "initial")
        this.output.write(import_sisteransi.cursor.hide);
      else {
        const F2 = FD(this._prevFrame, u2);
        if (this.restoreCursor(), F2 && (F2 == null ? void 0 : F2.length) === 1) {
          const e2 = F2[0];
          this.output.write(import_sisteransi.cursor.move(0, e2)), this.output.write(import_sisteransi.erase.lines(1));
          const s = u2.split(`
`);
          this.output.write(s[e2]), this._prevFrame = u2, this.output.write(import_sisteransi.cursor.move(0, s.length - e2 - 1));
          return;
        } else if (F2 && (F2 == null ? void 0 : F2.length) > 1) {
          const e2 = F2[0];
          this.output.write(import_sisteransi.cursor.move(0, e2)), this.output.write(import_sisteransi.erase.down());
          const C2 = u2.split(`
`).slice(e2);
          this.output.write(C2.join(`
`)), this._prevFrame = u2;
          return;
        }
        this.output.write(import_sisteransi.erase.down());
      }
      this.output.write(u2), this.state === "initial" && (this.state = "active"), this._prevFrame = u2;
    }
  }
};
var sD = class extends h {
  get cursor() {
    return this.value ? 0 : 1;
  }
  get _value() {
    return this.cursor === 0;
  }
  constructor(u2) {
    super(u2, false), this.value = !!u2.initialValue, this.on("value", () => {
      this.value = this._value;
    }), this.on("confirm", (F2) => {
      this.output.write(import_sisteransi.cursor.move(0, -1)), this.value = F2, this.state = "submit", this.close();
    }), this.on("cursor", () => {
      this.value = !this.value;
    });
  }
};
var ED = class extends h {
  constructor(u2) {
    super(u2, false), this.cursor = 0, this.options = u2.options, this.cursor = this.options.findIndex(({ value: F2 }) => F2 === u2.initialValue), this.cursor === -1 && (this.cursor = 0), this.changeValue(), this.on("cursor", (F2) => {
      switch (F2) {
        case "left":
        case "up":
          this.cursor = this.cursor === 0 ? this.options.length - 1 : this.cursor - 1;
          break;
        case "down":
        case "right":
          this.cursor = this.cursor === this.options.length - 1 ? 0 : this.cursor + 1;
          break;
      }
      this.changeValue();
    });
  }
  get _value() {
    return this.options[this.cursor];
  }
  changeValue() {
    this.value = this._value.value;
  }
};
var oD = class extends h {
  constructor(u2) {
    super(u2), this.valueWithCursor = "", this.on("finalize", () => {
      this.value || (this.value = u2.defaultValue), this.valueWithCursor = this.value;
    }), this.on("value", () => {
      if (this.cursor >= this.value.length)
        this.valueWithCursor = `${this.value}${import_picocolors.default.inverse(import_picocolors.default.hidden("_"))}`;
      else {
        const F2 = this.value.slice(0, this.cursor), e2 = this.value.slice(this.cursor);
        this.valueWithCursor = `${F2}${import_picocolors.default.inverse(e2[0])}${e2.slice(1)}`;
      }
    });
  }
  get cursor() {
    return this._cursor;
  }
};
function aD({ input: t = import_node_process.stdin, output: u2 = import_node_process.stdout, overwrite: F2 = true, hideCursor: e2 = true } = {}) {
  const s = f.createInterface({ input: t, output: u2, prompt: "", tabSize: 1 });
  f.emitKeypressEvents(t, s), t.isTTY && t.setRawMode(true);
  const C2 = (D2, { name: i }) => {
    if (String(D2) === "" && process.exit(0), !F2)
      return;
    let E2 = i === "return" ? 0 : -1, a2 = i === "return" ? -1 : 0;
    f.moveCursor(u2, E2, a2, () => {
      f.clearLine(u2, 1, () => {
        t.once("keypress", C2);
      });
    });
  };
  return e2 && process.stdout.write(import_sisteransi.cursor.hide), t.once("keypress", C2), () => {
    t.off("keypress", C2), e2 && process.stdout.write(import_sisteransi.cursor.show), s.terminal = false, s.close();
  };
}

// node_modules/.pnpm/@clack+prompts@0.6.3/node_modules/@clack/prompts/dist/index.mjs
var import_node_process2 = __toESM(require("process"), 1);
var import_picocolors2 = __toESM(require_picocolors(), 1);
var import_sisteransi2 = __toESM(require_src(), 1);
function N2() {
  return import_node_process2.default.platform !== "win32" ? import_node_process2.default.env.TERM !== "linux" : Boolean(import_node_process2.default.env.CI) || Boolean(import_node_process2.default.env.WT_SESSION) || Boolean(import_node_process2.default.env.TERMINUS_SUBLIME) || import_node_process2.default.env.ConEmuTask === "{cmd::Cmder}" || import_node_process2.default.env.TERM_PROGRAM === "Terminus-Sublime" || import_node_process2.default.env.TERM_PROGRAM === "vscode" || import_node_process2.default.env.TERM === "xterm-256color" || import_node_process2.default.env.TERM === "alacritty" || import_node_process2.default.env.TERMINAL_EMULATOR === "JetBrains-JediTerm";
}
var p2 = N2();
var u = (r2, n) => p2 ? r2 : n;
var W2 = u("\u25C6", "*");
var D = u("\u25A0", "x");
var F = u("\u25B2", "x");
var f2 = u("\u25C7", "o");
var L2 = u("\u250C", "T");
var a = u("\u2502", "|");
var o = u("\u2514", "\u2014");
var w2 = u("\u25CF", ">");
var S2 = u("\u25CB", " ");
var _2 = u("\u25FB", "[\u2022]");
var y2 = u("\u25FC", "[+]");
var A = u("\u25FB", "[ ]");
var q2 = u("\u25AA", "\u2022");
var R2 = u("\u2500", "-");
var G2 = u("\u256E", "+");
var H2 = u("\u251C", "+");
var K2 = u("\u256F", "+");
var U2 = u("\u25CF", "\u2022");
var Z2 = u("\u25C6", "*");
var z2 = u("\u25B2", "!");
var X2 = u("\u25A0", "x");
var h2 = (r2) => {
  switch (r2) {
    case "initial":
    case "active":
      return import_picocolors2.default.cyan(W2);
    case "cancel":
      return import_picocolors2.default.red(D);
    case "error":
      return import_picocolors2.default.yellow(F);
    case "submit":
      return import_picocolors2.default.green(f2);
  }
};
var J2 = (r2) => new oD({ validate: r2.validate, placeholder: r2.placeholder, defaultValue: r2.defaultValue, initialValue: r2.initialValue, render() {
  var _a;
  const n = `${import_picocolors2.default.gray(a)}
${h2(this.state)}  ${r2.message}
`, s = r2.placeholder ? import_picocolors2.default.inverse(r2.placeholder[0]) + import_picocolors2.default.dim(r2.placeholder.slice(1)) : import_picocolors2.default.inverse(import_picocolors2.default.hidden("_")), t = this.value ? this.valueWithCursor : s;
  switch (this.state) {
    case "error":
      return `${n.trim()}
${import_picocolors2.default.yellow(a)}  ${t}
${import_picocolors2.default.yellow(o)}  ${import_picocolors2.default.yellow(this.error)}
`;
    case "submit":
      return `${n}${import_picocolors2.default.gray(a)}  ${import_picocolors2.default.dim(this.value || r2.placeholder)}`;
    case "cancel":
      return `${n}${import_picocolors2.default.gray(a)}  ${import_picocolors2.default.strikethrough(import_picocolors2.default.dim(this.value ?? ""))}${((_a = this.value) == null ? void 0 : _a.trim()) ? `
` + import_picocolors2.default.gray(a) : ""}`;
    default:
      return `${n}${import_picocolors2.default.cyan(a)}  ${t}
${import_picocolors2.default.cyan(o)}
`;
  }
} }).prompt();
var Q2 = (r2) => {
  const n = r2.active ?? "Yes", s = r2.inactive ?? "No";
  return new sD({ active: n, inactive: s, initialValue: r2.initialValue ?? true, render() {
    const t = `${import_picocolors2.default.gray(a)}
${h2(this.state)}  ${r2.message}
`, i = this.value ? n : s;
    switch (this.state) {
      case "submit":
        return `${t}${import_picocolors2.default.gray(a)}  ${import_picocolors2.default.dim(i)}`;
      case "cancel":
        return `${t}${import_picocolors2.default.gray(a)}  ${import_picocolors2.default.strikethrough(import_picocolors2.default.dim(i))}
${import_picocolors2.default.gray(a)}`;
      default:
        return `${t}${import_picocolors2.default.cyan(a)}  ${this.value ? `${import_picocolors2.default.green(w2)} ${n}` : `${import_picocolors2.default.dim(S2)} ${import_picocolors2.default.dim(n)}`} ${import_picocolors2.default.dim("/")} ${this.value ? `${import_picocolors2.default.dim(S2)} ${import_picocolors2.default.dim(s)}` : `${import_picocolors2.default.green(w2)} ${s}`}
${import_picocolors2.default.cyan(o)}
`;
    }
  } }).prompt();
};
var ee = (r2) => {
  const n = (s, t) => {
    const i = s.label ?? String(s.value);
    return t === "active" ? `${import_picocolors2.default.green(w2)} ${i} ${s.hint ? import_picocolors2.default.dim(`(${s.hint})`) : ""}` : t === "selected" ? `${import_picocolors2.default.dim(i)}` : t === "cancelled" ? `${import_picocolors2.default.strikethrough(import_picocolors2.default.dim(i))}` : `${import_picocolors2.default.dim(S2)} ${import_picocolors2.default.dim(i)}`;
  };
  return new ED({ options: r2.options, initialValue: r2.initialValue, render() {
    const s = `${import_picocolors2.default.gray(a)}
${h2(this.state)}  ${r2.message}
`;
    switch (this.state) {
      case "submit":
        return `${s}${import_picocolors2.default.gray(a)}  ${n(this.options[this.cursor], "selected")}`;
      case "cancel":
        return `${s}${import_picocolors2.default.gray(a)}  ${n(this.options[this.cursor], "cancelled")}
${import_picocolors2.default.gray(a)}`;
      default:
        return `${s}${import_picocolors2.default.cyan(a)}  ${this.options.map((t, i) => n(t, i === this.cursor ? "active" : "inactive")).join(`
${import_picocolors2.default.cyan(a)}  `)}
${import_picocolors2.default.cyan(o)}
`;
    }
  } }).prompt();
};
var ae = (r2 = "") => {
  process.stdout.write(`${import_picocolors2.default.gray(L2)}  ${r2}
`);
};
var ce = (r2 = "") => {
  process.stdout.write(`${import_picocolors2.default.gray(a)}
${import_picocolors2.default.gray(o)}  ${r2}

`);
};
var g2 = { message: (r2 = "", { symbol: n = import_picocolors2.default.gray(a) } = {}) => {
  const s = [`${import_picocolors2.default.gray(a)}`];
  if (r2) {
    const [t, ...i] = r2.split(`
`);
    s.push(`${n}  ${t}`, ...i.map((c2) => `${import_picocolors2.default.gray(a)}  ${c2}`));
  }
  process.stdout.write(`${s.join(`
`)}
`);
}, info: (r2) => {
  g2.message(r2, { symbol: import_picocolors2.default.blue(U2) });
}, success: (r2) => {
  g2.message(r2, { symbol: import_picocolors2.default.green(Z2) });
}, step: (r2) => {
  g2.message(r2, { symbol: import_picocolors2.default.green(f2) });
}, warn: (r2) => {
  g2.message(r2, { symbol: import_picocolors2.default.yellow(z2) });
}, warning: (r2) => {
  g2.warn(r2);
}, error: (r2) => {
  g2.message(r2, { symbol: import_picocolors2.default.red(X2) });
} };
var C = p2 ? ["\u25D2", "\u25D0", "\u25D3", "\u25D1"] : ["\u2022", "o", "O", "0"];
var le = () => {
  let r2, n;
  const s = p2 ? 80 : 120;
  return { start(t = "") {
    t = t.replace(/\.?\.?\.$/, ""), r2 = aD(), process.stdout.write(`${import_picocolors2.default.gray(a)}
${import_picocolors2.default.magenta("\u25CB")}  ${t}
`);
    let i = 0, c2 = 0;
    n = setInterval(() => {
      let l2 = C[i];
      process.stdout.write(import_sisteransi2.cursor.move(-999, -1)), process.stdout.write(`${import_picocolors2.default.magenta(l2)}  ${t}${Math.floor(c2) >= 1 ? ".".repeat(Math.floor(c2)).slice(0, 3) : ""}   
`), i = i === C.length - 1 ? 0 : i + 1, c2 = c2 === C.length ? 0 : c2 + 0.125;
    }, s);
  }, stop(t = "") {
    process.stdout.write(import_sisteransi2.cursor.move(-999, -2)), process.stdout.write(import_sisteransi2.erase.down(2)), clearInterval(n), process.stdout.write(`${import_picocolors2.default.gray(a)}
${import_picocolors2.default.green(f2)}  ${t}
`), r2();
  } };
};

// packages/qwik/src/cli/utils/utils.ts
var import_cross_spawn = __toESM(require_cross_spawn(), 1);
var import_which_pm_runs = __toESM(require_which_pm_runs(), 1);
function runCommand(cmd, args, cwd) {
  let child;
  const install = new Promise((resolve2) => {
    try {
      child = (0, import_cross_spawn.default)(cmd, args, {
        cwd,
        stdio: "ignore"
      });
      child.on("error", (e2) => {
        if (e2) {
          if (e2.message) {
            g2.error(red(String(e2.message)) + `

`);
          } else {
            g2.error(red(String(e2)) + `

`);
          }
        }
        resolve2(false);
      });
      child.on("close", (code) => {
        if (code === 0) {
          resolve2(true);
        } else {
          resolve2(false);
        }
      });
    } catch (e2) {
      resolve2(false);
    }
  });
  const abort = async () => {
    if (child) {
      child.kill("SIGINT");
    }
  };
  return { abort, install };
}
async function readPackageJson(dir) {
  const path3 = (0, import_node_path2.join)(dir, "package.json");
  const pkgJson = JSON.parse(await import_node_fs2.default.promises.readFile(path3, "utf-8"));
  return pkgJson;
}
function dashToTitleCase(str) {
  return str.toLocaleLowerCase().split("-").map((segment) => segment.charAt(0).toUpperCase() + segment.slice(1)).join(" ");
}
function limitLength(hint, maxLength = 50) {
  if (hint.length > maxLength) {
    return hint.substring(0, maxLength - 3) + "...";
  }
  return hint;
}
function getPackageManager() {
  var _a;
  return ((_a = (0, import_which_pm_runs.default)()) == null ? void 0 : _a.name) || "npm";
}
function pmRunCmd() {
  const pm = getPackageManager();
  if (pm !== "npm") {
    return pm;
  }
  return `${pm} run`;
}
function panic(msg) {
  console.error(`
\u274C ${red(msg)}
`);
  process.exit(1);
}
function bye() {
  ce("Take care, see you soon! \u{1F44B}");
  process.exit(0);
}
function printHeader() {
  console.log(
    blue(`
      ${magenta("............")}
    .::: ${magenta(":--------:.")}
   .::::  ${magenta(".:-------:.")}
  .:::::.   ${magenta(".:-------.")}
  ::::::.     ${magenta(".:------.")}
 ::::::.        ${magenta(":-----:")}
 ::::::.       ${magenta(".:-----.")}
  :::::::.     ${magenta(".-----.")}
   ::::::::..   ${magenta("---:.")}
    .:::::::::. ${magenta(":-:.")}
     ..::::::::::::
             ...::::
    `),
    "\n"
  );
}
async function getFilesDeep(root) {
  const files = [];
  async function getFiles(directory) {
    if (!import_node_fs2.default.existsSync(directory)) {
      return;
    }
    const filesInDirectory = await import_node_fs2.default.promises.readdir(directory);
    for (const file of filesInDirectory) {
      const absolute = (0, import_node_path2.join)(directory, file);
      if (import_node_fs2.default.statSync(absolute).isDirectory()) {
        await getFiles(absolute);
      } else {
        files.push(absolute);
      }
    }
  }
  await getFiles(root);
  return files;
}
function ansiRegex() {
  const pattern = [
    "[\\u001B\\u009B][[\\]()#;?]*(?:(?:(?:(?:;[-a-zA-Z\\d\\/#&.:=?%@~_]+)*|[a-zA-Z\\d]+(?:;[-a-zA-Z\\d\\/#&.:=?%@~_]*)*)?\\u0007)",
    "(?:(?:\\d{1,4}(?:;\\d{0,4})*)?[\\dA-PR-TZcf-nq-uy=><~]))"
  ].join("|");
  return new RegExp(pattern, "g");
}
var bar = "\u2502";
var strip = (str) => str.replace(ansiRegex(), "");
var note = (message = "", title = "") => {
  const lines = `
${message}
`.split("\n");
  const len = lines.reduce((sum, ln) => {
    ln = strip(ln);
    return ln.length > sum ? ln.length : sum;
  }, 0) + 2;
  const msg = lines.map((ln) => `${gray(bar)}  ${white(ln)}${" ".repeat(len - strip(ln).length)}${gray(bar)}`).join("\n");
  process.stdout.write(
    `${gray(bar)}
${green("\u25CB")}  ${reset(title)} ${gray(
      "\u2500".repeat(len - title.length - 1) + "\u256E"
    )}
${msg}
${gray("\u251C" + "\u2500".repeat(len + 2) + "\u256F")}
`
  );
};

// packages/qwik/src/cli/utils/integrations.ts
var integrations = null;
async function sortIntegrationsAndReturnAsClackOptions(integrations2, { maxHintLength = 50, showHint = true } = {}) {
  return integrations2.sort((a2, b2) => {
    if (a2.priority > b2.priority) {
      return -1;
    }
    if (a2.priority < b2.priority) {
      return 1;
    }
    return a2.id < b2.id ? -1 : 1;
  }).map((i) => ({
    value: i.id,
    label: i.name,
    hint: showHint && limitLength(i.pkgJson.description, maxHintLength) || void 0
  }));
}
async function loadIntegrations() {
  if (!integrations) {
    const loadingIntegrations = [];
    const integrationTypes = ["app", "feature", "adapter"];
    const integrationsDir = (0, import_node_path3.join)(__dirname, "starters");
    const integrationsDirNames = await import_node_fs3.default.promises.readdir(integrationsDir);
    await Promise.all(
      integrationsDirNames.map(async (integrationsDirName) => {
        const integrationType = integrationsDirName.slice(0, integrationsDirName.length - 1);
        if (integrationTypes.includes(integrationType)) {
          const dir = (0, import_node_path3.join)(integrationsDir, integrationsDirName);
          const dirItems = await import_node_fs3.default.promises.readdir(dir);
          await Promise.all(
            dirItems.map(async (dirItem) => {
              var _a, _b, _c;
              const dirPath = (0, import_node_path3.join)(dir, dirItem);
              const stat = await import_node_fs3.default.promises.stat(dirPath);
              if (stat.isDirectory()) {
                const pkgJson = await readPackageJson(dirPath);
                const integration = {
                  id: dirItem,
                  name: ((_a = pkgJson.__qwik__) == null ? void 0 : _a.displayName) ?? dashToTitleCase(dirItem),
                  type: integrationType,
                  dir: dirPath,
                  pkgJson,
                  docs: ((_b = pkgJson.__qwik__) == null ? void 0 : _b.docs) ?? [],
                  priority: ((_c = pkgJson == null ? void 0 : pkgJson.__qwik__) == null ? void 0 : _c.priority) ?? 0
                };
                loadingIntegrations.push(integration);
              }
            })
          );
        }
      })
    );
    loadingIntegrations.sort((a2, b2) => {
      if (a2.priority > b2.priority) {
        return -1;
      }
      if (a2.priority < b2.priority) {
        return 1;
      }
      return a2.id < b2.id ? -1 : 1;
    });
    integrations = loadingIntegrations;
  }
  return integrations;
}

// packages/qwik/src/cli/add/update-app.ts
var import_node_path5 = require("path");
var import_node_fs5 = __toESM(require("fs"), 1);

// packages/qwik/src/cli/utils/install-deps.ts
function installDeps(pkgManager, dir) {
  return runCommand(pkgManager, ["install"], dir);
}
function runInPkg(pkgManager, args, cwd) {
  const cmd = pkgManager === "npm" ? "npx" : pkgManager;
  return runCommand(cmd, args, cwd);
}

// packages/qwik/src/cli/add/update-files.ts
var import_node_fs4 = __toESM(require("fs"), 1);
var import_node_path4 = require("path");
async function mergeIntegrationDir(fileUpdates, opts, srcDir, destDir) {
  const items = await import_node_fs4.default.promises.readdir(srcDir);
  await Promise.all(
    items.map(async (itemName) => {
      const destName = itemName === "gitignore" ? ".gitignore" : itemName;
      const ext = (0, import_node_path4.extname)(destName);
      const srcChildPath = (0, import_node_path4.join)(srcDir, itemName);
      const destChildPath = (0, import_node_path4.join)(destDir, destName);
      const s = await import_node_fs4.default.promises.stat(srcChildPath);
      if (s.isDirectory()) {
        await mergeIntegrationDir(fileUpdates, opts, srcChildPath, destChildPath);
      } else if (s.isFile()) {
        if (destName === "package.json") {
          await mergePackageJsons(fileUpdates, srcChildPath, destChildPath);
        } else if (destName === "settings.json") {
          await mergeJsons(fileUpdates, srcChildPath, destChildPath);
        } else if (destName === "README.md") {
          await mergeReadmes(fileUpdates, srcChildPath, destChildPath);
        } else if (destName === ".gitignore" || destName === ".prettierignore" || destName === ".eslintignore") {
          await mergeIgnoresFile(fileUpdates, srcChildPath, destChildPath);
        } else if (ext === ".css") {
          await mergeCss(fileUpdates, srcChildPath, destChildPath);
        } else {
          if (import_node_fs4.default.existsSync(destChildPath)) {
            fileUpdates.files.push({
              path: destChildPath,
              content: await import_node_fs4.default.promises.readFile(srcChildPath),
              type: "overwrite"
            });
          } else {
            fileUpdates.files.push({
              path: destChildPath,
              content: await import_node_fs4.default.promises.readFile(srcChildPath),
              type: "create"
            });
          }
        }
      }
    })
  );
}
async function mergePackageJsons(fileUpdates, srcPath, destPath) {
  var _a;
  const srcContent = await import_node_fs4.default.promises.readFile(srcPath, "utf-8");
  try {
    const srcPkgJson = JSON.parse(srcContent);
    const props = ["scripts", "dependencies", "devDependencies"];
    const destPkgJson = JSON.parse(await import_node_fs4.default.promises.readFile(destPath, "utf-8"));
    props.forEach((prop) => {
      mergePackageJsonSort(srcPkgJson, destPkgJson, prop);
    });
    if ((_a = destPkgJson.scripts) == null ? void 0 : _a.qwik) {
      const qwikVal = destPkgJson.scripts.qwik;
      delete destPkgJson.scripts.qwik;
      destPkgJson.scripts.qwik = qwikVal;
    }
    fileUpdates.files.push({
      path: destPath,
      content: JSON.stringify(destPkgJson, null, 2) + "\n",
      type: "modify"
    });
  } catch (e2) {
    fileUpdates.files.push({
      path: destPath,
      content: srcContent,
      type: "create"
    });
  }
}
async function mergeJsons(fileUpdates, srcPath, destPath) {
  const srcContent = await import_node_fs4.default.promises.readFile(srcPath, "utf-8");
  try {
    const srcPkgJson = JSON.parse(srcContent);
    const destPkgJson = JSON.parse(await import_node_fs4.default.promises.readFile(destPath, "utf-8"));
    Object.assign(srcPkgJson, destPkgJson);
    fileUpdates.files.push({
      path: destPath,
      content: JSON.stringify(srcPkgJson, null, 2) + "\n",
      type: "modify"
    });
  } catch (e2) {
    fileUpdates.files.push({
      path: destPath,
      content: srcContent,
      type: "create"
    });
  }
}
function mergePackageJsonSort(src, dest, prop) {
  if (src[prop]) {
    if (dest[prop]) {
      Object.assign(dest[prop], { ...src[prop] });
    } else {
      dest[prop] = { ...src[prop] };
    }
    const sorted = {};
    const keys = Object.keys(dest[prop]).sort();
    for (const key of keys) {
      sorted[key] = dest[prop][key];
    }
    dest[prop] = sorted;
  }
}
async function mergeReadmes(fileUpdates, srcPath, destPath) {
  const srcContent = await import_node_fs4.default.promises.readFile(srcPath, "utf-8");
  let type;
  let destContent = "";
  try {
    destContent = await import_node_fs4.default.promises.readFile(destPath, "utf-8");
    destContent = destContent.trim() + "\n\n" + srcContent;
    type = "modify";
  } catch (e2) {
    destContent = srcContent;
    type = "create";
  }
  const pkgManager = getPackageManager();
  if (pkgManager !== "npm") {
    destContent = destContent.replace(/npm run/g, pkgManager);
  }
  fileUpdates.files.push({
    path: destPath,
    content: destContent.trim() + "\n",
    type
  });
}
async function mergeIgnoresFile(fileUpdates, srcPath, destPath) {
  const srcContent = await import_node_fs4.default.promises.readFile(srcPath, "utf-8");
  try {
    const destContent = await import_node_fs4.default.promises.readFile(destPath, "utf-8");
    const srcLines = srcContent.trim().split(/\r?\n/);
    const destLines = destContent.trim().split(/\r?\n/);
    for (const srcLine of srcLines) {
      if (!destLines.includes(srcLine)) {
        if (srcLine.startsWith("#")) {
          destLines.push("");
        }
        destLines.push(srcLine);
      }
    }
    fileUpdates.files.push({
      path: destPath,
      content: destLines.join("\n").trim() + "\n",
      type: "modify"
    });
  } catch (e2) {
    fileUpdates.files.push({
      path: destPath,
      content: srcContent,
      type: "create"
    });
  }
}
async function mergeCss(fileUpdates, srcPath, destPath) {
  const srcContent = await import_node_fs4.default.promises.readFile(srcPath, "utf-8");
  try {
    const destContent = await import_node_fs4.default.promises.readFile(destPath, "utf-8");
    const mergedContent = srcContent.trim() + "\n\n" + destContent.trim() + "\n";
    fileUpdates.files.push({
      path: destPath,
      content: mergedContent,
      type: "modify"
    });
  } catch (e2) {
    fileUpdates.files.push({
      path: destPath,
      content: srcContent,
      type: "create"
    });
  }
}

// packages/qwik/src/cli/add/update-vite-config.ts
var import_fs = __toESM(require("fs"), 1);
var import_path = require("path");

// packages/qwik/src/cli/code-mod/code-mod.ts
function updateViteConfig(ts, sourceText, updates) {
  if (!(updates == null ? void 0 : updates.imports) && !(updates == null ? void 0 : updates.qwikViteConfig) && !(updates == null ? void 0 : updates.viteConfig) && !(updates == null ? void 0 : updates.vitePlugins) && !(updates == null ? void 0 : updates.vitePluginsPrepend)) {
    return null;
  }
  sourceText = transformSource(ts, sourceText, () => (tsSourceFile) => {
    if (updates.imports) {
      for (const importData of updates.imports) {
        tsSourceFile = ensureImport(ts, tsSourceFile, importData);
      }
    }
    const statements = [];
    for (const s of tsSourceFile.statements) {
      if (ts.isExportAssignment(s) && s.expression && ts.isCallExpression(s.expression)) {
        if (ts.isIdentifier(s.expression.expression) && s.expression.expression.text === "defineConfig" && (updates.viteConfig || updates.qwikViteConfig || updates.vitePlugins || updates.vitePluginsPrepend)) {
          statements.push(
            ts.factory.updateExportAssignment(
              s,
              s.modifiers,
              updateDefineConfig(ts, s.expression, updates)
            )
          );
          continue;
        }
      }
      statements.push(s);
    }
    return ts.factory.updateSourceFile(tsSourceFile, statements);
  });
  return sourceText;
}
function ensureImport(ts, tsSourceFile, importData) {
  if (importData && importData.importPath) {
    if (Array.isArray(importData.namedImports)) {
      importData.namedImports.forEach((namedImport) => {
        tsSourceFile = ensureNamedImport(ts, tsSourceFile, namedImport, importData.importPath);
      });
    }
    if (typeof importData.defaultImport === "string") {
      tsSourceFile = ensureDefaultImport(
        ts,
        tsSourceFile,
        importData.defaultImport,
        importData.importPath
      );
    }
  }
  return tsSourceFile;
}
function ensureNamedImport(ts, tsSourceFile, namedImport, importPath) {
  if (!hasNamedImport(ts, tsSourceFile, namedImport, importPath)) {
    tsSourceFile = appendImports(ts, tsSourceFile, null, namedImport, importPath);
  }
  return tsSourceFile;
}
function ensureDefaultImport(ts, tsSourceFile, defaultImport, importPath) {
  if (!hasDefaultImport(ts, tsSourceFile, importPath)) {
    tsSourceFile = appendImports(ts, tsSourceFile, defaultImport, null, importPath);
  }
  return tsSourceFile;
}
function hasNamedImport(ts, tsSourceFile, namedImport, importPath) {
  return !!findNamedImport(ts, tsSourceFile, namedImport, importPath);
}
function hasDefaultImport(ts, tsSourceFile, importPath) {
  return !!findDefaultImport(ts, tsSourceFile, importPath);
}
function findNamedImport(ts, tsSourceFile, namedImport, importPath) {
  return findImportDeclarations(ts, tsSourceFile).find((n) => {
    if (n.importClause && n.moduleSpecifier && ts.isStringLiteral(n.moduleSpecifier)) {
      if (n.moduleSpecifier.text !== importPath) {
        return false;
      }
      const namedImports = n.importClause.namedBindings;
      if (namedImports && ts.isNamedImports(namedImports) && namedImports.elements) {
        return namedImports.elements.some((namedImportElement) => {
          if (ts.isImportSpecifier(namedImportElement)) {
            const importName = namedImportElement.name;
            if (importName && ts.isIdentifier(importName)) {
              return importName.text === namedImport;
            }
          }
          return false;
        });
      }
    }
    return false;
  });
}
function findDefaultImport(ts, tsSourceFile, importPath) {
  return findImportDeclarations(ts, tsSourceFile).find((n) => {
    if (n.importClause && n.moduleSpecifier) {
      const modulePath = n.moduleSpecifier;
      if (ts.isStringLiteral(modulePath) && modulePath.text === importPath) {
        const moduleDefault = n.importClause.name;
        if (moduleDefault && moduleDefault.text === importPath) {
          return true;
        }
      }
    }
    return false;
  });
}
function findImportDeclarations(ts, tsSourceFile) {
  return tsSourceFile.statements.filter(ts.isImportDeclaration);
}
function appendImports(ts, tsSourceFile, defaultImport, namedImport, importPath) {
  const statements = tsSourceFile.statements.slice();
  let foundExistingImport = false;
  for (let i = statements.length - 1; i >= 0; i--) {
    const n = statements[i];
    if (!ts.isImportDeclaration(n)) {
      continue;
    }
    if (!n.moduleSpecifier || !ts.isStringLiteral(n.moduleSpecifier)) {
      continue;
    }
    if (n.moduleSpecifier.text !== importPath) {
      continue;
    }
    foundExistingImport = true;
    const existingNamedImports = [];
    if (n.importClause) {
      const namedImports = n.importClause.namedBindings;
      if (namedImports && ts.isNamedImports(namedImports) && namedImports.elements) {
        existingNamedImports.push(...namedImports.elements);
      }
    }
    if (typeof namedImport === "string") {
      const identifier = ts.factory.createIdentifier(namedImport);
      const importSpecifier = ts.factory.createImportSpecifier(false, void 0, identifier);
      existingNamedImports.push(importSpecifier);
    }
    existingNamedImports.sort((a2, b2) => {
      const aName = a2.name.escapedText.toString();
      const bName = b2.name.escapedText.toString();
      return aName < bName ? -1 : 1;
    });
    let defaultIdentifier = n.importClause ? n.importClause.name : void 0;
    if (typeof defaultImport === "string") {
      defaultIdentifier = ts.factory.createIdentifier(defaultImport);
    }
    let namedBindings = void 0;
    if (existingNamedImports.length > 0) {
      namedBindings = ts.factory.createNamedImports(existingNamedImports);
    }
    statements[i] = ts.factory.updateImportDeclaration(
      n,
      void 0,
      ts.factory.createImportClause(false, defaultIdentifier, namedBindings),
      n.moduleSpecifier,
      void 0
    );
  }
  if (!foundExistingImport) {
    let defaultIdentifier = void 0;
    let namedBindings = void 0;
    if (typeof defaultImport === "string") {
      defaultIdentifier = ts.factory.createIdentifier(defaultImport);
    }
    if (typeof namedImport === "string") {
      namedBindings = ts.factory.createNamedImports([
        ts.factory.createImportSpecifier(
          false,
          void 0,
          ts.factory.createIdentifier(namedImport)
        )
      ]);
    }
    const newNamedImport = ts.factory.createImportDeclaration(
      void 0,
      ts.factory.createImportClause(false, defaultIdentifier, namedBindings),
      ts.factory.createStringLiteral(importPath)
    );
    const lastImportIndex = findLastImportIndex(ts, tsSourceFile);
    statements.splice(lastImportIndex + 1, 0, newNamedImport);
  }
  return ts.factory.updateSourceFile(tsSourceFile, statements);
}
function findLastImportIndex(ts, tsSourceFile) {
  for (let i = tsSourceFile.statements.length - 1; i >= 0; i--) {
    const s = tsSourceFile.statements[i];
    if (ts.isImportDeclaration(s)) {
      return i;
    }
    if (ts.isStringLiteral(s) && s.text === "use strict") {
      return i;
    }
  }
  return 0;
}
function updateDefineConfig(ts, callExp, updates) {
  const args = [];
  for (let i = 0; i < callExp.arguments.length; i++) {
    const exp = callExp.arguments[i];
    if (i === 0) {
      if (ts.isArrowFunction(exp) && ts.isBlock(exp.body)) {
        args.push(
          ts.factory.updateArrowFunction(
            exp,
            exp.modifiers,
            exp.typeParameters,
            exp.parameters,
            exp.type,
            exp.equalsGreaterThanToken,
            updateDefineConfigFnReturn(ts, exp.body, updates)
          )
        );
        continue;
      }
      if (ts.isFunctionExpression(exp) && ts.isBlock(exp.body)) {
        args.push(
          ts.factory.updateFunctionExpression(
            exp,
            exp.modifiers,
            exp.asteriskToken,
            exp.name,
            exp.typeParameters,
            exp.parameters,
            exp.type,
            updateDefineConfigFnReturn(ts, exp.body, updates)
          )
        );
        continue;
      }
      if (ts.isObjectLiteralExpression(exp)) {
        args.push(updateVitConfigObj(ts, exp, updates));
        continue;
      }
    }
    args.push(exp);
  }
  return ts.factory.updateCallExpression(callExp, callExp.expression, callExp.typeArguments, args);
}
function updateDefineConfigFnReturn(ts, fnBody, updates) {
  const statements = [];
  for (const s of fnBody.statements) {
    if (ts.isReturnStatement(s) && s.expression && ts.isObjectLiteralExpression(s.expression)) {
      statements.push(
        ts.factory.updateReturnStatement(s, updateVitConfigObj(ts, s.expression, updates))
      );
    } else {
      statements.push(s);
    }
  }
  return ts.factory.updateBlock(fnBody, statements);
}
function updateVitConfigObj(ts, obj, updates) {
  if (updates.viteConfig) {
    obj = updateObjectLiteralExpression(ts, obj, updates.viteConfig);
  }
  if (updates.vitePlugins || updates.vitePluginsPrepend || updates.qwikViteConfig) {
    obj = updatePlugins(ts, obj, updates);
  }
  return obj;
}
function updatePlugins(ts, obj, updates) {
  const properties = [];
  for (const p3 of obj.properties) {
    if (ts.isPropertyAssignment(p3)) {
      if (p3.name && ts.isIdentifier(p3.name) && p3.name.text === "plugins") {
        if (ts.isArrayLiteralExpression(p3.initializer)) {
          properties.push(
            ts.factory.updatePropertyAssignment(
              p3,
              p3.name,
              updatePluginsArray(ts, p3.initializer, updates)
            )
          );
          continue;
        }
      }
    }
    properties.push(p3);
  }
  return ts.factory.updateObjectLiteralExpression(obj, properties);
}
function updatePluginsArray(ts, arr, updates) {
  var _a, _b;
  const elms = [...arr.elements];
  if (updates.vitePlugins) {
    for (const vitePlugin of updates.vitePlugins) {
      const pluginExp = createPluginCall(ts, vitePlugin);
      const pluginName = (_a = pluginExp == null ? void 0 : pluginExp.expression) == null ? void 0 : _a.escapedText;
      const alreadyDefined = elms.some(
        (el) => ts.isCallExpression(el) && ts.isIdentifier(el.expression) && el.expression.escapedText === pluginName
      );
      if (pluginExp && !alreadyDefined) {
        elms.push(pluginExp);
      }
    }
  }
  if (updates.vitePluginsPrepend) {
    for (const vitePlugin of updates.vitePluginsPrepend) {
      const pluginExp = createPluginCall(ts, vitePlugin);
      const pluginName = (_b = pluginExp == null ? void 0 : pluginExp.expression) == null ? void 0 : _b.escapedText;
      const alreadyDefined = elms.some(
        (el) => ts.isCallExpression(el) && ts.isIdentifier(el.expression) && el.expression.escapedText === pluginName
      );
      if (pluginExp && !alreadyDefined) {
        elms.unshift(pluginExp);
      }
    }
  }
  if (updates.qwikViteConfig) {
    for (let i = 0; i < elms.length; i++) {
      const elm = elms[i];
      if (ts.isCallExpression(elm) && ts.isIdentifier(elm.expression)) {
        if (elm.expression.escapedText === "qwikVite") {
          elms[i] = updateQwikCityPlugin(ts, elm, updates.qwikViteConfig);
        }
      }
    }
  }
  return ts.factory.updateArrayLiteralExpression(arr, elms);
}
function createPluginCall(ts, vitePlugin) {
  if (typeof vitePlugin === "string") {
    const tmp = ts.createSourceFile(
      "tmp.ts",
      "export default " + vitePlugin,
      ts.ScriptTarget.Latest
    );
    for (const s of tmp.statements) {
      if (ts.isExportAssignment(s)) {
        return s.expression;
      }
    }
  }
  return null;
}
function updateQwikCityPlugin(ts, callExp, qwikViteConfig) {
  const args = callExp.arguments.slice();
  const config = args[0] && ts.isObjectLiteralExpression(args[0]) ? args[0] : ts.factory.createObjectLiteralExpression();
  args[0] = updateObjectLiteralExpression(ts, config, qwikViteConfig);
  return ts.factory.updateCallExpression(callExp, callExp.expression, callExp.typeArguments, args);
}
function updateObjectLiteralExpression(ts, obj, updateObj) {
  for (const [propName, value] of Object.entries(updateObj)) {
    if (typeof value === "string") {
      const tmp = ts.createSourceFile("tmp.ts", "export default " + value, ts.ScriptTarget.Latest);
      for (const s of tmp.statements) {
        if (ts.isExportAssignment(s)) {
          const exp = s.expression;
          let added = false;
          const properties = [];
          for (const p3 of obj.properties) {
            if (p3.name && ts.isIdentifier(p3.name) && p3.name.text === propName) {
              properties.push(ts.factory.createPropertyAssignment(propName, exp));
              added = true;
            } else {
              properties.push(p3);
            }
          }
          if (!added) {
            properties.unshift(ts.factory.createPropertyAssignment(propName, exp));
          }
          obj = ts.factory.updateObjectLiteralExpression(obj, properties);
        }
      }
    }
  }
  return obj;
}
function transformSource(ts, sourceText, transformer) {
  const t = ts.transform(ts.createSourceFile("/tmp.ts", sourceText, ts.ScriptTarget.Latest), [
    transformer
  ]);
  const p3 = ts.createPrinter({
    removeComments: false,
    omitTrailingSemicolon: false,
    noEmitHelpers: true
  });
  return p3.printFile(t.transformed[0]);
}

// packages/qwik/src/cli/add/update-vite-config.ts
async function updateViteConfigs(fileUpdates, integration, rootDir) {
  var _a;
  try {
    const viteConfig = (_a = integration.pkgJson.__qwik__) == null ? void 0 : _a.viteConfig;
    if (viteConfig) {
      const viteConfigPath = (0, import_path.join)(rootDir, "vite.config.ts");
      const destContent = await import_fs.default.promises.readFile(viteConfigPath, "utf-8");
      const ts = (await import("typescript")).default;
      let updatedContent = updateViteConfig(ts, destContent, viteConfig);
      if (updatedContent) {
        try {
          const prettier = (await import("prettier")).default;
          let prettierOpts = {
            filepath: viteConfigPath
          };
          const opts = await prettier.resolveConfig(viteConfigPath);
          if (opts) {
            prettierOpts = { ...opts, ...prettierOpts };
          }
          updatedContent = prettier.format(updatedContent, prettierOpts);
          updatedContent = updatedContent.replace(`export default`, `
export default`);
        } catch (e2) {
          console.error(e2);
        }
        fileUpdates.files.push({
          path: viteConfigPath,
          content: updatedContent,
          type: "modify"
        });
      }
    }
  } catch (e2) {
    panic(String(e2));
  }
}

// packages/qwik/src/cli/add/update-app.ts
async function updateApp(pkgManager, opts) {
  const integrations2 = await loadIntegrations();
  const integration = integrations2.find((s) => s.id === opts.integration);
  if (!integration) {
    throw new Error(`Unable to find integration "${opts.integration}"`);
  }
  const fileUpdates = {
    files: [],
    installedDeps: {},
    installedScripts: Object.keys(integration.pkgJson.scripts || {})
  };
  if (opts.installDeps) {
    fileUpdates.installedDeps = {
      ...integration.pkgJson.dependencies,
      ...integration.pkgJson.devDependencies
    };
  }
  await mergeIntegrationDir(fileUpdates, opts, integration.dir, opts.rootDir);
  if (true) {
    await updateViteConfigs(fileUpdates, integration, opts.rootDir);
  }
  const commit = async (showSpinner) => {
    const isInstallingDeps = Object.keys(fileUpdates.installedDeps).length > 0;
    const s = le();
    if (showSpinner) {
      s.start(`Updating app${isInstallingDeps ? " and installing dependencies" : ""}...`);
    }
    let passed = true;
    try {
      const dirs = new Set(fileUpdates.files.map((f3) => (0, import_node_path5.dirname)(f3.path)));
      for (const dir of Array.from(dirs)) {
        try {
          import_node_fs5.default.mkdirSync(dir, { recursive: true });
        } catch (e2) {
        }
      }
      const fsWrites = Promise.all(
        fileUpdates.files.map(async (f3) => {
          await import_node_fs5.default.promises.writeFile(f3.path, f3.content);
        })
      );
      if (opts.installDeps && Object.keys(fileUpdates.installedDeps).length > 0) {
        const { install } = installDeps(pkgManager, opts.rootDir);
        passed = await install;
      }
      await fsWrites;
      showSpinner && s.stop("App updated");
      if (!passed) {
        const errorMessage = `${bgRed(
          ` ${pkgManager} install failed `
        )}
 You might need to run "${cyan(
          `${pkgManager} install`
        )}" manually inside the root of the project.`;
        g2.error(errorMessage);
      }
    } catch (e2) {
      showSpinner && s.stop("App updated");
      panic(String(e2));
    }
  };
  const result = {
    rootDir: opts.rootDir,
    integration,
    updates: fileUpdates,
    commit
  };
  return result;
}

// packages/qwik/src/cli/add/run-add-interactive.ts
var import_node_path6 = require("path");

// packages/qwik/src/cli/utils/log.ts
function logNextStep(nextSteps, packageManager) {
  const outString = [];
  if (nextSteps) {
    nextSteps.lines.forEach(
      (step) => outString.push(`   ${step.replace(/\bpnpm\b/g, packageManager)}`)
    );
  }
  return outString.join("\n");
}

// packages/qwik/src/cli/add/run-add-interactive.ts
async function runAddInteractive(app, id) {
  var _a;
  const pkgManager = getPackageManager();
  const integrations2 = await loadIntegrations();
  let integration;
  console.clear();
  printHeader();
  if (typeof id === "string") {
    integration = integrations2.find((i) => i.id === id);
    if (!integration) {
      throw new Error(`Invalid integration: ${id}`);
    }
    ae(`\u{1F98B} ${bgBlue(` Add Integration `)} ${bold(magenta(integration.id))}`);
  } else {
    ae(`\u{1F98B} ${bgBlue(` Add Integration `)}`);
    const integrationChoices = [
      ...integrations2.filter((i) => i.type === "adapter"),
      ...integrations2.filter((i) => i.type === "feature")
    ];
    const integrationAnswer = await ee({
      message: "What integration would you like to add?",
      options: await sortIntegrationsAndReturnAsClackOptions(integrationChoices)
    });
    if (eD(integrationAnswer)) {
      bye();
    }
    integration = integrations2.find((i) => i.id === integrationAnswer);
    if (!integration) {
      throw new Error(`Invalid integration: ${id}`);
    }
  }
  const integrationHasDeps = Object.keys({
    ...integration.pkgJson.dependencies,
    ...integration.pkgJson.devDependencies
  }).length > 0;
  let runInstall = false;
  if (integrationHasDeps) {
    runInstall = true;
  }
  const result = await updateApp(pkgManager, {
    rootDir: app.rootDir,
    integration: integration.id,
    installDeps: runInstall
  });
  await logUpdateAppResult(pkgManager, result);
  await result.commit(true);
  const postInstall = (_a = result.integration.pkgJson.__qwik__) == null ? void 0 : _a.postInstall;
  if (postInstall) {
    const s = le();
    s.start(`Running post install script: ${postInstall}`);
    await runInPkg(pkgManager, postInstall.split(" "), app.rootDir);
    s.stop("Post install script complete");
  }
  logUpdateAppCommitResult(result, pkgManager);
  process.exit(0);
}
async function logUpdateAppResult(pkgManager, result) {
  const modifyFiles = result.updates.files.filter((f3) => f3.type === "modify");
  const overwriteFiles = result.updates.files.filter((f3) => f3.type === "overwrite");
  const createFiles = result.updates.files.filter((f3) => f3.type === "create");
  const installDepNames = Object.keys(result.updates.installedDeps);
  const installScripts = result.updates.installedScripts;
  const installDeps2 = installDepNames.length > 0;
  if (modifyFiles.length === 0 && overwriteFiles.length === 0 && createFiles.length === 0 && installScripts.length === 0 && !installDeps2) {
    panic(`No updates made`);
  }
  g2.step(`\u{1F47B} ${bgBlue(` Ready? `)} Add ${bold(magenta(result.integration.id))} to your app?`);
  if (modifyFiles.length > 0) {
    g2.message(
      [
        `\u{1F42C} ${cyan("Modify")}`,
        ...modifyFiles.map((f3) => `   - ${(0, import_node_path6.relative)(process.cwd(), f3.path)}`)
      ].join("\n")
    );
  }
  if (createFiles.length > 0) {
    g2.message(
      [
        `\u{1F31F} ${cyan(`Create`)}`,
        ...createFiles.map((f3) => `   - ${(0, import_node_path6.relative)(process.cwd(), f3.path)}`)
      ].join("\n")
    );
  }
  if (overwriteFiles.length > 0) {
    g2.message(
      [
        `\u{1F433} ${cyan(`Overwrite`)}`,
        ...overwriteFiles.map((f3) => `   - ${(0, import_node_path6.relative)(process.cwd(), f3.path)}`)
      ].join("\n")
    );
  }
  if (installDepNames.length > 0) {
    g2.message(
      [
        `\u{1F4BE} ${cyan(`Install ${pkgManager} dependenc${installDepNames.length > 1 ? "ies" : "y"}:`)}`,
        ...installDepNames.map(
          (depName) => `   - ${depName} ${result.updates.installedDeps[depName]}`
        )
      ].join("\n")
    );
  }
  if (installScripts.length > 0) {
    const prefix = pkgManager === "npm" ? "npm run" : pkgManager;
    g2.message(
      [
        `\u{1F4DC} ${cyan(`New ${pkgManager} script${installDepNames.length > 1 ? "s" : ""}:`)}`,
        ...installScripts.map((script) => `   - ${prefix} ${script}`)
      ].join("\n")
    );
  }
  const commit = await ee({
    message: `Ready to apply the ${bold(magenta(result.integration.id))} updates to your app?`,
    options: [
      { label: "Yes looks good, finish update!", value: true },
      { label: "Nope, cancel update", value: false }
    ]
  });
  if (eD(commit) || !commit) {
    bye();
  }
}
function logUpdateAppCommitResult(result, pkgManager) {
  var _a;
  if (result.updates.installedScripts.length > 0) {
    const prefix = pkgManager === "npm" ? "npm run" : pkgManager;
    const message = result.updates.installedScripts.map((script) => `   - ${prefix} ${green(script)}`).join("\n");
    note(message, "New scripts added");
  }
  const nextSteps = (_a = result.integration.pkgJson.__qwik__) == null ? void 0 : _a.nextSteps;
  if (nextSteps) {
    const noteMessage = `\u{1F7E3} ${bgMagenta(` ${nextSteps.title ?? "Action Required!"} `)}`;
    note(logNextStep(nextSteps, pkgManager), noteMessage);
  }
  ce(`\u{1F984} ${bgMagenta(` Success! `)} Added ${bold(cyan(result.integration.id))} to your app`);
}

// packages/qwik/src/cli/add/print-add-help.ts
var SPACE_TO_HINT = 25;
var MAX_HINT_LENGTH = 50;
function renderIntegration(integrations2) {
  return integrations2.map((integration) => {
    const hint = limitLength(integration.pkgJson.description, MAX_HINT_LENGTH);
    return integration.id + " ".repeat(Math.max(SPACE_TO_HINT - integration.id.length, 2)) + dim(hint);
  }).join("\n");
}
async function printAddHelp(app) {
  const integrations2 = await loadIntegrations();
  const adapters = integrations2.filter((i) => i.type === "adapter");
  const features = integrations2.filter((i) => i.type === "feature");
  const pmRun = pmRunCmd();
  ae(`${pmRun} qwik ${magenta(`add`)} [integration]`);
  note(renderIntegration(adapters), "Adapters");
  note(renderIntegration(features), "Features");
  const proceed = await Q2({
    message: "Do you want to install an integration?",
    initialValue: true
  });
  if (eD(proceed) || !proceed) {
    bye();
  }
  const command = await ee({
    message: "Select an integration",
    options: await sortIntegrationsAndReturnAsClackOptions(integrations2)
  });
  if (eD(command)) {
    bye();
  }
  runAddInteractive(app, command);
}

// packages/qwik/src/cli/add/run-add-command.ts
async function runAddCommand(app) {
  try {
    const id = app.args[1];
    if (id === "help") {
      await printAddHelp(app);
    } else {
      await runAddInteractive(app, id);
    }
  } catch (e2) {
    console.error(`\u274C ${red(String(e2))}
`);
    process.exit(1);
  }
}

// packages/qwik/src/cli/new/run-new-command.ts
var import_node_fs7 = __toESM(require("fs"), 1);
var import_path2 = require("path");

// packages/qwik/src/cli/utils/templates.ts
var import_node_fs6 = __toESM(require("fs"), 1);
var import_node_path7 = require("path");
var templates = null;
async function loadTemplates() {
  if (!templates) {
    const allTemplates = [];
    const templatesDir = (0, import_node_path7.join)(__dirname, "templates");
    const templatesDirNames = await import_node_fs6.default.promises.readdir(templatesDir);
    await Promise.all(
      templatesDirNames.map(async (templatesDirName) => {
        const dir = (0, import_node_path7.join)(templatesDir, templatesDirName);
        const files = await readTemplates(dir);
        const template = { id: templatesDirName, ...files };
        allTemplates.push(template);
      })
    );
    allTemplates.sort((a2, b2) => {
      if (a2.id === "qwik") {
        return -1;
      } else if (b2.id === "qwik") {
        return 1;
      }
      return a2.id > b2.id ? 1 : -1;
    });
    templates = allTemplates;
  }
  return templates;
}
async function readTemplates(rootDir) {
  const componentDir = (0, import_node_path7.join)(rootDir, "component");
  const routeDir = (0, import_node_path7.join)(rootDir, "route");
  const component = await getFilesDeep(componentDir);
  const route = await getFilesDeep(routeDir);
  return {
    component: component.map((c2) => parseTemplatePath(c2, "component")),
    route: route.map((r2) => parseTemplatePath(r2, "route"))
  };
}
function parseTemplatePath(path3, type) {
  const parts = path3.split(`/${type}/`);
  return {
    absolute: path3,
    relative: parts[1]
  };
}

// packages/qwik/src/cli/new/print-new-help.ts
async function printNewHelp() {
  const pmRun = pmRunCmd();
  const templates2 = await loadTemplates();
  const outString = [];
  outString.push(`${cyan("Interactive")}`);
  outString.push(`  ${pmRun} qwik ${magenta(`new`)}`);
  outString.push(``);
  outString.push(`${cyan("New route")}`);
  outString.push(
    `  ${pmRun} qwik ${magenta(`new /about`)}: ${dim("Create a new route for /about")}`
  );
  outString.push(``);
  outString.push(`${cyan("New component")}`);
  outString.push(
    `  ${pmRun} qwik ${magenta(`new my-button`)}: ${dim(
      "Create a new component in src/components/my-button"
    )}`
  );
  outString.push(
    `  ${pmRun} qwik ${magenta(`new nested/my-button`)}: ${dim(
      "Create a new component in src/components/nested/my-button"
    )}`
  );
  outString.push(``);
  outString.push(`${cyan("Available templates")}`);
  for (const t of templates2) {
    let postfix = "";
    if (t.id === "qwik") {
      postfix = " (default)";
    }
    outString.push(`  ${t.id}${gray(postfix)}`);
  }
  note(outString.join("\n"), "Available commands");
}

// packages/qwik/src/cli/new/utils.ts
var POSSIBLE_TYPES = ["component", "route"];

// packages/qwik/src/cli/new/run-new-command.ts
var SLUG_KEY = "[slug]";
var NAME_KEY = "[name]";
async function runNewCommand(app) {
  try {
    if (app.args.length > 1 && app.args[1] === "help") {
      ae(`\u{1F52D}  ${bgMagenta(" Qwik Help ")}`);
      await printNewHelp();
      bye();
    } else {
      ae(`\u2728  ${bgMagenta(" Create a new Qwik component or route ")}`);
    }
    const args = app.args.filter((a2) => !a2.startsWith("--"));
    const mainInput = args.slice(1).join(" ");
    let typeArg = void 0;
    let nameArg;
    let outDir;
    if (mainInput && mainInput.startsWith("/")) {
      typeArg = "route";
      nameArg = mainInput;
    } else if (mainInput) {
      typeArg = "component";
      nameArg = mainInput;
    }
    let templateArg = app.args.filter((a2) => a2.startsWith("--")).map((a2) => a2.substring(2)).join("");
    if (!templateArg && mainInput) {
      templateArg = "qwik";
    }
    if (!typeArg) {
      typeArg = await selectType();
    }
    if (!POSSIBLE_TYPES.includes(typeArg)) {
      throw new Error(`Invalid type: ${typeArg}`);
    }
    if (!nameArg) {
      nameArg = await selectName(typeArg);
    }
    const { name, slug } = parseInputName(nameArg);
    let template;
    if (!templateArg) {
      template = await selectTemplate(typeArg);
    } else {
      const allTemplates = await loadTemplates();
      const templates2 = allTemplates.filter(
        (i) => i.id === templateArg && i[typeArg] && i[typeArg].length
      );
      if (!templates2.length) {
        g2.error(`Template "${templateArg}" not found`);
        bye();
      }
      template = templates2[0][typeArg][0];
    }
    if (typeArg === "route") {
      outDir = (0, import_path2.join)(app.rootDir, "src", `routes`, nameArg);
    } else {
      outDir = (0, import_path2.join)(app.rootDir, "src", `components`, nameArg);
    }
    const fileOutput = await writeToFile(name, slug, template, outDir);
    g2.success(`${green(`${toPascal([typeArg])} "${name}" created!`)}`);
    g2.message(`Emitted in ${dim(fileOutput)}`);
  } catch (e2) {
    g2.error(String(e2));
    await printNewHelp();
  }
  bye();
}
async function selectType() {
  const typeAnswer = await ee({
    message: "What would you like to create?",
    options: [
      { value: "component", label: "Component" },
      { value: "route", label: "Route" }
    ]
  });
  if (eD(typeAnswer)) {
    bye();
  }
  return typeAnswer;
}
async function selectName(type) {
  const message = type === "route" ? "New route path" : "Name your component";
  const placeholder = type === "route" ? "/product/[id]" : "my-component";
  const nameAnswer = await J2({
    message,
    placeholder,
    validate: (v2) => {
      if (v2.length < 1) {
        return "Value can not be empty";
      }
    }
  });
  if (eD(nameAnswer)) {
    bye();
  }
  if (typeof nameAnswer !== "string") {
    bye();
  }
  if (type === "route" && !nameAnswer.startsWith("/")) {
    return `/${nameAnswer}`;
  }
  return nameAnswer;
}
async function selectTemplate(typeArg) {
  const allTemplates = await loadTemplates();
  const templates2 = allTemplates.filter((i) => i[typeArg] && i[typeArg].length);
  if (!templates2.length) {
    g2.error(`No templates found for type "${typeArg}"`);
    bye();
  }
  if (templates2.length === 1) {
    return templates2[0][typeArg][0];
  }
  const templateAnswer = await ee({
    message: "Which template would you like to use?",
    options: templates2.map((t) => ({ value: t[typeArg][0], label: t.id }))
  });
  if (eD(templateAnswer)) {
    bye();
  }
  return templateAnswer;
}
async function writeToFile(name, slug, template, outDir) {
  const outFile = (0, import_path2.join)(outDir, template.relative);
  const fileOutput = inject(outFile, [
    [SLUG_KEY, slug],
    [".template", ""]
  ]);
  if (import_node_fs7.default.existsSync(fileOutput)) {
    const filename = fileOutput.split("/").pop();
    throw new Error(`"${filename}" already exists in "${outDir}"`);
  }
  const text = await import_node_fs7.default.promises.readFile(template.absolute, { encoding: "utf-8" });
  const templateOut = inject(text, [
    [SLUG_KEY, slug],
    [NAME_KEY, name]
  ]);
  await import_node_fs7.default.promises.mkdir(outDir, { recursive: true });
  await import_node_fs7.default.promises.writeFile(fileOutput, templateOut, { encoding: "utf-8" });
  return fileOutput;
}
function inject(raw, vars) {
  let output = raw;
  for (const v2 of vars) {
    output = output.replaceAll(v2[0], v2[1]);
  }
  return output;
}
function parseInputName(input) {
  const parts = input.split(/[-_\s]/g);
  return {
    slug: toSlug(parts),
    name: toPascal(parts)
  };
}
function toSlug(list) {
  return list.join("-").toLowerCase();
}
function toPascal(list) {
  return list.map((p3) => p3[0].toUpperCase() + p3.substring(1).toLowerCase()).join("");
}

// node_modules/.pnpm/execa@7.1.1/node_modules/execa/index.js
var import_node_buffer2 = require("buffer");
var import_node_path9 = __toESM(require("path"), 1);
var import_node_child_process3 = __toESM(require("child_process"), 1);
var import_node_process5 = __toESM(require("process"), 1);
var import_cross_spawn2 = __toESM(require_cross_spawn(), 1);

// node_modules/.pnpm/strip-final-newline@3.0.0/node_modules/strip-final-newline/index.js
function stripFinalNewline(input) {
  const LF = typeof input === "string" ? "\n" : "\n".charCodeAt();
  const CR = typeof input === "string" ? "\r" : "\r".charCodeAt();
  if (input[input.length - 1] === LF) {
    input = input.slice(0, -1);
  }
  if (input[input.length - 1] === CR) {
    input = input.slice(0, -1);
  }
  return input;
}

// node_modules/.pnpm/npm-run-path@5.1.0/node_modules/npm-run-path/index.js
var import_node_process3 = __toESM(require("process"), 1);
var import_node_path8 = __toESM(require("path"), 1);
var import_node_url = __toESM(require("url"), 1);

// node_modules/.pnpm/path-key@4.0.0/node_modules/path-key/index.js
function pathKey(options = {}) {
  const {
    env = process.env,
    platform = process.platform
  } = options;
  if (platform !== "win32") {
    return "PATH";
  }
  return Object.keys(env).reverse().find((key) => key.toUpperCase() === "PATH") || "Path";
}

// node_modules/.pnpm/npm-run-path@5.1.0/node_modules/npm-run-path/index.js
function npmRunPath(options = {}) {
  const {
    cwd = import_node_process3.default.cwd(),
    path: path_ = import_node_process3.default.env[pathKey()],
    execPath = import_node_process3.default.execPath
  } = options;
  let previous;
  const cwdString = cwd instanceof URL ? import_node_url.default.fileURLToPath(cwd) : cwd;
  let cwdPath = import_node_path8.default.resolve(cwdString);
  const result = [];
  while (previous !== cwdPath) {
    result.push(import_node_path8.default.join(cwdPath, "node_modules/.bin"));
    previous = cwdPath;
    cwdPath = import_node_path8.default.resolve(cwdPath, "..");
  }
  result.push(import_node_path8.default.resolve(cwdString, execPath, ".."));
  return [...result, path_].join(import_node_path8.default.delimiter);
}
function npmRunPathEnv({ env = import_node_process3.default.env, ...options } = {}) {
  env = { ...env };
  const path3 = pathKey({ env });
  options.path = env[path3];
  env[path3] = npmRunPath(options);
  return env;
}

// node_modules/.pnpm/mimic-fn@4.0.0/node_modules/mimic-fn/index.js
var copyProperty = (to, from, property, ignoreNonConfigurable) => {
  if (property === "length" || property === "prototype") {
    return;
  }
  if (property === "arguments" || property === "caller") {
    return;
  }
  const toDescriptor = Object.getOwnPropertyDescriptor(to, property);
  const fromDescriptor = Object.getOwnPropertyDescriptor(from, property);
  if (!canCopyProperty(toDescriptor, fromDescriptor) && ignoreNonConfigurable) {
    return;
  }
  Object.defineProperty(to, property, fromDescriptor);
};
var canCopyProperty = function(toDescriptor, fromDescriptor) {
  return toDescriptor === void 0 || toDescriptor.configurable || toDescriptor.writable === fromDescriptor.writable && toDescriptor.enumerable === fromDescriptor.enumerable && toDescriptor.configurable === fromDescriptor.configurable && (toDescriptor.writable || toDescriptor.value === fromDescriptor.value);
};
var changePrototype = (to, from) => {
  const fromPrototype = Object.getPrototypeOf(from);
  if (fromPrototype === Object.getPrototypeOf(to)) {
    return;
  }
  Object.setPrototypeOf(to, fromPrototype);
};
var wrappedToString = (withName, fromBody) => `/* Wrapped ${withName}*/
${fromBody}`;
var toStringDescriptor = Object.getOwnPropertyDescriptor(Function.prototype, "toString");
var toStringName = Object.getOwnPropertyDescriptor(Function.prototype.toString, "name");
var changeToString = (to, from, name) => {
  const withName = name === "" ? "" : `with ${name.trim()}() `;
  const newToString = wrappedToString.bind(null, withName, from.toString());
  Object.defineProperty(newToString, "name", toStringName);
  Object.defineProperty(to, "toString", { ...toStringDescriptor, value: newToString });
};
function mimicFunction(to, from, { ignoreNonConfigurable = false } = {}) {
  const { name } = to;
  for (const property of Reflect.ownKeys(from)) {
    copyProperty(to, from, property, ignoreNonConfigurable);
  }
  changePrototype(to, from);
  changeToString(to, from, name);
  return to;
}

// node_modules/.pnpm/onetime@6.0.0/node_modules/onetime/index.js
var calledFunctions = /* @__PURE__ */ new WeakMap();
var onetime = (function_, options = {}) => {
  if (typeof function_ !== "function") {
    throw new TypeError("Expected a function");
  }
  let returnValue;
  let callCount = 0;
  const functionName = function_.displayName || function_.name || "<anonymous>";
  const onetime2 = function(...arguments_) {
    calledFunctions.set(onetime2, ++callCount);
    if (callCount === 1) {
      returnValue = function_.apply(this, arguments_);
      function_ = null;
    } else if (options.throw === true) {
      throw new Error(`Function \`${functionName}\` can only be called once`);
    }
    return returnValue;
  };
  mimicFunction(onetime2, function_);
  calledFunctions.set(onetime2, callCount);
  return onetime2;
};
onetime.callCount = (function_) => {
  if (!calledFunctions.has(function_)) {
    throw new Error(`The given function \`${function_.name}\` is not wrapped by the \`onetime\` package`);
  }
  return calledFunctions.get(function_);
};
var onetime_default = onetime;

// node_modules/.pnpm/human-signals@4.3.1/node_modules/human-signals/build/src/main.js
var import_node_os2 = require("os");

// node_modules/.pnpm/human-signals@4.3.1/node_modules/human-signals/build/src/realtime.js
var getRealtimeSignals = () => {
  const length = SIGRTMAX - SIGRTMIN + 1;
  return Array.from({ length }, getRealtimeSignal);
};
var getRealtimeSignal = (value, index) => ({
  name: `SIGRT${index + 1}`,
  number: SIGRTMIN + index,
  action: "terminate",
  description: "Application-specific signal (realtime)",
  standard: "posix"
});
var SIGRTMIN = 34;
var SIGRTMAX = 64;

// node_modules/.pnpm/human-signals@4.3.1/node_modules/human-signals/build/src/signals.js
var import_node_os = require("os");

// node_modules/.pnpm/human-signals@4.3.1/node_modules/human-signals/build/src/core.js
var SIGNALS = [
  {
    name: "SIGHUP",
    number: 1,
    action: "terminate",
    description: "Terminal closed",
    standard: "posix"
  },
  {
    name: "SIGINT",
    number: 2,
    action: "terminate",
    description: "User interruption with CTRL-C",
    standard: "ansi"
  },
  {
    name: "SIGQUIT",
    number: 3,
    action: "core",
    description: "User interruption with CTRL-\\",
    standard: "posix"
  },
  {
    name: "SIGILL",
    number: 4,
    action: "core",
    description: "Invalid machine instruction",
    standard: "ansi"
  },
  {
    name: "SIGTRAP",
    number: 5,
    action: "core",
    description: "Debugger breakpoint",
    standard: "posix"
  },
  {
    name: "SIGABRT",
    number: 6,
    action: "core",
    description: "Aborted",
    standard: "ansi"
  },
  {
    name: "SIGIOT",
    number: 6,
    action: "core",
    description: "Aborted",
    standard: "bsd"
  },
  {
    name: "SIGBUS",
    number: 7,
    action: "core",
    description: "Bus error due to misaligned, non-existing address or paging error",
    standard: "bsd"
  },
  {
    name: "SIGEMT",
    number: 7,
    action: "terminate",
    description: "Command should be emulated but is not implemented",
    standard: "other"
  },
  {
    name: "SIGFPE",
    number: 8,
    action: "core",
    description: "Floating point arithmetic error",
    standard: "ansi"
  },
  {
    name: "SIGKILL",
    number: 9,
    action: "terminate",
    description: "Forced termination",
    standard: "posix",
    forced: true
  },
  {
    name: "SIGUSR1",
    number: 10,
    action: "terminate",
    description: "Application-specific signal",
    standard: "posix"
  },
  {
    name: "SIGSEGV",
    number: 11,
    action: "core",
    description: "Segmentation fault",
    standard: "ansi"
  },
  {
    name: "SIGUSR2",
    number: 12,
    action: "terminate",
    description: "Application-specific signal",
    standard: "posix"
  },
  {
    name: "SIGPIPE",
    number: 13,
    action: "terminate",
    description: "Broken pipe or socket",
    standard: "posix"
  },
  {
    name: "SIGALRM",
    number: 14,
    action: "terminate",
    description: "Timeout or timer",
    standard: "posix"
  },
  {
    name: "SIGTERM",
    number: 15,
    action: "terminate",
    description: "Termination",
    standard: "ansi"
  },
  {
    name: "SIGSTKFLT",
    number: 16,
    action: "terminate",
    description: "Stack is empty or overflowed",
    standard: "other"
  },
  {
    name: "SIGCHLD",
    number: 17,
    action: "ignore",
    description: "Child process terminated, paused or unpaused",
    standard: "posix"
  },
  {
    name: "SIGCLD",
    number: 17,
    action: "ignore",
    description: "Child process terminated, paused or unpaused",
    standard: "other"
  },
  {
    name: "SIGCONT",
    number: 18,
    action: "unpause",
    description: "Unpaused",
    standard: "posix",
    forced: true
  },
  {
    name: "SIGSTOP",
    number: 19,
    action: "pause",
    description: "Paused",
    standard: "posix",
    forced: true
  },
  {
    name: "SIGTSTP",
    number: 20,
    action: "pause",
    description: 'Paused using CTRL-Z or "suspend"',
    standard: "posix"
  },
  {
    name: "SIGTTIN",
    number: 21,
    action: "pause",
    description: "Background process cannot read terminal input",
    standard: "posix"
  },
  {
    name: "SIGBREAK",
    number: 21,
    action: "terminate",
    description: "User interruption with CTRL-BREAK",
    standard: "other"
  },
  {
    name: "SIGTTOU",
    number: 22,
    action: "pause",
    description: "Background process cannot write to terminal output",
    standard: "posix"
  },
  {
    name: "SIGURG",
    number: 23,
    action: "ignore",
    description: "Socket received out-of-band data",
    standard: "bsd"
  },
  {
    name: "SIGXCPU",
    number: 24,
    action: "core",
    description: "Process timed out",
    standard: "bsd"
  },
  {
    name: "SIGXFSZ",
    number: 25,
    action: "core",
    description: "File too big",
    standard: "bsd"
  },
  {
    name: "SIGVTALRM",
    number: 26,
    action: "terminate",
    description: "Timeout or timer",
    standard: "bsd"
  },
  {
    name: "SIGPROF",
    number: 27,
    action: "terminate",
    description: "Timeout or timer",
    standard: "bsd"
  },
  {
    name: "SIGWINCH",
    number: 28,
    action: "ignore",
    description: "Terminal window size changed",
    standard: "bsd"
  },
  {
    name: "SIGIO",
    number: 29,
    action: "terminate",
    description: "I/O is available",
    standard: "other"
  },
  {
    name: "SIGPOLL",
    number: 29,
    action: "terminate",
    description: "Watched event",
    standard: "other"
  },
  {
    name: "SIGINFO",
    number: 29,
    action: "ignore",
    description: "Request for process information",
    standard: "other"
  },
  {
    name: "SIGPWR",
    number: 30,
    action: "terminate",
    description: "Device running out of power",
    standard: "systemv"
  },
  {
    name: "SIGSYS",
    number: 31,
    action: "core",
    description: "Invalid system call",
    standard: "other"
  },
  {
    name: "SIGUNUSED",
    number: 31,
    action: "terminate",
    description: "Invalid system call",
    standard: "other"
  }
];

// node_modules/.pnpm/human-signals@4.3.1/node_modules/human-signals/build/src/signals.js
var getSignals = () => {
  const realtimeSignals = getRealtimeSignals();
  const signals = [...SIGNALS, ...realtimeSignals].map(normalizeSignal);
  return signals;
};
var normalizeSignal = ({
  name,
  number: defaultNumber,
  description,
  action,
  forced = false,
  standard
}) => {
  const {
    signals: { [name]: constantSignal }
  } = import_node_os.constants;
  const supported = constantSignal !== void 0;
  const number = supported ? constantSignal : defaultNumber;
  return { name, number, description, supported, action, forced, standard };
};

// node_modules/.pnpm/human-signals@4.3.1/node_modules/human-signals/build/src/main.js
var getSignalsByName = () => {
  const signals = getSignals();
  return Object.fromEntries(signals.map(getSignalByName));
};
var getSignalByName = ({
  name,
  number,
  description,
  supported,
  action,
  forced,
  standard
}) => [name, { name, number, description, supported, action, forced, standard }];
var signalsByName = getSignalsByName();
var getSignalsByNumber = () => {
  const signals = getSignals();
  const length = SIGRTMAX + 1;
  const signalsA = Array.from({ length }, (value, number) => getSignalByNumber(number, signals));
  return Object.assign({}, ...signalsA);
};
var getSignalByNumber = (number, signals) => {
  const signal = findSignalByNumber(number, signals);
  if (signal === void 0) {
    return {};
  }
  const { name, description, supported, action, forced, standard } = signal;
  return {
    [number]: {
      name,
      number,
      description,
      supported,
      action,
      forced,
      standard
    }
  };
};
var findSignalByNumber = (number, signals) => {
  const signal = signals.find(({ name }) => import_node_os2.constants.signals[name] === number);
  if (signal !== void 0) {
    return signal;
  }
  return signals.find((signalA) => signalA.number === number);
};
var signalsByNumber = getSignalsByNumber();

// node_modules/.pnpm/execa@7.1.1/node_modules/execa/lib/error.js
var getErrorPrefix = ({ timedOut, timeout, errorCode, signal, signalDescription, exitCode, isCanceled }) => {
  if (timedOut) {
    return `timed out after ${timeout} milliseconds`;
  }
  if (isCanceled) {
    return "was canceled";
  }
  if (errorCode !== void 0) {
    return `failed with ${errorCode}`;
  }
  if (signal !== void 0) {
    return `was killed with ${signal} (${signalDescription})`;
  }
  if (exitCode !== void 0) {
    return `failed with exit code ${exitCode}`;
  }
  return "failed";
};
var makeError = ({
  stdout,
  stderr,
  all,
  error,
  signal,
  exitCode,
  command,
  escapedCommand,
  timedOut,
  isCanceled,
  killed,
  parsed: { options: { timeout } }
}) => {
  exitCode = exitCode === null ? void 0 : exitCode;
  signal = signal === null ? void 0 : signal;
  const signalDescription = signal === void 0 ? void 0 : signalsByName[signal].description;
  const errorCode = error && error.code;
  const prefix = getErrorPrefix({ timedOut, timeout, errorCode, signal, signalDescription, exitCode, isCanceled });
  const execaMessage = `Command ${prefix}: ${command}`;
  const isError = Object.prototype.toString.call(error) === "[object Error]";
  const shortMessage = isError ? `${execaMessage}
${error.message}` : execaMessage;
  const message = [shortMessage, stderr, stdout].filter(Boolean).join("\n");
  if (isError) {
    error.originalMessage = error.message;
    error.message = message;
  } else {
    error = new Error(message);
  }
  error.shortMessage = shortMessage;
  error.command = command;
  error.escapedCommand = escapedCommand;
  error.exitCode = exitCode;
  error.signal = signal;
  error.signalDescription = signalDescription;
  error.stdout = stdout;
  error.stderr = stderr;
  if (all !== void 0) {
    error.all = all;
  }
  if ("bufferedData" in error) {
    delete error.bufferedData;
  }
  error.failed = true;
  error.timedOut = Boolean(timedOut);
  error.isCanceled = isCanceled;
  error.killed = killed && !timedOut;
  return error;
};

// node_modules/.pnpm/execa@7.1.1/node_modules/execa/lib/stdio.js
var aliases = ["stdin", "stdout", "stderr"];
var hasAlias = (options) => aliases.some((alias) => options[alias] !== void 0);
var normalizeStdio = (options) => {
  if (!options) {
    return;
  }
  const { stdio } = options;
  if (stdio === void 0) {
    return aliases.map((alias) => options[alias]);
  }
  if (hasAlias(options)) {
    throw new Error(`It's not possible to provide \`stdio\` in combination with one of ${aliases.map((alias) => `\`${alias}\``).join(", ")}`);
  }
  if (typeof stdio === "string") {
    return stdio;
  }
  if (!Array.isArray(stdio)) {
    throw new TypeError(`Expected \`stdio\` to be of type \`string\` or \`Array\`, got \`${typeof stdio}\``);
  }
  const length = Math.max(stdio.length, aliases.length);
  return Array.from({ length }, (value, index) => stdio[index]);
};

// node_modules/.pnpm/execa@7.1.1/node_modules/execa/lib/kill.js
var import_node_os3 = __toESM(require("os"), 1);
var import_signal_exit = __toESM(require_signal_exit(), 1);
var DEFAULT_FORCE_KILL_TIMEOUT = 1e3 * 5;
var spawnedKill = (kill, signal = "SIGTERM", options = {}) => {
  const killResult = kill(signal);
  setKillTimeout(kill, signal, options, killResult);
  return killResult;
};
var setKillTimeout = (kill, signal, options, killResult) => {
  if (!shouldForceKill(signal, options, killResult)) {
    return;
  }
  const timeout = getForceKillAfterTimeout(options);
  const t = setTimeout(() => {
    kill("SIGKILL");
  }, timeout);
  if (t.unref) {
    t.unref();
  }
};
var shouldForceKill = (signal, { forceKillAfterTimeout }, killResult) => isSigterm(signal) && forceKillAfterTimeout !== false && killResult;
var isSigterm = (signal) => signal === import_node_os3.default.constants.signals.SIGTERM || typeof signal === "string" && signal.toUpperCase() === "SIGTERM";
var getForceKillAfterTimeout = ({ forceKillAfterTimeout = true }) => {
  if (forceKillAfterTimeout === true) {
    return DEFAULT_FORCE_KILL_TIMEOUT;
  }
  if (!Number.isFinite(forceKillAfterTimeout) || forceKillAfterTimeout < 0) {
    throw new TypeError(`Expected the \`forceKillAfterTimeout\` option to be a non-negative integer, got \`${forceKillAfterTimeout}\` (${typeof forceKillAfterTimeout})`);
  }
  return forceKillAfterTimeout;
};
var spawnedCancel = (spawned, context) => {
  const killResult = spawned.kill();
  if (killResult) {
    context.isCanceled = true;
  }
};
var timeoutKill = (spawned, signal, reject) => {
  spawned.kill(signal);
  reject(Object.assign(new Error("Timed out"), { timedOut: true, signal }));
};
var setupTimeout = (spawned, { timeout, killSignal = "SIGTERM" }, spawnedPromise) => {
  if (timeout === 0 || timeout === void 0) {
    return spawnedPromise;
  }
  let timeoutId;
  const timeoutPromise = new Promise((resolve2, reject) => {
    timeoutId = setTimeout(() => {
      timeoutKill(spawned, killSignal, reject);
    }, timeout);
  });
  const safeSpawnedPromise = spawnedPromise.finally(() => {
    clearTimeout(timeoutId);
  });
  return Promise.race([timeoutPromise, safeSpawnedPromise]);
};
var validateTimeout = ({ timeout }) => {
  if (timeout !== void 0 && (!Number.isFinite(timeout) || timeout < 0)) {
    throw new TypeError(`Expected the \`timeout\` option to be a non-negative integer, got \`${timeout}\` (${typeof timeout})`);
  }
};
var setExitHandler = async (spawned, { cleanup, detached }, timedPromise) => {
  if (!cleanup || detached) {
    return timedPromise;
  }
  const removeExitHandler = (0, import_signal_exit.default)(() => {
    spawned.kill();
  });
  return timedPromise.finally(() => {
    removeExitHandler();
  });
};

// node_modules/.pnpm/execa@7.1.1/node_modules/execa/lib/pipe.js
var import_node_fs8 = require("fs");
var import_node_child_process = require("child_process");

// node_modules/.pnpm/is-stream@3.0.0/node_modules/is-stream/index.js
function isStream(stream) {
  return stream !== null && typeof stream === "object" && typeof stream.pipe === "function";
}
function isWritableStream(stream) {
  return isStream(stream) && stream.writable !== false && typeof stream._write === "function" && typeof stream._writableState === "object";
}

// node_modules/.pnpm/execa@7.1.1/node_modules/execa/lib/pipe.js
var isExecaChildProcess = (target) => target instanceof import_node_child_process.ChildProcess && typeof target.then === "function";
var pipeToTarget = (spawned, streamName, target) => {
  if (typeof target === "string") {
    spawned[streamName].pipe((0, import_node_fs8.createWriteStream)(target));
    return spawned;
  }
  if (isWritableStream(target)) {
    spawned[streamName].pipe(target);
    return spawned;
  }
  if (!isExecaChildProcess(target)) {
    throw new TypeError("The second argument must be a string, a stream or an Execa child process.");
  }
  if (!isWritableStream(target.stdin)) {
    throw new TypeError("The target child process's stdin must be available.");
  }
  spawned[streamName].pipe(target.stdin);
  return target;
};
var addPipeMethods = (spawned) => {
  if (spawned.stdout !== null) {
    spawned.pipeStdout = pipeToTarget.bind(void 0, spawned, "stdout");
  }
  if (spawned.stderr !== null) {
    spawned.pipeStderr = pipeToTarget.bind(void 0, spawned, "stderr");
  }
  if (spawned.all !== void 0) {
    spawned.pipeAll = pipeToTarget.bind(void 0, spawned, "all");
  }
};

// node_modules/.pnpm/execa@7.1.1/node_modules/execa/lib/stream.js
var import_node_fs9 = require("fs");
var import_get_stream = __toESM(require_get_stream(), 1);
var import_merge_stream = __toESM(require_merge_stream(), 1);
var validateInputOptions = (input) => {
  if (input !== void 0) {
    throw new TypeError("The `input` and `inputFile` options cannot be both set.");
  }
};
var getInputSync = ({ input, inputFile }) => {
  if (typeof inputFile !== "string") {
    return input;
  }
  validateInputOptions(input);
  return (0, import_node_fs9.readFileSync)(inputFile);
};
var handleInputSync = (options) => {
  const input = getInputSync(options);
  if (isStream(input)) {
    throw new TypeError("The `input` option cannot be a stream in sync mode");
  }
  return input;
};
var getInput = ({ input, inputFile }) => {
  if (typeof inputFile !== "string") {
    return input;
  }
  validateInputOptions(input);
  return (0, import_node_fs9.createReadStream)(inputFile);
};
var handleInput = (spawned, options) => {
  const input = getInput(options);
  if (input === void 0) {
    return;
  }
  if (isStream(input)) {
    input.pipe(spawned.stdin);
  } else {
    spawned.stdin.end(input);
  }
};
var makeAllStream = (spawned, { all }) => {
  if (!all || !spawned.stdout && !spawned.stderr) {
    return;
  }
  const mixed = (0, import_merge_stream.default)();
  if (spawned.stdout) {
    mixed.add(spawned.stdout);
  }
  if (spawned.stderr) {
    mixed.add(spawned.stderr);
  }
  return mixed;
};
var getBufferedData = async (stream, streamPromise) => {
  if (!stream || streamPromise === void 0) {
    return;
  }
  stream.destroy();
  try {
    return await streamPromise;
  } catch (error) {
    return error.bufferedData;
  }
};
var getStreamPromise = (stream, { encoding, buffer, maxBuffer }) => {
  if (!stream || !buffer) {
    return;
  }
  if (encoding) {
    return (0, import_get_stream.default)(stream, { encoding, maxBuffer });
  }
  return import_get_stream.default.buffer(stream, { maxBuffer });
};
var getSpawnedResult = async ({ stdout, stderr, all }, { encoding, buffer, maxBuffer }, processDone) => {
  const stdoutPromise = getStreamPromise(stdout, { encoding, buffer, maxBuffer });
  const stderrPromise = getStreamPromise(stderr, { encoding, buffer, maxBuffer });
  const allPromise = getStreamPromise(all, { encoding, buffer, maxBuffer: maxBuffer * 2 });
  try {
    return await Promise.all([processDone, stdoutPromise, stderrPromise, allPromise]);
  } catch (error) {
    return Promise.all([
      { error, signal: error.signal, timedOut: error.timedOut },
      getBufferedData(stdout, stdoutPromise),
      getBufferedData(stderr, stderrPromise),
      getBufferedData(all, allPromise)
    ]);
  }
};

// node_modules/.pnpm/execa@7.1.1/node_modules/execa/lib/promise.js
var nativePromisePrototype = (async () => {
})().constructor.prototype;
var descriptors = ["then", "catch", "finally"].map((property) => [
  property,
  Reflect.getOwnPropertyDescriptor(nativePromisePrototype, property)
]);
var mergePromise = (spawned, promise) => {
  for (const [property, descriptor] of descriptors) {
    const value = typeof promise === "function" ? (...args) => Reflect.apply(descriptor.value, promise(), args) : descriptor.value.bind(promise);
    Reflect.defineProperty(spawned, property, { ...descriptor, value });
  }
};
var getSpawnedPromise = (spawned) => new Promise((resolve2, reject) => {
  spawned.on("exit", (exitCode, signal) => {
    resolve2({ exitCode, signal });
  });
  spawned.on("error", (error) => {
    reject(error);
  });
  if (spawned.stdin) {
    spawned.stdin.on("error", (error) => {
      reject(error);
    });
  }
});

// node_modules/.pnpm/execa@7.1.1/node_modules/execa/lib/command.js
var import_node_buffer = require("buffer");
var import_node_child_process2 = require("child_process");
var normalizeArgs = (file, args = []) => {
  if (!Array.isArray(args)) {
    return [file];
  }
  return [file, ...args];
};
var NO_ESCAPE_REGEXP = /^[\w.-]+$/;
var DOUBLE_QUOTES_REGEXP = /"/g;
var escapeArg = (arg) => {
  if (typeof arg !== "string" || NO_ESCAPE_REGEXP.test(arg)) {
    return arg;
  }
  return `"${arg.replace(DOUBLE_QUOTES_REGEXP, '\\"')}"`;
};
var joinCommand = (file, args) => normalizeArgs(file, args).join(" ");
var getEscapedCommand = (file, args) => normalizeArgs(file, args).map((arg) => escapeArg(arg)).join(" ");
var SPACES_REGEXP = / +/g;
var parseCommand = (command) => {
  const tokens = [];
  for (const token of command.trim().split(SPACES_REGEXP)) {
    const previousToken = tokens[tokens.length - 1];
    if (previousToken && previousToken.endsWith("\\")) {
      tokens[tokens.length - 1] = `${previousToken.slice(0, -1)} ${token}`;
    } else {
      tokens.push(token);
    }
  }
  return tokens;
};
var parseExpression = (expression) => {
  const typeOfExpression = typeof expression;
  if (typeOfExpression === "string") {
    return expression;
  }
  if (typeOfExpression === "number") {
    return String(expression);
  }
  if (typeOfExpression === "object" && expression !== null && !(expression instanceof import_node_child_process2.ChildProcess) && "stdout" in expression) {
    const typeOfStdout = typeof expression.stdout;
    if (typeOfStdout === "string") {
      return expression.stdout;
    }
    if (import_node_buffer.Buffer.isBuffer(expression.stdout)) {
      return expression.stdout.toString();
    }
    throw new TypeError(`Unexpected "${typeOfStdout}" stdout in template expression`);
  }
  throw new TypeError(`Unexpected "${typeOfExpression}" in template expression`);
};
var concatTokens = (tokens, nextTokens, isNew) => isNew || tokens.length === 0 || nextTokens.length === 0 ? [...tokens, ...nextTokens] : [
  ...tokens.slice(0, -1),
  `${tokens[tokens.length - 1]}${nextTokens[0]}`,
  ...nextTokens.slice(1)
];
var parseTemplate = ({ templates: templates2, expressions, tokens, index, template }) => {
  const templateString = template ?? templates2.raw[index];
  const templateTokens = templateString.split(SPACES_REGEXP).filter(Boolean);
  const newTokens = concatTokens(
    tokens,
    templateTokens,
    templateString.startsWith(" ")
  );
  if (index === expressions.length) {
    return newTokens;
  }
  const expression = expressions[index];
  const expressionTokens = Array.isArray(expression) ? expression.map((expression2) => parseExpression(expression2)) : [parseExpression(expression)];
  return concatTokens(
    newTokens,
    expressionTokens,
    templateString.endsWith(" ")
  );
};
var parseTemplates = (templates2, expressions) => {
  let tokens = [];
  for (const [index, template] of templates2.entries()) {
    tokens = parseTemplate({ templates: templates2, expressions, tokens, index, template });
  }
  return tokens;
};

// node_modules/.pnpm/execa@7.1.1/node_modules/execa/lib/verbose.js
var import_node_util = require("util");
var import_node_process4 = __toESM(require("process"), 1);
var verboseDefault = (0, import_node_util.debuglog)("execa").enabled;
var padField = (field, padding) => String(field).padStart(padding, "0");
var getTimestamp = () => {
  const date = new Date();
  return `${padField(date.getHours(), 2)}:${padField(date.getMinutes(), 2)}:${padField(date.getSeconds(), 2)}.${padField(date.getMilliseconds(), 3)}`;
};
var logCommand = (escapedCommand, { verbose }) => {
  if (!verbose) {
    return;
  }
  import_node_process4.default.stderr.write(`[${getTimestamp()}] ${escapedCommand}
`);
};

// node_modules/.pnpm/execa@7.1.1/node_modules/execa/index.js
var DEFAULT_MAX_BUFFER = 1e3 * 1e3 * 100;
var getEnv = ({ env: envOption, extendEnv, preferLocal, localDir, execPath }) => {
  const env = extendEnv ? { ...import_node_process5.default.env, ...envOption } : envOption;
  if (preferLocal) {
    return npmRunPathEnv({ env, cwd: localDir, execPath });
  }
  return env;
};
var handleArguments = (file, args, options = {}) => {
  const parsed = import_cross_spawn2.default._parse(file, args, options);
  file = parsed.command;
  args = parsed.args;
  options = parsed.options;
  options = {
    maxBuffer: DEFAULT_MAX_BUFFER,
    buffer: true,
    stripFinalNewline: true,
    extendEnv: true,
    preferLocal: false,
    localDir: options.cwd || import_node_process5.default.cwd(),
    execPath: import_node_process5.default.execPath,
    encoding: "utf8",
    reject: true,
    cleanup: true,
    all: false,
    windowsHide: true,
    verbose: verboseDefault,
    ...options
  };
  options.env = getEnv(options);
  options.stdio = normalizeStdio(options);
  if (import_node_process5.default.platform === "win32" && import_node_path9.default.basename(file, ".exe") === "cmd") {
    args.unshift("/q");
  }
  return { file, args, options, parsed };
};
var handleOutput = (options, value, error) => {
  if (typeof value !== "string" && !import_node_buffer2.Buffer.isBuffer(value)) {
    return error === void 0 ? void 0 : "";
  }
  if (options.stripFinalNewline) {
    return stripFinalNewline(value);
  }
  return value;
};
function execa(file, args, options) {
  const parsed = handleArguments(file, args, options);
  const command = joinCommand(file, args);
  const escapedCommand = getEscapedCommand(file, args);
  logCommand(escapedCommand, parsed.options);
  validateTimeout(parsed.options);
  let spawned;
  try {
    spawned = import_node_child_process3.default.spawn(parsed.file, parsed.args, parsed.options);
  } catch (error) {
    const dummySpawned = new import_node_child_process3.default.ChildProcess();
    const errorPromise = Promise.reject(makeError({
      error,
      stdout: "",
      stderr: "",
      all: "",
      command,
      escapedCommand,
      parsed,
      timedOut: false,
      isCanceled: false,
      killed: false
    }));
    mergePromise(dummySpawned, errorPromise);
    return dummySpawned;
  }
  const spawnedPromise = getSpawnedPromise(spawned);
  const timedPromise = setupTimeout(spawned, parsed.options, spawnedPromise);
  const processDone = setExitHandler(spawned, parsed.options, timedPromise);
  const context = { isCanceled: false };
  spawned.kill = spawnedKill.bind(null, spawned.kill.bind(spawned));
  spawned.cancel = spawnedCancel.bind(null, spawned, context);
  const handlePromise = async () => {
    const [{ error, exitCode, signal, timedOut }, stdoutResult, stderrResult, allResult] = await getSpawnedResult(spawned, parsed.options, processDone);
    const stdout = handleOutput(parsed.options, stdoutResult);
    const stderr = handleOutput(parsed.options, stderrResult);
    const all = handleOutput(parsed.options, allResult);
    if (error || exitCode !== 0 || signal !== null) {
      const returnedError = makeError({
        error,
        exitCode,
        signal,
        stdout,
        stderr,
        all,
        command,
        escapedCommand,
        parsed,
        timedOut,
        isCanceled: context.isCanceled || (parsed.options.signal ? parsed.options.signal.aborted : false),
        killed: spawned.killed
      });
      if (!parsed.options.reject) {
        return returnedError;
      }
      throw returnedError;
    }
    return {
      command,
      escapedCommand,
      exitCode: 0,
      stdout,
      stderr,
      all,
      failed: false,
      timedOut: false,
      isCanceled: false,
      killed: false
    };
  };
  const handlePromiseOnce = onetime_default(handlePromise);
  handleInput(spawned, parsed.options);
  spawned.all = makeAllStream(spawned, parsed.options);
  addPipeMethods(spawned);
  mergePromise(spawned, handlePromiseOnce);
  return spawned;
}
function execaSync(file, args, options) {
  const parsed = handleArguments(file, args, options);
  const command = joinCommand(file, args);
  const escapedCommand = getEscapedCommand(file, args);
  logCommand(escapedCommand, parsed.options);
  const input = handleInputSync(parsed.options);
  let result;
  try {
    result = import_node_child_process3.default.spawnSync(parsed.file, parsed.args, { ...parsed.options, input });
  } catch (error) {
    throw makeError({
      error,
      stdout: "",
      stderr: "",
      all: "",
      command,
      escapedCommand,
      parsed,
      timedOut: false,
      isCanceled: false,
      killed: false
    });
  }
  const stdout = handleOutput(parsed.options, result.stdout, result.error);
  const stderr = handleOutput(parsed.options, result.stderr, result.error);
  if (result.error || result.status !== 0 || result.signal !== null) {
    const error = makeError({
      stdout,
      stderr,
      error: result.error,
      signal: result.signal,
      exitCode: result.status,
      command,
      escapedCommand,
      parsed,
      timedOut: result.error && result.error.code === "ETIMEDOUT",
      isCanceled: false,
      killed: result.signal !== null
    });
    if (!parsed.options.reject) {
      return error;
    }
    throw error;
  }
  return {
    command,
    escapedCommand,
    exitCode: 0,
    stdout,
    stderr,
    failed: false,
    timedOut: false,
    isCanceled: false,
    killed: false
  };
}
var normalizeScriptStdin = ({ input, inputFile, stdio }) => input === void 0 && inputFile === void 0 && stdio === void 0 ? { stdin: "inherit" } : {};
var normalizeScriptOptions = (options = {}) => ({
  preferLocal: true,
  ...normalizeScriptStdin(options),
  ...options
});
function create$(options) {
  function $4(templatesOrOptions, ...expressions) {
    if (!Array.isArray(templatesOrOptions)) {
      return create$({ ...options, ...templatesOrOptions });
    }
    const [file, ...args] = parseTemplates(templatesOrOptions, expressions);
    return execa(file, args, normalizeScriptOptions(options));
  }
  $4.sync = (templates2, ...expressions) => {
    if (!Array.isArray(templates2)) {
      throw new TypeError("Please use $(options).sync`command` instead of $.sync(options)`command`.");
    }
    const [file, ...args] = parseTemplates(templates2, expressions);
    return execaSync(file, args, normalizeScriptOptions(options));
  };
  return $4;
}
var $3 = create$();
function execaCommand(command, options) {
  const [file, ...args] = parseCommand(command);
  return execa(file, args, options);
}

// packages/qwik/src/cli/build/run-build-command.ts
async function runBuildCommand(app) {
  const pkgJsonScripts = app.packageJson.scripts;
  if (!pkgJsonScripts) {
    throw new Error(`No "scripts" property found in package.json`);
  }
  const pkgManager = getPackageManager();
  const getScript = (name) => {
    if (pkgJsonScripts[name]) {
      return `${pkgManager} run ${name}`;
    }
    return void 0;
  };
  const isPreviewBuild = app.args.includes("preview");
  const buildLibScript = getScript("build.lib");
  const isLibraryBuild = !!buildLibScript;
  const buildClientScript = getScript("build.client");
  const buildPreviewScript = isPreviewBuild ? getScript("build.preview") : void 0;
  const buildServerScript = !isPreviewBuild ? getScript("build.server") : void 0;
  const buildStaticScript = getScript("build.static");
  const runSsgScript = getScript("ssg");
  const buildTypes = getScript("build.types");
  const lint = getScript("lint");
  const mode = app.getArg("mode");
  const prebuildScripts = Object.keys(pkgJsonScripts).filter((s) => s.startsWith("prebuild.")).map(getScript).filter(isString);
  const postbuildScripts = Object.keys(pkgJsonScripts).filter((s) => s.startsWith("postbuild.")).map(getScript).filter(isString);
  const scripts = [
    buildTypes,
    buildClientScript,
    buildLibScript,
    buildPreviewScript,
    buildServerScript,
    buildStaticScript,
    lint
  ].filter(isString);
  if (!isLibraryBuild && !buildClientScript) {
    console.log(pkgJsonScripts);
    throw new Error(`"build.client" script not found in package.json`);
  }
  if (isPreviewBuild && !buildPreviewScript && !buildStaticScript) {
    throw new Error(
      `Neither "build.preview" or "build.static" script found in package.json for preview`
    );
  }
  console.log(``);
  for (const script of prebuildScripts) {
    console.log(dim(script));
  }
  for (const script of scripts) {
    console.log(dim(script));
  }
  for (const script of postbuildScripts) {
    console.log(dim(script));
  }
  console.log(``);
  let typecheck = null;
  for (const script of prebuildScripts) {
    try {
      await execaCommand(script, {
        cwd: app.rootDir,
        stdout: "inherit",
        env: {
          FORCE_COLOR: "true"
        }
      });
    } catch (e2) {
      console.error(script, "failed");
      process.exit(1);
    }
  }
  if (buildTypes) {
    let copyScript = buildTypes;
    if (!copyScript.includes("--pretty")) {
      copyScript += " --pretty";
    }
    typecheck = execaCommand(copyScript, {
      cwd: app.rootDir
    }).then(() => ({
      title: "Type checked"
    })).catch((e2) => {
      let out = e2.stdout;
      if (out.startsWith("tsc")) {
        out = out.slice(3);
      }
      console.log("\n" + out);
      process.exit(1);
    });
  }
  if (buildClientScript) {
    const script = attachArg(buildClientScript, "mode", mode);
    await execaCommand(script, {
      stdio: "inherit",
      cwd: app.rootDir
    }).catch(() => {
      process.exit(1);
    });
    console.log(``);
    console.log(`${cyan("\u2713")} Built client modules`);
  }
  const step2 = [];
  if (buildLibScript) {
    const script = attachArg(buildLibScript, "mode", mode);
    const libBuild = execaCommand(script, {
      cwd: app.rootDir,
      env: {
        FORCE_COLOR: "true"
      }
    }).then((e2) => ({
      title: "Built library modules",
      stdout: e2.stdout
    })).catch((e2) => {
      console.log(``);
      if (e2.stderr) {
        console.log(e2.stderr);
      } else {
        console.log(e2.stdout);
      }
      console.log(``);
      process.exit(1);
    });
    step2.push(libBuild);
  }
  if (buildPreviewScript) {
    const script = attachArg(buildPreviewScript, "mode", mode);
    const previewBuild = execaCommand(script, {
      cwd: app.rootDir,
      env: {
        FORCE_COLOR: "true"
      }
    }).then((e2) => ({
      title: "Built preview (ssr) modules",
      stdout: e2.stdout
    })).catch((e2) => {
      console.log(``);
      if (e2.stderr) {
        console.log(e2.stderr);
      } else {
        console.log(e2.stdout);
      }
      console.log(``);
      process.exit(1);
    });
    step2.push(previewBuild);
  }
  if (buildServerScript) {
    const script = attachArg(buildServerScript, "mode", mode);
    const serverBuild = execaCommand(script, {
      cwd: app.rootDir,
      env: {
        FORCE_COLOR: "true"
      }
    }).then((e2) => ({
      title: "Built server (ssr) modules",
      stdout: e2.stdout
    })).catch((e2) => {
      console.log(``);
      if (e2.stderr) {
        console.log(e2.stderr);
      } else {
        console.log(e2.stdout);
      }
      console.log(``);
      process.exit(1);
    });
    step2.push(serverBuild);
  }
  if (buildStaticScript) {
    const staticBuild = execaCommand(buildStaticScript, {
      cwd: app.rootDir,
      env: {
        FORCE_COLOR: "true"
      }
    }).then((e2) => ({
      title: "Built static (ssg) modules",
      stdout: e2.stdout
    })).catch((e2) => {
      console.log(``);
      if (e2.stderr) {
        console.log(e2.stderr);
      } else {
        console.log(e2.stdout);
      }
      console.log(``);
      process.exit(1);
    });
    step2.push(staticBuild);
  }
  if (typecheck) {
    step2.push(typecheck);
  }
  if (lint) {
    const lintBuild = execaCommand(lint, {
      cwd: app.rootDir,
      env: {
        FORCE_COLOR: "true"
      }
    }).then(() => ({
      title: "Lint checked"
    })).catch((e2) => {
      console.log(``);
      if (e2.stderr) {
        console.log(e2.stderr);
      } else {
        console.log(e2.stdout);
      }
      console.log(``);
      process.exit(1);
    });
    step2.push(lintBuild);
  }
  if (step2.length > 0) {
    await Promise.all(step2).then((steps) => {
      steps.forEach((step) => {
        if (step.stdout) {
          console.log("");
          console.log(step.stdout);
        }
        console.log(`${cyan("\u2713")} ${step.title}`);
      });
      if (!isPreviewBuild && !buildServerScript && !buildStaticScript && !isLibraryBuild) {
        const pmRun = pmRunCmd();
        console.log(``);
        console.log(`${bgMagenta(" Missing an integration ")}`);
        console.log(``);
        console.log(`${magenta("\u30FB")} Use ${magenta(pmRun + " qwik add")} to add an integration`);
        console.log(`${magenta("\u30FB")} Use ${magenta(pmRun + " preview")} to preview the build`);
      }
      if (isPreviewBuild && buildStaticScript && runSsgScript) {
        return execaCommand(buildStaticScript, {
          cwd: app.rootDir,
          env: {
            FORCE_COLOR: "true"
          }
        }).catch((e2) => {
          console.log(``);
          if (e2.stderr) {
            console.log(e2.stderr);
          } else {
            console.log(e2.stdout);
          }
          console.log(``);
          process.exit(1);
        });
      }
    });
  }
  for (const script of postbuildScripts) {
    try {
      await execaCommand(script, {
        cwd: app.rootDir,
        stdout: "inherit",
        env: {
          FORCE_COLOR: "true"
        }
      });
    } catch (e2) {
      console.error(script, "failed");
      process.exit(1);
    }
  }
  console.log(``);
}
function attachArg(command, key, value) {
  if (value !== void 0) {
    return `${command} --${key} ${value}`;
  }
  return command;
}
function isString(s) {
  return typeof s === "string" && s.trim().length > 0;
}

// packages/qwik/src/cli/run.ts
var SPACE_TO_HINT2 = 18;
var COMMANDS = [
  {
    value: "add",
    label: "add",
    hint: "Add an integration to this app",
    run: (app) => runAddCommand(app),
    showInHelp: true
  },
  {
    value: "build",
    label: "build",
    hint: "Parallelize builds and type checking",
    run: (app) => runBuildCommand(app),
    showInHelp: true
  },
  {
    value: "build preview",
    label: "build preview",
    hint: 'Same as "build", but for preview server',
    run: (app) => runBuildCommand(app),
    showInHelp: true
  },
  {
    value: "new",
    label: "new",
    hint: "Create a new component or route",
    run: (app) => runNewCommand(app),
    showInHelp: true
  },
  {
    value: "help",
    label: "help",
    hint: "Show this help",
    run: (app) => printHelp(app),
    showInHelp: false
  },
  {
    value: "version",
    label: "version",
    hint: "Show the version",
    run: () => printVersion(),
    showInHelp: false
  }
];
async function runCli() {
  console.clear();
  printHeader();
  try {
    const app = new AppCommand({
      rootDir: "",
      cwd: process.cwd(),
      args: process.argv.slice(2)
    });
    await runCommand2(app);
  } catch (e2) {
    panic(String(e2));
  }
}
async function runCommand2(app) {
  switch (app.task) {
    case "add": {
      await runAddCommand(app);
      return;
    }
    case "build": {
      await runBuildCommand(app);
      return;
    }
    case "help": {
      printHelp(app);
      return;
    }
    case "new": {
      await runNewCommand(app);
      return;
    }
    case "version": {
      printVersion();
      return;
    }
  }
  if (typeof app.task === "string") {
    console.log(red(`Unrecognized qwik command: ${app.task}`) + "\n");
  }
  await printHelp(app);
  process.exit(1);
}
async function printHelp(app) {
  const pmRun = pmRunCmd();
  ae(`\u{1F52D}  ${bgMagenta(" Qwik Help ")}`);
  note(
    COMMANDS.filter((cmd) => cmd.showInHelp).map(
      (cmd) => `${pmRun} qwik ${cyan(cmd.label)}` + " ".repeat(Math.max(SPACE_TO_HINT2 - cmd.label.length, 2)) + dim(cmd.hint)
    ).join("\n"),
    "Available commands"
  );
  const proceed = await Q2({
    message: "Do you want to run a command?",
    initialValue: true
  });
  if (eD(proceed) || !proceed) {
    bye();
  }
  const command = await ee({
    message: "Select a command",
    options: COMMANDS.filter((cmd) => cmd.showInHelp).map((cmd) => ({
      value: cmd.value,
      label: `${pmRun} qwik ${cyan(cmd.label)}`,
      hint: cmd.hint
    }))
  });
  if (eD(command)) {
    bye();
  }
  await runCommand2(Object.assign(app, { task: command }));
}
function printVersion() {
  console.log("1.2.4");
}
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  runCli,
  updateApp
});
