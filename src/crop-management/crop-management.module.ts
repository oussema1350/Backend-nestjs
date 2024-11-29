import { Module } from '@nestjs/common';
import { CropManagementService } from './crop-management.service';
import { CropManagementController } from './crop-management.controller';

@Module({
  controllers: [CropManagementController],
  providers: [CropManagementService]
})
export class CropManagementModule {}
