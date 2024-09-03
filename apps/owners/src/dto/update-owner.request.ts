import { IsEmail, IsOptional, IsPhoneNumber, IsString } from "class-validator";

export class UpdateOwnerRequest {
  @IsString()
  @IsOptional()
  name?: string;

  @IsEmail()
  @IsOptional()
  email?: string;

  @IsPhoneNumber()
  @IsOptional()
  phoneNumber?: string;

  @IsString()
  @IsOptional()
  address?: string;
}
