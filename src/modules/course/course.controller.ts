import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { CourseService } from './course.service';
import { CreateCourseDto } from './dto/create-course.dto';
import { UpdateCourseDto } from './dto/update-course.dto';
import { CreateClassDto } from './dto/create-class.dto';

@Controller('courses')
export class CourseController {
  constructor(private readonly courseService: CourseService) {}

  @Post()
  create(@Body() createCourseDto: CreateCourseDto) {
    return this.courseService.create(createCourseDto);
  }

  @Get()
  findAll() {
    return this.courseService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.courseService.findOne(id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateCourseDto: UpdateCourseDto) {
    return this.courseService.update(id, updateCourseDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.courseService.remove(id);
  }

  @Get(':id/classes')
  findClassesOfCourse(@Param('id') id: string) {
    return this.courseService.findClassesOfCourse(id);
  }

  @Post(':id/classes')
  createClass(@Param('id') id: string, @Body() createClassDto: CreateClassDto) {
    return this.courseService.createClass(id, createClassDto);
  }

  @Get('semester/:id')
  findSemesterCourses(@Param('id') id: string) {
    return this.courseService.findSemesterCourses(id);
  }
}
