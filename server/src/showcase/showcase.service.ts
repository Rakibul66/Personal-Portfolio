import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class ShowcaseService {
  constructor(private prisma: PrismaService) {}

  async findAll() {
    return this.prisma.showcaseVideo.findMany({
      orderBy: [{ order: 'asc' }, { createdAt: 'desc' }],
    });
  }

  async create(data: any) {
    return this.prisma.showcaseVideo.create({ data });
  }

  async update(id: string, data: any) {
    const existing = await this.prisma.showcaseVideo.findUnique({ where: { id } });
    if (!existing) throw new NotFoundException('Showcase video not found');
    return this.prisma.showcaseVideo.update({
      where: { id },
      data,
    });
  }

  async delete(id: string) {
    return this.prisma.showcaseVideo.delete({ where: { id } });
  }
}
