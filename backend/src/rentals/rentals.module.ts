import { Module } from '@nestjs/common';
import { RentalsService } from './rentals.service';
import { RentalsController } from './rentals.controller';
import { UsersModule } from 'src/users/users.module';
import { JwtStrategy } from 'src/auth/jwt.strategy';
import { RentalsRepository } from './rentals.repository';
import { PrismaService } from 'src/prisma.service';
import { AuthModule } from 'src/auth/auth.module';
import { StorageServiceModule } from 'src/storage-service/storage-service.module';
import { StorageServiceService } from 'src/storage-service/storage-service.service';

@Module({
  imports: [UsersModule, AuthModule, StorageServiceModule],
  providers: [
    RentalsService,
    JwtStrategy,
    RentalsRepository,
    PrismaService,
    StorageServiceService,
  ],
  controllers: [RentalsController],
})
export class RentalsModule {}
