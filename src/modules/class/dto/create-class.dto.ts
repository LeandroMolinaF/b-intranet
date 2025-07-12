import { IsDate, IsNotEmpty, IsString } from 'class-validator';

export class CreateClassDto {
  @IsNotEmpty()
  @IsString()
  title: string;

  @IsNotEmpty()
  @IsDate()
  date: Date;

  @IsNotEmpty()
  @IsString()
  courseId: string;
}
