import {
  ConflictException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { CreateUserDto } from 'src/users/dto/create-user.dto';
import { LoginDto } from 'src/auth/dto/login.dto';
import { UsersRepository } from 'src/users/users.repository';

@Injectable()
export class AuthService {
  constructor(
    private jwt: JwtService,
    private usersRepository: UsersRepository,
  ) {}

  async register(createUserDto: CreateUserDto) {
    const { email, password, name } = createUserDto;

    const existingUser = await this.usersRepository.findByEmail(email);
    if (existingUser) {
      throw new ConflictException('Un utilisateur avec cet email existe déjà');
    }
    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await this.usersRepository.createUser({
      email,
      password: hashedPassword,
      name,
    });

    const payload = { sub: user.id, email: user.email };
    const token = await this.jwt.signAsync(payload);

    return token;
  }

  async login(loginDto: LoginDto) {
    const { email, password } = loginDto;
    const user = await this.usersRepository.findByEmail(email);
    if (!user) {
      throw new UnauthorizedException(
        "Un utilisateur avec cet email n'existe pas",
      );
    }
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      throw new UnauthorizedException('Mot de passe incorrect');
    }
    const payload = { sub: user.id, email: user.email };
    const token = await this.jwt.signAsync(payload);

    return token;
  }

  async validateUser(userId: number) {
    return await this.usersRepository.findById(userId);
  }
}
