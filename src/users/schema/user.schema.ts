import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type UserDocument = User & Document;

@Schema()
export class User {
  @Prop({ type: String, minlength: 3, maxlength: 20, unique: true })
  username: string;

  @Prop({ type: String, minlength: 3, maxlength: 100 })
  password: string;
}

export const UserSchema = SchemaFactory.createForClass(User);
