import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { CacheModule } from '@nestjs/cache-manager';
import { ThrottlerModule } from '@nestjs/throttler';
import { BullModule } from '@nestjs/bull';
import { ScheduleModule } from '@nestjs/schedule';
import { EventEmitterModule } from '@nestjs/event-emitter';
import { APP_GUARD } from '@nestjs/core';
import { redisStore } from 'cache-manager-redis-store';
import { CacheCustomModule } from './src/common/cache/cache.module';
import { JwtAuthGuard } from './src/common/guards/jwt-auth/jwt-auth.guard';
import configuration from './src/config/configuration';
import { configValidationSchema } from './src/config/validation.schema';
import { AdminModule } from './src/modules/admin/admin.module';
import { AuthModule } from './src/modules/auth/auth.module';
import { BookingsModule } from './src/modules/bookings/bookings.module';
import { CareRequestsModule } from './src/modules/care-requests/care-requests.module';
import { CarersModule } from './src/modules/carers/carers.module';
import { CustomersModule } from './src/modules/customers/customers.module';
import { ElderlyProfilesModule } from './src/modules/elderly-profiles/elderly-profiles.module';
import { MatchingModule } from './src/modules/matching/matching.module';
import { MessagingModule } from './src/modules/messaging/messaging.module';
import { NotificationsModule } from './src/modules/notifications/notifications.module';
import { PaymentsModule } from './src/modules/payments/payments.module';
import { ReviewsModule } from './src/modules/reviews/reviews.module';
import { UsersModule } from './src/modules/users/users.module';
import { PrismaModule } from './src/prisma/prisma.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      load: [configuration],
      validationSchema: configValidationSchema,
    }),

    PrismaModule,

    CacheModule.registerAsync({
      isGlobal: true,
      imports: [ConfigModule],
      useFactory: (configService: ConfigService) => ({
        store: redisStore,
        host: configService.get<string>('redis.host'),
        port: configService.get<number>('redis.port'),
        ttl: configService.get<number>('cache.ttl'),
      }),
      inject: [ConfigService],
    }),

    ThrottlerModule.forRoot([
      {
        ttl: 60000,
        limit: 100,
      },
    ]),

    BullModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: (configService: ConfigService) => ({
        redis: {
          host: configService.get<string>('redis.host'),
          port: configService.get<number>('redis.port'),
        },
      }),
      inject: [ConfigService],
    }),

    ScheduleModule.forRoot(),
    EventEmitterModule.forRoot(),
    CacheCustomModule,

    AuthModule,
    UsersModule,
    CustomersModule,
    CarersModule,
    ElderlyProfilesModule,
    CareRequestsModule,
    BookingsModule,
    MatchingModule,
    PaymentsModule,
    ReviewsModule,
    MessagingModule,
    NotificationsModule,
    AdminModule,
  ],
  providers: [
    {
      provide: APP_GUARD,
      useClass: JwtAuthGuard,
    },
  ],
})
export class AppModule {}
