import { Injectable, Inject, NotFoundException } from "@nestjs/common";
import { ClientProxy } from "@nestjs/microservices";
import { lastValueFrom } from "rxjs";
import { CreateOrderRequest } from "./dto/create-order.request";
import { UpdateOrderRequest } from "./dto/update-order.request";
import { OrdersRepository } from "./orders.repository";
import { Order } from "./schemas/order.schema";
import { BILLING_SERVICE } from "./constants/services";

@Injectable()
export class OrdersService {
  constructor(
    private readonly ordersRepository: OrdersRepository,
    @Inject(BILLING_SERVICE) private billingClient: ClientProxy
  ) {}

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

  async handleManyProductUpdateEvent(product: {
    productId: any;
    name: any;
    price: any;
  }) {
    await this.ordersRepository.updateMany(
      { "products.productId": product.productId },
      {
        $set: {
          "products.$[elem].name": product.name,
          "products.$[elem].price": product.price,
        },
      }
    );
  }
}
