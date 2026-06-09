import { Module } from '@nestjs/common';
import { UsersController } from './users.controller';
import { PrismaService } from 'src/prisma.service';
import { UsersRepository } from './users.repository';

@Module({
  controllers: [UsersController],
  providers: [PrismaService, UsersRepository],
  exports: [UsersRepository],
})
export class UsersModule {}
