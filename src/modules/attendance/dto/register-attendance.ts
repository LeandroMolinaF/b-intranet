import { AttendanceStatus } from '@prisma/client';
import { Type } from 'class-transformer';
import { IsEnum, IsNotEmpty, IsString, ValidateNested } from 'class-validator';

export class AttendanceRecordDto {
  @IsNotEmpty()
  @IsString()
  studentId: string;

  @IsNotEmpty()
  @IsEnum(AttendanceStatus)
  status: AttendanceStatus;
}

export class RegisterAttendanceDto {
  @IsNotEmpty()
  @IsString()
  classId: string;

  @ValidateNested({ each: true })
  @Type(() => AttendanceRecordDto)
  records: AttendanceRecordDto[];
}
