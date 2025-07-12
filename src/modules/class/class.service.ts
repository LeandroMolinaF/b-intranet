import { Injectable } from '@nestjs/common';
import { CreateClassDto } from './dto/create-class.dto';
import { PrismaService } from 'src/database/prisma.service';

@Injectable()
export class ClassService {
  constructor(private prismaService: PrismaService) {}

  async create(createClassDto: CreateClassDto) {
    try {
      const newClass = await this.prismaService.class.create({
        data: {
          date: new Date(createClassDto.date),
          title: createClassDto.title,
          courseId: createClassDto.courseId,
        },
        include: { course: { include: { students: true } } },
      });

      // eslint-disable-next-line @typescript-eslint/no-misused-promises
      newClass.course.students.forEach(async (student) => {
        await this.prismaService.attendance.create({
          data: {
            classId: newClass.id,
            studentId: student.id,
            status: 'ABSENT',
          },
        });
      });
      console.log('La nueva clase', newClass);
      return newClass;
    } catch (error) {
      console.error(error);
      throw error;
    }
  }

  findAll() {
    return `This action returns all class`;
  }

  async findOne(id: string) {
    try {
      const existClass = await this.prismaService.class.findUnique({
        where: { id },
        include: {
          attendance: { include: { student: true } },
        },
      });

      return existClass;
    } catch (error) {
      console.log(error);
      throw error;
    }
  }

  remove(id: number) {
    return `This action removes a #${id} class`;
  }
}
