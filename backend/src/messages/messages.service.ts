import { BadRequestException, Injectable } from '@nestjs/common';
import { MessagesRepository } from './messages.repository';
import { CreateMessageDto } from './dto/create-messages.dto';

@Injectable()
export class MessagesService {
  constructor(private readonly messagesRepository: MessagesRepository) {}

  async createMessage(data: CreateMessageDto, userId: number) {
    let newMessage;
    try {
      newMessage = await this.messagesRepository.createMessage(data, userId);
    } catch (error) {
      throw new BadRequestException({
        objectError: `Message pas crée ${error}`,
      });
    }
    return newMessage;
  }
}
