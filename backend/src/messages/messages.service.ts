import { Injectable } from '@nestjs/common';
import { MessagesRepository } from './messages.repository';
import { CreateMessageDto } from './dto/create-messages.dto';
import { SuccessMessages } from 'src/common/messages/success-messages';
import { AppErrors } from 'src/common/errors/app-errors';
import { AppException } from 'src/common/exception/app.exception';

@Injectable()
export class MessagesService {
  constructor(private readonly messagesRepository: MessagesRepository) {}

  async createMessage(data: CreateMessageDto, userId: number) {
    try {
      await this.messagesRepository.createMessage(data, userId);
    } catch {
      throw new AppException(AppErrors.MESSAGE_NOT_CREATED);
    }
    return { message: SuccessMessages.MESSAGE_SENT };
  }
}
