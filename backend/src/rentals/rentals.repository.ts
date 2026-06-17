import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';
import { CreateRentalsDto } from './dto/create-rentals.dto';
import { UpdateRentalsDto } from './dto/update-rentals.dto';

// rentals.repository.ts
export type RentalWithOwner = Awaited<
  ReturnType<RentalsRepository['findById']>
>;

@Injectable()
export class RentalsRepository {
  constructor(private prisma: PrismaService) {}

  async findAll() {
    return await this.prisma.rENTALS.findMany();
  }

  async findById(id: number) {
    return await this.prisma.rENTALS.findFirst({
      where: { id },
      select: {
        id: true,
        name: true,
        price: true,
        picture: true,
        description: true,
        owner_id: true,
        created_at: true,
        updated_at: true,
        USERS: {
          select: {
            id: true,
            name: true,
          },
        },
      },
    });
  }

  async createRental(data: CreateRentalsDto, pictureURL: string) {
    const dataPrisma = { ...data, picture: pictureURL };
    const rental = await this.prisma.rENTALS.create({
      data: dataPrisma,
    });

    return rental;
  }

  async updateRental(data: UpdateRentalsDto, id: number, pictureURL?: string) {
    const dataPrisma = {
      ...data,
      ...(pictureURL && { picture: pictureURL }),
    };
    const rental = await this.prisma.rENTALS.update({
      where: { id },
      data: dataPrisma,
    });

    return rental;
  }
}
