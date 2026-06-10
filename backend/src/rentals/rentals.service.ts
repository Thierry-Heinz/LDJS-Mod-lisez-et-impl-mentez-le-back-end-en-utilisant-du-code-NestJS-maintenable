import { Injectable, NotFoundException } from '@nestjs/common';
import { RentalsRepository } from './rentals.repository';
import { CreateRentalsDto } from './dto/create-rentals.dto';
import { UpdateRentalsDto } from './dto/update-rentals.dto';

@Injectable()
export class RentalsService {
  constructor(private readonly rentalsRepository: RentalsRepository) {}

  async getAllRentals() {
    return this.rentalsRepository.findAll();
  }

  async getRental(id: number) {
    return await this.rentalsRepository.findById(id);
  }

  async createRental(data: CreateRentalsDto) {
    return await this.rentalsRepository.createRental(data);
  }

  async updateRental(
    data: UpdateRentalsDto,
    picture: Buffer<ArrayBufferLike>,
    id: number,
  ) {
    const rental = await this.rentalsRepository.findById(id);

    if (!rental) {
      throw new NotFoundException({
        objectError: "Aucune location avec cette id n'existe",
      });
    }

    const pictureBase64 = picture.toString('base64');

    return await this.rentalsRepository.updateRental(data, pictureBase64, id);
  }
}
