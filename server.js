const express = require('express');
const amqp = require('amqplib');
require('dotenv').config();

const app = express();
app.use(express.json());

const QUEUE = 'email-queue';

let channel;

async function connectRabbitMQ() {
  const connection = await amqp.connect('amqp://localhost');
  channel = await connection.createChannel();
  await channel.assertQueue(QUEUE, { durable: true });
  console.log('✅ Connected to RabbitMQ');
}

app.post('/send-email', async (req, res) => {
  const { to, subject, text } = req.body;

  const message = { to, subject, text };
  channel.sendToQueue(QUEUE, Buffer.from(JSON.stringify(message)), {
    persistent: true,
  });

  res.status(202).json({ status: 'queued', message: 'Email will be sent soon' });
});

connectRabbitMQ().then(() => {
  app.listen(3000, () => console.log('🚀 API listening on port 3000'));
});
