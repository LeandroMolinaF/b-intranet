import { IsNotEmpty, IsString } from 'class-validator';

export class CreateCourseDto {
  @IsNotEmpty()
  @IsString()
  code: string;

  @IsNotEmpty()
  @IsString()
  name: string;

  @IsNotEmpty()
  @IsString()
  semester: string;

  @IsNotEmpty()
  @IsString()
  teacherId: string;
}
