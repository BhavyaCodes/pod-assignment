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
    minPopulation: number,
    maxPopulation: number,
  ): Promise<any> {
    if (minPopulation && maxPopulation && minPopulation > maxPopulation) {
      throw new BadRequestException(
        "min population can't be more than max population",
      );
    }
    // return thi;
    // limit = Math.max(1000, limit);

    //get total docs
    const totalDocs = await this.cityModel.countDocuments({
      ...((minPopulation || maxPopulation) && {
        pop: {
          ...(minPopulation && { $gte: minPopulation }),
          ...(maxPopulation && { $lte: maxPopulation }),
        },
      }),
    });
    return { totalDocs };
  }
}
