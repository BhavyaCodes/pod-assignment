import { Controller, Get } from '@nestjs/common';
import { CitiesService } from './cities.service';
import { City } from './schema/city.schema';

@Controller('cities')
export class CitiesController {
  constructor(private readonly citiesService: CitiesService) {}

  @Get('/all')
  getAll(): Promise<City[]> {
    return this.citiesService.getAll();
  }
}
