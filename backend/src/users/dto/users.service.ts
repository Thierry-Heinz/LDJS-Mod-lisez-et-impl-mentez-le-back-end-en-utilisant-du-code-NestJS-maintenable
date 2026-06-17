import { Injectable, NotFoundException } from '@nestjs/common';
import { UsersRepository } from '../users.repository';

@Injectable()
export class UsersService {
  constructor(private readonly usersRepository: UsersRepository) {}

  async getUser(id: number) {
    const user = await this.usersRepository.getUser(id);
    if (!user) {
      throw new NotFoundException({
        objectError: "Aucune location avec cette id n'existe",
      });
    }

    return user;
  }
}
