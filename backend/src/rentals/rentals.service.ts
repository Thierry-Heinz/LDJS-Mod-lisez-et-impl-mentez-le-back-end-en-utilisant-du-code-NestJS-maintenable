import { Injectable } from '@nestjs/common';
import { RentalsRepository } from './rentals.repository';

@Injectable()
export class RentalsService {
  constructor(private rentalsRepository: RentalsRepository) {}

  async getAllRentals() {
    return this.rentalsRepository.findAll();
  }
}
