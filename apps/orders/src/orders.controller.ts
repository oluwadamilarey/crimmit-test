import {
  Body,
  Controller,
  Get,
  Param,
  Patch,
  Post,
  Req,
  UseGuards,
} from "@nestjs/common";
import { JwtAuthGuard, RmqService } from "@app/common";
import { CreateOrderRequest } from "./dto/create-order.request";
import { UpdateOrderRequest } from "./dto/update-order.request";
import { OrdersService } from "./orders.service";
import { Ctx, EventPattern, Payload, RmqContext } from "@nestjs/microservices";

@Controller("orders")
export class OrdersController {
  constructor(
    private readonly ordersService: OrdersService,
    private readonly rmqService: RmqService
  ) {}

  @Post()
  //@UseGuards(JwtAuthGuard)
  async createOrder(@Body() request: CreateOrderRequest, @Req() req: any) {
    return this.ordersService.createOrder(request, req.cookies?.Authentication);
  }

  @Get()
  async getOrders() {
    return this.ordersService.getOrders();
  }

  @Get(":orderId")
  async getOrderById(@Param("orderId") orderId: string) {
    return this.ordersService.getOrderById(orderId);
  }

  @Patch(":orderId")
  //@UseGuards(JwtAuthGuard)
  async updateOrder(
    @Param("orderId") orderId: string,
    @Body() updateOrderRequest: UpdateOrderRequest
  ) {
    return this.ordersService.updateOrder(orderId, updateOrderRequest);
  }

  @EventPattern("product_update")
  async handleProductUpdate(@Payload() data: any, @Ctx() context: RmqContext) {
    this.ordersService.handleManyProductUpdateEvent(data);
    this.rmqService.ack(context);
  }
}
