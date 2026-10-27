import { Controller, Get } from '@nestjs/common';

@Controller()
export class AppController {
  @Get()
  getHealth() {
    return {
      status: 'online',
      message: 'RakibulHR Portfolio & CMS API is live and healthy',
      timestamp: new Date().toISOString(),
      version: '2.0.0',
      endpoints: [
        '/projects',
        '/ventures',
        '/showcase',
        '/blogs',
        '/profile/references',
        '/profile',
        '/messages',
      ],
    };
  }
}
