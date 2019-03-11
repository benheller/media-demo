import log from './log.js';
import * as rabbitmq from './rabbitmq.js';
import Item from './repositories/Item.js';

export default () => {
  return rabbitmq.consume(title => {
    log.trace('[WORKERS]', title);
    return Item.upsert({ title });
  });
};
