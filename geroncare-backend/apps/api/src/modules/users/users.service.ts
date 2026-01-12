import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '@app/prisma/prisma.service';
import { Prisma } from '@prisma/client';

@Injectable()
export class UsersService {
  constructor(private prisma: PrismaService) {}

  async findById(id: string) {
    const user = await this.prisma.user.findUnique({
      where: { id },
      include: {
        customer: true,
        carer: true,
      },
    });

    if (!user) {
      throw new NotFoundException('User not found');
    }

    const { passwordHash: _, ...result } = user; // eslint-disable-line @typescript-eslint/no-unused-vars
    // Intentionally exclude passwordHash from the result
    return result;
  }

  async updateProfile(userId: string, data: Prisma.UserUncheckedUpdateInput) {
    const updateData: Prisma.UserUncheckedUpdateInput = {
      ...data,
      updatedAt: new Date(),
    };

    return this.prisma.user.update({
      where: { id: userId },
      data: updateData,
    });
  }
}
