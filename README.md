# Microservices Architecture with NestJS

This project demonstrates a microservices architecture built using [NestJS](https://nestjs.com/), featuring the `Owners`, `Products`, and `Orders` services. The services communicate via RabbitMQ for messaging and gRPC for remote procedure calls. Redis is used for caching.

## Features

- **Owners Service**: Manages owner profiles.
- **Products Service**: Handles product management and reacts to owner profile changes.
- **Orders Service**: Manages customer orders and updates when product data changes.
- **RabbitMQ**: For event-driven communication between microservices.
- **gRPC**: For synchronous communication between microservices.
- **Redis**: For caching frequently accessed data.

## Prerequisites

- [Node.js](https://nodejs.org/en/) (v14.x or later)
- [Docker](https://www.docker.com/)
- [Docker Compose](https://docs.docker.com/compose/)
- [RabbitMQ](https://www.rabbitmq.com/)
- [Redis](https://redis.io/)

## Services

1. **Owners Service**: Manages owner profiles, with CRUD operations available for owners. Emits events like `owner_created` and `owner_updated` to RabbitMQ to notify other services.
   
2. **Products Service**: Manages products linked to owners. Listens for events like `owner_updated` to update product information accordingly. Exposes gRPC methods to retrieve products by owner.

3. **Orders Service**: Manages customer orders and listens for `price_updated` events to adjust order totals if product prices change.

## Project Structure

## Getting Started

### Clone the Repository

```bash
git clone https://github.com/oluwadamilarey/crimmit-test
cd crimmit-test

 ## Docker set up
 docker-compose up --build

