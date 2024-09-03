import { ValidationPipe } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { NestFactory } from "@nestjs/core";
import { OrdersModule } from "./orders.module";
import { RmqService } from "@app/common";

async function bootstrap() {
  const app = await NestFactory.create(OrdersModule);
  app.useGlobalPipes(new ValidationPipe());
  const rmqService = app.get<RmqService>(RmqService);
  app.connectMicroservice(rmqService.getOptions("ORDERS"));
  const configService = app.get(ConfigService);
  await app.startAllMicroservices();
  await app.listen(configService.get("PORT"));
}
bootstrap();
