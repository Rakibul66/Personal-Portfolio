import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class ProfileService {
  constructor(private prisma: PrismaService) {}

  async getProfile() {
    let profile = await this.prisma.profileConfig.findUnique({ where: { id: 'default' } });
    if (!profile) {
      profile = await this.prisma.profileConfig.create({
        data: {
          id: 'default',
          name: 'MD. Rakibul Hasan',
          title: 'Flutter & Native Android Expert',
          headline: 'Engineering scalable mobile ecosystems and premium digital products.',
          githubUrl: 'https://github.com/Rakibul-Hasan-Roxy',
          linkedinUrl: 'https://linkedin.com/in/rakibul-hasan-roxy',
          email: 'contact@rakibulhr.dev',
          hobbies: ['Open Source', 'Tech Blogging', 'UI Prototyping', 'Traveling'],
        },
      });
    }
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
