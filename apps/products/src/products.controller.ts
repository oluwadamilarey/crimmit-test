import { Controller, Get, Post, Body } from "@nestjs/common";
import { ProductsService } from "./products.service";
import {
  GetProductRequest,
  PRODUCT_SERVICE_NAME,
  RmqService,
} from "@app/common";
import {
  Ctx,
  EventPattern,
  GrpcMethod,
  Payload,
  RmqContext,
} from "@nestjs/microservices";
import { CreateProductDto } from "./dto/create-product.dto";
// Import the request type for gRPC

@Controller("products")
export class ProductsController {
  constructor(
    private readonly productsService: ProductsService,
    private readonly rmqService: RmqService
  ) {}

  // Create a new product
  @Post("/create")
  async createProduct(@Body() data: CreateProductDto) {
    return this.productsService.createProduct(data);
  }

  // gRPC method to get a product by ID
  @GrpcMethod(PRODUCT_SERVICE_NAME, "getProduct")
  async getProduct(request: GetProductRequest) {
    const { id } = request;
    return this.productsService.getProductById(id); // Call service to fetch product by ID
  }

  // Handle the event when an owner is updated
  @EventPattern("owner_updated")
  async handleUserUpdate(@Payload() data: any, @Ctx() context: RmqContext) {
    await this.productsService.updateProductByOwner(data);
    this.rmqService.ack(context); // Acknowledge message
  }

  // Get all products
  @Get()
  async getProducts() {
    return this.productsService.getProducts();
  }
}
