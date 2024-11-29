import { PartialType } from '@nestjs/swagger';
import { CreateCropManagementDto } from './create-crop-management.dto';

export class UpdateCropManagementDto extends PartialType(CreateCropManagementDto) {}
