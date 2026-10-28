import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateProjectDto, UpdateProjectDto } from './dto/project.dto';

@Injectable()
export class ProjectsService {
  constructor(private prisma: PrismaService) {}

  async findAll(params?: { cursor?: string; limit?: number; category?: string }) {
    const take = params?.limit ? Math.min(params.limit, 50) : undefined;
    const where: any = {};
    if (params?.category && params.category !== 'All') {
      where.category = params.category;
    }

    // High-performance Keyset Pagination using composite [createdAt, id] index
    if (params?.cursor) {
      const items = await this.prisma.project.findMany({
        take: take ? take + 1 : undefined,
        skip: 1,
        cursor: { id: params.cursor },
        where,
        orderBy: [{ createdAt: 'desc' }, { id: 'desc' }],
      });

      let nextCursor: string | null = null;
      if (take && items.length > take) {
        const nextItem = items.pop();
        nextCursor = nextItem ? nextItem.id : null;
      }

      return {
        items,
        nextCursor,
        hasMore: !!nextCursor,
      };
    }

    // If no cursor is passed and limit is requested, return initial keyset page
    if (take) {
      const items = await this.prisma.project.findMany({
        take: take + 1,
        where,
        orderBy: [{ createdAt: 'desc' }, { id: 'desc' }],
      });

      let nextCursor: string | null = null;
      if (items.length > take) {
        const nextItem = items.pop();
        nextCursor = nextItem ? nextItem.id : null;
      }

      return {
        items,
        nextCursor,
        hasMore: !!nextCursor,
      };
    }

    // Default backward-compatible full list (sorted by featured, order, createdAt)
    return this.prisma.project.findMany({
      where,
      orderBy: [{ featured: 'desc' }, { order: 'asc' }, { createdAt: 'desc' }],
    });
  }

  async findOne(id: string) {
    const project = await this.prisma.project.findUnique({ where: { id } });
    if (!project) {
      throw new NotFoundException(`Project with ID ${id} not found`);
    }
    return project;
  }

  async create(dto: CreateProjectDto) {
    return this.prisma.project.create({
      data: dto,
    });
  }

  async update(id: string, dto: UpdateProjectDto) {
    await this.findOne(id);
    return this.prisma.project.update({
      where: { id },
      data: dto,
    });
  }

  async remove(id: string) {
    await this.findOne(id);
    return this.prisma.project.delete({
      where: { id },
    });
  }
}
