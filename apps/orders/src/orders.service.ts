import { Injectable, Inject, NotFoundException } from "@nestjs/common";
import { ClientGrpc, ClientProxy } from "@nestjs/microservices";
import { lastValueFrom } from "rxjs";
import { CreateOrderRequest } from "./dto/create-order.request";
import { UpdateOrderRequest } from "./dto/update-order.request";
import { OrdersRepository } from "./orders.repository";
import { Order } from "./schemas/order.schema";
import { PRODUCT_SERVICE } from "./constants/services";
import { ProductServiceClient, RedisService } from "@app/common";

@Injectable()
export class OrdersService {
  private productServiceClient: ProductServiceClient;
  constructor(
    private readonly ordersRepository: OrdersRepository,
    @Inject(PRODUCT_SERVICE) private readonly clientGrpc: ClientGrpc,
    private readonly redisService: RedisService
  ) {}

  onModuleInit() {
    this.productServiceClient =
      this.clientGrpc.getService<ProductServiceClient>("ProductService"); // Initialize the ProductServiceClient
  }

  async createOrder(
    request: CreateOrderRequest,
    authentication: string
  ): Promise<Order> {
    const session = await this.ordersRepository.startTransaction();
    try {
      const order = await this.ordersRepository.create(request, { session });

      await session.commitTransaction();
      return order;
    } catch (err) {
      await session.abortTransaction();
      throw err;
    }
  }

  async getProductDetails(productId: string) {
    const cacheKey = `product:${productId}`;

    // Try to get the product details from Redis cache
    const cachedProduct = await this.redisService.get(cacheKey);
    if (cachedProduct) {
      return JSON.parse(cachedProduct);
    }

    try {
      // If not in cache, fetch product details from the Product service via gRPC
      const productDetails = await lastValueFrom(
        this.productServiceClient.getProduct({ id: productId })
      );

      // Cache the product details in Redis
      await this.redisService.set(
        cacheKey,
        JSON.stringify(productDetails),
        3600
      ); 

      return productDetails;
    } catch (error) {
      throw new NotFoundException(`Product with ID ${productId} not found.`);
    }
  }

  async updateOrder(
    orderId: string,
    updateOrderRequest: UpdateOrderRequest
  ): Promise<Order> {
    const updatedOrder = await this.ordersRepository.findOneAndUpdate(
      { orderId },
      updateOrderRequest
    );

    if (!updatedOrder) {
      throw new NotFoundException(`Order with ID ${orderId} not found.`);
    }

    return updatedOrder;
  }

  async getOrderById(orderId: string): Promise<Order> {
    const order = await this.ordersRepository.findOne({ orderId });

    if (!order) {
      throw new NotFoundException(`Order with ID ${orderId} not found.`);
    }

    return order;
  }

  async getOrders(): Promise<Order[]> {
    return this.ordersRepository.find({});
  }

  async updateOrderByProductChange(
    productId: any,
    productData: any
  ): Promise<void> {
    const orders = await this.ordersRepository.find({ productIds: productId });

    for (const order of orders) {
      let newTotalPrice = 0;

      for (const orderProduct of order.products) {
        if (orderProduct.productId == productId) {
          orderProduct.price = productData.price || orderProduct.price;
        }
        newTotalPrice += orderProduct.price * orderProduct.quantity;
      }

      // Update the order's total price
      order.totalPrice = newTotalPrice;

      // Save the updated order
      await this.ordersRepository.save(order);
    }
  }
}
