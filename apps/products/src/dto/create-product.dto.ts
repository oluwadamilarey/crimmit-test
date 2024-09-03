import { IsNotEmpty, IsString, IsPositive, IsMongoId } from "class-validator";

export class CreateProductDto {
  @IsString()
  name: string;

  @IsString()
  description: string;

  @IsPositive()
  price: number;

  @IsMongoId()
  ownerId: string; // Reference to the owner's ID

  @IsString()
  ownerName: string;

  @IsString()
  ownerAddress: string;
}
