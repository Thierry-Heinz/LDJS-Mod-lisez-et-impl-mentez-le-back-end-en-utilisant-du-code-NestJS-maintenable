import { Injectable } from '@nestjs/common';
import { CreateUserDto } from 'src/users/dto/create-user.dto';
import { PrismaService } from 'src/prisma.service';

@Injectable()
export class UsersRepository {
  constructor(private prisma: PrismaService) {}

  async createUser(data: CreateUserDto) {
    const user = await this.prisma.uSERS.create({
      data,
      select: {
        id: true,
        email: true,
      },
    });

    return user;
  }

  async findByEmail(email: string) {
    const existingUser = await this.prisma.uSERS.findUnique({
      where: { email },
    });

    return existingUser;
  }

  async findById(id: number) {
    const existingUser = await this.prisma.uSERS.findUnique({
      where: { id },
      select: {
        email: true,
        name: true,
        created_at: true,
      },
    });

    return existingUser;
  }

  async getUser(id: number) {
    const user = await this.prisma.uSERS.findUnique({
      where: { id },
      select: {
        id: true,
        name: true,
        email: true,
        created_at: true,
        updated_at: true,
      },
    });
    return user;
  }
}
