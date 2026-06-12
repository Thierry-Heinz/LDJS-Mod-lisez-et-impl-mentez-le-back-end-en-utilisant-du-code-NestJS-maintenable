import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { RentalsRepository } from './rentals.repository';
import { CreateRentalsDto } from './dto/create-rentals.dto';
import { UpdateRentalsDto } from './dto/update-rentals.dto';
import { StorageServiceService } from 'src/storage-service/storage-service.service';
import adaptRentalObject from 'src/utils/rental.utils';

@Injectable()
export class RentalsService {
  constructor(
    private readonly rentalsRepository: RentalsRepository,
    private readonly storageService: StorageServiceService,
  ) {}

  async getAllRentals() {
    const rentals = await this.rentalsRepository.findAll();
    return { rentals };
  }

  async getRental(id: number) {
    const rental = await this.rentalsRepository.findById(id);
    if (!rental) {
      throw new NotFoundException({
        objectError: "Aucune location avec cette id n'existe",
      });
    }

    return adaptRentalObject(rental);
  }

  async createRental(data: CreateRentalsDto, picture: Express.Multer.File) {
    const pictureObject = this.storageService.generatePictureObject(picture);
    let newRental;
    try {
      await this.storageService.savePictureOnDisk(picture, pictureObject.path);
      newRental = await this.rentalsRepository.createRental(
        data,
        pictureObject.URL,
      );
    } catch (error) {
      await this.storageService.deletePictureOnDisk(pictureObject.path);
      throw new BadRequestException({
        objectError: `Location pas crée ${error}`,
      });
    }
    return adaptRentalObject(newRental);
  }

  async updateRental(
    data: UpdateRentalsDto,
    id: number,
    picture?: Express.Multer.File,
  ) {
    const rental = await this.rentalsRepository.findById(id);
    let pictureObject: { URL: string; path: string };
    let updatedRental;

    if (!rental) {
      throw new NotFoundException({
        objectError: "Aucune location avec cette id n'existe",
      });
    }
    if (!picture) {
      updatedRental = await this.rentalsRepository.updateRental(data, id);
    } else {
      pictureObject = this.storageService.generatePictureObject(picture);
      try {
        await this.storageService.savePictureOnDisk(
          picture,
          pictureObject.path,
        );
        updatedRental = await this.rentalsRepository.updateRental(
          data,
          id,
          pictureObject.URL,
        );
      } catch (error) {
        await this.storageService.deletePictureOnDisk(pictureObject.path);
        throw new BadRequestException({
          objectError: `Location pas mise à jour ${error}`,
        });
      }
    }

    return adaptRentalObject(updatedRental);
  }
}
