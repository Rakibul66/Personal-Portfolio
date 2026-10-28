import {
  Controller,
  Post,
  UseInterceptors,
  UploadedFile,
  BadRequestException,
  UseGuards,
  Req,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { memoryStorage } from 'multer';
import { extname } from 'path';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { CloudinaryService } from './cloudinary.service';

@Controller('upload')
export class UploadController {
  constructor(private readonly cloudinaryService: CloudinaryService) {}

  @Post()
  @UseGuards(JwtAuthGuard)
  @UseInterceptors(
    FileInterceptor('file', {
      storage: memoryStorage(),
      limits: {
        fileSize: 100 * 1024 * 1024, // 100MB limit for images, CVs, and videos
      },
      fileFilter: (req, file, callback) => {
        if (
          !file.mimetype.match(
            /\/(jpg|jpeg|png|gif|webp|svg\+xml|mp4|webm|quicktime|ogg|pdf|msword|vnd\.openxmlformats-officedocument\.wordprocessingml\.document)$/,
          )
        ) {
          return callback(
            new BadRequestException(
              'Only media files (JPG, PNG, WEBP, GIF, SVG, MP4, WebM, MOV) or CV documents (PDF, DOC, DOCX) are allowed',
            ),
            false,
          );
        }
        callback(null, true);
      },
    }),
  )
  async uploadFile(@UploadedFile() file: Express.Multer.File, @Req() req: any) {
    if (!file) {
      throw new BadRequestException('No file provided');
    }

    try {
      // Determine Cloudinary resource type
      let resourceType: 'image' | 'video' | 'raw' | 'auto' = 'auto';
      if (file.mimetype.startsWith('video/')) {
        resourceType = 'video';
      } else if (
        file.mimetype.includes('pdf') ||
        file.mimetype.includes('word') ||
        file.mimetype.includes('document')
      ) {
        resourceType = 'raw';
      } else if (file.mimetype.startsWith('image/')) {
        resourceType = 'image';
      }

      const result = await this.cloudinaryService.uploadStream(
        file.buffer,
        'rakibulhr-portfolio',
        resourceType,
      );

      return {
        url: result.secure_url || result.url,
        public_id: result.public_id,
        filename: file.originalname,
        bytes: result.bytes,
        format: result.format,
      };
    } catch (err: any) {
      console.error('Cloudinary upload error:', err);
      throw new BadRequestException(
        `Failed to upload file to Cloudinary: ${err?.message || 'Unknown error'}`,
      );
    }
  }
}
