import { Module } from '@nestjs/common';
import { CronService } from './cron/cron.service';
import { BookingsProcessorService } from './bookings.processor/bookings.processor.service';
import { NotificationsProcessorService } from './notifications.processor/notifications.processor.service';

@Module({
  providers: [
    CronService,
    BookingsProcessorService,
    NotificationsProcessorService,
  ],
})
export class JobsModule {}
