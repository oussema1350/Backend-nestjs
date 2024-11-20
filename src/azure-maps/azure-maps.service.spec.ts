import { Test, TestingModule } from '@nestjs/testing';
import { AzureMapsService } from './azure-maps.service';

describe('AzureMapsService', () => {
  let service: AzureMapsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [AzureMapsService],
    }).compile();

    service = module.get<AzureMapsService>(AzureMapsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
