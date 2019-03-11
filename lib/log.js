import pino from 'pino';

const log = pino({
  level: 'trace',
  prettyPrint: {
    colorize: true
  }
});

export default log;
