import { Db } from 'mongodb';
import { ExtendableObject } from './Utils';
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
export declare const createDocument: <DOCUMENT_VAL extends ExtendableObject>(database: Db, documentName: string, validator: ExtendableObject) => Document<DOCUMENT_VAL["_A"]>;
