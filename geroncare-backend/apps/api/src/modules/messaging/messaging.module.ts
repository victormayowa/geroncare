import { Module } from '@nestjs/common';
import { MessagingController } from './messaging/messaging.controller';
import { MessagingService } from './messaging/messaging.service';

@Module({
  controllers: [MessagingController],
  providers: [MessagingService],
})
export class MessagingModule {}
