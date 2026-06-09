import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';

@Injectable()
export class UsersService {
  constructor(private prisma: PrismaService) {}

  getUserByEmail(email: string) {
    return this.prisma.uSERS.findUnique({ where: { email } });
  }
}
