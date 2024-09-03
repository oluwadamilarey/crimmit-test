import {
  Injectable,
  Inject,
  UnauthorizedException,
  UnprocessableEntityException,
  NotFoundException,
} from "@nestjs/common";
import * as bcrypt from "bcrypt";
import { UsersRepository } from "./users.repository";
import { CreateUserRequest } from "./dto/create-user.request";
import { User } from "./schemas/user.schema";
import { lastValueFrom } from "rxjs";
import { PRODUCT_SERVICE } from "./constants/services";
import { ClientProxy } from "@nestjs/microservices";

@Injectable()
export class UsersService {
  constructor(
    private readonly usersRepository: UsersRepository,
    @Inject(PRODUCT_SERVICE) private productsClient: ClientProxy
  ) {}

  async createUser(request: CreateUserRequest) {
    await this.validateCreateUserRequest(request);
    const user = await this.usersRepository.create({
      ...request,
      password: await bcrypt.hash(request.password, 10),
    });
    return user;
  }

  private async validateCreateUserRequest(request: CreateUserRequest) {
    let user: User;
    try {
      user = await this.usersRepository.findOne({
        email: request.email,
      });
    } catch (err) {}

    if (user) {
      throw new UnprocessableEntityException("Email already exists.");
    }
  }

  async validateUser(email: string, password: string) {
    const user = await this.usersRepository.findOne({ email });
    const passwordIsValid = await bcrypt.compare(password, user.password);
    if (!passwordIsValid) {
      throw new UnauthorizedException("Credentials are not valid.");
    }
    return user;
  }

  async getUser(getUserArgs: Partial<User>) {
    return this.usersRepository.findOne(getUserArgs);
  }

  async updateUser(userId: string, updateData: Partial<User>): Promise<User> {
    const updatedUser = await this.usersRepository.findOneAndUpdate(
      { _id: userId },
      updateData
    );

    await lastValueFrom(
      this.productsClient.emit("user_updated", {
        updatedUser,
      })
    );

    return updatedUser;
  }

  async getUserById(userId: string): Promise<User> {
    const user = await this.usersRepository.findOne({ _id: userId });

    if (!user) {
      throw new NotFoundException(`User with ID ${userId} not found`);
    }

    return user;
  }
}
