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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var Store_1 = __importDefault(require("../core/Store"));
function openDB(name) {
    var open = indexedDB.open("keya-" + name, 1);
    return new Promise(function (resolve, reject) {
        open.onupgradeneeded = function () {
            open.result.createObjectStore("docs", { keyPath: "name" });
        };
        open.onsuccess = function () {
            try {
                var db = open.result;
                var tx = db.transaction("docs", "readwrite");
                var docs = tx.objectStore("docs");
                resolve(docs);
            }
            catch (e) {
                reject(e);
            }
        };
        open.onerror = reject;
    });
}
var IndexedDBStore = /** @class */ (function (_super) {
    __extends(IndexedDBStore, _super);
    function IndexedDBStore() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.index = null;
        // Hardware interactions
        _this.store = {};
        return _this;
    }
    IndexedDBStore.prototype.initalize = function () {
        return __awaiter(this, void 0, void 0, function () {
            var stores, _a;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0: return [4 /*yield*/, IndexedDBStore.stores()];
                    case 1:
                        stores = _b.sent();
                        if (!stores.includes(this.name)) {
                            stores.push(this.name);
                            localStorage.setItem("keya-idb-stores", stores.join(","));
                        }
                        _a = this;
                        return [4 /*yield*/, openDB(this.name)];
                    case 2:
                        _a.index = _b.sent();
                        return [2 /*return*/];
                }
            });
        });
    };
    IndexedDBStore.prototype.load = function () {
        return __awaiter(this, void 0, void 0, function () {
            var top;
            var _this = this;
            return __generator(this, function (_a) {
                top = this;
                return [2 /*return*/, new Promise(function (resolve, reject) {
                        _this.index.getAll().onsuccess = function (event) {
                            var e_1, _a;
                            try {
                                for (var _b = __values(this.result), _c = _b.next(); !_c.done; _c = _b.next()) {
                                    var record = _c.value;
                                    top.store[record.key] = record.value;
                                }
                            }
                            catch (e_1_1) { e_1 = { error: e_1_1 }; }
                            finally {
                                try {
                                    if (_c && !_c.done && (_a = _b.return)) _a.call(_b);
                                }
                                finally { if (e_1) throw e_1.error; }
                            }
                            resolve();
                        };
                    })];
            });
        });
    };
    IndexedDBStore.prototype.save = function () {
        return __awaiter(this, void 0, void 0, function () {
            var top;
            var _this = this;
            return __generator(this, function (_a) {
                top = this;
                return [2 /*return*/, new Promise(function (resolve, reject) {
                        var e_2, _a;
                        var keys = Object.keys(_this.store);
                        try {
                            for (var keys_1 = __values(keys), keys_1_1 = keys_1.next(); !keys_1_1.done; keys_1_1 = keys_1.next()) {
                                var key = keys_1_1.value;
                                _this.index.put(_this.store[key], key);
                            }
                        }
                        catch (e_2_1) { e_2 = { error: e_2_1 }; }
                        finally {
                            try {
                                if (keys_1_1 && !keys_1_1.done && (_a = keys_1.return)) _a.call(keys_1);
                            }
                            finally { if (e_2) throw e_2.error; }
                        }
                    })];
            });
        });
    };
    IndexedDBStore.stores = function () {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                return [2 /*return*/, (localStorage.getItem("keya-idb-stores") || "").split(",")];
            });
        });
    };
    return IndexedDBStore;
}(Store_1.default));
exports.default = IndexedDBStore;
