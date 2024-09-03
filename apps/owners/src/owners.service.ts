import { Inject, Injectable } from "@nestjs/common";
import { ClientProxy } from "@nestjs/microservices";
import { lastValueFrom } from "rxjs";
import { PRODUCT_SERVICE } from "./constants/services";
import { CreateOwnerRequest } from "./dto/create-owner.request";
import { UpdateOwnerRequest } from "./dto/update-owner.request";
import { OwnersRepository } from "./owners.repository";

@Injectable()
export class OwnersService {
  constructor(
    private readonly ownersRepository: OwnersRepository,
    @Inject(PRODUCT_SERVICE) private productClient: ClientProxy
  ) {}

  async createOwner(request: CreateOwnerRequest, authentication: string) {
    const session = await this.ownersRepository.startTransaction();
    try {
      const owner = await this.ownersRepository.create(request, { session });
      // await lastValueFrom(
      //   this.productClient.emit("owner_created", {
      //     request,
      //     Authentication: authentication,
      //   })
      // );
      await session.commitTransaction();
      return owner;
    } catch (err) {
      await session.abortTransaction();
      throw err;
    }
  }

  async updateOwner(
    id: string,
    request: UpdateOwnerRequest,
    authentication: string
  ) {
    const session = await this.ownersRepository.startTransaction();
    try {
      const owner = await this.ownersRepository.findOneAndUpdate(
        { _id: id },
        request
      );
      if (owner) {
        await lastValueFrom(
          this.productClient.emit("owner_updated", {
            id,
            request,
            Authentication: authentication,
          })
        );
      }
      await session.commitTransaction();
      return owner;
    } catch (err) {
      await session.abortTransaction();
      throw err;
    }
  }

  async getOwners() {
    return this.ownersRepository.find({});
  }

  async getOwnerById(id: string) {
    return this.ownersRepository.findOne({ _id: id });
  }
}
