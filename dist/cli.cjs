/**
 * @license
 * @builder.io/qwik/cli 1.17.2
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
      up: (count2 = 1) => `${CSI}${count2}A`,
      down: (count2 = 1) => `${CSI}${count2}B`,
      forward: (count2 = 1) => `${CSI}${count2}C`,
      backward: (count2 = 1) => `${CSI}${count2}D`,
      nextLine: (count2 = 1) => `${CSI}E`.repeat(count2),
      prevLine: (count2 = 1) => `${CSI}F`.repeat(count2),
      left: `${CSI}G`,
      hide: `${CSI}?25l`,
      show: `${CSI}?25h`,
      save: `${ESC}7`,
      restore: `${ESC}8`
    };
    var scroll = {
      up: (count2 = 1) => `${CSI}S`.repeat(count2),
      down: (count2 = 1) => `${CSI}T`.repeat(count2)
    };
    var erase = {
      screen: `${CSI}2J`,
      up: (count2 = 1) => `${CSI}1J`.repeat(count2),
      down: (count2 = 1) => `${CSI}J`.repeat(count2),
      line: `${CSI}2K`,
      lineEnd: `${CSI}K`,
      lineStart: `${CSI}1K`,
      lines(count2) {
        let clear = "";
        for (let i2 = 0; i2 < count2; i2++)
          clear += this.line + (i2 < count2 - 1 ? cursor.up() : "");
        if (count2)
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
function A(e2, u2 = {}) {
  if (typeof e2 != "string" || e2.length === 0 || (u2 = { ambiguousIsNarrow: true, ...u2 }, e2 = S(e2), e2.length === 0)) return 0;
  e2 = e2.replace(uD(), "  ");
  const F = u2.ambiguousIsNarrow ? 1 : 2;
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
  for (const [u2, F] of Object.entries(r)) {
    for (const [t, s2] of Object.entries(F)) r[t] = { open: `\x1B[${s2[0]}m`, close: `\x1B[${s2[1]}m` }, F[t] = r[t], e2.set(s2[0], s2[1]);
    Object.defineProperty(r, u2, { value: F, enumerable: false });
  }
  return Object.defineProperty(r, "codes", { value: e2, enumerable: false }), r.color.close = "\x1B[39m", r.bgColor.close = "\x1B[49m", r.color.ansi = M(), r.color.ansi256 = P(), r.color.ansi16m = W(), r.bgColor.ansi = M(d), r.bgColor.ansi256 = P(d), r.bgColor.ansi16m = W(d), Object.defineProperties(r, { rgbToAnsi256: { value: (u2, F, t) => u2 === F && F === t ? u2 < 8 ? 16 : u2 > 248 ? 231 : Math.round((u2 - 8) / 247 * 24) + 232 : 16 + 36 * Math.round(u2 / 255 * 5) + 6 * Math.round(F / 255 * 5) + Math.round(t / 255 * 5), enumerable: false }, hexToRgb: { value: (u2) => {
    const F = /[a-f\d]{6}|[a-f\d]{3}/i.exec(u2.toString(16));
    if (!F) return [0, 0, 0];
    let [t] = F;
    t.length === 3 && (t = [...t].map((C2) => C2 + C2).join(""));
    const s2 = Number.parseInt(t, 16);
    return [s2 >> 16 & 255, s2 >> 8 & 255, s2 & 255];
  }, enumerable: false }, hexToAnsi256: { value: (u2) => r.rgbToAnsi256(...r.hexToRgb(u2)), enumerable: false }, ansi256ToAnsi: { value: (u2) => {
    if (u2 < 8) return 30 + u2;
    if (u2 < 16) return 90 + (u2 - 8);
    let F, t, s2;
    if (u2 >= 232) F = ((u2 - 232) * 10 + 8) / 255, t = F, s2 = F;
    else {
      u2 -= 16;
      const i2 = u2 % 36;
      F = Math.floor(u2 / 36) / 5, t = Math.floor(i2 / 6) / 5, s2 = i2 % 6 / 5;
    }
    const C2 = Math.max(F, t, s2) * 2;
    if (C2 === 0) return 30;
    let D = 30 + (Math.round(s2) << 2 | Math.round(t) << 1 | Math.round(F));
    return C2 === 2 && (D += 60), D;
  }, enumerable: false }, rgbToAnsi: { value: (u2, F, t) => r.ansi256ToAnsi(r.rgbToAnsi256(u2, F, t)), enumerable: false }, hexToAnsi: { value: (u2) => r.ansi256ToAnsi(r.hexToAnsi256(u2)), enumerable: false } }), r;
}
function R(e2, u2, F) {
  return String(e2).normalize().replace(/\r\n/g, `
`).split(`
`).map((t) => oD(t, u2, F)).join(`
`);
}
function hD(e2, u2) {
  if (e2 === u2) return;
  const F = e2.split(`
`), t = u2.split(`
`), s2 = [];
  for (let C2 = 0; C2 < Math.max(F.length, t.length); C2++) F[C2] !== t[C2] && s2.push(C2);
  return s2;
}
function lD(e2) {
  return e2 === V;
}
function v(e2, u2) {
  e2.isTTY && e2.setRawMode(u2);
}
function OD({ input: e2 = import_node_process.stdin, output: u2 = import_node_process.stdout, overwrite: F = true, hideCursor: t = true } = {}) {
  const s2 = f.createInterface({ input: e2, output: u2, prompt: "", tabSize: 1 });
  f.emitKeypressEvents(e2, s2), e2.isTTY && e2.setRawMode(true);
  const C2 = (D, { name: i2 }) => {
    if (String(D) === "") {
      t && u2.write(import_sisteransi.cursor.show), process.exit(0);
      return;
    }
    if (!F) return;
    let n2 = i2 === "return" ? 0 : -1, E2 = i2 === "return" ? -1 : 0;
    f.moveCursor(u2, n2, E2, () => {
      f.clearLine(u2, 1, () => {
        e2.once("keypress", C2);
      });
    });
  };
  return t && u2.write(import_sisteransi.cursor.hide), e2.once("keypress", C2), () => {
    e2.off("keypress", C2), t && u2.write(import_sisteransi.cursor.show), e2.isTTY && !WD && e2.setRawMode(false), s2.terminal = false, s2.close();
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
      var u2 = {};
      e2.exports = u2, u2.eastAsianWidth = function(t) {
        var s2 = t.charCodeAt(0), C2 = t.length == 2 ? t.charCodeAt(1) : 0, D = s2;
        return 55296 <= s2 && s2 <= 56319 && 56320 <= C2 && C2 <= 57343 && (s2 &= 1023, C2 &= 1023, D = s2 << 10 | C2, D += 65536), D == 12288 || 65281 <= D && D <= 65376 || 65504 <= D && D <= 65510 ? "F" : D == 8361 || 65377 <= D && D <= 65470 || 65474 <= D && D <= 65479 || 65482 <= D && D <= 65487 || 65490 <= D && D <= 65495 || 65498 <= D && D <= 65500 || 65512 <= D && D <= 65518 ? "H" : 4352 <= D && D <= 4447 || 4515 <= D && D <= 4519 || 4602 <= D && D <= 4607 || 9001 <= D && D <= 9002 || 11904 <= D && D <= 11929 || 11931 <= D && D <= 12019 || 12032 <= D && D <= 12245 || 12272 <= D && D <= 12283 || 12289 <= D && D <= 12350 || 12353 <= D && D <= 12438 || 12441 <= D && D <= 12543 || 12549 <= D && D <= 12589 || 12593 <= D && D <= 12686 || 12688 <= D && D <= 12730 || 12736 <= D && D <= 12771 || 12784 <= D && D <= 12830 || 12832 <= D && D <= 12871 || 12880 <= D && D <= 13054 || 13056 <= D && D <= 19903 || 19968 <= D && D <= 42124 || 42128 <= D && D <= 42182 || 43360 <= D && D <= 43388 || 44032 <= D && D <= 55203 || 55216 <= D && D <= 55238 || 55243 <= D && D <= 55291 || 63744 <= D && D <= 64255 || 65040 <= D && D <= 65049 || 65072 <= D && D <= 65106 || 65108 <= D && D <= 65126 || 65128 <= D && D <= 65131 || 110592 <= D && D <= 110593 || 127488 <= D && D <= 127490 || 127504 <= D && D <= 127546 || 127552 <= D && D <= 127560 || 127568 <= D && D <= 127569 || 131072 <= D && D <= 194367 || 177984 <= D && D <= 196605 || 196608 <= D && D <= 262141 ? "W" : 32 <= D && D <= 126 || 162 <= D && D <= 163 || 165 <= D && D <= 166 || D == 172 || D == 175 || 10214 <= D && D <= 10221 || 10629 <= D && D <= 10630 ? "Na" : D == 161 || D == 164 || 167 <= D && D <= 168 || D == 170 || 173 <= D && D <= 174 || 176 <= D && D <= 180 || 182 <= D && D <= 186 || 188 <= D && D <= 191 || D == 198 || D == 208 || 215 <= D && D <= 216 || 222 <= D && D <= 225 || D == 230 || 232 <= D && D <= 234 || 236 <= D && D <= 237 || D == 240 || 242 <= D && D <= 243 || 247 <= D && D <= 250 || D == 252 || D == 254 || D == 257 || D == 273 || D == 275 || D == 283 || 294 <= D && D <= 295 || D == 299 || 305 <= D && D <= 307 || D == 312 || 319 <= D && D <= 322 || D == 324 || 328 <= D && D <= 331 || D == 333 || 338 <= D && D <= 339 || 358 <= D && D <= 359 || D == 363 || D == 462 || D == 464 || D == 466 || D == 468 || D == 470 || D == 472 || D == 474 || D == 476 || D == 593 || D == 609 || D == 708 || D == 711 || 713 <= D && D <= 715 || D == 717 || D == 720 || 728 <= D && D <= 731 || D == 733 || D == 735 || 768 <= D && D <= 879 || 913 <= D && D <= 929 || 931 <= D && D <= 937 || 945 <= D && D <= 961 || 963 <= D && D <= 969 || D == 1025 || 1040 <= D && D <= 1103 || D == 1105 || D == 8208 || 8211 <= D && D <= 8214 || 8216 <= D && D <= 8217 || 8220 <= D && D <= 8221 || 8224 <= D && D <= 8226 || 8228 <= D && D <= 8231 || D == 8240 || 8242 <= D && D <= 8243 || D == 8245 || D == 8251 || D == 8254 || D == 8308 || D == 8319 || 8321 <= D && D <= 8324 || D == 8364 || D == 8451 || D == 8453 || D == 8457 || D == 8467 || D == 8470 || 8481 <= D && D <= 8482 || D == 8486 || D == 8491 || 8531 <= D && D <= 8532 || 8539 <= D && D <= 8542 || 8544 <= D && D <= 8555 || 8560 <= D && D <= 8569 || D == 8585 || 8592 <= D && D <= 8601 || 8632 <= D && D <= 8633 || D == 8658 || D == 8660 || D == 8679 || D == 8704 || 8706 <= D && D <= 8707 || 8711 <= D && D <= 8712 || D == 8715 || D == 8719 || D == 8721 || D == 8725 || D == 8730 || 8733 <= D && D <= 8736 || D == 8739 || D == 8741 || 8743 <= D && D <= 8748 || D == 8750 || 8756 <= D && D <= 8759 || 8764 <= D && D <= 8765 || D == 8776 || D == 8780 || D == 8786 || 8800 <= D && D <= 8801 || 8804 <= D && D <= 8807 || 8810 <= D && D <= 8811 || 8814 <= D && D <= 8815 || 8834 <= D && D <= 8835 || 8838 <= D && D <= 8839 || D == 8853 || D == 8857 || D == 8869 || D == 8895 || D == 8978 || 9312 <= D && D <= 9449 || 9451 <= D && D <= 9547 || 9552 <= D && D <= 9587 || 9600 <= D && D <= 9615 || 9618 <= D && D <= 9621 || 9632 <= D && D <= 9633 || 9635 <= D && D <= 9641 || 9650 <= D && D <= 9651 || 9654 <= D && D <= 9655 || 9660 <= D && D <= 9661 || 9664 <= D && D <= 9665 || 9670 <= D && D <= 9672 || D == 9675 || 9678 <= D && D <= 9681 || 9698 <= D && D <= 9701 || D == 9711 || 9733 <= D && D <= 9734 || D == 9737 || 9742 <= D && D <= 9743 || 9748 <= D && D <= 9749 || D == 9756 || D == 9758 || D == 9792 || D == 9794 || 9824 <= D && D <= 9825 || 9827 <= D && D <= 9829 || 9831 <= D && D <= 9834 || 9836 <= D && D <= 9837 || D == 9839 || 9886 <= D && D <= 9887 || 9918 <= D && D <= 9919 || 9924 <= D && D <= 9933 || 9935 <= D && D <= 9953 || D == 9955 || 9960 <= D && D <= 9983 || D == 10045 || D == 10071 || 10102 <= D && D <= 10111 || 11093 <= D && D <= 11097 || 12872 <= D && D <= 12879 || 57344 <= D && D <= 63743 || 65024 <= D && D <= 65039 || D == 65533 || 127232 <= D && D <= 127242 || 127248 <= D && D <= 127277 || 127280 <= D && D <= 127337 || 127344 <= D && D <= 127386 || 917760 <= D && D <= 917999 || 983040 <= D && D <= 1048573 || 1048576 <= D && D <= 1114109 ? "A" : "N";
      }, u2.characterLength = function(t) {
        var s2 = this.eastAsianWidth(t);
        return s2 == "F" || s2 == "W" || s2 == "A" ? 2 : 1;
      };
      function F(t) {
        return t.match(/[\uD800-\uDBFF][\uDC00-\uDFFF]|[^\uD800-\uDFFF]/g) || [];
      }
      u2.length = function(t) {
        for (var s2 = F(t), C2 = 0, D = 0; D < s2.length; D++) C2 = C2 + this.characterLength(s2[D]);
        return C2;
      }, u2.slice = function(t, s2, C2) {
        textLen = u2.length(t), s2 = s2 || 0, C2 = C2 || 1, s2 < 0 && (s2 = textLen + s2), C2 < 0 && (C2 = textLen + C2);
        for (var D = "", i2 = 0, n2 = F(t), E2 = 0; E2 < n2.length; E2++) {
          var h3 = n2[E2], o3 = u2.length(h3);
          if (i2 >= s2 - (o3 == 2 ? 1 : 0)) if (i2 + o3 <= C2) D += h3;
          else break;
          i2 += o3;
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
    M = (e2 = 0) => (u2) => `\x1B[${u2 + e2}m`;
    P = (e2 = 0) => (u2) => `\x1B[${38 + e2};5;${u2}m`;
    W = (e2 = 0) => (u2, F, t) => `\x1B[${38 + e2};2;${u2};${F};${t}m`;
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
    rD = (e2) => e2.split(" ").map((u2) => A(u2));
    y = (e2, u2, F) => {
      const t = [...u2];
      let s2 = false, C2 = false, D = A(S(e2[e2.length - 1]));
      for (const [i2, n2] of t.entries()) {
        const E2 = A(n2);
        if (D + E2 <= F ? e2[e2.length - 1] += n2 : (e2.push(n2), D = 0), g.has(n2) && (s2 = true, C2 = t.slice(i2 + 1).join("").startsWith(w)), s2) {
          C2 ? n2 === b && (s2 = false, C2 = false) : n2 === I && (s2 = false);
          continue;
        }
        D += E2, D === F && i2 < t.length - 1 && (e2.push(""), D = 0);
      }
      !D && e2[e2.length - 1].length > 0 && e2.length > 1 && (e2[e2.length - 2] += e2.pop());
    };
    ED = (e2) => {
      const u2 = e2.split(" ");
      let F = u2.length;
      for (; F > 0 && !(A(u2[F - 1]) > 0); ) F--;
      return F === u2.length ? e2 : u2.slice(0, F).join(" ") + u2.slice(F).join("");
    };
    oD = (e2, u2, F = {}) => {
      if (F.trim !== false && e2.trim() === "") return "";
      let t = "", s2, C2;
      const D = rD(e2);
      let i2 = [""];
      for (const [E2, h3] of e2.split(" ").entries()) {
        F.trim !== false && (i2[i2.length - 1] = i2[i2.length - 1].trimStart());
        let o3 = A(i2[i2.length - 1]);
        if (E2 !== 0 && (o3 >= u2 && (F.wordWrap === false || F.trim === false) && (i2.push(""), o3 = 0), (o3 > 0 || F.trim === false) && (i2[i2.length - 1] += " ", o3++)), F.hard && D[E2] > u2) {
          const B2 = u2 - o3, p = 1 + Math.floor((D[E2] - B2 - 1) / u2);
          Math.floor((D[E2] - 1) / u2) < p && i2.push(""), y(i2, h3, u2);
          continue;
        }
        if (o3 + D[E2] > u2 && o3 > 0 && D[E2] > 0) {
          if (F.wordWrap === false && o3 < u2) {
            y(i2, h3, u2);
            continue;
          }
          i2.push("");
        }
        if (o3 + D[E2] > u2 && F.wordWrap === false) {
          y(i2, h3, u2);
          continue;
        }
        i2[i2.length - 1] += h3;
      }
      F.trim !== false && (i2 = i2.map((E2) => ED(E2)));
      const n2 = [...i2.join(`
`)];
      for (const [E2, h3] of n2.entries()) {
        if (t += h3, g.has(h3)) {
          const { groups: B2 } = new RegExp(`(?:\\${O}(?<code>\\d+)m|\\${w}(?<uri>.*)${b})`).exec(n2.slice(E2).join("")) || { groups: {} };
          if (B2.code !== void 0) {
            const p = Number.parseFloat(B2.code);
            s2 = p === CD ? void 0 : p;
          } else B2.uri !== void 0 && (C2 = B2.uri.length === 0 ? void 0 : B2.uri);
        }
        const o3 = sD.codes.get(Number(s2));
        n2[E2 + 1] === `
` ? (C2 && (t += L("")), s2 && o3 && (t += N(o3))) : h3 === `
` && (s2 && o3 && (t += N(s2)), C2 && (t += L(C2)));
      }
      return t;
    };
    nD = Object.defineProperty;
    aD = (e2, u2, F) => u2 in e2 ? nD(e2, u2, { enumerable: true, configurable: true, writable: true, value: F }) : e2[u2] = F;
    a = (e2, u2, F) => (aD(e2, typeof u2 != "symbol" ? u2 + "" : u2, F), F);
    V = Symbol("clack:cancel");
    z = /* @__PURE__ */ new Map([["k", "up"], ["j", "down"], ["h", "left"], ["l", "right"]]);
    xD = /* @__PURE__ */ new Set(["up", "down", "left", "right", "space", "enter"]);
    x = class {
      constructor({ render: u2, input: F = import_node_process.stdin, output: t = import_node_process.stdout, ...s2 }, C2 = true) {
        a(this, "input"), a(this, "output"), a(this, "rl"), a(this, "opts"), a(this, "_track", false), a(this, "_render"), a(this, "_cursor", 0), a(this, "state", "initial"), a(this, "value"), a(this, "error", ""), a(this, "subscribers", /* @__PURE__ */ new Map()), a(this, "_prevFrame", ""), this.opts = s2, this.onKeypress = this.onKeypress.bind(this), this.close = this.close.bind(this), this.render = this.render.bind(this), this._render = u2.bind(this), this._track = C2, this.input = F, this.output = t;
      }
      prompt() {
        const u2 = new import_node_tty.WriteStream(0);
        return u2._write = (F, t, s2) => {
          this._track && (this.value = this.rl.line.replace(/\t/g, ""), this._cursor = this.rl.cursor, this.emit("value", this.value)), s2();
        }, this.input.pipe(u2), this.rl = import_node_readline.default.createInterface({ input: this.input, output: u2, tabSize: 2, prompt: "", escapeCodeTimeout: 50 }), import_node_readline.default.emitKeypressEvents(this.input, this.rl), this.rl.prompt(), this.opts.initialValue !== void 0 && this._track && this.rl.write(this.opts.initialValue), this.input.on("keypress", this.onKeypress), v(this.input, true), this.output.on("resize", this.render), this.render(), new Promise((F, t) => {
          this.once("submit", () => {
            this.output.write(import_sisteransi.cursor.show), this.output.off("resize", this.render), v(this.input, false), F(this.value);
          }), this.once("cancel", () => {
            this.output.write(import_sisteransi.cursor.show), this.output.off("resize", this.render), v(this.input, false), F(V);
          });
        });
      }
      on(u2, F) {
        const t = this.subscribers.get(u2) ?? [];
        t.push({ cb: F }), this.subscribers.set(u2, t);
      }
      once(u2, F) {
        const t = this.subscribers.get(u2) ?? [];
        t.push({ cb: F, once: true }), this.subscribers.set(u2, t);
      }
      emit(u2, ...F) {
        const t = this.subscribers.get(u2) ?? [], s2 = [];
        for (const C2 of t) C2.cb(...F), C2.once && s2.push(() => t.splice(t.indexOf(C2), 1));
        for (const C2 of s2) C2();
      }
      unsubscribe() {
        this.subscribers.clear();
      }
      onKeypress(u2, F) {
        if (this.state === "error" && (this.state = "active"), (F == null ? void 0 : F.name) && !this._track && z.has(F.name) && this.emit("cursor", z.get(F.name)), (F == null ? void 0 : F.name) && xD.has(F.name) && this.emit("cursor", F.name), u2 && (u2.toLowerCase() === "y" || u2.toLowerCase() === "n") && this.emit("confirm", u2.toLowerCase() === "y"), u2 === "	" && this.opts.placeholder && (this.value || (this.rl.write(this.opts.placeholder), this.emit("value", this.opts.placeholder))), u2 && this.emit("key", u2.toLowerCase()), (F == null ? void 0 : F.name) === "return") {
          if (this.opts.validate) {
            const t = this.opts.validate(this.value);
            t && (this.error = t, this.state = "error", this.rl.write(this.value));
          }
          this.state !== "error" && (this.state = "submit");
        }
        u2 === "" && (this.state = "cancel"), (this.state === "submit" || this.state === "cancel") && this.emit("finalize"), this.render(), (this.state === "submit" || this.state === "cancel") && this.close();
      }
      close() {
        this.input.unpipe(), this.input.removeListener("keypress", this.onKeypress), this.output.write(`
`), v(this.input, false), this.rl.close(), this.emit(`${this.state}`, this.value), this.unsubscribe();
      }
      restoreCursor() {
        const u2 = R(this._prevFrame, process.stdout.columns, { hard: true }).split(`
`).length - 1;
        this.output.write(import_sisteransi.cursor.move(-999, u2 * -1));
      }
      render() {
        const u2 = R(this._render(this) ?? "", process.stdout.columns, { hard: true });
        if (u2 !== this._prevFrame) {
          if (this.state === "initial") this.output.write(import_sisteransi.cursor.hide);
          else {
            const F = hD(this._prevFrame, u2);
            if (this.restoreCursor(), F && (F == null ? void 0 : F.length) === 1) {
              const t = F[0];
              this.output.write(import_sisteransi.cursor.move(0, t)), this.output.write(import_sisteransi.erase.lines(1));
              const s2 = u2.split(`
`);
              this.output.write(s2[t]), this._prevFrame = u2, this.output.write(import_sisteransi.cursor.move(0, s2.length - t - 1));
              return;
            } else if (F && (F == null ? void 0 : F.length) > 1) {
              const t = F[0];
              this.output.write(import_sisteransi.cursor.move(0, t)), this.output.write(import_sisteransi.erase.down());
              const s2 = u2.split(`
`).slice(t);
              this.output.write(s2.join(`
`)), this._prevFrame = u2;
              return;
            }
            this.output.write(import_sisteransi.erase.down());
          }
          this.output.write(u2), this.state === "initial" && (this.state = "active"), this._prevFrame = u2;
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
      constructor(u2) {
        super(u2, false), this.value = !!u2.initialValue, this.on("value", () => {
          this.value = this._value;
        }), this.on("confirm", (F) => {
          this.output.write(import_sisteransi.cursor.move(0, -1)), this.value = F, this.state = "submit", this.close();
        }), this.on("cursor", () => {
          this.value = !this.value;
        });
      }
    };
    wD = Object.defineProperty;
    yD = (e2, u2, F) => u2 in e2 ? wD(e2, u2, { enumerable: true, configurable: true, writable: true, value: F }) : e2[u2] = F;
    Z = (e2, u2, F) => (yD(e2, typeof u2 != "symbol" ? u2 + "" : u2, F), F);
    $D = class extends x {
      constructor(u2) {
        super(u2, false), Z(this, "options"), Z(this, "cursor", 0), this.options = u2.options, this.cursor = this.options.findIndex(({ value: F }) => F === u2.initialValue), this.cursor === -1 && (this.cursor = 0), this.changeValue(), this.on("cursor", (F) => {
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
    jD = (e2, u2, F) => u2 in e2 ? TD(e2, u2, { enumerable: true, configurable: true, writable: true, value: F }) : e2[u2] = F;
    MD = (e2, u2, F) => (jD(e2, typeof u2 != "symbol" ? u2 + "" : u2, F), F);
    PD = class extends x {
      constructor(u2) {
        super(u2), MD(this, "valueWithCursor", ""), this.on("finalize", () => {
          this.value || (this.value = u2.defaultValue), this.valueWithCursor = this.value;
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
    o = (r2, n2) => _2 ? r2 : n2;
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
      var _a2;
      const n2 = `${import_picocolors2.default.gray(a2)}
${y2(this.state)}  ${r2.message}
`, i2 = r2.placeholder ? import_picocolors2.default.inverse(r2.placeholder[0]) + import_picocolors2.default.dim(r2.placeholder.slice(1)) : import_picocolors2.default.inverse(import_picocolors2.default.hidden("_")), t = this.value ? this.valueWithCursor : i2;
      switch (this.state) {
        case "error":
          return `${n2.trim()}
${import_picocolors2.default.yellow(a2)}  ${t}
${import_picocolors2.default.yellow(d2)}  ${import_picocolors2.default.yellow(this.error)}
`;
        case "submit":
          return `${n2}${import_picocolors2.default.gray(a2)}  ${import_picocolors2.default.dim(this.value || r2.placeholder)}`;
        case "cancel":
          return `${n2}${import_picocolors2.default.gray(a2)}  ${import_picocolors2.default.strikethrough(import_picocolors2.default.dim(this.value ?? ""))}${((_a2 = this.value) == null ? void 0 : _a2.trim()) ? `
` + import_picocolors2.default.gray(a2) : ""}`;
        default:
          return `${n2}${import_picocolors2.default.cyan(a2)}  ${t}
${import_picocolors2.default.cyan(d2)}
`;
      }
    } }).prompt();
    se = (r2) => {
      const n2 = r2.active ?? "Yes", i2 = r2.inactive ?? "No";
      return new BD({ active: n2, inactive: i2, initialValue: r2.initialValue ?? true, render() {
        const t = `${import_picocolors2.default.gray(a2)}
${y2(this.state)}  ${r2.message}
`, s2 = this.value ? n2 : i2;
        switch (this.state) {
          case "submit":
            return `${t}${import_picocolors2.default.gray(a2)}  ${import_picocolors2.default.dim(s2)}`;
          case "cancel":
            return `${t}${import_picocolors2.default.gray(a2)}  ${import_picocolors2.default.strikethrough(import_picocolors2.default.dim(s2))}
${import_picocolors2.default.gray(a2)}`;
          default:
            return `${t}${import_picocolors2.default.cyan(a2)}  ${this.value ? `${import_picocolors2.default.green(b2)} ${n2}` : `${import_picocolors2.default.dim(E)} ${import_picocolors2.default.dim(n2)}`} ${import_picocolors2.default.dim("/")} ${this.value ? `${import_picocolors2.default.dim(E)} ${import_picocolors2.default.dim(i2)}` : `${import_picocolors2.default.green(b2)} ${i2}`}
${import_picocolors2.default.cyan(d2)}
`;
        }
      } }).prompt();
    };
    ie = (r2) => {
      const n2 = (t, s2) => {
        const c4 = t.label ?? String(t.value);
        return s2 === "active" ? `${import_picocolors2.default.green(b2)} ${c4} ${t.hint ? import_picocolors2.default.dim(`(${t.hint})`) : ""}` : s2 === "selected" ? `${import_picocolors2.default.dim(c4)}` : s2 === "cancelled" ? `${import_picocolors2.default.strikethrough(import_picocolors2.default.dim(c4))}` : `${import_picocolors2.default.dim(E)} ${import_picocolors2.default.dim(c4)}`;
      };
      let i2 = 0;
      return new $D({ options: r2.options, initialValue: r2.initialValue, render() {
        const t = `${import_picocolors2.default.gray(a2)}
${y2(this.state)}  ${r2.message}
`;
        switch (this.state) {
          case "submit":
            return `${t}${import_picocolors2.default.gray(a2)}  ${n2(this.options[this.cursor], "selected")}`;
          case "cancel":
            return `${t}${import_picocolors2.default.gray(a2)}  ${n2(this.options[this.cursor], "cancelled")}
${import_picocolors2.default.gray(a2)}`;
          default: {
            const s2 = r2.maxItems === void 0 ? 1 / 0 : Math.max(r2.maxItems, 5);
            this.cursor >= i2 + s2 - 3 ? i2 = Math.max(Math.min(this.cursor - s2 + 3, this.options.length - s2), 0) : this.cursor < i2 + 2 && (i2 = Math.max(this.cursor - 2, 0));
            const c4 = s2 < this.options.length && i2 > 0, l2 = s2 < this.options.length && i2 + s2 < this.options.length;
            return `${t}${import_picocolors2.default.cyan(a2)}  ${this.options.slice(i2, i2 + s2).map((u2, m2, $4) => m2 === 0 && c4 ? import_picocolors2.default.dim("...") : m2 === $4.length - 1 && l2 ? import_picocolors2.default.dim("...") : n2(u2, m2 + i2 === this.cursor ? "active" : "inactive")).join(`
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
    f2 = { message: (r2 = "", { symbol: n2 = import_picocolors2.default.gray(a2) } = {}) => {
      const i2 = [`${import_picocolors2.default.gray(a2)}`];
      if (r2) {
        const [t, ...s2] = r2.split(`
`);
        i2.push(`${n2}  ${t}`, ...s2.map((c4) => `${import_picocolors2.default.gray(a2)}  ${c4}`));
      }
      process.stdout.write(`${i2.join(`
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
      const r2 = _2 ? ["\u25D2", "\u25D0", "\u25D3", "\u25D1"] : ["\u2022", "o", "O", "0"], n2 = _2 ? 80 : 120;
      let i2, t, s2 = false, c4 = "";
      const l2 = (v2 = "") => {
        s2 = true, i2 = OD(), c4 = v2.replace(/\.+$/, ""), process.stdout.write(`${import_picocolors2.default.gray(a2)}
`);
        let g2 = 0, p = 0;
        t = setInterval(() => {
          const O2 = import_picocolors2.default.magenta(r2[g2]), P2 = ".".repeat(Math.floor(p)).slice(0, 3);
          process.stdout.write(import_sisteransi2.cursor.move(-999, 0)), process.stdout.write(import_sisteransi2.erase.down(1)), process.stdout.write(`${O2}  ${c4}${P2}`), g2 = g2 + 1 < r2.length ? g2 + 1 : 0, p = p < r2.length ? p + 0.125 : 0;
        }, n2);
      }, u2 = (v2 = "", g2 = 0) => {
        c4 = v2 ?? c4, s2 = false, clearInterval(t);
        const p = g2 === 0 ? import_picocolors2.default.green(S2) : g2 === 1 ? import_picocolors2.default.red(I2) : import_picocolors2.default.red(x2);
        process.stdout.write(import_sisteransi2.cursor.move(-999, 0)), process.stdout.write(import_sisteransi2.erase.down(1)), process.stdout.write(`${p}  ${c4}
`), i2();
      }, m2 = (v2 = "") => {
        c4 = v2 ?? c4;
      }, $4 = (v2) => {
        const g2 = v2 > 1 ? "Something went wrong" : "Canceled";
        s2 && u2(g2, v2);
      };
      return process.on("uncaughtExceptionMonitor", () => $4(2)), process.on("unhandledRejection", () => $4(2)), process.on("SIGINT", () => $4(1)), process.on("SIGTERM", () => $4(1)), process.on("exit", $4), { start: l2, stop: u2, message: m2 };
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
    var fs9 = require("fs");
    function checkPathExt(path7, options) {
      var pathext = options.pathExt !== void 0 ? options.pathExt : process.env.PATHEXT;
      if (!pathext) {
        return true;
      }
      pathext = pathext.split(";");
      if (pathext.indexOf("") !== -1) {
        return true;
      }
      for (var i2 = 0; i2 < pathext.length; i2++) {
        var p = pathext[i2].toLowerCase();
        if (p && path7.substr(-p.length).toLowerCase() === p) {
          return true;
        }
      }
      return false;
    }
    function checkStat(stat, path7, options) {
      if (!stat.isSymbolicLink() && !stat.isFile()) {
        return false;
      }
      return checkPathExt(path7, options);
    }
    function isexe(path7, options, cb) {
      fs9.stat(path7, function(er, stat) {
        cb(er, er ? false : checkStat(stat, path7, options));
      });
    }
    function sync(path7, options) {
      return checkStat(fs9.statSync(path7), path7, options);
    }
  }
});

// node_modules/.pnpm/isexe@2.0.0/node_modules/isexe/mode.js
var require_mode = __commonJS({
  "node_modules/.pnpm/isexe@2.0.0/node_modules/isexe/mode.js"(exports2, module2) {
    module2.exports = isexe;
    isexe.sync = sync;
    var fs9 = require("fs");
    function isexe(path7, options, cb) {
      fs9.stat(path7, function(er, stat) {
        cb(er, er ? false : checkStat(stat, options));
      });
    }
    function sync(path7, options) {
      return checkStat(fs9.statSync(path7), options);
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
      var g2 = parseInt("010", 8);
      var o3 = parseInt("001", 8);
      var ug = u2 | g2;
      var ret = mod & o3 || mod & g2 && gid === myGid || mod & u2 && uid === myUid || mod & ug && myUid === 0;
      return ret;
    }
  }
});

// node_modules/.pnpm/isexe@2.0.0/node_modules/isexe/index.js
var require_isexe = __commonJS({
  "node_modules/.pnpm/isexe@2.0.0/node_modules/isexe/index.js"(exports2, module2) {
    var fs9 = require("fs");
    var core;
    if (process.platform === "win32" || global.TESTING_WINDOWS) {
      core = require_windows();
    } else {
      core = require_mode();
    }
    module2.exports = isexe;
    isexe.sync = sync;
    function isexe(path7, options, cb) {
      if (typeof options === "function") {
        cb = options;
        options = {};
      }
      if (!cb) {
        if (typeof Promise !== "function") {
          throw new TypeError("callback not provided");
        }
        return new Promise(function(resolve2, reject) {
          isexe(path7, options || {}, function(er, is) {
            if (er) {
              reject(er);
            } else {
              resolve2(is);
            }
          });
        });
      }
      core(path7, options || {}, function(er, is) {
        if (er) {
          if (er.code === "EACCES" || options && options.ignoreErrors) {
            er = null;
            is = false;
          }
        }
        cb(er, is);
      });
    }
    function sync(path7, options) {
      try {
        return core.sync(path7, options || {});
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
    var path7 = require("path");
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
      const step = (i2) => new Promise((resolve2, reject) => {
        if (i2 === pathEnv.length)
          return opt.all && found.length ? resolve2(found) : reject(getNotFoundError(cmd));
        const ppRaw = pathEnv[i2];
        const pathPart = /^".*"$/.test(ppRaw) ? ppRaw.slice(1, -1) : ppRaw;
        const pCmd = path7.join(pathPart, cmd);
        const p = !pathPart && /^\.[\\\/]/.test(cmd) ? cmd.slice(0, 2) + pCmd : pCmd;
        resolve2(subStep(p, i2, 0));
      });
      const subStep = (p, i2, ii) => new Promise((resolve2, reject) => {
        if (ii === pathExt.length)
          return resolve2(step(i2 + 1));
        const ext = pathExt[ii];
        isexe(p + ext, { pathExt: pathExtExe }, (er, is) => {
          if (!er && is) {
            if (opt.all)
              found.push(p + ext);
            else
              return resolve2(p + ext);
          }
          return resolve2(subStep(p, i2, ii + 1));
        });
      });
      return cb ? step(0).then((res) => cb(null, res), cb) : step(0);
    };
    var whichSync = (cmd, opt) => {
      opt = opt || {};
      const { pathEnv, pathExt, pathExtExe } = getPathInfo(cmd, opt);
      const found = [];
      for (let i2 = 0; i2 < pathEnv.length; i2++) {
        const ppRaw = pathEnv[i2];
        const pathPart = /^".*"$/.test(ppRaw) ? ppRaw.slice(1, -1) : ppRaw;
        const pCmd = path7.join(pathPart, cmd);
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
      const platform2 = options.platform || process.platform;
      if (platform2 !== "win32") {
        return "PATH";
      }
      return Object.keys(environment).reverse().find((key) => key.toUpperCase() === "PATH") || "Path";
    };
    module2.exports = pathKey2;
    module2.exports.default = pathKey2;
  }
});

// node_modules/.pnpm/cross-spawn@7.0.6/node_modules/cross-spawn/lib/util/resolveCommand.js
var require_resolveCommand = __commonJS({
  "node_modules/.pnpm/cross-spawn@7.0.6/node_modules/cross-spawn/lib/util/resolveCommand.js"(exports2, module2) {
    "use strict";
    var path7 = require("path");
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
          pathExt: withoutPathExt ? path7.delimiter : void 0
        });
      } catch (e2) {
      } finally {
        if (shouldSwitchCwd) {
          process.chdir(cwd);
        }
      }
      if (resolved) {
        resolved = path7.resolve(hasCustomCwd ? parsed.options.cwd : "", resolved);
      }
      return resolved;
    }
    function resolveCommand(parsed) {
      return resolveCommandAttempt(parsed) || resolveCommandAttempt(parsed, true);
    }
    module2.exports = resolveCommand;
  }
});

// node_modules/.pnpm/cross-spawn@7.0.6/node_modules/cross-spawn/lib/util/escape.js
var require_escape = __commonJS({
  "node_modules/.pnpm/cross-spawn@7.0.6/node_modules/cross-spawn/lib/util/escape.js"(exports2, module2) {
    "use strict";
    var metaCharsRegExp = /([()\][%!^"`<>&|;, *?])/g;
    function escapeCommand(arg) {
      arg = arg.replace(metaCharsRegExp, "^$1");
      return arg;
    }
    function escapeArgument(arg, doubleEscapeMetaChars) {
      arg = `${arg}`;
      arg = arg.replace(/(?=(\\+?)?)\1"/g, '$1$1\\"');
      arg = arg.replace(/(?=(\\+?)?)\1$/, "$1$1");
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
      const [path7, argument] = match[0].replace(/#! ?/, "").split(" ");
      const binary = path7.split("/").pop();
      if (binary === "env") {
        return argument;
      }
      return argument ? `${binary} ${argument}` : binary;
    };
  }
});

// node_modules/.pnpm/cross-spawn@7.0.6/node_modules/cross-spawn/lib/util/readShebang.js
var require_readShebang = __commonJS({
  "node_modules/.pnpm/cross-spawn@7.0.6/node_modules/cross-spawn/lib/util/readShebang.js"(exports2, module2) {
    "use strict";
    var fs9 = require("fs");
    var shebangCommand = require_shebang_command();
    function readShebang(command) {
      const size = 150;
      const buffer = Buffer.alloc(size);
      let fd;
      try {
        fd = fs9.openSync(command, "r");
        fs9.readSync(fd, buffer, 0, size, 0);
        fs9.closeSync(fd);
      } catch (e2) {
      }
      return shebangCommand(buffer.toString());
    }
    module2.exports = readShebang;
  }
});

// node_modules/.pnpm/cross-spawn@7.0.6/node_modules/cross-spawn/lib/parse.js
var require_parse = __commonJS({
  "node_modules/.pnpm/cross-spawn@7.0.6/node_modules/cross-spawn/lib/parse.js"(exports2, module2) {
    "use strict";
    var path7 = require("path");
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
        parsed.command = path7.normalize(parsed.command);
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

// node_modules/.pnpm/cross-spawn@7.0.6/node_modules/cross-spawn/lib/enoent.js
var require_enoent = __commonJS({
  "node_modules/.pnpm/cross-spawn@7.0.6/node_modules/cross-spawn/lib/enoent.js"(exports2, module2) {
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
          const err = verifyENOENT(arg1, parsed);
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

// node_modules/.pnpm/cross-spawn@7.0.6/node_modules/cross-spawn/index.js
var require_cross_spawn = __commonJS({
  "node_modules/.pnpm/cross-spawn@7.0.6/node_modules/cross-spawn/index.js"(exports2, module2) {
    "use strict";
    var cp = require("child_process");
    var parse = require_parse();
    var enoent = require_enoent();
    function spawn3(command, args, options) {
      const parsed = parse(command, args, options);
      const spawned = cp.spawn(parsed.command, parsed.args, parsed.options);
      enoent.hookChildProcess(spawned, parsed);
      return spawned;
    }
    function spawnSync2(command, args, options) {
      const parsed = parse(command, args, options);
      const result = cp.spawnSync(parsed.command, parsed.args, parsed.options);
      result.error = result.error || enoent.verifyENOENTSync(result.status, parsed);
      return result;
    }
    module2.exports = spawn3;
    module2.exports.spawn = spawn3;
    module2.exports.sync = spawnSync2;
    module2.exports._parse = parse;
    module2.exports._enoent = enoent;
  }
});

// node_modules/.pnpm/@croct+json5-parser@0.2.1/node_modules/@croct/json5-parser/identifier.js
var require_identifier = __commonJS({
  "node_modules/.pnpm/@croct+json5-parser@0.2.1/node_modules/@croct/json5-parser/identifier.js"(exports2) {
    "use strict";
    Object.defineProperty(exports2, "__esModule", { value: true });
    exports2.identifierRegex = exports2.reservedIdentifiers = void 0;
    exports2.isReserved = isReserved;
    exports2.isIdentifier = isIdentifier;
    exports2.reservedIdentifiers = [
      // Keywords
      "await",
      "break",
      "case",
      "catch",
      "class",
      "const",
      "continue",
      "debugger",
      "default",
      "delete",
      "do",
      "else",
      "enum",
      "export",
      "extends",
      "false",
      "finally",
      "for",
      "function",
      "if",
      "import",
      "in",
      "instanceof",
      "new",
      "null",
      "return",
      "super",
      "switch",
      "this",
      "throw",
      "true",
      "try",
      "typeof",
      "var",
      "void",
      "while",
      "with",
      "yield",
      // Future reserved keywords
      "implements",
      "interface",
      "package",
      "private",
      "protected",
      "public"
    ];
    exports2.identifierRegex = /[$_\p{ID_Start}][$_\u200C\u200D\p{ID_Continue}]*/u;
    var exactRegex = new RegExp(`^${exports2.identifierRegex.source}$`, exports2.identifierRegex.flags);
    function isReserved(value) {
      return exports2.reservedIdentifiers.includes(value);
    }
    function isIdentifier(value) {
      return exactRegex.test(value) && !isReserved(value);
    }
  }
});

// node_modules/.pnpm/@croct+json5-parser@0.2.1/node_modules/@croct/json5-parser/token.js
var require_token = __commonJS({
  "node_modules/.pnpm/@croct+json5-parser@0.2.1/node_modules/@croct/json5-parser/token.js"(exports2) {
    "use strict";
    Object.defineProperty(exports2, "__esModule", { value: true });
    exports2.JsonToken = exports2.JsonTokenType = void 0;
    var JsonTokenType;
    (function(JsonTokenType2) {
      JsonTokenType2["IDENTIFIER"] = "IDENTIFIER";
      JsonTokenType2["STRING"] = "STRING";
      JsonTokenType2["NUMBER"] = "NUMBER";
      JsonTokenType2["BOOLEAN"] = "BOOLEAN";
      JsonTokenType2["NULL"] = "NULL";
      JsonTokenType2["COLON"] = "COLON";
      JsonTokenType2["COMMA"] = "COMMA";
      JsonTokenType2["LINE_COMMENT"] = "LINE_COMMENT";
      JsonTokenType2["BLOCK_COMMENT"] = "BLOCK_COMMENT";
      JsonTokenType2["BRACE_LEFT"] = "BRACE_LEFT";
      JsonTokenType2["BRACE_RIGHT"] = "BRACE_RIGHT";
      JsonTokenType2["BRACKET_LEFT"] = "BRACKET_LEFT";
      JsonTokenType2["BRACKET_RIGHT"] = "BRACKET_RIGHT";
      JsonTokenType2["WHITESPACE"] = "WHITESPACE";
      JsonTokenType2["NEWLINE"] = "NEWLINE";
      JsonTokenType2["EOF"] = "EOF";
    })(JsonTokenType || (exports2.JsonTokenType = JsonTokenType = {}));
    var JsonToken;
    (function(JsonToken2) {
      function isType(token, type) {
        return token.type === type;
      }
      JsonToken2.isType = isType;
    })(JsonToken || (exports2.JsonToken = JsonToken = {}));
  }
});

// node_modules/.pnpm/@croct+json5-parser@0.2.1/node_modules/@croct/json5-parser/error.js
var require_error = __commonJS({
  "node_modules/.pnpm/@croct+json5-parser@0.2.1/node_modules/@croct/json5-parser/error.js"(exports2) {
    "use strict";
    Object.defineProperty(exports2, "__esModule", { value: true });
    exports2.JsonParseError = exports2.JsonError = void 0;
    var JsonError = class extends Error {
      constructor(message) {
        super(message);
        Object.setPrototypeOf(this, new.target.prototype);
      }
    };
    exports2.JsonError = JsonError;
    var JsonParseError = class extends JsonError {
      constructor(message, location) {
        super(message);
        this.location = location;
        Object.setPrototypeOf(this, new.target.prototype);
      }
    };
    exports2.JsonParseError = JsonParseError;
  }
});

// node_modules/.pnpm/@croct+json5-parser@0.2.1/node_modules/@croct/json5-parser/lexer.js
var require_lexer = __commonJS({
  "node_modules/.pnpm/@croct+json5-parser@0.2.1/node_modules/@croct/json5-parser/lexer.js"(exports2) {
    "use strict";
    Object.defineProperty(exports2, "__esModule", { value: true });
    exports2.JsonLexer = void 0;
    var token_1 = require_token();
    var identifier_1 = require_identifier();
    var error_1 = require_error();
    var JsonLexer = class _JsonLexer {
      constructor(source) {
        this.current = null;
        this.remaining = source;
      }
      static tokenize(source) {
        return [...new _JsonLexer(source)];
      }
      isEof() {
        var _a2;
        return ((_a2 = this.current) == null ? void 0 : _a2.type) === token_1.JsonTokenType.EOF;
      }
      [Symbol.iterator]() {
        return {
          next: () => this.isEof() ? {
            done: true,
            value: void 0
          } : {
            done: false,
            value: this.next()
          }
        };
      }
      skipInsignificant() {
        return this.skip(token_1.JsonTokenType.WHITESPACE, token_1.JsonTokenType.NEWLINE, token_1.JsonTokenType.LINE_COMMENT, token_1.JsonTokenType.BLOCK_COMMENT);
      }
      skip(...types) {
        const tokens = [];
        while (!this.isEof() && this.matches(...types)) {
          tokens.push(this.peek());
          this.next();
        }
        return tokens;
      }
      expect(type, ...other) {
        const token = this.peek();
        const types = [type, ...other];
        if (!_JsonLexer.isTokenType(token, types)) {
          const { line, column } = token.location.start;
          const expectedTypes = types.length === 1 ? types[0] : `either ${types.slice(0, -1).join(", ")} or ${types[types.length - 1]}`;
          throw new error_1.JsonParseError(`Expected ${expectedTypes}, but got ${token.type} at ${line}:${column}.`, token.location);
        }
        return token;
      }
      consume(type, ...types) {
        const token = this.expect(type, ...types);
        if (!this.isEof()) {
          this.next();
        }
        return token;
      }
      matches(...types) {
        return _JsonLexer.isTokenType(this.peek(), types);
      }
      peek() {
        if (this.current === null) {
          throw new Error("No token has been consumed yet.");
        }
        return this.current;
      }
      next() {
        if (this.isEof()) {
          throw new Error("The end of the input has been reached.");
        }
        if (this.remaining === "") {
          this.current = this.createToken(token_1.JsonTokenType.EOF, "");
        } else {
          this.current = this.match();
          this.remaining = this.remaining.slice(this.current.value.length);
        }
        return this.current;
      }
      match() {
        var _a2, _b2, _c2;
        for (const { type, pattern } of _JsonLexer.PATTERNS) {
          if (typeof pattern === "string") {
            if (this.remaining.startsWith(pattern)) {
              return this.createToken(type, pattern);
            }
            continue;
          }
          const match = this.remaining.match(pattern);
          if (match !== null) {
            return this.createToken(type, match[0]);
          }
        }
        const start = {
          index: ((_a2 = this.current) == null ? void 0 : _a2.location.end.index) ?? 0,
          line: ((_b2 = this.current) == null ? void 0 : _b2.location.end.line) ?? 1,
          column: ((_c2 = this.current) == null ? void 0 : _c2.location.end.column) ?? 1
        };
        const end = {
          index: start.index + 1,
          line: start.line,
          column: start.column + 1
        };
        const char = this.remaining[0];
        throw new error_1.JsonParseError(`Unexpected token '${char}' at ${start.line}:${start.column}.`, {
          start,
          end
        });
      }
      createToken(type, value) {
        var _a2, _b2, _c2;
        const start = {
          index: ((_a2 = this.current) == null ? void 0 : _a2.location.end.index) ?? 0,
          line: ((_b2 = this.current) == null ? void 0 : _b2.location.end.line) ?? 1,
          column: ((_c2 = this.current) == null ? void 0 : _c2.location.end.column) ?? 1
        };
        const end = {
          index: start.index,
          line: start.line,
          column: start.column
        };
        end.index += [...value].length;
        for (const char of value) {
          if (char === "\n") {
            end.line++;
            end.column = 1;
          } else {
            end.column++;
          }
        }
        return {
          type,
          value,
          location: {
            start,
            end
          }
        };
      }
      static isTokenType(token, types) {
        return types.length === 0 || types.includes(token.type);
      }
    };
    exports2.JsonLexer = JsonLexer;
    JsonLexer.PATTERNS = [
      {
        type: token_1.JsonTokenType.BRACE_LEFT,
        pattern: "{"
      },
      {
        type: token_1.JsonTokenType.BRACE_RIGHT,
        pattern: "}"
      },
      {
        type: token_1.JsonTokenType.BRACKET_LEFT,
        pattern: "["
      },
      {
        type: token_1.JsonTokenType.BRACKET_RIGHT,
        pattern: "]"
      },
      {
        type: token_1.JsonTokenType.COLON,
        pattern: ":"
      },
      {
        type: token_1.JsonTokenType.COMMA,
        pattern: ","
      },
      {
        type: token_1.JsonTokenType.LINE_COMMENT,
        pattern: /^\/\/.*/
      },
      {
        type: token_1.JsonTokenType.BLOCK_COMMENT,
        pattern: /^\/\*[\s\S]*?\*\//
      },
      {
        type: token_1.JsonTokenType.STRING,
        pattern: /^"(?:[^"\r\n\u2028\u2029\\]|\\(?:.|\r\n|\r|\n|\u2028|\u2029))*"/u
      },
      {
        type: token_1.JsonTokenType.STRING,
        pattern: /^'(?:[^'\r\n\u2028\u2029\\]|\\(?:.|\r\n|\r|\n|\u2028|\u2029))*'/u
      },
      {
        type: token_1.JsonTokenType.NEWLINE,
        pattern: /^(\r?\n)/
      },
      {
        type: token_1.JsonTokenType.WHITESPACE,
        pattern: /^[ \r\t\v\f\u00A0\u2028\u2029\uFEFF\u1680\u2000-\u200A\u202F\u205F\u3000]+/
      },
      {
        type: token_1.JsonTokenType.NUMBER,
        pattern: /^[-+]?((?:NaN|Infinity)(?![$_\u200C\u200D\p{ID_Continue}])|0[xX][\da-fA-F]+|(?:(?:0|[1-9]\d*)(?:\.\d*)?|\.\d*)(?:[eE][+-]?\d+)?)/u
      },
      {
        type: token_1.JsonTokenType.NULL,
        pattern: /^null(?![$_\u200C\u200D\p{ID_Continue}])/u
      },
      {
        type: token_1.JsonTokenType.BOOLEAN,
        pattern: /^(true|false)(?![$_\u200C\u200D\p{ID_Continue}])/u
      },
      {
        type: token_1.JsonTokenType.IDENTIFIER,
        pattern: new RegExp(`^${identifier_1.identifierRegex.source}`, identifier_1.identifierRegex.flags)
      }
    ];
  }
});

// node_modules/.pnpm/@croct+json5-parser@0.2.1/node_modules/@croct/json5-parser/location.js
var require_location = __commonJS({
  "node_modules/.pnpm/@croct+json5-parser@0.2.1/node_modules/@croct/json5-parser/location.js"(exports2) {
    "use strict";
    Object.defineProperty(exports2, "__esModule", { value: true });
    exports2.SourceLocation = exports2.SourcePosition = void 0;
    var SourcePosition;
    (function(SourcePosition2) {
      function unknown() {
        return {
          index: -1,
          line: 0,
          column: 0
        };
      }
      SourcePosition2.unknown = unknown;
    })(SourcePosition || (exports2.SourcePosition = SourcePosition = {}));
    var SourceLocation;
    (function(SourceLocation2) {
      function unknown() {
        return {
          start: SourcePosition.unknown(),
          end: SourcePosition.unknown()
        };
      }
      SourceLocation2.unknown = unknown;
    })(SourceLocation || (exports2.SourceLocation = SourceLocation = {}));
  }
});

// node_modules/.pnpm/@croct+json5-parser@0.2.1/node_modules/@croct/json5-parser/node/node.js
var require_node = __commonJS({
  "node_modules/.pnpm/@croct+json5-parser@0.2.1/node_modules/@croct/json5-parser/node/node.js"(exports2) {
    "use strict";
    Object.defineProperty(exports2, "__esModule", { value: true });
    exports2.JsonNode = void 0;
    var location_1 = require_location();
    var JsonNode = class {
      constructor(definition) {
        this.location = definition.location ?? location_1.SourceLocation.unknown();
      }
      equals(other) {
        return this.equalsLocation(other) && this.isEquivalent(other);
      }
      equalsLocation(other) {
        return this.location.start.index === other.location.start.index && this.location.start.line === other.location.start.line && this.location.start.column === other.location.start.column && this.location.end.index === other.location.end.index && this.location.end.line === other.location.end.line && this.location.end.column === other.location.end.column;
      }
    };
    exports2.JsonNode = JsonNode;
  }
});

// node_modules/.pnpm/@croct+json5-parser@0.2.1/node_modules/@croct/json5-parser/node/compositeNode.js
var require_compositeNode = __commonJS({
  "node_modules/.pnpm/@croct+json5-parser@0.2.1/node_modules/@croct/json5-parser/node/compositeNode.js"(exports2) {
    "use strict";
    Object.defineProperty(exports2, "__esModule", { value: true });
    exports2.JsonCompositeNode = void 0;
    var node_1 = require_node();
    var JsonCompositeNode = class _JsonCompositeNode extends node_1.JsonNode {
      constructor(definition) {
        super(definition);
        this.children = [...definition.children ?? []];
      }
      toString(formatting) {
        const clone = this.clone();
        clone.rebuild(formatting);
        return _JsonCompositeNode.flatten(clone).join("");
      }
      reformat(formatting = {}) {
        this.reset();
        this.rebuild(formatting);
      }
      static flatten(node) {
        if (node instanceof _JsonCompositeNode) {
          return node.children.flatMap(_JsonCompositeNode.flatten);
        }
        return [node];
      }
    };
    exports2.JsonCompositeNode = JsonCompositeNode;
  }
});

// node_modules/.pnpm/@croct+json5-parser@0.2.1/node_modules/@croct/json5-parser/node/valueNode.js
var require_valueNode = __commonJS({
  "node_modules/.pnpm/@croct+json5-parser@0.2.1/node_modules/@croct/json5-parser/node/valueNode.js"(exports2) {
    "use strict";
    Object.defineProperty(exports2, "__esModule", { value: true });
    exports2.JsonValueNode = void 0;
    var compositeNode_1 = require_compositeNode();
    var error_1 = require_error();
    var JsonValueNode = class extends compositeNode_1.JsonCompositeNode {
      cast(type) {
        if (!(this instanceof type)) {
          throw new error_1.JsonError(`Expected value of type ${type.name}, but got ${this.constructor.name}.`);
        }
        return this;
      }
    };
    exports2.JsonValueNode = JsonValueNode;
  }
});

// node_modules/.pnpm/@croct+json5-parser@0.2.1/node_modules/@croct/json5-parser/node/tokenNode.js
var require_tokenNode = __commonJS({
  "node_modules/.pnpm/@croct+json5-parser@0.2.1/node_modules/@croct/json5-parser/node/tokenNode.js"(exports2) {
    "use strict";
    Object.defineProperty(exports2, "__esModule", { value: true });
    exports2.JsonTokenNode = void 0;
    var token_1 = require_token();
    var node_1 = require_node();
    var JsonTokenNode = class _JsonTokenNode extends node_1.JsonNode {
      constructor(definition) {
        super(definition);
        this.type = definition.type;
        this.value = definition.value;
      }
      isType(type) {
        return token_1.JsonToken.isType(this, type);
      }
      clone() {
        return new _JsonTokenNode({
          type: this.type,
          value: this.value,
          location: this.location
        });
      }
      isEquivalent(other) {
        return other instanceof _JsonTokenNode && this.type === other.type && this.value === other.value;
      }
      toString() {
        return this.value;
      }
    };
    exports2.JsonTokenNode = JsonTokenNode;
  }
});

// node_modules/.pnpm/@croct+json5-parser@0.2.1/node_modules/@croct/json5-parser/manipulator.js
var require_manipulator = __commonJS({
  "node_modules/.pnpm/@croct+json5-parser@0.2.1/node_modules/@croct/json5-parser/manipulator.js"(exports2) {
    "use strict";
    Object.defineProperty(exports2, "__esModule", { value: true });
    exports2.NodeManipulator = exports2.NodeMatcher = void 0;
    var token_1 = require_token();
    var node_1 = require_node2();
    var NodeMatcher;
    (function(NodeMatcher2) {
      NodeMatcher2.ANY = () => true;
      NodeMatcher2.NONE = () => false;
      NodeMatcher2.SIGNIFICANT = (node) => !NodeMatcher2.INSIGNIFICANT(node);
      NodeMatcher2.INSIGNIFICANT = (node) => NodeMatcher2.SPACE(node) || NodeMatcher2.COMMENT(node);
      NodeMatcher2.SPACE = (node) => NodeMatcher2.WHITESPACE(node) || NodeMatcher2.NEWLINE(node);
      NodeMatcher2.WHITESPACE = (node) => node instanceof node_1.JsonTokenNode && node.type === token_1.JsonTokenType.WHITESPACE;
      NodeMatcher2.NEWLINE = (node) => node instanceof node_1.JsonTokenNode && node.type === token_1.JsonTokenType.NEWLINE;
      NodeMatcher2.COMMENT = (node) => NodeMatcher2.LINE_COMMENT(node) || NodeMatcher2.BLOCK_COMMENT(node);
      NodeMatcher2.LINE_COMMENT = (node) => node instanceof node_1.JsonTokenNode && node.type === token_1.JsonTokenType.LINE_COMMENT;
      NodeMatcher2.BLOCK_COMMENT = (node) => node instanceof node_1.JsonTokenNode && node.type === token_1.JsonTokenType.BLOCK_COMMENT;
      NodeMatcher2.PUNCTUATION = (node) => node instanceof node_1.JsonTokenNode && [
        token_1.JsonTokenType.COLON,
        token_1.JsonTokenType.COMMA,
        token_1.JsonTokenType.BRACE_LEFT,
        token_1.JsonTokenType.BRACE_RIGHT,
        token_1.JsonTokenType.BRACKET_LEFT,
        token_1.JsonTokenType.BRACKET_RIGHT
      ].includes(node.type);
    })(NodeMatcher || (exports2.NodeMatcher = NodeMatcher = {}));
    var NodeManipulator = class _NodeManipulator {
      constructor(list) {
        this.index = 0;
        this.fixing = false;
        this.list = list;
      }
      done() {
        return this.index >= this.list.length;
      }
      next() {
        if (this.done()) {
          throw new Error("The iterator is at the end of the list.");
        }
        this.index++;
      }
      get position() {
        return this.index;
      }
      seek(position) {
        if (position < 0 || position >= this.list.length) {
          throw new Error("The position is out of bounds.");
        }
        this.index = position;
      }
      previous() {
        if (this.index === 0) {
          throw new Error("The iterator is at the beginning of the list.");
        }
        this.index--;
      }
      get current() {
        if (this.done()) {
          throw new Error("The iterator is at the end of the list.");
        }
        return this.list[this.index];
      }
      get nodeList() {
        return this.list;
      }
      matchesPreviousToken(type) {
        if (this.index === 0) {
          return false;
        }
        const previous = this.list[this.index - 1];
        return previous instanceof node_1.JsonTokenNode && previous.type === type;
      }
      matches(node) {
        return this.findMatch([node]) >= 0;
      }
      matchesToken(type) {
        return this.matchesNext((current) => current instanceof node_1.JsonTokenNode && current.type === type, NodeMatcher.NONE);
      }
      matchesNext(matcher, skipped) {
        return this.findNext(matcher, skipped) >= 0;
      }
      findNext(matcher, skipper = NodeMatcher.INSIGNIFICANT) {
        let matchIndex = -1;
        const previousPosition = this.index;
        while (!this.done()) {
          const { current } = this;
          if (matcher(current)) {
            matchIndex = this.index;
            break;
          }
          if (skipper(current)) {
            this.next();
            continue;
          }
          break;
        }
        this.index = previousPosition;
        return matchIndex;
      }
      token(token, $optional = false) {
        return this.nodes([token], $optional);
      }
      node(node, $optional = false) {
        return this.nodes([node], $optional);
      }
      nodes(nodes, optional = false) {
        const index = this.findMatch(nodes);
        if (index >= 0) {
          if (nodes.length === 1) {
            this.seek(index);
            this.remove();
            this.insert(nodes[0]);
          } else {
            this.seek(index + 1);
          }
          this.fixing = false;
        } else if (!optional) {
          this.fixing = true;
          this.accommodate(nodes[0]);
        }
        return this;
      }
      insert(node) {
        this.list.splice(this.index, 0, node);
        this.next();
        return this;
      }
      remove() {
        this.list.splice(this.index, 1);
        return this;
      }
      dropUntil(matcher) {
        let fixing = false;
        const startIndex = this.index;
        while (!this.done()) {
          const node = this.current;
          if (matcher(node)) {
            if (fixing) {
              this.fixSpacing(startIndex);
            }
            return true;
          }
          if (!(node instanceof node_1.JsonTokenNode) || NodeMatcher.SIGNIFICANT(node)) {
            this.remove();
            fixing = true;
            continue;
          }
          if (!fixing || node.type === token_1.JsonTokenType.WHITESPACE) {
            this.next();
            continue;
          }
          this.fixSpacing(startIndex);
          fixing = false;
        }
        if (fixing) {
          this.fixSpacing(startIndex);
        }
        return false;
      }
      end() {
        this.dropUntil(NodeMatcher.NONE);
        if (!this.fixing) {
          return this;
        }
        while (this.index > 0) {
          this.previous();
          const node = this.current;
          if (NodeMatcher.INSIGNIFICANT(node)) {
            this.remove();
            continue;
          }
          this.next();
          break;
        }
        return this;
      }
      findMatch(nodes) {
        return this.findNext((current) => nodes.some((node) => current == null ? void 0 : current.isEquivalent(node)), NodeMatcher.INSIGNIFICANT);
      }
      fixSpacing(startIndex) {
        const currentToken = this.done() ? null : this.current;
        let removalCount = 0;
        while (this.index > startIndex) {
          this.previous();
          const node = this.current;
          if (!NodeMatcher.WHITESPACE(node)) {
            this.next();
            break;
          }
          removalCount++;
        }
        const previousToken = this.list[this.index - 1] ?? null;
        if (currentToken !== null) {
          if (previousToken === null && NodeMatcher.SPACE(currentToken) || removalCount > 0 && (NodeMatcher.BLOCK_COMMENT(previousToken) && NodeMatcher.PUNCTUATION(currentToken) || NodeMatcher.BLOCK_COMMENT(currentToken) && NodeMatcher.PUNCTUATION(previousToken))) {
            removalCount++;
          } else if (NodeMatcher.NEWLINE(previousToken) && NodeMatcher.NEWLINE(currentToken)) {
            removalCount++;
            this.previous();
          } else if (!NodeMatcher.NEWLINE(currentToken)) {
            removalCount--;
            this.next();
          }
        }
        while (removalCount-- > 0) {
          this.remove();
        }
      }
      accommodate(node) {
        if (NodeMatcher.INSIGNIFICANT(node)) {
          this.insert(node);
          return;
        }
        if (!this.done()) {
          const index = this.findNext((current) => _NodeManipulator.isReplacement(current, node));
          if (index >= 0) {
            this.seek(index);
            this.remove();
            this.fixing = false;
          }
        }
        this.insert(node);
      }
      static isReplacement(previousNode, currentNode) {
        if (currentNode instanceof node_1.JsonTokenNode || previousNode instanceof node_1.JsonTokenNode) {
          return previousNode.isEquivalent(currentNode);
        }
        if (currentNode instanceof node_1.JsonValueNode && previousNode instanceof node_1.JsonValueNode) {
          return true;
        }
        return previousNode.constructor === currentNode.constructor;
      }
    };
    exports2.NodeManipulator = NodeManipulator;
  }
});

// node_modules/.pnpm/@croct+json5-parser@0.2.1/node_modules/@croct/json5-parser/node/factory.js
var require_factory = __commonJS({
  "node_modules/.pnpm/@croct+json5-parser@0.2.1/node_modules/@croct/json5-parser/node/factory.js"(exports2) {
    "use strict";
    Object.defineProperty(exports2, "__esModule", { value: true });
    exports2.JsonValueFactory = void 0;
    var valueNode_1 = require_valueNode();
    var JsonValueFactory;
    (function(JsonValueFactory2) {
      const factories = {};
      function register(type, factory) {
        factories[type] = factory;
      }
      JsonValueFactory2.register = register;
      function create(value) {
        if (value instanceof valueNode_1.JsonValueNode) {
          return value;
        }
        if (Array.isArray(value)) {
          return factories.array(value);
        }
        if (typeof value === "object" && value !== null) {
          return factories.object(value);
        }
        return factories.primitive(value);
      }
      JsonValueFactory2.create = create;
    })(JsonValueFactory || (exports2.JsonValueFactory = JsonValueFactory = {}));
  }
});

// node_modules/.pnpm/@croct+json5-parser@0.2.1/node_modules/@croct/json5-parser/node/identifierNode.js
var require_identifierNode = __commonJS({
  "node_modules/.pnpm/@croct+json5-parser@0.2.1/node_modules/@croct/json5-parser/node/identifierNode.js"(exports2) {
    "use strict";
    Object.defineProperty(exports2, "__esModule", { value: true });
    exports2.JsonIdentifierNode = void 0;
    var valueNode_1 = require_valueNode();
    var manipulator_1 = require_manipulator();
    var tokenNode_1 = require_tokenNode();
    var token_1 = require_token();
    var factory_1 = require_factory();
    var identifier_1 = require_identifier();
    var error_1 = require_error();
    var JsonIdentifierNode = class _JsonIdentifierNode extends valueNode_1.JsonValueNode {
      constructor(definition) {
        super(definition);
        this.token = definition.token;
      }
      static of(name) {
        if (!(0, identifier_1.isIdentifier)(name)) {
          throw new error_1.JsonError(`Invalid identifier '${name}'.`);
        }
        return new _JsonIdentifierNode({
          token: new tokenNode_1.JsonTokenNode({
            type: token_1.JsonTokenType.IDENTIFIER,
            value: name
          })
        });
      }
      update(other) {
        const node = factory_1.JsonValueFactory.create(other);
        if (!this.isEquivalent(node)) {
          return node;
        }
        return this;
      }
      reset() {
        this.children.length = 0;
      }
      rebuild() {
        new manipulator_1.NodeManipulator(this.children).node(this.token).end();
      }
      clone() {
        const tokenClone = this.token.clone();
        return new _JsonIdentifierNode({
          token: tokenClone,
          children: this.children.map((child) => child === this.token ? tokenClone : child),
          location: this.location
        });
      }
      isEquivalent(other) {
        return other instanceof _JsonIdentifierNode && this.token.equals(other.token);
      }
      toJSON() {
        return this.token.value;
      }
    };
    exports2.JsonIdentifierNode = JsonIdentifierNode;
  }
});

// node_modules/.pnpm/@croct+json5-parser@0.2.1/node_modules/@croct/json5-parser/node/primitiveNode.js
var require_primitiveNode = __commonJS({
  "node_modules/.pnpm/@croct+json5-parser@0.2.1/node_modules/@croct/json5-parser/node/primitiveNode.js"(exports2) {
    "use strict";
    Object.defineProperty(exports2, "__esModule", { value: true });
    exports2.JsonPrimitiveNode = void 0;
    var valueNode_1 = require_valueNode();
    var manipulator_1 = require_manipulator();
    var tokenNode_1 = require_tokenNode();
    var token_1 = require_token();
    var factory_1 = require_factory();
    var JsonPrimitiveNode = class _JsonPrimitiveNode extends valueNode_1.JsonValueNode {
      constructor(definition) {
        super(definition);
        this.token = definition.token;
        this.value = definition.value;
      }
      static of(value) {
        return factory_1.JsonValueFactory.create(value);
      }
      static ofHex(value) {
        return new _JsonPrimitiveNode({
          token: new tokenNode_1.JsonTokenNode({
            type: token_1.JsonTokenType.NUMBER,
            value: `"0x${value.toString(16)}"`
          }),
          value
        });
      }
      update(other) {
        const node = factory_1.JsonValueFactory.create(other);
        if (!this.isEquivalent(node)) {
          return node;
        }
        return this;
      }
      reset() {
        this.children.length = 0;
      }
      rebuild(formatting) {
        var _a2;
        const manipulator = new manipulator_1.NodeManipulator(this.children);
        let token = this.token;
        if (token.isType(token_1.JsonTokenType.STRING) && manipulator.done()) {
          const quotes = (_a2 = formatting == null ? void 0 : formatting.string) == null ? void 0 : _a2.quote;
          if (quotes === "single") {
            let value = JSON.stringify(this.value).slice(1, -1).replace(/((?:^|[^\\])(?:\\\\)*)\\"/g, (_3, preceding) => `${preceding}"`).replace(/'/g, "\\'");
            value = `'${value}'`;
            token = new tokenNode_1.JsonTokenNode({
              type: token_1.JsonTokenType.STRING,
              value
            });
          }
        }
        manipulator.node(token);
        manipulator.end();
      }
      clone() {
        const tokenClone = this.token.clone();
        return new _JsonPrimitiveNode({
          token: tokenClone,
          value: this.value,
          children: this.children.map((child) => child === this.token ? tokenClone : child.clone()),
          location: this.location
        });
      }
      isEquivalent(other) {
        return other instanceof _JsonPrimitiveNode && this.token.equals(other.token) && this.value === other.value;
      }
      toJSON() {
        return this.value;
      }
    };
    exports2.JsonPrimitiveNode = JsonPrimitiveNode;
    var tokenTypes = {
      string: token_1.JsonTokenType.STRING,
      number: token_1.JsonTokenType.NUMBER,
      boolean: token_1.JsonTokenType.BOOLEAN,
      null: token_1.JsonTokenType.NULL
    };
    factory_1.JsonValueFactory.register("primitive", (value) => new JsonPrimitiveNode({
      value,
      token: new tokenNode_1.JsonTokenNode({
        type: tokenTypes[value === null ? "null" : typeof value],
        value: JSON.stringify(value)
      })
    }));
  }
});

// node_modules/.pnpm/@croct+json5-parser@0.2.1/node_modules/@croct/json5-parser/node/propertyNode.js
var require_propertyNode = __commonJS({
  "node_modules/.pnpm/@croct+json5-parser@0.2.1/node_modules/@croct/json5-parser/node/propertyNode.js"(exports2) {
    "use strict";
    Object.defineProperty(exports2, "__esModule", { value: true });
    exports2.JsonPropertyNode = void 0;
    var tokenNode_1 = require_tokenNode();
    var token_1 = require_token();
    var compositeNode_1 = require_compositeNode();
    var manipulator_1 = require_manipulator();
    var factory_1 = require_factory();
    var identifierNode_1 = require_identifierNode();
    var identifier_1 = require_identifier();
    var primitiveNode_1 = require_primitiveNode();
    var JsonPropertyNode = class _JsonPropertyNode extends compositeNode_1.JsonCompositeNode {
      constructor(definition) {
        super(definition);
        this.key = definition.key;
        this.value = definition.value;
      }
      reset() {
        this.key.reset();
        this.value.reset();
        this.children.length = 0;
      }
      set(value) {
        this.value = factory_1.JsonValueFactory.create(value);
      }
      rebuild(formatting) {
        var _a2, _b2, _c2;
        this.value.rebuild(formatting);
        const quote = (_a2 = formatting == null ? void 0 : formatting.property) == null ? void 0 : _a2.quote;
        const spaced = ((_b2 = formatting == null ? void 0 : formatting.object) == null ? void 0 : _b2.colonSpacing) ?? false;
        const manipulator = new manipulator_1.NodeManipulator(this.children);
        let { key } = this;
        if (manipulator.matches(this.key)) {
          key.rebuild();
        } else {
          key = this.formatKey(formatting);
          key.rebuild({
            ...formatting,
            string: {
              quote: quote === "single" || quote === "double" ? quote : (_c2 = formatting == null ? void 0 : formatting.string) == null ? void 0 : _c2.quote
            }
          });
        }
        manipulator.node(key);
        manipulator.token(new tokenNode_1.JsonTokenNode({
          type: token_1.JsonTokenType.COLON,
          value: ":"
        }));
        if (spaced) {
          manipulator.token(new tokenNode_1.JsonTokenNode({
            type: token_1.JsonTokenType.WHITESPACE,
            value: " "
          }), !manipulator.done());
        }
        manipulator.node(this.value).end();
      }
      formatKey(formatting) {
        var _a2;
        if (this.key instanceof primitiveNode_1.JsonPrimitiveNode && ((_a2 = formatting == null ? void 0 : formatting.property) == null ? void 0 : _a2.unquoted) === true && (0, identifier_1.isIdentifier)(this.key.value)) {
          return identifierNode_1.JsonIdentifierNode.of(this.key.value);
        }
        return this.key;
      }
      clone() {
        const keyClone = this.key.clone();
        const valueClone = this.value.clone();
        return new _JsonPropertyNode({
          key: keyClone,
          value: valueClone,
          children: this.children.map((child) => {
            if (child === this.key) {
              return keyClone;
            }
            if (child === this.value) {
              return valueClone;
            }
            return child.clone();
          }),
          location: this.location
        });
      }
      isEquivalent(other) {
        if (!(other instanceof _JsonPropertyNode)) {
          return false;
        }
        return this.key.isEquivalent(other.key) && this.value.isEquivalent(other.value);
      }
    };
    exports2.JsonPropertyNode = JsonPropertyNode;
  }
});

// node_modules/.pnpm/@croct+json5-parser@0.2.1/node_modules/@croct/json5-parser/node/structureNode.js
var require_structureNode = __commonJS({
  "node_modules/.pnpm/@croct+json5-parser@0.2.1/node_modules/@croct/json5-parser/node/structureNode.js"(exports2) {
    "use strict";
    Object.defineProperty(exports2, "__esModule", { value: true });
    exports2.JsonStructureNode = exports2.StructureDelimiter = void 0;
    var valueNode_1 = require_valueNode();
    var token_1 = require_token();
    var tokenNode_1 = require_tokenNode();
    var manipulator_1 = require_manipulator();
    var compositeNode_1 = require_compositeNode();
    var propertyNode_1 = require_propertyNode();
    var COMMENT = manipulator_1.NodeMatcher.COMMENT;
    var WHITESPACE = manipulator_1.NodeMatcher.WHITESPACE;
    var NEWLINE = manipulator_1.NodeMatcher.NEWLINE;
    var SPACE = manipulator_1.NodeMatcher.SPACE;
    var INSIGNIFICANT = manipulator_1.NodeMatcher.INSIGNIFICANT;
    var StructureDelimiter;
    (function(StructureDelimiter2) {
      StructureDelimiter2["OBJECT"] = "object";
      StructureDelimiter2["ARRAY"] = "array";
    })(StructureDelimiter || (exports2.StructureDelimiter = StructureDelimiter = {}));
    (function(StructureDelimiter2) {
      const definitions = {
        [StructureDelimiter2.OBJECT]: {
          start: {
            type: token_1.JsonTokenType.BRACE_LEFT,
            value: "{"
          },
          end: {
            type: token_1.JsonTokenType.BRACE_RIGHT,
            value: "}"
          }
        },
        [StructureDelimiter2.ARRAY]: {
          start: {
            type: token_1.JsonTokenType.BRACKET_LEFT,
            value: "["
          },
          end: {
            type: token_1.JsonTokenType.BRACKET_RIGHT,
            value: "]"
          }
        }
      };
      function isStartToken(token) {
        return Object.values(definitions).some(({ start }) => start.type === token.type);
      }
      StructureDelimiter2.isStartToken = isStartToken;
      function isEndToken(token) {
        return Object.values(definitions).some(({ end }) => end.type === token.type);
      }
      StructureDelimiter2.isEndToken = isEndToken;
      function getStartToken(delimiter) {
        return new tokenNode_1.JsonTokenNode(definitions[delimiter].start);
      }
      StructureDelimiter2.getStartToken = getStartToken;
      function getEndToken(delimiter) {
        return new tokenNode_1.JsonTokenNode(definitions[delimiter].end);
      }
      StructureDelimiter2.getEndToken = getEndToken;
    })(StructureDelimiter || (exports2.StructureDelimiter = StructureDelimiter = {}));
    var JsonStructureNode = class _JsonStructureNode extends valueNode_1.JsonValueNode {
      reset() {
        for (const item of this.getList()) {
          item.reset();
        }
        this.children.length = 0;
      }
      rebuild(formatting = {}) {
        const parentFormatting = this.detectFormatting(formatting);
        let childFormatting = parentFormatting;
        const children = [...this.children];
        for (let index = 0; index < children.length; index++) {
          const child = children[index];
          if (child instanceof _JsonStructureNode) {
            childFormatting = {
              ...child.detectFormatting(childFormatting),
              indentationLevel: childFormatting.indentationLevel
            };
            continue;
          }
          if (child instanceof compositeNode_1.JsonCompositeNode && this.children.includes(child)) {
            children.splice(index + 1, 0, ...child.children);
          }
        }
        for (const item of this.getList()) {
          item.rebuild(childFormatting);
        }
        this.rebuildChildren(parentFormatting);
      }
      rebuildChildren(formatting) {
        const manipulator = new manipulator_1.NodeManipulator(this.children);
        const delimiter = this.getDelimiter();
        const startToken = StructureDelimiter.getStartToken(delimiter);
        const endToken = StructureDelimiter.getEndToken(delimiter);
        manipulator.token(startToken);
        const list = this.getList();
        const count2 = list.length;
        const { indentationLevel = 0 } = formatting;
        const { indentationSize = 0, commaSpacing = false, entryIndentation = false, leadingIndentation: blockLeadingIndentation = false, trailingIndentation: blockTrailingIndentation = false, trailingComma = false } = formatting[delimiter] ?? {};
        let previousMatched = false;
        for (let index = 0; index < count2; index++) {
          const item = list[index];
          const leadingIndentation = index !== 0 && entryIndentation || index === 0 && blockLeadingIndentation;
          if (_JsonStructureNode.matchesInsertion(manipulator, list, index)) {
            if (leadingIndentation) {
              this.indent(manipulator, formatting);
            }
            manipulator.insert(item);
            previousMatched = false;
          } else if (_JsonStructureNode.matchesRemoval(manipulator, list, index)) {
            manipulator.dropUntil(item.isEquivalent.bind(item));
            manipulator.node(item);
            previousMatched = true;
          } else {
            const currentMatched = manipulator.matches(item);
            if (!currentMatched) {
              _JsonStructureNode.skipComments(manipulator);
            }
            if (leadingIndentation) {
              if (indentationSize > 0 && manipulator.matchesNext((node) => endToken.isEquivalent(node))) {
                manipulator.node(new tokenNode_1.JsonTokenNode({
                  type: token_1.JsonTokenType.NEWLINE,
                  value: "\n"
                }));
                if (manipulator.matchesToken(token_1.JsonTokenType.WHITESPACE) && manipulator.matchesNext(manipulator_1.NodeMatcher.NEWLINE, manipulator_1.NodeMatcher.WHITESPACE)) {
                  manipulator.remove();
                }
                manipulator.token(this.getIndentationToken(formatting));
              } else {
                this.indent(manipulator, formatting, previousMatched && currentMatched);
              }
            }
            previousMatched = currentMatched;
            if (manipulator.matchesPreviousToken(token_1.JsonTokenType.LINE_COMMENT)) {
              manipulator.insert(new tokenNode_1.JsonTokenNode({
                type: token_1.JsonTokenType.NEWLINE,
                value: "\n"
              }));
            } else if (manipulator.position > 1 && !currentMatched && manipulator.matchesPreviousToken(token_1.JsonTokenType.BLOCK_COMMENT) && !manipulator.matchesToken(token_1.JsonTokenType.WHITESPACE)) {
              manipulator.previous();
              const trailingSpace = manipulator.matchesPreviousToken(token_1.JsonTokenType.WHITESPACE);
              manipulator.next();
              if (trailingSpace) {
                manipulator.token(new tokenNode_1.JsonTokenNode({
                  type: token_1.JsonTokenType.WHITESPACE,
                  value: " "
                }));
              }
            }
            manipulator.node(item);
          }
          if (index < count2 - 1 || trailingComma) {
            manipulator.node(new tokenNode_1.JsonTokenNode({
              type: token_1.JsonTokenType.COMMA,
              value: ","
            }));
          }
          if (index === count2 - 1) {
            if (blockTrailingIndentation) {
              this.indent(manipulator, {
                ...formatting,
                indentationLevel: indentationLevel - 1
              });
            }
          } else if ((indentationSize === 0 || !entryIndentation) && commaSpacing && (!manipulator.matchesNext(manipulator_1.NodeMatcher.SPACE) || manipulator.matchesNext((node) => endToken.isEquivalent(node), manipulator_1.NodeMatcher.SPACE))) {
            manipulator.token(new tokenNode_1.JsonTokenNode({
              type: token_1.JsonTokenType.WHITESPACE,
              value: " "
            }), manipulator.matchesNext((node) => list[index + 1].isEquivalent(node), manipulator_1.NodeMatcher.SPACE));
          }
        }
        if (count2 === 0) {
          const index = manipulator.findNext((node) => node.isEquivalent(endToken), manipulator_1.NodeMatcher.ANY);
          if (index >= 0) {
            manipulator.dropUntil((node) => node.isEquivalent(endToken));
          }
        }
        manipulator.token(endToken);
        manipulator.end();
      }
      detectFormatting(parent = {}) {
        let blockStart = false;
        let lineStart = true;
        let inlineComma = false;
        let inlineColon = false;
        let levelComma = false;
        let lineIndentationSize = 0;
        let levelIndentationSize = 0;
        let leadingIndentation;
        let trailingIndentation;
        let trailingComma = false;
        let newLine = false;
        let immediatelyClosed = true;
        let empty = true;
        const formatting = {};
        const blockFormatting = {};
        const tokens = [..._JsonStructureNode.iterate(this, this.getMaxDepth())];
        for (let index = 0; index < tokens.length; index++) {
          const { token, depth, parents } = tokens[index];
          switch (token.type) {
            case token_1.JsonTokenType.IDENTIFIER:
              formatting.property = {
                ...formatting.property,
                unquoted: true
              };
              break;
            case token_1.JsonTokenType.STRING: {
              const grandParent = parents[parents.length - 2];
              const quote = token.value.startsWith("'") ? "single" : "double";
              if (grandParent instanceof propertyNode_1.JsonPropertyNode && grandParent.key.equals(parents[parents.length - 1])) {
                formatting.property = {
                  ...formatting.property,
                  quote
                };
              } else {
                formatting.string = {
                  ...formatting.string,
                  quote
                };
              }
              break;
            }
          }
          if (depth === 0 && StructureDelimiter.isStartToken(token)) {
            blockStart = true;
          } else {
            const blockEnd = StructureDelimiter.isEndToken(token);
            if (depth === 0) {
              if (blockEnd) {
                trailingIndentation = lineStart;
                trailingComma = levelComma;
              }
              if (blockStart) {
                leadingIndentation = NEWLINE(token);
                if (!WHITESPACE(token)) {
                  blockStart = false;
                }
              }
            }
            if (!blockEnd) {
              levelIndentationSize = lineIndentationSize;
              immediatelyClosed = false;
              if (!SPACE(token)) {
                empty = false;
              }
            }
          }
          if (WHITESPACE(token)) {
            if (token.value.includes("	")) {
              formatting.indentationCharacter = "tab";
            }
            if (depth === 0 && lineStart) {
              lineIndentationSize = token.value.includes("	") ? token.value.replace(/[^\t]/g, "").length : token.value.replace(/[^ ]/g, "").length;
            }
          }
          if (inlineComma && index > 0 && tokens[index - 1].depth === 0) {
            if (!NEWLINE(token)) {
              blockFormatting.commaSpacing = WHITESPACE(token);
            }
            let entryIndentation = NEWLINE(token);
            for (let nextIndex = index; !entryIndentation && nextIndex < tokens.length; nextIndex++) {
              const { token: nextToken, depth: nextDepth } = tokens[nextIndex];
              if (nextDepth === 0) {
                if (WHITESPACE(nextToken) || COMMENT(nextToken)) {
                  continue;
                }
                if (NEWLINE(nextToken)) {
                  entryIndentation = true;
                }
              }
              break;
            }
            blockFormatting.entryIndentation = entryIndentation;
            inlineComma = false;
          }
          if (inlineColon) {
            blockFormatting.colonSpacing = WHITESPACE(token);
            inlineColon = false;
          }
          inlineColon = token.type === token_1.JsonTokenType.COLON || inlineColon && WHITESPACE(token);
          inlineComma = token.type === token_1.JsonTokenType.COMMA || inlineComma && WHITESPACE(token);
          levelComma = depth === 0 && token.type === token_1.JsonTokenType.COMMA || levelComma && INSIGNIFICANT(token);
          lineStart = NEWLINE(token) || lineStart && WHITESPACE(token);
          newLine = newLine || NEWLINE(token);
        }
        if (!immediatelyClosed) {
          if (!empty) {
            blockFormatting.indentationSize = 0;
            blockFormatting.trailingComma = trailingComma;
          }
          blockFormatting.leadingIndentation = leadingIndentation ?? false;
          blockFormatting.trailingIndentation = trailingIndentation ?? false;
        }
        const currentDepth = Math.max(parent.indentationLevel ?? 0, 0) + 1;
        if (levelIndentationSize > 0 && !empty) {
          const remainder = levelIndentationSize % currentDepth;
          blockFormatting.indentationSize = (levelIndentationSize - remainder) / currentDepth + remainder;
        }
        if (newLine) {
          if (blockFormatting.commaSpacing === void 0) {
            blockFormatting.commaSpacing = true;
          }
          if (blockFormatting.colonSpacing === void 0) {
            blockFormatting.colonSpacing = true;
          }
          if (blockFormatting.entryIndentation === void 0) {
            blockFormatting.entryIndentation = true;
          }
        }
        formatting[this.getDelimiter()] = blockFormatting;
        formatting.indentationLevel = currentDepth;
        return {
          ...parent,
          ...formatting,
          object: {
            ...parent.array,
            ...formatting.array,
            ...parent.object,
            ...formatting.object
          },
          array: {
            ...parent.object,
            ...formatting.object,
            ...parent.array,
            ...formatting.array
          }
        };
      }
      indent(manipulator, formatting, optional = false) {
        const delimiter = this.getDelimiter();
        const { indentationSize = 0, leadingIndentation = false, trailingIndentation = false } = formatting[delimiter] ?? {};
        if (indentationSize <= 0 && !leadingIndentation && !trailingIndentation) {
          return;
        }
        const newLine = new tokenNode_1.JsonTokenNode({
          type: token_1.JsonTokenType.NEWLINE,
          value: "\n"
        });
        manipulator.token(newLine, optional);
        if (manipulator.matchesToken(token_1.JsonTokenType.WHITESPACE)) {
          manipulator.next();
        } else {
          manipulator.token(this.getIndentationToken(formatting), optional);
        }
      }
      getIndentationToken(formatting) {
        const delimiter = this.getDelimiter();
        const { indentationLevel = 0 } = formatting;
        const { indentationSize = 0 } = formatting[delimiter] ?? {};
        const char = formatting.indentationCharacter === "tab" ? "	" : " ";
        return new tokenNode_1.JsonTokenNode({
          type: token_1.JsonTokenType.WHITESPACE,
          value: char.repeat(indentationLevel * indentationSize)
        });
      }
      static *iterate(parent, maxDepth, parents = []) {
        for (const child of parent.children) {
          if (child instanceof tokenNode_1.JsonTokenNode) {
            yield {
              depth: parents.length,
              token: child,
              parents: [...parents, parent]
            };
          }
          if (maxDepth > 0 && child instanceof compositeNode_1.JsonCompositeNode) {
            yield* _JsonStructureNode.iterate(child, maxDepth - 1, [...parents, parent]);
          }
        }
      }
      static skipComments(manipulator) {
        while (manipulator.matchesNext(manipulator_1.NodeMatcher.COMMENT, manipulator_1.NodeMatcher.SPACE)) {
          manipulator.next();
        }
      }
      static matchesInsertion(manipulator, items, index) {
        const count2 = items.length;
        const currentNode = items[index];
        if (manipulator.matchesNext(currentNode.isEquivalent.bind(currentNode), manipulator_1.NodeMatcher.ANY)) {
          return false;
        }
        for (let i2 = index + 1; i2 < count2; i2++) {
          if (manipulator.matches(items[i2])) {
            return true;
          }
        }
        return false;
      }
      static matchesRemoval(manipulator, items, index) {
        if (manipulator.matches(items[index])) {
          return false;
        }
        const nextItems = items.slice(index + 1);
        return manipulator.matchesNext(
          items[index].isEquivalent.bind(items[index]),
          // if any of the following nodes match one of
          // the remaining items before the current one,
          // items have been swapped, not dropped
          (item) => nextItems.every((nextItem) => !nextItem.isEquivalent(item))
        );
      }
    };
    exports2.JsonStructureNode = JsonStructureNode;
  }
});

// node_modules/.pnpm/@croct+json5-parser@0.2.1/node_modules/@croct/json5-parser/node/arrayNode.js
var require_arrayNode = __commonJS({
  "node_modules/.pnpm/@croct+json5-parser@0.2.1/node_modules/@croct/json5-parser/node/arrayNode.js"(exports2) {
    "use strict";
    Object.defineProperty(exports2, "__esModule", { value: true });
    exports2.JsonArrayNode = void 0;
    var structureNode_1 = require_structureNode();
    var factory_1 = require_factory();
    var error_1 = require_error();
    var JsonArrayNode = class _JsonArrayNode extends structureNode_1.JsonStructureNode {
      constructor(definition) {
        super(definition);
        this.elementNodes = [...definition.elements];
      }
      static of(...elements) {
        return new _JsonArrayNode({ elements: elements.map(factory_1.JsonValueFactory.create) });
      }
      update(other) {
        if (!(other instanceof _JsonArrayNode) && !Array.isArray(other)) {
          return factory_1.JsonValueFactory.create(other);
        }
        const otherElements = other instanceof _JsonArrayNode ? other.elements : other;
        const elements = this.elementNodes.splice(0);
        for (let index = 0; index < otherElements.length; index++) {
          this.push(index < elements.length ? elements[index].update(otherElements[index]) : otherElements[index]);
        }
        if (otherElements.length < elements.length) {
          this.splice(otherElements.length, elements.length - otherElements.length);
        }
        return this;
      }
      getList() {
        return [...this.elementNodes];
      }
      getDelimiter() {
        return structureNode_1.StructureDelimiter.ARRAY;
      }
      getMaxDepth() {
        return 1;
      }
      get elements() {
        return [...this.elementNodes];
      }
      get(index, type) {
        const element = this.elementNodes[index];
        if (type !== void 0 && !(element instanceof type)) {
          throw new error_1.JsonError(`Expected ${type.name} at index ${index}, but got ${element.constructor.name}.`);
        }
        return element;
      }
      set(index, element) {
        if (index < 0 || index >= this.elementNodes.length) {
          throw new Error(`Index ${index} is out of bounds.`);
        }
        this.elementNodes[index] = factory_1.JsonValueFactory.create(element);
      }
      clear() {
        this.elementNodes.length = 0;
      }
      delete(index) {
        if (index < 0 || index >= this.elementNodes.length) {
          throw new Error(`Index ${index} is out of bounds.`);
        }
        this.splice(index, 1);
      }
      unshift(...elements) {
        this.elementNodes.unshift(...elements.map(factory_1.JsonValueFactory.create));
      }
      push(...elements) {
        this.elementNodes.push(...elements.map(factory_1.JsonValueFactory.create));
      }
      shift() {
        return this.elementNodes.shift();
      }
      pop() {
        return this.elementNodes.pop();
      }
      splice(start, deleteCount, ...elements) {
        return this.elementNodes.splice(start, deleteCount, ...elements.map(factory_1.JsonValueFactory.create));
      }
      clone() {
        const clones = /* @__PURE__ */ new Map();
        for (const element of this.elementNodes) {
          clones.set(element, element.clone());
        }
        return new _JsonArrayNode({
          elements: [...clones.values()],
          children: this.children.map((child) => clones.get(child) ?? child.clone()),
          location: this.location
        });
      }
      isEquivalent(other) {
        if (!(other instanceof _JsonArrayNode)) {
          return false;
        }
        if (this.elements.length !== other.elements.length) {
          return false;
        }
        return this.elements.every((element, index) => other.elements[index].isEquivalent(element));
      }
      toJSON() {
        return this.elements.map((element) => element.toJSON());
      }
    };
    exports2.JsonArrayNode = JsonArrayNode;
    factory_1.JsonValueFactory.register("array", (elements) => new JsonArrayNode({
      elements: elements.map(factory_1.JsonValueFactory.create)
    }));
  }
});

// node_modules/.pnpm/@croct+json5-parser@0.2.1/node_modules/@croct/json5-parser/node/objectNode.js
var require_objectNode = __commonJS({
  "node_modules/.pnpm/@croct+json5-parser@0.2.1/node_modules/@croct/json5-parser/node/objectNode.js"(exports2) {
    "use strict";
    Object.defineProperty(exports2, "__esModule", { value: true });
    exports2.JsonObjectNode = void 0;
    var valueNode_1 = require_valueNode();
    var structureNode_1 = require_structureNode();
    var propertyNode_1 = require_propertyNode();
    var primitiveNode_1 = require_primitiveNode();
    var factory_1 = require_factory();
    var error_1 = require_error();
    var manipulator_1 = require_manipulator();
    var tokenNode_1 = require_tokenNode();
    var token_1 = require_token();
    var INSIGNIFICANT = manipulator_1.NodeMatcher.INSIGNIFICANT;
    var NEWLINE = manipulator_1.NodeMatcher.NEWLINE;
    var SIGNIFICANT = manipulator_1.NodeMatcher.SIGNIFICANT;
    var SPACE = manipulator_1.NodeMatcher.SPACE;
    var JsonObjectNode2 = class _JsonObjectNode extends structureNode_1.JsonStructureNode {
      constructor(definition) {
        super(definition);
        this.propertyNodes = [...definition.properties];
      }
      static of(properties) {
        return new _JsonObjectNode({
          properties: Object.entries(properties).map(([key, value]) => new propertyNode_1.JsonPropertyNode({
            key: primitiveNode_1.JsonPrimitiveNode.of(key),
            value: factory_1.JsonValueFactory.create(value)
          }))
        });
      }
      merge(source) {
        if (source.propertyNodes.length === 0) {
          return;
        }
        if (this.propertyNodes.length === 0) {
          this.propertyNodes.push(...source.propertyNodes.map((property) => property.clone()));
          this.children.splice(0, this.children.length, ...source.children.map((child) => child.clone()));
          return;
        }
        if (this.children.length === 0) {
          this.rebuild({ ...source.detectFormatting(), indentationLevel: 0 });
        }
        for (const property of source.propertyNodes) {
          const key = property.key.toJSON();
          const sourceRange = source.findPropertyRange(key);
          if (sourceRange === null) {
            this.set(property.key, property.value.clone());
            continue;
          }
          let sourceChildren = source.children.slice(sourceRange[0], sourceRange[1] + 1);
          const newProperty = property.clone();
          sourceChildren = sourceChildren.map((node) => node === property ? newProperty : node.clone());
          const range = this.findPropertyRange(key);
          if (range === null) {
            this.propertyNodes.push(newProperty);
            this.insert(sourceChildren);
            continue;
          }
          const currentIndex = this.propertyNodes.findIndex((candidate) => candidate.key.toJSON() === key);
          this.propertyNodes.splice(currentIndex, 1, newProperty);
          this.children.splice(range[0], range[1] - range[0] + 1, ...sourceChildren);
        }
      }
      insert(nodes) {
        let insertionIndex = this.children.length;
        for (let index = this.children.length - 1; index >= 0; index--) {
          const child = this.children[index];
          if (child instanceof tokenNode_1.JsonTokenNode) {
            if (child.isType(token_1.JsonTokenType.BRACE_RIGHT)) {
              insertionIndex = index;
              continue;
            }
            if (child.isType(token_1.JsonTokenType.COMMA)) {
              insertionIndex = index + 1;
              break;
            }
          }
          if (SIGNIFICANT(child)) {
            break;
          }
          if (NEWLINE(child)) {
            while (index > 0 && SPACE(this.children[index - 1])) {
              index--;
            }
            insertionIndex = index;
            break;
          }
          insertionIndex = index;
        }
        let needsComma = false;
        for (let index = insertionIndex - 1; index >= 0; index--) {
          const child = this.children[index];
          if (child instanceof tokenNode_1.JsonTokenNode) {
            if (child.isType(token_1.JsonTokenType.COMMA)) {
              needsComma = false;
              break;
            }
          }
          if (SIGNIFICANT(child)) {
            needsComma = true;
            break;
          }
        }
        if (needsComma) {
          this.children.splice(insertionIndex, 0, new tokenNode_1.JsonTokenNode({
            type: token_1.JsonTokenType.COMMA,
            value: ","
          }));
          insertionIndex++;
        }
        this.children.splice(insertionIndex, 0, ...nodes);
      }
      findPropertyRange(name) {
        let startIndex = this.children.findIndex((node) => node instanceof propertyNode_1.JsonPropertyNode && node.key.toJSON() === name);
        if (startIndex === -1) {
          return null;
        }
        let endIndex = startIndex;
        for (let lookBehind = startIndex - 1; lookBehind >= 0; lookBehind--) {
          const child = this.children[lookBehind];
          if (!INSIGNIFICANT(child)) {
            break;
          }
          if (NEWLINE(child)) {
            startIndex = lookBehind;
          }
        }
        for (let lookAhead = endIndex + 1; lookAhead < this.children.length; lookAhead++) {
          const child = this.children[lookAhead];
          if (!(child instanceof tokenNode_1.JsonTokenNode) || SIGNIFICANT(child) && !child.isType(token_1.JsonTokenType.COMMA)) {
            break;
          }
          if (NEWLINE(child)) {
            endIndex = lookAhead - 1;
            break;
          }
          endIndex = lookAhead;
        }
        return [startIndex, endIndex];
      }
      update(other) {
        if (!(other instanceof valueNode_1.JsonValueNode)) {
          if (typeof other !== "object" || other === null || Array.isArray(other)) {
            return factory_1.JsonValueFactory.create(other);
          }
          for (const [key, value] of Object.entries(other)) {
            if (value === void 0) {
              this.delete(key);
              continue;
            }
            const property = this.propertyNodes.find((current) => current.key.toJSON() === key);
            if (property !== void 0) {
              property.value = property.value.update(value);
              continue;
            }
            this.set(key, value);
          }
          for (const property of this.propertyNodes) {
            const key = property.key.toJSON();
            if (other[key] === void 0) {
              this.delete(property.key.toJSON());
            }
          }
          return this;
        }
        if (!(other instanceof _JsonObjectNode)) {
          return other;
        }
        for (const property of other.propertyNodes) {
          const index = this.propertyNodes.findIndex((current) => current.key.toJSON() === property.key.toJSON());
          if (index >= 0) {
            const cloneProperty = this.propertyNodes[index].clone();
            cloneProperty.value = cloneProperty.value.update(property.value);
          } else {
            this.propertyNodes.push(property);
          }
        }
        for (const property of this.propertyNodes) {
          const key = property.key.toJSON();
          if (!other.has(key)) {
            this.delete(key);
          }
        }
        return this;
      }
      getList() {
        return [...this.propertyNodes];
      }
      getDelimiter() {
        return structureNode_1.StructureDelimiter.OBJECT;
      }
      getMaxDepth() {
        return 2;
      }
      has(name) {
        return this.propertyNodes.some((current) => current.key.toJSON() === name);
      }
      get properties() {
        return [...this.propertyNodes];
      }
      set(name, value) {
        const normalizedName = typeof name === "string" ? name : name.toJSON();
        const index = this.propertyNodes.findIndex((current) => current.key.toJSON() === normalizedName);
        if (index >= 0) {
          this.propertyNodes[index].set(value);
          return;
        }
        this.propertyNodes.push(new propertyNode_1.JsonPropertyNode({
          key: typeof name === "string" ? primitiveNode_1.JsonPrimitiveNode.of(name) : name,
          value: factory_1.JsonValueFactory.create(value)
        }));
      }
      delete(name) {
        for (let index = 0; index < this.propertyNodes.length; index++) {
          const property = this.propertyNodes[index];
          if (property.key.toJSON() === name) {
            this.propertyNodes.splice(index, 1);
            break;
          }
        }
      }
      get(name, type) {
        const property = this.propertyNodes.find((current) => current.key.toJSON() === name);
        if (property === void 0) {
          throw new Error(`Property "${name}" does not exist.`);
        }
        const { value } = property;
        if (type !== void 0 && !(value instanceof type)) {
          throw new error_1.JsonError(`Expected a value of type ${type.name}, but got ${value.constructor.name}`);
        }
        return value;
      }
      clone() {
        const clones = /* @__PURE__ */ new Map();
        for (const property of this.propertyNodes) {
          clones.set(property, property.clone());
        }
        return new _JsonObjectNode({
          properties: [...clones.values()],
          children: this.children.map((child) => clones.get(child) ?? child.clone()),
          location: this.location
        });
      }
      isEquivalent(other) {
        if (!(other instanceof _JsonObjectNode)) {
          return false;
        }
        if (this.properties.length !== other.properties.length) {
          return false;
        }
        const entries = Object.fromEntries(other.properties.map((property) => [property.key.toJSON(), property]));
        return this.properties.every((property) => {
          var _a2;
          return ((_a2 = entries[property.key.toJSON()]) == null ? void 0 : _a2.isEquivalent(property)) === true;
        });
      }
      toJSON() {
        return Object.fromEntries(this.properties.map((property) => [
          property.key.toJSON(),
          property.value.toJSON()
        ]));
      }
    };
    exports2.JsonObjectNode = JsonObjectNode2;
    factory_1.JsonValueFactory.register("object", (object) => new JsonObjectNode2({
      properties: Object.entries(object).flatMap(([propertyName, propertyValue]) => propertyValue === void 0 ? [] : [
        new propertyNode_1.JsonPropertyNode({
          key: primitiveNode_1.JsonPrimitiveNode.of(propertyName),
          value: factory_1.JsonValueFactory.create(propertyValue)
        })
      ])
    }));
  }
});

// node_modules/.pnpm/@croct+json5-parser@0.2.1/node_modules/@croct/json5-parser/node/index.js
var require_node2 = __commonJS({
  "node_modules/.pnpm/@croct+json5-parser@0.2.1/node_modules/@croct/json5-parser/node/index.js"(exports2) {
    "use strict";
    var __createBinding = exports2 && exports2.__createBinding || (Object.create ? (function(o3, m2, k2, k22) {
      if (k22 === void 0) k22 = k2;
      var desc = Object.getOwnPropertyDescriptor(m2, k2);
      if (!desc || ("get" in desc ? !m2.__esModule : desc.writable || desc.configurable)) {
        desc = { enumerable: true, get: function() {
          return m2[k2];
        } };
      }
      Object.defineProperty(o3, k22, desc);
    }) : (function(o3, m2, k2, k22) {
      if (k22 === void 0) k22 = k2;
      o3[k22] = m2[k2];
    }));
    var __exportStar = exports2 && exports2.__exportStar || function(m2, exports3) {
      for (var p in m2) if (p !== "default" && !Object.prototype.hasOwnProperty.call(exports3, p)) __createBinding(exports3, m2, p);
    };
    Object.defineProperty(exports2, "__esModule", { value: true });
    __exportStar(require_structureNode(), exports2);
    __exportStar(require_arrayNode(), exports2);
    __exportStar(require_compositeNode(), exports2);
    __exportStar(require_identifierNode(), exports2);
    __exportStar(require_node(), exports2);
    __exportStar(require_objectNode(), exports2);
    __exportStar(require_primitiveNode(), exports2);
    __exportStar(require_propertyNode(), exports2);
    __exportStar(require_tokenNode(), exports2);
    __exportStar(require_valueNode(), exports2);
    __exportStar(require_factory(), exports2);
  }
});

// node_modules/.pnpm/@croct+json5-parser@0.2.1/node_modules/@croct/json5-parser/parser.js
var require_parser = __commonJS({
  "node_modules/.pnpm/@croct+json5-parser@0.2.1/node_modules/@croct/json5-parser/parser.js"(exports2) {
    "use strict";
    Object.defineProperty(exports2, "__esModule", { value: true });
    exports2.JsonParser = void 0;
    var lexer_1 = require_lexer();
    var token_1 = require_token();
    var node_1 = require_node2();
    var identifier_1 = require_identifier();
    var error_1 = require_error();
    var JsonParser2 = class _JsonParser {
      constructor(source) {
        this.lexer = new lexer_1.JsonLexer(source);
      }
      static parse(source, type) {
        const parser = new _JsonParser(source);
        if (type !== void 0) {
          return parser.parseValue(type);
        }
        return parser.parseValue();
      }
      parseValue(type) {
        const node = this.parseRoot();
        if (type !== void 0 && !(node instanceof type)) {
          throw new error_1.JsonError(`Expected ${type.name}, but got ${node.constructor.name}.`);
        }
        return node;
      }
      parseRoot() {
        this.lexer.next();
        const leadingTokens = this.lexer.skipInsignificant();
        const node = this.parseNext();
        const trailingTokens = this.lexer.skipInsignificant();
        node.children.unshift(..._JsonParser.createChildren(leadingTokens));
        node.children.push(..._JsonParser.createChildren(trailingTokens));
        if (!this.lexer.isEof()) {
          const token = this.lexer.peek();
          const position = token.location.start;
          throw new error_1.JsonParseError(`Unexpected token '${token.value}' at ${position.line}:${position.column}.`, token.location);
        }
        return node;
      }
      parseNext() {
        const token = this.lexer.peek();
        switch (token.type) {
          case token_1.JsonTokenType.BRACE_LEFT:
            return this.parseObject();
          case token_1.JsonTokenType.BRACKET_LEFT:
            return this.parseArray();
          case token_1.JsonTokenType.NUMBER:
            return this.parseNumber();
          case token_1.JsonTokenType.STRING:
            return this.parseString();
          case token_1.JsonTokenType.BOOLEAN:
            return this.parseBoolean();
          case token_1.JsonTokenType.NULL:
            return this.parseNull();
          default: {
            const position = token.location.start;
            throw new error_1.JsonParseError(`Unexpected token '${token.value}' at ${position.line}:${position.column}.`, token.location);
          }
        }
      }
      parseNumber() {
        const token = this.lexer.consume(token_1.JsonTokenType.NUMBER);
        const tokenNode = new node_1.JsonTokenNode(token);
        return new node_1.JsonPrimitiveNode({
          token: tokenNode,
          value: this.parseNumberValue(token),
          children: [tokenNode],
          location: token.location
        });
      }
      parseNumberValue(token) {
        let { value } = token;
        let sign = 1;
        if (value.startsWith("+")) {
          value = value.slice(1);
        } else if (value.startsWith("-")) {
          sign = -1;
          value = value.slice(1);
        }
        if (value === "Infinity") {
          return sign * Infinity;
        }
        if (value === "NaN") {
          return NaN;
        }
        if (value.startsWith(".")) {
          value = `0${value}`;
        } else {
          value = value.replace(/\.(?!\d)/, "");
        }
        if (value.startsWith("0x") || value.startsWith("0X")) {
          return sign * Number.parseInt(value, 16);
        }
        return sign * JSON.parse(value);
      }
      parseString() {
        const token = this.lexer.consume(token_1.JsonTokenType.STRING);
        let { value } = token;
        if (value.startsWith("'")) {
          value = value.slice(1, -1).replace(/((?:^|[^\\])(?:\\\\)*)\\(["'])/g, (_3, preceding, quote) => `${preceding}${quote === '"' ? '\\"' : "'"}`);
          value = `"${value}"`;
        }
        value = value.replace(/\\(?:\r\n|\r|\n|\u2028|\u2029)/gu, "");
        const tokenNode = new node_1.JsonTokenNode(token);
        let parsedValue;
        try {
          parsedValue = JSON.parse(value);
        } catch (error) {
          if (error instanceof Error) {
            throw new error_1.JsonParseError(`Invalid string at ${token.location.start.line}:${token.location.start.column}: ${error.message}`, token.location);
          }
          throw error;
        }
        return new node_1.JsonPrimitiveNode({
          token: tokenNode,
          value: parsedValue,
          children: [tokenNode],
          location: token.location
        });
      }
      parseNull() {
        const token = this.lexer.consume(token_1.JsonTokenType.NULL);
        const tokenNode = new node_1.JsonTokenNode(token);
        return new node_1.JsonPrimitiveNode({
          token: tokenNode,
          value: null,
          children: [tokenNode],
          location: token.location
        });
      }
      parseBoolean() {
        const token = this.lexer.consume(token_1.JsonTokenType.BOOLEAN);
        const tokenNode = new node_1.JsonTokenNode(token);
        return new node_1.JsonPrimitiveNode({
          token: tokenNode,
          value: token.value === "true",
          children: [tokenNode],
          location: token.location
        });
      }
      parseArray() {
        const children = [
          this.lexer.consume(token_1.JsonTokenType.BRACKET_LEFT),
          ...this.lexer.skipInsignificant()
        ];
        const elements = [];
        while (!this.lexer.matches(token_1.JsonTokenType.BRACKET_RIGHT)) {
          const element = this.parseNext();
          elements.push(element);
          children.push(element, ...this.lexer.skipInsignificant());
          if (!this.lexer.matches(token_1.JsonTokenType.BRACKET_RIGHT)) {
            children.push(this.lexer.consume(token_1.JsonTokenType.COMMA), ...this.lexer.skipInsignificant());
          }
        }
        children.push(this.lexer.consume(token_1.JsonTokenType.BRACKET_RIGHT));
        return new node_1.JsonArrayNode({
          elements,
          children: _JsonParser.createChildren(children),
          location: {
            start: children[0].location.start,
            end: children[children.length - 1].location.end
          }
        });
      }
      parseObject() {
        const children = [
          this.lexer.consume(token_1.JsonTokenType.BRACE_LEFT),
          ...this.lexer.skipInsignificant()
        ];
        const properties = [];
        while (!this.lexer.matches(token_1.JsonTokenType.BRACE_RIGHT)) {
          const property = this.parseObjectProperty();
          properties.push(property);
          children.push(property, ...this.lexer.skipInsignificant());
          if (!this.lexer.matches(token_1.JsonTokenType.BRACE_RIGHT)) {
            children.push(this.lexer.consume(token_1.JsonTokenType.COMMA), ...this.lexer.skipInsignificant());
          }
        }
        children.push(this.lexer.consume(token_1.JsonTokenType.BRACE_RIGHT));
        return new node_1.JsonObjectNode({
          properties,
          children: _JsonParser.createChildren(children),
          location: {
            start: children[0].location.start,
            end: children[children.length - 1].location.end
          }
        });
      }
      parseObjectProperty() {
        const children = [];
        this.lexer.expect(token_1.JsonTokenType.STRING, token_1.JsonTokenType.IDENTIFIER);
        const key = this.lexer.matches(token_1.JsonTokenType.STRING) ? this.parseString() : this.parseIdentifier();
        children.push(key, ...this.lexer.skipInsignificant(), this.lexer.consume(token_1.JsonTokenType.COLON), ...this.lexer.skipInsignificant());
        const value = this.parseNext();
        children.push(value);
        return new node_1.JsonPropertyNode({
          key,
          value,
          children: _JsonParser.createChildren(children),
          location: {
            start: children[0].location.start,
            end: children[children.length - 1].location.end
          }
        });
      }
      parseIdentifier() {
        const token = this.lexer.consume(token_1.JsonTokenType.IDENTIFIER);
        if ((0, identifier_1.isReserved)(token.value)) {
          const location = token.location.start;
          throw new error_1.JsonParseError(`Reserved identifier '${token.value}' at ${location.line}:${location.column}.`, token.location);
        }
        const tokenNode = new node_1.JsonTokenNode(token);
        return new node_1.JsonIdentifierNode({
          token: tokenNode,
          children: [tokenNode],
          location: token.location
        });
      }
      static createChildren(children) {
        return children.map((child) => {
          if (child instanceof node_1.JsonNode) {
            return child;
          }
          return new node_1.JsonTokenNode(child);
        });
      }
    };
    exports2.JsonParser = JsonParser2;
  }
});

// node_modules/.pnpm/@croct+json5-parser@0.2.1/node_modules/@croct/json5-parser/formatting.js
var require_formatting = __commonJS({
  "node_modules/.pnpm/@croct+json5-parser@0.2.1/node_modules/@croct/json5-parser/formatting.js"(exports2) {
    "use strict";
    Object.defineProperty(exports2, "__esModule", { value: true });
  }
});

// node_modules/.pnpm/@croct+json5-parser@0.2.1/node_modules/@croct/json5-parser/index.js
var require_json5_parser = __commonJS({
  "node_modules/.pnpm/@croct+json5-parser@0.2.1/node_modules/@croct/json5-parser/index.js"(exports2) {
    "use strict";
    var __createBinding = exports2 && exports2.__createBinding || (Object.create ? (function(o3, m2, k2, k22) {
      if (k22 === void 0) k22 = k2;
      var desc = Object.getOwnPropertyDescriptor(m2, k2);
      if (!desc || ("get" in desc ? !m2.__esModule : desc.writable || desc.configurable)) {
        desc = { enumerable: true, get: function() {
          return m2[k2];
        } };
      }
      Object.defineProperty(o3, k22, desc);
    }) : (function(o3, m2, k2, k22) {
      if (k22 === void 0) k22 = k2;
      o3[k22] = m2[k2];
    }));
    var __exportStar = exports2 && exports2.__exportStar || function(m2, exports3) {
      for (var p in m2) if (p !== "default" && !Object.prototype.hasOwnProperty.call(exports3, p)) __createBinding(exports3, m2, p);
    };
    Object.defineProperty(exports2, "__esModule", { value: true });
    __exportStar(require_identifier(), exports2);
    __exportStar(require_lexer(), exports2);
    __exportStar(require_location(), exports2);
    __exportStar(require_parser(), exports2);
    __exportStar(require_token(), exports2);
    __exportStar(require_formatting(), exports2);
    __exportStar(require_node2(), exports2);
    __exportStar(require_error(), exports2);
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
  visitNotIgnoredFiles(".", (path7) => {
    if (!path7.endsWith(".ts") && !path7.endsWith(".tsx")) {
      return;
    }
    project.addSourceFileAtPath(path7);
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
      for (let i2 = 0; i2 < 20; i2++) {
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
  const path7 = (0, import_node_path2.join)(dir, "package.json");
  const pkgJson = JSON.parse(await import_node_fs2.default.promises.readFile(path7, "utf-8"));
  return pkgJson;
}
async function writePackageJson(dir, pkgJson) {
  const path7 = (0, import_node_path2.join)(dir, "package.json");
  await import_node_fs2.default.promises.writeFile(path7, JSON.stringify(pkgJson, null, 2) + "\n");
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
  var _a2;
  return ((_a2 = (0, import_which_pm_runs.default)()) == null ? void 0 : _a2.name) || "pnpm";
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
var s = (c4, fallback) => unicode ? c4 : fallback;
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
  return integrations2.sort((a4, b3) => {
    if (a4.priority > b3.priority) {
      return -1;
    }
    if (a4.priority < b3.priority) {
      return 1;
    }
    return a4.id < b3.id ? -1 : 1;
  }).map((i2) => ({
    value: i2.id,
    label: i2.name,
    hint: showHint && limitLength(i2.pkgJson.description, maxHintLength) || void 0
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
              var _a2, _b2, _c2, _d2;
              const dirPath = (0, import_node_path3.join)(dir, dirItem);
              const stat = await import_node_fs3.default.promises.stat(dirPath);
              if (stat.isDirectory()) {
                const pkgJson = await readPackageJson(dirPath);
                const integration = {
                  id: dirItem,
                  name: ((_a2 = pkgJson.__qwik__) == null ? void 0 : _a2.displayName) ?? dashToTitleCase(dirItem),
                  type: integrationType,
                  dir: dirPath,
                  pkgJson,
                  docs: ((_b2 = pkgJson.__qwik__) == null ? void 0 : _b2.docs) ?? [],
                  priority: ((_c2 = pkgJson == null ? void 0 : pkgJson.__qwik__) == null ? void 0 : _c2.priority) ?? 0,
                  alwaysInRoot: ((_d2 = pkgJson.__qwik__) == null ? void 0 : _d2.alwaysInRoot) ?? []
                };
                loadingIntegrations.push(integration);
              }
            })
          );
        }
      })
    );
    loadingIntegrations.sort((a4, b3) => {
      if (a4.priority > b3.priority) {
        return -1;
      }
      if (a4.priority < b3.priority) {
        return 1;
      }
      return a4.id < b3.id ? -1 : 1;
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
var import_json5_parser = __toESM(require_json5_parser(), 1);
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
        } else if (destDir.endsWith(".vscode") && destName === "settings.json") {
          await mergeVSCodeSettings(fileUpdates, srcChildPath, finalDestPath);
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
  var _a2;
  const srcContent = await import_node_fs4.default.promises.readFile(srcPath, "utf-8");
  try {
    const srcPkgJson = JSON.parse(srcContent);
    const props = ["scripts", "dependencies", "devDependencies"];
    const destPkgJson = JSON.parse(await import_node_fs4.default.promises.readFile(destPath, "utf-8"));
    props.forEach((prop) => {
      mergePackageJsonSort(srcPkgJson, destPkgJson, prop);
    });
    if ((_a2 = destPkgJson.scripts) == null ? void 0 : _a2.qwik) {
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
async function mergeVSCodeSettings(fileUpdates, srcPath, destPath) {
  const srcContent = await import_node_fs4.default.promises.readFile(srcPath, "utf-8");
  try {
    const srcPkgJson = import_json5_parser.JsonParser.parse(srcContent, import_json5_parser.JsonObjectNode);
    const destPkgJson = import_json5_parser.JsonParser.parse(
      await import_node_fs4.default.promises.readFile(destPath, "utf-8"),
      import_json5_parser.JsonObjectNode
    );
    destPkgJson.merge(srcPkgJson);
    fileUpdates.files.push({
      path: destPath,
      content: destPkgJson.toString() + "\n",
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
  return findImportDeclarations(ts2, tsSourceFile).find((n2) => {
    if (n2.importClause && n2.moduleSpecifier && ts2.isStringLiteral(n2.moduleSpecifier)) {
      if (n2.moduleSpecifier.text !== importPath) {
        return false;
      }
      const namedImports = n2.importClause.namedBindings;
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
  return findImportDeclarations(ts2, tsSourceFile).find((n2) => {
    if (n2.importClause && n2.moduleSpecifier) {
      const modulePath = n2.moduleSpecifier;
      if (ts2.isStringLiteral(modulePath) && modulePath.text === importPath) {
        const moduleDefault = n2.importClause.name;
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
  for (let i2 = statements.length - 1; i2 >= 0; i2--) {
    const n2 = statements[i2];
    if (!ts2.isImportDeclaration(n2)) {
      continue;
    }
    if (!n2.moduleSpecifier || !ts2.isStringLiteral(n2.moduleSpecifier)) {
      continue;
    }
    if (n2.moduleSpecifier.text !== importPath) {
      continue;
    }
    foundExistingImport = true;
    const existingNamedImports = [];
    if (n2.importClause) {
      const namedImports = n2.importClause.namedBindings;
      if (namedImports && ts2.isNamedImports(namedImports) && namedImports.elements) {
        existingNamedImports.push(...namedImports.elements);
      }
    }
    if (typeof namedImport === "string") {
      const identifier = ts2.factory.createIdentifier(namedImport);
      const importSpecifier = ts2.factory.createImportSpecifier(false, void 0, identifier);
      existingNamedImports.push(importSpecifier);
    }
    existingNamedImports.sort((a4, b3) => {
      const aName = a4.name.escapedText.toString();
      const bName = b3.name.escapedText.toString();
      return aName < bName ? -1 : 1;
    });
    let defaultIdentifier = n2.importClause ? n2.importClause.name : void 0;
    if (typeof defaultImport === "string") {
      defaultIdentifier = ts2.factory.createIdentifier(defaultImport);
    }
    let namedBindings = void 0;
    if (existingNamedImports.length > 0) {
      namedBindings = ts2.factory.createNamedImports(existingNamedImports);
    }
    statements[i2] = ts2.factory.updateImportDeclaration(
      n2,
      void 0,
      ts2.factory.createImportClause(false, defaultIdentifier, namedBindings),
      n2.moduleSpecifier,
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
  for (let i2 = tsSourceFile.statements.length - 1; i2 >= 0; i2--) {
    const s2 = tsSourceFile.statements[i2];
    if (ts2.isImportDeclaration(s2)) {
      return i2;
    }
    if (ts2.isStringLiteral(s2) && s2.text === "use strict") {
      return i2;
    }
  }
  return 0;
}
function updateDefineConfig(ts2, callExp, updates) {
  const args = [];
  for (let i2 = 0; i2 < callExp.arguments.length; i2++) {
    const exp = callExp.arguments[i2];
    if (i2 === 0) {
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
  var _a2, _b2;
  const elms = [...arr.elements];
  if (updates.vitePlugins) {
    for (const vitePlugin of updates.vitePlugins) {
      const pluginExp = createPluginCall(ts2, vitePlugin);
      const pluginName = (_a2 = pluginExp == null ? void 0 : pluginExp.expression) == null ? void 0 : _a2.escapedText;
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
      const pluginName = (_b2 = pluginExp == null ? void 0 : pluginExp.expression) == null ? void 0 : _b2.escapedText;
      const alreadyDefined = elms.some(
        (el) => ts2.isCallExpression(el) && ts2.isIdentifier(el.expression) && el.expression.escapedText === pluginName
      );
      if (pluginExp && !alreadyDefined) {
        elms.unshift(pluginExp);
      }
    }
  }
  if (updates.qwikViteConfig) {
    for (let i2 = 0; i2 < elms.length; i2++) {
      const elm = elms[i2];
      if (ts2.isCallExpression(elm) && ts2.isIdentifier(elm.expression)) {
        if (elm.expression.escapedText === "qwikVite") {
          elms[i2] = updateQwikCityPlugin(ts2, elm, updates.qwikViteConfig);
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
  var _a2;
  try {
    const viteConfig = (_a2 = integration.pkgJson.__qwik__) == null ? void 0 : _a2.viteConfig;
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
  var _a2;
  const pkgManager = getPackageManager();
  const integrations2 = await loadIntegrations();
  let integration;
  if (typeof id === "string") {
    integration = integrations2.find((i2) => i2.id === id);
    if (!integration) {
      throw new Error(`Invalid integration: ${id}`);
    }
    oe(`\u{1F98B} ${bgBlue(` Add Integration `)} ${bold(magenta(integration.id))}`);
  } else {
    oe(`\u{1F98B} ${bgBlue(` Add Integration `)}`);
    const integrationChoices = [
      ...integrations2.filter((i2) => i2.type === "adapter"),
      ...integrations2.filter((i2) => i2.type === "feature")
    ];
    const integrationAnswer = await ie({
      message: "What integration would you like to add?",
      options: await sortIntegrationsAndReturnAsClackOptions(integrationChoices)
    });
    if (lD(integrationAnswer)) {
      bye();
    }
    integration = integrations2.find((i2) => i2.id === integrationAnswer);
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
  const postInstall = (_a2 = result.integration.pkgJson.__qwik__) == null ? void 0 : _a2.postInstall;
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
  var _a2;
  if (result.updates.installedScripts.length > 0) {
    const prefix = pkgManager === "npm" || pkgManager === "bun" ? `${pkgManager} run` : pkgManager;
    const message = result.updates.installedScripts.map((script) => `- ${prefix} ${blue(script)}`).join("\n");
    note(message, "New scripts added");
  }
  const nextSteps = (_a2 = result.integration.pkgJson.__qwik__) == null ? void 0 : _a2.nextSteps;
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
  const adapters = integrations2.filter((i2) => i2.type === "adapter");
  const features = integrations2.filter((i2) => i2.type === "feature");
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
    allTemplates.sort((a4, b3) => {
      if (a4.id === "qwik") {
        return -1;
      } else if (b3.id === "qwik") {
        return 1;
      }
      return a4.id > b3.id ? 1 : -1;
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
    component: component.map((c4) => parseTemplatePath(c4, "component")),
    route: route.map((r2) => parseTemplatePath(r2, "route")),
    markdown: markdown.map((m2) => parseTemplatePath(m2, "markdown")),
    mdx: mdx.map((m2) => parseTemplatePath(m2, "mdx"))
  };
}
function parseTemplatePath(path7, type) {
  const parts = path7.split(import_node_path7.sep + type + import_node_path7.sep);
  return {
    absolute: path7,
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
    const args = app.args.filter((a4) => !a4.startsWith("--"));
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
    let templateArg = app.args.filter((a4) => a4.startsWith("--")).map((a4) => a4.substring(2)).join("");
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
        (i2) => i2.id === templateArg && i2[typeArg] && i2[typeArg].length
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
  const templates2 = allTemplates.filter((i2) => i2[typeArg] && i2[typeArg].length);
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

// node_modules/.pnpm/is-plain-obj@4.1.0/node_modules/is-plain-obj/index.js
function isPlainObject(value) {
  if (typeof value !== "object" || value === null) {
    return false;
  }
  const prototype = Object.getPrototypeOf(value);
  return (prototype === null || prototype === Object.prototype || Object.getPrototypeOf(prototype) === null) && !(Symbol.toStringTag in value) && !(Symbol.iterator in value);
}

// node_modules/.pnpm/execa@9.6.0/node_modules/execa/lib/arguments/file-url.js
var import_node_url = require("node:url");
var safeNormalizeFileUrl = (file, name) => {
  const fileString = normalizeFileUrl(normalizeDenoExecPath(file));
  if (typeof fileString !== "string") {
    throw new TypeError(`${name} must be a string or a file URL: ${fileString}.`);
  }
  return fileString;
};
var normalizeDenoExecPath = (file) => isDenoExecPath(file) ? file.toString() : file;
var isDenoExecPath = (file) => typeof file !== "string" && file && Object.getPrototypeOf(file) === String.prototype;
var normalizeFileUrl = (file) => file instanceof URL ? (0, import_node_url.fileURLToPath)(file) : file;

// node_modules/.pnpm/execa@9.6.0/node_modules/execa/lib/methods/parameters.js
var normalizeParameters = (rawFile, rawArguments = [], rawOptions = {}) => {
  const filePath = safeNormalizeFileUrl(rawFile, "First argument");
  const [commandArguments, options] = isPlainObject(rawArguments) ? [[], rawArguments] : [rawArguments, rawOptions];
  if (!Array.isArray(commandArguments)) {
    throw new TypeError(`Second argument must be either an array of arguments or an options object: ${commandArguments}`);
  }
  if (commandArguments.some((commandArgument) => typeof commandArgument === "object" && commandArgument !== null)) {
    throw new TypeError(`Second argument must be an array of strings: ${commandArguments}`);
  }
  const normalizedArguments = commandArguments.map(String);
  const nullByteArgument = normalizedArguments.find((normalizedArgument) => normalizedArgument.includes("\0"));
  if (nullByteArgument !== void 0) {
    throw new TypeError(`Arguments cannot contain null bytes ("\\0"): ${nullByteArgument}`);
  }
  if (!isPlainObject(options)) {
    throw new TypeError(`Last argument must be an options object: ${options}`);
  }
  return [filePath, normalizedArguments, options];
};

// node_modules/.pnpm/execa@9.6.0/node_modules/execa/lib/methods/template.js
var import_node_child_process = require("node:child_process");

// node_modules/.pnpm/execa@9.6.0/node_modules/execa/lib/utils/uint-array.js
var import_node_string_decoder = require("node:string_decoder");
var { toString: objectToString } = Object.prototype;
var isArrayBuffer = (value) => objectToString.call(value) === "[object ArrayBuffer]";
var isUint8Array = (value) => objectToString.call(value) === "[object Uint8Array]";
var bufferToUint8Array = (buffer) => new Uint8Array(buffer.buffer, buffer.byteOffset, buffer.byteLength);
var textEncoder = new TextEncoder();
var stringToUint8Array = (string) => textEncoder.encode(string);
var textDecoder = new TextDecoder();
var uint8ArrayToString = (uint8Array) => textDecoder.decode(uint8Array);
var joinToString = (uint8ArraysOrStrings, encoding) => {
  const strings = uint8ArraysToStrings(uint8ArraysOrStrings, encoding);
  return strings.join("");
};
var uint8ArraysToStrings = (uint8ArraysOrStrings, encoding) => {
  if (encoding === "utf8" && uint8ArraysOrStrings.every((uint8ArrayOrString) => typeof uint8ArrayOrString === "string")) {
    return uint8ArraysOrStrings;
  }
  const decoder = new import_node_string_decoder.StringDecoder(encoding);
  const strings = uint8ArraysOrStrings.map((uint8ArrayOrString) => typeof uint8ArrayOrString === "string" ? stringToUint8Array(uint8ArrayOrString) : uint8ArrayOrString).map((uint8Array) => decoder.write(uint8Array));
  const finalString = decoder.end();
  return finalString === "" ? strings : [...strings, finalString];
};
var joinToUint8Array = (uint8ArraysOrStrings) => {
  if (uint8ArraysOrStrings.length === 1 && isUint8Array(uint8ArraysOrStrings[0])) {
    return uint8ArraysOrStrings[0];
  }
  return concatUint8Arrays(stringsToUint8Arrays(uint8ArraysOrStrings));
};
var stringsToUint8Arrays = (uint8ArraysOrStrings) => uint8ArraysOrStrings.map((uint8ArrayOrString) => typeof uint8ArrayOrString === "string" ? stringToUint8Array(uint8ArrayOrString) : uint8ArrayOrString);
var concatUint8Arrays = (uint8Arrays) => {
  const result = new Uint8Array(getJoinLength(uint8Arrays));
  let index = 0;
  for (const uint8Array of uint8Arrays) {
    result.set(uint8Array, index);
    index += uint8Array.length;
  }
  return result;
};
var getJoinLength = (uint8Arrays) => {
  let joinLength = 0;
  for (const uint8Array of uint8Arrays) {
    joinLength += uint8Array.length;
  }
  return joinLength;
};

// node_modules/.pnpm/execa@9.6.0/node_modules/execa/lib/methods/template.js
var isTemplateString = (templates2) => Array.isArray(templates2) && Array.isArray(templates2.raw);
var parseTemplates = (templates2, expressions) => {
  let tokens = [];
  for (const [index, template] of templates2.entries()) {
    tokens = parseTemplate({
      templates: templates2,
      expressions,
      tokens,
      index,
      template
    });
  }
  if (tokens.length === 0) {
    throw new TypeError("Template script must not be empty");
  }
  const [file, ...commandArguments] = tokens;
  return [file, commandArguments, {}];
};
var parseTemplate = ({ templates: templates2, expressions, tokens, index, template }) => {
  if (template === void 0) {
    throw new TypeError(`Invalid backslash sequence: ${templates2.raw[index]}`);
  }
  const { nextTokens, leadingWhitespaces, trailingWhitespaces } = splitByWhitespaces(template, templates2.raw[index]);
  const newTokens = concatTokens(tokens, nextTokens, leadingWhitespaces);
  if (index === expressions.length) {
    return newTokens;
  }
  const expression = expressions[index];
  const expressionTokens = Array.isArray(expression) ? expression.map((expression2) => parseExpression(expression2)) : [parseExpression(expression)];
  return concatTokens(newTokens, expressionTokens, trailingWhitespaces);
};
var splitByWhitespaces = (template, rawTemplate) => {
  if (rawTemplate.length === 0) {
    return { nextTokens: [], leadingWhitespaces: false, trailingWhitespaces: false };
  }
  const nextTokens = [];
  let templateStart = 0;
  const leadingWhitespaces = DELIMITERS.has(rawTemplate[0]);
  for (let templateIndex = 0, rawIndex = 0; templateIndex < template.length; templateIndex += 1, rawIndex += 1) {
    const rawCharacter = rawTemplate[rawIndex];
    if (DELIMITERS.has(rawCharacter)) {
      if (templateStart !== templateIndex) {
        nextTokens.push(template.slice(templateStart, templateIndex));
      }
      templateStart = templateIndex + 1;
    } else if (rawCharacter === "\\") {
      const nextRawCharacter = rawTemplate[rawIndex + 1];
      if (nextRawCharacter === "\n") {
        templateIndex -= 1;
        rawIndex += 1;
      } else if (nextRawCharacter === "u" && rawTemplate[rawIndex + 2] === "{") {
        rawIndex = rawTemplate.indexOf("}", rawIndex + 3);
      } else {
        rawIndex += ESCAPE_LENGTH[nextRawCharacter] ?? 1;
      }
    }
  }
  const trailingWhitespaces = templateStart === template.length;
  if (!trailingWhitespaces) {
    nextTokens.push(template.slice(templateStart));
  }
  return { nextTokens, leadingWhitespaces, trailingWhitespaces };
};
var DELIMITERS = /* @__PURE__ */ new Set([" ", "	", "\r", "\n"]);
var ESCAPE_LENGTH = { x: 3, u: 5 };
var concatTokens = (tokens, nextTokens, isSeparated) => isSeparated || tokens.length === 0 || nextTokens.length === 0 ? [...tokens, ...nextTokens] : [
  ...tokens.slice(0, -1),
  `${tokens.at(-1)}${nextTokens[0]}`,
  ...nextTokens.slice(1)
];
var parseExpression = (expression) => {
  const typeOfExpression = typeof expression;
  if (typeOfExpression === "string") {
    return expression;
  }
  if (typeOfExpression === "number") {
    return String(expression);
  }
  if (isPlainObject(expression) && ("stdout" in expression || "isMaxBuffer" in expression)) {
    return getSubprocessResult(expression);
  }
  if (expression instanceof import_node_child_process.ChildProcess || Object.prototype.toString.call(expression) === "[object Promise]") {
    throw new TypeError("Unexpected subprocess in template expression. Please use ${await subprocess} instead of ${subprocess}.");
  }
  throw new TypeError(`Unexpected "${typeOfExpression}" in template expression`);
};
var getSubprocessResult = ({ stdout }) => {
  if (typeof stdout === "string") {
    return stdout;
  }
  if (isUint8Array(stdout)) {
    return uint8ArrayToString(stdout);
  }
  if (stdout === void 0) {
    throw new TypeError(`Missing result.stdout in template expression. This is probably due to the previous subprocess' "stdout" option.`);
  }
  throw new TypeError(`Unexpected "${typeof stdout}" stdout in template expression`);
};

// node_modules/.pnpm/execa@9.6.0/node_modules/execa/lib/methods/main-sync.js
var import_node_child_process3 = require("node:child_process");

// node_modules/.pnpm/execa@9.6.0/node_modules/execa/lib/arguments/specific.js
var import_node_util = require("node:util");

// node_modules/.pnpm/execa@9.6.0/node_modules/execa/lib/utils/standard-stream.js
var import_node_process3 = __toESM(require("node:process"), 1);
var isStandardStream = (stream) => STANDARD_STREAMS.includes(stream);
var STANDARD_STREAMS = [import_node_process3.default.stdin, import_node_process3.default.stdout, import_node_process3.default.stderr];
var STANDARD_STREAMS_ALIASES = ["stdin", "stdout", "stderr"];
var getStreamName = (fdNumber) => STANDARD_STREAMS_ALIASES[fdNumber] ?? `stdio[${fdNumber}]`;

// node_modules/.pnpm/execa@9.6.0/node_modules/execa/lib/arguments/specific.js
var normalizeFdSpecificOptions = (options) => {
  const optionsCopy = { ...options };
  for (const optionName of FD_SPECIFIC_OPTIONS) {
    optionsCopy[optionName] = normalizeFdSpecificOption(options, optionName);
  }
  return optionsCopy;
};
var normalizeFdSpecificOption = (options, optionName) => {
  const optionBaseArray = Array.from({ length: getStdioLength(options) + 1 });
  const optionArray = normalizeFdSpecificValue(options[optionName], optionBaseArray, optionName);
  return addDefaultValue(optionArray, optionName);
};
var getStdioLength = ({ stdio }) => Array.isArray(stdio) ? Math.max(stdio.length, STANDARD_STREAMS_ALIASES.length) : STANDARD_STREAMS_ALIASES.length;
var normalizeFdSpecificValue = (optionValue, optionArray, optionName) => isPlainObject(optionValue) ? normalizeOptionObject(optionValue, optionArray, optionName) : optionArray.fill(optionValue);
var normalizeOptionObject = (optionValue, optionArray, optionName) => {
  for (const fdName of Object.keys(optionValue).sort(compareFdName)) {
    for (const fdNumber of parseFdName(fdName, optionName, optionArray)) {
      optionArray[fdNumber] = optionValue[fdName];
    }
  }
  return optionArray;
};
var compareFdName = (fdNameA, fdNameB) => getFdNameOrder(fdNameA) < getFdNameOrder(fdNameB) ? 1 : -1;
var getFdNameOrder = (fdName) => {
  if (fdName === "stdout" || fdName === "stderr") {
    return 0;
  }
  return fdName === "all" ? 2 : 1;
};
var parseFdName = (fdName, optionName, optionArray) => {
  if (fdName === "ipc") {
    return [optionArray.length - 1];
  }
  const fdNumber = parseFd(fdName);
  if (fdNumber === void 0 || fdNumber === 0) {
    throw new TypeError(`"${optionName}.${fdName}" is invalid.
It must be "${optionName}.stdout", "${optionName}.stderr", "${optionName}.all", "${optionName}.ipc", or "${optionName}.fd3", "${optionName}.fd4" (and so on).`);
  }
  if (fdNumber >= optionArray.length) {
    throw new TypeError(`"${optionName}.${fdName}" is invalid: that file descriptor does not exist.
Please set the "stdio" option to ensure that file descriptor exists.`);
  }
  return fdNumber === "all" ? [1, 2] : [fdNumber];
};
var parseFd = (fdName) => {
  if (fdName === "all") {
    return fdName;
  }
  if (STANDARD_STREAMS_ALIASES.includes(fdName)) {
    return STANDARD_STREAMS_ALIASES.indexOf(fdName);
  }
  const regexpResult = FD_REGEXP.exec(fdName);
  if (regexpResult !== null) {
    return Number(regexpResult[1]);
  }
};
var FD_REGEXP = /^fd(\d+)$/;
var addDefaultValue = (optionArray, optionName) => optionArray.map((optionValue) => optionValue === void 0 ? DEFAULT_OPTIONS[optionName] : optionValue);
var verboseDefault = (0, import_node_util.debuglog)("execa").enabled ? "full" : "none";
var DEFAULT_OPTIONS = {
  lines: false,
  buffer: true,
  maxBuffer: 1e3 * 1e3 * 100,
  verbose: verboseDefault,
  stripFinalNewline: true
};
var FD_SPECIFIC_OPTIONS = ["lines", "buffer", "maxBuffer", "verbose", "stripFinalNewline"];
var getFdSpecificValue = (optionArray, fdNumber) => fdNumber === "ipc" ? optionArray.at(-1) : optionArray[fdNumber];

// node_modules/.pnpm/execa@9.6.0/node_modules/execa/lib/verbose/values.js
var isVerbose = ({ verbose }, fdNumber) => getFdVerbose(verbose, fdNumber) !== "none";
var isFullVerbose = ({ verbose }, fdNumber) => !["none", "short"].includes(getFdVerbose(verbose, fdNumber));
var getVerboseFunction = ({ verbose }, fdNumber) => {
  const fdVerbose = getFdVerbose(verbose, fdNumber);
  return isVerboseFunction(fdVerbose) ? fdVerbose : void 0;
};
var getFdVerbose = (verbose, fdNumber) => fdNumber === void 0 ? getFdGenericVerbose(verbose) : getFdSpecificValue(verbose, fdNumber);
var getFdGenericVerbose = (verbose) => verbose.find((fdVerbose) => isVerboseFunction(fdVerbose)) ?? VERBOSE_VALUES.findLast((fdVerbose) => verbose.includes(fdVerbose));
var isVerboseFunction = (fdVerbose) => typeof fdVerbose === "function";
var VERBOSE_VALUES = ["none", "short", "full"];

// node_modules/.pnpm/execa@9.6.0/node_modules/execa/lib/verbose/log.js
var import_node_util3 = require("node:util");

// node_modules/.pnpm/execa@9.6.0/node_modules/execa/lib/arguments/escape.js
var import_node_process4 = require("node:process");
var import_node_util2 = require("node:util");
var joinCommand = (filePath, rawArguments) => {
  const fileAndArguments = [filePath, ...rawArguments];
  const command = fileAndArguments.join(" ");
  const escapedCommand = fileAndArguments.map((fileAndArgument) => quoteString(escapeControlCharacters(fileAndArgument))).join(" ");
  return { command, escapedCommand };
};
var escapeLines = (lines) => (0, import_node_util2.stripVTControlCharacters)(lines).split("\n").map((line) => escapeControlCharacters(line)).join("\n");
var escapeControlCharacters = (line) => line.replaceAll(SPECIAL_CHAR_REGEXP, (character) => escapeControlCharacter(character));
var escapeControlCharacter = (character) => {
  const commonEscape = COMMON_ESCAPES[character];
  if (commonEscape !== void 0) {
    return commonEscape;
  }
  const codepoint = character.codePointAt(0);
  const codepointHex = codepoint.toString(16);
  return codepoint <= ASTRAL_START ? `\\u${codepointHex.padStart(4, "0")}` : `\\U${codepointHex}`;
};
var getSpecialCharRegExp = () => {
  try {
    return new RegExp("\\p{Separator}|\\p{Other}", "gu");
  } catch {
    return /[\s\u0000-\u001F\u007F-\u009F\u00AD]/g;
  }
};
var SPECIAL_CHAR_REGEXP = getSpecialCharRegExp();
var COMMON_ESCAPES = {
  " ": " ",
  "\b": "\\b",
  "\f": "\\f",
  "\n": "\\n",
  "\r": "\\r",
  "	": "\\t"
};
var ASTRAL_START = 65535;
var quoteString = (escapedArgument) => {
  if (NO_ESCAPE_REGEXP.test(escapedArgument)) {
    return escapedArgument;
  }
  return import_node_process4.platform === "win32" ? `"${escapedArgument.replaceAll('"', '""')}"` : `'${escapedArgument.replaceAll("'", "'\\''")}'`;
};
var NO_ESCAPE_REGEXP = /^[\w./-]+$/;

// node_modules/.pnpm/is-unicode-supported@2.1.0/node_modules/is-unicode-supported/index.js
var import_node_process5 = __toESM(require("node:process"), 1);
function isUnicodeSupported2() {
  const { env } = import_node_process5.default;
  const { TERM: TERM2, TERM_PROGRAM } = env;
  if (import_node_process5.default.platform !== "win32") {
    return TERM2 !== "linux";
  }
  return Boolean(env.WT_SESSION) || Boolean(env.TERMINUS_SUBLIME) || env.ConEmuTask === "{cmd::Cmder}" || TERM_PROGRAM === "Terminus-Sublime" || TERM_PROGRAM === "vscode" || TERM2 === "xterm-256color" || TERM2 === "alacritty" || TERM2 === "rxvt-unicode" || TERM2 === "rxvt-unicode-256color" || env.TERMINAL_EMULATOR === "JetBrains-JediTerm";
}

// node_modules/.pnpm/figures@6.1.0/node_modules/figures/index.js
var common = {
  circleQuestionMark: "(?)",
  questionMarkPrefix: "(?)",
  square: "\u2588",
  squareDarkShade: "\u2593",
  squareMediumShade: "\u2592",
  squareLightShade: "\u2591",
  squareTop: "\u2580",
  squareBottom: "\u2584",
  squareLeft: "\u258C",
  squareRight: "\u2590",
  squareCenter: "\u25A0",
  bullet: "\u25CF",
  dot: "\u2024",
  ellipsis: "\u2026",
  pointerSmall: "\u203A",
  triangleUp: "\u25B2",
  triangleUpSmall: "\u25B4",
  triangleDown: "\u25BC",
  triangleDownSmall: "\u25BE",
  triangleLeftSmall: "\u25C2",
  triangleRightSmall: "\u25B8",
  home: "\u2302",
  heart: "\u2665",
  musicNote: "\u266A",
  musicNoteBeamed: "\u266B",
  arrowUp: "\u2191",
  arrowDown: "\u2193",
  arrowLeft: "\u2190",
  arrowRight: "\u2192",
  arrowLeftRight: "\u2194",
  arrowUpDown: "\u2195",
  almostEqual: "\u2248",
  notEqual: "\u2260",
  lessOrEqual: "\u2264",
  greaterOrEqual: "\u2265",
  identical: "\u2261",
  infinity: "\u221E",
  subscriptZero: "\u2080",
  subscriptOne: "\u2081",
  subscriptTwo: "\u2082",
  subscriptThree: "\u2083",
  subscriptFour: "\u2084",
  subscriptFive: "\u2085",
  subscriptSix: "\u2086",
  subscriptSeven: "\u2087",
  subscriptEight: "\u2088",
  subscriptNine: "\u2089",
  oneHalf: "\xBD",
  oneThird: "\u2153",
  oneQuarter: "\xBC",
  oneFifth: "\u2155",
  oneSixth: "\u2159",
  oneEighth: "\u215B",
  twoThirds: "\u2154",
  twoFifths: "\u2156",
  threeQuarters: "\xBE",
  threeFifths: "\u2157",
  threeEighths: "\u215C",
  fourFifths: "\u2158",
  fiveSixths: "\u215A",
  fiveEighths: "\u215D",
  sevenEighths: "\u215E",
  line: "\u2500",
  lineBold: "\u2501",
  lineDouble: "\u2550",
  lineDashed0: "\u2504",
  lineDashed1: "\u2505",
  lineDashed2: "\u2508",
  lineDashed3: "\u2509",
  lineDashed4: "\u254C",
  lineDashed5: "\u254D",
  lineDashed6: "\u2574",
  lineDashed7: "\u2576",
  lineDashed8: "\u2578",
  lineDashed9: "\u257A",
  lineDashed10: "\u257C",
  lineDashed11: "\u257E",
  lineDashed12: "\u2212",
  lineDashed13: "\u2013",
  lineDashed14: "\u2010",
  lineDashed15: "\u2043",
  lineVertical: "\u2502",
  lineVerticalBold: "\u2503",
  lineVerticalDouble: "\u2551",
  lineVerticalDashed0: "\u2506",
  lineVerticalDashed1: "\u2507",
  lineVerticalDashed2: "\u250A",
  lineVerticalDashed3: "\u250B",
  lineVerticalDashed4: "\u254E",
  lineVerticalDashed5: "\u254F",
  lineVerticalDashed6: "\u2575",
  lineVerticalDashed7: "\u2577",
  lineVerticalDashed8: "\u2579",
  lineVerticalDashed9: "\u257B",
  lineVerticalDashed10: "\u257D",
  lineVerticalDashed11: "\u257F",
  lineDownLeft: "\u2510",
  lineDownLeftArc: "\u256E",
  lineDownBoldLeftBold: "\u2513",
  lineDownBoldLeft: "\u2512",
  lineDownLeftBold: "\u2511",
  lineDownDoubleLeftDouble: "\u2557",
  lineDownDoubleLeft: "\u2556",
  lineDownLeftDouble: "\u2555",
  lineDownRight: "\u250C",
  lineDownRightArc: "\u256D",
  lineDownBoldRightBold: "\u250F",
  lineDownBoldRight: "\u250E",
  lineDownRightBold: "\u250D",
  lineDownDoubleRightDouble: "\u2554",
  lineDownDoubleRight: "\u2553",
  lineDownRightDouble: "\u2552",
  lineUpLeft: "\u2518",
  lineUpLeftArc: "\u256F",
  lineUpBoldLeftBold: "\u251B",
  lineUpBoldLeft: "\u251A",
  lineUpLeftBold: "\u2519",
  lineUpDoubleLeftDouble: "\u255D",
  lineUpDoubleLeft: "\u255C",
  lineUpLeftDouble: "\u255B",
  lineUpRight: "\u2514",
  lineUpRightArc: "\u2570",
  lineUpBoldRightBold: "\u2517",
  lineUpBoldRight: "\u2516",
  lineUpRightBold: "\u2515",
  lineUpDoubleRightDouble: "\u255A",
  lineUpDoubleRight: "\u2559",
  lineUpRightDouble: "\u2558",
  lineUpDownLeft: "\u2524",
  lineUpBoldDownBoldLeftBold: "\u252B",
  lineUpBoldDownBoldLeft: "\u2528",
  lineUpDownLeftBold: "\u2525",
  lineUpBoldDownLeftBold: "\u2529",
  lineUpDownBoldLeftBold: "\u252A",
  lineUpDownBoldLeft: "\u2527",
  lineUpBoldDownLeft: "\u2526",
  lineUpDoubleDownDoubleLeftDouble: "\u2563",
  lineUpDoubleDownDoubleLeft: "\u2562",
  lineUpDownLeftDouble: "\u2561",
  lineUpDownRight: "\u251C",
  lineUpBoldDownBoldRightBold: "\u2523",
  lineUpBoldDownBoldRight: "\u2520",
  lineUpDownRightBold: "\u251D",
  lineUpBoldDownRightBold: "\u2521",
  lineUpDownBoldRightBold: "\u2522",
  lineUpDownBoldRight: "\u251F",
  lineUpBoldDownRight: "\u251E",
  lineUpDoubleDownDoubleRightDouble: "\u2560",
  lineUpDoubleDownDoubleRight: "\u255F",
  lineUpDownRightDouble: "\u255E",
  lineDownLeftRight: "\u252C",
  lineDownBoldLeftBoldRightBold: "\u2533",
  lineDownLeftBoldRightBold: "\u252F",
  lineDownBoldLeftRight: "\u2530",
  lineDownBoldLeftBoldRight: "\u2531",
  lineDownBoldLeftRightBold: "\u2532",
  lineDownLeftRightBold: "\u252E",
  lineDownLeftBoldRight: "\u252D",
  lineDownDoubleLeftDoubleRightDouble: "\u2566",
  lineDownDoubleLeftRight: "\u2565",
  lineDownLeftDoubleRightDouble: "\u2564",
  lineUpLeftRight: "\u2534",
  lineUpBoldLeftBoldRightBold: "\u253B",
  lineUpLeftBoldRightBold: "\u2537",
  lineUpBoldLeftRight: "\u2538",
  lineUpBoldLeftBoldRight: "\u2539",
  lineUpBoldLeftRightBold: "\u253A",
  lineUpLeftRightBold: "\u2536",
  lineUpLeftBoldRight: "\u2535",
  lineUpDoubleLeftDoubleRightDouble: "\u2569",
  lineUpDoubleLeftRight: "\u2568",
  lineUpLeftDoubleRightDouble: "\u2567",
  lineUpDownLeftRight: "\u253C",
  lineUpBoldDownBoldLeftBoldRightBold: "\u254B",
  lineUpDownBoldLeftBoldRightBold: "\u2548",
  lineUpBoldDownLeftBoldRightBold: "\u2547",
  lineUpBoldDownBoldLeftRightBold: "\u254A",
  lineUpBoldDownBoldLeftBoldRight: "\u2549",
  lineUpBoldDownLeftRight: "\u2540",
  lineUpDownBoldLeftRight: "\u2541",
  lineUpDownLeftBoldRight: "\u253D",
  lineUpDownLeftRightBold: "\u253E",
  lineUpBoldDownBoldLeftRight: "\u2542",
  lineUpDownLeftBoldRightBold: "\u253F",
  lineUpBoldDownLeftBoldRight: "\u2543",
  lineUpBoldDownLeftRightBold: "\u2544",
  lineUpDownBoldLeftBoldRight: "\u2545",
  lineUpDownBoldLeftRightBold: "\u2546",
  lineUpDoubleDownDoubleLeftDoubleRightDouble: "\u256C",
  lineUpDoubleDownDoubleLeftRight: "\u256B",
  lineUpDownLeftDoubleRightDouble: "\u256A",
  lineCross: "\u2573",
  lineBackslash: "\u2572",
  lineSlash: "\u2571"
};
var specialMainSymbols = {
  tick: "\u2714",
  info: "\u2139",
  warning: "\u26A0",
  cross: "\u2718",
  squareSmall: "\u25FB",
  squareSmallFilled: "\u25FC",
  circle: "\u25EF",
  circleFilled: "\u25C9",
  circleDotted: "\u25CC",
  circleDouble: "\u25CE",
  circleCircle: "\u24DE",
  circleCross: "\u24E7",
  circlePipe: "\u24BE",
  radioOn: "\u25C9",
  radioOff: "\u25EF",
  checkboxOn: "\u2612",
  checkboxOff: "\u2610",
  checkboxCircleOn: "\u24E7",
  checkboxCircleOff: "\u24BE",
  pointer: "\u276F",
  triangleUpOutline: "\u25B3",
  triangleLeft: "\u25C0",
  triangleRight: "\u25B6",
  lozenge: "\u25C6",
  lozengeOutline: "\u25C7",
  hamburger: "\u2630",
  smiley: "\u32E1",
  mustache: "\u0DF4",
  star: "\u2605",
  play: "\u25B6",
  nodejs: "\u2B22",
  oneSeventh: "\u2150",
  oneNinth: "\u2151",
  oneTenth: "\u2152"
};
var specialFallbackSymbols = {
  tick: "\u221A",
  info: "i",
  warning: "\u203C",
  cross: "\xD7",
  squareSmall: "\u25A1",
  squareSmallFilled: "\u25A0",
  circle: "( )",
  circleFilled: "(*)",
  circleDotted: "( )",
  circleDouble: "( )",
  circleCircle: "(\u25CB)",
  circleCross: "(\xD7)",
  circlePipe: "(\u2502)",
  radioOn: "(*)",
  radioOff: "( )",
  checkboxOn: "[\xD7]",
  checkboxOff: "[ ]",
  checkboxCircleOn: "(\xD7)",
  checkboxCircleOff: "( )",
  pointer: ">",
  triangleUpOutline: "\u2206",
  triangleLeft: "\u25C4",
  triangleRight: "\u25BA",
  lozenge: "\u2666",
  lozengeOutline: "\u25CA",
  hamburger: "\u2261",
  smiley: "\u263A",
  mustache: "\u250C\u2500\u2510",
  star: "\u2736",
  play: "\u25BA",
  nodejs: "\u2666",
  oneSeventh: "1/7",
  oneNinth: "1/9",
  oneTenth: "1/10"
};
var mainSymbols = { ...common, ...specialMainSymbols };
var fallbackSymbols = { ...common, ...specialFallbackSymbols };
var shouldUseMain = isUnicodeSupported2();
var figures = shouldUseMain ? mainSymbols : fallbackSymbols;
var figures_default = figures;
var replacements = Object.entries(specialMainSymbols);

// node_modules/.pnpm/yoctocolors@2.1.2/node_modules/yoctocolors/base.js
var import_node_tty2 = __toESM(require("node:tty"), 1);
var _a, _b, _c, _d;
var hasColors = ((_d = (_c = (_b = (_a = import_node_tty2.default) == null ? void 0 : _a.WriteStream) == null ? void 0 : _b.prototype) == null ? void 0 : _c.hasColors) == null ? void 0 : _d.call(_c)) ?? false;
var format = (open, close) => {
  if (!hasColors) {
    return (input) => input;
  }
  const openCode = `\x1B[${open}m`;
  const closeCode = `\x1B[${close}m`;
  return (input) => {
    const string = input + "";
    let index = string.indexOf(closeCode);
    if (index === -1) {
      return openCode + string + closeCode;
    }
    let result = openCode;
    let lastIndex = 0;
    const reopenOnNestedClose = close === 22;
    const replaceCode = (reopenOnNestedClose ? closeCode : "") + openCode;
    while (index !== -1) {
      result += string.slice(lastIndex, index) + replaceCode;
      lastIndex = index + closeCode.length;
      index = string.indexOf(closeCode, lastIndex);
    }
    result += string.slice(lastIndex) + closeCode;
    return result;
  };
};
var reset2 = format(0, 0);
var bold2 = format(1, 22);
var dim2 = format(2, 22);
var italic2 = format(3, 23);
var underline2 = format(4, 24);
var overline = format(53, 55);
var inverse2 = format(7, 27);
var hidden2 = format(8, 28);
var strikethrough2 = format(9, 29);
var black2 = format(30, 39);
var red2 = format(31, 39);
var green2 = format(32, 39);
var yellow2 = format(33, 39);
var blue2 = format(34, 39);
var magenta2 = format(35, 39);
var cyan2 = format(36, 39);
var white2 = format(37, 39);
var gray2 = format(90, 39);
var bgBlack2 = format(40, 49);
var bgRed2 = format(41, 49);
var bgGreen2 = format(42, 49);
var bgYellow2 = format(43, 49);
var bgBlue2 = format(44, 49);
var bgMagenta2 = format(45, 49);
var bgCyan2 = format(46, 49);
var bgWhite2 = format(47, 49);
var bgGray = format(100, 49);
var redBright = format(91, 39);
var greenBright = format(92, 39);
var yellowBright = format(93, 39);
var blueBright = format(94, 39);
var magentaBright = format(95, 39);
var cyanBright = format(96, 39);
var whiteBright = format(97, 39);
var bgRedBright = format(101, 49);
var bgGreenBright = format(102, 49);
var bgYellowBright = format(103, 49);
var bgBlueBright = format(104, 49);
var bgMagentaBright = format(105, 49);
var bgCyanBright = format(106, 49);
var bgWhiteBright = format(107, 49);

// node_modules/.pnpm/execa@9.6.0/node_modules/execa/lib/verbose/default.js
var defaultVerboseFunction = ({
  type,
  message,
  timestamp,
  piped,
  commandId,
  result: { failed = false } = {},
  options: { reject = true }
}) => {
  const timestampString = serializeTimestamp(timestamp);
  const icon = ICONS[type]({ failed, reject, piped });
  const color = COLORS[type]({ reject });
  return `${gray2(`[${timestampString}]`)} ${gray2(`[${commandId}]`)} ${color(icon)} ${color(message)}`;
};
var serializeTimestamp = (timestamp) => `${padField(timestamp.getHours(), 2)}:${padField(timestamp.getMinutes(), 2)}:${padField(timestamp.getSeconds(), 2)}.${padField(timestamp.getMilliseconds(), 3)}`;
var padField = (field, padding) => String(field).padStart(padding, "0");
var getFinalIcon = ({ failed, reject }) => {
  if (!failed) {
    return figures_default.tick;
  }
  return reject ? figures_default.cross : figures_default.warning;
};
var ICONS = {
  command: ({ piped }) => piped ? "|" : "$",
  output: () => " ",
  ipc: () => "*",
  error: getFinalIcon,
  duration: getFinalIcon
};
var identity = (string) => string;
var COLORS = {
  command: () => bold2,
  output: () => identity,
  ipc: () => identity,
  error: ({ reject }) => reject ? redBright : yellowBright,
  duration: () => gray2
};

// node_modules/.pnpm/execa@9.6.0/node_modules/execa/lib/verbose/custom.js
var applyVerboseOnLines = (printedLines, verboseInfo, fdNumber) => {
  const verboseFunction = getVerboseFunction(verboseInfo, fdNumber);
  return printedLines.map(({ verboseLine, verboseObject }) => applyVerboseFunction(verboseLine, verboseObject, verboseFunction)).filter((printedLine) => printedLine !== void 0).map((printedLine) => appendNewline(printedLine)).join("");
};
var applyVerboseFunction = (verboseLine, verboseObject, verboseFunction) => {
  if (verboseFunction === void 0) {
    return verboseLine;
  }
  const printedLine = verboseFunction(verboseLine, verboseObject);
  if (typeof printedLine === "string") {
    return printedLine;
  }
};
var appendNewline = (printedLine) => printedLine.endsWith("\n") ? printedLine : `${printedLine}
`;

// node_modules/.pnpm/execa@9.6.0/node_modules/execa/lib/verbose/log.js
var verboseLog = ({ type, verboseMessage, fdNumber, verboseInfo, result }) => {
  const verboseObject = getVerboseObject({ type, result, verboseInfo });
  const printedLines = getPrintedLines(verboseMessage, verboseObject);
  const finalLines = applyVerboseOnLines(printedLines, verboseInfo, fdNumber);
  if (finalLines !== "") {
    console.warn(finalLines.slice(0, -1));
  }
};
var getVerboseObject = ({
  type,
  result,
  verboseInfo: { escapedCommand, commandId, rawOptions: { piped = false, ...options } }
}) => ({
  type,
  escapedCommand,
  commandId: `${commandId}`,
  timestamp: /* @__PURE__ */ new Date(),
  piped,
  result,
  options
});
var getPrintedLines = (verboseMessage, verboseObject) => verboseMessage.split("\n").map((message) => getPrintedLine({ ...verboseObject, message }));
var getPrintedLine = (verboseObject) => {
  const verboseLine = defaultVerboseFunction(verboseObject);
  return { verboseLine, verboseObject };
};
var serializeVerboseMessage = (message) => {
  const messageString = typeof message === "string" ? message : (0, import_node_util3.inspect)(message);
  const escapedMessage = escapeLines(messageString);
  return escapedMessage.replaceAll("	", " ".repeat(TAB_SIZE));
};
var TAB_SIZE = 2;

// node_modules/.pnpm/execa@9.6.0/node_modules/execa/lib/verbose/start.js
var logCommand = (escapedCommand, verboseInfo) => {
  if (!isVerbose(verboseInfo)) {
    return;
  }
  verboseLog({
    type: "command",
    verboseMessage: escapedCommand,
    verboseInfo
  });
};

// node_modules/.pnpm/execa@9.6.0/node_modules/execa/lib/verbose/info.js
var getVerboseInfo = (verbose, escapedCommand, rawOptions) => {
  validateVerbose(verbose);
  const commandId = getCommandId(verbose);
  return {
    verbose,
    escapedCommand,
    commandId,
    rawOptions
  };
};
var getCommandId = (verbose) => isVerbose({ verbose }) ? COMMAND_ID++ : void 0;
var COMMAND_ID = 0n;
var validateVerbose = (verbose) => {
  for (const fdVerbose of verbose) {
    if (fdVerbose === false) {
      throw new TypeError(`The "verbose: false" option was renamed to "verbose: 'none'".`);
    }
    if (fdVerbose === true) {
      throw new TypeError(`The "verbose: true" option was renamed to "verbose: 'short'".`);
    }
    if (!VERBOSE_VALUES.includes(fdVerbose) && !isVerboseFunction(fdVerbose)) {
      const allowedValues = VERBOSE_VALUES.map((allowedValue) => `'${allowedValue}'`).join(", ");
      throw new TypeError(`The "verbose" option must not be ${fdVerbose}. Allowed values are: ${allowedValues} or a function.`);
    }
  }
};

// node_modules/.pnpm/execa@9.6.0/node_modules/execa/lib/return/duration.js
var import_node_process6 = require("node:process");
var getStartTime = () => import_node_process6.hrtime.bigint();
var getDurationMs = (startTime) => Number(import_node_process6.hrtime.bigint() - startTime) / 1e6;

// node_modules/.pnpm/execa@9.6.0/node_modules/execa/lib/arguments/command.js
var handleCommand = (filePath, rawArguments, rawOptions) => {
  const startTime = getStartTime();
  const { command, escapedCommand } = joinCommand(filePath, rawArguments);
  const verbose = normalizeFdSpecificOption(rawOptions, "verbose");
  const verboseInfo = getVerboseInfo(verbose, escapedCommand, { ...rawOptions });
  logCommand(escapedCommand, verboseInfo);
  return {
    command,
    escapedCommand,
    startTime,
    verboseInfo
  };
};

// node_modules/.pnpm/execa@9.6.0/node_modules/execa/lib/arguments/options.js
var import_node_path12 = __toESM(require("node:path"), 1);
var import_node_process10 = __toESM(require("node:process"), 1);
var import_cross_spawn2 = __toESM(require_cross_spawn(), 1);

// node_modules/.pnpm/npm-run-path@6.0.0/node_modules/npm-run-path/index.js
var import_node_process7 = __toESM(require("node:process"), 1);
var import_node_path9 = __toESM(require("node:path"), 1);

// node_modules/.pnpm/path-key@4.0.0/node_modules/path-key/index.js
function pathKey(options = {}) {
  const {
    env = process.env,
    platform: platform2 = process.platform
  } = options;
  if (platform2 !== "win32") {
    return "PATH";
  }
  return Object.keys(env).reverse().find((key) => key.toUpperCase() === "PATH") || "Path";
}

// node_modules/.pnpm/unicorn-magic@0.3.0/node_modules/unicorn-magic/node.js
var import_node_util4 = require("node:util");
var import_node_child_process2 = require("node:child_process");
var import_node_path8 = __toESM(require("node:path"), 1);
var import_node_url2 = require("node:url");
var execFileOriginal = (0, import_node_util4.promisify)(import_node_child_process2.execFile);
function toPath(urlOrPath) {
  return urlOrPath instanceof URL ? (0, import_node_url2.fileURLToPath)(urlOrPath) : urlOrPath;
}
function traversePathUp(startPath) {
  return {
    *[Symbol.iterator]() {
      let currentPath = import_node_path8.default.resolve(toPath(startPath));
      let previousPath;
      while (previousPath !== currentPath) {
        yield currentPath;
        previousPath = currentPath;
        currentPath = import_node_path8.default.resolve(currentPath, "..");
      }
    }
  };
}
var TEN_MEGABYTES_IN_BYTES = 10 * 1024 * 1024;

// node_modules/.pnpm/npm-run-path@6.0.0/node_modules/npm-run-path/index.js
var npmRunPath = ({
  cwd = import_node_process7.default.cwd(),
  path: pathOption = import_node_process7.default.env[pathKey()],
  preferLocal = true,
  execPath: execPath2 = import_node_process7.default.execPath,
  addExecPath = true
} = {}) => {
  const cwdPath = import_node_path9.default.resolve(toPath(cwd));
  const result = [];
  const pathParts = pathOption.split(import_node_path9.default.delimiter);
  if (preferLocal) {
    applyPreferLocal(result, pathParts, cwdPath);
  }
  if (addExecPath) {
    applyExecPath(result, pathParts, execPath2, cwdPath);
  }
  return pathOption === "" || pathOption === import_node_path9.default.delimiter ? `${result.join(import_node_path9.default.delimiter)}${pathOption}` : [...result, pathOption].join(import_node_path9.default.delimiter);
};
var applyPreferLocal = (result, pathParts, cwdPath) => {
  for (const directory of traversePathUp(cwdPath)) {
    const pathPart = import_node_path9.default.join(directory, "node_modules/.bin");
    if (!pathParts.includes(pathPart)) {
      result.push(pathPart);
    }
  }
};
var applyExecPath = (result, pathParts, execPath2, cwdPath) => {
  const pathPart = import_node_path9.default.resolve(cwdPath, toPath(execPath2), "..");
  if (!pathParts.includes(pathPart)) {
    result.push(pathPart);
  }
};
var npmRunPathEnv = ({ env = import_node_process7.default.env, ...options } = {}) => {
  env = { ...env };
  const pathName = pathKey({ env });
  options.path = env[pathName];
  env[pathName] = npmRunPath(options);
  return env;
};

// node_modules/.pnpm/execa@9.6.0/node_modules/execa/lib/terminate/kill.js
var import_promises = require("node:timers/promises");

// node_modules/.pnpm/execa@9.6.0/node_modules/execa/lib/return/final-error.js
var getFinalError = (originalError, message, isSync) => {
  const ErrorClass = isSync ? ExecaSyncError : ExecaError;
  const options = originalError instanceof DiscardedError ? {} : { cause: originalError };
  return new ErrorClass(message, options);
};
var DiscardedError = class extends Error {
};
var setErrorName = (ErrorClass, value) => {
  Object.defineProperty(ErrorClass.prototype, "name", {
    value,
    writable: true,
    enumerable: false,
    configurable: true
  });
  Object.defineProperty(ErrorClass.prototype, execaErrorSymbol, {
    value: true,
    writable: false,
    enumerable: false,
    configurable: false
  });
};
var isExecaError = (error) => isErrorInstance(error) && execaErrorSymbol in error;
var execaErrorSymbol = Symbol("isExecaError");
var isErrorInstance = (value) => Object.prototype.toString.call(value) === "[object Error]";
var ExecaError = class extends Error {
};
setErrorName(ExecaError, ExecaError.name);
var ExecaSyncError = class extends Error {
};
setErrorName(ExecaSyncError, ExecaSyncError.name);

// node_modules/.pnpm/execa@9.6.0/node_modules/execa/lib/terminate/signal.js
var import_node_os3 = require("node:os");

// node_modules/.pnpm/human-signals@8.0.1/node_modules/human-signals/build/src/main.js
var import_node_os2 = require("node:os");

// node_modules/.pnpm/human-signals@8.0.1/node_modules/human-signals/build/src/realtime.js
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

// node_modules/.pnpm/human-signals@8.0.1/node_modules/human-signals/build/src/signals.js
var import_node_os = require("node:os");

// node_modules/.pnpm/human-signals@8.0.1/node_modules/human-signals/build/src/core.js
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

// node_modules/.pnpm/human-signals@8.0.1/node_modules/human-signals/build/src/signals.js
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

// node_modules/.pnpm/human-signals@8.0.1/node_modules/human-signals/build/src/main.js
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

// node_modules/.pnpm/execa@9.6.0/node_modules/execa/lib/terminate/signal.js
var normalizeKillSignal = (killSignal) => {
  const optionName = "option `killSignal`";
  if (killSignal === 0) {
    throw new TypeError(`Invalid ${optionName}: 0 cannot be used.`);
  }
  return normalizeSignal2(killSignal, optionName);
};
var normalizeSignalArgument = (signal) => signal === 0 ? signal : normalizeSignal2(signal, "`subprocess.kill()`'s argument");
var normalizeSignal2 = (signalNameOrInteger, optionName) => {
  if (Number.isInteger(signalNameOrInteger)) {
    return normalizeSignalInteger(signalNameOrInteger, optionName);
  }
  if (typeof signalNameOrInteger === "string") {
    return normalizeSignalName(signalNameOrInteger, optionName);
  }
  throw new TypeError(`Invalid ${optionName} ${String(signalNameOrInteger)}: it must be a string or an integer.
${getAvailableSignals()}`);
};
var normalizeSignalInteger = (signalInteger, optionName) => {
  if (signalsIntegerToName.has(signalInteger)) {
    return signalsIntegerToName.get(signalInteger);
  }
  throw new TypeError(`Invalid ${optionName} ${signalInteger}: this signal integer does not exist.
${getAvailableSignals()}`);
};
var getSignalsIntegerToName = () => new Map(Object.entries(import_node_os3.constants.signals).reverse().map(([signalName, signalInteger]) => [signalInteger, signalName]));
var signalsIntegerToName = getSignalsIntegerToName();
var normalizeSignalName = (signalName, optionName) => {
  if (signalName in import_node_os3.constants.signals) {
    return signalName;
  }
  if (signalName.toUpperCase() in import_node_os3.constants.signals) {
    throw new TypeError(`Invalid ${optionName} '${signalName}': please rename it to '${signalName.toUpperCase()}'.`);
  }
  throw new TypeError(`Invalid ${optionName} '${signalName}': this signal name does not exist.
${getAvailableSignals()}`);
};
var getAvailableSignals = () => `Available signal names: ${getAvailableSignalNames()}.
Available signal numbers: ${getAvailableSignalIntegers()}.`;
var getAvailableSignalNames = () => Object.keys(import_node_os3.constants.signals).sort().map((signalName) => `'${signalName}'`).join(", ");
var getAvailableSignalIntegers = () => [...new Set(Object.values(import_node_os3.constants.signals).sort((signalInteger, signalIntegerTwo) => signalInteger - signalIntegerTwo))].join(", ");
var getSignalDescription = (signal) => signalsByName[signal].description;

// node_modules/.pnpm/execa@9.6.0/node_modules/execa/lib/terminate/kill.js
var normalizeForceKillAfterDelay = (forceKillAfterDelay) => {
  if (forceKillAfterDelay === false) {
    return forceKillAfterDelay;
  }
  if (forceKillAfterDelay === true) {
    return DEFAULT_FORCE_KILL_TIMEOUT;
  }
  if (!Number.isFinite(forceKillAfterDelay) || forceKillAfterDelay < 0) {
    throw new TypeError(`Expected the \`forceKillAfterDelay\` option to be a non-negative integer, got \`${forceKillAfterDelay}\` (${typeof forceKillAfterDelay})`);
  }
  return forceKillAfterDelay;
};
var DEFAULT_FORCE_KILL_TIMEOUT = 1e3 * 5;
var subprocessKill = ({ kill, options: { forceKillAfterDelay, killSignal }, onInternalError, context, controller }, signalOrError, errorArgument) => {
  const { signal, error } = parseKillArguments(signalOrError, errorArgument, killSignal);
  emitKillError(error, onInternalError);
  const killResult = kill(signal);
  setKillTimeout({
    kill,
    signal,
    forceKillAfterDelay,
    killSignal,
    killResult,
    context,
    controller
  });
  return killResult;
};
var parseKillArguments = (signalOrError, errorArgument, killSignal) => {
  const [signal = killSignal, error] = isErrorInstance(signalOrError) ? [void 0, signalOrError] : [signalOrError, errorArgument];
  if (typeof signal !== "string" && !Number.isInteger(signal)) {
    throw new TypeError(`The first argument must be an error instance or a signal name string/integer: ${String(signal)}`);
  }
  if (error !== void 0 && !isErrorInstance(error)) {
    throw new TypeError(`The second argument is optional. If specified, it must be an error instance: ${error}`);
  }
  return { signal: normalizeSignalArgument(signal), error };
};
var emitKillError = (error, onInternalError) => {
  if (error !== void 0) {
    onInternalError.reject(error);
  }
};
var setKillTimeout = async ({ kill, signal, forceKillAfterDelay, killSignal, killResult, context, controller }) => {
  if (signal === killSignal && killResult) {
    killOnTimeout({
      kill,
      forceKillAfterDelay,
      context,
      controllerSignal: controller.signal
    });
  }
};
var killOnTimeout = async ({ kill, forceKillAfterDelay, context, controllerSignal }) => {
  if (forceKillAfterDelay === false) {
    return;
  }
  try {
    await (0, import_promises.setTimeout)(forceKillAfterDelay, void 0, { signal: controllerSignal });
    if (kill("SIGKILL")) {
      context.isForcefullyTerminated ??= true;
    }
  } catch {
  }
};

// node_modules/.pnpm/execa@9.6.0/node_modules/execa/lib/utils/abort-signal.js
var import_node_events = require("node:events");
var onAbortedSignal = async (mainSignal, stopSignal) => {
  if (!mainSignal.aborted) {
    await (0, import_node_events.once)(mainSignal, "abort", { signal: stopSignal });
  }
};

// node_modules/.pnpm/execa@9.6.0/node_modules/execa/lib/terminate/cancel.js
var validateCancelSignal = ({ cancelSignal }) => {
  if (cancelSignal !== void 0 && Object.prototype.toString.call(cancelSignal) !== "[object AbortSignal]") {
    throw new Error(`The \`cancelSignal\` option must be an AbortSignal: ${String(cancelSignal)}`);
  }
};
var throwOnCancel = ({ subprocess, cancelSignal, gracefulCancel, context, controller }) => cancelSignal === void 0 || gracefulCancel ? [] : [terminateOnCancel(subprocess, cancelSignal, context, controller)];
var terminateOnCancel = async (subprocess, cancelSignal, context, { signal }) => {
  await onAbortedSignal(cancelSignal, signal);
  context.terminationReason ??= "cancel";
  subprocess.kill();
  throw cancelSignal.reason;
};

// node_modules/.pnpm/execa@9.6.0/node_modules/execa/lib/ipc/graceful.js
var import_promises3 = require("node:timers/promises");

// node_modules/.pnpm/execa@9.6.0/node_modules/execa/lib/ipc/send.js
var import_node_util5 = require("node:util");

// node_modules/.pnpm/execa@9.6.0/node_modules/execa/lib/ipc/validation.js
var validateIpcMethod = ({ methodName, isSubprocess, ipc, isConnected: isConnected2 }) => {
  validateIpcOption(methodName, isSubprocess, ipc);
  validateConnection(methodName, isSubprocess, isConnected2);
};
var validateIpcOption = (methodName, isSubprocess, ipc) => {
  if (!ipc) {
    throw new Error(`${getMethodName(methodName, isSubprocess)} can only be used if the \`ipc\` option is \`true\`.`);
  }
};
var validateConnection = (methodName, isSubprocess, isConnected2) => {
  if (!isConnected2) {
    throw new Error(`${getMethodName(methodName, isSubprocess)} cannot be used: the ${getOtherProcessName(isSubprocess)} has already exited or disconnected.`);
  }
};
var throwOnEarlyDisconnect = (isSubprocess) => {
  throw new Error(`${getMethodName("getOneMessage", isSubprocess)} could not complete: the ${getOtherProcessName(isSubprocess)} exited or disconnected.`);
};
var throwOnStrictDeadlockError = (isSubprocess) => {
  throw new Error(`${getMethodName("sendMessage", isSubprocess)} failed: the ${getOtherProcessName(isSubprocess)} is sending a message too, instead of listening to incoming messages.
This can be fixed by both sending a message and listening to incoming messages at the same time:

const [receivedMessage] = await Promise.all([
	${getMethodName("getOneMessage", isSubprocess)},
	${getMethodName("sendMessage", isSubprocess, "message, {strict: true}")},
]);`);
};
var getStrictResponseError = (error, isSubprocess) => new Error(`${getMethodName("sendMessage", isSubprocess)} failed when sending an acknowledgment response to the ${getOtherProcessName(isSubprocess)}.`, { cause: error });
var throwOnMissingStrict = (isSubprocess) => {
  throw new Error(`${getMethodName("sendMessage", isSubprocess)} failed: the ${getOtherProcessName(isSubprocess)} is not listening to incoming messages.`);
};
var throwOnStrictDisconnect = (isSubprocess) => {
  throw new Error(`${getMethodName("sendMessage", isSubprocess)} failed: the ${getOtherProcessName(isSubprocess)} exited without listening to incoming messages.`);
};
var getAbortDisconnectError = () => new Error(`\`cancelSignal\` aborted: the ${getOtherProcessName(true)} disconnected.`);
var throwOnMissingParent = () => {
  throw new Error("`getCancelSignal()` cannot be used without setting the `cancelSignal` subprocess option.");
};
var handleEpipeError = ({ error, methodName, isSubprocess }) => {
  if (error.code === "EPIPE") {
    throw new Error(`${getMethodName(methodName, isSubprocess)} cannot be used: the ${getOtherProcessName(isSubprocess)} is disconnecting.`, { cause: error });
  }
};
var handleSerializationError = ({ error, methodName, isSubprocess, message }) => {
  if (isSerializationError(error)) {
    throw new Error(`${getMethodName(methodName, isSubprocess)}'s argument type is invalid: the message cannot be serialized: ${String(message)}.`, { cause: error });
  }
};
var isSerializationError = ({ code, message }) => SERIALIZATION_ERROR_CODES.has(code) || SERIALIZATION_ERROR_MESSAGES.some((serializationErrorMessage) => message.includes(serializationErrorMessage));
var SERIALIZATION_ERROR_CODES = /* @__PURE__ */ new Set([
  // Message is `undefined`
  "ERR_MISSING_ARGS",
  // Message is a function, a bigint, a symbol
  "ERR_INVALID_ARG_TYPE"
]);
var SERIALIZATION_ERROR_MESSAGES = [
  // Message is a promise or a proxy, with `serialization: 'advanced'`
  "could not be cloned",
  // Message has cycles, with `serialization: 'json'`
  "circular structure",
  // Message has cycles inside toJSON(), with `serialization: 'json'`
  "call stack size exceeded"
];
var getMethodName = (methodName, isSubprocess, parameters = "") => methodName === "cancelSignal" ? "`cancelSignal`'s `controller.abort()`" : `${getNamespaceName(isSubprocess)}${methodName}(${parameters})`;
var getNamespaceName = (isSubprocess) => isSubprocess ? "" : "subprocess.";
var getOtherProcessName = (isSubprocess) => isSubprocess ? "parent process" : "subprocess";
var disconnect = (anyProcess) => {
  if (anyProcess.connected) {
    anyProcess.disconnect();
  }
};

// node_modules/.pnpm/execa@9.6.0/node_modules/execa/lib/utils/deferred.js
var createDeferred = () => {
  const methods = {};
  const promise = new Promise((resolve2, reject) => {
    Object.assign(methods, { resolve: resolve2, reject });
  });
  return Object.assign(promise, methods);
};

// node_modules/.pnpm/execa@9.6.0/node_modules/execa/lib/arguments/fd-options.js
var getToStream = (destination, to = "stdin") => {
  const isWritable = true;
  const { options, fileDescriptors } = SUBPROCESS_OPTIONS.get(destination);
  const fdNumber = getFdNumber(fileDescriptors, to, isWritable);
  const destinationStream = destination.stdio[fdNumber];
  if (destinationStream === null) {
    throw new TypeError(getInvalidStdioOptionMessage(fdNumber, to, options, isWritable));
  }
  return destinationStream;
};
var getFromStream = (source, from = "stdout") => {
  const isWritable = false;
  const { options, fileDescriptors } = SUBPROCESS_OPTIONS.get(source);
  const fdNumber = getFdNumber(fileDescriptors, from, isWritable);
  const sourceStream = fdNumber === "all" ? source.all : source.stdio[fdNumber];
  if (sourceStream === null || sourceStream === void 0) {
    throw new TypeError(getInvalidStdioOptionMessage(fdNumber, from, options, isWritable));
  }
  return sourceStream;
};
var SUBPROCESS_OPTIONS = /* @__PURE__ */ new WeakMap();
var getFdNumber = (fileDescriptors, fdName, isWritable) => {
  const fdNumber = parseFdNumber(fdName, isWritable);
  validateFdNumber(fdNumber, fdName, isWritable, fileDescriptors);
  return fdNumber;
};
var parseFdNumber = (fdName, isWritable) => {
  const fdNumber = parseFd(fdName);
  if (fdNumber !== void 0) {
    return fdNumber;
  }
  const { validOptions, defaultValue } = isWritable ? { validOptions: '"stdin"', defaultValue: "stdin" } : { validOptions: '"stdout", "stderr", "all"', defaultValue: "stdout" };
  throw new TypeError(`"${getOptionName(isWritable)}" must not be "${fdName}".
It must be ${validOptions} or "fd3", "fd4" (and so on).
It is optional and defaults to "${defaultValue}".`);
};
var validateFdNumber = (fdNumber, fdName, isWritable, fileDescriptors) => {
  const fileDescriptor = fileDescriptors[getUsedDescriptor(fdNumber)];
  if (fileDescriptor === void 0) {
    throw new TypeError(`"${getOptionName(isWritable)}" must not be ${fdName}. That file descriptor does not exist.
Please set the "stdio" option to ensure that file descriptor exists.`);
  }
  if (fileDescriptor.direction === "input" && !isWritable) {
    throw new TypeError(`"${getOptionName(isWritable)}" must not be ${fdName}. It must be a readable stream, not writable.`);
  }
  if (fileDescriptor.direction !== "input" && isWritable) {
    throw new TypeError(`"${getOptionName(isWritable)}" must not be ${fdName}. It must be a writable stream, not readable.`);
  }
};
var getInvalidStdioOptionMessage = (fdNumber, fdName, options, isWritable) => {
  if (fdNumber === "all" && !options.all) {
    return `The "all" option must be true to use "from: 'all'".`;
  }
  const { optionName, optionValue } = getInvalidStdioOption(fdNumber, options);
  return `The "${optionName}: ${serializeOptionValue(optionValue)}" option is incompatible with using "${getOptionName(isWritable)}: ${serializeOptionValue(fdName)}".
Please set this option with "pipe" instead.`;
};
var getInvalidStdioOption = (fdNumber, { stdin, stdout, stderr, stdio }) => {
  const usedDescriptor = getUsedDescriptor(fdNumber);
  if (usedDescriptor === 0 && stdin !== void 0) {
    return { optionName: "stdin", optionValue: stdin };
  }
  if (usedDescriptor === 1 && stdout !== void 0) {
    return { optionName: "stdout", optionValue: stdout };
  }
  if (usedDescriptor === 2 && stderr !== void 0) {
    return { optionName: "stderr", optionValue: stderr };
  }
  return { optionName: `stdio[${usedDescriptor}]`, optionValue: stdio[usedDescriptor] };
};
var getUsedDescriptor = (fdNumber) => fdNumber === "all" ? 1 : fdNumber;
var getOptionName = (isWritable) => isWritable ? "to" : "from";
var serializeOptionValue = (value) => {
  if (typeof value === "string") {
    return `'${value}'`;
  }
  return typeof value === "number" ? `${value}` : "Stream";
};

// node_modules/.pnpm/execa@9.6.0/node_modules/execa/lib/ipc/strict.js
var import_node_events5 = require("node:events");

// node_modules/.pnpm/execa@9.6.0/node_modules/execa/lib/utils/max-listeners.js
var import_node_events2 = require("node:events");
var incrementMaxListeners = (eventEmitter, maxListenersIncrement, signal) => {
  const maxListeners = eventEmitter.getMaxListeners();
  if (maxListeners === 0 || maxListeners === Number.POSITIVE_INFINITY) {
    return;
  }
  eventEmitter.setMaxListeners(maxListeners + maxListenersIncrement);
  (0, import_node_events2.addAbortListener)(signal, () => {
    eventEmitter.setMaxListeners(eventEmitter.getMaxListeners() - maxListenersIncrement);
  });
};

// node_modules/.pnpm/execa@9.6.0/node_modules/execa/lib/ipc/forward.js
var import_node_events4 = require("node:events");

// node_modules/.pnpm/execa@9.6.0/node_modules/execa/lib/ipc/incoming.js
var import_node_events3 = require("node:events");
var import_promises2 = require("node:timers/promises");

// node_modules/.pnpm/execa@9.6.0/node_modules/execa/lib/ipc/reference.js
var addReference = (channel, reference) => {
  if (reference) {
    addReferenceCount(channel);
  }
};
var addReferenceCount = (channel) => {
  channel.refCounted();
};
var removeReference = (channel, reference) => {
  if (reference) {
    removeReferenceCount(channel);
  }
};
var removeReferenceCount = (channel) => {
  channel.unrefCounted();
};
var undoAddedReferences = (channel, isSubprocess) => {
  if (isSubprocess) {
    removeReferenceCount(channel);
    removeReferenceCount(channel);
  }
};
var redoAddedReferences = (channel, isSubprocess) => {
  if (isSubprocess) {
    addReferenceCount(channel);
    addReferenceCount(channel);
  }
};

// node_modules/.pnpm/execa@9.6.0/node_modules/execa/lib/ipc/incoming.js
var onMessage = async ({ anyProcess, channel, isSubprocess, ipcEmitter }, wrappedMessage) => {
  if (handleStrictResponse(wrappedMessage) || handleAbort(wrappedMessage)) {
    return;
  }
  if (!INCOMING_MESSAGES.has(anyProcess)) {
    INCOMING_MESSAGES.set(anyProcess, []);
  }
  const incomingMessages = INCOMING_MESSAGES.get(anyProcess);
  incomingMessages.push(wrappedMessage);
  if (incomingMessages.length > 1) {
    return;
  }
  while (incomingMessages.length > 0) {
    await waitForOutgoingMessages(anyProcess, ipcEmitter, wrappedMessage);
    await import_promises2.scheduler.yield();
    const message = await handleStrictRequest({
      wrappedMessage: incomingMessages[0],
      anyProcess,
      channel,
      isSubprocess,
      ipcEmitter
    });
    incomingMessages.shift();
    ipcEmitter.emit("message", message);
    ipcEmitter.emit("message:done");
  }
};
var onDisconnect = async ({ anyProcess, channel, isSubprocess, ipcEmitter, boundOnMessage }) => {
  abortOnDisconnect();
  const incomingMessages = INCOMING_MESSAGES.get(anyProcess);
  while ((incomingMessages == null ? void 0 : incomingMessages.length) > 0) {
    await (0, import_node_events3.once)(ipcEmitter, "message:done");
  }
  anyProcess.removeListener("message", boundOnMessage);
  redoAddedReferences(channel, isSubprocess);
  ipcEmitter.connected = false;
  ipcEmitter.emit("disconnect");
};
var INCOMING_MESSAGES = /* @__PURE__ */ new WeakMap();

// node_modules/.pnpm/execa@9.6.0/node_modules/execa/lib/ipc/forward.js
var getIpcEmitter = (anyProcess, channel, isSubprocess) => {
  if (IPC_EMITTERS.has(anyProcess)) {
    return IPC_EMITTERS.get(anyProcess);
  }
  const ipcEmitter = new import_node_events4.EventEmitter();
  ipcEmitter.connected = true;
  IPC_EMITTERS.set(anyProcess, ipcEmitter);
  forwardEvents({
    ipcEmitter,
    anyProcess,
    channel,
    isSubprocess
  });
  return ipcEmitter;
};
var IPC_EMITTERS = /* @__PURE__ */ new WeakMap();
var forwardEvents = ({ ipcEmitter, anyProcess, channel, isSubprocess }) => {
  const boundOnMessage = onMessage.bind(void 0, {
    anyProcess,
    channel,
    isSubprocess,
    ipcEmitter
  });
  anyProcess.on("message", boundOnMessage);
  anyProcess.once("disconnect", onDisconnect.bind(void 0, {
    anyProcess,
    channel,
    isSubprocess,
    ipcEmitter,
    boundOnMessage
  }));
  undoAddedReferences(channel, isSubprocess);
};
var isConnected = (anyProcess) => {
  const ipcEmitter = IPC_EMITTERS.get(anyProcess);
  return ipcEmitter === void 0 ? anyProcess.channel !== null : ipcEmitter.connected;
};

// node_modules/.pnpm/execa@9.6.0/node_modules/execa/lib/ipc/strict.js
var handleSendStrict = ({ anyProcess, channel, isSubprocess, message, strict }) => {
  if (!strict) {
    return message;
  }
  const ipcEmitter = getIpcEmitter(anyProcess, channel, isSubprocess);
  const hasListeners = hasMessageListeners(anyProcess, ipcEmitter);
  return {
    id: count++,
    type: REQUEST_TYPE,
    message,
    hasListeners
  };
};
var count = 0n;
var validateStrictDeadlock = (outgoingMessages, wrappedMessage) => {
  if ((wrappedMessage == null ? void 0 : wrappedMessage.type) !== REQUEST_TYPE || wrappedMessage.hasListeners) {
    return;
  }
  for (const { id } of outgoingMessages) {
    if (id !== void 0) {
      STRICT_RESPONSES[id].resolve({ isDeadlock: true, hasListeners: false });
    }
  }
};
var handleStrictRequest = async ({ wrappedMessage, anyProcess, channel, isSubprocess, ipcEmitter }) => {
  if ((wrappedMessage == null ? void 0 : wrappedMessage.type) !== REQUEST_TYPE || !anyProcess.connected) {
    return wrappedMessage;
  }
  const { id, message } = wrappedMessage;
  const response = { id, type: RESPONSE_TYPE, message: hasMessageListeners(anyProcess, ipcEmitter) };
  try {
    await sendMessage({
      anyProcess,
      channel,
      isSubprocess,
      ipc: true
    }, response);
  } catch (error) {
    ipcEmitter.emit("strict:error", error);
  }
  return message;
};
var handleStrictResponse = (wrappedMessage) => {
  var _a2;
  if ((wrappedMessage == null ? void 0 : wrappedMessage.type) !== RESPONSE_TYPE) {
    return false;
  }
  const { id, message: hasListeners } = wrappedMessage;
  (_a2 = STRICT_RESPONSES[id]) == null ? void 0 : _a2.resolve({ isDeadlock: false, hasListeners });
  return true;
};
var waitForStrictResponse = async (wrappedMessage, anyProcess, isSubprocess) => {
  if ((wrappedMessage == null ? void 0 : wrappedMessage.type) !== REQUEST_TYPE) {
    return;
  }
  const deferred = createDeferred();
  STRICT_RESPONSES[wrappedMessage.id] = deferred;
  const controller = new AbortController();
  try {
    const { isDeadlock, hasListeners } = await Promise.race([
      deferred,
      throwOnDisconnect(anyProcess, isSubprocess, controller)
    ]);
    if (isDeadlock) {
      throwOnStrictDeadlockError(isSubprocess);
    }
    if (!hasListeners) {
      throwOnMissingStrict(isSubprocess);
    }
  } finally {
    controller.abort();
    delete STRICT_RESPONSES[wrappedMessage.id];
  }
};
var STRICT_RESPONSES = {};
var throwOnDisconnect = async (anyProcess, isSubprocess, { signal }) => {
  incrementMaxListeners(anyProcess, 1, signal);
  await (0, import_node_events5.once)(anyProcess, "disconnect", { signal });
  throwOnStrictDisconnect(isSubprocess);
};
var REQUEST_TYPE = "execa:ipc:request";
var RESPONSE_TYPE = "execa:ipc:response";

// node_modules/.pnpm/execa@9.6.0/node_modules/execa/lib/ipc/outgoing.js
var startSendMessage = (anyProcess, wrappedMessage, strict) => {
  if (!OUTGOING_MESSAGES.has(anyProcess)) {
    OUTGOING_MESSAGES.set(anyProcess, /* @__PURE__ */ new Set());
  }
  const outgoingMessages = OUTGOING_MESSAGES.get(anyProcess);
  const onMessageSent = createDeferred();
  const id = strict ? wrappedMessage.id : void 0;
  const outgoingMessage = { onMessageSent, id };
  outgoingMessages.add(outgoingMessage);
  return { outgoingMessages, outgoingMessage };
};
var endSendMessage = ({ outgoingMessages, outgoingMessage }) => {
  outgoingMessages.delete(outgoingMessage);
  outgoingMessage.onMessageSent.resolve();
};
var waitForOutgoingMessages = async (anyProcess, ipcEmitter, wrappedMessage) => {
  var _a2;
  while (!hasMessageListeners(anyProcess, ipcEmitter) && ((_a2 = OUTGOING_MESSAGES.get(anyProcess)) == null ? void 0 : _a2.size) > 0) {
    const outgoingMessages = [...OUTGOING_MESSAGES.get(anyProcess)];
    validateStrictDeadlock(outgoingMessages, wrappedMessage);
    await Promise.all(outgoingMessages.map(({ onMessageSent }) => onMessageSent));
  }
};
var OUTGOING_MESSAGES = /* @__PURE__ */ new WeakMap();
var hasMessageListeners = (anyProcess, ipcEmitter) => ipcEmitter.listenerCount("message") > getMinListenerCount(anyProcess);
var getMinListenerCount = (anyProcess) => SUBPROCESS_OPTIONS.has(anyProcess) && !getFdSpecificValue(SUBPROCESS_OPTIONS.get(anyProcess).options.buffer, "ipc") ? 1 : 0;

// node_modules/.pnpm/execa@9.6.0/node_modules/execa/lib/ipc/send.js
var sendMessage = ({ anyProcess, channel, isSubprocess, ipc }, message, { strict = false } = {}) => {
  const methodName = "sendMessage";
  validateIpcMethod({
    methodName,
    isSubprocess,
    ipc,
    isConnected: anyProcess.connected
  });
  return sendMessageAsync({
    anyProcess,
    channel,
    methodName,
    isSubprocess,
    message,
    strict
  });
};
var sendMessageAsync = async ({ anyProcess, channel, methodName, isSubprocess, message, strict }) => {
  const wrappedMessage = handleSendStrict({
    anyProcess,
    channel,
    isSubprocess,
    message,
    strict
  });
  const outgoingMessagesState = startSendMessage(anyProcess, wrappedMessage, strict);
  try {
    await sendOneMessage({
      anyProcess,
      methodName,
      isSubprocess,
      wrappedMessage,
      message
    });
  } catch (error) {
    disconnect(anyProcess);
    throw error;
  } finally {
    endSendMessage(outgoingMessagesState);
  }
};
var sendOneMessage = async ({ anyProcess, methodName, isSubprocess, wrappedMessage, message }) => {
  const sendMethod = getSendMethod(anyProcess);
  try {
    await Promise.all([
      waitForStrictResponse(wrappedMessage, anyProcess, isSubprocess),
      sendMethod(wrappedMessage)
    ]);
  } catch (error) {
    handleEpipeError({ error, methodName, isSubprocess });
    handleSerializationError({
      error,
      methodName,
      isSubprocess,
      message
    });
    throw error;
  }
};
var getSendMethod = (anyProcess) => {
  if (PROCESS_SEND_METHODS.has(anyProcess)) {
    return PROCESS_SEND_METHODS.get(anyProcess);
  }
  const sendMethod = (0, import_node_util5.promisify)(anyProcess.send.bind(anyProcess));
  PROCESS_SEND_METHODS.set(anyProcess, sendMethod);
  return sendMethod;
};
var PROCESS_SEND_METHODS = /* @__PURE__ */ new WeakMap();

// node_modules/.pnpm/execa@9.6.0/node_modules/execa/lib/ipc/graceful.js
var sendAbort = (subprocess, message) => {
  const methodName = "cancelSignal";
  validateConnection(methodName, false, subprocess.connected);
  return sendOneMessage({
    anyProcess: subprocess,
    methodName,
    isSubprocess: false,
    wrappedMessage: { type: GRACEFUL_CANCEL_TYPE, message },
    message
  });
};
var getCancelSignal = async ({ anyProcess, channel, isSubprocess, ipc }) => {
  await startIpc({
    anyProcess,
    channel,
    isSubprocess,
    ipc
  });
  return cancelController.signal;
};
var startIpc = async ({ anyProcess, channel, isSubprocess, ipc }) => {
  if (cancelListening) {
    return;
  }
  cancelListening = true;
  if (!ipc) {
    throwOnMissingParent();
    return;
  }
  if (channel === null) {
    abortOnDisconnect();
    return;
  }
  getIpcEmitter(anyProcess, channel, isSubprocess);
  await import_promises3.scheduler.yield();
};
var cancelListening = false;
var handleAbort = (wrappedMessage) => {
  if ((wrappedMessage == null ? void 0 : wrappedMessage.type) !== GRACEFUL_CANCEL_TYPE) {
    return false;
  }
  cancelController.abort(wrappedMessage.message);
  return true;
};
var GRACEFUL_CANCEL_TYPE = "execa:ipc:cancel";
var abortOnDisconnect = () => {
  cancelController.abort(getAbortDisconnectError());
};
var cancelController = new AbortController();

// node_modules/.pnpm/execa@9.6.0/node_modules/execa/lib/terminate/graceful.js
var validateGracefulCancel = ({ gracefulCancel, cancelSignal, ipc, serialization }) => {
  if (!gracefulCancel) {
    return;
  }
  if (cancelSignal === void 0) {
    throw new Error("The `cancelSignal` option must be defined when setting the `gracefulCancel` option.");
  }
  if (!ipc) {
    throw new Error("The `ipc` option cannot be false when setting the `gracefulCancel` option.");
  }
  if (serialization === "json") {
    throw new Error("The `serialization` option cannot be 'json' when setting the `gracefulCancel` option.");
  }
};
var throwOnGracefulCancel = ({
  subprocess,
  cancelSignal,
  gracefulCancel,
  forceKillAfterDelay,
  context,
  controller
}) => gracefulCancel ? [sendOnAbort({
  subprocess,
  cancelSignal,
  forceKillAfterDelay,
  context,
  controller
})] : [];
var sendOnAbort = async ({ subprocess, cancelSignal, forceKillAfterDelay, context, controller: { signal } }) => {
  await onAbortedSignal(cancelSignal, signal);
  const reason = getReason(cancelSignal);
  await sendAbort(subprocess, reason);
  killOnTimeout({
    kill: subprocess.kill,
    forceKillAfterDelay,
    context,
    controllerSignal: signal
  });
  context.terminationReason ??= "gracefulCancel";
  throw cancelSignal.reason;
};
var getReason = ({ reason }) => {
  if (!(reason instanceof DOMException)) {
    return reason;
  }
  const error = new Error(reason.message);
  Object.defineProperty(error, "stack", {
    value: reason.stack,
    enumerable: false,
    configurable: true,
    writable: true
  });
  return error;
};

// node_modules/.pnpm/execa@9.6.0/node_modules/execa/lib/terminate/timeout.js
var import_promises4 = require("node:timers/promises");
var validateTimeout = ({ timeout }) => {
  if (timeout !== void 0 && (!Number.isFinite(timeout) || timeout < 0)) {
    throw new TypeError(`Expected the \`timeout\` option to be a non-negative integer, got \`${timeout}\` (${typeof timeout})`);
  }
};
var throwOnTimeout = (subprocess, timeout, context, controller) => timeout === 0 || timeout === void 0 ? [] : [killAfterTimeout(subprocess, timeout, context, controller)];
var killAfterTimeout = async (subprocess, timeout, context, { signal }) => {
  await (0, import_promises4.setTimeout)(timeout, void 0, { signal });
  context.terminationReason ??= "timeout";
  subprocess.kill();
  throw new DiscardedError();
};

// node_modules/.pnpm/execa@9.6.0/node_modules/execa/lib/methods/node.js
var import_node_process8 = require("node:process");
var import_node_path10 = __toESM(require("node:path"), 1);
var mapNode = ({ options }) => {
  if (options.node === false) {
    throw new TypeError('The "node" option cannot be false with `execaNode()`.');
  }
  return { options: { ...options, node: true } };
};
var handleNodeOption = (file, commandArguments, {
  node: shouldHandleNode = false,
  nodePath = import_node_process8.execPath,
  nodeOptions = import_node_process8.execArgv.filter((nodeOption) => !nodeOption.startsWith("--inspect")),
  cwd,
  execPath: formerNodePath,
  ...options
}) => {
  if (formerNodePath !== void 0) {
    throw new TypeError('The "execPath" option has been removed. Please use the "nodePath" option instead.');
  }
  const normalizedNodePath = safeNormalizeFileUrl(nodePath, 'The "nodePath" option');
  const resolvedNodePath = import_node_path10.default.resolve(cwd, normalizedNodePath);
  const newOptions = {
    ...options,
    nodePath: resolvedNodePath,
    node: shouldHandleNode,
    cwd
  };
  if (!shouldHandleNode) {
    return [file, commandArguments, newOptions];
  }
  if (import_node_path10.default.basename(file, ".exe") === "node") {
    throw new TypeError('When the "node" option is true, the first argument does not need to be "node".');
  }
  return [
    resolvedNodePath,
    [...nodeOptions, file, ...commandArguments],
    { ipc: true, ...newOptions, shell: false }
  ];
};

// node_modules/.pnpm/execa@9.6.0/node_modules/execa/lib/ipc/ipc-input.js
var import_node_v8 = require("node:v8");
var validateIpcInputOption = ({ ipcInput, ipc, serialization }) => {
  if (ipcInput === void 0) {
    return;
  }
  if (!ipc) {
    throw new Error("The `ipcInput` option cannot be set unless the `ipc` option is `true`.");
  }
  validateIpcInput[serialization](ipcInput);
};
var validateAdvancedInput = (ipcInput) => {
  try {
    (0, import_node_v8.serialize)(ipcInput);
  } catch (error) {
    throw new Error("The `ipcInput` option is not serializable with a structured clone.", { cause: error });
  }
};
var validateJsonInput = (ipcInput) => {
  try {
    JSON.stringify(ipcInput);
  } catch (error) {
    throw new Error("The `ipcInput` option is not serializable with JSON.", { cause: error });
  }
};
var validateIpcInput = {
  advanced: validateAdvancedInput,
  json: validateJsonInput
};
var sendIpcInput = async (subprocess, ipcInput) => {
  if (ipcInput === void 0) {
    return;
  }
  await subprocess.sendMessage(ipcInput);
};

// node_modules/.pnpm/execa@9.6.0/node_modules/execa/lib/arguments/encoding-option.js
var validateEncoding = ({ encoding }) => {
  if (ENCODINGS.has(encoding)) {
    return;
  }
  const correctEncoding = getCorrectEncoding(encoding);
  if (correctEncoding !== void 0) {
    throw new TypeError(`Invalid option \`encoding: ${serializeEncoding(encoding)}\`.
Please rename it to ${serializeEncoding(correctEncoding)}.`);
  }
  const correctEncodings = [...ENCODINGS].map((correctEncoding2) => serializeEncoding(correctEncoding2)).join(", ");
  throw new TypeError(`Invalid option \`encoding: ${serializeEncoding(encoding)}\`.
Please rename it to one of: ${correctEncodings}.`);
};
var TEXT_ENCODINGS = /* @__PURE__ */ new Set(["utf8", "utf16le"]);
var BINARY_ENCODINGS = /* @__PURE__ */ new Set(["buffer", "hex", "base64", "base64url", "latin1", "ascii"]);
var ENCODINGS = /* @__PURE__ */ new Set([...TEXT_ENCODINGS, ...BINARY_ENCODINGS]);
var getCorrectEncoding = (encoding) => {
  if (encoding === null) {
    return "buffer";
  }
  if (typeof encoding !== "string") {
    return;
  }
  const lowerEncoding = encoding.toLowerCase();
  if (lowerEncoding in ENCODING_ALIASES) {
    return ENCODING_ALIASES[lowerEncoding];
  }
  if (ENCODINGS.has(lowerEncoding)) {
    return lowerEncoding;
  }
};
var ENCODING_ALIASES = {
  // eslint-disable-next-line unicorn/text-encoding-identifier-case
  "utf-8": "utf8",
  "utf-16le": "utf16le",
  "ucs-2": "utf16le",
  ucs2: "utf16le",
  binary: "latin1"
};
var serializeEncoding = (encoding) => typeof encoding === "string" ? `"${encoding}"` : String(encoding);

// node_modules/.pnpm/execa@9.6.0/node_modules/execa/lib/arguments/cwd.js
var import_node_fs8 = require("node:fs");
var import_node_path11 = __toESM(require("node:path"), 1);
var import_node_process9 = __toESM(require("node:process"), 1);
var normalizeCwd = (cwd = getDefaultCwd()) => {
  const cwdString = safeNormalizeFileUrl(cwd, 'The "cwd" option');
  return import_node_path11.default.resolve(cwdString);
};
var getDefaultCwd = () => {
  try {
    return import_node_process9.default.cwd();
  } catch (error) {
    error.message = `The current directory does not exist.
${error.message}`;
    throw error;
  }
};
var fixCwdError = (originalMessage, cwd) => {
  if (cwd === getDefaultCwd()) {
    return originalMessage;
  }
  let cwdStat;
  try {
    cwdStat = (0, import_node_fs8.statSync)(cwd);
  } catch (error) {
    return `The "cwd" option is invalid: ${cwd}.
${error.message}
${originalMessage}`;
  }
  if (!cwdStat.isDirectory()) {
    return `The "cwd" option is not a directory: ${cwd}.
${originalMessage}`;
  }
  return originalMessage;
};

// node_modules/.pnpm/execa@9.6.0/node_modules/execa/lib/arguments/options.js
var normalizeOptions = (filePath, rawArguments, rawOptions) => {
  rawOptions.cwd = normalizeCwd(rawOptions.cwd);
  const [processedFile, processedArguments, processedOptions] = handleNodeOption(filePath, rawArguments, rawOptions);
  const { command: file, args: commandArguments, options: initialOptions } = import_cross_spawn2.default._parse(processedFile, processedArguments, processedOptions);
  const fdOptions = normalizeFdSpecificOptions(initialOptions);
  const options = addDefaultOptions(fdOptions);
  validateTimeout(options);
  validateEncoding(options);
  validateIpcInputOption(options);
  validateCancelSignal(options);
  validateGracefulCancel(options);
  options.shell = normalizeFileUrl(options.shell);
  options.env = getEnv(options);
  options.killSignal = normalizeKillSignal(options.killSignal);
  options.forceKillAfterDelay = normalizeForceKillAfterDelay(options.forceKillAfterDelay);
  options.lines = options.lines.map((lines, fdNumber) => lines && !BINARY_ENCODINGS.has(options.encoding) && options.buffer[fdNumber]);
  if (import_node_process10.default.platform === "win32" && import_node_path12.default.basename(file, ".exe") === "cmd") {
    commandArguments.unshift("/q");
  }
  return { file, commandArguments, options };
};
var addDefaultOptions = ({
  extendEnv = true,
  preferLocal = false,
  cwd,
  localDir: localDirectory = cwd,
  encoding = "utf8",
  reject = true,
  cleanup = true,
  all = false,
  windowsHide = true,
  killSignal = "SIGTERM",
  forceKillAfterDelay = true,
  gracefulCancel = false,
  ipcInput,
  ipc = ipcInput !== void 0 || gracefulCancel,
  serialization = "advanced",
  ...options
}) => ({
  ...options,
  extendEnv,
  preferLocal,
  cwd,
  localDirectory,
  encoding,
  reject,
  cleanup,
  all,
  windowsHide,
  killSignal,
  forceKillAfterDelay,
  gracefulCancel,
  ipcInput,
  ipc,
  serialization
});
var getEnv = ({ env: envOption, extendEnv, preferLocal, node, localDirectory, nodePath }) => {
  const env = extendEnv ? { ...import_node_process10.default.env, ...envOption } : envOption;
  if (preferLocal || node) {
    return npmRunPathEnv({
      env,
      cwd: localDirectory,
      execPath: nodePath,
      preferLocal,
      addExecPath: node
    });
  }
  return env;
};

// node_modules/.pnpm/execa@9.6.0/node_modules/execa/lib/arguments/shell.js
var concatenateShell = (file, commandArguments, options) => options.shell && commandArguments.length > 0 ? [[file, ...commandArguments].join(" "), [], options] : [file, commandArguments, options];

// node_modules/.pnpm/execa@9.6.0/node_modules/execa/lib/return/message.js
var import_node_util6 = require("node:util");

// node_modules/.pnpm/strip-final-newline@4.0.0/node_modules/strip-final-newline/index.js
function stripFinalNewline(input) {
  if (typeof input === "string") {
    return stripFinalNewlineString(input);
  }
  if (!(ArrayBuffer.isView(input) && input.BYTES_PER_ELEMENT === 1)) {
    throw new Error("Input must be a string or a Uint8Array");
  }
  return stripFinalNewlineBinary(input);
}
var stripFinalNewlineString = (input) => input.at(-1) === LF ? input.slice(0, input.at(-2) === CR ? -2 : -1) : input;
var stripFinalNewlineBinary = (input) => input.at(-1) === LF_BINARY ? input.subarray(0, input.at(-2) === CR_BINARY ? -2 : -1) : input;
var LF = "\n";
var LF_BINARY = LF.codePointAt(0);
var CR = "\r";
var CR_BINARY = CR.codePointAt(0);

// node_modules/.pnpm/get-stream@9.0.1/node_modules/get-stream/source/index.js
var import_node_events6 = require("node:events");
var import_promises5 = require("node:stream/promises");

// node_modules/.pnpm/is-stream@4.0.1/node_modules/is-stream/index.js
function isStream(stream, { checkOpen = true } = {}) {
  return stream !== null && typeof stream === "object" && (stream.writable || stream.readable || !checkOpen || stream.writable === void 0 && stream.readable === void 0) && typeof stream.pipe === "function";
}
function isWritableStream(stream, { checkOpen = true } = {}) {
  return isStream(stream, { checkOpen }) && (stream.writable || !checkOpen) && typeof stream.write === "function" && typeof stream.end === "function" && typeof stream.writable === "boolean" && typeof stream.writableObjectMode === "boolean" && typeof stream.destroy === "function" && typeof stream.destroyed === "boolean";
}
function isReadableStream(stream, { checkOpen = true } = {}) {
  return isStream(stream, { checkOpen }) && (stream.readable || !checkOpen) && typeof stream.read === "function" && typeof stream.readable === "boolean" && typeof stream.readableObjectMode === "boolean" && typeof stream.destroy === "function" && typeof stream.destroyed === "boolean";
}
function isDuplexStream(stream, options) {
  return isWritableStream(stream, options) && isReadableStream(stream, options);
}

// node_modules/.pnpm/@sec-ant+readable-stream@0.4.1/node_modules/@sec-ant/readable-stream/dist/ponyfill/asyncIterator.js
var a3 = Object.getPrototypeOf(
  Object.getPrototypeOf(
    /* istanbul ignore next */
    async function* () {
    }
  ).prototype
);
var c2 = class {
  #t;
  #n;
  #r = false;
  #e = void 0;
  constructor(e2, t) {
    this.#t = e2, this.#n = t;
  }
  next() {
    const e2 = () => this.#s();
    return this.#e = this.#e ? this.#e.then(e2, e2) : e2(), this.#e;
  }
  return(e2) {
    const t = () => this.#i(e2);
    return this.#e ? this.#e.then(t, t) : t();
  }
  async #s() {
    if (this.#r)
      return {
        done: true,
        value: void 0
      };
    let e2;
    try {
      e2 = await this.#t.read();
    } catch (t) {
      throw this.#e = void 0, this.#r = true, this.#t.releaseLock(), t;
    }
    return e2.done && (this.#e = void 0, this.#r = true, this.#t.releaseLock()), e2;
  }
  async #i(e2) {
    if (this.#r)
      return {
        done: true,
        value: e2
      };
    if (this.#r = true, !this.#n) {
      const t = this.#t.cancel(e2);
      return this.#t.releaseLock(), await t, {
        done: true,
        value: e2
      };
    }
    return this.#t.releaseLock(), {
      done: true,
      value: e2
    };
  }
};
var n = Symbol();
function i() {
  return this[n].next();
}
Object.defineProperty(i, "name", { value: "next" });
function o2(r2) {
  return this[n].return(r2);
}
Object.defineProperty(o2, "name", { value: "return" });
var u = Object.create(a3, {
  next: {
    enumerable: true,
    configurable: true,
    writable: true,
    value: i
  },
  return: {
    enumerable: true,
    configurable: true,
    writable: true,
    value: o2
  }
});
function h2({ preventCancel: r2 = false } = {}) {
  const e2 = this.getReader(), t = new c2(
    e2,
    r2
  ), s2 = Object.create(u);
  return s2[n] = t, s2;
}

// node_modules/.pnpm/get-stream@9.0.1/node_modules/get-stream/source/stream.js
var getAsyncIterable = (stream) => {
  if (isReadableStream(stream, { checkOpen: false }) && nodeImports.on !== void 0) {
    return getStreamIterable(stream);
  }
  if (typeof (stream == null ? void 0 : stream[Symbol.asyncIterator]) === "function") {
    return stream;
  }
  if (toString.call(stream) === "[object ReadableStream]") {
    return h2.call(stream);
  }
  throw new TypeError("The first argument must be a Readable, a ReadableStream, or an async iterable.");
};
var { toString } = Object.prototype;
var getStreamIterable = async function* (stream) {
  const controller = new AbortController();
  const state = {};
  handleStreamEnd(stream, controller, state);
  try {
    for await (const [chunk] of nodeImports.on(stream, "data", { signal: controller.signal })) {
      yield chunk;
    }
  } catch (error) {
    if (state.error !== void 0) {
      throw state.error;
    } else if (!controller.signal.aborted) {
      throw error;
    }
  } finally {
    stream.destroy();
  }
};
var handleStreamEnd = async (stream, controller, state) => {
  try {
    await nodeImports.finished(stream, {
      cleanup: true,
      readable: true,
      writable: false,
      error: false
    });
  } catch (error) {
    state.error = error;
  } finally {
    controller.abort();
  }
};
var nodeImports = {};

// node_modules/.pnpm/get-stream@9.0.1/node_modules/get-stream/source/contents.js
var getStreamContents = async (stream, { init: init2, convertChunk, getSize, truncateChunk, addChunk, getFinalChunk, finalize }, { maxBuffer = Number.POSITIVE_INFINITY } = {}) => {
  const asyncIterable = getAsyncIterable(stream);
  const state = init2();
  state.length = 0;
  try {
    for await (const chunk of asyncIterable) {
      const chunkType = getChunkType(chunk);
      const convertedChunk = convertChunk[chunkType](chunk, state);
      appendChunk({
        convertedChunk,
        state,
        getSize,
        truncateChunk,
        addChunk,
        maxBuffer
      });
    }
    appendFinalChunk({
      state,
      convertChunk,
      getSize,
      truncateChunk,
      addChunk,
      getFinalChunk,
      maxBuffer
    });
    return finalize(state);
  } catch (error) {
    const normalizedError = typeof error === "object" && error !== null ? error : new Error(error);
    normalizedError.bufferedData = finalize(state);
    throw normalizedError;
  }
};
var appendFinalChunk = ({ state, getSize, truncateChunk, addChunk, getFinalChunk, maxBuffer }) => {
  const convertedChunk = getFinalChunk(state);
  if (convertedChunk !== void 0) {
    appendChunk({
      convertedChunk,
      state,
      getSize,
      truncateChunk,
      addChunk,
      maxBuffer
    });
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
var getChunkType = (chunk) => {
  var _a2;
  const typeOfChunk = typeof chunk;
  if (typeOfChunk === "string") {
    return "string";
  }
  if (typeOfChunk !== "object" || chunk === null) {
    return "others";
  }
  if ((_a2 = globalThis.Buffer) == null ? void 0 : _a2.isBuffer(chunk)) {
    return "buffer";
  }
  const prototypeName = objectToString2.call(chunk);
  if (prototypeName === "[object ArrayBuffer]") {
    return "arrayBuffer";
  }
  if (prototypeName === "[object DataView]") {
    return "dataView";
  }
  if (Number.isInteger(chunk.byteLength) && Number.isInteger(chunk.byteOffset) && objectToString2.call(chunk.buffer) === "[object ArrayBuffer]") {
    return "typedArray";
  }
  return "others";
};
var { toString: objectToString2 } = Object.prototype;
var MaxBufferError = class extends Error {
  name = "MaxBufferError";
  constructor() {
    super("maxBuffer exceeded");
  }
};

// node_modules/.pnpm/get-stream@9.0.1/node_modules/get-stream/source/utils.js
var identity2 = (value) => value;
var noop = () => void 0;
var getContentsProperty = ({ contents }) => contents;
var throwObjectStream = (chunk) => {
  throw new Error(`Streams in object mode are not supported: ${String(chunk)}`);
};
var getLengthProperty = (convertedChunk) => convertedChunk.length;

// node_modules/.pnpm/get-stream@9.0.1/node_modules/get-stream/source/array.js
async function getStreamAsArray(stream, options) {
  return getStreamContents(stream, arrayMethods, options);
}
var initArray = () => ({ contents: [] });
var increment = () => 1;
var addArrayChunk = (convertedChunk, { contents }) => {
  contents.push(convertedChunk);
  return contents;
};
var arrayMethods = {
  init: initArray,
  convertChunk: {
    string: identity2,
    buffer: identity2,
    arrayBuffer: identity2,
    dataView: identity2,
    typedArray: identity2,
    others: identity2
  },
  getSize: increment,
  truncateChunk: noop,
  addChunk: addArrayChunk,
  getFinalChunk: noop,
  finalize: getContentsProperty
};

// node_modules/.pnpm/get-stream@9.0.1/node_modules/get-stream/source/array-buffer.js
async function getStreamAsArrayBuffer(stream, options) {
  return getStreamContents(stream, arrayBufferMethods, options);
}
var initArrayBuffer = () => ({ contents: new ArrayBuffer(0) });
var useTextEncoder = (chunk) => textEncoder2.encode(chunk);
var textEncoder2 = new TextEncoder();
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
  getSize: getLengthProperty,
  truncateChunk: truncateArrayBufferChunk,
  addChunk: addArrayBufferChunk,
  getFinalChunk: noop,
  finalize: finalizeArrayBuffer
};

// node_modules/.pnpm/get-stream@9.0.1/node_modules/get-stream/source/string.js
async function getStreamAsString(stream, options) {
  return getStreamContents(stream, stringMethods, options);
}
var initString = () => ({ contents: "", textDecoder: new TextDecoder() });
var useTextDecoder = (chunk, { textDecoder: textDecoder2 }) => textDecoder2.decode(chunk, { stream: true });
var addStringChunk = (convertedChunk, { contents }) => contents + convertedChunk;
var truncateStringChunk = (convertedChunk, chunkSize) => convertedChunk.slice(0, chunkSize);
var getFinalStringChunk = ({ textDecoder: textDecoder2 }) => {
  const finalChunk = textDecoder2.decode();
  return finalChunk === "" ? void 0 : finalChunk;
};
var stringMethods = {
  init: initString,
  convertChunk: {
    string: identity2,
    buffer: useTextDecoder,
    arrayBuffer: useTextDecoder,
    dataView: useTextDecoder,
    typedArray: useTextDecoder,
    others: throwObjectStream
  },
  getSize: getLengthProperty,
  truncateChunk: truncateStringChunk,
  addChunk: addStringChunk,
  getFinalChunk: getFinalStringChunk,
  finalize: getContentsProperty
};

// node_modules/.pnpm/get-stream@9.0.1/node_modules/get-stream/source/index.js
Object.assign(nodeImports, { on: import_node_events6.on, finished: import_promises5.finished });

// node_modules/.pnpm/execa@9.6.0/node_modules/execa/lib/io/max-buffer.js
var handleMaxBuffer = ({ error, stream, readableObjectMode, lines, encoding, fdNumber }) => {
  if (!(error instanceof MaxBufferError)) {
    throw error;
  }
  if (fdNumber === "all") {
    return error;
  }
  const unit = getMaxBufferUnit(readableObjectMode, lines, encoding);
  error.maxBufferInfo = { fdNumber, unit };
  stream.destroy();
  throw error;
};
var getMaxBufferUnit = (readableObjectMode, lines, encoding) => {
  if (readableObjectMode) {
    return "objects";
  }
  if (lines) {
    return "lines";
  }
  if (encoding === "buffer") {
    return "bytes";
  }
  return "characters";
};
var checkIpcMaxBuffer = (subprocess, ipcOutput, maxBuffer) => {
  if (ipcOutput.length !== maxBuffer) {
    return;
  }
  const error = new MaxBufferError();
  error.maxBufferInfo = { fdNumber: "ipc" };
  throw error;
};
var getMaxBufferMessage = (error, maxBuffer) => {
  const { streamName, threshold, unit } = getMaxBufferInfo(error, maxBuffer);
  return `Command's ${streamName} was larger than ${threshold} ${unit}`;
};
var getMaxBufferInfo = (error, maxBuffer) => {
  if ((error == null ? void 0 : error.maxBufferInfo) === void 0) {
    return { streamName: "output", threshold: maxBuffer[1], unit: "bytes" };
  }
  const { maxBufferInfo: { fdNumber, unit } } = error;
  delete error.maxBufferInfo;
  const threshold = getFdSpecificValue(maxBuffer, fdNumber);
  if (fdNumber === "ipc") {
    return { streamName: "IPC output", threshold, unit: "messages" };
  }
  return { streamName: getStreamName(fdNumber), threshold, unit };
};
var isMaxBufferSync = (resultError, output, maxBuffer) => (resultError == null ? void 0 : resultError.code) === "ENOBUFS" && output !== null && output.some((result) => result !== null && result.length > getMaxBufferSync(maxBuffer));
var truncateMaxBufferSync = (result, isMaxBuffer, maxBuffer) => {
  if (!isMaxBuffer) {
    return result;
  }
  const maxBufferValue = getMaxBufferSync(maxBuffer);
  return result.length > maxBufferValue ? result.slice(0, maxBufferValue) : result;
};
var getMaxBufferSync = ([, stdoutMaxBuffer]) => stdoutMaxBuffer;

// node_modules/.pnpm/execa@9.6.0/node_modules/execa/lib/return/message.js
var createMessages = ({
  stdio,
  all,
  ipcOutput,
  originalError,
  signal,
  signalDescription,
  exitCode,
  escapedCommand,
  timedOut,
  isCanceled,
  isGracefullyCanceled,
  isMaxBuffer,
  isForcefullyTerminated,
  forceKillAfterDelay,
  killSignal,
  maxBuffer,
  timeout,
  cwd
}) => {
  const errorCode = originalError == null ? void 0 : originalError.code;
  const prefix = getErrorPrefix({
    originalError,
    timedOut,
    timeout,
    isMaxBuffer,
    maxBuffer,
    errorCode,
    signal,
    signalDescription,
    exitCode,
    isCanceled,
    isGracefullyCanceled,
    isForcefullyTerminated,
    forceKillAfterDelay,
    killSignal
  });
  const originalMessage = getOriginalMessage(originalError, cwd);
  const suffix = originalMessage === void 0 ? "" : `
${originalMessage}`;
  const shortMessage = `${prefix}: ${escapedCommand}${suffix}`;
  const messageStdio = all === void 0 ? [stdio[2], stdio[1]] : [all];
  const message = [
    shortMessage,
    ...messageStdio,
    ...stdio.slice(3),
    ipcOutput.map((ipcMessage) => serializeIpcMessage(ipcMessage)).join("\n")
  ].map((messagePart) => escapeLines(stripFinalNewline(serializeMessagePart(messagePart)))).filter(Boolean).join("\n\n");
  return { originalMessage, shortMessage, message };
};
var getErrorPrefix = ({
  originalError,
  timedOut,
  timeout,
  isMaxBuffer,
  maxBuffer,
  errorCode,
  signal,
  signalDescription,
  exitCode,
  isCanceled,
  isGracefullyCanceled,
  isForcefullyTerminated,
  forceKillAfterDelay,
  killSignal
}) => {
  const forcefulSuffix = getForcefulSuffix(isForcefullyTerminated, forceKillAfterDelay);
  if (timedOut) {
    return `Command timed out after ${timeout} milliseconds${forcefulSuffix}`;
  }
  if (isGracefullyCanceled) {
    if (signal === void 0) {
      return `Command was gracefully canceled with exit code ${exitCode}`;
    }
    return isForcefullyTerminated ? `Command was gracefully canceled${forcefulSuffix}` : `Command was gracefully canceled with ${signal} (${signalDescription})`;
  }
  if (isCanceled) {
    return `Command was canceled${forcefulSuffix}`;
  }
  if (isMaxBuffer) {
    return `${getMaxBufferMessage(originalError, maxBuffer)}${forcefulSuffix}`;
  }
  if (errorCode !== void 0) {
    return `Command failed with ${errorCode}${forcefulSuffix}`;
  }
  if (isForcefullyTerminated) {
    return `Command was killed with ${killSignal} (${getSignalDescription(killSignal)})${forcefulSuffix}`;
  }
  if (signal !== void 0) {
    return `Command was killed with ${signal} (${signalDescription})`;
  }
  if (exitCode !== void 0) {
    return `Command failed with exit code ${exitCode}`;
  }
  return "Command failed";
};
var getForcefulSuffix = (isForcefullyTerminated, forceKillAfterDelay) => isForcefullyTerminated ? ` and was forcefully terminated after ${forceKillAfterDelay} milliseconds` : "";
var getOriginalMessage = (originalError, cwd) => {
  if (originalError instanceof DiscardedError) {
    return;
  }
  const originalMessage = isExecaError(originalError) ? originalError.originalMessage : String((originalError == null ? void 0 : originalError.message) ?? originalError);
  const escapedOriginalMessage = escapeLines(fixCwdError(originalMessage, cwd));
  return escapedOriginalMessage === "" ? void 0 : escapedOriginalMessage;
};
var serializeIpcMessage = (ipcMessage) => typeof ipcMessage === "string" ? ipcMessage : (0, import_node_util6.inspect)(ipcMessage);
var serializeMessagePart = (messagePart) => Array.isArray(messagePart) ? messagePart.map((messageItem) => stripFinalNewline(serializeMessageItem(messageItem))).filter(Boolean).join("\n") : serializeMessageItem(messagePart);
var serializeMessageItem = (messageItem) => {
  if (typeof messageItem === "string") {
    return messageItem;
  }
  if (isUint8Array(messageItem)) {
    return uint8ArrayToString(messageItem);
  }
  return "";
};

// node_modules/.pnpm/execa@9.6.0/node_modules/execa/lib/return/result.js
var makeSuccessResult = ({
  command,
  escapedCommand,
  stdio,
  all,
  ipcOutput,
  options: { cwd },
  startTime
}) => omitUndefinedProperties({
  command,
  escapedCommand,
  cwd,
  durationMs: getDurationMs(startTime),
  failed: false,
  timedOut: false,
  isCanceled: false,
  isGracefullyCanceled: false,
  isTerminated: false,
  isMaxBuffer: false,
  isForcefullyTerminated: false,
  exitCode: 0,
  stdout: stdio[1],
  stderr: stdio[2],
  all,
  stdio,
  ipcOutput,
  pipedFrom: []
});
var makeEarlyError = ({
  error,
  command,
  escapedCommand,
  fileDescriptors,
  options,
  startTime,
  isSync
}) => makeError({
  error,
  command,
  escapedCommand,
  startTime,
  timedOut: false,
  isCanceled: false,
  isGracefullyCanceled: false,
  isMaxBuffer: false,
  isForcefullyTerminated: false,
  stdio: Array.from({ length: fileDescriptors.length }),
  ipcOutput: [],
  options,
  isSync
});
var makeError = ({
  error: originalError,
  command,
  escapedCommand,
  startTime,
  timedOut,
  isCanceled,
  isGracefullyCanceled,
  isMaxBuffer,
  isForcefullyTerminated,
  exitCode: rawExitCode,
  signal: rawSignal,
  stdio,
  all,
  ipcOutput,
  options: {
    timeoutDuration,
    timeout = timeoutDuration,
    forceKillAfterDelay,
    killSignal,
    cwd,
    maxBuffer
  },
  isSync
}) => {
  const { exitCode, signal, signalDescription } = normalizeExitPayload(rawExitCode, rawSignal);
  const { originalMessage, shortMessage, message } = createMessages({
    stdio,
    all,
    ipcOutput,
    originalError,
    signal,
    signalDescription,
    exitCode,
    escapedCommand,
    timedOut,
    isCanceled,
    isGracefullyCanceled,
    isMaxBuffer,
    isForcefullyTerminated,
    forceKillAfterDelay,
    killSignal,
    maxBuffer,
    timeout,
    cwd
  });
  const error = getFinalError(originalError, message, isSync);
  Object.assign(error, getErrorProperties({
    error,
    command,
    escapedCommand,
    startTime,
    timedOut,
    isCanceled,
    isGracefullyCanceled,
    isMaxBuffer,
    isForcefullyTerminated,
    exitCode,
    signal,
    signalDescription,
    stdio,
    all,
    ipcOutput,
    cwd,
    originalMessage,
    shortMessage
  }));
  return error;
};
var getErrorProperties = ({
  error,
  command,
  escapedCommand,
  startTime,
  timedOut,
  isCanceled,
  isGracefullyCanceled,
  isMaxBuffer,
  isForcefullyTerminated,
  exitCode,
  signal,
  signalDescription,
  stdio,
  all,
  ipcOutput,
  cwd,
  originalMessage,
  shortMessage
}) => {
  var _a2;
  return omitUndefinedProperties({
    shortMessage,
    originalMessage,
    command,
    escapedCommand,
    cwd,
    durationMs: getDurationMs(startTime),
    failed: true,
    timedOut,
    isCanceled,
    isGracefullyCanceled,
    isTerminated: signal !== void 0,
    isMaxBuffer,
    isForcefullyTerminated,
    exitCode,
    signal,
    signalDescription,
    code: (_a2 = error.cause) == null ? void 0 : _a2.code,
    stdout: stdio[1],
    stderr: stdio[2],
    all,
    stdio,
    ipcOutput,
    pipedFrom: []
  });
};
var omitUndefinedProperties = (result) => Object.fromEntries(Object.entries(result).filter(([, value]) => value !== void 0));
var normalizeExitPayload = (rawExitCode, rawSignal) => {
  const exitCode = rawExitCode === null ? void 0 : rawExitCode;
  const signal = rawSignal === null ? void 0 : rawSignal;
  const signalDescription = signal === void 0 ? void 0 : getSignalDescription(rawSignal);
  return { exitCode, signal, signalDescription };
};

// node_modules/.pnpm/parse-ms@4.0.0/node_modules/parse-ms/index.js
var toZeroIfInfinity = (value) => Number.isFinite(value) ? value : 0;
function parseNumber(milliseconds) {
  return {
    days: Math.trunc(milliseconds / 864e5),
    hours: Math.trunc(milliseconds / 36e5 % 24),
    minutes: Math.trunc(milliseconds / 6e4 % 60),
    seconds: Math.trunc(milliseconds / 1e3 % 60),
    milliseconds: Math.trunc(milliseconds % 1e3),
    microseconds: Math.trunc(toZeroIfInfinity(milliseconds * 1e3) % 1e3),
    nanoseconds: Math.trunc(toZeroIfInfinity(milliseconds * 1e6) % 1e3)
  };
}
function parseBigint(milliseconds) {
  return {
    days: milliseconds / 86400000n,
    hours: milliseconds / 3600000n % 24n,
    minutes: milliseconds / 60000n % 60n,
    seconds: milliseconds / 1000n % 60n,
    milliseconds: milliseconds % 1000n,
    microseconds: 0n,
    nanoseconds: 0n
  };
}
function parseMilliseconds(milliseconds) {
  switch (typeof milliseconds) {
    case "number": {
      if (Number.isFinite(milliseconds)) {
        return parseNumber(milliseconds);
      }
      break;
    }
    case "bigint": {
      return parseBigint(milliseconds);
    }
  }
  throw new TypeError("Expected a finite number or bigint");
}

// node_modules/.pnpm/pretty-ms@9.3.0/node_modules/pretty-ms/index.js
var isZero = (value) => value === 0 || value === 0n;
var pluralize = (word, count2) => count2 === 1 || count2 === 1n ? word : `${word}s`;
var SECOND_ROUNDING_EPSILON = 1e-7;
var ONE_DAY_IN_MILLISECONDS = 24n * 60n * 60n * 1000n;
function prettyMilliseconds(milliseconds, options) {
  const isBigInt = typeof milliseconds === "bigint";
  if (!isBigInt && !Number.isFinite(milliseconds)) {
    throw new TypeError("Expected a finite number or bigint");
  }
  options = { ...options };
  const sign = milliseconds < 0 ? "-" : "";
  milliseconds = milliseconds < 0 ? -milliseconds : milliseconds;
  if (options.colonNotation) {
    options.compact = false;
    options.formatSubMilliseconds = false;
    options.separateMilliseconds = false;
    options.verbose = false;
  }
  if (options.compact) {
    options.unitCount = 1;
    options.secondsDecimalDigits = 0;
    options.millisecondsDecimalDigits = 0;
  }
  let result = [];
  const floorDecimals = (value, decimalDigits) => {
    const flooredInterimValue = Math.floor(value * 10 ** decimalDigits + SECOND_ROUNDING_EPSILON);
    const flooredValue = Math.round(flooredInterimValue) / 10 ** decimalDigits;
    return flooredValue.toFixed(decimalDigits);
  };
  const add = (value, long, short, valueString) => {
    if ((result.length === 0 || !options.colonNotation) && isZero(value) && !(options.colonNotation && short === "m")) {
      return;
    }
    valueString ??= String(value);
    if (options.colonNotation) {
      const wholeDigits = valueString.includes(".") ? valueString.split(".")[0].length : valueString.length;
      const minLength = result.length > 0 ? 2 : 1;
      valueString = "0".repeat(Math.max(0, minLength - wholeDigits)) + valueString;
    } else {
      valueString += options.verbose ? " " + pluralize(long, value) : short;
    }
    result.push(valueString);
  };
  const parsed = parseMilliseconds(milliseconds);
  const days = BigInt(parsed.days);
  if (options.hideYearAndDays) {
    add(BigInt(days) * 24n + BigInt(parsed.hours), "hour", "h");
  } else {
    if (options.hideYear) {
      add(days, "day", "d");
    } else {
      add(days / 365n, "year", "y");
      add(days % 365n, "day", "d");
    }
    add(Number(parsed.hours), "hour", "h");
  }
  add(Number(parsed.minutes), "minute", "m");
  if (!options.hideSeconds) {
    if (options.separateMilliseconds || options.formatSubMilliseconds || !options.colonNotation && milliseconds < 1e3 && !options.subSecondsAsDecimals) {
      const seconds = Number(parsed.seconds);
      const milliseconds2 = Number(parsed.milliseconds);
      const microseconds = Number(parsed.microseconds);
      const nanoseconds = Number(parsed.nanoseconds);
      add(seconds, "second", "s");
      if (options.formatSubMilliseconds) {
        add(milliseconds2, "millisecond", "ms");
        add(microseconds, "microsecond", "\xB5s");
        add(nanoseconds, "nanosecond", "ns");
      } else {
        const millisecondsAndBelow = milliseconds2 + microseconds / 1e3 + nanoseconds / 1e6;
        const millisecondsDecimalDigits = typeof options.millisecondsDecimalDigits === "number" ? options.millisecondsDecimalDigits : 0;
        const roundedMilliseconds = millisecondsAndBelow >= 1 ? Math.round(millisecondsAndBelow) : Math.ceil(millisecondsAndBelow);
        const millisecondsString = millisecondsDecimalDigits ? millisecondsAndBelow.toFixed(millisecondsDecimalDigits) : roundedMilliseconds;
        add(
          Number.parseFloat(millisecondsString),
          "millisecond",
          "ms",
          millisecondsString
        );
      }
    } else {
      const seconds = (isBigInt ? Number(milliseconds % ONE_DAY_IN_MILLISECONDS) : milliseconds) / 1e3 % 60;
      const secondsDecimalDigits = typeof options.secondsDecimalDigits === "number" ? options.secondsDecimalDigits : 1;
      const secondsFixed = floorDecimals(seconds, secondsDecimalDigits);
      const secondsString = options.keepDecimalsOnWholeSeconds ? secondsFixed : secondsFixed.replace(/\.0+$/, "");
      add(Number.parseFloat(secondsString), "second", "s", secondsString);
    }
  }
  if (result.length === 0) {
    return sign + "0" + (options.verbose ? " milliseconds" : "ms");
  }
  const separator = options.colonNotation ? ":" : " ";
  if (typeof options.unitCount === "number") {
    result = result.slice(0, Math.max(options.unitCount, 1));
  }
  return sign + result.join(separator);
}

// node_modules/.pnpm/execa@9.6.0/node_modules/execa/lib/verbose/error.js
var logError = (result, verboseInfo) => {
  if (result.failed) {
    verboseLog({
      type: "error",
      verboseMessage: result.shortMessage,
      verboseInfo,
      result
    });
  }
};

// node_modules/.pnpm/execa@9.6.0/node_modules/execa/lib/verbose/complete.js
var logResult = (result, verboseInfo) => {
  if (!isVerbose(verboseInfo)) {
    return;
  }
  logError(result, verboseInfo);
  logDuration(result, verboseInfo);
};
var logDuration = (result, verboseInfo) => {
  const verboseMessage = `(done in ${prettyMilliseconds(result.durationMs)})`;
  verboseLog({
    type: "duration",
    verboseMessage,
    verboseInfo,
    result
  });
};

// node_modules/.pnpm/execa@9.6.0/node_modules/execa/lib/return/reject.js
var handleResult = (result, verboseInfo, { reject }) => {
  logResult(result, verboseInfo);
  if (result.failed && reject) {
    throw result;
  }
  return result;
};

// node_modules/.pnpm/execa@9.6.0/node_modules/execa/lib/stdio/handle-sync.js
var import_node_fs10 = require("node:fs");

// node_modules/.pnpm/execa@9.6.0/node_modules/execa/lib/stdio/type.js
var getStdioItemType = (value, optionName) => {
  if (isAsyncGenerator(value)) {
    return "asyncGenerator";
  }
  if (isSyncGenerator(value)) {
    return "generator";
  }
  if (isUrl(value)) {
    return "fileUrl";
  }
  if (isFilePathObject(value)) {
    return "filePath";
  }
  if (isWebStream(value)) {
    return "webStream";
  }
  if (isStream(value, { checkOpen: false })) {
    return "native";
  }
  if (isUint8Array(value)) {
    return "uint8Array";
  }
  if (isAsyncIterableObject(value)) {
    return "asyncIterable";
  }
  if (isIterableObject(value)) {
    return "iterable";
  }
  if (isTransformStream(value)) {
    return getTransformStreamType({ transform: value }, optionName);
  }
  if (isTransformOptions(value)) {
    return getTransformObjectType(value, optionName);
  }
  return "native";
};
var getTransformObjectType = (value, optionName) => {
  if (isDuplexStream(value.transform, { checkOpen: false })) {
    return getDuplexType(value, optionName);
  }
  if (isTransformStream(value.transform)) {
    return getTransformStreamType(value, optionName);
  }
  return getGeneratorObjectType(value, optionName);
};
var getDuplexType = (value, optionName) => {
  validateNonGeneratorType(value, optionName, "Duplex stream");
  return "duplex";
};
var getTransformStreamType = (value, optionName) => {
  validateNonGeneratorType(value, optionName, "web TransformStream");
  return "webTransform";
};
var validateNonGeneratorType = ({ final, binary, objectMode }, optionName, typeName) => {
  checkUndefinedOption(final, `${optionName}.final`, typeName);
  checkUndefinedOption(binary, `${optionName}.binary`, typeName);
  checkBooleanOption(objectMode, `${optionName}.objectMode`);
};
var checkUndefinedOption = (value, optionName, typeName) => {
  if (value !== void 0) {
    throw new TypeError(`The \`${optionName}\` option can only be defined when using a generator, not a ${typeName}.`);
  }
};
var getGeneratorObjectType = ({ transform, final, binary, objectMode }, optionName) => {
  if (transform !== void 0 && !isGenerator(transform)) {
    throw new TypeError(`The \`${optionName}.transform\` option must be a generator, a Duplex stream or a web TransformStream.`);
  }
  if (isDuplexStream(final, { checkOpen: false })) {
    throw new TypeError(`The \`${optionName}.final\` option must not be a Duplex stream.`);
  }
  if (isTransformStream(final)) {
    throw new TypeError(`The \`${optionName}.final\` option must not be a web TransformStream.`);
  }
  if (final !== void 0 && !isGenerator(final)) {
    throw new TypeError(`The \`${optionName}.final\` option must be a generator.`);
  }
  checkBooleanOption(binary, `${optionName}.binary`);
  checkBooleanOption(objectMode, `${optionName}.objectMode`);
  return isAsyncGenerator(transform) || isAsyncGenerator(final) ? "asyncGenerator" : "generator";
};
var checkBooleanOption = (value, optionName) => {
  if (value !== void 0 && typeof value !== "boolean") {
    throw new TypeError(`The \`${optionName}\` option must use a boolean.`);
  }
};
var isGenerator = (value) => isAsyncGenerator(value) || isSyncGenerator(value);
var isAsyncGenerator = (value) => Object.prototype.toString.call(value) === "[object AsyncGeneratorFunction]";
var isSyncGenerator = (value) => Object.prototype.toString.call(value) === "[object GeneratorFunction]";
var isTransformOptions = (value) => isPlainObject(value) && (value.transform !== void 0 || value.final !== void 0);
var isUrl = (value) => Object.prototype.toString.call(value) === "[object URL]";
var isRegularUrl = (value) => isUrl(value) && value.protocol !== "file:";
var isFilePathObject = (value) => isPlainObject(value) && Object.keys(value).length > 0 && Object.keys(value).every((key) => FILE_PATH_KEYS.has(key)) && isFilePathString(value.file);
var FILE_PATH_KEYS = /* @__PURE__ */ new Set(["file", "append"]);
var isFilePathString = (file) => typeof file === "string";
var isUnknownStdioString = (type, value) => type === "native" && typeof value === "string" && !KNOWN_STDIO_STRINGS.has(value);
var KNOWN_STDIO_STRINGS = /* @__PURE__ */ new Set(["ipc", "ignore", "inherit", "overlapped", "pipe"]);
var isReadableStream2 = (value) => Object.prototype.toString.call(value) === "[object ReadableStream]";
var isWritableStream2 = (value) => Object.prototype.toString.call(value) === "[object WritableStream]";
var isWebStream = (value) => isReadableStream2(value) || isWritableStream2(value);
var isTransformStream = (value) => isReadableStream2(value == null ? void 0 : value.readable) && isWritableStream2(value == null ? void 0 : value.writable);
var isAsyncIterableObject = (value) => isObject(value) && typeof value[Symbol.asyncIterator] === "function";
var isIterableObject = (value) => isObject(value) && typeof value[Symbol.iterator] === "function";
var isObject = (value) => typeof value === "object" && value !== null;
var TRANSFORM_TYPES = /* @__PURE__ */ new Set(["generator", "asyncGenerator", "duplex", "webTransform"]);
var FILE_TYPES = /* @__PURE__ */ new Set(["fileUrl", "filePath", "fileNumber"]);
var SPECIAL_DUPLICATE_TYPES_SYNC = /* @__PURE__ */ new Set(["fileUrl", "filePath"]);
var SPECIAL_DUPLICATE_TYPES = /* @__PURE__ */ new Set([...SPECIAL_DUPLICATE_TYPES_SYNC, "webStream", "nodeStream"]);
var FORBID_DUPLICATE_TYPES = /* @__PURE__ */ new Set(["webTransform", "duplex"]);
var TYPE_TO_MESSAGE = {
  generator: "a generator",
  asyncGenerator: "an async generator",
  fileUrl: "a file URL",
  filePath: "a file path string",
  fileNumber: "a file descriptor number",
  webStream: "a web stream",
  nodeStream: "a Node.js stream",
  webTransform: "a web TransformStream",
  duplex: "a Duplex stream",
  native: "any value",
  iterable: "an iterable",
  asyncIterable: "an async iterable",
  string: "a string",
  uint8Array: "a Uint8Array"
};

// node_modules/.pnpm/execa@9.6.0/node_modules/execa/lib/transform/object-mode.js
var getTransformObjectModes = (objectMode, index, newTransforms, direction) => direction === "output" ? getOutputObjectModes(objectMode, index, newTransforms) : getInputObjectModes(objectMode, index, newTransforms);
var getOutputObjectModes = (objectMode, index, newTransforms) => {
  const writableObjectMode = index !== 0 && newTransforms[index - 1].value.readableObjectMode;
  const readableObjectMode = objectMode ?? writableObjectMode;
  return { writableObjectMode, readableObjectMode };
};
var getInputObjectModes = (objectMode, index, newTransforms) => {
  const writableObjectMode = index === 0 ? objectMode === true : newTransforms[index - 1].value.readableObjectMode;
  const readableObjectMode = index !== newTransforms.length - 1 && (objectMode ?? writableObjectMode);
  return { writableObjectMode, readableObjectMode };
};
var getFdObjectMode = (stdioItems, direction) => {
  const lastTransform = stdioItems.findLast(({ type }) => TRANSFORM_TYPES.has(type));
  if (lastTransform === void 0) {
    return false;
  }
  return direction === "input" ? lastTransform.value.writableObjectMode : lastTransform.value.readableObjectMode;
};

// node_modules/.pnpm/execa@9.6.0/node_modules/execa/lib/transform/normalize.js
var normalizeTransforms = (stdioItems, optionName, direction, options) => [
  ...stdioItems.filter(({ type }) => !TRANSFORM_TYPES.has(type)),
  ...getTransforms(stdioItems, optionName, direction, options)
];
var getTransforms = (stdioItems, optionName, direction, { encoding }) => {
  const transforms = stdioItems.filter(({ type }) => TRANSFORM_TYPES.has(type));
  const newTransforms = Array.from({ length: transforms.length });
  for (const [index, stdioItem] of Object.entries(transforms)) {
    newTransforms[index] = normalizeTransform({
      stdioItem,
      index: Number(index),
      newTransforms,
      optionName,
      direction,
      encoding
    });
  }
  return sortTransforms(newTransforms, direction);
};
var normalizeTransform = ({ stdioItem, stdioItem: { type }, index, newTransforms, optionName, direction, encoding }) => {
  if (type === "duplex") {
    return normalizeDuplex({ stdioItem, optionName });
  }
  if (type === "webTransform") {
    return normalizeTransformStream({
      stdioItem,
      index,
      newTransforms,
      direction
    });
  }
  return normalizeGenerator({
    stdioItem,
    index,
    newTransforms,
    direction,
    encoding
  });
};
var normalizeDuplex = ({
  stdioItem,
  stdioItem: {
    value: {
      transform,
      transform: { writableObjectMode, readableObjectMode },
      objectMode = readableObjectMode
    }
  },
  optionName
}) => {
  if (objectMode && !readableObjectMode) {
    throw new TypeError(`The \`${optionName}.objectMode\` option can only be \`true\` if \`new Duplex({objectMode: true})\` is used.`);
  }
  if (!objectMode && readableObjectMode) {
    throw new TypeError(`The \`${optionName}.objectMode\` option cannot be \`false\` if \`new Duplex({objectMode: true})\` is used.`);
  }
  return {
    ...stdioItem,
    value: { transform, writableObjectMode, readableObjectMode }
  };
};
var normalizeTransformStream = ({ stdioItem, stdioItem: { value }, index, newTransforms, direction }) => {
  const { transform, objectMode } = isPlainObject(value) ? value : { transform: value };
  const { writableObjectMode, readableObjectMode } = getTransformObjectModes(objectMode, index, newTransforms, direction);
  return {
    ...stdioItem,
    value: { transform, writableObjectMode, readableObjectMode }
  };
};
var normalizeGenerator = ({ stdioItem, stdioItem: { value }, index, newTransforms, direction, encoding }) => {
  const {
    transform,
    final,
    binary: binaryOption = false,
    preserveNewlines = false,
    objectMode
  } = isPlainObject(value) ? value : { transform: value };
  const binary = binaryOption || BINARY_ENCODINGS.has(encoding);
  const { writableObjectMode, readableObjectMode } = getTransformObjectModes(objectMode, index, newTransforms, direction);
  return {
    ...stdioItem,
    value: {
      transform,
      final,
      binary,
      preserveNewlines,
      writableObjectMode,
      readableObjectMode
    }
  };
};
var sortTransforms = (newTransforms, direction) => direction === "input" ? newTransforms.reverse() : newTransforms;

// node_modules/.pnpm/execa@9.6.0/node_modules/execa/lib/stdio/direction.js
var import_node_process11 = __toESM(require("node:process"), 1);
var getStreamDirection = (stdioItems, fdNumber, optionName) => {
  const directions = stdioItems.map((stdioItem) => getStdioItemDirection(stdioItem, fdNumber));
  if (directions.includes("input") && directions.includes("output")) {
    throw new TypeError(`The \`${optionName}\` option must not be an array of both readable and writable values.`);
  }
  return directions.find(Boolean) ?? DEFAULT_DIRECTION;
};
var getStdioItemDirection = ({ type, value }, fdNumber) => KNOWN_DIRECTIONS[fdNumber] ?? guessStreamDirection[type](value);
var KNOWN_DIRECTIONS = ["input", "output", "output"];
var anyDirection = () => void 0;
var alwaysInput = () => "input";
var guessStreamDirection = {
  generator: anyDirection,
  asyncGenerator: anyDirection,
  fileUrl: anyDirection,
  filePath: anyDirection,
  iterable: alwaysInput,
  asyncIterable: alwaysInput,
  uint8Array: alwaysInput,
  webStream: (value) => isWritableStream2(value) ? "output" : "input",
  nodeStream(value) {
    if (!isReadableStream(value, { checkOpen: false })) {
      return "output";
    }
    return isWritableStream(value, { checkOpen: false }) ? void 0 : "input";
  },
  webTransform: anyDirection,
  duplex: anyDirection,
  native(value) {
    const standardStreamDirection = getStandardStreamDirection(value);
    if (standardStreamDirection !== void 0) {
      return standardStreamDirection;
    }
    if (isStream(value, { checkOpen: false })) {
      return guessStreamDirection.nodeStream(value);
    }
  }
};
var getStandardStreamDirection = (value) => {
  if ([0, import_node_process11.default.stdin].includes(value)) {
    return "input";
  }
  if ([1, 2, import_node_process11.default.stdout, import_node_process11.default.stderr].includes(value)) {
    return "output";
  }
};
var DEFAULT_DIRECTION = "output";

// node_modules/.pnpm/execa@9.6.0/node_modules/execa/lib/ipc/array.js
var normalizeIpcStdioArray = (stdioArray, ipc) => ipc && !stdioArray.includes("ipc") ? [...stdioArray, "ipc"] : stdioArray;

// node_modules/.pnpm/execa@9.6.0/node_modules/execa/lib/stdio/stdio-option.js
var normalizeStdioOption = ({ stdio, ipc, buffer, ...options }, verboseInfo, isSync) => {
  const stdioArray = getStdioArray(stdio, options).map((stdioOption, fdNumber) => addDefaultValue2(stdioOption, fdNumber));
  return isSync ? normalizeStdioSync(stdioArray, buffer, verboseInfo) : normalizeIpcStdioArray(stdioArray, ipc);
};
var getStdioArray = (stdio, options) => {
  if (stdio === void 0) {
    return STANDARD_STREAMS_ALIASES.map((alias) => options[alias]);
  }
  if (hasAlias(options)) {
    throw new Error(`It's not possible to provide \`stdio\` in combination with one of ${STANDARD_STREAMS_ALIASES.map((alias) => `\`${alias}\``).join(", ")}`);
  }
  if (typeof stdio === "string") {
    return [stdio, stdio, stdio];
  }
  if (!Array.isArray(stdio)) {
    throw new TypeError(`Expected \`stdio\` to be of type \`string\` or \`Array\`, got \`${typeof stdio}\``);
  }
  const length = Math.max(stdio.length, STANDARD_STREAMS_ALIASES.length);
  return Array.from({ length }, (_3, fdNumber) => stdio[fdNumber]);
};
var hasAlias = (options) => STANDARD_STREAMS_ALIASES.some((alias) => options[alias] !== void 0);
var addDefaultValue2 = (stdioOption, fdNumber) => {
  if (Array.isArray(stdioOption)) {
    return stdioOption.map((item) => addDefaultValue2(item, fdNumber));
  }
  if (stdioOption === null || stdioOption === void 0) {
    return fdNumber >= STANDARD_STREAMS_ALIASES.length ? "ignore" : "pipe";
  }
  return stdioOption;
};
var normalizeStdioSync = (stdioArray, buffer, verboseInfo) => stdioArray.map((stdioOption, fdNumber) => !buffer[fdNumber] && fdNumber !== 0 && !isFullVerbose(verboseInfo, fdNumber) && isOutputPipeOnly(stdioOption) ? "ignore" : stdioOption);
var isOutputPipeOnly = (stdioOption) => stdioOption === "pipe" || Array.isArray(stdioOption) && stdioOption.every((item) => item === "pipe");

// node_modules/.pnpm/execa@9.6.0/node_modules/execa/lib/stdio/native.js
var import_node_fs9 = require("node:fs");
var import_node_tty3 = __toESM(require("node:tty"), 1);
var handleNativeStream = ({ stdioItem, stdioItem: { type }, isStdioArray, fdNumber, direction, isSync }) => {
  if (!isStdioArray || type !== "native") {
    return stdioItem;
  }
  return isSync ? handleNativeStreamSync({ stdioItem, fdNumber, direction }) : handleNativeStreamAsync({ stdioItem, fdNumber });
};
var handleNativeStreamSync = ({ stdioItem, stdioItem: { value, optionName }, fdNumber, direction }) => {
  const targetFd = getTargetFd({
    value,
    optionName,
    fdNumber,
    direction
  });
  if (targetFd !== void 0) {
    return targetFd;
  }
  if (isStream(value, { checkOpen: false })) {
    throw new TypeError(`The \`${optionName}: Stream\` option cannot both be an array and include a stream with synchronous methods.`);
  }
  return stdioItem;
};
var getTargetFd = ({ value, optionName, fdNumber, direction }) => {
  const targetFdNumber = getTargetFdNumber(value, fdNumber);
  if (targetFdNumber === void 0) {
    return;
  }
  if (direction === "output") {
    return { type: "fileNumber", value: targetFdNumber, optionName };
  }
  if (import_node_tty3.default.isatty(targetFdNumber)) {
    throw new TypeError(`The \`${optionName}: ${serializeOptionValue(value)}\` option is invalid: it cannot be a TTY with synchronous methods.`);
  }
  return { type: "uint8Array", value: bufferToUint8Array((0, import_node_fs9.readFileSync)(targetFdNumber)), optionName };
};
var getTargetFdNumber = (value, fdNumber) => {
  if (value === "inherit") {
    return fdNumber;
  }
  if (typeof value === "number") {
    return value;
  }
  const standardStreamIndex = STANDARD_STREAMS.indexOf(value);
  if (standardStreamIndex !== -1) {
    return standardStreamIndex;
  }
};
var handleNativeStreamAsync = ({ stdioItem, stdioItem: { value, optionName }, fdNumber }) => {
  if (value === "inherit") {
    return { type: "nodeStream", value: getStandardStream(fdNumber, value, optionName), optionName };
  }
  if (typeof value === "number") {
    return { type: "nodeStream", value: getStandardStream(value, value, optionName), optionName };
  }
  if (isStream(value, { checkOpen: false })) {
    return { type: "nodeStream", value, optionName };
  }
  return stdioItem;
};
var getStandardStream = (fdNumber, value, optionName) => {
  const standardStream = STANDARD_STREAMS[fdNumber];
  if (standardStream === void 0) {
    throw new TypeError(`The \`${optionName}: ${value}\` option is invalid: no such standard stream.`);
  }
  return standardStream;
};

// node_modules/.pnpm/execa@9.6.0/node_modules/execa/lib/stdio/input-option.js
var handleInputOptions = ({ input, inputFile }, fdNumber) => fdNumber === 0 ? [
  ...handleInputOption(input),
  ...handleInputFileOption(inputFile)
] : [];
var handleInputOption = (input) => input === void 0 ? [] : [{
  type: getInputType(input),
  value: input,
  optionName: "input"
}];
var getInputType = (input) => {
  if (isReadableStream(input, { checkOpen: false })) {
    return "nodeStream";
  }
  if (typeof input === "string") {
    return "string";
  }
  if (isUint8Array(input)) {
    return "uint8Array";
  }
  throw new Error("The `input` option must be a string, a Uint8Array or a Node.js Readable stream.");
};
var handleInputFileOption = (inputFile) => inputFile === void 0 ? [] : [{
  ...getInputFileType(inputFile),
  optionName: "inputFile"
}];
var getInputFileType = (inputFile) => {
  if (isUrl(inputFile)) {
    return { type: "fileUrl", value: inputFile };
  }
  if (isFilePathString(inputFile)) {
    return { type: "filePath", value: { file: inputFile } };
  }
  throw new Error("The `inputFile` option must be a file path string or a file URL.");
};

// node_modules/.pnpm/execa@9.6.0/node_modules/execa/lib/stdio/duplicate.js
var filterDuplicates = (stdioItems) => stdioItems.filter((stdioItemOne, indexOne) => stdioItems.every((stdioItemTwo, indexTwo) => stdioItemOne.value !== stdioItemTwo.value || indexOne >= indexTwo || stdioItemOne.type === "generator" || stdioItemOne.type === "asyncGenerator"));
var getDuplicateStream = ({ stdioItem: { type, value, optionName }, direction, fileDescriptors, isSync }) => {
  const otherStdioItems = getOtherStdioItems(fileDescriptors, type);
  if (otherStdioItems.length === 0) {
    return;
  }
  if (isSync) {
    validateDuplicateStreamSync({
      otherStdioItems,
      type,
      value,
      optionName,
      direction
    });
    return;
  }
  if (SPECIAL_DUPLICATE_TYPES.has(type)) {
    return getDuplicateStreamInstance({
      otherStdioItems,
      type,
      value,
      optionName,
      direction
    });
  }
  if (FORBID_DUPLICATE_TYPES.has(type)) {
    validateDuplicateTransform({
      otherStdioItems,
      type,
      value,
      optionName
    });
  }
};
var getOtherStdioItems = (fileDescriptors, type) => fileDescriptors.flatMap(({ direction, stdioItems }) => stdioItems.filter((stdioItem) => stdioItem.type === type).map(((stdioItem) => ({ ...stdioItem, direction }))));
var validateDuplicateStreamSync = ({ otherStdioItems, type, value, optionName, direction }) => {
  if (SPECIAL_DUPLICATE_TYPES_SYNC.has(type)) {
    getDuplicateStreamInstance({
      otherStdioItems,
      type,
      value,
      optionName,
      direction
    });
  }
};
var getDuplicateStreamInstance = ({ otherStdioItems, type, value, optionName, direction }) => {
  const duplicateStdioItems = otherStdioItems.filter((stdioItem) => hasSameValue(stdioItem, value));
  if (duplicateStdioItems.length === 0) {
    return;
  }
  const differentStdioItem = duplicateStdioItems.find((stdioItem) => stdioItem.direction !== direction);
  throwOnDuplicateStream(differentStdioItem, optionName, type);
  return direction === "output" ? duplicateStdioItems[0].stream : void 0;
};
var hasSameValue = ({ type, value }, secondValue) => {
  if (type === "filePath") {
    return value.file === secondValue.file;
  }
  if (type === "fileUrl") {
    return value.href === secondValue.href;
  }
  return value === secondValue;
};
var validateDuplicateTransform = ({ otherStdioItems, type, value, optionName }) => {
  const duplicateStdioItem = otherStdioItems.find(({ value: { transform } }) => transform === value.transform);
  throwOnDuplicateStream(duplicateStdioItem, optionName, type);
};
var throwOnDuplicateStream = (stdioItem, optionName, type) => {
  if (stdioItem !== void 0) {
    throw new TypeError(`The \`${stdioItem.optionName}\` and \`${optionName}\` options must not target ${TYPE_TO_MESSAGE[type]} that is the same.`);
  }
};

// node_modules/.pnpm/execa@9.6.0/node_modules/execa/lib/stdio/handle.js
var handleStdio = (addProperties3, options, verboseInfo, isSync) => {
  const stdio = normalizeStdioOption(options, verboseInfo, isSync);
  const initialFileDescriptors = stdio.map((stdioOption, fdNumber) => getFileDescriptor({
    stdioOption,
    fdNumber,
    options,
    isSync
  }));
  const fileDescriptors = getFinalFileDescriptors({
    initialFileDescriptors,
    addProperties: addProperties3,
    options,
    isSync
  });
  options.stdio = fileDescriptors.map(({ stdioItems }) => forwardStdio(stdioItems));
  return fileDescriptors;
};
var getFileDescriptor = ({ stdioOption, fdNumber, options, isSync }) => {
  const optionName = getStreamName(fdNumber);
  const { stdioItems: initialStdioItems, isStdioArray } = initializeStdioItems({
    stdioOption,
    fdNumber,
    options,
    optionName
  });
  const direction = getStreamDirection(initialStdioItems, fdNumber, optionName);
  const stdioItems = initialStdioItems.map((stdioItem) => handleNativeStream({
    stdioItem,
    isStdioArray,
    fdNumber,
    direction,
    isSync
  }));
  const normalizedStdioItems = normalizeTransforms(stdioItems, optionName, direction, options);
  const objectMode = getFdObjectMode(normalizedStdioItems, direction);
  validateFileObjectMode(normalizedStdioItems, objectMode);
  return { direction, objectMode, stdioItems: normalizedStdioItems };
};
var initializeStdioItems = ({ stdioOption, fdNumber, options, optionName }) => {
  const values = Array.isArray(stdioOption) ? stdioOption : [stdioOption];
  const initialStdioItems = [
    ...values.map((value) => initializeStdioItem(value, optionName)),
    ...handleInputOptions(options, fdNumber)
  ];
  const stdioItems = filterDuplicates(initialStdioItems);
  const isStdioArray = stdioItems.length > 1;
  validateStdioArray(stdioItems, isStdioArray, optionName);
  validateStreams(stdioItems);
  return { stdioItems, isStdioArray };
};
var initializeStdioItem = (value, optionName) => ({
  type: getStdioItemType(value, optionName),
  value,
  optionName
});
var validateStdioArray = (stdioItems, isStdioArray, optionName) => {
  if (stdioItems.length === 0) {
    throw new TypeError(`The \`${optionName}\` option must not be an empty array.`);
  }
  if (!isStdioArray) {
    return;
  }
  for (const { value, optionName: optionName2 } of stdioItems) {
    if (INVALID_STDIO_ARRAY_OPTIONS.has(value)) {
      throw new Error(`The \`${optionName2}\` option must not include \`${value}\`.`);
    }
  }
};
var INVALID_STDIO_ARRAY_OPTIONS = /* @__PURE__ */ new Set(["ignore", "ipc"]);
var validateStreams = (stdioItems) => {
  for (const stdioItem of stdioItems) {
    validateFileStdio(stdioItem);
  }
};
var validateFileStdio = ({ type, value, optionName }) => {
  if (isRegularUrl(value)) {
    throw new TypeError(`The \`${optionName}: URL\` option must use the \`file:\` scheme.
For example, you can use the \`pathToFileURL()\` method of the \`url\` core module.`);
  }
  if (isUnknownStdioString(type, value)) {
    throw new TypeError(`The \`${optionName}: { file: '...' }\` option must be used instead of \`${optionName}: '...'\`.`);
  }
};
var validateFileObjectMode = (stdioItems, objectMode) => {
  if (!objectMode) {
    return;
  }
  const fileStdioItem = stdioItems.find(({ type }) => FILE_TYPES.has(type));
  if (fileStdioItem !== void 0) {
    throw new TypeError(`The \`${fileStdioItem.optionName}\` option cannot use both files and transforms in objectMode.`);
  }
};
var getFinalFileDescriptors = ({ initialFileDescriptors, addProperties: addProperties3, options, isSync }) => {
  const fileDescriptors = [];
  try {
    for (const fileDescriptor of initialFileDescriptors) {
      fileDescriptors.push(getFinalFileDescriptor({
        fileDescriptor,
        fileDescriptors,
        addProperties: addProperties3,
        options,
        isSync
      }));
    }
    return fileDescriptors;
  } catch (error) {
    cleanupCustomStreams(fileDescriptors);
    throw error;
  }
};
var getFinalFileDescriptor = ({
  fileDescriptor: { direction, objectMode, stdioItems },
  fileDescriptors,
  addProperties: addProperties3,
  options,
  isSync
}) => {
  const finalStdioItems = stdioItems.map((stdioItem) => addStreamProperties({
    stdioItem,
    addProperties: addProperties3,
    direction,
    options,
    fileDescriptors,
    isSync
  }));
  return { direction, objectMode, stdioItems: finalStdioItems };
};
var addStreamProperties = ({ stdioItem, addProperties: addProperties3, direction, options, fileDescriptors, isSync }) => {
  const duplicateStream = getDuplicateStream({
    stdioItem,
    direction,
    fileDescriptors,
    isSync
  });
  if (duplicateStream !== void 0) {
    return { ...stdioItem, stream: duplicateStream };
  }
  return {
    ...stdioItem,
    ...addProperties3[direction][stdioItem.type](stdioItem, options)
  };
};
var cleanupCustomStreams = (fileDescriptors) => {
  for (const { stdioItems } of fileDescriptors) {
    for (const { stream } of stdioItems) {
      if (stream !== void 0 && !isStandardStream(stream)) {
        stream.destroy();
      }
    }
  }
};
var forwardStdio = (stdioItems) => {
  if (stdioItems.length > 1) {
    return stdioItems.some(({ value: value2 }) => value2 === "overlapped") ? "overlapped" : "pipe";
  }
  const [{ type, value }] = stdioItems;
  return type === "native" ? value : "pipe";
};

// node_modules/.pnpm/execa@9.6.0/node_modules/execa/lib/stdio/handle-sync.js
var handleStdioSync = (options, verboseInfo) => handleStdio(addPropertiesSync, options, verboseInfo, true);
var forbiddenIfSync = ({ type, optionName }) => {
  throwInvalidSyncValue(optionName, TYPE_TO_MESSAGE[type]);
};
var forbiddenNativeIfSync = ({ optionName, value }) => {
  if (value === "ipc" || value === "overlapped") {
    throwInvalidSyncValue(optionName, `"${value}"`);
  }
  return {};
};
var throwInvalidSyncValue = (optionName, value) => {
  throw new TypeError(`The \`${optionName}\` option cannot be ${value} with synchronous methods.`);
};
var addProperties = {
  generator() {
  },
  asyncGenerator: forbiddenIfSync,
  webStream: forbiddenIfSync,
  nodeStream: forbiddenIfSync,
  webTransform: forbiddenIfSync,
  duplex: forbiddenIfSync,
  asyncIterable: forbiddenIfSync,
  native: forbiddenNativeIfSync
};
var addPropertiesSync = {
  input: {
    ...addProperties,
    fileUrl: ({ value }) => ({ contents: [bufferToUint8Array((0, import_node_fs10.readFileSync)(value))] }),
    filePath: ({ value: { file } }) => ({ contents: [bufferToUint8Array((0, import_node_fs10.readFileSync)(file))] }),
    fileNumber: forbiddenIfSync,
    iterable: ({ value }) => ({ contents: [...value] }),
    string: ({ value }) => ({ contents: [value] }),
    uint8Array: ({ value }) => ({ contents: [value] })
  },
  output: {
    ...addProperties,
    fileUrl: ({ value }) => ({ path: value }),
    filePath: ({ value: { file, append } }) => ({ path: file, append }),
    fileNumber: ({ value }) => ({ path: value }),
    iterable: forbiddenIfSync,
    string: forbiddenIfSync,
    uint8Array: forbiddenIfSync
  }
};

// node_modules/.pnpm/execa@9.6.0/node_modules/execa/lib/io/strip-newline.js
var stripNewline = (value, { stripFinalNewline: stripFinalNewline2 }, fdNumber) => getStripFinalNewline(stripFinalNewline2, fdNumber) && value !== void 0 && !Array.isArray(value) ? stripFinalNewline(value) : value;
var getStripFinalNewline = (stripFinalNewline2, fdNumber) => fdNumber === "all" ? stripFinalNewline2[1] || stripFinalNewline2[2] : stripFinalNewline2[fdNumber];

// node_modules/.pnpm/execa@9.6.0/node_modules/execa/lib/transform/generator.js
var import_node_stream = require("node:stream");

// node_modules/.pnpm/execa@9.6.0/node_modules/execa/lib/transform/split.js
var getSplitLinesGenerator = (binary, preserveNewlines, skipped, state) => binary || skipped ? void 0 : initializeSplitLines(preserveNewlines, state);
var splitLinesSync = (chunk, preserveNewlines, objectMode) => objectMode ? chunk.flatMap((item) => splitLinesItemSync(item, preserveNewlines)) : splitLinesItemSync(chunk, preserveNewlines);
var splitLinesItemSync = (chunk, preserveNewlines) => {
  const { transform, final } = initializeSplitLines(preserveNewlines, {});
  return [...transform(chunk), ...final()];
};
var initializeSplitLines = (preserveNewlines, state) => {
  state.previousChunks = "";
  return {
    transform: splitGenerator.bind(void 0, state, preserveNewlines),
    final: linesFinal.bind(void 0, state)
  };
};
var splitGenerator = function* (state, preserveNewlines, chunk) {
  if (typeof chunk !== "string") {
    yield chunk;
    return;
  }
  let { previousChunks } = state;
  let start = -1;
  for (let end = 0; end < chunk.length; end += 1) {
    if (chunk[end] === "\n") {
      const newlineLength = getNewlineLength(chunk, end, preserveNewlines, state);
      let line = chunk.slice(start + 1, end + 1 - newlineLength);
      if (previousChunks.length > 0) {
        line = concatString(previousChunks, line);
        previousChunks = "";
      }
      yield line;
      start = end;
    }
  }
  if (start !== chunk.length - 1) {
    previousChunks = concatString(previousChunks, chunk.slice(start + 1));
  }
  state.previousChunks = previousChunks;
};
var getNewlineLength = (chunk, end, preserveNewlines, state) => {
  if (preserveNewlines) {
    return 0;
  }
  state.isWindowsNewline = end !== 0 && chunk[end - 1] === "\r";
  return state.isWindowsNewline ? 2 : 1;
};
var linesFinal = function* ({ previousChunks }) {
  if (previousChunks.length > 0) {
    yield previousChunks;
  }
};
var getAppendNewlineGenerator = ({ binary, preserveNewlines, readableObjectMode, state }) => binary || preserveNewlines || readableObjectMode ? void 0 : { transform: appendNewlineGenerator.bind(void 0, state) };
var appendNewlineGenerator = function* ({ isWindowsNewline = false }, chunk) {
  const { unixNewline, windowsNewline, LF: LF2, concatBytes } = typeof chunk === "string" ? linesStringInfo : linesUint8ArrayInfo;
  if (chunk.at(-1) === LF2) {
    yield chunk;
    return;
  }
  const newline = isWindowsNewline ? windowsNewline : unixNewline;
  yield concatBytes(chunk, newline);
};
var concatString = (firstChunk, secondChunk) => `${firstChunk}${secondChunk}`;
var linesStringInfo = {
  windowsNewline: "\r\n",
  unixNewline: "\n",
  LF: "\n",
  concatBytes: concatString
};
var concatUint8Array = (firstChunk, secondChunk) => {
  const chunk = new Uint8Array(firstChunk.length + secondChunk.length);
  chunk.set(firstChunk, 0);
  chunk.set(secondChunk, firstChunk.length);
  return chunk;
};
var linesUint8ArrayInfo = {
  windowsNewline: new Uint8Array([13, 10]),
  unixNewline: new Uint8Array([10]),
  LF: 10,
  concatBytes: concatUint8Array
};

// node_modules/.pnpm/execa@9.6.0/node_modules/execa/lib/transform/validate.js
var import_node_buffer = require("node:buffer");
var getValidateTransformInput = (writableObjectMode, optionName) => writableObjectMode ? void 0 : validateStringTransformInput.bind(void 0, optionName);
var validateStringTransformInput = function* (optionName, chunk) {
  if (typeof chunk !== "string" && !isUint8Array(chunk) && !import_node_buffer.Buffer.isBuffer(chunk)) {
    throw new TypeError(`The \`${optionName}\` option's transform must use "objectMode: true" to receive as input: ${typeof chunk}.`);
  }
  yield chunk;
};
var getValidateTransformReturn = (readableObjectMode, optionName) => readableObjectMode ? validateObjectTransformReturn.bind(void 0, optionName) : validateStringTransformReturn.bind(void 0, optionName);
var validateObjectTransformReturn = function* (optionName, chunk) {
  validateEmptyReturn(optionName, chunk);
  yield chunk;
};
var validateStringTransformReturn = function* (optionName, chunk) {
  validateEmptyReturn(optionName, chunk);
  if (typeof chunk !== "string" && !isUint8Array(chunk)) {
    throw new TypeError(`The \`${optionName}\` option's function must yield a string or an Uint8Array, not ${typeof chunk}.`);
  }
  yield chunk;
};
var validateEmptyReturn = (optionName, chunk) => {
  if (chunk === null || chunk === void 0) {
    throw new TypeError(`The \`${optionName}\` option's function must not call \`yield ${chunk}\`.
Instead, \`yield\` should either be called with a value, or not be called at all. For example:
  if (condition) { yield value; }`);
  }
};

// node_modules/.pnpm/execa@9.6.0/node_modules/execa/lib/transform/encoding-transform.js
var import_node_buffer2 = require("node:buffer");
var import_node_string_decoder2 = require("node:string_decoder");
var getEncodingTransformGenerator = (binary, encoding, skipped) => {
  if (skipped) {
    return;
  }
  if (binary) {
    return { transform: encodingUint8ArrayGenerator.bind(void 0, new TextEncoder()) };
  }
  const stringDecoder = new import_node_string_decoder2.StringDecoder(encoding);
  return {
    transform: encodingStringGenerator.bind(void 0, stringDecoder),
    final: encodingStringFinal.bind(void 0, stringDecoder)
  };
};
var encodingUint8ArrayGenerator = function* (textEncoder3, chunk) {
  if (import_node_buffer2.Buffer.isBuffer(chunk)) {
    yield bufferToUint8Array(chunk);
  } else if (typeof chunk === "string") {
    yield textEncoder3.encode(chunk);
  } else {
    yield chunk;
  }
};
var encodingStringGenerator = function* (stringDecoder, chunk) {
  yield isUint8Array(chunk) ? stringDecoder.write(chunk) : chunk;
};
var encodingStringFinal = function* (stringDecoder) {
  const lastChunk = stringDecoder.end();
  if (lastChunk !== "") {
    yield lastChunk;
  }
};

// node_modules/.pnpm/execa@9.6.0/node_modules/execa/lib/transform/run-async.js
var import_node_util7 = require("node:util");
var pushChunks = (0, import_node_util7.callbackify)(async (getChunks, state, getChunksArguments, transformStream) => {
  state.currentIterable = getChunks(...getChunksArguments);
  try {
    for await (const chunk of state.currentIterable) {
      transformStream.push(chunk);
    }
  } finally {
    delete state.currentIterable;
  }
});
var transformChunk = async function* (chunk, generators, index) {
  if (index === generators.length) {
    yield chunk;
    return;
  }
  const { transform = identityGenerator } = generators[index];
  for await (const transformedChunk of transform(chunk)) {
    yield* transformChunk(transformedChunk, generators, index + 1);
  }
};
var finalChunks = async function* (generators) {
  for (const [index, { final }] of Object.entries(generators)) {
    yield* generatorFinalChunks(final, Number(index), generators);
  }
};
var generatorFinalChunks = async function* (final, index, generators) {
  if (final === void 0) {
    return;
  }
  for await (const finalChunk of final()) {
    yield* transformChunk(finalChunk, generators, index + 1);
  }
};
var destroyTransform = (0, import_node_util7.callbackify)(async ({ currentIterable }, error) => {
  if (currentIterable !== void 0) {
    await (error ? currentIterable.throw(error) : currentIterable.return());
    return;
  }
  if (error) {
    throw error;
  }
});
var identityGenerator = function* (chunk) {
  yield chunk;
};

// node_modules/.pnpm/execa@9.6.0/node_modules/execa/lib/transform/run-sync.js
var pushChunksSync = (getChunksSync, getChunksArguments, transformStream, done) => {
  try {
    for (const chunk of getChunksSync(...getChunksArguments)) {
      transformStream.push(chunk);
    }
    done();
  } catch (error) {
    done(error);
  }
};
var runTransformSync = (generators, chunks) => [
  ...chunks.flatMap((chunk) => [...transformChunkSync(chunk, generators, 0)]),
  ...finalChunksSync(generators)
];
var transformChunkSync = function* (chunk, generators, index) {
  if (index === generators.length) {
    yield chunk;
    return;
  }
  const { transform = identityGenerator2 } = generators[index];
  for (const transformedChunk of transform(chunk)) {
    yield* transformChunkSync(transformedChunk, generators, index + 1);
  }
};
var finalChunksSync = function* (generators) {
  for (const [index, { final }] of Object.entries(generators)) {
    yield* generatorFinalChunksSync(final, Number(index), generators);
  }
};
var generatorFinalChunksSync = function* (final, index, generators) {
  if (final === void 0) {
    return;
  }
  for (const finalChunk of final()) {
    yield* transformChunkSync(finalChunk, generators, index + 1);
  }
};
var identityGenerator2 = function* (chunk) {
  yield chunk;
};

// node_modules/.pnpm/execa@9.6.0/node_modules/execa/lib/transform/generator.js
var generatorToStream = ({
  value,
  value: { transform, final, writableObjectMode, readableObjectMode },
  optionName
}, { encoding }) => {
  const state = {};
  const generators = addInternalGenerators(value, encoding, optionName);
  const transformAsync = isAsyncGenerator(transform);
  const finalAsync = isAsyncGenerator(final);
  const transformMethod = transformAsync ? pushChunks.bind(void 0, transformChunk, state) : pushChunksSync.bind(void 0, transformChunkSync);
  const finalMethod = transformAsync || finalAsync ? pushChunks.bind(void 0, finalChunks, state) : pushChunksSync.bind(void 0, finalChunksSync);
  const destroyMethod = transformAsync || finalAsync ? destroyTransform.bind(void 0, state) : void 0;
  const stream = new import_node_stream.Transform({
    writableObjectMode,
    writableHighWaterMark: (0, import_node_stream.getDefaultHighWaterMark)(writableObjectMode),
    readableObjectMode,
    readableHighWaterMark: (0, import_node_stream.getDefaultHighWaterMark)(readableObjectMode),
    transform(chunk, encoding2, done) {
      transformMethod([chunk, generators, 0], this, done);
    },
    flush(done) {
      finalMethod([generators], this, done);
    },
    destroy: destroyMethod
  });
  return { stream };
};
var runGeneratorsSync = (chunks, stdioItems, encoding, isInput) => {
  const generators = stdioItems.filter(({ type }) => type === "generator");
  const reversedGenerators = isInput ? generators.reverse() : generators;
  for (const { value, optionName } of reversedGenerators) {
    const generators2 = addInternalGenerators(value, encoding, optionName);
    chunks = runTransformSync(generators2, chunks);
  }
  return chunks;
};
var addInternalGenerators = ({ transform, final, binary, writableObjectMode, readableObjectMode, preserveNewlines }, encoding, optionName) => {
  const state = {};
  return [
    { transform: getValidateTransformInput(writableObjectMode, optionName) },
    getEncodingTransformGenerator(binary, encoding, writableObjectMode),
    getSplitLinesGenerator(binary, preserveNewlines, writableObjectMode, state),
    { transform, final },
    { transform: getValidateTransformReturn(readableObjectMode, optionName) },
    getAppendNewlineGenerator({
      binary,
      preserveNewlines,
      readableObjectMode,
      state
    })
  ].filter(Boolean);
};

// node_modules/.pnpm/execa@9.6.0/node_modules/execa/lib/io/input-sync.js
var addInputOptionsSync = (fileDescriptors, options) => {
  for (const fdNumber of getInputFdNumbers(fileDescriptors)) {
    addInputOptionSync(fileDescriptors, fdNumber, options);
  }
};
var getInputFdNumbers = (fileDescriptors) => new Set(Object.entries(fileDescriptors).filter(([, { direction }]) => direction === "input").map(([fdNumber]) => Number(fdNumber)));
var addInputOptionSync = (fileDescriptors, fdNumber, options) => {
  const { stdioItems } = fileDescriptors[fdNumber];
  const allStdioItems = stdioItems.filter(({ contents }) => contents !== void 0);
  if (allStdioItems.length === 0) {
    return;
  }
  if (fdNumber !== 0) {
    const [{ type, optionName }] = allStdioItems;
    throw new TypeError(`Only the \`stdin\` option, not \`${optionName}\`, can be ${TYPE_TO_MESSAGE[type]} with synchronous methods.`);
  }
  const allContents = allStdioItems.map(({ contents }) => contents);
  const transformedContents = allContents.map((contents) => applySingleInputGeneratorsSync(contents, stdioItems));
  options.input = joinToUint8Array(transformedContents);
};
var applySingleInputGeneratorsSync = (contents, stdioItems) => {
  const newContents = runGeneratorsSync(contents, stdioItems, "utf8", true);
  validateSerializable(newContents);
  return joinToUint8Array(newContents);
};
var validateSerializable = (newContents) => {
  const invalidItem = newContents.find((item) => typeof item !== "string" && !isUint8Array(item));
  if (invalidItem !== void 0) {
    throw new TypeError(`The \`stdin\` option is invalid: when passing objects as input, a transform must be used to serialize them to strings or Uint8Arrays: ${invalidItem}.`);
  }
};

// node_modules/.pnpm/execa@9.6.0/node_modules/execa/lib/io/output-sync.js
var import_node_fs11 = require("node:fs");

// node_modules/.pnpm/execa@9.6.0/node_modules/execa/lib/verbose/output.js
var shouldLogOutput = ({ stdioItems, encoding, verboseInfo, fdNumber }) => fdNumber !== "all" && isFullVerbose(verboseInfo, fdNumber) && !BINARY_ENCODINGS.has(encoding) && fdUsesVerbose(fdNumber) && (stdioItems.some(({ type, value }) => type === "native" && PIPED_STDIO_VALUES.has(value)) || stdioItems.every(({ type }) => TRANSFORM_TYPES.has(type)));
var fdUsesVerbose = (fdNumber) => fdNumber === 1 || fdNumber === 2;
var PIPED_STDIO_VALUES = /* @__PURE__ */ new Set(["pipe", "overlapped"]);
var logLines = async (linesIterable, stream, fdNumber, verboseInfo) => {
  for await (const line of linesIterable) {
    if (!isPipingStream(stream)) {
      logLine(line, fdNumber, verboseInfo);
    }
  }
};
var logLinesSync = (linesArray, fdNumber, verboseInfo) => {
  for (const line of linesArray) {
    logLine(line, fdNumber, verboseInfo);
  }
};
var isPipingStream = (stream) => stream._readableState.pipes.length > 0;
var logLine = (line, fdNumber, verboseInfo) => {
  const verboseMessage = serializeVerboseMessage(line);
  verboseLog({
    type: "output",
    verboseMessage,
    fdNumber,
    verboseInfo
  });
};

// node_modules/.pnpm/execa@9.6.0/node_modules/execa/lib/io/output-sync.js
var transformOutputSync = ({ fileDescriptors, syncResult: { output }, options, isMaxBuffer, verboseInfo }) => {
  if (output === null) {
    return { output: Array.from({ length: 3 }) };
  }
  const state = {};
  const outputFiles = /* @__PURE__ */ new Set([]);
  const transformedOutput = output.map((result, fdNumber) => transformOutputResultSync({
    result,
    fileDescriptors,
    fdNumber,
    state,
    outputFiles,
    isMaxBuffer,
    verboseInfo
  }, options));
  return { output: transformedOutput, ...state };
};
var transformOutputResultSync = ({ result, fileDescriptors, fdNumber, state, outputFiles, isMaxBuffer, verboseInfo }, { buffer, encoding, lines, stripFinalNewline: stripFinalNewline2, maxBuffer }) => {
  if (result === null) {
    return;
  }
  const truncatedResult = truncateMaxBufferSync(result, isMaxBuffer, maxBuffer);
  const uint8ArrayResult = bufferToUint8Array(truncatedResult);
  const { stdioItems, objectMode } = fileDescriptors[fdNumber];
  const chunks = runOutputGeneratorsSync([uint8ArrayResult], stdioItems, encoding, state);
  const { serializedResult, finalResult = serializedResult } = serializeChunks({
    chunks,
    objectMode,
    encoding,
    lines,
    stripFinalNewline: stripFinalNewline2,
    fdNumber
  });
  logOutputSync({
    serializedResult,
    fdNumber,
    state,
    verboseInfo,
    encoding,
    stdioItems,
    objectMode
  });
  const returnedResult = buffer[fdNumber] ? finalResult : void 0;
  try {
    if (state.error === void 0) {
      writeToFiles(serializedResult, stdioItems, outputFiles);
    }
    return returnedResult;
  } catch (error) {
    state.error = error;
    return returnedResult;
  }
};
var runOutputGeneratorsSync = (chunks, stdioItems, encoding, state) => {
  try {
    return runGeneratorsSync(chunks, stdioItems, encoding, false);
  } catch (error) {
    state.error = error;
    return chunks;
  }
};
var serializeChunks = ({ chunks, objectMode, encoding, lines, stripFinalNewline: stripFinalNewline2, fdNumber }) => {
  if (objectMode) {
    return { serializedResult: chunks };
  }
  if (encoding === "buffer") {
    return { serializedResult: joinToUint8Array(chunks) };
  }
  const serializedResult = joinToString(chunks, encoding);
  if (lines[fdNumber]) {
    return { serializedResult, finalResult: splitLinesSync(serializedResult, !stripFinalNewline2[fdNumber], objectMode) };
  }
  return { serializedResult };
};
var logOutputSync = ({ serializedResult, fdNumber, state, verboseInfo, encoding, stdioItems, objectMode }) => {
  if (!shouldLogOutput({
    stdioItems,
    encoding,
    verboseInfo,
    fdNumber
  })) {
    return;
  }
  const linesArray = splitLinesSync(serializedResult, false, objectMode);
  try {
    logLinesSync(linesArray, fdNumber, verboseInfo);
  } catch (error) {
    state.error ??= error;
  }
};
var writeToFiles = (serializedResult, stdioItems, outputFiles) => {
  for (const { path: path7, append } of stdioItems.filter(({ type }) => FILE_TYPES.has(type))) {
    const pathString = typeof path7 === "string" ? path7 : path7.toString();
    if (append || outputFiles.has(pathString)) {
      (0, import_node_fs11.appendFileSync)(path7, serializedResult);
    } else {
      outputFiles.add(pathString);
      (0, import_node_fs11.writeFileSync)(path7, serializedResult);
    }
  }
};

// node_modules/.pnpm/execa@9.6.0/node_modules/execa/lib/resolve/all-sync.js
var getAllSync = ([, stdout, stderr], options) => {
  if (!options.all) {
    return;
  }
  if (stdout === void 0) {
    return stderr;
  }
  if (stderr === void 0) {
    return stdout;
  }
  if (Array.isArray(stdout)) {
    return Array.isArray(stderr) ? [...stdout, ...stderr] : [...stdout, stripNewline(stderr, options, "all")];
  }
  if (Array.isArray(stderr)) {
    return [stripNewline(stdout, options, "all"), ...stderr];
  }
  if (isUint8Array(stdout) && isUint8Array(stderr)) {
    return concatUint8Arrays([stdout, stderr]);
  }
  return `${stdout}${stderr}`;
};

// node_modules/.pnpm/execa@9.6.0/node_modules/execa/lib/resolve/exit-async.js
var import_node_events7 = require("node:events");
var waitForExit = async (subprocess, context) => {
  const [exitCode, signal] = await waitForExitOrError(subprocess);
  context.isForcefullyTerminated ??= false;
  return [exitCode, signal];
};
var waitForExitOrError = async (subprocess) => {
  const [spawnPayload, exitPayload] = await Promise.allSettled([
    (0, import_node_events7.once)(subprocess, "spawn"),
    (0, import_node_events7.once)(subprocess, "exit")
  ]);
  if (spawnPayload.status === "rejected") {
    return [];
  }
  return exitPayload.status === "rejected" ? waitForSubprocessExit(subprocess) : exitPayload.value;
};
var waitForSubprocessExit = async (subprocess) => {
  try {
    return await (0, import_node_events7.once)(subprocess, "exit");
  } catch {
    return waitForSubprocessExit(subprocess);
  }
};
var waitForSuccessfulExit = async (exitPromise) => {
  const [exitCode, signal] = await exitPromise;
  if (!isSubprocessErrorExit(exitCode, signal) && isFailedExit(exitCode, signal)) {
    throw new DiscardedError();
  }
  return [exitCode, signal];
};
var isSubprocessErrorExit = (exitCode, signal) => exitCode === void 0 && signal === void 0;
var isFailedExit = (exitCode, signal) => exitCode !== 0 || signal !== null;

// node_modules/.pnpm/execa@9.6.0/node_modules/execa/lib/resolve/exit-sync.js
var getExitResultSync = ({ error, status: exitCode, signal, output }, { maxBuffer }) => {
  const resultError = getResultError(error, exitCode, signal);
  const timedOut = (resultError == null ? void 0 : resultError.code) === "ETIMEDOUT";
  const isMaxBuffer = isMaxBufferSync(resultError, output, maxBuffer);
  return {
    resultError,
    exitCode,
    signal,
    timedOut,
    isMaxBuffer
  };
};
var getResultError = (error, exitCode, signal) => {
  if (error !== void 0) {
    return error;
  }
  return isFailedExit(exitCode, signal) ? new DiscardedError() : void 0;
};

// node_modules/.pnpm/execa@9.6.0/node_modules/execa/lib/methods/main-sync.js
var execaCoreSync = (rawFile, rawArguments, rawOptions) => {
  const { file, commandArguments, command, escapedCommand, startTime, verboseInfo, options, fileDescriptors } = handleSyncArguments(rawFile, rawArguments, rawOptions);
  const result = spawnSubprocessSync({
    file,
    commandArguments,
    options,
    command,
    escapedCommand,
    verboseInfo,
    fileDescriptors,
    startTime
  });
  return handleResult(result, verboseInfo, options);
};
var handleSyncArguments = (rawFile, rawArguments, rawOptions) => {
  const { command, escapedCommand, startTime, verboseInfo } = handleCommand(rawFile, rawArguments, rawOptions);
  const syncOptions = normalizeSyncOptions(rawOptions);
  const { file, commandArguments, options } = normalizeOptions(rawFile, rawArguments, syncOptions);
  validateSyncOptions(options);
  const fileDescriptors = handleStdioSync(options, verboseInfo);
  return {
    file,
    commandArguments,
    command,
    escapedCommand,
    startTime,
    verboseInfo,
    options,
    fileDescriptors
  };
};
var normalizeSyncOptions = (options) => options.node && !options.ipc ? { ...options, ipc: false } : options;
var validateSyncOptions = ({ ipc, ipcInput, detached, cancelSignal }) => {
  if (ipcInput) {
    throwInvalidSyncOption("ipcInput");
  }
  if (ipc) {
    throwInvalidSyncOption("ipc: true");
  }
  if (detached) {
    throwInvalidSyncOption("detached: true");
  }
  if (cancelSignal) {
    throwInvalidSyncOption("cancelSignal");
  }
};
var throwInvalidSyncOption = (value) => {
  throw new TypeError(`The "${value}" option cannot be used with synchronous methods.`);
};
var spawnSubprocessSync = ({ file, commandArguments, options, command, escapedCommand, verboseInfo, fileDescriptors, startTime }) => {
  const syncResult = runSubprocessSync({
    file,
    commandArguments,
    options,
    command,
    escapedCommand,
    fileDescriptors,
    startTime
  });
  if (syncResult.failed) {
    return syncResult;
  }
  const { resultError, exitCode, signal, timedOut, isMaxBuffer } = getExitResultSync(syncResult, options);
  const { output, error = resultError } = transformOutputSync({
    fileDescriptors,
    syncResult,
    options,
    isMaxBuffer,
    verboseInfo
  });
  const stdio = output.map((stdioOutput, fdNumber) => stripNewline(stdioOutput, options, fdNumber));
  const all = stripNewline(getAllSync(output, options), options, "all");
  return getSyncResult({
    error,
    exitCode,
    signal,
    timedOut,
    isMaxBuffer,
    stdio,
    all,
    options,
    command,
    escapedCommand,
    startTime
  });
};
var runSubprocessSync = ({ file, commandArguments, options, command, escapedCommand, fileDescriptors, startTime }) => {
  try {
    addInputOptionsSync(fileDescriptors, options);
    const normalizedOptions = normalizeSpawnSyncOptions(options);
    return (0, import_node_child_process3.spawnSync)(...concatenateShell(file, commandArguments, normalizedOptions));
  } catch (error) {
    return makeEarlyError({
      error,
      command,
      escapedCommand,
      fileDescriptors,
      options,
      startTime,
      isSync: true
    });
  }
};
var normalizeSpawnSyncOptions = ({ encoding, maxBuffer, ...options }) => ({ ...options, encoding: "buffer", maxBuffer: getMaxBufferSync(maxBuffer) });
var getSyncResult = ({ error, exitCode, signal, timedOut, isMaxBuffer, stdio, all, options, command, escapedCommand, startTime }) => error === void 0 ? makeSuccessResult({
  command,
  escapedCommand,
  stdio,
  all,
  ipcOutput: [],
  options,
  startTime
}) : makeError({
  error,
  command,
  escapedCommand,
  timedOut,
  isCanceled: false,
  isGracefullyCanceled: false,
  isMaxBuffer,
  isForcefullyTerminated: false,
  exitCode,
  signal,
  stdio,
  all,
  ipcOutput: [],
  options,
  startTime,
  isSync: true
});

// node_modules/.pnpm/execa@9.6.0/node_modules/execa/lib/methods/main-async.js
var import_node_events14 = require("node:events");
var import_node_child_process5 = require("node:child_process");

// node_modules/.pnpm/execa@9.6.0/node_modules/execa/lib/ipc/methods.js
var import_node_process12 = __toESM(require("node:process"), 1);

// node_modules/.pnpm/execa@9.6.0/node_modules/execa/lib/ipc/get-one.js
var import_node_events8 = require("node:events");
var getOneMessage = ({ anyProcess, channel, isSubprocess, ipc }, { reference = true, filter } = {}) => {
  validateIpcMethod({
    methodName: "getOneMessage",
    isSubprocess,
    ipc,
    isConnected: isConnected(anyProcess)
  });
  return getOneMessageAsync({
    anyProcess,
    channel,
    isSubprocess,
    filter,
    reference
  });
};
var getOneMessageAsync = async ({ anyProcess, channel, isSubprocess, filter, reference }) => {
  addReference(channel, reference);
  const ipcEmitter = getIpcEmitter(anyProcess, channel, isSubprocess);
  const controller = new AbortController();
  try {
    return await Promise.race([
      getMessage(ipcEmitter, filter, controller),
      throwOnDisconnect2(ipcEmitter, isSubprocess, controller),
      throwOnStrictError(ipcEmitter, isSubprocess, controller)
    ]);
  } catch (error) {
    disconnect(anyProcess);
    throw error;
  } finally {
    controller.abort();
    removeReference(channel, reference);
  }
};
var getMessage = async (ipcEmitter, filter, { signal }) => {
  if (filter === void 0) {
    const [message] = await (0, import_node_events8.once)(ipcEmitter, "message", { signal });
    return message;
  }
  for await (const [message] of (0, import_node_events8.on)(ipcEmitter, "message", { signal })) {
    if (filter(message)) {
      return message;
    }
  }
};
var throwOnDisconnect2 = async (ipcEmitter, isSubprocess, { signal }) => {
  await (0, import_node_events8.once)(ipcEmitter, "disconnect", { signal });
  throwOnEarlyDisconnect(isSubprocess);
};
var throwOnStrictError = async (ipcEmitter, isSubprocess, { signal }) => {
  const [error] = await (0, import_node_events8.once)(ipcEmitter, "strict:error", { signal });
  throw getStrictResponseError(error, isSubprocess);
};

// node_modules/.pnpm/execa@9.6.0/node_modules/execa/lib/ipc/get-each.js
var import_node_events9 = require("node:events");
var getEachMessage = ({ anyProcess, channel, isSubprocess, ipc }, { reference = true } = {}) => loopOnMessages({
  anyProcess,
  channel,
  isSubprocess,
  ipc,
  shouldAwait: !isSubprocess,
  reference
});
var loopOnMessages = ({ anyProcess, channel, isSubprocess, ipc, shouldAwait, reference }) => {
  validateIpcMethod({
    methodName: "getEachMessage",
    isSubprocess,
    ipc,
    isConnected: isConnected(anyProcess)
  });
  addReference(channel, reference);
  const ipcEmitter = getIpcEmitter(anyProcess, channel, isSubprocess);
  const controller = new AbortController();
  const state = {};
  stopOnDisconnect(anyProcess, ipcEmitter, controller);
  abortOnStrictError({
    ipcEmitter,
    isSubprocess,
    controller,
    state
  });
  return iterateOnMessages({
    anyProcess,
    channel,
    ipcEmitter,
    isSubprocess,
    shouldAwait,
    controller,
    state,
    reference
  });
};
var stopOnDisconnect = async (anyProcess, ipcEmitter, controller) => {
  try {
    await (0, import_node_events9.once)(ipcEmitter, "disconnect", { signal: controller.signal });
    controller.abort();
  } catch {
  }
};
var abortOnStrictError = async ({ ipcEmitter, isSubprocess, controller, state }) => {
  try {
    const [error] = await (0, import_node_events9.once)(ipcEmitter, "strict:error", { signal: controller.signal });
    state.error = getStrictResponseError(error, isSubprocess);
    controller.abort();
  } catch {
  }
};
var iterateOnMessages = async function* ({ anyProcess, channel, ipcEmitter, isSubprocess, shouldAwait, controller, state, reference }) {
  try {
    for await (const [message] of (0, import_node_events9.on)(ipcEmitter, "message", { signal: controller.signal })) {
      throwIfStrictError(state);
      yield message;
    }
  } catch {
    throwIfStrictError(state);
  } finally {
    controller.abort();
    removeReference(channel, reference);
    if (!isSubprocess) {
      disconnect(anyProcess);
    }
    if (shouldAwait) {
      await anyProcess;
    }
  }
};
var throwIfStrictError = ({ error }) => {
  if (error) {
    throw error;
  }
};

// node_modules/.pnpm/execa@9.6.0/node_modules/execa/lib/ipc/methods.js
var addIpcMethods = (subprocess, { ipc }) => {
  Object.assign(subprocess, getIpcMethods(subprocess, false, ipc));
};
var getIpcExport = () => {
  const anyProcess = import_node_process12.default;
  const isSubprocess = true;
  const ipc = import_node_process12.default.channel !== void 0;
  return {
    ...getIpcMethods(anyProcess, isSubprocess, ipc),
    getCancelSignal: getCancelSignal.bind(void 0, {
      anyProcess,
      channel: anyProcess.channel,
      isSubprocess,
      ipc
    })
  };
};
var getIpcMethods = (anyProcess, isSubprocess, ipc) => ({
  sendMessage: sendMessage.bind(void 0, {
    anyProcess,
    channel: anyProcess.channel,
    isSubprocess,
    ipc
  }),
  getOneMessage: getOneMessage.bind(void 0, {
    anyProcess,
    channel: anyProcess.channel,
    isSubprocess,
    ipc
  }),
  getEachMessage: getEachMessage.bind(void 0, {
    anyProcess,
    channel: anyProcess.channel,
    isSubprocess,
    ipc
  })
});

// node_modules/.pnpm/execa@9.6.0/node_modules/execa/lib/return/early-error.js
var import_node_child_process4 = require("node:child_process");
var import_node_stream2 = require("node:stream");
var handleEarlyError = ({ error, command, escapedCommand, fileDescriptors, options, startTime, verboseInfo }) => {
  cleanupCustomStreams(fileDescriptors);
  const subprocess = new import_node_child_process4.ChildProcess();
  createDummyStreams(subprocess, fileDescriptors);
  Object.assign(subprocess, { readable, writable, duplex });
  const earlyError = makeEarlyError({
    error,
    command,
    escapedCommand,
    fileDescriptors,
    options,
    startTime,
    isSync: false
  });
  const promise = handleDummyPromise(earlyError, verboseInfo, options);
  return { subprocess, promise };
};
var createDummyStreams = (subprocess, fileDescriptors) => {
  const stdin = createDummyStream();
  const stdout = createDummyStream();
  const stderr = createDummyStream();
  const extraStdio = Array.from({ length: fileDescriptors.length - 3 }, createDummyStream);
  const all = createDummyStream();
  const stdio = [stdin, stdout, stderr, ...extraStdio];
  Object.assign(subprocess, {
    stdin,
    stdout,
    stderr,
    all,
    stdio
  });
};
var createDummyStream = () => {
  const stream = new import_node_stream2.PassThrough();
  stream.end();
  return stream;
};
var readable = () => new import_node_stream2.Readable({ read() {
} });
var writable = () => new import_node_stream2.Writable({ write() {
} });
var duplex = () => new import_node_stream2.Duplex({ read() {
}, write() {
} });
var handleDummyPromise = async (error, verboseInfo, options) => handleResult(error, verboseInfo, options);

// node_modules/.pnpm/execa@9.6.0/node_modules/execa/lib/stdio/handle-async.js
var import_node_fs12 = require("node:fs");
var import_node_buffer3 = require("node:buffer");
var import_node_stream3 = require("node:stream");
var handleStdioAsync = (options, verboseInfo) => handleStdio(addPropertiesAsync, options, verboseInfo, false);
var forbiddenIfAsync = ({ type, optionName }) => {
  throw new TypeError(`The \`${optionName}\` option cannot be ${TYPE_TO_MESSAGE[type]}.`);
};
var addProperties2 = {
  fileNumber: forbiddenIfAsync,
  generator: generatorToStream,
  asyncGenerator: generatorToStream,
  nodeStream: ({ value }) => ({ stream: value }),
  webTransform({ value: { transform, writableObjectMode, readableObjectMode } }) {
    const objectMode = writableObjectMode || readableObjectMode;
    const stream = import_node_stream3.Duplex.fromWeb(transform, { objectMode });
    return { stream };
  },
  duplex: ({ value: { transform } }) => ({ stream: transform }),
  native() {
  }
};
var addPropertiesAsync = {
  input: {
    ...addProperties2,
    fileUrl: ({ value }) => ({ stream: (0, import_node_fs12.createReadStream)(value) }),
    filePath: ({ value: { file } }) => ({ stream: (0, import_node_fs12.createReadStream)(file) }),
    webStream: ({ value }) => ({ stream: import_node_stream3.Readable.fromWeb(value) }),
    iterable: ({ value }) => ({ stream: import_node_stream3.Readable.from(value) }),
    asyncIterable: ({ value }) => ({ stream: import_node_stream3.Readable.from(value) }),
    string: ({ value }) => ({ stream: import_node_stream3.Readable.from(value) }),
    uint8Array: ({ value }) => ({ stream: import_node_stream3.Readable.from(import_node_buffer3.Buffer.from(value)) })
  },
  output: {
    ...addProperties2,
    fileUrl: ({ value }) => ({ stream: (0, import_node_fs12.createWriteStream)(value) }),
    filePath: ({ value: { file, append } }) => ({ stream: (0, import_node_fs12.createWriteStream)(file, append ? { flags: "a" } : {}) }),
    webStream: ({ value }) => ({ stream: import_node_stream3.Writable.fromWeb(value) }),
    iterable: forbiddenIfAsync,
    asyncIterable: forbiddenIfAsync,
    string: forbiddenIfAsync,
    uint8Array: forbiddenIfAsync
  }
};

// node_modules/.pnpm/@sindresorhus+merge-streams@4.0.0/node_modules/@sindresorhus/merge-streams/index.js
var import_node_events10 = require("node:events");
var import_node_stream4 = require("node:stream");
var import_promises6 = require("node:stream/promises");
function mergeStreams(streams) {
  if (!Array.isArray(streams)) {
    throw new TypeError(`Expected an array, got \`${typeof streams}\`.`);
  }
  for (const stream of streams) {
    validateStream(stream);
  }
  const objectMode = streams.some(({ readableObjectMode }) => readableObjectMode);
  const highWaterMark = getHighWaterMark(streams, objectMode);
  const passThroughStream = new MergedStream({
    objectMode,
    writableHighWaterMark: highWaterMark,
    readableHighWaterMark: highWaterMark
  });
  for (const stream of streams) {
    passThroughStream.add(stream);
  }
  return passThroughStream;
}
var getHighWaterMark = (streams, objectMode) => {
  if (streams.length === 0) {
    return (0, import_node_stream4.getDefaultHighWaterMark)(objectMode);
  }
  const highWaterMarks = streams.filter(({ readableObjectMode }) => readableObjectMode === objectMode).map(({ readableHighWaterMark }) => readableHighWaterMark);
  return Math.max(...highWaterMarks);
};
var MergedStream = class extends import_node_stream4.PassThrough {
  #streams = /* @__PURE__ */ new Set([]);
  #ended = /* @__PURE__ */ new Set([]);
  #aborted = /* @__PURE__ */ new Set([]);
  #onFinished;
  #unpipeEvent = Symbol("unpipe");
  #streamPromises = /* @__PURE__ */ new WeakMap();
  add(stream) {
    validateStream(stream);
    if (this.#streams.has(stream)) {
      return;
    }
    this.#streams.add(stream);
    this.#onFinished ??= onMergedStreamFinished(this, this.#streams, this.#unpipeEvent);
    const streamPromise = endWhenStreamsDone({
      passThroughStream: this,
      stream,
      streams: this.#streams,
      ended: this.#ended,
      aborted: this.#aborted,
      onFinished: this.#onFinished,
      unpipeEvent: this.#unpipeEvent
    });
    this.#streamPromises.set(stream, streamPromise);
    stream.pipe(this, { end: false });
  }
  async remove(stream) {
    validateStream(stream);
    if (!this.#streams.has(stream)) {
      return false;
    }
    const streamPromise = this.#streamPromises.get(stream);
    if (streamPromise === void 0) {
      return false;
    }
    this.#streamPromises.delete(stream);
    stream.unpipe(this);
    await streamPromise;
    return true;
  }
};
var onMergedStreamFinished = async (passThroughStream, streams, unpipeEvent) => {
  updateMaxListeners(passThroughStream, PASSTHROUGH_LISTENERS_COUNT);
  const controller = new AbortController();
  try {
    await Promise.race([
      onMergedStreamEnd(passThroughStream, controller),
      onInputStreamsUnpipe(passThroughStream, streams, unpipeEvent, controller)
    ]);
  } finally {
    controller.abort();
    updateMaxListeners(passThroughStream, -PASSTHROUGH_LISTENERS_COUNT);
  }
};
var onMergedStreamEnd = async (passThroughStream, { signal }) => {
  try {
    await (0, import_promises6.finished)(passThroughStream, { signal, cleanup: true });
  } catch (error) {
    errorOrAbortStream(passThroughStream, error);
    throw error;
  }
};
var onInputStreamsUnpipe = async (passThroughStream, streams, unpipeEvent, { signal }) => {
  for await (const [unpipedStream] of (0, import_node_events10.on)(passThroughStream, "unpipe", { signal })) {
    if (streams.has(unpipedStream)) {
      unpipedStream.emit(unpipeEvent);
    }
  }
};
var validateStream = (stream) => {
  if (typeof (stream == null ? void 0 : stream.pipe) !== "function") {
    throw new TypeError(`Expected a readable stream, got: \`${typeof stream}\`.`);
  }
};
var endWhenStreamsDone = async ({ passThroughStream, stream, streams, ended, aborted: aborted2, onFinished, unpipeEvent }) => {
  updateMaxListeners(passThroughStream, PASSTHROUGH_LISTENERS_PER_STREAM);
  const controller = new AbortController();
  try {
    await Promise.race([
      afterMergedStreamFinished(onFinished, stream, controller),
      onInputStreamEnd({
        passThroughStream,
        stream,
        streams,
        ended,
        aborted: aborted2,
        controller
      }),
      onInputStreamUnpipe({
        stream,
        streams,
        ended,
        aborted: aborted2,
        unpipeEvent,
        controller
      })
    ]);
  } finally {
    controller.abort();
    updateMaxListeners(passThroughStream, -PASSTHROUGH_LISTENERS_PER_STREAM);
  }
  if (streams.size > 0 && streams.size === ended.size + aborted2.size) {
    if (ended.size === 0 && aborted2.size > 0) {
      abortStream(passThroughStream);
    } else {
      endStream(passThroughStream);
    }
  }
};
var afterMergedStreamFinished = async (onFinished, stream, { signal }) => {
  try {
    await onFinished;
    if (!signal.aborted) {
      abortStream(stream);
    }
  } catch (error) {
    if (!signal.aborted) {
      errorOrAbortStream(stream, error);
    }
  }
};
var onInputStreamEnd = async ({ passThroughStream, stream, streams, ended, aborted: aborted2, controller: { signal } }) => {
  try {
    await (0, import_promises6.finished)(stream, {
      signal,
      cleanup: true,
      readable: true,
      writable: false
    });
    if (streams.has(stream)) {
      ended.add(stream);
    }
  } catch (error) {
    if (signal.aborted || !streams.has(stream)) {
      return;
    }
    if (isAbortError(error)) {
      aborted2.add(stream);
    } else {
      errorStream(passThroughStream, error);
    }
  }
};
var onInputStreamUnpipe = async ({ stream, streams, ended, aborted: aborted2, unpipeEvent, controller: { signal } }) => {
  await (0, import_node_events10.once)(stream, unpipeEvent, { signal });
  if (!stream.readable) {
    return (0, import_node_events10.once)(signal, "abort", { signal });
  }
  streams.delete(stream);
  ended.delete(stream);
  aborted2.delete(stream);
};
var endStream = (stream) => {
  if (stream.writable) {
    stream.end();
  }
};
var errorOrAbortStream = (stream, error) => {
  if (isAbortError(error)) {
    abortStream(stream);
  } else {
    errorStream(stream, error);
  }
};
var isAbortError = (error) => (error == null ? void 0 : error.code) === "ERR_STREAM_PREMATURE_CLOSE";
var abortStream = (stream) => {
  if (stream.readable || stream.writable) {
    stream.destroy();
  }
};
var errorStream = (stream, error) => {
  if (!stream.destroyed) {
    stream.once("error", noop2);
    stream.destroy(error);
  }
};
var noop2 = () => {
};
var updateMaxListeners = (passThroughStream, increment2) => {
  const maxListeners = passThroughStream.getMaxListeners();
  if (maxListeners !== 0 && maxListeners !== Number.POSITIVE_INFINITY) {
    passThroughStream.setMaxListeners(maxListeners + increment2);
  }
};
var PASSTHROUGH_LISTENERS_COUNT = 2;
var PASSTHROUGH_LISTENERS_PER_STREAM = 1;

// node_modules/.pnpm/execa@9.6.0/node_modules/execa/lib/io/pipeline.js
var import_promises7 = require("node:stream/promises");
var pipeStreams = (source, destination) => {
  source.pipe(destination);
  onSourceFinish(source, destination);
  onDestinationFinish(source, destination);
};
var onSourceFinish = async (source, destination) => {
  if (isStandardStream(source) || isStandardStream(destination)) {
    return;
  }
  try {
    await (0, import_promises7.finished)(source, { cleanup: true, readable: true, writable: false });
  } catch {
  }
  endDestinationStream(destination);
};
var endDestinationStream = (destination) => {
  if (destination.writable) {
    destination.end();
  }
};
var onDestinationFinish = async (source, destination) => {
  if (isStandardStream(source) || isStandardStream(destination)) {
    return;
  }
  try {
    await (0, import_promises7.finished)(destination, { cleanup: true, readable: false, writable: true });
  } catch {
  }
  abortSourceStream(source);
};
var abortSourceStream = (source) => {
  if (source.readable) {
    source.destroy();
  }
};

// node_modules/.pnpm/execa@9.6.0/node_modules/execa/lib/io/output-async.js
var pipeOutputAsync = (subprocess, fileDescriptors, controller) => {
  const pipeGroups = /* @__PURE__ */ new Map();
  for (const [fdNumber, { stdioItems, direction }] of Object.entries(fileDescriptors)) {
    for (const { stream } of stdioItems.filter(({ type }) => TRANSFORM_TYPES.has(type))) {
      pipeTransform(subprocess, stream, direction, fdNumber);
    }
    for (const { stream } of stdioItems.filter(({ type }) => !TRANSFORM_TYPES.has(type))) {
      pipeStdioItem({
        subprocess,
        stream,
        direction,
        fdNumber,
        pipeGroups,
        controller
      });
    }
  }
  for (const [outputStream, inputStreams] of pipeGroups.entries()) {
    const inputStream = inputStreams.length === 1 ? inputStreams[0] : mergeStreams(inputStreams);
    pipeStreams(inputStream, outputStream);
  }
};
var pipeTransform = (subprocess, stream, direction, fdNumber) => {
  if (direction === "output") {
    pipeStreams(subprocess.stdio[fdNumber], stream);
  } else {
    pipeStreams(stream, subprocess.stdio[fdNumber]);
  }
  const streamProperty = SUBPROCESS_STREAM_PROPERTIES[fdNumber];
  if (streamProperty !== void 0) {
    subprocess[streamProperty] = stream;
  }
  subprocess.stdio[fdNumber] = stream;
};
var SUBPROCESS_STREAM_PROPERTIES = ["stdin", "stdout", "stderr"];
var pipeStdioItem = ({ subprocess, stream, direction, fdNumber, pipeGroups, controller }) => {
  if (stream === void 0) {
    return;
  }
  setStandardStreamMaxListeners(stream, controller);
  const [inputStream, outputStream] = direction === "output" ? [stream, subprocess.stdio[fdNumber]] : [subprocess.stdio[fdNumber], stream];
  const outputStreams = pipeGroups.get(inputStream) ?? [];
  pipeGroups.set(inputStream, [...outputStreams, outputStream]);
};
var setStandardStreamMaxListeners = (stream, { signal }) => {
  if (isStandardStream(stream)) {
    incrementMaxListeners(stream, MAX_LISTENERS_INCREMENT, signal);
  }
};
var MAX_LISTENERS_INCREMENT = 2;

// node_modules/.pnpm/execa@9.6.0/node_modules/execa/lib/terminate/cleanup.js
var import_node_events11 = require("node:events");

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
var processOk = (process10) => !!process10 && typeof process10 === "object" && typeof process10.removeListener === "function" && typeof process10.emit === "function" && typeof process10.reallyExit === "function" && typeof process10.listeners === "function" && typeof process10.kill === "function" && typeof process10.pid === "number" && typeof process10.on === "function";
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
    const i2 = list.indexOf(fn);
    if (i2 === -1) {
      return;
    }
    if (i2 === 0 && list.length === 1) {
      list.length = 0;
    } else {
      list.splice(i2, 1);
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
  #hupSig = process9.platform === "win32" ? "SIGINT" : "SIGHUP";
  /* c8 ignore stop */
  #emitter = new Emitter();
  #process;
  #originalProcessEmit;
  #originalProcessReallyExit;
  #sigListeners = {};
  #loaded = false;
  constructor(process10) {
    super();
    this.#process = process10;
    this.#sigListeners = {};
    for (const sig of signals) {
      this.#sigListeners[sig] = () => {
        const listeners = this.#process.listeners(sig);
        let { count: count2 } = this.#emitter;
        const p = process10;
        if (typeof p.__signal_exit_emitter__ === "object" && typeof p.__signal_exit_emitter__.count === "number") {
          count2 += p.__signal_exit_emitter__.count;
        }
        if (listeners.length === count2) {
          this.unload();
          const ret = this.#emitter.emit("exit", null, sig);
          const s2 = sig === "SIGHUP" ? this.#hupSig : sig;
          if (!ret)
            process10.kill(process10.pid, s2);
        }
      };
    }
    this.#originalProcessReallyExit = process10.reallyExit;
    this.#originalProcessEmit = process10.emit;
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
    this.#process.emit = (ev, ...a4) => {
      return this.#processEmit(ev, ...a4);
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
var process9 = globalThis.process;
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
} = signalExitWrap(processOk(process9) ? new SignalExit(process9) : new SignalExitFallback());

// node_modules/.pnpm/execa@9.6.0/node_modules/execa/lib/terminate/cleanup.js
var cleanupOnExit = (subprocess, { cleanup, detached }, { signal }) => {
  if (!cleanup || detached) {
    return;
  }
  const removeExitHandler = onExit(() => {
    subprocess.kill();
  });
  (0, import_node_events11.addAbortListener)(signal, () => {
    removeExitHandler();
  });
};

// node_modules/.pnpm/execa@9.6.0/node_modules/execa/lib/pipe/pipe-arguments.js
var normalizePipeArguments = ({ source, sourcePromise, boundOptions, createNested }, ...pipeArguments) => {
  const startTime = getStartTime();
  const {
    destination,
    destinationStream,
    destinationError,
    from,
    unpipeSignal
  } = getDestinationStream(boundOptions, createNested, pipeArguments);
  const { sourceStream, sourceError } = getSourceStream(source, from);
  const { options: sourceOptions, fileDescriptors } = SUBPROCESS_OPTIONS.get(source);
  return {
    sourcePromise,
    sourceStream,
    sourceOptions,
    sourceError,
    destination,
    destinationStream,
    destinationError,
    unpipeSignal,
    fileDescriptors,
    startTime
  };
};
var getDestinationStream = (boundOptions, createNested, pipeArguments) => {
  try {
    const {
      destination,
      pipeOptions: { from, to, unpipeSignal } = {}
    } = getDestination(boundOptions, createNested, ...pipeArguments);
    const destinationStream = getToStream(destination, to);
    return {
      destination,
      destinationStream,
      from,
      unpipeSignal
    };
  } catch (error) {
    return { destinationError: error };
  }
};
var getDestination = (boundOptions, createNested, firstArgument, ...pipeArguments) => {
  if (Array.isArray(firstArgument)) {
    const destination = createNested(mapDestinationArguments, boundOptions)(firstArgument, ...pipeArguments);
    return { destination, pipeOptions: boundOptions };
  }
  if (typeof firstArgument === "string" || firstArgument instanceof URL || isDenoExecPath(firstArgument)) {
    if (Object.keys(boundOptions).length > 0) {
      throw new TypeError('Please use .pipe("file", ..., options) or .pipe(execa("file", ..., options)) instead of .pipe(options)("file", ...).');
    }
    const [rawFile, rawArguments, rawOptions] = normalizeParameters(firstArgument, ...pipeArguments);
    const destination = createNested(mapDestinationArguments)(rawFile, rawArguments, rawOptions);
    return { destination, pipeOptions: rawOptions };
  }
  if (SUBPROCESS_OPTIONS.has(firstArgument)) {
    if (Object.keys(boundOptions).length > 0) {
      throw new TypeError("Please use .pipe(options)`command` or .pipe($(options)`command`) instead of .pipe(options)($`command`).");
    }
    return { destination: firstArgument, pipeOptions: pipeArguments[0] };
  }
  throw new TypeError(`The first argument must be a template string, an options object, or an Execa subprocess: ${firstArgument}`);
};
var mapDestinationArguments = ({ options }) => ({ options: { ...options, stdin: "pipe", piped: true } });
var getSourceStream = (source, from) => {
  try {
    const sourceStream = getFromStream(source, from);
    return { sourceStream };
  } catch (error) {
    return { sourceError: error };
  }
};

// node_modules/.pnpm/execa@9.6.0/node_modules/execa/lib/pipe/throw.js
var handlePipeArgumentsError = ({
  sourceStream,
  sourceError,
  destinationStream,
  destinationError,
  fileDescriptors,
  sourceOptions,
  startTime
}) => {
  const error = getPipeArgumentsError({
    sourceStream,
    sourceError,
    destinationStream,
    destinationError
  });
  if (error !== void 0) {
    throw createNonCommandError({
      error,
      fileDescriptors,
      sourceOptions,
      startTime
    });
  }
};
var getPipeArgumentsError = ({ sourceStream, sourceError, destinationStream, destinationError }) => {
  if (sourceError !== void 0 && destinationError !== void 0) {
    return destinationError;
  }
  if (destinationError !== void 0) {
    abortSourceStream(sourceStream);
    return destinationError;
  }
  if (sourceError !== void 0) {
    endDestinationStream(destinationStream);
    return sourceError;
  }
};
var createNonCommandError = ({ error, fileDescriptors, sourceOptions, startTime }) => makeEarlyError({
  error,
  command: PIPE_COMMAND_MESSAGE,
  escapedCommand: PIPE_COMMAND_MESSAGE,
  fileDescriptors,
  options: sourceOptions,
  startTime,
  isSync: false
});
var PIPE_COMMAND_MESSAGE = "source.pipe(destination)";

// node_modules/.pnpm/execa@9.6.0/node_modules/execa/lib/pipe/sequence.js
var waitForBothSubprocesses = async (subprocessPromises) => {
  const [
    { status: sourceStatus, reason: sourceReason, value: sourceResult = sourceReason },
    { status: destinationStatus, reason: destinationReason, value: destinationResult = destinationReason }
  ] = await subprocessPromises;
  if (!destinationResult.pipedFrom.includes(sourceResult)) {
    destinationResult.pipedFrom.push(sourceResult);
  }
  if (destinationStatus === "rejected") {
    throw destinationResult;
  }
  if (sourceStatus === "rejected") {
    throw sourceResult;
  }
  return destinationResult;
};

// node_modules/.pnpm/execa@9.6.0/node_modules/execa/lib/pipe/streaming.js
var import_promises8 = require("node:stream/promises");
var pipeSubprocessStream = (sourceStream, destinationStream, maxListenersController) => {
  const mergedStream = MERGED_STREAMS.has(destinationStream) ? pipeMoreSubprocessStream(sourceStream, destinationStream) : pipeFirstSubprocessStream(sourceStream, destinationStream);
  incrementMaxListeners(sourceStream, SOURCE_LISTENERS_PER_PIPE, maxListenersController.signal);
  incrementMaxListeners(destinationStream, DESTINATION_LISTENERS_PER_PIPE, maxListenersController.signal);
  cleanupMergedStreamsMap(destinationStream);
  return mergedStream;
};
var pipeFirstSubprocessStream = (sourceStream, destinationStream) => {
  const mergedStream = mergeStreams([sourceStream]);
  pipeStreams(mergedStream, destinationStream);
  MERGED_STREAMS.set(destinationStream, mergedStream);
  return mergedStream;
};
var pipeMoreSubprocessStream = (sourceStream, destinationStream) => {
  const mergedStream = MERGED_STREAMS.get(destinationStream);
  mergedStream.add(sourceStream);
  return mergedStream;
};
var cleanupMergedStreamsMap = async (destinationStream) => {
  try {
    await (0, import_promises8.finished)(destinationStream, { cleanup: true, readable: false, writable: true });
  } catch {
  }
  MERGED_STREAMS.delete(destinationStream);
};
var MERGED_STREAMS = /* @__PURE__ */ new WeakMap();
var SOURCE_LISTENERS_PER_PIPE = 2;
var DESTINATION_LISTENERS_PER_PIPE = 1;

// node_modules/.pnpm/execa@9.6.0/node_modules/execa/lib/pipe/abort.js
var import_node_util8 = require("node:util");
var unpipeOnAbort = (unpipeSignal, unpipeContext) => unpipeSignal === void 0 ? [] : [unpipeOnSignalAbort(unpipeSignal, unpipeContext)];
var unpipeOnSignalAbort = async (unpipeSignal, { sourceStream, mergedStream, fileDescriptors, sourceOptions, startTime }) => {
  await (0, import_node_util8.aborted)(unpipeSignal, sourceStream);
  await mergedStream.remove(sourceStream);
  const error = new Error("Pipe canceled by `unpipeSignal` option.");
  throw createNonCommandError({
    error,
    fileDescriptors,
    sourceOptions,
    startTime
  });
};

// node_modules/.pnpm/execa@9.6.0/node_modules/execa/lib/pipe/setup.js
var pipeToSubprocess = (sourceInfo, ...pipeArguments) => {
  if (isPlainObject(pipeArguments[0])) {
    return pipeToSubprocess.bind(void 0, {
      ...sourceInfo,
      boundOptions: { ...sourceInfo.boundOptions, ...pipeArguments[0] }
    });
  }
  const { destination, ...normalizedInfo } = normalizePipeArguments(sourceInfo, ...pipeArguments);
  const promise = handlePipePromise({ ...normalizedInfo, destination });
  promise.pipe = pipeToSubprocess.bind(void 0, {
    ...sourceInfo,
    source: destination,
    sourcePromise: promise,
    boundOptions: {}
  });
  return promise;
};
var handlePipePromise = async ({
  sourcePromise,
  sourceStream,
  sourceOptions,
  sourceError,
  destination,
  destinationStream,
  destinationError,
  unpipeSignal,
  fileDescriptors,
  startTime
}) => {
  const subprocessPromises = getSubprocessPromises(sourcePromise, destination);
  handlePipeArgumentsError({
    sourceStream,
    sourceError,
    destinationStream,
    destinationError,
    fileDescriptors,
    sourceOptions,
    startTime
  });
  const maxListenersController = new AbortController();
  try {
    const mergedStream = pipeSubprocessStream(sourceStream, destinationStream, maxListenersController);
    return await Promise.race([
      waitForBothSubprocesses(subprocessPromises),
      ...unpipeOnAbort(unpipeSignal, {
        sourceStream,
        mergedStream,
        sourceOptions,
        fileDescriptors,
        startTime
      })
    ]);
  } finally {
    maxListenersController.abort();
  }
};
var getSubprocessPromises = (sourcePromise, destination) => Promise.allSettled([sourcePromise, destination]);

// node_modules/.pnpm/execa@9.6.0/node_modules/execa/lib/io/contents.js
var import_promises9 = require("node:timers/promises");

// node_modules/.pnpm/execa@9.6.0/node_modules/execa/lib/io/iterate.js
var import_node_events12 = require("node:events");
var import_node_stream5 = require("node:stream");
var iterateOnSubprocessStream = ({ subprocessStdout, subprocess, binary, shouldEncode, encoding, preserveNewlines }) => {
  const controller = new AbortController();
  stopReadingOnExit(subprocess, controller);
  return iterateOnStream({
    stream: subprocessStdout,
    controller,
    binary,
    shouldEncode: !subprocessStdout.readableObjectMode && shouldEncode,
    encoding,
    shouldSplit: !subprocessStdout.readableObjectMode,
    preserveNewlines
  });
};
var stopReadingOnExit = async (subprocess, controller) => {
  try {
    await subprocess;
  } catch {
  } finally {
    controller.abort();
  }
};
var iterateForResult = ({ stream, onStreamEnd, lines, encoding, stripFinalNewline: stripFinalNewline2, allMixed }) => {
  const controller = new AbortController();
  stopReadingOnStreamEnd(onStreamEnd, controller, stream);
  const objectMode = stream.readableObjectMode && !allMixed;
  return iterateOnStream({
    stream,
    controller,
    binary: encoding === "buffer",
    shouldEncode: !objectMode,
    encoding,
    shouldSplit: !objectMode && lines,
    preserveNewlines: !stripFinalNewline2
  });
};
var stopReadingOnStreamEnd = async (onStreamEnd, controller, stream) => {
  try {
    await onStreamEnd;
  } catch {
    stream.destroy();
  } finally {
    controller.abort();
  }
};
var iterateOnStream = ({ stream, controller, binary, shouldEncode, encoding, shouldSplit, preserveNewlines }) => {
  const onStdoutChunk = (0, import_node_events12.on)(stream, "data", {
    signal: controller.signal,
    highWaterMark: HIGH_WATER_MARK,
    // Backward compatibility with older name for this option
    // See https://github.com/nodejs/node/pull/52080#discussion_r1525227861
    // @todo Remove after removing support for Node 21
    highWatermark: HIGH_WATER_MARK
  });
  return iterateOnData({
    onStdoutChunk,
    controller,
    binary,
    shouldEncode,
    encoding,
    shouldSplit,
    preserveNewlines
  });
};
var DEFAULT_OBJECT_HIGH_WATER_MARK = (0, import_node_stream5.getDefaultHighWaterMark)(true);
var HIGH_WATER_MARK = DEFAULT_OBJECT_HIGH_WATER_MARK;
var iterateOnData = async function* ({ onStdoutChunk, controller, binary, shouldEncode, encoding, shouldSplit, preserveNewlines }) {
  const generators = getGenerators({
    binary,
    shouldEncode,
    encoding,
    shouldSplit,
    preserveNewlines
  });
  try {
    for await (const [chunk] of onStdoutChunk) {
      yield* transformChunkSync(chunk, generators, 0);
    }
  } catch (error) {
    if (!controller.signal.aborted) {
      throw error;
    }
  } finally {
    yield* finalChunksSync(generators);
  }
};
var getGenerators = ({ binary, shouldEncode, encoding, shouldSplit, preserveNewlines }) => [
  getEncodingTransformGenerator(binary, encoding, !shouldEncode),
  getSplitLinesGenerator(binary, preserveNewlines, !shouldSplit, {})
].filter(Boolean);

// node_modules/.pnpm/execa@9.6.0/node_modules/execa/lib/io/contents.js
var getStreamOutput = async ({ stream, onStreamEnd, fdNumber, encoding, buffer, maxBuffer, lines, allMixed, stripFinalNewline: stripFinalNewline2, verboseInfo, streamInfo }) => {
  const logPromise = logOutputAsync({
    stream,
    onStreamEnd,
    fdNumber,
    encoding,
    allMixed,
    verboseInfo,
    streamInfo
  });
  if (!buffer) {
    await Promise.all([resumeStream(stream), logPromise]);
    return;
  }
  const stripFinalNewlineValue = getStripFinalNewline(stripFinalNewline2, fdNumber);
  const iterable = iterateForResult({
    stream,
    onStreamEnd,
    lines,
    encoding,
    stripFinalNewline: stripFinalNewlineValue,
    allMixed
  });
  const [output] = await Promise.all([
    getStreamContents2({
      stream,
      iterable,
      fdNumber,
      encoding,
      maxBuffer,
      lines
    }),
    logPromise
  ]);
  return output;
};
var logOutputAsync = async ({ stream, onStreamEnd, fdNumber, encoding, allMixed, verboseInfo, streamInfo: { fileDescriptors } }) => {
  var _a2;
  if (!shouldLogOutput({
    stdioItems: (_a2 = fileDescriptors[fdNumber]) == null ? void 0 : _a2.stdioItems,
    encoding,
    verboseInfo,
    fdNumber
  })) {
    return;
  }
  const linesIterable = iterateForResult({
    stream,
    onStreamEnd,
    lines: true,
    encoding,
    stripFinalNewline: true,
    allMixed
  });
  await logLines(linesIterable, stream, fdNumber, verboseInfo);
};
var resumeStream = async (stream) => {
  await (0, import_promises9.setImmediate)();
  if (stream.readableFlowing === null) {
    stream.resume();
  }
};
var getStreamContents2 = async ({ stream, stream: { readableObjectMode }, iterable, fdNumber, encoding, maxBuffer, lines }) => {
  try {
    if (readableObjectMode || lines) {
      return await getStreamAsArray(iterable, { maxBuffer });
    }
    if (encoding === "buffer") {
      return new Uint8Array(await getStreamAsArrayBuffer(iterable, { maxBuffer }));
    }
    return await getStreamAsString(iterable, { maxBuffer });
  } catch (error) {
    return handleBufferedData(handleMaxBuffer({
      error,
      stream,
      readableObjectMode,
      lines,
      encoding,
      fdNumber
    }));
  }
};
var getBufferedData = async (streamPromise) => {
  try {
    return await streamPromise;
  } catch (error) {
    return handleBufferedData(error);
  }
};
var handleBufferedData = ({ bufferedData }) => isArrayBuffer(bufferedData) ? new Uint8Array(bufferedData) : bufferedData;

// node_modules/.pnpm/execa@9.6.0/node_modules/execa/lib/resolve/wait-stream.js
var import_promises10 = require("node:stream/promises");
var waitForStream = async (stream, fdNumber, streamInfo, { isSameDirection, stopOnExit = false } = {}) => {
  const state = handleStdinDestroy(stream, streamInfo);
  const abortController = new AbortController();
  try {
    await Promise.race([
      ...stopOnExit ? [streamInfo.exitPromise] : [],
      (0, import_promises10.finished)(stream, { cleanup: true, signal: abortController.signal })
    ]);
  } catch (error) {
    if (!state.stdinCleanedUp) {
      handleStreamError(error, fdNumber, streamInfo, isSameDirection);
    }
  } finally {
    abortController.abort();
  }
};
var handleStdinDestroy = (stream, { originalStreams: [originalStdin], subprocess }) => {
  const state = { stdinCleanedUp: false };
  if (stream === originalStdin) {
    spyOnStdinDestroy(stream, subprocess, state);
  }
  return state;
};
var spyOnStdinDestroy = (subprocessStdin, subprocess, state) => {
  const { _destroy } = subprocessStdin;
  subprocessStdin._destroy = (...destroyArguments) => {
    setStdinCleanedUp(subprocess, state);
    _destroy.call(subprocessStdin, ...destroyArguments);
  };
};
var setStdinCleanedUp = ({ exitCode, signalCode }, state) => {
  if (exitCode !== null || signalCode !== null) {
    state.stdinCleanedUp = true;
  }
};
var handleStreamError = (error, fdNumber, streamInfo, isSameDirection) => {
  if (!shouldIgnoreStreamError(error, fdNumber, streamInfo, isSameDirection)) {
    throw error;
  }
};
var shouldIgnoreStreamError = (error, fdNumber, streamInfo, isSameDirection = true) => {
  if (streamInfo.propagating) {
    return isStreamEpipe(error) || isStreamAbort(error);
  }
  streamInfo.propagating = true;
  return isInputFileDescriptor(streamInfo, fdNumber) === isSameDirection ? isStreamEpipe(error) : isStreamAbort(error);
};
var isInputFileDescriptor = ({ fileDescriptors }, fdNumber) => fdNumber !== "all" && fileDescriptors[fdNumber].direction === "input";
var isStreamAbort = (error) => (error == null ? void 0 : error.code) === "ERR_STREAM_PREMATURE_CLOSE";
var isStreamEpipe = (error) => (error == null ? void 0 : error.code) === "EPIPE";

// node_modules/.pnpm/execa@9.6.0/node_modules/execa/lib/resolve/stdio.js
var waitForStdioStreams = ({ subprocess, encoding, buffer, maxBuffer, lines, stripFinalNewline: stripFinalNewline2, verboseInfo, streamInfo }) => subprocess.stdio.map((stream, fdNumber) => waitForSubprocessStream({
  stream,
  fdNumber,
  encoding,
  buffer: buffer[fdNumber],
  maxBuffer: maxBuffer[fdNumber],
  lines: lines[fdNumber],
  allMixed: false,
  stripFinalNewline: stripFinalNewline2,
  verboseInfo,
  streamInfo
}));
var waitForSubprocessStream = async ({ stream, fdNumber, encoding, buffer, maxBuffer, lines, allMixed, stripFinalNewline: stripFinalNewline2, verboseInfo, streamInfo }) => {
  if (!stream) {
    return;
  }
  const onStreamEnd = waitForStream(stream, fdNumber, streamInfo);
  if (isInputFileDescriptor(streamInfo, fdNumber)) {
    await onStreamEnd;
    return;
  }
  const [output] = await Promise.all([
    getStreamOutput({
      stream,
      onStreamEnd,
      fdNumber,
      encoding,
      buffer,
      maxBuffer,
      lines,
      allMixed,
      stripFinalNewline: stripFinalNewline2,
      verboseInfo,
      streamInfo
    }),
    onStreamEnd
  ]);
  return output;
};

// node_modules/.pnpm/execa@9.6.0/node_modules/execa/lib/resolve/all-async.js
var makeAllStream = ({ stdout, stderr }, { all }) => all && (stdout || stderr) ? mergeStreams([stdout, stderr].filter(Boolean)) : void 0;
var waitForAllStream = ({ subprocess, encoding, buffer, maxBuffer, lines, stripFinalNewline: stripFinalNewline2, verboseInfo, streamInfo }) => waitForSubprocessStream({
  ...getAllStream(subprocess, buffer),
  fdNumber: "all",
  encoding,
  maxBuffer: maxBuffer[1] + maxBuffer[2],
  lines: lines[1] || lines[2],
  allMixed: getAllMixed(subprocess),
  stripFinalNewline: stripFinalNewline2,
  verboseInfo,
  streamInfo
});
var getAllStream = ({ stdout, stderr, all }, [, bufferStdout, bufferStderr]) => {
  const buffer = bufferStdout || bufferStderr;
  if (!buffer) {
    return { stream: all, buffer };
  }
  if (!bufferStdout) {
    return { stream: stderr, buffer };
  }
  if (!bufferStderr) {
    return { stream: stdout, buffer };
  }
  return { stream: all, buffer };
};
var getAllMixed = ({ all, stdout, stderr }) => all && stdout && stderr && stdout.readableObjectMode !== stderr.readableObjectMode;

// node_modules/.pnpm/execa@9.6.0/node_modules/execa/lib/resolve/wait-subprocess.js
var import_node_events13 = require("node:events");

// node_modules/.pnpm/execa@9.6.0/node_modules/execa/lib/verbose/ipc.js
var shouldLogIpc = (verboseInfo) => isFullVerbose(verboseInfo, "ipc");
var logIpcOutput = (message, verboseInfo) => {
  const verboseMessage = serializeVerboseMessage(message);
  verboseLog({
    type: "ipc",
    verboseMessage,
    fdNumber: "ipc",
    verboseInfo
  });
};

// node_modules/.pnpm/execa@9.6.0/node_modules/execa/lib/ipc/buffer-messages.js
var waitForIpcOutput = async ({
  subprocess,
  buffer: bufferArray,
  maxBuffer: maxBufferArray,
  ipc,
  ipcOutput,
  verboseInfo
}) => {
  if (!ipc) {
    return ipcOutput;
  }
  const isVerbose2 = shouldLogIpc(verboseInfo);
  const buffer = getFdSpecificValue(bufferArray, "ipc");
  const maxBuffer = getFdSpecificValue(maxBufferArray, "ipc");
  for await (const message of loopOnMessages({
    anyProcess: subprocess,
    channel: subprocess.channel,
    isSubprocess: false,
    ipc,
    shouldAwait: false,
    reference: true
  })) {
    if (buffer) {
      checkIpcMaxBuffer(subprocess, ipcOutput, maxBuffer);
      ipcOutput.push(message);
    }
    if (isVerbose2) {
      logIpcOutput(message, verboseInfo);
    }
  }
  return ipcOutput;
};
var getBufferedIpcOutput = async (ipcOutputPromise, ipcOutput) => {
  await Promise.allSettled([ipcOutputPromise]);
  return ipcOutput;
};

// node_modules/.pnpm/execa@9.6.0/node_modules/execa/lib/resolve/wait-subprocess.js
var waitForSubprocessResult = async ({
  subprocess,
  options: {
    encoding,
    buffer,
    maxBuffer,
    lines,
    timeoutDuration: timeout,
    cancelSignal,
    gracefulCancel,
    forceKillAfterDelay,
    stripFinalNewline: stripFinalNewline2,
    ipc,
    ipcInput
  },
  context,
  verboseInfo,
  fileDescriptors,
  originalStreams,
  onInternalError,
  controller
}) => {
  const exitPromise = waitForExit(subprocess, context);
  const streamInfo = {
    originalStreams,
    fileDescriptors,
    subprocess,
    exitPromise,
    propagating: false
  };
  const stdioPromises = waitForStdioStreams({
    subprocess,
    encoding,
    buffer,
    maxBuffer,
    lines,
    stripFinalNewline: stripFinalNewline2,
    verboseInfo,
    streamInfo
  });
  const allPromise = waitForAllStream({
    subprocess,
    encoding,
    buffer,
    maxBuffer,
    lines,
    stripFinalNewline: stripFinalNewline2,
    verboseInfo,
    streamInfo
  });
  const ipcOutput = [];
  const ipcOutputPromise = waitForIpcOutput({
    subprocess,
    buffer,
    maxBuffer,
    ipc,
    ipcOutput,
    verboseInfo
  });
  const originalPromises = waitForOriginalStreams(originalStreams, subprocess, streamInfo);
  const customStreamsEndPromises = waitForCustomStreamsEnd(fileDescriptors, streamInfo);
  try {
    return await Promise.race([
      Promise.all([
        {},
        waitForSuccessfulExit(exitPromise),
        Promise.all(stdioPromises),
        allPromise,
        ipcOutputPromise,
        sendIpcInput(subprocess, ipcInput),
        ...originalPromises,
        ...customStreamsEndPromises
      ]),
      onInternalError,
      throwOnSubprocessError(subprocess, controller),
      ...throwOnTimeout(subprocess, timeout, context, controller),
      ...throwOnCancel({
        subprocess,
        cancelSignal,
        gracefulCancel,
        context,
        controller
      }),
      ...throwOnGracefulCancel({
        subprocess,
        cancelSignal,
        gracefulCancel,
        forceKillAfterDelay,
        context,
        controller
      })
    ]);
  } catch (error) {
    context.terminationReason ??= "other";
    return Promise.all([
      { error },
      exitPromise,
      Promise.all(stdioPromises.map((stdioPromise) => getBufferedData(stdioPromise))),
      getBufferedData(allPromise),
      getBufferedIpcOutput(ipcOutputPromise, ipcOutput),
      Promise.allSettled(originalPromises),
      Promise.allSettled(customStreamsEndPromises)
    ]);
  }
};
var waitForOriginalStreams = (originalStreams, subprocess, streamInfo) => originalStreams.map((stream, fdNumber) => stream === subprocess.stdio[fdNumber] ? void 0 : waitForStream(stream, fdNumber, streamInfo));
var waitForCustomStreamsEnd = (fileDescriptors, streamInfo) => fileDescriptors.flatMap(({ stdioItems }, fdNumber) => stdioItems.filter(({ value, stream = value }) => isStream(stream, { checkOpen: false }) && !isStandardStream(stream)).map(({ type, value, stream = value }) => waitForStream(stream, fdNumber, streamInfo, {
  isSameDirection: TRANSFORM_TYPES.has(type),
  stopOnExit: type === "native"
})));
var throwOnSubprocessError = async (subprocess, { signal }) => {
  const [error] = await (0, import_node_events13.once)(subprocess, "error", { signal });
  throw error;
};

// node_modules/.pnpm/execa@9.6.0/node_modules/execa/lib/convert/concurrent.js
var initializeConcurrentStreams = () => ({
  readableDestroy: /* @__PURE__ */ new WeakMap(),
  writableFinal: /* @__PURE__ */ new WeakMap(),
  writableDestroy: /* @__PURE__ */ new WeakMap()
});
var addConcurrentStream = (concurrentStreams, stream, waitName) => {
  const weakMap = concurrentStreams[waitName];
  if (!weakMap.has(stream)) {
    weakMap.set(stream, []);
  }
  const promises = weakMap.get(stream);
  const promise = createDeferred();
  promises.push(promise);
  const resolve2 = promise.resolve.bind(promise);
  return { resolve: resolve2, promises };
};
var waitForConcurrentStreams = async ({ resolve: resolve2, promises }, subprocess) => {
  resolve2();
  const [isSubprocessExit] = await Promise.race([
    Promise.allSettled([true, subprocess]),
    Promise.all([false, ...promises])
  ]);
  return !isSubprocessExit;
};

// node_modules/.pnpm/execa@9.6.0/node_modules/execa/lib/convert/readable.js
var import_node_stream6 = require("node:stream");
var import_node_util9 = require("node:util");

// node_modules/.pnpm/execa@9.6.0/node_modules/execa/lib/convert/shared.js
var import_promises11 = require("node:stream/promises");
var safeWaitForSubprocessStdin = async (subprocessStdin) => {
  if (subprocessStdin === void 0) {
    return;
  }
  try {
    await waitForSubprocessStdin(subprocessStdin);
  } catch {
  }
};
var safeWaitForSubprocessStdout = async (subprocessStdout) => {
  if (subprocessStdout === void 0) {
    return;
  }
  try {
    await waitForSubprocessStdout(subprocessStdout);
  } catch {
  }
};
var waitForSubprocessStdin = async (subprocessStdin) => {
  await (0, import_promises11.finished)(subprocessStdin, { cleanup: true, readable: false, writable: true });
};
var waitForSubprocessStdout = async (subprocessStdout) => {
  await (0, import_promises11.finished)(subprocessStdout, { cleanup: true, readable: true, writable: false });
};
var waitForSubprocess = async (subprocess, error) => {
  await subprocess;
  if (error) {
    throw error;
  }
};
var destroyOtherStream = (stream, isOpen, error) => {
  if (error && !isStreamAbort(error)) {
    stream.destroy(error);
  } else if (isOpen) {
    stream.destroy();
  }
};

// node_modules/.pnpm/execa@9.6.0/node_modules/execa/lib/convert/readable.js
var createReadable = ({ subprocess, concurrentStreams, encoding }, { from, binary: binaryOption = true, preserveNewlines = true } = {}) => {
  const binary = binaryOption || BINARY_ENCODINGS.has(encoding);
  const { subprocessStdout, waitReadableDestroy } = getSubprocessStdout(subprocess, from, concurrentStreams);
  const { readableEncoding, readableObjectMode, readableHighWaterMark } = getReadableOptions(subprocessStdout, binary);
  const { read, onStdoutDataDone } = getReadableMethods({
    subprocessStdout,
    subprocess,
    binary,
    encoding,
    preserveNewlines
  });
  const readable2 = new import_node_stream6.Readable({
    read,
    destroy: (0, import_node_util9.callbackify)(onReadableDestroy.bind(void 0, { subprocessStdout, subprocess, waitReadableDestroy })),
    highWaterMark: readableHighWaterMark,
    objectMode: readableObjectMode,
    encoding: readableEncoding
  });
  onStdoutFinished({
    subprocessStdout,
    onStdoutDataDone,
    readable: readable2,
    subprocess
  });
  return readable2;
};
var getSubprocessStdout = (subprocess, from, concurrentStreams) => {
  const subprocessStdout = getFromStream(subprocess, from);
  const waitReadableDestroy = addConcurrentStream(concurrentStreams, subprocessStdout, "readableDestroy");
  return { subprocessStdout, waitReadableDestroy };
};
var getReadableOptions = ({ readableEncoding, readableObjectMode, readableHighWaterMark }, binary) => binary ? { readableEncoding, readableObjectMode, readableHighWaterMark } : { readableEncoding, readableObjectMode: true, readableHighWaterMark: DEFAULT_OBJECT_HIGH_WATER_MARK };
var getReadableMethods = ({ subprocessStdout, subprocess, binary, encoding, preserveNewlines }) => {
  const onStdoutDataDone = createDeferred();
  const onStdoutData = iterateOnSubprocessStream({
    subprocessStdout,
    subprocess,
    binary,
    shouldEncode: !binary,
    encoding,
    preserveNewlines
  });
  return {
    read() {
      onRead(this, onStdoutData, onStdoutDataDone);
    },
    onStdoutDataDone
  };
};
var onRead = async (readable2, onStdoutData, onStdoutDataDone) => {
  try {
    const { value, done } = await onStdoutData.next();
    if (done) {
      onStdoutDataDone.resolve();
    } else {
      readable2.push(value);
    }
  } catch {
  }
};
var onStdoutFinished = async ({ subprocessStdout, onStdoutDataDone, readable: readable2, subprocess, subprocessStdin }) => {
  try {
    await waitForSubprocessStdout(subprocessStdout);
    await subprocess;
    await safeWaitForSubprocessStdin(subprocessStdin);
    await onStdoutDataDone;
    if (readable2.readable) {
      readable2.push(null);
    }
  } catch (error) {
    await safeWaitForSubprocessStdin(subprocessStdin);
    destroyOtherReadable(readable2, error);
  }
};
var onReadableDestroy = async ({ subprocessStdout, subprocess, waitReadableDestroy }, error) => {
  if (await waitForConcurrentStreams(waitReadableDestroy, subprocess)) {
    destroyOtherReadable(subprocessStdout, error);
    await waitForSubprocess(subprocess, error);
  }
};
var destroyOtherReadable = (stream, error) => {
  destroyOtherStream(stream, stream.readable, error);
};

// node_modules/.pnpm/execa@9.6.0/node_modules/execa/lib/convert/writable.js
var import_node_stream7 = require("node:stream");
var import_node_util10 = require("node:util");
var createWritable = ({ subprocess, concurrentStreams }, { to } = {}) => {
  const { subprocessStdin, waitWritableFinal, waitWritableDestroy } = getSubprocessStdin(subprocess, to, concurrentStreams);
  const writable2 = new import_node_stream7.Writable({
    ...getWritableMethods(subprocessStdin, subprocess, waitWritableFinal),
    destroy: (0, import_node_util10.callbackify)(onWritableDestroy.bind(void 0, {
      subprocessStdin,
      subprocess,
      waitWritableFinal,
      waitWritableDestroy
    })),
    highWaterMark: subprocessStdin.writableHighWaterMark,
    objectMode: subprocessStdin.writableObjectMode
  });
  onStdinFinished(subprocessStdin, writable2);
  return writable2;
};
var getSubprocessStdin = (subprocess, to, concurrentStreams) => {
  const subprocessStdin = getToStream(subprocess, to);
  const waitWritableFinal = addConcurrentStream(concurrentStreams, subprocessStdin, "writableFinal");
  const waitWritableDestroy = addConcurrentStream(concurrentStreams, subprocessStdin, "writableDestroy");
  return { subprocessStdin, waitWritableFinal, waitWritableDestroy };
};
var getWritableMethods = (subprocessStdin, subprocess, waitWritableFinal) => ({
  write: onWrite.bind(void 0, subprocessStdin),
  final: (0, import_node_util10.callbackify)(onWritableFinal.bind(void 0, subprocessStdin, subprocess, waitWritableFinal))
});
var onWrite = (subprocessStdin, chunk, encoding, done) => {
  if (subprocessStdin.write(chunk, encoding)) {
    done();
  } else {
    subprocessStdin.once("drain", done);
  }
};
var onWritableFinal = async (subprocessStdin, subprocess, waitWritableFinal) => {
  if (await waitForConcurrentStreams(waitWritableFinal, subprocess)) {
    if (subprocessStdin.writable) {
      subprocessStdin.end();
    }
    await subprocess;
  }
};
var onStdinFinished = async (subprocessStdin, writable2, subprocessStdout) => {
  try {
    await waitForSubprocessStdin(subprocessStdin);
    if (writable2.writable) {
      writable2.end();
    }
  } catch (error) {
    await safeWaitForSubprocessStdout(subprocessStdout);
    destroyOtherWritable(writable2, error);
  }
};
var onWritableDestroy = async ({ subprocessStdin, subprocess, waitWritableFinal, waitWritableDestroy }, error) => {
  await waitForConcurrentStreams(waitWritableFinal, subprocess);
  if (await waitForConcurrentStreams(waitWritableDestroy, subprocess)) {
    destroyOtherWritable(subprocessStdin, error);
    await waitForSubprocess(subprocess, error);
  }
};
var destroyOtherWritable = (stream, error) => {
  destroyOtherStream(stream, stream.writable, error);
};

// node_modules/.pnpm/execa@9.6.0/node_modules/execa/lib/convert/duplex.js
var import_node_stream8 = require("node:stream");
var import_node_util11 = require("node:util");
var createDuplex = ({ subprocess, concurrentStreams, encoding }, { from, to, binary: binaryOption = true, preserveNewlines = true } = {}) => {
  const binary = binaryOption || BINARY_ENCODINGS.has(encoding);
  const { subprocessStdout, waitReadableDestroy } = getSubprocessStdout(subprocess, from, concurrentStreams);
  const { subprocessStdin, waitWritableFinal, waitWritableDestroy } = getSubprocessStdin(subprocess, to, concurrentStreams);
  const { readableEncoding, readableObjectMode, readableHighWaterMark } = getReadableOptions(subprocessStdout, binary);
  const { read, onStdoutDataDone } = getReadableMethods({
    subprocessStdout,
    subprocess,
    binary,
    encoding,
    preserveNewlines
  });
  const duplex2 = new import_node_stream8.Duplex({
    read,
    ...getWritableMethods(subprocessStdin, subprocess, waitWritableFinal),
    destroy: (0, import_node_util11.callbackify)(onDuplexDestroy.bind(void 0, {
      subprocessStdout,
      subprocessStdin,
      subprocess,
      waitReadableDestroy,
      waitWritableFinal,
      waitWritableDestroy
    })),
    readableHighWaterMark,
    writableHighWaterMark: subprocessStdin.writableHighWaterMark,
    readableObjectMode,
    writableObjectMode: subprocessStdin.writableObjectMode,
    encoding: readableEncoding
  });
  onStdoutFinished({
    subprocessStdout,
    onStdoutDataDone,
    readable: duplex2,
    subprocess,
    subprocessStdin
  });
  onStdinFinished(subprocessStdin, duplex2, subprocessStdout);
  return duplex2;
};
var onDuplexDestroy = async ({ subprocessStdout, subprocessStdin, subprocess, waitReadableDestroy, waitWritableFinal, waitWritableDestroy }, error) => {
  await Promise.all([
    onReadableDestroy({ subprocessStdout, subprocess, waitReadableDestroy }, error),
    onWritableDestroy({
      subprocessStdin,
      subprocess,
      waitWritableFinal,
      waitWritableDestroy
    }, error)
  ]);
};

// node_modules/.pnpm/execa@9.6.0/node_modules/execa/lib/convert/iterable.js
var createIterable = (subprocess, encoding, {
  from,
  binary: binaryOption = false,
  preserveNewlines = false
} = {}) => {
  const binary = binaryOption || BINARY_ENCODINGS.has(encoding);
  const subprocessStdout = getFromStream(subprocess, from);
  const onStdoutData = iterateOnSubprocessStream({
    subprocessStdout,
    subprocess,
    binary,
    shouldEncode: true,
    encoding,
    preserveNewlines
  });
  return iterateOnStdoutData(onStdoutData, subprocessStdout, subprocess);
};
var iterateOnStdoutData = async function* (onStdoutData, subprocessStdout, subprocess) {
  try {
    yield* onStdoutData;
  } finally {
    if (subprocessStdout.readable) {
      subprocessStdout.destroy();
    }
    await subprocess;
  }
};

// node_modules/.pnpm/execa@9.6.0/node_modules/execa/lib/convert/add.js
var addConvertedStreams = (subprocess, { encoding }) => {
  const concurrentStreams = initializeConcurrentStreams();
  subprocess.readable = createReadable.bind(void 0, { subprocess, concurrentStreams, encoding });
  subprocess.writable = createWritable.bind(void 0, { subprocess, concurrentStreams });
  subprocess.duplex = createDuplex.bind(void 0, { subprocess, concurrentStreams, encoding });
  subprocess.iterable = createIterable.bind(void 0, subprocess, encoding);
  subprocess[Symbol.asyncIterator] = createIterable.bind(void 0, subprocess, encoding, {});
};

// node_modules/.pnpm/execa@9.6.0/node_modules/execa/lib/methods/promise.js
var mergePromise = (subprocess, promise) => {
  for (const [property, descriptor] of descriptors) {
    const value = descriptor.value.bind(promise);
    Reflect.defineProperty(subprocess, property, { ...descriptor, value });
  }
};
var nativePromisePrototype = (async () => {
})().constructor.prototype;
var descriptors = ["then", "catch", "finally"].map((property) => [
  property,
  Reflect.getOwnPropertyDescriptor(nativePromisePrototype, property)
]);

// node_modules/.pnpm/execa@9.6.0/node_modules/execa/lib/methods/main-async.js
var execaCoreAsync = (rawFile, rawArguments, rawOptions, createNested) => {
  const { file, commandArguments, command, escapedCommand, startTime, verboseInfo, options, fileDescriptors } = handleAsyncArguments(rawFile, rawArguments, rawOptions);
  const { subprocess, promise } = spawnSubprocessAsync({
    file,
    commandArguments,
    options,
    startTime,
    verboseInfo,
    command,
    escapedCommand,
    fileDescriptors
  });
  subprocess.pipe = pipeToSubprocess.bind(void 0, {
    source: subprocess,
    sourcePromise: promise,
    boundOptions: {},
    createNested
  });
  mergePromise(subprocess, promise);
  SUBPROCESS_OPTIONS.set(subprocess, { options, fileDescriptors });
  return subprocess;
};
var handleAsyncArguments = (rawFile, rawArguments, rawOptions) => {
  const { command, escapedCommand, startTime, verboseInfo } = handleCommand(rawFile, rawArguments, rawOptions);
  const { file, commandArguments, options: normalizedOptions } = normalizeOptions(rawFile, rawArguments, rawOptions);
  const options = handleAsyncOptions(normalizedOptions);
  const fileDescriptors = handleStdioAsync(options, verboseInfo);
  return {
    file,
    commandArguments,
    command,
    escapedCommand,
    startTime,
    verboseInfo,
    options,
    fileDescriptors
  };
};
var handleAsyncOptions = ({ timeout, signal, ...options }) => {
  if (signal !== void 0) {
    throw new TypeError('The "signal" option has been renamed to "cancelSignal" instead.');
  }
  return { ...options, timeoutDuration: timeout };
};
var spawnSubprocessAsync = ({ file, commandArguments, options, startTime, verboseInfo, command, escapedCommand, fileDescriptors }) => {
  let subprocess;
  try {
    subprocess = (0, import_node_child_process5.spawn)(...concatenateShell(file, commandArguments, options));
  } catch (error) {
    return handleEarlyError({
      error,
      command,
      escapedCommand,
      fileDescriptors,
      options,
      startTime,
      verboseInfo
    });
  }
  const controller = new AbortController();
  (0, import_node_events14.setMaxListeners)(Number.POSITIVE_INFINITY, controller.signal);
  const originalStreams = [...subprocess.stdio];
  pipeOutputAsync(subprocess, fileDescriptors, controller);
  cleanupOnExit(subprocess, options, controller);
  const context = {};
  const onInternalError = createDeferred();
  subprocess.kill = subprocessKill.bind(void 0, {
    kill: subprocess.kill.bind(subprocess),
    options,
    onInternalError,
    context,
    controller
  });
  subprocess.all = makeAllStream(subprocess, options);
  addConvertedStreams(subprocess, options);
  addIpcMethods(subprocess, options);
  const promise = handlePromise({
    subprocess,
    options,
    startTime,
    verboseInfo,
    fileDescriptors,
    originalStreams,
    command,
    escapedCommand,
    context,
    onInternalError,
    controller
  });
  return { subprocess, promise };
};
var handlePromise = async ({ subprocess, options, startTime, verboseInfo, fileDescriptors, originalStreams, command, escapedCommand, context, onInternalError, controller }) => {
  const [
    errorInfo,
    [exitCode, signal],
    stdioResults,
    allResult,
    ipcOutput
  ] = await waitForSubprocessResult({
    subprocess,
    options,
    context,
    verboseInfo,
    fileDescriptors,
    originalStreams,
    onInternalError,
    controller
  });
  controller.abort();
  onInternalError.resolve();
  const stdio = stdioResults.map((stdioResult, fdNumber) => stripNewline(stdioResult, options, fdNumber));
  const all = stripNewline(allResult, options, "all");
  const result = getAsyncResult({
    errorInfo,
    exitCode,
    signal,
    stdio,
    all,
    ipcOutput,
    context,
    options,
    command,
    escapedCommand,
    startTime
  });
  return handleResult(result, verboseInfo, options);
};
var getAsyncResult = ({ errorInfo, exitCode, signal, stdio, all, ipcOutput, context, options, command, escapedCommand, startTime }) => "error" in errorInfo ? makeError({
  error: errorInfo.error,
  command,
  escapedCommand,
  timedOut: context.terminationReason === "timeout",
  isCanceled: context.terminationReason === "cancel" || context.terminationReason === "gracefulCancel",
  isGracefullyCanceled: context.terminationReason === "gracefulCancel",
  isMaxBuffer: errorInfo.error instanceof MaxBufferError,
  isForcefullyTerminated: context.isForcefullyTerminated,
  exitCode,
  signal,
  stdio,
  all,
  ipcOutput,
  options,
  startTime,
  isSync: false
}) : makeSuccessResult({
  command,
  escapedCommand,
  stdio,
  all,
  ipcOutput,
  options,
  startTime
});

// node_modules/.pnpm/execa@9.6.0/node_modules/execa/lib/methods/bind.js
var mergeOptions = (boundOptions, options) => {
  const newOptions = Object.fromEntries(
    Object.entries(options).map(([optionName, optionValue]) => [
      optionName,
      mergeOption(optionName, boundOptions[optionName], optionValue)
    ])
  );
  return { ...boundOptions, ...newOptions };
};
var mergeOption = (optionName, boundOptionValue, optionValue) => {
  if (DEEP_OPTIONS.has(optionName) && isPlainObject(boundOptionValue) && isPlainObject(optionValue)) {
    return { ...boundOptionValue, ...optionValue };
  }
  return optionValue;
};
var DEEP_OPTIONS = /* @__PURE__ */ new Set(["env", ...FD_SPECIFIC_OPTIONS]);

// node_modules/.pnpm/execa@9.6.0/node_modules/execa/lib/methods/create.js
var createExeca = (mapArguments, boundOptions, deepOptions, setBoundExeca) => {
  const createNested = (mapArguments2, boundOptions2, setBoundExeca2) => createExeca(mapArguments2, boundOptions2, deepOptions, setBoundExeca2);
  const boundExeca = (...execaArguments) => callBoundExeca({
    mapArguments,
    deepOptions,
    boundOptions,
    setBoundExeca,
    createNested
  }, ...execaArguments);
  if (setBoundExeca !== void 0) {
    setBoundExeca(boundExeca, createNested, boundOptions);
  }
  return boundExeca;
};
var callBoundExeca = ({ mapArguments, deepOptions = {}, boundOptions = {}, setBoundExeca, createNested }, firstArgument, ...nextArguments) => {
  if (isPlainObject(firstArgument)) {
    return createNested(mapArguments, mergeOptions(boundOptions, firstArgument), setBoundExeca);
  }
  const { file, commandArguments, options, isSync } = parseArguments({
    mapArguments,
    firstArgument,
    nextArguments,
    deepOptions,
    boundOptions
  });
  return isSync ? execaCoreSync(file, commandArguments, options) : execaCoreAsync(file, commandArguments, options, createNested);
};
var parseArguments = ({ mapArguments, firstArgument, nextArguments, deepOptions, boundOptions }) => {
  const callArguments = isTemplateString(firstArgument) ? parseTemplates(firstArgument, nextArguments) : [firstArgument, ...nextArguments];
  const [initialFile, initialArguments, initialOptions] = normalizeParameters(...callArguments);
  const mergedOptions = mergeOptions(mergeOptions(deepOptions, boundOptions), initialOptions);
  const {
    file = initialFile,
    commandArguments = initialArguments,
    options = mergedOptions,
    isSync = false
  } = mapArguments({ file: initialFile, commandArguments: initialArguments, options: mergedOptions });
  return {
    file,
    commandArguments,
    options,
    isSync
  };
};

// node_modules/.pnpm/execa@9.6.0/node_modules/execa/lib/methods/command.js
var mapCommandAsync = ({ file, commandArguments }) => parseCommand(file, commandArguments);
var mapCommandSync = ({ file, commandArguments }) => ({ ...parseCommand(file, commandArguments), isSync: true });
var parseCommand = (command, unusedArguments) => {
  if (unusedArguments.length > 0) {
    throw new TypeError(`The command and its arguments must be passed as a single string: ${command} ${unusedArguments}.`);
  }
  const [file, ...commandArguments] = parseCommandString(command);
  return { file, commandArguments };
};
var parseCommandString = (command) => {
  if (typeof command !== "string") {
    throw new TypeError(`The command must be a string: ${String(command)}.`);
  }
  const trimmedCommand = command.trim();
  if (trimmedCommand === "") {
    return [];
  }
  const tokens = [];
  for (const token of trimmedCommand.split(SPACES_REGEXP)) {
    const previousToken = tokens.at(-1);
    if (previousToken && previousToken.endsWith("\\")) {
      tokens[tokens.length - 1] = `${previousToken.slice(0, -1)} ${token}`;
    } else {
      tokens.push(token);
    }
  }
  return tokens;
};
var SPACES_REGEXP = / +/g;

// node_modules/.pnpm/execa@9.6.0/node_modules/execa/lib/methods/script.js
var setScriptSync = (boundExeca, createNested, boundOptions) => {
  boundExeca.sync = createNested(mapScriptSync, boundOptions);
  boundExeca.s = boundExeca.sync;
};
var mapScriptAsync = ({ options }) => getScriptOptions(options);
var mapScriptSync = ({ options }) => ({ ...getScriptOptions(options), isSync: true });
var getScriptOptions = (options) => ({ options: { ...getScriptStdinOption(options), ...options } });
var getScriptStdinOption = ({ input, inputFile, stdio }) => input === void 0 && inputFile === void 0 && stdio === void 0 ? { stdin: "inherit" } : {};
var deepScriptOptions = { preferLocal: true };

// node_modules/.pnpm/execa@9.6.0/node_modules/execa/index.js
var execa = createExeca(() => ({}));
var execaSync = createExeca(() => ({ isSync: true }));
var execaCommand = createExeca(mapCommandAsync);
var execaCommandSync = createExeca(mapCommandSync);
var execaNode = createExeca(mapNode);
var $3 = createExeca(mapScriptAsync, {}, deepScriptOptions, setScriptSync);
var {
  sendMessage: sendMessage2,
  getOneMessage: getOneMessage2,
  getEachMessage: getEachMessage2,
  getCancelSignal: getCancelSignal2
} = getIpcExport();

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
function isBinaryPath(path7) {
  return binaryExtensions.has((0, import_path3.extname)(path7).toLowerCase());
}

// packages/qwik/src/cli/migrate-v2/replace-package.ts
init_visit_not_ignored_files();
var import_fs3 = require("fs");
init_dist2();
function updateFileContent(path7, content) {
  (0, import_fs3.writeFileSync)(path7, content);
  f2.info(`"${path7}" has been updated`);
}
function replacePackage(oldPackageName, newPackageName, skipDependencies = false) {
  if (!skipDependencies) {
    replacePackageInDependencies(oldPackageName, newPackageName);
  }
  replaceMentions(oldPackageName, newPackageName);
}
function replacePackageInDependencies(oldPackageName, newPackageName) {
  visitNotIgnoredFiles(".", (path7) => {
    if ((0, import_path5.basename)(path7) !== "package.json") {
      return;
    }
    try {
      const packageJson = JSON.parse((0, import_fs3.readFileSync)(path7, "utf-8"));
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
      updateFileContent(path7, JSON.stringify(packageJson, null, 2));
    } catch (e2) {
      console.warn(`Could not replace ${oldPackageName} with ${newPackageName} in ${path7}.`);
    }
  });
}
function replaceMentions(oldPackageName, newPackageName) {
  visitNotIgnoredFiles(".", (path7) => {
    if (isBinaryPath(path7)) {
      return;
    }
    const ignoredFiles = [
      "yarn.lock",
      "package-lock.json",
      "pnpm-lock.yaml",
      "bun.lockb",
      "CHANGELOG.md"
    ];
    if (ignoredFiles.includes((0, import_path5.basename)(path7))) {
      return;
    }
    try {
      const contents = (0, import_fs3.readFileSync)(path7, "utf-8");
      if (!contents.includes(oldPackageName)) {
        return;
      }
      updateFileContent(path7, contents.replace(new RegExp(oldPackageName, "g"), newPackageName));
    } catch {
      f2.warn(
        `An error was thrown when trying to update ${path7}. If you believe the migration should have updated it, be sure to review the file and open an issue.`
      );
    }
  });
}

// packages/qwik/src/cli/migrate-v2/update-dependencies.ts
var import_node_child_process6 = require("node:child_process");

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
  var _a2;
  const tags = (_a2 = (0, import_node_child_process6.execSync)("npm dist-tag @qwik.dev/core", {
    encoding: "utf-8"
  })) == null ? void 0 : _a2.split("\n").filter(Boolean).map(
    (data) => data.split(":").map((v2) => v2 == null ? void 0 : v2.trim()).filter(Boolean)
  ).filter((v2) => v2.length === 2).sort((a4, b3) => {
    let aIndex = versionTagPriority.indexOf(a4[0]);
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
  var _a2, _b2;
  const packageJson = await readPackageJson(process.cwd());
  if (((_a2 = packageJson.dependencies) == null ? void 0 : _a2["ts-morph"]) || ((_b2 = packageJson.devDependencies) == null ? void 0 : _b2["ts-morph"])) {
    return false;
  }
  const loading = de();
  loading.start("Fetching migration tools..");
  (packageJson.devDependencies ??= {})["ts-morph"] = "23";
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
  var _a2, _b2;
  const packageJson = await readPackageJson(process.cwd());
  (_a2 = packageJson.dependencies) == null ? true : delete _a2["ts-morph"];
  (_b2 = packageJson.devDependencies) == null ? true : delete _b2["ts-morph"];
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

// packages/qwik/src/cli/check-client/index.ts
var import_promises12 = __toESM(require("fs/promises"), 1);
var import_path6 = __toESM(require("path"), 1);
var getDiskPath = (dist) => import_path6.default.resolve(dist);
var getSrcPath = (src) => import_path6.default.resolve(src);
var getManifestPath = (dist) => import_path6.default.resolve(dist, "q-manifest.json");
async function runQwikClientCommand(app) {
  try {
    const src = app.args[1];
    const dist = app.args[2];
    await checkClientCommand(app, src, dist);
  } catch (e2) {
    console.error(`\u274C ${red(String(e2))}
`);
    process.exit(1);
  }
}
async function checkClientCommand(app, src, dist) {
  if (!await clientDirExists(dist)) {
    await goBuild(app);
  } else {
    const manifest = await getManifestTs(getManifestPath(dist));
    if (manifest === null) {
      await goBuild(app);
    } else {
      if (await hasNewer(getSrcPath(src), manifest)) {
        await goBuild(app);
      }
    }
  }
}
async function goBuild(app) {
  const pkgManager = getPackageManager();
  const { install } = await runInPkg(pkgManager, ["run", "build.client"], app.rootDir);
  if (!await install) {
    throw new Error("Client build command reported failure.");
  }
}
async function getManifestTs(manifestPath) {
  try {
    const stats = await import_promises12.default.stat(manifestPath);
    return stats.mtimeMs;
  } catch (err) {
    if (err.code !== "ENOENT") {
      panic(`Error accessing manifest file ${manifestPath}: ${err.message}`);
    }
    return null;
  }
}
async function clientDirExists(path7) {
  try {
    await import_promises12.default.access(getDiskPath(path7));
    return true;
  } catch (err) {
    if (!(err.code === "ENOENT")) {
      panic(`Error accessing disk directory ${path7}: ${err.message}`);
    }
    return false;
  }
}
async function hasNewer(srcPath, timestamp) {
  let returnValue = false;
  async function traverse(dir) {
    if (returnValue) {
      return;
    }
    let items;
    try {
      items = await import_promises12.default.readdir(dir, { withFileTypes: true });
    } catch (err) {
      return;
    }
    for (const item of items) {
      if (returnValue) {
        return;
      }
      const fullPath = import_path6.default.join(dir, item.name);
      try {
        if (item.isDirectory()) {
          await traverse(fullPath);
        } else if (item.isFile()) {
          const stats = await import_promises12.default.stat(fullPath);
          if (stats.mtimeMs > timestamp) {
            returnValue = true;
            return;
          }
        }
      } catch (err) {
      }
    }
  }
  await traverse(srcPath);
  return returnValue;
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
    value: "check-client",
    label: "check-client",
    hint: "Make sure the client bundle is up-to-date with the source code",
    run: (app) => runQwikClientCommand(app),
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
    case "check-client": {
      await runQwikClientCommand(app);
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
  console.log("1.17.2");
}
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  runCli,
  updateApp
});
