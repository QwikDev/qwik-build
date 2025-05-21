/**
 * @license
 * @builder.io/qwik/optimizer 1.14.1
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
  var index_exports = {};
  __export(index_exports, {
    createOptimizer: () => createOptimizer,
    qwikRollup: () => qwikRollup,
    qwikVite: () => qwikVite,
    symbolMapper: () => symbolMapper,
    versions: () => versions
  });
  module.exports = __toCommonJS(index_exports);
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
      const base2 = pathObject.base || (pathObject.name || "") + (pathObject.ext || "");
      if (!dir) {
        return base2;
      }
      if (dir === pathObject.root) {
        return dir + base2;
      }
      return dir + sep2 + base2;
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
    qwik: "1.14.1"
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
      if ("eventHandler" === a.ctxKind && "eventHandler" !== b.ctxKind) {
        return -1;
      }
      if ("eventHandler" !== a.ctxKind && "eventHandler" === b.ctxKind) {
        return 1;
      }
      if ("eventHandler" === a.ctxKind && "eventHandler" === b.ctxKind) {
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
  var getBundleInteractivity = (bundle, manifest) => {
    let maxScore = 0;
    if (bundle.symbols) {
      for (const symbolName of bundle.symbols) {
        let score = 1;
        const symbol = manifest.symbols[symbolName];
        if (symbol) {
          if ("function" === symbol.ctxKind) {
            /(component|useStyles|useStylesScoped)/i.test(symbol.ctxName) ? score += 1 : /(useComputed|useTask|useVisibleTask|useOn)/i.test(symbol.ctxName) && (score += 2);
          } else {
            score += 1;
            /(click|mouse|pointer|touch|key|scroll|gesture|wheel)/i.test(symbol.ctxName) && (score += 3);
          }
        }
        maxScore = Math.max(maxScore, score);
      }
    }
    return maxScore;
  };
  function computeTotals(graph2) {
    let index = 0;
    const stack = [];
    const sccList = [];
    const idx = new Map;
    const low = new Map;
    const onStack = new Set;
    function strongConnect(v) {
      idx.set(v, index);
      low.set(v, index);
      index++;
      stack.push(v);
      onStack.add(v);
      const children = graph2[v].imports || [];
      for (const w of children) {
        if (idx.has(w)) {
          onStack.has(w) && low.set(v, Math.min(low.get(v), idx.get(w)));
        } else {
          strongConnect(w);
          low.set(v, Math.min(low.get(v), low.get(w)));
        }
      }
      if (low.get(v) === idx.get(v)) {
        const comp = [];
        let x;
        do {
          x = stack.pop();
          onStack.delete(x);
          comp.push(x);
        } while (x !== v);
        sccList.push(comp);
      }
    }
    for (const v of Object.keys(graph2)) {
      idx.has(v) || strongConnect(v);
    }
    const sccIndex = new Map;
    sccList.forEach(((comp, i) => {
      for (const v of comp) {
        sccIndex.set(v, i);
      }
    }));
    const sccDAG = Array.from({
      length: sccList.length
    }, (() => new Set));
    for (const v of Object.keys(graph2)) {
      const i = sccIndex.get(v);
      for (const w of graph2[v].imports || []) {
        const j = sccIndex.get(w);
        i !== j && sccDAG[i].add(j);
      }
    }
    const visited = new Set;
    const order = [];
    function dfsSCC(u) {
      visited.add(u);
      for (const v of sccDAG[u]) {
        visited.has(v) || dfsSCC(v);
      }
      order.push(u);
    }
    for (let i = 0; i < sccList.length; i++) {
      visited.has(i) || dfsSCC(i);
    }
    order.reverse();
    const sccTotals = new Array(sccList.length).fill(0);
    for (let i = 0; i < sccList.length; i++) {
      let sumSize = 0;
      for (const nodeId of sccList[i]) {
        sumSize += graph2[nodeId].size;
      }
      sccTotals[i] = sumSize;
    }
    for (let k = order.length - 1; k >= 0; k--) {
      const sccId = order[k];
      let total = sccTotals[sccId];
      for (const child of sccDAG[sccId]) {
        total += sccTotals[child];
      }
      sccTotals[sccId] = total;
    }
    for (let i = 0; i < sccList.length; i++) {
      const total = sccTotals[i];
      for (const nodeId of sccList[i]) {
        graph2[nodeId].total = total;
      }
    }
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
        entryStrategy: opts.entryStrategy && {
          type: opts.entryStrategy.type
        }
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
    const qrlNames = new Set(segments.map((h => h.name)));
    for (const outputBundle of Object.values(outputBundles)) {
      if ("chunk" !== outputBundle.type) {
        continue;
      }
      const bundleFileName = canonPath(outputBundle.fileName);
      const size = outputBundle.code.length;
      const bundle = {
        size: size,
        total: -1
      };
      for (const symbol of outputBundle.exports) {
        qrlNames.has(symbol) && (manifest.mapping[symbol] && 1 === outputBundle.exports.length || (manifest.mapping[symbol] = bundleFileName));
      }
      const bundleImports = outputBundle.imports.filter((i => outputBundle.code.includes(path.basename(i)))).map((i => getBundleName(i))).filter(Boolean);
      bundleImports.length > 0 && (bundle.imports = bundleImports);
      const bundleDynamicImports = outputBundle.dynamicImports.filter((i => outputBundle.code.includes(path.basename(i)))).map((i => getBundleName(i))).filter(Boolean);
      bundleDynamicImports.length > 0 && (bundle.dynamicImports = bundleDynamicImports);
      const ids = outputBundle.moduleIds || Object.keys(outputBundle.modules);
      const modulePaths = ids.filter((m => !m.startsWith("\0"))).map((m => path.relative(opts.rootDir, m)));
      if (modulePaths.length > 0) {
        bundle.origins = modulePaths;
        modulePaths.some((m => m.endsWith(QWIK_PRELOADER_REAL_ID))) ? manifest.preloader = bundleFileName : modulePaths.some((m => /[/\\]qwik[/\\]dist[/\\]core\.[^/]*js$/.test(m))) && (manifest.core = bundleFileName);
      }
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
    for (const bundle of Object.values(manifest.bundles)) {
      const interactivityScore = getBundleInteractivity(bundle, manifest);
      bundle.interactivity = interactivityScore;
    }
    computeTotals(manifest.bundles);
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
        overrideConfig: {
          languageOptions: {
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
  function isWin(os) {
    return "win32" === os;
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
  var minimumSpeed = 300;
  var slowSize = .5 / (1024 * minimumSpeed / 8);
  var getSymbolHash = symbolName => {
    const index = symbolName.lastIndexOf("_");
    if (index > -1) {
      return symbolName.slice(index + 1);
    }
    return symbolName;
  };
  function convertManifestToBundleGraph(manifest, bundleGraphAdders) {
    var _a, _b, _c, _d;
    const bundleGraph = [];
    if (!manifest.bundles) {
      return [];
    }
    const graph2 = {
      ...manifest.bundles
    };
    for (const [symbol, bundleName] of Object.entries(manifest.mapping)) {
      const hash = getSymbolHash(symbol);
      hash && (graph2[hash] = {
        dynamicImports: [ bundleName ]
      });
    }
    if (bundleGraphAdders) {
      const combined = {
        ...manifest,
        bundles: graph2
      };
      for (const adder of bundleGraphAdders) {
        const result = adder(combined);
        result && Object.assign(graph2, result);
      }
    }
    for (const bundleName of Object.keys(graph2)) {
      const bundle = graph2[bundleName];
      const imports = (null == (_a = bundle.imports) ? void 0 : _a.filter((dep => graph2[dep]))) || [];
      const dynamicImports = (null == (_b = bundle.dynamicImports) ? void 0 : _b.filter((dep => {
        var _a2;
        return graph2[dep] && (graph2[dep].symbols || (null == (_a2 = graph2[dep].origins) ? void 0 : _a2.some((o => !o.includes("node_modules")))));
      }))) || [];
      graph2[bundleName] = {
        ...bundle,
        imports: imports,
        dynamicImports: dynamicImports
      };
    }
    const notUsed = new Set(Object.keys(graph2));
    for (const bundleName of Object.keys(graph2)) {
      for (const dep of graph2[bundleName].imports) {
        notUsed.delete(dep);
      }
      for (const dep of graph2[bundleName].dynamicImports) {
        notUsed.delete(dep);
      }
    }
    for (const bundleName of notUsed) {
      const bundle = graph2[bundleName];
      (null == (_c = bundle.imports) ? void 0 : _c.length) || (null == (_d = bundle.dynamicImports) ? void 0 : _d.length) || delete graph2[bundleName];
    }
    const names = Object.keys(graph2);
    const map = new Map;
    const clearTransitiveDeps = (parentDeps, bundleName, seen = new Set) => {
      const bundle = graph2[bundleName];
      for (const dep of bundle.imports) {
        parentDeps.has(dep) && parentDeps.delete(dep);
        if (!seen.has(dep)) {
          seen.add(dep);
          clearTransitiveDeps(parentDeps, dep, seen);
        }
      }
    };
    for (const bundleName of names) {
      const bundle = graph2[bundleName];
      const deps = new Set(bundle.imports);
      for (const depName of deps) {
        clearTransitiveDeps(deps, depName);
      }
      const dynDeps = new Set(bundle.dynamicImports);
      const depProbability = new Map;
      for (const depName of dynDeps) {
        clearTransitiveDeps(dynDeps, depName);
        const dep = graph2[depName];
        let probability = .5;
        probability += .08 * (dep.interactivity || 0);
        if (bundle.origins && dep.origins) {
          for (const origin of bundle.origins) {
            if (dep.origins.some((o => o.startsWith(origin)))) {
              probability += .25;
              break;
            }
          }
        }
        dep.total > slowSize && (probability += probability > .5 ? .02 : -.02);
        dep.total < 1e3 && (probability += .15);
        depProbability.set(depName, Math.min(probability, .99));
      }
      if (dynDeps.size > 0) {
        const sorted = Array.from(dynDeps).sort(((a, b) => depProbability.get(b) - depProbability.get(a)));
        let lastProbability = -1;
        for (const depName of sorted) {
          if (depProbability.get(depName) !== lastProbability) {
            lastProbability = depProbability.get(depName);
            deps.add(-Math.round(10 * lastProbability));
          }
          deps.add(depName);
        }
      }
      const index = bundleGraph.length;
      bundleGraph.push(bundleName);
      for (let i = 0; i < deps.size; i++) {
        bundleGraph.push(null);
      }
      map.set(bundleName, {
        index: index,
        deps: deps
      });
    }
    for (const bundleName of names) {
      const bundle = map.get(bundleName);
      let {index: index, deps: deps} = bundle;
      index++;
      for (const depName of deps) {
        if ("number" === typeof depName) {
          bundleGraph[index++] = depName;
          continue;
        }
        const dep = map.get(depName);
        const depIndex = dep.index;
        bundleGraph[index++] = depIndex;
      }
    }
    return bundleGraph;
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
  function createQwikPlugin(optimizerOptions = {}) {
    const id = `${Math.round(899 * Math.random()) + 100}`;
    const clientResults = new Map;
    const clientTransformedOutputs = new Map;
    const serverTransformedOutputs = new Map;
    const parentIds = new Map;
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
      outDir: "",
      assetsDir: null,
      resolveQwikBuild: true,
      entryStrategy: null,
      srcDir: null,
      srcInputs: null,
      sourcemap: !!optimizerOptions.sourcemap,
      manifestInput: null,
      manifestOutput: null,
      transformedModuleOutput: null,
      scope: null,
      devTools: {
        imageDevTools: true,
        clickToSource: [ "Alt" ]
      },
      inlineStylesUpToBytes: 2e4,
      lint: false,
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
      const optimizer2 = getOptimizer();
      return optimizer2.sys;
    };
    const getPath = () => {
      const optimizer2 = getOptimizer();
      return optimizer2.sys.path;
    };
    let devServer;
    const configureServer = server => {
      devServer = server;
    };
    const normalizeOptions = inputOpts => {
      const updatedOpts = Object.assign({}, inputOpts);
      const optimizer2 = getOptimizer();
      const path = optimizer2.sys.path;
      opts.debug = !!updatedOpts.debug;
      updatedOpts.assetsDir && (opts.assetsDir = updatedOpts.assetsDir);
      "ssr" === updatedOpts.target || "client" === updatedOpts.target || "lib" === updatedOpts.target || "test" === updatedOpts.target ? opts.target = updatedOpts.target : opts.target ||= "client";
      "lib" === opts.target ? opts.buildMode = "development" : "production" === updatedOpts.buildMode || "development" === updatedOpts.buildMode ? opts.buildMode = updatedOpts.buildMode : opts.buildMode ||= "development";
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
      "string" !== typeof opts.rootDir && (opts.rootDir ||= optimizer2.sys.cwd());
      opts.rootDir = normalizePath(path.resolve(optimizer2.sys.cwd(), opts.rootDir));
      let srcDir = normalizePath(path.resolve(opts.rootDir, SRC_DIR_DEFAULT));
      if ("string" === typeof updatedOpts.srcDir) {
        opts.srcDir = normalizePath(path.resolve(opts.rootDir, updatedOpts.srcDir));
        srcDir = opts.srcDir;
        opts.srcInputs = null;
      } else if (Array.isArray(updatedOpts.srcInputs)) {
        opts.srcInputs = [ ...updatedOpts.srcInputs ];
        opts.srcDir = null;
      } else {
        opts.srcDir ||= srcDir;
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
          opts.input ||= [ path.resolve(srcDir, "entry.ssr") ];
        } else if ("client" === opts.target) {
          opts.input ||= [ path.resolve(srcDir, "root") ];
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
            opts.input ||= [ path.resolve(srcDir, "index.ts") ];
          }
        } else {
          opts.input ||= [];
        }
        Array.isArray(opts.input) && (opts.input = opts.input.reduce(((inputs, i) => {
          let input = i;
          i.startsWith("@") || i.startsWith("~") || i.startsWith("#") || (input = normalizePath(path.resolve(opts.rootDir, i)));
          inputs.includes(input) || inputs.push(input);
          return inputs;
        }), []));
        "string" === typeof updatedOpts.outDir ? opts.outDir = normalizePath(path.resolve(opts.rootDir, normalizePath(updatedOpts.outDir))) : opts.outDir || ("ssr" === opts.target ? opts.outDir = normalizePath(path.resolve(opts.rootDir, SSR_OUT_DIR)) : "lib" === opts.target ? opts.outDir = normalizePath(path.resolve(opts.rootDir, LIB_OUT_DIR)) : opts.outDir = normalizePath(path.resolve(opts.rootDir, CLIENT_OUT_DIR)));
      }
      "function" === typeof updatedOpts.manifestOutput && (opts.manifestOutput = updatedOpts.manifestOutput);
      const clientManifest = getValidManifest(updatedOpts.manifestInput);
      clientManifest && (opts.manifestInput = clientManifest);
      "function" === typeof updatedOpts.transformedModuleOutput && (opts.transformedModuleOutput = updatedOpts.transformedModuleOutput);
      void 0 !== updatedOpts.scope && (opts.scope = updatedOpts.scope);
      "boolean" === typeof updatedOpts.resolveQwikBuild && (opts.resolveQwikBuild = updatedOpts.resolveQwikBuild);
      if ("object" === typeof updatedOpts.devTools) {
        "imageDevTools" in updatedOpts.devTools && (opts.devTools.imageDevTools = updatedOpts.devTools.imageDevTools);
        "clickToSource" in updatedOpts.devTools && (opts.devTools.clickToSource = updatedOpts.devTools.clickToSource);
      }
      opts.csr = !!updatedOpts.csr;
      "inlineStylesUpToBytes" in optimizerOptions && ("number" === typeof optimizerOptions.inlineStylesUpToBytes ? opts.inlineStylesUpToBytes = optimizerOptions.inlineStylesUpToBytes : ("number" !== typeof opts.inlineStylesUpToBytes || opts.inlineStylesUpToBytes < 0) && (opts.inlineStylesUpToBytes = 0));
      "boolean" === typeof updatedOpts.lint && (opts.lint = updatedOpts.lint);
      if ("experimental" in updatedOpts) {
        opts.experimental = void 0;
        for (const feature of updatedOpts.experimental ?? []) {
          ExperimentalFeatures[feature] ? (opts.experimental ||= {})[feature] = true : console.error(`Qwik plugin: Unknown experimental feature: ${feature}`);
        }
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
    let optimizer;
    const buildStart = async _ctx => {
      debug("buildStart()", opts.buildMode, opts.scope, opts.target, opts.rootDir, opts.srcDir);
      optimizer = getOptimizer();
      if ("node" === optimizer.sys.env && "ssr" === opts.target && opts.lint) {
        try {
          linter = await createLinter(optimizer.sys, opts.rootDir, opts.tsconfigFileNames);
        } catch {}
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
        debug(`buildStart() opts.srcInputs (${opts.srcInputs.length} files)`);
      }
      debug("transformedOutputs.clear()");
      clientTransformedOutputs.clear();
      serverTransformedOutputs.clear();
    };
    const getIsServer = viteOpts => devServer ? !!(null == viteOpts ? void 0 : viteOpts.ssr) : "ssr" === opts.target || "test" === opts.target;
    let resolveIdCount = 0;
    const resolveId = async (ctx, id2, importerId, resolveOpts) => {
      var _a;
      if (id2.startsWith("\0")) {
        return;
      }
      const count = resolveIdCount++;
      const isServer2 = getIsServer(resolveOpts);
      debug(`resolveId(${count})`, `begin ${id2} | ${isServer2 ? "server" : "client"} | ${importerId}`);
      const parsedImporterId = importerId && parseId(importerId);
      importerId = parsedImporterId && normalizePath(parsedImporterId.pathId);
      if (id2.startsWith(".") && parsedImporterId) {
        const path = getPath();
        const importerDir = path.dirname(parsedImporterId.pathId);
        importerDir && (id2 = path.resolve(importerDir, id2));
      }
      const parsedId = parseId(id2);
      const pathId = normalizePath(parsedId.pathId);
      let result;
      if (parentIds.get(pathId)) {
        debug(`resolveId(${count}) Resolved already known ${pathId}`);
        result = {
          id: pathId + parsedId.query,
          moduleSideEffects: false
        };
      } else if (pathId.endsWith(QWIK_BUILD_ID)) {
        if (opts.resolveQwikBuild) {
          debug(`resolveId(${count})`, "Resolved", QWIK_BUILD_ID);
          result = {
            id: QWIK_BUILD_ID,
            moduleSideEffects: false
          };
        }
      } else if (pathId.endsWith(QWIK_CLIENT_MANIFEST_ID)) {
        debug(`resolveId(${count})`, "Resolved", QWIK_CLIENT_MANIFEST_ID);
        result = {
          id: QWIK_CLIENT_MANIFEST_ID,
          moduleSideEffects: false
        };
      } else if (devServer || isServer2 || !pathId.endsWith(QWIK_PRELOADER_ID)) {
        const qrlMatch = null == (_a = /^(?<parent>.*\.[mc]?[jt]sx?)_(?<name>[^/]+)\.js(?<query>$|\?.*$)/.exec(id2)) ? void 0 : _a.groups;
        if (qrlMatch) {
          const {parent: parent, name: name, query: query} = qrlMatch;
          const resolvedParent = await ctx.resolve(parent, importerId, {
            skipSelf: true
          });
          if (resolvedParent) {
            const parentId = resolvedParent.id.split("?")[0];
            const isDevUrl = devServer && (null == importerId ? void 0 : importerId.endsWith(".html"));
            const resolvedId = isDevUrl ? `${parentId}_${name}.js` : pathId;
            debug(`resolveId(${count})`, `resolved to QRL ${name} of ${parentId}`);
            parentIds.set(resolvedId, parentId);
            result = {
              id: resolvedId + query,
              moduleSideEffects: false
            };
          } else {
            console.error(`resolveId(${count})`, `QRL parent ${parent} does not exist!`);
          }
        } else if (importerId) {
          const importerParentId = parentIds.get(importerId);
          if (importerParentId) {
            debug(`resolveId(${count}) end`, `resolving via ${importerParentId}`);
            return ctx.resolve(id2, importerParentId, {
              skipSelf: true
            });
          }
        }
      } else {
        debug(`resolveId(${count})`, "Resolved", QWIK_PRELOADER_ID);
        const preloader = await ctx.resolve(QWIK_PRELOADER_ID, importerId, {
          skipSelf: true
        });
        if (preloader) {
          ctx.emitFile({
            id: preloader.id,
            type: "chunk",
            preserveSignature: "allow-extension"
          });
          return preloader;
        }
      }
      debug(`resolveId(${count}) end`, (null == result ? void 0 : result.id) || result);
      return result;
    };
    let loadCount = 0;
    const load = async (ctx, id2, loadOpts) => {
      if (id2.startsWith("\0") || id2.startsWith("/@fs/")) {
        return;
      }
      const count = loadCount++;
      const isServer2 = getIsServer(loadOpts);
      if (opts.resolveQwikBuild && id2 === QWIK_BUILD_ID) {
        debug(`load(${count})`, QWIK_BUILD_ID, opts.buildMode);
        return {
          moduleSideEffects: false,
          code: getQwikBuildModule(isServer2, opts.target)
        };
      }
      if (id2 === QWIK_CLIENT_MANIFEST_ID) {
        debug(`load(${count})`, QWIK_CLIENT_MANIFEST_ID, opts.buildMode);
        return {
          moduleSideEffects: false,
          code: await getQwikServerManifestModule(isServer2)
        };
      }
      const parsedId = parseId(id2);
      id2 = normalizePath(parsedId.pathId);
      const outputs = isServer2 ? serverTransformedOutputs : clientTransformedOutputs;
      if (devServer && !outputs.has(id2)) {
        const parentId = parentIds.get(id2);
        if (parentId) {
          const parentModule = devServer.moduleGraph.getModuleById(parentId);
          if (parentModule) {
            debug(`load(${count})`, "transforming QRL parent", parentId);
            await devServer.transformRequest(parentModule.url);
            if (!outputs.has(id2)) {
              debug(`load(${count})`, `QRL segment ${id2} not found in ${parentId}`);
              return null;
            }
          } else {
            console.error(`load(${count})`, `${parentModule} does not exist!`);
          }
        }
      }
      const transformedModule = outputs.get(id2);
      if (transformedModule) {
        debug(`load(${count})`, "Found", id2);
        const {code: code, map: map, segment: segment} = transformedModule[0];
        return {
          code: code,
          map: map,
          meta: {
            segment: segment
          }
        };
      }
      debug(`load(${count})`, "Not a QRL or virtual module", id2);
      return null;
    };
    let transformCount = 0;
    const transform = async function(ctx, code, id2, transformOpts = {}) {
      var _a;
      if (id2.startsWith("\0")) {
        return;
      }
      const count = transformCount++;
      const isServer2 = getIsServer(transformOpts);
      const currentOutputs = isServer2 ? serverTransformedOutputs : clientTransformedOutputs;
      if (currentOutputs.has(id2)) {
        return;
      }
      const optimizer2 = getOptimizer();
      const path = getPath();
      const {pathId: pathId} = parseId(id2);
      const parsedPathId = path.parse(pathId);
      const dir = parsedPathId.dir;
      const base2 = parsedPathId.base;
      const ext = parsedPathId.ext.toLowerCase();
      if (ext in TRANSFORM_EXTS || TRANSFORM_REGEX.test(pathId)) {
        const strip = "client" === opts.target || "ssr" === opts.target;
        debug(`transform(${count})`, `Transforming ${id2} (for: ${isServer2 ? "server" : "client"}${strip ? ", strip" : ""})`);
        const mode = "lib" === opts.target ? "lib" : "development" === opts.buildMode ? "dev" : "prod";
        "lib" !== mode && (code = code.replaceAll(/__EXPERIMENTAL__\.(\w+)/g, ((_, feature) => {
          var _a2;
          if (null == (_a2 = opts.experimental) ? void 0 : _a2[feature]) {
            return "true";
          }
          return "false";
        })));
        let filePath = base2;
        opts.srcDir && (filePath = path.relative(opts.srcDir, pathId));
        filePath = normalizePath(filePath);
        const srcDir = opts.srcDir ? opts.srcDir : normalizePath(dir);
        const entryStrategy = opts.entryStrategy;
        let devPath;
        devServer && (devPath = null == (_a = devServer.moduleGraph.getModuleById(pathId)) ? void 0 : _a.url);
        const transformOpts2 = {
          input: [ {
            code: code,
            path: filePath,
            devPath: devPath
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
        const newOutput = optimizer2.transformModulesSync(transformOpts2);
        const module2 = newOutput.modules.find((mod => !isAdditionalFile(mod)));
        diagnosticsCallback(newOutput.diagnostics, optimizer2, srcDir);
        isServer2 ? 0 === newOutput.diagnostics.length && linter && linter.lint(ctx, code, id2) : clientResults.set(id2, newOutput);
        const deps = new Set;
        for (const mod of newOutput.modules) {
          if (mod !== module2) {
            const key = normalizePath(path.join(srcDir, mod.path));
            debug(`transform(${count})`, `segment ${key}`, mod.segment.displayName);
            parentIds.set(key, id2);
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
      debug(`transform(${count})`, "Not transforming", id2);
      return null;
    };
    const createOutputAnalyzer = rollupBundle => {
      const injections = [];
      const addInjection = b => injections.push(b);
      const generateManifest2 = async extra => {
        const optimizer2 = getOptimizer();
        const path = optimizer2.sys.path;
        const segments = Array.from(clientResults.values()).flatMap((r => r.modules)).map((mod => mod.segment)).filter((h => !!h));
        const manifest = generateManifestFromBundles(path, segments, injections, rollupBundle, opts, debug);
        extra && Object.assign(manifest, extra);
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
        generateManifest: generateManifest2
      };
    };
    const getOptions = () => opts;
    const getTransformedOutputs = () => Array.from(clientTransformedOutputs.values()).map((t => t[0]));
    const debug = (...str) => {
      opts.debug && console.debug(`[QWIK PLUGIN: ${id}]`, ...str);
    };
    const log2 = (...str) => {
      console.log(`[QWIK PLUGIN: ${id}]`, ...str);
    };
    const onDiagnostics = cb => {
      diagnosticsCallback = cb;
    };
    const normalizePath = id2 => lazyNormalizePath(id2);
    function getQwikBuildModule(isServer2, _target) {
      const isDev = "development" === opts.buildMode;
      return `// @builder.io/qwik/build\nexport const isServer = ${JSON.stringify(isServer2)};\nexport const isBrowser = ${JSON.stringify(!isServer2)};\nexport const isDev = ${JSON.stringify(isDev)};\n`;
    }
    async function getQwikServerManifestModule(isServer2) {
      const manifest = isServer2 ? opts.manifestInput : null;
      let serverManifest = null;
      (null == manifest ? void 0 : manifest.manifestHash) && (serverManifest = {
        manifestHash: manifest.manifestHash,
        injections: manifest.injections,
        bundleGraph: manifest.bundleGraph,
        mapping: manifest.mapping,
        preloader: manifest.preloader,
        core: manifest.core
      });
      return `// @qwik-client-manifest\nexport const manifest = ${JSON.stringify(serverManifest)};\n`;
    }
    function setSourceMapSupport(sourcemap) {
      opts.sourcemap = sourcemap;
    }
    function handleHotUpdate(ctx) {
      debug("handleHotUpdate()", ctx.file);
      for (const mod of ctx.modules) {
        const {id: id2} = mod;
        if (id2) {
          debug("handleHotUpdate()", `invalidate ${id2}`);
          clientResults.delete(id2);
          for (const outputs of [ clientTransformedOutputs, serverTransformedOutputs ]) {
            for (const [key, [_, parentId]] of outputs) {
              if (parentId === id2) {
                debug("handleHotUpdate()", `invalidate ${id2} segment ${key}`);
                outputs.delete(key);
                const mod2 = ctx.server.moduleGraph.getModuleById(key);
                mod2 && ctx.server.moduleGraph.invalidateModule(mod2);
              }
            }
          }
        }
      }
    }
    function manualChunks(id2, {getModuleInfo: getModuleInfo}) {
      var _a;
      if ("client" === opts.target && (id2.endsWith(QWIK_PRELOADER_REAL_ID) || "\0vite/preload-helper.js" === id2)) {
        return "qwik-preloader";
      }
      const module2 = getModuleInfo(id2);
      const segment = module2.meta.segment;
      if (segment) {
        const {hash: hash} = segment;
        const chunkName = (null == (_a = opts.entryStrategy.manual) ? void 0 : _a[hash]) || segment.entry;
        if (chunkName) {
          return chunkName;
        }
      }
      return null;
    }
    async function generateManifest(ctx, rollupBundle, bundleGraphAdders, manifestExtra) {
      var _a;
      const outputAnalyzer = createOutputAnalyzer(rollupBundle);
      const manifest = await outputAnalyzer.generateManifest(manifestExtra);
      manifest.platform = {
        ...null == manifestExtra ? void 0 : manifestExtra.platform,
        rollup: (null == (_a = ctx.meta) ? void 0 : _a.rollupVersion) || "",
        env: optimizer.sys.env,
        os: optimizer.sys.os
      };
      "node" === optimizer.sys.env && (manifest.platform.node = process.versions.node);
      const assetsDir = opts.assetsDir;
      const useAssetsDir = !!assetsDir && "_astro" !== assetsDir;
      const bundleGraph = convertManifestToBundleGraph(manifest, bundleGraphAdders);
      ctx.emitFile({
        type: "asset",
        fileName: optimizer.sys.path.join(useAssetsDir ? assetsDir : "", "build", `q-bundle-graph-${manifest.manifestHash}.json`),
        source: JSON.stringify(bundleGraph)
      });
      manifest.bundleGraph = bundleGraph;
      const manifestStr = JSON.stringify(manifest, null, "\t");
      ctx.emitFile({
        fileName: Q_MANIFEST_FILENAME,
        type: "asset",
        source: manifestStr
      });
      "function" === typeof opts.manifestOutput && await opts.manifestOutput(manifest);
      "function" === typeof opts.transformedModuleOutput && await opts.transformedModuleOutput(getTransformedOutputs());
      return manifestStr;
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
      log: log2,
      normalizeOptions: normalizeOptions,
      normalizePath: normalizePath,
      onDiagnostics: onDiagnostics,
      resolveId: resolveId,
      transform: transform,
      validateSource: validateSource,
      setSourceMapSupport: setSourceMapSupport,
      configureServer: configureServer,
      handleHotUpdate: handleHotUpdate,
      manualChunks: manualChunks,
      generateManifest: generateManifest
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
  var TRANSFORM_EXTS = {
    ".jsx": true,
    ".ts": true,
    ".tsx": true
  };
  var TRANSFORM_REGEX = /\.qwik\.[mc]?js$/;
  var QWIK_CORE_ID = "@builder.io/qwik";
  var QWIK_BUILD_ID = "@builder.io/qwik/build";
  var QWIK_JSX_RUNTIME_ID = "@builder.io/qwik/jsx-runtime";
  var QWIK_JSX_DEV_RUNTIME_ID = "@builder.io/qwik/jsx-dev-runtime";
  var QWIK_CORE_SERVER = "@builder.io/qwik/server";
  var QWIK_CLIENT_MANIFEST_ID = "@qwik-client-manifest";
  var QWIK_PRELOADER_ID = "@builder.io/qwik/preloader";
  var QWIK_PRELOADER_REAL_ID = "qwik/dist/preloader.mjs";
  var SRC_DIR_DEFAULT = "src";
  var CLIENT_OUT_DIR = "dist";
  var SSR_OUT_DIR = "server";
  var LIB_OUT_DIR = "lib";
  var Q_MANIFEST_FILENAME = "q-manifest.json";
  function qwikRollup(qwikRollupOpts = {}) {
    const qwikPlugin = createQwikPlugin(qwikRollupOpts.optimizerOptions);
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
      outputOptions: rollupOutputOpts => normalizeRollupOutputOptionsObject(qwikPlugin, rollupOutputOpts, false),
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
        "client" === opts.target && await qwikPlugin.generateManifest(this, rollupBundle);
      }
    };
    return rollupPlugin;
  }
  function normalizeRollupOutputOptions(qwikPlugin, rollupOutputOpts, useAssetsDir, outDir) {
    if (Array.isArray(rollupOutputOpts)) {
      rollupOutputOpts.length || rollupOutputOpts.push({});
      return rollupOutputOpts.map((outputOptsObj => ({
        ...normalizeRollupOutputOptionsObject(qwikPlugin, outputOptsObj, useAssetsDir),
        dir: outDir || outputOptsObj.dir
      })));
    }
    return {
      ...normalizeRollupOutputOptionsObject(qwikPlugin, rollupOutputOpts, useAssetsDir),
      dir: outDir || (null == rollupOutputOpts ? void 0 : rollupOutputOpts.dir)
    };
  }
  function normalizeRollupOutputOptionsObject(qwikPlugin, rollupOutputOptsObj, useAssetsDir) {
    const outputOpts = {
      ...rollupOutputOptsObj
    };
    const opts = qwikPlugin.getOptions();
    const optimizer = qwikPlugin.getOptimizer();
    const manualChunks = qwikPlugin.manualChunks;
    if ("client" === opts.target) {
      if (!outputOpts.assetFileNames) {
        const assetFileNames = "assets/[hash]-[name].[ext]";
        outputOpts.assetFileNames = useAssetsDir ? `${opts.assetsDir}/${assetFileNames}` : assetFileNames;
      }
      let fileName;
      fileName = "production" !== opts.buildMode || opts.debug ? chunkInfo => {
        var _a, _b;
        if (null == (_a = chunkInfo.moduleIds) ? void 0 : _a.some((id => id.endsWith("core.prod.mjs")))) {
          return "build/core.js";
        }
        if (null == (_b = chunkInfo.moduleIds) ? void 0 : _b.some((id => id.endsWith("qwik-city/lib/index.qwik.mjs")))) {
          return "build/qwik-city.js";
        }
        const path = optimizer.sys.path;
        const relativePath = path.relative(optimizer.sys.cwd(), chunkInfo.name);
        const sanitized = relativePath.replace(/^(\.\.\/)+/, "").replace(/^\/+/, "").replace(/\//g, "-");
        return `build/${sanitized}.js`;
      } : "build/q-[hash].js";
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
  var QWIK_LOADER_DEFAULT_MINIFIED = '(()=>{const t=document,e=window,n=new Set,o=new Set([t]);let r;const s=(t,e)=>Array.from(t.querySelectorAll(e)),a=t=>{const e=[];return o.forEach((n=>e.push(...s(n,t)))),e},i=t=>{w(t),s(t,"[q\\\\:shadowroot]").forEach((t=>{const e=t.shadowRoot;e&&i(e)}))},c=t=>t&&"function"==typeof t.then,l=(t,e,n=e.type)=>{a("[on"+t+"\\\\:"+n+"]").forEach((o=>b(o,t,e,n)))},f=e=>{if(void 0===e._qwikjson_){let n=(e===t.documentElement?t.body:e).lastElementChild;for(;n;){if("SCRIPT"===n.tagName&&"qwik/json"===n.getAttribute("type")){e._qwikjson_=JSON.parse(n.textContent.replace(/\\\\x3C(\\/?script)/gi,"<$1"));break}n=n.previousElementSibling}}},p=(t,e)=>new CustomEvent(t,{detail:e}),b=async(e,n,o,r=o.type)=>{const s="on"+n+":"+r;e.hasAttribute("preventdefault:"+r)&&o.preventDefault(),e.hasAttribute("stoppropagation:"+r)&&o.stopPropagation();const a=e._qc_,i=a&&a.li.filter((t=>t[0]===s));if(i&&i.length>0){for(const t of i){const n=t[1].getFn([e,o],(()=>e.isConnected))(o,e),r=o.cancelBubble;c(n)&&await n,r&&o.stopPropagation()}return}const l=e.getAttribute(s);if(l){const n=e.closest("[q\\\\:container]"),r=n.getAttribute("q:base"),s=n.getAttribute("q:version")||"unknown",a=n.getAttribute("q:manifest-hash")||"dev",i=new URL(r,t.baseURI);for(const p of l.split("\\n")){const l=new URL(p,i),b=l.href,h=l.hash.replace(/^#?([^?[|]*).*$/,"$1")||"default",q=performance.now();let _,d,y;const w=p.startsWith("#"),g={qBase:r,qManifest:a,qVersion:s,href:b,symbol:h,element:e,reqTime:q};if(w){const e=n.getAttribute("q:instance");_=(t["qFuncs_"+e]||[])[Number.parseInt(h)],_||(d="sync",y=Error("sym:"+h))}else{u("qsymbol",g);const t=l.href.split("#")[0];try{const e=import(t);f(n),_=(await e)[h],_||(d="no-symbol",y=Error(`${h} not in ${t}`))}catch(t){d||(d="async"),y=t}}if(!_){u("qerror",{importError:d,error:y,...g}),console.error(y);break}const m=t.__q_context__;if(e.isConnected)try{t.__q_context__=[e,o,l];const n=_(o,e);c(n)&&await n}catch(t){u("qerror",{error:t,...g})}finally{t.__q_context__=m}}}},u=(e,n)=>{t.dispatchEvent(p(e,n))},h=t=>t.replace(/([A-Z])/g,(t=>"-"+t.toLowerCase())),q=async t=>{let e=h(t.type),n=t.target;for(l("-document",t,e);n&&n.getAttribute;){const o=b(n,"",t,e);let r=t.cancelBubble;c(o)&&await o,r=r||t.cancelBubble||n.hasAttribute("stoppropagation:"+t.type),n=t.bubbles&&!0!==r?n.parentElement:null}},_=t=>{l("-window",t,h(t.type))},d=()=>{var s;const c=t.readyState;if(!r&&("interactive"==c||"complete"==c)&&(o.forEach(i),r=1,u("qinit"),(null!=(s=e.requestIdleCallback)?s:e.setTimeout).bind(e)((()=>u("qidle"))),n.has("qvisible"))){const t=a("[on\\\\:qvisible]"),e=new IntersectionObserver((t=>{for(const n of t)n.isIntersecting&&(e.unobserve(n.target),b(n.target,"",p("qvisible",n)))}));t.forEach((t=>e.observe(t)))}},y=(t,e,n,o=!1)=>t.addEventListener(e,n,{capture:o,passive:!1}),w=(...t)=>{for(const r of t)"string"==typeof r?n.has(r)||(o.forEach((t=>y(t,r,q,!0))),y(e,r,_,!0),n.add(r)):o.has(r)||(n.forEach((t=>y(r,t,q,!0))),o.add(r))};if(!("__q_context__"in t)){t.__q_context__=0;const r=e.qwikevents;Array.isArray(r)&&w(...r),e.qwikevents={events:n,roots:o,push:w},y(t,"readystatechange",d),d()}})()';
  var QWIK_LOADER_DEFAULT_DEBUG = '(() => {\n  const doc = document;\n  const win = window;\n  const events = /* @__PURE__ */ new Set();\n  const roots = /* @__PURE__ */ new Set([doc]);\n  let hasInitialized;\n  const nativeQuerySelectorAll = (root, selector) => Array.from(root.querySelectorAll(selector));\n  const querySelectorAll = (query) => {\n    const elements = [];\n    roots.forEach((root) => elements.push(...nativeQuerySelectorAll(root, query)));\n    return elements;\n  };\n  const findShadowRoots = (fragment) => {\n    processEventOrNode(fragment);\n    nativeQuerySelectorAll(fragment, "[q\\\\:shadowroot]").forEach((parent) => {\n      const shadowRoot = parent.shadowRoot;\n      shadowRoot && findShadowRoots(shadowRoot);\n    });\n  };\n  const isPromise = (promise) => promise && typeof promise.then === "function";\n  const broadcast = (infix, ev, type = ev.type) => {\n    querySelectorAll("[on" + infix + "\\\\:" + type + "]").forEach(\n      (el) => dispatch(el, infix, ev, type)\n    );\n  };\n  const resolveContainer = (containerEl) => {\n    if (containerEl._qwikjson_ === void 0) {\n      const parentJSON = containerEl === doc.documentElement ? doc.body : containerEl;\n      let script = parentJSON.lastElementChild;\n      while (script) {\n        if (script.tagName === "SCRIPT" && script.getAttribute("type") === "qwik/json") {\n          containerEl._qwikjson_ = JSON.parse(\n            script.textContent.replace(/\\\\x3C(\\/?script)/gi, "<$1")\n          );\n          break;\n        }\n        script = script.previousElementSibling;\n      }\n    }\n  };\n  const createEvent = (eventName, detail) => new CustomEvent(eventName, {\n    detail\n  });\n  const dispatch = async (element, onPrefix, ev, eventName = ev.type) => {\n    const attrName = "on" + onPrefix + ":" + eventName;\n    if (element.hasAttribute("preventdefault:" + eventName)) {\n      ev.preventDefault();\n    }\n    if (element.hasAttribute("stoppropagation:" + eventName)) {\n      ev.stopPropagation();\n    }\n    const ctx = element._qc_;\n    const relevantListeners = ctx && ctx.li.filter((li) => li[0] === attrName);\n    if (relevantListeners && relevantListeners.length > 0) {\n      for (const listener of relevantListeners) {\n        const results = listener[1].getFn([element, ev], () => element.isConnected)(ev, element);\n        const cancelBubble = ev.cancelBubble;\n        if (isPromise(results)) {\n          await results;\n        }\n        if (cancelBubble) {\n          ev.stopPropagation();\n        }\n      }\n      return;\n    }\n    const attrValue = element.getAttribute(attrName);\n    if (attrValue) {\n      const container = element.closest("[q\\\\:container]");\n      const qBase = container.getAttribute("q:base");\n      const qVersion = container.getAttribute("q:version") || "unknown";\n      const qManifest = container.getAttribute("q:manifest-hash") || "dev";\n      const base = new URL(qBase, doc.baseURI);\n      for (const qrl of attrValue.split("\\n")) {\n        const url = new URL(qrl, base);\n        const href = url.href;\n        const symbol = url.hash.replace(/^#?([^?[|]*).*$/, "$1") || "default";\n        const reqTime = performance.now();\n        let handler;\n        let importError;\n        let error;\n        const isSync = qrl.startsWith("#");\n        const eventData = {\n          qBase,\n          qManifest,\n          qVersion,\n          href,\n          symbol,\n          element,\n          reqTime\n        };\n        if (isSync) {\n          const hash = container.getAttribute("q:instance");\n          handler = (doc["qFuncs_" + hash] || [])[Number.parseInt(symbol)];\n          if (!handler) {\n            importError = "sync";\n            error = new Error("sym:" + symbol);\n          }\n        } else {\n          emitEvent("qsymbol", eventData);\n          const uri = url.href.split("#")[0];\n          try {\n            const module = import(\n                            uri\n            );\n            resolveContainer(container);\n            handler = (await module)[symbol];\n            if (!handler) {\n              importError = "no-symbol";\n              error = new Error(`${symbol} not in ${uri}`);\n            }\n          } catch (err) {\n            importError || (importError = "async");\n            error = err;\n          }\n        }\n        if (!handler) {\n          emitEvent("qerror", {\n            importError,\n            error,\n            ...eventData\n          });\n          console.error(error);\n          break;\n        }\n        const previousCtx = doc.__q_context__;\n        if (element.isConnected) {\n          try {\n            doc.__q_context__ = [element, ev, url];\n            const results = handler(ev, element);\n            if (isPromise(results)) {\n              await results;\n            }\n          } catch (error2) {\n            emitEvent("qerror", { error: error2, ...eventData });\n          } finally {\n            doc.__q_context__ = previousCtx;\n          }\n        }\n      }\n    }\n  };\n  const emitEvent = (eventName, detail) => {\n    doc.dispatchEvent(createEvent(eventName, detail));\n  };\n  const camelToKebab = (str) => str.replace(/([A-Z])/g, (a) => "-" + a.toLowerCase());\n  const processDocumentEvent = async (ev) => {\n    let type = camelToKebab(ev.type);\n    let element = ev.target;\n    broadcast("-document", ev, type);\n    while (element && element.getAttribute) {\n      const results = dispatch(element, "", ev, type);\n      let cancelBubble = ev.cancelBubble;\n      if (isPromise(results)) {\n        await results;\n      }\n      cancelBubble = cancelBubble || ev.cancelBubble || element.hasAttribute("stoppropagation:" + ev.type);\n      element = ev.bubbles && cancelBubble !== true ? element.parentElement : null;\n    }\n  };\n  const processWindowEvent = (ev) => {\n    broadcast("-window", ev, camelToKebab(ev.type));\n  };\n  const processReadyStateChange = () => {\n    var _a;\n    const readyState = doc.readyState;\n    if (!hasInitialized && (readyState == "interactive" || readyState == "complete")) {\n      roots.forEach(findShadowRoots);\n      hasInitialized = 1;\n      emitEvent("qinit");\n      const riC = (_a = win.requestIdleCallback) != null ? _a : win.setTimeout;\n      riC.bind(win)(() => emitEvent("qidle"));\n      if (events.has("qvisible")) {\n        const results = querySelectorAll("[on\\\\:qvisible]");\n        const observer = new IntersectionObserver((entries) => {\n          for (const entry of entries) {\n            if (entry.isIntersecting) {\n              observer.unobserve(entry.target);\n              dispatch(entry.target, "", createEvent("qvisible", entry));\n            }\n          }\n        });\n        results.forEach((el) => observer.observe(el));\n      }\n    }\n  };\n  const addEventListener = (el, eventName, handler, capture = false) => {\n    return el.addEventListener(eventName, handler, { capture, passive: false });\n  };\n  const processEventOrNode = (...eventNames) => {\n    for (const eventNameOrNode of eventNames) {\n      if (typeof eventNameOrNode === "string") {\n        if (!events.has(eventNameOrNode)) {\n          roots.forEach(\n            (root) => addEventListener(root, eventNameOrNode, processDocumentEvent, true)\n          );\n          addEventListener(win, eventNameOrNode, processWindowEvent, true);\n          events.add(eventNameOrNode);\n        }\n      } else {\n        if (!roots.has(eventNameOrNode)) {\n          events.forEach(\n            (eventName) => addEventListener(eventNameOrNode, eventName, processDocumentEvent, true)\n          );\n          roots.add(eventNameOrNode);\n        }\n      }\n    }\n  };\n  if (!("__q_context__" in doc)) {\n    doc.__q_context__ = 0;\n    const qwikevents = win.qwikevents;\n    if (Array.isArray(qwikevents)) {\n      processEventOrNode(...qwikevents);\n    }\n    win.qwikevents = {\n      events,\n      roots,\n      push: processEventOrNode\n    };\n    addEventListener(doc, "readystatechange", processReadyStateChange);\n    processReadyStateChange();\n  }\n})()';
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
    return `${string}`.toLowerCase().replace(new RegExp(/[-_]+/, "g"), " ").replace(new RegExp(/[^\w\s]/, "g"), "").replace(new RegExp(/\s+(.)(\w*)/, "g"), (($1, $22, $3) => `${$22.toUpperCase() + $3}`)).replace(new RegExp(/\w/), (s => s.toUpperCase()));
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
  var isNode = value => value && "number" === typeof value.nodeType;
  var isDocument = value => 9 === value.nodeType;
  var isElement = value => 1 === value.nodeType;
  var isQwikElement = value => {
    const nodeType = value.nodeType;
    return 1 === nodeType || 111 === nodeType;
  };
  var isNodeElement = value => {
    const nodeType = value.nodeType;
    return 1 === nodeType || 111 === nodeType || 3 === nodeType;
  };
  var isVirtualElement = value => 111 === value.nodeType;
  var isComment = value => 8 === value.nodeType;
  var qDev = false !== globalThis.qDev;
  globalThis.qInspector;
  var qSerialize = false !== globalThis.qSerialize;
  var qDynamicPlatform = false !== globalThis.qDynamicPlatform;
  var qTest = true === globalThis.qTest;
  var qRuntimeQrl = true === globalThis.qRuntimeQrl;
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
    const err = createAndLogError(qDev, message, ...optionalParams);
    debugger;
    return err;
  };
  var _printed = new Set;
  var logOnceWarn = (message, ...optionalParams) => {
    if (qDev) {
      const key = "warn" + String(message);
      if (!_printed.has(key)) {
        _printed.add(key);
        logWarn(message, ...optionalParams);
      }
    }
  };
  var logWarn = (message, ...optionalParams) => {
    qDev && console.warn("%cQWIK WARN", STYLE, message, ...printParams(optionalParams));
  };
  var tryGetContext = element => element._qc_;
  var printParams = optionalParams => {
    if (qDev) {
      return optionalParams.map((p => {
        if (isNode(p) && isElement(p)) {
          return printElement(p);
        }
        return p;
      }));
    }
    return optionalParams;
  };
  var printElement = el => {
    var _a;
    const ctx = tryGetContext(el);
    const isServer2 = (() => "undefined" !== typeof process && !!process.versions && !!process.versions.node)();
    return {
      tagName: el.tagName,
      renderQRL: null == (_a = null == ctx ? void 0 : ctx.$componentQrl$) ? void 0 : _a.getSymbol(),
      element: isServer2 ? void 0 : el,
      ctx: isServer2 ? void 0 : ctx
    };
  };
  var createAndLogError = (asyncThrow, message, ...optionalParams) => {
    const err = message instanceof Error ? message : new Error(message);
    console.error("%cQWIK ERROR", STYLE, err.message, ...printParams(optionalParams), err.stack);
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
  function assertFail(text, ...parts) {
    qDev && throwErrorAndStop(ASSERT_DISCLAIMER + text, ...parts);
  }
  function assertTrue(value1, text, ...parts) {
    if (qDev) {
      if (true === value1) {
        return;
      }
      throwErrorAndStop(ASSERT_DISCLAIMER + text, ...parts);
    }
  }
  function assertNumber(value1, text, ...parts) {
    if (qDev) {
      if ("number" === typeof value1) {
        return;
      }
      throwErrorAndStop(ASSERT_DISCLAIMER + text, ...parts);
    }
  }
  function assertString(value1, text, ...parts) {
    if (qDev) {
      if ("string" === typeof value1) {
        return;
      }
      throwErrorAndStop(ASSERT_DISCLAIMER + text, ...parts);
    }
  }
  function assertQwikElement(el) {
    if (qDev && !isQwikElement(el)) {
      console.error("Not a Qwik Element, got", el);
      throwErrorAndStop(ASSERT_DISCLAIMER + "Not a Qwik Element");
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
  var QError_verifySerializable = 3;
  var QError_qrlIsNotFunction = 10;
  var QError_immutableProps = 17;
  var QError_useInvokeContext = 20;
  var QError_qrlMissingContainer = 30;
  var QError_qrlMissingChunk = 31;
  var qError = (code, ...parts) => {
    const text = codeToText(code, ...parts);
    return logErrorAndStop(text, ...parts);
  };
  var isBrowser = (() => "undefined" !== typeof window && "undefined" !== typeof HTMLElement && !!window.document && String(HTMLElement).includes("[native code]"))();
  var isServer = !isBrowser;
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
  var toUrl = (doc2, containerEl, url) => {
    const baseURI = doc2.baseURI;
    const base2 = new URL(containerEl.getAttribute("q:base") ?? baseURI, baseURI);
    return new URL(url, base2);
  };
  var _platform = createPlatform();
  var getPlatform = () => _platform;
  var isServerPlatform = () => {
    if (qDynamicPlatform) {
      return _platform.isServer;
    }
    return false;
  };
  var isSerializableObject = v => {
    const proto = Object.getPrototypeOf(v);
    return proto === Object.prototype || null === proto;
  };
  var isObject = v => !!v && "object" === typeof v;
  var isArray = v => Array.isArray(v);
  var isString = v => "string" === typeof v;
  var isFunction = v => "function" === typeof v;
  var isPromise = value => value && "function" === typeof value.then;
  var maybeThen = (promise, thenFn) => isPromise(promise) ? promise.then(thenFn) : thenFn(promise);
  var implicit$FirstArg = fn => function(first, ...rest) {
    return fn.call(null, $2(first), ...rest);
  };
  var runtimeSymbolId = 0;
  var $2 = expression => {
    if (!qRuntimeQrl && qDev) {
      throw new Error("Optimizer should replace all usages of $() with some special syntax. If you need to create a QRL manually, use inlinedQrl() instead.");
    }
    return createQRL(null, "s" + runtimeSymbolId++, expression, null, null, null, null);
  };
  var eventQrl = qrl => qrl;
  implicit$FirstArg(eventQrl);
  var OnRenderProp = "q:renderFn";
  var QSlot = "q:slot";
  var QSlotS = "q:s";
  var QScopedStyle = "q:sstyle";
  var QInstance = "q:instance";
  var QFuncsPrefix = "qFuncs_";
  var getQFuncs = (document2, hash) => document2[QFuncsPrefix + hash] || [];
  var QLocaleAttr = "q:locale";
  var QContainerSelector = "[q\\:container]";
  var ResourceEvent = "qResource";
  var ComputedEvent = "qComputed";
  var RenderEvent = "qRender";
  var fromCamelToKebabCase = text => text.replace(/([A-Z])/g, "-$1").toLowerCase();
  var QObjectRecursive = 1;
  var QObjectImmutable = 2;
  var QOjectTargetSymbol = Symbol("proxy target");
  var QObjectFlagsSymbol = Symbol("proxy flags");
  var QObjectManagerSymbol = Symbol("proxy manager");
  var _IMMUTABLE = Symbol("IMMUTABLE");
  var _IMMUTABLE_PREFIX = "$$";
  var VIRTUAL_SYMBOL = "__virtual";
  var Q_CTX = "_qc_";
  var serializeDerivedSignalFunc = signal => {
    const fnBody = qSerialize ? signal.$funcStr$ : "null";
    assertDefined(fnBody, "If qSerialize is true then fnStr must be provided.");
    let args = "";
    for (let i = 0; i < signal.$args$.length; i++) {
      args += `p${i},`;
    }
    return `(${args})=>(${fnBody})`;
  };
  var _createSignal = (value, containerState, flags, subscriptions) => {
    const manager = containerState.$subsManager$.$createManager$(subscriptions);
    const signal = new SignalImpl(value, manager, flags);
    return signal;
  };
  var QObjectSignalFlags = Symbol("proxy manager");
  var SIGNAL_IMMUTABLE = 1;
  var SIGNAL_UNASSIGNED = 2;
  var SignalUnassignedException = Symbol("unassigned signal");
  var SignalBase = class {};
  var SignalImpl = class extends SignalBase {
    untrackedValue;
    [QObjectManagerSymbol];
    [QObjectSignalFlags]=0;
    constructor(v, manager, flags) {
      super();
      this.untrackedValue = v;
      this[QObjectManagerSymbol] = manager;
      this[QObjectSignalFlags] = flags;
    }
    valueOf() {
      if (qDev) {
        throw new TypeError("Cannot coerce a Signal, use `.value` instead");
      }
    }
    toString() {
      return `[Signal ${String(this.value)}]`;
    }
    toJSON() {
      return {
        value: this.value
      };
    }
    get value() {
      var _a;
      if (this[QObjectSignalFlags] & SIGNAL_UNASSIGNED) {
        throw SignalUnassignedException;
      }
      const sub = null == (_a = tryGetInvokeContext()) ? void 0 : _a.$subscriber$;
      sub && this[QObjectManagerSymbol].$addSub$(sub);
      return this.untrackedValue;
    }
    set value(v) {
      if (qDev) {
        if (this[QObjectSignalFlags] & SIGNAL_IMMUTABLE) {
          throw new Error("Cannot mutate immutable signal");
        }
        qSerialize && verifySerializable(v);
        const invokeCtx = tryGetInvokeContext();
        invokeCtx && (invokeCtx.$event$ === RenderEvent ? logWarn("State mutation inside render function. Use useTask$() instead.", invokeCtx.$hostElement$) : invokeCtx.$event$ === ComputedEvent ? logWarn("State mutation inside useComputed$() is an antipattern. Use useTask$() instead", invokeCtx.$hostElement$) : invokeCtx.$event$ === ResourceEvent && logWarn("State mutation inside useResource$() is an antipattern. Use useTask$() instead", invokeCtx.$hostElement$));
      }
      const manager = this[QObjectManagerSymbol];
      const oldValue = this.untrackedValue;
      if (manager && oldValue !== v) {
        this.untrackedValue = v;
        manager.$notifySubs$();
      }
    }
  };
  var SignalDerived = class extends SignalBase {
    constructor($func$, $args$, $funcStr$) {
      super();
      this.$func$ = $func$;
      this.$args$ = $args$;
      this.$funcStr$ = $funcStr$;
    }
    get value() {
      return this.$func$.apply(void 0, this.$args$);
    }
  };
  var SignalWrapper = class extends SignalBase {
    constructor(ref, prop) {
      super();
      this.ref = ref;
      this.prop = prop;
    }
    get [QObjectManagerSymbol]() {
      return getSubscriptionManager(this.ref);
    }
    get value() {
      return this.ref[this.prop];
    }
    set value(value) {
      this.ref[this.prop] = value;
    }
  };
  var isSignal = obj => obj instanceof SignalBase;
  var directGetAttribute = (el, prop) => el.getAttribute(prop);
  Symbol("ContainerState");
  var intToStr = nu => nu.toString(36);
  var strToInt = nu => parseInt(nu, 36);
  var EMPTY_ARRAY = [];
  var EMPTY_OBJ = {};
  if (qDev) {
    Object.freeze(EMPTY_ARRAY);
    Object.freeze(EMPTY_OBJ);
  }
  var createElement = (doc2, expectTag, isSvg) => {
    const el = isSvg ? doc2.createElementNS(SVG_NS, expectTag) : doc2.createElement(expectTag);
    return el;
  };
  var parseVirtualAttributes = str => {
    if (!str) {
      return {};
    }
    const attributes = str.split(" ");
    return Object.fromEntries(attributes.map((attr => {
      const index = attr.indexOf("=");
      return index >= 0 ? [ attr.slice(0, index), unescape(attr.slice(index + 1)) ] : [ attr, "" ];
    })));
  };
  var serializeVirtualAttributes = map => {
    const attributes = [];
    Object.entries(map).forEach((([key, value]) => {
      value ? attributes.push(`${key}=${escape(value)}`) : attributes.push(`${key}`);
    }));
    return attributes.join(" ");
  };
  var escape = s => s.replace(/ /g, "+");
  var unescape = s => s.replace(/\+/g, " ");
  var VIRTUAL = ":virtual";
  var VirtualElementImpl = class {
    constructor(open, close, isSvg) {
      this.open = open;
      this.close = close;
      this.isSvg = isSvg;
      const doc2 = this.ownerDocument = open.ownerDocument;
      this.$template$ = createElement(doc2, "template", false);
      this.$attributes$ = parseVirtualAttributes(open.data.slice(3));
      assertTrue(open.data.startsWith("qv "), "comment is not a qv");
      open[VIRTUAL_SYMBOL] = this;
      close[VIRTUAL_SYMBOL] = this;
      seal(this);
    }
    ownerDocument;
    _qc_=null;
    nodeType=111;
    localName=VIRTUAL;
    nodeName=VIRTUAL;
    $attributes$;
    $template$;
    insertBefore(node, ref) {
      const parent = this.parentElement;
      if (parent) {
        const ref2 = ref || this.close;
        parent.insertBefore(node, ref2);
      } else {
        this.$template$.insertBefore(node, ref);
      }
      return node;
    }
    remove() {
      const parent = this.parentElement;
      if (parent) {
        const ch = this.childNodes;
        assertEqual(this.$template$.childElementCount, 0, "children should be empty");
        parent.removeChild(this.open);
        for (let i = 0; i < ch.length; i++) {
          this.$template$.appendChild(ch[i]);
        }
        parent.removeChild(this.close);
      }
    }
    appendChild(node) {
      return this.insertBefore(node, null);
    }
    insertBeforeTo(newParent, child) {
      const ch = this.childNodes;
      newParent.insertBefore(this.open, child);
      for (const c of ch) {
        newParent.insertBefore(c, child);
      }
      newParent.insertBefore(this.close, child);
      assertEqual(this.$template$.childElementCount, 0, "children should be empty");
    }
    appendTo(newParent) {
      this.insertBeforeTo(newParent, null);
    }
    get namespaceURI() {
      var _a;
      return (null == (_a = this.parentElement) ? void 0 : _a.namespaceURI) ?? "";
    }
    removeChild(child) {
      this.parentElement ? this.parentElement.removeChild(child) : this.$template$.removeChild(child);
    }
    getAttribute(prop) {
      return this.$attributes$[prop] ?? null;
    }
    hasAttribute(prop) {
      return prop in this.$attributes$;
    }
    setAttribute(prop, value) {
      this.$attributes$[prop] = value;
      qSerialize && (this.open.data = updateComment(this.$attributes$));
    }
    removeAttribute(prop) {
      delete this.$attributes$[prop];
      qSerialize && (this.open.data = updateComment(this.$attributes$));
    }
    matches(_) {
      return false;
    }
    compareDocumentPosition(other) {
      return this.open.compareDocumentPosition(other);
    }
    closest(query) {
      const parent = this.parentElement;
      if (parent) {
        return parent.closest(query);
      }
      return null;
    }
    querySelectorAll(query) {
      const result = [];
      const ch = getChildren(this, isNodeElement);
      ch.forEach((el => {
        if (isQwikElement(el)) {
          el.matches(query) && result.push(el);
          result.concat(Array.from(el.querySelectorAll(query)));
        }
      }));
      return result;
    }
    querySelector(query) {
      for (const el of this.childNodes) {
        if (isElement(el)) {
          if (el.matches(query)) {
            return el;
          }
          const v = el.querySelector(query);
          if (null !== v) {
            return v;
          }
        }
      }
      return null;
    }
    get innerHTML() {
      return "";
    }
    set innerHTML(html) {
      const parent = this.parentElement;
      if (parent) {
        this.childNodes.forEach((a => this.removeChild(a)));
        this.$template$.innerHTML = html;
        parent.insertBefore(this.$template$.content, this.close);
      } else {
        this.$template$.innerHTML = html;
      }
    }
    get firstChild() {
      if (this.parentElement) {
        const first = this.open.nextSibling;
        if (first === this.close) {
          return null;
        }
        return first;
      }
      return this.$template$.firstChild;
    }
    get nextSibling() {
      return this.close.nextSibling;
    }
    get previousSibling() {
      return this.open.previousSibling;
    }
    get childNodes() {
      if (!this.parentElement) {
        return Array.from(this.$template$.childNodes);
      }
      const nodes = [];
      let node = this.open;
      while (node = node.nextSibling) {
        if (node === this.close) {
          break;
        }
        nodes.push(node);
      }
      return nodes;
    }
    get isConnected() {
      return this.open.isConnected;
    }
    get parentElement() {
      return this.open.parentElement;
    }
  };
  var updateComment = attributes => `qv ${serializeVirtualAttributes(attributes)}`;
  var processVirtualNodes = node => {
    if (null == node) {
      return null;
    }
    if (isComment(node)) {
      const virtual = getVirtualElement(node);
      if (virtual) {
        return virtual;
      }
    }
    return node;
  };
  var findClose = open => {
    let node = open;
    let stack = 1;
    while (node = node.nextSibling) {
      if (isComment(node)) {
        const virtual = node[VIRTUAL_SYMBOL];
        if (virtual) {
          node = virtual;
        } else if (node.data.startsWith("qv ")) {
          stack++;
        } else if ("/qv" === node.data) {
          stack--;
          if (0 === stack) {
            return node;
          }
        }
      }
    }
    assertFail("close not found");
  };
  var getVirtualElement = open => {
    var _a;
    const virtual = open[VIRTUAL_SYMBOL];
    if (virtual) {
      return virtual;
    }
    if (open.data.startsWith("qv ")) {
      const close = findClose(open);
      return new VirtualElementImpl(open, close, (null == (_a = open.parentElement) ? void 0 : _a.namespaceURI) === SVG_NS);
    }
    return null;
  };
  var mapJoin = (objects, getObjectId, sep) => {
    let output = "";
    for (const obj of objects) {
      const id = getObjectId(obj);
      if (null !== id) {
        "" !== output && (output += sep);
        output += id;
      }
    }
    return output;
  };
  var collectDeferElement = (el, collector) => {
    const ctx = tryGetContext2(el);
    if (collector.$elements$.includes(ctx)) {
      return;
    }
    collector.$elements$.push(ctx);
    if (ctx.$flags$ & HOST_FLAG_DYNAMIC) {
      collector.$prefetch$++;
      collectElementData(ctx, collector, true);
      collector.$prefetch$--;
    } else {
      collector.$deferElements$.push(ctx);
    }
  };
  var collectElementData = (elCtx, collector, dynamicCtx) => {
    if (elCtx.$props$ && !isEmptyObj(elCtx.$props$)) {
      collectValue(elCtx.$props$, collector, dynamicCtx);
      collectSubscriptions(getSubscriptionManager(elCtx.$props$), collector, dynamicCtx);
    }
    elCtx.$componentQrl$ && collectValue(elCtx.$componentQrl$, collector, dynamicCtx);
    if (elCtx.$seq$) {
      for (const obj of elCtx.$seq$) {
        collectValue(obj, collector, dynamicCtx);
      }
    }
    if (elCtx.$tasks$) {
      const map = collector.$containerState$.$subsManager$.$groupToManagers$;
      for (const obj of elCtx.$tasks$) {
        map.has(obj) && collectValue(obj, collector, dynamicCtx);
      }
    }
    if (true === dynamicCtx) {
      collectContext(elCtx, collector);
      if (elCtx.$dynamicSlots$) {
        for (const slotCtx of elCtx.$dynamicSlots$) {
          collectContext(slotCtx, collector);
        }
      }
    }
  };
  var collectContext = (elCtx, collector) => {
    while (elCtx) {
      if (elCtx.$contexts$) {
        for (const obj of elCtx.$contexts$.values()) {
          collectValue(obj, collector, true);
        }
      }
      elCtx = elCtx.$parentCtx$;
    }
  };
  var collectSubscriptions = (manager, collector, leaks) => {
    if (collector.$seen$.has(manager)) {
      return;
    }
    collector.$seen$.add(manager);
    const subs = manager.$subs$;
    assertDefined(subs, "subs must be defined");
    for (const sub of subs) {
      const type = sub[0];
      type > 0 && collectValue(sub[2], collector, leaks);
      if (true === leaks) {
        const host = sub[1];
        isNode(host) && isVirtualElement(host) ? 0 === sub[0] && collectDeferElement(host, collector) : collectValue(host, collector, true);
      }
    }
  };
  var PROMISE_VALUE = Symbol();
  var resolvePromise = promise => promise.then((value => {
    const v = {
      resolved: true,
      value: value
    };
    promise[PROMISE_VALUE] = v;
    return value;
  }), (value => {
    const v = {
      resolved: false,
      value: value
    };
    promise[PROMISE_VALUE] = v;
    return value;
  }));
  var collectValue = (obj, collector, leaks) => {
    if (null != obj) {
      const objType = typeof obj;
      switch (objType) {
       case "function":
       case "object":
        {
          if (collector.$seen$.has(obj)) {
            return;
          }
          collector.$seen$.add(obj);
          if (fastSkipSerialize(obj)) {
            collector.$objSet$.add(void 0);
            collector.$noSerialize$.push(obj);
            return;
          }
          const input = obj;
          const target = getProxyTarget(obj);
          if (target) {
            obj = target;
            const mutable = 0 === (getProxyFlags(obj) & QObjectImmutable);
            leaks && mutable && collectSubscriptions(getSubscriptionManager(input), collector, leaks);
            if (fastWeakSerialize(input)) {
              collector.$objSet$.add(obj);
              return;
            }
          }
          const collected = collectDeps(obj, collector, leaks);
          if (collected) {
            collector.$objSet$.add(obj);
            return;
          }
          if (isPromise(obj)) {
            collector.$promises$.push(resolvePromise(obj).then((value => {
              collectValue(value, collector, leaks);
            })));
            return;
          }
          if ("object" === objType) {
            if (isNode(obj)) {
              return;
            }
            if (isArray(obj)) {
              for (let i = 0; i < obj.length; i++) {
                collectValue(input[i], collector, leaks);
              }
            } else if (isSerializableObject(obj)) {
              for (const key in obj) {
                collectValue(input[key], collector, leaks);
              }
            }
          }
          break;
        }
      }
    }
    collector.$objSet$.add(obj);
  };
  var isEmptyObj = obj => 0 === Object.keys(obj).length;
  var serializeQRL = (qrl, opts = {}) => {
    var _a, _b;
    assertTrue(qSerialize, "In order to serialize a QRL, qSerialize must be true");
    assertQrl(qrl);
    let symbol = qrl.$symbol$;
    let chunk = qrl.$chunk$;
    const refSymbol = qrl.$refSymbol$ ?? symbol;
    const platform = getPlatform();
    if (platform) {
      const result = platform.chunkForSymbol(refSymbol, chunk, null == (_a = qrl.dev) ? void 0 : _a.file);
      if (result) {
        chunk = result[1];
        qrl.$refSymbol$ || (symbol = result[0]);
      } else {
        console.error("serializeQRL: Cannot resolve symbol", symbol, "in", chunk, null == (_b = qrl.dev) ? void 0 : _b.file);
      }
    }
    if (qRuntimeQrl && null == chunk) {
      chunk = "/runtimeQRL";
      symbol = "_";
    }
    if (null == chunk) {
      throw qError(QError_qrlMissingChunk, qrl.$symbol$);
    }
    chunk.startsWith("./") && (chunk = chunk.slice(2));
    if (isSyncQrl(qrl)) {
      if (opts.$containerState$) {
        const fn = qrl.resolved;
        const containerState = opts.$containerState$;
        const fnStrKey = fn.serialized || fn.toString();
        let id = containerState.$inlineFns$.get(fnStrKey);
        if (void 0 === id) {
          id = containerState.$inlineFns$.size;
          containerState.$inlineFns$.set(fnStrKey, id);
        }
        symbol = String(id);
      } else {
        throwErrorAndStop("Sync QRL without containerState");
      }
    }
    let output = `${chunk}#${symbol}`;
    const capture = qrl.$capture$;
    const captureRef = qrl.$captureRef$;
    captureRef && captureRef.length ? opts.$getObjId$ ? output += `[${mapJoin(captureRef, opts.$getObjId$, " ")}]` : opts.$addRefMap$ && (output += `[${mapJoin(captureRef, opts.$addRefMap$, " ")}]`) : capture && capture.length > 0 && (output += `[${capture.join(" ")}]`);
    return output;
  };
  var parseQRL = (qrl, containerEl) => {
    const endIdx = qrl.length;
    const hashIdx = indexOf(qrl, 0, "#");
    const captureIdx = indexOf(qrl, hashIdx, "[");
    const chunkEndIdx = Math.min(hashIdx, captureIdx);
    const chunk = qrl.substring(0, chunkEndIdx);
    const symbolStartIdx = hashIdx == endIdx ? hashIdx : hashIdx + 1;
    const symbolEndIdx = captureIdx;
    const symbol = symbolStartIdx == symbolEndIdx ? "default" : qrl.substring(symbolStartIdx, symbolEndIdx);
    const captureStartIdx = captureIdx;
    const captureEndIdx = endIdx;
    const capture = captureStartIdx === captureEndIdx ? EMPTY_ARRAY : qrl.substring(captureStartIdx + 1, captureEndIdx - 1).split(" ");
    const iQrl = createQRL(chunk, symbol, null, null, capture, null, null);
    containerEl && iQrl.$setContainer$(containerEl);
    return iQrl;
  };
  var indexOf = (text, startIdx, char) => {
    const endIdx = text.length;
    const charIdx = text.indexOf(char, startIdx == endIdx ? 0 : startIdx);
    return -1 == charIdx ? endIdx : charIdx;
  };
  var inflateQrl = (qrl, elCtx) => {
    assertDefined(qrl.$capture$, "invoke: qrl capture must be defined inside useLexicalScope()", qrl);
    return qrl.$captureRef$ = qrl.$capture$.map((idx => {
      const int = parseInt(idx, 10);
      const obj = elCtx.$refMap$[int];
      assertTrue(elCtx.$refMap$.length > int, "out of bounds inflate access", idx);
      return obj;
    }));
  };
  var getDomListeners = (elCtx, containerEl) => {
    const attributes = elCtx.$element$.attributes;
    const listeners = [];
    for (let i = 0; i < attributes.length; i++) {
      const {name: name, value: value} = attributes.item(i);
      if (name.startsWith("on:") || name.startsWith("on-window:") || name.startsWith("on-document:")) {
        const urls = value.split("\n");
        for (const url of urls) {
          const qrl = parseQRL(url, containerEl);
          qrl.$capture$ && inflateQrl(qrl, elCtx);
          listeners.push([ name, qrl ]);
        }
      }
    }
    return listeners;
  };
  var SkipRender = Symbol("skip render");
  var useSequentialScope = () => {
    const iCtx = useInvokeContext();
    const hostElement = iCtx.$hostElement$;
    const elCtx = getContext(hostElement, iCtx.$renderCtx$.$static$.$containerState$);
    const seq = elCtx.$seq$ ||= [];
    const i = iCtx.$i$++;
    const set = value => {
      qDev && qSerialize && verifySerializable(value);
      return seq[i] = value;
    };
    return {
      val: seq[i],
      set: set,
      i: i,
      iCtx: iCtx,
      elCtx: elCtx
    };
  };
  var createContextId = name => {
    assertTrue(/^[\w/.-]+$/.test(name), "Context name must only contain A-Z,a-z,0-9, _", name);
    return Object.freeze({
      id: fromCamelToKebabCase(name)
    });
  };
  var findParentCtx = (el, containerState) => {
    var _a;
    let node = el;
    let stack = 1;
    while (node && !(null == (_a = node.hasAttribute) ? void 0 : _a.call(node, "q:container"))) {
      while (node = node.previousSibling) {
        if (isComment(node)) {
          const virtual = node[VIRTUAL_SYMBOL];
          if (virtual) {
            const qtx = virtual[Q_CTX];
            if (node === virtual.open) {
              return qtx ?? getContext(virtual, containerState);
            }
            if (null == qtx ? void 0 : qtx.$parentCtx$) {
              return qtx.$parentCtx$;
            }
            node = virtual;
            continue;
          }
          if ("/qv" === node.data) {
            stack++;
          } else if (node.data.startsWith("qv ")) {
            stack--;
            if (0 === stack) {
              return getContext(getVirtualElement(node), containerState);
            }
          }
        }
      }
      node = el.parentElement;
      el = node;
    }
    return null;
  };
  var getParentProvider = (ctx, containerState) => {
    void 0 === ctx.$parentCtx$ && (ctx.$parentCtx$ = findParentCtx(ctx.$element$, containerState));
    return ctx.$parentCtx$;
  };
  var resolveContext = (context, hostCtx, containerState) => {
    var _a;
    const contextID = context.id;
    if (!hostCtx) {
      return;
    }
    let ctx = hostCtx;
    while (ctx) {
      const found = null == (_a = ctx.$contexts$) ? void 0 : _a.get(contextID);
      if (found) {
        return found;
      }
      ctx = getParentProvider(ctx, containerState);
    }
  };
  var ERROR_CONTEXT = createContextId("qk-error");
  var handleError = (err, hostElement, rCtx) => {
    const elCtx = tryGetContext2(hostElement);
    if (qDev) {
      if (!isServerPlatform() && "undefined" !== typeof document && isVirtualElement(hostElement)) {
        elCtx.$vdom$ = null;
        const errorDiv = document.createElement("errored-host");
        err && err instanceof Error && (errorDiv.props = {
          error: err
        });
        errorDiv.setAttribute("q:key", "_error_");
        errorDiv.append(...hostElement.childNodes);
        hostElement.appendChild(errorDiv);
      }
      err && err instanceof Error && ("hostElement" in err || (err.hostElement = hostElement));
      if (!isRecoverable(err)) {
        throw err;
      }
    }
    if (isServerPlatform()) {
      throw err;
    }
    {
      const errorStore = resolveContext(ERROR_CONTEXT, elCtx, rCtx.$static$.$containerState$);
      if (void 0 === errorStore) {
        throw err;
      }
      errorStore.error = err;
    }
  };
  var isRecoverable = err => {
    if (err && err instanceof Error && "plugin" in err) {
      return false;
    }
    return true;
  };
  var getOrCreateProxy = (target, containerState, flags = 0) => {
    const proxy = containerState.$proxyMap$.get(target);
    if (proxy) {
      return proxy;
    }
    0 !== flags && setObjectFlags(target, flags);
    return createProxy(target, containerState, void 0);
  };
  var createProxy = (target, containerState, subs) => {
    assertEqual(unwrapProxy(target), target, "Unexpected proxy at this location", target);
    assertTrue(!containerState.$proxyMap$.has(target), "Proxy was already created", target);
    assertTrue(isObject(target), "Target must be an object");
    assertTrue(isSerializableObject(target) || isArray(target), "Target must be a serializable object");
    const manager = containerState.$subsManager$.$createManager$(subs);
    const proxy = new Proxy(target, new ReadWriteProxyHandler(containerState, manager));
    containerState.$proxyMap$.set(target, proxy);
    return proxy;
  };
  var createPropsState = () => {
    const props = {};
    setObjectFlags(props, QObjectImmutable);
    return props;
  };
  var setObjectFlags = (obj, flags) => {
    Object.defineProperty(obj, QObjectFlagsSymbol, {
      value: flags,
      enumerable: false
    });
  };
  var ReadWriteProxyHandler = class {
    constructor($containerState$, $manager$) {
      this.$containerState$ = $containerState$;
      this.$manager$ = $manager$;
    }
    deleteProperty(target, prop) {
      if (target[QObjectFlagsSymbol] & QObjectImmutable) {
        throw qError(QError_immutableProps);
      }
      if ("string" != typeof prop || !delete target[prop]) {
        return false;
      }
      this.$manager$.$notifySubs$(isArray(target) ? void 0 : prop);
      return true;
    }
    get(target, prop) {
      var _a;
      if ("symbol" === typeof prop) {
        if (prop === QOjectTargetSymbol) {
          return target;
        }
        if (prop === QObjectManagerSymbol) {
          return this.$manager$;
        }
        return target[prop];
      }
      const flags = target[QObjectFlagsSymbol] ?? 0;
      assertNumber(flags, "flags must be an number");
      const invokeCtx = tryGetInvokeContext();
      const recursive = 0 !== (flags & QObjectRecursive);
      const immutable = 0 !== (flags & QObjectImmutable);
      const hiddenSignal = target[_IMMUTABLE_PREFIX + prop];
      let subscriber;
      let value;
      invokeCtx && (subscriber = invokeCtx.$subscriber$);
      !immutable || prop in target && !immutableValue(null == (_a = target[_IMMUTABLE]) ? void 0 : _a[prop]) || (subscriber = null);
      if (hiddenSignal) {
        assertTrue(isSignal(hiddenSignal), "$$ prop must be a signal");
        value = hiddenSignal.value;
        subscriber = null;
      } else {
        value = target[prop];
      }
      if (subscriber) {
        const isA = isArray(target);
        this.$manager$.$addSub$(subscriber, isA ? void 0 : prop);
      }
      return recursive ? wrap(value, this.$containerState$) : value;
    }
    set(target, prop, newValue) {
      if ("symbol" === typeof prop) {
        target[prop] = newValue;
        return true;
      }
      const flags = target[QObjectFlagsSymbol] ?? 0;
      assertNumber(flags, "flags must be an number");
      const immutable = 0 !== (flags & QObjectImmutable);
      if (immutable) {
        throw qError(QError_immutableProps);
      }
      const recursive = 0 !== (flags & QObjectRecursive);
      const unwrappedNewValue = recursive ? unwrapProxy(newValue) : newValue;
      if (qDev) {
        qSerialize && verifySerializable(unwrappedNewValue);
        const invokeCtx = tryGetInvokeContext();
        invokeCtx && (invokeCtx.$event$ === RenderEvent ? logError("State mutation inside render function. Move mutation to useTask$() or useVisibleTask$()", prop) : invokeCtx.$event$ === ComputedEvent ? logWarn("State mutation inside useComputed$() is an antipattern. Use useTask$() instead", invokeCtx.$hostElement$) : invokeCtx.$event$ === ResourceEvent && logWarn("State mutation inside useResource$() is an antipattern. Use useTask$() instead", invokeCtx.$hostElement$));
      }
      const isA = isArray(target);
      if (isA) {
        target[prop] = unwrappedNewValue;
        this.$manager$.$notifySubs$();
        return true;
      }
      const oldValue = target[prop];
      target[prop] = unwrappedNewValue;
      oldValue !== unwrappedNewValue && this.$manager$.$notifySubs$(prop);
      return true;
    }
    has(target, prop) {
      if (prop === QOjectTargetSymbol) {
        return true;
      }
      const invokeCtx = tryGetInvokeContext();
      if ("string" === typeof prop && invokeCtx) {
        const subscriber = invokeCtx.$subscriber$;
        if (subscriber) {
          const isA = isArray(target);
          this.$manager$.$addSub$(subscriber, isA ? void 0 : prop);
        }
      }
      const hasOwnProperty = Object.prototype.hasOwnProperty;
      if (hasOwnProperty.call(target, prop)) {
        return true;
      }
      if ("string" === typeof prop && hasOwnProperty.call(target, _IMMUTABLE_PREFIX + prop)) {
        return true;
      }
      return false;
    }
    ownKeys(target) {
      const flags = target[QObjectFlagsSymbol] ?? 0;
      assertNumber(flags, "flags must be an number");
      const immutable = 0 !== (flags & QObjectImmutable);
      if (!immutable) {
        let subscriber = null;
        const invokeCtx = tryGetInvokeContext();
        invokeCtx && (subscriber = invokeCtx.$subscriber$);
        subscriber && this.$manager$.$addSub$(subscriber);
      }
      if (isArray(target)) {
        return Reflect.ownKeys(target);
      }
      return Reflect.ownKeys(target).map((a => "string" === typeof a && a.startsWith(_IMMUTABLE_PREFIX) ? a.slice(_IMMUTABLE_PREFIX.length) : a));
    }
    getOwnPropertyDescriptor(target, prop) {
      const descriptor = Reflect.getOwnPropertyDescriptor(target, prop);
      if (isArray(target) || "symbol" === typeof prop) {
        return descriptor;
      }
      if (descriptor && !descriptor.configurable) {
        return descriptor;
      }
      return {
        enumerable: true,
        configurable: true
      };
    }
  };
  var immutableValue = value => value === _IMMUTABLE || isSignal(value);
  var wrap = (value, containerState) => {
    if (isObject(value)) {
      if (Object.isFrozen(value)) {
        return value;
      }
      const nakedValue = unwrapProxy(value);
      if (nakedValue !== value) {
        return value;
      }
      if (fastSkipSerialize(nakedValue)) {
        return value;
      }
      if (isSerializableObject(nakedValue) || isArray(nakedValue)) {
        const proxy = containerState.$proxyMap$.get(nakedValue);
        return proxy || getOrCreateProxy(nakedValue, containerState, QObjectRecursive);
      }
    }
    return value;
  };
  var SVG_NS = "http://www.w3.org/2000/svg";
  var getChildren = (elm, filter) => {
    const end = isVirtualElement(elm) ? elm.close : null;
    const nodes = [];
    let node = elm.firstChild;
    while (node = processVirtualNodes(node)) {
      filter(node) && nodes.push(node);
      node = node.nextSibling;
      if (node === end) {
        break;
      }
    }
    return nodes;
  };
  var useConstant = value => {
    const {val: val, set: set} = useSequentialScope();
    if (null != val) {
      return val;
    }
    value = isFunction(value) && !isQwikComponent(value) ? value() : value;
    return set(value);
  };
  var TaskFlagsIsTask = 2;
  var TaskFlagsIsComputed = 8;
  var TaskFlagsIsDirty = 16;
  var createComputedQrl = qrl => {
    assertQrl(qrl);
    const iCtx = useInvokeContext();
    const hostElement = iCtx.$hostElement$;
    const containerState = iCtx.$renderCtx$.$static$.$containerState$;
    const elCtx = getContext(hostElement, containerState);
    const signal = _createSignal(void 0, containerState, SIGNAL_UNASSIGNED | SIGNAL_IMMUTABLE, void 0);
    const task = new Task(TaskFlagsIsDirty | TaskFlagsIsTask | TaskFlagsIsComputed, 0, elCtx.$element$, qrl, signal);
    qrl.$resolveLazy$(containerState.$containerEl$);
    (elCtx.$tasks$ ||= []).push(task);
    waitAndRun(iCtx, (() => runComputed(task, containerState, iCtx.$renderCtx$)));
    return signal;
  };
  var useComputedQrl = qrl => useConstant((() => createComputedQrl(qrl)));
  implicit$FirstArg(useComputedQrl);
  implicit$FirstArg(createComputedQrl);
  var runComputed = (task, containerState, rCtx) => {
    assertSignal(task.$state$);
    task.$flags$ &= ~TaskFlagsIsDirty;
    cleanupTask(task);
    const hostElement = task.$el$;
    const iCtx = newInvokeContext(rCtx.$static$.$locale$, hostElement, void 0, ComputedEvent);
    iCtx.$subscriber$ = [ 0, task ];
    iCtx.$renderCtx$ = rCtx;
    const {$subsManager$: subsManager} = containerState;
    const taskFn = task.$qrl$.getFn(iCtx, (() => {
      subsManager.$clearSub$(task);
    }));
    const ok = returnValue => {
      untrack((() => {
        const signal = task.$state$;
        signal[QObjectSignalFlags] &= ~SIGNAL_UNASSIGNED;
        signal.untrackedValue = returnValue;
        signal[QObjectManagerSymbol].$notifySubs$();
      }));
    };
    const fail = reason => {
      handleError(reason, hostElement, rCtx);
    };
    try {
      return maybeThen(task.$qrl$.$resolveLazy$(containerState.$containerEl$), (() => {
        const result = taskFn();
        if (isPromise(result)) {
          const warningMessage = "useComputed$: Async functions in computed tasks are deprecated and will stop working in v2. Use useTask$ or useResource$ instead.";
          const stack = new Error(warningMessage).stack;
          if (stack) {
            const lessScaryStack = stack.replace(/^Error:\s*/, "");
            logOnceWarn(lessScaryStack);
          } else {
            logOnceWarn(warningMessage);
          }
          return result.then(ok, fail);
        }
        ok(result);
      }));
    } catch (reason) {
      fail(reason);
    }
  };
  var cleanupTask = task => {
    const destroy = task.$destroy$;
    if (destroy) {
      task.$destroy$ = void 0;
      try {
        destroy();
      } catch (err) {
        logError(err);
      }
    }
  };
  var isSubscriberDescriptor = obj => isObject(obj) && obj instanceof Task;
  var serializeTask = (task, getObjId) => {
    let value = `${intToStr(task.$flags$)} ${intToStr(task.$index$)} ${getObjId(task.$qrl$)} ${getObjId(task.$el$)}`;
    task.$state$ && (value += ` ${getObjId(task.$state$)}`);
    return value;
  };
  var parseTask = data => {
    const [flags, index, qrl, el, resource] = data.split(" ");
    return new Task(strToInt(flags), strToInt(index), el, qrl, resource);
  };
  var Task = class {
    constructor($flags$, $index$, $el$, $qrl$, $state$) {
      this.$flags$ = $flags$;
      this.$index$ = $index$;
      this.$el$ = $el$;
      this.$qrl$ = $qrl$;
      this.$state$ = $state$;
    }
  };
  function isElement2(value) {
    return isNode2(value) && 1 === value.nodeType;
  }
  function isNode2(value) {
    return value && "number" === typeof value.nodeType;
  }
  var HOST_FLAG_MOUNTED = 4;
  var HOST_FLAG_DYNAMIC = 8;
  var tryGetContext2 = element => element[Q_CTX];
  var getContext = (el, containerState) => {
    assertQwikElement(el);
    const ctx = tryGetContext2(el);
    if (ctx) {
      return ctx;
    }
    const elCtx = createContext(el);
    const elementID = directGetAttribute(el, "q:id");
    if (elementID) {
      const pauseCtx = containerState.$pauseCtx$;
      elCtx.$id$ = elementID;
      if (pauseCtx) {
        const {getObject: getObject, meta: meta, refs: refs} = pauseCtx;
        if (isElement2(el)) {
          const refMap = refs[elementID];
          if (refMap) {
            elCtx.$refMap$ = refMap.split(" ").map(getObject);
            elCtx.li = getDomListeners(elCtx, containerState.$containerEl$);
          }
        } else {
          const styleIds = el.getAttribute(QScopedStyle);
          elCtx.$scopeIds$ = styleIds ? styleIds.split("|") : null;
          const ctxMeta = meta[elementID];
          if (ctxMeta) {
            const seq = ctxMeta.s;
            const host = ctxMeta.h;
            const contexts = ctxMeta.c;
            const tasks = ctxMeta.w;
            seq && (elCtx.$seq$ = seq.split(" ").map(getObject));
            tasks && (elCtx.$tasks$ = tasks.split(" ").map(getObject));
            if (contexts) {
              elCtx.$contexts$ = new Map;
              for (const part of contexts.split(" ")) {
                const [key, value] = part.split("=");
                elCtx.$contexts$.set(key, getObject(value));
              }
            }
            if (host) {
              const [renderQrl, props] = host.split(" ");
              elCtx.$flags$ = HOST_FLAG_MOUNTED;
              renderQrl && (elCtx.$componentQrl$ = getObject(renderQrl));
              if (props) {
                const propsObj = getObject(props);
                elCtx.$props$ = propsObj;
                setObjectFlags(propsObj, QObjectImmutable);
                propsObj[_IMMUTABLE] = getImmutableFromProps(propsObj);
              } else {
                elCtx.$props$ = createProxy(createPropsState(), containerState);
              }
            }
          }
        }
      }
    }
    return elCtx;
  };
  var getImmutableFromProps = props => {
    const immutable = {};
    const target = getProxyTarget(props);
    for (const key in target) {
      key.startsWith(_IMMUTABLE_PREFIX) && (immutable[key.slice(_IMMUTABLE_PREFIX.length)] = target[key]);
    }
    return immutable;
  };
  var createContext = element => {
    const ctx = {
      $flags$: 0,
      $id$: "",
      $element$: element,
      $refMap$: [],
      li: [],
      $tasks$: null,
      $seq$: null,
      $slots$: null,
      $scopeIds$: null,
      $appendStyles$: null,
      $props$: null,
      $vdom$: null,
      $componentQrl$: null,
      $contexts$: null,
      $dynamicSlots$: null,
      $parentCtx$: void 0,
      $realParentCtx$: void 0
    };
    seal(ctx);
    element[Q_CTX] = ctx;
    return ctx;
  };
  function setLocale(locale) {
    locale;
  }
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
  var useInvokeContext = () => {
    const ctx = tryGetInvokeContext();
    if (!ctx || ctx.$event$ !== RenderEvent) {
      throw qError(QError_useInvokeContext);
    }
    assertDefined(ctx.$hostElement$, "invoke: $hostElement$ must be defined", ctx);
    assertDefined(ctx.$waitOn$, "invoke: $waitOn$ must be defined", ctx);
    assertDefined(ctx.$renderCtx$, "invoke: $renderCtx$ must be defined", ctx);
    assertDefined(ctx.$subscriber$, "invoke: $subscriber$ must be defined", ctx);
    return ctx;
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
  var waitAndRun = (ctx, callback) => {
    const waitOn = ctx.$waitOn$;
    if (0 === waitOn.length) {
      const result = callback();
      isPromise(result) && waitOn.push(result);
    } else {
      waitOn.push(Promise.all(waitOn).then(callback));
    }
  };
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
      $waitOn$: void 0,
      $subscriber$: void 0,
      $renderCtx$: void 0,
      $locale$: $locale$
    };
    seal(ctx);
    return ctx;
  };
  var untrack = fn => invoke(void 0, fn);
  var _jsxQ = (type, mutableProps, immutableProps, children, flags, key, dev) => {
    assertString(type, "jsx type must be a string");
    const processed = null == key ? null : String(key);
    const node = new JSXNodeImpl(type, mutableProps || EMPTY_OBJ, immutableProps, children, flags, processed);
    qDev && dev && (node.dev = {
      stack: (new Error).stack,
      ...dev
    });
    validateJSXNode(node);
    seal(node);
    return node;
  };
  var _jsxC = (type, mutableProps, flags, key, dev) => {
    const processed = null == key ? null : String(key);
    const props = mutableProps ?? {};
    if ("string" === typeof type && _IMMUTABLE in props) {
      const immutableProps = props[_IMMUTABLE];
      delete props[_IMMUTABLE];
      const children = props.children;
      delete props.children;
      for (const [k, v] of Object.entries(immutableProps)) {
        if (v !== _IMMUTABLE) {
          delete props[k];
          props[k] = v;
        }
      }
      return _jsxQ(type, null, props, children, flags, key, dev);
    }
    const node = new JSXNodeImpl(type, props, null, props.children, flags, processed);
    "string" === typeof type && mutableProps && delete mutableProps.children;
    qDev && dev && (node.dev = {
      stack: (new Error).stack,
      ...dev
    });
    validateJSXNode(node);
    seal(node);
    return node;
  };
  var JSXNodeImpl = class {
    constructor(type, props, immutableProps, children, flags, key = null) {
      this.type = type;
      this.props = props;
      this.immutableProps = immutableProps;
      this.children = children;
      this.flags = flags;
      this.key = key;
    }
    dev;
  };
  var Virtual = props => props.children;
  var validateJSXNode = node => {
    if (qDev) {
      const {type: type, props: props, immutableProps: immutableProps, children: children} = node;
      invoke(void 0, (() => {
        const isQwikC = isQwikComponent(type);
        if (!isString(type) && !isFunction(type)) {
          throw new Error(`The <Type> of the JSX element must be either a string or a function. Instead, it's a "${typeof type}": ${String(type)}.`);
        }
        if (children) {
          const flatChildren = isArray(children) ? children.flat() : [ children ];
          (isString(type) || isQwikC) && flatChildren.forEach((child => {
            if (!isValidJSXChild(child)) {
              const typeObj = typeof child;
              let explanation = "";
              "object" === typeObj ? explanation = (null == child ? void 0 : child.constructor) ? `it's an instance of "${null == child ? void 0 : child.constructor.name}".` : `it's a object literal: ${printObjectLiteral(child)} ` : "function" === typeObj ? explanation += `it's a function named "${child.name}".` : explanation = `it's a "${typeObj}": ${String(child)}.`;
              throw new Error(`One of the children of <${type}> is not an accepted value. JSX children must be either: string, boolean, number, <element>, Array, undefined/null, or a Promise/Signal. Instead, ${explanation}\n`);
            }
          }));
          if (isBrowser && (isFunction(type) || immutableProps)) {
            const keys2 = {};
            flatChildren.forEach((child => {
              if (isJSXNode(child) && null != child.key) {
                const key = String(child.type) + ":" + child.key;
                if (keys2[key]) {
                  const err = createJSXError("Multiple JSX sibling nodes with the same key.\nThis is likely caused by missing a custom key in a for loop", child);
                  err && (isString(child.type), logOnceWarn(err));
                } else {
                  keys2[key] = true;
                }
              }
            }));
          }
        }
        const allProps = [ ...Object.entries(props), ...immutableProps ? Object.entries(immutableProps) : [] ];
        if (!qRuntimeQrl) {
          for (const [prop, value] of allProps) {
            if (prop.endsWith("$") && value && !isQrl(value) && !Array.isArray(value)) {
              throw new Error(`The value passed in ${prop}={...}> must be a QRL, instead you passed a "${typeof value}". Make sure your ${typeof value} is wrapped with $(...), so it can be serialized. Like this:\n$(${String(value)})`);
            }
            "children" !== prop && isQwikC && value && verifySerializable(value, `The value of the JSX attribute "${prop}" can not be serialized`);
          }
        }
        if (isString(type)) {
          const hasSetInnerHTML = allProps.some((a => "dangerouslySetInnerHTML" === a[0]));
          if (hasSetInnerHTML && children) {
            const err = createJSXError(`The JSX element <${type}> can not have both 'dangerouslySetInnerHTML' and children.`, node);
            logError(err);
          }
          if (allProps.some((a => "children" === a[0]))) {
            throw new Error(`The JSX element <${type}> can not have both 'children' as a property.`);
          }
          "style" === type && children && logOnceWarn("jsx: Using <style>{content}</style> will escape the content, effectively breaking the CSS.\nIn order to disable content escaping use '<style dangerouslySetInnerHTML={content}/>'\n\nHowever, if the use case is to inject component styleContent, use 'useStyles$()' instead, it will be a lot more efficient.\nSee https://qwik.dev/docs/components/styles/#usestyles for more information.");
          "script" === type && children && logOnceWarn("jsx: Using <script>{content}<\/script> will escape the content, effectively breaking the inlined JS.\nIn order to disable content escaping use '<script dangerouslySetInnerHTML={content}/>'");
        }
      }));
    }
  };
  var printObjectLiteral = obj => `{ ${Object.keys(obj).map((key => `"${key}"`)).join(", ")} }`;
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
  var isValidJSXChild = node => {
    if (!node) {
      return true;
    }
    if (node === SkipRender) {
      return true;
    }
    if (isString(node) || "number" === typeof node || "boolean" === typeof node) {
      return true;
    }
    if (isJSXNode(node)) {
      return true;
    }
    if (isArray(node)) {
      return node.every(isValidJSXChild);
    }
    if (isSignal(node)) {
      return isValidJSXChild(node.value);
    }
    if (isPromise(node)) {
      return true;
    }
    return false;
  };
  var Fragment = props => props.children;
  var createJSXError = (message, node) => {
    const error = new Error(message);
    if (!node.dev) {
      return error;
    }
    error.stack = `JSXError: ${message}\n${filterStack(node.dev.stack, 1)}`;
    return error;
  };
  var filterStack = (stack, offset = 0) => stack.split("\n").slice(offset).join("\n");
  var componentQrl = componentQrl2 => {
    function QwikComponent(props, key, flags) {
      assertQrl(componentQrl2);
      assertNumber(flags, "The Qwik Component was not invoked correctly");
      const hash = qTest ? "sX" : componentQrl2.$hash$.slice(0, 4);
      const finalKey = hash + ":" + (key || "");
      return _jsxC(Virtual, {
        [OnRenderProp]: componentQrl2,
        [QSlot]: props[QSlot],
        [_IMMUTABLE]: props[_IMMUTABLE],
        children: props.children,
        props: props
      }, flags, finalKey);
    }
    QwikComponent[SERIALIZABLE_STATE] = [ componentQrl2 ];
    return QwikComponent;
  };
  var isQwikComponent = component => "function" == typeof component && void 0 !== component[SERIALIZABLE_STATE];
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
  var isResourceReturn = obj => isObject(obj) && "resource" === obj.__brand;
  var serializeResource = (resource, getObjId) => {
    const state = resource._state;
    return "resolved" === state ? `0 ${getObjId(resource._resolved)}` : "pending" === state ? "1" : `2 ${getObjId(resource._error)}`;
  };
  var parseResourceReturn = data => {
    const [first, id] = data.split(" ");
    const result = _createResourceReturn(void 0);
    result.value = Promise.resolve();
    if ("0" === first) {
      result._state = "resolved";
      result._resolved = id;
      result.loading = false;
    } else if ("1" === first) {
      result._state = "pending";
      result.value = new Promise((() => {}));
      result.loading = true;
    } else if ("2" === first) {
      result._state = "rejected";
      result._error = id;
      result.loading = false;
    }
    return result;
  };
  var Slot = props => _jsxC(Virtual, {
    [QSlotS]: ""
  }, 0, props.name ?? "");
  var UNDEFINED_PREFIX = "";
  function serializer(serializer2) {
    return {
      $prefixCode$: serializer2.$prefix$.charCodeAt(0),
      $prefixChar$: serializer2.$prefix$,
      $test$: serializer2.$test$,
      $serialize$: serializer2.$serialize$,
      $prepare$: serializer2.$prepare$,
      $fill$: serializer2.$fill$,
      $collect$: serializer2.$collect$,
      $subs$: serializer2.$subs$
    };
  }
  var QRLSerializer = serializer({
    $prefix$: "",
    $test$: v => isQrl(v),
    $collect$: (v, collector, leaks) => {
      if (v.$captureRef$) {
        for (const item of v.$captureRef$) {
          collectValue(item, collector, leaks);
        }
      }
      0 === collector.$prefetch$ && collector.$qrls$.push(v);
    },
    $serialize$: (obj, getObjId) => serializeQRL(obj, {
      $getObjId$: getObjId
    }),
    $prepare$: (data, containerState) => parseQRL(data, containerState.$containerEl$),
    $fill$: (qrl, getObject) => {
      if (qrl.$capture$ && qrl.$capture$.length > 0) {
        qrl.$captureRef$ = qrl.$capture$.map(getObject);
        qrl.$capture$ = null;
      }
    }
  });
  var TaskSerializer = serializer({
    $prefix$: "",
    $test$: v => isSubscriberDescriptor(v),
    $collect$: (v, collector, leaks) => {
      collectValue(v.$qrl$, collector, leaks);
      if (v.$state$) {
        collectValue(v.$state$, collector, leaks);
        true === leaks && v.$state$ instanceof SignalImpl && collectSubscriptions(v.$state$[QObjectManagerSymbol], collector, true);
      }
    },
    $serialize$: (obj, getObjId) => serializeTask(obj, getObjId),
    $prepare$: data => parseTask(data),
    $fill$: (task, getObject) => {
      task.$el$ = getObject(task.$el$);
      task.$qrl$ = getObject(task.$qrl$);
      task.$state$ && (task.$state$ = getObject(task.$state$));
    }
  });
  var ResourceSerializer = serializer({
    $prefix$: "",
    $test$: v => isResourceReturn(v),
    $collect$: (obj, collector, leaks) => {
      collectValue(obj.value, collector, leaks);
      collectValue(obj._resolved, collector, leaks);
    },
    $serialize$: (obj, getObjId) => serializeResource(obj, getObjId),
    $prepare$: data => parseResourceReturn(data),
    $fill$: (resource, getObject) => {
      if ("resolved" === resource._state) {
        resource._resolved = getObject(resource._resolved);
        resource.value = Promise.resolve(resource._resolved);
      } else if ("rejected" === resource._state) {
        const p = Promise.reject(resource._error);
        p.catch((() => null));
        resource._error = getObject(resource._error);
        resource.value = p;
      }
    }
  });
  var URLSerializer = serializer({
    $prefix$: "",
    $test$: v => v instanceof URL,
    $serialize$: obj => obj.href,
    $prepare$: data => new URL(data)
  });
  var DateSerializer = serializer({
    $prefix$: "",
    $test$: v => v instanceof Date,
    $serialize$: obj => obj.toISOString(),
    $prepare$: data => new Date(data)
  });
  var RegexSerializer = serializer({
    $prefix$: "",
    $test$: v => v instanceof RegExp,
    $serialize$: obj => `${obj.flags} ${obj.source}`,
    $prepare$: data => {
      const space = data.indexOf(" ");
      const source = data.slice(space + 1);
      const flags = data.slice(0, space);
      return new RegExp(source, flags);
    }
  });
  var ErrorSerializer = serializer({
    $prefix$: "",
    $test$: v => v instanceof Error,
    $serialize$: obj => obj.message,
    $prepare$: text => {
      const err = new Error(text);
      err.stack = void 0;
      return err;
    }
  });
  var DocumentSerializer = serializer({
    $prefix$: "",
    $test$: v => !!v && "object" === typeof v && isDocument(v),
    $prepare$: (_, _c, doc2) => doc2
  });
  var SERIALIZABLE_STATE = Symbol("serializable-data");
  var ComponentSerializer = serializer({
    $prefix$: "",
    $test$: obj => isQwikComponent(obj),
    $serialize$: (obj, getObjId) => {
      const [qrl] = obj[SERIALIZABLE_STATE];
      return serializeQRL(qrl, {
        $getObjId$: getObjId
      });
    },
    $prepare$: (data, containerState) => {
      const qrl = parseQRL(data, containerState.$containerEl$);
      return componentQrl(qrl);
    },
    $fill$: (component, getObject) => {
      var _a;
      const [qrl] = component[SERIALIZABLE_STATE];
      if (null == (_a = qrl.$capture$) ? void 0 : _a.length) {
        qrl.$captureRef$ = qrl.$capture$.map(getObject);
        qrl.$capture$ = null;
      }
    }
  });
  var DerivedSignalSerializer = serializer({
    $prefix$: "",
    $test$: obj => obj instanceof SignalDerived,
    $collect$: (obj, collector, leaks) => {
      if (obj.$args$) {
        for (const arg of obj.$args$) {
          collectValue(arg, collector, leaks);
        }
      }
    },
    $serialize$: (signal, getObjID, collector) => {
      const serialized = serializeDerivedSignalFunc(signal);
      let index = collector.$inlinedFunctions$.indexOf(serialized);
      if (index < 0) {
        index = collector.$inlinedFunctions$.length;
        collector.$inlinedFunctions$.push(serialized);
      }
      return mapJoin(signal.$args$, getObjID, " ") + " @" + intToStr(index);
    },
    $prepare$: data => {
      const ids = data.split(" ");
      const args = ids.slice(0, -1);
      const fn = ids[ids.length - 1];
      return new SignalDerived(fn, args, fn);
    },
    $fill$: (fn, getObject) => {
      assertString(fn.$func$, "fn.$func$ should be a string");
      fn.$func$ = getObject(fn.$func$);
      fn.$args$ = fn.$args$.map(getObject);
    }
  });
  var SignalSerializer = serializer({
    $prefix$: "",
    $test$: v => v instanceof SignalImpl,
    $collect$: (obj, collector, leaks) => {
      collectValue(obj.untrackedValue, collector, leaks);
      const mutable = 0 === (obj[QObjectSignalFlags] & SIGNAL_IMMUTABLE);
      true === leaks && mutable && collectSubscriptions(obj[QObjectManagerSymbol], collector, true);
      return obj;
    },
    $serialize$: (obj, getObjId) => getObjId(obj.untrackedValue),
    $prepare$: (data, containerState) => {
      var _a;
      return new SignalImpl(data, null == (_a = null == containerState ? void 0 : containerState.$subsManager$) ? void 0 : _a.$createManager$(), 0);
    },
    $subs$: (signal, subs) => {
      signal[QObjectManagerSymbol].$addSubs$(subs);
    },
    $fill$: (signal, getObject) => {
      signal.untrackedValue = getObject(signal.untrackedValue);
    }
  });
  var SignalWrapperSerializer = serializer({
    $prefix$: "",
    $test$: v => v instanceof SignalWrapper,
    $collect$(obj, collector, leaks) {
      collectValue(obj.ref, collector, leaks);
      if (fastWeakSerialize(obj.ref)) {
        const localManager = getSubscriptionManager(obj.ref);
        isTreeShakeable(collector.$containerState$.$subsManager$, localManager, leaks) && collectValue(obj.ref[obj.prop], collector, leaks);
      }
      return obj;
    },
    $serialize$: (obj, getObjId) => `${getObjId(obj.ref)} ${obj.prop}`,
    $prepare$: data => {
      const [id, prop] = data.split(" ");
      return new SignalWrapper(id, prop);
    },
    $fill$: (signal, getObject) => {
      signal.ref = getObject(signal.ref);
    }
  });
  var NoFiniteNumberSerializer = serializer({
    $prefix$: "",
    $test$: v => "number" === typeof v,
    $serialize$: v => String(v),
    $prepare$: data => Number(data)
  });
  var URLSearchParamsSerializer = serializer({
    $prefix$: "",
    $test$: v => v instanceof URLSearchParams,
    $serialize$: obj => obj.toString(),
    $prepare$: data => new URLSearchParams(data)
  });
  var FormDataSerializer = serializer({
    $prefix$: "",
    $test$: v => "undefined" !== typeof FormData && v instanceof globalThis.FormData,
    $serialize$: formData => {
      const array = [];
      formData.forEach(((value, key) => {
        "string" === typeof value ? array.push([ key, value ]) : array.push([ key, value.name ]);
      }));
      return JSON.stringify(array);
    },
    $prepare$: data => {
      const array = JSON.parse(data);
      const formData = new FormData;
      for (const [key, value] of array) {
        formData.append(key, value);
      }
      return formData;
    }
  });
  var JSXNodeSerializer = serializer({
    $prefix$: "",
    $test$: v => isJSXNode(v),
    $collect$: (node, collector, leaks) => {
      collectValue(node.children, collector, leaks);
      collectValue(node.props, collector, leaks);
      collectValue(node.immutableProps, collector, leaks);
      collectValue(node.key, collector, leaks);
      let type = node.type;
      type === Slot ? type = ":slot" : type === Fragment && (type = ":fragment");
      collectValue(type, collector, leaks);
    },
    $serialize$: (node, getObjID) => {
      let type = node.type;
      type === Slot ? type = ":slot" : type === Fragment && (type = ":fragment");
      return `${getObjID(type)} ${getObjID(node.props)} ${getObjID(node.immutableProps)} ${getObjID(node.key)} ${getObjID(node.children)} ${node.flags}`;
    },
    $prepare$: data => {
      const [type, props, immutableProps, key, children, flags] = data.split(" ");
      const node = new JSXNodeImpl(type, props, immutableProps, children, parseInt(flags, 10), key);
      return node;
    },
    $fill$: (node, getObject) => {
      node.type = getResolveJSXType(getObject(node.type));
      node.props = getObject(node.props);
      node.immutableProps = getObject(node.immutableProps);
      node.key = getObject(node.key);
      node.children = getObject(node.children);
    }
  });
  var BigIntSerializer = serializer({
    $prefix$: "",
    $test$: v => "bigint" === typeof v,
    $serialize$: v => v.toString(),
    $prepare$: data => BigInt(data)
  });
  var Uint8ArraySerializer = serializer({
    $prefix$: "",
    $test$: v => v instanceof Uint8Array,
    $serialize$: v => {
      let buf = "";
      for (const c of v) {
        buf += String.fromCharCode(c);
      }
      return btoa(buf).replace(/=+$/, "");
    },
    $prepare$: data => {
      const buf = atob(data);
      const bytes = new Uint8Array(buf.length);
      let i = 0;
      for (const s of buf) {
        bytes[i++] = s.charCodeAt(0);
      }
      return bytes;
    },
    $fill$: void 0
  });
  var DATA = Symbol();
  var SetSerializer = serializer({
    $prefix$: "",
    $test$: v => v instanceof Set,
    $collect$: (set, collector, leaks) => {
      set.forEach((value => collectValue(value, collector, leaks)));
    },
    $serialize$: (v, getObjID) => Array.from(v).map(getObjID).join(" "),
    $prepare$: data => {
      const set = new Set;
      set[DATA] = data;
      return set;
    },
    $fill$: (set, getObject) => {
      const data = set[DATA];
      set[DATA] = void 0;
      assertString(data, "SetSerializer should be defined");
      const items = 0 === data.length ? [] : data.split(" ");
      for (const id of items) {
        set.add(getObject(id));
      }
    }
  });
  var MapSerializer = serializer({
    $prefix$: "",
    $test$: v => v instanceof Map,
    $collect$: (map, collector, leaks) => {
      map.forEach(((value, key) => {
        collectValue(value, collector, leaks);
        collectValue(key, collector, leaks);
      }));
    },
    $serialize$: (map, getObjID) => {
      const result = [];
      map.forEach(((value, key) => {
        result.push(getObjID(key) + " " + getObjID(value));
      }));
      return result.join(" ");
    },
    $prepare$: data => {
      const set = new Map;
      set[DATA] = data;
      return set;
    },
    $fill$: (set, getObject) => {
      const data = set[DATA];
      set[DATA] = void 0;
      assertString(data, "SetSerializer should be defined");
      const items = 0 === data.length ? [] : data.split(" ");
      assertTrue(items.length % 2 === 0, "MapSerializer should have even number of items");
      for (let i = 0; i < items.length; i += 2) {
        set.set(getObject(items[i]), getObject(items[i + 1]));
      }
    }
  });
  var StringSerializer = serializer({
    $prefix$: "",
    $test$: v => !!getSerializer(v) || v === UNDEFINED_PREFIX,
    $serialize$: v => v,
    $prepare$: data => data
  });
  var serializers = [ QRLSerializer, TaskSerializer, ResourceSerializer, URLSerializer, DateSerializer, RegexSerializer, ErrorSerializer, DocumentSerializer, ComponentSerializer, DerivedSignalSerializer, SignalSerializer, SignalWrapperSerializer, NoFiniteNumberSerializer, URLSearchParamsSerializer, FormDataSerializer, JSXNodeSerializer, BigIntSerializer, SetSerializer, MapSerializer, StringSerializer, Uint8ArraySerializer ];
  var serializerByPrefix = (() => {
    const serializerByPrefix2 = [];
    serializers.forEach((s => {
      const prefix = s.$prefixCode$;
      while (serializerByPrefix2.length < prefix) {
        serializerByPrefix2.push(void 0);
      }
      serializerByPrefix2.push(s);
    }));
    return serializerByPrefix2;
  })();
  function getSerializer(obj) {
    if ("string" === typeof obj) {
      const prefix = obj.charCodeAt(0);
      if (prefix < serializerByPrefix.length) {
        return serializerByPrefix[prefix];
      }
    }
    return;
  }
  var collectorSerializers = serializers.filter((a => a.$collect$));
  var canSerialize = obj => {
    for (const s of serializers) {
      if (s.$test$(obj)) {
        return true;
      }
    }
    return false;
  };
  var collectDeps = (obj, collector, leaks) => {
    for (const s of collectorSerializers) {
      if (s.$test$(obj)) {
        s.$collect$(obj, collector, leaks);
        return true;
      }
    }
    return false;
  };
  var isTreeShakeable = (manager, target, leaks) => {
    if ("boolean" === typeof leaks) {
      return leaks;
    }
    const localManager = manager.$groupToManagers$.get(leaks);
    if (localManager && localManager.length > 0) {
      if (1 === localManager.length) {
        return localManager[0] !== target;
      }
      return true;
    }
    return false;
  };
  var getResolveJSXType = type => {
    if (":slot" === type) {
      return Slot;
    }
    if (":fragment" === type) {
      return Fragment;
    }
    return type;
  };
  var verifySerializable = (value, preMessage) => {
    const seen = new Set;
    return _verifySerializable(value, seen, "_", preMessage);
  };
  var _verifySerializable = (value, seen, ctx, preMessage) => {
    const unwrapped = unwrapProxy(value);
    if (null == unwrapped) {
      return value;
    }
    if (shouldSerialize(unwrapped)) {
      if (seen.has(unwrapped)) {
        return value;
      }
      seen.add(unwrapped);
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
  var weakSerializeSet = new WeakSet;
  var shouldSerialize = obj => {
    if (isObject(obj) || isFunction(obj)) {
      return !noSerializeSet.has(obj);
    }
    return true;
  };
  var fastSkipSerialize = obj => noSerializeSet.has(obj);
  var fastWeakSerialize = obj => weakSerializeSet.has(obj);
  var unwrapProxy = proxy => isObject(proxy) ? getProxyTarget(proxy) ?? proxy : proxy;
  var getProxyTarget = obj => obj[QOjectTargetSymbol];
  var getSubscriptionManager = obj => obj[QObjectManagerSymbol];
  var getProxyFlags = obj => obj[QObjectFlagsSymbol];
  var doc = isBrowser ? document : void 0;
  var modulePreloadStr = "modulepreload";
  var preloadStr = "preload";
  var config = {
    t: 0,
    o: 25,
    l: .65
  };
  var rel = isBrowser && doc.createElement("link").relList.supports(modulePreloadStr) ? modulePreloadStr : preloadStr;
  var loadStart = Date.now();
  var isJSRegex = /\.[mc]?js$/;
  var BundleImportState_None = 0;
  var BundleImportState_Queued = 1;
  var BundleImportState_Preload = 2;
  var BundleImportState_Alias = 3;
  var BundleImportState_Loaded = 4;
  var bundles = new Map;
  var queueDirty;
  var preloadCount = 0;
  var queue = [];
  var log = (...e) => {
    console.log(`Preloader ${Date.now() - loadStart}ms ${preloadCount}/${queue.length} queued>`, ...e);
  };
  var sortQueue = () => {
    if (queueDirty) {
      queue.sort(((e, t) => e.u - t.u));
      queueDirty = 0;
    }
  };
  var trigger = () => {
    if (!queue.length) {
      return;
    }
    sortQueue();
    while (queue.length) {
      const e = queue[0];
      const t = e.u;
      const o = 1 - t;
      const n = graph ? Math.max(1, config.o * o) : 2;
      if (!(o >= .99 || preloadCount < n)) {
        break;
      }
      queue.shift();
      preloadOne(e);
    }
    if (config.t && !queue.length) {
      const e = [ ...bundles.values() ].filter((e2 => e2.i > BundleImportState_None));
      const t = e.reduce(((e2, t2) => e2 + t2.p), 0);
      const o = e.reduce(((e2, t2) => e2 + t2.$), 0);
      log(`>>>> done ${e.length}/${bundles.size} total: ${t}ms waited, ${o}ms loaded`);
    }
  };
  var preloadOne = e => {
    if (e.i >= BundleImportState_Preload) {
      return;
    }
    preloadCount++;
    const t = Date.now();
    e.p = t - e.m;
    e.i = BundleImportState_Preload;
    config.t && log(`<< load ${Math.round(100 * (1 - e.u))}% after ${e.p}ms`, e.B);
    const o = doc.createElement("link");
    o.href = new URL(`${base}${e.B}`, doc.baseURI).toString();
    o.rel = rel;
    o.as = "script";
    o.onload = o.onerror = () => {
      preloadCount--;
      const n = Date.now();
      e.$ = n - t;
      e.i = BundleImportState_Loaded;
      config.t && log(`>> done after ${e.$}ms`, e.B);
      o.remove();
      trigger();
    };
    doc.head.appendChild(o);
  };
  var adjustProbabilities = (e, t, o) => {
    if (null == o ? void 0 : o.has(e)) {
      return;
    }
    const n = e.u;
    e.u = t;
    if (n - e.u < .01) {
      return;
    }
    if (null != base && e.i < BundleImportState_Preload && e.u < config.l) {
      if (e.i === BundleImportState_None) {
        e.i = BundleImportState_Queued;
        queue.push(e);
        config.t && log(`queued ${Math.round(100 * (1 - e.u))}%`, e.B);
      }
      queueDirty = 1;
    }
    if (e.h) {
      o || (o = new Set);
      o.add(e);
      const t2 = 1 - e.u;
      for (const n2 of e.h) {
        const e2 = getBundle(n2.B);
        if (0 === e2.u) {
          continue;
        }
        let r;
        if (n2.S > .5 && (1 === t2 || t2 >= .99 && depsCount < 100)) {
          depsCount++;
          r = Math.min(.01, 1 - n2.S);
        } else {
          const o2 = 1 - n2.S * t2;
          const l = n2.q;
          const s = o2 / l;
          r = Math.max(.02, e2.u * s);
          n2.q = s;
        }
        adjustProbabilities(e2, r, o);
      }
    }
  };
  var handleBundle = (e, t) => {
    const o = getBundle(e);
    o && o.u > t && adjustProbabilities(o, t);
  };
  var depsCount;
  var preload = (e, t) => {
    if (!(null == e ? void 0 : e.length)) {
      return;
    }
    depsCount = 0;
    let o = t ? 1 - t : .4;
    if (Array.isArray(e)) {
      for (let t2 = e.length - 1; t2 >= 0; t2--) {
        const n = e[t2];
        "number" === typeof n ? o = 1 - n / 10 : handleBundle(n, o);
      }
    } else {
      handleBundle(e, o);
    }
    isBrowser && trigger();
  };
  isBrowser && document.addEventListener("qsymbol", (e => {
    const {symbol: t, href: o} = e.detail;
    if (o) {
      const e2 = t.slice(t.lastIndexOf("_") + 1);
      preload(e2, 1);
    }
  }));
  var base;
  var graph;
  var makeBundle = (e, t) => ({
    B: e,
    i: isJSRegex.test(e) ? BundleImportState_None : BundleImportState_Alias,
    h: t,
    u: 1,
    m: Date.now(),
    p: 0,
    $: 0
  });
  var getBundle = e => {
    let t = bundles.get(e);
    if (!t) {
      let o;
      if (graph) {
        o = graph.get(e);
        if (!o) {
          return;
        }
        o.length || (o = void 0);
      }
      t = makeBundle(e, o);
      bundles.set(e, t);
    }
    return t;
  };
  var isQrl = value => "function" === typeof value && "function" === typeof value.getSymbol;
  var SYNC_QRL = "<sync>";
  var isSyncQrl = value => isQrl(value) && value.$symbol$ == SYNC_QRL;
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
          const prevQrl = context.$qrl$;
          context.$qrl$ = qrl;
          const prevEvent = context.$event$;
          void 0 === context.$event$ && (context.$event$ = this);
          try {
            return fn.apply(this, args);
          } finally {
            context.$qrl$ = prevQrl;
            context.$event$ = prevEvent;
          }
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
        const hash2 = _containerEl.getAttribute(QInstance);
        const doc2 = _containerEl.ownerDocument;
        const qFuncs = getQFuncs(doc2, hash2);
        return qrl.resolved = symbolRef = qFuncs[Number(symbol)];
      }
      isBrowser && chunk && preload(chunk, 1);
      const start = now();
      const ctx = tryGetInvokeContext();
      if (null !== symbolFn) {
        symbolRef = symbolFn().then((module2 => qrl.resolved = symbolRef = wrapFn(module2[symbol])));
      } else {
        const imported = getPlatform().importSymbol(_containerEl, chunk, symbol);
        symbolRef = maybeThen(imported, (ref => qrl.resolved = symbolRef = wrapFn(ref)));
      }
      "object" === typeof symbolRef && isPromise(symbolRef) && symbolRef.then((() => emitUsedSymbol(symbol, null == ctx ? void 0 : ctx.$element$, start)), (err => {
        console.error(`qrl ${symbol} failed to load`, err);
        symbolRef = null;
      }));
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
        return invoke.call(this, context, f, ...args);
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
    qDev && seal(qrl);
    isBrowser && resolvedSymbol && preload(resolvedSymbol, .8);
    return qrl;
  };
  var getSymbolHash2 = symbolName => {
    const index = symbolName.lastIndexOf("_");
    if (index > -1) {
      return symbolName.slice(index + 1);
    }
    return symbolName;
  };
  function assertQrl(qrl) {
    if (qDev && !isQrl(qrl)) {
      throw new Error("Not a QRL");
    }
  }
  function assertSignal(obj) {
    if (qDev && !isSignal(obj)) {
      throw new Error("Not a Signal");
    }
  }
  var EMITTED = new Set;
  var emitUsedSymbol = (symbol, element, reqTime) => {
    if (!EMITTED.has(symbol)) {
      EMITTED.add(symbol);
      emitEvent2("qsymbol", {
        symbol: symbol,
        element: element,
        reqTime: reqTime
      });
    }
  };
  var emitEvent2 = (eventName, detail) => {
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
  var click_to_component_default = "<style>\n  #qwik-inspector-overlay {\n    position: fixed;\n    background: rgba(24, 182, 246, 0.27);\n    pointer-events: none;\n    box-sizing: border-box;\n    border: 2px solid rgba(172, 126, 244, 0.46);\n    border-radius: 4px;\n    contain: strict;\n    cursor: pointer;\n    z-index: 999999;\n  }\n  #qwik-inspector-info-popup {\n    position: fixed;\n    bottom: 10px;\n    right: 10px;\n    font-family: monospace;\n    background: #000000c2;\n    color: white;\n    padding: 10px 20px;\n    border-radius: 8px;\n    box-shadow:\n      0 20px 25px -5px rgb(0 0 0 / 34%),\n      0 8px 10px -6px rgb(0 0 0 / 24%);\n    backdrop-filter: blur(4px);\n    -webkit-animation: fadeOut 0.3s 3s ease-in-out forwards;\n    animation: fadeOut 0.3s 3s ease-in-out forwards;\n    z-index: 999999;\n    contain: layout;\n  }\n  #qwik-inspector-info-popup p {\n    margin: 0px;\n  }\n  @-webkit-keyframes fadeOut {\n    0% {\n      opacity: 1;\n    }\n    100% {\n      opacity: 0;\n    }\n  }\n\n  @keyframes fadeOut {\n    0% {\n      opacity: 1;\n    }\n    100% {\n      opacity: 0;\n      visibility: hidden;\n    }\n  }\n</style>\n<div id=\"qwik-inspector-info-popup\" aria-hidden=\"true\">Click-to-Source</div>\n<script>\n  (function () {\n    const inspectAttribute = 'data-qwik-inspector';\n    const hotKeys = globalThis.qwikdevtools.hotKeys;\n    const srcDir = globalThis.qwikdevtools.srcDir;\n    document.querySelector('#qwik-inspector-info-popup').textContent =\n      `Click-to-Source: ${hotKeys.join(' + ')}`;\n    console.debug(\n      '%c🔍 Qwik Click-To-Source',\n      'background: #564CE0; color: white; padding: 2px 3px; border-radius: 2px; font-size: 0.8em;',\n      `Hold-press the '${hotKeys.join(' + ')}' key${\n        (hotKeys.length > 1 && 's') || ''\n      } and click a component to jump directly to the source code in your IDE!`\n    );\n    window.__qwik_inspector_state = {\n      pressedKeys: new Set(),\n    };\n    const origin = 'http://local.local';\n    const body = document.body;\n    const overlay = document.createElement('div');\n    overlay.id = 'qwik-inspector-overlay';\n    overlay.setAttribute('aria-hidden', 'true');\n    body.appendChild(overlay);\n\n    function findContainer(el) {\n      if (el && el instanceof Element) {\n        return el.closest(`[${inspectAttribute}]`);\n      }\n      return null;\n    }\n\n    document.addEventListener(\n      'keydown',\n      (event) => {\n        window.__qwik_inspector_state.pressedKeys.add(event.code);\n        updateOverlay();\n      },\n      { capture: true }\n    );\n\n    document.addEventListener(\n      'keyup',\n      (event) => {\n        window.__qwik_inspector_state.pressedKeys.delete(event.code);\n        updateOverlay();\n      },\n      { capture: true }\n    );\n\n    window.addEventListener(\n      'blur',\n      (event) => {\n        window.__qwik_inspector_state.pressedKeys.clear();\n        updateOverlay();\n      },\n      { capture: true }\n    );\n\n    document.addEventListener(\n      'mouseover',\n      (event) => {\n        const target = findContainer(event.target);\n        if (target) {\n          window.__qwik_inspector_state.hoveredElement = target;\n        } else {\n          window.__qwik_inspector_state.hoveredElement = undefined;\n        }\n        updateOverlay();\n      },\n      { capture: true }\n    );\n\n    document.addEventListener(\n      'click',\n      (event) => {\n        if (isActive()) {\n          window.__qwik_inspector_state.pressedKeys.clear();\n          const target = findContainer(event.target);\n          if (target) {\n            event.preventDefault();\n            const inspectUrl = target.getAttribute(inspectAttribute);\n            if (inspectUrl !== 'false') {\n              body.style.setProperty('cursor', 'progress');\n              qwikOpenInEditor(inspectUrl);\n            }\n          }\n        }\n      },\n      { capture: true }\n    );\n\n    globalThis.qwikOpenInEditor = function (path) {\n      const isWindows = navigator.platform.includes('Win');\n      const resolvedURL = new URL(path, isWindows ? origin : srcDir);\n      if (resolvedURL.origin === origin) {\n        const params = new URLSearchParams();\n        const prefix = isWindows ? srcDir : '';\n        params.set('file', prefix + resolvedURL.pathname);\n        fetch('/__open-in-editor?' + params.toString());\n      } else {\n        location.href = resolvedURL.href;\n      }\n    };\n    document.addEventListener(\n      'contextmenu',\n      (event) => {\n        if (isActive()) {\n          window.__qwik_inspector_state.pressedKeys.clear();\n          const target = findContainer(event.target);\n          if (target) {\n            event.preventDefault();\n          }\n        }\n      },\n      { capture: true }\n    );\n\n    function updateOverlay() {\n      const hoverElement = window.__qwik_inspector_state.hoveredElement;\n      if (hoverElement && isActive()) {\n        const rect = hoverElement.getBoundingClientRect();\n        overlay.style.setProperty('height', rect.height + 'px');\n        overlay.style.setProperty('width', rect.width + 'px');\n        overlay.style.setProperty('top', rect.top + 'px');\n        overlay.style.setProperty('left', rect.left + 'px');\n        overlay.style.setProperty('visibility', 'visible');\n        body.style.setProperty('cursor', 'pointer');\n      } else {\n        overlay.style.setProperty('height', '0px');\n        overlay.style.setProperty('width', '0px');\n        overlay.style.setProperty('visibility', 'hidden');\n        body.style.removeProperty('cursor');\n      }\n    }\n\n    function checkKeysArePressed() {\n      const activeKeys = Array.from(window.__qwik_inspector_state.pressedKeys).map((key) =>\n        key ? key.replace(/(Left|Right)$/g, '') : undefined\n      );\n      return hotKeys.every((key) => activeKeys.includes(key));\n    }\n\n    function isActive() {\n      return checkKeysArePressed();\n    }\n    window.addEventListener('resize', updateOverlay);\n    document.addEventListener('scroll', updateOverlay);\n  })();\n<\/script>\n";
  var error_host_default = "<script>\n  document.addEventListener('qerror', (ev) => {\n    const ErrorOverlay = customElements.get('vite-error-overlay');\n    if (!ErrorOverlay) {\n      return;\n    }\n    const err = ev.detail.error;\n    const overlay = new ErrorOverlay(err);\n    document.body.appendChild(overlay);\n  });\n<\/script>\n<script>\n  /**\n   * Usage:\n   *\n   * <errored-host></errored-host>\n   */\n  class ErroredHost extends HTMLElement {\n    get _root() {\n      return this.shadowRoot || this;\n    }\n\n    constructor() {\n      super();\n      const self = this;\n\n      this.state = {};\n      if (!this.props) {\n        this.props = {};\n      }\n\n      this.componentProps = ['children', 'error'];\n\n      // used to keep track of all nodes created by show/for\n      this.nodesToDestroy = [];\n      // batch updates\n      this.pendingUpdate = false;\n\n      this.attachShadow({ mode: 'open' });\n    }\n\n    destroyAnyNodes() {\n      // destroy current view template refs before rendering again\n      this.nodesToDestroy.forEach((el) => el.remove());\n      this.nodesToDestroy = [];\n    }\n\n    connectedCallback() {\n      this.getAttributeNames().forEach((attr) => {\n        const jsVar = attr.replace(/-/g, '');\n        const regexp = new RegExp(jsVar, 'i');\n        this.componentProps.forEach((prop) => {\n          if (regexp.test(prop)) {\n            const attrValue = this.getAttribute(attr);\n            if (this.props[prop] !== attrValue) {\n              this.props[prop] = attrValue;\n            }\n          }\n        });\n      });\n\n      this._root.innerHTML = `\n\n        <template data-el=\"show-errored-host\">\n        <div class=\"error\">\n          <template data-el=\"div-errored-host-2\">\n            \x3c!-- String(props.error) --\x3e\n          </template>\n        </div>\n        </template>\n\n        <div class=\"arrow\">👇 Uncaught error happened here 👇\n          <span class=\"dev-tools\">DevTools: Cmd+Alt+I</span>\n        </div>\n        <div class=\"div\">\n          <slot></slot>\n        </div>\n\n        <style>\n          .error {\n            border-radius: 5px 5px 0px 0;\n            background: black;\n            color: white;\n            font-family: monospace;\n            font-size: 12px;\n            margin: 0;\n            padding: 10px;\n          }\n          .arrow {\n            background: #f47e81;\n            color: black;\n            font-size: 14px;\n            padding: 10px;\n            text-align: center;\n            font-family: sans-serif;\n          }\n          .dev-tools {\n            background: red;\n            padding: 2px 5px;\n            border-radius: 3px;\n            font-weight: 800;\n          }\n          .div {\n            outline: 5px solid red;\n            border-radius: 10px;\n          }\n        </style>`;\n      this.pendingUpdate = true;\n\n      this.render();\n      this.onMount();\n      this.pendingUpdate = false;\n      this.update();\n    }\n\n    showContent(el) {\n      // https://developer.mozilla.org/en-US/docs/Web/API/HTMLTemplateElement/content\n      // grabs the content of a node that is between <template> tags\n      // iterates through child nodes to register all content including text elements\n      // attaches the content after the template\n\n      const elementFragment = el.content.cloneNode(true);\n      const children = Array.from(elementFragment.childNodes);\n      children.forEach((child) => {\n        if (el?.scope) {\n          child.scope = el.scope;\n        }\n        if (el?.context) {\n          child.context = el.context;\n        }\n        this.nodesToDestroy.push(child);\n      });\n      el.after(elementFragment);\n    }\n\n    onMount() {}\n\n    onUpdate() {}\n\n    update() {\n      if (this.pendingUpdate === true) {\n        return;\n      }\n      this.pendingUpdate = true;\n      this.render();\n      this.onUpdate();\n      this.pendingUpdate = false;\n    }\n\n    render() {\n      // re-rendering needs to ensure that all nodes generated by for/show are refreshed\n      this.destroyAnyNodes();\n      this.updateBindings();\n    }\n\n    updateBindings() {\n      this._root.querySelectorAll(\"[data-el='show-errored-host']\").forEach((el) => {\n        const whenCondition = this.props.error;\n        if (whenCondition) {\n          this.showContent(el);\n        }\n      });\n\n      this._root.querySelectorAll(\"[data-el='div-errored-host-2']\").forEach((el) => {\n        this.renderTextNode(el, String(this.props.error));\n      });\n    }\n\n    // Helper to render content\n    renderTextNode(el, text) {\n      const textNode = document.createTextNode(text);\n      if (el?.scope) {\n        textNode.scope = el.scope;\n      }\n      if (el?.context) {\n        textNode.context = el.context;\n      }\n      el.after(textNode);\n      this.nodesToDestroy.push(el.nextSibling);\n    }\n  }\n\n  customElements.define('errored-host', ErroredHost);\n<\/script>\n";
  var image_size_runtime_default = "<style>\n  [data-qwik-cls] {\n    outline: 2px solid red;\n  }\n  [data-qwik-cls]::after {\n    position: absolute;\n    font-size: 12px;\n    content: 'CLS ' attr(data-qwik-cls);\n    font-family: monospace;\n    font-weight: bold;\n    background: red;\n    color: white;\n    margin: -2px;\n    padding: 1px;\n    line-height: 1;\n    pointer-events: none;\n  }\n  #qwik-image-warning-container {\n    position: absolute !important;\n    top: 0 !important;\n    left: 0 !important;\n    width: 0 !important;\n    overflow: visible !important;\n    height: 0 !important;\n    pointer-events: none !important;\n    contain: size layout style content;\n    z-index: 1;\n  }\n</style>\n<template id=\"qwik-image-warning-template\">\n  <style>\n    :host {\n      position: absolute;\n      border: 1px solid red;\n      pointer-events: none;\n      z-index: 1;\n      contain: layout size;\n    }\n\n    #icon {\n      border: 0;\n      margin: 5px;\n      color: black;\n      max-width: 100%;\n      width: 20px;\n      background: yellow;\n      border-radius: 100%;\n      height: 20px;\n      padding: 3px;\n      pointer-events: all;\n      cursor: pointer;\n    }\n\n    #icon svg {\n      width: 100%;\n      height: auto;\n      pointer-events: none;\n    }\n\n    dialog {\n      padding: 0;\n      border: 0;\n      margin: 0 5px;\n      background: #ffffe8;\n      color: black;\n      width: 250px;\n      font-size: 11px;\n      position: absolute;\n      inset-inline-start: unset;\n      inset-inline-end: unset;\n      border-radius: 5px;\n      pointer-events: all;\n      overflow: hidden;\n      box-shadow: 0px -2px 20px 0px #0000002e;\n      z-index: 10000;\n    }\n\n    .top {\n      bottom: calc(100% + 5px);\n    }\n    .bottom {\n      top: 40px;\n    }\n    .right {\n      inset-inline-start: 0;\n      inset-inline-end: unset;\n    }\n    .left {\n      inset-inline-start: unset;\n      inset-inline-end: calc(100% - 40px);\n    }\n\n    .content {\n      padding: 5px;\n    }\n\n    #loc {\n      background: #2e3801;\n      color: #d2d2d2;\n      font-family: monospace;\n      padding: 3px 5px;\n      pointer-events: all;\n      margin: 0;\n      border: 0;\n      cursor: pointer;\n      font-size: 11px;\n      width: calc(100% - 24px);\n      text-overflow: ellipsis;\n      overflow: hidden;\n      display: block;\n      direction: rtl;\n      text-align: right;\n    }\n    #loc:hover {\n      background: #3a4a01;\n    }\n\n    pre {\n      background: #f1fb8e;\n      padding: 5px;\n      margin: 5px 0;\n      border-radius: 3px;\n      user-select: none;\n    }\n\n    pre span {\n      user-select: all;\n    }\n\n    a {\n      text-decoration: underline;\n    }\n\n    #close {\n      border: 0;\n      width: 25px;\n      height: 25px;\n      position: absolute;\n      right: 0;\n      top: 0;\n      background: #ffe14f;\n      color: black;\n      font-weight: 900;\n      padding: 0;\n      margin: 0;\n      display: flex;\n      align-items: center;\n      justify-content: center;\n      line-height: 1;\n      cursor: pointer;\n    }\n    #close:hover {\n      background: #ffeb6f;\n    }\n\n    #action-btn {\n      border: 2px solid #18ae00;\n      padding: 2px 4px;\n      background: #50ff50;\n      border-radius: 5px;\n      color: #0c5500;\n      font-weight: 800;\n      font-size: 10px;\n      cursor: pointer;\n    }\n\n    p {\n      margin: 5px 0;\n    }\n\n    h2 {\n      font-weight: 900;\n      margin: 10px 0;\n    }\n  </style>\n  <button id=\"icon\" type=\"button\" aria-label=\"Open image dev dialog\">\n    <svg width=\"32\" height=\"32\" viewBox=\"0 0 24 24\">\n      <path\n        fill=\"currentColor\"\n        d=\"M2.725 21q-.275 0-.5-.138t-.35-.362q-.125-.225-.138-.488t.138-.512l9.25-16q.15-.25.388-.375T12 3q.25 0 .488.125t.387.375l9.25 16q.15.25.138.513t-.138.487q-.125.225-.35.363t-.5.137H2.725ZM12 18q.425 0 .713-.288T13 17q0-.425-.288-.713T12 16q-.425 0-.713.288T11 17q0 .425.288.713T12 18Zm0-3q.425 0 .713-.288T13 14v-3q0-.425-.288-.713T12 10q-.425 0-.713.288T11 11v3q0 .425.288.713T12 15Z\"\n      />\n    </svg>\n  </button>\n  <dialog>\n    <form method=\"dialog\">\n      <button id=\"close\" type=\"submit\" aria-label=\"Close\">X</button>\n    </form>\n    <button id=\"loc\"></button>\n    <div class=\"content\">\n      <h2 id=\"title\"></h2>\n      <p id=\"message\"></p>\n      <p class=\"action-container\"></p>\n    </div>\n  </dialog>\n</template>\n<div id=\"qwik-image-warning-container\"></div>\n<script>\n  (function () {\n    function getPositionClasses(target) {\n      const { x, y } = target.getBoundingClientRect();\n      const windowWidth = window.innerWidth;\n      let horizontal = 'right';\n      let vertical = 'bottom';\n      if (x > windowWidth - 260) {\n        horizontal = 'left';\n      }\n      return `${vertical} ${horizontal}`;\n    }\n    class ImageWarning extends HTMLElement {\n      #actionFn = null;\n      constructor() {\n        super();\n        this.attachShadow({ mode: 'open' });\n        this.shadowRoot.appendChild(\n          document.importNode(document.getElementById('qwik-image-warning-template').content, true)\n        );\n        const dialog = this.shadowRoot.querySelector('dialog');\n\n        this.shadowRoot.addEventListener('click', async (ev) => {\n          const target = ev.target;\n          if (target.nodeName === 'BUTTON') {\n            if (target.id === 'action-btn') {\n              if (this.#actionFn) {\n                this.#actionFn();\n                dialog.close();\n              }\n            } else if (target.id === 'icon') {\n              if (dialog.open) {\n                dialog.close();\n              } else {\n                dialog.className = getPositionClasses(target);\n                dialog.show();\n              }\n            } else if (target.id === 'loc' && target.dataset.url) {\n              globalThis.qwikOpenInEditor(target.dataset.url);\n            }\n          }\n        });\n      }\n\n      set loc(value) {\n        const anchor = this.shadowRoot.querySelector('#loc');\n        anchor.textContent = value;\n        if (globalThis.qwikOpenInEditor) {\n          anchor.dataset.url = value;\n        }\n      }\n\n      set header(value) {\n        this.shadowRoot.querySelector('#title').textContent = value;\n      }\n\n      set message(value) {\n        this.shadowRoot.querySelector('#message').innerHTML = value;\n      }\n\n      set actionFn(value) {\n        this.#actionFn = value;\n      }\n      set actionName(value) {\n        if (value) {\n          this.shadowRoot.querySelector('.action-container').innerHTML =\n            `<button id=\"action-btn\" type=\"button\">${value}</button>`;\n        }\n      }\n    }\n    customElements.define('image-warning', ImageWarning);\n\n    const shiftsMap = new Map();\n    const visibleNodes = new Map();\n    const imageContainer = document.querySelector('#qwik-image-warning-container');\n    let skip = false;\n\n    async function _getInfo(originalSrc) {\n      // Put all supported protocols here, see also packages/qwik/src/optimizer/src/plugins/image-size-server.ts\n      if (!/^(https?|file|capacitor):/.test(originalSrc)) {\n        return undefined;\n      }\n      const url = new URL('/__image_info', location.href);\n      url.searchParams.set('url', originalSrc);\n      const res = await fetch(url);\n      if (res.ok) {\n        return await res.json();\n      } else {\n        return null;\n      }\n    }\n\n    const map = new Map();\n    function getInfo(originalSrc) {\n      let p = map.get(originalSrc);\n      if (typeof p === 'undefined') {\n        p = _getInfo(originalSrc);\n        map.set(originalSrc, p);\n      }\n      return p;\n    }\n    function isDefinedUnit(value) {\n      return value.endsWith('px');\n    }\n    async function doImg(node) {\n      const scrollX = window.scrollX;\n      const scrollY = window.scrollY;\n      const rect = node.getBoundingClientRect();\n      const originalSrc = node.currentSrc;\n      const info = await getInfo(originalSrc);\n      let overlay = visibleNodes.get(node);\n      const wideScreen = window.innerWidth > 500;\n      if (info && wideScreen) {\n        let layoutInvalidation = false;\n        const loc = node.getAttribute('data-qwik-inspector');\n        const browserArea = rect.width * rect.height;\n        if (!node.hasAttribute('width') || !node.hasAttribute('height')) {\n          skip = true;\n          const computedStyles = getComputedStyle(node);\n          const hasAspect = computedStyles.getPropertyValue('aspect-ratio').toString() !== 'auto';\n          const hasWidth = isDefinedUnit(computedStyles.getPropertyValue('width').toString());\n          const hasHeight = isDefinedUnit(computedStyles.getPropertyValue('height').toString());\n          const isAbsolute = computedStyles.getPropertyValue('position').toString() === 'absolute';\n          layoutInvalidation =\n            browserArea > 1000 && !isAbsolute && !hasAspect && (!hasWidth || !hasHeight);\n        }\n        const realArea = info.width && info.height;\n        const threshholdArea = realArea * 0.5;\n        const tooBig = browserArea < threshholdArea && info.type !== 'svg';\n        skip = false;\n        if (layoutInvalidation || tooBig) {\n          if (!overlay) {\n            overlay = document.createElement('image-warning');\n            imageContainer.appendChild(overlay);\n            visibleNodes.set(node, overlay);\n          }\n          overlay.style.top = rect.top + scrollY + 'px';\n          overlay.style.left = rect.left + scrollX + 'px';\n          overlay.style.width = rect.width + 'px';\n          overlay.style.height = rect.height + 'px';\n          overlay.info = info;\n          overlay.loc = loc;\n          if (layoutInvalidation) {\n            const clipBoard = `width=\"${info.width}\" height=\"${info.height}\"`;\n            overlay.header = 'Perf: layout shift';\n            overlay.message = `Image\\'s size is unknown until it\\'s loaded, <a href=\"https://web.dev/cls/\" target=\"_blank\" rel=\"noopener noreferrer\">causing layout shift</a>.</p><p>To solve this problem set the width/height in the img tag:</p><pre>&lt;img <span>${clipBoard}</span></pre>`;\n            const uniqueLoc =\n              document.querySelectorAll('[data-qwik-inspector=\"' + loc + '\"]').length === 1;\n            if (loc) {\n              if (uniqueLoc) {\n                overlay.actionName = 'Auto fix';\n                overlay.actionFn = async () => {\n                  const url = new URL('/__image_fix', location.href);\n                  url.searchParams.set('loc', loc);\n                  url.searchParams.set('width', info.width);\n                  url.searchParams.set('height', info.height);\n                  if (!node.srcset) {\n                    url.searchParams.set('src', node.currentSrc);\n                    url.searchParams.set('currentHref', location.href);\n                  }\n                  await fetch(url, {\n                    method: 'POST',\n                  });\n                };\n              } else {\n                overlay.actionName = 'Open in editor';\n                overlay.actionFn = async () => {\n                  await navigator.clipboard.writeText(clipBoard);\n                  globalThis.qwikOpenInEditor(loc);\n                };\n              }\n            }\n          } else if (tooBig) {\n            overlay.header = 'Perf: properly size image';\n            overlay.message = `The image is too big, <a href=\"https://developer.chrome.com/en/docs/lighthouse/performance/uses-responsive-images/\" target=\"_blank\" rel=\"noopener noreferrer\">hurting performance</a>, it should be resized to the size it\\'s displayed at. The image dimensions are ${info.width} x ${info.height} but it\\'s displayed at ${rect.width}x${rect.height}.</p>`;\n          }\n          return;\n        }\n      }\n\n      if (overlay) {\n        overlay.remove();\n        visibleNodes.delete(node);\n      }\n    }\n\n    async function updateImg(node) {\n      const overlay = visibleNodes.get(node);\n      if (!node.isConnected) {\n        if (overlay) {\n          overlay.remove();\n          visibleNodes.delete(node);\n        }\n      } else if (node.complete) {\n        doImg(node);\n      }\n    }\n\n    const resizeObserver = new ResizeObserver((entries) => {\n      if (!skip) {\n        for (const entry of entries) {\n          updateImg(entry.target);\n        }\n      }\n    });\n\n    const observer = new MutationObserver((entry) => {\n      for (const mutation of entry) {\n        for (const node of mutation.addedNodes) {\n          if (node.nodeName === 'IMG') {\n            resizeObserver.observe(node);\n          } else if (node.nodeType === 1) {\n            node.querySelectorAll('img').forEach((img) => {\n              resizeObserver.observe(img);\n            });\n          }\n        }\n        for (const node of mutation.removedNodes) {\n          if (node.nodeName === 'IMG') {\n            updateImg(node);\n            resizeObserver.unobserve(node);\n          } else if (node.nodeType === 1) {\n            node.querySelectorAll('img').forEach((img) => {\n              updateImg(img);\n              resizeObserver.unobserve(img);\n            });\n          }\n        }\n      }\n    });\n    let perfObserver;\n    let DCLS = 0;\n    const activate = () => {\n      setTimeout(() => {\n        if (perfObserver) {\n          perfObserver.disconnect();\n          if (DCLS > 0.005) {\n            console.error('Detected Layout Shift during page load', DCLS);\n          }\n        }\n        observer.observe(document.body, {\n          childList: true,\n          subtree: true,\n        });\n        document.body.querySelectorAll('img').forEach((node) => {\n          resizeObserver.observe(node);\n        });\n      }, 100);\n    };\n    if (document.readyState === 'complete') {\n      activate();\n    } else {\n      window.addEventListener('load', activate);\n    }\n    const pageAccessedByReload =\n      performance?.navigation.type === 1 ||\n      performance\n        .getEntriesByType('navigation')\n        .map((nav) => nav.type)\n        .includes('reload');\n    if (typeof PerformanceObserver !== 'undefined' && !pageAccessedByReload) {\n      const shiftsMap = new Map();\n      perfObserver = new PerformanceObserver((list) => {\n        list.getEntries().forEach((entry) => {\n          if (entry.hadRecentInput) {\n            return; // Ignore shifts after recent input.\n          }\n          if (entry.value > 0.006) {\n            for (const source of entry.sources) {\n              if (\n                source.node &&\n                source.node.nodeType === 1 &&\n                source.node.nodeName !== 'IMAGE-WARNING'\n              ) {\n                source.node.setAttribute('data-qwik-cls', Number(entry.value).toFixed(3));\n              }\n            }\n          }\n          DCLS += entry.value;\n        });\n      });\n      perfObserver.observe({ type: 'layout-shift', buffered: true });\n    }\n  })();\n<\/script>\n";
  var perf_warning_default = "<script>\n  if (!window.__qwikViteLog) {\n    window.__qwikViteLog = true;\n    console.debug(\n      '%c⭐️ Qwik Dev SSR Mode',\n      'background: #0c75d2; color: white; padding: 2px 3px; border-radius: 2px; font-size: 0.8em;',\n      \"App is running in SSR development mode!\\n - Additional JS is loaded by Vite for debugging and live reloading\\n - Rendering performance might not be optimal\\n - Delayed interactivity because prefetching is disabled\\n - Vite dev bundles do not represent production output\\n\\nProduction build can be tested running 'npm run preview'\"\n    );\n  }\n<\/script>\n";
  var VITE_ERROR_OVERLAY_STYLES = "\nvite-error-overlay {\n  --color-bright: rgba(255, 255, 255, 0.8);\n  --color-yellow: rgba(255,246,85,0.8);\n  --qwik-dark-blue: #006ce9;\n  --qwik-light-blue: #3ec2f7;\n  --qwik-light-purple: #ac7ff4;\n  --qwik-dark-purple: #713fc2;\n  --yellow: #fff;                   /* override vite yellow */\n  --purple: var(--color-bright);    /* override vite purple */\n  --red: var(--qwik-light-blue);    /* override vite red */\n\n  --vertical-box-spacing: 15px;\n  --box-padding: 20px;\n  --box-margin: 0 0 var(--vertical-box-spacing) 0;\n  --box-background: rgba(0, 0, 0, 0.5);\n  --box-border-radius: 8px;\n}\n\nvite-error-overlay::part(backdrop) {\n  background: rgb(2 11 17 / 60%);\n  backdrop-filter: blur(20px) brightness(0.4) saturate(3);\n}\n\nvite-error-overlay::part(window) {\n  background: transparent;\n  border: none;\n  box-shadow: none;\n  box-sizing: border-box;\n  margin: 50px auto;\n  max-width: 1200px;\n  padding: var(--box-padding);\n  width: 90%;\n}\n\nvite-error-overlay::part(message) {\n  display: flex;\n  flex-direction: column;\n  font-size: 1.6rem;\n  line-height: 1.7;\n  margin-bottom: 30px;\n}\n\nvite-error-overlay::part(plugin) {\n  font-size: 0.8rem;\n  font-weight: 100;\n}\n\nvite-error-overlay::part(file),\nvite-error-overlay::part(frame),\nvite-error-overlay::part(stack),\nvite-error-overlay::part(tip) {\n  background: var(--box-background);\n  border-left: 5px solid transparent;\n  border-radius: var(--box-border-radius);\n  margin: var(--box-margin);\n  min-height: 50px;\n  padding: var(--box-padding);\n  position: relative;\n}\n\nvite-error-overlay::part(file) {\n  border-left-color: rgb(25 182 246);\n  color: var(--color-bright);\n}\n\nvite-error-overlay::part(frame) {\n  border-left-color: var(--color-yellow);\n  color: var(--color-yellow);\n}\n\nvite-error-overlay::part(stack) {\n  border-left-color: #FF5722;\n}\n\n\nvite-error-overlay::part(tip) {\n  border-top: none;\n  border-left-color: rgb(172, 127, 244);\n}\n\nvite-error-overlay::part(file):before,\nvite-error-overlay::part(frame):before,\nvite-error-overlay::part(stack):before {\n  border-bottom: 1px solid #222;\n  color: var(--color-bright);\n  display: block;\n  margin-bottom: 15px;\n  padding-bottom: 5px;\n  padding-left: 30px; /* space for icon */\n  font-size: .8rem;\n}\n\nvite-error-overlay::part(file):before {\n  content: 'File';\n}\n\nvite-error-overlay::part(frame):before {\n  content: 'Frame';\n}\n\nvite-error-overlay::part(stack):before {\n  content: 'Stack Trace';\n}\n\nvite-error-overlay::part(file):after,\nvite-error-overlay::part(frame):after,\nvite-error-overlay::part(stack):after {\n  content: '';\n  display: block;\n  height: 20px;\n  position: absolute;\n  left: var(--box-padding);\n  top: var(--box-padding);\n  width: 20px;\n}\n\nvite-error-overlay::part(file):after {\n  background-image: url(\"data:image/svg+xml,%3Csvg width='20px' height='20px' viewBox='0 0 24 24' version='1.1' xmlns='http://www.w3.org/2000/svg' xmlns:xlink='http://www.w3.org/1999/xlink'%3E%3Ctitle%3EFile-Generic%3C/title%3E%3Cg id='Page-1' stroke='none' stroke-width='1' fill='none' fill-rule='evenodd'%3E%3Cg id='File-Generic'%3E%3Crect id='Rectangle' fill-rule='nonzero' x='0' y='0' width='24' height='24'%3E%3C/rect%3E%3Cpath d='M4 5 C4 3.89543 4.89543 3 6 3 L15.1716 3 C15.702 3 16.2107 3.21071 16.5858 3.58579 L19.4142 6.41421 C19.7893 6.78929 20 7.29799 20 7.82843 L20 19 C20 20.1046 19.1046 21 18 21 L6 21 C4.89543 21 4 20.1046 4 19 L4 5 Z' id='Path' stroke='rgba(255,255,255,0.7)' stroke-width='1' stroke-linecap='round'%3E%3C/path%3E%3Cpath d='M15 4 L15 6 C15 7.10457 15.8954 8 17 8 L19 8' id='Path' stroke='rgba(255,255,255,0.7)' stroke-width='1' stroke-linecap='round'%3E%3C/path%3E%3C/g%3E%3C/g%3E%3C/svg%3E\");\n}\n\nvite-error-overlay::part(frame):after {\n  background-image: url(\"data:image/svg+xml,%3Csvg width='20px' height='20px' viewBox='0 0 24 24' fill='none' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M15.6602 2.84952H19.1516C20.2555 2.84952 21.1504 3.74444 21.1504 4.84839V8.3398' stroke='rgba(255,255,255,0.7)' stroke-width='1.69904' stroke-linecap='round'/%3E%3Cpath d='M2.84949 8.33981L2.84949 4.8484C2.84949 3.74446 3.74441 2.84953 4.84836 2.84953L8.33977 2.84953' stroke='rgba(255,255,255,0.7)' stroke-width='1.69904' stroke-linecap='round'/%3E%3Cpath d='M21.1505 15.6602L21.1505 19.1516C21.1505 20.2555 20.2556 21.1505 19.1516 21.1505L15.6602 21.1505' stroke='rgba(255,255,255,0.7)' stroke-width='1.69904' stroke-linecap='round'/%3E%3Cpath d='M8.33984 21.1505L4.84843 21.1505C3.74449 21.1505 2.84956 20.2555 2.84956 19.1516L2.84956 15.6602' stroke='rgba(255,255,255,0.7)' stroke-width='1.69904' stroke-linecap='round'/%3E%3C/svg%3E\");\n}\n\nvite-error-overlay::part(stack):after {\n  background-image: url(\"data:image/svg+xml,%3Csvg width='20px' height='20px' viewBox='0 0 24 24' fill='none' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M14.78 20H9.78C7.98 20 4.58 19.09 4.58 15.64C4.58 12.19 7.98 11.28 9.78 11.28H14.22C14.37 11.28 17.92 11.23 17.92 8.42C17.92 5.61 14.37 5.56 14.22 5.56H9.22C9.02109 5.56 8.83032 5.48098 8.68967 5.34033C8.54902 5.19968 8.47 5.00891 8.47 4.81C8.47 4.61109 8.54902 4.42032 8.68967 4.27967C8.83032 4.13902 9.02109 4.06 9.22 4.06H14.22C16.02 4.06 19.42 4.97 19.42 8.42C19.42 11.87 16.02 12.78 14.22 12.78H9.78C9.63 12.78 6.08 12.83 6.08 15.64C6.08 18.45 9.63 18.5 9.78 18.5H14.78C14.9789 18.5 15.1697 18.579 15.3103 18.7197C15.451 18.8603 15.53 19.0511 15.53 19.25C15.53 19.4489 15.451 19.6397 15.3103 19.7803C15.1697 19.921 14.9789 20 14.78 20Z' fill='rgba(255,255,255,0.7)'/%3E%3Cpath d='M6.44 8.31C5.74314 8.30407 5.06363 8.09202 4.48708 7.70056C3.91054 7.30909 3.46276 6.75573 3.20018 6.11021C2.93759 5.46469 2.87195 4.75589 3.01153 4.07312C3.1511 3.39036 3.48965 2.76418 3.9845 2.2735C4.47935 1.78281 5.10837 1.44958 5.79229 1.31579C6.47622 1.182 7.18444 1.25363 7.82771 1.52167C8.47099 1.78971 9.02054 2.24215 9.40711 2.82199C9.79368 3.40182 9.99998 4.08311 10 4.78C10 5.2461 9.90773 5.70759 9.72846 6.13783C9.54919 6.56808 9.28648 6.95856 8.95551 7.28675C8.62453 7.61494 8.23184 7.87433 7.80009 8.04995C7.36834 8.22558 6.90609 8.31396 6.44 8.31ZM6.44 2.75C6.04444 2.75 5.65776 2.86729 5.32886 3.08706C4.99996 3.30682 4.74362 3.61918 4.59224 3.98463C4.44087 4.35008 4.40126 4.75221 4.47843 5.14018C4.5556 5.52814 4.74609 5.8845 5.02579 6.16421C5.3055 6.44391 5.66186 6.6344 6.04982 6.71157C6.43779 6.78874 6.83992 6.74913 7.20537 6.59776C7.57082 6.44638 7.88318 6.19003 8.10294 5.86114C8.32271 5.53224 8.44 5.14556 8.44 4.75C8.44 4.48735 8.38827 4.22728 8.28776 3.98463C8.18725 3.74198 8.03993 3.5215 7.85422 3.33578C7.6685 3.15007 7.44802 3.00275 7.20537 2.90224C6.96272 2.80173 6.70265 2.75 6.44 2.75Z' fill='rgba(255,255,255,0.7)'/%3E%3Cpath d='M17.56 22.75C16.8614 22.752 16.1779 22.5466 15.5961 22.1599C15.0143 21.7733 14.5603 21.2227 14.2916 20.5778C14.0229 19.933 13.9515 19.2229 14.0866 18.5375C14.2217 17.8521 14.5571 17.2221 15.0504 16.7275C15.5437 16.2328 16.1726 15.8956 16.8577 15.7586C17.5427 15.6215 18.253 15.6909 18.8986 15.9577C19.5442 16.2246 20.0961 16.6771 20.4844 17.2578C20.8727 17.8385 21.08 18.5214 21.08 19.22C21.08 20.1545 20.7095 21.0508 20.0496 21.7125C19.3898 22.3743 18.4945 22.7473 17.56 22.75ZM17.56 17.19C17.1644 17.19 16.7778 17.3073 16.4489 17.5271C16.12 17.7468 15.8636 18.0592 15.7122 18.4246C15.5609 18.7901 15.5213 19.1922 15.5984 19.5802C15.6756 19.9681 15.8661 20.3245 16.1458 20.6042C16.4255 20.8839 16.7819 21.0744 17.1698 21.1516C17.5578 21.2287 17.9599 21.1891 18.3254 21.0377C18.6908 20.8864 19.0032 20.63 19.2229 20.3011C19.4427 19.9722 19.56 19.5856 19.56 19.19C19.56 18.6596 19.3493 18.1508 18.9742 17.7758C18.5991 17.4007 18.0904 17.19 17.56 17.19Z' fill='rgba(255,255,255,0.7)'/%3E%3C/svg%3E\");\n}\n\nvite-error-overlay::part(tip):before {\n  content: \"Not sure how to solve this? Visit https://qwik.dev or connect with the community on Discord.\";\n  display: block;\n  margin-bottom: 1em;\n}\n";
  function getOrigin(req) {
    const {PROTOCOL_HEADER: PROTOCOL_HEADER, HOST_HEADER: HOST_HEADER} = process.env;
    const headers = req.headers;
    const protocol = PROTOCOL_HEADER && headers[PROTOCOL_HEADER.toLowerCase()] || (req.socket.encrypted || req.connection.encrypted ? "https" : "http");
    const host = HOST_HEADER && headers[HOST_HEADER.toLowerCase()] || headers[":authority"] || headers.host;
    return `${protocol}://${host}`;
  }
  function createSymbolMapper(base2) {
    return (symbolName, _mapper, parent) => {
      if (symbolName === SYNC_QRL) {
        return [ symbolName, "" ];
      }
      if (!parent) {
        console.error("qwik vite-dev-server symbolMapper: unknown qrl requested without parent:", symbolName);
        return [ symbolName, `${base2}${symbolName}.js` ];
      }
      const qrlFile = `${base2}${parent.startsWith("/") ? parent.slice(1) : parent}_${symbolName}.js`;
      return [ symbolName, qrlFile ];
    };
  }
  var lazySymbolMapper = null;
  var symbolMapper = (symbolName, mapper, parent) => {
    if (lazySymbolMapper) {
      return lazySymbolMapper(symbolName, mapper, parent);
    }
    throw new Error("symbolMapper not initialized");
  };
  async function configureDevServer(base2, server, opts, sys, path, isClientDevOnly, clientDevInput, devSsrServer) {
    var _a;
    symbolMapper = lazySymbolMapper = createSymbolMapper(base2);
    if (!devSsrServer) {
      return;
    }
    const hasQwikCity = null == (_a = server.config.plugins) ? void 0 : _a.some((plugin => "vite-plugin-qwik-city" === plugin.name));
    const cssImportedByCSS = new Set;
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
              mapping: {},
              injections: []
            };
            const added = new Set;
            const CSS_EXTENSIONS = [ ".css", ".scss", ".sass", ".less", ".styl", ".stylus" ];
            const JS_EXTENSIONS = /\.[mc]?[tj]sx?$/;
            Array.from(server.moduleGraph.fileToModulesMap.entries()).forEach((entry => {
              entry[1].forEach((v => {
                var _a2, _b;
                const segment = null == (_b = null == (_a2 = v.info) ? void 0 : _a2.meta) ? void 0 : _b.segment;
                let url2 = v.url;
                v.lastHMRTimestamp && (url2 += `?t=${v.lastHMRTimestamp}`);
                segment && (manifest.mapping[segment.name] = relativeURL(url2, opts.rootDir));
                const {pathId: pathId, query: query} = parseId(v.url);
                if ("" === query && CSS_EXTENSIONS.some((ext => pathId.endsWith(ext)))) {
                  const isEntryCSS = 0 === v.importers.size;
                  const hasCSSImporter = Array.from(v.importers).some((importer => {
                    const importerPath = importer.url || importer.file;
                    const isCSS = importerPath && CSS_EXTENSIONS.some((ext => importerPath.endsWith(ext)));
                    isCSS && v.url && cssImportedByCSS.add(v.url);
                    return isCSS;
                  }));
                  const hasJSImporter = Array.from(v.importers).some((importer => {
                    const importerPath = importer.url || importer.file;
                    return importerPath && JS_EXTENSIONS.test(importerPath);
                  }));
                  if ((isEntryCSS || hasJSImporter) && !hasCSSImporter && !cssImportedByCSS.has(v.url) && !added.has(v.url)) {
                    added.add(v.url);
                    manifest.injections.push({
                      tag: "link",
                      location: "head",
                      attributes: {
                        rel: "stylesheet",
                        href: `${base2}${url2.slice(1)}`
                      }
                    });
                  }
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
            "html" in result && res.write(result.html);
            Array.from(server.moduleGraph.fileToModulesMap.entries()).forEach((entry => {
              entry[1].forEach((v => {
                const {pathId: pathId, query: query} = parseId(v.url);
                if (!added.has(v.url) && "" === query && CSS_EXTENSIONS.some((ext => pathId.endsWith(ext)))) {
                  const isEntryCSS = 0 === v.importers.size;
                  const hasCSSImporter = Array.from(v.importers).some((importer => {
                    const importerPath = importer.url || importer.file;
                    const isCSS = importerPath && CSS_EXTENSIONS.some((ext => importerPath.endsWith(ext)));
                    isCSS && v.url && cssImportedByCSS.add(v.url);
                    return isCSS;
                  }));
                  const hasJSImporter = Array.from(v.importers).some((importer => {
                    const importerPath = importer.url || importer.file;
                    return importerPath && JS_EXTENSIONS.test(importerPath);
                  }));
                  if ((isEntryCSS || hasJSImporter) && !hasCSSImporter && !cssImportedByCSS.has(v.url)) {
                    res.write(`<link rel="stylesheet" href="${base2}${v.url.slice(1)}">`);
                    added.add(v.url);
                  }
                }
              }));
            }));
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
      console.log(`\n  🚧 ${magenta("Please note that development mode is slower than production.")}`);
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
  function relativeURL(url, base2) {
    if (url.startsWith(base2)) {
      url = url.slice(base2.length);
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
    const disableFontPreload = qwikViteOpts.disableFontPreload ?? false;
    const injections = [];
    const qwikPlugin = createQwikPlugin(qwikViteOpts.optimizerOptions);
    const bundleGraphAdders = new Set;
    const api = {
      getOptimizer: () => qwikPlugin.getOptimizer(),
      getOptions: () => qwikPlugin.getOptions(),
      getManifest: () => manifestInput,
      getRootDir: () => qwikPlugin.getOptions().rootDir,
      getClientOutDir: () => clientOutDir,
      getClientPublicOutDir: () => clientPublicOutDir,
      getAssetsDir: () => viteAssetsDir,
      registerBundleGraphAdder: adder => bundleGraphAdders.add(adder)
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
              maxParallelFileOps: 1,
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
            output: normalizeRollupOutputOptions(qwikPlugin, null == (_v = null == (_u = viteConfig.build) ? void 0 : _u.rollupOptions) ? void 0 : _v.output, useAssetsDir, buildOutputDir),
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
          } else if ("client" === opts.target) {
            isClientDevOnly && !opts.csr && (updatedViteConfig.build.rollupOptions.input = clientDevInput);
          } else if ("lib" === opts.target) {
            updatedViteConfig.build.minify = false;
            updatedViteConfig.build.rollupOptions.external = [ QWIK_CORE_ID, QWIK_CORE_SERVER, QWIK_JSX_RUNTIME_ID, QWIK_JSX_DEV_RUNTIME_ID, QWIK_BUILD_ID, QWIK_CLIENT_MANIFEST_ID ];
          } else {
            updatedViteConfig.define = {
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
      async configResolved(config2) {
        var _a;
        basePathname = config2.base;
        if (!(basePathname.startsWith("/") && basePathname.endsWith("/"))) {
          console.error("warning: vite's config.base must begin and end with /. This will be an error in v2. If you have a valid use case, please open an issue.");
          basePathname.endsWith("/") || (basePathname += "/");
        }
        const useSourcemap = !!config2.build.sourcemap;
        useSourcemap && void 0 === (null == (_a = qwikViteOpts.optimizerOptions) ? void 0 : _a.sourcemap) && qwikPlugin.setSourceMapSupport(true);
        qwikPlugin.normalizeOptions(qwikViteOpts);
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
          const opts = qwikPlugin.getOptions();
          if ("client" === opts.target) {
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
                  selectedFont && !disableFontPreload && injections.unshift({
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
            const clientManifestStr = await qwikPlugin.generateManifest(this, rollupBundle, bundleGraphAdders, {
              injections: injections,
              platform: {
                vite: ""
              }
            });
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
      onLog(level, log2) {
        var _a, _b, _c;
        if ("vite-plugin-qwik" == log2.plugin) {
          const color = LOG_COLOR[level] || ANSI_COLOR.White;
          const frames = (log2.frame || "").split("\n").map((line => (line.match(/^\s*\^\s*$/) ? ANSI_COLOR.BrightWhite : ANSI_COLOR.BrightBlack) + line));
          console[level](`${color}%s\n${ANSI_COLOR.BrightWhite}%s\n%s${ANSI_COLOR.RESET}`, `[${log2.plugin}](${level}): ${log2.message}\n`, `  ${null == (_a = null == log2 ? void 0 : log2.loc) ? void 0 : _a.file}:${null == (_b = null == log2 ? void 0 : log2.loc) ? void 0 : _b.line}:${null == (_c = null == log2 ? void 0 : log2.loc) ? void 0 : _c.column}\n`, `  ${frames.join("\n  ")}\n`);
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
        } catch {}
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
  return module.exports;
}("object" === typeof module && module.exports ? module : {
  exports: {}
});