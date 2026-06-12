import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { IsNotEmpty, IsPositive } from 'class-validator';

export class CreateMessageDto {
  @ApiProperty({
    description: 'message text',
    example: 'hello',
    type: String,
  })
  @IsNotEmpty({
    message: 'Le message ne doit pas être vide',
  })
  message!: string;

  @ApiProperty({
    description: 'rental  id',
    example: 6,
    type: Number,
  })
  @IsNotEmpty({
    message: "L'id du propriétaire ne doit pas être vide",
  })
  @Type(() => Number)
  @IsPositive()
  rental_id!: number;
}
