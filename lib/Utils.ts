import * as t from "io-ts";

export type ExtendableObject = t.InterfaceType<any> | t.IntersectionType<any, any>;
