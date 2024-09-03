import { IsArray, IsNumber, IsOptional, IsString } from "class-validator";

export class UpdateOrderRequest {
  @IsString()
  @IsOptional()
  orderId?: string;

  @IsArray()
  @IsOptional()
  productIds?: string[];

  @IsOptional()
  quantity?: Map<string, number>;

  @IsNumber()
  @IsOptional()
  totalPrice?: number;
}
