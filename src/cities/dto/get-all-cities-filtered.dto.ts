import { Type } from 'class-transformer';
import {
  IsEnum,
  IsInt,
  IsNumber,
  IsNumberString,
  IsOptional,
  Max,
  Min,
} from 'class-validator';
import {
  SearchSortByCitiesEnum,
  SearchSortByCities,
} from '../schema/city.schema';

export enum SortOrder {
  Asc = 1,
  Dsc = -1,
}

export class GetAllCitiesFilteredQuery {
  @IsOptional()
  @Type(() => Number)
  @Min(1)
  @IsInt()
  limit?: number;

  @IsOptional()
  @Type(() => Number)
  @Min(1)
  @IsInt()
  page?: number;

  @IsEnum(SearchSortByCitiesEnum)
  @IsOptional()
  sortBy?: SearchSortByCities;

  @IsEnum(SortOrder)
  @Type(() => Number)
  @IsOptional()
  sortOrder?: number;

  @IsEnum(SearchSortByCitiesEnum)
  @IsOptional()
  searchField?: SearchSortByCities;

  @Type(() => Number)
  @Min(0)
  @Max(1000000000)
  @IsOptional()
  @IsInt()
  minPopulation?: number;

  @Type(() => Number)
  @Min(0)
  @Max(1000000000)
  @IsOptional()
  @IsInt()
  maxPopulation?: number;
}
