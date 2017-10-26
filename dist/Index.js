"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Document_1 = require("./Document");
var Collection_1 = require("./Collection");
exports.mongoRTWrapper = function (structure, db) {
    var collectionNames = Object.keys(structure.Collections);
    var documentNames = Object.keys(structure.Documents);
    // FIXME: HACK
    var collections = {};
    var documents = {};
    for (var _i = 0, collectionNames_1 = collectionNames; _i < collectionNames_1.length; _i++) {
        var collectionName = collectionNames_1[_i];
        collections[collectionName] = Collection_1.createCollection(db, collectionName, structure.Collections[collectionName]);
    }
    for (var _a = 0, documentNames_1 = documentNames; _a < documentNames_1.length; _a++) {
        var documentName = documentNames_1[_a];
        documents[documentName] = Document_1.createDocument(db, documentName, structure.Documents[documentName]);
    }
    return {
        Collections: collections,
        Documents: documents
    };
};
