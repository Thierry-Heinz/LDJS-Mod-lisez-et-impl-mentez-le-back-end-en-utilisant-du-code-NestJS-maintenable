import { Body, Controller, Post, Request, UseGuards } from '@nestjs/common';
import {
  ApiBearerAuth,
  ApiOperation,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { MessagesService } from './messages.service';
import { CreateMessageDto } from './dto/create-messages.dto';
import { JwtAuthGuard } from 'src/auth/jwt-authguard';

interface AuthenticatedRequest extends Request {
  user: {
    sub: number;
    // autres champs de ton JWT payload
  };
}

@ApiBearerAuth()
@ApiTags('messages')
@Controller('messages')
export class MessagesController {
  constructor(private readonly messagesService: MessagesService) {}

  @UseGuards(JwtAuthGuard)
  @Post()
  @ApiOperation({ summary: 'Register new messages' })
  @ApiResponse({ status: 200, description: 'Success' })
  @ApiResponse({ status: 409, description: 'Conflict' })
  async createMessage(
    @Request() req: AuthenticatedRequest,
    @Body() createMessageDto: CreateMessageDto,
  ) {
    return await this.messagesService.createMessage(
      createMessageDto,
      req.user.sub,
    );
  }
}
