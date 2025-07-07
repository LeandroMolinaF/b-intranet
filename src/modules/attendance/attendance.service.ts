import { Injectable } from '@nestjs/common';
import { RegisterAttendanceDto } from './dto/register-attendance';
import { UpdateAttendanceDto } from './dto/update-attendance.dto';
import { PrismaService } from 'src/database/prisma.service';

@Injectable()
export class AttendanceService {
  constructor(private prismaService: PrismaService) {}

  create(createAttendanceDto: RegisterAttendanceDto) {
    try {
      const { records, classId } = createAttendanceDto;

      const operations = records.map((r) =>
        this.prismaService.attendance.upsert({
          where: {
            classId_studentId: {
              classId,
              studentId: r.studentId,
            },
          },
          update: {
            status: r.status,
            timestamp: new Date(),
          },
          create: {
            classId,
            studentId: r.studentId,
            status: r.status,
          },
        }),
      );

      return this.prismaService.$transaction(operations);
    } catch (error) {
      console.error(error);
      throw error;
    }
  }

  findAll() {
    return `This action returns all attendance`;
  }

  async findAttendanceOfAClass(id: string) {
    try {
      const attendances = await this.prismaService.attendance.findMany({
        where: { classId: id },
      });
      return attendances;
    } catch (error) {
      console.error(error);
      throw error;
    }
  }

  update(id: string, updateAttendanceDto: UpdateAttendanceDto) {
    return `This action updates a #${id} attendance`;
  }

  remove(id: string) {
    return `This action removes a #${id} attendance`;
  }
}
