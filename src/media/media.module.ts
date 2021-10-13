import { Module } from '@nestjs/common';
import { MediaService } from './media.service';
import { MediaController } from './media.controller';
import { MulterModule } from '@nestjs/platform-express';
import * as multer from 'multer';
import { join } from 'path';
import { mkdirSync } from 'fs';
import { v4 } from 'uuid';

@Module({
  imports: [
    MulterModule.register({
      dest: './upload',
      storage: multer.diskStorage({
        destination(req, file, cb) {
          mkdirSync('./upload', { recursive: true });
          // mkdirSync('./upload');
          // cb(null, join(__dirname, './upload'));
          cb(null, './upload');
        },
        filename(req, file, cb) {
          cb(null, v4() + file.originalname);
        },
      }),
    }),
  ],
  providers: [MediaService],
  controllers: [MediaController],
})
export class MediaModule {}
