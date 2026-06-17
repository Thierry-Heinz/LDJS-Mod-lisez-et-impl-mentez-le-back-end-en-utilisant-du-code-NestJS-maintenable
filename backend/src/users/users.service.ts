import { Injectable } from '@nestjs/common';
import { UsersRepository } from './users.repository';
import { AppException } from 'src/common/exception/app.exception';
import { AppErrors } from 'src/common/errors/app-errors';

@Injectable()
export class UsersService {
  constructor(private readonly usersRepository: UsersRepository) {}

  async getUser(id: number) {
    const user = await this.usersRepository.getUser(id);
    if (!user) {
      throw new AppException(AppErrors.USER_NOT_FOUND);
    }

    return user;
  }
}
