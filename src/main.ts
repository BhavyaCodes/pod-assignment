import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as express from 'express';
import { join } from 'path';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  // console.log(__dirname);
  // console.log(join(__dirname, '..', 'upload'));
  // app.use(express.static(join(__dirname, '..', 'upload')));
  app.setGlobalPrefix('api');
  await app.listen(5000);
}
bootstrap();
