import { Injectable, OnModuleInit, OnModuleDestroy } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';
import { PrismaPg } from '@prisma/adapter-pg';

@Injectable()
export class PrismaService
  extends PrismaClient
  implements OnModuleInit, OnModuleDestroy
{
  constructor() {
    const connectionString = process.env.DATABASE_URL;
    if (!connectionString) {
      throw new Error('DATABASE_URL environment variable is not set');
    }

    const adapter = new PrismaPg({
      connectionString,
    });

    super({
      adapter,
      log:
        process.env.NODE_ENV === 'development'
          ? ['query', 'error', 'warn']
          : ['error'],
    });
  }
  async onModuleInit() {
    await this.$connect();
    console.log('Database connected successfully!');
  }

  async onModuleDestroy() {
    await this.$disconnect();
    console.log('Database disconnected!');
  }

  async executeTransaction<T>(
    fn: (prisma: PrismaClient) => Promise<T>,
  ): Promise<T> {
    return this.$transaction(fn);
  }

  async cleanDatabase() {
    if (process.env.NODE_ENV === 'production') {
      throw new Error('Cannot clean database in production');
    }

    // Define a type for the model operations to avoid unsafe operations
    type ModelWithDeleteMany = {
      deleteMany: (args?: any) => Promise<any>;
    };

    // Get all model keys from the Prisma client
    const modelKeys = Object.keys(this).filter(
      (key) =>
        typeof key === 'string' &&
        !key.startsWith('_') &&
        ![
          '$connect',
          '$disconnect',
          '$transaction',
          '$executeRaw',
          '$queryRaw',
        ].includes(key),
    );

    // Process each model safely
    for (const modelKey of modelKeys) {
      const model = this[modelKey as keyof this] as unknown as
        | ModelWithDeleteMany
        | undefined;
      if (model && typeof model.deleteMany === 'function') {
        try {
          await model.deleteMany({});
        } catch (error) {
          // Silently continue if a model doesn't support deleteMany or throws an error
          console.warn(`Could not clean model ${modelKey}:`, error);
        }
      }
    }
  }
}
