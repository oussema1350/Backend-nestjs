import { CropManagementService } from './crop-management.service';
import { CreateCropManagementDto } from './dto/create-crop-management.dto';
import { UpdateCropManagementDto } from './dto/update-crop-management.dto';
export declare class CropManagementController {
    private readonly cropManagementService;
    constructor(cropManagementService: CropManagementService);
    create(createCropManagementDto: CreateCropManagementDto): string;
    findAll(): string;
    findOne(id: string): string;
    update(id: string, updateCropManagementDto: UpdateCropManagementDto): string;
    remove(id: string): string;
}
