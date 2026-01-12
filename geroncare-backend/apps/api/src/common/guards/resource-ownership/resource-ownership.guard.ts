import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { PrismaService } from '@app/prisma/prisma.service';

@Injectable()
export class ResourceOwnershipGuard implements CanActivate {
  constructor(
    private readonly prisma: PrismaService,
    private reflector: Reflector,
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context
      .switchToHttp()
      .getRequest<{ user: { sub: string }; params: { id: string } }>();
    const user = request.user;
    const resourceId = request.params.id;
    const resourceType = this.reflector.get<string>(
      'resourceType',
      context.getHandler(),
    );

    return this.checkOwnership(user.sub, resourceId, resourceType);
  }

  private async checkOwnership(
    userId: string,
    resourceId: string,
    resourceType: string,
  ): Promise<boolean> {
    switch (resourceType) {
      case 'booking': {
        const booking = await this.prisma.booking.findUnique({
          where: { id: resourceId },
        });
        return booking?.customerId === userId || booking?.carerId === userId;
      }

      case 'elderly_profile': {
        const profile = await this.prisma.elderlyProfile.findUnique({
          where: { id: resourceId },
          include: { customer: true },
        });
        return profile?.customer.userId === userId;
      }

      default:
        return false;
    }
  }
}
