"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var __values = (this && this.__values) || function (o) {
    var m = typeof Symbol === "function" && o[Symbol.iterator], i = 0;
    if (m) return m.call(o);
    return {
        next: function () {
            if (o && i >= o.length) o = void 0;
            return { value: o && o[i++], done: !o };
        }
    };
};
var __read = (this && this.__read) || function (o, n) {
    var m = typeof Symbol === "function" && o[Symbol.iterator];
    if (!m) return o;
    var i = m.call(o), r, ar = [], e;
    try {
        while ((n === void 0 || n-- > 0) && !(r = i.next()).done) ar.push(r.value);
    }
    catch (error) { e = { error: error }; }
    finally {
        try {
            if (r && !r.done && (m = i["return"])) m.call(i);
        }
        finally { if (e) throw e.error; }
    }
    return ar;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var Store_1 = __importDefault(require("../core/Store"));
var fs_1 = require("fs");
var path_1 = require("path");
var os_1 = require("os");
var version = require("../../package.json").version;
var FOLDER = path_1.join(os_1.tmpdir(), "keya-v" + version);
var FileSystemStore = /** @class */ (function (_super) {
    __extends(FileSystemStore, _super);
    function FileSystemStore() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.file = "";
        // Hardware interactions
        _this.store = {};
        return _this;
    }
    FileSystemStore.prototype.initalize = function () {
        return __awaiter(this, void 0, void 0, function () {
            var e_1, e_2;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        this.file = path_1.join(FOLDER, this.name + "-v" + this.version + ".json");
                        _a.label = 1;
                    case 1:
                        _a.trys.push([1, 3, , 9]);
                        return [4 /*yield*/, fs_1.promises.access(this.file, fs_1.constants.F_OK | fs_1.constants.R_OK | fs_1.constants.W_OK)];
                    case 2:
                        _a.sent();
                        return [3 /*break*/, 9];
                    case 3:
                        e_1 = _a.sent();
                        _a.label = 4;
                    case 4:
                        _a.trys.push([4, 6, 7, 8]);
                        return [4 /*yield*/, fs_1.promises.mkdir(path_1.join(FOLDER), { recursive: true })];
                    case 5:
                        _a.sent();
                        return [3 /*break*/, 8];
                    case 6:
                        e_2 = _a.sent();
                        if (e_2.code != "EEXIST") {
                            return [2 /*return*/, Promise.reject(new Error("Could not make keya directory. Make sure temporary file has correct permissions"))];
                        }
                        return [3 /*break*/, 8];
                    case 7: 
                    // Make file
                    return [2 /*return*/, fs_1.promises.writeFile(this.file, "{}")];
                    case 8: return [3 /*break*/, 9];
                    case 9: return [2 /*return*/];
                }
            });
        });
    };
    // Get all stores
    FileSystemStore.stores = function () {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                return [2 /*return*/, fs_1.promises.readdir(FOLDER).then(function (files) {
                        var e_3, _a;
                        var stores = [];
                        try {
                            for (var files_1 = __values(files), files_1_1 = files_1.next(); !files_1_1.done; files_1_1 = files_1.next()) {
                                var file = files_1_1.value;
                                var _b = __read(file.match(/([A-z]+)\-v([0-9]+)(\.json)/) || [
                                    null,
                                    null,
                                    null
                                ], 3), name_1 = _b[1], version_1 = _b[2];
                                // Ignore files which aren't keya files
                                if (!name_1 || !version_1)
                                    continue;
                                stores.push(new FileSystemStore(name_1));
                            }
                        }
                        catch (e_3_1) { e_3 = { error: e_3_1 }; }
                        finally {
                            try {
                                if (files_1_1 && !files_1_1.done && (_a = files_1.return)) _a.call(files_1);
                            }
                            finally { if (e_3) throw e_3.error; }
                        }
                        return stores;
                    })];
            });
        });
    };
    FileSystemStore.prototype.load = function () {
        return __awaiter(this, void 0, void 0, function () {
            var _this = this;
            return __generator(this, function (_a) {
                return [2 /*return*/, fs_1.promises.readFile(this.file).then(function (buffer) {
                        _this.store = JSON.parse(buffer.toString());
                    })];
            });
        });
    };
    FileSystemStore.prototype.save = function () {
        return __awaiter(this, void 0, void 0, function () {
            var savable;
            return __generator(this, function (_a) {
                savable = JSON.stringify(this.store);
                return [2 /*return*/, fs_1.promises.writeFile(this.file, savable)];
            });
        });
    };
    return FileSystemStore;
}(Store_1.default));
exports.default = FileSystemStore;
