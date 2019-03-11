import amqp from 'amqplib';

const QUEUE = 'ingest';

let rabbitmq;

export async function init() {
  const connection = await amqp.connect('amqp://rabbitmq');
  connection.on('error', init);

  const channel = await connection.createChannel();
  await channel.assertQueue(QUEUE);
  rabbitmq = channel;
}

export function send(json) {
  return rabbitmq.sendToQueue(QUEUE, Buffer.from(JSON.stringify(json)));
}

export function consume(callback) {
  return rabbitmq.consume(QUEUE, msg => {
    const str = msg.content.toString();
    return callback(str);
  }, { noAck: true });
}

export default rabbitmq;
