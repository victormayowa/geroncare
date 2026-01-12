import { Module } from '@nestjs/common';
import { CareRequestsController } from './care-requests/care-requests.controller';
import { CareRequestsService } from './care-requests/care-requests.service';

@Module({
  controllers: [CareRequestsController],
  providers: [CareRequestsService],
})
export class CareRequestsModule {}
