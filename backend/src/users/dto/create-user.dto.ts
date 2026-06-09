import { IsEmail, IsNotEmpty, IsString, MinLength } from 'class-validator';

export class CreateUserDto {
  @IsString({
    message: 'Email doit être une chaîne de caractères',
  })
  @IsNotEmpty({
    message: 'Email ne doit pas être vide',
  })
  @IsEmail(
    {
      blacklisted_chars: '!?#$%&^({|}~`)\\',
    },
    {
      message: 'Email doit être une adresse email valide',
    },
  )
  email!: string;

  @IsString({
    message: 'Password doit être une chaîne de caractères',
  })
  @IsNotEmpty({
    message: 'Email ne doit pas être vide',
  })
  @MinLength(8, {
    message: 'Le mot de passe doit comporter au moins 8 caractères',
  })
  password!: string;

  @IsString({
    message: 'Le prénom doit être une chaîne de caractères',
  })
  @IsNotEmpty({
    message: 'Email ne doit pas être vide',
  })
  firstName!: string;

  @IsString({
    message: 'Le nom de famille doit être une chaîne de caractères',
  })
  @IsNotEmpty({
    message: 'Email ne doit pas être vide',
  })
  lastName!: string;
}
