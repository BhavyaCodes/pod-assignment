import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { CitiesModule } from './cities/cities.module';

@Module({
  imports: [
    MongooseModule.forRoot('mongodb://localhost:27017/pod'),
    CitiesModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
