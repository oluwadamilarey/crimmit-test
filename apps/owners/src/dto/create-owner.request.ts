import { IsEmail, IsPhoneNumber, IsString } from "class-validator";

export class CreateOwnerRequest {
  @IsString()
  name: string;

  @IsString()
  email: string;

  // @IsString()
  // phoneNumber?: string;

  @IsString()
  address?: string;
}
