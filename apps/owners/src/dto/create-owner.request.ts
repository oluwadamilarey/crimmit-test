import { IsEmail, IsPhoneNumber, IsString } from "class-validator";

export class CreateOwnerRequest {
  @IsString()
  name: string;

  @IsEmail()
  email: string;

  @IsPhoneNumber()
  phoneNumber?: string;

  @IsString()
  address?: string;
}
