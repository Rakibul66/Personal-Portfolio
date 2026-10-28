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
import { diskStorage } from 'multer';
import { extname, join } from 'path';
import { existsSync, mkdirSync } from 'fs';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';

const uploadDir = join(process.cwd(), 'uploads');
if (!existsSync(uploadDir)) {
  mkdirSync(uploadDir, { recursive: true });
}

@Controller('upload')
export class UploadController {
  @Post()
  @UseGuards(JwtAuthGuard)
  @UseInterceptors(
    FileInterceptor('file', {
      storage: diskStorage({
        destination: uploadDir,
        filename: (req, file, callback) => {
          const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9);
          const ext = extname(file.originalname);
          callback(null, `${uniqueSuffix}${ext}`);
        },
      }),
      limits: {
        fileSize: 100 * 1024 * 1024, // 100MB limit for images & MP4/WebM videos
      },
      fileFilter: (req, file, callback) => {
        if (!file.mimetype.match(/\/(jpg|jpeg|png|gif|webp|svg\+xml|mp4|webm|quicktime|ogg|pdf|msword|vnd\.openxmlformats-officedocument\.wordprocessingml\.document)$/)) {
          return callback(new BadRequestException('Only media files (JPG, PNG, WEBP, GIF, SVG, MP4, WebM, MOV) or CV documents (PDF, DOC, DOCX) are allowed'), false);
        }
        callback(null, true);
      },
    }),
  )
  uploadFile(@UploadedFile() file: Express.Multer.File, @Req() req: any) {
    if (!file) {
      throw new BadRequestException('No file provided');
    }
    // Check if an external host or standard host is provided via environment or request header
    const forwardProto = req.headers['x-forwarded-proto'];
    const protocol = (typeof forwardProto === 'string' ? forwardProto.split(',')[0].trim() : req.protocol) || 'https';
    const host = req.headers['x-forwarded-host'] || req.get('host');
    const baseUrl = process.env.PUBLIC_API_URL || `${protocol}://${host}`;
    const fileUrl = `${baseUrl.replace(/\/$/, '')}/uploads/${file.filename}`;
    return {
      url: fileUrl,
      filename: file.filename,
    };
  }
}
