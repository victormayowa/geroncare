import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';

@Injectable()
export class CarersService {
  constructor(private prisma: PrismaService) {}

  async findAll() {
    return this.prisma.carer.findMany({
      where: { verificationStatus: 'VERIFIED', acceptingBookings: true },
      include: { user: true, certifications: true },
    });
  }

  async findOne(id: string) {
    return this.prisma.carer.findUnique({
      where: { id },
      include: {
        user: true,
        certifications: true,
        reviews: { where: { isPublic: true } },
      },
    });
  }
}
