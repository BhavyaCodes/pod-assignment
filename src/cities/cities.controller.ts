import {
  Controller,
  Get,
  Query,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { CitiesService } from './cities.service';
import { GetAllCitiesFilteredQuery } from './dto/get-all-cities-filtered.dto';
import { City } from './schema/city.schema';

@Controller('cities')
export class CitiesController {
  constructor(private readonly citiesService: CitiesService) {}

  @Get('/all')
  getAll(): Promise<City[]> {
    return this.citiesService.getAll();
  }

  @Get('/all-filtered')
  @UsePipes(new ValidationPipe({ transform: true }))
  getAllFiltered(
    @Query()
    query: GetAllCitiesFilteredQuery,
  ) {
    console.log(query);
    // return this.citiesService.getAllFiltered();
  }
}
