import * as t from "io-ts";
import { reporter } from "io-ts-reporters";
import { ExtendableObject } from "./Utils";

/**
 * This function will only report errors on NON-production version
 * @param document {any} - document to validate
 * @param validator {t.Any} - io-ts type used for validation of document
 */
export function errorReporter(document: any, validator: t.Any): void {
	if (process.env.NODE_ENV !== "production") {
		const value = t.validate(document, validator) as any;
		const errors = reporter(value);
		if (errors.length > 0) {
			const msg = errors.join("\n");
			throw new Error(`While validating document retrieved from db:\n${msg}`);
		}
	}
}
