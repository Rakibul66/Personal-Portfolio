import { Controller, Get, Patch, Post, Delete, Body, Param, Query, UseGuards } from '@nestjs/common';
import { ProfileService } from './profile.service';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';

@Controller('profile')
export class ProfileController {
  constructor(private readonly profileService: ProfileService) {}

  @Get()
  getProfile() {
    return this.profileService.getProfile();
  }

  @Patch()
  @UseGuards(JwtAuthGuard)
  updateProfile(@Body() body: any) {
    return this.profileService.updateProfile(body);
  }

  @Get('experiences')
  getExperiences(@Query('type') type?: string) {
    return this.profileService.getExperiences(type);
  }

  @Post('experiences')
  @UseGuards(JwtAuthGuard)
  createExperience(@Body() body: any) {
    return this.profileService.createExperience(body);
  }

  @Delete('experiences/:id')
  @UseGuards(JwtAuthGuard)
  deleteExperience(@Param('id') id: string) {
    return this.profileService.deleteExperience(id);
  }

  @Get('references')
  getReferences() {
    return this.profileService.getReferences();
  }

  @Post('references')
  @UseGuards(JwtAuthGuard)
  createReference(@Body() body: any) {
    return this.profileService.createReference(body);
  }

  @Patch('references/:id')
  @UseGuards(JwtAuthGuard)
  updateReference(@Param('id') id: string, @Body() body: any) {
    return this.profileService.updateReference(id, body);
  }

  @Delete('references/:id')
  @UseGuards(JwtAuthGuard)
  deleteReference(@Param('id') id: string) {
    return this.profileService.deleteReference(id);
  }
}
