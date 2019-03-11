import * as mongodb from 'mongodb';

const MongoClient = mongodb.default.MongoClient;
const URL = 'mongodb://mongo:27017';
const DB = 'demo';

let db;

export default function () { return db; }

export async function connect() {
  let client;
  while (!client) {
    try {
      client = await MongoClient.connect(URL, { useNewUrlParser: true });
    } catch (e) {
      // waiting on mongo...
    }
  }
  db = await client.db(DB);
}

export async function init() {
  await db.createCollection('items', {
    validator: {
      $jsonSchema: {
        bsonType: 'object',
        required: ['title', 'createdAt', 'updatedAt'],
        properties: {
          createdAt: {
            bsonType: 'date'
          },
          title: {
            bsonType: 'string'
          },
          updatedAt: {
            bsonType: 'date'
          }
        }
      }
    }
  });

  db.collection('items').createIndex({ title: 1 });
}
