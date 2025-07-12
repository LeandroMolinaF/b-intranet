import { Controller, Get, Post, Body, Param, Delete } from '@nestjs/common';
import { ClassService } from './class.service';
import { CreateClassDto } from './dto/create-class.dto';

@Controller('classes')
export class ClassController {
  constructor(private readonly classService: ClassService) {}

  @Post()
  create(@Body() createClassDto: CreateClassDto) {
    return this.classService.create(createClassDto);
  }

  @Get()
  findAll() {
    return this.classService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.classService.findOne(id);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.classService.remove(+id);
  }
}
