import { IsString } from 'class-validator';
import { IsEmail, IsNotEmpty } from 'class-validator';

export class CreateAuthDto {
  @IsNotEmpty()
  @IsString()
  rut: string;

  @IsNotEmpty()
  @IsEmail()
  email: string;

  @IsNotEmpty()
  @IsString()
  password: string;

  @IsNotEmpty()
  @IsString()
  fullName: string;
}
