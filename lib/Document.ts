import { Db } from 'mongodb';
import * as t from 'io-ts';

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
    replace: (document: D) => Promise<void>;

    /**
     * Check if document exists
     */
    exists: () => Promise<boolean>;

    /**
     * Delete document
     * @return deleted object
     */
    drop: () => Promise<D>;
}

export const createDocument = <DOCUMENT_VAL extends t.InterfaceType<any>>(database: Db, documentName: string, validator: t.InterfaceType<any>): Document<t.TypeOf<DOCUMENT_VAL>> => {
    type DOCUMENT = t.TypeOf<DOCUMENT_VAL>;
    const collection = database.collection('DOCUMENTS');

    return {
        create: async (document: DOCUMENT) => {
            t.validate(document, validator).mapLeft(err => {
                // TODO: be more descriptive
                throw new Error(`ERROR: Document, which are you going to insert to DB, has different type`);
            })
            const existDocument = await collection.findOne({ _id: documentName }) as DOCUMENT | null;
            if (existDocument) {
                throw new Error(`ERROR: Document '${documentName}' already exists in DB`);
            }
            const docWithID = Object.assign(document, { _id: documentName });
            await collection.insertOne(docWithID);
        },

        read: async () => {
            const existDocument = await collection.findOne({ _id: documentName }) as DOCUMENT | null;
            if (!existDocument) {
                throw new Error(`ERROR: Document '${documentName}' doesn't exists in DB`);
            }

            return existDocument;
        },

        update: async (partial: Partial<DOCUMENT>) => {
            const existDocument = await collection.findOne({ _id: documentName }) as DOCUMENT | null;
            if (!existDocument) {
                throw new Error(`ERROR: Document '${documentName}' doesn't exists in DB`);
            }
            t.validate(Object.assign(existDocument, partial), validator).mapLeft(err => {
                // TODO: be more descriptive
                throw new Error(`ERROR: Final Document, which will be updated, has different type`);
            });
            await collection.findOneAndUpdate({ _id: documentName }, partial);
            return await collection.findOne({ _id: documentName }) as DOCUMENT;
        },

        replace: async (document: DOCUMENT) => {
            t.validate(document, validator).mapLeft(err => {
                // TODO: be more descriptive
                throw new Error(`ERROR: Document, which are you going to replace, has different type`);
            });
            const existDocument = await collection.findOne({ _id: documentName }) as DOCUMENT | null;
            if (!existDocument) {
                throw new Error(`ERROR: Document '${documentName}' doesn't exists in DB`);
            }
            await collection.findOneAndReplace({ _id: documentName }, document);
            return await collection.findOne({ _id: documentName }) as DOCUMENT;
        },

        exists: async () => {
            const existDocument = await collection.findOne({ _id: documentName }) as DOCUMENT | null;
            if (existDocument) {
                t.validate(existDocument, validator).mapLeft(err => {
                    // TODO: be more descriptive
                    throw new Error(`ERROR: Document, which exists in DB, has different type`);
                })
                return true;
            }
            return false;
        },

        drop: async () => {
            const existDocument = await collection.findOne({ _id: documentName }) as DOCUMENT | null;
            if (!existDocument) {
                throw new Error(`ERROR: Document '${documentName}' doesn't exists in DB`);
            }
            await collection.deleteOne({ _id: documentName });
            return existDocument;
        },
    };
};
