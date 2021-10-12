import { Model } from 'mongoose';
import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { City, CityDocument, SearchSortByCities } from './schema/city.schema';

@Injectable()
export class CitiesService {
  constructor(@InjectModel(City.name) private cityModel: Model<CityDocument>) {}

  async getAll(): Promise<City[]> {
    return this.cityModel.find().exec();
  }

  async getAllFiltered(
    limit = 10,
    page = 1,
    sortBy: SearchSortByCities = 'city',
    sortOrder: -1 | 1 = 1,
    searchField: SearchSortByCities = 'city',
    searchValue?: string,
    minPopulation?: number,
    maxPopulation?: number,
  ): Promise<any> {
    if (minPopulation && maxPopulation && minPopulation > maxPopulation) {
      throw new BadRequestException(
        "min population can't be more than max population",
      );
    }

    limit = Math.min(1000, limit);
    const skip = (page - 1) * limit;

    const filter = {
      ...((minPopulation || maxPopulation) && {
        pop: {
          ...(minPopulation && { $gte: minPopulation }),
          ...(maxPopulation && { $lte: maxPopulation }),
        },
      }),
      ...(searchValue && {
        [searchField]: {
          $eq: searchValue.toUpperCase(),
        },
      }),
    };

    //get total docs count for the filter
    const totalItemsAfterFilter = await this.cityModel.countDocuments(filter);

    const info = {
      totalItemsAfterFilter,
      currentPage: page,
      lastPage: Math.floor(totalItemsAfterFilter / limit) + 1,
    };
    //get docs
    const cityDocs = await this.cityModel
      .find(filter)
      .limit(limit)
      .skip(skip)
      .sort({ [sortBy]: sortOrder });
    return { info, data: cityDocs };
  }
}
