import { Injectable } from '@nestjs/common';
import { v2 as cloudinary, UploadApiResponse } from 'cloudinary';
const streamifier = require('streamifier');

@Injectable()
export class CloudinaryService {
  constructor() {
    cloudinary.config({
      cloud_name: process.env.CLOUDINARY_CLOUD_NAME || 'sa0n0p7l',
      api_key: process.env.CLOUDINARY_API_KEY || '968662232349366',
      api_secret: process.env.CLOUDINARY_API_SECRET || '1TeNLqeJ0cxpfNPp-Tg5YWmSaC4',
      secure: true,
    });
  }

  isConfigured(): boolean {
    return !!(
      process.env.CLOUDINARY_CLOUD_NAME ||
      process.env.CLOUDINARY_URL ||
      'sa0n0p7l'
    );
  }

  async uploadStream(
    fileBuffer: Buffer,
    folder: string = 'portfolio',
    resourceType: 'image' | 'video' | 'raw' | 'auto' = 'auto',
    originalFilename?: string,
  ): Promise<UploadApiResponse> {
    return new Promise((resolve, reject) => {
      const ext = originalFilename ? originalFilename.slice(originalFilename.lastIndexOf('.')) : '';
      const baseName = originalFilename
        ? originalFilename.replace(/\.[^/.]+$/, '').replace(/[^a-zA-Z0-9_-]/g, '_')
        : 'file';
      const uniqueSuffix = Date.now();
      
      const options: any = {
        folder,
        resource_type: resourceType,
      };

      // For raw documents (PDF, DOC, DOCX), Cloudinary needs the extension in the public_id so it downloads with the extension
      if (resourceType === 'raw' && ext) {
        options.public_id = `${baseName}_${uniqueSuffix}${ext}`;
        options.use_filename = true;
      }

      const uploadStream = cloudinary.uploader.upload_stream(
        options,
        (error, result) => {
          if (error) return reject(error);
          if (!result) return reject(new Error('Cloudinary upload returned empty response'));
          resolve(result);
        },
      );

      streamifier.createReadStream(fileBuffer).pipe(uploadStream);
    });
  }
}
