import {
  Controller,
  Get,
  Query,
  UseGuards,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { CitiesService } from './cities.service';
import { GetAllCitiesFilteredQuery } from './dto/get-all-cities-filtered.dto';
import { City } from './schema/city.schema';

@UseGuards(JwtAuthGuard)
@Controller('cities')
export class CitiesController {
  constructor(private readonly citiesService: CitiesService) {}

  @Get('/all')
  getAll(): Promise<City[]> {
    return this.citiesService.getAll();
  }

  @Get('/all-filtered')
  @UsePipes(new ValidationPipe({ whitelist: true }))
  getAllFiltered(
    @Query()
    query: GetAllCitiesFilteredQuery,
  ) {
    const {
      limit,
      page,
      sortBy,
      sortOrder,
      searchField,
      searchValue,
      minPopulation,
      maxPopulation,
    } = query;

    return this.citiesService.getAllFiltered(
      limit,
      page,
      sortBy,
      sortOrder,
      searchField,
      searchValue,
      minPopulation,
      maxPopulation,
    );
  }
}
