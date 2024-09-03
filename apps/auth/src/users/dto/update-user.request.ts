import { IsEmail, IsOptional, IsString, IsNotEmpty } from 'class-validator';

export class UpdateUserRequest {
  @IsEmail()
  @IsOptional()
  email?: string;

  @IsString()
  @IsOptional()
  @IsNotEmpty()
  password?: string;

  @IsString()
  @IsOptional()
  address?: string;

  @IsString()
  @IsOptional()
  name?: string; 

  
}