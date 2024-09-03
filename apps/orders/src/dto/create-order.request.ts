import {
  IsArray,
  IsMongoId,
  IsNotEmpty,
  IsNumber,
  IsPhoneNumber,
  IsPositive,
  IsString,
} from "class-validator";
import { Types } from "mongoose";

export class CreateOrderRequest {
  @IsArray()
  @IsNotEmpty()
  products: {
    productId: Types.ObjectId;
    name: string;
    price: number;
    quantity: number;
  }[];

  @IsNumber()
  @IsPositive()
  totalPrice: number;

  @IsMongoId()
  @IsNotEmpty()
  owner: Types.ObjectId;
}
