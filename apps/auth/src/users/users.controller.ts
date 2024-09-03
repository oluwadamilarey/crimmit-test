import { Body, Controller, Post, Param, Put, Get} from '@nestjs/common';
import { CreateUserRequest } from './dto/create-user.request';
import { UsersService } from './users.service';
import { UpdateUserRequest } from './dto/update-user.request';

@Controller('auth/users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post()
  async createUser(@Body() request: CreateUserRequest) {
    return this.usersService.createUser(request);
  }

  @Put(':id')
  async updateUser(
    @Param('id') userId: string, 
    @Body() updateUserDto: UpdateUserRequest,
  ) {
    return this.usersService.updateUser(userId, updateUserDto);
  }

  @Get(':id')
  async getUserById(@Param('id') userId: string) {
    return this.usersService.getUserById(userId);
  }
}
