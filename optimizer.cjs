/**
 * @license
 * @builder.io/qwik/optimizer 1.7.1-dev20240721121806
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
    },
    linux: {
      x64: [ {
        platform: "linux",
        arch: "x64",
        abi: "gnu",
        platformArchABI: "qwik.linux-x64-gnu.node"
      } ]
    }
  };
  var versions = {
    qwik: "1.7.1-dev20240721121806"
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
              const mod = await sys.dynamicImport(`./bindings/${triple.platformArchABI}`);
              return mod;
            } catch (e) {
              console.warn(`Unable to load native binding ${triple.platformArchABI}. Falling back to wasm build.`, null == e ? void 0 : e.message);
            }
          }
        }
      }
    }
    if ("node" === sysEnv || "bun" === sysEnv) {
      const wasmPath = sys.path.join(__dirname, "bindings", "qwik_wasm_bg.wasm");
      const mod = await sys.dynamicImport("./bindings/qwik.wasm.cjs");
      const fs = await sys.dynamicImport("node:fs");
      return new Promise(((resolve, reject) => {
        fs.readFile(wasmPath, ((err, buf) => {
          null != err ? reject(err) : resolve(buf);
        }));
      })).then((buf => WebAssembly.compile(buf))).then((wasm => mod.default(wasm))).then((() => mod));
    }
    if ("webworker" === sysEnv || "browsermain" === sysEnv) {
      let version = versions.qwik;
      const cachedCjsCode = `qwikWasmCjs${version}`;
      const cachedWasmRsp = `qwikWasmRsp${version}`;
      let cjsCode = globalThis[cachedCjsCode];
      let wasmRsp = globalThis[cachedWasmRsp];
      if (!cjsCode || !wasmRsp) {
        version = versions.qwik.split("-dev")[0];
        const cdnUrl = `https://cdn.jsdelivr.net/npm/@builder.io/qwik@${version}/bindings/`;
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
  function generateManifestFromBundles(path, hooks, injections, outputBundles, opts) {
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
    const qrlNames = new Set([ ...hooks.map((h => h.name)) ]);
    for (const [fileName, outputBundle] of Object.entries(outputBundles)) {
      if ("chunk" !== outputBundle.type) {
        continue;
      }
      const bundleFileName = path.basename(fileName);
      const buildDirName = path.dirname(outputBundle.fileName);
      const bundle = {
        size: outputBundle.code.length
      };
      for (const symbol of outputBundle.exports) {
        qrlNames.has(symbol) && (manifest.mapping[symbol] && 1 === outputBundle.exports.length || (manifest.mapping[symbol] = bundleFileName));
      }
      const bundleImports = outputBundle.imports.filter((i => path.dirname(i) === buildDirName)).map((i => path.relative(buildDirName, i)));
      bundleImports.length > 0 && (bundle.imports = bundleImports);
      const bundleDynamicImports = outputBundle.dynamicImports.filter((i => path.dirname(i) === buildDirName)).map((i => path.relative(buildDirName, i)));
      bundleDynamicImports.length > 0 && (bundle.dynamicImports = bundleDynamicImports);
      const ids = outputBundle.moduleIds || Object.keys(outputBundle.modules);
      const modulePaths = ids.filter((m => !m.startsWith("\0")));
      modulePaths.length > 0 && (bundle.origins = modulePaths);
      manifest.bundles[bundleFileName] = bundle;
    }
    for (const hook of hooks) {
      const symbol = hook.name;
      const bundle = manifest.mapping[symbol];
      if (!bundle) {
        console.error(`Unable to find bundle for hook: ${hook.name}`, manifest);
        throw new Error(`Unable to find bundle for hook: ${hook.hash}`);
      }
      (manifest.bundles[bundle].symbols ||= []).push(symbol);
      manifest.symbols[symbol] = {
        origin: hook.origin,
        displayName: hook.displayName,
        canonicalFilename: hook.canonicalFilename,
        hash: hook.hash,
        ctxKind: hook.ctxKind,
        ctxName: hook.ctxName,
        captures: hook.captures,
        parent: hook.parent,
        loc: hook.loc
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
  var REG_CTX_NAME = [ "server" ];
  var SERVER_STRIP_EXPORTS = [ "onGet", "onPost", "onPut", "onRequest", "onDelete", "onHead", "onOptions", "onPatch", "onStaticGenerate" ];
  var SERVER_STRIP_CTX_NAME = [ "useServer", "route", "server", "action$", "loader$", "zod$", "validator$", "globalAction$" ];
  var CLIENT_STRIP_CTX_NAME = [ "useClient", "useBrowser", "useVisibleTask", "client", "browser", "event$" ];
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
      vendorRoots: [],
      scope: null,
      devTools: {
        imageDevTools: true,
        clickToSource: [ "Alt" ]
      },
      inlineStylesUpToBytes: null,
      lint: true
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
      opts.vendorRoots = updatedOpts.vendorRoots ? updatedOpts.vendorRoots : [];
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
      var _a;
      debug("buildStart()", opts.buildMode, opts.scope, opts.target);
      const optimizer = getOptimizer();
      if ("node" === optimizer.sys.env && "ssr" === opts.target && opts.lint) {
        try {
          linter = await createLinter(optimizer.sys, opts.rootDir, opts.tsconfigFileNames);
        } catch (err) {}
      }
      const generatePreManifest = ![ "hoist", "hook", "inline" ].includes(opts.entryStrategy.type);
      if (generatePreManifest) {
        const path = getPath();
        let srcDir = "/";
        if ("string" === typeof opts.srcDir) {
          srcDir = normalizePath(opts.srcDir);
          debug("buildStart() srcDir", opts.srcDir);
        } else if (Array.isArray(opts.srcInputs)) {
          optimizer.sys.getInputFiles = async rootDir => opts.srcInputs.map((i => {
            const relInput = {
              path: normalizePath(path.relative(rootDir, i.path)),
              code: i.code
            };
            return relInput;
          }));
          debug(`buildStart() opts.srcInputs (${opts.srcInputs.length})`);
        }
        const vendorRoots = opts.vendorRoots;
        vendorRoots.length > 0 && debug("vendorRoots", vendorRoots);
        debug("transformedOutput.clear()");
        clientTransformedOutputs.clear();
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
          scope: opts.scope ? opts.scope : void 0,
          sourceMaps: opts.sourcemap
        };
        let outputs = clientTransformedOutputs;
        if ("client" === opts.target) {
          transformOpts.stripCtxName = SERVER_STRIP_CTX_NAME;
          transformOpts.stripExports = SERVER_STRIP_EXPORTS;
          transformOpts.isServer = false;
        } else if ("ssr" === opts.target && !devServer) {
          transformOpts.stripCtxName = CLIENT_STRIP_CTX_NAME;
          transformOpts.stripEventHandlers = true;
          transformOpts.isServer = true;
          transformOpts.regCtxName = REG_CTX_NAME;
          outputs = serverTransformedOutputs;
        }
        const result = await optimizer.transformFs(transformOpts);
        for (const output of result.modules) {
          const key = normalizePath(path.join(srcDir, output.path));
          debug("buildStart() add transformedOutput", key, null == (_a = output.hook) ? void 0 : _a.displayName);
          outputs.set(key, [ output, key ]);
          "client" === opts.target && output.isEntry && ctx.emitFile({
            id: key,
            type: "chunk",
            preserveSignature: "allow-extension"
          });
        }
        diagnosticsCallback(result.diagnostics, optimizer, srcDir);
        clientResults.set("@buildStart", result);
        serverResults.set("@buildStart", result);
      }
    };
    const getIsServer = viteOpts => devServer ? !!(null == viteOpts ? void 0 : viteOpts.ssr) : "ssr" === opts.target || "test" === opts.target;
    const getParentId = (id2, isServer) => {
      const transformedOutputs = isServer ? serverTransformedOutputs : clientTransformedOutputs;
      const segment = transformedOutputs.get(id2);
      if (segment) {
        return segment[1];
      }
      const hash = getSymbolHash(id2);
      return foundQrls.get(hash);
    };
    let resolveIdCount = 0;
    const resolveId = async (ctx, id2, importerId, resolveOpts) => {
      const count = resolveIdCount++;
      const isServer = getIsServer(resolveOpts);
      debug(`resolveId(${count})`, "Start", id2, {
        from: importerId,
        for: isServer ? "server" : "client"
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
        debug(`resolveId(${count})`, "Resolved", QWIK_BUILD_ID);
        return {
          id: normalizePath(getPath().resolve(opts.rootDir, QWIK_BUILD_ID)),
          moduleSideEffects: false
        };
      }
      if (id2.endsWith(QWIK_CLIENT_MANIFEST_ID)) {
        debug(`resolveId(${count})`, "Resolved", QWIK_CLIENT_MANIFEST_ID);
        if ("lib" === opts.target) {
          return {
            id: id2,
            external: true,
            moduleSideEffects: false
          };
        }
        const firstInput = Object.values(opts.input)[0];
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
          debug(`resolveId(${count})`, "falling back to default resolver");
          const parentId = getParentId(importerId, isServer);
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
        const outputs = isServer ? serverTransformedOutputs : clientTransformedOutputs;
        if (devServer && !isServer && importerId.endsWith(".html") && id2.startsWith("/") && !outputs.has(id2)) {
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
          const parentId = getParentId(importeePathId, isServer);
          if (parentId) {
            debug(`resolveId(${count}) Resolved ${importeePathId} from transformedOutputs`);
            return {
              id: importeePathId + parsedId.query
            };
          }
        }
      } else if (path.isAbsolute(id2)) {
        const parsedId = parseId(id2);
        const importeePathId = normalizePath(parsedId.pathId);
        const ext = path.extname(importeePathId).toLowerCase();
        if (ext in RESOLVE_EXTS && getParentId(importeePathId, isServer)) {
          debug(`resolveId(${count}) Resolved ${importeePathId} from transformedOutputs (no importer)`);
          return {
            id: importeePathId + parsedId.query
          };
        }
      }
      debug(`resolveId(${count})`, "Not resolved", id2, importerId);
      return null;
    };
    const load = async (ctx, id2, loadOpts) => {
      if (id2.startsWith("\0") || id2.startsWith("/@fs/")) {
        return;
      }
      const isServer = getIsServer(loadOpts);
      if (opts.resolveQwikBuild && id2.endsWith(QWIK_BUILD_ID)) {
        debug("load()", QWIK_BUILD_ID, opts.buildMode);
        return {
          moduleSideEffects: false,
          code: getQwikBuildModule(isServer, opts.target)
        };
      }
      if (id2.endsWith(QWIK_CLIENT_MANIFEST_ID)) {
        debug("load()", QWIK_CLIENT_MANIFEST_ID, opts.buildMode);
        return {
          moduleSideEffects: false,
          code: await getQwikServerManifestModule(isServer)
        };
      }
      const parsedId = parseId(id2);
      const path = getPath();
      id2 = normalizePath(parsedId.pathId);
      const outputs = isServer ? serverTransformedOutputs : clientTransformedOutputs;
      if (devServer && !outputs.has(id2)) {
        const parentId = getParentId(id2, isServer);
        if (parentId) {
          debug("load()", "transforming QRL parent", parentId);
          await devServer.transformRequest(`/@fs${parentId.startsWith("/") ? "" : "/"}${parentId}`);
        }
      }
      const transformedModule = outputs.get(id2);
      if (transformedModule) {
        debug("load()", "Found", id2);
        let {code: code} = transformedModule[0];
        const {map: map, hook: hook} = transformedModule[0];
        if (devServer) {
          const firstInput = Object.values(opts.input)[0];
          code = code.replace(/@qwik-client-manifest/g, normalizePath(path.resolve(firstInput, QWIK_CLIENT_MANIFEST_ID)));
        }
        return {
          code: code,
          map: map,
          meta: {
            hook: hook
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
      const isServer = getIsServer(transformOpts);
      const currentOutputs = isServer ? serverTransformedOutputs : clientTransformedOutputs;
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
      if (ext in TRANSFORM_EXTS || TRANSFORM_REGEX.test(pathId) || insideRoots(ext, dir, opts.srcDir, opts.vendorRoots)) {
        const strip = "client" === opts.target || "ssr" === opts.target;
        const normalizedID = normalizePath(pathId);
        debug("transform()", `Transforming ${id2} (for: ${isServer ? "server" : "client"}${strip ? ", strip" : ""})`);
        let filePath = base;
        opts.srcDir && (filePath = path.relative(opts.srcDir, pathId));
        filePath = normalizePath(filePath);
        const srcDir = opts.srcDir ? opts.srcDir : normalizePath(dir);
        const mode = "lib" === opts.target ? "lib" : "development" === opts.buildMode ? "dev" : "prod";
        const entryStrategy = opts.entryStrategy;
        const transformOpts2 = {
          input: [ {
            code: code,
            path: filePath
          } ],
          entryStrategy: isServer ? {
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
          isServer: isServer
        };
        if (strip) {
          if (isServer) {
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
        if (devServer && isServer) {
          const matches = module2.code.matchAll(/_([a-zA-Z0-9]{11,11})['"][,)]/g);
          for (const [, symbol] of matches) {
            foundQrls.set(symbol, id2);
          }
        }
        diagnosticsCallback(newOutput.diagnostics, optimizer, srcDir);
        if (isServer) {
          0 === newOutput.diagnostics.length && linter && await linter.lint(ctx, code, id2);
          serverResults.set(normalizedID, newOutput);
        } else {
          clientResults.set(normalizedID, newOutput);
        }
        const deps = new Set;
        for (const mod of newOutput.modules) {
          if (mod !== module2) {
            const key = normalizePath(path.join(srcDir, mod.path));
            debug("transform()", `segment ${key}`, null == (_a = mod.hook) ? void 0 : _a.displayName);
            currentOutputs.set(key, [ mod, id2 ]);
            deps.add(key);
            devServer || "client" !== opts.target || ctx.emitFile({
              id: key,
              type: "chunk",
              preserveSignature: "allow-extension"
            });
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
            hook: module2.hook,
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
        const hooks = Array.from(clientResults.values()).flatMap((r => r.modules)).map((mod => mod.hook)).filter((h => !!h));
        const manifest = generateManifestFromBundles(path, hooks, injections, rollupBundle, opts);
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
    const log = (...str) => {
      console.log(`[QWIK PLUGIN: ${id}]`, ...str);
    };
    const onDiagnostics = cb => {
      diagnosticsCallback = cb;
    };
    const normalizePath = id2 => lazyNormalizePath(id2);
    function getQwikBuildModule(isServer, target) {
      const isDev = "development" === opts.buildMode;
      return `// @builder.io/qwik/build\nexport const isServer = ${JSON.stringify(isServer)};\nexport const isBrowser = ${JSON.stringify(!isServer)};\nexport const isDev = ${JSON.stringify(isDev)};\n`;
    }
    async function getQwikServerManifestModule(isServer) {
      const manifest = isServer ? opts.manifestInput : null;
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
      log: log,
      normalizeOptions: normalizeOptions,
      normalizePath: normalizePath,
      onDiagnostics: onDiagnostics,
      resolveId: resolveId,
      transform: transform,
      validateSource: validateSource,
      setSourceMapSupport: setSourceMapSupport,
      foundQrls: foundQrls,
      configureServer: configureServer,
      handleHotUpdate: handleHotUpdate
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
  function isAdditionalFile(mod) {
    return mod.isEntry || mod.hook;
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
        inputOpts.onwarn = (warning, warn) => {
          if ("typescript" === warning.plugin && warning.message.includes("outputToFilesystem")) {
            return;
          }
          warn(warning);
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
          lint: qwikRollupOpts.lint
        };
        const opts = qwikPlugin.normalizeOptions(pluginOpts);
        inputOpts.input || (inputOpts.input = opts.input);
        return inputOpts;
      },
      outputOptions: rollupOutputOpts => normalizeRollupOutputOptionsObject(qwikPlugin.getOptions(), rollupOutputOpts, false),
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
  function normalizeRollupOutputOptions(opts, rollupOutputOpts, useAssetsDir) {
    const outputOpts = Array.isArray(rollupOutputOpts) ? [ ...rollupOutputOpts ] : [ rollupOutputOpts || {} ];
    outputOpts.length || outputOpts.push({});
    return outputOpts.map((outputOptsObj => normalizeRollupOutputOptionsObject(opts, outputOptsObj, useAssetsDir)));
  }
  function normalizeRollupOutputOptionsObject(opts, rollupOutputOptsObj, useAssetsDir) {
    const outputOpts = {
      ...rollupOutputOptsObj
    };
    outputOpts.assetFileNames || (outputOpts.assetFileNames = "build/q-[hash].[ext]");
    if ("client" === opts.target) {
      outputOpts.assetFileNames = useAssetsDir ? `${opts.assetsDir}/${outputOpts.assetFileNames}` : outputOpts.assetFileNames;
      if ("production" === opts.buildMode) {
        if (!outputOpts.entryFileNames) {
          const fileName = "build/q-[hash].js";
          outputOpts.entryFileNames = useAssetsDir ? `${opts.assetsDir}/${fileName}` : fileName;
        }
        if (!outputOpts.chunkFileNames) {
          const fileName = "build/q-[hash].js";
          outputOpts.chunkFileNames = useAssetsDir ? `${opts.assetsDir}/${fileName}` : fileName;
        }
      } else {
        if (!outputOpts.entryFileNames) {
          const fileName = "build/[name].js";
          outputOpts.entryFileNames = useAssetsDir ? `${opts.assetsDir}/${fileName}` : fileName;
        }
        if (!outputOpts.chunkFileNames) {
          const fileName = "build/[name].js";
          outputOpts.chunkFileNames = useAssetsDir ? `${opts.assetsDir}/${fileName}` : fileName;
        }
      }
    } else if ("production" === opts.buildMode) {
      outputOpts.chunkFileNames || (outputOpts.chunkFileNames = "q-[hash].js");
      outputOpts.assetFileNames || (outputOpts.assetFileNames = "assets/[hash].[ext]");
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
  var QWIK_LOADER_DEFAULT_MINIFIED = '(()=>{var e=Object.defineProperty,t=Object.getOwnPropertySymbols,r=Object.prototype.hasOwnProperty,o=Object.prototype.propertyIsEnumerable,n=(t,r,o)=>r in t?e(t,r,{enumerable:!0,configurable:!0,writable:!0,value:o}):t[r]=o,s=(e,s)=>{for(var a in s||(s={}))r.call(s,a)&&n(e,a,s[a]);if(t)for(var a of t(s))o.call(s,a)&&n(e,a,s[a]);return e};((e,t)=>{const r="__q_context__",o=window,n=new Set,a=new Set([e]),c="replace",i="forEach",l="target",f="getAttribute",p="isConnected",b="qvisible",u="_qwikjson_",y=(e,t)=>Array.from(e.querySelectorAll(t)),h=e=>{const t=[];return a.forEach((r=>t.push(...y(r,e)))),t},d=e=>{S(e),y(e,"[q\\\\:shadowroot]").forEach((e=>{const t=e.shadowRoot;t&&d(t)}))},m=e=>e&&"function"==typeof e.then,w=(e,t,r=t.type)=>{h("[on"+e+"\\\\:"+r+"]")[i]((o=>E(o,e,t,r)))},q=t=>{if(void 0===t[u]){let r=(t===e.documentElement?e.body:t).lastElementChild;for(;r;){if("SCRIPT"===r.tagName&&"qwik/json"===r[f]("type")){t[u]=JSON.parse(r.textContent[c](/\\\\x3C(\\/?script)/gi,"<$1"));break}r=r.previousElementSibling}}},v=(e,t)=>new CustomEvent(e,{detail:t}),E=async(t,o,n,a=n.type)=>{const i="on"+o+":"+a;t.hasAttribute("preventdefault:"+a)&&n.preventDefault();const l=t._qc_,b=l&&l.li.filter((e=>e[0]===i));if(b&&b.length>0){for(const e of b){const r=e[1].getFn([t,n],(()=>t[p]))(n,t),o=n.cancelBubble;m(r)&&await r,o&&n.stopPropagation()}return}const u=t[f](i);if(u){const o=t.closest("[q\\\\:container]"),a=o[f]("q:base"),i=o[f]("q:version")||"unknown",l=o[f]("q:manifest-hash")||"dev",b=new URL(a,e.baseURI);for(const f of u.split("\\n")){const u=new URL(f,b),y=u.href,h=u.hash[c](/^#?([^?[|]*).*$/,"$1")||"default",d=performance.now();let w,v,E;const _=f.startsWith("#"),A={qBase:a,qManifest:l,qVersion:i,href:y,symbol:h,element:t,reqTime:d};if(_){const t=o.getAttribute("q:instance");w=(e["qFuncs_"+t]||[])[Number.parseInt(h)],w||(v="sync",E=Error("sync handler error for symbol: "+h))}else{const e=u.href.split("#")[0];try{const t=import(e);q(o),w=(await t)[h],w||(v="no-symbol",E=Error(`${h} not in ${e}`))}catch(e){v||(v="async"),E=e}}if(!w){g("qerror",s({importError:v,error:E},A)),console.error(E);break}const k=e[r];if(t[p])try{e[r]=[t,n,u],_||g("qsymbol",s({},A));const o=w(n,t);m(o)&&await o}catch(e){g("qerror",s({error:e},A))}finally{e[r]=k}}}},g=(t,r)=>{e.dispatchEvent(v(t,r))},_=e=>e[c](/([A-Z])/g,(e=>"-"+e.toLowerCase())),A=async e=>{let t=_(e.type),r=e[l];for(w("-document",e,t);r&&r[f];){const o=E(r,"",e,t);let n=e.cancelBubble;m(o)&&await o,n=n||e.cancelBubble||r.hasAttribute("stoppropagation:"+e.type),r=e.bubbles&&!0!==n?r.parentElement:null}},k=e=>{w("-window",e,_(e.type))},C=()=>{var r;const s=e.readyState;if(!t&&("interactive"==s||"complete"==s)&&(a.forEach(d),t=1,g("qinit"),(null!=(r=o.requestIdleCallback)?r:o.setTimeout).bind(o)((()=>g("qidle"))),n.has(b))){const e=h("[on\\\\:"+b+"]"),t=new IntersectionObserver((e=>{for(const r of e)r.isIntersecting&&(t.unobserve(r[l]),E(r[l],"",v(b,r)))}));e[i]((e=>t.observe(e)))}},O=(e,t,r,o=!1)=>e.addEventListener(t,r,{capture:o,passive:!1}),S=(...e)=>{for(const t of e)"string"==typeof t?n.has(t)||(a.forEach((e=>O(e,t,A,!0))),O(o,t,k,!0),n.add(t)):a.has(t)||(n.forEach((e=>O(t,e,A,!0))),a.add(t))};if(!(r in e)){e[r]=0;const t=o.qwikevents;Array.isArray(t)&&S(...t),o.qwikevents={events:n,roots:a,push:S},O(e,"readystatechange",C),C()}})(document)})()';
  var QWIK_LOADER_DEFAULT_DEBUG = '(() => {\n    var __defProp = Object.defineProperty;\n    var __getOwnPropSymbols = Object.getOwnPropertySymbols;\n    var __hasOwnProp = Object.prototype.hasOwnProperty;\n    var __propIsEnum = Object.prototype.propertyIsEnumerable;\n    var __defNormalProp = (obj, key, value) => key in obj ? __defProp(obj, key, {\n        enumerable: !0,\n        configurable: !0,\n        writable: !0,\n        value: value\n    }) : obj[key] = value;\n    var __spreadValues = (a, b) => {\n        for (var prop in b || (b = {})) {\n            __hasOwnProp.call(b, prop) && __defNormalProp(a, prop, b[prop]);\n        }\n        if (__getOwnPropSymbols) {\n            for (var prop of __getOwnPropSymbols(b)) {\n                __propIsEnum.call(b, prop) && __defNormalProp(a, prop, b[prop]);\n            }\n        }\n        return a;\n    };\n    ((doc, hasInitialized) => {\n        const Q_CONTEXT = "__q_context__";\n        const win = window;\n        const events =  new Set;\n        const roots =  new Set([ doc ]);\n        const nativeQuerySelectorAll = (root, selector) => Array.from(root.querySelectorAll(selector));\n        const querySelectorAll = query => {\n            const elements = [];\n            roots.forEach((root => elements.push(...nativeQuerySelectorAll(root, query))));\n            return elements;\n        };\n        const findShadowRoots = fragment => {\n            processEventOrNode(fragment);\n            nativeQuerySelectorAll(fragment, "[q\\\\:shadowroot]").forEach((parent => {\n                const shadowRoot = parent.shadowRoot;\n                shadowRoot && findShadowRoots(shadowRoot);\n            }));\n        };\n        const isPromise = promise => promise && "function" == typeof promise.then;\n        const broadcast = (infix, ev, type = ev.type) => {\n            querySelectorAll("[on" + infix + "\\\\:" + type + "]").forEach((el => dispatch(el, infix, ev, type)));\n        };\n        const resolveContainer = containerEl => {\n            if (void 0 === containerEl._qwikjson_) {\n                let script = (containerEl === doc.documentElement ? doc.body : containerEl).lastElementChild;\n                while (script) {\n                    if ("SCRIPT" === script.tagName && "qwik/json" === script.getAttribute("type")) {\n                        containerEl._qwikjson_ = JSON.parse(script.textContent.replace(/\\\\x3C(\\/?script)/gi, "<$1"));\n                        break;\n                    }\n                    script = script.previousElementSibling;\n                }\n            }\n        };\n        const createEvent = (eventName, detail) => new CustomEvent(eventName, {\n            detail: detail\n        });\n        const dispatch = async (element, onPrefix, ev, eventName = ev.type) => {\n            const attrName = "on" + onPrefix + ":" + eventName;\n            element.hasAttribute("preventdefault:" + eventName) && ev.preventDefault();\n            const ctx = element._qc_;\n            const relevantListeners = ctx && ctx.li.filter((li => li[0] === attrName));\n            if (relevantListeners && relevantListeners.length > 0) {\n                for (const listener of relevantListeners) {\n                    const results = listener[1].getFn([ element, ev ], (() => element.isConnected))(ev, element);\n                    const cancelBubble = ev.cancelBubble;\n                    isPromise(results) && await results;\n                    cancelBubble && ev.stopPropagation();\n                }\n                return;\n            }\n            const attrValue = element.getAttribute(attrName);\n            if (attrValue) {\n                const container = element.closest("[q\\\\:container]");\n                const qBase = container.getAttribute("q:base");\n                const qVersion = container.getAttribute("q:version") || "unknown";\n                const qManifest = container.getAttribute("q:manifest-hash") || "dev";\n                const base = new URL(qBase, doc.baseURI);\n                for (const qrl of attrValue.split("\\n")) {\n                    const url = new URL(qrl, base);\n                    const href = url.href;\n                    const symbol = url.hash.replace(/^#?([^?[|]*).*$/, "$1") || "default";\n                    const reqTime = performance.now();\n                    let handler;\n                    let importError;\n                    let error;\n                    const isSync = qrl.startsWith("#");\n                    const eventData = {\n                        qBase: qBase,\n                        qManifest: qManifest,\n                        qVersion: qVersion,\n                        href: href,\n                        symbol: symbol,\n                        element: element,\n                        reqTime: reqTime\n                    };\n                    if (isSync) {\n                        const hash = container.getAttribute("q:instance");\n                        handler = (doc["qFuncs_" + hash] || [])[Number.parseInt(symbol)];\n                        if (!handler) {\n                            importError = "sync";\n                            error = new Error("sync handler error for symbol: " + symbol);\n                        }\n                    } else {\n                        const uri = url.href.split("#")[0];\n                        try {\n                            const module = import(\n                                                        uri);\n                            resolveContainer(container);\n                            handler = (await module)[symbol];\n                            if (!handler) {\n                                importError = "no-symbol";\n                                error = new Error(`${symbol} not in ${uri}`);\n                            }\n                        } catch (err) {\n                            importError || (importError = "async");\n                            error = err;\n                        }\n                    }\n                    if (!handler) {\n                        emitEvent("qerror", __spreadValues({\n                            importError: importError,\n                            error: error\n                        }, eventData));\n                        console.error(error);\n                        break;\n                    }\n                    const previousCtx = doc[Q_CONTEXT];\n                    if (element.isConnected) {\n                        try {\n                            doc[Q_CONTEXT] = [ element, ev, url ];\n                            isSync || emitEvent("qsymbol", __spreadValues({}, eventData));\n                            const results = handler(ev, element);\n                            isPromise(results) && await results;\n                        } catch (error2) {\n                            emitEvent("qerror", __spreadValues({\n                                error: error2\n                            }, eventData));\n                        } finally {\n                            doc[Q_CONTEXT] = previousCtx;\n                        }\n                    }\n                }\n            }\n        };\n        const emitEvent = (eventName, detail) => {\n            doc.dispatchEvent(createEvent(eventName, detail));\n        };\n        const camelToKebab = str => str.replace(/([A-Z])/g, (a => "-" + a.toLowerCase()));\n        const processDocumentEvent = async ev => {\n            let type = camelToKebab(ev.type);\n            let element = ev.target;\n            broadcast("-document", ev, type);\n            while (element && element.getAttribute) {\n                const results = dispatch(element, "", ev, type);\n                let cancelBubble = ev.cancelBubble;\n                isPromise(results) && await results;\n                cancelBubble = cancelBubble || ev.cancelBubble || element.hasAttribute("stoppropagation:" + ev.type);\n                element = ev.bubbles && !0 !== cancelBubble ? element.parentElement : null;\n            }\n        };\n        const processWindowEvent = ev => {\n            broadcast("-window", ev, camelToKebab(ev.type));\n        };\n        const processReadyStateChange = () => {\n            var _a;\n            const readyState = doc.readyState;\n            if (!hasInitialized && ("interactive" == readyState || "complete" == readyState)) {\n                roots.forEach(findShadowRoots);\n                hasInitialized = 1;\n                emitEvent("qinit");\n                (null != (_a = win.requestIdleCallback) ? _a : win.setTimeout).bind(win)((() => emitEvent("qidle")));\n                if (events.has("qvisible")) {\n                    const results = querySelectorAll("[on\\\\:qvisible]");\n                    const observer = new IntersectionObserver((entries => {\n                        for (const entry of entries) {\n                            if (entry.isIntersecting) {\n                                observer.unobserve(entry.target);\n                                dispatch(entry.target, "", createEvent("qvisible", entry));\n                            }\n                        }\n                    }));\n                    results.forEach((el => observer.observe(el)));\n                }\n            }\n        };\n        const addEventListener = (el, eventName, handler, capture = !1) => el.addEventListener(eventName, handler, {\n            capture: capture,\n            passive: !1\n        });\n        const processEventOrNode = (...eventNames) => {\n            for (const eventNameOrNode of eventNames) {\n                if ("string" == typeof eventNameOrNode) {\n                    if (!events.has(eventNameOrNode)) {\n                        roots.forEach((root => addEventListener(root, eventNameOrNode, processDocumentEvent, !0)));\n                        addEventListener(win, eventNameOrNode, processWindowEvent, !0);\n                        events.add(eventNameOrNode);\n                    }\n                } else if (!roots.has(eventNameOrNode)) {\n                    events.forEach((eventName => addEventListener(eventNameOrNode, eventName, processDocumentEvent, !0)));\n                    roots.add(eventNameOrNode);\n                }\n            }\n        };\n        if (!(Q_CONTEXT in doc)) {\n            doc[Q_CONTEXT] = 0;\n            const qwikevents = win.qwikevents;\n            Array.isArray(qwikevents) && processEventOrNode(...qwikevents);\n            win.qwikevents = {\n                events: events,\n                roots: roots,\n                push: processEventOrNode\n            };\n            addEventListener(doc, "readystatechange", processReadyStateChange);\n            processReadyStateChange();\n        }\n    })(document);\n})()';
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
      try {
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
      } catch (e) {
        console.error("Error auto fixing image", e, url);
      }
    } else {
      next();
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
  var image_size_runtime_default = "<style>\n  [data-qwik-cls] {\n    outline: 2px solid red;\n  }\n  [data-qwik-cls]::after {\n    position: absolute;\n    font-size: 12px;\n    content: 'CLS ' attr(data-qwik-cls);\n    font-family: monospace;\n    font-weight: bold;\n    background: red;\n    color: white;\n    margin: -2px;\n    padding: 1px;\n    line-height: 1;\n    pointer-events: none;\n  }\n  #qwik-image-warning-container {\n    position: absolute !important;\n    top: 0 !important;\n    left: 0 !important;\n    width: 0 !important;\n    overflow: visible !important;\n    height: 0 !important;\n    pointer-events: none !important;\n    contain: size layout style content;\n    z-index: 1;\n  }\n</style>\n<template id=\"qwik-image-warning-template\">\n  <style>\n    :host {\n      position: absolute;\n      border: 1px solid red;\n      pointer-events: none;\n      z-index: 1;\n      contain: layout size;\n    }\n\n    #icon {\n      border: 0;\n      margin: 5px;\n      color: black;\n      max-width: 100%;\n      width: 20px;\n      background: yellow;\n      border-radius: 100%;\n      height: 20px;\n      padding: 3px;\n      pointer-events: all;\n      cursor: pointer;\n    }\n\n    #icon svg {\n      width: 100%;\n      height: auto;\n      pointer-events: none;\n    }\n\n    dialog {\n      padding: 0;\n      border: 0;\n      margin: 0 5px;\n      background: #ffffe8;\n      color: black;\n      width: 250px;\n      font-size: 11px;\n      position: absolute;\n      inset-inline-start: unset;\n      inset-inline-end: unset;\n      border-radius: 5px;\n      pointer-events: all;\n      overflow: hidden;\n      box-shadow: 0px -2px 20px 0px #0000002e;\n      z-index: 10000;\n    }\n\n    .top {\n      bottom: calc(100% + 5px);\n    }\n    .bottom {\n      top: 40px;\n    }\n    .right {\n      inset-inline-start: 0;\n      inset-inline-end: unset;\n    }\n    .left {\n      inset-inline-start: unset;\n      inset-inline-end: calc(100% - 40px);\n    }\n\n    .content {\n      padding: 5px;\n    }\n\n    #loc {\n      background: #2e3801;\n      color: #d2d2d2;\n      font-family: monospace;\n      padding: 3px 5px;\n      pointer-events: all;\n      margin: 0;\n      border: 0;\n      cursor: pointer;\n      font-size: 11px;\n      width: calc(100% - 24px);\n      text-overflow: ellipsis;\n      overflow: hidden;\n      display: block;\n      direction: rtl;\n      text-align: right;\n    }\n    #loc:hover {\n      background: #3a4a01;\n    }\n\n    pre {\n      background: #f1fb8e;\n      padding: 5px;\n      margin: 5px 0;\n      border-radius: 3px;\n      user-select: none;\n    }\n\n    pre span {\n      user-select: all;\n    }\n\n    a {\n      text-decoration: underline;\n    }\n\n    #close {\n      border: 0;\n      width: 25px;\n      height: 25px;\n      position: absolute;\n      right: 0;\n      top: 0;\n      background: #ffe14f;\n      color: black;\n      font-weight: 900;\n      padding: 0;\n      margin: 0;\n      display: flex;\n      align-items: center;\n      justify-content: center;\n      line-height: 1;\n      cursor: pointer;\n    }\n    #close:hover {\n      background: #ffeb6f;\n    }\n\n    #action-btn {\n      border: 2px solid #18ae00;\n      padding: 2px 4px;\n      background: #50ff50;\n      border-radius: 5px;\n      color: #0c5500;\n      font-weight: 800;\n      font-size: 10px;\n      cursor: pointer;\n    }\n\n    p {\n      margin: 5px 0;\n    }\n\n    h2 {\n      font-weight: 900;\n      margin: 10px 0;\n    }\n  </style>\n  <button id=\"icon\" type=\"button\" aria-label=\"Open image dev dialog\">\n    <svg width=\"32\" height=\"32\" viewBox=\"0 0 24 24\">\n      <path\n        fill=\"currentColor\"\n        d=\"M2.725 21q-.275 0-.5-.138t-.35-.362q-.125-.225-.138-.488t.138-.512l9.25-16q.15-.25.388-.375T12 3q.25 0 .488.125t.387.375l9.25 16q.15.25.138.513t-.138.487q-.125.225-.35.363t-.5.137H2.725ZM12 18q.425 0 .713-.288T13 17q0-.425-.288-.713T12 16q-.425 0-.713.288T11 17q0 .425.288.713T12 18Zm0-3q.425 0 .713-.288T13 14v-3q0-.425-.288-.713T12 10q-.425 0-.713.288T11 11v3q0 .425.288.713T12 15Z\"\n      />\n    </svg>\n  </button>\n  <dialog>\n    <form method=\"dialog\">\n      <button id=\"close\" type=\"submit\" aria-label=\"Close\">X</button>\n    </form>\n    <button id=\"loc\"></button>\n    <div class=\"content\">\n      <h2 id=\"title\"></h2>\n      <p id=\"message\"></p>\n      <p class=\"action-container\"></p>\n    </div>\n  </dialog>\n</template>\n<div id=\"qwik-image-warning-container\"></div>\n<script>\n  (function () {\n    function getPositionClasses(target) {\n      const { x, y } = target.getBoundingClientRect();\n      const windowWidth = window.innerWidth;\n      let horizontal = 'right';\n      let vertical = 'bottom';\n      if (x > windowWidth - 260) {\n        horizontal = 'left';\n      }\n      return `${vertical} ${horizontal}`;\n    }\n    class ImageWarning extends HTMLElement {\n      #actionFn = null;\n      constructor() {\n        super();\n        this.attachShadow({ mode: 'open' });\n        this.shadowRoot.appendChild(\n          document.importNode(document.getElementById('qwik-image-warning-template').content, true)\n        );\n        const dialog = this.shadowRoot.querySelector('dialog');\n\n        this.shadowRoot.addEventListener('click', async (ev) => {\n          const target = ev.target;\n          if (target.nodeName === 'BUTTON') {\n            if (target.id === 'action-btn') {\n              if (this.#actionFn) {\n                this.#actionFn();\n                dialog.close();\n              }\n            } else if (target.id === 'icon') {\n              if (dialog.open) {\n                dialog.close();\n              } else {\n                dialog.className = getPositionClasses(target);\n                dialog.show();\n              }\n            } else if (target.id === 'loc' && target.dataset.url) {\n              globalThis.qwikOpenInEditor(target.dataset.url);\n            }\n          }\n        });\n      }\n\n      set loc(value) {\n        const anchor = this.shadowRoot.querySelector('#loc');\n        anchor.textContent = value;\n        if (globalThis.qwikOpenInEditor) {\n          anchor.dataset.url = value;\n        }\n      }\n\n      set header(value) {\n        this.shadowRoot.querySelector('#title').textContent = value;\n      }\n\n      set message(value) {\n        this.shadowRoot.querySelector('#message').innerHTML = value;\n      }\n\n      set actionFn(value) {\n        this.#actionFn = value;\n      }\n      set actionName(value) {\n        if (value) {\n          this.shadowRoot.querySelector('.action-container').innerHTML =\n            `<button id=\"action-btn\" type=\"button\">${value}</button>`;\n        }\n      }\n    }\n    customElements.define('image-warning', ImageWarning);\n\n    const shiftsMap = new Map();\n    const visibleNodes = new Map();\n    const imageContainer = document.querySelector('#qwik-image-warning-container');\n    let skip = false;\n\n    async function _getInfo(originalSrc) {\n      // Put all supported protocols here, see also packages/qwik/src/optimizer/src/plugins/image-size-server.ts\n      if (!/^(https?|file|capacitor):/.test(originalSrc)) {\n        return undefined;\n      }\n      const url = new URL('/__image_info', location.href);\n      url.searchParams.set('url', originalSrc);\n      const res = await fetch(url);\n      if (res.ok) {\n        return await res.json();\n      } else {\n        return null;\n      }\n    }\n\n    const map = new Map();\n    function getInfo(originalSrc) {\n      let p = map.get(originalSrc);\n      if (typeof p === 'undefined') {\n        p = _getInfo(originalSrc);\n        map.set(originalSrc, p);\n      }\n      return p;\n    }\n    function isDefinedUnit(value) {\n      return value.endsWith('px');\n    }\n    async function doImg(node) {\n      const scrollX = window.scrollX;\n      const scrollY = window.scrollY;\n      const rect = node.getBoundingClientRect();\n      const originalSrc = node.currentSrc;\n      const info = await getInfo(originalSrc);\n      let overlay = visibleNodes.get(node);\n      const wideScreen = window.innerWidth > 500;\n      if (info && wideScreen) {\n        let layoutInvalidation = false;\n        const loc = node.getAttribute('data-qwik-inspector');\n        const browserArea = rect.width * rect.height;\n        if (!node.hasAttribute('width') || !node.hasAttribute('height')) {\n          skip = true;\n          const computedStyles = node.computedStyleMap();\n          const hasAspect = computedStyles.get('aspect-ratio').toString() !== 'auto';\n          const hasWidth = isDefinedUnit(computedStyles.get('width').toString());\n          const hasHeight = isDefinedUnit(computedStyles.get('height').toString());\n          const isAbsolute = computedStyles.get('position').toString() === 'absolute';\n          layoutInvalidation =\n            browserArea > 1000 && !isAbsolute && !hasAspect && (!hasWidth || !hasHeight);\n        }\n        const realArea = info.width && info.height;\n        const threshholdArea = realArea * 0.5;\n        const tooBig = browserArea < threshholdArea && info.type !== 'svg';\n        skip = false;\n        if (layoutInvalidation || tooBig) {\n          if (!overlay) {\n            overlay = document.createElement('image-warning');\n            imageContainer.appendChild(overlay);\n            visibleNodes.set(node, overlay);\n          }\n          overlay.style.top = rect.top + scrollY + 'px';\n          overlay.style.left = rect.left + scrollX + 'px';\n          overlay.style.width = rect.width + 'px';\n          overlay.style.height = rect.height + 'px';\n          overlay.info = info;\n          overlay.loc = loc;\n          if (layoutInvalidation) {\n            const clipBoard = `width=\"${info.width}\" height=\"${info.height}\"`;\n            overlay.header = 'Perf: layout shift';\n            overlay.message = `Image\\'s size is unknown until it\\'s loaded, <a href=\"https://web.dev/cls/\" target=\"_blank\" rel=\"noopener noreferrer\">causing layout shift</a>.</p><p>To solve this problem set the width/height in the img tag:</p><pre>&lt;img <span>${clipBoard}</span></pre>`;\n            const uniqueLoc =\n              document.querySelectorAll('[data-qwik-inspector=\"' + loc + '\"]').length === 1;\n            if (loc) {\n              if (uniqueLoc) {\n                overlay.actionName = 'Auto fix';\n                overlay.actionFn = async () => {\n                  const url = new URL('/__image_fix', location.href);\n                  url.searchParams.set('loc', loc);\n                  url.searchParams.set('width', info.width);\n                  url.searchParams.set('height', info.height);\n                  if (!node.srcset) {\n                    url.searchParams.set('src', node.currentSrc);\n                    url.searchParams.set('currentHref', location.href);\n                  }\n                  await fetch(url, {\n                    method: 'POST',\n                  });\n                };\n              } else {\n                overlay.actionName = 'Open in editor';\n                overlay.actionFn = async () => {\n                  await navigator.clipboard.writeText(clipBoard);\n                  globalThis.qwikOpenInEditor(loc);\n                };\n              }\n            }\n          } else if (tooBig) {\n            overlay.header = 'Perf: properly size image';\n            overlay.message = `The image is too big, <a href=\"https://developer.chrome.com/en/docs/lighthouse/performance/uses-responsive-images/\" target=\"_blank\" rel=\"noopener noreferrer\">hurting performance</a>, it should be resized to the size it\\'s displayed at. The image dimensions are ${info.width} x ${info.height} but it\\'s displayed at ${rect.width}x${rect.height}.</p>`;\n          }\n          return;\n        }\n      }\n\n      if (overlay) {\n        overlay.remove();\n        visibleNodes.delete(node);\n      }\n    }\n\n    async function updateImg(node) {\n      const overlay = visibleNodes.get(node);\n      if (!node.isConnected) {\n        if (overlay) {\n          overlay.remove();\n          visibleNodes.delete(node);\n        }\n      } else if (node.complete) {\n        doImg(node);\n      }\n    }\n\n    const resizeObserver = new ResizeObserver((entries) => {\n      if (!skip) {\n        for (const entry of entries) {\n          updateImg(entry.target);\n        }\n      }\n    });\n\n    const observer = new MutationObserver((entry) => {\n      for (const mutation of entry) {\n        for (const node of mutation.addedNodes) {\n          if (node.nodeName === 'IMG') {\n            resizeObserver.observe(node);\n          } else if (node.nodeType === 1) {\n            node.querySelectorAll('img').forEach((img) => {\n              resizeObserver.observe(img);\n            });\n          }\n        }\n        for (const node of mutation.removedNodes) {\n          if (node.nodeName === 'IMG') {\n            updateImg(node);\n            resizeObserver.unobserve(node);\n          } else if (node.nodeType === 1) {\n            node.querySelectorAll('img').forEach((img) => {\n              updateImg(img);\n              resizeObserver.unobserve(img);\n            });\n          }\n        }\n      }\n    });\n    let perfObserver;\n    let DCLS = 0;\n    const activate = () => {\n      setTimeout(() => {\n        if (perfObserver) {\n          perfObserver.disconnect();\n          if (DCLS > 0.005) {\n            console.error('Detected Layout Shift during page load', DCLS);\n          }\n        }\n        observer.observe(document.body, {\n          childList: true,\n          subtree: true,\n        });\n        document.body.querySelectorAll('img').forEach((node) => {\n          resizeObserver.observe(node);\n        });\n      }, 100);\n    };\n    if (document.readyState === 'complete') {\n      activate();\n    } else {\n      window.addEventListener('load', activate);\n    }\n    const pageAccessedByReload =\n      performance?.navigation.type === 1 ||\n      performance\n        .getEntriesByType('navigation')\n        .map((nav) => nav.type)\n        .includes('reload');\n    if (typeof PerformanceObserver !== 'undefined' && !pageAccessedByReload) {\n      const shiftsMap = new Map();\n      perfObserver = new PerformanceObserver((list) => {\n        list.getEntries().forEach((entry) => {\n          if (entry.hadRecentInput) {\n            return; // Ignore shifts after recent input.\n          }\n          if (entry.value > 0.006) {\n            for (const source of entry.sources) {\n              if (\n                source.node &&\n                source.node.nodeType === 1 &&\n                source.node.nodeName !== 'IMAGE-WARNING'\n              ) {\n                source.node.setAttribute('data-qwik-cls', Number(entry.value).toFixed(3));\n              }\n            }\n          }\n          DCLS += entry.value;\n        });\n      });\n      perfObserver.observe({ type: 'layout-shift', buffered: true });\n    }\n  })();\n<\/script>\n";
  var click_to_component_default = "<style>\n  #qwik-inspector-overlay {\n    position: fixed;\n    background: rgba(24, 182, 246, 0.27);\n    pointer-events: none;\n    box-sizing: border-box;\n    border: 2px solid rgba(172, 126, 244, 0.46);\n    border-radius: 4px;\n    contain: strict;\n    cursor: pointer;\n    z-index: 999999;\n  }\n  #qwik-inspector-info-popup {\n    position: fixed;\n    bottom: 10px;\n    right: 10px;\n    font-family: monospace;\n    background: #000000c2;\n    color: white;\n    padding: 10px 20px;\n    border-radius: 8px;\n    box-shadow:\n      0 20px 25px -5px rgb(0 0 0 / 34%),\n      0 8px 10px -6px rgb(0 0 0 / 24%);\n    backdrop-filter: blur(4px);\n    -webkit-animation: fadeOut 0.3s 3s ease-in-out forwards;\n    animation: fadeOut 0.3s 3s ease-in-out forwards;\n    z-index: 999999;\n    contain: layout;\n  }\n  #qwik-inspector-info-popup p {\n    margin: 0px;\n  }\n  @-webkit-keyframes fadeOut {\n    0% {\n      opacity: 1;\n    }\n    100% {\n      opacity: 0;\n    }\n  }\n\n  @keyframes fadeOut {\n    0% {\n      opacity: 1;\n    }\n    100% {\n      opacity: 0;\n      visibility: hidden;\n    }\n  }\n</style>\n<div id=\"qwik-inspector-info-popup\" aria-hidden=\"true\">Click-to-Source</div>\n<script>\n  (function () {\n    const inspectAttribute = 'data-qwik-inspector';\n    const hotKeys = globalThis.qwikdevtools.hotKeys;\n    const srcDir = globalThis.qwikdevtools.srcDir;\n    document.querySelector('#qwik-inspector-info-popup').textContent =\n      `Click-to-Source: ${hotKeys.join(' + ')}`;\n    console.debug(\n      '%c🔍 Qwik Click-To-Source',\n      'background: #564CE0; color: white; padding: 2px 3px; border-radius: 2px; font-size: 0.8em;',\n      `Hold-press the '${hotKeys.join(' + ')}' key${\n        (hotKeys.length > 1 && 's') || ''\n      } and click a component to jump directly to the source code in your IDE!`\n    );\n    window.__qwik_inspector_state = {\n      pressedKeys: new Set(),\n    };\n    const origin = 'http://local.local';\n    const body = document.body;\n    const overlay = document.createElement('div');\n    overlay.id = 'qwik-inspector-overlay';\n    overlay.setAttribute('aria-hidden', 'true');\n    body.appendChild(overlay);\n\n    function findContainer(el) {\n      if (el && el instanceof Element) {\n        return el.closest(`[${inspectAttribute}]`);\n      }\n      return null;\n    }\n\n    document.addEventListener(\n      'keydown',\n      (event) => {\n        window.__qwik_inspector_state.pressedKeys.add(event.code);\n        updateOverlay();\n      },\n      { capture: true }\n    );\n\n    document.addEventListener(\n      'keyup',\n      (event) => {\n        window.__qwik_inspector_state.pressedKeys.delete(event.code);\n        updateOverlay();\n      },\n      { capture: true }\n    );\n\n    window.addEventListener(\n      'blur',\n      (event) => {\n        window.__qwik_inspector_state.pressedKeys.clear();\n        updateOverlay();\n      },\n      { capture: true }\n    );\n\n    document.addEventListener(\n      'mouseover',\n      (event) => {\n        const target = findContainer(event.target);\n        if (target) {\n          window.__qwik_inspector_state.hoveredElement = target;\n        } else {\n          window.__qwik_inspector_state.hoveredElement = undefined;\n        }\n        updateOverlay();\n      },\n      { capture: true }\n    );\n\n    document.addEventListener(\n      'click',\n      (event) => {\n        if (isActive()) {\n          window.__qwik_inspector_state.pressedKeys.clear();\n          const target = findContainer(event.target);\n          if (target) {\n            event.preventDefault();\n            const inspectUrl = target.getAttribute(inspectAttribute);\n            if (inspectUrl !== 'false') {\n              body.style.setProperty('cursor', 'progress');\n              qwikOpenInEditor(inspectUrl);\n            }\n          }\n        }\n      },\n      { capture: true }\n    );\n\n    globalThis.qwikOpenInEditor = function (path) {\n      const isWindows = navigator.platform.includes('Win');\n      const resolvedURL = new URL(path, isWindows ? origin : srcDir);\n      if (resolvedURL.origin === origin) {\n        const params = new URLSearchParams();\n        const prefix = isWindows ? srcDir : '';\n        params.set('file', prefix + resolvedURL.pathname);\n        fetch('/__open-in-editor?' + params.toString());\n      } else {\n        location.href = resolvedURL.href;\n      }\n    };\n    document.addEventListener(\n      'contextmenu',\n      (event) => {\n        if (isActive()) {\n          window.__qwik_inspector_state.pressedKeys.clear();\n          const target = findContainer(event.target);\n          if (target) {\n            event.preventDefault();\n          }\n        }\n      },\n      { capture: true }\n    );\n\n    function updateOverlay() {\n      const hoverElement = window.__qwik_inspector_state.hoveredElement;\n      if (hoverElement && isActive()) {\n        const rect = hoverElement.getBoundingClientRect();\n        overlay.style.setProperty('height', rect.height + 'px');\n        overlay.style.setProperty('width', rect.width + 'px');\n        overlay.style.setProperty('top', rect.top + 'px');\n        overlay.style.setProperty('left', rect.left + 'px');\n        overlay.style.setProperty('visibility', 'visible');\n        body.style.setProperty('cursor', 'pointer');\n      } else {\n        overlay.style.setProperty('height', '0px');\n        overlay.style.setProperty('width', '0px');\n        overlay.style.setProperty('visibility', 'hidden');\n        body.style.removeProperty('cursor');\n      }\n    }\n\n    function checkKeysArePressed() {\n      const activeKeys = Array.from(window.__qwik_inspector_state.pressedKeys).map((key) =>\n        key ? key.replace(/(Left|Right)$/g, '') : undefined\n      );\n      return hotKeys.every((key) => activeKeys.includes(key));\n    }\n\n    function isActive() {\n      return checkKeysArePressed();\n    }\n    window.addEventListener('resize', updateOverlay);\n    document.addEventListener('scroll', updateOverlay);\n  })();\n<\/script>\n";
  var perf_warning_default = "<script>\n  if (!window.__qwikViteLog) {\n    window.__qwikViteLog = true;\n    console.debug(\n      '%c⭐️ Qwik Dev SSR Mode',\n      'background: #0c75d2; color: white; padding: 2px 3px; border-radius: 2px; font-size: 0.8em;',\n      \"App is running in SSR development mode!\\n - Additional JS is loaded by Vite for debugging and live reloading\\n - Rendering performance might not be optimal\\n - Delayed interactivity because prefetching is disabled\\n - Vite dev bundles do not represent production output\\n\\nProduction build can be tested running 'npm run preview'\"\n    );\n  }\n<\/script>\n";
  var error_host_default = "<script>\n  document.addEventListener('qerror', (ev) => {\n    const ErrorOverlay = customElements.get('vite-error-overlay');\n    if (!ErrorOverlay) {\n      return;\n    }\n    const err = ev.detail.error;\n    const overlay = new ErrorOverlay(err);\n    document.body.appendChild(overlay);\n  });\n<\/script>\n<script>\n  /**\n   * Usage:\n   *\n   * <errored-host></errored-host>\n   */\n  class ErroredHost extends HTMLElement {\n    get _root() {\n      return this.shadowRoot || this;\n    }\n\n    constructor() {\n      super();\n      const self = this;\n\n      this.state = {};\n      if (!this.props) {\n        this.props = {};\n      }\n\n      this.componentProps = ['children', 'error'];\n\n      // used to keep track of all nodes created by show/for\n      this.nodesToDestroy = [];\n      // batch updates\n      this.pendingUpdate = false;\n\n      this.attachShadow({ mode: 'open' });\n    }\n\n    destroyAnyNodes() {\n      // destroy current view template refs before rendering again\n      this.nodesToDestroy.forEach((el) => el.remove());\n      this.nodesToDestroy = [];\n    }\n\n    connectedCallback() {\n      this.getAttributeNames().forEach((attr) => {\n        const jsVar = attr.replace(/-/g, '');\n        const regexp = new RegExp(jsVar, 'i');\n        this.componentProps.forEach((prop) => {\n          if (regexp.test(prop)) {\n            const attrValue = this.getAttribute(attr);\n            if (this.props[prop] !== attrValue) {\n              this.props[prop] = attrValue;\n            }\n          }\n        });\n      });\n\n      this._root.innerHTML = `\n\n        <template data-el=\"show-errored-host\">\n        <div class=\"error\">\n          <template data-el=\"div-errored-host-2\">\n            \x3c!-- String(props.error) --\x3e\n          </template>\n        </div>\n        </template>\n\n        <div class=\"arrow\">👇 Uncaught error happened here 👇\n          <span class=\"dev-tools\">DevTools: Cmd+Alt+I</span>\n        </div>\n        <div class=\"div\">\n          <slot></slot>\n        </div>\n\n        <style>\n          .error {\n            border-radius: 5px 5px 0px 0;\n            background: black;\n            color: white;\n            font-family: monospace;\n            font-size: 12px;\n            margin: 0;\n            padding: 10px;\n          }\n          .arrow {\n            background: #f47e81;\n            color: black;\n            font-size: 14px;\n            padding: 10px;\n            text-align: center;\n            font-family: sans-serif;\n          }\n          .dev-tools {\n            background: red;\n            padding: 2px 5px;\n            border-radius: 3px;\n            font-weight: 800;\n          }\n          .div {\n            outline: 5px solid red;\n            border-radius: 10px;\n          }\n        </style>`;\n      this.pendingUpdate = true;\n\n      this.render();\n      this.onMount();\n      this.pendingUpdate = false;\n      this.update();\n    }\n\n    showContent(el) {\n      // https://developer.mozilla.org/en-US/docs/Web/API/HTMLTemplateElement/content\n      // grabs the content of a node that is between <template> tags\n      // iterates through child nodes to register all content including text elements\n      // attaches the content after the template\n\n      const elementFragment = el.content.cloneNode(true);\n      const children = Array.from(elementFragment.childNodes);\n      children.forEach((child) => {\n        if (el?.scope) {\n          child.scope = el.scope;\n        }\n        if (el?.context) {\n          child.context = el.context;\n        }\n        this.nodesToDestroy.push(child);\n      });\n      el.after(elementFragment);\n    }\n\n    onMount() {}\n\n    onUpdate() {}\n\n    update() {\n      if (this.pendingUpdate === true) {\n        return;\n      }\n      this.pendingUpdate = true;\n      this.render();\n      this.onUpdate();\n      this.pendingUpdate = false;\n    }\n\n    render() {\n      // re-rendering needs to ensure that all nodes generated by for/show are refreshed\n      this.destroyAnyNodes();\n      this.updateBindings();\n    }\n\n    updateBindings() {\n      this._root.querySelectorAll(\"[data-el='show-errored-host']\").forEach((el) => {\n        const whenCondition = this.props.error;\n        if (whenCondition) {\n          this.showContent(el);\n        }\n      });\n\n      this._root.querySelectorAll(\"[data-el='div-errored-host-2']\").forEach((el) => {\n        this.renderTextNode(el, String(this.props.error));\n      });\n    }\n\n    // Helper to render content\n    renderTextNode(el, text) {\n      const textNode = document.createTextNode(text);\n      if (el?.scope) {\n        textNode.scope = el.scope;\n      }\n      if (el?.context) {\n        textNode.context = el.context;\n      }\n      el.after(textNode);\n      this.nodesToDestroy.push(el.nextSibling);\n    }\n  }\n\n  customElements.define('errored-host', ErroredHost);\n<\/script>\n";
  var SYNC_QRL = "<sync>";
  function getOrigin(req) {
    const {PROTOCOL_HEADER: PROTOCOL_HEADER, HOST_HEADER: HOST_HEADER} = process.env;
    const headers = req.headers;
    const protocol = PROTOCOL_HEADER && headers[PROTOCOL_HEADER.toLowerCase()] || (req.socket.encrypted || req.connection.encrypted ? "https" : "http");
    const host = HOST_HEADER && headers[HOST_HEADER.toLowerCase()] || headers[":authority"] || headers.host;
    return `${protocol}://${host}`;
  }
  var encode = url => encodeURIComponent(url).replaceAll("%2F", "/").replaceAll("%40", "@").replaceAll("%3A", ":");
  function createSymbolMapper(base, opts, foundQrls, path, sys) {
    const normalizePath = makeNormalizePath(sys);
    return (symbolName, mapper, parent) => {
      if (symbolName === SYNC_QRL) {
        return [ symbolName, "" ];
      }
      const hash = getSymbolHash(symbolName);
      if (!parent) {
        console.warn(`qwik vite-dev-server symbolMapper: parent not provided for ${symbolName}, falling back to foundQrls.`);
        parent = foundQrls.get(hash);
      }
      if (!parent) {
        console.warn(`qwik vite-dev-server symbolMapper: ${symbolName} not in foundQrls, falling back to mapper.`);
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
      const qrlFile = `${encode(qrlPath)}/${symbolName.toLowerCase()}.js?_qrl_parent=${encode(parentFile)}`;
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
  async function configureDevServer(base, server, opts, sys, path, isClientDevOnly, clientDevInput, foundQrls, devSsrServer) {
    symbolMapper = lazySymbolMapper = createSymbolMapper(base, opts, foundQrls, path, sys);
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
    if (!devSsrServer) {
      return;
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
          const firstInput = Object.values(opts.input)[0];
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
                var _a, _b;
                const hook = null == (_b = null == (_a = v.info) ? void 0 : _a.meta) ? void 0 : _b.hook;
                let url2 = v.url;
                v.lastHMRTimestamp && (url2 += `?t=${v.lastHMRTimestamp}`);
                hook && (manifest.mapping[hook.name] = relativeURL(url2, opts.rootDir));
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
    const fileFilter = qwikViteOpts.fileFilter || (() => true);
    const injections = [];
    const qwikPlugin = createPlugin(qwikViteOpts.optimizerOptions);
    async function loadQwikInsights(clientOutDir2) {
      const sys = qwikPlugin.getSys();
      const cwdRelativePath = absolutePathAwareJoin(sys.path, rootDir || ".", clientOutDir2 ?? "dist", "q-insights.json");
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
      getInsightsManifest: clientOutDir2 => loadQwikInsights(clientOutDir2),
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
        var _a, _b, _c, _d, _e, _f, _g, _h, _i, _j, _k, _l, _m, _n, _o, _p, _q, _r, _s, _t, _u, _v;
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
          type: "hook"
        } : "ssr" === target ? qwikViteOpts.entryStrategy = {
          type: "hoist"
        } : "lib" === target && (qwikViteOpts.entryStrategy = {
          type: "inline"
        });
        const shouldFindVendors = !qwikViteOpts.disableVendorScan && ("lib" !== target || "serve" === viteCommand);
        const vendorRoots = shouldFindVendors ? await findQwikRoots(sys, sys.cwd()) : [];
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
          vendorRoots: [ ...qwikViteOpts.vendorRoots ?? [], ...vendorRoots.map((v => v.path)) ],
          outDir: null == (_c = viteConfig.build) ? void 0 : _c.outDir,
          assetsDir: useAssetsDir ? viteAssetsDir : void 0,
          devTools: qwikViteOpts.devTools,
          sourcemap: !!(null == (_d = viteConfig.build) ? void 0 : _d.sourcemap),
          lint: qwikViteOpts.lint
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
            } catch (e) {}
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
        const vendorIds = vendorRoots.map((v => v.id));
        const isDevelopment = "development" === buildMode;
        const qDevKey = "globalThis.qDev";
        const qTestKey = "globalThis.qTest";
        const qInspectorKey = "globalThis.qInspector";
        const qSerializeKey = "globalThis.qSerialize";
        const qDev = (null == (_q = null == viteConfig ? void 0 : viteConfig.define) ? void 0 : _q[qDevKey]) ?? isDevelopment;
        const qInspector = (null == (_r = null == viteConfig ? void 0 : viteConfig.define) ? void 0 : _r[qInspectorKey]) ?? isDevelopment;
        const qSerialize = (null == (_s = null == viteConfig ? void 0 : viteConfig.define) ? void 0 : _s[qSerializeKey]) ?? isDevelopment;
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
            }
          },
          define: {
            [qDevKey]: qDev,
            [qInspectorKey]: qInspector,
            [qSerializeKey]: qSerialize,
            [qTestKey]: JSON.stringify("test" === process.env.NODE_ENV)
          }
        };
        if (!qwikViteOpts.csr) {
          const buildOutputDir = "client" === target && viteConfig.base ? path.join(opts.outDir, viteConfig.base) : opts.outDir;
          updatedViteConfig.build.cssCodeSplit = false;
          updatedViteConfig.build.outDir = buildOutputDir;
          updatedViteConfig.build.rollupOptions = {
            input: opts.input,
            output: normalizeRollupOutputOptions(opts, null == (_u = null == (_t = viteConfig.build) ? void 0 : _t.rollupOptions) ? void 0 : _u.output, useAssetsDir).map((outputOptsObj => {
              outputOptsObj.dir = buildOutputDir;
              return outputOptsObj;
            })),
            preserveEntrySignatures: "exports-only",
            onwarn: (warning, warn) => {
              if ("typescript" === warning.plugin && warning.message.includes("outputToFilesystem")) {
                return;
              }
              warn(warning);
            }
          };
          if ("ssr" === opts.target) {
            if ("build" === viteCommand) {
              updatedViteConfig.publicDir = false;
              updatedViteConfig.build.ssr = true;
              null == (null == (_v = viteConfig.build) ? void 0 : _v.minify) && "production" === buildMode && (updatedViteConfig.build.minify = "esbuild");
            }
          } else {
            "client" === opts.target ? isClientDevOnly && !opts.csr && (updatedViteConfig.build.rollupOptions.input = clientDevInput) : "lib" === opts.target ? updatedViteConfig.build.minify = false : updatedViteConfig.define = {
              [qDevKey]: true,
              [qTestKey]: true,
              [qInspectorKey]: false
            };
          }
          globalThis.qDev = qDev;
          globalThis.qTest = true;
          globalThis.qInspector = qInspector;
        }
        return updatedViteConfig;
      },
      async configResolved(config) {
        var _a, _b;
        basePathname = config.base;
        if (!(basePathname.startsWith("/") && basePathname.endsWith("/"))) {
          console.error("warning: vite's config.base must begin and end with /. This will be an error in v2. If you have a valid use case, please open an issue.");
          basePathname.endsWith("/") || (basePathname += "/");
        }
        const sys = qwikPlugin.getSys();
        if ("node" === sys.env && !qwikViteOpts.entryStrategy) {
          try {
            const entryStrategy = await loadQwikInsights(qwikViteOpts.csr || null == (_a = qwikViteOpts.client) ? void 0 : _a.outDir);
            entryStrategy && (qwikViteOpts.entryStrategy = entryStrategy);
          } catch (e) {}
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
        if (id.startsWith("\0") || !fileFilter(id, "transform")) {
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
            await configureDevServer(basePathname, server, opts, sys, path, isClientDevOnly, clientDevInput, qwikPlugin.foundQrls, devSsrServer);
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
      onLog(level, log) {
        var _a, _b, _c;
        if ("vite-plugin-qwik" == log.plugin) {
          const color = LOG_COLOR[level] || ANSI_COLOR.White;
          const frames = (log.frame || "").split("\n").map((line => (line.match(/^\s*\^\s*$/) ? ANSI_COLOR.BrightWhite : ANSI_COLOR.BrightBlack) + line));
          console[level](`${color}%s\n${ANSI_COLOR.BrightWhite}%s\n%s${ANSI_COLOR.RESET}`, `[${log.plugin}](${level}): ${log.message}\n`, `  ${null == (_a = null == log ? void 0 : log.loc) ? void 0 : _a.file}:${null == (_b = null == log ? void 0 : log.loc) ? void 0 : _b.line}:${null == (_c = null == log ? void 0 : log.loc) ? void 0 : _c.column}\n`, `  ${frames.join("\n  ")}\n`);
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
    const map = new Map;
    for (const bundleName in graph) {
      const bundle = graph[bundleName];
      const index = bundleGraph.length;
      const deps = [];
      bundle.imports && deps.push(...bundle.imports);
      bundle.dynamicImports && deps.push(...bundle.dynamicImports);
      map.set(bundleName, {
        index: index,
        deps: deps
      });
      bundleGraph.push(bundleName);
      while (index + deps.length >= bundleGraph.length) {
        bundleGraph.push(null);
      }
    }
    for (const bundleName in graph) {
      const {index: index, deps: deps} = map.get(bundleName);
      for (let i = 0; i < deps.length; i++) {
        const depName = deps[i];
        const dep = map.get(depName);
        const depIndex = null == dep ? void 0 : dep.index;
        if (void 0 == depIndex) {
          throw new Error(`Missing dependency: ${depName}`);
        }
        bundleGraph[index + i + 1] = depIndex;
      }
    }
    return bundleGraph;
  }
  return module.exports;
}("object" === typeof module && module.exports ? module : {
  exports: {}
});