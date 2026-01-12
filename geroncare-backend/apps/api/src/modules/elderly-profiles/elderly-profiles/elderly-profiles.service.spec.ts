import { Test, TestingModule } from '@nestjs/testing';
import { ElderlyProfilesService } from './elderly-profiles.service';

describe('ElderlyProfilesService', () => {
  let service: ElderlyProfilesService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ElderlyProfilesService],
    }).compile();

    service = module.get<ElderlyProfilesService>(ElderlyProfilesService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
