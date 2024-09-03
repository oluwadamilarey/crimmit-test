import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { AbstractDocument } from "@app/common";
import { Types } from "mongoose";

@Schema({ versionKey: false })
export class User extends AbstractDocument {
  @Prop()
  email: string;

  @Prop()
  password: string;

  @Prop()
  address: string;

  @Prop({ type: [{ type: Types.ObjectId, ref: "Product" }] })
  products?: Types.ObjectId[];
}

export const UserSchema = SchemaFactory.createForClass(User);
