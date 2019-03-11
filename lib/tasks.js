import fs from 'fs';
import oboe from 'oboe';
import log from './log.js';
import * as rabbitmq from './rabbitmq.js';

export default () => {
  let i = 0;

  const stream = fs.createReadStream('/app/data/artists.json');

  return new Promise((resolve, reject) => {
    oboe(stream)
      .node('title', title => {
        i++;

        if (i % 1000 === 0) {
          log.debug('[TASKS]', `Queued ${i} artists`);
        }

        // enqueue the message
        rabbitmq.send(title);

        // drop the element
        return oboe.drop;
      })
      .done(resolve)
      .fail(reject);
  });
};

