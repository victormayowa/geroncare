import { Module } from '@nestjs/common';
import { ElderlyProfilesController } from './elderly-profiles/elderly-profiles.controller';
import { ElderlyProfilesService } from './elderly-profiles/elderly-profiles.service';

@Module({
  controllers: [ElderlyProfilesController],
  providers: [ElderlyProfilesService],
})
export class ElderlyProfilesModule {}
