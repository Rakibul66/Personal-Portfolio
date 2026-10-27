import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AppController } from './app.controller';
import { PrismaModule } from './prisma/prisma.module';
import { ProjectsModule } from './projects/projects.module';
import { MessagesModule } from './messages/messages.module';
import { AuthModule } from './auth/auth.module';
import { SkillsModule } from './skills/skills.module';
import { ProfileModule } from './profile/profile.module';
import { BlogsModule } from './blogs/blogs.module';
import { UploadModule } from './upload/upload.module';
import { VenturesModule } from './ventures/ventures.module';
import { ShowcaseModule } from './showcase/showcase.module';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    PrismaModule,
    AuthModule,
    ProfileModule,
    ProjectsModule,
    VenturesModule,
    ShowcaseModule,
    BlogsModule,
    MessagesModule,
    SkillsModule,
    UploadModule,
  ],
  controllers: [AppController],
})
export class AppModule {}
