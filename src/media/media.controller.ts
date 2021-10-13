import {
  BadRequestException,
  Controller,
  InternalServerErrorException,
  Post,
  Res,
  UploadedFile,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { MediaService } from './media.service';
import * as ffmpeg from 'fluent-ffmpeg';
import * as fs from 'fs';
import { join } from 'path';
import { Response } from 'express';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
@UseGuards(JwtAuthGuard)
@Controller('media')
export class MediaController {
  constructor(private readonly mediaService: MediaService) {}
  @Post('upload')
  @UseInterceptors(
    FileInterceptor('file', {
      fileFilter: (req: Request, file: Express.Multer.File, cb) => {
        if (
          file.mimetype === 'video/x-matroska' || //mkv
          file.mimetype === 'video/webm' || //webm
          file.mimetype === 'video/x-m4v' || //m4v
          file.mimetype === 'video/mp4' //mp4
        ) {
          cb(null, true);
        } else {
          cb(new BadRequestException('Invalid File'), false);
        }
      },
    }),
  )
  uploadFile(@UploadedFile() file: Express.Multer.File, @Res() res: Response) {
    if (!file) {
      return;
    }
    if (file.mimetype === 'video/mp4') {
      return file;
    }
    // console.log(file.path);

    const originalPath = join(__dirname, '..', '..', file.path);
    const mp4Path = join(__dirname, '..', '..', file.path + '.mp4');
    const command = ffmpeg(originalPath);

    command.toFormat('mp4');
    command.saveToFile(mp4Path);

    command.on('progress', function (progress) {
      console.log('Processing: ' + progress.percent + '% done');
    });
    command.on('end', () => {
      console.log('finished converting');
      res.send({ ...file, path: `/${file.path}.mp4` });
      fs.unlink(originalPath, (err) => {
        if (err) {
          console.log(err);
        }
      });
    });
    command.on('error', (error) => {
      console.log(error);
      throw new InternalServerErrorException('Error when converting');
    });
  }
}
