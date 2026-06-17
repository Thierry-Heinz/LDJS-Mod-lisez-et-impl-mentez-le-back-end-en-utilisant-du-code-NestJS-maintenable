import { Injectable } from '@nestjs/common';
import { RentalsRepository } from './rentals.repository';
import { CreateRentalsDto } from './dto/create-rentals.dto';
import { UpdateRentalsDto } from './dto/update-rentals.dto';
import { StorageServiceService } from 'src/storage-service/storage-service.service';
import adaptRentalObject from 'src/utils/rental.utils';
import { SuccessMessages } from 'src/common/messages/success-messages';
import { AppException } from 'src/common/exception/app.exception';
import { AppErrors } from 'src/common/errors/app-errors';

@Injectable()
export class RentalsService {
  constructor(
    private readonly rentalsRepository: RentalsRepository,
    private readonly storageService: StorageServiceService,
  ) {}

  async createRental(data: CreateRentalsDto, picture: Express.Multer.File) {
    const pictureObject = this.storageService.generatePictureObject(picture);
    try {
      await this.storageService.savePictureOnDisk(picture, pictureObject.path);
      await this.rentalsRepository.createRental(data, pictureObject.URL);
    } catch {
      await this.storageService.deletePictureOnDisk(pictureObject.path);

      throw new AppException(AppErrors.RENTAL_NOT_CREATED);
    }
    return { message: SuccessMessages.RENTAL_CREATED };
  }

  async getAllRentals() {
    const rentals = await this.rentalsRepository.findAll();
    return { rentals };
  }

  async getRental(id: number) {
    const rental = await this.rentalsRepository.findById(id);
    if (!rental) {
      throw new AppException(AppErrors.RENTAL_NOT_FOUND);
    }

    return adaptRentalObject(rental);
  }

  async updateRental(
    data: UpdateRentalsDto,
    id: number,
    picture?: Express.Multer.File,
  ) {
    const rental = await this.rentalsRepository.findById(id);
    let pictureObject: { URL: string; path: string };

    if (!rental) {
      throw new AppException(AppErrors.RENTAL_NOT_FOUND);
    }
    if (!picture) {
      await this.rentalsRepository.updateRental(data, id);
    } else {
      pictureObject = this.storageService.generatePictureObject(picture);
      try {
        await this.storageService.savePictureOnDisk(
          picture,
          pictureObject.path,
        );
        await this.rentalsRepository.updateRental(data, id, pictureObject.URL);
      } catch {
        await this.storageService.deletePictureOnDisk(pictureObject.path);
        throw new AppException(AppErrors.RENTAL_NOT_UPDATED);
      }
    }

    return { message: SuccessMessages.RENTAL_UPDATED };
  }
}
