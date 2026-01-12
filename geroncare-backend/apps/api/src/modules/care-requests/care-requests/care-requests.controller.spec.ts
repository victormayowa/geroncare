import { Test, TestingModule } from '@nestjs/testing';
import { CareRequestsController } from './care-requests.controller';

describe('CareRequestsController', () => {
  let controller: CareRequestsController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [CareRequestsController],
    }).compile();

    controller = module.get<CareRequestsController>(CareRequestsController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
