import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';
import { CreateMessageDto } from './dto/create-messages.dto';

@Injectable()
export class MessagesRepository {
  constructor(private prisma: PrismaService) {}

  async createMessage(data: CreateMessageDto, userId: number) {
    const dataPrisma = { ...data, user_id: userId };
    const message = await this.prisma.mESSAGES.create({
      data: dataPrisma,
    });
    return message;
  }
}
