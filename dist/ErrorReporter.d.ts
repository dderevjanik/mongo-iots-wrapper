import * as t from "io-ts";
/**
 * This function will only report errors on NON-production version
 * @param document {any} - document to validate
 * @param validator {t.Any} - io-ts type used for validation of document
 */
export declare function errorReporter(document: any, validator: t.Any): void;
