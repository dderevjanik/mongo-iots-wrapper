import * as t from 'io-ts';

const BaseSchema = t.interface({
    _id: t.string
});

export const config = t.interface({
    webTitle: t.string,
    adminEmail: t.string,
    webLanguage: t.union([
        t.literal('English'),
        t.literal('Slovak')
    ]),
    timezone: t.string,
    dateFormat: t.number,
    googleAnalytics: t.string
});
export type Config = t.TypeOf<typeof config>;


export const log = t.interface({
    dateCreated: t.number,
    log: t.string,
    logType: t.union([
        t.literal('Error'),
        t.literal('Warning'),
        t.literal('Normal')
    ])
});
export type Log = t.TypeOf<typeof log>;

export const media = t.interface({
    name: t.string,
    imgSrc: t.string
});
export type Media = t.TypeOf<typeof media>;

export const user = t.interface({
    email: t.string,
    dateCreated: t.number,
    password: t.string
});
export type User = t.TypeOf<typeof user>;

export const schema = {
    config,
    user,
    log,
    media
};
export type Schema = {
    [R in keyof typeof schema]: t.TypeOf<(typeof schema)[R]>
};
