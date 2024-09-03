import { Controller, Get, Post, UseGuards } from "@nestjs/common";
import { ProductsService } from "./products.service";
import { JwtAuthGuard, RmqService } from "@app/common";
import { Ctx, EventPattern, Payload, RmqContext } from "@nestjs/microservices";
import { CreateProductDto } from "./dto/create-product.dto";

@Controller("product")
export class ProductsController {
  constructor(
    private readonly productsService: ProductsService,
    private readonly rmqService: RmqService
  ) {}

  @Post("/create")
  @UseGuards(JwtAuthGuard)
  async createProduct(data: CreateProductDto) {
    this.productsService.createProduct(data);
  }

  @EventPattern("owner_updated")
  @UseGuards(JwtAuthGuard)
  async handleUserUpdate(@Payload() data: any, @Ctx() context: RmqContext) {
    this.productsService.updateProductByOwner(data);
    this.rmqService.ack(context);
  }
}
