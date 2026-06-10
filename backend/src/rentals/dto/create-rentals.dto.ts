import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber, IsPositive, IsString } from 'class-validator';

export class CreateRentalsDto {
  @ApiProperty({
    description: 'rental owner id',
    example: 6,
  })
  @IsNotEmpty({
    message: "L'id du propriétaire ne doit pas être vide",
  })
  @IsNumber()
  @IsPositive()
  owner_id!: number;

  @ApiProperty({
    description: 'rental name',
    example: 'mobile home',
  })
  @IsString({
    message: 'Le nom de la location doit être une chaîne de caractères',
  })
  @IsNotEmpty({
    message: 'Le nom de la location ne doit pas être vide',
  })
  name!: string;

  @ApiProperty({
    description: 'rental surface in square meters',
    example: '11',
    type: Number,
  })
  @IsNumber()
  @IsPositive()
  surface!: number;

  @ApiProperty({
    description: 'rental daily price',
    example: '50',
    type: Number,
  })
  @IsNumber()
  @IsPositive()
  price!: number;

  picture!: string;

  @ApiProperty({
    description: 'rental descirption',
    example: 'my super mobile home',
  })
  @IsString({
    message: 'La description doit être une chaîne de caractères',
  })
  @IsNotEmpty({
    message: 'La description ne doit pas être vide',
  })
  description!: string;
}
