import { CreateCropManagementDto } from './dto/create-crop-management.dto';
import { UpdateCropManagementDto } from './dto/update-crop-management.dto';
export declare class CropManagementService {
    create(createCropManagementDto: CreateCropManagementDto): string;
    findAll(): string;
    findOne(id: number): string;
    update(id: number, updateCropManagementDto: UpdateCropManagementDto): string;
    remove(id: number): string;
}
