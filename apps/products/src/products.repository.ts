import { Injectable, Logger } from "@nestjs/common";
import { InjectConnection, InjectModel } from "@nestjs/mongoose";
import { Model, Connection } from "mongoose";
import { AbstractRepository } from "@app/common";
import { Product } from "./schemas/product.schema";

@Injectable()
export class ProductRepository extends AbstractRepository<Product> {
  protected readonly logger = new Logger(ProductRepository.name);

  constructor(
    @InjectModel(Product.name) productModel: Model<Product>,
    @InjectConnection() connection: Connection
  ) {
    super(productModel, connection);
  }
}
