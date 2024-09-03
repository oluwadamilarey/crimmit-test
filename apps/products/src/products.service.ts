import { Inject, Injectable, Logger } from "@nestjs/common";
import { Product } from "./schemas/product.schema";
import { CreateProductDto } from "./dto/create-product.dto";
import { AUTH_SERVICE } from "./constants/service";
import { ClientProxy } from "@nestjs/microservices";
import { ProductRepository } from "./products.repository";

@Injectable()
export class ProductsService {
  private readonly logger = new Logger(ProductsService.name);

  constructor(
    private readonly productRepository: ProductRepository,
    @Inject(AUTH_SERVICE) private authClient: ClientProxy
  ) {}

  async updateProductByOwner(data: any): Promise<void> {
    const { updatedUser } = data;
    const {
      _id: ownerId,
      name: ownerName,
      address: ownerAddress,
    } = updatedUser;

    await this.productRepository.updateMany(
      { owner: ownerId }, // Filter products by owner ID
      {
        $set: {
          ownerName, // Update the cached owner name
          ownerAddress, // Update the cached owner address
        },
      }
    );

    this.logger.log(`Products updated for owner ${ownerId}`);
  }

  async createProduct(createProductDto: CreateProductDto): Promise<Product> {
    const { name, description, price, ownerId, ownerName, ownerAddress } =
      createProductDto;

    // Create a new product instance
    const newProduct = await this.productRepository.create({
      name,
      description,
      price,
      owner: ownerId,
      ownerName,
      ownerAddress,
    });

    this.logger.log(`Product created with ID ${newProduct._id}`);

    return newProduct;
  }

  async getProductsByOwnerID(id: string): Promise<Product[]> {
    return this.productRepository.find({ _id: id });
  }
}
