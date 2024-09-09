import { DynamicModule, Module } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { RedisModule as NestRedisModule } from "@nestjs-modules/ioredis";
import { RedisService } from "./redis.service";

interface RedisModuleOptions {
  name: string;
}

@Module({
  providers: [RedisService],
  exports: [RedisService],
})
export class RedisModule {
  static register({ name }: RedisModuleOptions): DynamicModule {
    return {
      module: RedisModule,
      imports: [
        NestRedisModule.forRootAsync({
          useFactory: (configService: ConfigService) => ({
            type: "single",
            url: configService.get<string>("REDIS_URI"),
            db: configService.get<number>(`REDIS_${name}_DB`),
          }),
          inject: [ConfigService],
        }),
      ],
      exports: [NestRedisModule],
    };
  }
}
