import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';
import { Prisma } from '@prisma/client';
import { CreateBookingDto } from './dto/create-booking.dto';

@Injectable()
export class BookingsService {
  constructor(private prisma: PrismaService) {}

  async create(data: CreateBookingDto, userId: string) {
    const bookingData: Prisma.BookingUncheckedCreateInput = {
      ...data,
      customerId: userId,
    };

    return this.prisma.booking.create({
      data: bookingData,
    });
  }

  async findAll(userId: string) {
    return this.prisma.booking.findMany({
      where: {
        OR: [{ customerId: userId }, { carerId: userId }],
      },
      include: {
        customer: { include: { user: true } },
        carer: { include: { user: true } },
        elderlyProfile: true,
      },
      orderBy: { createdAt: 'desc' },
    });
  }

  async findOne(id: string) {
    return this.prisma.booking.findUnique({
      where: { id },
      include: {
        customer: { include: { user: true } },
        carer: { include: { user: true } },
        elderlyProfile: true,
        payment: true,
      },
    });
  }
}
