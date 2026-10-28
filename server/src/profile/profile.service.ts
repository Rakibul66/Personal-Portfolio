import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class ProfileService {
  constructor(private prisma: PrismaService) {}

  async getProfile() {
    // Return the database profile config or null if admin hasn't created one yet
    const profile = await this.prisma.profileConfig.findUnique({ where: { id: 'default' } });
    return profile;
  }

  async updateProfile(data: any) {
    return this.prisma.profileConfig.upsert({
      where: { id: 'default' },
      update: data,
      create: { id: 'default', ...data },
    });
  }

  // Experiences & Education
  async getExperiences(type?: string) {
    return this.prisma.experience.findMany({
      where: type ? { type } : undefined,
      orderBy: [{ order: 'asc' }, { createdAt: 'desc' }],
    });
  }

  async createExperience(data: any) {
    return this.prisma.experience.create({ data });
  }

  async updateExperience(id: string, data: any) {
    return this.prisma.experience.update({ where: { id }, data });
  }

  async deleteExperience(id: string) {
    return this.prisma.experience.delete({ where: { id } });
  }

  // References
  async getReferences() {
    return this.prisma.reference.findMany({
      orderBy: [{ order: 'asc' }, { createdAt: 'desc' }],
    });
  }

  async createReference(data: any) {
    return this.prisma.reference.create({ data });
  }

  async updateReference(id: string, data: any) {
    return this.prisma.reference.update({ where: { id }, data });
  }

  async deleteReference(id: string) {
    return this.prisma.reference.delete({ where: { id } });
  }
}
