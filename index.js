import express from 'express';
import expressPino from 'express-pino-logger';
import http from 'http';
import * as db from './lib/db.js';
import log from './lib/log.js';
import * as rabbitmq from './lib/rabbitmq.js';
import tasks from './lib/tasks.js';
import workers from './lib/workers.js';

const app = express();
const port = 8000;
const server = http.Server(app);

//
// http

app.use(expressPino({ logger: log }));

app.get('/', (req, res) => res.sendStatus(200));

app.use((err, req, res, next) => {
  log.error(err.stack);
  res.sendStatus(500);
});

//
// startup

db.connect()
  .then(db.init)
  .then(rabbitmq.init)
  .then(() => server.listen(port, () => log.info('[APP]', `Demo listening on port ${port}!`)))
  .then(() => tasks())
  .then(() => workers())
  .catch(err => log.error('[APP]', err.message));

