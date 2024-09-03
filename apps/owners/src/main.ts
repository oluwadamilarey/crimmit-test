import { NestFactory } from "@nestjs/core";
import { OwnersModule } from "./owners.module";
import { RmqService } from "@app/common";
import { RmqOptions } from "@nestjs/microservices";
import { ValidationPipe } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";

async function bootstrap() {
  const app = await NestFactory.create(OwnersModule);
  const rmqService = app.get<RmqService>(RmqService);
  app.connectMicroservice<RmqOptions>(rmqService.getOptions("OWNERS"));
  app.useGlobalPipes(new ValidationPipe());
  const configService = app.get(ConfigService);
  await app.startAllMicroservices();
  await app.listen(configService.get("PORT"));
}
bootstrap();
