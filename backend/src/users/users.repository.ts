import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';

@Injectable()
export class UsersRepository {
  constructor(private prisma: PrismaService) {}

  async findByEmail(email: string) {
    const existingUser = await this.prisma.uSERS.findUnique({
      where: { email },
      select: {
        id: true,
        email: true,
        name: true,
        password: true,
      },
    });

    return existingUser;
  }

  async findById(id: number) {
    const existingUser = await this.prisma.uSERS.findUnique({
      where: { id },
      select: {
        email: true,
        name: true,
      },
    });

    return existingUser;
  }

  async createUser(email: string, password: string, name: string) {
    const user = await this.prisma.uSERS.create({
      data: {
        email,
        password: password,
        name,
      },
      select: {
        id: true,
        email: true,
        name: true,
      },
    });

    return user;
  }
}
