import { Prop, SchemaFactory, Schema } from '@nestjs/mongoose';
import { TokenTypes } from '@shared/enums/token-type.enum';
import { Types } from 'mongoose';

@Schema({
  timestamps: true,
  versionKey: false,
})
export class Token {
  @Prop({ type: String, required: true })
  token: string;

  @Prop({
    type: Types.ObjectId,
    ref: 'User',
    autopopulate: true,
    required: true,
  })
  user: Types.ObjectId;

  @Prop({ type: Date, required: true })
  expires: Date;

  @Prop({ type: String, required: true, enum: Object.values(TokenTypes) })
  type: TokenTypes;
}

export const TokenSchema = SchemaFactory.createForClass(Token);
