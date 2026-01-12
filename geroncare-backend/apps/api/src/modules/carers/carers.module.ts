import { Module } from '@nestjs/common';
import { CarersController } from './carers.controller';
import { CarersService } from './carers.service';
import { CertificationsService } from './certifications/certifications.service';

@Module({
  controllers: [CarersController],
  providers: [CarersService, CertificationsService],
  exports: [CarersService, CertificationsService],
})
export class CarersModule {}
