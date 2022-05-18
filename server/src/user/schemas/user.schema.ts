import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Document } from "mongoose";

export type UserDocument = User & Document;

@Schema({
  id: true,
})
export class User {
  @Prop()
  firstName: string;

  @Prop()
  lastName: string;

  @Prop({ unique: true })
  email: string;

  @Prop()
  password: string;

  @Prop()
  ipAddress: string;

  @Prop({ type: Date })
  dateOfBirth: Date;

  @Prop({ type: Date, default: Date.now })
  lastLoginTime: Date;
}

export const UserSchema = SchemaFactory.createForClass(User);
