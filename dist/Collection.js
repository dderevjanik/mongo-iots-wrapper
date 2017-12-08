"use strict";
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
            if (f = 1, y && (t = y[op[0] & 2 ? "return" : op[0] ? "throw" : "next"]) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [0, t.value];
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
var _this = this;
Object.defineProperty(exports, "__esModule", { value: true });
var ErrorReporter_1 = require("./ErrorReporter");
exports.createCollection = function (database, collectionName, validator) {
    var collection = database.collection(collectionName);
    return {
        getAll: function () { return __awaiter(_this, void 0, void 0, function () {
            var documents;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, collection.find().toArray()];
                    case 1:
                        documents = (_a.sent());
                        documents.forEach(function (doc) {
                            ErrorReporter_1.errorReporter(doc, validator);
                        });
                        return [2 /*return*/, documents];
                }
            });
        }); },
        insertOne: function (document) { return __awaiter(_this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        ErrorReporter_1.errorReporter(dococument, validator);
                        return [4 /*yield*/, collection.insert(document)];
                    case 1:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        }); },
        insertMany: function () {
            var documents = [];
            for (var _i = 0; _i < arguments.length; _i++) {
                documents[_i] = arguments[_i];
            }
            return __awaiter(_this, void 0, void 0, function () {
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            documents.forEach(function (doc) {
                                ErrorReporter_1.errorReporter(doc, validator);
                            });
                            return [4 /*yield*/, collection.insertMany(documents)];
                        case 1:
                            _a.sent();
                            return [2 /*return*/];
                    }
                });
            });
        },
        findById: function (id) { return __awaiter(_this, void 0, void 0, function () {
            var document;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, collection.findOne({ _id: id })];
                    case 1:
                        document = (_a.sent());
                        if (document) {
                            ErrorReporter_1.errorReporter(document, validator);
                        }
                        return [2 /*return*/, document];
                }
            });
        }); },
        findByKey: function (key, value) { return __awaiter(_this, void 0, void 0, function () {
            var documents, _a;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0: return [4 /*yield*/, collection.find((_a = {}, _a[key] = { $eq: value }, _a)).toArray()];
                    case 1:
                        documents = (_b.sent());
                        documents.forEach(function (doc) {
                            ErrorReporter_1.errorReporter(doc, validator);
                        });
                        return [2 /*return*/, documents];
                }
            });
        }); },
        updateById: function (id, partial) { return __awaiter(_this, void 0, void 0, function () {
            var document, updatedDocument;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, collection.findOne({ _id: id })];
                    case 1:
                        document = (_a.sent());
                        if (!document) {
                            throw new Error("ERROR: Document with id '" + id + "' doesn't exists in Collection");
                        }
                        updatedDocument = Object.assign(document, partial);
                        ErrorReporter_1.errorReporter(updatedDocument, validator);
                        // remove id from updated object
                        if (partial._id) {
                            delete partial._id;
                        }
                        return [4 /*yield*/, collection.findOneAndUpdate({ _id: id }, partial, { returnOriginal: false })];
                    case 2: return [2 /*return*/, _a.sent()];
                }
            });
        }); },
        updateByKey: function (key, value, partial) { return __awaiter(_this, void 0, void 0, function () {
            var _this = this;
            var documents, _a;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0: return [4 /*yield*/, collection.find((_a = {}, _a[key] = { $eq: value }, _a)).toArray()];
                    case 1:
                        documents = (_b.sent());
                        documents.forEach(function (doc) {
                            ErrorReporter_1.errorReporter(doc, validator);
                        });
                        // remove id from updated object
                        if (partial._id) {
                            delete partial._id;
                        }
                        return [2 /*return*/, documents.map(function (document) { return __awaiter(_this, void 0, void 0, function () {
                                var _a;
                                return __generator(this, function (_b) {
                                    switch (_b.label) {
                                        case 0: return [4 /*yield*/, collection.findOneAndUpdate((_a = {}, _a[key] = { $eq: value }, _a), partial, { returnOriginal: false })];
                                        case 1: return [2 /*return*/, _b.sent()];
                                    }
                                });
                            }); })];
                }
            });
        }); },
        removeById: function (id) { return __awaiter(_this, void 0, void 0, function () {
            var document, updatedDocument;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, collection.findOne({ _id: id })];
                    case 1:
                        document = (_a.sent());
                        if (!document) {
                            throw new Error("ERROR: Document with id '" + id + "' doesn't exists in Collection");
                        }
                        updatedDocument = Object.assign(document);
                        ErrorReporter_1.errorReporter(updatedDocument, validator);
                        return [4 /*yield*/, collection.findOneAndDelete({ _id: id })];
                    case 2: return [2 /*return*/, _a.sent()];
                }
            });
        }); },
        removeByKey: function (key, value) { return __awaiter(_this, void 0, void 0, function () {
            var _this = this;
            var documents, _a;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0: return [4 /*yield*/, collection.find((_a = {}, _a[key] = { $eq: value }, _a)).toArray()];
                    case 1:
                        documents = (_b.sent());
                        documents.forEach(function (doc) {
                            ErrorReporter_1.errorReporter(doc, validator);
                        });
                        return [2 /*return*/, documents.map(function (document) { return __awaiter(_this, void 0, void 0, function () {
                                var _a;
                                return __generator(this, function (_b) {
                                    switch (_b.label) {
                                        case 0: return [4 /*yield*/, collection.findOneAndDelete((_a = {}, _a[key] = { $eq: value }, _a))];
                                        case 1: return [2 /*return*/, _b.sent()];
                                    }
                                });
                            }); })];
                }
            });
        }); },
        drop: function () { return __awaiter(_this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, collection.drop()];
                    case 1:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        }); }
    };
};
