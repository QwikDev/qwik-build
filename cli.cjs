/**
 * @license
 * @builder.io/qwik/cli 0.20.2
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

// node_modules/.pnpm/isexe@2.0.0/node_modules/isexe/windows.js
var require_windows = __commonJS({
  "node_modules/.pnpm/isexe@2.0.0/node_modules/isexe/windows.js"(exports, module2) {
    module2.exports = isexe;
    isexe.sync = sync;
    var fs6 = require("fs");
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
        var p2 = pathext[i].toLowerCase();
        if (p2 && path3.substr(-p2.length).toLowerCase() === p2) {
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
      fs6.stat(path3, function(er, stat) {
        cb(er, er ? false : checkStat(stat, path3, options));
      });
    }
    function sync(path3, options) {
      return checkStat(fs6.statSync(path3), path3, options);
    }
  }
});

// node_modules/.pnpm/isexe@2.0.0/node_modules/isexe/mode.js
var require_mode = __commonJS({
  "node_modules/.pnpm/isexe@2.0.0/node_modules/isexe/mode.js"(exports, module2) {
    module2.exports = isexe;
    isexe.sync = sync;
    var fs6 = require("fs");
    function isexe(path3, options, cb) {
      fs6.stat(path3, function(er, stat) {
        cb(er, er ? false : checkStat(stat, options));
      });
    }
    function sync(path3, options) {
      return checkStat(fs6.statSync(path3), options);
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
      var u3 = parseInt("100", 8);
      var g3 = parseInt("010", 8);
      var o2 = parseInt("001", 8);
      var ug = u3 | g3;
      var ret = mod & o2 || mod & g3 && gid === myGid || mod & u3 && uid === myUid || mod & ug && myUid === 0;
      return ret;
    }
  }
});

// node_modules/.pnpm/isexe@2.0.0/node_modules/isexe/index.js
var require_isexe = __commonJS({
  "node_modules/.pnpm/isexe@2.0.0/node_modules/isexe/index.js"(exports, module2) {
    var fs6 = require("fs");
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
        const p2 = !pathPart && /^\.[\\\/]/.test(cmd) ? cmd.slice(0, 2) + pCmd : pCmd;
        resolve2(subStep(p2, i, 0));
      });
      const subStep = (p2, i, ii) => new Promise((resolve2, reject) => {
        if (ii === pathExt.length)
          return resolve2(step(i + 1));
        const ext = pathExt[ii];
        isexe(p2 + ext, { pathExt: pathExtExe }, (er, is) => {
          if (!er && is) {
            if (opt.all)
              found.push(p2 + ext);
            else
              return resolve2(p2 + ext);
          }
          return resolve2(subStep(p2, i, ii + 1));
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
        const p2 = !pathPart && /^\.[\\\/]/.test(cmd) ? cmd.slice(0, 2) + pCmd : pCmd;
        for (let j = 0; j < pathExt.length; j++) {
          const cur = p2 + pathExt[j];
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
    var fs6 = require("fs");
    var shebangCommand = require_shebang_command();
    function readShebang(command) {
      const size = 150;
      const buffer = Buffer.alloc(size);
      let fd;
      try {
        fd = fs6.openSync(command, "r");
        fs6.readSync(fd, buffer, 0, size, 0);
        fs6.closeSync(fd);
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
    var process4 = global.process;
    var processOk = function(process5) {
      return process5 && typeof process5 === "object" && typeof process5.removeListener === "function" && typeof process5.emit === "function" && typeof process5.reallyExit === "function" && typeof process5.listeners === "function" && typeof process5.kill === "function" && typeof process5.pid === "number" && typeof process5.on === "function";
    };
    if (!processOk(process4)) {
      module2.exports = function() {
        return function() {
        };
      };
    } else {
      assert = require("assert");
      signals = require_signals();
      isWin = /^win/i.test(process4.platform);
      EE = require("events");
      if (typeof EE !== "function") {
        EE = EE.EventEmitter;
      }
      if (process4.__signal_exit_emitter__) {
        emitter = process4.__signal_exit_emitter__;
      } else {
        emitter = process4.__signal_exit_emitter__ = new EE();
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
            process4.removeListener(sig, sigListeners[sig]);
          } catch (er) {
          }
        });
        process4.emit = originalProcessEmit;
        process4.reallyExit = originalProcessReallyExit;
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
          var listeners = process4.listeners(sig);
          if (listeners.length === emitter.count) {
            unload();
            emit("exit", null, sig);
            emit("afterexit", null, sig);
            if (isWin && sig === "SIGHUP") {
              sig = "SIGINT";
            }
            process4.kill(process4.pid, sig);
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
            process4.on(sig, sigListeners[sig]);
            return true;
          } catch (er) {
            return false;
          }
        });
        process4.emit = processEmit;
        process4.reallyExit = processReallyExit;
      };
      module2.exports.load = load;
      originalProcessReallyExit = process4.reallyExit;
      processReallyExit = function processReallyExit2(code) {
        if (!processOk(global.process)) {
          return;
        }
        process4.exitCode = code || /* istanbul ignore next */
        0;
        emit("exit", process4.exitCode, null);
        emit("afterexit", process4.exitCode, null);
        originalProcessReallyExit.call(process4, process4.exitCode);
      };
      originalProcessEmit = process4.emit;
      processEmit = function processEmit2(ev, arg) {
        if (ev === "exit" && processOk(global.process)) {
          if (arg !== void 0) {
            process4.exitCode = arg;
          }
          var ret = originalProcessEmit.apply(this, arguments);
          emit("exit", process4.exitCode, null);
          emit("afterexit", process4.exitCode, null);
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
};

// packages/qwik/src/cli/utils/integrations.ts
var import_node_fs3 = __toESM(require("fs"), 1);
var import_node_path3 = require("path");

// packages/qwik/src/cli/utils/utils.ts
var import_node_fs2 = __toESM(require("fs"), 1);
var import_node_path2 = require("path");

// node_modules/.pnpm/@clack+core@0.3.0/node_modules/@clack/core/dist/index.mjs
var import_sisteransi = __toESM(require_src(), 1);
var import_node_process = require("process");
var a = __toESM(require("readline"), 1);
var import_node_readline = __toESM(require("readline"), 1);
var import_node_tty = require("tty");
function x(o2, t) {
  if (o2 === t)
    return;
  const s = o2.split(`
`), e2 = t.split(`
`), i = [];
  for (let r = 0; r < Math.max(s.length, e2.length); r++)
    s[r] !== e2[r] && i.push(r);
  return i;
}
var d = Symbol("clack:cancel");
function C(o2) {
  return o2 === d;
}
function l(o2, t) {
  o2.isTTY && o2.setRawMode(t);
}
var g = /* @__PURE__ */ new Map([["k", "up"], ["j", "down"], ["h", "left"], ["l", "right"]]);
var y = /* @__PURE__ */ new Set(["up", "down", "left", "right", "space", "enter"]);
var u = class {
  constructor({ render: t, input: s = import_node_process.stdin, output: e2 = import_node_process.stdout, ...i }, r = true) {
    this._track = false, this._cursor = 0, this.state = "initial", this.error = "", this.subscribers = /* @__PURE__ */ new Map(), this._prevFrame = "", this.opts = i, this.onKeypress = this.onKeypress.bind(this), this.close = this.close.bind(this), this.render = this.render.bind(this), this._render = t.bind(this), this._track = r, this.input = s, this.output = e2;
  }
  prompt() {
    const t = new import_node_tty.WriteStream(0);
    return t._write = (s, e2, i) => {
      this._track && (this.value = this.rl.line.replace(/\t/g, ""), this._cursor = this.rl.cursor, this.emit("value", this.value)), i();
    }, this.input.pipe(t), this.rl = import_node_readline.default.createInterface({ input: this.input, output: t, tabSize: 2, prompt: "", escapeCodeTimeout: 50 }), import_node_readline.default.emitKeypressEvents(this.input, this.rl), this.rl.prompt(), this.opts.initialValue !== void 0 && this._track && this.rl.write(this.opts.initialValue), this.input.on("keypress", this.onKeypress), l(this.input, true), this.render(), new Promise((s, e2) => {
      this.once("submit", () => {
        this.output.write(import_sisteransi.cursor.show), l(this.input, false), s(this.value);
      }), this.once("cancel", () => {
        this.output.write(import_sisteransi.cursor.show), l(this.input, false), s(d);
      });
    });
  }
  on(t, s) {
    const e2 = this.subscribers.get(t) ?? [];
    e2.push({ cb: s }), this.subscribers.set(t, e2);
  }
  once(t, s) {
    const e2 = this.subscribers.get(t) ?? [];
    e2.push({ cb: s, once: true }), this.subscribers.set(t, e2);
  }
  emit(t, ...s) {
    const e2 = this.subscribers.get(t) ?? [], i = [];
    for (const r of e2)
      r.cb(...s), r.once && i.push(() => e2.splice(e2.indexOf(r), 1));
    for (const r of i)
      r();
  }
  unsubscribe() {
    this.subscribers.clear();
  }
  onKeypress(t, s) {
    if (this.state === "error" && (this.state = "active"), (s == null ? void 0 : s.name) && !this._track && g.has(s.name) && this.emit("cursor", g.get(s.name)), (s == null ? void 0 : s.name) && y.has(s.name) && this.emit("cursor", s.name), t && (t.toLowerCase() === "y" || t.toLowerCase() === "n") && this.emit("confirm", t.toLowerCase() === "y"), t && this.emit("key", t.toLowerCase()), (s == null ? void 0 : s.name) === "return") {
      if (this.opts.validate) {
        const e2 = this.opts.validate(this.value);
        e2 && (this.error = e2, this.state = "error", this.rl.write(this.value));
      }
      this.state !== "error" && (this.state = "submit");
    }
    t === "" && (this.state = "cancel"), (this.state === "submit" || this.state === "cancel") && this.emit("finalize"), this.render(), (this.state === "submit" || this.state === "cancel") && this.close();
  }
  close() {
    this.input.unpipe(), this.input.removeListener("keypress", this.onKeypress), this.output.write(`
`), l(this.input, false), this.rl.close(), this.emit(`${this.state}`, this.value), this.unsubscribe();
  }
  restoreCursor() {
    const t = this._prevFrame.split(`
`).length - 1;
    this.output.write(import_sisteransi.cursor.move(-999, t * -1));
  }
  render() {
    const t = this._render(this) ?? "";
    if (t !== this._prevFrame) {
      if (this.state === "initial")
        this.output.write(import_sisteransi.cursor.hide);
      else {
        const s = x(this._prevFrame, t);
        if (this.restoreCursor(), s && (s == null ? void 0 : s.length) === 1) {
          const e2 = s[0];
          this.output.write(import_sisteransi.cursor.move(0, e2)), this.output.write(import_sisteransi.erase.lines(1));
          const i = t.split(`
`);
          this.output.write(i[e2]), this._prevFrame = t, this.output.write(import_sisteransi.cursor.move(0, i.length - e2 - 1));
          return;
        } else if (s && (s == null ? void 0 : s.length) > 1) {
          const e2 = s[0];
          this.output.write(import_sisteransi.cursor.move(0, e2)), this.output.write(import_sisteransi.erase.down());
          const r = t.split(`
`).slice(e2);
          this.output.write(r.join(`
`)), this._prevFrame = t;
          return;
        }
        this.output.write(import_sisteransi.erase.down());
      }
      this.output.write(t), this.state === "initial" && (this.state = "active"), this._prevFrame = t;
    }
  }
};
var V = class extends u {
  get cursor() {
    return this.value ? 0 : 1;
  }
  get _value() {
    return this.cursor === 0;
  }
  constructor(t) {
    super(t, false), this.value = !!t.initialValue, this.on("value", () => {
      this.value = this._value;
    }), this.on("confirm", (s) => {
      this.output.write(import_sisteransi.cursor.move(0, -1)), this.value = s, this.state = "submit", this.close();
    }), this.on("cursor", () => {
      this.value = !this.value;
    });
  }
};
var $2 = class extends u {
  constructor(t) {
    super(t, false), this.cursor = 0, this.options = t.options, this.cursor = this.options.findIndex(({ value: s }) => s === t.initialValue), this.cursor === -1 && (this.cursor = 0), this.changeValue(), this.on("cursor", (s) => {
      switch (s) {
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
function W({ input: o2 = import_node_process.stdin, output: t = import_node_process.stdout, overwrite: s = true, hideCursor: e2 = true } = {}) {
  const i = a.createInterface({ input: o2, output: t, prompt: "", tabSize: 1 });
  a.emitKeypressEvents(o2, i), o2.isTTY && o2.setRawMode(true);
  const r = (w2, { name: p2 }) => {
    if (String(w2) === "" && process.exit(0), !s)
      return;
    let b = p2 === "return" ? 0 : -1, _2 = p2 === "return" ? -1 : 0;
    a.moveCursor(t, b, _2, () => {
      a.clearLine(t, 1, () => {
        o2.once("keypress", r);
      });
    });
  };
  return e2 && process.stdout.write(import_sisteransi.cursor.hide), o2.once("keypress", r), () => {
    o2.off("keypress", r), e2 && process.stdout.write(import_sisteransi.cursor.show), i.terminal = false, i.close();
  };
}

// node_modules/.pnpm/@clack+prompts@0.6.1/node_modules/@clack/prompts/dist/index.mjs
var import_node_process2 = __toESM(require("process"), 1);
var import_picocolors = __toESM(require_picocolors(), 1);
var import_sisteransi2 = __toESM(require_src(), 1);
function N() {
  return import_node_process2.default.platform !== "win32" ? import_node_process2.default.env.TERM !== "linux" : Boolean(import_node_process2.default.env.CI) || Boolean(import_node_process2.default.env.WT_SESSION) || Boolean(import_node_process2.default.env.TERMINUS_SUBLIME) || import_node_process2.default.env.ConEmuTask === "{cmd::Cmder}" || import_node_process2.default.env.TERM_PROGRAM === "Terminus-Sublime" || import_node_process2.default.env.TERM_PROGRAM === "vscode" || import_node_process2.default.env.TERM === "xterm-256color" || import_node_process2.default.env.TERM === "alacritty" || import_node_process2.default.env.TERMINAL_EMULATOR === "JetBrains-JediTerm";
}
var p = N();
var u2 = (r, n) => p ? r : n;
var W2 = u2("\u25C6", "*");
var D = u2("\u25A0", "x");
var F = u2("\u25B2", "x");
var f2 = u2("\u25C7", "o");
var L2 = u2("\u250C", "T");
var a2 = u2("\u2502", "|");
var o = u2("\u2514", "\u2014");
var w = u2("\u25CF", ">");
var S2 = u2("\u25CB", " ");
var _ = u2("\u25FB", "[\u2022]");
var y2 = u2("\u25FC", "[+]");
var A = u2("\u25FB", "[ ]");
var q = u2("\u25AA", "\u2022");
var R = u2("\u2500", "-");
var G = u2("\u256E", "+");
var H = u2("\u251C", "+");
var K = u2("\u256F", "+");
var U = u2("\u25CF", "\u2022");
var Z = u2("\u25C6", "*");
var z = u2("\u25B2", "!");
var X = u2("\u25A0", "x");
var h2 = (r) => {
  switch (r) {
    case "initial":
    case "active":
      return import_picocolors.default.cyan(W2);
    case "cancel":
      return import_picocolors.default.red(D);
    case "error":
      return import_picocolors.default.yellow(F);
    case "submit":
      return import_picocolors.default.green(f2);
  }
};
var Q = (r) => {
  const n = r.active ?? "Yes", s = r.inactive ?? "No";
  return new V({ active: n, inactive: s, initialValue: r.initialValue ?? true, render() {
    const t = `${import_picocolors.default.gray(a2)}
${h2(this.state)}  ${r.message}
`, i = this.value ? n : s;
    switch (this.state) {
      case "submit":
        return `${t}${import_picocolors.default.gray(a2)}  ${import_picocolors.default.dim(i)}`;
      case "cancel":
        return `${t}${import_picocolors.default.gray(a2)}  ${import_picocolors.default.strikethrough(import_picocolors.default.dim(i))}
${import_picocolors.default.gray(a2)}`;
      default:
        return `${t}${import_picocolors.default.cyan(a2)}  ${this.value ? `${import_picocolors.default.green(w)} ${n}` : `${import_picocolors.default.dim(S2)} ${import_picocolors.default.dim(n)}`} ${import_picocolors.default.dim("/")} ${this.value ? `${import_picocolors.default.dim(S2)} ${import_picocolors.default.dim(s)}` : `${import_picocolors.default.green(w)} ${s}`}
${import_picocolors.default.cyan(o)}
`;
    }
  } }).prompt();
};
var ee = (r) => {
  const n = (s, t) => {
    const i = s.label ?? String(s.value);
    return t === "active" ? `${import_picocolors.default.green(w)} ${i} ${s.hint ? import_picocolors.default.dim(`(${s.hint})`) : ""}` : t === "selected" ? `${import_picocolors.default.dim(i)}` : t === "cancelled" ? `${import_picocolors.default.strikethrough(import_picocolors.default.dim(i))}` : `${import_picocolors.default.dim(S2)} ${import_picocolors.default.dim(i)}`;
  };
  return new $2({ options: r.options, initialValue: r.initialValue, render() {
    const s = `${import_picocolors.default.gray(a2)}
${h2(this.state)}  ${r.message}
`;
    switch (this.state) {
      case "submit":
        return `${s}${import_picocolors.default.gray(a2)}  ${n(this.options[this.cursor], "selected")}`;
      case "cancel":
        return `${s}${import_picocolors.default.gray(a2)}  ${n(this.options[this.cursor], "cancelled")}
${import_picocolors.default.gray(a2)}`;
      default:
        return `${s}${import_picocolors.default.cyan(a2)}  ${this.options.map((t, i) => n(t, i === this.cursor ? "active" : "inactive")).join(`
${import_picocolors.default.cyan(a2)}  `)}
${import_picocolors.default.cyan(o)}
`;
    }
  } }).prompt();
};
var ae = (r = "") => {
  process.stdout.write(`${import_picocolors.default.gray(L2)}  ${r}
`);
};
var ce = (r = "") => {
  process.stdout.write(`${import_picocolors.default.gray(a2)}
${import_picocolors.default.gray(o)}  ${r}

`);
};
var g2 = { message: (r = "", { symbol: n = import_picocolors.default.gray(a2) } = {}) => {
  const s = [`${import_picocolors.default.gray(a2)}`];
  if (r) {
    const [t, ...i] = r.split(`
`);
    s.push(`${n}  ${t}`, ...i.map((c2) => `${import_picocolors.default.gray(a2)}  ${c2}`));
  }
  process.stdout.write(`${s.join(`
`)}
`);
}, info: (r) => {
  g2.message(r, { symbol: import_picocolors.default.blue(U) });
}, success: (r) => {
  g2.message(r, { symbol: import_picocolors.default.green(Z) });
}, step: (r) => {
  g2.message(r, { symbol: import_picocolors.default.green(f2) });
}, warn: (r) => {
  g2.message(r, { symbol: import_picocolors.default.yellow(z) });
}, warning: (r) => {
  g2.warn(r);
}, error: (r) => {
  g2.message(r, { symbol: import_picocolors.default.red(X) });
} };
var C2 = p ? ["\u25D2", "\u25D0", "\u25D3", "\u25D1"] : ["\u2022", "o", "O", "0"];
var le = () => {
  let r, n;
  const s = p ? 80 : 120;
  return { start(t = "") {
    t = t.replace(/\.?\.?\.$/, ""), r = W(), process.stdout.write(`${import_picocolors.default.gray(a2)}
${import_picocolors.default.magenta("\u25CB")}  ${t}
`);
    let i = 0, c2 = 0;
    n = setInterval(() => {
      let l2 = C2[i];
      process.stdout.write(import_sisteransi2.cursor.move(-999, -1)), process.stdout.write(`${import_picocolors.default.magenta(l2)}  ${t}${Math.floor(c2) >= 1 ? ".".repeat(Math.floor(c2)).slice(0, 3) : ""}   
`), i = i === C2.length - 1 ? 0 : i + 1, c2 = c2 === C2.length ? 0 : c2 + 0.125;
    }, s);
  }, stop(t = "") {
    process.stdout.write(import_sisteransi2.cursor.move(-999, -2)), process.stdout.write(import_sisteransi2.erase.down(2)), clearInterval(n), process.stdout.write(`${import_picocolors.default.gray(a2)}
${import_picocolors.default.green(f2)}  ${t}
`), r();
  } };
};

// packages/qwik/src/cli/utils/utils.ts
var import_which_pm_runs = __toESM(require_which_pm_runs(), 1);
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
  ce("take care \u{1F44B}");
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
  return integrations2.sort((a3, b) => {
    if (a3.priority > b.priority)
      return -1;
    if (a3.priority < b.priority)
      return 1;
    return a3.id < b.id ? -1 : 1;
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
    loadingIntegrations.sort((a3, b) => {
      if (a3.priority > b.priority)
        return -1;
      if (a3.priority < b.priority)
        return 1;
      return a3.id < b.id ? -1 : 1;
    });
    integrations = loadingIntegrations;
  }
  return integrations;
}

// packages/qwik/src/cli/add/update-app.ts
var import_node_path5 = require("path");
var import_node_fs5 = __toESM(require("fs"), 1);

// packages/qwik/src/cli/utils/install-deps.ts
var import_cross_spawn = __toESM(require_cross_spawn(), 1);
function installDeps(pkgManager, dir) {
  return runCommand(pkgManager, ["install"], dir);
}
function runInPkg(pkgManager, args, cwd) {
  const cmd = pkgManager === "npm" ? "npx" : pkgManager;
  return runCommand(cmd, args, cwd);
}
function runCommand(cmd, args, cwd) {
  let installChild;
  const install = new Promise((resolve2) => {
    try {
      installChild = (0, import_cross_spawn.default)(cmd, args, {
        cwd,
        stdio: "ignore"
      });
      installChild.on("error", () => {
        resolve2(false);
      });
      installChild.on("close", (code) => {
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
    if (installChild) {
      installChild.kill("SIGINT");
    }
  };
  return { abort, install };
}

// packages/qwik/src/cli/add/update-files.ts
var import_node_fs4 = __toESM(require("fs"), 1);
var import_node_path4 = require("path");
async function mergeIntegrationDir(fileUpdates, opts, srcDir, destDir) {
  const items = await import_node_fs4.default.promises.readdir(srcDir);
  await Promise.all(
    items.map(async (itemName) => {
      const destName = itemName === "gitignore" ? ".gitignore" : itemName;
      const srcChildPath = (0, import_node_path4.join)(srcDir, itemName);
      const destChildPath = (0, import_node_path4.join)(destDir, destName);
      const s = await import_node_fs4.default.promises.stat(srcChildPath);
      if (s.isDirectory()) {
        await mergeIntegrationDir(fileUpdates, opts, srcChildPath, destChildPath);
      } else if (s.isFile()) {
        if (destName === "package.json") {
          await mergePackageJsons(fileUpdates, srcChildPath, destChildPath);
        } else if (destName === "README.md") {
          await mergeReadmes(fileUpdates, srcChildPath, destChildPath);
        } else if (destName === ".gitignore") {
          await mergeGitIgnores(fileUpdates, srcChildPath, destChildPath);
        } else {
          if (import_node_fs4.default.existsSync(destChildPath)) {
            fileUpdates.files.push({
              path: destChildPath,
              content: await import_node_fs4.default.promises.readFile(srcChildPath, "utf-8"),
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
  const srcPkgJson = JSON.parse(srcContent);
  const props = ["scripts", "dependencies", "devDependencies"];
  try {
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
async function mergeGitIgnores(fileUpdates, srcPath, destPath) {
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

// packages/qwik/src/cli/add/update-vite-config.ts
var import_fs = __toESM(require("fs"), 1);
var import_path = require("path");

// packages/qwik/src/cli/code-mod/code-mod.ts
function updateViteConfig(ts, sourceText, updates) {
  if (!(updates == null ? void 0 : updates.imports) && !(updates == null ? void 0 : updates.qwikViteConfig) && !(updates == null ? void 0 : updates.viteConfig) && !(updates == null ? void 0 : updates.vitePlugins)) {
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
        if (ts.isIdentifier(s.expression.expression) && s.expression.expression.text === "defineConfig" && (updates.viteConfig || updates.qwikViteConfig || updates.vitePlugins)) {
          statements.push(
            ts.factory.updateExportAssignment(
              s,
              s.decorators,
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
    existingNamedImports.sort((a3, b) => {
      const aName = a3.name.escapedText.toString();
      const bName = b.name.escapedText.toString();
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
  if (updates.vitePlugins || updates.qwikViteConfig) {
    obj = updatePlugins(ts, obj, updates);
  }
  return obj;
}
function updatePlugins(ts, obj, updates) {
  const properties = [];
  for (const p2 of obj.properties) {
    if (ts.isPropertyAssignment(p2)) {
      if (p2.name && ts.isIdentifier(p2.name) && p2.name.text === "plugins") {
        if (ts.isArrayLiteralExpression(p2.initializer)) {
          properties.push(
            ts.factory.updatePropertyAssignment(
              p2,
              p2.name,
              updatePluginsArray(ts, p2.initializer, updates)
            )
          );
          continue;
        }
      }
    }
    properties.push(p2);
  }
  return ts.factory.updateObjectLiteralExpression(obj, properties);
}
function updatePluginsArray(ts, arr, updates) {
  const elms = [...arr.elements];
  if (updates.vitePlugins) {
    for (const vitePlugin of updates.vitePlugins) {
      const pluginExp = createPluginCall(ts, vitePlugin);
      if (pluginExp) {
        elms.push(pluginExp);
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
          for (const p2 of obj.properties) {
            if (p2.name && ts.isIdentifier(p2.name) && p2.name.text === propName) {
              properties.push(ts.factory.createPropertyAssignment(propName, exp));
              added = true;
            } else {
              properties.push(p2);
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
  const p2 = ts.createPrinter({
    removeComments: false,
    omitTrailingSemicolon: false,
    noEmitHelpers: true
  });
  return p2.printFile(t.transformed[0]);
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
    installedDeps: {}
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
    if (C(integrationAnswer)) {
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
  logUpdateAppCommitResult(result);
  process.exit(0);
}
async function logUpdateAppResult(pkgManager, result) {
  const modifyFiles = result.updates.files.filter((f3) => f3.type === "modify");
  const overwriteFiles = result.updates.files.filter((f3) => f3.type === "overwrite");
  const createFiles = result.updates.files.filter((f3) => f3.type === "create");
  const installDepNames = Object.keys(result.updates.installedDeps);
  const installDeps2 = installDepNames.length > 0;
  if (modifyFiles.length === 0 && overwriteFiles.length === 0 && createFiles.length === 0 && !installDeps2) {
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
  if (installDepNames) {
    g2.message(
      [
        `\u{1F4BE} ${cyan(`Install ${pkgManager} dependenc${installDepNames.length > 1 ? "ies" : "y"}:`)}`,
        ...installDepNames.map(
          (depName) => `   - ${depName} ${result.updates.installedDeps[depName]}`
        )
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
  if (C(commit) || !commit) {
    bye();
  }
}
function logUpdateAppCommitResult(result) {
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
  const proceed = await Q({
    message: "Do you want to install an integration?",
    initialValue: true
  });
  if (C(proceed) || !proceed) {
    bye();
  }
  const command = await ee({
    message: "Select an integration",
    options: await sortIntegrationsAndReturnAsClackOptions(integrations2)
  });
  if (C(command)) {
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
    await printAddHelp(app);
    process.exit(1);
  }
}

// node_modules/.pnpm/execa@7.0.0/node_modules/execa/index.js
var import_node_buffer = require("buffer");
var import_node_path8 = __toESM(require("path"), 1);
var import_node_child_process = __toESM(require("child_process"), 1);
var import_node_process4 = __toESM(require("process"), 1);
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
var import_node_path7 = __toESM(require("path"), 1);
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
  let cwdPath = import_node_path7.default.resolve(cwdString);
  const result = [];
  while (previous !== cwdPath) {
    result.push(import_node_path7.default.join(cwdPath, "node_modules/.bin"));
    previous = cwdPath;
    cwdPath = import_node_path7.default.resolve(cwdPath, "..");
  }
  result.push(import_node_path7.default.resolve(cwdString, execPath, ".."));
  return [...result, path_].join(import_node_path7.default.delimiter);
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

// node_modules/.pnpm/human-signals@4.3.0/node_modules/human-signals/build/src/main.js
var import_node_os2 = require("os");

// node_modules/.pnpm/human-signals@4.3.0/node_modules/human-signals/build/src/realtime.js
var getRealtimeSignals = function() {
  const length = SIGRTMAX - SIGRTMIN + 1;
  return Array.from({ length }, getRealtimeSignal);
};
var getRealtimeSignal = function(value, index) {
  return {
    name: `SIGRT${index + 1}`,
    number: SIGRTMIN + index,
    action: "terminate",
    description: "Application-specific signal (realtime)",
    standard: "posix"
  };
};
var SIGRTMIN = 34;
var SIGRTMAX = 64;

// node_modules/.pnpm/human-signals@4.3.0/node_modules/human-signals/build/src/signals.js
var import_node_os = require("os");

// node_modules/.pnpm/human-signals@4.3.0/node_modules/human-signals/build/src/core.js
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

// node_modules/.pnpm/human-signals@4.3.0/node_modules/human-signals/build/src/signals.js
var getSignals = function() {
  const realtimeSignals = getRealtimeSignals();
  const signals = [...SIGNALS, ...realtimeSignals].map(normalizeSignal);
  return signals;
};
var normalizeSignal = function({
  name,
  number: defaultNumber,
  description,
  action,
  forced = false,
  standard
}) {
  const {
    signals: { [name]: constantSignal }
  } = import_node_os.constants;
  const supported = constantSignal !== void 0;
  const number = supported ? constantSignal : defaultNumber;
  return { name, number, description, supported, action, forced, standard };
};

// node_modules/.pnpm/human-signals@4.3.0/node_modules/human-signals/build/src/main.js
var getSignalsByName = function() {
  const signals = getSignals();
  return Object.fromEntries(signals.map(getSignalByName));
};
var getSignalByName = function({
  name,
  number,
  description,
  supported,
  action,
  forced,
  standard
}) {
  return [
    name,
    { name, number, description, supported, action, forced, standard }
  ];
};
var signalsByName = getSignalsByName();
var getSignalsByNumber = function() {
  const signals = getSignals();
  const length = SIGRTMAX + 1;
  const signalsA = Array.from({ length }, (value, number) => getSignalByNumber(number, signals));
  return Object.assign({}, ...signalsA);
};
var getSignalByNumber = function(number, signals) {
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
var findSignalByNumber = function(number, signals) {
  const signal = signals.find(({ name }) => import_node_os2.constants.signals[name] === number);
  if (signal !== void 0) {
    return signal;
  }
  return signals.find((signalA) => signalA.number === number);
};
var signalsByNumber = getSignalsByNumber();

// node_modules/.pnpm/execa@7.0.0/node_modules/execa/lib/error.js
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

// node_modules/.pnpm/execa@7.0.0/node_modules/execa/lib/stdio.js
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

// node_modules/.pnpm/execa@7.0.0/node_modules/execa/lib/kill.js
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

// node_modules/.pnpm/is-stream@3.0.0/node_modules/is-stream/index.js
function isStream(stream) {
  return stream !== null && typeof stream === "object" && typeof stream.pipe === "function";
}

// node_modules/.pnpm/execa@7.0.0/node_modules/execa/lib/stream.js
var import_get_stream = __toESM(require_get_stream(), 1);
var import_merge_stream = __toESM(require_merge_stream(), 1);
var handleInput = (spawned, input) => {
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

// node_modules/.pnpm/execa@7.0.0/node_modules/execa/lib/promise.js
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
  return spawned;
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

// node_modules/.pnpm/execa@7.0.0/node_modules/execa/lib/command.js
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

// node_modules/.pnpm/execa@7.0.0/node_modules/execa/index.js
var DEFAULT_MAX_BUFFER = 1e3 * 1e3 * 100;
var getEnv = ({ env: envOption, extendEnv, preferLocal, localDir, execPath }) => {
  const env = extendEnv ? { ...import_node_process4.default.env, ...envOption } : envOption;
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
    localDir: options.cwd || import_node_process4.default.cwd(),
    execPath: import_node_process4.default.execPath,
    encoding: "utf8",
    reject: true,
    cleanup: true,
    all: false,
    windowsHide: true,
    ...options
  };
  options.env = getEnv(options);
  options.stdio = normalizeStdio(options);
  if (import_node_process4.default.platform === "win32" && import_node_path8.default.basename(file, ".exe") === "cmd") {
    args.unshift("/q");
  }
  return { file, args, options, parsed };
};
var handleOutput = (options, value, error) => {
  if (typeof value !== "string" && !import_node_buffer.Buffer.isBuffer(value)) {
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
  validateTimeout(parsed.options);
  let spawned;
  try {
    spawned = import_node_child_process.default.spawn(parsed.file, parsed.args, parsed.options);
  } catch (error) {
    const dummySpawned = new import_node_child_process.default.ChildProcess();
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
    return mergePromise(dummySpawned, errorPromise);
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
  handleInput(spawned, parsed.options.input);
  spawned.all = makeAllStream(spawned, parsed.options);
  return mergePromise(spawned, handlePromiseOnce);
}
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
  const scripts = [
    buildTypes,
    buildClientScript,
    buildLibScript,
    buildPreviewScript,
    buildServerScript,
    buildStaticScript,
    lint
  ].filter((s) => typeof s === "string" && s.trim().length > 0);
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
  for (const script of scripts) {
    console.log(dim(script));
  }
  console.log(``);
  let typecheck = null;
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
    await execaCommand(buildClientScript, {
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
    const libBuild = execaCommand(buildLibScript, {
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
    const previewBuild = execaCommand(buildPreviewScript, {
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
    const serverBuild = execaCommand(buildServerScript, {
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
  console.log(``);
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
  for (const value of COMMANDS) {
    if (value.value === app.task && typeof value.run === "function") {
      await value.run(app);
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
  const proceed = await Q({
    message: "Do you want to run a command?",
    initialValue: true
  });
  if (C(proceed) || !proceed) {
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
  if (C(command)) {
    bye();
  }
  await runCommand2(Object.assign(app, { task: command }));
}
function printVersion() {
  console.log("0.20.2");
}
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  runCli,
  updateApp
});
