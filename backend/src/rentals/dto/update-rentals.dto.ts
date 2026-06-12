import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { IsNotEmpty, IsOptional, IsPositive, IsString } from 'class-validator';

export class UpdateRentalsDto {
  @ApiProperty({
    description: 'rental owner id',
    example: 6,
  })
  @IsNotEmpty({
    message: "L'id du propriétaire ne doit pas être vide",
  })
  @Type(() => Number)
  @IsPositive()
  @IsOptional()
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
  @IsOptional()
  name!: string;

  @ApiProperty({
    description: 'rental surface in square meters',
    example: '11',
    type: Number,
  })
  @Type(() => Number)
  @IsPositive()
  @IsOptional()
  surface!: number;

  @ApiProperty({
    description: 'rental daily price',
    example: '50',
    type: Number,
  })
  @Type(() => Number)
  @IsPositive()
  @IsOptional()
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
  @IsOptional()
  description!: string;
}
