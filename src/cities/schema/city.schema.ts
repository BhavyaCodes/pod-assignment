import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type CityDocument = City & Document;

@Schema()
export class City {
  @Prop({ type: String })
  city: string;

  @Prop({
    type: { type: String },
    coordinates: [Number],
  })
  loc: number;

  @Prop({ type: Number })
  pop: number;

  @Prop({ type: String })
  state: string;
}

export enum SearchSortByCitiesEnum {
  city = 'city',
  pop = 'pop',
  state = 'state',
}

export type SearchSortByCities = 'city' | 'pop' | 'state';

export const CitySchema = SchemaFactory.createForClass(City);
