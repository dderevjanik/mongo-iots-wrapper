import { Db } from 'mongodb';
import { createDocument, Document } from './Document';
import { createCollection, Collection } from './Collection';
import * as t from 'io-ts';

export type DefineStructure = {
    /**
     * Collections consist from documents
     * @desc use this if you're going to save list of users, logs, media etc.
     */
    Collections: {
        [CollectionName: string]: t.InterfaceType<any>;
    };

    /**
     * Documents is special kind of Collection, where every document is unique/different
     * @desc use this if you're going to save e.g. configuration object
     */
    Documents: {
        [DocumentName: string]: t.InterfaceType<any>;
    };
};

export type Structure<Definition extends DefineStructure, Collections = Definition['Collections']> = Readonly<{
    /**
     * Collections consist from documents
     * @desc use this if you're going to save list of users, logs, media etc.
     */
    Collections: {
        [C in keyof Definition['Collections']]: Collection<t.TypeOf<Definition['Collections'][C]>>
    };

    /**
     * Documents is special kind of Collection, where every document is unique/different
     * @desc use this if you're going to save e.g. configuration object
     */
    Documents: {
        [C in keyof Definition['Documents']]: Document<t.TypeOf<Definition['Documents'][C]>>
    };
}>

export type MongoRTWrapper = <DEFINITION extends DefineStructure>(structure: DEFINITION) => Structure<DEFINITION>

export const mongoRTWrapper = <DEFINITION extends DefineStructure>(structure: DEFINITION, db: Db): Structure<DEFINITION> => {
    const collectionNames = Object.keys(structure.Collections);
    const documentNames = Object.keys(structure.Documents);

    // FIXME: HACK
    let collections: Structure<DEFINITION>['Collections'] = {} as Structure<DEFINITION>['Collections'];
    let documents: Structure<DEFINITION>['Documents'] = {} as Structure<DEFINITION>['Documents'];

    for (const collectionName of collectionNames) {
        collections[collectionName] = createCollection(db, collectionName, structure.Collections[collectionName]);
    }
    for (const documentName of documentNames) {
        documents[documentName] = createDocument(db, documentName, structure.Documents[documentName]);
    }

    return {
        Collections: collections,
        Documents: documents
    } as Readonly<Structure<DEFINITION>>;
}
