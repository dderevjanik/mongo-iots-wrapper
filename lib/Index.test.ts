import { MongoClient } from 'mongodb';
import { mongoRTWrapper } from './Index';
import * as t from 'io-ts';
import { schema } from './Schema.test';

const client = new MongoClient();

(async () => {
    const db = await client.connect('mongodb://192.168.99.100:3002')

    const mongoClient = mongoRTWrapper({
        Collections: {
            users: schema.user,
            media: schema.media,
            logs: schema.log
        },
        Documents: {

        }
    }, db);

    const x = 'NotANumber' as any;
    mongoClient.Collections.users.insertOne({
        dateCreated: x,
        email: 'dasds',
        password: 'dasasd'
    })

    // TEST DOCUMENTS
    // TEST COLLECTIONS
})();
