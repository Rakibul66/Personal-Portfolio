import { Controller, Get } from '@nestjs/common';
import { SkillsService } from './skills.service';

@Controller('meta')
export class SkillsController {
  constructor(private readonly skillsService: SkillsService) {}

  @Get('skills')
  getSkills() {
    return this.skillsService.getSkills();
  }

  @Get('experience')
  getExperience() {
    return this.skillsService.getExperience();
  }
}
