/**
 * @license
 * @builder.io/qwik/optimizer 2.0.0-0-dev+e2d67d3
 * Copyright Builder.io, Inc. All Rights Reserved.
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/QwikDev/qwik/blob/main/LICENSE
 */
globalThis.qwikOptimizer = function(module) {
  "use strict";
  var __create = Object.create;
  var __defProp = Object.defineProperty;
  var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
  var __getOwnPropNames = Object.getOwnPropertyNames;
  var __getProtoOf = Object.getPrototypeOf;
  var __hasOwnProp = Object.prototype.hasOwnProperty;
  var __commonJS = (cb, mod) => function() {
    return mod || (0, cb[__getOwnPropNames(cb)[0]])((mod = {
      exports: {}
    }).exports, mod), mod.exports;
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
  var __toESM = (mod, isNodeMode, target) => (target = null != mod ? __create(__getProtoOf(mod)) : {}, 
  __copyProps(!isNodeMode && mod && mod.__esModule ? target : __defProp(target, "default", {
    value: mod,
    enumerable: true
  }), mod));
  var __toCommonJS = mod => __copyProps(__defProp({}, "__esModule", {
    value: true
  }), mod);
  var require_utils = __commonJS({
    "node_modules/.pnpm/image-size@1.1.1/node_modules/image-size/dist/types/utils.js"(exports2) {
      Object.defineProperty(exports2, "__esModule", {
        value: true
      });
      exports2.findBox = exports2.readUInt = exports2.readUInt32LE = exports2.readUInt32BE = exports2.readInt32LE = exports2.readUInt24LE = exports2.readUInt16LE = exports2.readUInt16BE = exports2.readInt16LE = exports2.toHexString = exports2.toUTF8String = void 0;
      var decoder = new TextDecoder;
      var toUTF8String = (input, start = 0, end = input.length) => decoder.decode(input.slice(start, end));
      exports2.toUTF8String = toUTF8String;
      var toHexString = (input, start = 0, end = input.length) => input.slice(start, end).reduce(((memo, i) => memo + ("0" + i.toString(16)).slice(-2)), "");
      exports2.toHexString = toHexString;
      var readInt16LE = (input, offset = 0) => {
        const val = input[offset] + 256 * input[offset + 1];
        return val | 131070 * (32768 & val);
      };
      exports2.readInt16LE = readInt16LE;
      var readUInt16BE = (input, offset = 0) => 256 * input[offset] + input[offset + 1];
      exports2.readUInt16BE = readUInt16BE;
      var readUInt16LE = (input, offset = 0) => input[offset] + 256 * input[offset + 1];
      exports2.readUInt16LE = readUInt16LE;
      var readUInt24LE = (input, offset = 0) => input[offset] + 256 * input[offset + 1] + 65536 * input[offset + 2];
      exports2.readUInt24LE = readUInt24LE;
      var readInt32LE = (input, offset = 0) => input[offset] + 256 * input[offset + 1] + 65536 * input[offset + 2] + (input[offset + 3] << 24);
      exports2.readInt32LE = readInt32LE;
      var readUInt32BE = (input, offset = 0) => input[offset] * 2 ** 24 + 65536 * input[offset + 1] + 256 * input[offset + 2] + input[offset + 3];
      exports2.readUInt32BE = readUInt32BE;
      var readUInt32LE = (input, offset = 0) => input[offset] + 256 * input[offset + 1] + 65536 * input[offset + 2] + input[offset + 3] * 2 ** 24;
      exports2.readUInt32LE = readUInt32LE;
      var methods = {
        readUInt16BE: exports2.readUInt16BE,
        readUInt16LE: exports2.readUInt16LE,
        readUInt32BE: exports2.readUInt32BE,
        readUInt32LE: exports2.readUInt32LE
      };
      function readUInt(input, bits, offset, isBigEndian) {
        offset = offset || 0;
        const endian = isBigEndian ? "BE" : "LE";
        const methodName = "readUInt" + bits + endian;
        return methods[methodName](input, offset);
      }
      exports2.readUInt = readUInt;
      function readBox(buffer, offset) {
        if (buffer.length - offset < 4) {
          return;
        }
        const boxSize = (0, exports2.readUInt32BE)(buffer, offset);
        if (buffer.length - offset < boxSize) {
          return;
        }
        return {
          name: (0, exports2.toUTF8String)(buffer, 4 + offset, 8 + offset),
          offset: offset,
          size: boxSize
        };
      }
      function findBox(buffer, boxName, offset) {
        while (offset < buffer.length) {
          const box = readBox(buffer, offset);
          if (!box) {
            break;
          }
          if (box.name === boxName) {
            return box;
          }
          offset += box.size;
        }
      }
      exports2.findBox = findBox;
    }
  });
  var require_bmp = __commonJS({
    "node_modules/.pnpm/image-size@1.1.1/node_modules/image-size/dist/types/bmp.js"(exports2) {
      Object.defineProperty(exports2, "__esModule", {
        value: true
      });
      exports2.BMP = void 0;
      var utils_1 = require_utils();
      exports2.BMP = {
        validate: input => "BM" === (0, utils_1.toUTF8String)(input, 0, 2),
        calculate: input => ({
          height: Math.abs((0, utils_1.readInt32LE)(input, 22)),
          width: (0, utils_1.readUInt32LE)(input, 18)
        })
      };
    }
  });
  var require_ico = __commonJS({
    "node_modules/.pnpm/image-size@1.1.1/node_modules/image-size/dist/types/ico.js"(exports2) {
      Object.defineProperty(exports2, "__esModule", {
        value: true
      });
      exports2.ICO = void 0;
      var utils_1 = require_utils();
      var TYPE_ICON = 1;
      var SIZE_HEADER = 6;
      var SIZE_IMAGE_ENTRY = 16;
      function getSizeFromOffset(input, offset) {
        const value = input[offset];
        return 0 === value ? 256 : value;
      }
      function getImageSize(input, imageIndex) {
        const offset = SIZE_HEADER + imageIndex * SIZE_IMAGE_ENTRY;
        return {
          height: getSizeFromOffset(input, offset + 1),
          width: getSizeFromOffset(input, offset)
        };
      }
      exports2.ICO = {
        validate(input) {
          const reserved = (0, utils_1.readUInt16LE)(input, 0);
          const imageCount = (0, utils_1.readUInt16LE)(input, 4);
          if (0 !== reserved || 0 === imageCount) {
            return false;
          }
          const imageType = (0, utils_1.readUInt16LE)(input, 2);
          return imageType === TYPE_ICON;
        },
        calculate(input) {
          const nbImages = (0, utils_1.readUInt16LE)(input, 4);
          const imageSize = getImageSize(input, 0);
          if (1 === nbImages) {
            return imageSize;
          }
          const imgs = [ imageSize ];
          for (let imageIndex = 1; imageIndex < nbImages; imageIndex += 1) {
            imgs.push(getImageSize(input, imageIndex));
          }
          return {
            height: imageSize.height,
            images: imgs,
            width: imageSize.width
          };
        }
      };
    }
  });
  var require_cur = __commonJS({
    "node_modules/.pnpm/image-size@1.1.1/node_modules/image-size/dist/types/cur.js"(exports2) {
      Object.defineProperty(exports2, "__esModule", {
        value: true
      });
      exports2.CUR = void 0;
      var ico_12 = require_ico();
      var utils_1 = require_utils();
      var TYPE_CURSOR = 2;
      exports2.CUR = {
        validate(input) {
          const reserved = (0, utils_1.readUInt16LE)(input, 0);
          const imageCount = (0, utils_1.readUInt16LE)(input, 4);
          if (0 !== reserved || 0 === imageCount) {
            return false;
          }
          const imageType = (0, utils_1.readUInt16LE)(input, 2);
          return imageType === TYPE_CURSOR;
        },
        calculate: input => ico_12.ICO.calculate(input)
      };
    }
  });
  var require_dds = __commonJS({
    "node_modules/.pnpm/image-size@1.1.1/node_modules/image-size/dist/types/dds.js"(exports2) {
      Object.defineProperty(exports2, "__esModule", {
        value: true
      });
      exports2.DDS = void 0;
      var utils_1 = require_utils();
      exports2.DDS = {
        validate: input => 542327876 === (0, utils_1.readUInt32LE)(input, 0),
        calculate: input => ({
          height: (0, utils_1.readUInt32LE)(input, 12),
          width: (0, utils_1.readUInt32LE)(input, 16)
        })
      };
    }
  });
  var require_gif = __commonJS({
    "node_modules/.pnpm/image-size@1.1.1/node_modules/image-size/dist/types/gif.js"(exports2) {
      Object.defineProperty(exports2, "__esModule", {
        value: true
      });
      exports2.GIF = void 0;
      var utils_1 = require_utils();
      var gifRegexp = /^GIF8[79]a/;
      exports2.GIF = {
        validate: input => gifRegexp.test((0, utils_1.toUTF8String)(input, 0, 6)),
        calculate: input => ({
          height: (0, utils_1.readUInt16LE)(input, 8),
          width: (0, utils_1.readUInt16LE)(input, 6)
        })
      };
    }
  });
  var require_icns = __commonJS({
    "node_modules/.pnpm/image-size@1.1.1/node_modules/image-size/dist/types/icns.js"(exports2) {
      Object.defineProperty(exports2, "__esModule", {
        value: true
      });
      exports2.ICNS = void 0;
      var utils_1 = require_utils();
      var SIZE_HEADER = 8;
      var FILE_LENGTH_OFFSET = 4;
      var ENTRY_LENGTH_OFFSET = 4;
      var ICON_TYPE_SIZE = {
        ICON: 32,
        "ICN#": 32,
        "icm#": 16,
        icm4: 16,
        icm8: 16,
        "ics#": 16,
        ics4: 16,
        ics8: 16,
        is32: 16,
        s8mk: 16,
        icp4: 16,
        icl4: 32,
        icl8: 32,
        il32: 32,
        l8mk: 32,
        icp5: 32,
        ic11: 32,
        ich4: 48,
        ich8: 48,
        ih32: 48,
        h8mk: 48,
        icp6: 64,
        ic12: 32,
        it32: 128,
        t8mk: 128,
        ic07: 128,
        ic08: 256,
        ic13: 256,
        ic09: 512,
        ic14: 512,
        ic10: 1024
      };
      function readImageHeader(input, imageOffset) {
        const imageLengthOffset = imageOffset + ENTRY_LENGTH_OFFSET;
        return [ (0, utils_1.toUTF8String)(input, imageOffset, imageLengthOffset), (0, utils_1.readUInt32BE)(input, imageLengthOffset) ];
      }
      function getImageSize(type) {
        const size = ICON_TYPE_SIZE[type];
        return {
          width: size,
          height: size,
          type: type
        };
      }
      exports2.ICNS = {
        validate: input => "icns" === (0, utils_1.toUTF8String)(input, 0, 4),
        calculate(input) {
          const inputLength = input.length;
          const fileLength = (0, utils_1.readUInt32BE)(input, FILE_LENGTH_OFFSET);
          let imageOffset = SIZE_HEADER;
          let imageHeader = readImageHeader(input, imageOffset);
          let imageSize = getImageSize(imageHeader[0]);
          imageOffset += imageHeader[1];
          if (imageOffset === fileLength) {
            return imageSize;
          }
          const result = {
            height: imageSize.height,
            images: [ imageSize ],
            width: imageSize.width
          };
          while (imageOffset < fileLength && imageOffset < inputLength) {
            imageHeader = readImageHeader(input, imageOffset);
            imageSize = getImageSize(imageHeader[0]);
            imageOffset += imageHeader[1];
            result.images.push(imageSize);
          }
          return result;
        }
      };
    }
  });
  var require_j2c = __commonJS({
    "node_modules/.pnpm/image-size@1.1.1/node_modules/image-size/dist/types/j2c.js"(exports2) {
      Object.defineProperty(exports2, "__esModule", {
        value: true
      });
      exports2.J2C = void 0;
      var utils_1 = require_utils();
      exports2.J2C = {
        validate: input => "ff4fff51" === (0, utils_1.toHexString)(input, 0, 4),
        calculate: input => ({
          height: (0, utils_1.readUInt32BE)(input, 12),
          width: (0, utils_1.readUInt32BE)(input, 8)
        })
      };
    }
  });
  var require_jp2 = __commonJS({
    "node_modules/.pnpm/image-size@1.1.1/node_modules/image-size/dist/types/jp2.js"(exports2) {
      Object.defineProperty(exports2, "__esModule", {
        value: true
      });
      exports2.JP2 = void 0;
      var utils_1 = require_utils();
      exports2.JP2 = {
        validate(input) {
          if (1783636e3 !== (0, utils_1.readUInt32BE)(input, 4) || (0, utils_1.readUInt32BE)(input, 0) < 1) {
            return false;
          }
          const ftypBox = (0, utils_1.findBox)(input, "ftyp", 0);
          if (!ftypBox) {
            return false;
          }
          return 1718909296 === (0, utils_1.readUInt32BE)(input, ftypBox.offset + 4);
        },
        calculate(input) {
          const jp2hBox = (0, utils_1.findBox)(input, "jp2h", 0);
          const ihdrBox = jp2hBox && (0, utils_1.findBox)(input, "ihdr", jp2hBox.offset + 8);
          if (ihdrBox) {
            return {
              height: (0, utils_1.readUInt32BE)(input, ihdrBox.offset + 8),
              width: (0, utils_1.readUInt32BE)(input, ihdrBox.offset + 12)
            };
          }
          throw new TypeError("Unsupported JPEG 2000 format");
        }
      };
    }
  });
  var require_jpg = __commonJS({
    "node_modules/.pnpm/image-size@1.1.1/node_modules/image-size/dist/types/jpg.js"(exports2) {
      Object.defineProperty(exports2, "__esModule", {
        value: true
      });
      exports2.JPG = void 0;
      var utils_1 = require_utils();
      var EXIF_MARKER = "45786966";
      var APP1_DATA_SIZE_BYTES = 2;
      var EXIF_HEADER_BYTES = 6;
      var TIFF_BYTE_ALIGN_BYTES = 2;
      var BIG_ENDIAN_BYTE_ALIGN = "4d4d";
      var LITTLE_ENDIAN_BYTE_ALIGN = "4949";
      var IDF_ENTRY_BYTES = 12;
      var NUM_DIRECTORY_ENTRIES_BYTES = 2;
      function isEXIF(input) {
        return (0, utils_1.toHexString)(input, 2, 6) === EXIF_MARKER;
      }
      function extractSize(input, index) {
        return {
          height: (0, utils_1.readUInt16BE)(input, index),
          width: (0, utils_1.readUInt16BE)(input, index + 2)
        };
      }
      function extractOrientation(exifBlock, isBigEndian) {
        const idfOffset = 8;
        const offset = EXIF_HEADER_BYTES + idfOffset;
        const idfDirectoryEntries = (0, utils_1.readUInt)(exifBlock, 16, offset, isBigEndian);
        for (let directoryEntryNumber = 0; directoryEntryNumber < idfDirectoryEntries; directoryEntryNumber++) {
          const start = offset + NUM_DIRECTORY_ENTRIES_BYTES + directoryEntryNumber * IDF_ENTRY_BYTES;
          const end = start + IDF_ENTRY_BYTES;
          if (start > exifBlock.length) {
            return;
          }
          const block = exifBlock.slice(start, end);
          const tagNumber = (0, utils_1.readUInt)(block, 16, 0, isBigEndian);
          if (274 === tagNumber) {
            const dataFormat = (0, utils_1.readUInt)(block, 16, 2, isBigEndian);
            if (3 !== dataFormat) {
              return;
            }
            const numberOfComponents = (0, utils_1.readUInt)(block, 32, 4, isBigEndian);
            if (1 !== numberOfComponents) {
              return;
            }
            return (0, utils_1.readUInt)(block, 16, 8, isBigEndian);
          }
        }
      }
      function validateExifBlock(input, index) {
        const exifBlock = input.slice(APP1_DATA_SIZE_BYTES, index);
        const byteAlign = (0, utils_1.toHexString)(exifBlock, EXIF_HEADER_BYTES, EXIF_HEADER_BYTES + TIFF_BYTE_ALIGN_BYTES);
        const isBigEndian = byteAlign === BIG_ENDIAN_BYTE_ALIGN;
        const isLittleEndian = byteAlign === LITTLE_ENDIAN_BYTE_ALIGN;
        if (isBigEndian || isLittleEndian) {
          return extractOrientation(exifBlock, isBigEndian);
        }
      }
      function validateInput(input, index) {
        if (index > input.length) {
          throw new TypeError("Corrupt JPG, exceeded buffer limits");
        }
      }
      exports2.JPG = {
        validate: input => "ffd8" === (0, utils_1.toHexString)(input, 0, 2),
        calculate(input) {
          input = input.slice(4);
          let orientation;
          let next;
          while (input.length) {
            const i = (0, utils_1.readUInt16BE)(input, 0);
            if (255 !== input[i]) {
              input = input.slice(1);
              continue;
            }
            isEXIF(input) && (orientation = validateExifBlock(input, i));
            validateInput(input, i);
            next = input[i + 1];
            if (192 === next || 193 === next || 194 === next) {
              const size = extractSize(input, i + 5);
              if (!orientation) {
                return size;
              }
              return {
                height: size.height,
                orientation: orientation,
                width: size.width
              };
            }
            input = input.slice(i + 2);
          }
          throw new TypeError("Invalid JPG, no size found");
        }
      };
    }
  });
  var require_ktx = __commonJS({
    "node_modules/.pnpm/image-size@1.1.1/node_modules/image-size/dist/types/ktx.js"(exports2) {
      Object.defineProperty(exports2, "__esModule", {
        value: true
      });
      exports2.KTX = void 0;
      var utils_1 = require_utils();
      exports2.KTX = {
        validate: input => {
          const signature = (0, utils_1.toUTF8String)(input, 1, 7);
          return [ "KTX 11", "KTX 20" ].includes(signature);
        },
        calculate: input => {
          const type = 49 === input[5] ? "ktx" : "ktx2";
          const offset = "ktx" === type ? 36 : 20;
          return {
            height: (0, utils_1.readUInt32LE)(input, offset + 4),
            width: (0, utils_1.readUInt32LE)(input, offset),
            type: type
          };
        }
      };
    }
  });
  var require_png = __commonJS({
    "node_modules/.pnpm/image-size@1.1.1/node_modules/image-size/dist/types/png.js"(exports2) {
      Object.defineProperty(exports2, "__esModule", {
        value: true
      });
      exports2.PNG = void 0;
      var utils_1 = require_utils();
      var pngSignature = "PNG\r\n\n";
      var pngImageHeaderChunkName = "IHDR";
      var pngFriedChunkName = "CgBI";
      exports2.PNG = {
        validate(input) {
          if (pngSignature === (0, utils_1.toUTF8String)(input, 1, 8)) {
            let chunkName = (0, utils_1.toUTF8String)(input, 12, 16);
            chunkName === pngFriedChunkName && (chunkName = (0, utils_1.toUTF8String)(input, 28, 32));
            if (chunkName !== pngImageHeaderChunkName) {
              throw new TypeError("Invalid PNG");
            }
            return true;
          }
          return false;
        },
        calculate(input) {
          if ((0, utils_1.toUTF8String)(input, 12, 16) === pngFriedChunkName) {
            return {
              height: (0, utils_1.readUInt32BE)(input, 36),
              width: (0, utils_1.readUInt32BE)(input, 32)
            };
          }
          return {
            height: (0, utils_1.readUInt32BE)(input, 20),
            width: (0, utils_1.readUInt32BE)(input, 16)
          };
        }
      };
    }
  });
  var require_pnm = __commonJS({
    "node_modules/.pnpm/image-size@1.1.1/node_modules/image-size/dist/types/pnm.js"(exports2) {
      Object.defineProperty(exports2, "__esModule", {
        value: true
      });
      exports2.PNM = void 0;
      var utils_1 = require_utils();
      var PNMTypes = {
        P1: "pbm/ascii",
        P2: "pgm/ascii",
        P3: "ppm/ascii",
        P4: "pbm",
        P5: "pgm",
        P6: "ppm",
        P7: "pam",
        PF: "pfm"
      };
      var handlers = {
        default: lines => {
          let dimensions = [];
          while (lines.length > 0) {
            const line = lines.shift();
            if ("#" === line[0]) {
              continue;
            }
            dimensions = line.split(" ");
            break;
          }
          if (2 === dimensions.length) {
            return {
              height: parseInt(dimensions[1], 10),
              width: parseInt(dimensions[0], 10)
            };
          }
          throw new TypeError("Invalid PNM");
        },
        pam: lines => {
          const size = {};
          while (lines.length > 0) {
            const line = lines.shift();
            if (line.length > 16 || line.charCodeAt(0) > 128) {
              continue;
            }
            const [key, value] = line.split(" ");
            key && value && (size[key.toLowerCase()] = parseInt(value, 10));
            if (size.height && size.width) {
              break;
            }
          }
          if (size.height && size.width) {
            return {
              height: size.height,
              width: size.width
            };
          }
          throw new TypeError("Invalid PAM");
        }
      };
      exports2.PNM = {
        validate: input => (0, utils_1.toUTF8String)(input, 0, 2) in PNMTypes,
        calculate(input) {
          const signature = (0, utils_1.toUTF8String)(input, 0, 2);
          const type = PNMTypes[signature];
          const lines = (0, utils_1.toUTF8String)(input, 3).split(/[\r\n]+/);
          const handler = handlers[type] || handlers.default;
          return handler(lines);
        }
      };
    }
  });
  var require_psd = __commonJS({
    "node_modules/.pnpm/image-size@1.1.1/node_modules/image-size/dist/types/psd.js"(exports2) {
      Object.defineProperty(exports2, "__esModule", {
        value: true
      });
      exports2.PSD = void 0;
      var utils_1 = require_utils();
      exports2.PSD = {
        validate: input => "8BPS" === (0, utils_1.toUTF8String)(input, 0, 4),
        calculate: input => ({
          height: (0, utils_1.readUInt32BE)(input, 14),
          width: (0, utils_1.readUInt32BE)(input, 18)
        })
      };
    }
  });
  var require_svg = __commonJS({
    "node_modules/.pnpm/image-size@1.1.1/node_modules/image-size/dist/types/svg.js"(exports2) {
      Object.defineProperty(exports2, "__esModule", {
        value: true
      });
      exports2.SVG = void 0;
      var utils_1 = require_utils();
      var svgReg = /<svg\s([^>"']|"[^"]*"|'[^']*')*>/;
      var extractorRegExps = {
        height: /\sheight=(['"])([^%]+?)\1/,
        root: svgReg,
        viewbox: /\sviewBox=(['"])(.+?)\1/i,
        width: /\swidth=(['"])([^%]+?)\1/
      };
      var INCH_CM = 2.54;
      var units = {
        in: 96,
        cm: 96 / INCH_CM,
        em: 16,
        ex: 8,
        m: 96 / INCH_CM * 100,
        mm: 96 / INCH_CM / 10,
        pc: 96 / 72 / 12,
        pt: 96 / 72,
        px: 1
      };
      var unitsReg = new RegExp(`^([0-9.]+(?:e\\d+)?)(${Object.keys(units).join("|")})?$`);
      function parseLength(len) {
        const m = unitsReg.exec(len);
        if (!m) {
          return;
        }
        return Math.round(Number(m[1]) * (units[m[2]] || 1));
      }
      function parseViewbox(viewbox) {
        const bounds = viewbox.split(" ");
        return {
          height: parseLength(bounds[3]),
          width: parseLength(bounds[2])
        };
      }
      function parseAttributes(root) {
        const width = root.match(extractorRegExps.width);
        const height = root.match(extractorRegExps.height);
        const viewbox = root.match(extractorRegExps.viewbox);
        return {
          height: height && parseLength(height[2]),
          viewbox: viewbox && parseViewbox(viewbox[2]),
          width: width && parseLength(width[2])
        };
      }
      function calculateByDimensions(attrs) {
        return {
          height: attrs.height,
          width: attrs.width
        };
      }
      function calculateByViewbox(attrs, viewbox) {
        const ratio = viewbox.width / viewbox.height;
        if (attrs.width) {
          return {
            height: Math.floor(attrs.width / ratio),
            width: attrs.width
          };
        }
        if (attrs.height) {
          return {
            height: attrs.height,
            width: Math.floor(attrs.height * ratio)
          };
        }
        return {
          height: viewbox.height,
          width: viewbox.width
        };
      }
      exports2.SVG = {
        validate: input => svgReg.test((0, utils_1.toUTF8String)(input, 0, 1e3)),
        calculate(input) {
          const root = (0, utils_1.toUTF8String)(input).match(extractorRegExps.root);
          if (root) {
            const attrs = parseAttributes(root[0]);
            if (attrs.width && attrs.height) {
              return calculateByDimensions(attrs);
            }
            if (attrs.viewbox) {
              return calculateByViewbox(attrs, attrs.viewbox);
            }
          }
          throw new TypeError("Invalid SVG");
        }
      };
    }
  });
  var require_tga = __commonJS({
    "node_modules/.pnpm/image-size@1.1.1/node_modules/image-size/dist/types/tga.js"(exports2) {
      Object.defineProperty(exports2, "__esModule", {
        value: true
      });
      exports2.TGA = void 0;
      var utils_1 = require_utils();
      exports2.TGA = {
        validate: input => 0 === (0, utils_1.readUInt16LE)(input, 0) && 0 === (0, utils_1.readUInt16LE)(input, 4),
        calculate: input => ({
          height: (0, utils_1.readUInt16LE)(input, 14),
          width: (0, utils_1.readUInt16LE)(input, 12)
        })
      };
    }
  });
  var require_webp = __commonJS({
    "node_modules/.pnpm/image-size@1.1.1/node_modules/image-size/dist/types/webp.js"(exports2) {
      Object.defineProperty(exports2, "__esModule", {
        value: true
      });
      exports2.WEBP = void 0;
      var utils_1 = require_utils();
      function calculateExtended(input) {
        return {
          height: 1 + (0, utils_1.readUInt24LE)(input, 7),
          width: 1 + (0, utils_1.readUInt24LE)(input, 4)
        };
      }
      function calculateLossless(input) {
        return {
          height: 1 + ((15 & input[4]) << 10 | input[3] << 2 | (192 & input[2]) >> 6),
          width: 1 + ((63 & input[2]) << 8 | input[1])
        };
      }
      function calculateLossy(input) {
        return {
          height: 16383 & (0, utils_1.readInt16LE)(input, 8),
          width: 16383 & (0, utils_1.readInt16LE)(input, 6)
        };
      }
      exports2.WEBP = {
        validate(input) {
          const riffHeader = "RIFF" === (0, utils_1.toUTF8String)(input, 0, 4);
          const webpHeader = "WEBP" === (0, utils_1.toUTF8String)(input, 8, 12);
          const vp8Header = "VP8" === (0, utils_1.toUTF8String)(input, 12, 15);
          return riffHeader && webpHeader && vp8Header;
        },
        calculate(input) {
          const chunkHeader = (0, utils_1.toUTF8String)(input, 12, 16);
          input = input.slice(20, 30);
          if ("VP8X" === chunkHeader) {
            const extendedHeader = input[0];
            const validStart = 0 === (192 & extendedHeader);
            const validEnd = 0 === (1 & extendedHeader);
            if (validStart && validEnd) {
              return calculateExtended(input);
            }
            throw new TypeError("Invalid WebP");
          }
          if ("VP8 " === chunkHeader && 47 !== input[0]) {
            return calculateLossy(input);
          }
          const signature = (0, utils_1.toHexString)(input, 3, 6);
          if ("VP8L" === chunkHeader && "9d012a" !== signature) {
            return calculateLossless(input);
          }
          throw new TypeError("Invalid WebP");
        }
      };
    }
  });
  var require_heif = __commonJS({
    "node_modules/.pnpm/image-size@1.1.1/node_modules/image-size/dist/types/heif.js"(exports2) {
      Object.defineProperty(exports2, "__esModule", {
        value: true
      });
      exports2.HEIF = void 0;
      var utils_1 = require_utils();
      var brandMap = {
        avif: "avif",
        mif1: "heif",
        msf1: "heif",
        heic: "heic",
        heix: "heic",
        hevc: "heic",
        hevx: "heic"
      };
      exports2.HEIF = {
        validate(buffer) {
          const ftype = (0, utils_1.toUTF8String)(buffer, 4, 8);
          const brand = (0, utils_1.toUTF8String)(buffer, 8, 12);
          return "ftyp" === ftype && brand in brandMap;
        },
        calculate(buffer) {
          const metaBox = (0, utils_1.findBox)(buffer, "meta", 0);
          const iprpBox = metaBox && (0, utils_1.findBox)(buffer, "iprp", metaBox.offset + 12);
          const ipcoBox = iprpBox && (0, utils_1.findBox)(buffer, "ipco", iprpBox.offset + 8);
          const ispeBox = ipcoBox && (0, utils_1.findBox)(buffer, "ispe", ipcoBox.offset + 8);
          if (ispeBox) {
            return {
              height: (0, utils_1.readUInt32BE)(buffer, ispeBox.offset + 16),
              width: (0, utils_1.readUInt32BE)(buffer, ispeBox.offset + 12),
              type: (0, utils_1.toUTF8String)(buffer, 8, 12)
            };
          }
          throw new TypeError("Invalid HEIF, no size found");
        }
      };
    }
  });
  var src_exports = {};
  __export(src_exports, {
    createOptimizer: () => createOptimizer,
    qwikRollup: () => qwikRollup,
    qwikVite: () => qwikVite,
    symbolMapper: () => symbolMapper,
    versions: () => versions
  });
  module.exports = __toCommonJS(src_exports);
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
  var QWIK_BINDING_MAP = {};
  var versions = {
    qwik: "2.0.0-0-dev+e2d67d3"
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
    false;
    if ("node" === sysEnv || "bun" === sysEnv) {
      sys.dynamicImport = path => require(path);
      sys.strictDynamicImport = path => import(path);
      if ("undefined" === typeof TextEncoder) {
        const nodeUtil = await sys.dynamicImport("node:util");
        globalThis.TextEncoder = nodeUtil.TextEncoder;
        globalThis.TextDecoder = nodeUtil.TextDecoder;
      }
    } else if ("webworker" === sysEnv || "browsermain" === sysEnv) {
      sys.strictDynamicImport = path => import(path);
      sys.dynamicImport = async path => {
        const cjsRsp = await fetch(path);
        const cjsCode = await cjsRsp.text();
        const cjsModule = {
          exports: {}
        };
        const cjsRun = new Function("module", "exports", cjsCode);
        cjsRun(cjsModule, cjsModule.exports);
        return cjsModule.exports;
      };
    }
    if ("node" === sysEnv || "bun" === sysEnv) {
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
          return flatted.filter((a => sys.path.extname(a).toLowerCase() in extensions));
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
    if ("node" === sysEnv || "bun" === sysEnv) {
      const platform = QWIK_BINDING_MAP[process.platform];
      if (platform) {
        const triples = platform[process.arch];
        if (triples) {
          for (const triple of triples) {
            try {
              false;
              const mod = await sys.dynamicImport(`../bindings/${triple.platformArchABI}`);
              return mod;
            } catch (e) {
              console.warn(`Unable to load native binding ${triple.platformArchABI}. Falling back to wasm build.`, null == e ? void 0 : e.message);
            }
          }
        }
      }
    }
    if ("node" === sysEnv || "bun" === sysEnv) {
      const wasmPath = sys.path.join(__dirname, "..", "bindings", "qwik_wasm_bg.wasm");
      const mod = await sys.dynamicImport("../bindings/qwik.wasm.cjs");
      const fs = await sys.dynamicImport("node:fs");
      return new Promise(((resolve, reject) => {
        fs.readFile(wasmPath, ((err, buf) => {
          null != err ? reject(err) : resolve(buf);
        }));
      })).then((buf => WebAssembly.compile(buf))).then((wasm => mod.default(wasm))).then((() => mod));
    }
    if ("webworker" === sysEnv || "browsermain" === sysEnv) {
      let version2 = versions.qwik;
      const cachedCjsCode = `qwikWasmCjs${version2}`;
      const cachedWasmRsp = `qwikWasmRsp${version2}`;
      let cjsCode = globalThis[cachedCjsCode];
      let wasmRsp = globalThis[cachedWasmRsp];
      if (!cjsCode || !wasmRsp) {
        version2 = versions.qwik.split("-dev")[0];
        const cdnUrl = `https://cdn.jsdelivr.net/npm/@builder.io/qwik@${version2}/bindings/`;
        const cjsModuleUrl = new URL("./qwik.wasm.cjs", cdnUrl).href;
        const wasmUrl = new URL("./qwik_wasm_bg.wasm", cdnUrl).href;
        const rsps = await Promise.all([ fetch(cjsModuleUrl), fetch(wasmUrl) ]);
        for (const rsp of rsps) {
          if (!rsp.ok) {
            throw new Error(`Unable to fetch Qwik WASM binding from ${rsp.url}`);
          }
        }
        const cjsRsp = rsps[0];
        globalThis[cachedCjsCode] = cjsCode = await cjsRsp.text();
        globalThis[cachedWasmRsp] = wasmRsp = rsps[1];
      }
      const cjsModule = {
        exports: {}
      };
      const cjsRun = new Function("module", "exports", cjsCode);
      cjsRun(cjsModule, cjsModule.exports);
      const mod = cjsModule.exports;
      await mod.default(wasmRsp.clone());
      return mod;
    }
    false;
    throw new Error("Platform not supported");
  }
  var getEnv = () => {
    if ("undefined" !== typeof Deno) {
      return "deno";
    }
    if ("undefined" !== typeof Bun) {
      return "bun";
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
        sourceMaps: !!fsOpts.sourceMaps,
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
    var _a, _b;
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
    output.entryStrategy = (null == (_a = opts.entryStrategy) ? void 0 : _a.type) ?? "smart";
    output.manualChunks = (null == (_b = opts.entryStrategy) ? void 0 : _b.manual) ?? void 0;
    return output;
  };
  var hashCode = (text, hash = 0) => {
    for (let i = 0; i < text.length; i++) {
      const chr = text.charCodeAt(i);
      hash = (hash << 5) - hash + chr;
      hash |= 0;
    }
    return Number(Math.abs(hash)).toString(36);
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
  function generateManifestFromBundles(path, segments, injections, outputBundles, opts, debug) {
    const manifest = {
      manifestHash: "",
      symbols: {},
      mapping: {},
      bundles: {},
      injections: injections,
      version: "1",
      options: {
        target: opts.target,
        buildMode: opts.buildMode,
        entryStrategy: opts.entryStrategy
      }
    };
    const buildPath = path.resolve(opts.rootDir, opts.outDir, "build");
    const canonPath = p => path.relative(buildPath, path.resolve(opts.rootDir, opts.outDir, p));
    const getBundleName = name => {
      const bundle = outputBundles[name];
      if (!bundle) {
        console.warn(`Client manifest generation: skipping external import "${name}"`);
        return;
      }
      return canonPath(bundle.fileName);
    };
    const qrlNames = new Set([ ...segments.map((h => h.name)) ]);
    for (const outputBundle of Object.values(outputBundles)) {
      if ("chunk" !== outputBundle.type) {
        continue;
      }
      const bundleFileName = canonPath(outputBundle.fileName);
      const bundle = {
        size: outputBundle.code.length
      };
      let hasSymbols = false;
      let hasHW = false;
      for (const symbol of outputBundle.exports) {
        if (qrlNames.has(symbol) && (!manifest.mapping[symbol] || 1 !== outputBundle.exports.length)) {
          hasSymbols = true;
          manifest.mapping[symbol] = bundleFileName;
        }
        "_hW" === symbol && (hasHW = true);
      }
      hasSymbols && hasHW && (bundle.isTask = true);
      const bundleImports = outputBundle.imports.filter((i => outputBundle.code.includes(path.basename(i)))).map((i => getBundleName(i))).filter(Boolean);
      bundleImports.length > 0 && (bundle.imports = bundleImports);
      const bundleDynamicImports = outputBundle.dynamicImports.filter((i => outputBundle.code.includes(path.basename(i)))).map((i => getBundleName(i))).filter(Boolean);
      bundleDynamicImports.length > 0 && (bundle.dynamicImports = bundleDynamicImports);
      const ids = outputBundle.moduleIds || Object.keys(outputBundle.modules);
      const modulePaths = ids.filter((m => !m.startsWith("\0"))).map((m => path.relative(opts.rootDir, m)));
      modulePaths.length > 0 && (bundle.origins = modulePaths);
      manifest.bundles[bundleFileName] = bundle;
    }
    for (const segment of segments) {
      const symbol = segment.name;
      const bundle = manifest.mapping[symbol];
      if (!bundle) {
        debug(`Note: qrl ${segment.name} is not in the bundle, likely tree shaken`, manifest);
        continue;
      }
      (manifest.bundles[bundle].symbols ||= []).push(symbol);
      manifest.symbols[symbol] = {
        origin: segment.origin,
        displayName: segment.displayName,
        canonicalFilename: segment.canonicalFilename,
        hash: segment.hash,
        ctxKind: segment.ctxKind,
        ctxName: segment.ctxName,
        captures: segment.captures,
        parent: segment.parent,
        loc: segment.loc
      };
    }
    return updateSortAndPriorities(manifest);
  }
  async function createLinter(sys, rootDir, tsconfigFileNames) {
    const module2 = await sys.dynamicImport("eslint");
    let eslint = new module2.ESLint({
      cache: true
    });
    const eslintConfig = await eslint.calculateConfigForFile("no-real-file.tsx");
    const invalidEslintConfig = null === eslintConfig.parser;
    if (invalidEslintConfig) {
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
      eslint = new module2.ESLint(options);
    }
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
              if (null != message.ruleId && !message.ruleId.startsWith("qwik/")) {
                continue;
              }
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
    const stack2 = e.stack;
    if ("string" === typeof stack2) {
      const lines = stack2.split("\n").filter((l => !l.includes("/node_modules/") && !l.includes("(node:")));
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
    let count2 = 0;
    const res = [];
    for (let i = 0; i < lines.length; i++) {
      count2 += lines[i].length + 1;
      if (count2 >= start) {
        for (let j = i - range; j <= i + range || end > count2; j++) {
          if (j < 0 || j >= lines.length) {
            continue;
          }
          const line = j + 1;
          res.push(`${line}${" ".repeat(Math.max(3 - String(line).length, 0))}|  ${lines[j]}`);
          const lineLength = lines[j].length;
          if (j === i) {
            const pad2 = Math.max(start - (count2 - lineLength) + 1, 0);
            const length = Math.max(1, end > count2 ? lineLength - pad2 : end - start);
            res.push("   |  " + " ".repeat(pad2) + "^".repeat(length));
          } else if (j > i) {
            if (end > count2) {
              const length = Math.max(Math.min(end - count2, lineLength), 1);
              res.push("   |  " + "^".repeat(length));
            }
            count2 += lineLength + 1;
          }
        }
        break;
      }
    }
    return res.join("\n");
  }
  function isWin(os) {
    return "win32" === os;
  }
  var REG_CTX_NAME = [ "server" ];
  var SERVER_STRIP_EXPORTS = [ "onGet", "onPost", "onPut", "onRequest", "onDelete", "onHead", "onOptions", "onPatch", "onStaticGenerate" ];
  var SERVER_STRIP_CTX_NAME = [ "useServer", "route", "server", "action$", "loader$", "zod$", "validator$", "globalAction$" ];
  var CLIENT_STRIP_CTX_NAME = [ "useClient", "useBrowser", "useVisibleTask", "client", "browser", "event$" ];
  var ExperimentalFeatures = (ExperimentalFeatures2 => {
    ExperimentalFeatures2.preventNavigate = "preventNavigate";
    ExperimentalFeatures2.valibot = "valibot";
    ExperimentalFeatures2.noSPA = "noSPA";
    return ExperimentalFeatures2;
  })(ExperimentalFeatures || {});
  function createPlugin(optimizerOptions = {}) {
    const id = `${Math.round(899 * Math.random()) + 100}`;
    const clientResults = new Map;
    const clientTransformedOutputs = new Map;
    const serverResults = new Map;
    const serverTransformedOutputs = new Map;
    const foundQrls = new Map;
    let internalOptimizer = null;
    let linter;
    let diagnosticsCallback = () => {};
    const opts = {
      csr: false,
      target: "client",
      buildMode: "development",
      debug: false,
      rootDir: null,
      tsconfigFileNames: [ "./tsconfig.json" ],
      input: null,
      outDir: null,
      assetsDir: null,
      resolveQwikBuild: true,
      entryStrategy: null,
      srcDir: null,
      srcInputs: null,
      sourcemap: !!optimizerOptions.sourcemap,
      manifestInput: null,
      insightsManifest: null,
      manifestOutput: null,
      transformedModuleOutput: null,
      scope: null,
      devTools: {
        imageDevTools: true,
        clickToSource: [ "Alt" ]
      },
      inlineStylesUpToBytes: null,
      lint: true,
      experimental: void 0
    };
    let lazyNormalizePath;
    const init2 = async () => {
      if (!internalOptimizer) {
        internalOptimizer = await createOptimizer(optimizerOptions);
        lazyNormalizePath = makeNormalizePath(internalOptimizer.sys);
      }
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
    let devServer;
    const configureServer = server => {
      devServer = server;
    };
    const normalizeOptions = inputOpts => {
      const updatedOpts = Object.assign({}, inputOpts);
      const optimizer = getOptimizer();
      const path = optimizer.sys.path;
      opts.debug = !!updatedOpts.debug;
      updatedOpts.assetsDir && (opts.assetsDir = updatedOpts.assetsDir);
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
        type: "segment"
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
      Array.isArray(updatedOpts.tsconfigFileNames) && updatedOpts.tsconfigFileNames.length > 0 && (opts.tsconfigFileNames = updatedOpts.tsconfigFileNames);
      Array.isArray(opts.srcInputs) ? opts.srcInputs.forEach((i => {
        i.path = normalizePath(path.resolve(opts.rootDir, i.path));
      })) : "string" === typeof opts.srcDir && (opts.srcDir = normalizePath(path.resolve(opts.rootDir, normalizePath(opts.srcDir))));
      if (!updatedOpts.csr) {
        if (Array.isArray(updatedOpts.input)) {
          opts.input = [ ...updatedOpts.input ];
        } else if ("string" === typeof updatedOpts.input) {
          opts.input = [ updatedOpts.input ];
        } else if ("ssr" === opts.target) {
          opts.input = [ path.resolve(srcDir, "entry.ssr") ];
        } else if ("client" === opts.target) {
          opts.input = [ path.resolve(srcDir, "root") ];
        } else if ("lib" === opts.target) {
          if ("object" === typeof updatedOpts.input) {
            for (const key in updatedOpts.input) {
              const resolvedPaths = {};
              if (Object.hasOwnProperty.call(updatedOpts.input, key)) {
                const relativePath = updatedOpts.input[key];
                const absolutePath = path.resolve(opts.rootDir, relativePath);
                resolvedPaths[key] = absolutePath;
              }
              opts.input = {
                ...opts.input,
                ...resolvedPaths
              };
            }
          } else {
            opts.input = [ path.resolve(srcDir, "index.ts") ];
          }
        } else {
          opts.input = [];
        }
        opts.input = Array.isArray(opts.input) ? opts.input.reduce(((inputs, i) => {
          let input = i;
          i.startsWith("@") || i.startsWith("~") || i.startsWith("#") || (input = normalizePath(path.resolve(opts.rootDir, i)));
          inputs.includes(input) || inputs.push(input);
          return inputs;
        }), []) : opts.input;
        "string" === typeof updatedOpts.outDir ? opts.outDir = normalizePath(path.resolve(opts.rootDir, normalizePath(updatedOpts.outDir))) : "ssr" === opts.target ? opts.outDir = normalizePath(path.resolve(opts.rootDir, SSR_OUT_DIR)) : "lib" === opts.target ? opts.outDir = normalizePath(path.resolve(opts.rootDir, LIB_OUT_DIR)) : opts.outDir = normalizePath(path.resolve(opts.rootDir, CLIENT_OUT_DIR));
      }
      "function" === typeof updatedOpts.manifestOutput && (opts.manifestOutput = updatedOpts.manifestOutput);
      const clientManifest = getValidManifest(updatedOpts.manifestInput);
      clientManifest && (opts.manifestInput = clientManifest);
      "function" === typeof updatedOpts.transformedModuleOutput && (opts.transformedModuleOutput = updatedOpts.transformedModuleOutput);
      opts.scope = updatedOpts.scope ?? null;
      "boolean" === typeof updatedOpts.resolveQwikBuild && (opts.resolveQwikBuild = updatedOpts.resolveQwikBuild);
      if ("object" === typeof updatedOpts.devTools) {
        "imageDevTools" in updatedOpts.devTools && (opts.devTools.imageDevTools = updatedOpts.devTools.imageDevTools);
        "clickToSource" in updatedOpts.devTools && (opts.devTools.clickToSource = updatedOpts.devTools.clickToSource);
      }
      opts.csr = !!updatedOpts.csr;
      opts.inlineStylesUpToBytes = optimizerOptions.inlineStylesUpToBytes ?? 2e4;
      ("number" !== typeof opts.inlineStylesUpToBytes || opts.inlineStylesUpToBytes < 0) && (opts.inlineStylesUpToBytes = 0);
      "boolean" === typeof updatedOpts.lint ? opts.lint = updatedOpts.lint : opts.lint = "development" === updatedOpts.buildMode;
      opts.experimental = void 0;
      for (const feature of updatedOpts.experimental ?? []) {
        ExperimentalFeatures[feature] ? (opts.experimental ||= {})[feature] = true : console.error(`Qwik plugin: Unknown experimental feature: ${feature}`);
      }
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
          for (const [_, input] of Object.entries(opts.input || {})) {
            const resolved = await resolver(input);
            if (!resolved) {
              throw new Error(`Qwik input "${input}" not found.`);
            }
          }
        }
      }
    };
    const buildStart = async ctx => {
      debug("buildStart()", opts.buildMode, opts.scope, opts.target);
      const optimizer = getOptimizer();
      if ("node" === optimizer.sys.env && "ssr" === opts.target && opts.lint) {
        try {
          linter = await createLinter(optimizer.sys, opts.rootDir, opts.tsconfigFileNames);
        } catch (err) {}
      }
      const path = getPath();
      if (Array.isArray(opts.srcInputs)) {
        optimizer.sys.getInputFiles = async rootDir => opts.srcInputs.map((i => {
          const relInput = {
            path: normalizePath(path.relative(rootDir, i.path)),
            code: i.code
          };
          return relInput;
        }));
        debug(`buildStart() opts.srcInputs (${opts.srcInputs.length})`);
      }
      debug("transformedOutputs.clear()");
      clientTransformedOutputs.clear();
      serverTransformedOutputs.clear();
    };
    const getIsServer = viteOpts => devServer ? !!(null == viteOpts ? void 0 : viteOpts.ssr) : "ssr" === opts.target || "test" === opts.target;
    const getParentId = (id2, isServer2) => {
      const transformedOutputs = isServer2 ? serverTransformedOutputs : clientTransformedOutputs;
      const segment = transformedOutputs.get(id2);
      if (segment) {
        return segment[1];
      }
      const hash = getSymbolHash(id2);
      return foundQrls.get(hash);
    };
    let resolveIdCount = 0;
    const resolveId = async (ctx, id2, importerId, resolveOpts) => {
      const count2 = resolveIdCount++;
      const isServer2 = getIsServer(resolveOpts);
      debug(`resolveId(${count2})`, "Start", id2, {
        from: importerId,
        for: isServer2 ? "server" : "client"
      });
      if (id2.startsWith("\0")) {
        return;
      }
      if ("lib" === opts.target && id2.startsWith(QWIK_CORE_ID)) {
        return {
          external: true,
          id: id2
        };
      }
      if (opts.resolveQwikBuild && id2.endsWith(QWIK_BUILD_ID)) {
        debug(`resolveId(${count2})`, "Resolved", QWIK_BUILD_ID);
        return {
          id: normalizePath(getPath().resolve(opts.rootDir, QWIK_BUILD_ID)),
          moduleSideEffects: false
        };
      }
      if (id2.endsWith(QWIK_CLIENT_MANIFEST_ID)) {
        debug(`resolveId(${count2})`, "Resolved", QWIK_CLIENT_MANIFEST_ID);
        if ("lib" === opts.target) {
          return {
            id: id2,
            external: true,
            moduleSideEffects: false
          };
        }
        const firstInput = opts.input && Object.values(opts.input)[0];
        return {
          id: normalizePath(getPath().resolve(firstInput, QWIK_CLIENT_MANIFEST_ID)),
          moduleSideEffects: false
        };
      }
      const optimizer = getOptimizer();
      const path = getPath();
      if (importerId) {
        const looksLikePath = id2.startsWith(".") || id2.startsWith("/");
        if (!looksLikePath) {
          debug(`resolveId(${count2})`, "falling back to default resolver");
          const parentId = getParentId(importerId, isServer2);
          if (parentId) {
            return ctx.resolve(id2, parentId, {
              skipSelf: true
            });
          }
          return;
        }
        importerId = normalizePath(importerId);
        const parsedImporterId = parseId(importerId);
        const dir = path.dirname(parsedImporterId.pathId);
        const outputs = isServer2 ? serverTransformedOutputs : clientTransformedOutputs;
        if (devServer && !isServer2 && importerId.endsWith(".html") && id2.startsWith("/") && !outputs.has(id2)) {
          id2 = decodeURIComponent(id2);
          id2.startsWith("/@fs/") ? id2 = id2.slice(isWin(optimizer.sys.os) ? 5 : 4) : id2.startsWith(dir.slice(0, dir.indexOf("/", 1))) || (id2 = path.join(dir, id2));
          id2 = normalizePath(id2);
          const match = /^([^?]*)\?_qrl_parent=(.*)/.exec(id2);
          if (match) {
            id2 = match[1];
            const parentId = id2.slice(0, id2.lastIndexOf("/") + 1) + match[2];
            const hash = getSymbolHash(id2);
            foundQrls.set(hash, parentId);
          }
        }
        const parsedId = parseId(id2);
        let importeePathId = normalizePath(parsedId.pathId);
        const ext = path.extname(importeePathId).toLowerCase();
        if (ext in RESOLVE_EXTS) {
          importeePathId = normalizePath(path.resolve(dir, importeePathId));
          const parentId = getParentId(importeePathId, isServer2);
          if (parentId) {
            debug(`resolveId(${count2}) Resolved ${importeePathId} from transformedOutputs`);
            return {
              id: importeePathId + parsedId.query
            };
          }
        }
      } else if (path.isAbsolute(id2)) {
        const parsedId = parseId(id2);
        const importeePathId = normalizePath(parsedId.pathId);
        const ext = path.extname(importeePathId).toLowerCase();
        if (ext in RESOLVE_EXTS && getParentId(importeePathId, isServer2)) {
          debug(`resolveId(${count2}) Resolved ${importeePathId} from transformedOutputs (no importer)`);
          return {
            id: importeePathId + parsedId.query
          };
        }
      }
      debug(`resolveId(${count2})`, "Not resolved", id2, importerId);
      return null;
    };
    const load = async (ctx, id2, loadOpts) => {
      if (id2.startsWith("\0") || id2.startsWith("/@fs/")) {
        return;
      }
      const isServer2 = getIsServer(loadOpts);
      if (opts.resolveQwikBuild && id2.endsWith(QWIK_BUILD_ID)) {
        debug("load()", QWIK_BUILD_ID, opts.buildMode);
        return {
          moduleSideEffects: false,
          code: getQwikBuildModule(isServer2, opts.target)
        };
      }
      if (id2.endsWith(QWIK_CLIENT_MANIFEST_ID)) {
        debug("load()", QWIK_CLIENT_MANIFEST_ID, opts.buildMode);
        return {
          moduleSideEffects: false,
          code: await getQwikServerManifestModule(isServer2)
        };
      }
      const parsedId = parseId(id2);
      const path = getPath();
      id2 = normalizePath(parsedId.pathId);
      const outputs = isServer2 ? serverTransformedOutputs : clientTransformedOutputs;
      if (devServer && !outputs.has(id2)) {
        const parentId = getParentId(id2, isServer2);
        if (parentId) {
          debug("load()", "transforming QRL parent", parentId);
          await devServer.transformRequest(`/@fs${parentId.startsWith("/") ? "" : "/"}${parentId}`);
        }
      }
      const transformedModule = outputs.get(id2);
      if (transformedModule) {
        debug("load()", "Found", id2);
        let {code: code} = transformedModule[0];
        const {map: map, segment: segment} = transformedModule[0];
        const firstInput = opts.input && Object.values(opts.input)[0];
        devServer && firstInput && (code = code.replace(/@qwik-client-manifest/g, normalizePath(path.resolve(firstInput, QWIK_CLIENT_MANIFEST_ID))));
        return {
          code: code,
          map: map,
          meta: {
            segment: segment
          }
        };
      }
      debug("load()", "Not found", id2);
      return null;
    };
    const transform = async function(ctx, code, id2, transformOpts = {}) {
      var _a;
      if (id2.startsWith("\0")) {
        return;
      }
      const isServer2 = getIsServer(transformOpts);
      const currentOutputs = isServer2 ? serverTransformedOutputs : clientTransformedOutputs;
      if (currentOutputs.has(id2)) {
        return;
      }
      const optimizer = getOptimizer();
      const path = getPath();
      const {pathId: pathId} = parseId(id2);
      const parsedPathId = path.parse(pathId);
      const dir = parsedPathId.dir;
      const base = parsedPathId.base;
      const ext = parsedPathId.ext.toLowerCase();
      if (ext in TRANSFORM_EXTS || TRANSFORM_REGEX.test(pathId)) {
        const strip = "client" === opts.target || "ssr" === opts.target;
        const normalizedID = normalizePath(pathId);
        debug("transform()", `Transforming ${id2} (for: ${isServer2 ? "server" : "client"}${strip ? ", strip" : ""})`);
        const mode = "lib" === opts.target ? "lib" : "development" === opts.buildMode ? "dev" : "prod";
        "lib" !== mode && (code = code.replaceAll(/__EXPERIMENTAL__\.(\w+)/g, ((_, feature) => {
          var _a2;
          if (null == (_a2 = opts.experimental) ? void 0 : _a2[feature]) {
            return "true";
          }
          return "false";
        })));
        let filePath = base;
        opts.srcDir && (filePath = path.relative(opts.srcDir, pathId));
        filePath = normalizePath(filePath);
        const srcDir = opts.srcDir ? opts.srcDir : normalizePath(dir);
        const entryStrategy = opts.entryStrategy;
        const transformOpts2 = {
          input: [ {
            code: code,
            path: filePath
          } ],
          entryStrategy: isServer2 ? {
            type: "hoist"
          } : entryStrategy,
          minify: "simplify",
          sourceMaps: opts.sourcemap || "development" === opts.buildMode,
          transpileTs: true,
          transpileJsx: true,
          explicitExtensions: true,
          preserveFilenames: true,
          srcDir: srcDir,
          rootDir: opts.rootDir,
          mode: mode,
          scope: opts.scope || void 0,
          isServer: isServer2
        };
        if (strip) {
          if (isServer2) {
            transformOpts2.stripCtxName = CLIENT_STRIP_CTX_NAME;
            transformOpts2.stripEventHandlers = true;
            transformOpts2.regCtxName = REG_CTX_NAME;
          } else {
            transformOpts2.stripCtxName = SERVER_STRIP_CTX_NAME;
            transformOpts2.stripExports = SERVER_STRIP_EXPORTS;
          }
        }
        const newOutput = optimizer.transformModulesSync(transformOpts2);
        const module2 = newOutput.modules.find((mod => !isAdditionalFile(mod)));
        if (devServer && isServer2) {
          const matches = module2.code.matchAll(/_([a-zA-Z0-9]{11,11})['"][,)]/g);
          for (const [, symbol] of matches) {
            foundQrls.set(symbol, id2);
          }
        }
        diagnosticsCallback(newOutput.diagnostics, optimizer, srcDir);
        if (isServer2) {
          0 === newOutput.diagnostics.length && linter && linter.lint(ctx, code, id2);
          serverResults.set(normalizedID, newOutput);
        } else {
          clientResults.set(normalizedID, newOutput);
        }
        const deps = new Set;
        for (const mod of newOutput.modules) {
          if (mod !== module2) {
            const key = normalizePath(path.join(srcDir, mod.path));
            debug("transform()", `segment ${key}`, null == (_a = mod.segment) ? void 0 : _a.displayName);
            currentOutputs.set(key, [ mod, id2 ]);
            deps.add(key);
            if ("client" === opts.target) {
              if (devServer) {
                const rollupModule = devServer.moduleGraph.getModuleById(key);
                rollupModule && devServer.moduleGraph.invalidateModule(rollupModule);
              } else {
                ctx.emitFile({
                  id: key,
                  type: "chunk",
                  preserveSignature: "allow-extension"
                });
              }
            }
          }
        }
        for (const id3 of deps.values()) {
          await ctx.load({
            id: id3
          });
        }
        ctx.addWatchFile(id2);
        return {
          code: module2.code,
          map: module2.map,
          meta: {
            segment: module2.segment,
            qwikdeps: Array.from(deps)
          }
        };
      }
      debug("transform()", "Not transforming", id2);
      return null;
    };
    const createOutputAnalyzer = rollupBundle => {
      const injections = [];
      const addInjection = b => injections.push(b);
      const generateManifest = async () => {
        const optimizer = getOptimizer();
        const path = optimizer.sys.path;
        const segments = Array.from(clientResults.values()).flatMap((r => r.modules)).map((mod => mod.segment)).filter((h => !!h));
        const manifest = generateManifestFromBundles(path, segments, injections, rollupBundle, opts, debug);
        for (const symbol of Object.values(manifest.symbols)) {
          symbol.origin && (symbol.origin = normalizePath(symbol.origin));
        }
        for (const bundle of Object.values(manifest.bundles)) {
          bundle.origins && (bundle.origins = bundle.origins.map((abs => {
            const relPath = path.relative(opts.rootDir, abs);
            return normalizePath(relPath);
          })).sort());
        }
        manifest.manifestHash = hashCode(JSON.stringify(manifest));
        return manifest;
      };
      return {
        addInjection: addInjection,
        generateManifest: generateManifest
      };
    };
    const getOptions = () => opts;
    const getTransformedOutputs = () => Array.from(clientTransformedOutputs.values()).map((t => t[0]));
    const debug = (...str) => {
      opts.debug && console.debug(`[QWIK PLUGIN: ${id}]`, ...str);
    };
    const log3 = (...str) => {
      console.log(`[QWIK PLUGIN: ${id}]`, ...str);
    };
    const onDiagnostics = cb => {
      diagnosticsCallback = cb;
    };
    const normalizePath = id2 => lazyNormalizePath(id2);
    function getQwikBuildModule(isServer2, target) {
      const isDev3 = "development" === opts.buildMode;
      return `// @builder.io/qwik/build\nexport const isServer = ${JSON.stringify(isServer2)};\nexport const isBrowser = ${JSON.stringify(!isServer2)};\nexport const isDev = ${JSON.stringify(isDev3)};\n`;
    }
    async function getQwikServerManifestModule(isServer2) {
      const manifest = isServer2 ? opts.manifestInput : null;
      return `// @qwik-client-manifest\nexport const manifest = ${JSON.stringify(manifest)};\n`;
    }
    function setSourceMapSupport(sourcemap) {
      opts.sourcemap = sourcemap;
    }
    function handleHotUpdate(ctx) {
      var _a, _b;
      debug("handleHotUpdate()", ctx.file);
      for (const mod of ctx.modules) {
        const {id: id2} = mod;
        if (id2) {
          debug("handleHotUpdate()", `invalidate ${id2}`);
          serverResults.delete(id2);
          clientResults.delete(id2);
        }
        for (const dep of (null == (_b = null == (_a = mod.info) ? void 0 : _a.meta) ? void 0 : _b.qwikdeps) || []) {
          debug("handleHotUpdate()", `invalidate segment ${dep}`);
          serverTransformedOutputs.delete(dep);
          clientTransformedOutputs.delete(dep);
          const mod2 = ctx.server.moduleGraph.getModuleById(dep);
          mod2 && ctx.server.moduleGraph.invalidateModule(mod2);
        }
      }
    }
    function manualChunks(id2, {getModuleInfo: getModuleInfo}) {
      const module2 = getModuleInfo(id2);
      const segment = module2.meta.segment;
      return null == segment ? void 0 : segment.entry;
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
      debug: debug,
      log: log3,
      normalizeOptions: normalizeOptions,
      normalizePath: normalizePath,
      onDiagnostics: onDiagnostics,
      resolveId: resolveId,
      transform: transform,
      validateSource: validateSource,
      setSourceMapSupport: setSourceMapSupport,
      foundQrls: foundQrls,
      configureServer: configureServer,
      handleHotUpdate: handleHotUpdate,
      manualChunks: manualChunks
    };
  }
  var makeNormalizePath = sys => id => {
    if ("string" === typeof id) {
      if (isWin(sys.os)) {
        const isExtendedLengthPath = /^\\\\\?\\/.test(id);
        if (!isExtendedLengthPath) {
          const hasNonAscii = /[^\u0000-\u0080]+/.test(id);
          hasNonAscii || (id = id.replace(/\\/g, "/"));
        }
        return sys.path.posix.normalize(id);
      }
      return sys.path.normalize(id);
    }
    return id;
  };
  function isAdditionalFile(mod) {
    return mod.isEntry || mod.segment;
  }
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
  function getSymbolHash(symbolName) {
    const index = symbolName.lastIndexOf("_");
    if (index > -1) {
      return symbolName.slice(index + 1);
    }
    return symbolName;
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
        var _a;
        await qwikPlugin.init();
        const origOnwarn = inputOpts.onwarn;
        inputOpts.onwarn = (warning, warn) => {
          if ("typescript" === warning.plugin && warning.message.includes("outputToFilesystem")) {
            return;
          }
          origOnwarn ? origOnwarn(warning, warn) : warn(warning);
        };
        const pluginOpts = {
          csr: qwikRollupOpts.csr,
          target: qwikRollupOpts.target,
          buildMode: qwikRollupOpts.buildMode,
          debug: qwikRollupOpts.debug,
          entryStrategy: qwikRollupOpts.entryStrategy,
          rootDir: qwikRollupOpts.rootDir,
          srcDir: qwikRollupOpts.srcDir,
          srcInputs: qwikRollupOpts.srcInputs,
          input: inputOpts.input,
          resolveQwikBuild: true,
          manifestOutput: qwikRollupOpts.manifestOutput,
          manifestInput: qwikRollupOpts.manifestInput,
          transformedModuleOutput: qwikRollupOpts.transformedModuleOutput,
          inlineStylesUpToBytes: null == (_a = qwikRollupOpts.optimizerOptions) ? void 0 : _a.inlineStylesUpToBytes,
          lint: qwikRollupOpts.lint,
          experimental: qwikRollupOpts.experimental
        };
        const opts = qwikPlugin.normalizeOptions(pluginOpts);
        inputOpts.input || (inputOpts.input = opts.input);
        return inputOpts;
      },
      outputOptions: rollupOutputOpts => normalizeRollupOutputOptionsObject(qwikPlugin.getOptions(), rollupOutputOpts, false, qwikPlugin.manualChunks),
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
        var _a;
        const opts = qwikPlugin.getOptions();
        if ("client" === opts.target) {
          const optimizer = qwikPlugin.getOptimizer();
          const outputAnalyzer = qwikPlugin.createOutputAnalyzer(rollupBundle);
          const manifest = await outputAnalyzer.generateManifest();
          manifest.platform = {
            ...versions,
            rollup: (null == (_a = this.meta) ? void 0 : _a.rollupVersion) || "",
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
  function normalizeRollupOutputOptions(opts, rollupOutputOpts, useAssetsDir, manualChunks, outDir) {
    if (Array.isArray(rollupOutputOpts)) {
      rollupOutputOpts.length || rollupOutputOpts.push({});
      return rollupOutputOpts.map((outputOptsObj => ({
        ...normalizeRollupOutputOptionsObject(opts, outputOptsObj, useAssetsDir, manualChunks),
        dir: outDir || outputOptsObj.dir
      })));
    }
    return {
      ...normalizeRollupOutputOptionsObject(opts, rollupOutputOpts, useAssetsDir, manualChunks),
      dir: outDir || (null == rollupOutputOpts ? void 0 : rollupOutputOpts.dir)
    };
  }
  function normalizeRollupOutputOptionsObject(opts, rollupOutputOptsObj, useAssetsDir, manualChunks) {
    const outputOpts = {
      ...rollupOutputOptsObj
    };
    if ("client" === opts.target) {
      if (!outputOpts.assetFileNames) {
        const assetFileNames = "assets/[hash]-[name].[ext]";
        outputOpts.assetFileNames = useAssetsDir ? `${opts.assetsDir}/${assetFileNames}` : assetFileNames;
      }
      const fileName = "production" == opts.buildMode ? "build/q-[hash].js" : "build/[name].js";
      outputOpts.entryFileNames || (outputOpts.entryFileNames = useAssetsDir ? `${opts.assetsDir}/${fileName}` : fileName);
      outputOpts.chunkFileNames || (outputOpts.chunkFileNames = useAssetsDir ? `${opts.assetsDir}/${fileName}` : fileName);
    } else {
      "production" === opts.buildMode && (outputOpts.chunkFileNames || (outputOpts.chunkFileNames = "q-[hash].js"));
    }
    outputOpts.assetFileNames || (outputOpts.assetFileNames = "assets/[hash]-[name].[ext]");
    if ("client" === opts.target) {
      outputOpts.format = "es";
      const prevManualChunks = outputOpts.manualChunks;
      if (prevManualChunks && "function" !== typeof prevManualChunks) {
        throw new Error("manualChunks must be a function");
      }
      outputOpts.manualChunks = prevManualChunks ? (id, meta) => prevManualChunks(id, meta) || manualChunks(id, meta) : manualChunks;
    }
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
  var QWIK_LOADER_DEFAULT_MINIFIED = '(()=>{var e=Object.defineProperty,t=Object.getOwnPropertySymbols,n=Object.prototype.hasOwnProperty,r=Object.prototype.propertyIsEnumerable,o=(t,n,r)=>n in t?e(t,n,{enumerable:!0,configurable:!0,writable:!0,value:r}):t[n]=r,s=(e,s)=>{for(var a in s||(s={}))n.call(s,a)&&o(e,a,s[a]);if(t)for(var a of t(s))r.call(s,a)&&o(e,a,s[a]);return e};((e,t)=>{const n="__q_context__",r=window,o=new Set,a=new Set([e]),c="replace",i="forEach",l="target",f="getAttribute",p="isConnected",b="qvisible",u="_qwikjson_",h=(e,t)=>Array.from(e.querySelectorAll(t)),y=e=>{const t=[];return a.forEach((n=>t.push(...h(n,e)))),t},d=e=>{S(e),h(e,"[q\\\\:shadowroot]").forEach((e=>{const t=e.shadowRoot;t&&d(t)}))},q=e=>e&&"function"==typeof e.then,m=(e,t,n=t.type)=>{y("[on"+e+"\\\\:"+n+"]")[i]((r=>E(r,e,t,n)))},w=t=>{if(void 0===t[u]){let n=(t===e.documentElement?e.body:t).lastElementChild;for(;n;){if("SCRIPT"===n.tagName&&"qwik/json"===n[f]("type")){t[u]=JSON.parse(n.textContent[c](/\\\\x3C(\\/?script)/gi,"<$1"));break}n=n.previousElementSibling}}},v=(e,t)=>new CustomEvent(e,{detail:t}),E=async(t,r,o,a=o.type)=>{const i="on"+r+":"+a;t.hasAttribute("preventdefault:"+a)&&o.preventDefault();const l=t._qc_,b=l&&l.li.filter((e=>e[0]===i));if(b&&b.length>0){for(const e of b){const n=e[1].getFn([t,o],(()=>t[p]))(o,t),r=o.cancelBubble;q(n)&&await n,r&&o.stopPropagation()}return}const u=t.qDispatchEvent;if(u)return u(o,r);const h=t[f](i);if(h){const r=t.closest("[q\\\\:container]:not([q\\\\:container=html]):not([q\\\\:container=text])"),a=r[f]("q:base"),i=r[f]("q:version")||"unknown",l=r[f]("q:manifest-hash")||"dev",b=new URL(a,e.baseURI);for(const f of h.split("\\n")){const u=new URL(f,b),h=u.href,y=u.hash[c](/^#?([^?[|]*).*$/,"$1")||"default",d=performance.now();let m,v,E;const _=f.startsWith("#"),A={qBase:a,qManifest:l,qVersion:i,href:h,symbol:y,element:t,reqTime:d};if(_){const t=r.getAttribute("q:instance");m=(e["qFuncs_"+t]||[])[Number.parseInt(y)],m||(v="sync",E=Error("sync handler error for symbol: "+y))}else{const e=u.href.split("#")[0];try{const t=import(e);w(r),m=(await t)[y],m||(v="no-symbol",E=Error(`${y} not in ${e}`))}catch(e){v||(v="async"),E=e}}if(!m){g("qerror",s({importError:v,error:E},A)),console.error(E);break}const k=e[n];if(t[p])try{e[n]=[t,o,u],_||g("qsymbol",s({},A));const r=m(o,t);q(r)&&await r}catch(e){g("qerror",s({error:e},A))}finally{e[n]=k}}}},g=(t,n)=>{e.dispatchEvent(v(t,n))},_=e=>e[c](/([A-Z])/g,(e=>"-"+e.toLowerCase())),A=async e=>{let t=_(e.type),n=e[l];for(m("-document",e,t);n&&n[f];){const r=E(n,"",e,t);let o=e.cancelBubble;q(r)&&await r,o=o||e.cancelBubble||n.hasAttribute("stoppropagation:"+e.type),n=e.bubbles&&!0!==o?n.parentElement:null}},k=e=>{m("-window",e,_(e.type))},C=()=>{var n;const s=e.readyState;if(!t&&("interactive"==s||"complete"==s)&&(a.forEach(d),t=1,g("qinit"),(null!=(n=r.requestIdleCallback)?n:r.setTimeout).bind(r)((()=>g("qidle"))),o.has(b))){const e=y("[on\\\\:"+b+"]"),t=new IntersectionObserver((e=>{for(const n of e)n.isIntersecting&&(t.unobserve(n[l]),E(n[l],"",v(b,n)))}));e[i]((e=>t.observe(e)))}},O=(e,t,n,r=!1)=>e.addEventListener(t,n,{capture:r,passive:!1}),S=(...e)=>{for(const t of e)"string"==typeof t?o.has(t)||(a.forEach((e=>O(e,t,A,!0))),O(r,t,k,!0),o.add(t)):a.has(t)||(o.forEach((e=>O(t,e,A,!0))),a.add(t))};if(!(n in e)){e[n]=0;const t=r.qwikevents;Array.isArray(t)&&S(...t),r.qwikevents={events:o,roots:a,push:S},O(e,"readystatechange",C),C()}})(document)})()';
  var QWIK_LOADER_DEFAULT_DEBUG = '(() => {\n    var __defProp = Object.defineProperty;\n    var __getOwnPropSymbols = Object.getOwnPropertySymbols;\n    var __hasOwnProp = Object.prototype.hasOwnProperty;\n    var __propIsEnum = Object.prototype.propertyIsEnumerable;\n    var __defNormalProp = (obj, key, value) => key in obj ? __defProp(obj, key, {\n        enumerable: !0,\n        configurable: !0,\n        writable: !0,\n        value: value\n    }) : obj[key] = value;\n    var __spreadValues = (a, b) => {\n        for (var prop in b || (b = {})) {\n            __hasOwnProp.call(b, prop) && __defNormalProp(a, prop, b[prop]);\n        }\n        if (__getOwnPropSymbols) {\n            for (var prop of __getOwnPropSymbols(b)) {\n                __propIsEnum.call(b, prop) && __defNormalProp(a, prop, b[prop]);\n            }\n        }\n        return a;\n    };\n    ((doc, hasInitialized) => {\n        const Q_CONTEXT = "__q_context__";\n        const win = window;\n        const events =  new Set;\n        const roots =  new Set([ doc ]);\n        const nativeQuerySelectorAll = (root, selector) => Array.from(root.querySelectorAll(selector));\n        const querySelectorAll = query => {\n            const elements = [];\n            roots.forEach((root => elements.push(...nativeQuerySelectorAll(root, query))));\n            return elements;\n        };\n        const findShadowRoots = fragment => {\n            processEventOrNode(fragment);\n            nativeQuerySelectorAll(fragment, "[q\\\\:shadowroot]").forEach((parent => {\n                const shadowRoot = parent.shadowRoot;\n                shadowRoot && findShadowRoots(shadowRoot);\n            }));\n        };\n        const isPromise = promise => promise && "function" == typeof promise.then;\n        const broadcast = (infix, ev, type = ev.type) => {\n            querySelectorAll("[on" + infix + "\\\\:" + type + "]").forEach((el => dispatch(el, infix, ev, type)));\n        };\n        const resolveContainer = containerEl => {\n            if (void 0 === containerEl._qwikjson_) {\n                let script = (containerEl === doc.documentElement ? doc.body : containerEl).lastElementChild;\n                while (script) {\n                    if ("SCRIPT" === script.tagName && "qwik/json" === script.getAttribute("type")) {\n                        containerEl._qwikjson_ = JSON.parse(script.textContent.replace(/\\\\x3C(\\/?script)/gi, "<$1"));\n                        break;\n                    }\n                    script = script.previousElementSibling;\n                }\n            }\n        };\n        const createEvent = (eventName, detail) => new CustomEvent(eventName, {\n            detail: detail\n        });\n        const dispatch = async (element, scope, ev, eventName = ev.type) => {\n            const attrName = "on" + scope + ":" + eventName;\n            element.hasAttribute("preventdefault:" + eventName) && ev.preventDefault();\n            const ctx = element._qc_;\n            const relevantListeners = ctx && ctx.li.filter((li => li[0] === attrName));\n            if (relevantListeners && relevantListeners.length > 0) {\n                for (const listener of relevantListeners) {\n                    const results = listener[1].getFn([ element, ev ], (() => element.isConnected))(ev, element);\n                    const cancelBubble = ev.cancelBubble;\n                    isPromise(results) && await results;\n                    cancelBubble && ev.stopPropagation();\n                }\n                return;\n            }\n            const qDispatchEvent = element.qDispatchEvent;\n            if (qDispatchEvent) {\n                return qDispatchEvent(ev, scope);\n            }\n            const attrValue = element.getAttribute(attrName);\n            if (attrValue) {\n                const container = element.closest("[q\\\\:container]:not([q\\\\:container=html]):not([q\\\\:container=text])");\n                const qBase = container.getAttribute("q:base");\n                const qVersion = container.getAttribute("q:version") || "unknown";\n                const qManifest = container.getAttribute("q:manifest-hash") || "dev";\n                const base = new URL(qBase, doc.baseURI);\n                for (const qrl of attrValue.split("\\n")) {\n                    const url = new URL(qrl, base);\n                    const href = url.href;\n                    const symbol = url.hash.replace(/^#?([^?[|]*).*$/, "$1") || "default";\n                    const reqTime = performance.now();\n                    let handler;\n                    let importError;\n                    let error;\n                    const isSync = qrl.startsWith("#");\n                    const eventData = {\n                        qBase: qBase,\n                        qManifest: qManifest,\n                        qVersion: qVersion,\n                        href: href,\n                        symbol: symbol,\n                        element: element,\n                        reqTime: reqTime\n                    };\n                    if (isSync) {\n                        const hash = container.getAttribute("q:instance");\n                        handler = (doc["qFuncs_" + hash] || [])[Number.parseInt(symbol)];\n                        if (!handler) {\n                            importError = "sync";\n                            error = new Error("sync handler error for symbol: " + symbol);\n                        }\n                    } else {\n                        const uri = url.href.split("#")[0];\n                        try {\n                            const module = import(\n                                                        uri);\n                            resolveContainer(container);\n                            handler = (await module)[symbol];\n                            if (!handler) {\n                                importError = "no-symbol";\n                                error = new Error(`${symbol} not in ${uri}`);\n                            }\n                        } catch (err) {\n                            importError || (importError = "async");\n                            error = err;\n                        }\n                    }\n                    if (!handler) {\n                        emitEvent("qerror", __spreadValues({\n                            importError: importError,\n                            error: error\n                        }, eventData));\n                        console.error(error);\n                        break;\n                    }\n                    const previousCtx = doc[Q_CONTEXT];\n                    if (element.isConnected) {\n                        try {\n                            doc[Q_CONTEXT] = [ element, ev, url ];\n                            isSync || emitEvent("qsymbol", __spreadValues({}, eventData));\n                            const results = handler(ev, element);\n                            isPromise(results) && await results;\n                        } catch (error2) {\n                            emitEvent("qerror", __spreadValues({\n                                error: error2\n                            }, eventData));\n                        } finally {\n                            doc[Q_CONTEXT] = previousCtx;\n                        }\n                    }\n                }\n            }\n        };\n        const emitEvent = (eventName, detail) => {\n            doc.dispatchEvent(createEvent(eventName, detail));\n        };\n        const camelToKebab = str => str.replace(/([A-Z])/g, (a => "-" + a.toLowerCase()));\n        const processDocumentEvent = async ev => {\n            let type = camelToKebab(ev.type);\n            let element = ev.target;\n            broadcast("-document", ev, type);\n            while (element && element.getAttribute) {\n                const results = dispatch(element, "", ev, type);\n                let cancelBubble = ev.cancelBubble;\n                isPromise(results) && await results;\n                cancelBubble = cancelBubble || ev.cancelBubble || element.hasAttribute("stoppropagation:" + ev.type);\n                element = ev.bubbles && !0 !== cancelBubble ? element.parentElement : null;\n            }\n        };\n        const processWindowEvent = ev => {\n            broadcast("-window", ev, camelToKebab(ev.type));\n        };\n        const processReadyStateChange = () => {\n            var _a;\n            const readyState = doc.readyState;\n            if (!hasInitialized && ("interactive" == readyState || "complete" == readyState)) {\n                roots.forEach(findShadowRoots);\n                hasInitialized = 1;\n                emitEvent("qinit");\n                (null != (_a = win.requestIdleCallback) ? _a : win.setTimeout).bind(win)((() => emitEvent("qidle")));\n                if (events.has("qvisible")) {\n                    const results = querySelectorAll("[on\\\\:qvisible]");\n                    const observer = new IntersectionObserver((entries => {\n                        for (const entry of entries) {\n                            if (entry.isIntersecting) {\n                                observer.unobserve(entry.target);\n                                dispatch(entry.target, "", createEvent("qvisible", entry));\n                            }\n                        }\n                    }));\n                    results.forEach((el => observer.observe(el)));\n                }\n            }\n        };\n        const addEventListener = (el, eventName, handler, capture = !1) => el.addEventListener(eventName, handler, {\n            capture: capture,\n            passive: !1\n        });\n        const processEventOrNode = (...eventNames) => {\n            for (const eventNameOrNode of eventNames) {\n                if ("string" == typeof eventNameOrNode) {\n                    if (!events.has(eventNameOrNode)) {\n                        roots.forEach((root => addEventListener(root, eventNameOrNode, processDocumentEvent, !0)));\n                        addEventListener(win, eventNameOrNode, processWindowEvent, !0);\n                        events.add(eventNameOrNode);\n                    }\n                } else if (!roots.has(eventNameOrNode)) {\n                    events.forEach((eventName => addEventListener(eventNameOrNode, eventName, processDocumentEvent, !0)));\n                    roots.add(eventNameOrNode);\n                }\n            }\n        };\n        if (!(Q_CONTEXT in doc)) {\n            doc[Q_CONTEXT] = 0;\n            const qwikevents = win.qwikevents;\n            Array.isArray(qwikevents) && processEventOrNode(...qwikevents);\n            win.qwikevents = {\n                events: events,\n                roots: roots,\n                push: processEventOrNode\n            };\n            addEventListener(doc, "readystatechange", processReadyStateChange);\n            processReadyStateChange();\n        }\n    })(document);\n})()';
  var import_bmp = __toESM(require_bmp(), 1);
  var import_cur = __toESM(require_cur(), 1);
  var import_dds = __toESM(require_dds(), 1);
  var import_gif = __toESM(require_gif(), 1);
  var import_icns = __toESM(require_icns(), 1);
  var import_ico = __toESM(require_ico(), 1);
  var import_j2c = __toESM(require_j2c(), 1);
  var import_jp2 = __toESM(require_jp2(), 1);
  var import_jpg = __toESM(require_jpg(), 1);
  var import_ktx = __toESM(require_ktx(), 1);
  var import_png = __toESM(require_png(), 1);
  var import_pnm = __toESM(require_pnm(), 1);
  var import_psd = __toESM(require_psd(), 1);
  var import_svg = __toESM(require_svg(), 1);
  var import_tga = __toESM(require_tga(), 1);
  var import_webp = __toESM(require_webp(), 1);
  var import_heif = __toESM(require_heif(), 1);
  var firstBytes = {
    56: "psd",
    66: "bmp",
    68: "dds",
    71: "gif",
    82: "webp",
    105: "icns",
    137: "png",
    255: "jpg"
  };
  var types = {
    webp: import_webp.default.WEBP,
    jpg: import_jpg.default.JPG,
    png: import_png.default.PNG,
    svg: import_svg.default.SVG,
    gif: import_gif.default.GIF,
    avif: import_heif.default.HEIF,
    bmp: import_bmp.default.BMP,
    cur: import_cur.default.CUR,
    dds: import_dds.default.DDS,
    icns: import_icns.default.ICNS,
    ico: import_ico.default.ICO,
    j2c: import_j2c.default.J2C,
    jp2: import_jp2.default.JP2,
    ktx: import_ktx.default.KTX,
    pnm: import_pnm.default.PNM,
    psd: import_psd.default.PSD,
    tga: import_tga.default.TGA
  };
  var keys = Object.keys(types);
  function detector(buffer) {
    const byte = buffer[0];
    const type = firstBytes[byte];
    if (type && types[type].validate(buffer)) {
      return type;
    }
    return keys.find((key => types[key].validate(buffer)));
  }
  function lookup(buffer) {
    const type = detector(buffer);
    if ("undefined" !== typeof type) {
      const size = types[type].calculate(buffer);
      if (void 0 !== size) {
        size.type = type;
        return size;
      }
    }
  }
  async function getInfoForSrc(src) {
    if (!/^(https?|file|capacitor):/.test(src)) {
      return;
    }
    try {
      const res = await fetch(src, {
        headers: {
          Accept: "image/*,*/*"
        }
      });
      if (!res.ok) {
        console.error("can not fetch", src);
        return;
      }
      const buffer = await res.arrayBuffer();
      const size = lookup(Buffer.from(buffer));
      if (size) {
        return {
          width: size.width,
          height: size.height,
          type: size.type,
          size: buffer.byteLength
        };
      }
    } catch (err) {
      console.error(err);
      return;
    }
  }
  var getImageSizeServer = (sys, rootDir, srcDir) => async (req, res, next) => {
    try {
      const fs = await sys.dynamicImport("node:fs");
      const path = await sys.dynamicImport("node:path");
      const url = new URL(req.url, "http://localhost:3000/");
      if ("GET" === req.method && "/__image_info" === url.pathname) {
        const imageURL = url.searchParams.get("url");
        res.setHeader("content-type", "application/json");
        if (imageURL) {
          const info = await getInfoForSrc(imageURL);
          res.setHeader("cache-control", "public, max-age=31536000, immutable");
          info ? res.write(JSON.stringify(info)) : res.statusCode = 404;
        } else {
          res.statusCode = 500;
          const info = {
            message: "error"
          };
          res.write(JSON.stringify(info));
        }
        res.end();
        return;
      }
      if ("POST" === req.method && "/__image_fix" === url.pathname) {
        const loc = url.searchParams.get("loc");
        const width = url.searchParams.get("width");
        const height = url.searchParams.get("height");
        const src = url.searchParams.get("src");
        const currentHref = url.searchParams.get("currentHref");
        const locParts = loc.split(":");
        const column = parseInt(locParts[locParts.length - 1], 10) - 1;
        let line = parseInt(locParts[locParts.length - 2], 10) - 1;
        const filePath = path.resolve(srcDir, locParts.slice(0, locParts.length - 2).join(":"));
        const extension = path.extname(filePath).toLowerCase();
        const buffer = fs.readFileSync(filePath);
        let text = buffer.toString("utf-8");
        let offset = 0;
        for (;offset < text.length; offset++) {
          if (0 === line) {
            offset += column;
            break;
          }
          if ("\n" === text[offset]) {
            line--;
            continue;
          }
        }
        if ("<img" !== text.slice(offset, offset + 4)) {
          console.error("Could not apply auto fix, because it was not possible to find the original <img> tag");
          res.statusCode = 500;
          return;
        }
        const end = text.indexOf(">", offset) + 1;
        if (end < offset) {
          console.error("Could not apply auto fix, because it was not possible to find the original <img> tag");
          res.statusCode = 500;
          return;
        }
        const extensionSupportsImport = [ ".ts", ".tsx", ".js", ".jsx", ".mdx" ].includes(extension);
        let imgTag = text.slice(offset, end);
        if (src && currentHref && extensionSupportsImport) {
          const urlSrc = new URL(src);
          const urlCurrent = new URL(currentHref);
          if (urlSrc.origin === urlCurrent.origin) {
            const publicImagePath = path.join(rootDir, "public", urlSrc.pathname);
            const rootImagePath = path.join(rootDir, urlSrc.pathname);
            let relativeLocation;
            if (fs.existsSync(publicImagePath)) {
              const mediaSrc = path.join(srcDir, "media", path.dirname(urlSrc.pathname));
              await fs.promises.mkdir(mediaSrc, {
                recursive: true
              });
              await fs.promises.copyFile(publicImagePath, path.join(srcDir, "media", urlSrc.pathname));
              relativeLocation = "~/media" + urlSrc.pathname;
            } else {
              if (!fs.existsSync(rootImagePath)) {
                return;
              }
              relativeLocation = urlSrc.pathname.replace("/src/", "~/");
            }
            const importIdent = imgImportName(urlSrc.pathname);
            const importSrc = `${relativeLocation}?jsx`;
            imgTag = imgTag.replace(/^<img/, `<${importIdent}`);
            imgTag = imgTag.replace(/\bwidth=(({[^}]*})|('[^']*')|("[^"]*"))\s*/, "");
            imgTag = imgTag.replace(/\bheight=(({[^}]*})|('[^']*')|("[^"]*"))\s*/, "");
            imgTag = imgTag.replace(/\bsrc=(({[^}]*})|('[^']*')|("[^"]*"))\s*/, "");
            let insertImport = 0;
            if (".mdx" === extension && text.startsWith("---")) {
              insertImport = text.indexOf("---", 4) + 3;
              if (-1 === insertImport) {
                return;
              }
            }
            const newImport = `\nimport ${importIdent} from '${importSrc}';`;
            text = `${text.slice(0, insertImport)}${newImport}${text.slice(insertImport, offset)}${imgTag}${text.slice(end)}`;
            fs.writeFileSync(filePath, text);
            return;
          }
        }
        imgTag = imgTag.replace(/\bwidth=(({[^}]*})|('[^']*')|("[^"]*"))/, `width="${width}"`);
        imgTag = imgTag.replace(/\bheight=(({[^}]*})|('[^']*')|("[^"]*"))/, `height="${height}"`);
        imgTag.includes("height=") || (imgTag = imgTag.replace(/<img/, `<img height="${height}"`));
        imgTag.includes("width=") || (imgTag = imgTag.replace(/<img/, `<img width="${width}"`));
        text = text.slice(0, offset) + imgTag + text.slice(end);
        fs.writeFileSync(filePath, text);
      } else {
        next();
      }
    } catch (e) {
      e instanceof Error && await formatError(sys, e);
      next(e);
    }
  };
  function imgImportName(value) {
    const dot = value.lastIndexOf(".");
    const slash = value.lastIndexOf("/");
    value = value.substring(slash + 1, dot);
    return `Img${toPascalCase(value)}`;
  }
  function toPascalCase(string) {
    return `${string}`.toLowerCase().replace(new RegExp(/[-_]+/, "g"), " ").replace(new RegExp(/[^\w\s]/, "g"), "").replace(new RegExp(/\s+(.)(\w*)/, "g"), (($1, $2, $3) => `${$2.toUpperCase() + $3}`)).replace(new RegExp(/\w/), (s => s.toUpperCase()));
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
  init(0, 0);
  init(1, 22);
  init(2, 22);
  init(3, 23);
  init(4, 24);
  init(7, 27);
  init(8, 28);
  init(9, 29);
  init(30, 39);
  init(31, 39);
  init(32, 39);
  init(33, 39);
  init(34, 39);
  var magenta = init(35, 39);
  init(36, 39);
  init(37, 39);
  init(90, 39);
  init(90, 39);
  init(40, 49);
  init(41, 49);
  init(42, 49);
  init(43, 49);
  init(44, 49);
  init(45, 49);
  init(46, 49);
  init(47, 49);
  var VITE_ERROR_OVERLAY_STYLES = "\nvite-error-overlay {\n  --color-bright: rgba(255, 255, 255, 0.8);\n  --color-yellow: rgba(255,246,85,0.8);\n  --qwik-dark-blue: #006ce9;\n  --qwik-light-blue: #3ec2f7;\n  --qwik-light-purple: #ac7ff4;\n  --qwik-dark-purple: #713fc2;\n  --yellow: #fff;                   /* override vite yellow */\n  --purple: var(--color-bright);    /* override vite purple */\n  --red: var(--qwik-light-blue);    /* override vite red */\n\n  --vertical-box-spacing: 15px;\n  --box-padding: 20px;\n  --box-margin: 0 0 var(--vertical-box-spacing) 0;\n  --box-background: rgba(0, 0, 0, 0.5);\n  --box-border-radius: 8px;\n}\n\nvite-error-overlay::part(backdrop) {\n  background: rgb(2 11 17 / 60%);\n  backdrop-filter: blur(20px) brightness(0.4) saturate(3);\n}\n\nvite-error-overlay::part(window) {\n  background: transparent;\n  border: none;\n  box-shadow: none;\n  box-sizing: border-box;\n  margin: 50px auto;\n  max-width: 1200px;\n  padding: var(--box-padding);\n  width: 90%;\n}\n\nvite-error-overlay::part(message) {\n  display: flex;\n  flex-direction: column;\n  font-size: 1.6rem;\n  line-height: 1.7;\n  margin-bottom: 30px;\n}\n\nvite-error-overlay::part(plugin) {\n  font-size: 0.8rem;\n  font-weight: 100;\n}\n\nvite-error-overlay::part(file),\nvite-error-overlay::part(frame),\nvite-error-overlay::part(stack),\nvite-error-overlay::part(tip) {\n  background: var(--box-background);\n  border-left: 5px solid transparent;\n  border-radius: var(--box-border-radius);\n  margin: var(--box-margin);\n  min-height: 50px;\n  padding: var(--box-padding);\n  position: relative;\n}\n\nvite-error-overlay::part(file) {\n  border-left-color: rgb(25 182 246);\n  color: var(--color-bright);\n}\n\nvite-error-overlay::part(frame) {\n  border-left-color: var(--color-yellow);\n  color: var(--color-yellow);\n}\n\nvite-error-overlay::part(stack) {\n  border-left-color: #FF5722;\n}\n\n\nvite-error-overlay::part(tip) {\n  border-top: none;\n  border-left-color: rgb(172, 127, 244);\n}\n\nvite-error-overlay::part(file):before,\nvite-error-overlay::part(frame):before,\nvite-error-overlay::part(stack):before {\n  border-bottom: 1px solid #222;\n  color: var(--color-bright);\n  display: block;\n  margin-bottom: 15px;\n  padding-bottom: 5px;\n  padding-left: 30px; /* space for icon */\n  font-size: .8rem;\n}\n\nvite-error-overlay::part(file):before {\n  content: 'File';\n}\n\nvite-error-overlay::part(frame):before {\n  content: 'Frame';\n}\n\nvite-error-overlay::part(stack):before {\n  content: 'Stack Trace';\n}\n\nvite-error-overlay::part(file):after,\nvite-error-overlay::part(frame):after,\nvite-error-overlay::part(stack):after {\n  content: '';\n  display: block;\n  height: 20px;\n  position: absolute;\n  left: var(--box-padding);\n  top: var(--box-padding);\n  width: 20px;\n}\n\nvite-error-overlay::part(file):after {\n  background-image: url(\"data:image/svg+xml,%3Csvg width='20px' height='20px' viewBox='0 0 24 24' version='1.1' xmlns='http://www.w3.org/2000/svg' xmlns:xlink='http://www.w3.org/1999/xlink'%3E%3Ctitle%3EFile-Generic%3C/title%3E%3Cg id='Page-1' stroke='none' stroke-width='1' fill='none' fill-rule='evenodd'%3E%3Cg id='File-Generic'%3E%3Crect id='Rectangle' fill-rule='nonzero' x='0' y='0' width='24' height='24'%3E%3C/rect%3E%3Cpath d='M4 5 C4 3.89543 4.89543 3 6 3 L15.1716 3 C15.702 3 16.2107 3.21071 16.5858 3.58579 L19.4142 6.41421 C19.7893 6.78929 20 7.29799 20 7.82843 L20 19 C20 20.1046 19.1046 21 18 21 L6 21 C4.89543 21 4 20.1046 4 19 L4 5 Z' id='Path' stroke='rgba(255,255,255,0.7)' stroke-width='1' stroke-linecap='round'%3E%3C/path%3E%3Cpath d='M15 4 L15 6 C15 7.10457 15.8954 8 17 8 L19 8' id='Path' stroke='rgba(255,255,255,0.7)' stroke-width='1' stroke-linecap='round'%3E%3C/path%3E%3C/g%3E%3C/g%3E%3C/svg%3E\");\n}\n\nvite-error-overlay::part(frame):after {\n  background-image: url(\"data:image/svg+xml,%3Csvg width='20px' height='20px' viewBox='0 0 24 24' fill='none' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M15.6602 2.84952H19.1516C20.2555 2.84952 21.1504 3.74444 21.1504 4.84839V8.3398' stroke='rgba(255,255,255,0.7)' stroke-width='1.69904' stroke-linecap='round'/%3E%3Cpath d='M2.84949 8.33981L2.84949 4.8484C2.84949 3.74446 3.74441 2.84953 4.84836 2.84953L8.33977 2.84953' stroke='rgba(255,255,255,0.7)' stroke-width='1.69904' stroke-linecap='round'/%3E%3Cpath d='M21.1505 15.6602L21.1505 19.1516C21.1505 20.2555 20.2556 21.1505 19.1516 21.1505L15.6602 21.1505' stroke='rgba(255,255,255,0.7)' stroke-width='1.69904' stroke-linecap='round'/%3E%3Cpath d='M8.33984 21.1505L4.84843 21.1505C3.74449 21.1505 2.84956 20.2555 2.84956 19.1516L2.84956 15.6602' stroke='rgba(255,255,255,0.7)' stroke-width='1.69904' stroke-linecap='round'/%3E%3C/svg%3E\");\n}\n\nvite-error-overlay::part(stack):after {\n  background-image: url(\"data:image/svg+xml,%3Csvg width='20px' height='20px' viewBox='0 0 24 24' fill='none' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M14.78 20H9.78C7.98 20 4.58 19.09 4.58 15.64C4.58 12.19 7.98 11.28 9.78 11.28H14.22C14.37 11.28 17.92 11.23 17.92 8.42C17.92 5.61 14.37 5.56 14.22 5.56H9.22C9.02109 5.56 8.83032 5.48098 8.68967 5.34033C8.54902 5.19968 8.47 5.00891 8.47 4.81C8.47 4.61109 8.54902 4.42032 8.68967 4.27967C8.83032 4.13902 9.02109 4.06 9.22 4.06H14.22C16.02 4.06 19.42 4.97 19.42 8.42C19.42 11.87 16.02 12.78 14.22 12.78H9.78C9.63 12.78 6.08 12.83 6.08 15.64C6.08 18.45 9.63 18.5 9.78 18.5H14.78C14.9789 18.5 15.1697 18.579 15.3103 18.7197C15.451 18.8603 15.53 19.0511 15.53 19.25C15.53 19.4489 15.451 19.6397 15.3103 19.7803C15.1697 19.921 14.9789 20 14.78 20Z' fill='rgba(255,255,255,0.7)'/%3E%3Cpath d='M6.44 8.31C5.74314 8.30407 5.06363 8.09202 4.48708 7.70056C3.91054 7.30909 3.46276 6.75573 3.20018 6.11021C2.93759 5.46469 2.87195 4.75589 3.01153 4.07312C3.1511 3.39036 3.48965 2.76418 3.9845 2.2735C4.47935 1.78281 5.10837 1.44958 5.79229 1.31579C6.47622 1.182 7.18444 1.25363 7.82771 1.52167C8.47099 1.78971 9.02054 2.24215 9.40711 2.82199C9.79368 3.40182 9.99998 4.08311 10 4.78C10 5.2461 9.90773 5.70759 9.72846 6.13783C9.54919 6.56808 9.28648 6.95856 8.95551 7.28675C8.62453 7.61494 8.23184 7.87433 7.80009 8.04995C7.36834 8.22558 6.90609 8.31396 6.44 8.31ZM6.44 2.75C6.04444 2.75 5.65776 2.86729 5.32886 3.08706C4.99996 3.30682 4.74362 3.61918 4.59224 3.98463C4.44087 4.35008 4.40126 4.75221 4.47843 5.14018C4.5556 5.52814 4.74609 5.8845 5.02579 6.16421C5.3055 6.44391 5.66186 6.6344 6.04982 6.71157C6.43779 6.78874 6.83992 6.74913 7.20537 6.59776C7.57082 6.44638 7.88318 6.19003 8.10294 5.86114C8.32271 5.53224 8.44 5.14556 8.44 4.75C8.44 4.48735 8.38827 4.22728 8.28776 3.98463C8.18725 3.74198 8.03993 3.5215 7.85422 3.33578C7.6685 3.15007 7.44802 3.00275 7.20537 2.90224C6.96272 2.80173 6.70265 2.75 6.44 2.75Z' fill='rgba(255,255,255,0.7)'/%3E%3Cpath d='M17.56 22.75C16.8614 22.752 16.1779 22.5466 15.5961 22.1599C15.0143 21.7733 14.5603 21.2227 14.2916 20.5778C14.0229 19.933 13.9515 19.2229 14.0866 18.5375C14.2217 17.8521 14.5571 17.2221 15.0504 16.7275C15.5437 16.2328 16.1726 15.8956 16.8577 15.7586C17.5427 15.6215 18.253 15.6909 18.8986 15.9577C19.5442 16.2246 20.0961 16.6771 20.4844 17.2578C20.8727 17.8385 21.08 18.5214 21.08 19.22C21.08 20.1545 20.7095 21.0508 20.0496 21.7125C19.3898 22.3743 18.4945 22.7473 17.56 22.75ZM17.56 17.19C17.1644 17.19 16.7778 17.3073 16.4489 17.5271C16.12 17.7468 15.8636 18.0592 15.7122 18.4246C15.5609 18.7901 15.5213 19.1922 15.5984 19.5802C15.6756 19.9681 15.8661 20.3245 16.1458 20.6042C16.4255 20.8839 16.7819 21.0744 17.1698 21.1516C17.5578 21.2287 17.9599 21.1891 18.3254 21.0377C18.6908 20.8864 19.0032 20.63 19.2229 20.3011C19.4427 19.9722 19.56 19.5856 19.56 19.19C19.56 18.6596 19.3493 18.1508 18.9742 17.7758C18.5991 17.4007 18.0904 17.19 17.56 17.19Z' fill='rgba(255,255,255,0.7)'/%3E%3C/svg%3E\");\n}\n\nvite-error-overlay::part(tip):before {\n  content: \"Not sure how to solve this? Visit https://qwik.dev or connect with the community on Discord.\";\n  display: block;\n  margin-bottom: 1em;\n}\n";
  var image_size_runtime_default = "<style>\n  [data-qwik-cls] {\n    outline: 2px solid red;\n  }\n  [data-qwik-cls]::after {\n    position: absolute;\n    font-size: 12px;\n    content: 'CLS ' attr(data-qwik-cls);\n    font-family: monospace;\n    font-weight: bold;\n    background: red;\n    color: white;\n    margin: -2px;\n    padding: 1px;\n    line-height: 1;\n    pointer-events: none;\n  }\n  #qwik-image-warning-container {\n    position: absolute !important;\n    top: 0 !important;\n    left: 0 !important;\n    width: 0 !important;\n    overflow: visible !important;\n    height: 0 !important;\n    pointer-events: none !important;\n    contain: size layout style content;\n    z-index: 1;\n  }\n</style>\n<template id=\"qwik-image-warning-template\">\n  <style>\n    :host {\n      position: absolute;\n      border: 1px solid red;\n      pointer-events: none;\n      z-index: 1;\n      contain: layout size;\n    }\n\n    #icon {\n      border: 0;\n      margin: 5px;\n      color: black;\n      max-width: 100%;\n      width: 20px;\n      background: yellow;\n      border-radius: 100%;\n      height: 20px;\n      padding: 3px;\n      pointer-events: all;\n      cursor: pointer;\n    }\n\n    #icon svg {\n      width: 100%;\n      height: auto;\n      pointer-events: none;\n    }\n\n    dialog {\n      padding: 0;\n      border: 0;\n      margin: 0 5px;\n      background: #ffffe8;\n      color: black;\n      width: 250px;\n      font-size: 11px;\n      position: absolute;\n      inset-inline-start: unset;\n      inset-inline-end: unset;\n      border-radius: 5px;\n      pointer-events: all;\n      overflow: hidden;\n      box-shadow: 0px -2px 20px 0px #0000002e;\n      z-index: 10000;\n    }\n\n    .top {\n      bottom: calc(100% + 5px);\n    }\n    .bottom {\n      top: 40px;\n    }\n    .right {\n      inset-inline-start: 0;\n      inset-inline-end: unset;\n    }\n    .left {\n      inset-inline-start: unset;\n      inset-inline-end: calc(100% - 40px);\n    }\n\n    .content {\n      padding: 5px;\n    }\n\n    #loc {\n      background: #2e3801;\n      color: #d2d2d2;\n      font-family: monospace;\n      padding: 3px 5px;\n      pointer-events: all;\n      margin: 0;\n      border: 0;\n      cursor: pointer;\n      font-size: 11px;\n      width: calc(100% - 24px);\n      text-overflow: ellipsis;\n      overflow: hidden;\n      display: block;\n      direction: rtl;\n      text-align: right;\n    }\n    #loc:hover {\n      background: #3a4a01;\n    }\n\n    pre {\n      background: #f1fb8e;\n      padding: 5px;\n      margin: 5px 0;\n      border-radius: 3px;\n      user-select: none;\n    }\n\n    pre span {\n      user-select: all;\n    }\n\n    a {\n      text-decoration: underline;\n    }\n\n    #close {\n      border: 0;\n      width: 25px;\n      height: 25px;\n      position: absolute;\n      right: 0;\n      top: 0;\n      background: #ffe14f;\n      color: black;\n      font-weight: 900;\n      padding: 0;\n      margin: 0;\n      display: flex;\n      align-items: center;\n      justify-content: center;\n      line-height: 1;\n      cursor: pointer;\n    }\n    #close:hover {\n      background: #ffeb6f;\n    }\n\n    #action-btn {\n      border: 2px solid #18ae00;\n      padding: 2px 4px;\n      background: #50ff50;\n      border-radius: 5px;\n      color: #0c5500;\n      font-weight: 800;\n      font-size: 10px;\n      cursor: pointer;\n    }\n\n    p {\n      margin: 5px 0;\n    }\n\n    h2 {\n      font-weight: 900;\n      margin: 10px 0;\n    }\n  </style>\n  <button id=\"icon\" type=\"button\" aria-label=\"Open image dev dialog\">\n    <svg width=\"32\" height=\"32\" viewBox=\"0 0 24 24\">\n      <path\n        fill=\"currentColor\"\n        d=\"M2.725 21q-.275 0-.5-.138t-.35-.362q-.125-.225-.138-.488t.138-.512l9.25-16q.15-.25.388-.375T12 3q.25 0 .488.125t.387.375l9.25 16q.15.25.138.513t-.138.487q-.125.225-.35.363t-.5.137H2.725ZM12 18q.425 0 .713-.288T13 17q0-.425-.288-.713T12 16q-.425 0-.713.288T11 17q0 .425.288.713T12 18Zm0-3q.425 0 .713-.288T13 14v-3q0-.425-.288-.713T12 10q-.425 0-.713.288T11 11v3q0 .425.288.713T12 15Z\"\n      />\n    </svg>\n  </button>\n  <dialog>\n    <form method=\"dialog\">\n      <button id=\"close\" type=\"submit\" aria-label=\"Close\">X</button>\n    </form>\n    <button id=\"loc\"></button>\n    <div class=\"content\">\n      <h2 id=\"title\"></h2>\n      <p id=\"message\"></p>\n      <p class=\"action-container\"></p>\n    </div>\n  </dialog>\n</template>\n<div id=\"qwik-image-warning-container\"></div>\n<script>\n  (function () {\n    function getPositionClasses(target) {\n      const { x, y } = target.getBoundingClientRect();\n      const windowWidth = window.innerWidth;\n      let horizontal = 'right';\n      let vertical = 'bottom';\n      if (x > windowWidth - 260) {\n        horizontal = 'left';\n      }\n      return `${vertical} ${horizontal}`;\n    }\n    class ImageWarning extends HTMLElement {\n      #actionFn = null;\n      constructor() {\n        super();\n        this.attachShadow({ mode: 'open' });\n        this.shadowRoot.appendChild(\n          document.importNode(document.getElementById('qwik-image-warning-template').content, true)\n        );\n        const dialog = this.shadowRoot.querySelector('dialog');\n\n        this.shadowRoot.addEventListener('click', async (ev) => {\n          const target = ev.target;\n          if (target.nodeName === 'BUTTON') {\n            if (target.id === 'action-btn') {\n              if (this.#actionFn) {\n                this.#actionFn();\n                dialog.close();\n              }\n            } else if (target.id === 'icon') {\n              if (dialog.open) {\n                dialog.close();\n              } else {\n                dialog.className = getPositionClasses(target);\n                dialog.show();\n              }\n            } else if (target.id === 'loc' && target.dataset.url) {\n              globalThis.qwikOpenInEditor(target.dataset.url);\n            }\n          }\n        });\n      }\n\n      set loc(value) {\n        const anchor = this.shadowRoot.querySelector('#loc');\n        anchor.textContent = value;\n        if (globalThis.qwikOpenInEditor) {\n          anchor.dataset.url = value;\n        }\n      }\n\n      set header(value) {\n        this.shadowRoot.querySelector('#title').textContent = value;\n      }\n\n      set message(value) {\n        this.shadowRoot.querySelector('#message').innerHTML = value;\n      }\n\n      set actionFn(value) {\n        this.#actionFn = value;\n      }\n      set actionName(value) {\n        if (value) {\n          this.shadowRoot.querySelector('.action-container').innerHTML =\n            `<button id=\"action-btn\" type=\"button\">${value}</button>`;\n        }\n      }\n    }\n    customElements.define('image-warning', ImageWarning);\n\n    const shiftsMap = new Map();\n    const visibleNodes = new Map();\n    const imageContainer = document.querySelector('#qwik-image-warning-container');\n    let skip = false;\n\n    async function _getInfo(originalSrc) {\n      // Put all supported protocols here, see also packages/qwik/src/optimizer/src/plugins/image-size-server.ts\n      if (!/^(https?|file|capacitor):/.test(originalSrc)) {\n        return undefined;\n      }\n      const url = new URL('/__image_info', location.href);\n      url.searchParams.set('url', originalSrc);\n      const res = await fetch(url);\n      if (res.ok) {\n        return await res.json();\n      } else {\n        return null;\n      }\n    }\n\n    const map = new Map();\n    function getInfo(originalSrc) {\n      let p = map.get(originalSrc);\n      if (typeof p === 'undefined') {\n        p = _getInfo(originalSrc);\n        map.set(originalSrc, p);\n      }\n      return p;\n    }\n    function isDefinedUnit(value) {\n      return value.endsWith('px');\n    }\n    async function doImg(node) {\n      const scrollX = window.scrollX;\n      const scrollY = window.scrollY;\n      const rect = node.getBoundingClientRect();\n      const originalSrc = node.currentSrc;\n      const info = await getInfo(originalSrc);\n      let overlay = visibleNodes.get(node);\n      const wideScreen = window.innerWidth > 500;\n      if (info && wideScreen) {\n        let layoutInvalidation = false;\n        const loc = node.getAttribute('data-qwik-inspector');\n        const browserArea = rect.width * rect.height;\n        if (!node.hasAttribute('width') || !node.hasAttribute('height')) {\n          skip = true;\n          const computedStyles = getComputedStyle(node);\n          const hasAspect = computedStyles.getPropertyValue('aspect-ratio').toString() !== 'auto';\n          const hasWidth = isDefinedUnit(computedStyles.getPropertyValue('width').toString());\n          const hasHeight = isDefinedUnit(computedStyles.getPropertyValue('height').toString());\n          const isAbsolute = computedStyles.getPropertyValue('position').toString() === 'absolute';\n          layoutInvalidation =\n            browserArea > 1000 && !isAbsolute && !hasAspect && (!hasWidth || !hasHeight);\n        }\n        const realArea = info.width && info.height;\n        const threshholdArea = realArea * 0.5;\n        const tooBig = browserArea < threshholdArea && info.type !== 'svg';\n        skip = false;\n        if (layoutInvalidation || tooBig) {\n          if (!overlay) {\n            overlay = document.createElement('image-warning');\n            imageContainer.appendChild(overlay);\n            visibleNodes.set(node, overlay);\n          }\n          overlay.style.top = rect.top + scrollY + 'px';\n          overlay.style.left = rect.left + scrollX + 'px';\n          overlay.style.width = rect.width + 'px';\n          overlay.style.height = rect.height + 'px';\n          overlay.info = info;\n          overlay.loc = loc;\n          if (layoutInvalidation) {\n            const clipBoard = `width=\"${info.width}\" height=\"${info.height}\"`;\n            overlay.header = 'Perf: layout shift';\n            overlay.message = `Image\\'s size is unknown until it\\'s loaded, <a href=\"https://web.dev/cls/\" target=\"_blank\" rel=\"noopener noreferrer\">causing layout shift</a>.</p><p>To solve this problem set the width/height in the img tag:</p><pre>&lt;img <span>${clipBoard}</span></pre>`;\n            const uniqueLoc =\n              document.querySelectorAll('[data-qwik-inspector=\"' + loc + '\"]').length === 1;\n            if (loc) {\n              if (uniqueLoc) {\n                overlay.actionName = 'Auto fix';\n                overlay.actionFn = async () => {\n                  const url = new URL('/__image_fix', location.href);\n                  url.searchParams.set('loc', loc);\n                  url.searchParams.set('width', info.width);\n                  url.searchParams.set('height', info.height);\n                  if (!node.srcset) {\n                    url.searchParams.set('src', node.currentSrc);\n                    url.searchParams.set('currentHref', location.href);\n                  }\n                  await fetch(url, {\n                    method: 'POST',\n                  });\n                };\n              } else {\n                overlay.actionName = 'Open in editor';\n                overlay.actionFn = async () => {\n                  await navigator.clipboard.writeText(clipBoard);\n                  globalThis.qwikOpenInEditor(loc);\n                };\n              }\n            }\n          } else if (tooBig) {\n            overlay.header = 'Perf: properly size image';\n            overlay.message = `The image is too big, <a href=\"https://developer.chrome.com/en/docs/lighthouse/performance/uses-responsive-images/\" target=\"_blank\" rel=\"noopener noreferrer\">hurting performance</a>, it should be resized to the size it\\'s displayed at. The image dimensions are ${info.width} x ${info.height} but it\\'s displayed at ${rect.width}x${rect.height}.</p>`;\n          }\n          return;\n        }\n      }\n\n      if (overlay) {\n        overlay.remove();\n        visibleNodes.delete(node);\n      }\n    }\n\n    async function updateImg(node) {\n      const overlay = visibleNodes.get(node);\n      if (!node.isConnected) {\n        if (overlay) {\n          overlay.remove();\n          visibleNodes.delete(node);\n        }\n      } else if (node.complete) {\n        doImg(node);\n      }\n    }\n\n    const resizeObserver = new ResizeObserver((entries) => {\n      if (!skip) {\n        for (const entry of entries) {\n          updateImg(entry.target);\n        }\n      }\n    });\n\n    const observer = new MutationObserver((entry) => {\n      for (const mutation of entry) {\n        for (const node of mutation.addedNodes) {\n          if (node.nodeName === 'IMG') {\n            resizeObserver.observe(node);\n          } else if (node.nodeType === 1) {\n            node.querySelectorAll('img').forEach((img) => {\n              resizeObserver.observe(img);\n            });\n          }\n        }\n        for (const node of mutation.removedNodes) {\n          if (node.nodeName === 'IMG') {\n            updateImg(node);\n            resizeObserver.unobserve(node);\n          } else if (node.nodeType === 1) {\n            node.querySelectorAll('img').forEach((img) => {\n              updateImg(img);\n              resizeObserver.unobserve(img);\n            });\n          }\n        }\n      }\n    });\n    let perfObserver;\n    let DCLS = 0;\n    const activate = () => {\n      setTimeout(() => {\n        if (perfObserver) {\n          perfObserver.disconnect();\n          if (DCLS > 0.005) {\n            console.error('Detected Layout Shift during page load', DCLS);\n          }\n        }\n        observer.observe(document.body, {\n          childList: true,\n          subtree: true,\n        });\n        document.body.querySelectorAll('img').forEach((node) => {\n          resizeObserver.observe(node);\n        });\n      }, 100);\n    };\n    if (document.readyState === 'complete') {\n      activate();\n    } else {\n      window.addEventListener('load', activate);\n    }\n    const pageAccessedByReload =\n      performance?.navigation.type === 1 ||\n      performance\n        .getEntriesByType('navigation')\n        .map((nav) => nav.type)\n        .includes('reload');\n    if (typeof PerformanceObserver !== 'undefined' && !pageAccessedByReload) {\n      const shiftsMap = new Map();\n      perfObserver = new PerformanceObserver((list) => {\n        list.getEntries().forEach((entry) => {\n          if (entry.hadRecentInput) {\n            return; // Ignore shifts after recent input.\n          }\n          if (entry.value > 0.006) {\n            for (const source of entry.sources) {\n              if (\n                source.node &&\n                source.node.nodeType === 1 &&\n                source.node.nodeName !== 'IMAGE-WARNING'\n              ) {\n                source.node.setAttribute('data-qwik-cls', Number(entry.value).toFixed(3));\n              }\n            }\n          }\n          DCLS += entry.value;\n        });\n      });\n      perfObserver.observe({ type: 'layout-shift', buffered: true });\n    }\n  })();\n<\/script>\n";
  var click_to_component_default = "<style>\n  #qwik-inspector-overlay {\n    position: fixed;\n    background: rgba(24, 182, 246, 0.27);\n    pointer-events: none;\n    box-sizing: border-box;\n    border: 2px solid rgba(172, 126, 244, 0.46);\n    border-radius: 4px;\n    contain: strict;\n    cursor: pointer;\n    z-index: 999999;\n  }\n  #qwik-inspector-info-popup {\n    position: fixed;\n    bottom: 10px;\n    right: 10px;\n    font-family: monospace;\n    background: #000000c2;\n    color: white;\n    padding: 10px 20px;\n    border-radius: 8px;\n    box-shadow:\n      0 20px 25px -5px rgb(0 0 0 / 34%),\n      0 8px 10px -6px rgb(0 0 0 / 24%);\n    backdrop-filter: blur(4px);\n    -webkit-animation: fadeOut 0.3s 3s ease-in-out forwards;\n    animation: fadeOut 0.3s 3s ease-in-out forwards;\n    z-index: 999999;\n    contain: layout;\n  }\n  #qwik-inspector-info-popup p {\n    margin: 0px;\n  }\n  @-webkit-keyframes fadeOut {\n    0% {\n      opacity: 1;\n    }\n    100% {\n      opacity: 0;\n    }\n  }\n\n  @keyframes fadeOut {\n    0% {\n      opacity: 1;\n    }\n    100% {\n      opacity: 0;\n      visibility: hidden;\n    }\n  }\n</style>\n<div id=\"qwik-inspector-info-popup\" aria-hidden=\"true\">Click-to-Source</div>\n<script>\n  (function () {\n    const inspectAttribute = 'data-qwik-inspector';\n    const hotKeys = globalThis.qwikdevtools.hotKeys;\n    const srcDir = globalThis.qwikdevtools.srcDir;\n    document.querySelector('#qwik-inspector-info-popup').textContent =\n      `Click-to-Source: ${hotKeys.join(' + ')}`;\n    console.debug(\n      '%c🔍 Qwik Click-To-Source',\n      'background: #564CE0; color: white; padding: 2px 3px; border-radius: 2px; font-size: 0.8em;',\n      `Hold-press the '${hotKeys.join(' + ')}' key${\n        (hotKeys.length > 1 && 's') || ''\n      } and click a component to jump directly to the source code in your IDE!`\n    );\n    window.__qwik_inspector_state = {\n      pressedKeys: new Set(),\n    };\n    const origin = 'http://local.local';\n    const body = document.body;\n    const overlay = document.createElement('div');\n    overlay.id = 'qwik-inspector-overlay';\n    overlay.setAttribute('aria-hidden', 'true');\n    body.appendChild(overlay);\n\n    function findContainer(el) {\n      if (el && el instanceof Element) {\n        return el.closest(`[${inspectAttribute}]`);\n      }\n      return null;\n    }\n\n    document.addEventListener(\n      'keydown',\n      (event) => {\n        window.__qwik_inspector_state.pressedKeys.add(event.code);\n        updateOverlay();\n      },\n      { capture: true }\n    );\n\n    document.addEventListener(\n      'keyup',\n      (event) => {\n        window.__qwik_inspector_state.pressedKeys.delete(event.code);\n        updateOverlay();\n      },\n      { capture: true }\n    );\n\n    window.addEventListener(\n      'blur',\n      (event) => {\n        window.__qwik_inspector_state.pressedKeys.clear();\n        updateOverlay();\n      },\n      { capture: true }\n    );\n\n    document.addEventListener(\n      'mouseover',\n      (event) => {\n        const target = findContainer(event.target);\n        if (target) {\n          window.__qwik_inspector_state.hoveredElement = target;\n        } else {\n          window.__qwik_inspector_state.hoveredElement = undefined;\n        }\n        updateOverlay();\n      },\n      { capture: true }\n    );\n\n    document.addEventListener(\n      'click',\n      (event) => {\n        if (isActive()) {\n          window.__qwik_inspector_state.pressedKeys.clear();\n          const target = findContainer(event.target);\n          if (target) {\n            event.preventDefault();\n            const inspectUrl = target.getAttribute(inspectAttribute);\n            if (inspectUrl !== 'false') {\n              body.style.setProperty('cursor', 'progress');\n              qwikOpenInEditor(inspectUrl);\n            }\n          }\n        }\n      },\n      { capture: true }\n    );\n\n    globalThis.qwikOpenInEditor = function (path) {\n      const isWindows = navigator.platform.includes('Win');\n      const resolvedURL = new URL(path, isWindows ? origin : srcDir);\n      if (resolvedURL.origin === origin) {\n        const params = new URLSearchParams();\n        const prefix = isWindows ? srcDir : '';\n        params.set('file', prefix + resolvedURL.pathname);\n        fetch('/__open-in-editor?' + params.toString());\n      } else {\n        location.href = resolvedURL.href;\n      }\n    };\n    document.addEventListener(\n      'contextmenu',\n      (event) => {\n        if (isActive()) {\n          window.__qwik_inspector_state.pressedKeys.clear();\n          const target = findContainer(event.target);\n          if (target) {\n            event.preventDefault();\n          }\n        }\n      },\n      { capture: true }\n    );\n\n    function updateOverlay() {\n      const hoverElement = window.__qwik_inspector_state.hoveredElement;\n      if (hoverElement && isActive()) {\n        const rect = hoverElement.getBoundingClientRect();\n        overlay.style.setProperty('height', rect.height + 'px');\n        overlay.style.setProperty('width', rect.width + 'px');\n        overlay.style.setProperty('top', rect.top + 'px');\n        overlay.style.setProperty('left', rect.left + 'px');\n        overlay.style.setProperty('visibility', 'visible');\n        body.style.setProperty('cursor', 'pointer');\n      } else {\n        overlay.style.setProperty('height', '0px');\n        overlay.style.setProperty('width', '0px');\n        overlay.style.setProperty('visibility', 'hidden');\n        body.style.removeProperty('cursor');\n      }\n    }\n\n    function checkKeysArePressed() {\n      const activeKeys = Array.from(window.__qwik_inspector_state.pressedKeys).map((key) =>\n        key ? key.replace(/(Left|Right)$/g, '') : undefined\n      );\n      return hotKeys.every((key) => activeKeys.includes(key));\n    }\n\n    function isActive() {\n      return checkKeysArePressed();\n    }\n    window.addEventListener('resize', updateOverlay);\n    document.addEventListener('scroll', updateOverlay);\n  })();\n<\/script>\n";
  var perf_warning_default = "<script>\n  if (!window.__qwikViteLog) {\n    window.__qwikViteLog = true;\n    console.debug(\n      '%c⭐️ Qwik Dev SSR Mode',\n      'background: #0c75d2; color: white; padding: 2px 3px; border-radius: 2px; font-size: 0.8em;',\n      \"App is running in SSR development mode!\\n - Additional JS is loaded by Vite for debugging and live reloading\\n - Rendering performance might not be optimal\\n - Delayed interactivity because prefetching is disabled\\n - Vite dev bundles do not represent production output\\n\\nProduction build can be tested running 'npm run preview'\"\n    );\n  }\n<\/script>\n";
  var error_host_default = "<script>\n  document.addEventListener('qerror', (ev) => {\n    const ErrorOverlay = customElements.get('vite-error-overlay');\n    if (!ErrorOverlay) {\n      return;\n    }\n    const err = ev.detail.error;\n    const overlay = new ErrorOverlay(err);\n    document.body.appendChild(overlay);\n  });\n<\/script>\n<script>\n  /**\n   * Usage:\n   *\n   * <errored-host></errored-host>\n   */\n  class ErroredHost extends HTMLElement {\n    get _root() {\n      return this.shadowRoot || this;\n    }\n\n    constructor() {\n      super();\n      const self = this;\n\n      this.state = {};\n      if (!this.props) {\n        this.props = {};\n      }\n\n      this.componentProps = ['children', 'error'];\n\n      // used to keep track of all nodes created by show/for\n      this.nodesToDestroy = [];\n      // batch updates\n      this.pendingUpdate = false;\n\n      this.attachShadow({ mode: 'open' });\n    }\n\n    destroyAnyNodes() {\n      // destroy current view template refs before rendering again\n      this.nodesToDestroy.forEach((el) => el.remove());\n      this.nodesToDestroy = [];\n    }\n\n    connectedCallback() {\n      this.getAttributeNames().forEach((attr) => {\n        const jsVar = attr.replace(/-/g, '');\n        const regexp = new RegExp(jsVar, 'i');\n        this.componentProps.forEach((prop) => {\n          if (regexp.test(prop)) {\n            const attrValue = this.getAttribute(attr);\n            if (this.props[prop] !== attrValue) {\n              this.props[prop] = attrValue;\n            }\n          }\n        });\n      });\n\n      this._root.innerHTML = `\n\n        <template data-el=\"show-errored-host\">\n        <div class=\"error\">\n          <template data-el=\"div-errored-host-2\">\n            \x3c!-- String(props.error) --\x3e\n          </template>\n        </div>\n        </template>\n\n        <div class=\"arrow\">👇 Uncaught error happened here 👇\n          <span class=\"dev-tools\">DevTools: Cmd+Alt+I</span>\n        </div>\n        <div class=\"div\">\n          <slot></slot>\n        </div>\n\n        <style>\n          .error {\n            border-radius: 5px 5px 0px 0;\n            background: black;\n            color: white;\n            font-family: monospace;\n            font-size: 12px;\n            margin: 0;\n            padding: 10px;\n          }\n          .arrow {\n            background: #f47e81;\n            color: black;\n            font-size: 14px;\n            padding: 10px;\n            text-align: center;\n            font-family: sans-serif;\n          }\n          .dev-tools {\n            background: red;\n            padding: 2px 5px;\n            border-radius: 3px;\n            font-weight: 800;\n          }\n          .div {\n            outline: 5px solid red;\n            border-radius: 10px;\n          }\n        </style>`;\n      this.pendingUpdate = true;\n\n      this.render();\n      this.onMount();\n      this.pendingUpdate = false;\n      this.update();\n    }\n\n    showContent(el) {\n      // https://developer.mozilla.org/en-US/docs/Web/API/HTMLTemplateElement/content\n      // grabs the content of a node that is between <template> tags\n      // iterates through child nodes to register all content including text elements\n      // attaches the content after the template\n\n      const elementFragment = el.content.cloneNode(true);\n      const children = Array.from(elementFragment.childNodes);\n      children.forEach((child) => {\n        if (el?.scope) {\n          child.scope = el.scope;\n        }\n        if (el?.context) {\n          child.context = el.context;\n        }\n        this.nodesToDestroy.push(child);\n      });\n      el.after(elementFragment);\n    }\n\n    onMount() {}\n\n    onUpdate() {}\n\n    update() {\n      if (this.pendingUpdate === true) {\n        return;\n      }\n      this.pendingUpdate = true;\n      this.render();\n      this.onUpdate();\n      this.pendingUpdate = false;\n    }\n\n    render() {\n      // re-rendering needs to ensure that all nodes generated by for/show are refreshed\n      this.destroyAnyNodes();\n      this.updateBindings();\n    }\n\n    updateBindings() {\n      this._root.querySelectorAll(\"[data-el='show-errored-host']\").forEach((el) => {\n        const whenCondition = this.props.error;\n        if (whenCondition) {\n          this.showContent(el);\n        }\n      });\n\n      this._root.querySelectorAll(\"[data-el='div-errored-host-2']\").forEach((el) => {\n        this.renderTextNode(el, String(this.props.error));\n      });\n    }\n\n    // Helper to render content\n    renderTextNode(el, text) {\n      const textNode = document.createTextNode(text);\n      if (el?.scope) {\n        textNode.scope = el.scope;\n      }\n      if (el?.context) {\n        textNode.context = el.context;\n      }\n      el.after(textNode);\n      this.nodesToDestroy.push(el.nextSibling);\n    }\n  }\n\n  customElements.define('errored-host', ErroredHost);\n<\/script>\n";
  var isBrowser = (() => "undefined" !== typeof window && "undefined" !== typeof HTMLElement && !!window.document && String(HTMLElement).includes("[native code]"))();
  var isServer = !isBrowser;
  var isDev = (() => true === globalThis.qDev)();
  var qDev = false !== globalThis.qDev;
  globalThis.qInspector;
  var qSerialize = false !== globalThis.qSerialize;
  var qDynamicPlatform = false !== globalThis.qDynamicPlatform;
  var qTest = true === globalThis.qTest;
  globalThis.qRuntimeQrl;
  var seal = obj => {
    qDev && Object.seal(obj);
  };
  var STYLE = qDev ? "background: #564CE0; color: white; padding: 2px 3px; border-radius: 2px; font-size: 0.8em;" : "";
  var logError = (message, ...optionalParams) => createAndLogError(false, message, ...optionalParams);
  var throwErrorAndStop = (message, ...optionalParams) => {
    const error = createAndLogError(false, message, ...optionalParams);
    debugger;
    throw error;
  };
  var logErrorAndStop = (message, ...optionalParams) => {
    const err = createAndLogError(true, message, ...optionalParams);
    debugger;
    return err;
  };
  var logWarn = (message, ...optionalParams) => {
    qDev && console.warn("%cQWIK WARN", STYLE, message, ...optionalParams);
  };
  var createAndLogError = (asyncThrow, message, ...optionalParams) => {
    const err = message instanceof Error ? message : new Error(message);
    console.error("%cQWIK ERROR", STYLE, err.message, ...optionalParams, err.stack);
    asyncThrow && !qTest && setTimeout((() => {
      throw err;
    }), 0);
    return err;
  };
  var ASSERT_DISCLAIMER = "Internal assert, this is likely caused by a bug in Qwik: ";
  function assertDefined(value, text, ...parts) {
    if (qDev) {
      if (null != value) {
        return;
      }
      throwErrorAndStop(ASSERT_DISCLAIMER + text, ...parts);
    }
  }
  function assertEqual(value1, value2, text, ...parts) {
    if (qDev) {
      if (value1 === value2) {
        return;
      }
      throwErrorAndStop(ASSERT_DISCLAIMER + text, ...parts);
    }
  }
  function assertTrue(value1, text, ...parts) {
    if (qDev) {
      if (true === value1) {
        return;
      }
      throwErrorAndStop(ASSERT_DISCLAIMER + text, ...parts);
    }
  }
  function assertFalse(value1, text, ...parts) {
    if (qDev) {
      if (false === value1) {
        return;
      }
      throwErrorAndStop(ASSERT_DISCLAIMER + text, ...parts);
    }
  }
  var codeToText = (code, ...parts) => {
    if (qDev) {
      const MAP = [ "Error while serializing class or style attributes", "Can not serialize a HTML Node that is not an Element", "Runtime but no instance found on element.", "Only primitive and object literals can be serialized", "Crash while rendering", "You can render over a existing q:container. Skipping render().", "Set property {{0}}", "Only function's and 'string's are supported.", "Only objects can be wrapped in 'QObject'", "Only objects literals can be wrapped in 'QObject'", "QRL is not a function", "Dynamic import not found", "Unknown type argument", "Actual value for useContext({{0}}) can not be found, make sure some ancestor component has set a value using useContextProvider(). In the browser make sure that the context was used during SSR so its state was serialized.", "Invoking 'use*()' method outside of invocation context.", "Cant access renderCtx for existing context", "Cant access document for existing context", "props are immutable", "<div> component can only be used at the root of a Qwik component$()", "Props are immutable by default.", "Calling a 'use*()' method outside 'component$(() => { HERE })' is not allowed. 'use*()' methods provide hooks to the 'component$' state and lifecycle, ie 'use' hooks can only be called synchronously within the 'component$' function or another 'use' method.\nSee https://qwik.dev/docs/components/tasks/#use-method-rules", "Container is already paused. Skipping", "", "When rendering directly on top of Document, the root node must be a <html>", "A <html> node must have 2 children. The first one <head> and the second one a <body>", 'Invalid JSXNode type "{{0}}". It must be either a function or a string. Found:', "Tracking value changes can only be done to useStore() objects and component props", "Missing Object ID for captured object", 'The provided Context reference "{{0}}" is not a valid context created by createContextId()', "<html> is the root container, it can not be rendered inside a component", "QRLs can not be resolved because it does not have an attached container. This means that the QRL does not know where it belongs inside the DOM, so it cant dynamically import() from a relative path.", "QRLs can not be dynamically resolved, because it does not have a chunk path", "The JSX ref attribute must be a Signal" ];
      let text = MAP[code] ?? "";
      parts.length && (text = text.replaceAll(/{{(\d+)}}/g, ((_, index) => {
        let v = parts[index];
        v && "object" === typeof v && v.constructor === Object && (v = JSON.stringify(v).slice(0, 50));
        return v;
      })));
      return `Code(${code}): ${text}`;
    }
    return `Code(${code}) https://github.com/QwikDev/qwik/blob/main/packages/qwik/src/core/error/error.ts#L${8 + code}`;
  };
  var QError_stringifyClassOrStyle = 0;
  var QError_verifySerializable = 3;
  var QError_qrlIsNotFunction = 10;
  var QError_qrlMissingContainer = 30;
  var QError_qrlMissingChunk = 31;
  var qError = (code, ...parts) => {
    const text = codeToText(code, ...parts);
    return logErrorAndStop(text, ...parts);
  };
  var createPlatform = () => ({
    isServer: isServer,
    importSymbol(containerEl, url, symbolName) {
      var _a;
      if (isServer) {
        const hash = getSymbolHash2(symbolName);
        const regSym = null == (_a = globalThis.__qwik_reg_symbols) ? void 0 : _a.get(hash);
        if (regSym) {
          return regSym;
        }
      }
      if (!url) {
        throw qError(QError_qrlMissingChunk, symbolName);
      }
      if (!containerEl) {
        throw qError(QError_qrlMissingContainer, url, symbolName);
      }
      const urlDoc = toUrl(containerEl.ownerDocument, containerEl, url).toString();
      const urlCopy = new URL(urlDoc);
      urlCopy.hash = "";
      const importURL = urlCopy.href;
      return import(importURL).then((mod => mod[symbolName]));
    },
    raf: fn => new Promise((resolve => {
      requestAnimationFrame((() => {
        resolve(fn());
      }));
    })),
    nextTick: fn => new Promise((resolve => {
      setTimeout((() => {
        resolve(fn());
      }));
    })),
    chunkForSymbol: (symbolName, chunk) => [ symbolName, chunk ?? "_" ]
  });
  var toUrl = (doc, containerEl, url) => {
    const baseURI = doc.baseURI;
    const base = new URL(containerEl.getAttribute("q:base") ?? baseURI, baseURI);
    return new URL(url, base);
  };
  var _platform = createPlatform();
  var getPlatform = () => _platform;
  var isServerPlatform = () => {
    if (qDynamicPlatform) {
      return _platform.isServer;
    }
    return false;
  };
  var isNode = value => value && "number" === typeof value.nodeType;
  var isPromise = value => !!value && "object" == typeof value && "function" === typeof value.then;
  var safeCall = (call, thenFn, rejectFn) => {
    try {
      const result = call();
      return isPromise(result) ? result.then(thenFn, rejectFn) : thenFn(result);
    } catch (e) {
      return rejectFn(e);
    }
  };
  var maybeThen = (valueOrPromise, thenFn) => isPromise(valueOrPromise) ? valueOrPromise.then(thenFn, shouldNotError) : thenFn(valueOrPromise);
  var maybeThenPassError = (valueOrPromise, thenFn) => isPromise(valueOrPromise) ? valueOrPromise.then(thenFn) : thenFn(valueOrPromise);
  var shouldNotError = reason => {
    throwErrorAndStop("QWIK ERROR:", reason);
  };
  var delay = timeout => new Promise((resolve => {
    setTimeout(resolve, timeout);
  }));
  var isSerializableObject = v => {
    const proto = Object.getPrototypeOf(v);
    return proto === Object.prototype || proto === Array.prototype || null === proto;
  };
  var isObject = v => !!v && "object" === typeof v;
  var isArray = v => Array.isArray(v);
  var isString = v => "string" === typeof v;
  var isFunction = v => "function" === typeof v;
  var isDev2 = true;
  var DEBUG_TYPE = "q:type";
  var START = "[34m";
  var END = "[0m";
  var VirtualTypeName = {
    V: START + "Virtual" + END,
    F: START + "Fragment" + END,
    S: START + "Signal" + END,
    A: START + "Awaited" + END,
    C: START + "Component" + END,
    I: START + "InlineComponent" + END,
    P: START + "Projection" + END
  };
  var OnRenderProp = "q:renderFn";
  var ComponentStylesPrefixContent = "⭐️";
  var QSlot = "q:slot";
  var QSlotParent = ":";
  var QSlotRef = "q:sref";
  var QSlotS = "q:s";
  var QStyle = "q:style";
  var QStyleSelector = "style[q\\:style]";
  var QStyleSSelector = "style[q\\:sstyle]";
  var QStylesAllSelector = QStyleSelector + "," + QStyleSSelector;
  var QScopedStyle = "q:sstyle";
  var QCtxAttr = "q:ctx";
  var QSubscribers = "q:subs";
  var QFuncsPrefix = "qFuncs_";
  var getQFuncs = (document2, hash) => document2[QFuncsPrefix + hash] || [];
  var QBaseAttr = "q:base";
  var QLocaleAttr = "q:locale";
  var QInstanceAttr = "q:instance";
  var QContainerIsland = "q:container-island";
  var QContainerIslandEnd = "/" + QContainerIsland;
  var QIgnore = "q:ignore";
  var QIgnoreEnd = "/" + QIgnore;
  var QContainerAttr = "q:container";
  var QContainerAttrEnd = "/" + QContainerAttr;
  var QTemplate = "q:template";
  var QContainerSelector = "[q\\:container]:not([q\\:container=html]):not([q\\:container=text])";
  var HTML_NS = "http://www.w3.org/1999/xhtml";
  var SVG_NS = "http://www.w3.org/2000/svg";
  var MATH_NS = "http://www.w3.org/1998/Math/MathML";
  var ResourceEvent = "qResource";
  var RenderEvent = "qRender";
  var TaskEvent = "qTask";
  var QDefaultSlot = "";
  var ELEMENT_ID = "q:id";
  var ELEMENT_KEY = "q:key";
  var ELEMENT_PROPS = "q:props";
  var ELEMENT_SEQ = "q:seq";
  var ELEMENT_SEQ_IDX = "q:seqIdx";
  var NON_SERIALIZABLE_MARKER_PREFIX = ":";
  var USE_ON_LOCAL = NON_SERIALIZABLE_MARKER_PREFIX + "on";
  var USE_ON_LOCAL_SEQ_IDX = NON_SERIALIZABLE_MARKER_PREFIX + "onIdx";
  var Q_PROPS_SEPARATOR = ":";
  var dangerouslySetInnerHTML = "dangerouslySetInnerHTML";
  function setLocale(locale) {
    locale;
  }
  globalThis.QWIK_DOM_VERSION;
  var isQrl = value => "function" === typeof value && "function" === typeof value.getSymbol;
  var EMPTY_ARRAY = [];
  var EMPTY_OBJ = {};
  Object.freeze(EMPTY_ARRAY);
  Object.freeze(EMPTY_OBJ);
  var Slot = props => _jsxSorted(Virtual, null, {
    [QSlotS]: ""
  }, props.children, 0, props.name ?? "");
  var SkipRender = Symbol("skip render");
  var SSRRaw = () => null;
  var SSRComment = () => null;
  var isJsxPropertyAnEventName = name => (name.startsWith("on") || name.startsWith("window:on") || name.startsWith("document:on")) && name.endsWith("$");
  var isHtmlAttributeAnEventName = name => name.startsWith("on:") || name.startsWith("on-window:") || name.startsWith("on-document:");
  var getEventNameFromJsxProp = name => {
    if (name.endsWith("$")) {
      let idx = -1;
      name.startsWith("on") ? idx = 2 : name.startsWith("window:on") ? idx = 9 : name.startsWith("document:on") && (idx = 11);
      if (-1 != idx) {
        const isCaseSensitive = isDashAt(name, idx) && !isDashAt(name, idx + 1);
        isCaseSensitive && idx++;
        let lastIdx = idx;
        let eventName = "";
        while (true) {
          idx = name.indexOf("-", lastIdx);
          const chunk = name.substring(lastIdx, -1 === idx ? name.length - 1 : idx);
          eventName += isCaseSensitive ? chunk : chunk.toLowerCase();
          if (-1 == idx) {
            return eventName;
          }
          if (isDashAt(name, idx + 1)) {
            eventName += "-";
            idx++;
          } else {
            eventName += name.charAt(idx + 1).toUpperCase();
            idx++;
          }
          lastIdx = idx + 1;
        }
      }
    }
    return null;
  };
  var getEventNameScopeFromJsxProp = name => {
    const index = name.indexOf(":");
    return -1 !== index ? name.substring(0, index) : "";
  };
  var isDashAt = (name, idx) => 45 === name.charCodeAt(idx);
  var convertEventNameFromJsxPropToHtmlAttr = name => {
    if (name.endsWith("$")) {
      let prefix = null;
      name.startsWith("on") ? prefix = "on:" : name.startsWith("window:on") ? prefix = "on-window:" : name.startsWith("document:on") && (prefix = "on-document:");
      if (null !== prefix) {
        const eventName = getEventNameFromJsxProp(name);
        return prefix + fromCamelToKebabCase(eventName);
      }
    }
    return null;
  };
  var fromCamelToKebabCase = text => text.replace(/([A-Z-])/g, "-$1").toLowerCase();
  function isPreventDefault(key) {
    return key.startsWith("preventdefault:");
  }
  var unitlessNumbers = new Set([ "animationIterationCount", "aspectRatio", "borderImageOutset", "borderImageSlice", "borderImageWidth", "boxFlex", "boxFlexGroup", "boxOrdinalGroup", "columnCount", "columns", "flex", "flexGrow", "flexShrink", "gridArea", "gridRow", "gridRowEnd", "gridRowStart", "gridColumn", "gridColumnEnd", "gridColumnStart", "fontWeight", "lineClamp", "lineHeight", "opacity", "order", "orphans", "scale", "tabSize", "widows", "zIndex", "zoom", "MozAnimationIterationCount", "MozBoxFlex", "msFlex", "msFlexPositive", "WebkitAnimationIterationCount", "WebkitBoxFlex", "WebkitBoxOrdinalGroup", "WebkitColumnCount", "WebkitColumns", "WebkitFlex", "WebkitFlexGrow", "WebkitFlexShrink", "WebkitLineClamp" ]);
  var isUnitlessNumber = name => unitlessNumbers.has(name);
  var serializeClass = obj => {
    if (!obj) {
      return "";
    }
    if (isString(obj)) {
      return obj.trim();
    }
    const classes = [];
    if (isArray(obj)) {
      for (const o of obj) {
        const classList = serializeClass(o);
        classList && classes.push(classList);
      }
    } else {
      for (const [key, value] of Object.entries(obj)) {
        value && classes.push(key.trim());
      }
    }
    return classes.join(" ");
  };
  var fromCamelToKebabCaseWithDash = text => text.replace(/([A-Z])/g, "-$1").toLowerCase();
  var stringifyStyle = obj => {
    if (null == obj) {
      return "";
    }
    if ("object" == typeof obj) {
      if (isArray(obj)) {
        throw qError(QError_stringifyClassOrStyle, obj, "style");
      }
      {
        const chunks = [];
        for (const key in obj) {
          if (Object.prototype.hasOwnProperty.call(obj, key)) {
            const value = obj[key];
            null != value && "function" !== typeof value && (key.startsWith("--") ? chunks.push(key + ":" + value) : chunks.push(fromCamelToKebabCaseWithDash(key) + ":" + setValueForStyle(key, value)));
          }
        }
        return chunks.join(";");
      }
    }
    return String(obj);
  };
  var serializeBooleanOrNumberAttribute = value => null != value ? String(value) : null;
  function serializeAttribute(key, value, styleScopedId) {
    if (isClassAttr(key)) {
      const serializedClass = serializeClass(value);
      value = styleScopedId ? styleScopedId + (serializedClass.length ? " " + serializedClass : serializedClass) : serializedClass;
    } else {
      "style" === key ? value = stringifyStyle(value) : isEnumeratedBooleanAttribute(key) || "number" === typeof value ? value = serializeBooleanOrNumberAttribute(value) : false === value || null == value ? value = null : true === value && isPreventDefault(key) && (value = "");
    }
    return value;
  }
  function isEnumeratedBooleanAttribute(key) {
    return isAriaAttribute(key) || [ "spellcheck", "draggable", "contenteditable" ].includes(key);
  }
  var setValueForStyle = (styleName, value) => {
    if ("number" === typeof value && 0 !== value && !isUnitlessNumber(styleName)) {
      return value + "px";
    }
    return value;
  };
  function isAriaAttribute(prop) {
    return prop.startsWith("aria-");
  }
  var styleContent = styleId => ComponentStylesPrefixContent + styleId;
  function hasClassAttr(props) {
    for (const key in props) {
      if (Object.prototype.hasOwnProperty.call(props, key) && isClassAttr(key)) {
        return true;
      }
    }
    return false;
  }
  function isClassAttr(key) {
    return "class" === key || "className" === key;
  }
  function convertScopedStyleIdsToArray(scopedStyleIds) {
    return (null == scopedStyleIds ? void 0 : scopedStyleIds.split(" ")) ?? null;
  }
  function convertStyleIdsToString(scopedStyleIds) {
    return Array.from(scopedStyleIds).join(" ");
  }
  var addComponentStylePrefix = styleId => {
    if (styleId) {
      let idx = 0;
      do {
        styleId = styleId.substring(0, idx) + styleContent(styleId.substring(idx));
      } while (0 !== (idx = styleId.indexOf(" ", idx) + 1));
    }
    return styleId || null;
  };
  var DEBUG = false;
  var log = (...args) => console.log("STORE", ...args.map(qwikDebugToString));
  var STORE_TARGET = Symbol("store.target");
  var STORE_HANDLER = Symbol("store.handler");
  var STORE_ARRAY_PROP = Symbol("store.array");
  var getStoreHandler = value => value[STORE_HANDLER];
  var getStoreTarget = value => (null == value ? void 0 : value[STORE_TARGET]) || null;
  var unwrapStore = value => getStoreTarget(value) || value;
  var isStore = value => STORE_TARGET in value;
  function createStore(container, obj, flags) {
    return new Proxy(obj, new StoreHandler(flags, container || null));
  }
  var getOrCreateStore = (obj, flags, container) => {
    if (isSerializableObject(obj) && container) {
      let store = container.$storeProxyMap$.get(obj);
      if (!store) {
        store = createStore(container, obj, flags);
        container.$storeProxyMap$.set(obj, store);
      }
      return store;
    }
    return obj;
  };
  var StoreHandler = class {
    constructor($flags$, $container$) {
      this.$flags$ = $flags$;
      this.$container$ = $container$;
      this.$effects$ = null;
    }
    toString() {
      return "[Store]";
    }
    get(target, prop) {
      if ("symbol" === typeof prop) {
        if (prop === STORE_TARGET) {
          return target;
        }
        if (prop === STORE_HANDLER) {
          return this;
        }
        return target[prop];
      }
      const ctx = tryGetInvokeContext();
      const value = target[prop];
      if (ctx) {
        if (null === this.$container$) {
          if (!ctx.$container$) {
            return value;
          }
          this.$container$ = ctx.$container$;
        } else {
          assertTrue(!ctx.$container$ || ctx.$container$ === this.$container$, "Do not use signals across containers");
        }
        const effectSubscriber = ctx.$effectSubscriber$;
        effectSubscriber && addEffect(target, Array.isArray(target) ? STORE_ARRAY_PROP : prop, this, effectSubscriber);
      }
      if ("toString" === prop && value === Object.prototype.toString) {
        return this.toString;
      }
      const flags = this.$flags$;
      if (1 & flags && "object" === typeof value && null !== value && !Object.isFrozen(value) && !isStore(value) && !Object.isFrozen(target)) {
        return getOrCreateStore(value, this.$flags$, this.$container$);
      }
      return value;
    }
    set(target, prop, value) {
      target = unwrapDeserializerProxy(target);
      if ("symbol" === typeof prop) {
        target[prop] = value;
        return true;
      }
      const newValue = 1 & this.$flags$ ? unwrapStore(value) : value;
      if (prop in target) {
        const oldValue = target[prop];
        if (newValue !== oldValue) {
          DEBUG && log("Store.set", oldValue, "->", newValue, pad("\n" + this.toString(), "  "));
          setNewValueAndTriggerEffects(prop, newValue, target, this);
        }
      } else {
        DEBUG && log("Store.set", "create property", newValue, pad("\n" + this.toString(), "  "));
        setNewValueAndTriggerEffects(prop, newValue, target, this);
      }
      return true;
    }
    deleteProperty(target, prop) {
      if ("string" != typeof prop || !delete target[prop]) {
        return false;
      }
      triggerEffects(this.$container$, this, getEffects(target, prop, this.$effects$));
      return true;
    }
    has(target, prop) {
      if (prop === STORE_TARGET) {
        return true;
      }
      return Object.prototype.hasOwnProperty.call(target, prop);
    }
    ownKeys(target) {
      const ctx = tryGetInvokeContext();
      const effectSubscriber = null == ctx ? void 0 : ctx.$effectSubscriber$;
      effectSubscriber && addEffect(target, STORE_ARRAY_PROP, this, effectSubscriber);
      return Reflect.ownKeys(target);
    }
    getOwnPropertyDescriptor(target, prop) {
      if (Array.isArray(target) || "symbol" === typeof prop) {
        return Object.getOwnPropertyDescriptor(target, prop);
      }
      return {
        enumerable: true,
        configurable: true
      };
    }
  };
  function addEffect(target, prop, store, effectSubscriber) {
    const effectsMap = store.$effects$ ||= {};
    const effects = Object.prototype.hasOwnProperty.call(effectsMap, prop) && effectsMap[prop] || (effectsMap[prop] = []);
    ensureContainsEffect(effects, effectSubscriber);
    ensureContains(effectSubscriber, target);
    DEBUG && log("sub", pad("\n" + store.$effects$.toString(), "  "));
  }
  function setNewValueAndTriggerEffects(prop, value, target, currentStore) {
    target[prop] = value;
    triggerEffects(currentStore.$container$, currentStore, getEffects(target, prop, currentStore.$effects$));
  }
  function getEffects(target, prop, storeEffects) {
    let effectsToTrigger = storeEffects ? Array.isArray(target) ? Object.values(storeEffects).flatMap((effects => effects)) : storeEffects[prop] : null;
    const storeArrayValue = null == storeEffects ? void 0 : storeEffects[STORE_ARRAY_PROP];
    if (storeArrayValue) {
      effectsToTrigger ||= [];
      effectsToTrigger.push(...storeArrayValue);
    }
    return effectsToTrigger;
  }
  var Subscriber = class {
    constructor() {
      this.$effectDependencies$ = null;
    }
  };
  function isSubscriber(value) {
    return value instanceof Subscriber || value instanceof WrappedSignal;
  }
  function clearVNodeEffectDependencies(value) {
    const effects = vnode_getProp(value, QSubscribers, null);
    if (!effects) {
      return;
    }
    for (let i = effects.length - 1; i >= 0; i--) {
      const subscriber = effects[i];
      const subscriptionRemoved = clearEffects(subscriber, value);
      subscriptionRemoved && effects.splice(i, 1);
    }
  }
  function clearSubscriberEffectDependencies(value) {
    if (value.$effectDependencies$) {
      for (let i = value.$effectDependencies$.length - 1; i >= 0; i--) {
        const subscriber = value.$effectDependencies$[i];
        const subscriptionRemoved = clearEffects(subscriber, value);
        subscriptionRemoved && value.$effectDependencies$.splice(i, 1);
      }
    }
  }
  function clearEffects(subscriber, value) {
    if (!isSignal(subscriber)) {
      return false;
    }
    const effectSubscriptions = subscriber.$effects$;
    if (!effectSubscriptions) {
      return false;
    }
    let subscriptionRemoved = false;
    for (let i = effectSubscriptions.length - 1; i >= 0; i--) {
      const effect = effectSubscriptions[i];
      if (effect[0] === value) {
        effectSubscriptions.splice(i, 1);
        subscriptionRemoved = true;
      }
    }
    return subscriptionRemoved;
  }
  var _createResourceReturn = opts => {
    const resource = {
      __brand: "resource",
      value: void 0,
      loading: !isServerPlatform(),
      _resolved: void 0,
      _error: void 0,
      _state: "pending",
      _timeout: (null == opts ? void 0 : opts.timeout) ?? -1,
      _cache: 0
    };
    return resource;
  };
  var createResourceReturn = (container, opts, initialPromise) => {
    const result = _createResourceReturn(opts);
    result.value = initialPromise;
    return createStore(container, result, 1);
  };
  var runResource = (task, container, host) => {
    task.$flags$ &= -9;
    cleanupTask(task);
    const iCtx = newInvokeContext(container.$locale$, host, void 0, ResourceEvent);
    iCtx.$container$ = container;
    const taskFn = task.$qrl$.getFn(iCtx, (() => clearSubscriberEffectDependencies(task)));
    const resource = task.$state$;
    assertDefined(resource, 'useResource: when running a resource, "task.resource" must be a defined.', task);
    const track = (obj, prop) => {
      const ctx = newInvokeContext();
      ctx.$effectSubscriber$ = [ task, ":" ];
      ctx.$container$ = container;
      return invoke(ctx, (() => {
        if (isFunction(obj)) {
          return obj();
        }
        return prop ? obj[prop] : isSignal(obj) ? obj.value : obj;
      }));
    };
    const handleError = reason => container.handleError(reason, host);
    const cleanups = [];
    task.$destroy$ = noSerialize((() => {
      cleanups.forEach((fn => {
        try {
          fn();
        } catch (err) {
          handleError(err);
        }
      }));
      done = true;
    }));
    const resourceTarget = unwrapStore(resource);
    const opts = {
      track: track,
      cleanup(fn) {
        "function" === typeof fn && cleanups.push(fn);
      },
      cache(policy) {
        let milliseconds = 0;
        milliseconds = "immutable" === policy ? 1 / 0 : policy;
        resource._cache = milliseconds;
      },
      previous: resourceTarget._resolved
    };
    let resolve;
    let reject;
    let done = false;
    const setState = (resolved, value) => {
      if (!done) {
        done = true;
        if (resolved) {
          done = true;
          resource.loading = false;
          resource._state = "resolved";
          resource._resolved = value;
          resource._error = void 0;
          resolve(value);
        } else {
          done = true;
          resource.loading = false;
          resource._state = "rejected";
          resource._error = value;
          reject(value);
        }
        return true;
      }
      return false;
    };
    cleanups.push((() => {
      if (true === untrack((() => resource.loading))) {
        const value = untrack((() => resource._resolved));
        setState(true, value);
      }
    }));
    invoke(iCtx, (() => {
      resource._state = "pending";
      resource.loading = !isServerPlatform();
      const promise2 = resource.value = new Promise(((r, re) => {
        resolve = r;
        reject = re;
      }));
      promise2.catch(ignoreErrorToPreventNodeFromCrashing);
    }));
    const promise = safeCall((() => Promise.resolve(taskFn(opts))), (value => {
      setState(true, value);
    }), (err => {
      if (isPromise(err)) {
        return err.then((() => runResource(task, container, host)));
      }
      setState(false, err);
    }));
    const timeout = resourceTarget._timeout;
    if (timeout > 0) {
      return Promise.race([ promise, delay(timeout).then((() => {
        setState(false, new Error("timeout")) && cleanupTask(task);
      })) ]);
    }
    return promise;
  };
  var ignoreErrorToPreventNodeFromCrashing = err => {};
  var isForeignObjectElement = elementName => "foreignobject" === elementName.toLowerCase();
  var isSvgElement = elementName => "svg" === elementName || isForeignObjectElement(elementName);
  var isMathElement = elementName => "math" === elementName;
  var vnode_isDefaultNamespace = vnode => {
    const flags = vnode[0];
    return 0 === (192 & flags);
  };
  var vnode_getElementNamespaceFlags = elementName => isSvgElement(elementName) ? 64 : isMathElement(elementName) ? 128 : 0;
  function vnode_getDomChildrenWithCorrectNamespacesToInsert(journal, domParentVNode, newChild) {
    const {elementNamespace: elementNamespace, elementNamespaceFlag: elementNamespaceFlag} = getNewElementNamespaceData(domParentVNode, newChild);
    let domChildren = [];
    if (elementNamespace === HTML_NS) {
      domChildren = vnode_getDOMChildNodes(journal, newChild);
    } else {
      const children = vnode_getDOMChildNodes(journal, newChild, true);
      for (let i = 0; i < children.length; i++) {
        const childVNode = children[i];
        if (vnode_isTextVNode(childVNode)) {
          domChildren.push(childVNode[4]);
          continue;
        }
        if ((192 & childVNode[0]) === (192 & domParentVNode[0])) {
          domChildren.push(childVNode[6]);
          continue;
        }
        const newChildElement = vnode_cloneElementWithNamespace(childVNode, domParentVNode, elementNamespace, elementNamespaceFlag);
        newChildElement && domChildren.push(newChildElement);
      }
    }
    return domChildren;
  }
  function cloneElementWithNamespace(element, elementName, namespace) {
    const newElement = element.ownerDocument.createElementNS(namespace, elementName);
    const attributes = element.attributes;
    for (const attribute of attributes) {
      const name = attribute.name;
      const value = attribute.value;
      if (!name || name === Q_PROPS_SEPARATOR) {
        continue;
      }
      newElement.setAttribute(name, value);
    }
    return newElement;
  }
  function vnode_cloneElementWithNamespace(elementVNode, parentVNode, namespace, namespaceFlag) {
    ensureElementVNode(elementVNode);
    let vCursor = elementVNode;
    let vParent = null;
    let rootElement = null;
    let parentElement = null;
    while (vCursor) {
      let childElement = null;
      let newChildElement = null;
      if (vnode_isElementVNode(vCursor)) {
        childElement = vCursor[6];
        const childElementTag = vnode_getElementName(vCursor);
        const vCursorParent = vnode_getParent(vCursor);
        const vCursorDomParent = null == rootElement ? parentVNode : vCursorParent && vnode_getDomParentVNode(vCursorParent);
        if (vCursorDomParent) {
          const namespaceData = getNewElementNamespaceData(vCursorDomParent, vnode_getElementName(vCursor));
          namespace = namespaceData.elementNamespace;
          namespaceFlag = namespaceData.elementNamespaceFlag;
        }
        newChildElement = cloneElementWithNamespace(childElement, childElementTag, namespace);
        childElement.remove();
        null == rootElement && (rootElement = newChildElement);
        parentElement && parentElement.appendChild(newChildElement);
        const vFirstChild = vnode_getFirstChild(vCursor);
        vCursor[6] = newChildElement;
        vCursor[0] &= -193;
        vCursor[0] |= namespaceFlag;
        if (vFirstChild) {
          vCursor = vFirstChild;
          parentElement = newChildElement;
          continue;
        }
        if (shouldIgnoreChildren(childElement)) {
          const container = getDomContainerFromQContainerElement(childElement);
          if (container) {
            const innerContainerFirstVNode = vnode_getFirstChild(container.rootVNode);
            if (innerContainerFirstVNode) {
              vCursor = innerContainerFirstVNode;
              parentElement = newChildElement;
              continue;
            }
          }
        }
      }
      if (vCursor === elementVNode) {
        return rootElement;
      }
      const vNextSibling = vnode_getNextSibling(vCursor);
      if (vNextSibling) {
        vCursor = vNextSibling;
        continue;
      }
      vParent = vnode_getParent(vCursor);
      while (vParent) {
        if (vParent === elementVNode) {
          return rootElement;
        }
        const vNextParentSibling = vnode_getNextSibling(vParent);
        if (vNextParentSibling) {
          vCursor = vNextParentSibling;
          return rootElement;
        }
        vParent = vnode_getParent(vParent);
      }
      if (null == vParent) {
        return rootElement;
      }
    }
    return rootElement;
  }
  function isSvg(tagOrVNode) {
    return "string" === typeof tagOrVNode ? isSvgElement(tagOrVNode) : 0 !== (64 & tagOrVNode[0]);
  }
  function isMath(tagOrVNode) {
    return "string" === typeof tagOrVNode ? isMathElement(tagOrVNode) : 0 !== (128 & tagOrVNode[0]);
  }
  function getNewElementNamespaceData(domParentVNode, tagOrVNode) {
    const parentIsDefaultNamespace = !domParentVNode || !!vnode_getElementName(domParentVNode) && vnode_isDefaultNamespace(domParentVNode);
    const parentIsForeignObject = !parentIsDefaultNamespace && isForeignObjectElement(vnode_getElementName(domParentVNode));
    let elementNamespace = HTML_NS;
    let elementNamespaceFlag = 0;
    const isElementVNodeOrString = "string" === typeof tagOrVNode || vnode_isElementVNode(tagOrVNode);
    if (isElementVNodeOrString && isSvg(tagOrVNode)) {
      elementNamespace = SVG_NS;
      elementNamespaceFlag = 64;
    } else if (isElementVNodeOrString && isMath(tagOrVNode)) {
      elementNamespace = MATH_NS;
      elementNamespaceFlag = 128;
    } else if (domParentVNode && !parentIsForeignObject && !parentIsDefaultNamespace) {
      const isParentSvg = 0 !== (64 & domParentVNode[0]);
      const isParentMath = 0 !== (128 & domParentVNode[0]);
      elementNamespace = isParentSvg ? SVG_NS : isParentMath ? MATH_NS : HTML_NS;
      elementNamespaceFlag = 192 & domParentVNode[0];
    }
    return {
      elementNamespace: elementNamespace,
      elementNamespaceFlag: elementNamespaceFlag
    };
  }
  var executeComponent = (container, renderHost, subscriptionHost, componentQRL, props) => {
    const iCtx = newInvokeContext(container.$locale$, subscriptionHost, void 0, RenderEvent);
    iCtx.$effectSubscriber$ = [ subscriptionHost, ":" ];
    iCtx.$container$ = container;
    let componentFn;
    container.ensureProjectionResolved(renderHost);
    if (null === componentQRL) {
      componentQRL = componentQRL || container.getHostProp(renderHost, OnRenderProp);
      assertDefined(componentQRL, "No Component found at this location");
    }
    if (isQrl2(componentQRL)) {
      props = props || container.getHostProp(renderHost, ELEMENT_PROPS) || EMPTY_OBJ;
      props && props.children && delete props.children;
      componentFn = componentQRL.getFn(iCtx);
    } else if (isQwikComponent(componentQRL)) {
      const qComponentFn = componentQRL;
      componentFn = () => invokeApply(iCtx, qComponentFn, [ props || EMPTY_OBJ, null, 0 ]);
    } else {
      const inlineComponent = componentQRL;
      componentFn = () => invokeApply(iCtx, inlineComponent, [ props || EMPTY_OBJ ]);
    }
    const executeComponentWithPromiseExceptionRetry = () => safeCall((() => {
      container.setHostProp(renderHost, ELEMENT_SEQ_IDX, null);
      container.setHostProp(renderHost, USE_ON_LOCAL_SEQ_IDX, null);
      container.setHostProp(renderHost, ELEMENT_PROPS, props);
      vnode_isVNode(renderHost) && clearVNodeEffectDependencies(renderHost);
      return componentFn(props);
    }), (jsx2 => {
      const useOnEvents = container.getHostProp(renderHost, USE_ON_LOCAL);
      if (useOnEvents) {
        return maybeThen(addUseOnEvents(jsx2, useOnEvents), (() => jsx2));
      }
      return jsx2;
    }), (err => {
      if (isPromise(err)) {
        return err.then(executeComponentWithPromiseExceptionRetry);
      }
      throw err;
    }));
    return executeComponentWithPromiseExceptionRetry();
  };
  function addUseOnEvents(jsx2, useOnEvents) {
    const jsxElement = findFirstStringJSX(jsx2);
    return maybeThen(jsxElement, (jsxElement2 => {
      let isInvisibleComponent = false;
      jsxElement2 || (isInvisibleComponent = true);
      for (const key in useOnEvents) {
        if (Object.prototype.hasOwnProperty.call(useOnEvents, key)) {
          if (isInvisibleComponent) {
            if ("onQvisible$" === key) {
              jsxElement2 = addScriptNodeForInvisibleComponents(jsx2);
              jsxElement2 && addUseOnEvent(jsxElement2, "document:onQinit$", useOnEvents[key]);
            } else if (key.startsWith("document:") || key.startsWith("window:")) {
              jsxElement2 = addScriptNodeForInvisibleComponents(jsx2);
              jsxElement2 && addUseOnEvent(jsxElement2, key, useOnEvents[key]);
            } else {
              isDev && logWarn('You are trying to add an event "' + key + '" using `useOn` hook, but a node to which you can add an event is not found. Please make sure that the component has a valid element node. ');
            }
          } else {
            jsxElement2 && addUseOnEvent(jsxElement2, key, useOnEvents[key]);
          }
        }
      }
      return jsxElement2;
    }));
  }
  function addUseOnEvent(jsxElement, key, value) {
    let props = jsxElement.props;
    props === EMPTY_OBJ && (props = jsxElement.props = {});
    let propValue = props[key];
    void 0 === propValue ? propValue = [] : Array.isArray(propValue) || (propValue = [ propValue ]);
    propValue.push(...value);
    props[key] = propValue;
  }
  function findFirstStringJSX(jsx2) {
    const queue = [ jsx2 ];
    while (queue.length) {
      const jsx3 = queue.shift();
      if (isJSXNode(jsx3)) {
        if ("string" === typeof jsx3.type) {
          return jsx3;
        }
        queue.push(jsx3.children);
      } else if (Array.isArray(jsx3)) {
        queue.push(...jsx3);
      } else {
        if (isPromise(jsx3)) {
          return maybeThen(jsx3, (jsx4 => findFirstStringJSX(jsx4)));
        }
        if (isSignal(jsx3)) {
          return findFirstStringJSX(untrack((() => jsx3.value)));
        }
      }
    }
    return null;
  }
  function addScriptNodeForInvisibleComponents(jsx2) {
    if (isJSXNode(jsx2)) {
      const jsxElement = new JSXNodeImpl("script", {}, {
        type: "placeholder",
        hidden: ""
      }, null, 3);
      null == jsx2.children ? jsx2.children = jsxElement : Array.isArray(jsx2.children) ? jsx2.children.push(jsxElement) : jsx2.children = [ jsx2.children, jsxElement ];
      return jsxElement;
    }
    if (Array.isArray(jsx2) && jsx2.length) {
      return addScriptNodeForInvisibleComponents(jsx2[0]);
    }
    return null;
  }
  function isSlotProp(prop) {
    return !prop.startsWith("q:") && !prop.startsWith(NON_SERIALIZABLE_MARKER_PREFIX);
  }
  function isParentSlotProp(prop) {
    return prop.startsWith(QSlotParent);
  }
  function escapeHTML(html) {
    let escapedHTML = "";
    const length = html.length;
    let idx = 0;
    let lastIdx = idx;
    for (;idx < length; idx++) {
      const ch = html.charCodeAt(idx);
      if (60 === ch) {
        escapedHTML += html.substring(lastIdx, idx) + "&lt;";
      } else if (62 === ch) {
        escapedHTML += html.substring(lastIdx, idx) + "&gt;";
      } else if (38 === ch) {
        escapedHTML += html.substring(lastIdx, idx) + "&amp;";
      } else if (34 === ch) {
        escapedHTML += html.substring(lastIdx, idx) + "&quot;";
      } else {
        if (39 !== ch) {
          continue;
        }
        escapedHTML += html.substring(lastIdx, idx) + "&#39;";
      }
      lastIdx = idx + 1;
    }
    return 0 === lastIdx ? html : escapedHTML + html.substring(lastIdx);
  }
  var vnode_diff = (container, jsxNode, vStartNode, scopedStyleIdPrefix) => {
    let journal = container.$journal$;
    const stack2 = [];
    const asyncQueue = [];
    let vParent = null;
    let vCurrent = null;
    let vNewNode = null;
    let vSiblings = null;
    let vSiblingsIdx = -1;
    let jsxChildren = null;
    let jsxValue = null;
    let jsxIdx = 0;
    let jsxCount = 0;
    let shouldAdvance = true;
    diff(jsxNode, vStartNode);
    return drainAsyncQueue();
    function diff(jsxNode2, vStartNode2) {
      assertFalse(vnode_isVNode(jsxNode2), "JSXNode should not be a VNode");
      assertTrue(vnode_isVNode(vStartNode2), "vStartNode should be a VNode");
      vParent = vStartNode2;
      vNewNode = null;
      vCurrent = vnode_getFirstChild(vStartNode2);
      stackPush(jsxNode2, true);
      while (stack2.length) {
        while (jsxIdx < jsxCount) {
          assertFalse(vParent === vCurrent, "Parent and current can't be the same");
          if ("string" === typeof jsxValue) {
            expectText(jsxValue);
          } else if ("number" === typeof jsxValue) {
            expectText(String(jsxValue));
          } else if (jsxValue && "object" === typeof jsxValue) {
            if (Array.isArray(jsxValue)) {
              descend(jsxValue, false);
            } else if (isSignal(jsxValue)) {
              vCurrent && clearVNodeEffectDependencies(vCurrent);
              expectVirtual("S", null);
              descend(trackSignal((() => jsxValue.value), vNewNode || vCurrent, ".", container), true);
            } else if (isPromise(jsxValue)) {
              expectVirtual("A", null);
              asyncQueue.push(jsxValue, vNewNode || vCurrent);
            } else if (isJSXNode(jsxValue)) {
              const type = jsxValue.type;
              if ("string" === typeof type) {
                expectNoMoreTextNodes();
                expectElement(jsxValue, type);
                descend(jsxValue.children, true);
              } else if ("function" === typeof type) {
                if (type === Fragment) {
                  expectNoMoreTextNodes();
                  expectVirtual("F", jsxValue.key);
                  descend(jsxValue.children, true);
                } else if (type === Slot) {
                  expectNoMoreTextNodes();
                  expectSlot() || descend(jsxValue.children, true);
                } else if (type === Projection) {
                  expectProjection();
                  descend(jsxValue.children, true);
                } else if (type === SSRComment) {
                  expectNoMore();
                } else if (type === SSRRaw) {
                  expectNoMore();
                } else {
                  expectNoMoreTextNodes();
                  expectComponent(type);
                }
              }
            }
          } else {
            jsxValue === SkipRender ? journal = [] : expectText("");
          }
          advance();
        }
        expectNoMore();
        ascend();
      }
    }
    function advance() {
      if (!shouldAdvance) {
        shouldAdvance = true;
        return;
      }
      jsxIdx++;
      if (jsxIdx < jsxCount) {
        jsxValue = jsxChildren[jsxIdx];
      } else if (false === stack2[stack2.length - 1]) {
        return ascend();
      }
      null !== vNewNode ? vNewNode = null : advanceToNextSibling();
    }
    function peekNextSibling() {
      if (null !== vSiblings) {
        const idx = vSiblingsIdx + 5;
        return idx < vSiblings.length ? vSiblings[idx] : null;
      }
      return vCurrent ? vnode_getNextSibling(vCurrent) : null;
    }
    function advanceToNextSibling() {
      vCurrent = peekNextSibling();
      null !== vSiblings && (vSiblingsIdx += 3);
    }
    function descend(children, descendVNode) {
      if (null == children) {
        expectNoChildren();
        return;
      }
      stackPush(children, descendVNode);
      if (descendVNode) {
        assertDefined(vCurrent || vNewNode, "Expecting vCurrent to be defined.");
        vSiblings = null;
        vSiblingsIdx = -1;
        vParent = vNewNode || vCurrent;
        vCurrent = vnode_getFirstChild(vParent);
        vNewNode = null;
      }
      shouldAdvance = false;
    }
    function ascend() {
      const descendVNode = stack2.pop();
      if (descendVNode) {
        vSiblingsIdx = stack2.pop();
        vSiblings = stack2.pop();
        vNewNode = stack2.pop();
        vCurrent = stack2.pop();
        vParent = stack2.pop();
      }
      jsxValue = stack2.pop();
      jsxCount = stack2.pop();
      jsxIdx = stack2.pop();
      jsxChildren = stack2.pop();
      advance();
    }
    function stackPush(children, descendVNode) {
      stack2.push(jsxChildren, jsxIdx, jsxCount, jsxValue);
      descendVNode && stack2.push(vParent, vCurrent, vNewNode, vSiblings, vSiblingsIdx);
      stack2.push(descendVNode);
      if (Array.isArray(children)) {
        jsxIdx = 0;
        jsxCount = children.length;
        jsxChildren = children;
        jsxValue = jsxCount > 0 ? children[0] : null;
      } else if (void 0 === children) {
        jsxIdx = 0;
        jsxValue = null;
        jsxChildren = null;
        jsxCount = 0;
      } else {
        jsxIdx = 0;
        jsxValue = children;
        jsxChildren = null;
        jsxCount = 1;
      }
    }
    function getInsertBefore() {
      if (vNewNode) {
        return vCurrent;
      }
      if (null !== vSiblings) {
        const nextIdx = vSiblingsIdx + 5;
        return nextIdx < vSiblings.length ? vSiblings[nextIdx] : null;
      }
      return peekNextSibling();
    }
    function descendContentToProject(children, host) {
      Array.isArray(children) || (children = [ children ]);
      if (children.length) {
        const createProjectionJSXNode = slotName => new JSXNodeImpl(Projection, EMPTY_OBJ, null, [], 0, slotName);
        const projections = [];
        if (host) {
          for (let i = vnode_getPropStartIndex(host); i < host.length; i += 2) {
            const prop = host[i];
            if (isSlotProp(prop)) {
              const slotName = prop;
              projections.push(slotName);
              projections.push(createProjectionJSXNode(slotName));
            }
          }
        }
        for (let i = 0; i < children.length; i++) {
          const child = children[i];
          const slotName = String(isJSXNode(child) && directGetPropsProxyProp(child, QSlot) || QDefaultSlot);
          const idx = mapApp_findIndx(projections, slotName, 0);
          let jsxBucket;
          idx >= 0 ? jsxBucket = projections[idx + 1] : projections.splice(~idx, 0, slotName, jsxBucket = createProjectionJSXNode(slotName));
          const removeProjection = false === child;
          removeProjection || jsxBucket.children.push(child);
        }
        for (let i = projections.length - 2; i >= 0; i -= 2) {
          projections.splice(i, 1);
        }
        descend(projections, true);
      }
    }
    function expectProjection() {
      const slotName = jsxValue.key;
      vCurrent = vnode_getProp(vParent, slotName, (id => vnode_locate(container.rootVNode, id)));
      if (null == vCurrent) {
        vNewNode = vnode_newVirtual();
        isDev && vnode_setProp(vNewNode, DEBUG_TYPE, "P");
        isDev && vnode_setProp(vNewNode, "q:code", "expectProjection");
        vnode_setProp(vNewNode, QSlot, slotName);
        vnode_setProp(vNewNode, QSlotParent, vParent);
        vnode_setProp(vParent, slotName, vNewNode);
      }
    }
    function expectSlot() {
      const vHost = vnode_getProjectionParentComponent(vParent, container.rootVNode);
      const slotNameKey = getSlotNameKey(vHost);
      const vProjectedNode = vHost ? vnode_getProp(vHost, slotNameKey, null) : null;
      if (null == vProjectedNode) {
        vnode_insertBefore(journal, vParent, vNewNode = vnode_newVirtual(), vCurrent && getInsertBefore());
        vnode_setProp(vNewNode, QSlot, slotNameKey);
        vHost && vnode_setProp(vHost, slotNameKey, vNewNode);
        isDev && vnode_setProp(vNewNode, DEBUG_TYPE, "P");
        isDev && vnode_setProp(vNewNode, "q:code", "expectSlot" + count++);
        return false;
      }
      if (vProjectedNode === vCurrent) {} else {
        vnode_insertBefore(journal, vParent, vNewNode = vProjectedNode, vCurrent && getInsertBefore());
        vnode_setProp(vNewNode, QSlot, slotNameKey);
        vHost && vnode_setProp(vHost, slotNameKey, vNewNode);
        isDev && vnode_setProp(vNewNode, DEBUG_TYPE, "P");
        isDev && vnode_setProp(vNewNode, "q:code", "expectSlot" + count++);
      }
      return true;
    }
    function getSlotNameKey(vHost) {
      const constProps = jsxValue.constProps;
      if (constProps && "object" == typeof constProps && "name" in constProps) {
        const constValue = constProps.name;
        if (vHost && constValue instanceof WrappedSignal) {
          return trackSignal((() => constValue.value), vHost, ":", container);
        }
      }
      return directGetPropsProxyProp(jsxValue, "name") || QDefaultSlot;
    }
    function drainAsyncQueue() {
      while (asyncQueue.length) {
        const jsxNode2 = asyncQueue.shift();
        const vHostNode = asyncQueue.shift();
        if (isPromise(jsxNode2)) {
          return jsxNode2.then((jsxNode3 => {
            diff(jsxNode3, vHostNode);
            return drainAsyncQueue();
          }));
        }
        diff(jsxNode2, vHostNode);
      }
    }
    function expectNoChildren() {
      const vFirstChild = vCurrent && vnode_getFirstChild(vCurrent);
      if (null !== vFirstChild) {
        let vChild = vFirstChild;
        while (vChild) {
          cleanup(container, vChild);
          vChild = vnode_getNextSibling(vChild);
        }
        vnode_truncate(journal, vCurrent, vFirstChild);
      }
    }
    function expectNoMore() {
      assertFalse(vParent === vCurrent, "Parent and current can't be the same");
      if (null !== vCurrent) {
        while (vCurrent) {
          const toRemove = vCurrent;
          advanceToNextSibling();
          cleanup(container, toRemove);
          vParent === vnode_getParent(toRemove) && vnode_remove(journal, vParent, toRemove, true);
        }
      }
    }
    function expectNoMoreTextNodes() {
      while (null !== vCurrent && vnode_isTextVNode(vCurrent)) {
        cleanup(container, vCurrent);
        const toRemove = vCurrent;
        advanceToNextSibling();
        vnode_remove(journal, vParent, toRemove, true);
      }
    }
    function createNewElement(jsx2, elementName) {
      const element = createElementWithNamespace(elementName);
      const {constProps: constProps} = jsx2;
      let needsQDispatchEventPatch = false;
      if (constProps) {
        for (const key2 in constProps) {
          let value = constProps[key2];
          if (isJsxPropertyAnEventName(key2)) {
            const eventName = getEventNameFromJsxProp(key2);
            const scope = getEventNameScopeFromJsxProp(key2);
            vnode_setProp(vNewNode, HANDLER_PREFIX + ":" + scope + ":" + eventName, value);
            eventName && registerQwikLoaderEvent(eventName);
            needsQDispatchEventPatch = true;
            continue;
          }
          if ("ref" === key2) {
            if (isSignal(value)) {
              value.value = element;
              continue;
            }
            if ("function" === typeof value) {
              value(element);
              continue;
            }
          }
          if (isSignal(value)) {
            const signalData = new EffectData({
              $scopedStyleIdPrefix$: scopedStyleIdPrefix,
              $isConst$: true
            });
            value = trackSignal((() => value.value), vNewNode, key2, container, signalData);
          }
          if (key2 === dangerouslySetInnerHTML) {
            element.innerHTML = value;
            element.setAttribute(QContainerAttr, "html");
            continue;
          }
          if ("textarea" === elementName && "value" === key2) {
            if ("string" !== typeof value) {
              isDev && throwErrorAndStop("The value of the textarea must be a string");
              continue;
            }
            element.value = escapeHTML(value);
            continue;
          }
          value = serializeAttribute(key2, value, scopedStyleIdPrefix);
          null != value && element.setAttribute(key2, String(value));
        }
      }
      const key = jsx2.key;
      if (key) {
        element.setAttribute(ELEMENT_KEY, key);
        vnode_setProp(vNewNode, ELEMENT_KEY, key);
      }
      const classAttributeExists = hasClassAttr(jsx2.varProps) || jsx2.constProps && hasClassAttr(jsx2.constProps);
      !classAttributeExists && scopedStyleIdPrefix && element.setAttribute("class", scopedStyleIdPrefix);
      vnode_insertBefore(journal, vParent, vNewNode, vCurrent);
      return needsQDispatchEventPatch;
    }
    function createElementWithNamespace(elementName) {
      const domParentVNode = vnode_getDomParentVNode(vParent);
      const {elementNamespace: elementNamespace, elementNamespaceFlag: elementNamespaceFlag} = getNewElementNamespaceData(domParentVNode, elementName);
      const element = container.document.createElementNS(elementNamespace, elementName);
      vNewNode = vnode_newElement(element, elementName);
      vNewNode[0] |= elementNamespaceFlag;
      return element;
    }
    function expectElement(jsx2, elementName) {
      const isSameElementName = vCurrent && vnode_isElementVNode(vCurrent) && elementName === vnode_getElementName(vCurrent);
      const jsxKey = jsx2.key;
      let needsQDispatchEventPatch = false;
      if (!isSameElementName || jsxKey !== getKey(vCurrent)) {
        vNewNode = retrieveChildWithKey(elementName, jsxKey);
        null === vNewNode ? needsQDispatchEventPatch = createNewElement(jsx2, elementName) : vnode_insertBefore(journal, vParent, vNewNode, vCurrent);
      }
      const jsxAttrs = [];
      const props = jsx2.varProps;
      for (const key in props) {
        let value = props[key];
        value = serializeAttribute(key, value, scopedStyleIdPrefix);
        null != value && mapArray_set(jsxAttrs, key, value, 0);
      }
      null !== jsxKey && mapArray_set(jsxAttrs, ELEMENT_KEY, jsxKey, 0);
      const vNode = vNewNode || vCurrent;
      needsQDispatchEventPatch = setBulkProps(vNode, jsxAttrs) || needsQDispatchEventPatch;
      if (needsQDispatchEventPatch) {
        const element = vnode_getNode(vNode);
        element.qDispatchEvent || (element.qDispatchEvent = (event, scope) => {
          const eventName = event.type;
          const eventProp = ":" + scope.substring(1) + ":" + eventName;
          const qrls = [ vnode_getProp(vNode, eventProp, null), vnode_getProp(vNode, HANDLER_PREFIX + eventProp, null) ];
          let returnValue = false;
          qrls.flat(2).forEach((qrl => {
            if (qrl) {
              const value = qrl(event, element);
              returnValue = returnValue || true === value;
            }
          }));
          return returnValue;
        });
      }
    }
    function setBulkProps(vnode, srcAttrs) {
      vnode_ensureElementInflated(vnode);
      const dstAttrs = vnode;
      let srcIdx = 0;
      const srcLength = srcAttrs.length;
      let dstIdx = 8;
      let dstLength = dstAttrs.length;
      let srcKey = srcIdx < srcLength ? srcAttrs[srcIdx++] : null;
      let dstKey = dstIdx < dstLength ? dstAttrs[dstIdx++] : null;
      let patchEventDispatch = false;
      const record = (key, value) => {
        if (key.startsWith(":")) {
          vnode_setProp(vnode, key, value);
          return;
        }
        if ("ref" === key) {
          const element = vnode_getNode(vnode);
          if (isSignal(value)) {
            value.value = element;
            return;
          }
          if ("function" === typeof value) {
            value(element);
            return;
          }
        }
        isSignal(value) && (value = untrack((() => value.value)));
        vnode_setAttr(journal, vnode, key, value);
        null === value && (dstLength = dstAttrs.length);
      };
      const recordJsxEvent = (key, value) => {
        const eventName = getEventNameFromJsxProp(key);
        if (eventName) {
          const scope = getEventNameScopeFromJsxProp(key);
          record(":" + scope + ":" + eventName, value);
        }
        const htmlEvent = convertEventNameFromJsxPropToHtmlAttr(key);
        htmlEvent && record(htmlEvent, "");
        eventName && registerQwikLoaderEvent(eventName);
      };
      while (null !== srcKey || null !== dstKey) {
        if ((null == dstKey ? void 0 : dstKey.startsWith(HANDLER_PREFIX)) || dstKey == ELEMENT_KEY) {
          dstIdx++;
          dstKey = dstIdx < dstLength ? dstAttrs[dstIdx++] : null;
        } else if (null == srcKey) {
          if (dstKey && isHtmlAttributeAnEventName(dstKey)) {
            patchEventDispatch = true;
            dstIdx++;
          } else {
            record(dstKey, null);
            dstIdx--;
          }
          dstKey = dstIdx < dstLength ? dstAttrs[dstIdx++] : null;
        } else if (null == dstKey) {
          const isEvent = isJsxPropertyAnEventName(srcKey);
          if (isEvent) {
            patchEventDispatch = true;
            recordJsxEvent(srcKey, srcAttrs[srcIdx]);
          } else {
            record(srcKey, srcAttrs[srcIdx]);
          }
          srcIdx++;
          srcKey = srcIdx < srcLength ? srcAttrs[srcIdx++] : null;
        } else if (srcKey == dstKey) {
          const srcValue = srcAttrs[srcIdx++];
          const dstValue = dstAttrs[dstIdx++];
          srcValue !== dstValue && record(dstKey, srcValue);
          srcKey = srcIdx < srcLength ? srcAttrs[srcIdx++] : null;
          dstKey = dstIdx < dstLength ? dstAttrs[dstIdx++] : null;
        } else if (srcKey < dstKey) {
          if (isJsxPropertyAnEventName(srcKey)) {
            patchEventDispatch = true;
            recordJsxEvent(srcKey, srcAttrs[srcIdx]);
          } else {
            record(srcKey, srcAttrs[srcIdx]);
          }
          srcIdx++;
          srcKey = srcIdx < srcLength ? srcAttrs[srcIdx++] : null;
          dstIdx++;
          dstKey = dstIdx < dstLength ? dstAttrs[dstIdx++] : null;
        } else {
          if (isHtmlAttributeAnEventName(dstKey)) {
            patchEventDispatch = true;
            dstIdx++;
          } else {
            record(dstKey, null);
            dstIdx--;
          }
          dstKey = dstIdx < dstLength ? dstAttrs[dstIdx++] : null;
        }
      }
      return patchEventDispatch;
    }
    function registerQwikLoaderEvent(eventName) {
      const window2 = container.document.defaultView;
      window2 && (window2.qwikevents ||= []).push(eventName);
    }
    function retrieveChildWithKey(nodeName, key) {
      let vNodeWithKey = null;
      if (-1 === vSiblingsIdx) {
        vSiblings = [];
        vSiblingsIdx = 0;
        let vNode = vCurrent;
        while (vNode) {
          const name = vnode_isElementVNode(vNode) ? vnode_getElementName(vNode) : null;
          const vKey = getKey(vNode) || getComponentHash(vNode, container.$getObjectById$);
          null === vNodeWithKey && vKey == key && name == nodeName ? vNodeWithKey = vNode : vSiblings.push(name, vKey, vNode);
          vNode = vnode_getNextSibling(vNode);
        }
      } else {
        for (let idx = vSiblingsIdx; idx < vSiblings.length; idx += 3) {
          const name = vSiblings[idx + 0];
          const vKey = vSiblings[idx + 1];
          if (vKey === key && name === nodeName) {
            vNodeWithKey = vSiblings[idx + 2];
            null == vSiblings || vSiblings.splice(idx, 3);
            break;
          }
        }
      }
      return vNodeWithKey;
    }
    function expectVirtual(type, jsxKey) {
      if (vCurrent && vnode_isVirtualVNode(vCurrent) && vnode_getProp(vCurrent, ELEMENT_KEY, null) === jsxKey) {
        return;
      }
      if (null !== jsxKey) {
        vNewNode = retrieveChildWithKey(null, jsxKey);
        if (null != vNewNode) {
          vnode_insertBefore(journal, vParent, vNewNode = vnode_newVirtual(), vCurrent && getInsertBefore());
          return;
        }
      }
      vnode_insertBefore(journal, vParent, vNewNode = vnode_newVirtual(), vCurrent && getInsertBefore());
      vnode_setProp(vNewNode, ELEMENT_KEY, jsxKey);
      isDev && vnode_setProp(vNewNode || vCurrent, DEBUG_TYPE, type);
    }
    function expectComponent(component) {
      const componentMeta = component[SERIALIZABLE_STATE];
      let host = vNewNode || vCurrent;
      if (componentMeta) {
        const jsxProps = jsxValue.props;
        let shouldRender = false;
        const [componentQRL] = componentMeta;
        const componentHash = componentQRL.$hash$;
        const vNodeComponentHash = getComponentHash(host, container.$getObjectById$);
        const lookupKey = jsxValue.key || componentHash;
        const vNodeLookupKey = getKey(host) || vNodeComponentHash;
        const lookupKeysAreEqual = lookupKey === vNodeLookupKey;
        const hashesAreEqual = componentHash === vNodeComponentHash;
        if (lookupKeysAreEqual) {
          if (!hashesAreEqual) {
            insertNewComponent(host, componentQRL, jsxProps);
            if (vNewNode) {
              host && (vNewNode[0] = host[0]);
              host = vNewNode;
              shouldRender = true;
            }
          }
        } else {
          vNewNode = retrieveChildWithKey(null, lookupKey);
          vNewNode ? vnode_insertBefore(journal, vParent, vNewNode, vCurrent) : insertNewComponent(host, componentQRL, jsxProps);
          host = vNewNode;
          shouldRender = true;
        }
        if (host) {
          const vNodeProps = vnode_getProp(host, ELEMENT_PROPS, container.$getObjectById$);
          shouldRender = shouldRender || propsDiffer(jsxProps, vNodeProps);
          shouldRender && container.$scheduler$(7, host, componentQRL, jsxProps);
        }
        null != jsxValue.children && descendContentToProject(jsxValue.children, host);
      } else {
        vnode_insertBefore(journal, vParent, vNewNode = vnode_newVirtual(), vCurrent && getInsertBefore());
        isDev && vnode_setProp(vNewNode, DEBUG_TYPE, "I");
        vnode_setProp(vNewNode, ELEMENT_PROPS, jsxValue.props);
        host = vNewNode;
        let component$Host = host;
        while (component$Host && (!vnode_isVirtualVNode(component$Host) || null === vnode_getProp(component$Host, OnRenderProp, null))) {
          component$Host = vnode_getParent(component$Host);
        }
        const jsxOutput = executeComponent(container, host, component$Host || container.rootVNode, component, jsxValue.props);
        asyncQueue.push(jsxOutput, host);
      }
    }
    function insertNewComponent(host, componentQRL, jsxProps) {
      host && clearVNodeEffectDependencies(host);
      vnode_insertBefore(journal, vParent, vNewNode = vnode_newVirtual(), vCurrent && getInsertBefore());
      isDev && vnode_setProp(vNewNode, DEBUG_TYPE, "C");
      container.setHostProp(vNewNode, OnRenderProp, componentQRL);
      container.setHostProp(vNewNode, ELEMENT_PROPS, jsxProps);
      container.setHostProp(vNewNode, ELEMENT_KEY, jsxValue.key);
    }
    function expectText(text) {
      if (null !== vCurrent) {
        const type = vnode_getType(vCurrent);
        if (3 === type) {
          if (text !== vnode_getText(vCurrent)) {
            vnode_setText(journal, vCurrent, text);
            return;
          }
          return;
        }
      }
      vnode_insertBefore(journal, vParent, vNewNode = vnode_newText(container.document.createTextNode(text), text), vCurrent);
    }
  };
  function getKey(vNode) {
    if (null == vNode) {
      return null;
    }
    return vnode_getProp(vNode, ELEMENT_KEY, null);
  }
  function getComponentHash(vNode, getObject) {
    if (null == vNode) {
      return null;
    }
    const qrl = vnode_getProp(vNode, OnRenderProp, getObject);
    return qrl ? qrl.$hash$ : null;
  }
  function Projection() {}
  function propsDiffer(src, dst) {
    if (!src || !dst) {
      return true;
    }
    let srcKeys = removeChildrenKey(Object.keys(src));
    let dstKeys = removeChildrenKey(Object.keys(dst));
    if (srcKeys.length !== dstKeys.length) {
      return true;
    }
    srcKeys = srcKeys.sort();
    dstKeys = dstKeys.sort();
    for (let idx = 0; idx < srcKeys.length; idx++) {
      const srcKey = srcKeys[idx];
      const dstKey = dstKeys[idx];
      if (srcKey !== dstKey || src[srcKey] !== dst[dstKey]) {
        return true;
      }
    }
    return false;
  }
  function removeChildrenKey(keys2) {
    const childrenIdx = keys2.indexOf("children");
    -1 !== childrenIdx && keys2.splice(childrenIdx, 1);
    return keys2;
  }
  function cleanup(container, vNode) {
    let vCursor = vNode;
    if (vnode_isTextVNode(vNode)) {
      return;
    }
    let vParent = null;
    do {
      const type = vCursor[0];
      if (3 & type) {
        if (2 & type) {
          clearVNodeEffectDependencies(vCursor);
          markVNodeAsDeleted(vCursor);
          const seq = container.getHostProp(vCursor, ELEMENT_SEQ);
          if (seq) {
            for (let i = 0; i < seq.length; i++) {
              const obj = seq[i];
              if (isTask(obj)) {
                const task = obj;
                clearSubscriberEffectDependencies(task);
                1 & task.$flags$ ? container.$scheduler$(80, task) : cleanupTask(task);
              }
            }
          }
        }
        const isComponent = 2 & type && null !== vnode_getProp(vCursor, OnRenderProp, null);
        if (isComponent) {
          const attrs = vCursor;
          for (let i = 6; i < attrs.length; i += 2) {
            const key = attrs[i];
            if (!isParentSlotProp(key) && isSlotProp(key)) {
              const value = attrs[i + 1];
              if (value) {
                attrs[i + 1] = null;
                const projection = "string" === typeof value ? vnode_locate(container.rootVNode, value) : value;
                let projectionChild = vnode_getFirstChild(projection);
                while (projectionChild) {
                  cleanup(container, projectionChild);
                  projectionChild = vnode_getNextSibling(projectionChild);
                }
                cleanupStaleUnclaimedProjection(container.$journal$, projection);
              }
            }
          }
        }
        const isProjection = 2 & type && null !== vnode_getProp(vCursor, QSlot, null);
        if (isProjection) {
          if (vCursor === vNode) {
            const vFirstChild = vnode_getFirstChild(vCursor);
            if (vFirstChild) {
              vnode_walkVNode(vFirstChild);
              return;
            }
          }
        } else {
          const vFirstChild = vnode_getFirstChild(vCursor);
          if (vFirstChild) {
            vCursor = vFirstChild;
            continue;
          }
        }
      }
      if (vCursor === vNode) {
        return;
      }
      const vNextSibling = vnode_getNextSibling(vCursor);
      if (vNextSibling) {
        vCursor = vNextSibling;
        continue;
      }
      vParent = vnode_getParent(vCursor);
      while (vParent) {
        if (vParent === vNode) {
          return;
        }
        const vNextParentSibling = vnode_getNextSibling(vParent);
        if (vNextParentSibling) {
          vCursor = vNextParentSibling;
          break;
        }
        vParent = vnode_getParent(vParent);
      }
      if (null == vParent) {
        return;
      }
    } while (true);
  }
  function cleanupStaleUnclaimedProjection(journal, projection) {
    const projectionParent = vnode_getParent(projection);
    if (projectionParent) {
      const projectionParentType = projectionParent[0];
      1 & projectionParentType && vnode_getElementName(projectionParent) === QTemplate && vnode_remove(journal, projectionParent, projection, true);
    }
  }
  function markVNodeAsDeleted(vCursor) {
    vCursor[0] |= 32;
  }
  var HANDLER_PREFIX = ":";
  var count = 0;
  var DEBUG2 = false;
  var createScheduler = (container, scheduleDrain, journalFlush) => {
    const choreQueue = [];
    let currentChore = null;
    let journalFlushScheduled = false;
    return schedule;
    function schedule(type, hostOrTask = null, targetOrQrl = null, payload = null) {
      const runLater = 127 !== type && 16 !== type && 6 !== type;
      const isTask2 = 3 === type || 64 === type || 2 === type || 80 === type;
      isTask2 && (hostOrTask.$flags$ |= 8);
      let chore = {
        $type$: type,
        $idx$: isTask2 ? hostOrTask.$index$ : "string" === typeof targetOrQrl ? targetOrQrl : 0,
        $host$: isTask2 ? hostOrTask.$el$ : hostOrTask,
        $target$: targetOrQrl,
        $payload$: isTask2 ? hostOrTask : payload,
        $resolve$: null,
        $promise$: null,
        $returnValue$: null,
        $executed$: false
      };
      chore.$promise$ = new Promise((resolve => chore.$resolve$ = resolve));
      DEBUG2 && debugTrace("schedule", chore, currentChore, choreQueue);
      chore = sortedInsert(choreQueue, chore);
      if (!journalFlushScheduled && runLater) {
        journalFlushScheduled = true;
        schedule(48);
        scheduleDrain();
      }
      return runLater ? chore.$promise$ : drainUpTo(chore);
    }
    function drainUpTo(runUptoChore) {
      if (runUptoChore.$executed$) {
        return runUptoChore.$returnValue$;
      }
      if (currentChore) {
        return runUptoChore.$promise$;
      }
      while (choreQueue.length) {
        const nextChore = choreQueue.shift();
        const order = choreComparator(nextChore, runUptoChore, false);
        if (null === order) {
          continue;
        }
        if (order > 0) {
          break;
        }
        const isDeletedVNode = vNodeAlreadyDeleted(nextChore);
        if (isDeletedVNode && 80 !== nextChore.$type$) {
          DEBUG2 && debugTrace("skip chore", nextChore, currentChore, choreQueue);
          continue;
        }
        const returnValue = executeChore(nextChore);
        if (isPromise(returnValue)) {
          const promise = returnValue.then((() => drainUpTo(runUptoChore)));
          return promise;
        }
      }
      return runUptoChore.$returnValue$;
    }
    function executeChore(chore) {
      const host = chore.$host$;
      DEBUG2 && debugTrace("execute", chore, currentChore, choreQueue);
      assertEqual(currentChore, null, "Chore already running.");
      currentChore = chore;
      let returnValue = null;
      switch (chore.$type$) {
       case 48:
        returnValue = journalFlush();
        journalFlushScheduled = false;
        break;

       case 7:
       case 6:
        returnValue = safeCall((() => executeComponent(container, host, host, chore.$target$, chore.$payload$)), (jsx3 => 7 === chore.$type$ ? maybeThen(container.processJsx(host, jsx3), (() => jsx3)) : jsx3), (err => container.handleError(err, host)));
        break;

       case 2:
        const result = runResource(chore.$payload$, container, host);
        returnValue = isDomContainer(container) ? null : result;
        break;

       case 3:
        returnValue = runTask(chore.$payload$, container, host);
        break;

       case 64:
        returnValue = runTask(chore.$payload$, container, host);
        break;

       case 80:
        const task = chore.$payload$;
        cleanupTask(task);
        break;

       case 4:
        const parentVirtualNode = chore.$target$;
        let jsx2 = chore.$payload$;
        isSignal(jsx2) && (jsx2 = jsx2.value);
        returnValue = vnode_diff(container, jsx2, parentVirtualNode, null);
        break;

       case 5:
        const virtualNode = chore.$host$;
        const payload = chore.$payload$;
        let value = payload.$value$;
        isSignal(value) && (value = value.value);
        const isConst = payload.$isConst$;
        const journal = container.$journal$;
        const property = chore.$idx$;
        value = serializeAttribute(property, value, payload.$scopedStyleIdPrefix$);
        if (isConst) {
          const element = virtualNode[6];
          journal.push(2, element, property, value);
        } else {
          vnode_setAttr(journal, virtualNode, property, value);
        }
        break;

       case 1:
        {
          const target = chore.$target$;
          returnValue = target.resolved ? null : target.resolve();
          break;
        }
      }
      return maybeThenPassError(returnValue, (value => {
        var _a;
        DEBUG2 && debugTrace("execute.DONE", null, currentChore, choreQueue);
        if (currentChore) {
          currentChore.$executed$ = true;
          null == (_a = currentChore.$resolve$) || _a.call(currentChore, value);
        }
        currentChore = null;
        return chore.$returnValue$ = value;
      }));
    }
  };
  var toNumber = value => "number" === typeof value ? value : -1;
  var choreUpdate = (existing, newChore) => {
    4 === existing.$type$ && (existing.$payload$ = newChore.$payload$);
  };
  function vNodeAlreadyDeleted(chore) {
    return !!(chore.$host$ && vnode_isVNode(chore.$host$) && 32 & chore.$host$[0]);
  }
  function choreComparator(a, b, shouldThrowOnHostMismatch) {
    const macroTypeDiff = (112 & a.$type$) - (112 & b.$type$);
    if (0 !== macroTypeDiff) {
      return macroTypeDiff;
    }
    if (48 !== a.$type$) {
      const aHost = a.$host$;
      const bHost = b.$host$;
      if (aHost !== bHost && null !== aHost && null !== bHost) {
        if (!vnode_isVNode(aHost) || !vnode_isVNode(bHost)) {
          const errorMessage = "SERVER: during HTML streaming, it is not possible to cause a re-run of tasks on a different host";
          shouldThrowOnHostMismatch && throwErrorAndStop(errorMessage);
          logWarn(errorMessage);
          return null;
        }
        {
          const hostDiff = vnode_documentPosition(aHost, bHost);
          if (0 !== hostDiff) {
            return hostDiff;
          }
        }
      }
      const microTypeDiff = (15 & a.$type$) - (15 & b.$type$);
      if (0 !== microTypeDiff) {
        return microTypeDiff;
      }
      const idxDiff = toNumber(a.$idx$) - toNumber(b.$idx$);
      if (0 !== idxDiff) {
        return idxDiff;
      }
      if (a.$target$ !== b.$target$ && (1 === a.$type$ && 1 === b.$type$ || 5 === a.$type$ && 5 === b.$type$)) {
        return 1;
      }
    }
    return 0;
  }
  function sortedFindIndex(sortedArray, value) {
    let bottom = 0;
    let top = sortedArray.length;
    while (bottom < top) {
      const middle = bottom + (top - bottom >> 1);
      const midChore = sortedArray[middle];
      const comp = choreComparator(value, midChore, true);
      if (comp < 0) {
        top = middle;
      } else {
        if (!(comp > 0)) {
          return middle;
        }
        bottom = middle + 1;
      }
    }
    return ~bottom;
  }
  function sortedInsert(sortedArray, value) {
    const idx = sortedFindIndex(sortedArray, value);
    if (idx < 0) {
      sortedArray.splice(~idx, 0, value);
      return value;
    }
    const existing = sortedArray[idx];
    choreUpdate(existing, value);
    return existing;
  }
  function debugChoreToString(chore) {
    var _a;
    const type = {
      1: "QRL_RESOLVE",
      2: "RESOURCE",
      3: "TASK",
      4: "NODE_DIFF",
      5: "NODE_PROP",
      7: "COMPONENT",
      6: "COMPONENT_SSR",
      48: "JOURNAL_FLUSH",
      64: "VISIBLE",
      80: "CLEANUP_VISIBLE",
      127: "WAIT_FOR_ALL",
      16: "WAIT_FOR_COMPONENTS"
    }[chore.$type$] || "UNKNOWN: " + chore.$type$;
    const host = String(chore.$host$).replaceAll(/\n.*/gim, "");
    const qrlTarget = null == (_a = chore.$target$) ? void 0 : _a.$symbol$;
    return `Chore(${type} ${1 === chore.$type$ ? qrlTarget : host} ${chore.$idx$})`;
  }
  function debugTrace(action, arg, currentChore, queue) {
    const lines = [ "Scheduler: " + action ];
    arg && lines.push("    arg: " + ("$type$" in arg ? debugChoreToString(arg) : String(arg).replaceAll(/\n.*/gim, "")));
    currentChore && lines.push("running: " + debugChoreToString(currentChore));
    queue && queue.forEach(((chore, idx) => {
      lines.push((0 == idx ? "  queue: " : "         ") + debugChoreToString(chore));
    }));
    console.log(lines.join("\n  ") + "\n");
  }
  var runTask = (task, container, host) => {
    task.$flags$ &= -9;
    cleanupTask(task);
    const iCtx = newInvokeContext(container.$locale$, host, void 0, TaskEvent);
    iCtx.$container$ = container;
    const taskFn = task.$qrl$.getFn(iCtx, (() => clearSubscriberEffectDependencies(task)));
    const track = (obj, prop) => {
      const ctx = newInvokeContext();
      ctx.$effectSubscriber$ = [ task, ":" ];
      ctx.$container$ = container;
      return invoke(ctx, (() => {
        if (isFunction(obj)) {
          return obj();
        }
        return prop ? obj[prop] : isSignal(obj) ? obj.value : obj;
      }));
    };
    const handleError = reason => container.handleError(reason, host);
    let cleanupFns = null;
    const cleanup2 = fn => {
      if ("function" == typeof fn) {
        if (!cleanupFns) {
          cleanupFns = [];
          task.$destroy$ = noSerialize((() => {
            task.$destroy$ = null;
            cleanupFns.forEach((fn2 => {
              try {
                fn2();
              } catch (err) {
                handleError(err);
              }
            }));
          }));
        }
        cleanupFns.push(fn);
      }
    };
    const taskApi = {
      track: track,
      cleanup: cleanup2
    };
    const result = safeCall((() => taskFn(taskApi)), cleanup2, (err => isPromise(err) ? err.then((() => runTask(task, container, host))) : handleError(err)));
    return result;
  };
  var cleanupTask = task => {
    const destroy = task.$destroy$;
    if (destroy) {
      task.$destroy$ = null;
      try {
        destroy();
      } catch (err) {
        logError(err);
      }
    }
  };
  var Task = class extends Subscriber {
    constructor($flags$, $index$, $el$, $qrl$, $state$, $destroy$) {
      super();
      this.$flags$ = $flags$;
      this.$index$ = $index$;
      this.$el$ = $el$;
      this.$qrl$ = $qrl$;
      this.$state$ = $state$;
      this.$destroy$ = $destroy$;
    }
  };
  var isTask = value => value instanceof Task;
  var DEBUG3 = false;
  var NEEDS_COMPUTATION = Symbol("invalid");
  var log2 = (...args) => console.log("SIGNAL", ...args.map(qwikDebugToString));
  var throwIfQRLNotResolved = qrl => {
    const resolved = qrl.resolved;
    if (!resolved) {
      throw qrl.resolve();
    }
  };
  var isSignal = value => value instanceof Signal;
  var EffectData = class {
    constructor(data) {
      this.data = data;
    }
  };
  var Signal = class {
    constructor(container, value) {
      this.$effects$ = null;
      this.$container$ = null;
      this.$container$ = container;
      this.$untrackedValue$ = value;
      DEBUG3 && log2("new", this);
    }
    get untrackedValue() {
      return this.$untrackedValue$;
    }
    set untrackedValue(value) {
      this.$untrackedValue$ = value;
    }
    get value() {
      const ctx = tryGetInvokeContext();
      if (ctx) {
        if (null === this.$container$) {
          if (!ctx.$container$) {
            return this.untrackedValue;
          }
          this.$container$ = ctx.$container$;
        } else {
          assertTrue(!ctx.$container$ || ctx.$container$ === this.$container$, "Do not use signals across containers");
        }
        const effectSubscriber = ctx.$effectSubscriber$;
        if (effectSubscriber) {
          const effects = this.$effects$ ||= [];
          ensureContainsEffect(effects, effectSubscriber);
          ensureContains(effectSubscriber, this);
          isSubscriber(this) && ensureEffectContainsSubscriber(effectSubscriber[0], this, this.$container$);
          DEBUG3 && log2("read->sub", pad("\n" + this.toString(), "  "));
        }
      }
      return this.untrackedValue;
    }
    set value(value) {
      if (value !== this.$untrackedValue$) {
        DEBUG3 && log2("Signal.set", this.$untrackedValue$, "->", value, pad("\n" + this.toString(), "  "));
        this.$untrackedValue$ = value;
        triggerEffects(this.$container$, this, this.$effects$);
      }
    }
    valueOf() {
      if (qDev) {
        return throwErrorAndStop("Cannot coerce a Signal, use `.value` instead");
      }
    }
    toString() {
      var _a;
      return `[${this.constructor.name}${this.$invalid$ ? " INVALID" : ""} ${String(this.$untrackedValue$)}]` + ((null == (_a = this.$effects$) ? void 0 : _a.map((e => "\n -> " + pad(qwikDebugToString(e[0]), "    "))).join("\n")) || "");
    }
    toJSON() {
      return {
        value: this.$untrackedValue$
      };
    }
  };
  var ensureContains = (array, value) => {
    const isMissing = -1 === array.indexOf(value);
    isMissing && array.push(value);
  };
  var ensureContainsEffect = (array, effectSubscriptions) => {
    for (let i = 0; i < array.length; i++) {
      const existingEffect = array[i];
      if (existingEffect[0] === effectSubscriptions[0] && existingEffect[1] === effectSubscriptions[1]) {
        return;
      }
    }
    array.push(effectSubscriptions);
  };
  var ensureEffectContainsSubscriber = (effect, subscriber, container) => {
    if (isSubscriber(effect)) {
      effect.$effectDependencies$ ||= [];
      if (subscriberExistInSubscribers(effect.$effectDependencies$, subscriber)) {
        return;
      }
      effect.$effectDependencies$.push(subscriber);
    } else if (vnode_isVNode(effect) && vnode_isVirtualVNode(effect)) {
      let subscribers = vnode_getProp(effect, QSubscribers, container ? container.$getObjectById$ : null);
      subscribers ||= [];
      if (subscriberExistInSubscribers(subscribers, subscriber)) {
        return;
      }
      subscribers.push(subscriber);
      vnode_setProp(effect, QSubscribers, subscribers);
    } else if (isSSRNode(effect)) {
      let subscribers = effect.getProp(QSubscribers);
      subscribers ||= [];
      if (subscriberExistInSubscribers(subscribers, subscriber)) {
        return;
      }
      subscribers.push(subscriber);
      effect.setProp(QSubscribers, subscribers);
    }
  };
  var isSSRNode = effect => "setProp" in effect && "getProp" in effect && "removeProp" in effect && "id" in effect;
  var subscriberExistInSubscribers = (subscribers, subscriber) => {
    for (let i = 0; i < subscribers.length; i++) {
      if (subscribers[i] === subscriber) {
        return true;
      }
    }
    return false;
  };
  var triggerEffects = (container, signal, effects) => {
    if (effects) {
      const scheduleEffect = effectSubscriptions => {
        var _a;
        const effect = effectSubscriptions[0];
        const property = effectSubscriptions[1];
        assertDefined(container, "Container must be defined.");
        if (isTask(effect)) {
          effect.$flags$ |= 8;
          DEBUG3 && log2("schedule.effect.task", pad("\n" + String(effect), "  "));
          let choreType = 3;
          1 & effect.$flags$ ? choreType = 64 : 4 & effect.$flags$ && (choreType = 2);
          container.$scheduler$(choreType, effect);
        } else if (effect instanceof Signal) {
          effect instanceof ComputedSignal && (effect.$computeQrl$.resolved || container.$scheduler$(1, null, effect.$computeQrl$));
          effect.$invalid$ = true;
          const previousSignal = signal;
          try {
            signal = effect;
            null == (_a = effect.$effects$) || _a.forEach(scheduleEffect);
          } catch (e) {
            logError(e);
          } finally {
            signal = previousSignal;
          }
        } else if (":" === property) {
          const host = effect;
          const qrl = container.getHostProp(host, OnRenderProp);
          assertDefined(qrl, "Component must have QRL");
          const props = container.getHostProp(host, ELEMENT_PROPS);
          container.$scheduler$(7, host, qrl, props);
        } else if ("." === property) {
          const host = effect;
          const target = host;
          container.$scheduler$(4, host, target, signal);
        } else {
          const host = effect;
          let effectData = effectSubscriptions[2];
          if (effectData instanceof EffectData) {
            const data = effectData.data;
            const payload = {
              ...data,
              $value$: signal
            };
            container.$scheduler$(5, host, property, payload);
          }
        }
      };
      effects.forEach(scheduleEffect);
    }
    DEBUG3 && log2("done scheduling");
  };
  var ComputedSignal = class extends Signal {
    constructor(container, fn) {
      super(container, NEEDS_COMPUTATION);
      this.$invalid$ = true;
      this.$computeQrl$ = fn;
    }
    $invalidate$() {
      var _a;
      this.$invalid$ = true;
      if (!(null == (_a = this.$effects$) ? void 0 : _a.length)) {
        return;
      }
      this.$computeIfNeeded$() && triggerEffects(this.$container$, this, this.$effects$);
    }
    force() {
      this.$invalid$ = true;
      triggerEffects(this.$container$, this, this.$effects$);
    }
    get untrackedValue() {
      this.$computeIfNeeded$();
      assertFalse(this.$untrackedValue$ === NEEDS_COMPUTATION, "Invalid state");
      return this.$untrackedValue$;
    }
    $computeIfNeeded$() {
      if (!this.$invalid$) {
        return false;
      }
      const computeQrl = this.$computeQrl$;
      throwIfQRLNotResolved(computeQrl);
      const ctx = tryGetInvokeContext();
      const previousEffectSubscription = null == ctx ? void 0 : ctx.$effectSubscriber$;
      ctx && (ctx.$effectSubscriber$ = [ this, "." ]);
      try {
        const untrackedValue = computeQrl.getFn(ctx)();
        isPromise(untrackedValue) && throwErrorAndStop(`useComputedSignal$ QRL ${computeQrl.dev ? `${computeQrl.dev.file} ` : ""}${computeQrl.$hash$} returned a Promise`);
        DEBUG3 && log2("Signal.$compute$", untrackedValue);
        this.$invalid$ = false;
        const didChange = untrackedValue !== this.$untrackedValue$;
        this.$untrackedValue$ = untrackedValue;
        return didChange;
      } finally {
        ctx && (ctx.$effectSubscriber$ = previousEffectSubscription);
      }
    }
    get value() {
      return super.value;
    }
    set value(_) {
      throwErrorAndStop("ComputedSignal is read-only");
    }
  };
  var WrappedSignal = class extends Signal {
    constructor(container, fn, args, fnStr) {
      super(container, NEEDS_COMPUTATION);
      this.$invalid$ = true;
      this.$effectDependencies$ = null;
      this.$args$ = args;
      this.$func$ = fn;
      this.$funcStr$ = fnStr;
    }
    $invalidate$() {
      var _a;
      this.$invalid$ = true;
      if (!(null == (_a = this.$effects$) ? void 0 : _a.length)) {
        return;
      }
      this.$computeIfNeeded$() && triggerEffects(this.$container$, this, this.$effects$);
    }
    force() {
      this.$invalid$ = true;
      triggerEffects(this.$container$, this, this.$effects$);
    }
    get untrackedValue() {
      this.$computeIfNeeded$();
      assertFalse(this.$untrackedValue$ === NEEDS_COMPUTATION, "Invalid state");
      return this.$untrackedValue$;
    }
    $computeIfNeeded$() {
      if (!this.$invalid$) {
        return false;
      }
      this.$untrackedValue$ = trackSignal((() => this.$func$(...this.$args$)), this, ".", this.$container$);
    }
    get value() {
      return super.value;
    }
    set value(_) {
      throwErrorAndStop("WrappedSignal is read-only");
    }
  };
  var version = "2.0.0-0-dev+e2d67d3";
  var _SharedContainer = class {
    constructor(scheduleDrain, journalFlush, serverData, locale) {
      this.$currentUniqueId$ = 0;
      this.$instanceHash$ = null;
      this.$serverData$ = serverData;
      this.$locale$ = locale;
      this.$version$ = version;
      this.$storeProxyMap$ = new WeakMap;
      this.$getObjectById$ = id => {
        throw Error("Not implemented");
      };
      this.$scheduler$ = createScheduler(this, scheduleDrain, journalFlush);
    }
    trackSignalValue(signal, subscriber, property, data) {
      return trackSignal((() => signal.value), subscriber, property, this, data);
    }
    serializationCtxFactory(NodeConstructor, symbolToChunkResolver, writer) {
      return createSerializationContext(NodeConstructor, symbolToChunkResolver, this.getHostProp.bind(this), this.setHostProp.bind(this), this.$storeProxyMap$, writer);
    }
  };
  Symbol("proxy target");
  Symbol("proxy flags");
  Symbol("proxy manager");
  var _CONST_PROPS = Symbol("CONST");
  var _VAR_PROPS = Symbol("VAR");
  Symbol("IMMUTABLE");
  var componentQrl = componentQrl2 => {
    const QwikComponent = () => {};
    QwikComponent[SERIALIZABLE_STATE] = [ componentQrl2 ];
    return QwikComponent;
  };
  var SERIALIZABLE_STATE = Symbol("serializable-data");
  var isQwikComponent = component => "function" == typeof component && void 0 !== component[SERIALIZABLE_STATE];
  var _jsxSorted = (type, varProps, constProps, children, flags, key, dev) => {
    const processed = null == key ? null : String(key);
    const node = new JSXNodeImpl(type, varProps || {}, constProps || null, children, flags, processed);
    qDev && dev && (node.dev = {
      stack: (new Error).stack,
      ...dev
    });
    seal(node);
    return node;
  };
  var isPropsProxy = obj => obj && void 0 !== obj[_VAR_PROPS];
  var JSXNodeImpl = class {
    constructor(type, varProps, constProps, children, flags, key = null) {
      this.type = type;
      this.varProps = varProps;
      this.constProps = constProps;
      this.children = children;
      this.flags = flags;
      this.key = key;
      this._proxy = null;
      if (qDev) {
        if ("object" !== typeof varProps) {
          throw new Error("JSXNodeImpl: varProps must be objects: " + JSON.stringify(varProps));
        }
        if ("object" !== typeof constProps) {
          throw new Error("JSXNodeImpl: constProps must be objects: " + JSON.stringify(constProps));
        }
      }
    }
    get props() {
      this._proxy || (this._proxy = createPropsProxy(this.varProps, this.constProps, this.children));
      return this._proxy;
    }
  };
  var Virtual = props => props.children;
  var isJSXNode = n => {
    if (qDev) {
      if (n instanceof JSXNodeImpl) {
        return true;
      }
      if (isObject(n) && "key" in n && "props" in n && "type" in n) {
        logWarn('Duplicate implementations of "JSXNode" found');
        return true;
      }
      return false;
    }
    return n instanceof JSXNodeImpl;
  };
  var Fragment = props => props.children;
  function createPropsProxy(varProps, constProps, children) {
    return new Proxy({}, new PropsProxyHandler(varProps, constProps, children));
  }
  var PropsProxyHandler = class {
    constructor($varProps$, $constProps$, $children$) {
      this.$varProps$ = $varProps$;
      this.$constProps$ = $constProps$;
      this.$children$ = $children$;
    }
    get(_, prop) {
      if (prop === _CONST_PROPS) {
        return this.$constProps$;
      }
      if (prop === _VAR_PROPS) {
        return this.$varProps$;
      }
      if (null != this.$children$ && "children" === prop) {
        return this.$children$;
      }
      const value = this.$constProps$ && prop in this.$constProps$ ? this.$constProps$[prop] : this.$varProps$[prop];
      return value instanceof WrappedSignal ? value.value : value;
    }
    set(_, prop, value) {
      if (prop === _CONST_PROPS) {
        this.$constProps$ = value;
        return true;
      }
      if (prop === _VAR_PROPS) {
        this.$varProps$ = value;
        return true;
      }
      this.$constProps$ && prop in this.$constProps$ ? this.$constProps$[prop] = value : this.$varProps$[prop] = value;
      return true;
    }
    deleteProperty(_, prop) {
      if ("string" !== typeof prop) {
        return false;
      }
      let didDelete = delete this.$varProps$[prop];
      this.$constProps$ && (didDelete = delete this.$constProps$[prop] || didDelete);
      null != this.$children$ && "children" === prop && (this.$children$ = null);
      return didDelete;
    }
    has(_, prop) {
      const hasProp = "children" === prop && null != this.$children$ || prop === _CONST_PROPS || prop === _VAR_PROPS || prop in this.$varProps$ || !!this.$constProps$ && prop in this.$constProps$;
      return hasProp;
    }
    getOwnPropertyDescriptor(target, p) {
      const value = "children" === p && null != this.$children$ ? this.$children$ : this.$constProps$ && p in this.$constProps$ ? this.$constProps$[p] : this.$varProps$[p];
      return {
        configurable: true,
        enumerable: true,
        value: value
      };
    }
    ownKeys() {
      const out = Object.keys(this.$varProps$);
      null != this.$children$ && -1 === out.indexOf("children") && out.push("children");
      if (this.$constProps$) {
        for (const key in this.$constProps$) {
          -1 === out.indexOf(key) && out.push(key);
        }
      }
      return out;
    }
  };
  var directGetPropsProxyProp = (jsx2, prop) => jsx2.constProps && prop in jsx2.constProps ? jsx2.constProps[prop] : jsx2.varProps[prop];
  var stringifyPath = [];
  function qwikDebugToString(value) {
    if (null === value) {
      return "null";
    }
    if (void 0 === value) {
      return "undefined";
    }
    if ("string" === typeof value) {
      return '"' + value + '"';
    }
    if ("number" === typeof value || "boolean" === typeof value) {
      return String(value);
    }
    if (isTask(value)) {
      return `Task(${qwikDebugToString(value.$qrl$)})`;
    }
    if (isQrl(value)) {
      return `Qrl(${value.$symbol$})`;
    }
    if ("object" === typeof value || "function" === typeof value) {
      if (stringifyPath.includes(value)) {
        return "*";
      }
      stringifyPath.length;
      try {
        stringifyPath.push(value);
        if (Array.isArray(value)) {
          return vnode_isVNode(value) ? vnode_toString.apply(value) : value.map(qwikDebugToString);
        }
        if (isSignal(value)) {
          return value instanceof WrappedSignal ? "WrappedSignal" : value instanceof ComputedSignal ? "ComputedSignal" : "Signal";
        }
        if (isStore(value)) {
          return "Store";
        }
        if (isJSXNode(value)) {
          return jsxToString(value);
        }
      } finally {
        stringifyPath.pop();
      }
    }
    return value;
  }
  var pad = (text, prefix) => String(text).split("\n").map(((line, idx) => (idx ? prefix : "") + line)).join("\n");
  var jsxToString = value => {
    if (isJSXNode(value)) {
      let type = value.type;
      "function" === typeof type && (type = type.name || "Component");
      let str = "<" + value.type;
      if (value.props) {
        for (const [key, val] of Object.entries(value.props)) {
          str += " " + key + "=" + qwikDebugToString(val);
        }
        const children = value.children;
        if (null != children) {
          str += ">";
          Array.isArray(children) ? children.forEach((child => {
            str += jsxToString(child);
          })) : str += jsxToString(children);
          str += "</" + value.type + ">";
        } else {
          str += "/>";
        }
      }
      return str;
    }
    return String(value);
  };
  var VNodeDataSeparator = {
    REFERENCE_CH: "~",
    REFERENCE: 126,
    ADVANCE_1_CH: "!",
    ADVANCE_1: 33,
    ADVANCE_2_CH: '"',
    ADVANCE_2: 34,
    ADVANCE_4_CH: "#",
    ADVANCE_4: 35,
    ADVANCE_8_CH: "$",
    ADVANCE_8: 36,
    ADVANCE_16_CH: "%",
    ADVANCE_16: 37,
    ADVANCE_32_CH: "&",
    ADVANCE_32: 38,
    ADVANCE_64_CH: "'",
    ADVANCE_64: 39,
    ADVANCE_128_CH: "(",
    ADVANCE_128: 40,
    ADVANCE_256_CH: ")",
    ADVANCE_256: 41,
    ADVANCE_512_CH: "*",
    ADVANCE_512: 42,
    ADVANCE_1024_CH: "+",
    ADVANCE_1024: 43,
    ADVANCE_2048_CH: ",",
    ADVANCE_2048: 44,
    ADVANCE_4096_CH: "-",
    ADVANCE_4096: 45,
    ADVANCE_8192_CH: ".",
    ADVANCE_8192: 46
  };
  var VNodeDataChar = {
    OPEN: 123,
    OPEN_CHAR: "{",
    CLOSE: 125,
    CLOSE_CHAR: "}",
    SCOPED_STYLE: 59,
    SCOPED_STYLE_CHAR: ";",
    RENDER_FN: 60,
    RENDER_FN_CHAR: "<",
    ID: 61,
    ID_CHAR: "=",
    PROPS: 62,
    PROPS_CHAR: ">",
    SLOT_REF: 63,
    SLOT_REF_CHAR: "?",
    KEY: 64,
    KEY_CHAR: "@",
    SEQ: 91,
    SEQ_CHAR: "[",
    DON_T_USE: 93,
    DON_T_USE_CHAR: "\\",
    CONTEXT: 93,
    CONTEXT_CHAR: "]",
    SEQ_IDX: 94,
    SEQ_IDX_CHAR: "^",
    SEPARATOR: 124,
    SEPARATOR_CHAR: "|",
    SLOT: 126,
    SLOT_CHAR: "~"
  };
  var vnode_newElement = (element, elementName) => {
    assertEqual(fastNodeType(element), 1, "Expecting element node.");
    const vnode = VNodeArray.createElement(-247, null, null, null, null, null, element, elementName);
    assertTrue(vnode_isElementVNode(vnode), "Incorrect format of ElementVNode.");
    assertFalse(vnode_isTextVNode(vnode), "Incorrect format of ElementVNode.");
    assertFalse(vnode_isVirtualVNode(vnode), "Incorrect format of ElementVNode.");
    return vnode;
  };
  var vnode_newUnMaterializedElement = element => {
    assertEqual(fastNodeType(element), 1, "Expecting element node.");
    const vnode = VNodeArray.createElement(-255, null, null, null, void 0, void 0, element, void 0);
    assertTrue(vnode_isElementVNode(vnode), "Incorrect format of ElementVNode.");
    assertFalse(vnode_isTextVNode(vnode), "Incorrect format of ElementVNode.");
    assertFalse(vnode_isVirtualVNode(vnode), "Incorrect format of ElementVNode.");
    return vnode;
  };
  var vnode_newSharedText = (previousTextNode, sharedTextNode, textContent) => {
    sharedTextNode && assertEqual(fastNodeType(sharedTextNode), 3, "Expecting element node.");
    const vnode = VNodeArray.createText(-252, null, previousTextNode, null, sharedTextNode, textContent);
    assertFalse(vnode_isElementVNode(vnode), "Incorrect format of TextVNode.");
    assertTrue(vnode_isTextVNode(vnode), "Incorrect format of TextVNode.");
    assertFalse(vnode_isVirtualVNode(vnode), "Incorrect format of TextVNode.");
    return vnode;
  };
  var vnode_newText = (textNode, textContent) => {
    const vnode = VNodeArray.createText(-244, null, null, null, textNode, textContent);
    assertEqual(fastNodeType(textNode), 3, "Expecting element node.");
    assertFalse(vnode_isElementVNode(vnode), "Incorrect format of TextVNode.");
    assertTrue(vnode_isTextVNode(vnode), "Incorrect format of TextVNode.");
    assertFalse(vnode_isVirtualVNode(vnode), "Incorrect format of TextVNode.");
    return vnode;
  };
  var vnode_newVirtual = () => {
    const vnode = VNodeArray.createVirtual(-254, null, null, null, null, null);
    assertFalse(vnode_isElementVNode(vnode), "Incorrect format of TextVNode.");
    assertFalse(vnode_isTextVNode(vnode), "Incorrect format of TextVNode.");
    assertTrue(vnode_isVirtualVNode(vnode), "Incorrect format of TextVNode.");
    return vnode;
  };
  var vnode_isVNode = vNode => vNode instanceof VNodeArray;
  var vnode_isElementVNode = vNode => {
    assertDefined(vNode, "Missing vNode");
    const flag = vNode[0];
    return 1 === (1 & flag);
  };
  var vnode_isElementOrTextVNode = vNode => {
    assertDefined(vNode, "Missing vNode");
    const flag = vNode[0];
    return 0 !== (5 & flag);
  };
  var vnode_isMaterialized = vNode => {
    assertDefined(vNode, "Missing vNode");
    const flag = vNode[0];
    return 1 === (1 & flag) && void 0 !== vNode[4] && void 0 !== vNode[5];
  };
  var vnode_isTextVNode = vNode => {
    assertDefined(vNode, "Missing vNode");
    const flag = vNode[0];
    return 4 === (4 & flag);
  };
  var vnode_isVirtualVNode = vNode => {
    assertDefined(vNode, "Missing vNode");
    const flag = vNode[0];
    return 2 === (2 & flag);
  };
  var ensureTextVNode = vNode => {
    assertTrue(vnode_isTextVNode(vNode), "Expecting TextVNode was: " + vnode_getNodeTypeName(vNode));
    return vNode;
  };
  var ensureElementOrVirtualVNode = vNode => {
    assertDefined(vNode, "Missing vNode");
    assertTrue(0 !== (3 & vNode[0]), "Expecting ElementVNode or VirtualVNode was: " + vnode_getNodeTypeName(vNode));
  };
  var ensureElementVNode = vNode => {
    assertTrue(vnode_isElementVNode(vNode), "Expecting ElementVNode was: " + vnode_getNodeTypeName(vNode));
    return vNode;
  };
  var vnode_getNodeTypeName = vNode => {
    if (vNode) {
      const flags = vNode[0];
      switch (7 & flags) {
       case 1:
        return "Element";

       case 2:
        return "Virtual";

       case 4:
        return "Text";
      }
    }
    return "<unknown>";
  };
  var vnode_ensureElementInflated = vnode => {
    const flags = vnode[0];
    if (1 === (15 & flags)) {
      const elementVNode = vnode;
      elementVNode[0] ^= 8;
      const element = elementVNode[6];
      const attributes = element.attributes;
      for (let idx = 0; idx < attributes.length; idx++) {
        const attr = attributes[idx];
        const key = attr.name;
        if (key == Q_PROPS_SEPARATOR || !key) {
          break;
        }
        if (key.startsWith(QContainerAttr)) {
          "html" === attr.value ? mapArray_set(elementVNode, dangerouslySetInnerHTML, element.innerHTML, 8) : "text" === attr.value && "value" in element && mapArray_set(elementVNode, "value", element.value, 8);
        } else if (!key.startsWith("on:")) {
          const value = attr.value;
          mapArray_set(elementVNode, key, value, 8);
        }
      }
    }
  };
  function vnode_walkVNode(vNode, callback) {
    let vCursor = vNode;
    if (vnode_isTextVNode(vNode)) {
      return;
    }
    let vParent = null;
    do {
      null == callback || callback(vCursor, vParent);
      const vFirstChild = vnode_getFirstChild(vCursor);
      if (vFirstChild) {
        vCursor = vFirstChild;
        continue;
      }
      if (vCursor === vNode) {
        return;
      }
      const vNextSibling = vnode_getNextSibling(vCursor);
      if (vNextSibling) {
        vCursor = vNextSibling;
        continue;
      }
      vParent = vnode_getParent(vCursor);
      while (vParent) {
        if (vParent === vNode) {
          return;
        }
        const vNextParentSibling = vnode_getNextSibling(vParent);
        if (vNextParentSibling) {
          vCursor = vNextParentSibling;
          break;
        }
        vParent = vnode_getParent(vParent);
      }
      if (null == vParent) {
        return;
      }
    } while (true);
  }
  function vnode_getDOMChildNodes(journal, root, isVNode = false, childNodes = []) {
    if (vnode_isElementOrTextVNode(root)) {
      vnode_isTextVNode(root) && vnode_ensureTextInflated(journal, root);
      childNodes.push(isVNode ? root : vnode_getNode(root));
      return childNodes;
    }
    let vNode = vnode_getFirstChild(root);
    while (vNode) {
      if (vnode_isElementVNode(vNode)) {
        childNodes.push(isVNode ? vNode : vnode_getNode(vNode));
      } else if (vnode_isTextVNode(vNode)) {
        vnode_ensureTextInflated(journal, vNode);
        childNodes.push(isVNode ? vNode : vnode_getNode(vNode));
      } else {
        vnode_getDOMChildNodes(journal, vNode, !!isVNode, childNodes);
      }
      vNode = vnode_getNextSibling(vNode);
    }
    return childNodes;
  }
  var vnode_getDomSibling = (vNode, nextDirection, descend) => {
    const childProp = nextDirection ? 4 : 5;
    const siblingProp = nextDirection ? 3 : 2;
    let cursor = vNode;
    while (descend && cursor && vnode_isVirtualVNode(cursor)) {
      const child = cursor[childProp];
      if (!child) {
        break;
      }
      if (5 & child[0]) {
        return child;
      }
      cursor = child;
    }
    while (cursor) {
      let sibling = cursor[siblingProp];
      if (sibling && 5 & sibling[0]) {
        return sibling;
      }
      if (!sibling) {
        let virtual = cursor[1];
        if (virtual && !vnode_isVirtualVNode(virtual)) {
          return null;
        }
        while (virtual && !(sibling = virtual[siblingProp])) {
          virtual = virtual[1];
          if (virtual && !vnode_isVirtualVNode(virtual)) {
            return null;
          }
        }
        if (!sibling) {
          return null;
        }
        if (vnode_isTextVNode(sibling) && virtual && vnode_isElementVNode(virtual)) {
          return null;
        }
      }
      while (sibling) {
        cursor = sibling;
        if (5 & cursor[0] && vnode_getNode(cursor)) {
          return cursor;
        }
        sibling = cursor[childProp];
      }
    }
    return null;
  };
  var vnode_ensureInflatedIfText = (journal, vNode) => {
    vnode_isTextVNode(vNode) && vnode_ensureTextInflated(journal, vNode);
  };
  var vnode_ensureTextInflated = (journal, vnode) => {
    var _a;
    const textVNode = ensureTextVNode(vnode);
    const flags = textVNode[0];
    if (0 === (8 & flags)) {
      const parentNode = vnode_getDomParent(vnode);
      const sharedTextNode = textVNode[4];
      const doc = parentNode.ownerDocument;
      let cursor = vnode_getDomSibling(vnode, false, true);
      const insertBeforeNode = sharedTextNode || (null == (_a = vnode_getDomSibling(vnode, true, true)) ? void 0 : _a[6]) || null;
      let lastPreviousTextNode = insertBeforeNode;
      while (cursor && vnode_isTextVNode(cursor)) {
        if (0 === (8 & cursor[0])) {
          const textNode = doc.createTextNode(cursor[5]);
          journal.push(5, parentNode, lastPreviousTextNode, textNode);
          lastPreviousTextNode = textNode;
          cursor[4] = textNode;
          cursor[0] |= 8;
        }
        cursor = vnode_getDomSibling(cursor, false, true);
      }
      cursor = vnode;
      while (cursor && vnode_isTextVNode(cursor)) {
        const next = vnode_getDomSibling(cursor, true, true);
        const isLastNode = !next || !vnode_isTextVNode(next);
        if (0 === (8 & cursor[0])) {
          if (isLastNode && sharedTextNode) {
            journal.push(1, sharedTextNode, cursor[5]);
          } else {
            const textNode = doc.createTextNode(cursor[5]);
            journal.push(5, parentNode, insertBeforeNode, textNode);
            cursor[4] = textNode;
          }
          cursor[0] |= 8;
        }
        cursor = next;
      }
    }
  };
  var vnode_locate = (rootVNode, id) => {
    ensureElementVNode(rootVNode);
    let vNode = rootVNode;
    const containerElement = rootVNode[6];
    const {qVNodeRefs: qVNodeRefs} = containerElement;
    let elementOffset = -1;
    let refElement;
    if ("string" === typeof id) {
      assertDefined(qVNodeRefs, "Missing qVNodeRefs.");
      elementOffset = parseInt(id);
      refElement = qVNodeRefs.get(elementOffset);
    } else {
      refElement = id;
    }
    assertDefined(refElement, "Missing refElement.");
    if (vnode_isVNode(refElement)) {
      vNode = refElement;
    } else {
      assertTrue(containerElement.contains(refElement), "Couldn't find the element inside the container while locating the VNode.");
      let parent = refElement;
      const elementPath = [ refElement ];
      while (parent && parent !== containerElement) {
        parent = parent.parentElement;
        elementPath.push(parent);
      }
      for (let i = elementPath.length - 2; i >= 0; i--) {
        vNode = vnode_getVNodeForChildNode(vNode, elementPath[i]);
      }
      -1 != elementOffset && qVNodeRefs.set(elementOffset, vNode);
    }
    if ("string" === typeof id) {
      const idLength = id.length;
      let idx = indexOfAlphanumeric(id, idLength);
      let childIdx = 0;
      while (idx < idLength) {
        const ch = id.charCodeAt(idx);
        childIdx *= 26;
        if (ch >= 97) {
          childIdx += ch - 97;
        } else {
          childIdx += ch - 65;
          vNode = vnode_getChildWithIdx(vNode, childIdx);
          childIdx = 0;
        }
        idx++;
      }
    }
    return vNode;
  };
  var vnode_getChildWithIdx = (vNode, childIdx) => {
    let child = vnode_getFirstChild(vNode);
    assertDefined(child, "Missing child.");
    while (child[0] >>> 8 !== childIdx) {
      child = vnode_getNextSibling(child);
      assertDefined(child, "Missing child.");
    }
    return child;
  };
  var vNodeStack = [];
  var vnode_getVNodeForChildNode = (vNode, childElement) => {
    ensureElementVNode(vNode);
    let child = vnode_getFirstChild(vNode);
    assertDefined(child, "Missing child.");
    while (child && child[6] !== childElement) {
      if (vnode_isVirtualVNode(child)) {
        const next = vnode_getNextSibling(child);
        const firstChild = vnode_getFirstChild(child);
        if (firstChild) {
          next && vNodeStack.push(next);
          child = firstChild;
        } else {
          child = next || (vNodeStack.length ? vNodeStack.pop() : null);
        }
      } else {
        const next = vnode_getNextSibling(child);
        child = next || (next || vNodeStack.pop());
      }
      assertDefined(child, "Missing child.");
    }
    while (vNodeStack.length) {
      vNodeStack.pop();
    }
    ensureElementVNode(child);
    assertEqual(child[6], childElement, "Child not found.");
    return child;
  };
  var indexOfAlphanumeric = (id, length) => {
    let idx = 0;
    while (idx < length) {
      if (!(id.charCodeAt(idx) <= 57)) {
        return idx;
      }
      idx++;
    }
    return length;
  };
  var parseBoolean = value => {
    if ("false" === value) {
      return false;
    }
    return Boolean(value);
  };
  var isBooleanAttr = (element, key) => {
    const isBoolean = "allowfullscreen" == key || "async" == key || "autofocus" == key || "autoplay" == key || "checked" == key || "controls" == key || "default" == key || "defer" == key || "disabled" == key || "formnovalidate" == key || "inert" == key || "ismap" == key || "itemscope" == key || "loop" == key || "multiple" == key || "muted" == key || "nomodule" == key || "novalidate" == key || "open" == key || "playsinline" == key || "readonly" == key || "required" == key || "reversed" == key || "selected" == key;
    return isBoolean && key in element;
  };
  var vnode_applyJournal = journal => {
    let idx = 0;
    const length = journal.length;
    while (idx < length) {
      const op = journal[idx++];
      switch (op) {
       case 1:
        const text = journal[idx++];
        text.nodeValue = journal[idx++];
        break;

       case 2:
        const element = journal[idx++];
        let key = journal[idx++];
        "className" === key && (key = "class");
        const value = journal[idx++];
        isBooleanAttr(element, key) ? element[key] = parseBoolean(value) : "value" === key && key in element ? element.value = escapeHTML(String(value)) : key === dangerouslySetInnerHTML ? element.innerHTML = value : null == value || false === value ? element.removeAttribute(key) : element.setAttribute(key, String(value));
        break;

       case 3:
        const document2 = journal[idx++];
        const head = document2.head;
        const styles = document2.querySelectorAll(QStylesAllSelector);
        for (let i = 0; i < styles.length; i++) {
          head.appendChild(styles[i]);
        }
        break;

       case 4:
        const removeParent = journal[idx++];
        let nodeToRemove;
        while (idx < length && "number" !== typeof (nodeToRemove = journal[idx])) {
          removeParent.removeChild(nodeToRemove);
          idx++;
        }
        break;

       case 5:
        const insertParent = journal[idx++];
        const insertBefore = journal[idx++];
        let newChild;
        while (idx < length && "number" !== typeof (newChild = journal[idx])) {
          insertParent.insertBefore(newChild, insertBefore);
          idx++;
        }
        break;
      }
    }
    journal.length = 0;
  };
  var mapApp_findIndx = (elementVNode, key, start) => {
    assertTrue(start % 2 === 0, "Expecting even number.");
    let bottom = start >> 1;
    let top = elementVNode.length - 2 >> 1;
    while (bottom <= top) {
      const mid = bottom + (top - bottom >> 1);
      const midKey = elementVNode[mid << 1];
      if (midKey === key) {
        return mid << 1;
      }
      midKey < key ? bottom = mid + 1 : top = mid - 1;
    }
    return ~(bottom << 1);
  };
  var mapArray_set = (elementVNode, key, value, start) => {
    const indx = mapApp_findIndx(elementVNode, key, start);
    indx >= 0 ? null == value ? elementVNode.splice(indx, 2) : elementVNode[indx + 1] = value : null != value && elementVNode.splice(~indx, 0, key, value);
  };
  var mapArray_get = (elementVNode, key, start) => {
    const indx = mapApp_findIndx(elementVNode, key, start);
    return indx >= 0 ? elementVNode[indx + 1] : null;
  };
  var vnode_insertBefore = (journal, parent, newChild, insertBefore) => {
    ensureElementOrVirtualVNode(parent);
    vnode_isElementVNode(parent) && ensureMaterialized(parent);
    let adjustedInsertBefore = null;
    null == insertBefore ? vnode_isVirtualVNode(parent) && (adjustedInsertBefore = vnode_getDomSibling(parent, true, false)) : adjustedInsertBefore = vnode_isVirtualVNode(insertBefore) ? vnode_getDomSibling(insertBefore, true, true) : insertBefore;
    adjustedInsertBefore && vnode_ensureInflatedIfText(journal, adjustedInsertBefore);
    const domParentVNode = vnode_getDomParentVNode(parent);
    const parentNode = domParentVNode && domParentVNode[6];
    if (parentNode) {
      const domChildren = vnode_getDomChildrenWithCorrectNamespacesToInsert(journal, domParentVNode, newChild);
      domChildren.length && journal.push(5, parentNode, vnode_getNode(adjustedInsertBefore), ...domChildren);
    }
    const newChildCurrentParent = newChild[1];
    newChildCurrentParent && (newChild[2] || newChild[3] || vnode_isElementVNode(newChildCurrentParent) && newChildCurrentParent !== parent) && vnode_remove(journal, newChildCurrentParent, newChild, false);
    const vNext = insertBefore;
    const vPrevious = vNext ? vNext[2] : parent[5];
    vNext ? vNext[2] = newChild : parent[5] = newChild;
    vPrevious ? vPrevious[3] = newChild : parent[4] = newChild;
    newChild[2] = vPrevious;
    newChild[3] = vNext;
    newChild[1] = parent;
  };
  var vnode_getDomParent = vnode => {
    vnode = vnode_getDomParentVNode(vnode);
    return vnode && vnode[6];
  };
  var vnode_getDomParentVNode = vnode => {
    while (vnode && !vnode_isElementVNode(vnode)) {
      vnode = vnode[1];
    }
    return vnode;
  };
  var vnode_remove = (journal, vParent, vToRemove, removeDOM) => {
    assertEqual(vParent, vnode_getParent(vToRemove), "Parent mismatch.");
    vnode_isTextVNode(vToRemove) && vnode_ensureTextInflated(journal, vToRemove);
    const vPrevious = vToRemove[2];
    const vNext = vToRemove[3];
    vPrevious ? vPrevious[3] = vNext : vParent[4] = vNext;
    vNext ? vNext[2] = vPrevious : vParent[5] = vPrevious;
    vToRemove[2] = null;
    vToRemove[3] = null;
    if (removeDOM) {
      const domParent = vnode_getDomParent(vParent);
      const isInnerHTMLParent = vnode_getAttr(vParent, dangerouslySetInnerHTML);
      if (isInnerHTMLParent) {
        return;
      }
      const children = vnode_getDOMChildNodes(journal, vToRemove);
      domParent && children.length && journal.push(4, domParent, ...children);
    }
  };
  var vnode_truncate = (journal, vParent, vDelete) => {
    assertDefined(vDelete, "Missing vDelete.");
    const parent = vnode_getDomParent(vParent);
    const children = vnode_getDOMChildNodes(journal, vDelete);
    parent && children.length && journal.push(4, parent, ...children);
    const vPrevious = vDelete[2];
    vPrevious ? vPrevious[3] = null : vParent[4] = null;
    vParent[5] = vPrevious;
  };
  var vnode_getElementName = vnode => {
    const elementVNode = ensureElementVNode(vnode);
    let elementName = elementVNode[7];
    if (void 0 === elementName) {
      elementName = elementVNode[7] = elementVNode[6].nodeName.toLowerCase();
      elementVNode[0] |= vnode_getElementNamespaceFlags(elementName);
    }
    return elementName;
  };
  var vnode_getText = vnode => {
    const textVNode = ensureTextVNode(vnode);
    let text = textVNode[5];
    void 0 === text && (text = textVNode[5] = textVNode[4].nodeValue);
    return text;
  };
  var vnode_setText = (journal, textVNode, text) => {
    vnode_ensureTextInflated(journal, textVNode);
    const textNode = textVNode[4];
    journal.push(1, textNode, textVNode[5] = text);
  };
  var vnode_getFirstChild = vnode => {
    if (vnode_isTextVNode(vnode)) {
      return null;
    }
    let vFirstChild = vnode[4];
    void 0 === vFirstChild && (vFirstChild = ensureMaterialized(vnode));
    return vFirstChild;
  };
  var vnode_materialize = vNode => {
    var _a, _b;
    const element = vNode[6];
    const firstChild = fastFirstChild(element);
    const vNodeData = null == (_b = null == (_a = element.ownerDocument) ? void 0 : _a.qVNodeData) ? void 0 : _b.get(element);
    const vFirstChild = vNodeData ? materializeFromVNodeData(vNode, vNodeData, element, firstChild) : materializeFromDOM(vNode, firstChild);
    return vFirstChild;
  };
  var ensureMaterialized = vnode => {
    const vParent = ensureElementVNode(vnode);
    let vFirstChild = vParent[4];
    if (void 0 === vFirstChild) {
      const element = vParent[6];
      vFirstChild = vParent[1] && shouldIgnoreChildren(element) ? vParent[4] = vParent[5] = null : vnode_materialize(vParent);
    }
    assertTrue(void 0 !== vParent[4], "Did not materialize.");
    assertTrue(void 0 !== vParent[5], "Did not materialize.");
    return vFirstChild;
  };
  var _fastHasAttribute = null;
  var shouldIgnoreChildren = node => {
    _fastHasAttribute || (_fastHasAttribute = node.hasAttribute);
    return _fastHasAttribute.call(node, QContainerAttr);
  };
  var _fastNodeType = null;
  var fastNodeType = node => {
    _fastNodeType || (_fastNodeType = fastGetter(node, "nodeType"));
    return _fastNodeType.call(node);
  };
  var fastIsTextOrElement = node => {
    const type = fastNodeType(node);
    return 3 === type || 1 === type;
  };
  var _fastNextSibling = null;
  var fastNextSibling = node => {
    var _a, _b;
    _fastNextSibling || (_fastNextSibling = fastGetter(node, "nextSibling"));
    _fastFirstChild || (_fastFirstChild = fastGetter(node, "firstChild"));
    while (node) {
      node = _fastNextSibling.call(node);
      if (null !== node) {
        const type = fastNodeType(node);
        if (3 === type || 1 === type) {
          break;
        }
        if (8 === type) {
          const nodeValue = node.nodeValue;
          if (null == nodeValue ? void 0 : nodeValue.startsWith(QIgnore)) {
            return getNodeAfterCommentNode(node, QContainerIsland, _fastNextSibling, _fastFirstChild);
          }
          if (null == (_a = node.nodeValue) ? void 0 : _a.startsWith(QContainerIslandEnd)) {
            return getNodeAfterCommentNode(node, QIgnoreEnd, _fastNextSibling, _fastFirstChild);
          }
          if (null == nodeValue ? void 0 : nodeValue.startsWith(QContainerAttr)) {
            while (node && (node = _fastNextSibling.call(node))) {
              if (8 === fastNodeType(node) && (null == (_b = node.nodeValue) ? void 0 : _b.startsWith(QContainerAttrEnd))) {
                break;
              }
            }
          }
        }
      }
    }
    return node;
  };
  function getNodeAfterCommentNode(node, commentValue, nextSibling, firstChild) {
    var _a;
    while (node) {
      if (null == (_a = node.nodeValue) ? void 0 : _a.startsWith(commentValue)) {
        node = nextSibling.call(node) || null;
        return node;
      }
      let nextNode = firstChild.call(node);
      nextNode || (nextNode = nextSibling.call(node));
      if (!nextNode) {
        nextNode = fastParentNode(node);
        nextNode && (nextNode = nextSibling.call(nextNode));
      }
      node = nextNode;
    }
    return null;
  }
  var _fastParentNode = null;
  var fastParentNode = node => {
    _fastParentNode || (_fastParentNode = fastGetter(node, "parentNode"));
    return _fastParentNode.call(node);
  };
  var _fastFirstChild = null;
  var fastFirstChild = node => {
    _fastFirstChild || (_fastFirstChild = fastGetter(node, "firstChild"));
    node = node && _fastFirstChild.call(node);
    while (node && !fastIsTextOrElement(node)) {
      node = fastNextSibling(node);
    }
    return node;
  };
  var fastGetter = (prototype, name) => {
    var _a;
    let getter;
    while (prototype && !(getter = null == (_a = Object.getOwnPropertyDescriptor(prototype, name)) ? void 0 : _a.get)) {
      prototype = Object.getPrototypeOf(prototype);
    }
    return getter || function() {
      return this[name];
    };
  };
  var isQStyleElement = node => isElement(node) && "STYLE" === node.nodeName && (node.hasAttribute(QScopedStyle) || node.hasAttribute(QStyle));
  var materializeFromDOM = (vParent, firstChild) => {
    let vFirstChild = null;
    let child = firstChild;
    while (isQStyleElement(child)) {
      child = fastNextSibling(child);
    }
    let vChild = null;
    while (child) {
      const nodeType = fastNodeType(child);
      let vNextChild = null;
      3 === nodeType ? vNextChild = vnode_newText(child, child.textContent ?? void 0) : 1 === nodeType && (vNextChild = vnode_newUnMaterializedElement(child));
      if (vNextChild) {
        vNextChild[1] = vParent;
        vChild && (vChild[3] = vNextChild);
        vNextChild[2] = vChild;
        vChild = vNextChild;
      }
      vFirstChild || (vParent[4] = vFirstChild = vChild);
      child = fastNextSibling(child);
    }
    vParent[5] = vChild || null;
    vParent[4] = vFirstChild;
    return vFirstChild;
  };
  var vnode_getNextSibling = vnode => vnode[3];
  var vnode_getPreviousSibling = vnode => vnode[2];
  var vnode_getAttrKeys = vnode => {
    const type = vnode[0];
    if (0 !== (3 & type)) {
      vnode_ensureElementInflated(vnode);
      const keys2 = [];
      for (let i = vnode_getPropStartIndex(vnode); i < vnode.length; i += 2) {
        const key = vnode[i];
        key.startsWith(":") || keys2.push(key);
      }
      return keys2;
    }
    return [];
  };
  var vnode_setAttr = (journal, vnode, key, value) => {
    const type = vnode[0];
    if (0 !== (3 & type)) {
      vnode_ensureElementInflated(vnode);
      const idx = mapApp_findIndx(vnode, key, vnode_getPropStartIndex(vnode));
      if (idx >= 0) {
        if (vnode[idx + 1] != value && 0 !== (1 & type)) {
          const element = vnode[6];
          journal && journal.push(2, element, key, value);
        }
        null == value ? vnode.splice(idx, 2) : vnode[idx + 1] = value;
      } else if (null != value) {
        vnode.splice(~idx, 0, key, value);
        if (0 !== (1 & type)) {
          const element = vnode[6];
          journal && journal.push(2, element, key, value);
        }
      }
    }
  };
  var vnode_getAttr = (vnode, key) => {
    const type = vnode[0];
    if (0 !== (3 & type)) {
      vnode_ensureElementInflated(vnode);
      return mapArray_get(vnode, key, vnode_getPropStartIndex(vnode));
    }
    return null;
  };
  var vnode_getProp = (vnode, key, getObject) => {
    const type = vnode[0];
    if (0 !== (3 & type)) {
      1 & type && vnode_ensureElementInflated(vnode);
      const idx = mapApp_findIndx(vnode, key, vnode_getPropStartIndex(vnode));
      if (idx >= 0) {
        let value = vnode[idx + 1];
        "string" === typeof value && getObject && (vnode[idx + 1] = value = getObject(value));
        return value;
      }
    }
    return null;
  };
  var vnode_setProp = (vnode, key, value) => {
    ensureElementOrVirtualVNode(vnode);
    const idx = mapApp_findIndx(vnode, key, vnode_getPropStartIndex(vnode));
    idx >= 0 ? vnode[idx + 1] = value : null != value && vnode.splice(~idx, 0, key, value);
  };
  var vnode_getPropStartIndex = vnode => {
    const type = 7 & vnode[0];
    if (1 === type) {
      return 8;
    }
    if (2 === type) {
      return 6;
    }
    throw throwErrorAndStop("Invalid vnode type.");
  };
  var vnode_getParent = vnode => vnode[1] || null;
  var vnode_getNode = vnode => {
    if (null === vnode || vnode_isVirtualVNode(vnode)) {
      return null;
    }
    if (vnode_isElementVNode(vnode)) {
      return vnode[6];
    }
    assertTrue(vnode_isTextVNode(vnode), "Expecting Text Node.");
    return vnode[4];
  };
  function vnode_toString(depth = 10, offset = "", materialize = false) {
    var _a;
    let vnode = this;
    if (0 === depth) {
      return "...";
    }
    if (null === vnode) {
      return "null";
    }
    if (void 0 === vnode) {
      return "undefined";
    }
    const strings = [];
    do {
      if (vnode_isTextVNode(vnode)) {
        strings.push(qwikDebugToString(vnode_getText(vnode)));
      } else if (vnode_isVirtualVNode(vnode)) {
        const idx = vnode[0] >>> 8;
        const attrs = [ "[" + String(idx) + "]" ];
        vnode_getAttrKeys(vnode).forEach((key => {
          if (key !== DEBUG_TYPE) {
            const value = vnode_getAttr(vnode, key);
            attrs.push(" " + key + "=" + qwikDebugToString(value));
          }
        }));
        const name = VirtualTypeName[vnode_getAttr(vnode, DEBUG_TYPE) || "V"] || VirtualTypeName.V;
        strings.push("<" + name + attrs.join("") + ">");
        const child = vnode_getFirstChild(vnode);
        child && strings.push("  " + vnode_toString.call(child, depth - 1, offset + "  ", true));
        strings.push("</" + name + ">");
      } else if (vnode_isElementVNode(vnode)) {
        const tag = vnode_getElementName(vnode);
        const attrs = [];
        const keys2 = vnode_getAttrKeys(vnode);
        keys2.forEach((key => {
          const value = vnode_getAttr(vnode, key);
          attrs.push(" " + key + "=" + qwikDebugToString(value));
        }));
        const node = vnode_getNode(vnode);
        if (node) {
          const vnodeData = null == (_a = node.ownerDocument.qVNodeData) ? void 0 : _a.get(node);
          vnodeData && attrs.push(" q:vnodeData=" + qwikDebugToString(vnodeData));
        }
        const domAttrs = node.attributes;
        for (let i = 0; i < domAttrs.length; i++) {
          const attr = domAttrs[i];
          -1 === keys2.indexOf(attr.name) && attrs.push(" " + attr.name + (attr.value ? "=" + qwikDebugToString(attr.value) : ""));
        }
        strings.push("<" + tag + attrs.join("") + ">");
        if (vnode_isMaterialized(vnode) || materialize) {
          const child = vnode_getFirstChild(vnode);
          child && strings.push("  " + vnode_toString.call(child, depth - 1, offset + "  ", true));
        } else {
          strings.push("  \x3c!-- not materialized --!>");
        }
        strings.push("</" + tag + ">");
      }
      vnode = vnode_getNextSibling(vnode) || null;
    } while (vnode);
    return strings.join("\n" + offset);
  }
  var isNumber = ch => 48 <= ch && ch <= 57;
  var isLowercase = ch => 97 <= ch && ch <= 122;
  var stack = [];
  function materializeFromVNodeData(vParent, vData, element, child) {
    let idx = 0;
    let nextToConsumeIdx = 0;
    let vFirst = null;
    let vLast = null;
    let previousTextNode = null;
    let ch = 0;
    let peekCh = 0;
    const peek = () => 0 !== peekCh ? peekCh : peekCh = nextToConsumeIdx < vData.length ? vData.charCodeAt(nextToConsumeIdx) : 0;
    const consume = () => {
      ch = peek();
      peekCh = 0;
      nextToConsumeIdx++;
      return ch;
    };
    const addVNode = node => {
      node[0] = 255 & node[0] | idx << 8;
      idx++;
      vLast && (vLast[3] = node);
      node[2] = vLast;
      node[1] = vParent;
      vFirst || (vParent[4] = vFirst = node);
      vLast = node;
    };
    const consumeValue = () => {
      consume();
      const start = nextToConsumeIdx;
      while (peek() <= 58 && 0 !== peekCh || 95 === peekCh || peekCh >= 65 && peekCh <= 90 || peekCh >= 97 && peekCh <= 122) {
        consume();
      }
      return vData.substring(start, nextToConsumeIdx);
    };
    let textIdx = 0;
    let combinedText = null;
    let container = null;
    while (0 !== peek()) {
      if (isNumber(peek())) {
        while (!isElement(child)) {
          child = fastNextSibling(child);
          child || throwErrorAndStop("Materialize error: missing element: " + vData + " " + peek() + " " + nextToConsumeIdx);
        }
        while (isQStyleElement(child)) {
          child = fastNextSibling(child);
        }
        combinedText = null;
        previousTextNode = null;
        let value = 0;
        while (isNumber(peek())) {
          value *= 10;
          value += consume() - 48;
        }
        while (value--) {
          addVNode(vnode_newUnMaterializedElement(child));
          child = fastNextSibling(child);
        }
      } else if (peek() === VNodeDataChar.SCOPED_STYLE) {
        vnode_setAttr(null, vParent, QScopedStyle, consumeValue());
      } else if (peek() === VNodeDataChar.RENDER_FN) {
        vnode_setAttr(null, vParent, OnRenderProp, consumeValue());
      } else if (peek() === VNodeDataChar.ID) {
        container || (container = getDomContainer(element));
        const id = consumeValue();
        container.$setRawState$(parseInt(id), vParent);
        isDev && vnode_setAttr(null, vParent, ELEMENT_ID, id);
      } else if (peek() === VNodeDataChar.PROPS) {
        vnode_setAttr(null, vParent, ELEMENT_PROPS, consumeValue());
      } else if (peek() === VNodeDataChar.SLOT_REF) {
        vnode_setAttr(null, vParent, QSlotRef, consumeValue());
      } else if (peek() === VNodeDataChar.KEY) {
        vnode_setAttr(null, vParent, ELEMENT_KEY, consumeValue());
      } else if (peek() === VNodeDataChar.SEQ) {
        vnode_setAttr(null, vParent, ELEMENT_SEQ, consumeValue());
      } else if (peek() === VNodeDataChar.SEQ_IDX) {
        vnode_setAttr(null, vParent, ELEMENT_SEQ_IDX, consumeValue());
      } else if (peek() === VNodeDataChar.CONTEXT) {
        vnode_setAttr(null, vParent, QCtxAttr, consumeValue());
      } else if (peek() === VNodeDataChar.OPEN) {
        consume();
        addVNode(vnode_newVirtual());
        stack.push(vParent, vFirst, vLast, previousTextNode, idx);
        idx = 0;
        vParent = vLast;
        vFirst = vLast = null;
      } else if (peek() === VNodeDataChar.SEPARATOR) {
        const key = consumeValue();
        const value = consumeValue();
        vnode_setAttr(null, vParent, key, value);
      } else if (peek() === VNodeDataChar.CLOSE) {
        consume();
        vParent[5] = vLast;
        idx = stack.pop();
        previousTextNode = stack.pop();
        vLast = stack.pop();
        vFirst = stack.pop();
        vParent = stack.pop();
      } else if (peek() === VNodeDataChar.SLOT) {
        vnode_setAttr(null, vParent, QSlot, consumeValue());
      } else {
        const textNode = child && 3 === fastNodeType(child) ? child : null;
        if (null === combinedText) {
          combinedText = textNode ? textNode.nodeValue : null;
          textIdx = 0;
        }
        let length = 0;
        while (isLowercase(peek())) {
          length += consume() - 97;
          length *= 26;
        }
        length += consume() - 65;
        const text = null === combinedText ? "" : combinedText.substring(textIdx, textIdx + length);
        addVNode(previousTextNode = vnode_newSharedText(previousTextNode, textNode, text));
        textIdx += length;
      }
    }
    vParent[5] = vLast;
    return vFirst;
  }
  var vnode_getType = vnode => {
    const type = vnode[0];
    if (1 & type) {
      return 1;
    }
    if (2 & type) {
      return 11;
    }
    if (4 & type) {
      return 3;
    }
    throw throwErrorAndStop("Unknown vnode type: " + type);
  };
  var isElement = node => node && "object" == typeof node && 1 === fastNodeType(node);
  var aPath = [];
  var bPath = [];
  var vnode_documentPosition = (a, b) => {
    if (a === b) {
      return 0;
    }
    let aDepth = -1;
    let bDepth = -1;
    while (a) {
      a = (aPath[++aDepth] = a)[1];
    }
    while (b) {
      b = (bPath[++bDepth] = b)[1];
    }
    while (aDepth >= 0 && bDepth >= 0) {
      a = aPath[aDepth];
      b = bPath[bDepth];
      if (a !== b) {
        let cursor = b;
        do {
          cursor = vnode_getNextSibling(cursor);
          if (cursor === a) {
            return 1;
          }
        } while (cursor);
        cursor = b;
        do {
          cursor = vnode_getPreviousSibling(cursor);
          if (cursor === a) {
            return -1;
          }
        } while (cursor);
        return 1;
      }
      aDepth--;
      bDepth--;
    }
    return aDepth < bDepth ? -1 : 1;
  };
  var vnode_getProjectionParentComponent = (vHost, rootVNode) => {
    let projectionDepth = 1;
    while (projectionDepth--) {
      while (vHost && (!vnode_isVirtualVNode(vHost) || null === vnode_getProp(vHost, OnRenderProp, null))) {
        const qSlotParentProp = vnode_getProp(vHost, QSlotParent, null);
        const qSlotParent = qSlotParentProp && ("string" === typeof qSlotParentProp ? vnode_locate(rootVNode, qSlotParentProp) : qSlotParentProp);
        const vProjectionParent = vnode_isVirtualVNode(vHost) && qSlotParent;
        vProjectionParent && projectionDepth++;
        vHost = vProjectionParent || vnode_getParent(vHost);
      }
      projectionDepth > 0 && (vHost = vnode_getParent(vHost));
    }
    return vHost;
  };
  var VNodeArray = class VNode extends Array {
    static createElement(flags, parent, previousSibling, nextSibling, firstChild, lastChild, element, elementName) {
      const vnode = new VNode(flags, parent, previousSibling, nextSibling);
      vnode.push(firstChild, lastChild, element, elementName);
      return vnode;
    }
    static createText(flags, parent, previousSibling, nextSibling, textNode, text) {
      const vnode = new VNode(flags, parent, previousSibling, nextSibling);
      vnode.push(textNode, text);
      return vnode;
    }
    static createVirtual(flags, parent, previousSibling, nextSibling, firstChild, lastChild) {
      const vnode = new VNode(flags, parent, previousSibling, nextSibling);
      vnode.push(firstChild, lastChild);
      return vnode;
    }
    constructor(flags, parent, previousSibling, nextSibling) {
      super();
      this.push(flags, parent, previousSibling, nextSibling);
      isDev && (this.toString = vnode_toString);
    }
  };
  var _context;
  var tryGetInvokeContext = () => {
    if (!_context) {
      const context = "undefined" !== typeof document && document && document.__q_context__;
      if (!context) {
        return;
      }
      if (isArray(context)) {
        return document.__q_context__ = newInvokeContextFromTuple(context);
      }
      return context;
    }
    return _context;
  };
  function invoke(context, fn, ...args) {
    return invokeApply.call(this, context, fn, args);
  }
  function invokeApply(context, fn, args) {
    const previousContext = _context;
    let returnValue;
    try {
      _context = context;
      returnValue = fn.apply(this, args);
    } finally {
      _context = previousContext;
    }
    return returnValue;
  }
  var newInvokeContextFromTuple = ([element, event, url]) => {
    const container = element.closest(QContainerSelector);
    const locale = (null == container ? void 0 : container.getAttribute(QLocaleAttr)) || void 0;
    locale && setLocale(locale);
    return newInvokeContext(locale, void 0, element, event, url);
  };
  var newInvokeContext = (locale, hostElement, element, event, url) => {
    const $locale$ = locale || ("object" === typeof event && event && "locale" in event ? event.locale : void 0);
    const ctx = {
      $url$: url,
      $i$: 0,
      $hostElement$: hostElement,
      $element$: element,
      $event$: event,
      $qrl$: void 0,
      $effectSubscriber$: void 0,
      $locale$: $locale$,
      $container$: void 0
    };
    seal(ctx);
    return ctx;
  };
  var untrack = fn => invoke(void 0, fn);
  var trackInvocation = newInvokeContext(void 0, void 0, void 0, RenderEvent);
  var trackSignal = (fn, subscriber, property, container, data) => {
    const previousSubscriber = trackInvocation.$effectSubscriber$;
    const previousContainer = trackInvocation.$container$;
    try {
      trackInvocation.$effectSubscriber$ = [ subscriber, property ];
      data && trackInvocation.$effectSubscriber$.push(data);
      trackInvocation.$container$ = container;
      return invoke(trackInvocation, fn);
    } finally {
      trackInvocation.$effectSubscriber$ = previousSubscriber;
      trackInvocation.$container$ = previousContainer;
    }
  };
  var createContextId = name => {
    assertTrue(/^[\w/.-]+$/.test(name), "Context name must only contain A-Z,a-z,0-9, _", name);
    return Object.freeze({
      id: fromCamelToKebabCase(name)
    });
  };
  var ERROR_CONTEXT = createContextId("qk-error");
  var isRecoverable = err => {
    if (err && err instanceof Error && "plugin" in err) {
      return false;
    }
    return true;
  };
  function processVNodeData(document2) {
    const Q_CONTAINER = "q:container";
    const Q_CONTAINER_END = "/" + Q_CONTAINER;
    const Q_PROPS_SEPARATOR2 = ":";
    const Q_SHADOW_ROOT = "q:shadowroot";
    const Q_IGNORE = "q:ignore";
    const Q_IGNORE_END = "/" + Q_IGNORE;
    const Q_CONTAINER_ISLAND = "q:container-island";
    const Q_CONTAINER_ISLAND_END = "/" + Q_CONTAINER_ISLAND;
    const qDocument = document2;
    const vNodeDataMap = qDocument.qVNodeData || (qDocument.qVNodeData = new WeakMap);
    const prototype = document2.body;
    const getter = (prototype2, name) => {
      var _a;
      let getter2;
      while (prototype2 && !(getter2 = null == (_a = Object.getOwnPropertyDescriptor(prototype2, name)) ? void 0 : _a.get)) {
        prototype2 = Object.getPrototypeOf(prototype2);
      }
      return getter2 || function() {
        return this[name];
      };
    };
    const getAttribute = prototype.getAttribute;
    const hasAttribute = prototype.hasAttribute;
    const getNodeType = getter(prototype, "nodeType");
    const attachVnodeDataAndRefs = element => {
      Array.from(element.querySelectorAll('script[type="qwik/vnode"]')).forEach((script => {
        script.setAttribute("type", "x-qwik/vnode");
        const qContainerElement = script.closest("[q\\:container]");
        qContainerElement.qVnodeData = script.textContent;
        qContainerElement.qVNodeRefs = new Map;
      }));
      element.querySelectorAll("[q\\:shadowroot]").forEach((parent => {
        const shadowRoot = parent.shadowRoot;
        shadowRoot && attachVnodeDataAndRefs(shadowRoot);
      }));
    };
    attachVnodeDataAndRefs(document2);
    let NodeType;
    (NodeType2 => {
      NodeType2[NodeType2.CONTAINER_MASK = 1] = "CONTAINER_MASK";
      NodeType2[NodeType2.ELEMENT = 2] = "ELEMENT";
      NodeType2[NodeType2.ELEMENT_CONTAINER = 3] = "ELEMENT_CONTAINER";
      NodeType2[NodeType2.ELEMENT_SHADOW_ROOT = 6] = "ELEMENT_SHADOW_ROOT";
      NodeType2[NodeType2.COMMENT_SKIP_START = 5] = "COMMENT_SKIP_START";
      NodeType2[NodeType2.COMMENT_SKIP_END = 8] = "COMMENT_SKIP_END";
      NodeType2[NodeType2.COMMENT_IGNORE_START = 16] = "COMMENT_IGNORE_START";
      NodeType2[NodeType2.COMMENT_IGNORE_END = 32] = "COMMENT_IGNORE_END";
      NodeType2[NodeType2.COMMENT_ISLAND_START = 65] = "COMMENT_ISLAND_START";
      NodeType2[NodeType2.COMMENT_ISLAND_END = 128] = "COMMENT_ISLAND_END";
      NodeType2[NodeType2.OTHER = 0] = "OTHER";
    })(NodeType || (NodeType = {}));
    const getFastNodeType = node => {
      const nodeType = getNodeType.call(node);
      if (1 === nodeType) {
        const qContainer = getAttribute.call(node, Q_CONTAINER);
        if (null === qContainer) {
          if (hasAttribute.call(node, Q_SHADOW_ROOT)) {
            return 6;
          }
          const isQElement = hasAttribute.call(node, Q_PROPS_SEPARATOR2);
          return isQElement ? 2 : 0;
        }
        return 3;
      }
      if (8 === nodeType) {
        const nodeValue = node.nodeValue || "";
        if (nodeValue.startsWith(Q_CONTAINER_ISLAND)) {
          return 65;
        }
        if (nodeValue.startsWith(Q_IGNORE)) {
          return 16;
        }
        if (nodeValue.startsWith(Q_CONTAINER)) {
          return 5;
        }
        if (nodeValue.startsWith(Q_CONTAINER_ISLAND_END)) {
          return 128;
        }
        if (nodeValue.startsWith(Q_IGNORE_END)) {
          return 32;
        }
        if (nodeValue.startsWith(Q_CONTAINER_END)) {
          return 8;
        }
      }
      return 0;
    };
    const isSeparator = ch => VNodeDataSeparator.ADVANCE_1 <= ch && ch <= VNodeDataSeparator.ADVANCE_8192;
    const findVDataSectionEnd = (vData, start, end) => {
      let depth = 0;
      while (true) {
        if (!(start < end)) {
          break;
        }
        {
          const ch = vData.charCodeAt(start);
          if (0 === depth && isSeparator(ch)) {
            break;
          }
          ch === VNodeDataChar.OPEN ? depth++ : ch === VNodeDataChar.CLOSE && depth--;
          start++;
        }
      }
      return start;
    };
    const nextSibling = node => {
      while (node && (node = node.nextSibling) && 0 === getFastNodeType(node)) {}
      return node;
    };
    const firstChild = node => {
      while (node && (node = node.firstChild) && 0 === getFastNodeType(node)) {}
      return node;
    };
    const walkContainer = (walker2, containerNode, node, exitNode, vData, qVNodeRefs, prefix) => {
      const vData_length = vData.length;
      let elementIdx = 0;
      let vNodeElementIndex = -1;
      let vData_start = 0;
      let vData_end = 0;
      let ch = 0;
      let needsToStoreRef = -1;
      let nextNode = null;
      const howManyElementsToSkip = () => {
        let elementsToSkip = 0;
        while (isSeparator(ch = vData.charCodeAt(vData_start))) {
          elementsToSkip += 1 << ch - VNodeDataSeparator.ADVANCE_1;
          vData_start++;
          if (vData_start >= vData_length) {
            break;
          }
        }
        return elementsToSkip;
      };
      do {
        if (node === exitNode) {
          return;
        }
        nextNode = null;
        const nodeType = node == containerNode ? 2 : getFastNodeType(node);
        if (3 === nodeType) {
          const container = node;
          let cursor = node;
          while (cursor && !(nextNode = nextSibling(cursor))) {
            cursor = cursor.parentNode;
          }
          walkContainer(walker2, container, node, nextNode, container.qVnodeData || "", container.qVNodeRefs, prefix + "  ");
        } else if (16 === nodeType) {
          let islandNode = node;
          do {
            islandNode = walker2.nextNode();
            if (!islandNode) {
              throw new Error(`Island inside \x3c!--${null == node ? void 0 : node.nodeValue}--\x3e not found!`);
            }
          } while (65 !== getFastNodeType(islandNode));
          nextNode = null;
        } else if (128 === nodeType) {
          nextNode = node;
          do {
            nextNode = walker2.nextNode();
            if (!nextNode) {
              throw new Error("Ignore block not closed!");
            }
          } while (32 !== getFastNodeType(nextNode));
          nextNode = null;
        } else if (5 === nodeType) {
          nextNode = node;
          do {
            nextNode = nextSibling(nextNode);
            if (!nextNode) {
              throw new Error(`\x3c!--${null == node ? void 0 : node.nodeValue}--\x3e not closed!`);
            }
          } while (8 !== getFastNodeType(nextNode));
          walkContainer(walker2, node, node, nextNode, "", null, prefix + "  ");
        } else if (6 === nodeType) {
          nextNode = nextSibling(node);
          const shadowRootContainer = node;
          const shadowRoot = null == shadowRootContainer ? void 0 : shadowRootContainer.shadowRoot;
          shadowRoot && walkContainer(document2.createTreeWalker(shadowRoot, 129), null, firstChild(shadowRoot), null, "", null, prefix + "  ");
        }
        if (2 === (2 & nodeType)) {
          if (vNodeElementIndex < elementIdx) {
            -1 === vNodeElementIndex && (vNodeElementIndex = 0);
            vData_start = vData_end;
            if (vData_start < vData_length) {
              vNodeElementIndex += howManyElementsToSkip();
              const shouldStoreRef = ch === VNodeDataSeparator.REFERENCE;
              if (shouldStoreRef) {
                needsToStoreRef = vNodeElementIndex;
                vData_start++;
                ch = vData_start < vData_length ? vData.charCodeAt(vData_end) : VNodeDataSeparator.ADVANCE_1;
              }
              vData_end = findVDataSectionEnd(vData, vData_start, vData_length);
            } else {
              vNodeElementIndex = Number.MAX_SAFE_INTEGER;
            }
          }
          if (elementIdx === vNodeElementIndex) {
            needsToStoreRef === elementIdx && qVNodeRefs.set(elementIdx, node);
            const instructions = vData.substring(vData_start, vData_end);
            vNodeDataMap.set(node, instructions);
          }
          elementIdx++;
        }
      } while (node = nextNode || walker2.nextNode());
    };
    const walker = document2.createTreeWalker(document2, 129);
    walkContainer(walker, null, walker.firstChild(), null, "", null, "");
  }
  function getDomContainer(element) {
    const qContainerElement = _getQContainerElement(element);
    qContainerElement || throwErrorAndStop("Unable to find q:container.");
    return getDomContainerFromQContainerElement(qContainerElement);
  }
  function getDomContainerFromQContainerElement(qContainerElement) {
    const qElement = qContainerElement;
    let container = qElement.qContainer;
    if (!container) {
      container = new DomContainer(qElement);
      const containerAttributes = {};
      if (qElement) {
        const attrs = qElement.attributes;
        if (attrs) {
          for (let index = 0; index < attrs.length; index++) {
            const attr = attrs[index];
            if (attr.name === Q_PROPS_SEPARATOR) {
              continue;
            }
            containerAttributes[attr.name] = attr.value;
          }
        }
      }
      container.$serverData$ = {
        containerAttributes: containerAttributes
      };
      qElement.qContainer = container;
    }
    return container;
  }
  function _getQContainerElement(element) {
    const qContainerElement = Array.isArray(element) ? vnode_getDomParent(element) : element;
    return qContainerElement.closest(QContainerSelector);
  }
  var isDomContainer = container => container instanceof DomContainer;
  var DomContainer = class extends _SharedContainer {
    constructor(element) {
      super((() => this.scheduleRender()), (() => vnode_applyJournal(this.$journal$)), {}, element.getAttribute("q:locale"));
      this.renderDone = null;
      this.$storeProxyMap$ = new WeakMap;
      this.$styleIds$ = null;
      this.$vnodeLocate$ = id => vnode_locate(this.rootVNode, id);
      this.$renderCount$ = 0;
      this.$getObjectById$ = id => {
        "string" === typeof id && (id = parseFloat(id));
        assertTrue(id < this.$rawStateData$.length / 2, `Invalid reference: ${id} >= ${this.$rawStateData$.length / 2}`);
        return this.stateData[id];
      };
      this.qContainer = element.getAttribute(QContainerAttr);
      this.qContainer || throwErrorAndStop("Element must have 'q:container' attribute.");
      this.$journal$ = [ 3, element.ownerDocument ];
      this.document = element.ownerDocument;
      this.element = element;
      this.qBase = element.getAttribute(QBaseAttr);
      this.$instanceHash$ = element.getAttribute(QInstanceAttr);
      this.qManifestHash = element.getAttribute("q:manifest-hash");
      this.rootVNode = vnode_newUnMaterializedElement(this.element);
      this.$rawStateData$ = null;
      this.stateData = null;
      const document2 = this.element.ownerDocument;
      document2.qVNodeData || processVNodeData(document2);
      this.$rawStateData$ = [];
      this.stateData = [];
      const qwikStates = element.querySelectorAll('script[type="qwik/state"]');
      if (0 !== qwikStates.length) {
        const lastState = qwikStates[qwikStates.length - 1];
        this.$rawStateData$ = JSON.parse(lastState.textContent);
        this.stateData = wrapDeserializerProxy(this, this.$rawStateData$);
      }
      this.$qFuncs$ = getQFuncs(document2, this.$instanceHash$) || EMPTY_ARRAY;
    }
    $setRawState$(id, vParent) {
      this.stateData[id] = vParent;
    }
    parseQRL(qrl) {
      return inflateQRL(this, parseQRL(qrl));
    }
    processJsx(host, jsx2) {
      const styleScopedId = this.getHostProp(host, QScopedStyle);
      return vnode_diff(this, jsx2, host, addComponentStylePrefix(styleScopedId));
    }
    handleError(err, host) {
      if (qDev) {
        if ("undefined" !== typeof document) {
          const vHost = host;
          const errorDiv = document.createElement("errored-host");
          err && err instanceof Error && (errorDiv.props = {
            error: err
          });
          errorDiv.setAttribute("q:key", "_error_");
          const journal = [];
          vnode_getDOMChildNodes(journal, vHost).forEach((child => errorDiv.appendChild(child)));
          const vErrorDiv = vnode_newElement(errorDiv, "error-host");
          vnode_insertBefore(journal, vHost, vErrorDiv, null);
          vnode_applyJournal(journal);
        }
        err && err instanceof Error && ("hostElement" in err || (err.hostElement = host));
        if (!isRecoverable(err)) {
          throw err;
        }
      }
      const errorStore = this.resolveContext(host, ERROR_CONTEXT);
      if (!errorStore) {
        throw err;
      }
      errorStore.error = err;
    }
    setContext(host, context, value) {
      let ctx = this.getHostProp(host, QCtxAttr);
      ctx || this.setHostProp(host, QCtxAttr, ctx = []);
      mapArray_set(ctx, context.id, value, 0);
    }
    resolveContext(host, contextId) {
      while (host) {
        const ctx = this.getHostProp(host, QCtxAttr);
        if (ctx) {
          const value = mapArray_get(ctx, contextId.id, 0);
          if (value) {
            return value;
          }
        }
        host = this.getParentHost(host);
      }
      return;
    }
    getParentHost(host) {
      let vNode = vnode_getParent(host);
      while (vNode) {
        if (vnode_isVirtualVNode(vNode)) {
          if (null !== vnode_getProp(vNode, OnRenderProp, null)) {
            return vNode;
          }
          const parent = vnode_getProp(vNode, QSlotParent, this.$vnodeLocate$);
          if (parent) {
            vNode = parent;
            continue;
          }
        }
        vNode = vnode_getParent(vNode);
      }
      return null;
    }
    setHostProp(host, name, value) {
      const vNode = host;
      vnode_setProp(vNode, name, value);
    }
    getHostProp(host, name) {
      const vNode = host;
      let getObjectById = null;
      switch (name) {
       case ELEMENT_SEQ:
       case ELEMENT_PROPS:
       case OnRenderProp:
       case QCtxAttr:
       case QSubscribers:
        getObjectById = this.$getObjectById$;
        break;

       case ELEMENT_SEQ_IDX:
       case USE_ON_LOCAL_SEQ_IDX:
        getObjectById = parseInt;
        break;
      }
      return vnode_getProp(vNode, name, getObjectById);
    }
    scheduleRender() {
      this.$renderCount$++;
      this.renderDone ||= getPlatform().nextTick((() => this.processChores()));
      return this.renderDone;
    }
    processChores() {
      let renderCount = this.$renderCount$;
      const result = this.$scheduler$(127);
      if (isPromise(result)) {
        return result.then((async () => {
          while (renderCount !== this.$renderCount$) {
            renderCount = this.$renderCount$;
            await this.$scheduler$(127);
          }
          this.renderDone = null;
        }));
      }
      if (renderCount !== this.$renderCount$) {
        this.processChores();
        return;
      }
      this.renderDone = null;
    }
    ensureProjectionResolved(vNode) {
      if (0 === (16 & vNode[0])) {
        vNode[0] |= 16;
        for (let i = vnode_getPropStartIndex(vNode); i < vNode.length; i += 2) {
          const prop = vNode[i];
          if (isSlotProp(prop)) {
            const value = vNode[i + 1];
            "string" == typeof value && (vNode[i + 1] = this.$vnodeLocate$(value));
          }
        }
      }
    }
    getSyncFn(id) {
      const fn = this.$qFuncs$[id];
      assertTrue("function" === typeof fn, "Invalid reference: " + id);
      return fn;
    }
    $appendStyle$(content, styleId, host, scoped) {
      if (scoped) {
        const scopedStyleIdsString = this.getHostProp(host, QScopedStyle);
        const scopedStyleIds = new Set(convertScopedStyleIdsToArray(scopedStyleIdsString));
        scopedStyleIds.add(styleId);
        this.setHostProp(host, QScopedStyle, convertStyleIdsToString(scopedStyleIds));
      }
      if (null == this.$styleIds$) {
        this.$styleIds$ = new Set;
        this.element.querySelectorAll(QStyleSelector).forEach((style => {
          this.$styleIds$.add(style.getAttribute(QStyle));
        }));
      }
      if (!this.$styleIds$.has(styleId)) {
        this.$styleIds$.add(styleId);
        const styleElement = this.document.createElement("style");
        styleElement.setAttribute(QStyle, styleId);
        styleElement.textContent = content;
        this.$journal$.push(5, this.document.head, null, styleElement);
      }
    }
  };
  var deserializedProxyMap = new WeakMap;
  var unwrapDeserializerProxy = value => {
    const unwrapped = "object" === typeof value && null !== value && value[SERIALIZER_PROXY_UNWRAP];
    return unwrapped || value;
  };
  var isDeserializerProxy = value => "object" === typeof value && null !== value && SERIALIZER_PROXY_UNWRAP in value;
  var SERIALIZER_PROXY_UNWRAP = Symbol("UNWRAP");
  var wrapDeserializerProxy = (container, data) => {
    if (!Array.isArray(data) || vnode_isVNode(data) || isDeserializerProxy(data)) {
      return data;
    }
    let proxy = deserializedProxyMap.get(data);
    if (!proxy) {
      const target = Array(data.length / 2).fill(void 0);
      proxy = new Proxy(target, new DeserializationHandler(container, data));
      deserializedProxyMap.set(data, proxy);
    }
    return proxy;
  };
  var DeserializationHandler = class {
    constructor($container$, $data$) {
      this.$container$ = $container$;
      this.$data$ = $data$;
      this.$length$ = this.$data$.length / 2;
    }
    get(target, property, receiver) {
      if (property === SERIALIZER_PROXY_UNWRAP) {
        return target;
      }
      const i = "number" === typeof property ? property : "string" === typeof property ? parseInt(property, 10) : NaN;
      if (Number.isNaN(i) || i < 0 || i >= this.$length$) {
        const out = Reflect.get(target, property, receiver);
        return out;
      }
      const idx = 2 * i;
      const typeId = this.$data$[idx];
      const value = this.$data$[idx + 1];
      if (void 0 === typeId) {
        return value;
      }
      const container = this.$container$;
      const propValue = allocate(container, typeId, value);
      Reflect.set(target, property, propValue);
      this.$data$[idx] = void 0;
      this.$data$[idx + 1] = propValue;
      typeId >= 12 && inflate(container, propValue, typeId, value);
      return propValue;
    }
    has(target, property) {
      if (property === SERIALIZER_PROXY_UNWRAP) {
        return true;
      }
      return Object.prototype.hasOwnProperty.call(target, property);
    }
    set(target, property, value, receiver) {
      if (property === SERIALIZER_PROXY_UNWRAP) {
        return false;
      }
      const out = Reflect.set(target, property, value, receiver);
      const i = "number" === typeof property ? property : parseInt(property, 10);
      if (Number.isNaN(i) || i < 0 || i >= this.$data$.length / 2) {
        return out;
      }
      const idx = 2 * i;
      this.$data$[idx] = void 0;
      this.$data$[idx + 1] = value;
      return true;
    }
  };
  var _eagerDeserializeArray = (container, data) => {
    const out = Array(data.length / 2);
    for (let i = 0; i < data.length; i += 2) {
      out[i / 2] = deserializeData(container, data[i], data[i + 1]);
    }
    return out;
  };
  var resolvers = new WeakMap;
  var inflate = (container, target, typeId, data) => {
    if (void 0 === typeId) {
      return;
    }
    13 !== typeId && Array.isArray(data) && (data = _eagerDeserializeArray(container, data));
    switch (typeId) {
     case 13:
      for (let i2 = 0; i2 < data.length; i2 += 4) {
        const key = deserializeData(container, data[i2], data[i2 + 1]);
        const valType = data[i2 + 2];
        const valData = data[i2 + 3];
        0 === valType || valType >= 12 ? Object.defineProperty(target, key, {
          get: () => deserializeData(container, valType, valData),
          set(value) {
            Object.defineProperty(target, key, {
              value: value,
              writable: true,
              enumerable: true,
              configurable: true
            });
          },
          enumerable: true,
          configurable: true
        }) : target[key] = deserializeData(container, valType, valData);
      }
      break;

     case 18:
      inflateQRL(container, target);
      break;

     case 19:
      const task = target;
      const v = data;
      task.$qrl$ = inflateQRL(container, v[0]);
      task.$flags$ = v[1];
      task.$index$ = v[2];
      task.$el$ = v[3];
      task.$effectDependencies$ = v[4];
      task.$state$ = v[5];
      break;

     case 20:
      const [resolved, result, effects] = data;
      const resource = target;
      if (resolved) {
        resource.value = Promise.resolve(result);
        resource._resolved = result;
        resource._state = "resolved";
      } else {
        resource.value = Promise.reject(result);
        resource._error = result;
        resource._state = "rejected";
      }
      getStoreHandler(target).$effects$ = effects;
      break;

     case 21:
      target[SERIALIZABLE_STATE][0] = data[0];
      break;

     case 25:
     case 26:
      {
        const [value, flags, effects2, storeEffect] = data;
        const handler = getStoreHandler(target);
        handler.$flags$ = flags;
        Object.assign(getStoreTarget(target), value);
        storeEffect && (effects2[STORE_ARRAY_PROP] = storeEffect);
        handler.$effects$ = effects2;
        container.$storeProxyMap$.set(value, target);
        break;
      }

     case 22:
      {
        const signal = target;
        const d = data;
        signal.$untrackedValue$ = d[0];
        signal.$effects$ = d.slice(1);
        break;
      }

     case 23:
      {
        const signal = target;
        const d = data;
        signal.$func$ = container.getSyncFn(d[0]);
        signal.$args$ = d[1];
        signal.$effectDependencies$ = d[2];
        signal.$untrackedValue$ = d[3];
        signal.$effects$ = d.slice(4);
        break;
      }

     case 24:
      {
        const computed = target;
        const d = data;
        computed.$computeQrl$ = d[0];
        computed.$untrackedValue$ = d[1];
        computed.$invalid$ = d[2];
        computed.$effects$ = d.slice(3);
        break;
      }

     case 12:
      {
        const d = data;
        target.message = d[0];
        const second = d[1];
        if (second && Array.isArray(second)) {
          for (let i2 = 0; i2 < second.length; i2++) {
            target[second[i2++]] = d[i2];
          }
          target.stack = d[2];
        } else {
          target.stack = second;
        }
        break;
      }

     case 27:
      {
        const formData = target;
        const d = data;
        for (let i2 = 0; i2 < d.length; i2++) {
          formData.append(d[i2++], d[i2]);
        }
        break;
      }

     case 28:
      {
        const jsx2 = target;
        const [type, varProps, constProps, children, flags, key] = data;
        jsx2.type = type;
        jsx2.varProps = varProps;
        jsx2.constProps = constProps;
        jsx2.children = children;
        jsx2.flags = flags;
        jsx2.key = key;
        break;
      }

     case 15:
      {
        const set = target;
        const d = data;
        for (let i2 = 0; i2 < d.length; i2++) {
          set.add(d[i2]);
        }
        break;
      }

     case 16:
      {
        const map = target;
        const d = data;
        for (let i2 = 0; i2 < d.length; i2++) {
          map.set(d[i2++], d[i2]);
        }
        break;
      }

     case 14:
      {
        const promise = target;
        const [resolved2, result2] = data;
        const [resolve, reject] = resolvers.get(promise);
        resolved2 ? resolve(result2) : reject(result2);
        break;
      }

     case 17:
      const bytes = target;
      const buf = atob(data);
      let i = 0;
      for (const s of buf) {
        bytes[i++] = s.charCodeAt(0);
      }
      break;

     case 29:
      const propsProxy = target;
      propsProxy[_VAR_PROPS] = data[0];
      propsProxy[_CONST_PROPS] = data[1];
      break;

     case 30:
      {
        const effectData = target;
        effectData.data = data[0];
        break;
      }

     default:
      return throwErrorAndStop("Not implemented");
    }
  };
  var _constants = [ void 0, null, true, false, "", EMPTY_ARRAY, EMPTY_OBJ, NEEDS_COMPUTATION, Slot, Fragment, NaN, 1 / 0, -1 / 0, Number.MAX_SAFE_INTEGER, Number.MAX_SAFE_INTEGER - 1, Number.MIN_SAFE_INTEGER ];
  var allocate = (container, typeId, value) => {
    if (void 0 === value) {
      return typeId;
    }
    switch (typeId) {
     case 0:
      return container.$getObjectById$(value);

     case 1:
      return _constants[value];

     case 2:
      return value;

     case 4:
      return wrapDeserializerProxy(container, value);

     case 13:
      return {};

     case 18:
      return parseQRL(value);

     case 19:
      return new Task(-1, -1, null, null, null, null);

     case 20:
      {
        const res = createResourceReturn(container, void 0, void 0);
        res.loading = false;
        return res;
      }

     case 5:
      return new URL(value);

     case 6:
      return new Date(value);

     case 7:
      const idx = value.lastIndexOf("/");
      return new RegExp(value.slice(1, idx), value.slice(idx + 1));

     case 12:
      return new Error;

     case 21:
      return componentQrl(null);

     case 22:
      return new Signal(container, 0);

     case 23:
      return new WrappedSignal(container, null, null, null);

     case 24:
      return new ComputedSignal(container, null);

     case 25:
      return createStore(container, {}, 0);

     case 26:
      return createStore(container, [], 0);

     case 11:
      return new URLSearchParams(value);

     case 27:
      return new FormData;

     case 28:
      return new JSXNodeImpl(null, null, null, null, -1, null);

     case 10:
      return BigInt(value);

     case 15:
      return new Set;

     case 16:
      return new Map;

     case 3:
      return value;

     case 14:
      let resolve;
      let reject;
      const promise = new Promise(((res, rej) => {
        resolve = res;
        reject = rej;
      }));
      resolvers.set(promise, [ resolve, reject ]);
      return promise;

     case 17:
      const encodedLength = value.length;
      const blocks = encodedLength >>> 2;
      const rest = 3 & encodedLength;
      const decodedLength = 3 * blocks + (rest ? rest - 1 : 0);
      return new Uint8Array(decodedLength);

     case 29:
      return createPropsProxy(null, null);

     case 8:
      return retrieveVNodeOrDocument(container, value);

     case 9:
      const vNode = retrieveVNodeOrDocument(container, value);
      return vnode_isVNode(vNode) ? vnode_getNode(vNode) : throwErrorAndStop("expected vnode for ref prop, but got " + typeof vNode);

     case 30:
      return new EffectData(null);

     default:
      return throwErrorAndStop("unknown allocate type: " + typeId);
    }
  };
  function retrieveVNodeOrDocument(container, value) {
    var _a;
    return value ? container.rootVNode ? vnode_locate(container.rootVNode, value) : void 0 : null == (_a = container.element) ? void 0 : _a.ownerDocument;
  }
  function parseQRL(qrl) {
    const hashIdx = qrl.indexOf("#");
    const captureStart = qrl.indexOf("[", hashIdx);
    const captureEnd = qrl.indexOf("]", captureStart);
    const chunk = hashIdx > -1 ? qrl.slice(0, hashIdx) : qrl.slice(0, captureStart);
    const symbol = captureStart > -1 ? qrl.slice(hashIdx + 1, captureStart) : qrl.slice(hashIdx + 1);
    const captureIds = captureStart > -1 && captureEnd > -1 ? qrl.slice(captureStart + 1, captureEnd).split(" ").filter((v => v.length)).map((s => parseInt(s, 10))) : null;
    let qrlRef = null;
    if (isDev2 && chunk === QRL_RUNTIME_CHUNK) {
      const backChannel = globalThis[QRL_RUNTIME_CHUNK];
      assertDefined(backChannel, "Missing QRL_RUNTIME_CHUNK");
      qrlRef = backChannel.get(symbol);
    }
    return createQRL(chunk, symbol, qrlRef, null, captureIds, null, null);
  }
  function inflateQRL(container, qrl) {
    const captureIds = qrl.$capture$;
    qrl.$captureRef$ = captureIds ? captureIds.map((id => container.$getObjectById$(id))) : null;
    container.element && qrl.$setContainer$(container.element);
    return qrl;
  }
  var DomVRef = class {
    constructor(id) {
      this.id = id;
    }
  };
  var createSerializationContext = (NodeConstructor, symbolToChunkResolver, getProp, setProp, storeProxyMap, writer) => {
    if (!writer) {
      const buffer = [];
      writer = {
        write: text => buffer.push(text),
        toString: () => buffer.join("")
      };
    }
    const map = new Map;
    const syncFnMap = new Map;
    const syncFns = [];
    const roots = [];
    const $wasSeen$ = obj => map.get(obj);
    const $seen$ = obj => map.set(obj, -1);
    const $addRoot$ = obj => {
      let id = map.get(obj);
      if ("number" !== typeof id || -1 === id) {
        id = roots.length;
        map.set(obj, id);
        roots.push(obj);
      }
      return id;
    };
    const isSsrNode = NodeConstructor ? obj => obj instanceof NodeConstructor : () => false;
    return {
      $serialize$() {
        serialize(this);
      },
      $isSsrNode$: isSsrNode,
      $symbolToChunkResolver$: symbolToChunkResolver,
      $wasSeen$: $wasSeen$,
      $roots$: roots,
      $seen$: $seen$,
      $hasRootId$: obj => {
        const id = map.get(obj);
        return void 0 === id || -1 === id ? void 0 : id;
      },
      $addRoot$: $addRoot$,
      $getRootId$: obj => {
        const id = map.get(obj);
        if (!id || -1 === id) {
          return throwErrorAndStop("Missing root id for: " + obj);
        }
        return id;
      },
      $syncFns$: syncFns,
      $addSyncFn$: (funcStr, argCount, fn) => {
        const isFullFn = null == funcStr;
        isFullFn && (funcStr = fn.serialized || fn.toString());
        let id = syncFnMap.get(funcStr);
        if (void 0 === id) {
          id = syncFns.length;
          syncFnMap.set(funcStr, id);
          if (isFullFn) {
            syncFns.push(funcStr);
          } else {
            let code = "(";
            for (let i = 0; i < argCount; i++) {
              code += (0 == i ? "p" : ",p") + i;
            }
            syncFns.push(code += ")=>" + funcStr);
          }
        }
        return id;
      },
      $writer$: writer,
      $breakCircularDepsAndAwaitPromises$: breakCircularDependenciesAndResolvePromises,
      $eventQrls$: new Set,
      $eventNames$: new Set,
      $resources$: new Set,
      $renderSymbols$: new Set,
      $storeProxyMap$: storeProxyMap,
      $getProp$: getProp,
      $setProp$: setProp
    };
    async function breakCircularDependenciesAndResolvePromises() {
      const discoveredValues = [];
      const promises = [];
      const visit = obj => {
        if ("function" === typeof obj) {
          if (isQrl2(obj)) {
            obj.$captureRef$ && discoveredValues.push(...obj.$captureRef$);
          } else if (isQwikComponent(obj)) {
            const [qrl] = obj[SERIALIZABLE_STATE];
            discoveredValues.push(qrl);
          }
        } else if ("object" !== typeof obj || null === obj || obj instanceof URL || obj instanceof Date || obj instanceof RegExp || obj instanceof Uint8Array || obj instanceof URLSearchParams || "undefined" !== typeof FormData && obj instanceof FormData || fastSkipSerialize(obj)) {} else if (obj instanceof Error) {
          discoveredValues.push(...Object.values(obj));
        } else if (isStore(obj)) {
          const target = getStoreTarget(obj);
          const effects = getStoreHandler(obj).$effects$;
          discoveredValues.push(target, effects);
          for (const prop in target) {
            const propValue = target[prop];
            storeProxyMap.has(propValue) && discoveredValues.push(prop, storeProxyMap.get(propValue));
          }
        } else if (obj instanceof Set) {
          discoveredValues.push(...obj.values());
        } else if (obj instanceof Map) {
          obj.forEach(((v, k) => {
            discoveredValues.push(k, v);
          }));
        } else if (obj instanceof Signal) {
          const v = obj instanceof WrappedSignal ? obj.untrackedValue : obj instanceof ComputedSignal && (obj.$invalid$ || fastSkipSerialize(obj)) ? NEEDS_COMPUTATION : obj.$untrackedValue$;
          v === NEEDS_COMPUTATION || isSsrNode(v) || discoveredValues.push(obj.$untrackedValue$);
          obj.$effects$ && discoveredValues.push(...obj.$effects$);
          obj instanceof WrappedSignal ? obj.$effectDependencies$ && discoveredValues.push(...obj.$effectDependencies$) : obj instanceof ComputedSignal && discoveredValues.push(obj.$computeQrl$);
        } else if (obj instanceof Task) {
          discoveredValues.push(obj.$el$, obj.$qrl$, obj.$state$, obj.$effectDependencies$);
        } else if (isSsrNode(obj)) {} else if (isJSXNode(obj)) {
          discoveredValues.push(obj.type, obj.props, obj.constProps, obj.children);
        } else if (Array.isArray(obj)) {
          discoveredValues.push(...obj);
        } else if (isQrl2(obj)) {
          obj.$captureRef$ && obj.$captureRef$.length && discoveredValues.push(...obj.$captureRef$);
        } else if (isPropsProxy(obj)) {
          discoveredValues.push(obj[_VAR_PROPS], obj[_CONST_PROPS]);
        } else if (isPromise(obj)) {
          obj.then((value => {
            promiseResults.set(obj, [ true, value ]);
            discoveredValues.push(value);
          }), (error => {
            promiseResults.set(obj, [ false, error ]);
            discoveredValues.push(error);
          }));
          promises.push(obj);
        } else if (obj instanceof EffectData) {
          discoveredValues.push(obj.data);
        } else {
          if (!isObjectLiteral(obj)) {
            return throwErrorAndStop("Unknown type: " + obj);
          }
          Object.entries(obj).forEach((([key, value]) => {
            discoveredValues.push(key, value);
          }));
        }
      };
      for (const root of roots) {
        visit(root);
      }
      do {
        while (discoveredValues.length) {
          const obj = discoveredValues.pop();
          if (!(shouldTrackObj(obj) || frameworkType(obj))) {
            continue;
          }
          const id = $wasSeen$(obj);
          if (void 0 === id) {
            $seen$(obj);
            visit(obj);
          } else {
            -1 === id && $addRoot$(obj);
          }
        }
        await Promise.allSettled(promises);
        promises.length = 0;
      } while (discoveredValues.length);
    }
  };
  var promiseResults = new WeakMap;
  function serialize(serializationContext) {
    const {$writer$: $writer$, $isSsrNode$: $isSsrNode$, $setProp$: $setProp$, $storeProxyMap$: $storeProxyMap$} = serializationContext;
    let depth = -1;
    let writeType = false;
    const output = (type, value) => {
      writeType ? $writer$.write(`${type},`) : writeType = true;
      if ("number" === typeof value) {
        $writer$.write(value.toString());
      } else if ("string" === typeof value) {
        const s = JSON.stringify(value);
        let angleBracketIdx = -1;
        let lastIdx = 0;
        while (-1 !== (angleBracketIdx = s.indexOf("</", lastIdx))) {
          $writer$.write(s.slice(lastIdx, angleBracketIdx));
          $writer$.write("<\\/");
          lastIdx = angleBracketIdx + 2;
        }
        $writer$.write(0 === lastIdx ? s : s.slice(lastIdx));
      } else {
        depth++;
        $writer$.write("[");
        let separator = false;
        for (let i = 0; i < value.length; i++) {
          separator ? $writer$.write(",") : separator = true;
          writeValue(value[i], i);
        }
        $writer$.write("]");
        depth--;
      }
    };
    const writeValue = (value, idx) => {
      if (fastSkipSerialize(value)) {
        output(1, 0);
      } else if ("bigint" === typeof value) {
        output(10, value.toString());
      } else if ("boolean" === typeof value) {
        output(1, value ? 2 : 3);
      } else if ("function" === typeof value) {
        if (value === Slot) {
          output(1, 8);
        } else if (value === Fragment) {
          output(1, 9);
        } else if (isQrl2(value)) {
          output(18, qrlToString(serializationContext, value));
        } else if (isQwikComponent(value)) {
          const [qrl] = value[SERIALIZABLE_STATE];
          serializationContext.$renderSymbols$.add(qrl.$symbol$);
          output(21, [ qrl ]);
        } else {
          console.error("Cannot serialize function (ignoring for now): " + value.toString());
          output(1, 0);
        }
      } else if ("number" === typeof value) {
        Number.isNaN(value) ? output(1, 10) : Number.isFinite(value) ? value === Number.MAX_SAFE_INTEGER ? output(1, 13) : value === Number.MAX_SAFE_INTEGER - 1 ? output(1, 14) : value === Number.MIN_SAFE_INTEGER ? output(1, 15) : output(2, value) : output(1, value < 0 ? 12 : 11);
      } else if ("object" === typeof value) {
        if (value === EMPTY_ARRAY) {
          output(1, 5);
        } else if (value === EMPTY_OBJ) {
          output(1, 6);
        } else {
          depth++;
          null === value ? output(1, 1) : writeObjectValue(value, idx);
          depth--;
        }
      } else if ("string" === typeof value) {
        if (0 === value.length) {
          output(1, 4);
        } else {
          const seen = depth > 1 && serializationContext.$wasSeen$(value);
          "number" === typeof seen && seen >= 0 ? output(0, seen) : output(3, value);
        }
      } else {
        "undefined" === typeof value ? output(1, 0) : value === NEEDS_COMPUTATION ? output(1, 7) : throwErrorAndStop("Unknown type: " + typeof value);
      }
    };
    const writeObjectValue = (value, idx) => {
      const isRootObject = 2 === depth;
      if (depth > 2) {
        const seen = serializationContext.$wasSeen$(value);
        if ("number" === typeof seen && seen >= 0) {
          output(0, seen);
          return;
        }
      }
      if (isPropsProxy(value)) {
        const varProps = value[_VAR_PROPS];
        const constProps = value[_CONST_PROPS];
        output(29, [ varProps, constProps ]);
      } else if (value instanceof EffectData) {
        output(30, [ value.data ]);
      } else if (isStore(value)) {
        if (isResource(value)) {
          serializationContext.$resources$.add(value);
          const res = promiseResults.get(value.value);
          if (!res) {
            return throwErrorAndStop("Unvisited Resource");
          }
          output(20, [ ...res, getStoreHandler(value).$effects$ ]);
        } else {
          const storeHandler = getStoreHandler(value);
          const storeTarget = getStoreTarget(value);
          const flags = storeHandler.$flags$;
          const effects = storeHandler.$effects$;
          const storeEffect = (null == effects ? void 0 : effects[STORE_ARRAY_PROP]) ?? null;
          const innerStores = [];
          for (const prop in storeTarget) {
            const propValue = storeTarget[prop];
            if ($storeProxyMap$.has(propValue)) {
              const innerStore = $storeProxyMap$.get(propValue);
              innerStores.push(innerStore);
              serializationContext.$addRoot$(innerStore);
            }
          }
          const out = [ storeTarget, flags, effects, storeEffect, ...innerStores ];
          while (null == out[out.length - 1]) {
            out.pop();
          }
          output(Array.isArray(storeTarget) ? 26 : 25, out);
        }
      } else if (isObjectLiteral(value)) {
        if (Array.isArray(value)) {
          output(4, value);
        } else {
          const out = [];
          for (const key in value) {
            Object.prototype.hasOwnProperty.call(value, key) && !fastSkipSerialize(value[key]) && out.push(key, value[key]);
          }
          output(13, out);
        }
      } else if (value instanceof DomVRef) {
        output(9, value.id);
      } else if (value instanceof Signal) {
        let v = value instanceof ComputedSignal && (value.$invalid$ || fastSkipSerialize(value.$untrackedValue$)) ? NEEDS_COMPUTATION : value.$untrackedValue$;
        $isSsrNode$(v) && (v = new DomVRef(v.id));
        value instanceof WrappedSignal ? output(23, [ ...serializeWrappingFn(serializationContext, value), value.$effectDependencies$, v, ...value.$effects$ || [] ]) : value instanceof ComputedSignal ? output(24, [ value.$computeQrl$, v, v === NEEDS_COMPUTATION, ...value.$effects$ || [] ]) : output(22, [ v, ...value.$effects$ || [] ]);
      } else if (value instanceof URL) {
        output(5, value.href);
      } else if (value instanceof Date) {
        output(6, Number.isNaN(value.valueOf()) ? "" : value.valueOf());
      } else if (value instanceof RegExp) {
        output(7, value.toString());
      } else if (value instanceof Error) {
        const out = [ value.message ];
        const extraProps = Object.entries(value).flat();
        extraProps.length && out.push(extraProps);
        isDev2 && out.push(value.stack);
        output(12, out);
      } else if ($isSsrNode$(value)) {
        if (isRootObject) {
          $setProp$(value, ELEMENT_ID, String(idx));
          output(8, value.id);
        } else {
          serializationContext.$addRoot$(value);
          output(0, serializationContext.$roots$.length - 1);
        }
      } else if ("undefined" !== typeof FormData && value instanceof FormData) {
        const array = [];
        value.forEach(((value2, key) => {
          "string" === typeof value2 ? array.push(key, value2) : array.push(key, value2.name);
        }));
        output(27, array);
      } else if (value instanceof URLSearchParams) {
        output(11, value.toString());
      } else if (value instanceof Set) {
        output(15, [ ...value.values() ]);
      } else if (value instanceof Map) {
        const combined = [];
        for (const [k, v] of value.entries()) {
          combined.push(k, v);
        }
        output(16, combined);
      } else if (isJSXNode(value)) {
        output(28, [ value.type, value.varProps, value.constProps, value.children, value.flags, value.key ]);
      } else if (value instanceof Task) {
        const out = [ value.$qrl$, value.$flags$, value.$index$, value.$el$, value.$effectDependencies$, value.$state$ ];
        while (null == out[out.length - 1]) {
          out.pop();
        }
        output(19, out);
      } else if (isPromise(value)) {
        const res = promiseResults.get(value);
        if (!res) {
          return throwErrorAndStop("Unvisited Promise");
        }
        output(14, res);
      } else {
        if (!(value instanceof Uint8Array)) {
          return throwErrorAndStop("implement");
        }
        {
          let buf = "";
          for (const c of value) {
            buf += String.fromCharCode(c);
          }
          const out = btoa(buf).replace(/=+$/, "");
          output(17, out);
        }
      }
    };
    writeValue(serializationContext.$roots$, -1);
  }
  function serializeWrappingFn(serializationContext, value) {
    value.$funcStr$ && "{" === value.$funcStr$[0] && (value.$funcStr$ = `(${value.$funcStr$})`);
    const syncFnId = serializationContext.$addSyncFn$(value.$funcStr$, value.$args$.length, value.$func$);
    return [ syncFnId, value.$args$ ];
  }
  function qrlToString(serializationContext, value) {
    var _a;
    let symbol = value.$symbol$;
    let chunk = value.$chunk$;
    const refSymbol = value.$refSymbol$ ?? symbol;
    const platform = getPlatform();
    if (platform) {
      const result = platform.chunkForSymbol(refSymbol, chunk, null == (_a = value.dev) ? void 0 : _a.file);
      if (result) {
        chunk = result[1];
        value.$refSymbol$ || (symbol = result[0]);
      }
    }
    const isSync = isSyncQrl(value);
    if (isSync) {
      const fn = value.resolved;
      chunk = "";
      symbol = String(serializationContext.$addSyncFn$(null, 0, fn));
    } else {
      chunk || (chunk = serializationContext.$symbolToChunkResolver$(value.$hash$));
      if (isDev2) {
        let backChannel = globalThis[QRL_RUNTIME_CHUNK];
        backChannel || (backChannel = globalThis[QRL_RUNTIME_CHUNK] = new Map);
        backChannel.set(value.$symbol$, value._devOnlySymbolRef);
        chunk || (chunk = QRL_RUNTIME_CHUNK);
      }
      chunk || throwErrorAndStop("Missing chunk for: " + value.$symbol$);
      chunk.startsWith("./") && (chunk = chunk.slice(2));
    }
    let qrlStringInline = `${chunk}#${symbol}`;
    if (Array.isArray(value.$captureRef$) && value.$captureRef$.length > 0) {
      let serializedReferences = "";
      for (let i = 0; i < value.$captureRef$.length; i++) {
        i > 0 && (serializedReferences += " ");
        serializedReferences += serializationContext.$addRoot$(value.$captureRef$[i]);
      }
      qrlStringInline += `[${serializedReferences}]`;
    } else {
      value.$capture$ && value.$capture$.length > 0 && (qrlStringInline += `[${value.$capture$.join(" ")}]`);
    }
    return qrlStringInline;
  }
  function deserializeData(container, typeId, propValue) {
    if (void 0 === typeId) {
      return propValue;
    }
    const value = allocate(container, typeId, propValue);
    typeId >= 12 && inflate(container, value, typeId, propValue);
    return value;
  }
  function shouldTrackObj(obj) {
    return "object" === typeof obj && null !== obj || "string" === typeof obj && obj.length > 1;
  }
  function isObjectLiteral(obj) {
    const prototype = Object.getPrototypeOf(obj);
    return null == prototype || prototype === Object.prototype || prototype === Array.prototype;
  }
  function isResource(value) {
    return "__brand" in value && "resource" === value.__brand;
  }
  var frameworkType = obj => "object" === typeof obj && null !== obj && (obj instanceof Signal || obj instanceof Task || isJSXNode(obj)) || isQrl2(obj);
  var canSerialize = value => {
    if (null == value || "string" === typeof value || "number" === typeof value || "boolean" === typeof value || "bigint" === typeof value) {
      return true;
    }
    if ("object" === typeof value) {
      const proto = Object.getPrototypeOf(value);
      isStore(value) && (value = getStoreTarget(value));
      if (proto == Object.prototype) {
        for (const key in value) {
          if (!canSerialize(value[key])) {
            return false;
          }
        }
        return true;
      }
      if (proto == Array.prototype) {
        for (let i = 0; i < value.length; i++) {
          if (!canSerialize(value[i])) {
            return false;
          }
        }
        return true;
      }
      if (isTask(value)) {
        return true;
      }
      if (isPropsProxy(value)) {
        return true;
      }
      if (isPromise(value)) {
        return true;
      }
      if (isJSXNode(value)) {
        return true;
      }
      if (value instanceof Error) {
        return true;
      }
      if (value instanceof URL) {
        return true;
      }
      if (value instanceof Date) {
        return true;
      }
      if (value instanceof RegExp) {
        return true;
      }
      if (value instanceof URLSearchParams) {
        return true;
      }
      if (value instanceof FormData) {
        return true;
      }
      if (value instanceof Set) {
        return true;
      }
      if (value instanceof Map) {
        return true;
      }
      if (value instanceof Uint8Array) {
        return true;
      }
    } else if ("function" === typeof value && (isQrl2(value) || isQwikComponent(value))) {
      return true;
    }
    return false;
  };
  var QRL_RUNTIME_CHUNK = "mock-chunk";
  var verifySerializable = (value, preMessage) => {
    const seen = new Set;
    return _verifySerializable(value, seen, "_", preMessage);
  };
  var _verifySerializable = (value, seen, ctx, preMessage) => {
    const unwrapped = unwrapStore(value);
    if (null == unwrapped) {
      return value;
    }
    if (shouldSerialize(unwrapped)) {
      if (seen.has(unwrapped)) {
        return value;
      }
      seen.add(unwrapped);
      if (isSignal(unwrapped)) {
        return value;
      }
      if (canSerialize(unwrapped)) {
        return value;
      }
      const typeObj = typeof unwrapped;
      switch (typeObj) {
       case "object":
        if (isPromise(unwrapped)) {
          return value;
        }
        if (isNode(unwrapped)) {
          return value;
        }
        if (isArray(unwrapped)) {
          let expectIndex = 0;
          unwrapped.forEach(((v, i) => {
            if (i !== expectIndex) {
              throw qError(QError_verifySerializable, unwrapped);
            }
            _verifySerializable(v, seen, ctx + "[" + i + "]");
            expectIndex = i + 1;
          }));
          return value;
        }
        if (isSerializableObject(unwrapped)) {
          for (const [key, item] of Object.entries(unwrapped)) {
            _verifySerializable(item, seen, ctx + "." + key);
          }
          return value;
        }
        break;

       case "boolean":
       case "string":
       case "number":
        return value;
      }
      let message = "";
      message = preMessage || "Value cannot be serialized";
      "_" !== ctx && (message += ` in ${ctx},`);
      if ("object" === typeObj) {
        message += ` because it's an instance of "${null == value ? void 0 : value.constructor.name}". You might need to use 'noSerialize()' or use an object literal instead. Check out https://qwik.dev/docs/advanced/dollar/`;
      } else if ("function" === typeObj) {
        const fnName = value.name;
        message += ` because it's a function named "${fnName}". You might need to convert it to a QRL using $(fn):\n\nconst ${fnName} = $(${String(value)});\n\nPlease check out https://qwik.dev/docs/advanced/qrl/ for more information.`;
      }
      console.error("Trying to serialize", value);
      throwErrorAndStop(message);
    }
    return value;
  };
  var noSerializeSet = new WeakSet;
  var shouldSerialize = obj => {
    if (isObject(obj) || isFunction(obj)) {
      return !noSerializeSet.has(obj);
    }
    return true;
  };
  var fastSkipSerialize = obj => noSerializeSet.has(obj);
  var noSerialize = input => {
    null != input && noSerializeSet.add(input);
    return input;
  };
  var isQrl2 = value => "function" === typeof value && "function" === typeof value.getSymbol;
  var SYNC_QRL = "<sync>";
  var isSyncQrl = value => isQrl2(value) && value.$symbol$ == SYNC_QRL;
  var createQRL = (chunk, symbol, symbolRef, symbolFn, capture, captureRef, refSymbol) => {
    if (qDev && qSerialize && captureRef) {
      for (const item of captureRef) {
        verifySerializable(item, "Captured variable in the closure can not be serialized");
      }
    }
    let _containerEl;
    const qrl = async function(...args) {
      const fn = invokeFn.call(this, tryGetInvokeContext());
      const result = await fn(...args);
      return result;
    };
    const setContainer = el => {
      _containerEl || (_containerEl = el);
      return _containerEl;
    };
    const wrapFn = fn => {
      if ("function" !== typeof fn || !(null == capture ? void 0 : capture.length) && !(null == captureRef ? void 0 : captureRef.length)) {
        return fn;
      }
      return function(...args) {
        let context = tryGetInvokeContext();
        if (context) {
          return fn.apply(this, args);
        }
        context = newInvokeContext();
        context.$qrl$ = qrl;
        context.$event$ = this;
        return invoke.call(this, context, fn, ...args);
      };
    };
    const resolve = async containerEl => {
      if (null !== symbolRef) {
        return symbolRef;
      }
      containerEl && setContainer(containerEl);
      if ("" === chunk) {
        assertDefined(_containerEl, "Sync QRL must have container element");
        const hash2 = _containerEl.getAttribute(QInstanceAttr);
        const doc = _containerEl.ownerDocument;
        const qFuncs = getQFuncs(doc, hash2);
        return qrl.resolved = symbolRef = qFuncs[Number(symbol)];
      }
      const start = now();
      const ctx = tryGetInvokeContext();
      if (null !== symbolFn) {
        symbolRef = symbolFn().then((module2 => qrl.resolved = symbolRef = wrapFn(module2[symbol])));
      } else {
        const imported = getPlatform().importSymbol(_containerEl, chunk, symbol);
        symbolRef = maybeThen(imported, (ref => qrl.resolved = symbolRef = wrapFn(ref)));
      }
      symbolRef.finally((() => emitUsedSymbol(symbol, null == ctx ? void 0 : ctx.$element$, start)));
      return symbolRef;
    };
    const resolveLazy = containerEl => null !== symbolRef ? symbolRef : resolve(containerEl);
    function invokeFn(currentCtx, beforeFn) {
      return (...args) => maybeThen(resolveLazy(), (f => {
        if (!isFunction(f)) {
          throw qError(QError_qrlIsNotFunction);
        }
        if (beforeFn && false === beforeFn()) {
          return;
        }
        const context = createOrReuseInvocationContext(currentCtx);
        const prevQrl = context.$qrl$;
        const prevEvent = context.$event$;
        context.$qrl$ = qrl;
        context.$event$ ||= this;
        try {
          return invoke.call(this, context, f, ...args);
        } finally {
          context.$qrl$ = prevQrl;
          context.$event$ = prevEvent;
        }
      }));
    }
    const createOrReuseInvocationContext = invoke2 => null == invoke2 ? newInvokeContext() : isArray(invoke2) ? newInvokeContextFromTuple(invoke2) : invoke2;
    const resolvedSymbol = refSymbol ?? symbol;
    const hash = getSymbolHash2(resolvedSymbol);
    Object.assign(qrl, {
      getSymbol: () => resolvedSymbol,
      getHash: () => hash,
      getCaptured: () => captureRef,
      resolve: resolve,
      $resolveLazy$: resolveLazy,
      $setContainer$: setContainer,
      $chunk$: chunk,
      $symbol$: symbol,
      $refSymbol$: refSymbol,
      $hash$: hash,
      getFn: invokeFn,
      $capture$: capture,
      $captureRef$: captureRef,
      dev: null,
      resolved: void 0
    });
    symbolRef && (symbolRef = maybeThen(symbolRef, (resolved => qrl.resolved = symbolRef = wrapFn(resolved))));
    isDev && Object.defineProperty(qrl, "_devOnlySymbolRef", {
      get: () => symbolRef
    });
    qDev && seal(qrl);
    return qrl;
  };
  var getSymbolHash2 = symbolName => {
    const index = symbolName.lastIndexOf("_");
    if (index > -1) {
      return symbolName.slice(index + 1);
    }
    return symbolName;
  };
  var EMITTED = new Set;
  var emitUsedSymbol = (symbol, element, reqTime) => {
    if (!EMITTED.has(symbol)) {
      EMITTED.add(symbol);
      emitEvent("qsymbol", {
        symbol: symbol,
        element: element,
        reqTime: reqTime
      });
    }
  };
  var emitEvent = (eventName, detail) => {
    qTest || isServerPlatform() || "object" !== typeof document || document.dispatchEvent(new CustomEvent(eventName, {
      bubbles: false,
      detail: detail
    }));
  };
  var now = () => {
    if (qTest || isServerPlatform()) {
      return 0;
    }
    if ("object" === typeof performance) {
      return performance.now();
    }
    return 0;
  };
  function getOrigin(req) {
    const {PROTOCOL_HEADER: PROTOCOL_HEADER, HOST_HEADER: HOST_HEADER} = process.env;
    const headers = req.headers;
    const protocol = PROTOCOL_HEADER && headers[PROTOCOL_HEADER.toLowerCase()] || (req.socket.encrypted || req.connection.encrypted ? "https" : "http");
    const host = HOST_HEADER && headers[HOST_HEADER.toLowerCase()] || headers[":authority"] || headers.host;
    return `${protocol}://${host}`;
  }
  var encode = url => encodeURIComponent(url).replaceAll("%2F", "/").replaceAll("%40", "@").replaceAll("%3A", ":");
  function createSymbolMapper(base, opts, path, sys) {
    const normalizePath = makeNormalizePath(sys);
    return (symbolName, mapper, parent) => {
      if (symbolName === SYNC_QRL) {
        return [ symbolName, "" ];
      }
      const hash = getSymbolHash(symbolName);
      if (!parent) {
        console.warn(`qwik vite-dev-server symbolMapper: parent not provided for ${symbolName}, falling back to mapper.`);
        const chunk = mapper && mapper[hash];
        if (chunk) {
          return [ chunk[0], chunk[1] ];
        }
        console.error("qwik vite-dev-server symbolMapper: unknown qrl requested without parent:", symbolName);
        return [ symbolName, `${base}${symbolName.toLowerCase()}.js` ];
      }
      const maybeSlash = isWin(sys.os) ? "/" : "";
      const parentPath = normalizePath(path.dirname(parent));
      const parentFile = path.basename(parent);
      const qrlPath = parentPath.startsWith(opts.rootDir) ? normalizePath(path.relative(opts.rootDir, parentPath)) : `@fs${maybeSlash}${parentPath}`;
      const qrlFile = `${encode(qrlPath)}/${parentFile.toLowerCase()}_${symbolName.toLowerCase()}.js?_qrl_parent=${encode(parentFile)}`;
      return [ symbolName, `${base}${qrlFile}` ];
    };
  }
  var lazySymbolMapper = null;
  var symbolMapper = (symbolName, mapper, parent) => {
    if (lazySymbolMapper) {
      return lazySymbolMapper(symbolName, mapper, parent);
    }
    throw new Error("symbolMapper not initialized");
  };
  async function configureDevServer(base, server, opts, sys, path, isClientDevOnly, clientDevInput, devSsrServer) {
    var _a;
    symbolMapper = lazySymbolMapper = createSymbolMapper(base, opts, path, sys);
    if (!devSsrServer) {
      return;
    }
    const hasQwikCity = null == (_a = server.config.plugins) ? void 0 : _a.some((plugin => "vite-plugin-qwik-city" === plugin.name));
    server.middlewares.use((async (req, res, next) => {
      try {
        const {ORIGIN: ORIGIN} = process.env;
        const domain = ORIGIN ?? getOrigin(req);
        const url = new URL(req.originalUrl, domain);
        if (shouldSsrRender(req, url)) {
          const {_qwikEnvData: _qwikEnvData} = res;
          if (!_qwikEnvData && hasQwikCity) {
            console.error(`not SSR rendering ${url} because Qwik City Env data did not populate`);
            res.statusCode ||= 404;
            res.setHeader("Content-Type", "text/plain");
            res.writeHead(res.statusCode);
            res.end("Not a SSR URL according to Qwik City");
            return;
          }
          const serverData = {
            ..._qwikEnvData,
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
          const firstInput = opts.input && Object.values(opts.input)[0];
          const ssrModule = await server.ssrLoadModule(firstInput);
          const render = ssrModule.default ?? ssrModule.render;
          if ("function" === typeof render) {
            const manifest = {
              manifestHash: "",
              symbols: {},
              mapping: {},
              bundles: {},
              injections: [],
              version: "1"
            };
            const added = new Set;
            Array.from(server.moduleGraph.fileToModulesMap.entries()).forEach((entry => {
              entry[1].forEach((v => {
                var _a2, _b;
                const segment = null == (_b = null == (_a2 = v.info) ? void 0 : _a2.meta) ? void 0 : _b.segment;
                let url2 = v.url;
                v.lastHMRTimestamp && (url2 += `?t=${v.lastHMRTimestamp}`);
                segment && (manifest.mapping[segment.name] = relativeURL(url2, opts.rootDir));
                const {pathId: pathId, query: query} = parseId(v.url);
                if ("" === query && [ ".css", ".scss", ".sass", ".less", ".styl", ".stylus" ].some((ext => pathId.endsWith(ext)))) {
                  added.add(v.url);
                  manifest.injections.push({
                    tag: "link",
                    location: "head",
                    attributes: {
                      rel: "stylesheet",
                      href: `${base}${url2.slice(1)}`
                    }
                  });
                }
              }));
            }));
            const renderOpts = {
              debug: true,
              locale: serverData.locale,
              stream: res,
              snapshot: !isClientDevOnly,
              manifest: isClientDevOnly ? void 0 : manifest,
              symbolMapper: isClientDevOnly ? void 0 : symbolMapper,
              prefetchStrategy: null,
              serverData: serverData,
              containerAttributes: {
                ...serverData.containerAttributes
              }
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
                !added.has(v.url) && "" === query && [ ".css", ".scss", ".sass", ".less", ".styl", ".stylus" ].some((ext => pathId.endsWith(ext))) && res.write(`<link rel="stylesheet" href="${base}${v.url.slice(1)}">`);
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
  var CYPRESS_DEV_SERVER_PATH = "/__cypress/src";
  var FS_PREFIX = "/@fs/";
  var VALID_ID_PREFIX = "/@id/";
  var VITE_PUBLIC_PATH = "/@vite/";
  var internalPrefixes = [ FS_PREFIX, VALID_ID_PREFIX, VITE_PUBLIC_PATH ];
  var InternalPrefixRE = new RegExp(`^(${CYPRESS_DEV_SERVER_PATH})?(?:${internalPrefixes.join("|")})`);
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
    if (pathname.includes("@builder.io/qwik/build")) {
      return false;
    }
    const acceptHeader = req.headers.accept || "";
    const accepts = acceptHeader.split(",").map((accept => accept.split(";")[0]));
    if (1 == accepts.length && accepts.includes("*/*")) {
      return true;
    }
    if (!accepts.includes("text/html")) {
      return false;
    }
    return true;
  };
  function relativeURL(url, base) {
    if (url.startsWith(base)) {
      url = url.slice(base.length);
      url.startsWith("/") || (url = "/" + url);
    }
    return url;
  }
  var DEV_QWIK_INSPECTOR = (opts, srcDir) => {
    const qwikdevtools = {
      hotKeys: opts.clickToSource ?? [],
      srcDir: new URL(srcDir + "/", "http://local.local").href
    };
    return `<script>\n      globalThis.qwikdevtools = ${JSON.stringify(qwikdevtools)};\n    <\/script>` + (opts.imageDevTools ? image_size_runtime_default : "") + (opts.clickToSource ? click_to_component_default : "");
  };
  var END_SSR_SCRIPT = (opts, srcDir) => `\n<style>${VITE_ERROR_OVERLAY_STYLES}</style>\n<script type="module" src="/@vite/client"><\/script>\n${error_host_default}\n${perf_warning_default}\n${DEV_QWIK_INSPECTOR(opts.devTools, srcDir)}\n`;
  function getViteDevIndexHtml(entryUrl, serverData) {
    return `<!DOCTYPE html>\n<html lang="en">\n  <head>\n  </head>\n  <body>\n    <script type="module">\n    async function main() {\n      const mod = await import("${entryUrl}?${VITE_DEV_CLIENT_QS}=");\n      if (mod.default) {\n        const serverData = JSON.parse(${JSON.stringify(JSON.stringify(serverData))})\n        mod.default({\n          serverData,\n        });\n      }\n    }\n    main();\n    <\/script>\n    ${error_host_default}\n  </body>\n</html>`;
  }
  var VITE_DEV_CLIENT_QS = "qwik-vite-dev-client";
  var DEDUPE = [ QWIK_CORE_ID, QWIK_JSX_RUNTIME_ID, QWIK_JSX_DEV_RUNTIME_ID ];
  var STYLING = [ ".css", ".scss", ".sass", ".less", ".styl", ".stylus" ];
  var FONTS = [ ".woff", ".woff2", ".ttf" ];
  function qwikVite(qwikViteOpts = {}) {
    let isClientDevOnly = false;
    let clientDevInput;
    let tmpClientManifestPath;
    let viteCommand = "serve";
    let manifestInput = null;
    let clientOutDir = null;
    let basePathname = "/";
    let clientPublicOutDir = null;
    let viteAssetsDir;
    let srcDir = null;
    let rootDir = null;
    let ssrOutDir = null;
    const fileFilter = qwikViteOpts.fileFilter ? (id, type) => TRANSFORM_REGEX.test(id) || qwikViteOpts.fileFilter(id, type) : () => true;
    const injections = [];
    const qwikPlugin = createPlugin(qwikViteOpts.optimizerOptions);
    async function loadQwikInsights(clientOutDir2 = "") {
      const sys = qwikPlugin.getSys();
      const cwdRelativePath = absolutePathAwareJoin(sys.path, rootDir || ".", clientOutDir2, "q-insights.json");
      const path = absolutePathAwareJoin(sys.path, process.cwd(), cwdRelativePath);
      const fs = await sys.dynamicImport("node:fs");
      if (fs.existsSync(path)) {
        qwikPlugin.log("Reading Qwik Insight data from: " + cwdRelativePath);
        return JSON.parse(await fs.promises.readFile(path, "utf-8"));
      }
      return null;
    }
    const api = {
      getOptimizer: () => qwikPlugin.getOptimizer(),
      getOptions: () => qwikPlugin.getOptions(),
      getManifest: () => manifestInput,
      getInsightsManifest: (clientOutDir2 = "") => loadQwikInsights(clientOutDir2),
      getRootDir: () => qwikPlugin.getOptions().rootDir,
      getClientOutDir: () => clientOutDir,
      getClientPublicOutDir: () => clientPublicOutDir,
      getAssetsDir: () => viteAssetsDir
    };
    const vitePluginPre = {
      name: "vite-plugin-qwik",
      enforce: "pre",
      api: api,
      async config(viteConfig, viteEnv) {
        var _a, _b, _c, _d, _e, _f, _g, _h, _i, _j, _k, _l, _m, _n, _o, _p, _q, _r, _s, _t, _u, _v, _w;
        await qwikPlugin.init();
        const sys = qwikPlugin.getSys();
        const path = qwikPlugin.getPath();
        let target;
        target = (null == (_a = viteConfig.build) ? void 0 : _a.ssr) || "ssr" === viteEnv.mode ? "ssr" : "lib" === viteEnv.mode ? "lib" : "test" === viteEnv.mode ? "test" : "client";
        let buildMode;
        buildMode = "production" === viteEnv.mode ? "production" : "development" === viteEnv.mode ? "development" : "build" === viteCommand && "client" === target ? "production" : "development";
        viteCommand = viteEnv.command;
        isClientDevOnly = "serve" === viteCommand && "ssr" !== viteEnv.mode;
        qwikPlugin.debug(`vite config(), command: ${viteCommand}, env.mode: ${viteEnv.mode}`);
        "serve" === viteCommand ? qwikViteOpts.entryStrategy = {
          type: "segment"
        } : "ssr" === target ? qwikViteOpts.entryStrategy = {
          type: "hoist"
        } : "lib" === target && (qwikViteOpts.entryStrategy = {
          type: "inline"
        });
        const shouldFindVendors = !qwikViteOpts.disableVendorScan && ("lib" !== target || "serve" === viteCommand);
        viteAssetsDir = null == (_b = viteConfig.build) ? void 0 : _b.assetsDir;
        const useAssetsDir = "client" === target && !!viteAssetsDir && "_astro" !== viteAssetsDir;
        const pluginOpts = {
          target: target,
          buildMode: buildMode,
          csr: qwikViteOpts.csr,
          debug: qwikViteOpts.debug,
          entryStrategy: qwikViteOpts.entryStrategy,
          srcDir: qwikViteOpts.srcDir,
          rootDir: viteConfig.root,
          tsconfigFileNames: qwikViteOpts.tsconfigFileNames,
          resolveQwikBuild: true,
          transformedModuleOutput: qwikViteOpts.transformedModuleOutput,
          outDir: null == (_c = viteConfig.build) ? void 0 : _c.outDir,
          assetsDir: useAssetsDir ? viteAssetsDir : void 0,
          devTools: qwikViteOpts.devTools,
          sourcemap: !!(null == (_d = viteConfig.build) ? void 0 : _d.sourcemap),
          lint: qwikViteOpts.lint,
          experimental: qwikViteOpts.experimental
        };
        if (!qwikViteOpts.csr) {
          if ("ssr" === target) {
            "string" === typeof (null == (_e = viteConfig.build) ? void 0 : _e.ssr) ? pluginOpts.input = viteConfig.build.ssr : "string" === typeof (null == (_f = qwikViteOpts.ssr) ? void 0 : _f.input) && (pluginOpts.input = qwikViteOpts.ssr.input);
            (null == (_g = qwikViteOpts.ssr) ? void 0 : _g.outDir) && (pluginOpts.outDir = qwikViteOpts.ssr.outDir);
            pluginOpts.manifestInput = null == (_h = qwikViteOpts.ssr) ? void 0 : _h.manifestInput;
          } else if ("client" === target) {
            pluginOpts.input = null == (_i = qwikViteOpts.client) ? void 0 : _i.input;
            (null == (_j = qwikViteOpts.client) ? void 0 : _j.outDir) && (pluginOpts.outDir = qwikViteOpts.client.outDir);
            pluginOpts.manifestOutput = null == (_k = qwikViteOpts.client) ? void 0 : _k.manifestOutput;
          } else {
            "object" === typeof (null == (_l = viteConfig.build) ? void 0 : _l.lib) && (pluginOpts.input = null == (_m = viteConfig.build) ? void 0 : _m.lib.entry);
          }
          if ("node" === sys.env) {
            const fs = await sys.dynamicImport("node:fs");
            try {
              const rootDir2 = pluginOpts.rootDir ?? sys.cwd();
              const packageJsonPath = sys.path.join(rootDir2, "package.json");
              const pkgString = await fs.promises.readFile(packageJsonPath, "utf-8");
              try {
                const data = JSON.parse(pkgString);
                "string" === typeof data.name && (pluginOpts.scope = data.name);
              } catch (e) {
                console.error(e);
              }
            } catch {}
            const nodeOs = await sys.dynamicImport("node:os");
            const scopeSuffix = pluginOpts.scope ? `-${pluginOpts.scope.replace(/\//g, "--")}` : "";
            tmpClientManifestPath = path.join(nodeOs.tmpdir(), `vite-plugin-qwik-q-manifest${scopeSuffix}.json`);
            if ("ssr" === target && !pluginOpts.manifestInput) {
              try {
                const clientManifestStr = await fs.promises.readFile(tmpClientManifestPath, "utf-8");
                pluginOpts.manifestInput = JSON.parse(clientManifestStr);
              } catch {}
            }
          }
        }
        const opts = qwikPlugin.normalizeOptions(pluginOpts);
        manifestInput = pluginOpts.manifestInput || null;
        srcDir = opts.srcDir;
        rootDir = opts.rootDir;
        if (!qwikViteOpts.csr) {
          clientOutDir = qwikPlugin.normalizePath(sys.path.resolve(opts.rootDir, (null == (_n = qwikViteOpts.client) ? void 0 : _n.outDir) || CLIENT_OUT_DIR));
          clientPublicOutDir = viteConfig.base ? path.join(clientOutDir, viteConfig.base) : clientOutDir;
          ssrOutDir = qwikPlugin.normalizePath(sys.path.resolve(opts.rootDir, (null == (_o = qwikViteOpts.ssr) ? void 0 : _o.outDir) || SSR_OUT_DIR));
          clientDevInput = "string" === typeof (null == (_p = qwikViteOpts.client) ? void 0 : _p.devInput) ? path.resolve(opts.rootDir, qwikViteOpts.client.devInput) : opts.srcDir ? path.resolve(opts.srcDir, CLIENT_DEV_INPUT) : path.resolve(opts.rootDir, "src", CLIENT_DEV_INPUT);
          clientDevInput = qwikPlugin.normalizePath(clientDevInput);
        }
        const vendorRoots = shouldFindVendors ? await findQwikRoots(sys, sys.cwd()) : [];
        const vendorIds = vendorRoots.map((v => v.id));
        const isDevelopment = "development" === buildMode;
        const qDevKey = "globalThis.qDev";
        const qTestKey = "globalThis.qTest";
        const qInspectorKey = "globalThis.qInspector";
        const qSerializeKey = "globalThis.qSerialize";
        const qDev2 = (null == (_q = null == viteConfig ? void 0 : viteConfig.define) ? void 0 : _q[qDevKey]) ?? isDevelopment;
        const qInspector2 = (null == (_r = null == viteConfig ? void 0 : viteConfig.define) ? void 0 : _r[qInspectorKey]) ?? isDevelopment;
        const qSerialize2 = (null == (_s = null == viteConfig ? void 0 : viteConfig.define) ? void 0 : _s[qSerializeKey]) ?? isDevelopment;
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
            modulePreload: false,
            dynamicImportVarsOptions: {
              exclude: [ /./ ]
            },
            rollupOptions: {
              output: {
                manualChunks: qwikPlugin.manualChunks
              }
            }
          },
          define: {
            [qDevKey]: qDev2,
            [qInspectorKey]: qInspector2,
            [qSerializeKey]: qSerialize2,
            [qTestKey]: JSON.stringify("test" === process.env.NODE_ENV)
          }
        };
        if (!qwikViteOpts.csr) {
          const buildOutputDir = "client" === target && viteConfig.base ? path.join(opts.outDir, viteConfig.base) : opts.outDir;
          updatedViteConfig.build.cssCodeSplit = false;
          updatedViteConfig.build.outDir = buildOutputDir;
          const origOnwarn = null == (_t = updatedViteConfig.build.rollupOptions) ? void 0 : _t.onwarn;
          updatedViteConfig.build.rollupOptions = {
            input: opts.input,
            output: normalizeRollupOutputOptions(opts, null == (_v = null == (_u = viteConfig.build) ? void 0 : _u.rollupOptions) ? void 0 : _v.output, useAssetsDir, qwikPlugin.manualChunks, buildOutputDir),
            preserveEntrySignatures: "exports-only",
            onwarn: (warning, warn) => {
              if ("typescript" === warning.plugin && warning.message.includes("outputToFilesystem")) {
                return;
              }
              origOnwarn ? origOnwarn(warning, warn) : warn(warning);
            }
          };
          if ("ssr" === opts.target) {
            if ("build" === viteCommand) {
              updatedViteConfig.publicDir = false;
              updatedViteConfig.build.ssr = true;
              null == (null == (_w = viteConfig.build) ? void 0 : _w.minify) && "production" === buildMode && (updatedViteConfig.build.minify = "esbuild");
            }
          } else {
            "client" === opts.target ? isClientDevOnly && !opts.csr && (updatedViteConfig.build.rollupOptions.input = clientDevInput) : "lib" === opts.target ? updatedViteConfig.build.minify = false : updatedViteConfig.define = {
              [qDevKey]: true,
              [qTestKey]: true,
              [qInspectorKey]: false
            };
          }
          globalThis.qDev = qDev2;
          globalThis.qTest = true;
          globalThis.qInspector = qInspector2;
        }
        return updatedViteConfig;
      },
      async configResolved(config) {
        var _a, _b;
        basePathname = config.base;
        if (!(basePathname.startsWith("/") && basePathname.endsWith("/"))) {
          throw new Error("Vite's config.base must begin and end with /");
        }
        const sys = qwikPlugin.getSys();
        if ("node" === sys.env && !qwikViteOpts.entryStrategy) {
          try {
            const entryStrategy = await loadQwikInsights(qwikViteOpts.csr || null == (_a = qwikViteOpts.client) ? void 0 : _a.outDir);
            entryStrategy && (qwikViteOpts.entryStrategy = entryStrategy);
          } catch {}
        }
        const useSourcemap = !!config.build.sourcemap;
        useSourcemap && void 0 === (null == (_b = qwikViteOpts.optimizerOptions) ? void 0 : _b.sourcemap) && qwikPlugin.setSourceMapSupport(true);
      },
      async buildStart() {
        const resolver = this.resolve.bind(this);
        await qwikPlugin.validateSource(resolver);
        qwikPlugin.onDiagnostics(((diagnostics, optimizer, srcDir2) => {
          diagnostics.forEach((d => {
            const id = qwikPlugin.normalizePath(optimizer.sys.path.join(srcDir2, d.file));
            "error" === d.category ? this.error(createRollupError2(id, d)) : this.warn(createRollupError2(id, d));
          }));
        }));
        await qwikPlugin.buildStart(this);
      },
      resolveId(id, importer, resolveIdOpts) {
        if (id.startsWith("\0") || !fileFilter(id, "resolveId")) {
          return null;
        }
        if (isClientDevOnly && id === VITE_CLIENT_MODULE) {
          return id;
        }
        return qwikPlugin.resolveId(this, id, importer, resolveIdOpts);
      },
      load(id, loadOpts) {
        if (id.startsWith("\0") || !fileFilter(id, "load")) {
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
        if (id.startsWith("\0") || !fileFilter(id, "transform") || id.includes("?raw")) {
          return null;
        }
        if (isClientDevOnly) {
          const parsedId = parseId(id);
          parsedId.params.has(VITE_DEV_CLIENT_QS) && (code = updateEntryDev(code));
        }
        return qwikPlugin.transform(this, code, id, transformOpts);
      }
    };
    const vitePluginPost = {
      name: "vite-plugin-qwik-post",
      enforce: "post",
      generateBundle: {
        order: "post",
        async handler(_, rollupBundle) {
          var _a;
          const opts = qwikPlugin.getOptions();
          if ("client" === opts.target) {
            const outputAnalyzer = qwikPlugin.createOutputAnalyzer(rollupBundle);
            for (const [fileName, b] of Object.entries(rollupBundle)) {
              if ("asset" === b.type) {
                const baseFilename = basePathname + fileName;
                if (STYLING.some((ext => fileName.endsWith(ext)))) {
                  "string" === typeof b.source && b.source.length < opts.inlineStylesUpToBytes ? injections.push({
                    tag: "style",
                    location: "head",
                    attributes: {
                      "data-src": baseFilename,
                      dangerouslySetInnerHTML: b.source
                    }
                  }) : injections.push({
                    tag: "link",
                    location: "head",
                    attributes: {
                      rel: "stylesheet",
                      href: baseFilename
                    }
                  });
                } else {
                  const selectedFont = FONTS.find((ext => fileName.endsWith(ext)));
                  selectedFont && injections.unshift({
                    tag: "link",
                    location: "head",
                    attributes: {
                      rel: "preload",
                      href: baseFilename,
                      as: "font",
                      type: `font/${selectedFont.slice(1)}`,
                      crossorigin: ""
                    }
                  });
                }
              }
            }
            for (const i of injections) {
              outputAnalyzer.addInjection(i);
            }
            const optimizer = qwikPlugin.getOptimizer();
            const manifest = await outputAnalyzer.generateManifest();
            manifest.platform = {
              ...versions,
              vite: "",
              rollup: (null == (_a = this.meta) ? void 0 : _a.rollupVersion) || "",
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
            const assetsDir = qwikPlugin.getOptions().assetsDir || "";
            const useAssetsDir = !!assetsDir && "_astro" !== assetsDir;
            const sys = qwikPlugin.getSys();
            this.emitFile({
              type: "asset",
              fileName: sys.path.join(useAssetsDir ? assetsDir : "", "build", `q-bundle-graph-${manifest.manifestHash}.json`),
              source: JSON.stringify(convertManifestToBundleGraph(manifest))
            });
            const fs = await sys.dynamicImport("node:fs");
            const workerScriptPath = (await this.resolve("@builder.io/qwik/qwik-prefetch.js")).id;
            const workerScript = await fs.promises.readFile(workerScriptPath, "utf-8");
            const qwikPrefetchServiceWorkerFile = "qwik-prefetch-service-worker.js";
            this.emitFile({
              type: "asset",
              fileName: useAssetsDir ? sys.path.join(assetsDir, "build", qwikPrefetchServiceWorkerFile) : qwikPrefetchServiceWorkerFile,
              source: workerScript
            });
            "function" === typeof opts.manifestOutput && await opts.manifestOutput(manifest);
            "function" === typeof opts.transformedModuleOutput && await opts.transformedModuleOutput(qwikPlugin.getTransformedOutputs());
            if (tmpClientManifestPath && "node" === sys.env) {
              const fs2 = await sys.dynamicImport("node:fs");
              await fs2.promises.writeFile(tmpClientManifestPath, clientManifestStr);
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
                const isEntryFile = bundleFileName.startsWith("entry.") || bundleFileName.startsWith("entry_");
                if (isEntryFile && !bundleFileName.includes("preview") && (".mjs" === ext || ".cjs" === ext)) {
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
        qwikPlugin.configureServer(server);
        const devSsrServer = !("devSsrServer" in qwikViteOpts) || !!qwikViteOpts.devSsrServer;
        const imageDevTools = !qwikViteOpts.devTools || !("imageDevTools" in qwikViteOpts.devTools) || qwikViteOpts.devTools.imageDevTools;
        imageDevTools && server.middlewares.use(getImageSizeServer(qwikPlugin.getSys(), rootDir, srcDir));
        if (!qwikViteOpts.csr) {
          const plugin = async () => {
            const opts = qwikPlugin.getOptions();
            const sys = qwikPlugin.getSys();
            const path = qwikPlugin.getPath();
            await configureDevServer(basePathname, server, opts, sys, path, isClientDevOnly, clientDevInput, devSsrServer);
          };
          const isNEW = true === globalThis.__qwikCityNew;
          return isNEW ? plugin : plugin();
        }
      },
      configurePreviewServer: server => async () => {
        const sys = qwikPlugin.getSys();
        const path = qwikPlugin.getPath();
        await configurePreviewServer(server.middlewares, ssrOutDir, sys, path);
      },
      handleHotUpdate(ctx) {
        qwikPlugin.handleHotUpdate(ctx);
        ctx.modules.length && ctx.server.hot.send({
          type: "full-reload"
        });
      },
      onLog(level, log3) {
        var _a, _b, _c;
        if ("vite-plugin-qwik" == log3.plugin) {
          const color = LOG_COLOR[level] || ANSI_COLOR.White;
          const frames = (log3.frame || "").split("\n").map((line => (line.match(/^\s*\^\s*$/) ? ANSI_COLOR.BrightWhite : ANSI_COLOR.BrightBlack) + line));
          console[level](`${color}%s\n${ANSI_COLOR.BrightWhite}%s\n%s${ANSI_COLOR.RESET}`, `[${log3.plugin}](${level}): ${log3.message}\n`, `  ${null == (_a = null == log3 ? void 0 : log3.loc) ? void 0 : _a.file}:${null == (_b = null == log3 ? void 0 : log3.loc) ? void 0 : _b.line}:${null == (_c = null == log3 ? void 0 : log3.loc) ? void 0 : _c.column}\n`, `  ${frames.join("\n  ")}\n`);
          return false;
        }
      }
    };
    return [ vitePluginPre, vitePluginPost ];
  }
  var ANSI_COLOR = {
    Black: "[30m",
    Red: "[31m",
    Green: "[32m",
    Yellow: "[33m",
    Blue: "[34m",
    Magenta: "[35m",
    Cyan: "[36m",
    White: "[37m",
    BrightBlack: "[90m",
    BrightRed: "[91m",
    BrightGreen: "[92m",
    BrightYellow: "[93m",
    BrightBlue: "[94m",
    BrightMagenta: "[95m",
    BrightCyan: "[96m",
    BrightWhite: "[97m",
    RESET: "[0m"
  };
  var LOG_COLOR = {
    warn: ANSI_COLOR.Yellow,
    info: ANSI_COLOR.Cyan,
    debug: ANSI_COLOR.BrightBlack
  };
  function updateEntryDev(code) {
    code = code.replace(/["']@builder.io\/qwik["']/g, `'${VITE_CLIENT_MODULE}'`);
    return code;
  }
  function getViteDevModule(opts) {
    const qwikLoader = JSON.stringify(opts.debug ? QWIK_LOADER_DEFAULT_DEBUG : QWIK_LOADER_DEFAULT_MINIFIED);
    return `// Qwik Vite Dev Module\nimport { render as qwikRender } from '@builder.io/qwik';\n\nexport async function render(document, rootNode, opts) {\n\n  await qwikRender(document, rootNode, opts);\n\n  let qwikLoader = document.getElementById('qwikloader');\n  if (!qwikLoader) {\n    qwikLoader = document.createElement('script');\n    qwikLoader.id = 'qwikloader';\n    qwikLoader.innerHTML = ${qwikLoader};\n    const parent = document.head ?? document.body ?? document.documentElement;\n    parent.appendChild(qwikLoader);\n  }\n\n  if (!window.__qwikViteLog) {\n    window.__qwikViteLog = true;\n    console.debug("%c⭐️ Qwik Client Mode","background: #0c75d2; color: white; padding: 2px 3px; border-radius: 2px; font-size: 0.8em;","Do not use this mode in production!\\n - No portion of the application is pre-rendered on the server\\n - All of the application is running eagerly in the browser\\n - Optimizer/Serialization/Deserialization code is not exercised!");\n  }\n}`;
  }
  async function findDepPkgJsonPath(sys, dep, parent) {
    const fs = await sys.dynamicImport("node:fs");
    let root = parent;
    while (root) {
      const pkg = sys.path.join(root, "node_modules", dep, "package.json");
      try {
        await fs.promises.access(pkg);
        return fs.promises.realpath(pkg);
      } catch {}
      const nextRoot = sys.path.dirname(root);
      if (nextRoot === root) {
        break;
      }
      root = nextRoot;
    }
    return;
  }
  var findQwikRoots = async (sys, packageJsonDir) => {
    const paths = new Map;
    if ("node" === sys.env) {
      const fs = await sys.dynamicImport("node:fs");
      let prevPackageJsonDir;
      do {
        try {
          const data = await fs.promises.readFile(sys.path.join(packageJsonDir, "package.json"), {
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
            await Promise.all(packages.map((async id => {
              const pkgJsonPath = await findDepPkgJsonPath(sys, id, basedir);
              if (pkgJsonPath) {
                const pkgJsonContent = await fs.promises.readFile(pkgJsonPath, "utf-8");
                const pkgJson = JSON.parse(pkgJsonContent);
                const qwikPath = pkgJson.qwik;
                if (!qwikPath) {
                  return;
                }
                const allPaths = Array.isArray(qwikPath) ? qwikPath : [ qwikPath ];
                for (const p of allPaths) {
                  paths.set(await fs.promises.realpath(sys.path.resolve(sys.path.dirname(pkgJsonPath), p)), id);
                }
              }
            })));
          } catch (e) {
            console.error(e);
          }
        } catch (e) {}
        prevPackageJsonDir = packageJsonDir;
        packageJsonDir = sys.path.dirname(packageJsonDir);
      } while (packageJsonDir !== prevPackageJsonDir);
    }
    return Array.from(paths).map((([path, id]) => ({
      path: path,
      id: id
    })));
  };
  var VITE_CLIENT_MODULE = "@builder.io/qwik/vite-client";
  var CLIENT_DEV_INPUT = "entry.dev";
  function absolutePathAwareJoin(path, ...segments) {
    for (let i = segments.length - 1; i >= 0; --i) {
      const segment = segments[i];
      if (segment.startsWith(path.sep) || -1 !== segment.indexOf(path.delimiter)) {
        segments.splice(0, i);
        break;
      }
    }
    return path.join(...segments);
  }
  function convertManifestToBundleGraph(manifest) {
    const bundleGraph = [];
    const graph = manifest.bundles;
    if (!graph) {
      return [];
    }
    const names = Object.keys(graph).sort();
    const map = new Map;
    const clearTransitiveDeps = (parentDeps, seen, bundleName) => {
      const bundle = graph[bundleName];
      if (!bundle) {
        return;
      }
      for (const dep of bundle.imports || []) {
        parentDeps.has(dep) && parentDeps.delete(dep);
        if (!seen.has(dep)) {
          seen.add(dep);
          clearTransitiveDeps(parentDeps, seen, dep);
        }
      }
    };
    for (const bundleName of names) {
      const bundle = graph[bundleName];
      const index = bundleGraph.length;
      const deps = new Set(bundle.imports);
      for (const depName of deps) {
        if (!graph[depName]) {
          continue;
        }
        clearTransitiveDeps(deps, new Set, depName);
      }
      let didAdd = false;
      for (const depName of bundle.dynamicImports || []) {
        const dep = graph[depName];
        if (!graph[depName]) {
          continue;
        }
        if (dep.isTask) {
          if (!didAdd) {
            deps.add("<dynamic>");
            didAdd = true;
          }
          deps.add(depName);
        }
      }
      map.set(bundleName, {
        index: index,
        deps: deps
      });
      bundleGraph.push(bundleName);
      while (index + deps.size >= bundleGraph.length) {
        bundleGraph.push(null);
      }
    }
    for (const bundleName of names) {
      const bundle = map.get(bundleName);
      if (!bundle) {
        console.warn(`Bundle ${bundleName} not found in the bundle graph.`);
        continue;
      }
      let {index: index, deps: deps} = bundle;
      index++;
      for (const depName of deps) {
        if ("<dynamic>" === depName) {
          bundleGraph[index++] = -1;
          continue;
        }
        const dep = map.get(depName);
        if (!dep) {
          console.warn(`Dependency ${depName} of ${bundleName} not found in the bundle graph.`);
          continue;
        }
        const depIndex = dep.index;
        bundleGraph[index++] = depIndex;
      }
    }
    return bundleGraph;
  }
  return module.exports;
}("object" === typeof module && module.exports ? module : {
  exports: {}
});