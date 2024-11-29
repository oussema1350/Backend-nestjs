import { Test, TestingModule } from '@nestjs/testing';
import { CropManagementController } from './crop-management.controller';
import { CropManagementService } from './crop-management.service';

describe('CropManagementController', () => {
  let controller: CropManagementController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [CropManagementController],
      providers: [CropManagementService],
    }).compile();

    controller = module.get<CropManagementController>(CropManagementController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
