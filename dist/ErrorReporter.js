"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var t = require("io-ts");
var io_ts_reporters_1 = require("io-ts-reporters");
/**
 * This function will only report errors on NON-production version
 * @param document {any} - document to validate
 * @param validator {t.Any} - io-ts type used for validation of document
 */
function errorReporter(document, validator) {
    if (process.env.NODE_ENV !== "production") {
        var value = t.validate(document, validator);
        var errors = io_ts_reporters_1.reporter(value);
        if (errors.length > 0) {
            var msg = errors.join("\n");
            throw new Error("While validating document retrieved from db:\n" + msg);
        }
    }
}
exports.errorReporter = errorReporter;
