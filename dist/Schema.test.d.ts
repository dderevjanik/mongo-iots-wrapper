import * as t from 'io-ts';
export declare const config: t.InterfaceType<{
    webTitle: t.StringType;
    adminEmail: t.StringType;
    webLanguage: t.UnionType<[t.LiteralType<"English">, t.LiteralType<"Slovak">], "English" | "Slovak">;
    timezone: t.StringType;
    dateFormat: t.NumberType;
    googleAnalytics: t.StringType;
}>;
export declare type Config = t.TypeOf<typeof config>;
export declare const log: t.InterfaceType<{
    dateCreated: t.NumberType;
    log: t.StringType;
    logType: t.UnionType<[t.LiteralType<"Error">, t.LiteralType<"Warning">, t.LiteralType<"Normal">], "Error" | "Warning" | "Normal">;
}>;
export declare type Log = t.TypeOf<typeof log>;
export declare const media: t.InterfaceType<{
    name: t.StringType;
    imgSrc: t.StringType;
}>;
export declare type Media = t.TypeOf<typeof media>;
export declare const user: t.InterfaceType<{
    email: t.StringType;
    dateCreated: t.NumberType;
    password: t.StringType;
}>;
export declare type User = t.TypeOf<typeof user>;
export declare const schema: {
    config: t.InterfaceType<{
        webTitle: t.StringType;
        adminEmail: t.StringType;
        webLanguage: t.UnionType<[t.LiteralType<"English">, t.LiteralType<"Slovak">], "English" | "Slovak">;
        timezone: t.StringType;
        dateFormat: t.NumberType;
        googleAnalytics: t.StringType;
    }>;
    user: t.InterfaceType<{
        email: t.StringType;
        dateCreated: t.NumberType;
        password: t.StringType;
    }>;
    log: t.InterfaceType<{
        dateCreated: t.NumberType;
        log: t.StringType;
        logType: t.UnionType<[t.LiteralType<"Error">, t.LiteralType<"Warning">, t.LiteralType<"Normal">], "Error" | "Warning" | "Normal">;
    }>;
    media: t.InterfaceType<{
        name: t.StringType;
        imgSrc: t.StringType;
    }>;
};
export declare type Schema = {
    [R in keyof typeof schema]: t.TypeOf<(typeof schema)[R]>;
};
