import { Test, TestingModule } from '@nestjs/testing';
import { NotificationsProcessorService } from './notifications.processor.service';

describe('NotificationsProcessorService', () => {
  let service: NotificationsProcessorService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [NotificationsProcessorService],
    }).compile();

    service = module.get<NotificationsProcessorService>(
      NotificationsProcessorService,
    );
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
