import { MongoClient } from 'mongodb';
import { mongoRTWrapper } from './Index';
import * as t from 'io-ts';
import { schema } from './Schema.test';
import { connectionString } from './Config';

const client = new MongoClient();

(async () => {
  const db = await client.connect(connectionString);

  const mongoClient = mongoRTWrapper(
    {
      Collections: {
        users: schema.user,
        media: schema.media,
        logs: schema.log
      },
      Documents: {}
    },
    db
  );

  const x = 'NotANumber' as any;
  const a = mongoClient.Collections.users.insertOne({
    dateCreated: 123,
    email: 'dasds',
    password: 'dasasd'
  });
  console.log(a);

  // TEST DOCUMENTS
  // TEST COLLECTIONS
})();
