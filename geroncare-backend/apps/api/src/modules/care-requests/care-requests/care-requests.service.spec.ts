import { Test, TestingModule } from '@nestjs/testing';
import { CareRequestsService } from './care-requests.service';

describe('CareRequestsService', () => {
  let service: CareRequestsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [CareRequestsService],
    }).compile();

    service = module.get<CareRequestsService>(CareRequestsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
