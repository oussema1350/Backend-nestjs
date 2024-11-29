import { Test, TestingModule } from '@nestjs/testing';
import { AzureMlService } from './azure-ml.service';

describe('AzureMlService', () => {
  let service: AzureMlService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [AzureMlService],
    }).compile();

    service = module.get<AzureMlService>(AzureMlService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
