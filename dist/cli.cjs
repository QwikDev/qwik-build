/**
 * @license
 * @builder.io/qwik/cli 1.14.1
 * Copyright Builder.io, Inc. All Rights Reserved.
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/QwikDev/qwik/blob/main/LICENSE
 */
"use strict";
var __create = Object.create;
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __getProtoOf = Object.getPrototypeOf;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __esm = (fn, res) => function __init() {
  return fn && (res = (0, fn[__getOwnPropNames(fn)[0]])(fn = 0)), res;
};
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
  "node_modules/.pnpm/sisteransi@1.0.5/node_modules/sisteransi/src/index.js"(exports2, module2) {
    "use strict";
    var ESC = "\x1B";
    var CSI = `${ESC}[`;
    var beep = "\x07";
    var cursor = {
      to(x3, y3) {
        if (!y3) return `${CSI}${x3 + 1}G`;
        return `${CSI}${y3 + 1};${x3 + 1}H`;
      },
      move(x3, y3) {
        let ret = "";
        if (x3 < 0) ret += `${CSI}${-x3}D`;
        else if (x3 > 0) ret += `${CSI}${x3}C`;
        if (y3 < 0) ret += `${CSI}${-y3}A`;
        else if (y3 > 0) ret += `${CSI}${y3}B`;
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

// node_modules/.pnpm/picocolors@1.1.1/node_modules/picocolors/picocolors.js
var require_picocolors = __commonJS({
  "node_modules/.pnpm/picocolors@1.1.1/node_modules/picocolors/picocolors.js"(exports2, module2) {
    var p = process || {};
    var argv = p.argv || [];
    var env = p.env || {};
    var isColorSupported = !(!!env.NO_COLOR || argv.includes("--no-color")) && (!!env.FORCE_COLOR || argv.includes("--color") || p.platform === "win32" || (p.stdout || {}).isTTY && env.TERM !== "dumb" || !!env.CI);
    var formatter = (open, close, replace = open) => (input) => {
      let string = "" + input, index = string.indexOf(close, open.length);
      return ~index ? open + replaceClose(string, close, replace, index) + close : open + string + close;
    };
    var replaceClose = (string, close, replace, index) => {
      let result = "", cursor = 0;
      do {
        result += string.substring(cursor, index) + replace;
        cursor = index + close.length;
        index = string.indexOf(close, cursor);
      } while (~index);
      return result + string.substring(cursor);
    };
    var createColors = (enabled = isColorSupported) => {
      let f3 = enabled ? formatter : () => String;
      return {
        isColorSupported: enabled,
        reset: f3("\x1B[0m", "\x1B[0m"),
        bold: f3("\x1B[1m", "\x1B[22m", "\x1B[22m\x1B[1m"),
        dim: f3("\x1B[2m", "\x1B[22m", "\x1B[22m\x1B[2m"),
        italic: f3("\x1B[3m", "\x1B[23m"),
        underline: f3("\x1B[4m", "\x1B[24m"),
        inverse: f3("\x1B[7m", "\x1B[27m"),
        hidden: f3("\x1B[8m", "\x1B[28m"),
        strikethrough: f3("\x1B[9m", "\x1B[29m"),
        black: f3("\x1B[30m", "\x1B[39m"),
        red: f3("\x1B[31m", "\x1B[39m"),
        green: f3("\x1B[32m", "\x1B[39m"),
        yellow: f3("\x1B[33m", "\x1B[39m"),
        blue: f3("\x1B[34m", "\x1B[39m"),
        magenta: f3("\x1B[35m", "\x1B[39m"),
        cyan: f3("\x1B[36m", "\x1B[39m"),
        white: f3("\x1B[37m", "\x1B[39m"),
        gray: f3("\x1B[90m", "\x1B[39m"),
        bgBlack: f3("\x1B[40m", "\x1B[49m"),
        bgRed: f3("\x1B[41m", "\x1B[49m"),
        bgGreen: f3("\x1B[42m", "\x1B[49m"),
        bgYellow: f3("\x1B[43m", "\x1B[49m"),
        bgBlue: f3("\x1B[44m", "\x1B[49m"),
        bgMagenta: f3("\x1B[45m", "\x1B[49m"),
        bgCyan: f3("\x1B[46m", "\x1B[49m"),
        bgWhite: f3("\x1B[47m", "\x1B[49m"),
        blackBright: f3("\x1B[90m", "\x1B[39m"),
        redBright: f3("\x1B[91m", "\x1B[39m"),
        greenBright: f3("\x1B[92m", "\x1B[39m"),
        yellowBright: f3("\x1B[93m", "\x1B[39m"),
        blueBright: f3("\x1B[94m", "\x1B[39m"),
        magentaBright: f3("\x1B[95m", "\x1B[39m"),
        cyanBright: f3("\x1B[96m", "\x1B[39m"),
        whiteBright: f3("\x1B[97m", "\x1B[39m"),
        bgBlackBright: f3("\x1B[100m", "\x1B[49m"),
        bgRedBright: f3("\x1B[101m", "\x1B[49m"),
        bgGreenBright: f3("\x1B[102m", "\x1B[49m"),
        bgYellowBright: f3("\x1B[103m", "\x1B[49m"),
        bgBlueBright: f3("\x1B[104m", "\x1B[49m"),
        bgMagentaBright: f3("\x1B[105m", "\x1B[49m"),
        bgCyanBright: f3("\x1B[106m", "\x1B[49m"),
        bgWhiteBright: f3("\x1B[107m", "\x1B[49m")
      };
    };
    module2.exports = createColors();
    module2.exports.createColors = createColors;
  }
});

// node_modules/.pnpm/@clack+core@0.3.5/node_modules/@clack/core/dist/index.mjs
function q({ onlyFirst: e2 = false } = {}) {
  const F = ["[\\u001B\\u009B][[\\]()#;?]*(?:(?:(?:(?:;[-a-zA-Z\\d\\/#&.:=?%@~_]+)*|[a-zA-Z\\d]+(?:;[-a-zA-Z\\d\\/#&.:=?%@~_]*)*)?(?:\\u0007|\\u001B\\u005C|\\u009C))", "(?:(?:\\d{1,4}(?:;\\d{0,4})*)?[\\dA-PR-TZcf-nq-uy=><~]))"].join("|");
  return new RegExp(F, e2 ? void 0 : "g");
}
function S(e2) {
  if (typeof e2 != "string") throw new TypeError(`Expected a \`string\`, got \`${typeof e2}\``);
  return e2.replace(J, "");
}
function T(e2) {
  return e2 && e2.__esModule && Object.prototype.hasOwnProperty.call(e2, "default") ? e2.default : e2;
}
function A(e2, u = {}) {
  if (typeof e2 != "string" || e2.length === 0 || (u = { ambiguousIsNarrow: true, ...u }, e2 = S(e2), e2.length === 0)) return 0;
  e2 = e2.replace(uD(), "  ");
  const F = u.ambiguousIsNarrow ? 1 : 2;
  let t = 0;
  for (const s2 of e2) {
    const C2 = s2.codePointAt(0);
    if (C2 <= 31 || C2 >= 127 && C2 <= 159 || C2 >= 768 && C2 <= 879) continue;
    switch (X.eastAsianWidth(s2)) {
      case "F":
      case "W":
        t += 2;
        break;
      case "A":
        t += F;
        break;
      default:
        t += 1;
    }
  }
  return t;
}
function tD() {
  const e2 = /* @__PURE__ */ new Map();
  for (const [u, F] of Object.entries(r)) {
    for (const [t, s2] of Object.entries(F)) r[t] = { open: `\x1B[${s2[0]}m`, close: `\x1B[${s2[1]}m` }, F[t] = r[t], e2.set(s2[0], s2[1]);
    Object.defineProperty(r, u, { value: F, enumerable: false });
  }
  return Object.defineProperty(r, "codes", { value: e2, enumerable: false }), r.color.close = "\x1B[39m", r.bgColor.close = "\x1B[49m", r.color.ansi = M(), r.color.ansi256 = P(), r.color.ansi16m = W(), r.bgColor.ansi = M(d), r.bgColor.ansi256 = P(d), r.bgColor.ansi16m = W(d), Object.defineProperties(r, { rgbToAnsi256: { value: (u, F, t) => u === F && F === t ? u < 8 ? 16 : u > 248 ? 231 : Math.round((u - 8) / 247 * 24) + 232 : 16 + 36 * Math.round(u / 255 * 5) + 6 * Math.round(F / 255 * 5) + Math.round(t / 255 * 5), enumerable: false }, hexToRgb: { value: (u) => {
    const F = /[a-f\d]{6}|[a-f\d]{3}/i.exec(u.toString(16));
    if (!F) return [0, 0, 0];
    let [t] = F;
    t.length === 3 && (t = [...t].map((C2) => C2 + C2).join(""));
    const s2 = Number.parseInt(t, 16);
    return [s2 >> 16 & 255, s2 >> 8 & 255, s2 & 255];
  }, enumerable: false }, hexToAnsi256: { value: (u) => r.rgbToAnsi256(...r.hexToRgb(u)), enumerable: false }, ansi256ToAnsi: { value: (u) => {
    if (u < 8) return 30 + u;
    if (u < 16) return 90 + (u - 8);
    let F, t, s2;
    if (u >= 232) F = ((u - 232) * 10 + 8) / 255, t = F, s2 = F;
    else {
      u -= 16;
      const i = u % 36;
      F = Math.floor(u / 36) / 5, t = Math.floor(i / 6) / 5, s2 = i % 6 / 5;
    }
    const C2 = Math.max(F, t, s2) * 2;
    if (C2 === 0) return 30;
    let D = 30 + (Math.round(s2) << 2 | Math.round(t) << 1 | Math.round(F));
    return C2 === 2 && (D += 60), D;
  }, enumerable: false }, rgbToAnsi: { value: (u, F, t) => r.ansi256ToAnsi(r.rgbToAnsi256(u, F, t)), enumerable: false }, hexToAnsi: { value: (u) => r.ansi256ToAnsi(r.hexToAnsi256(u)), enumerable: false } }), r;
}
function R(e2, u, F) {
  return String(e2).normalize().replace(/\r\n/g, `
`).split(`
`).map((t) => oD(t, u, F)).join(`
`);
}
function hD(e2, u) {
  if (e2 === u) return;
  const F = e2.split(`
`), t = u.split(`
`), s2 = [];
  for (let C2 = 0; C2 < Math.max(F.length, t.length); C2++) F[C2] !== t[C2] && s2.push(C2);
  return s2;
}
function lD(e2) {
  return e2 === V;
}
function v(e2, u) {
  e2.isTTY && e2.setRawMode(u);
}
function OD({ input: e2 = import_node_process.stdin, output: u = import_node_process.stdout, overwrite: F = true, hideCursor: t = true } = {}) {
  const s2 = f.createInterface({ input: e2, output: u, prompt: "", tabSize: 1 });
  f.emitKeypressEvents(e2, s2), e2.isTTY && e2.setRawMode(true);
  const C2 = (D, { name: i }) => {
    if (String(D) === "") {
      t && u.write(import_sisteransi.cursor.show), process.exit(0);
      return;
    }
    if (!F) return;
    let n = i === "return" ? 0 : -1, E2 = i === "return" ? -1 : 0;
    f.moveCursor(u, n, E2, () => {
      f.clearLine(u, 1, () => {
        e2.once("keypress", C2);
      });
    });
  };
  return t && u.write(import_sisteransi.cursor.hide), e2.once("keypress", C2), () => {
    e2.off("keypress", C2), t && u.write(import_sisteransi.cursor.show), e2.isTTY && !WD && e2.setRawMode(false), s2.terminal = false, s2.close();
  };
}
var import_sisteransi, import_node_process, f, import_node_readline, import_node_tty, import_picocolors, J, j, Q, X, DD, uD, d, M, P, W, r, FD, eD, sD, g, CD, b, O, iD, I, w, N, L, rD, y, ED, oD, nD, aD, a, V, z, xD, x, BD, wD, yD, Z, $D, TD, jD, MD, PD, WD;
var init_dist = __esm({
  "node_modules/.pnpm/@clack+core@0.3.5/node_modules/@clack/core/dist/index.mjs"() {
    import_sisteransi = __toESM(require_src(), 1);
    import_node_process = require("node:process");
    f = __toESM(require("node:readline"), 1);
    import_node_readline = __toESM(require("node:readline"), 1);
    import_node_tty = require("node:tty");
    import_picocolors = __toESM(require_picocolors(), 1);
    J = q();
    j = { exports: {} };
    (function(e2) {
      var u = {};
      e2.exports = u, u.eastAsianWidth = function(t) {
        var s2 = t.charCodeAt(0), C2 = t.length == 2 ? t.charCodeAt(1) : 0, D = s2;
        return 55296 <= s2 && s2 <= 56319 && 56320 <= C2 && C2 <= 57343 && (s2 &= 1023, C2 &= 1023, D = s2 << 10 | C2, D += 65536), D == 12288 || 65281 <= D && D <= 65376 || 65504 <= D && D <= 65510 ? "F" : D == 8361 || 65377 <= D && D <= 65470 || 65474 <= D && D <= 65479 || 65482 <= D && D <= 65487 || 65490 <= D && D <= 65495 || 65498 <= D && D <= 65500 || 65512 <= D && D <= 65518 ? "H" : 4352 <= D && D <= 4447 || 4515 <= D && D <= 4519 || 4602 <= D && D <= 4607 || 9001 <= D && D <= 9002 || 11904 <= D && D <= 11929 || 11931 <= D && D <= 12019 || 12032 <= D && D <= 12245 || 12272 <= D && D <= 12283 || 12289 <= D && D <= 12350 || 12353 <= D && D <= 12438 || 12441 <= D && D <= 12543 || 12549 <= D && D <= 12589 || 12593 <= D && D <= 12686 || 12688 <= D && D <= 12730 || 12736 <= D && D <= 12771 || 12784 <= D && D <= 12830 || 12832 <= D && D <= 12871 || 12880 <= D && D <= 13054 || 13056 <= D && D <= 19903 || 19968 <= D && D <= 42124 || 42128 <= D && D <= 42182 || 43360 <= D && D <= 43388 || 44032 <= D && D <= 55203 || 55216 <= D && D <= 55238 || 55243 <= D && D <= 55291 || 63744 <= D && D <= 64255 || 65040 <= D && D <= 65049 || 65072 <= D && D <= 65106 || 65108 <= D && D <= 65126 || 65128 <= D && D <= 65131 || 110592 <= D && D <= 110593 || 127488 <= D && D <= 127490 || 127504 <= D && D <= 127546 || 127552 <= D && D <= 127560 || 127568 <= D && D <= 127569 || 131072 <= D && D <= 194367 || 177984 <= D && D <= 196605 || 196608 <= D && D <= 262141 ? "W" : 32 <= D && D <= 126 || 162 <= D && D <= 163 || 165 <= D && D <= 166 || D == 172 || D == 175 || 10214 <= D && D <= 10221 || 10629 <= D && D <= 10630 ? "Na" : D == 161 || D == 164 || 167 <= D && D <= 168 || D == 170 || 173 <= D && D <= 174 || 176 <= D && D <= 180 || 182 <= D && D <= 186 || 188 <= D && D <= 191 || D == 198 || D == 208 || 215 <= D && D <= 216 || 222 <= D && D <= 225 || D == 230 || 232 <= D && D <= 234 || 236 <= D && D <= 237 || D == 240 || 242 <= D && D <= 243 || 247 <= D && D <= 250 || D == 252 || D == 254 || D == 257 || D == 273 || D == 275 || D == 283 || 294 <= D && D <= 295 || D == 299 || 305 <= D && D <= 307 || D == 312 || 319 <= D && D <= 322 || D == 324 || 328 <= D && D <= 331 || D == 333 || 338 <= D && D <= 339 || 358 <= D && D <= 359 || D == 363 || D == 462 || D == 464 || D == 466 || D == 468 || D == 470 || D == 472 || D == 474 || D == 476 || D == 593 || D == 609 || D == 708 || D == 711 || 713 <= D && D <= 715 || D == 717 || D == 720 || 728 <= D && D <= 731 || D == 733 || D == 735 || 768 <= D && D <= 879 || 913 <= D && D <= 929 || 931 <= D && D <= 937 || 945 <= D && D <= 961 || 963 <= D && D <= 969 || D == 1025 || 1040 <= D && D <= 1103 || D == 1105 || D == 8208 || 8211 <= D && D <= 8214 || 8216 <= D && D <= 8217 || 8220 <= D && D <= 8221 || 8224 <= D && D <= 8226 || 8228 <= D && D <= 8231 || D == 8240 || 8242 <= D && D <= 8243 || D == 8245 || D == 8251 || D == 8254 || D == 8308 || D == 8319 || 8321 <= D && D <= 8324 || D == 8364 || D == 8451 || D == 8453 || D == 8457 || D == 8467 || D == 8470 || 8481 <= D && D <= 8482 || D == 8486 || D == 8491 || 8531 <= D && D <= 8532 || 8539 <= D && D <= 8542 || 8544 <= D && D <= 8555 || 8560 <= D && D <= 8569 || D == 8585 || 8592 <= D && D <= 8601 || 8632 <= D && D <= 8633 || D == 8658 || D == 8660 || D == 8679 || D == 8704 || 8706 <= D && D <= 8707 || 8711 <= D && D <= 8712 || D == 8715 || D == 8719 || D == 8721 || D == 8725 || D == 8730 || 8733 <= D && D <= 8736 || D == 8739 || D == 8741 || 8743 <= D && D <= 8748 || D == 8750 || 8756 <= D && D <= 8759 || 8764 <= D && D <= 8765 || D == 8776 || D == 8780 || D == 8786 || 8800 <= D && D <= 8801 || 8804 <= D && D <= 8807 || 8810 <= D && D <= 8811 || 8814 <= D && D <= 8815 || 8834 <= D && D <= 8835 || 8838 <= D && D <= 8839 || D == 8853 || D == 8857 || D == 8869 || D == 8895 || D == 8978 || 9312 <= D && D <= 9449 || 9451 <= D && D <= 9547 || 9552 <= D && D <= 9587 || 9600 <= D && D <= 9615 || 9618 <= D && D <= 9621 || 9632 <= D && D <= 9633 || 9635 <= D && D <= 9641 || 9650 <= D && D <= 9651 || 9654 <= D && D <= 9655 || 9660 <= D && D <= 9661 || 9664 <= D && D <= 9665 || 9670 <= D && D <= 9672 || D == 9675 || 9678 <= D && D <= 9681 || 9698 <= D && D <= 9701 || D == 9711 || 9733 <= D && D <= 9734 || D == 9737 || 9742 <= D && D <= 9743 || 9748 <= D && D <= 9749 || D == 9756 || D == 9758 || D == 9792 || D == 9794 || 9824 <= D && D <= 9825 || 9827 <= D && D <= 9829 || 9831 <= D && D <= 9834 || 9836 <= D && D <= 9837 || D == 9839 || 9886 <= D && D <= 9887 || 9918 <= D && D <= 9919 || 9924 <= D && D <= 9933 || 9935 <= D && D <= 9953 || D == 9955 || 9960 <= D && D <= 9983 || D == 10045 || D == 10071 || 10102 <= D && D <= 10111 || 11093 <= D && D <= 11097 || 12872 <= D && D <= 12879 || 57344 <= D && D <= 63743 || 65024 <= D && D <= 65039 || D == 65533 || 127232 <= D && D <= 127242 || 127248 <= D && D <= 127277 || 127280 <= D && D <= 127337 || 127344 <= D && D <= 127386 || 917760 <= D && D <= 917999 || 983040 <= D && D <= 1048573 || 1048576 <= D && D <= 1114109 ? "A" : "N";
      }, u.characterLength = function(t) {
        var s2 = this.eastAsianWidth(t);
        return s2 == "F" || s2 == "W" || s2 == "A" ? 2 : 1;
      };
      function F(t) {
        return t.match(/[\uD800-\uDBFF][\uDC00-\uDFFF]|[^\uD800-\uDFFF]/g) || [];
      }
      u.length = function(t) {
        for (var s2 = F(t), C2 = 0, D = 0; D < s2.length; D++) C2 = C2 + this.characterLength(s2[D]);
        return C2;
      }, u.slice = function(t, s2, C2) {
        textLen = u.length(t), s2 = s2 || 0, C2 = C2 || 1, s2 < 0 && (s2 = textLen + s2), C2 < 0 && (C2 = textLen + C2);
        for (var D = "", i = 0, n = F(t), E2 = 0; E2 < n.length; E2++) {
          var h2 = n[E2], o2 = u.length(h2);
          if (i >= s2 - (o2 == 2 ? 1 : 0)) if (i + o2 <= C2) D += h2;
          else break;
          i += o2;
        }
        return D;
      };
    })(j);
    Q = j.exports;
    X = T(Q);
    DD = function() {
      return /\uD83C\uDFF4\uDB40\uDC67\uDB40\uDC62(?:\uDB40\uDC77\uDB40\uDC6C\uDB40\uDC73|\uDB40\uDC73\uDB40\uDC63\uDB40\uDC74|\uDB40\uDC65\uDB40\uDC6E\uDB40\uDC67)\uDB40\uDC7F|(?:\uD83E\uDDD1\uD83C\uDFFF\u200D\u2764\uFE0F\u200D(?:\uD83D\uDC8B\u200D)?\uD83E\uDDD1|\uD83D\uDC69\uD83C\uDFFF\u200D\uD83E\uDD1D\u200D(?:\uD83D[\uDC68\uDC69]))(?:\uD83C[\uDFFB-\uDFFE])|(?:\uD83E\uDDD1\uD83C\uDFFE\u200D\u2764\uFE0F\u200D(?:\uD83D\uDC8B\u200D)?\uD83E\uDDD1|\uD83D\uDC69\uD83C\uDFFE\u200D\uD83E\uDD1D\u200D(?:\uD83D[\uDC68\uDC69]))(?:\uD83C[\uDFFB-\uDFFD\uDFFF])|(?:\uD83E\uDDD1\uD83C\uDFFD\u200D\u2764\uFE0F\u200D(?:\uD83D\uDC8B\u200D)?\uD83E\uDDD1|\uD83D\uDC69\uD83C\uDFFD\u200D\uD83E\uDD1D\u200D(?:\uD83D[\uDC68\uDC69]))(?:\uD83C[\uDFFB\uDFFC\uDFFE\uDFFF])|(?:\uD83E\uDDD1\uD83C\uDFFC\u200D\u2764\uFE0F\u200D(?:\uD83D\uDC8B\u200D)?\uD83E\uDDD1|\uD83D\uDC69\uD83C\uDFFC\u200D\uD83E\uDD1D\u200D(?:\uD83D[\uDC68\uDC69]))(?:\uD83C[\uDFFB\uDFFD-\uDFFF])|(?:\uD83E\uDDD1\uD83C\uDFFB\u200D\u2764\uFE0F\u200D(?:\uD83D\uDC8B\u200D)?\uD83E\uDDD1|\uD83D\uDC69\uD83C\uDFFB\u200D\uD83E\uDD1D\u200D(?:\uD83D[\uDC68\uDC69]))(?:\uD83C[\uDFFC-\uDFFF])|\uD83D\uDC68(?:\uD83C\uDFFB(?:\u200D(?:\u2764\uFE0F\u200D(?:\uD83D\uDC8B\u200D\uD83D\uDC68(?:\uD83C[\uDFFB-\uDFFF])|\uD83D\uDC68(?:\uD83C[\uDFFB-\uDFFF]))|\uD83E\uDD1D\u200D\uD83D\uDC68(?:\uD83C[\uDFFC-\uDFFF])|[\u2695\u2696\u2708]\uFE0F|\uD83C[\uDF3E\uDF73\uDF7C\uDF93\uDFA4\uDFA8\uDFEB\uDFED]|\uD83D[\uDCBB\uDCBC\uDD27\uDD2C\uDE80\uDE92]|\uD83E[\uDDAF-\uDDB3\uDDBC\uDDBD]))?|(?:\uD83C[\uDFFC-\uDFFF])\u200D\u2764\uFE0F\u200D(?:\uD83D\uDC8B\u200D\uD83D\uDC68(?:\uD83C[\uDFFB-\uDFFF])|\uD83D\uDC68(?:\uD83C[\uDFFB-\uDFFF]))|\u200D(?:\u2764\uFE0F\u200D(?:\uD83D\uDC8B\u200D)?\uD83D\uDC68|(?:\uD83D[\uDC68\uDC69])\u200D(?:\uD83D\uDC66\u200D\uD83D\uDC66|\uD83D\uDC67\u200D(?:\uD83D[\uDC66\uDC67]))|\uD83D\uDC66\u200D\uD83D\uDC66|\uD83D\uDC67\u200D(?:\uD83D[\uDC66\uDC67])|\uD83C[\uDF3E\uDF73\uDF7C\uDF93\uDFA4\uDFA8\uDFEB\uDFED]|\uD83D[\uDCBB\uDCBC\uDD27\uDD2C\uDE80\uDE92]|\uD83E[\uDDAF-\uDDB3\uDDBC\uDDBD])|\uD83C\uDFFF\u200D(?:\uD83E\uDD1D\u200D\uD83D\uDC68(?:\uD83C[\uDFFB-\uDFFE])|\uD83C[\uDF3E\uDF73\uDF7C\uDF93\uDFA4\uDFA8\uDFEB\uDFED]|\uD83D[\uDCBB\uDCBC\uDD27\uDD2C\uDE80\uDE92]|\uD83E[\uDDAF-\uDDB3\uDDBC\uDDBD])|\uD83C\uDFFE\u200D(?:\uD83E\uDD1D\u200D\uD83D\uDC68(?:\uD83C[\uDFFB-\uDFFD\uDFFF])|\uD83C[\uDF3E\uDF73\uDF7C\uDF93\uDFA4\uDFA8\uDFEB\uDFED]|\uD83D[\uDCBB\uDCBC\uDD27\uDD2C\uDE80\uDE92]|\uD83E[\uDDAF-\uDDB3\uDDBC\uDDBD])|\uD83C\uDFFD\u200D(?:\uD83E\uDD1D\u200D\uD83D\uDC68(?:\uD83C[\uDFFB\uDFFC\uDFFE\uDFFF])|\uD83C[\uDF3E\uDF73\uDF7C\uDF93\uDFA4\uDFA8\uDFEB\uDFED]|\uD83D[\uDCBB\uDCBC\uDD27\uDD2C\uDE80\uDE92]|\uD83E[\uDDAF-\uDDB3\uDDBC\uDDBD])|\uD83C\uDFFC\u200D(?:\uD83E\uDD1D\u200D\uD83D\uDC68(?:\uD83C[\uDFFB\uDFFD-\uDFFF])|\uD83C[\uDF3E\uDF73\uDF7C\uDF93\uDFA4\uDFA8\uDFEB\uDFED]|\uD83D[\uDCBB\uDCBC\uDD27\uDD2C\uDE80\uDE92]|\uD83E[\uDDAF-\uDDB3\uDDBC\uDDBD])|(?:\uD83C\uDFFF\u200D[\u2695\u2696\u2708]|\uD83C\uDFFE\u200D[\u2695\u2696\u2708]|\uD83C\uDFFD\u200D[\u2695\u2696\u2708]|\uD83C\uDFFC\u200D[\u2695\u2696\u2708]|\u200D[\u2695\u2696\u2708])\uFE0F|\u200D(?:(?:\uD83D[\uDC68\uDC69])\u200D(?:\uD83D[\uDC66\uDC67])|\uD83D[\uDC66\uDC67])|\uD83C\uDFFF|\uD83C\uDFFE|\uD83C\uDFFD|\uD83C\uDFFC)?|(?:\uD83D\uDC69(?:\uD83C\uDFFB\u200D\u2764\uFE0F\u200D(?:\uD83D\uDC8B\u200D(?:\uD83D[\uDC68\uDC69])|\uD83D[\uDC68\uDC69])|(?:\uD83C[\uDFFC-\uDFFF])\u200D\u2764\uFE0F\u200D(?:\uD83D\uDC8B\u200D(?:\uD83D[\uDC68\uDC69])|\uD83D[\uDC68\uDC69]))|\uD83E\uDDD1(?:\uD83C[\uDFFB-\uDFFF])\u200D\uD83E\uDD1D\u200D\uD83E\uDDD1)(?:\uD83C[\uDFFB-\uDFFF])|\uD83D\uDC69\u200D\uD83D\uDC69\u200D(?:\uD83D\uDC66\u200D\uD83D\uDC66|\uD83D\uDC67\u200D(?:\uD83D[\uDC66\uDC67]))|\uD83D\uDC69(?:\u200D(?:\u2764\uFE0F\u200D(?:\uD83D\uDC8B\u200D(?:\uD83D[\uDC68\uDC69])|\uD83D[\uDC68\uDC69])|\uD83C[\uDF3E\uDF73\uDF7C\uDF93\uDFA4\uDFA8\uDFEB\uDFED]|\uD83D[\uDCBB\uDCBC\uDD27\uDD2C\uDE80\uDE92]|\uD83E[\uDDAF-\uDDB3\uDDBC\uDDBD])|\uD83C\uDFFF\u200D(?:\uD83C[\uDF3E\uDF73\uDF7C\uDF93\uDFA4\uDFA8\uDFEB\uDFED]|\uD83D[\uDCBB\uDCBC\uDD27\uDD2C\uDE80\uDE92]|\uD83E[\uDDAF-\uDDB3\uDDBC\uDDBD])|\uD83C\uDFFE\u200D(?:\uD83C[\uDF3E\uDF73\uDF7C\uDF93\uDFA4\uDFA8\uDFEB\uDFED]|\uD83D[\uDCBB\uDCBC\uDD27\uDD2C\uDE80\uDE92]|\uD83E[\uDDAF-\uDDB3\uDDBC\uDDBD])|\uD83C\uDFFD\u200D(?:\uD83C[\uDF3E\uDF73\uDF7C\uDF93\uDFA4\uDFA8\uDFEB\uDFED]|\uD83D[\uDCBB\uDCBC\uDD27\uDD2C\uDE80\uDE92]|\uD83E[\uDDAF-\uDDB3\uDDBC\uDDBD])|\uD83C\uDFFC\u200D(?:\uD83C[\uDF3E\uDF73\uDF7C\uDF93\uDFA4\uDFA8\uDFEB\uDFED]|\uD83D[\uDCBB\uDCBC\uDD27\uDD2C\uDE80\uDE92]|\uD83E[\uDDAF-\uDDB3\uDDBC\uDDBD])|\uD83C\uDFFB\u200D(?:\uD83C[\uDF3E\uDF73\uDF7C\uDF93\uDFA4\uDFA8\uDFEB\uDFED]|\uD83D[\uDCBB\uDCBC\uDD27\uDD2C\uDE80\uDE92]|\uD83E[\uDDAF-\uDDB3\uDDBC\uDDBD]))|\uD83E\uDDD1(?:\u200D(?:\uD83E\uDD1D\u200D\uD83E\uDDD1|\uD83C[\uDF3E\uDF73\uDF7C\uDF84\uDF93\uDFA4\uDFA8\uDFEB\uDFED]|\uD83D[\uDCBB\uDCBC\uDD27\uDD2C\uDE80\uDE92]|\uD83E[\uDDAF-\uDDB3\uDDBC\uDDBD])|\uD83C\uDFFF\u200D(?:\uD83C[\uDF3E\uDF73\uDF7C\uDF84\uDF93\uDFA4\uDFA8\uDFEB\uDFED]|\uD83D[\uDCBB\uDCBC\uDD27\uDD2C\uDE80\uDE92]|\uD83E[\uDDAF-\uDDB3\uDDBC\uDDBD])|\uD83C\uDFFE\u200D(?:\uD83C[\uDF3E\uDF73\uDF7C\uDF84\uDF93\uDFA4\uDFA8\uDFEB\uDFED]|\uD83D[\uDCBB\uDCBC\uDD27\uDD2C\uDE80\uDE92]|\uD83E[\uDDAF-\uDDB3\uDDBC\uDDBD])|\uD83C\uDFFD\u200D(?:\uD83C[\uDF3E\uDF73\uDF7C\uDF84\uDF93\uDFA4\uDFA8\uDFEB\uDFED]|\uD83D[\uDCBB\uDCBC\uDD27\uDD2C\uDE80\uDE92]|\uD83E[\uDDAF-\uDDB3\uDDBC\uDDBD])|\uD83C\uDFFC\u200D(?:\uD83C[\uDF3E\uDF73\uDF7C\uDF84\uDF93\uDFA4\uDFA8\uDFEB\uDFED]|\uD83D[\uDCBB\uDCBC\uDD27\uDD2C\uDE80\uDE92]|\uD83E[\uDDAF-\uDDB3\uDDBC\uDDBD])|\uD83C\uDFFB\u200D(?:\uD83C[\uDF3E\uDF73\uDF7C\uDF84\uDF93\uDFA4\uDFA8\uDFEB\uDFED]|\uD83D[\uDCBB\uDCBC\uDD27\uDD2C\uDE80\uDE92]|\uD83E[\uDDAF-\uDDB3\uDDBC\uDDBD]))|\uD83D\uDC69\u200D\uD83D\uDC66\u200D\uD83D\uDC66|\uD83D\uDC69\u200D\uD83D\uDC69\u200D(?:\uD83D[\uDC66\uDC67])|\uD83D\uDC69\u200D\uD83D\uDC67\u200D(?:\uD83D[\uDC66\uDC67])|(?:\uD83D\uDC41\uFE0F\u200D\uD83D\uDDE8|\uD83E\uDDD1(?:\uD83C\uDFFF\u200D[\u2695\u2696\u2708]|\uD83C\uDFFE\u200D[\u2695\u2696\u2708]|\uD83C\uDFFD\u200D[\u2695\u2696\u2708]|\uD83C\uDFFC\u200D[\u2695\u2696\u2708]|\uD83C\uDFFB\u200D[\u2695\u2696\u2708]|\u200D[\u2695\u2696\u2708])|\uD83D\uDC69(?:\uD83C\uDFFF\u200D[\u2695\u2696\u2708]|\uD83C\uDFFE\u200D[\u2695\u2696\u2708]|\uD83C\uDFFD\u200D[\u2695\u2696\u2708]|\uD83C\uDFFC\u200D[\u2695\u2696\u2708]|\uD83C\uDFFB\u200D[\u2695\u2696\u2708]|\u200D[\u2695\u2696\u2708])|\uD83D\uDE36\u200D\uD83C\uDF2B|\uD83C\uDFF3\uFE0F\u200D\u26A7|\uD83D\uDC3B\u200D\u2744|(?:(?:\uD83C[\uDFC3\uDFC4\uDFCA]|\uD83D[\uDC6E\uDC70\uDC71\uDC73\uDC77\uDC81\uDC82\uDC86\uDC87\uDE45-\uDE47\uDE4B\uDE4D\uDE4E\uDEA3\uDEB4-\uDEB6]|\uD83E[\uDD26\uDD35\uDD37-\uDD39\uDD3D\uDD3E\uDDB8\uDDB9\uDDCD-\uDDCF\uDDD4\uDDD6-\uDDDD])(?:\uD83C[\uDFFB-\uDFFF])|\uD83D\uDC6F|\uD83E[\uDD3C\uDDDE\uDDDF])\u200D[\u2640\u2642]|(?:\u26F9|\uD83C[\uDFCB\uDFCC]|\uD83D\uDD75)(?:\uFE0F|\uD83C[\uDFFB-\uDFFF])\u200D[\u2640\u2642]|\uD83C\uDFF4\u200D\u2620|(?:\uD83C[\uDFC3\uDFC4\uDFCA]|\uD83D[\uDC6E\uDC70\uDC71\uDC73\uDC77\uDC81\uDC82\uDC86\uDC87\uDE45-\uDE47\uDE4B\uDE4D\uDE4E\uDEA3\uDEB4-\uDEB6]|\uD83E[\uDD26\uDD35\uDD37-\uDD39\uDD3D\uDD3E\uDDB8\uDDB9\uDDCD-\uDDCF\uDDD4\uDDD6-\uDDDD])\u200D[\u2640\u2642]|[\xA9\xAE\u203C\u2049\u2122\u2139\u2194-\u2199\u21A9\u21AA\u2328\u23CF\u23ED-\u23EF\u23F1\u23F2\u23F8-\u23FA\u24C2\u25AA\u25AB\u25B6\u25C0\u25FB\u25FC\u2600-\u2604\u260E\u2611\u2618\u2620\u2622\u2623\u2626\u262A\u262E\u262F\u2638-\u263A\u2640\u2642\u265F\u2660\u2663\u2665\u2666\u2668\u267B\u267E\u2692\u2694-\u2697\u2699\u269B\u269C\u26A0\u26A7\u26B0\u26B1\u26C8\u26CF\u26D1\u26D3\u26E9\u26F0\u26F1\u26F4\u26F7\u26F8\u2702\u2708\u2709\u270F\u2712\u2714\u2716\u271D\u2721\u2733\u2734\u2744\u2747\u2763\u27A1\u2934\u2935\u2B05-\u2B07\u3030\u303D\u3297\u3299]|\uD83C[\uDD70\uDD71\uDD7E\uDD7F\uDE02\uDE37\uDF21\uDF24-\uDF2C\uDF36\uDF7D\uDF96\uDF97\uDF99-\uDF9B\uDF9E\uDF9F\uDFCD\uDFCE\uDFD4-\uDFDF\uDFF5\uDFF7]|\uD83D[\uDC3F\uDCFD\uDD49\uDD4A\uDD6F\uDD70\uDD73\uDD76-\uDD79\uDD87\uDD8A-\uDD8D\uDDA5\uDDA8\uDDB1\uDDB2\uDDBC\uDDC2-\uDDC4\uDDD1-\uDDD3\uDDDC-\uDDDE\uDDE1\uDDE3\uDDE8\uDDEF\uDDF3\uDDFA\uDECB\uDECD-\uDECF\uDEE0-\uDEE5\uDEE9\uDEF0\uDEF3])\uFE0F|\uD83C\uDFF3\uFE0F\u200D\uD83C\uDF08|\uD83D\uDC69\u200D\uD83D\uDC67|\uD83D\uDC69\u200D\uD83D\uDC66|\uD83D\uDE35\u200D\uD83D\uDCAB|\uD83D\uDE2E\u200D\uD83D\uDCA8|\uD83D\uDC15\u200D\uD83E\uDDBA|\uD83E\uDDD1(?:\uD83C\uDFFF|\uD83C\uDFFE|\uD83C\uDFFD|\uD83C\uDFFC|\uD83C\uDFFB)?|\uD83D\uDC69(?:\uD83C\uDFFF|\uD83C\uDFFE|\uD83C\uDFFD|\uD83C\uDFFC|\uD83C\uDFFB)?|\uD83C\uDDFD\uD83C\uDDF0|\uD83C\uDDF6\uD83C\uDDE6|\uD83C\uDDF4\uD83C\uDDF2|\uD83D\uDC08\u200D\u2B1B|\u2764\uFE0F\u200D(?:\uD83D\uDD25|\uD83E\uDE79)|\uD83D\uDC41\uFE0F|\uD83C\uDFF3\uFE0F|\uD83C\uDDFF(?:\uD83C[\uDDE6\uDDF2\uDDFC])|\uD83C\uDDFE(?:\uD83C[\uDDEA\uDDF9])|\uD83C\uDDFC(?:\uD83C[\uDDEB\uDDF8])|\uD83C\uDDFB(?:\uD83C[\uDDE6\uDDE8\uDDEA\uDDEC\uDDEE\uDDF3\uDDFA])|\uD83C\uDDFA(?:\uD83C[\uDDE6\uDDEC\uDDF2\uDDF3\uDDF8\uDDFE\uDDFF])|\uD83C\uDDF9(?:\uD83C[\uDDE6\uDDE8\uDDE9\uDDEB-\uDDED\uDDEF-\uDDF4\uDDF7\uDDF9\uDDFB\uDDFC\uDDFF])|\uD83C\uDDF8(?:\uD83C[\uDDE6-\uDDEA\uDDEC-\uDDF4\uDDF7-\uDDF9\uDDFB\uDDFD-\uDDFF])|\uD83C\uDDF7(?:\uD83C[\uDDEA\uDDF4\uDDF8\uDDFA\uDDFC])|\uD83C\uDDF5(?:\uD83C[\uDDE6\uDDEA-\uDDED\uDDF0-\uDDF3\uDDF7-\uDDF9\uDDFC\uDDFE])|\uD83C\uDDF3(?:\uD83C[\uDDE6\uDDE8\uDDEA-\uDDEC\uDDEE\uDDF1\uDDF4\uDDF5\uDDF7\uDDFA\uDDFF])|\uD83C\uDDF2(?:\uD83C[\uDDE6\uDDE8-\uDDED\uDDF0-\uDDFF])|\uD83C\uDDF1(?:\uD83C[\uDDE6-\uDDE8\uDDEE\uDDF0\uDDF7-\uDDFB\uDDFE])|\uD83C\uDDF0(?:\uD83C[\uDDEA\uDDEC-\uDDEE\uDDF2\uDDF3\uDDF5\uDDF7\uDDFC\uDDFE\uDDFF])|\uD83C\uDDEF(?:\uD83C[\uDDEA\uDDF2\uDDF4\uDDF5])|\uD83C\uDDEE(?:\uD83C[\uDDE8-\uDDEA\uDDF1-\uDDF4\uDDF6-\uDDF9])|\uD83C\uDDED(?:\uD83C[\uDDF0\uDDF2\uDDF3\uDDF7\uDDF9\uDDFA])|\uD83C\uDDEC(?:\uD83C[\uDDE6\uDDE7\uDDE9-\uDDEE\uDDF1-\uDDF3\uDDF5-\uDDFA\uDDFC\uDDFE])|\uD83C\uDDEB(?:\uD83C[\uDDEE-\uDDF0\uDDF2\uDDF4\uDDF7])|\uD83C\uDDEA(?:\uD83C[\uDDE6\uDDE8\uDDEA\uDDEC\uDDED\uDDF7-\uDDFA])|\uD83C\uDDE9(?:\uD83C[\uDDEA\uDDEC\uDDEF\uDDF0\uDDF2\uDDF4\uDDFF])|\uD83C\uDDE8(?:\uD83C[\uDDE6\uDDE8\uDDE9\uDDEB-\uDDEE\uDDF0-\uDDF5\uDDF7\uDDFA-\uDDFF])|\uD83C\uDDE7(?:\uD83C[\uDDE6\uDDE7\uDDE9-\uDDEF\uDDF1-\uDDF4\uDDF6-\uDDF9\uDDFB\uDDFC\uDDFE\uDDFF])|\uD83C\uDDE6(?:\uD83C[\uDDE8-\uDDEC\uDDEE\uDDF1\uDDF2\uDDF4\uDDF6-\uDDFA\uDDFC\uDDFD\uDDFF])|[#\*0-9]\uFE0F\u20E3|\u2764\uFE0F|(?:\uD83C[\uDFC3\uDFC4\uDFCA]|\uD83D[\uDC6E\uDC70\uDC71\uDC73\uDC77\uDC81\uDC82\uDC86\uDC87\uDE45-\uDE47\uDE4B\uDE4D\uDE4E\uDEA3\uDEB4-\uDEB6]|\uD83E[\uDD26\uDD35\uDD37-\uDD39\uDD3D\uDD3E\uDDB8\uDDB9\uDDCD-\uDDCF\uDDD4\uDDD6-\uDDDD])(?:\uD83C[\uDFFB-\uDFFF])|(?:\u26F9|\uD83C[\uDFCB\uDFCC]|\uD83D\uDD75)(?:\uFE0F|\uD83C[\uDFFB-\uDFFF])|\uD83C\uDFF4|(?:[\u270A\u270B]|\uD83C[\uDF85\uDFC2\uDFC7]|\uD83D[\uDC42\uDC43\uDC46-\uDC50\uDC66\uDC67\uDC6B-\uDC6D\uDC72\uDC74-\uDC76\uDC78\uDC7C\uDC83\uDC85\uDC8F\uDC91\uDCAA\uDD7A\uDD95\uDD96\uDE4C\uDE4F\uDEC0\uDECC]|\uD83E[\uDD0C\uDD0F\uDD18-\uDD1C\uDD1E\uDD1F\uDD30-\uDD34\uDD36\uDD77\uDDB5\uDDB6\uDDBB\uDDD2\uDDD3\uDDD5])(?:\uD83C[\uDFFB-\uDFFF])|(?:[\u261D\u270C\u270D]|\uD83D[\uDD74\uDD90])(?:\uFE0F|\uD83C[\uDFFB-\uDFFF])|[\u270A\u270B]|\uD83C[\uDF85\uDFC2\uDFC7]|\uD83D[\uDC08\uDC15\uDC3B\uDC42\uDC43\uDC46-\uDC50\uDC66\uDC67\uDC6B-\uDC6D\uDC72\uDC74-\uDC76\uDC78\uDC7C\uDC83\uDC85\uDC8F\uDC91\uDCAA\uDD7A\uDD95\uDD96\uDE2E\uDE35\uDE36\uDE4C\uDE4F\uDEC0\uDECC]|\uD83E[\uDD0C\uDD0F\uDD18-\uDD1C\uDD1E\uDD1F\uDD30-\uDD34\uDD36\uDD77\uDDB5\uDDB6\uDDBB\uDDD2\uDDD3\uDDD5]|\uD83C[\uDFC3\uDFC4\uDFCA]|\uD83D[\uDC6E\uDC70\uDC71\uDC73\uDC77\uDC81\uDC82\uDC86\uDC87\uDE45-\uDE47\uDE4B\uDE4D\uDE4E\uDEA3\uDEB4-\uDEB6]|\uD83E[\uDD26\uDD35\uDD37-\uDD39\uDD3D\uDD3E\uDDB8\uDDB9\uDDCD-\uDDCF\uDDD4\uDDD6-\uDDDD]|\uD83D\uDC6F|\uD83E[\uDD3C\uDDDE\uDDDF]|[\u231A\u231B\u23E9-\u23EC\u23F0\u23F3\u25FD\u25FE\u2614\u2615\u2648-\u2653\u267F\u2693\u26A1\u26AA\u26AB\u26BD\u26BE\u26C4\u26C5\u26CE\u26D4\u26EA\u26F2\u26F3\u26F5\u26FA\u26FD\u2705\u2728\u274C\u274E\u2753-\u2755\u2757\u2795-\u2797\u27B0\u27BF\u2B1B\u2B1C\u2B50\u2B55]|\uD83C[\uDC04\uDCCF\uDD8E\uDD91-\uDD9A\uDE01\uDE1A\uDE2F\uDE32-\uDE36\uDE38-\uDE3A\uDE50\uDE51\uDF00-\uDF20\uDF2D-\uDF35\uDF37-\uDF7C\uDF7E-\uDF84\uDF86-\uDF93\uDFA0-\uDFC1\uDFC5\uDFC6\uDFC8\uDFC9\uDFCF-\uDFD3\uDFE0-\uDFF0\uDFF8-\uDFFF]|\uD83D[\uDC00-\uDC07\uDC09-\uDC14\uDC16-\uDC3A\uDC3C-\uDC3E\uDC40\uDC44\uDC45\uDC51-\uDC65\uDC6A\uDC79-\uDC7B\uDC7D-\uDC80\uDC84\uDC88-\uDC8E\uDC90\uDC92-\uDCA9\uDCAB-\uDCFC\uDCFF-\uDD3D\uDD4B-\uDD4E\uDD50-\uDD67\uDDA4\uDDFB-\uDE2D\uDE2F-\uDE34\uDE37-\uDE44\uDE48-\uDE4A\uDE80-\uDEA2\uDEA4-\uDEB3\uDEB7-\uDEBF\uDEC1-\uDEC5\uDED0-\uDED2\uDED5-\uDED7\uDEEB\uDEEC\uDEF4-\uDEFC\uDFE0-\uDFEB]|\uD83E[\uDD0D\uDD0E\uDD10-\uDD17\uDD1D\uDD20-\uDD25\uDD27-\uDD2F\uDD3A\uDD3F-\uDD45\uDD47-\uDD76\uDD78\uDD7A-\uDDB4\uDDB7\uDDBA\uDDBC-\uDDCB\uDDD0\uDDE0-\uDDFF\uDE70-\uDE74\uDE78-\uDE7A\uDE80-\uDE86\uDE90-\uDEA8\uDEB0-\uDEB6\uDEC0-\uDEC2\uDED0-\uDED6]|(?:[\u231A\u231B\u23E9-\u23EC\u23F0\u23F3\u25FD\u25FE\u2614\u2615\u2648-\u2653\u267F\u2693\u26A1\u26AA\u26AB\u26BD\u26BE\u26C4\u26C5\u26CE\u26D4\u26EA\u26F2\u26F3\u26F5\u26FA\u26FD\u2705\u270A\u270B\u2728\u274C\u274E\u2753-\u2755\u2757\u2795-\u2797\u27B0\u27BF\u2B1B\u2B1C\u2B50\u2B55]|\uD83C[\uDC04\uDCCF\uDD8E\uDD91-\uDD9A\uDDE6-\uDDFF\uDE01\uDE1A\uDE2F\uDE32-\uDE36\uDE38-\uDE3A\uDE50\uDE51\uDF00-\uDF20\uDF2D-\uDF35\uDF37-\uDF7C\uDF7E-\uDF93\uDFA0-\uDFCA\uDFCF-\uDFD3\uDFE0-\uDFF0\uDFF4\uDFF8-\uDFFF]|\uD83D[\uDC00-\uDC3E\uDC40\uDC42-\uDCFC\uDCFF-\uDD3D\uDD4B-\uDD4E\uDD50-\uDD67\uDD7A\uDD95\uDD96\uDDA4\uDDFB-\uDE4F\uDE80-\uDEC5\uDECC\uDED0-\uDED2\uDED5-\uDED7\uDEEB\uDEEC\uDEF4-\uDEFC\uDFE0-\uDFEB]|\uD83E[\uDD0C-\uDD3A\uDD3C-\uDD45\uDD47-\uDD78\uDD7A-\uDDCB\uDDCD-\uDDFF\uDE70-\uDE74\uDE78-\uDE7A\uDE80-\uDE86\uDE90-\uDEA8\uDEB0-\uDEB6\uDEC0-\uDEC2\uDED0-\uDED6])|(?:[#\*0-9\xA9\xAE\u203C\u2049\u2122\u2139\u2194-\u2199\u21A9\u21AA\u231A\u231B\u2328\u23CF\u23E9-\u23F3\u23F8-\u23FA\u24C2\u25AA\u25AB\u25B6\u25C0\u25FB-\u25FE\u2600-\u2604\u260E\u2611\u2614\u2615\u2618\u261D\u2620\u2622\u2623\u2626\u262A\u262E\u262F\u2638-\u263A\u2640\u2642\u2648-\u2653\u265F\u2660\u2663\u2665\u2666\u2668\u267B\u267E\u267F\u2692-\u2697\u2699\u269B\u269C\u26A0\u26A1\u26A7\u26AA\u26AB\u26B0\u26B1\u26BD\u26BE\u26C4\u26C5\u26C8\u26CE\u26CF\u26D1\u26D3\u26D4\u26E9\u26EA\u26F0-\u26F5\u26F7-\u26FA\u26FD\u2702\u2705\u2708-\u270D\u270F\u2712\u2714\u2716\u271D\u2721\u2728\u2733\u2734\u2744\u2747\u274C\u274E\u2753-\u2755\u2757\u2763\u2764\u2795-\u2797\u27A1\u27B0\u27BF\u2934\u2935\u2B05-\u2B07\u2B1B\u2B1C\u2B50\u2B55\u3030\u303D\u3297\u3299]|\uD83C[\uDC04\uDCCF\uDD70\uDD71\uDD7E\uDD7F\uDD8E\uDD91-\uDD9A\uDDE6-\uDDFF\uDE01\uDE02\uDE1A\uDE2F\uDE32-\uDE3A\uDE50\uDE51\uDF00-\uDF21\uDF24-\uDF93\uDF96\uDF97\uDF99-\uDF9B\uDF9E-\uDFF0\uDFF3-\uDFF5\uDFF7-\uDFFF]|\uD83D[\uDC00-\uDCFD\uDCFF-\uDD3D\uDD49-\uDD4E\uDD50-\uDD67\uDD6F\uDD70\uDD73-\uDD7A\uDD87\uDD8A-\uDD8D\uDD90\uDD95\uDD96\uDDA4\uDDA5\uDDA8\uDDB1\uDDB2\uDDBC\uDDC2-\uDDC4\uDDD1-\uDDD3\uDDDC-\uDDDE\uDDE1\uDDE3\uDDE8\uDDEF\uDDF3\uDDFA-\uDE4F\uDE80-\uDEC5\uDECB-\uDED2\uDED5-\uDED7\uDEE0-\uDEE5\uDEE9\uDEEB\uDEEC\uDEF0\uDEF3-\uDEFC\uDFE0-\uDFEB]|\uD83E[\uDD0C-\uDD3A\uDD3C-\uDD45\uDD47-\uDD78\uDD7A-\uDDCB\uDDCD-\uDDFF\uDE70-\uDE74\uDE78-\uDE7A\uDE80-\uDE86\uDE90-\uDEA8\uDEB0-\uDEB6\uDEC0-\uDEC2\uDED0-\uDED6])\uFE0F|(?:[\u261D\u26F9\u270A-\u270D]|\uD83C[\uDF85\uDFC2-\uDFC4\uDFC7\uDFCA-\uDFCC]|\uD83D[\uDC42\uDC43\uDC46-\uDC50\uDC66-\uDC78\uDC7C\uDC81-\uDC83\uDC85-\uDC87\uDC8F\uDC91\uDCAA\uDD74\uDD75\uDD7A\uDD90\uDD95\uDD96\uDE45-\uDE47\uDE4B-\uDE4F\uDEA3\uDEB4-\uDEB6\uDEC0\uDECC]|\uD83E[\uDD0C\uDD0F\uDD18-\uDD1F\uDD26\uDD30-\uDD39\uDD3C-\uDD3E\uDD77\uDDB5\uDDB6\uDDB8\uDDB9\uDDBB\uDDCD-\uDDCF\uDDD1-\uDDDD])/g;
    };
    uD = T(DD);
    d = 10;
    M = (e2 = 0) => (u) => `\x1B[${u + e2}m`;
    P = (e2 = 0) => (u) => `\x1B[${38 + e2};5;${u}m`;
    W = (e2 = 0) => (u, F, t) => `\x1B[${38 + e2};2;${u};${F};${t}m`;
    r = { modifier: { reset: [0, 0], bold: [1, 22], dim: [2, 22], italic: [3, 23], underline: [4, 24], overline: [53, 55], inverse: [7, 27], hidden: [8, 28], strikethrough: [9, 29] }, color: { black: [30, 39], red: [31, 39], green: [32, 39], yellow: [33, 39], blue: [34, 39], magenta: [35, 39], cyan: [36, 39], white: [37, 39], blackBright: [90, 39], gray: [90, 39], grey: [90, 39], redBright: [91, 39], greenBright: [92, 39], yellowBright: [93, 39], blueBright: [94, 39], magentaBright: [95, 39], cyanBright: [96, 39], whiteBright: [97, 39] }, bgColor: { bgBlack: [40, 49], bgRed: [41, 49], bgGreen: [42, 49], bgYellow: [43, 49], bgBlue: [44, 49], bgMagenta: [45, 49], bgCyan: [46, 49], bgWhite: [47, 49], bgBlackBright: [100, 49], bgGray: [100, 49], bgGrey: [100, 49], bgRedBright: [101, 49], bgGreenBright: [102, 49], bgYellowBright: [103, 49], bgBlueBright: [104, 49], bgMagentaBright: [105, 49], bgCyanBright: [106, 49], bgWhiteBright: [107, 49] } };
    Object.keys(r.modifier);
    FD = Object.keys(r.color);
    eD = Object.keys(r.bgColor);
    [...FD, ...eD];
    sD = tD();
    g = /* @__PURE__ */ new Set(["\x1B", "\x9B"]);
    CD = 39;
    b = "\x07";
    O = "[";
    iD = "]";
    I = "m";
    w = `${iD}8;;`;
    N = (e2) => `${g.values().next().value}${O}${e2}${I}`;
    L = (e2) => `${g.values().next().value}${w}${e2}${b}`;
    rD = (e2) => e2.split(" ").map((u) => A(u));
    y = (e2, u, F) => {
      const t = [...u];
      let s2 = false, C2 = false, D = A(S(e2[e2.length - 1]));
      for (const [i, n] of t.entries()) {
        const E2 = A(n);
        if (D + E2 <= F ? e2[e2.length - 1] += n : (e2.push(n), D = 0), g.has(n) && (s2 = true, C2 = t.slice(i + 1).join("").startsWith(w)), s2) {
          C2 ? n === b && (s2 = false, C2 = false) : n === I && (s2 = false);
          continue;
        }
        D += E2, D === F && i < t.length - 1 && (e2.push(""), D = 0);
      }
      !D && e2[e2.length - 1].length > 0 && e2.length > 1 && (e2[e2.length - 2] += e2.pop());
    };
    ED = (e2) => {
      const u = e2.split(" ");
      let F = u.length;
      for (; F > 0 && !(A(u[F - 1]) > 0); ) F--;
      return F === u.length ? e2 : u.slice(0, F).join(" ") + u.slice(F).join("");
    };
    oD = (e2, u, F = {}) => {
      if (F.trim !== false && e2.trim() === "") return "";
      let t = "", s2, C2;
      const D = rD(e2);
      let i = [""];
      for (const [E2, h2] of e2.split(" ").entries()) {
        F.trim !== false && (i[i.length - 1] = i[i.length - 1].trimStart());
        let o2 = A(i[i.length - 1]);
        if (E2 !== 0 && (o2 >= u && (F.wordWrap === false || F.trim === false) && (i.push(""), o2 = 0), (o2 > 0 || F.trim === false) && (i[i.length - 1] += " ", o2++)), F.hard && D[E2] > u) {
          const B2 = u - o2, p = 1 + Math.floor((D[E2] - B2 - 1) / u);
          Math.floor((D[E2] - 1) / u) < p && i.push(""), y(i, h2, u);
          continue;
        }
        if (o2 + D[E2] > u && o2 > 0 && D[E2] > 0) {
          if (F.wordWrap === false && o2 < u) {
            y(i, h2, u);
            continue;
          }
          i.push("");
        }
        if (o2 + D[E2] > u && F.wordWrap === false) {
          y(i, h2, u);
          continue;
        }
        i[i.length - 1] += h2;
      }
      F.trim !== false && (i = i.map((E2) => ED(E2)));
      const n = [...i.join(`
`)];
      for (const [E2, h2] of n.entries()) {
        if (t += h2, g.has(h2)) {
          const { groups: B2 } = new RegExp(`(?:\\${O}(?<code>\\d+)m|\\${w}(?<uri>.*)${b})`).exec(n.slice(E2).join("")) || { groups: {} };
          if (B2.code !== void 0) {
            const p = Number.parseFloat(B2.code);
            s2 = p === CD ? void 0 : p;
          } else B2.uri !== void 0 && (C2 = B2.uri.length === 0 ? void 0 : B2.uri);
        }
        const o2 = sD.codes.get(Number(s2));
        n[E2 + 1] === `
` ? (C2 && (t += L("")), s2 && o2 && (t += N(o2))) : h2 === `
` && (s2 && o2 && (t += N(s2)), C2 && (t += L(C2)));
      }
      return t;
    };
    nD = Object.defineProperty;
    aD = (e2, u, F) => u in e2 ? nD(e2, u, { enumerable: true, configurable: true, writable: true, value: F }) : e2[u] = F;
    a = (e2, u, F) => (aD(e2, typeof u != "symbol" ? u + "" : u, F), F);
    V = Symbol("clack:cancel");
    z = /* @__PURE__ */ new Map([["k", "up"], ["j", "down"], ["h", "left"], ["l", "right"]]);
    xD = /* @__PURE__ */ new Set(["up", "down", "left", "right", "space", "enter"]);
    x = class {
      constructor({ render: u, input: F = import_node_process.stdin, output: t = import_node_process.stdout, ...s2 }, C2 = true) {
        a(this, "input"), a(this, "output"), a(this, "rl"), a(this, "opts"), a(this, "_track", false), a(this, "_render"), a(this, "_cursor", 0), a(this, "state", "initial"), a(this, "value"), a(this, "error", ""), a(this, "subscribers", /* @__PURE__ */ new Map()), a(this, "_prevFrame", ""), this.opts = s2, this.onKeypress = this.onKeypress.bind(this), this.close = this.close.bind(this), this.render = this.render.bind(this), this._render = u.bind(this), this._track = C2, this.input = F, this.output = t;
      }
      prompt() {
        const u = new import_node_tty.WriteStream(0);
        return u._write = (F, t, s2) => {
          this._track && (this.value = this.rl.line.replace(/\t/g, ""), this._cursor = this.rl.cursor, this.emit("value", this.value)), s2();
        }, this.input.pipe(u), this.rl = import_node_readline.default.createInterface({ input: this.input, output: u, tabSize: 2, prompt: "", escapeCodeTimeout: 50 }), import_node_readline.default.emitKeypressEvents(this.input, this.rl), this.rl.prompt(), this.opts.initialValue !== void 0 && this._track && this.rl.write(this.opts.initialValue), this.input.on("keypress", this.onKeypress), v(this.input, true), this.output.on("resize", this.render), this.render(), new Promise((F, t) => {
          this.once("submit", () => {
            this.output.write(import_sisteransi.cursor.show), this.output.off("resize", this.render), v(this.input, false), F(this.value);
          }), this.once("cancel", () => {
            this.output.write(import_sisteransi.cursor.show), this.output.off("resize", this.render), v(this.input, false), F(V);
          });
        });
      }
      on(u, F) {
        const t = this.subscribers.get(u) ?? [];
        t.push({ cb: F }), this.subscribers.set(u, t);
      }
      once(u, F) {
        const t = this.subscribers.get(u) ?? [];
        t.push({ cb: F, once: true }), this.subscribers.set(u, t);
      }
      emit(u, ...F) {
        const t = this.subscribers.get(u) ?? [], s2 = [];
        for (const C2 of t) C2.cb(...F), C2.once && s2.push(() => t.splice(t.indexOf(C2), 1));
        for (const C2 of s2) C2();
      }
      unsubscribe() {
        this.subscribers.clear();
      }
      onKeypress(u, F) {
        if (this.state === "error" && (this.state = "active"), (F == null ? void 0 : F.name) && !this._track && z.has(F.name) && this.emit("cursor", z.get(F.name)), (F == null ? void 0 : F.name) && xD.has(F.name) && this.emit("cursor", F.name), u && (u.toLowerCase() === "y" || u.toLowerCase() === "n") && this.emit("confirm", u.toLowerCase() === "y"), u === "	" && this.opts.placeholder && (this.value || (this.rl.write(this.opts.placeholder), this.emit("value", this.opts.placeholder))), u && this.emit("key", u.toLowerCase()), (F == null ? void 0 : F.name) === "return") {
          if (this.opts.validate) {
            const t = this.opts.validate(this.value);
            t && (this.error = t, this.state = "error", this.rl.write(this.value));
          }
          this.state !== "error" && (this.state = "submit");
        }
        u === "" && (this.state = "cancel"), (this.state === "submit" || this.state === "cancel") && this.emit("finalize"), this.render(), (this.state === "submit" || this.state === "cancel") && this.close();
      }
      close() {
        this.input.unpipe(), this.input.removeListener("keypress", this.onKeypress), this.output.write(`
`), v(this.input, false), this.rl.close(), this.emit(`${this.state}`, this.value), this.unsubscribe();
      }
      restoreCursor() {
        const u = R(this._prevFrame, process.stdout.columns, { hard: true }).split(`
`).length - 1;
        this.output.write(import_sisteransi.cursor.move(-999, u * -1));
      }
      render() {
        const u = R(this._render(this) ?? "", process.stdout.columns, { hard: true });
        if (u !== this._prevFrame) {
          if (this.state === "initial") this.output.write(import_sisteransi.cursor.hide);
          else {
            const F = hD(this._prevFrame, u);
            if (this.restoreCursor(), F && (F == null ? void 0 : F.length) === 1) {
              const t = F[0];
              this.output.write(import_sisteransi.cursor.move(0, t)), this.output.write(import_sisteransi.erase.lines(1));
              const s2 = u.split(`
`);
              this.output.write(s2[t]), this._prevFrame = u, this.output.write(import_sisteransi.cursor.move(0, s2.length - t - 1));
              return;
            } else if (F && (F == null ? void 0 : F.length) > 1) {
              const t = F[0];
              this.output.write(import_sisteransi.cursor.move(0, t)), this.output.write(import_sisteransi.erase.down());
              const s2 = u.split(`
`).slice(t);
              this.output.write(s2.join(`
`)), this._prevFrame = u;
              return;
            }
            this.output.write(import_sisteransi.erase.down());
          }
          this.output.write(u), this.state === "initial" && (this.state = "active"), this._prevFrame = u;
        }
      }
    };
    BD = class extends x {
      get cursor() {
        return this.value ? 0 : 1;
      }
      get _value() {
        return this.cursor === 0;
      }
      constructor(u) {
        super(u, false), this.value = !!u.initialValue, this.on("value", () => {
          this.value = this._value;
        }), this.on("confirm", (F) => {
          this.output.write(import_sisteransi.cursor.move(0, -1)), this.value = F, this.state = "submit", this.close();
        }), this.on("cursor", () => {
          this.value = !this.value;
        });
      }
    };
    wD = Object.defineProperty;
    yD = (e2, u, F) => u in e2 ? wD(e2, u, { enumerable: true, configurable: true, writable: true, value: F }) : e2[u] = F;
    Z = (e2, u, F) => (yD(e2, typeof u != "symbol" ? u + "" : u, F), F);
    $D = class extends x {
      constructor(u) {
        super(u, false), Z(this, "options"), Z(this, "cursor", 0), this.options = u.options, this.cursor = this.options.findIndex(({ value: F }) => F === u.initialValue), this.cursor === -1 && (this.cursor = 0), this.changeValue(), this.on("cursor", (F) => {
          switch (F) {
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
    TD = Object.defineProperty;
    jD = (e2, u, F) => u in e2 ? TD(e2, u, { enumerable: true, configurable: true, writable: true, value: F }) : e2[u] = F;
    MD = (e2, u, F) => (jD(e2, typeof u != "symbol" ? u + "" : u, F), F);
    PD = class extends x {
      constructor(u) {
        super(u), MD(this, "valueWithCursor", ""), this.on("finalize", () => {
          this.value || (this.value = u.defaultValue), this.valueWithCursor = this.value;
        }), this.on("value", () => {
          if (this.cursor >= this.value.length) this.valueWithCursor = `${this.value}${import_picocolors.default.inverse(import_picocolors.default.hidden("_"))}`;
          else {
            const F = this.value.slice(0, this.cursor), t = this.value.slice(this.cursor);
            this.valueWithCursor = `${F}${import_picocolors.default.inverse(t[0])}${t.slice(1)}`;
          }
        });
      }
      get cursor() {
        return this._cursor;
      }
    };
    WD = globalThis.process.platform.startsWith("win");
  }
});

// node_modules/.pnpm/@clack+prompts@0.7.0/node_modules/@clack/prompts/dist/index.mjs
function q2() {
  return import_node_process2.default.platform !== "win32" ? import_node_process2.default.env.TERM !== "linux" : Boolean(import_node_process2.default.env.CI) || Boolean(import_node_process2.default.env.WT_SESSION) || Boolean(import_node_process2.default.env.TERMINUS_SUBLIME) || import_node_process2.default.env.ConEmuTask === "{cmd::Cmder}" || import_node_process2.default.env.TERM_PROGRAM === "Terminus-Sublime" || import_node_process2.default.env.TERM_PROGRAM === "vscode" || import_node_process2.default.env.TERM === "xterm-256color" || import_node_process2.default.env.TERM === "alacritty" || import_node_process2.default.env.TERMINAL_EMULATOR === "JetBrains-JediTerm";
}
var import_node_process2, import_picocolors2, import_sisteransi2, _2, o, H, I2, x2, S2, K, a2, d2, b2, E, C, w2, M2, U2, B, Z2, z2, X2, J2, Y, Q2, ee, y2, te, se, ie, oe, $e, f2, de;
var init_dist2 = __esm({
  "node_modules/.pnpm/@clack+prompts@0.7.0/node_modules/@clack/prompts/dist/index.mjs"() {
    init_dist();
    init_dist();
    import_node_process2 = __toESM(require("node:process"), 1);
    import_picocolors2 = __toESM(require_picocolors(), 1);
    import_sisteransi2 = __toESM(require_src(), 1);
    _2 = q2();
    o = (r2, n) => _2 ? r2 : n;
    H = o("\u25C6", "*");
    I2 = o("\u25A0", "x");
    x2 = o("\u25B2", "x");
    S2 = o("\u25C7", "o");
    K = o("\u250C", "T");
    a2 = o("\u2502", "|");
    d2 = o("\u2514", "\u2014");
    b2 = o("\u25CF", ">");
    E = o("\u25CB", " ");
    C = o("\u25FB", "[\u2022]");
    w2 = o("\u25FC", "[+]");
    M2 = o("\u25FB", "[ ]");
    U2 = o("\u25AA", "\u2022");
    B = o("\u2500", "-");
    Z2 = o("\u256E", "+");
    z2 = o("\u251C", "+");
    X2 = o("\u256F", "+");
    J2 = o("\u25CF", "\u2022");
    Y = o("\u25C6", "*");
    Q2 = o("\u25B2", "!");
    ee = o("\u25A0", "x");
    y2 = (r2) => {
      switch (r2) {
        case "initial":
        case "active":
          return import_picocolors2.default.cyan(H);
        case "cancel":
          return import_picocolors2.default.red(I2);
        case "error":
          return import_picocolors2.default.yellow(x2);
        case "submit":
          return import_picocolors2.default.green(S2);
      }
    };
    te = (r2) => new PD({ validate: r2.validate, placeholder: r2.placeholder, defaultValue: r2.defaultValue, initialValue: r2.initialValue, render() {
      var _a;
      const n = `${import_picocolors2.default.gray(a2)}
${y2(this.state)}  ${r2.message}
`, i = r2.placeholder ? import_picocolors2.default.inverse(r2.placeholder[0]) + import_picocolors2.default.dim(r2.placeholder.slice(1)) : import_picocolors2.default.inverse(import_picocolors2.default.hidden("_")), t = this.value ? this.valueWithCursor : i;
      switch (this.state) {
        case "error":
          return `${n.trim()}
${import_picocolors2.default.yellow(a2)}  ${t}
${import_picocolors2.default.yellow(d2)}  ${import_picocolors2.default.yellow(this.error)}
`;
        case "submit":
          return `${n}${import_picocolors2.default.gray(a2)}  ${import_picocolors2.default.dim(this.value || r2.placeholder)}`;
        case "cancel":
          return `${n}${import_picocolors2.default.gray(a2)}  ${import_picocolors2.default.strikethrough(import_picocolors2.default.dim(this.value ?? ""))}${((_a = this.value) == null ? void 0 : _a.trim()) ? `
` + import_picocolors2.default.gray(a2) : ""}`;
        default:
          return `${n}${import_picocolors2.default.cyan(a2)}  ${t}
${import_picocolors2.default.cyan(d2)}
`;
      }
    } }).prompt();
    se = (r2) => {
      const n = r2.active ?? "Yes", i = r2.inactive ?? "No";
      return new BD({ active: n, inactive: i, initialValue: r2.initialValue ?? true, render() {
        const t = `${import_picocolors2.default.gray(a2)}
${y2(this.state)}  ${r2.message}
`, s2 = this.value ? n : i;
        switch (this.state) {
          case "submit":
            return `${t}${import_picocolors2.default.gray(a2)}  ${import_picocolors2.default.dim(s2)}`;
          case "cancel":
            return `${t}${import_picocolors2.default.gray(a2)}  ${import_picocolors2.default.strikethrough(import_picocolors2.default.dim(s2))}
${import_picocolors2.default.gray(a2)}`;
          default:
            return `${t}${import_picocolors2.default.cyan(a2)}  ${this.value ? `${import_picocolors2.default.green(b2)} ${n}` : `${import_picocolors2.default.dim(E)} ${import_picocolors2.default.dim(n)}`} ${import_picocolors2.default.dim("/")} ${this.value ? `${import_picocolors2.default.dim(E)} ${import_picocolors2.default.dim(i)}` : `${import_picocolors2.default.green(b2)} ${i}`}
${import_picocolors2.default.cyan(d2)}
`;
        }
      } }).prompt();
    };
    ie = (r2) => {
      const n = (t, s2) => {
        const c2 = t.label ?? String(t.value);
        return s2 === "active" ? `${import_picocolors2.default.green(b2)} ${c2} ${t.hint ? import_picocolors2.default.dim(`(${t.hint})`) : ""}` : s2 === "selected" ? `${import_picocolors2.default.dim(c2)}` : s2 === "cancelled" ? `${import_picocolors2.default.strikethrough(import_picocolors2.default.dim(c2))}` : `${import_picocolors2.default.dim(E)} ${import_picocolors2.default.dim(c2)}`;
      };
      let i = 0;
      return new $D({ options: r2.options, initialValue: r2.initialValue, render() {
        const t = `${import_picocolors2.default.gray(a2)}
${y2(this.state)}  ${r2.message}
`;
        switch (this.state) {
          case "submit":
            return `${t}${import_picocolors2.default.gray(a2)}  ${n(this.options[this.cursor], "selected")}`;
          case "cancel":
            return `${t}${import_picocolors2.default.gray(a2)}  ${n(this.options[this.cursor], "cancelled")}
${import_picocolors2.default.gray(a2)}`;
          default: {
            const s2 = r2.maxItems === void 0 ? 1 / 0 : Math.max(r2.maxItems, 5);
            this.cursor >= i + s2 - 3 ? i = Math.max(Math.min(this.cursor - s2 + 3, this.options.length - s2), 0) : this.cursor < i + 2 && (i = Math.max(this.cursor - 2, 0));
            const c2 = s2 < this.options.length && i > 0, l2 = s2 < this.options.length && i + s2 < this.options.length;
            return `${t}${import_picocolors2.default.cyan(a2)}  ${this.options.slice(i, i + s2).map((u, m2, $4) => m2 === 0 && c2 ? import_picocolors2.default.dim("...") : m2 === $4.length - 1 && l2 ? import_picocolors2.default.dim("...") : n(u, m2 + i === this.cursor ? "active" : "inactive")).join(`
${import_picocolors2.default.cyan(a2)}  `)}
${import_picocolors2.default.cyan(d2)}
`;
          }
        }
      } }).prompt();
    };
    oe = (r2 = "") => {
      process.stdout.write(`${import_picocolors2.default.gray(K)}  ${r2}
`);
    };
    $e = (r2 = "") => {
      process.stdout.write(`${import_picocolors2.default.gray(a2)}
${import_picocolors2.default.gray(d2)}  ${r2}

`);
    };
    f2 = { message: (r2 = "", { symbol: n = import_picocolors2.default.gray(a2) } = {}) => {
      const i = [`${import_picocolors2.default.gray(a2)}`];
      if (r2) {
        const [t, ...s2] = r2.split(`
`);
        i.push(`${n}  ${t}`, ...s2.map((c2) => `${import_picocolors2.default.gray(a2)}  ${c2}`));
      }
      process.stdout.write(`${i.join(`
`)}
`);
    }, info: (r2) => {
      f2.message(r2, { symbol: import_picocolors2.default.blue(J2) });
    }, success: (r2) => {
      f2.message(r2, { symbol: import_picocolors2.default.green(Y) });
    }, step: (r2) => {
      f2.message(r2, { symbol: import_picocolors2.default.green(S2) });
    }, warn: (r2) => {
      f2.message(r2, { symbol: import_picocolors2.default.yellow(Q2) });
    }, warning: (r2) => {
      f2.warn(r2);
    }, error: (r2) => {
      f2.message(r2, { symbol: import_picocolors2.default.red(ee) });
    } };
    de = () => {
      const r2 = _2 ? ["\u25D2", "\u25D0", "\u25D3", "\u25D1"] : ["\u2022", "o", "O", "0"], n = _2 ? 80 : 120;
      let i, t, s2 = false, c2 = "";
      const l2 = (v2 = "") => {
        s2 = true, i = OD(), c2 = v2.replace(/\.+$/, ""), process.stdout.write(`${import_picocolors2.default.gray(a2)}
`);
        let g2 = 0, p = 0;
        t = setInterval(() => {
          const O2 = import_picocolors2.default.magenta(r2[g2]), P2 = ".".repeat(Math.floor(p)).slice(0, 3);
          process.stdout.write(import_sisteransi2.cursor.move(-999, 0)), process.stdout.write(import_sisteransi2.erase.down(1)), process.stdout.write(`${O2}  ${c2}${P2}`), g2 = g2 + 1 < r2.length ? g2 + 1 : 0, p = p < r2.length ? p + 0.125 : 0;
        }, n);
      }, u = (v2 = "", g2 = 0) => {
        c2 = v2 ?? c2, s2 = false, clearInterval(t);
        const p = g2 === 0 ? import_picocolors2.default.green(S2) : g2 === 1 ? import_picocolors2.default.red(I2) : import_picocolors2.default.red(x2);
        process.stdout.write(import_sisteransi2.cursor.move(-999, 0)), process.stdout.write(import_sisteransi2.erase.down(1)), process.stdout.write(`${p}  ${c2}
`), i();
      }, m2 = (v2 = "") => {
        c2 = v2 ?? c2;
      }, $4 = (v2) => {
        const g2 = v2 > 1 ? "Something went wrong" : "Canceled";
        s2 && u(g2, v2);
      };
      return process.on("uncaughtExceptionMonitor", () => $4(2)), process.on("unhandledRejection", () => $4(2)), process.on("SIGINT", () => $4(1)), process.on("SIGTERM", () => $4(1)), process.on("exit", $4), { start: l2, stop: u, message: m2 };
    };
  }
});

// node_modules/.pnpm/which-pm-runs@1.1.0/node_modules/which-pm-runs/index.js
var require_which_pm_runs = __commonJS({
  "node_modules/.pnpm/which-pm-runs@1.1.0/node_modules/which-pm-runs/index.js"(exports2, module2) {
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
  "node_modules/.pnpm/isexe@2.0.0/node_modules/isexe/windows.js"(exports2, module2) {
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
        var p = pathext[i].toLowerCase();
        if (p && path3.substr(-p.length).toLowerCase() === p) {
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
  "node_modules/.pnpm/isexe@2.0.0/node_modules/isexe/mode.js"(exports2, module2) {
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
      var u = parseInt("100", 8);
      var g2 = parseInt("010", 8);
      var o2 = parseInt("001", 8);
      var ug = u | g2;
      var ret = mod & o2 || mod & g2 && gid === myGid || mod & u && uid === myUid || mod & ug && myUid === 0;
      return ret;
    }
  }
});

// node_modules/.pnpm/isexe@2.0.0/node_modules/isexe/index.js
var require_isexe = __commonJS({
  "node_modules/.pnpm/isexe@2.0.0/node_modules/isexe/index.js"(exports2, module2) {
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
  "node_modules/.pnpm/which@2.0.2/node_modules/which/which.js"(exports2, module2) {
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
        const p = !pathPart && /^\.[\\\/]/.test(cmd) ? cmd.slice(0, 2) + pCmd : pCmd;
        resolve2(subStep(p, i, 0));
      });
      const subStep = (p, i, ii) => new Promise((resolve2, reject) => {
        if (ii === pathExt.length)
          return resolve2(step(i + 1));
        const ext = pathExt[ii];
        isexe(p + ext, { pathExt: pathExtExe }, (er, is) => {
          if (!er && is) {
            if (opt.all)
              found.push(p + ext);
            else
              return resolve2(p + ext);
          }
          return resolve2(subStep(p, i, ii + 1));
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
        const p = !pathPart && /^\.[\\\/]/.test(cmd) ? cmd.slice(0, 2) + pCmd : pCmd;
        for (let j2 = 0; j2 < pathExt.length; j2++) {
          const cur = p + pathExt[j2];
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
  "node_modules/.pnpm/path-key@3.1.1/node_modules/path-key/index.js"(exports2, module2) {
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
  "node_modules/.pnpm/cross-spawn@7.0.3/node_modules/cross-spawn/lib/util/resolveCommand.js"(exports2, module2) {
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
  "node_modules/.pnpm/cross-spawn@7.0.3/node_modules/cross-spawn/lib/util/escape.js"(exports2, module2) {
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
  "node_modules/.pnpm/shebang-regex@3.0.0/node_modules/shebang-regex/index.js"(exports2, module2) {
    "use strict";
    module2.exports = /^#!(.*)/;
  }
});

// node_modules/.pnpm/shebang-command@2.0.0/node_modules/shebang-command/index.js
var require_shebang_command = __commonJS({
  "node_modules/.pnpm/shebang-command@2.0.0/node_modules/shebang-command/index.js"(exports2, module2) {
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
  "node_modules/.pnpm/cross-spawn@7.0.3/node_modules/cross-spawn/lib/util/readShebang.js"(exports2, module2) {
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
  "node_modules/.pnpm/cross-spawn@7.0.3/node_modules/cross-spawn/lib/parse.js"(exports2, module2) {
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
  "node_modules/.pnpm/cross-spawn@7.0.3/node_modules/cross-spawn/lib/enoent.js"(exports2, module2) {
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
  "node_modules/.pnpm/cross-spawn@7.0.3/node_modules/cross-spawn/index.js"(exports2, module2) {
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

// node_modules/.pnpm/merge-stream@2.0.0/node_modules/merge-stream/index.js
var require_merge_stream = __commonJS({
  "node_modules/.pnpm/merge-stream@2.0.0/node_modules/merge-stream/index.js"(exports2, module2) {
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

// packages/qwik/src/cli/migrate-v2/tools/visit-not-ignored-files.ts
function visitNotIgnoredFiles(dirPath, visitor) {
  let ig;
  if ((0, import_fs2.existsSync)(".gitignore")) {
    ig = (0, import_ignore.default)();
    ig.add(".git");
    ig.add((0, import_fs2.readFileSync)(".gitignore", "utf-8"));
  }
  dirPath = (0, import_path4.relative)(process.cwd(), dirPath);
  if (dirPath !== "" && (ig == null ? void 0 : ig.ignores(dirPath))) {
    return;
  }
  for (const child of (0, import_fs2.readdirSync)((0, import_path4.join)(process.cwd(), dirPath))) {
    const fullPath = (0, import_path4.join)(dirPath, child);
    if (ig == null ? void 0 : ig.ignores(fullPath)) {
      continue;
    }
    if ((0, import_fs2.lstatSync)(fullPath).isFile()) {
      visitor(fullPath);
    } else {
      visitNotIgnoredFiles(fullPath, visitor);
    }
  }
}
var import_fs2, import_ignore, import_path4;
var init_visit_not_ignored_files = __esm({
  "packages/qwik/src/cli/migrate-v2/tools/visit-not-ignored-files.ts"() {
    "use strict";
    import_fs2 = require("fs");
    import_ignore = __toESM(require("ignore"), 1);
    import_path4 = require("path");
  }
});

// packages/qwik/src/cli/migrate-v2/rename-import.ts
var rename_import_exports = {};
__export(rename_import_exports, {
  replaceImportInFiles: () => replaceImportInFiles
});
function replaceImportInFiles(changes, library) {
  const project = new import_ts_morph.Project();
  visitNotIgnoredFiles(".", (path3) => {
    if (!path3.endsWith(".ts") && !path3.endsWith(".tsx")) {
      return;
    }
    project.addSourceFileAtPath(path3);
  });
  project.getSourceFiles().forEach((sourceFile) => {
    let hasChanges = false;
    sourceFile.getImportDeclarations().forEach((importDeclaration) => {
      if (importDeclaration.getModuleSpecifierValue().startsWith(library)) {
        for (const [oldImport, newImport] of changes) {
          importDeclaration.getNamedImports().forEach((namedImport) => {
            if (namedImport.getName() === oldImport) {
              namedImport.setName(newImport);
              hasChanges = true;
            }
          });
        }
      }
    });
    sourceFile.getDescendantsOfKind(import_ts_morph.ts.SyntaxKind.Identifier).forEach((identifier) => {
      for (const [oldImport, newImport] of changes) {
        if (identifier.getText() === oldImport) {
          identifier.replaceWithText(newImport);
          hasChanges = true;
        }
      }
    });
    if (hasChanges) {
      sourceFile.saveSync();
      f2.info(`Updated imports in ${sourceFile.getFilePath()}`);
    }
  });
}
var import_ts_morph;
var init_rename_import = __esm({
  "packages/qwik/src/cli/migrate-v2/rename-import.ts"() {
    "use strict";
    import_ts_morph = require("ts-morph");
    init_visit_not_ignored_files();
    init_dist2();
  }
});

// packages/qwik/src/cli/index.ts
var index_exports = {};
__export(index_exports, {
  runCli: () => runCli,
  updateApp: () => updateApp
});
module.exports = __toCommonJS(index_exports);

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
function init(x3, y3) {
  let rgx = new RegExp(`\\x1b\\[${y3}m`, "g");
  let open = `\x1B[${x3}m`, close = `\x1B[${y3}m`;
  return function(txt) {
    if (!$.enabled || txt == null) return txt;
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
var import_node_fs = require("node:fs");
var import_node_path = require("node:path");
var AppCommand = class {
  args;
  task;
  cwd;
  _rootDir;
  _rootPkgJson;
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

// packages/qwik/src/cli/add/run-add-interactive.ts
init_dist2();

// packages/qwik/src/cli/utils/integrations.ts
var import_node_fs3 = __toESM(require("node:fs"), 1);
var import_node_path3 = require("node:path");

// packages/qwik/src/cli/utils/utils.ts
init_dist2();
var import_which_pm_runs = __toESM(require_which_pm_runs(), 1);
var import_node_fs2 = __toESM(require("node:fs"), 1);
var import_node_path2 = require("node:path");
var import_cross_spawn = __toESM(require_cross_spawn(), 1);
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
            f2.error(red(String(e2.message)) + `

`);
          } else {
            f2.error(red(String(e2)) + `

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
async function writePackageJson(dir, pkgJson) {
  const path3 = (0, import_node_path2.join)(dir, "package.json");
  await import_node_fs2.default.promises.writeFile(path3, JSON.stringify(pkgJson, null, 2) + "\n");
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
  return ((_a = (0, import_which_pm_runs.default)()) == null ? void 0 : _a.name) || "pnpm";
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
  $e("Take care, see you soon! \u{1F44B}");
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
function isUnicodeSupported() {
  if (process.platform !== "win32") {
    return process.env.TERM !== "linux";
  }
  return Boolean(process.env.CI) || Boolean(process.env.WT_SESSION) || // Windows Terminal
  Boolean(process.env.TERMINUS_SUBLIME) || // Terminus (<0.2.27)
  process.env.ConEmuTask === "{cmd::Cmder}" || // ConEmu and cmder
  process.env.TERM_PROGRAM === "Terminus-Sublime" || process.env.TERM_PROGRAM === "vscode" || process.env.TERM === "xterm-256color" || process.env.TERM === "alacritty" || process.env.TERMINAL_EMULATOR === "JetBrains-JediTerm";
}
var unicode = isUnicodeSupported();
var s = (c2, fallback) => unicode ? c2 : fallback;
var S_BAR = s("\u2502", "|");
var S_BAR_H = s("\u2500", "-");
var S_CORNER_TOP_RIGHT = s("\u256E", "+");
var S_CONNECT_LEFT = s("\u251C", "+");
var S_CORNER_BOTTOM_RIGHT = s("\u256F", "+");
var S_STEP_SUBMIT = s("\u25C7", "o");
function ansiRegex() {
  const pattern = [
    "[\\u001B\\u009B][[\\]()#;?]*(?:(?:(?:(?:;[-a-zA-Z\\d\\/#&.:=?%@~_]+)*|[a-zA-Z\\d]+(?:;[-a-zA-Z\\d\\/#&.:=?%@~_]*)*)?\\u0007)",
    "(?:(?:\\d{1,4}(?:;\\d{0,4})*)?[\\dA-PR-TZcf-nq-uy=><~]))"
  ].join("|");
  return new RegExp(pattern, "g");
}
var strip = (str) => str.replace(ansiRegex(), "");
var note = (message = "", title = "") => {
  const lines = `
${message}
`.split("\n");
  const titleLen = strip(title).length;
  const len = Math.max(
    lines.reduce((sum, ln) => {
      ln = strip(ln);
      return ln.length > sum ? ln.length : sum;
    }, 0),
    titleLen
  ) + 2;
  const msg = lines.map((ln) => `${gray(S_BAR)}  ${white(ln)}${" ".repeat(len - strip(ln).length)}${gray(S_BAR)}`).join("\n");
  process.stdout.write(
    `${gray(S_BAR)}
${green(S_STEP_SUBMIT)}  ${reset(title)} ${gray(
      S_BAR_H.repeat(Math.max(len - titleLen - 1, 1)) + S_CORNER_TOP_RIGHT
    )}
${msg}
${gray(S_CONNECT_LEFT + S_BAR_H.repeat(len + 2) + S_CORNER_BOTTOM_RIGHT)}
`
  );
};

// packages/qwik/src/cli/utils/integrations.ts
var integrations = null;
async function sortIntegrationsAndReturnAsClackOptions(integrations2, { maxHintLength = 50, showHint = true } = {}) {
  return integrations2.sort((a3, b3) => {
    if (a3.priority > b3.priority) {
      return -1;
    }
    if (a3.priority < b3.priority) {
      return 1;
    }
    return a3.id < b3.id ? -1 : 1;
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
              var _a, _b, _c, _d;
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
                  priority: ((_c = pkgJson == null ? void 0 : pkgJson.__qwik__) == null ? void 0 : _c.priority) ?? 0,
                  alwaysInRoot: ((_d = pkgJson.__qwik__) == null ? void 0 : _d.alwaysInRoot) ?? []
                };
                loadingIntegrations.push(integration);
              }
            })
          );
        }
      })
    );
    loadingIntegrations.sort((a3, b3) => {
      if (a3.priority > b3.priority) {
        return -1;
      }
      if (a3.priority < b3.priority) {
        return 1;
      }
      return a3.id < b3.id ? -1 : 1;
    });
    integrations = loadingIntegrations;
  }
  return integrations;
}

// packages/qwik/src/cli/add/run-add-interactive.ts
var import_node_path6 = require("node:path");

// packages/qwik/src/cli/utils/install-deps.ts
init_dist2();
function installDeps(pkgManager, dir) {
  return runCommand(pkgManager, ["install"], dir);
}
function runInPkg(pkgManager, args, cwd) {
  const cmd = pkgManager === "npm" ? "npx" : pkgManager;
  return runCommand(cmd, args, cwd);
}

// packages/qwik/src/cli/utils/log.ts
function logNextStep(nextSteps, packageManager) {
  const outString = [];
  if (nextSteps) {
    nextSteps.lines.forEach(
      (step) => outString.push(`${step.replace(/\bpnpm\b/g, packageManager)}`)
    );
  }
  return outString.join("\n");
}

// packages/qwik/src/cli/add/update-app.ts
init_dist2();
var import_node_fs5 = __toESM(require("node:fs"), 1);
var import_node_path5 = require("node:path");

// packages/qwik/src/cli/add/update-files.ts
var import_node_fs4 = __toESM(require("node:fs"), 1);
var import_node_path4 = require("node:path");
async function mergeIntegrationDir(fileUpdates, opts, srcDir, destDir, alwaysInRoot) {
  const items = await import_node_fs4.default.promises.readdir(srcDir);
  await Promise.all(
    items.map(async (itemName) => {
      const destName = itemName === "gitignore" ? ".gitignore" : itemName;
      const ext = (0, import_node_path4.extname)(destName);
      const srcChildPath = (0, import_node_path4.join)(srcDir, itemName);
      const destRootPath = (0, import_node_path4.join)(destDir, destName);
      const s2 = await import_node_fs4.default.promises.stat(srcChildPath);
      if (s2.isDirectory()) {
        await mergeIntegrationDir(fileUpdates, opts, srcChildPath, destRootPath, alwaysInRoot);
      } else if (s2.isFile()) {
        const finalDestPath = getFinalDestPath(opts, destRootPath, destDir, destName, alwaysInRoot);
        if (destName === "package.json") {
          await mergePackageJsons(fileUpdates, srcChildPath, destRootPath);
        } else if (destName === "settings.json") {
          await mergeJsons(fileUpdates, srcChildPath, finalDestPath);
        } else if (destName === "README.md") {
          await mergeReadmes(fileUpdates, srcChildPath, finalDestPath);
        } else if (destName === ".gitignore" || destName === ".prettierignore" || destName === ".eslintignore") {
          await mergeIgnoresFile(fileUpdates, srcChildPath, destRootPath);
        } else if (ext === ".css") {
          await mergeCss(fileUpdates, srcChildPath, finalDestPath, opts);
        } else if (import_node_fs4.default.existsSync(finalDestPath)) {
          fileUpdates.files.push({
            path: finalDestPath,
            content: await import_node_fs4.default.promises.readFile(srcChildPath),
            type: "overwrite"
          });
        } else {
          fileUpdates.files.push({
            path: finalDestPath,
            content: await import_node_fs4.default.promises.readFile(srcChildPath),
            type: "create"
          });
        }
      }
    })
  );
}
function getFinalDestPath(opts, destRootPath, destDir, destName, alwaysInRoot) {
  const projectDir = opts.projectDir ? opts.projectDir : "";
  const rootDirEndIndex = destDir.indexOf(opts.rootDir) + opts.rootDir.length;
  const destWithoutRoot = destDir.slice(rootDirEndIndex);
  const destChildPath = (0, import_node_path4.join)(opts.rootDir, projectDir, destWithoutRoot, destName);
  const finalDestPath = alwaysInRoot && alwaysInRoot.some((rootItem) => destName.includes(rootItem) || destDir.includes(rootItem)) ? destRootPath : destChildPath;
  return finalDestPath;
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
    destContent = destContent.replace(/\b(npm run|pnpm run|yarn( run)?)\b/g, pkgManager);
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
async function mergeCss(fileUpdates, srcPath, destPath, opts) {
  const srcContent = await import_node_fs4.default.promises.readFile(srcPath, "utf-8");
  try {
    const destContent = await import_node_fs4.default.promises.readFile(destPath, "utf-8");
    const mergedContent = srcContent.trim() + "\n\n" + destContent.trim() + "\n";
    const isAddingLibrary = opts.installDeps === true;
    fileUpdates.files.push({
      path: destPath,
      content: isAddingLibrary ? mergedContent : srcContent,
      type: isAddingLibrary ? "modify" : "overwrite"
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
function updateViteConfig(ts2, sourceText, updates) {
  if (!(updates == null ? void 0 : updates.imports) && !(updates == null ? void 0 : updates.qwikViteConfig) && !(updates == null ? void 0 : updates.viteConfig) && !(updates == null ? void 0 : updates.vitePlugins) && !(updates == null ? void 0 : updates.vitePluginsPrepend)) {
    return null;
  }
  sourceText = transformSource(ts2, sourceText, () => (tsSourceFile) => {
    if (updates.imports) {
      for (const importData of updates.imports) {
        tsSourceFile = ensureImport(ts2, tsSourceFile, importData);
      }
    }
    const statements = [];
    for (const s2 of tsSourceFile.statements) {
      if (ts2.isExportAssignment(s2) && s2.expression && ts2.isCallExpression(s2.expression)) {
        if (ts2.isIdentifier(s2.expression.expression) && s2.expression.expression.text === "defineConfig" && (updates.viteConfig || updates.qwikViteConfig || updates.vitePlugins || updates.vitePluginsPrepend)) {
          statements.push(
            ts2.factory.updateExportAssignment(
              s2,
              s2.modifiers,
              updateDefineConfig(ts2, s2.expression, updates)
            )
          );
          continue;
        }
      }
      statements.push(s2);
    }
    return ts2.factory.updateSourceFile(tsSourceFile, statements);
  });
  return sourceText;
}
function ensureImport(ts2, tsSourceFile, importData) {
  if (importData && importData.importPath) {
    if (Array.isArray(importData.namedImports)) {
      importData.namedImports.forEach((namedImport) => {
        tsSourceFile = ensureNamedImport(ts2, tsSourceFile, namedImport, importData.importPath);
      });
    }
    if (typeof importData.defaultImport === "string") {
      tsSourceFile = ensureDefaultImport(
        ts2,
        tsSourceFile,
        importData.defaultImport,
        importData.importPath
      );
    }
  }
  return tsSourceFile;
}
function ensureNamedImport(ts2, tsSourceFile, namedImport, importPath) {
  if (!hasNamedImport(ts2, tsSourceFile, namedImport, importPath)) {
    tsSourceFile = appendImports(ts2, tsSourceFile, null, namedImport, importPath);
  }
  return tsSourceFile;
}
function ensureDefaultImport(ts2, tsSourceFile, defaultImport, importPath) {
  if (!hasDefaultImport(ts2, tsSourceFile, importPath)) {
    tsSourceFile = appendImports(ts2, tsSourceFile, defaultImport, null, importPath);
  }
  return tsSourceFile;
}
function hasNamedImport(ts2, tsSourceFile, namedImport, importPath) {
  return !!findNamedImport(ts2, tsSourceFile, namedImport, importPath);
}
function hasDefaultImport(ts2, tsSourceFile, importPath) {
  return !!findDefaultImport(ts2, tsSourceFile, importPath);
}
function findNamedImport(ts2, tsSourceFile, namedImport, importPath) {
  return findImportDeclarations(ts2, tsSourceFile).find((n) => {
    if (n.importClause && n.moduleSpecifier && ts2.isStringLiteral(n.moduleSpecifier)) {
      if (n.moduleSpecifier.text !== importPath) {
        return false;
      }
      const namedImports = n.importClause.namedBindings;
      if (namedImports && ts2.isNamedImports(namedImports) && namedImports.elements) {
        return namedImports.elements.some((namedImportElement) => {
          if (ts2.isImportSpecifier(namedImportElement)) {
            const importName = namedImportElement.name;
            if (importName && ts2.isIdentifier(importName)) {
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
function findDefaultImport(ts2, tsSourceFile, importPath) {
  return findImportDeclarations(ts2, tsSourceFile).find((n) => {
    if (n.importClause && n.moduleSpecifier) {
      const modulePath = n.moduleSpecifier;
      if (ts2.isStringLiteral(modulePath) && modulePath.text === importPath) {
        const moduleDefault = n.importClause.name;
        if (moduleDefault && moduleDefault.text === importPath) {
          return true;
        }
      }
    }
    return false;
  });
}
function findImportDeclarations(ts2, tsSourceFile) {
  return tsSourceFile.statements.filter(ts2.isImportDeclaration);
}
function appendImports(ts2, tsSourceFile, defaultImport, namedImport, importPath) {
  const statements = tsSourceFile.statements.slice();
  let foundExistingImport = false;
  for (let i = statements.length - 1; i >= 0; i--) {
    const n = statements[i];
    if (!ts2.isImportDeclaration(n)) {
      continue;
    }
    if (!n.moduleSpecifier || !ts2.isStringLiteral(n.moduleSpecifier)) {
      continue;
    }
    if (n.moduleSpecifier.text !== importPath) {
      continue;
    }
    foundExistingImport = true;
    const existingNamedImports = [];
    if (n.importClause) {
      const namedImports = n.importClause.namedBindings;
      if (namedImports && ts2.isNamedImports(namedImports) && namedImports.elements) {
        existingNamedImports.push(...namedImports.elements);
      }
    }
    if (typeof namedImport === "string") {
      const identifier = ts2.factory.createIdentifier(namedImport);
      const importSpecifier = ts2.factory.createImportSpecifier(false, void 0, identifier);
      existingNamedImports.push(importSpecifier);
    }
    existingNamedImports.sort((a3, b3) => {
      const aName = a3.name.escapedText.toString();
      const bName = b3.name.escapedText.toString();
      return aName < bName ? -1 : 1;
    });
    let defaultIdentifier = n.importClause ? n.importClause.name : void 0;
    if (typeof defaultImport === "string") {
      defaultIdentifier = ts2.factory.createIdentifier(defaultImport);
    }
    let namedBindings = void 0;
    if (existingNamedImports.length > 0) {
      namedBindings = ts2.factory.createNamedImports(existingNamedImports);
    }
    statements[i] = ts2.factory.updateImportDeclaration(
      n,
      void 0,
      ts2.factory.createImportClause(false, defaultIdentifier, namedBindings),
      n.moduleSpecifier,
      void 0
    );
  }
  if (!foundExistingImport) {
    let defaultIdentifier = void 0;
    let namedBindings = void 0;
    if (typeof defaultImport === "string") {
      defaultIdentifier = ts2.factory.createIdentifier(defaultImport);
    }
    if (typeof namedImport === "string") {
      namedBindings = ts2.factory.createNamedImports([
        ts2.factory.createImportSpecifier(
          false,
          void 0,
          ts2.factory.createIdentifier(namedImport)
        )
      ]);
    }
    const newNamedImport = ts2.factory.createImportDeclaration(
      void 0,
      ts2.factory.createImportClause(false, defaultIdentifier, namedBindings),
      ts2.factory.createStringLiteral(importPath)
    );
    const lastImportIndex = findLastImportIndex(ts2, tsSourceFile);
    statements.splice(lastImportIndex + 1, 0, newNamedImport);
  }
  return ts2.factory.updateSourceFile(tsSourceFile, statements);
}
function findLastImportIndex(ts2, tsSourceFile) {
  for (let i = tsSourceFile.statements.length - 1; i >= 0; i--) {
    const s2 = tsSourceFile.statements[i];
    if (ts2.isImportDeclaration(s2)) {
      return i;
    }
    if (ts2.isStringLiteral(s2) && s2.text === "use strict") {
      return i;
    }
  }
  return 0;
}
function updateDefineConfig(ts2, callExp, updates) {
  const args = [];
  for (let i = 0; i < callExp.arguments.length; i++) {
    const exp = callExp.arguments[i];
    if (i === 0) {
      if (ts2.isArrowFunction(exp) && ts2.isBlock(exp.body)) {
        args.push(
          ts2.factory.updateArrowFunction(
            exp,
            exp.modifiers,
            exp.typeParameters,
            exp.parameters,
            exp.type,
            exp.equalsGreaterThanToken,
            updateDefineConfigFnReturn(ts2, exp.body, updates)
          )
        );
        continue;
      }
      if (ts2.isFunctionExpression(exp) && ts2.isBlock(exp.body)) {
        args.push(
          ts2.factory.updateFunctionExpression(
            exp,
            exp.modifiers,
            exp.asteriskToken,
            exp.name,
            exp.typeParameters,
            exp.parameters,
            exp.type,
            updateDefineConfigFnReturn(ts2, exp.body, updates)
          )
        );
        continue;
      }
      if (ts2.isObjectLiteralExpression(exp)) {
        args.push(updateVitConfigObj(ts2, exp, updates));
        continue;
      }
    }
    args.push(exp);
  }
  return ts2.factory.updateCallExpression(callExp, callExp.expression, callExp.typeArguments, args);
}
function updateDefineConfigFnReturn(ts2, fnBody, updates) {
  const statements = [];
  for (const s2 of fnBody.statements) {
    if (ts2.isReturnStatement(s2) && s2.expression && ts2.isObjectLiteralExpression(s2.expression)) {
      statements.push(
        ts2.factory.updateReturnStatement(s2, updateVitConfigObj(ts2, s2.expression, updates))
      );
    } else {
      statements.push(s2);
    }
  }
  return ts2.factory.updateBlock(fnBody, statements);
}
function updateVitConfigObj(ts2, obj, updates) {
  if (updates.viteConfig) {
    obj = updateObjectLiteralExpression(ts2, obj, updates.viteConfig);
  }
  if (updates.vitePlugins || updates.vitePluginsPrepend || updates.qwikViteConfig) {
    obj = updatePlugins(ts2, obj, updates);
  }
  return obj;
}
function updatePlugins(ts2, obj, updates) {
  const properties = [];
  for (const p of obj.properties) {
    if (ts2.isPropertyAssignment(p)) {
      if (p.name && ts2.isIdentifier(p.name) && p.name.text === "plugins") {
        if (ts2.isArrayLiteralExpression(p.initializer)) {
          properties.push(
            ts2.factory.updatePropertyAssignment(
              p,
              p.name,
              updatePluginsArray(ts2, p.initializer, updates)
            )
          );
          continue;
        }
      }
    }
    properties.push(p);
  }
  return ts2.factory.updateObjectLiteralExpression(obj, properties);
}
function updatePluginsArray(ts2, arr, updates) {
  var _a, _b;
  const elms = [...arr.elements];
  if (updates.vitePlugins) {
    for (const vitePlugin of updates.vitePlugins) {
      const pluginExp = createPluginCall(ts2, vitePlugin);
      const pluginName = (_a = pluginExp == null ? void 0 : pluginExp.expression) == null ? void 0 : _a.escapedText;
      const alreadyDefined = elms.some(
        (el) => ts2.isCallExpression(el) && ts2.isIdentifier(el.expression) && el.expression.escapedText === pluginName
      );
      if (pluginExp && !alreadyDefined) {
        elms.push(pluginExp);
      }
    }
  }
  if (updates.vitePluginsPrepend) {
    for (const vitePlugin of updates.vitePluginsPrepend) {
      const pluginExp = createPluginCall(ts2, vitePlugin);
      const pluginName = (_b = pluginExp == null ? void 0 : pluginExp.expression) == null ? void 0 : _b.escapedText;
      const alreadyDefined = elms.some(
        (el) => ts2.isCallExpression(el) && ts2.isIdentifier(el.expression) && el.expression.escapedText === pluginName
      );
      if (pluginExp && !alreadyDefined) {
        elms.unshift(pluginExp);
      }
    }
  }
  if (updates.qwikViteConfig) {
    for (let i = 0; i < elms.length; i++) {
      const elm = elms[i];
      if (ts2.isCallExpression(elm) && ts2.isIdentifier(elm.expression)) {
        if (elm.expression.escapedText === "qwikVite") {
          elms[i] = updateQwikCityPlugin(ts2, elm, updates.qwikViteConfig);
        }
      }
    }
  }
  return ts2.factory.updateArrayLiteralExpression(arr, elms);
}
function createPluginCall(ts2, vitePlugin) {
  if (typeof vitePlugin === "string") {
    const tmp = ts2.createSourceFile(
      "tmp.ts",
      "export default " + vitePlugin,
      ts2.ScriptTarget.Latest
    );
    for (const s2 of tmp.statements) {
      if (ts2.isExportAssignment(s2)) {
        return s2.expression;
      }
    }
  }
  return null;
}
function updateQwikCityPlugin(ts2, callExp, qwikViteConfig) {
  const args = callExp.arguments.slice();
  const config = args[0] && ts2.isObjectLiteralExpression(args[0]) ? args[0] : ts2.factory.createObjectLiteralExpression();
  args[0] = updateObjectLiteralExpression(ts2, config, qwikViteConfig);
  return ts2.factory.updateCallExpression(callExp, callExp.expression, callExp.typeArguments, args);
}
function updateObjectLiteralExpression(ts2, obj, updateObj) {
  for (const [propName, value] of Object.entries(updateObj)) {
    if (typeof value === "string") {
      const tmp = ts2.createSourceFile("tmp.ts", "export default " + value, ts2.ScriptTarget.Latest);
      for (const s2 of tmp.statements) {
        if (ts2.isExportAssignment(s2)) {
          const exp = s2.expression;
          let added = false;
          const properties = [];
          for (const p of obj.properties) {
            if (p.name && ts2.isIdentifier(p.name) && p.name.text === propName) {
              properties.push(ts2.factory.createPropertyAssignment(propName, exp));
              added = true;
            } else {
              properties.push(p);
            }
          }
          if (!added) {
            properties.unshift(ts2.factory.createPropertyAssignment(propName, exp));
          }
          obj = ts2.factory.updateObjectLiteralExpression(obj, properties);
        }
      }
    }
  }
  return obj;
}
function transformSource(ts2, sourceText, transformer) {
  const t = ts2.transform(ts2.createSourceFile("/tmp.ts", sourceText, ts2.ScriptTarget.Latest), [
    transformer
  ]);
  const p = ts2.createPrinter({
    removeComments: false,
    omitTrailingSemicolon: false,
    noEmitHelpers: true
  });
  return p.printFile(t.transformed[0]);
}

// packages/qwik/src/cli/add/update-vite-config.ts
async function updateViteConfigs(fileUpdates, integration, rootDir) {
  var _a;
  try {
    const viteConfig = (_a = integration.pkgJson.__qwik__) == null ? void 0 : _a.viteConfig;
    if (viteConfig) {
      let viteConfigPath = (0, import_path.join)(rootDir, "vite.config.ts");
      if (!import_fs.default.existsSync(viteConfigPath)) {
        viteConfigPath = (0, import_path.join)(rootDir, "vite.config.mts");
      }
      if (!import_fs.default.existsSync(viteConfigPath)) {
        throw new Error(`Could not find vite.config.ts or vite.config.mts in ${rootDir}`);
      }
      const destContent = await import_fs.default.promises.readFile(viteConfigPath, "utf-8");
      const ts2 = (await import("typescript")).default;
      let updatedContent = updateViteConfig(ts2, destContent, viteConfig);
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
          updatedContent = await prettier.format(updatedContent, prettierOpts);
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
  const integration = integrations2.find((s2) => s2.id === opts.integration);
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
  await mergeIntegrationDir(
    fileUpdates,
    opts,
    integration.dir,
    opts.rootDir,
    integration.alwaysInRoot
  );
  if (true) {
    await updateViteConfigs(fileUpdates, integration, opts.rootDir);
  }
  const commit = async (showSpinner) => {
    const isInstallingDeps = Object.keys(fileUpdates.installedDeps).length > 0;
    const s2 = de();
    if (showSpinner) {
      s2.start(`Updating app${isInstallingDeps ? " and installing dependencies" : ""}...`);
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
      showSpinner && s2.stop("App updated");
      if (!passed) {
        const errorMessage = `${bgRed(
          ` ${pkgManager} install failed `
        )}
 You might need to run "${cyan(
          `${pkgManager} install`
        )}" manually inside the root of the project.`;
        f2.error(errorMessage);
      }
    } catch (e2) {
      showSpinner && s2.stop("App updated");
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
async function runAddInteractive(app, id) {
  var _a;
  const pkgManager = getPackageManager();
  const integrations2 = await loadIntegrations();
  let integration;
  if (typeof id === "string") {
    integration = integrations2.find((i) => i.id === id);
    if (!integration) {
      throw new Error(`Invalid integration: ${id}`);
    }
    oe(`\u{1F98B} ${bgBlue(` Add Integration `)} ${bold(magenta(integration.id))}`);
  } else {
    oe(`\u{1F98B} ${bgBlue(` Add Integration `)}`);
    const integrationChoices = [
      ...integrations2.filter((i) => i.type === "adapter"),
      ...integrations2.filter((i) => i.type === "feature")
    ];
    const integrationAnswer = await ie({
      message: "What integration would you like to add?",
      options: await sortIntegrationsAndReturnAsClackOptions(integrationChoices)
    });
    if (lD(integrationAnswer)) {
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
  let runInstall2 = false;
  if (integrationHasDeps) {
    runInstall2 = true;
  }
  const updateAppOptions = {
    rootDir: app.rootDir,
    integration: integration.id,
    installDeps: runInstall2
  };
  const projectDir = app.getArg("projectDir");
  if (projectDir) {
    updateAppOptions.projectDir = projectDir;
  }
  const result = await updateApp(pkgManager, updateAppOptions);
  if (app.getArg("skipConfirmation") !== "true") {
    await logUpdateAppResult(pkgManager, result);
  }
  await result.commit(true);
  const postInstall = (_a = result.integration.pkgJson.__qwik__) == null ? void 0 : _a.postInstall;
  if (postInstall) {
    const s2 = de();
    s2.start(`Running post install script: ${postInstall}`);
    await runInPkg(pkgManager, postInstall.split(" "), app.rootDir);
    s2.stop("Post install script complete");
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
  f2.step(`\u{1F47B} ${bgBlue(` Ready? `)} Add ${bold(magenta(result.integration.id))} to your app?`);
  if (modifyFiles.length > 0) {
    f2.message(
      [
        `\u{1F42C} ${cyan("Modify")}`,
        ...modifyFiles.map((f3) => `   - ${(0, import_node_path6.relative)(process.cwd(), f3.path)}`)
      ].join("\n")
    );
  }
  if (createFiles.length > 0) {
    f2.message(
      [
        `\u{1F31F} ${cyan(`Create`)}`,
        ...createFiles.map((f3) => `   - ${(0, import_node_path6.relative)(process.cwd(), f3.path)}`)
      ].join("\n")
    );
  }
  if (overwriteFiles.length > 0) {
    f2.message(
      [
        `\u{1F433} ${cyan(`Overwrite`)}`,
        ...overwriteFiles.map((f3) => `   - ${(0, import_node_path6.relative)(process.cwd(), f3.path)}`)
      ].join("\n")
    );
  }
  if (installDepNames.length > 0) {
    f2.message(
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
    f2.message(
      [
        `\u{1F4DC} ${cyan(`New ${pkgManager} script${installDepNames.length > 1 ? "s" : ""}:`)}`,
        ...installScripts.map((script) => `   - ${prefix} ${script}`)
      ].join("\n")
    );
  }
  const commit = await ie({
    message: `Ready to apply the ${bold(magenta(result.integration.id))} updates to your app?`,
    options: [
      { label: "Yes looks good, finish update!", value: true },
      { label: "Nope, cancel update", value: false }
    ]
  });
  if (lD(commit) || !commit) {
    bye();
  }
}
function logUpdateAppCommitResult(result, pkgManager) {
  var _a;
  if (result.updates.installedScripts.length > 0) {
    const prefix = pkgManager === "npm" || pkgManager === "bun" ? `${pkgManager} run` : pkgManager;
    const message = result.updates.installedScripts.map((script) => `- ${prefix} ${blue(script)}`).join("\n");
    note(message, "New scripts added");
  }
  const nextSteps = (_a = result.integration.pkgJson.__qwik__) == null ? void 0 : _a.nextSteps;
  if (nextSteps) {
    const noteMessage = `\u{1F7E3} ${bgMagenta(` ${nextSteps.title ?? "Action Required!"} `)}`;
    note(logNextStep(nextSteps, pkgManager), noteMessage);
  }
  $e(`\u{1F984} ${bgMagenta(` Success! `)} Added ${bold(cyan(result.integration.id))} to your app`);
}

// packages/qwik/src/cli/add/print-add-help.ts
init_dist2();
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
  oe(`${pmRun} qwik ${magenta(`add`)} [integration]`);
  note(renderIntegration(adapters), "Adapters");
  note(renderIntegration(features), "Features");
  const proceed = await se({
    message: "Do you want to install an integration?",
    initialValue: true
  });
  if (lD(proceed) || !proceed) {
    bye();
  }
  const command = await ie({
    message: "Select an integration",
    options: await sortIntegrationsAndReturnAsClackOptions(integrations2)
  });
  if (lD(command)) {
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
var import_node_fs7 = __toESM(require("node:fs"), 1);
var import_path2 = require("path");
init_dist2();

// packages/qwik/src/cli/utils/templates.ts
var import_node_fs6 = __toESM(require("node:fs"), 1);
var import_node_path7 = require("node:path");
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
    allTemplates.sort((a3, b3) => {
      if (a3.id === "qwik") {
        return -1;
      } else if (b3.id === "qwik") {
        return 1;
      }
      return a3.id > b3.id ? 1 : -1;
    });
    templates = allTemplates;
  }
  return templates;
}
async function readTemplates(rootDir) {
  const componentDir = (0, import_node_path7.join)(rootDir, "component");
  const routeDir = (0, import_node_path7.join)(rootDir, "route");
  const markdownDir = (0, import_node_path7.join)(rootDir, "markdown");
  const mdxDir = (0, import_node_path7.join)(rootDir, "mdx");
  const component = await getFilesDeep(componentDir);
  const route = await getFilesDeep(routeDir);
  const markdown = await getFilesDeep(markdownDir);
  const mdx = await getFilesDeep(mdxDir);
  return {
    component: component.map((c2) => parseTemplatePath(c2, "component")),
    route: route.map((r2) => parseTemplatePath(r2, "route")),
    markdown: markdown.map((m2) => parseTemplatePath(m2, "markdown")),
    mdx: mdx.map((m2) => parseTemplatePath(m2, "mdx"))
  };
}
function parseTemplatePath(path3, type) {
  const parts = path3.split(import_node_path7.sep + type + import_node_path7.sep);
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
var POSSIBLE_TYPES = ["component", "route", "markdown", "mdx"];

// packages/qwik/src/cli/new/run-new-command.ts
var SLUG_KEY = "[slug]";
var NAME_KEY = "[name]";
var MARKDOWN_SUFFIX = ".md";
var MDX_SUFFIX = ".mdx";
async function runNewCommand(app) {
  try {
    if (app.args.length > 1 && app.args[1] === "help") {
      oe(`\u{1F52D}  ${bgMagenta(" Qwik Help ")}`);
      await printNewHelp();
      bye();
    } else {
      oe(`\u2728  ${bgMagenta(" Create a new Qwik component or route ")}`);
    }
    const args = app.args.filter((a3) => !a3.startsWith("--"));
    const mainInput = args.slice(1).join(" ");
    let typeArg = void 0;
    let nameArg;
    let outDir;
    if (mainInput && mainInput.startsWith("/")) {
      if (mainInput.endsWith(MARKDOWN_SUFFIX)) {
        typeArg = "markdown";
        nameArg = mainInput.replace(MARKDOWN_SUFFIX, "");
      } else if (mainInput.endsWith(MDX_SUFFIX)) {
        typeArg = "mdx";
        nameArg = mainInput.replace(MDX_SUFFIX, "");
      } else {
        typeArg = "route";
        nameArg = mainInput;
      }
    } else if (mainInput) {
      typeArg = "component";
      nameArg = mainInput;
    }
    let templateArg = app.args.filter((a3) => a3.startsWith("--")).map((a3) => a3.substring(2)).join("");
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
        f2.error(`Template "${templateArg}" not found`);
        bye();
      }
      template = templates2[0][typeArg][0];
    }
    if (typeArg === "route" || typeArg === "markdown" || typeArg === "mdx") {
      outDir = (0, import_path2.join)(app.rootDir, "src", `routes`, nameArg);
    } else {
      outDir = (0, import_path2.join)(app.rootDir, "src", `components`, nameArg);
    }
    const fileOutput = await writeToFile(name, slug, template, outDir);
    f2.success(`${green(`${toPascal([typeArg])} "${slug}" created!`)}`);
    f2.message(`Emitted in ${dim(fileOutput)}`);
  } catch (e2) {
    f2.error(String(e2));
    await printNewHelp();
  }
  bye();
}
async function selectType() {
  const typeAnswer = await ie({
    message: "What would you like to create?",
    options: [
      { value: "component", label: "Component" },
      { value: "route", label: "Route" },
      { value: "markdown", label: "Route (Markdown)" },
      { value: "mdx", label: "Route (MDX)" }
    ]
  });
  if (lD(typeAnswer)) {
    bye();
  }
  return typeAnswer;
}
async function selectName(type) {
  const messages = {
    route: "New route path",
    markdown: "New Markdown route path",
    mdx: "New MDX route path",
    component: "Name your component"
  };
  const message = messages[type];
  const placeholders = {
    route: "/product/[id]",
    markdown: "/some/page" + MARKDOWN_SUFFIX,
    mdx: "/some/page" + MDX_SUFFIX,
    component: "my-component"
  };
  const placeholder = placeholders[type];
  const nameAnswer = await te({
    message,
    placeholder,
    validate: (v2) => {
      if (v2.length < 1) {
        return "Value can not be empty";
      }
    }
  });
  if (lD(nameAnswer)) {
    bye();
  }
  if (typeof nameAnswer !== "string") {
    bye();
  }
  let result = nameAnswer;
  if (type !== "component" && !nameAnswer.startsWith("/")) {
    result = `/${result}`;
  }
  if (type === "markdown") {
    result = result.replace(MARKDOWN_SUFFIX, "");
  } else if (type === "mdx") {
    result = result.replace(MDX_SUFFIX, "");
  }
  return result;
}
async function selectTemplate(typeArg) {
  const allTemplates = await loadTemplates();
  const templates2 = allTemplates.filter((i) => i[typeArg] && i[typeArg].length);
  if (!templates2.length) {
    f2.error(`No templates found for type "${typeArg}"`);
    bye();
  }
  if (templates2.length === 1) {
    return templates2[0][typeArg][0];
  }
  const templateAnswer = await ie({
    message: "Which template would you like to use?",
    options: templates2.map((t) => ({ value: t[typeArg][0], label: t.id }))
  });
  if (lD(templateAnswer)) {
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
  return list.join("-");
}
function toPascal(list) {
  return list.map((p) => p[0].toUpperCase() + p.substring(1)).join("");
}

// packages/create-qwik/src/helpers/jokes.json
var jokes_default = [
  ["What's the best thing about a Boolean?", "Even if you're wrong, you're only off by a bit."],
  ["Why did the developer stay at home?", "Because he couldn't find his keys."],
  ["How many programmers does it take to change a lightbulb?", "None that's a hardware problem"],
  ["A user interface is like a joke.", "If you have to explain it then it is not that good."],
  ["['hip', 'hip']", "(hip hip array)"],
  ["A SQL query goes into a bar, walks up to two tables and asks:", "'Can I JOIN you?'"],
  ["Why did the developer go to therapy?", "He had too many unresolved issues."],
  [
    "Why do C# and Java developers keep breaking their keyboards?",
    "Because they use a strongly typed language."
  ],
  ["What's the object-oriented way to become wealthy?", "Inheritance"],
  ["Where do programmers like to hangout?", "The Foo Bar."],
  ["Why do Java programmers wear glasses?", "Because they don't C#"],
  ["To understand what recursion is...", "You must first understand what recursion is"],
  ["The punchline often arrives before the set-up.", "Do you know the problem with UDP jokes?"],
  ["Why did the programmer quit his job?", "Because he didn't get arrays."],
  ["Why was the computer tired when it got home?", "It had a hard drive."],
  [
    "There are 10 types of people in this world...",
    "Those who understand binary and those who don't"
  ],
  ["Why do programmers always mix up Halloween and Christmas?", "Because Oct 31 == Dec 25"],
  ["I was gonna tell you a joke about UDP...", "...but you might not get it."],
  ["Normal People: give me just a second", "Developers: give me 1000 milliseconds!"],
  ["Why do programmers prefer dark mode?", "Because light attracts bugs."],
  ["Why don't programmers like nature?", "It has too many bugs."],
  ["Why was the computer freezing?", "It left its Windows open!"],
  ["What did the Java code say to the C code?", "You've got no class."],
  ["Why do programmers prefer the outdoors?", "Because it's free of bugs."],
  ["Why do programmers love movies?", "Because they can 'script' the ending."],
  ["why do desert animals hate Qwik?", "Because there's no hydration...."],
  ["What can you do if you cannot push your git changes?", "Use the --force, Luke"],
  ["How did the developer announce he's getting married?", "'She returned true!'"],
  ["How many Prolog programmers does it take to change a lightbulb?", "Yes."],
  ["Why did the developer ground their kid?", "They weren't telling the truthy"],
  ["!false", "It's funny 'cause it's true."],
  ["Where did the parallel function wash its hands?", "Async"],
  ["How do functions break up?", "They stop calling each other"],
  ["Why did the functions stop calling each other?", "Because they had constant arguments."],
  ["What's the second movie about a database engineer called?", "The SQL."],
  ["What did the computer do at lunchtime?", "NoSQL."],
  ["Why doesn't Hollywood make more Big Data movies?", "Had a byte!"],
  ["What does a baby computer call his father?", "Data!"],
  ["I never tell the same joke twice", "I have a DRY sense of humor."],
  ["How do programming pirates pass method parameters?", "ARRRRRGS."],
  ["Why don't bachelors like Git?", "Because they are afraid to commit."],
  ["Why do astronauts use Linux?", "They can't open Windows in space!"],
  ["How do front end devs like their brownies?", "GUI"],
  ["What do hackers do on a boat?", "Phishing."],
  ["Why couldn't the HTML list be trusted?", "There were LI's everywhere"],
  ["To the person who invented zero:", "Thank's for nothing!"],
  ["What do you call a bee that lives in America?", "A USB"],
  ["want about to a race conditions hear joke?", ""],
  ["What is a Package Managers favorite holiday?", "Dependency Day"],
  ["Where do we get all of these dad jokes from?", "A dad-a-base!"],
  ["What advice do you give to a JS developer who has never played baseball?", "Try catch."],
  ["We don't have any DNS jokes, know why?", "Because it may take 24 hours to get them"],
  ["Why do Front-End Developers eat lunch alone?", "Because they don't know how to join tables."],
  ["How do you help JS errors?", "You `console` them!"],
  ["When do front end developers go out to eat?", "On their lunch <br>."],
  ["What do you call optimistic front-end developers?", "Stack half-full developers."]
];

// packages/create-qwik/src/helpers/jokes.ts
function getRandomJoke() {
  const index = Math.floor(Math.random() * jokes_default.length);
  return jokes_default[index];
}

// packages/qwik/src/cli/joke/run-joke-command.ts
async function runJokeCommand() {
  const [setup, punchline] = getRandomJoke();
  note(magenta(`${setup.trim()}
${punchline.trim()}`), "\u{1F648}");
}

// node_modules/.pnpm/execa@8.0.1/node_modules/execa/index.js
var import_node_buffer2 = require("node:buffer");
var import_node_path9 = __toESM(require("node:path"), 1);
var import_node_child_process3 = __toESM(require("node:child_process"), 1);
var import_node_process6 = __toESM(require("node:process"), 1);
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

// node_modules/.pnpm/npm-run-path@5.3.0/node_modules/npm-run-path/index.js
var import_node_process3 = __toESM(require("node:process"), 1);
var import_node_path8 = __toESM(require("node:path"), 1);
var import_node_url = require("node:url");

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

// node_modules/.pnpm/npm-run-path@5.3.0/node_modules/npm-run-path/index.js
var npmRunPath = ({
  cwd = import_node_process3.default.cwd(),
  path: pathOption = import_node_process3.default.env[pathKey()],
  preferLocal = true,
  execPath = import_node_process3.default.execPath,
  addExecPath = true
} = {}) => {
  const cwdString = cwd instanceof URL ? (0, import_node_url.fileURLToPath)(cwd) : cwd;
  const cwdPath = import_node_path8.default.resolve(cwdString);
  const result = [];
  if (preferLocal) {
    applyPreferLocal(result, cwdPath);
  }
  if (addExecPath) {
    applyExecPath(result, execPath, cwdPath);
  }
  return [...result, pathOption].join(import_node_path8.default.delimiter);
};
var applyPreferLocal = (result, cwdPath) => {
  let previous;
  while (previous !== cwdPath) {
    result.push(import_node_path8.default.join(cwdPath, "node_modules/.bin"));
    previous = cwdPath;
    cwdPath = import_node_path8.default.resolve(cwdPath, "..");
  }
};
var applyExecPath = (result, execPath, cwdPath) => {
  const execPathString = execPath instanceof URL ? (0, import_node_url.fileURLToPath)(execPath) : execPath;
  result.push(import_node_path8.default.resolve(cwdPath, execPathString, ".."));
};
var npmRunPathEnv = ({ env = import_node_process3.default.env, ...options } = {}) => {
  env = { ...env };
  const pathName = pathKey({ env });
  options.path = env[pathName];
  env[pathName] = npmRunPath(options);
  return env;
};

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

// node_modules/.pnpm/execa@8.0.1/node_modules/execa/lib/error.js
var import_node_process4 = __toESM(require("node:process"), 1);

// node_modules/.pnpm/human-signals@5.0.0/node_modules/human-signals/build/src/main.js
var import_node_os2 = require("node:os");

// node_modules/.pnpm/human-signals@5.0.0/node_modules/human-signals/build/src/realtime.js
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

// node_modules/.pnpm/human-signals@5.0.0/node_modules/human-signals/build/src/signals.js
var import_node_os = require("node:os");

// node_modules/.pnpm/human-signals@5.0.0/node_modules/human-signals/build/src/core.js
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

// node_modules/.pnpm/human-signals@5.0.0/node_modules/human-signals/build/src/signals.js
var getSignals = () => {
  const realtimeSignals = getRealtimeSignals();
  const signals2 = [...SIGNALS, ...realtimeSignals].map(normalizeSignal);
  return signals2;
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

// node_modules/.pnpm/human-signals@5.0.0/node_modules/human-signals/build/src/main.js
var getSignalsByName = () => {
  const signals2 = getSignals();
  return Object.fromEntries(signals2.map(getSignalByName));
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
  const signals2 = getSignals();
  const length = SIGRTMAX + 1;
  const signalsA = Array.from(
    { length },
    (value, number) => getSignalByNumber(number, signals2)
  );
  return Object.assign({}, ...signalsA);
};
var getSignalByNumber = (number, signals2) => {
  const signal = findSignalByNumber(number, signals2);
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
var findSignalByNumber = (number, signals2) => {
  const signal = signals2.find(({ name }) => import_node_os2.constants.signals[name] === number);
  if (signal !== void 0) {
    return signal;
  }
  return signals2.find((signalA) => signalA.number === number);
};
var signalsByNumber = getSignalsByNumber();

// node_modules/.pnpm/execa@8.0.1/node_modules/execa/lib/error.js
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
  parsed: { options: { timeout, cwd = import_node_process4.default.cwd() } }
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
  error.cwd = cwd;
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

// node_modules/.pnpm/execa@8.0.1/node_modules/execa/lib/stdio.js
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

// node_modules/.pnpm/execa@8.0.1/node_modules/execa/lib/kill.js
var import_node_os3 = __toESM(require("node:os"), 1);

// node_modules/.pnpm/signal-exit@4.1.0/node_modules/signal-exit/dist/mjs/signals.js
var signals = [];
signals.push("SIGHUP", "SIGINT", "SIGTERM");
if (process.platform !== "win32") {
  signals.push(
    "SIGALRM",
    "SIGABRT",
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
  signals.push("SIGIO", "SIGPOLL", "SIGPWR", "SIGSTKFLT");
}

// node_modules/.pnpm/signal-exit@4.1.0/node_modules/signal-exit/dist/mjs/index.js
var processOk = (process7) => !!process7 && typeof process7 === "object" && typeof process7.removeListener === "function" && typeof process7.emit === "function" && typeof process7.reallyExit === "function" && typeof process7.listeners === "function" && typeof process7.kill === "function" && typeof process7.pid === "number" && typeof process7.on === "function";
var kExitEmitter = Symbol.for("signal-exit emitter");
var global2 = globalThis;
var ObjectDefineProperty = Object.defineProperty.bind(Object);
var Emitter = class {
  emitted = {
    afterExit: false,
    exit: false
  };
  listeners = {
    afterExit: [],
    exit: []
  };
  count = 0;
  id = Math.random();
  constructor() {
    if (global2[kExitEmitter]) {
      return global2[kExitEmitter];
    }
    ObjectDefineProperty(global2, kExitEmitter, {
      value: this,
      writable: false,
      enumerable: false,
      configurable: false
    });
  }
  on(ev, fn) {
    this.listeners[ev].push(fn);
  }
  removeListener(ev, fn) {
    const list = this.listeners[ev];
    const i = list.indexOf(fn);
    if (i === -1) {
      return;
    }
    if (i === 0 && list.length === 1) {
      list.length = 0;
    } else {
      list.splice(i, 1);
    }
  }
  emit(ev, code, signal) {
    if (this.emitted[ev]) {
      return false;
    }
    this.emitted[ev] = true;
    let ret = false;
    for (const fn of this.listeners[ev]) {
      ret = fn(code, signal) === true || ret;
    }
    if (ev === "exit") {
      ret = this.emit("afterExit", code, signal) || ret;
    }
    return ret;
  }
};
var SignalExitBase = class {
};
var signalExitWrap = (handler) => {
  return {
    onExit(cb, opts) {
      return handler.onExit(cb, opts);
    },
    load() {
      return handler.load();
    },
    unload() {
      return handler.unload();
    }
  };
};
var SignalExitFallback = class extends SignalExitBase {
  onExit() {
    return () => {
    };
  }
  load() {
  }
  unload() {
  }
};
var SignalExit = class extends SignalExitBase {
  // "SIGHUP" throws an `ENOSYS` error on Windows,
  // so use a supported signal instead
  /* c8 ignore start */
  #hupSig = process4.platform === "win32" ? "SIGINT" : "SIGHUP";
  /* c8 ignore stop */
  #emitter = new Emitter();
  #process;
  #originalProcessEmit;
  #originalProcessReallyExit;
  #sigListeners = {};
  #loaded = false;
  constructor(process7) {
    super();
    this.#process = process7;
    this.#sigListeners = {};
    for (const sig of signals) {
      this.#sigListeners[sig] = () => {
        const listeners = this.#process.listeners(sig);
        let { count } = this.#emitter;
        const p = process7;
        if (typeof p.__signal_exit_emitter__ === "object" && typeof p.__signal_exit_emitter__.count === "number") {
          count += p.__signal_exit_emitter__.count;
        }
        if (listeners.length === count) {
          this.unload();
          const ret = this.#emitter.emit("exit", null, sig);
          const s2 = sig === "SIGHUP" ? this.#hupSig : sig;
          if (!ret)
            process7.kill(process7.pid, s2);
        }
      };
    }
    this.#originalProcessReallyExit = process7.reallyExit;
    this.#originalProcessEmit = process7.emit;
  }
  onExit(cb, opts) {
    if (!processOk(this.#process)) {
      return () => {
      };
    }
    if (this.#loaded === false) {
      this.load();
    }
    const ev = (opts == null ? void 0 : opts.alwaysLast) ? "afterExit" : "exit";
    this.#emitter.on(ev, cb);
    return () => {
      this.#emitter.removeListener(ev, cb);
      if (this.#emitter.listeners["exit"].length === 0 && this.#emitter.listeners["afterExit"].length === 0) {
        this.unload();
      }
    };
  }
  load() {
    if (this.#loaded) {
      return;
    }
    this.#loaded = true;
    this.#emitter.count += 1;
    for (const sig of signals) {
      try {
        const fn = this.#sigListeners[sig];
        if (fn)
          this.#process.on(sig, fn);
      } catch (_3) {
      }
    }
    this.#process.emit = (ev, ...a3) => {
      return this.#processEmit(ev, ...a3);
    };
    this.#process.reallyExit = (code) => {
      return this.#processReallyExit(code);
    };
  }
  unload() {
    if (!this.#loaded) {
      return;
    }
    this.#loaded = false;
    signals.forEach((sig) => {
      const listener = this.#sigListeners[sig];
      if (!listener) {
        throw new Error("Listener not defined for signal: " + sig);
      }
      try {
        this.#process.removeListener(sig, listener);
      } catch (_3) {
      }
    });
    this.#process.emit = this.#originalProcessEmit;
    this.#process.reallyExit = this.#originalProcessReallyExit;
    this.#emitter.count -= 1;
  }
  #processReallyExit(code) {
    if (!processOk(this.#process)) {
      return 0;
    }
    this.#process.exitCode = code || 0;
    this.#emitter.emit("exit", this.#process.exitCode, null);
    return this.#originalProcessReallyExit.call(this.#process, this.#process.exitCode);
  }
  #processEmit(ev, ...args) {
    const og = this.#originalProcessEmit;
    if (ev === "exit" && processOk(this.#process)) {
      if (typeof args[0] === "number") {
        this.#process.exitCode = args[0];
      }
      const ret = og.call(this.#process, ev, ...args);
      this.#emitter.emit("exit", this.#process.exitCode, null);
      return ret;
    } else {
      return og.call(this.#process, ev, ...args);
    }
  }
};
var process4 = globalThis.process;
var {
  /**
   * Called when the process is exiting, whether via signal, explicit
   * exit, or running out of stuff to do.
   *
   * If the global process object is not suitable for instrumentation,
   * then this will be a no-op.
   *
   * Returns a function that may be used to unload signal-exit.
   */
  onExit,
  /**
   * Load the listeners.  Likely you never need to call this, unless
   * doing a rather deep integration with signal-exit functionality.
   * Mostly exposed for the benefit of testing.
   *
   * @internal
   */
  load,
  /**
   * Unload the listeners.  Likely you never need to call this, unless
   * doing a rather deep integration with signal-exit functionality.
   * Mostly exposed for the benefit of testing.
   *
   * @internal
   */
  unload
} = signalExitWrap(processOk(process4) ? new SignalExit(process4) : new SignalExitFallback());

// node_modules/.pnpm/execa@8.0.1/node_modules/execa/lib/kill.js
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
  const removeExitHandler = onExit(() => {
    spawned.kill();
  });
  return timedPromise.finally(() => {
    removeExitHandler();
  });
};

// node_modules/.pnpm/execa@8.0.1/node_modules/execa/lib/pipe.js
var import_node_fs8 = require("node:fs");
var import_node_child_process = require("node:child_process");

// node_modules/.pnpm/is-stream@3.0.0/node_modules/is-stream/index.js
function isStream(stream) {
  return stream !== null && typeof stream === "object" && typeof stream.pipe === "function";
}
function isWritableStream(stream) {
  return isStream(stream) && stream.writable !== false && typeof stream._write === "function" && typeof stream._writableState === "object";
}

// node_modules/.pnpm/execa@8.0.1/node_modules/execa/lib/pipe.js
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

// node_modules/.pnpm/execa@8.0.1/node_modules/execa/lib/stream.js
var import_node_fs9 = require("node:fs");
var import_promises = require("node:timers/promises");

// node_modules/.pnpm/get-stream@8.0.1/node_modules/get-stream/source/contents.js
var getStreamContents = async (stream, { init: init2, convertChunk, getSize, truncateChunk, addChunk, getFinalChunk, finalize }, { maxBuffer = Number.POSITIVE_INFINITY } = {}) => {
  if (!isAsyncIterable(stream)) {
    throw new Error("The first argument must be a Readable, a ReadableStream, or an async iterable.");
  }
  const state = init2();
  state.length = 0;
  try {
    for await (const chunk of stream) {
      const chunkType = getChunkType(chunk);
      const convertedChunk = convertChunk[chunkType](chunk, state);
      appendChunk({ convertedChunk, state, getSize, truncateChunk, addChunk, maxBuffer });
    }
    appendFinalChunk({ state, convertChunk, getSize, truncateChunk, addChunk, getFinalChunk, maxBuffer });
    return finalize(state);
  } catch (error) {
    error.bufferedData = finalize(state);
    throw error;
  }
};
var appendFinalChunk = ({ state, getSize, truncateChunk, addChunk, getFinalChunk, maxBuffer }) => {
  const convertedChunk = getFinalChunk(state);
  if (convertedChunk !== void 0) {
    appendChunk({ convertedChunk, state, getSize, truncateChunk, addChunk, maxBuffer });
  }
};
var appendChunk = ({ convertedChunk, state, getSize, truncateChunk, addChunk, maxBuffer }) => {
  const chunkSize = getSize(convertedChunk);
  const newLength = state.length + chunkSize;
  if (newLength <= maxBuffer) {
    addNewChunk(convertedChunk, state, addChunk, newLength);
    return;
  }
  const truncatedChunk = truncateChunk(convertedChunk, maxBuffer - state.length);
  if (truncatedChunk !== void 0) {
    addNewChunk(truncatedChunk, state, addChunk, maxBuffer);
  }
  throw new MaxBufferError();
};
var addNewChunk = (convertedChunk, state, addChunk, newLength) => {
  state.contents = addChunk(convertedChunk, state, newLength);
  state.length = newLength;
};
var isAsyncIterable = (stream) => typeof stream === "object" && stream !== null && typeof stream[Symbol.asyncIterator] === "function";
var getChunkType = (chunk) => {
  var _a;
  const typeOfChunk = typeof chunk;
  if (typeOfChunk === "string") {
    return "string";
  }
  if (typeOfChunk !== "object" || chunk === null) {
    return "others";
  }
  if ((_a = globalThis.Buffer) == null ? void 0 : _a.isBuffer(chunk)) {
    return "buffer";
  }
  const prototypeName = objectToString.call(chunk);
  if (prototypeName === "[object ArrayBuffer]") {
    return "arrayBuffer";
  }
  if (prototypeName === "[object DataView]") {
    return "dataView";
  }
  if (Number.isInteger(chunk.byteLength) && Number.isInteger(chunk.byteOffset) && objectToString.call(chunk.buffer) === "[object ArrayBuffer]") {
    return "typedArray";
  }
  return "others";
};
var { toString: objectToString } = Object.prototype;
var MaxBufferError = class extends Error {
  name = "MaxBufferError";
  constructor() {
    super("maxBuffer exceeded");
  }
};

// node_modules/.pnpm/get-stream@8.0.1/node_modules/get-stream/source/utils.js
var identity = (value) => value;
var noop = () => void 0;
var getContentsProp = ({ contents }) => contents;
var throwObjectStream = (chunk) => {
  throw new Error(`Streams in object mode are not supported: ${String(chunk)}`);
};
var getLengthProp = (convertedChunk) => convertedChunk.length;

// node_modules/.pnpm/get-stream@8.0.1/node_modules/get-stream/source/array-buffer.js
async function getStreamAsArrayBuffer(stream, options) {
  return getStreamContents(stream, arrayBufferMethods, options);
}
var initArrayBuffer = () => ({ contents: new ArrayBuffer(0) });
var useTextEncoder = (chunk) => textEncoder.encode(chunk);
var textEncoder = new TextEncoder();
var useUint8Array = (chunk) => new Uint8Array(chunk);
var useUint8ArrayWithOffset = (chunk) => new Uint8Array(chunk.buffer, chunk.byteOffset, chunk.byteLength);
var truncateArrayBufferChunk = (convertedChunk, chunkSize) => convertedChunk.slice(0, chunkSize);
var addArrayBufferChunk = (convertedChunk, { contents, length: previousLength }, length) => {
  const newContents = hasArrayBufferResize() ? resizeArrayBuffer(contents, length) : resizeArrayBufferSlow(contents, length);
  new Uint8Array(newContents).set(convertedChunk, previousLength);
  return newContents;
};
var resizeArrayBufferSlow = (contents, length) => {
  if (length <= contents.byteLength) {
    return contents;
  }
  const arrayBuffer = new ArrayBuffer(getNewContentsLength(length));
  new Uint8Array(arrayBuffer).set(new Uint8Array(contents), 0);
  return arrayBuffer;
};
var resizeArrayBuffer = (contents, length) => {
  if (length <= contents.maxByteLength) {
    contents.resize(length);
    return contents;
  }
  const arrayBuffer = new ArrayBuffer(length, { maxByteLength: getNewContentsLength(length) });
  new Uint8Array(arrayBuffer).set(new Uint8Array(contents), 0);
  return arrayBuffer;
};
var getNewContentsLength = (length) => SCALE_FACTOR ** Math.ceil(Math.log(length) / Math.log(SCALE_FACTOR));
var SCALE_FACTOR = 2;
var finalizeArrayBuffer = ({ contents, length }) => hasArrayBufferResize() ? contents : contents.slice(0, length);
var hasArrayBufferResize = () => "resize" in ArrayBuffer.prototype;
var arrayBufferMethods = {
  init: initArrayBuffer,
  convertChunk: {
    string: useTextEncoder,
    buffer: useUint8Array,
    arrayBuffer: useUint8Array,
    dataView: useUint8ArrayWithOffset,
    typedArray: useUint8ArrayWithOffset,
    others: throwObjectStream
  },
  getSize: getLengthProp,
  truncateChunk: truncateArrayBufferChunk,
  addChunk: addArrayBufferChunk,
  getFinalChunk: noop,
  finalize: finalizeArrayBuffer
};

// node_modules/.pnpm/get-stream@8.0.1/node_modules/get-stream/source/buffer.js
async function getStreamAsBuffer(stream, options) {
  if (!("Buffer" in globalThis)) {
    throw new Error("getStreamAsBuffer() is only supported in Node.js");
  }
  try {
    return arrayBufferToNodeBuffer(await getStreamAsArrayBuffer(stream, options));
  } catch (error) {
    if (error.bufferedData !== void 0) {
      error.bufferedData = arrayBufferToNodeBuffer(error.bufferedData);
    }
    throw error;
  }
}
var arrayBufferToNodeBuffer = (arrayBuffer) => globalThis.Buffer.from(arrayBuffer);

// node_modules/.pnpm/get-stream@8.0.1/node_modules/get-stream/source/string.js
async function getStreamAsString(stream, options) {
  return getStreamContents(stream, stringMethods, options);
}
var initString = () => ({ contents: "", textDecoder: new TextDecoder() });
var useTextDecoder = (chunk, { textDecoder }) => textDecoder.decode(chunk, { stream: true });
var addStringChunk = (convertedChunk, { contents }) => contents + convertedChunk;
var truncateStringChunk = (convertedChunk, chunkSize) => convertedChunk.slice(0, chunkSize);
var getFinalStringChunk = ({ textDecoder }) => {
  const finalChunk = textDecoder.decode();
  return finalChunk === "" ? void 0 : finalChunk;
};
var stringMethods = {
  init: initString,
  convertChunk: {
    string: identity,
    buffer: useTextDecoder,
    arrayBuffer: useTextDecoder,
    dataView: useTextDecoder,
    typedArray: useTextDecoder,
    others: throwObjectStream
  },
  getSize: getLengthProp,
  truncateChunk: truncateStringChunk,
  addChunk: addStringChunk,
  getFinalChunk: getFinalStringChunk,
  finalize: getContentsProp
};

// node_modules/.pnpm/execa@8.0.1/node_modules/execa/lib/stream.js
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
  await (0, import_promises.setTimeout)(0);
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
  if (encoding === "utf8" || encoding === "utf-8") {
    return getStreamAsString(stream, { maxBuffer });
  }
  if (encoding === null || encoding === "buffer") {
    return getStreamAsBuffer(stream, { maxBuffer });
  }
  return applyEncoding(stream, maxBuffer, encoding);
};
var applyEncoding = async (stream, maxBuffer, encoding) => {
  const buffer = await getStreamAsBuffer(stream, { maxBuffer });
  return buffer.toString(encoding);
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

// node_modules/.pnpm/execa@8.0.1/node_modules/execa/lib/promise.js
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

// node_modules/.pnpm/execa@8.0.1/node_modules/execa/lib/command.js
var import_node_buffer = require("node:buffer");
var import_node_child_process2 = require("node:child_process");
var normalizeArgs = (file, args = []) => {
  if (!Array.isArray(args)) {
    return [file];
  }
  return [file, ...args];
};
var NO_ESCAPE_REGEXP = /^[\w.-]+$/;
var escapeArg = (arg) => {
  if (typeof arg !== "string" || NO_ESCAPE_REGEXP.test(arg)) {
    return arg;
  }
  return `"${arg.replaceAll('"', '\\"')}"`;
};
var joinCommand = (file, args) => normalizeArgs(file, args).join(" ");
var getEscapedCommand = (file, args) => normalizeArgs(file, args).map((arg) => escapeArg(arg)).join(" ");
var SPACES_REGEXP = / +/g;
var parseCommand = (command) => {
  const tokens = [];
  for (const token of command.trim().split(SPACES_REGEXP)) {
    const previousToken = tokens.at(-1);
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
  `${tokens.at(-1)}${nextTokens[0]}`,
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

// node_modules/.pnpm/execa@8.0.1/node_modules/execa/lib/verbose.js
var import_node_util = require("node:util");
var import_node_process5 = __toESM(require("node:process"), 1);
var verboseDefault = (0, import_node_util.debuglog)("execa").enabled;
var padField = (field, padding) => String(field).padStart(padding, "0");
var getTimestamp = () => {
  const date = /* @__PURE__ */ new Date();
  return `${padField(date.getHours(), 2)}:${padField(date.getMinutes(), 2)}:${padField(date.getSeconds(), 2)}.${padField(date.getMilliseconds(), 3)}`;
};
var logCommand = (escapedCommand, { verbose }) => {
  if (!verbose) {
    return;
  }
  import_node_process5.default.stderr.write(`[${getTimestamp()}] ${escapedCommand}
`);
};

// node_modules/.pnpm/execa@8.0.1/node_modules/execa/index.js
var DEFAULT_MAX_BUFFER = 1e3 * 1e3 * 100;
var getEnv = ({ env: envOption, extendEnv, preferLocal, localDir, execPath }) => {
  const env = extendEnv ? { ...import_node_process6.default.env, ...envOption } : envOption;
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
    localDir: options.cwd || import_node_process6.default.cwd(),
    execPath: import_node_process6.default.execPath,
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
  if (import_node_process6.default.platform === "win32" && import_node_path9.default.basename(file, ".exe") === "cmd") {
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

// packages/qwik/src/cli/utils/run-build-command.ts
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
  const prebuildScripts = Object.keys(pkgJsonScripts).filter((s2) => s2.startsWith("prebuild.")).map(getScript).filter(isString);
  const postbuildScripts = Object.keys(pkgJsonScripts).filter((s2) => s2.startsWith("postbuild.")).map(getScript).filter(isString);
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
        stderr: "inherit",
        env: {
          FORCE_COLOR: "true"
        }
      });
    } catch (e2) {
      console.error(script, "failed");
      process.exitCode = 1;
      throw e2;
    }
  }
  if (buildTypes) {
    let copyScript = buildTypes;
    if (!copyScript.includes("--pretty")) {
      copyScript += " --pretty";
    }
    typecheck = execaCommand(copyScript, {
      stdout: "inherit",
      stderr: "inherit",
      cwd: app.rootDir
    }).then(() => ({
      title: "Type checked"
    })).catch((e2) => {
      let out = e2.stdout || "";
      if (out.startsWith("tsc")) {
        out = out.slice(3);
      }
      console.log("\n" + out);
      process.exitCode = 1;
      throw new Error(`Type check failed: ${out}`);
    });
  }
  if (buildClientScript) {
    const script = attachArg(buildClientScript, "mode", mode);
    await execaCommand(script, {
      stdout: "inherit",
      stderr: "inherit",
      cwd: app.rootDir
    }).catch((error) => {
      process.exitCode = 1;
      throw new Error(`Client build failed: ${error}`);
    });
    console.log(``);
    console.log(`${cyan("\u2713")} Built client modules`);
  }
  const step2 = [];
  if (buildLibScript) {
    const script = attachArg(buildLibScript, "mode", mode);
    const libBuild = execaCommand(script, {
      stdout: "inherit",
      stderr: "inherit",
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
      process.exitCode = 1;
      throw e2;
    });
    step2.push(libBuild);
  }
  if (buildPreviewScript) {
    const script = attachArg(buildPreviewScript, "mode", mode);
    const previewBuild = execaCommand(script, {
      stdout: "inherit",
      stderr: "inherit",
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
      process.exitCode = 1;
      throw e2;
    });
    step2.push(previewBuild);
  }
  if (buildServerScript) {
    const script = attachArg(buildServerScript, "mode", mode);
    const serverBuild = execaCommand(script, {
      stdout: "inherit",
      stderr: "inherit",
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
      process.exitCode = 1;
      throw e2;
    });
    step2.push(serverBuild);
  }
  if (buildStaticScript) {
    const staticBuild = execaCommand(buildStaticScript, {
      stdout: "inherit",
      stderr: "inherit",
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
      process.exitCode = 1;
      throw e2;
    });
    step2.push(staticBuild);
  }
  if (typecheck) {
    step2.push(typecheck);
  }
  if (lint) {
    const lintBuild = execaCommand(lint, {
      stdout: "inherit",
      stderr: "inherit",
      cwd: app.rootDir,
      env: {
        FORCE_COLOR: "true"
      }
    }).then(() => ({
      title: "Lint checked"
    })).catch((e2) => {
      console.log(``);
      console.log(e2.stdout);
      console.error(e2.stderr);
      console.log(``);
      process.exitCode = 1;
      throw e2;
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
          stdout: "inherit",
          stderr: "inherit",
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
          process.exitCode = 1;
        });
      }
    }).catch((error) => console.log(red(error)));
  }
  for (const script of postbuildScripts) {
    try {
      await execaCommand(script, {
        stdout: "inherit",
        stderr: "inherit",
        cwd: app.rootDir,
        env: {
          FORCE_COLOR: "true"
        }
      });
    } catch (e2) {
      console.error(script, "failed");
      process.exitCode = 1;
      throw e2;
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
function isString(s2) {
  return typeof s2 === "string" && s2.trim().length > 0;
}

// packages/qwik/src/cli/run.ts
init_dist2();

// packages/qwik/src/cli/migrate-v2/run-migration.ts
init_dist2();

// packages/qwik/src/cli/migrate-v2/replace-package.ts
var import_path5 = require("path");

// packages/qwik/src/cli/migrate-v2/tools/binary-extensions.ts
var import_path3 = require("path");
var binaryExtensions = /* @__PURE__ */ new Set([
  // types originally from https://github.com/sindresorhus/binary-extensions/blob/40e44b510d87a63dcf42300bc8fbcb105f45a61c/binary-extensions.json
  ".3dm",
  ".3ds",
  ".3g2",
  ".3gp",
  ".7z",
  ".a",
  ".aac",
  ".adp",
  ".ai",
  ".aif",
  ".aiff",
  ".als",
  ".alz",
  ".ape",
  ".apk",
  ".appimage",
  ".ar",
  ".arj",
  ".asf",
  ".au",
  ".avi",
  ".bak",
  ".baml",
  ".bh",
  ".bin",
  ".bk",
  ".bmp",
  ".btif",
  ".bz2",
  ".bzip2",
  ".cab",
  ".caf",
  ".cgm",
  ".class",
  ".cmx",
  ".cpio",
  ".cr2",
  ".cur",
  ".dat",
  ".dcm",
  ".deb",
  ".dex",
  ".djvu",
  ".dll",
  ".dmg",
  ".dng",
  ".doc",
  ".docm",
  ".docx",
  ".dot",
  ".dotm",
  ".dra",
  ".DS_Store",
  ".dsk",
  ".dts",
  ".dtshd",
  ".dvb",
  ".dwg",
  ".dxf",
  ".ecelp4800",
  ".ecelp7470",
  ".ecelp9600",
  ".egg",
  ".eol",
  ".eot",
  ".epub",
  ".exe",
  ".f4v",
  ".fbs",
  ".fh",
  ".fla",
  ".flac",
  ".flatpak",
  ".fli",
  ".flv",
  ".fpx",
  ".fst",
  ".fvt",
  ".g3",
  ".gh",
  ".gif",
  ".glb",
  ".graffle",
  ".gz",
  ".gzip",
  ".h261",
  ".h263",
  ".h264",
  ".icns",
  ".ico",
  ".ief",
  ".img",
  ".ipa",
  ".iso",
  ".jar",
  ".jpeg",
  ".jpg",
  ".jpgv",
  ".jpm",
  ".jxr",
  ".key",
  ".keystore",
  ".ktx",
  ".lha",
  ".lib",
  ".lvp",
  ".lz",
  ".lzh",
  ".lzma",
  ".lzo",
  ".m3u",
  ".m4a",
  ".m4v",
  ".mar",
  ".mdi",
  ".mht",
  ".mid",
  ".midi",
  ".mj2",
  ".mka",
  ".mkv",
  ".mmr",
  ".mng",
  ".mobi",
  ".mov",
  ".movie",
  ".mp3",
  ".mp4",
  ".mp4a",
  ".mpeg",
  ".mpg",
  ".mpga",
  ".msi",
  ".mxu",
  ".nef",
  ".npx",
  ".npy",
  ".numbers",
  ".nupkg",
  ".o",
  ".odp",
  ".ods",
  ".odt",
  ".oga",
  ".ogg",
  ".ogv",
  ".otf",
  ".ott",
  ".pages",
  ".pbm",
  ".pbf",
  ".pcx",
  ".pdb",
  ".pdf",
  ".pea",
  ".pgm",
  ".pic",
  ".pkg",
  ".plist",
  ".png",
  ".pnm",
  ".pot",
  ".potm",
  ".potx",
  ".ppa",
  ".ppam",
  ".ppm",
  ".pps",
  ".ppsm",
  ".ppsx",
  ".ppt",
  ".pptm",
  ".pptx",
  ".psd",
  ".pxd",
  ".pxz",
  ".pya",
  ".pyc",
  ".pyo",
  ".pyv",
  ".qt",
  ".rar",
  ".ras",
  ".raw",
  ".resources",
  ".rgb",
  ".rip",
  ".rlc",
  ".rmf",
  ".rmvb",
  ".rpm",
  ".rtf",
  ".rz",
  ".s3m",
  ".s7z",
  ".scpt",
  ".sgi",
  ".shar",
  ".snap",
  ".sil",
  ".sketch",
  ".slk",
  ".smv",
  ".snk",
  ".so",
  ".stl",
  ".suo",
  ".sub",
  ".swf",
  ".tar",
  ".tbz",
  ".tbz2",
  ".tga",
  ".tgz",
  ".thmx",
  ".tif",
  ".tiff",
  ".tlz",
  ".ttc",
  ".ttf",
  ".txz",
  ".udf",
  ".uvh",
  ".uvi",
  ".uvm",
  ".uvp",
  ".uvs",
  ".uvu",
  ".viv",
  ".vob",
  ".war",
  ".wav",
  ".wax",
  ".wbmp",
  ".wdp",
  ".weba",
  ".webm",
  ".webp",
  ".whl",
  ".wim",
  ".wm",
  ".wma",
  ".wmv",
  ".wmx",
  ".woff",
  ".woff2",
  ".wrm",
  ".wvx",
  ".xbm",
  ".xif",
  ".xla",
  ".xlam",
  ".xls",
  ".xlsb",
  ".xlsm",
  ".xlsx",
  ".xlt",
  ".xltm",
  ".xltx",
  ".xm",
  ".xmind",
  ".xpi",
  ".xpm",
  ".xwd",
  ".xz",
  ".z",
  ".zip",
  ".zipx"
]);
function isBinaryPath(path3) {
  return binaryExtensions.has((0, import_path3.extname)(path3).toLowerCase());
}

// packages/qwik/src/cli/migrate-v2/replace-package.ts
init_visit_not_ignored_files();
var import_fs3 = require("fs");
init_dist2();
function updateFileContent(path3, content) {
  (0, import_fs3.writeFileSync)(path3, content);
  f2.info(`"${path3}" has been updated`);
}
function replacePackage(oldPackageName, newPackageName, skipDependencies = false) {
  if (!skipDependencies) {
    replacePackageInDependencies(oldPackageName, newPackageName);
  }
  replaceMentions(oldPackageName, newPackageName);
}
function replacePackageInDependencies(oldPackageName, newPackageName) {
  visitNotIgnoredFiles(".", (path3) => {
    if ((0, import_path5.basename)(path3) !== "package.json") {
      return;
    }
    try {
      const packageJson = JSON.parse((0, import_fs3.readFileSync)(path3, "utf-8"));
      for (const deps of [
        packageJson.dependencies ?? {},
        packageJson.devDependencies ?? {},
        packageJson.peerDependencies ?? {},
        packageJson.optionalDependencies ?? {}
      ]) {
        if (oldPackageName in deps) {
          deps[newPackageName] = deps[oldPackageName];
          delete deps[oldPackageName];
        }
      }
      updateFileContent(path3, JSON.stringify(packageJson, null, 2));
    } catch (e2) {
      console.warn(`Could not replace ${oldPackageName} with ${newPackageName} in ${path3}.`);
    }
  });
}
function replaceMentions(oldPackageName, newPackageName) {
  visitNotIgnoredFiles(".", (path3) => {
    if (isBinaryPath(path3)) {
      return;
    }
    const ignoredFiles = [
      "yarn.lock",
      "package-lock.json",
      "pnpm-lock.yaml",
      "bun.lockb",
      "CHANGELOG.md"
    ];
    if (ignoredFiles.includes((0, import_path5.basename)(path3))) {
      return;
    }
    try {
      const contents = (0, import_fs3.readFileSync)(path3, "utf-8");
      if (!contents.includes(oldPackageName)) {
        return;
      }
      updateFileContent(path3, contents.replace(new RegExp(oldPackageName, "g"), newPackageName));
    } catch {
      f2.warn(
        `An error was thrown when trying to update ${path3}. If you believe the migration should have updated it, be sure to review the file and open an issue.`
      );
    }
  });
}

// packages/qwik/src/cli/migrate-v2/update-dependencies.ts
var import_node_child_process4 = require("node:child_process");

// packages/qwik/src/cli/migrate-v2/versions.ts
var versionTagPriority = ["latest", "v2", "rc", "beta", "alpha"];
var packageNames = [
  "@qwik.dev/core",
  "@qwik.dev/router",
  "@qwik.dev/react",
  "eslint-plugin-qwik"
];

// packages/qwik/src/cli/migrate-v2/update-dependencies.ts
var import_semver = require("semver");
init_dist2();
async function updateDependencies() {
  const packageJson = await readPackageJson(process.cwd());
  const version = getPackageTag();
  const dependencyNames = [
    "dependencies",
    "devDependencies",
    "peerDependencies",
    "optionalDependencies"
  ];
  for (const name of packageNames) {
    for (const propName of dependencyNames) {
      const prop = packageJson[propName];
      if (prop && prop[name]) {
        prop[name] = version;
      }
    }
  }
  await writePackageJson(process.cwd(), packageJson);
  const loading = de();
  loading.start(`Updating dependencies...`);
  await runInstall();
  loading.stop("Dependencies have been updated");
}
function getPackageTag() {
  var _a;
  const tags = (_a = (0, import_node_child_process4.execSync)("npm dist-tag @qwik.dev/core", {
    encoding: "utf-8"
  })) == null ? void 0 : _a.split("\n").filter(Boolean).map(
    (data) => data.split(":").map((v2) => v2 == null ? void 0 : v2.trim()).filter(Boolean)
  ).filter((v2) => v2.length === 2).sort((a3, b3) => {
    let aIndex = versionTagPriority.indexOf(a3[0]);
    let bIndex = versionTagPriority.indexOf(b3[0]);
    if (aIndex === -1) {
      aIndex = Infinity;
    } else if (bIndex === -1) {
      bIndex = Infinity;
    }
    return aIndex - bIndex;
  });
  for (const [, version] of tags) {
    if ((0, import_semver.major)(version) === 2) {
      return version;
    }
  }
  f2.warn('Failed to resolve the Qwik version tag, version "2.0.0" will be installed');
  return "2.0.0";
}
async function installTsMorph() {
  var _a, _b;
  const packageJson = await readPackageJson(process.cwd());
  if (((_a = packageJson.dependencies) == null ? void 0 : _a["ts-morph"]) || ((_b = packageJson.devDependencies) == null ? void 0 : _b["ts-morph"])) {
    return false;
  }
  const loading = de();
  loading.start("Fetching migration tools..");
  (packageJson.devDependencies ??= {})["ts-morph"] = "latest";
  await writePackageJson(process.cwd(), packageJson);
  await runInstall();
  loading.stop("Migration tools have been loaded");
  return true;
}
async function runInstall() {
  const { install } = installDeps(getPackageManager(), process.cwd());
  const passed = await install;
  if (!passed) {
    throw new Error("Failed to install dependencies");
  }
}
async function removeTsMorphFromPackageJson() {
  var _a, _b;
  const packageJson = await readPackageJson(process.cwd());
  (_a = packageJson.dependencies) == null ? true : delete _a["ts-morph"];
  (_b = packageJson.devDependencies) == null ? true : delete _b["ts-morph"];
  await writePackageJson(process.cwd(), packageJson);
}

// packages/qwik/src/cli/migrate-v2/run-migration.ts
async function runV2Migration(app) {
  oe(
    `\u2728  ${bgMagenta(" This command will migrate your Qwik application from v1 to v2")}
This includes the following: 
  - "@builder.io/qwik", "@builder.io/qwik-city" and "@builder.io/qwik-react" packages will be rescoped to "@qwik.dev/core", "@qwik.dev/router" and "@qwik.dev/react" respectively 
  - related dependencies will be updated 

${bold(bgRed('Warning: migration tool is experimental and will migrate your application to the "alpha" release of Qwik V2'))}`
  );
  const proceed = await se({
    message: "Do you want to proceed?",
    initialValue: true
  });
  if (lD(proceed) || !proceed) {
    bye();
  }
  try {
    const installedTsMorph = await installTsMorph();
    const { replaceImportInFiles: replaceImportInFiles2 } = await Promise.resolve().then(() => (init_rename_import(), rename_import_exports));
    replaceImportInFiles2(
      [
        ["QwikCityProvider", "QwikRouterProvider"],
        ["qwikCity", "qwikRouter"],
        ["QwikCityVitePluginOptions", "QwikRouterVitePluginOptions"],
        ["QwikCityPlugin", "QwikRouterPlugin"],
        ["createQwikCity", "createQwikRouter"],
        ["QwikCityNodeRequestOptions", "QwikRouterNodeRequestOptions"]
      ],
      "@builder.io/qwik-city"
    );
    replaceImportInFiles2(
      [["qwikCityPlan", "qwikRouterConfig"]],
      "@qwik-city-plan"
      // using old name, package name will be updated in the next step
    );
    replaceImportInFiles2([["jsxs", "jsx"]], "@builder.io/qwik/jsx-runtime");
    replacePackage("@qwik-city-plan", "@qwik-router-config", true);
    replacePackage("@builder.io/qwik-city", "@qwik.dev/router");
    replacePackage("@builder.io/qwik-react", "@qwik.dev/react");
    replacePackage("@builder.io/qwik/jsx-runtime", "@qwik.dev/core");
    replacePackage("@builder.io/qwik", "@qwik.dev/core");
    if (installedTsMorph) {
      await removeTsMorphFromPackageJson();
    }
    await updateDependencies();
    f2.success(`${green(`Your application has been successfully migrated to v2!`)}`);
  } catch (error) {
    console.error(error);
    throw error;
  }
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
    value: "joke",
    label: "joke",
    hint: "Tell a random dad joke",
    run: () => runJokeCommand(),
    showInHelp: true
  },
  {
    value: "migrate-v2",
    label: "migrate-v2",
    hint: "Rescopes the application from @builder.io/* namespace to @qwik.dev/*",
    run: (app) => runV2Migration(app),
    showInHelp: false
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
    case "joke": {
      await runJokeCommand();
      return;
    }
    case "migrate-v2": {
      await runV2Migration(app);
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
  oe(`\u{1F52D}  ${bgMagenta(" Qwik Help ")}`);
  note(
    COMMANDS.filter((cmd) => cmd.showInHelp).map(
      (cmd) => `${pmRun} qwik ${cyan(cmd.label)}` + " ".repeat(Math.max(SPACE_TO_HINT2 - cmd.label.length, 2)) + dim(cmd.hint)
    ).join("\n"),
    "Available commands"
  );
  const proceed = await se({
    message: "Do you want to run a command?",
    initialValue: true
  });
  if (lD(proceed) || !proceed) {
    bye();
  }
  const command = await ie({
    message: "Select a command",
    options: COMMANDS.filter((cmd) => cmd.showInHelp).map((cmd) => ({
      value: cmd.value,
      label: `${pmRun} qwik ${cyan(cmd.label)}`,
      hint: cmd.hint
    }))
  });
  if (lD(command)) {
    bye();
  }
  const args = command.split(" ");
  await runCommand2(Object.assign(app, { task: args[0], args }));
}
function printVersion() {
  console.log("1.14.1");
}
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  runCli,
  updateApp
});
