import { Injectable } from '@nestjs/common';
import { CreateCourseDto } from './dto/create-course.dto';
import { UpdateCourseDto } from './dto/update-course.dto';
import { PrismaService } from 'src/database/prisma.service';
import { CreateClassDto } from './dto/create-class.dto';

@Injectable()
export class CourseService {
  constructor(private prismaService: PrismaService) {}

  async create(createCourseDto: CreateCourseDto) {
    try {
      const newCourses = await this.prismaService.course.create({
        data: createCourseDto,
      });
      return newCourses;
    } catch (error) {
      console.error(error);
      throw error;
    }
  }

  async findAll() {
    try {
      const courses = await this.prismaService.course.findMany();
      return courses;
    } catch (error) {
      console.error(error);
      throw error;
    }
  }

  async findOne(id: string) {
    try {
      const course = await this.prismaService.course.findUnique({
        where: { id: id },
      });
      return course;
    } catch (error) {
      console.error(error);
      throw error;
    }
  }

  async update(id: string, updateCourseDto: UpdateCourseDto) {
    try {
      const updatedUser = await this.prismaService.course.update({
        where: { id },
        data: updateCourseDto,
      });
      return updatedUser;
    } catch (error) {
      console.error(error);
      throw error;
    }
  }

  async remove(id: string) {
    try {
      const removedCourse = await this.prismaService.course.delete({
        where: { id },
      });
      return removedCourse;
    } catch (error) {
      console.error(error);
      throw error;
    }
  }

  async findClassesOfCourse(id: string) {
    try {
      const classes = await this.prismaService.class.findMany({
        where: { courseId: id },
      });
      return classes;
    } catch (error) {
      console.error(error);
      throw error;
    }
  }

  async createClass(courseId: string, createClassDto: CreateClassDto) {
    try {
      const newClass = await this.prismaService.class.create({
        data: { courseId, ...createClassDto },
      });
      return newClass;
    } catch (error) {
      console.error(error);
      throw error;
    }
  }
}
