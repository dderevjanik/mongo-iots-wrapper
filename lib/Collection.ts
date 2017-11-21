import { Db } from 'mongodb';
import * as t from 'io-ts';
import { ObjectId } from 'bson';

export type Collection<D> = {

    /**
     * Get all documents from collection
     */
    getAll: () => Promise<D[]>;

    /**
     * Insert one document to collection
     */
    insertOne: (document: D) => Promise<void>;

    /**
     * Insert several documents to collection
     */
    insertMany: (...documents: D[]) => Promise<void>;

    /**
     * Find document by his internal Id
     */
    findById: (id: string) => Promise<D | null>;

    /**
     * Find documents by specific props and values
     */
    findByKey: <K extends keyof D>(key: K, value: D[K]) => Promise<D[] | null>;

    /**
     * Update document by his internal Id
     * @return updated object otherwise null
     */
    updateById: (id: string, partial: Partial<D>) => Promise<D | null>;

    /**
     * Update all documents with specific props and values
     * @return updated object otherwise null
     */
    updateByKey: <K extends keyof D>(key: K, value: D[K], partial: Partial<D>) => Promise<D[]>;

    /**
     * Remove document by his internal Id
     */
    removeById: (id: string) => Promise<D | null>;

    /**
     * Remove all documents from collection with specific props and values
     */
    removeByKey: <K extends keyof D>(key: K, value: D[K]) => Promise<D[]>;

    /**
     * Drop collection
     */
    drop: () => Promise<void>;
}

export const createCollection = <DOCUMENT_VAL extends t.InterfaceType<any> | t.IntersectionType<any, any>>(database: Db, collectionName: string, validator: t.InterfaceType<any> | t.IntersectionType<any, any>): Collection<t.TypeOf<DOCUMENT_VAL>> => {
    type DOCUMENT = t.TypeOf<DOCUMENT_VAL>;
    type KEYS = keyof DOCUMENT;
    const collection = database.collection(collectionName);

    return {
        getAll: async () => {
            const documents = await collection.find().toArray() as DOCUMENT[];
            documents.forEach((doc) => {
                t.validate(doc, validator).mapLeft(err => {
                    // TODO: be more descriptive
                    throw new Error(`ERROR: Document, which are you getting from DB, has different type`);
                });
            });
            return documents;
        },

        insertOne: async (document: DOCUMENT) => {
            const valid = t.validate(document, validator).mapLeft(err => {
                // TODO: be more descriptive
                throw new Error(`ERROR: Document, which are you inserting into DB, has different type`);
            });
            await collection.insert(document);
        },

        insertMany: async (...documents: DOCUMENT[]) => {
            documents.forEach(doc => {
                t.validate(doc, validator).mapLeft(err => {
                    // TODO: be more descriptive
                    throw new Error(`ERROR: Document, which are you inserting into DB, has different type`);
                });
            });
            await collection.insertMany(documents);
        },

        findById: async (id: string) => {
            const document = await collection.findOne({ _id: id }) as DOCUMENT;
            if (document) {
                t.validate(document, validator).mapLeft(err => {
                    // TODO: be more descriptive
                    throw new Error(`ERROR: Found document in DB has different type`);
                });
            }
            return document;
        },

        findByKey: async <K extends KEYS>(key: K, value: DOCUMENT[K]) => {
            const documents = await collection.find({ [key]: { $eq: value } }).toArray() as DOCUMENT[];
            console.log(documents)
            documents.forEach(doc => {
                t.validate(doc, validator).mapLeft(err => {
                    // TODO: be more descriptive
                    throw new Error(`ERROR: Found document in DB has different type`);
                });
            });
            return documents;
        },

        updateById: async (id: string, partial: Partial<DOCUMENT>) => {
            const document = await collection.findOne({ _id: id }) as DOCUMENT | null;
            if (!document) {
                throw new Error(`ERROR: Document with id '${id}' doesn't exists in Collection`);
            }
            const updatedDocument = Object.assign(document, partial);
            t.validate(updatedDocument, validator).mapLeft(err => {
                // TODO: be more descriptive
                throw new Error(`ERROR: Updated document in DB has different type`);
            });
            // remove id from updated object
            if ((partial as any)._id) {
                delete (partial as any)._id
            }
            return await collection.findOneAndUpdate({ _id: id }, partial, { returnOriginal: false });
        },

        updateByKey: async <K extends KEYS>(key: K, value: DOCUMENT[K], partial: Partial<DOCUMENT>) => {
            const documents = await collection.find({ [key]: { $eq: value } }).toArray() as DOCUMENT[];
            documents.forEach(doc => {
                t.validate(doc, validator).mapLeft(err => {
                    // TODO: be more descriptive
                    throw new Error(`ERROR: Found document in DB has different type`);
                });
            });
            // remove id from updated object
            if ((partial as any)._id) {
                delete (partial as any)._id
            }
            return documents.map(async (document) => {
                return await collection.findOneAndUpdate({ [key]: { $eq: value } }, partial, { returnOriginal: false });
            })
        },

        removeById: async (id: string) => {
            const document = await collection.findOne({ _id: id }) as DOCUMENT | null;
            if (!document) {
                throw new Error(`ERROR: Document with id '${id}' doesn't exists in Collection`);
            }
            const updatedDocument = Object.assign(document);
            t.validate(updatedDocument, validator).mapLeft(err => {
                // TODO: be more descriptive
                throw new Error(`ERROR: Updated document in DB has different type`);
            });
            return await collection.findOneAndDelete({ _id: id });
        },

        removeByKey: async <K extends KEYS>(key: K, value: DOCUMENT[K]) => {
            const documents = await collection.find({ [key]: { $eq: value } }).toArray() as DOCUMENT[];
            documents.forEach(doc => {
                t.validate(doc, validator).mapLeft(err => {
                    // TODO: be more descriptive
                    throw new Error(`ERROR: Found document in DB has different type`);
                });
            });
            return documents.map(async (document) => {
                return await collection.findOneAndDelete({ [key]: { $eq: value } });
            })
        },

        drop: async () => {
            await collection.drop();
        }
    };
};

