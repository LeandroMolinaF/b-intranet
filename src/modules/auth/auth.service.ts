/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateAuthDto } from './dto/create-auth.dto';
import { LoginAuthDto } from './dto/login-auth.dto';
import { PrismaService } from 'src/database/prisma.service';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(
    private prismaService: PrismaService,
    private jwtService: JwtService,
  ) {}

  async register(createAuthDto: CreateAuthDto) {
    try {
      const saltOrRounds = 10;
      const hash = await bcrypt.hash(createAuthDto.password, saltOrRounds);

      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const { password: _, ...userWithOutPass } = createAuthDto;
      const newUser = await this.prismaService.user.create({
        data: { createdAt: new Date(), password: hash, ...userWithOutPass },
      });
      return newUser;
    } catch (error) {
      console.log(error);
      throw error;
    }
  }

  async login(user: LoginAuthDto) {
    try {
      const existUser = await this.prismaService.user.findUnique({
        where: { rut: user.rut },
      });
      if (!existUser) {
        throw new BadRequestException('Usuario o contraseña invalidos');
      }

      const isMatch = await bcrypt.compare(user.password, existUser.password);

      if (!isMatch) {
        throw new BadRequestException('Usuario o contraseña invalidos');
      }

      const { password: _, ...userWithOutPassword } = existUser;
      const payload = {
        ...userWithOutPassword,
      };
      const access_token = await this.jwtService.signAsync(payload);
      console.log(access_token);
      return {
        token: access_token,
        user: {
          id: userWithOutPassword.id,
          email: userWithOutPassword.email,
          role: userWithOutPassword.role,
        },
      };
    } catch (error) {
      console.log(error);
      throw error;
    }
  }
}
