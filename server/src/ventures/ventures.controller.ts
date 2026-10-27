import { Controller, Get, Post, Patch, Delete, Body, Param, UseGuards } from '@nestjs/common';
import { VenturesService } from './ventures.service';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';

@Controller('ventures')
export class VenturesController {
  constructor(private readonly venturesService: VenturesService) {}

  @Get()
  findAll() {
    return this.venturesService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.venturesService.findOne(id);
  }

  @Post()
  @UseGuards(JwtAuthGuard)
  create(@Body() body: any) {
    return this.venturesService.create(body);
  }

  @Patch(':id')
  @UseGuards(JwtAuthGuard)
  update(@Param('id') id: string, @Body() body: any) {
    return this.venturesService.update(id, body);
  }

  @Delete(':id')
  @UseGuards(JwtAuthGuard)
  remove(@Param('id') id: string) {
    return this.venturesService.remove(id);
  }
}
