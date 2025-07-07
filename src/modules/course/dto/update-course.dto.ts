import { IsOptional, IsString } from 'class-validator';

export class UpdateCourseDto {
  @IsOptional()
  @IsString()
  code: string;

  @IsOptional()
  @IsString()
  name: string;

  @IsOptional()
  @IsString()
  semester: string;

  @IsOptional()
  @IsString()
  teacherId: string;
}
