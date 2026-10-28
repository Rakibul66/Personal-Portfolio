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
  ): Promise<UploadApiResponse> {
    return new Promise((resolve, reject) => {
      const uploadStream = cloudinary.uploader.upload_stream(
        {
          folder,
          resource_type: resourceType,
        },
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
