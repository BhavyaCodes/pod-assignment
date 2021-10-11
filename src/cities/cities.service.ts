import { Model } from 'mongoose';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { City, CityDocument, CityFields } from './schema/city.schema';

@Injectable()
export class CitiesService {
  constructor(@InjectModel(City.name) private cityModel: Model<CityDocument>) {}

  async getAll(): Promise<City[]> {
    return this.cityModel.find().exec();
  }

  async getAllFiltered(
    limit = 10,
    page = 1,
    sortBy: 'pop' | 'city' | 'state' = 'city',
    sortOrder: -1 | 1 = 1,
    searchField: CityFields = 'city',
    minPopulation: number,
    maxPopulation: number,
  ): Promise<any> {
    // return thi;
    limit = Math.max(1000, limit);

    //get total docs
    const totalDocs = await this.cityModel.countDocuments({
      pop: { $gte: minPopulation, $lte: maxPopulation },
    });
    return { totalDocs };
  }
}
