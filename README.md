# Microservices Project

This project is a microservices-based application consisting of Orders, Owners, and Products services. It uses NestJS, MongoDB, RabbitMQ, and Redis to create a scalable and distributed system.

## Table of Contents

1. [Overview](#overview)
2. [Services](#services)
3. [Technologies](#technologies)
4. [Project Structure](#project-structure)
5. [Setup](#setup)
6. [Running the Application](#running-the-application)
7. [Service Communication](#service-communication)
8. [Common Modules](#common-modules)

## Overview

This microservices architecture allows for independent scaling and development of different components of the application. It uses RabbitMQ for asynchronous communication between services and MongoDB for data persistence.

## Services

1. **Orders Service**: Manages order-related operations
2. **Owners Service**: Handles owner profile management
3. **Products Service**: Manages product information and inventory

## Technologies

- NestJS
- MongoDB
- RabbitMQ
- Redis
- Docker & Docker Compose

## Project Structure

The project is structured as a monorepo with multiple NestJS applications:

├── apps
│ ├── orders
│ ├── owners
│ └── products
├── libs
│ └── common
└── docker-compose.yml

## Setup

1. Clone the repository:

git clone https://github.com/oluwadamilarey/crimmit-test
cd crimmit-test

3. Set up environment variables:
   Create `.env` files in each service directory (`apps/orders/.env`, `apps/owners/.env`, `apps/products/.env`) with the following variables:
   MONGODB*URI=mongodb://mongodb-primary:27017/microservices
   RABBIT_MQ_URI=amqp://rabbitmq:5672
   RABBIT_MQ*<SERVICE>\_QUEUE=<service_queue_name>
   PORT=<service_port>
   REDIS_URI=redis://redis:6379

Ensure Docker and Docker Compose are installed on your system.

## Running the Application

To start all services and dependencies:

- docker-compose up -build

## Service Communication

- **RabbitMQ**: Used for asynchronous communication between services. Each service can emit and listen to specific events.
- **gRPC**: Used for synchronous communication, particularly by the Products service.

## Common Modules

The project includes several common modules and utilities:

1. **AbstractRepository**: A base repository class for MongoDB operations.
2. **AbstractDocument**: A base document schema for MongoDB.
3. **DatabaseModule**: Configures the MongoDB connection.
4. **RmqModule & RmqService**: Configures and manages RabbitMQ connections.

These modules are likely part of a shared library used across all services.

## Development

For development purposes, you can run each service individually using: `npm run start:dev <service-name>`

Replace `<service-name>` with `orders`, `owners`, or `products`.

## Notes

- The provided `docker-compose.yml` includes commented-out sections for additional services (billing, auth) and volume configurations. Uncomment these as needed for your full application setup.
- Ensure all required ports are free on your host machine before starting the services.
- For production deployment, review and adjust the Dockerfile in each service directory and the docker-compose.yml file as needed.
