import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class VenturesService {
  constructor(private prisma: PrismaService) {}

  async findAll() {
    return this.prisma.inHouseVentures.findMany({
      orderBy: [{ order: 'asc' }, { createdAt: 'desc' }],
    });
  }

  async findOne(id: string) {
    const v = await this.prisma.inHouseVentures.findUnique({ where: { id } });
    if (!v) throw new NotFoundException('Venture not found');
    return v;
  }

  async create(data: any) {
    return this.prisma.inHouseVentures.create({ data });
  }

  async update(id: string, data: any) {
    return this.prisma.inHouseVentures.update({
      where: { id },
      data,
    });
  }

  async remove(id: string) {
    return this.prisma.inHouseVentures.delete({
      where: { id },
    });
  }
}
