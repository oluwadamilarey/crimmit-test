import { Schema, Prop, SchemaFactory } from "@nestjs/mongoose";
import { AbstractDocument } from "@app/common";
import { Types } from "mongoose";

@Schema({ versionKey: false })
export class Product extends AbstractDocument {
  @Prop()
  name: string; // Name of the product

  @Prop()
  description?: string; // Description of the product

  @Prop()
  price: number; // Price of the product

  @Prop({ type: Types.ObjectId, ref: "Owner" })
  ownerId: any; // Reference to the owner who owns the product

  @Prop()
  ownerName?: string; // Cached owner name

  @Prop()
  ownerAddress?: string; // Cached owner address
}

export const ProductSchema = SchemaFactory.createForClass(Product);
