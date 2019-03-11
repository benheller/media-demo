import db from '../db.js';

const NAME = 'items';

export default {
  upsert(match) {
    return db().collection(NAME).updateOne(match, {
      $set: {
        ...match,
        createdAt: new Date(),
        updatedAt: new Date()
      }
    }, { upsert: true });
  }
};

