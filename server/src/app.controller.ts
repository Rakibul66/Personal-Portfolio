import { Controller, Get, Post, Req, Headers, Body } from '@nestjs/common';
import { Request } from 'express';
import * as crypto from 'crypto';
import { PrismaService } from './prisma/prisma.service';

// In-memory set of visitor hashes with timestamps to prevent double counting
const recentVisitorCache = new Map<string, number>();
const DEDUP_WINDOW_MS = 24 * 60 * 60 * 1000; // 24 hours per unique device / visitor

// Known bot / crawler signatures to ignore
const BOT_REGEX = /bot|spider|crawl|slurp|facebookexternalhit|bingbot|googlebot|yandex|duckduckbot|baiduspider|headlesschrome|curl|wget|python-requests/i;

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

  // Get current real verified visitor count
  @Get('analytics/visit')
  async getVisitors() {
    let stats = await this.prisma.analytics.findUnique({ where: { id: 'site_stats' } });
    if (!stats) {
      stats = await this.prisma.analytics.create({
        data: { id: 'site_stats', visits: 1768 },
      });
    }
    return { visits: stats.visits };
  }

  // Record a verified real human visitor (ignores bots, crawlers, and rapid refreshes)
  @Post('analytics/visit')
  async recordVisit(@Req() req: Request, @Body() body: { visitorId?: string }) {
    const userAgent = (req.headers['user-agent'] as string) || '';
    
    // 1. Ignore automated bots, search crawlers, and scrapers
    if (BOT_REGEX.test(userAgent)) {
      const stats = await this.prisma.analytics.findUnique({ where: { id: 'site_stats' } });
      return { visits: stats?.visits || 1768, recorded: false };
    }

    // 2. Extract genuine client IP (handles Cloudflare, Render, proxies)
    const forwarded = req.headers['x-forwarded-for'];
    const ip = typeof forwarded === 'string' 
      ? forwarded.split(',')[0].trim() 
      : (req.socket.remoteAddress || 'unknown');

    // 3. Generate a daily unique fingerprint combining client token, IP, and user-agent
    const clientVisitorId = body?.visitorId || '';
    const dateKey = new Date().toISOString().slice(0, 10); // YYYY-MM-DD
    const fingerprint = crypto
      .createHash('sha256')
      .update(`${ip}-${userAgent}-${clientVisitorId}-${dateKey}`)
      .digest('hex');

    const now = Date.now();

    // Clean up cache periodically
    if (recentVisitorCache.size > 20000) {
      for (const [key, timestamp] of recentVisitorCache.entries()) {
        if (now - timestamp > DEDUP_WINDOW_MS) {
          recentVisitorCache.delete(key);
        }
      }
    }

    // 4. If this unique visitor has already been counted in the last 24 hours, return current count without incrementing
    if (recentVisitorCache.has(fingerprint)) {
      const stats = await this.prisma.analytics.findUnique({ where: { id: 'site_stats' } });
      return { visits: stats?.visits || 1768, recorded: false };
    }

    // Mark visitor as counted for 24h
    recentVisitorCache.set(fingerprint, now);

    // 5. Increment genuine visit count in PostgreSQL
    const stats = await this.prisma.analytics.upsert({
      where: { id: 'site_stats' },
      update: { visits: { increment: 1 } },
      create: { id: 'site_stats', visits: 1769 },
    });

    return { visits: stats.visits, recorded: true };
  }
}
