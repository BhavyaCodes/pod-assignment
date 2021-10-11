import { Module } from '@nestjs/common';
import { CitiesService } from './cities.service';
import { CitiesController } from './cities.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { City, CitySchema } from './schema/city.schema';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: City.name, schema: CitySchema }]),
  ],
  providers: [CitiesService],
  controllers: [CitiesController],
})
export class CitiesModule {}
