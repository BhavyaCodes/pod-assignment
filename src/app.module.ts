import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { CitiesModule } from './cities/cities.module';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';
import { MediaModule } from './media/media.module';

@Module({
  imports: [
    MongooseModule.forRoot('mongodb://localhost:27017/pod'),
    CitiesModule,
    AuthModule,
    UsersModule,
    MediaModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
