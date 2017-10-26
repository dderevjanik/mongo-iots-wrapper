import { Db } from 'mongodb';
import * as t from 'io-ts';
export declare type Collection<D> = {
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
};
export declare const createCollection: <DOCUMENT_VAL extends t.InterfaceType<any>>(database: Db, collectionName: string, validator: t.InterfaceType<any>) => Collection<DOCUMENT_VAL["_A"]>;
