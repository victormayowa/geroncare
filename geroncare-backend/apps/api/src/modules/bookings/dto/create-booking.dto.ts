import {
  IsString,
  IsDateString,
  IsNumber,
  IsEnum,
  IsOptional,
  IsArray,
} from 'class-validator';
import { CareType, CareLevel } from '@prisma/client';

export class CreateBookingDto {
  @IsString()
  carerId: string;

  @IsString()
  elderlyProfileId: string;

  @IsOptional()
  @IsString()
  careRequestId?: string;

  @IsArray()
  @IsEnum(CareType, { each: true })
  careTypes: CareType[];

  @IsEnum(CareLevel)
  careLevel: CareLevel;

  @IsDateString()
  startDateTime: string;

  @IsDateString()
  endDateTime: string;

  @IsNumber()
  durationHours: number;

  @IsString()
  location: string;

  @IsOptional()
  @IsNumber()
  latitude?: number;

  @IsOptional()
  @IsNumber()
  longitude?: number;

  @IsNumber()
  hourlyRate: number;

  @IsNumber()
  totalAmount: number;

  @IsNumber()
  platformFee: number;

  @IsNumber()
  carerEarnings: number;

  @IsOptional()
  @IsString()
  specialInstructions?: string;
}
