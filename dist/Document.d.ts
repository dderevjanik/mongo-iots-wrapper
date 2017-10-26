import { Db } from 'mongodb';
import * as t from 'io-ts';
export declare type Document<D> = {
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
};
export declare const createDocument: <DOCUMENT_VAL extends t.InterfaceType<any>>(database: Db, documentName: string, validator: t.InterfaceType<any>) => Document<DOCUMENT_VAL["_A"]>;
