import { Module } from "@nestjs/common";
import * as Joi from "joi";
import { ProductsController } from "./products.controller";
import { ProductsService } from "./products.service";
import { RmqModule, AuthModule, DatabaseModule } from "@app/common";

import { ConfigModule } from "@nestjs/config";
import { AUTH_SERVICE } from "@app/common/auth/services";
import { MongooseModule } from "@nestjs/mongoose";
import { Product, ProductSchema } from "./schemas/product.schema";
import { ProductRepository } from "./products.repository";
import { ORDER_QUEUE } from "./services/constants";

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      validationSchema: Joi.object({
        RABBIT_MQ_URI: Joi.string().required(),
        RABBIT_MQ_PRODUCTS_QUEUE: Joi.string().required(),
        MONGODB_URI: Joi.string().required(),
        PORT: Joi.number().required(),
      }),
      envFilePath: "./apps/products/.env",
    }),
    RmqModule.register({
      name: ORDER_QUEUE,
    }),
    AuthModule,
    MongooseModule.forFeature([{ name: Product.name, schema: ProductSchema }]),
    DatabaseModule,
  ],
  controllers: [ProductsController],
  providers: [ProductRepository, ProductsService],
})
export class ProductsModule {}
