import { Db } from 'mongodb';
import { Document } from './Document';
import { Collection } from './Collection';
import * as t from 'io-ts';
export declare type DefineStructure = {
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
export declare type Structure<Definition extends DefineStructure, Collections = Definition['Collections']> = Readonly<{
    /**
     * Collections consist from documents
     * @desc use this if you're going to save list of users, logs, media etc.
     */
    Collections: {
        [C in keyof Definition['Collections']]: Collection<t.TypeOf<Definition['Collections'][C]>>;
    };
    /**
     * Documents is special kind of Collection, where every document is unique/different
     * @desc use this if you're going to save e.g. configuration object
     */
    Documents: {
        [C in keyof Definition['Documents']]: Document<t.TypeOf<Definition['Documents'][C]>>;
    };
}>;
export declare type MongoRTWrapper = <DEFINITION extends DefineStructure>(structure: DEFINITION) => Structure<DEFINITION>;
export declare const mongoRTWrapper: <DEFINITION extends DefineStructure>(structure: DEFINITION, db: Db) => Readonly<{
    Collections: {
        [C in keyof DEFINITION["Collections"]]: Collection<DEFINITION["Collections"][C]["_A"]>;
    };
    Documents: {
        [C in keyof DEFINITION["Documents"]]: Document<DEFINITION["Documents"][C]["_A"]>;
    };
}>;
