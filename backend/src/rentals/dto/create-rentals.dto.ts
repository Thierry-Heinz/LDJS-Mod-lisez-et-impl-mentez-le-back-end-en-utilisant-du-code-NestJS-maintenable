import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { IsNotEmpty, IsPositive, IsString } from 'class-validator';

export class CreateRentalsDto {
  @ApiProperty({
    description: 'rental owner id',
    example: 6,
    type: Number,
  })
  @IsNotEmpty({
    message: "L'id du propriétaire ne doit pas être vide",
  })
  @Type(() => Number)
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
  @Type(() => Number)
  @IsPositive()
  surface!: number;

  @ApiProperty({
    description: 'rental picture',
    type: File,
  })
  picture!: File;

  @ApiProperty({
    description: 'rental monthly price',
    example: '50',
    type: Number,
  })
  @Type(() => Number)
  @IsPositive()
  price!: number;

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
