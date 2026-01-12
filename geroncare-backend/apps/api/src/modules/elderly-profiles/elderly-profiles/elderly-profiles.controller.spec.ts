import { Test, TestingModule } from '@nestjs/testing';
import { ElderlyProfilesController } from './elderly-profiles.controller';

describe('ElderlyProfilesController', () => {
  let controller: ElderlyProfilesController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ElderlyProfilesController],
    }).compile();

    controller = module.get<ElderlyProfilesController>(
      ElderlyProfilesController,
    );
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
