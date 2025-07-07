/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { PrismaService } from 'src/database/prisma.service';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UserService {
  constructor(private prismaService: PrismaService) {}

  async create(createUserDto: CreateUserDto) {
    try {
      const saltOrRounds = 10;
      const hash = await bcrypt.hash(createUserDto.password, saltOrRounds);
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const { password: _, ...userWithOutPass } = createUserDto;
      const newUser = await this.prismaService.user.create({
        data: { createdAt: new Date(), password: hash, ...userWithOutPass },
      });
      return newUser;
    } catch (error) {
      console.log(error);
    }
  }

  async findAll() {
    try {
      const users = await this.prismaService.user.findMany();
      return users;
    } catch (error) {
      console.log(error);
      throw error;
    }
  }

  async findOne(id: string) {
    try {
      const user = await this.prismaService.user.findUnique({ where: { id } });
      return user;
    } catch (error) {
      console.error(error);
      throw error;
    }
  }

  async update(id: string, updateUserDto: UpdateUserDto) {
    try {
      const updatedUser = await this.prismaService.user.update({
        where: { id },
        data: { updatedAt: new Date(), ...updateUserDto },
      });
      return updatedUser;
    } catch (error) {
      console.log(error);
    }
  }

  remove(id: number) {
    return `This action removes a #${id} user`;
  }
}
