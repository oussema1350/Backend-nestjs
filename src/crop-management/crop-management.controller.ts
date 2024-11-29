import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { CropManagementService } from './crop-management.service';
import { CreateCropManagementDto } from './dto/create-crop-management.dto';
import { UpdateCropManagementDto } from './dto/update-crop-management.dto';

@Controller('crop-management')
export class CropManagementController {
  constructor(private readonly cropManagementService: CropManagementService) {}

  @Post()
  create(@Body() createCropManagementDto: CreateCropManagementDto) {
    return this.cropManagementService.create(createCropManagementDto);
  }

  @Get()
  findAll() {
    return this.cropManagementService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.cropManagementService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateCropManagementDto: UpdateCropManagementDto) {
    return this.cropManagementService.update(+id, updateCropManagementDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.cropManagementService.remove(+id);
  }
}
