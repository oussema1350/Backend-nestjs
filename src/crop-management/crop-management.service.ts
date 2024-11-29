import { Injectable } from '@nestjs/common';
import { CreateCropManagementDto } from './dto/create-crop-management.dto';
import { UpdateCropManagementDto } from './dto/update-crop-management.dto';

@Injectable()
export class CropManagementService {
  create(createCropManagementDto: CreateCropManagementDto) {
    return 'This action adds a new cropManagement';
  }

  findAll() {
    return `This action returns all cropManagement`;
  }

  findOne(id: number) {
    return `This action returns a #${id} cropManagement`;
  }

  update(id: number, updateCropManagementDto: UpdateCropManagementDto) {
    return `This action updates a #${id} cropManagement`;
  }

  remove(id: number) {
    return `This action removes a #${id} cropManagement`;
  }
}
