import { Module } from "@nestjs/common";
import { OwnersController } from "./owners.controller";
import { OwnersService } from "./owners.service";
import { PRODUCT_SERVICE } from "./constants/services";
import { AuthModule, DatabaseModule, RmqModule } from "@app/common";
import { MongooseModule } from "@nestjs/mongoose";
import { Owner, OwnerSchema } from "./schemas/owner.schema";
import { ConfigModule } from "@nestjs/config";
import * as Joi from "joi";
import { OwnersRepository } from "./owners.repository";

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      validationSchema: Joi.object({
        MONGODB_URI: Joi.string().required(),
        PORT: Joi.number().required(),
        RABBIT_MQ_URI: Joi.string().required(),
        RABBIT_MQ_ORDER_QUEUE: Joi.string().required(),
      }),
      envFilePath: "./apps/owners/.env",
    }),
    DatabaseModule,
    AuthModule,
    RmqModule.register({
      name: PRODUCT_SERVICE,
    }),
    MongooseModule.forFeature([{ name: Owner.name, schema: OwnerSchema }]),
  ],
  controllers: [OwnersController],
  providers: [OwnersService, OwnersRepository],
})
export class OwnersModule {}
