<<<<<<< HEAD:dir/Index.d.ts
import { Db } from 'mongodb';
import { Document } from './Document';
import { Collection } from './Collection';
import { ExtendableObject } from './Utils';
import * as t from 'io-ts';
=======
import { Db } from "mongodb";
import { Document } from "./Document";
import { Collection } from "./Collection";
import { ExtendableObject } from "./Utils";
import * as t from "io-ts";
>>>>>>> 1c088697dc1cdb188b84b348df971a30eee64a52:dist/Index.d.ts
export declare type DefineStructure = {
    /**
     * Collections consist from documents
     * @desc use this if you're going to save list of users, logs, media etc.
     */
    Collections: {
        [CollectionName: string]: ExtendableObject;
    };
    /**
     * Documents is special kind of Collection, where every document is unique/different
     * @desc use this if you're going to save e.g. configuration object
     */
    Documents: {
        [DocumentName: string]: ExtendableObject;
    };
};
export declare type Structure<Definition extends DefineStructure, Collections = Definition["Collections"]> = Readonly<{
    /**
     * Collections consist from documents
     * @desc use this if you're going to save list of users, logs, media etc.
     */
    Collections: {
        [C in keyof Definition["Collections"]]: Collection<t.TypeOf<Definition["Collections"][C]>>;
    };
    /**
     * Documents is special kind of Collection, where every document is unique/different
     * @desc use this if you're going to save e.g. configuration object
     */
    Documents: {
        [C in keyof Definition["Documents"]]: Document<t.TypeOf<Definition["Documents"][C]>>;
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