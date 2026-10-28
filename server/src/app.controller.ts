import { Controller, Get, Post, Ip, Headers } from '@nestjs/common';
import { PrismaService } from './prisma/prisma.service';

@Controller()
export class AppController {
  constructor(private readonly prisma: PrismaService) {}

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
        '/analytics/visit',
      ],
    };
  }

  // Get current real visitor count
  @Get('analytics/visit')
  async getVisitors() {
    let stats = await this.prisma.analytics.findUnique({ where: { id: 'site_stats' } });
    if (!stats) {
      stats = await this.prisma.analytics.create({
        data: { id: 'site_stats', visits: 1718 },
      });
    }
    return { visits: stats.visits };
  }

  // Record a new visitor hit
  @Post('analytics/visit')
  async recordVisit() {
    const stats = await this.prisma.analytics.upsert({
      where: { id: 'site_stats' },
      update: { visits: { increment: 1 } },
      create: { id: 'site_stats', visits: 1719 },
    });
    return { visits: stats.visits };
  }
}
