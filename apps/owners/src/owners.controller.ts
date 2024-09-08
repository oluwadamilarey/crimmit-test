import {
  Controller,
  Get,
  Post,
  Body,
  Req,
  Param,
} from "@nestjs/common";
import { OwnersService } from "./owners.service";
import { JwtAuthGuard } from "@app/common";
import { CreateOwnerRequest } from "./dto/create-owner.request";
import { UpdateOwnerRequest } from "./dto/update-owner.request";

@Controller("owners")
export class OwnersController {
  constructor(private readonly ownersService: OwnersService) {}

  @Post("create")
  //@UseGuards(JwtAuthGuard)
  async createOwner(@Body() request: CreateOwnerRequest, @Req() req: any) {
    return this.ownersService.createOwner(request, req.cookies?.Authentication);
  }

  @Post("update")
  // @UseGuards(JwtAuthGuard)
  async updateOwner(
    @Param("orderId") orderId: string,
    @Body() request: UpdateOwnerRequest,
    @Req() req: any
  ) {
    return this.ownersService.updateOwner(
      orderId,
      request,
      req.cookies?.Authentication
    );
  }

  @Get(":orderId")
  // @UseGuards(JwtAuthGuard)
  async getOwnerById(@Param("orderId") orderId: string) {
    return this.ownersService.getOwnerById(orderId);
  }

  @Get()
  async getOwners() {
    return this.ownersService.getOwners();
  }

  @Get()
  async getOwnerProducts() {
    return this.ownersService.getOwnersProducts();
  }
}
