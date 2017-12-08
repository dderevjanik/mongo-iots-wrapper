import * as t from "io-ts";
import { Db } from "mongodb";
import { ExtendableObject } from "./Utils";
import { errorReporter } from "./ErrorReporter";

export type Document<D> = {
	/**
	 * Will create a document.
	 * If document already exists, it'll throw an error
	 */
	create: (document: D) => Promise<void>;

	/**
	 * Read document
	 */
	read: () => Promise<D>;

	/**
	 * Update document props and values
	 * If document doesn't exists, it'll throw an error
	 * @return updated document
	 */
	update: (partial: Partial<D>) => Promise<D>;

	/**
	 * It'll replace whole document
	 * If document doesn't exists, it'll throw an error
	 */
	replace: (document: D) => Promise<D>;

	/**
	 * Check if document exists
	 */
	exists: () => Promise<boolean>;

	/**
	 * Delete document
	 * @return deleted object
	 */
	drop: () => Promise<D>;
};

export const createDocument = <DOCUMENT_VAL extends ExtendableObject>(
	database: Db,
	documentName: string,
	validator: ExtendableObject
): Document<t.TypeOf<DOCUMENT_VAL>> => {
	type DOCUMENT = t.TypeOf<DOCUMENT_VAL>;
	const collection = database.collection("DOCUMENTS");

	return {
		create: async (document: DOCUMENT) => {
			errorReporter(document, validator);
			const existDocument = (await collection.findOne({ _id: documentName })) as DOCUMENT | null;
			if (existDocument) {
				throw new Error(`ERROR: Document '${documentName}' already exists in DB`);
			}
			const docWithID = Object.assign(document, { _id: documentName });
			await collection.insertOne(docWithID);
		},

		read: async () => {
			const existDocument = (await collection.findOne({ _id: documentName })) as DOCUMENT | null;
			if (!existDocument) {
				throw new Error(`ERROR: Document '${documentName}' doesn't exists in DB`);
			}
			errorReporter(existDocument, validator);

			return existDocument;
		},

		update: async (partial: Partial<DOCUMENT>) => {
			const existDocument = (await collection.findOne({ _id: documentName })) as DOCUMENT | null;
			if (!existDocument) {
				throw new Error(`ERROR: Document '${documentName}' doesn't exists in DB`);
			}
			errorReporter(Object.assign(existDocument, partial), validator);
			await collection.findOneAndUpdate({ _id: documentName }, partial);
			return (await collection.findOne({ _id: documentName })) as DOCUMENT;
		},

		replace: async (document: DOCUMENT) => {
			errorReporter(document, validator);
			const existDocument = (await collection.findOne({ _id: documentName })) as DOCUMENT | null;
			if (!existDocument) {
				throw new Error(`ERROR: Document '${documentName}' doesn't exists in DB`);
			}
			return await collection.findOneAndReplace({ _id: documentName }, document, { returnOriginal: false });
		},

		exists: async () => {
			const existDocument = (await collection.findOne({ _id: documentName })) as DOCUMENT | null;
			if (existDocument) {
				errorReporter(existDocument, validator);
				return true;
			}
			return false;
		},

		drop: async () => {
			const existDocument = (await collection.findOne({ _id: documentName })) as DOCUMENT | null;
			if (!existDocument) {
				throw new Error(`ERROR: Document '${documentName}' doesn't exists in DB`);
			}
			errorReporter(existDocument, validator);
			await collection.deleteOne({ _id: documentName });
			return existDocument;
		}
	};
};
