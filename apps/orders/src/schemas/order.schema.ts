import { Schema, Prop, SchemaFactory } from "@nestjs/mongoose";
import { AbstractDocument } from "@app/common";
import { Types } from "mongoose";

@Schema({ versionKey: false })
export class Order extends AbstractDocument {
  @Prop({ required: true, default: 0 })
  totalPrice: number;

  @Prop({ type: Types.ObjectId, ref: "Owner", required: true })
  owner: Types.ObjectId;

  @Prop({ default: "pending" })
  status?: string;

  @Prop({
    type: [
      {
        productId: { type: Types.ObjectId, ref: "Product" },
        name: String,
        price: Number,
        quantity: Number,
      },
    ],
    required: true,
  })
  products: {
    productId: Types.ObjectId;
    name: string;
    price: number;
    quantity: number;
  }[];
}

export const OrderSchema = SchemaFactory.createForClass(Order);
