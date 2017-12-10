<<<<<<< HEAD:dir/Document.d.ts
import { Db } from 'mongodb';
import { ExtendableObject } from './Utils';
=======
import { Db } from "mongodb";
>>>>>>> 1c088697dc1cdb188b84b348df971a30eee64a52:dist/Document.d.ts
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
<<<<<<< HEAD:dir/Document.d.ts
export declare const createDocument: <DOCUMENT_VAL extends ExtendableObject>(database: Db, documentName: string, validator: ExtendableObject) => Document<DOCUMENT_VAL["_A"]>;
=======
export declare const createDocument: <DOCUMENT_VAL extends any>(database: Db, documentName: string, validator: any) => Document<DOCUMENT_VAL["_A"]>;
>>>>>>> 1c088697dc1cdb188b84b348df971a30eee64a52:dist/Document.d.ts
