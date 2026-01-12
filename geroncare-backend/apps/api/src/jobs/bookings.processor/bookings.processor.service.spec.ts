import { Test, TestingModule } from '@nestjs/testing';
import { BookingsProcessorService } from './bookings.processor.service';

describe('BookingsProcessorService', () => {
  let service: BookingsProcessorService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [BookingsProcessorService],
    }).compile();

    service = module.get<BookingsProcessorService>(BookingsProcessorService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
