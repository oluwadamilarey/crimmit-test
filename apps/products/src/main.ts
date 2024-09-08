import { NestFactory } from "@nestjs/core";
import { ProductsModule } from "./products.module";
import { PRODUCT_PACKAGE_NAME, RmqService } from "@app/common";
import { MicroserviceOptions, Transport } from "@nestjs/microservices";
import { join } from "path";

async function bootstrap() {
  const app = await NestFactory.create(ProductsModule);
  const rmqService = app.get<RmqService>(RmqService);
  app.connectMicroservice(rmqService.getOptions("PRODUCTS"));
  app.connectMicroservice<MicroserviceOptions>({
    transport: Transport.GRPC,
    options: {
      package: PRODUCT_PACKAGE_NAME,
      protoPath: join(__dirname, "../product.proto"),
    },
  });
}
