import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty, IsString, MinLength } from 'class-validator';

export class CreateUserDto {
  @ApiProperty({
    description: 'user email',
    example: 'xxx@xxx.com',
  })
  @IsNotEmpty({
    message: 'Email ne doit pas être vide',
  })
  @IsEmail(
    {
      blacklisted_chars: '!?#$%&^/\\({|}~`)',
    },
    {
      message: 'Email doit être une adresse email valide',
    },
  )
  email!: string;

  @ApiProperty({
    description: 'user password',
    example: '45fzdoel',
    minLength: 8,
    required: true,
  })
  @IsString({
    message: 'Password doit être une chaîne de caractères',
  })
  @IsNotEmpty({
    message: 'Le mot de passe ne doit pas être vide',
  })
  @MinLength(8, {
    message: 'Le mot de passe doit comporter au moins 8 caractères',
  })
  password!: string;

  @ApiProperty({
    description: 'user name',
    example: 'Jean Charles',
  })
  @IsString({
    message: 'Le nom doit être une chaîne de caractères',
  })
  @IsNotEmpty({
    message: 'Le nom ne doit pas être vide',
  })
  name!: string;
}
