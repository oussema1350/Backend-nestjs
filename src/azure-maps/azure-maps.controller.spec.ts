import { Test, TestingModule } from '@nestjs/testing';
import { AzureMapsController } from './azure-maps.controller';
import { AzureMapsService } from './azure-maps.service';

describe('AzureMapsController', () => {
  let controller: AzureMapsController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [AzureMapsController],
      providers: [AzureMapsService],
    }).compile();

    controller = module.get<AzureMapsController>(AzureMapsController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
