import { Module } from '@nestjs/common';
import { MessagesController } from './messages.controller';
import { MessagesService } from './messages.service';
import { AuthModule } from 'src/auth/auth.module';
import { JwtStrategy } from 'src/auth/jwt.strategy';
import { RentalsRepository } from 'src/rentals/rentals.repository';
import { PrismaService } from 'src/prisma.service';
import { MessagesRepository } from './messages.repository';
import { AuthService } from 'src/auth/auth.service';
import { JwtService } from '@nestjs/jwt';
import { UsersRepository } from 'src/users/users.repository';

@Module({
  imports: [AuthModule],
  controllers: [MessagesController],
  providers: [
    MessagesService,
    MessagesRepository,
    JwtStrategy,
    RentalsRepository,
    PrismaService,
    AuthService,
    JwtService,
    UsersRepository,
  ],
})
export class MessagesModule {}
