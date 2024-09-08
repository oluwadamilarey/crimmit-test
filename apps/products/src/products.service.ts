import { Inject, Injectable, Logger, NotFoundException } from "@nestjs/common";
import { Product } from "./schemas/product.schema";
import { CreateProductDto } from "./dto/create-product.dto";
import { AUTH_SERVICE } from "./constants/service";
import { ClientProxy } from "@nestjs/microservices";
import { ProductRepository } from "./products.repository";
import { ORDER_QUEUE } from "./services/constants";
import { lastValueFrom } from "rxjs";

@Injectable()
export class ProductsService {
  private readonly logger = new Logger(ProductsService.name);

  constructor(
    private readonly productRepository: ProductRepository,
    @Inject(ORDER_QUEUE) private orderClient: ClientProxy
  ) {}

  /**
   * Update product owner details when an owner is updated
   */
  async updateProductByOwner(data: any): Promise<void> {
    const { updatedUser } = data;
    const {
      _id: ownerId,
      name: ownerName,
      address: ownerAddress,
    } = updatedUser;

    await this.productRepository.updateMany(
      { ownerId }, // Filter products by owner ID
      {
        $set: {
          ownerName,
          ownerAddress,
        },
      }
    );

    this.logger.log(`Products updated for owner ${ownerId}`);
  }

  /**
   * Update product price and notify order service of price update
   */
  async updateProductPrice(id: string, price: any): Promise<void> {
    const product = await this.productRepository.findOneAndUpdate(
      { _id: id },
      {
        $set: {
          price,
        },
      }
    );

    if (!product) {
      throw new NotFoundException(`Product with ID ${id} not found.`);
    }

    // Emit event to order service about price update
    await lastValueFrom(
      this.orderClient.emit("price_updated", {
        id: product.id,
        product,
      })
    );
  }

  /**
   * Create a new product
   */
  async createProduct(request: CreateProductDto): Promise<Product> {
    const session = await this.productRepository.startTransaction();

    try {
      const product = await this.productRepository.create(request, { session });
      await session.commitTransaction();

      return product;
    } catch (err) {
      await session.abortTransaction();
      throw err;
    }
  }

  /**
   * Fetch product details by ID (gRPC method implementation)
   */
  async getProductById(id: string): Promise<Product> {
    const product = await this.productRepository.findOne({ _id: id });

    if (!product) {
      throw new NotFoundException(`Product with ID ${id} not found.`);
    }

    return product;
  }

  /**
   * Get products by owner ID
   */
  async getProductsByOwnerID(ownerId: string): Promise<Product[]> {
    return this.productRepository.find({ ownerId });
  }

  /**
   * Get all products
   */
  async getProducts(): Promise<Product[]> {
    return this.productRepository.find({});
  }
}
