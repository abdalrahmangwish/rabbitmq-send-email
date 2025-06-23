// consumer.js
const amqp = require('amqplib');
const nodemailer = require('nodemailer');
require('dotenv').config();

const QUEUE = 'email-queue';

async function startConsumer() {
  const connection = await amqp.connect(process.env.RABBITMQ_URL || 'amqp://localhost');
  const channel = await connection.createChannel();
  await channel.assertQueue(QUEUE, { durable: true });

  console.log('📥 Waiting for messages in', QUEUE);

  channel.consume(QUEUE, async (msg) => {
    if (msg !== null) {
      const { to, subject, text } = JSON.parse(msg.content.toString());
      console.log('📨 Sending email to:', to);

      try {
        const transporter = nodemailer.createTransport({
          service: 'gmail',
          auth: {
            user: process.env.EMAIL_USER,
            pass: process.env.EMAIL_PASS,
          },
        });

        await transporter.sendMail({
          from: `"RabbitMQ Mailer" <${process.env.EMAIL_USER}>`,
          to,
          subject,
          text,
        });

        console.log('✅ Email sent to', to);
        channel.ack(msg);
      } catch (error) {
        console.error('❌ Failed to send email:', error);
      }
    }
  });
}

startConsumer().catch(console.error);
