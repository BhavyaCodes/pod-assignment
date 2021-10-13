import {
  BadRequestException,
  Controller,
  Post,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { MediaService } from './media.service';

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
          file.mimetype === 'video/x-m4v' //m4v
        ) {
          cb(null, true);
        } else {
          cb(new BadRequestException('Invalid File'), false);
        }
      },
    }),
  )
  uploadFile(@UploadedFile() file: Express.Multer.File) {
    // return file.filename;
    // return file.originalname;
    return file;
  }
}

// @UseInterceptors(
// 	FileInterceptor('file', {
// 		fileFilter: (req: Request, file: Express.Multer.File, cb) => {
// 			if (
// 				file.mimetype === 'video/x-matroska' ||
// 				file.mimetype === 'video/webm' ||
// 				file.mimetype === 'video/x-m4v'
// 			) {
// 				cb(null, true);
// 			} else {
// 				cb(null, false);
// 			}
// 		},
// 	}),
// )
