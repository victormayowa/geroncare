import { Module } from '@nestjs/common';
import { MatchingController } from './matching/matching.controller';
import { MatchingService } from './matching/matching.service';

@Module({
  controllers: [MatchingController],
  providers: [MatchingService],
})
export class MatchingModule {}
