import { Schema, Prop, SchemaFactory } from "@nestjs/mongoose";
import { AbstractDocument } from "@app/common";
import { Types } from "mongoose";

@Schema({ versionKey: false })
export class Owner extends AbstractDocument {
  @Prop()
  name: string;

  @Prop()
  email: string;

  @Prop()
  address?: string;

  @Prop({ type: [{ type: Types.ObjectId, ref: "Product" }] })
  products?: Types.ObjectId[];
}

export const OwnerSchema = SchemaFactory.createForClass(Owner);
