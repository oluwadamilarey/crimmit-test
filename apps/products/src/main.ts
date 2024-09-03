import { NestFactory } from "@nestjs/core";
import { ProductsModule } from "./products.module";
import { RmqService } from "@app/common";
import { ConfigService } from "@nestjs/config";
import { ValidationPipe } from "@nestjs/common";
import { DocumentBuilder, SwaggerModule } from "@nestjs/swagger";

async function bootstrap() {
  const app = await NestFactory.create(ProductsModule);
  const rmqService = app.get<RmqService>(RmqService);
  app.connectMicroservice(rmqService.getOptions("PRODUCTS"));
  app.useGlobalPipes(new ValidationPipe());
  const config = new DocumentBuilder()
    .setTitle("Products API")
    .setDescription("API documentation for the Products service")
    .setVersion("1.0")
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup("api", app, document);
  const configService = app.get(ConfigService);
  await app.startAllMicroservices();
  await app.listen(configService.get("PORT"));
}
bootstrap();
