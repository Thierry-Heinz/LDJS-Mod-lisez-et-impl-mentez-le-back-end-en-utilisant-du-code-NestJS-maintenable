import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';

@Injectable()
export class RentalsRepository {
  constructor(private prisma: PrismaService) {}

  async findAll() {
    return await this.prisma.rENTALS.findMany();
  }
}
