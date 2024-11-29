import { Test, TestingModule } from '@nestjs/testing';
import { AzureMlController } from './azure-ml.controller';
import { AzureMlService } from './azure-ml.service';

describe('AzureMlController', () => {
  let controller: AzureMlController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [AzureMlController],
      providers: [AzureMlService],
    }).compile();

    controller = module.get<AzureMlController>(AzureMlController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
