import { ResourceOwnershipGuard } from './resource-ownership.guard';
import { Reflector } from '@nestjs/core';
import { PrismaService } from '../../../prisma/prisma.service';

describe('ResourceOwnershipGuard', () => {
  it('should be defined', () => {
    const prismaService = new PrismaService();
    const reflector = new Reflector();
    expect(new ResourceOwnershipGuard(prismaService, reflector)).toBeDefined();
  });
});
