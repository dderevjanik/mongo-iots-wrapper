"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var t = require("io-ts");
var BaseSchema = t.interface({
    _id: t.string
});
exports.config = t.interface({
    webTitle: t.string,
    adminEmail: t.string,
    webLanguage: t.union([
        t.literal('English'),
        t.literal('Slovak')
    ]),
    timezone: t.string,
    dateFormat: t.number,
    googleAnalytics: t.string
});
exports.log = t.interface({
    dateCreated: t.number,
    log: t.string,
    logType: t.union([
        t.literal('Error'),
        t.literal('Warning'),
        t.literal('Normal')
    ])
});
exports.media = t.interface({
    name: t.string,
    imgSrc: t.string
});
exports.user = t.interface({
    email: t.string,
    dateCreated: t.number,
    password: t.string
});
exports.schema = {
    config: exports.config,
    user: exports.user,
    log: exports.log,
    media: exports.media
};
