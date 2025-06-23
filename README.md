#  RabbitMQ Email Sender with Node.js, Prisma & Docker
A simple Node.js application for sending emails using RabbitMQ as a message broker, Nodemailer for email delivery, and Prisma as the ORM for PostgreSQL.

##  Features
- REST API to queue email requests
- RabbitMQ consumer to send emails asynchronously
- Prisma ORM for database interaction (with a `User` model example)
- Dockerized RabbitMQ management UI
- Environment variable configuration

##  Requirements
Ensure you have the following installed:

- [Node.js](https://nodejs.org/)
- [Docker](https://www.docker.com/)
- PostgreSQL (you can also run it via Docker)
## 🔧 Setup Instructions

### 1. Clone the Repository

```bash
git clone https://github.com/your-username/rabbitmq-send-email.git
cd rabbitmq-send-email
npm install
