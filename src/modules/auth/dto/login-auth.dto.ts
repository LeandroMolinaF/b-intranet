import { IsNotEmpty, IsString } from 'class-validator';

export class LoginAuthDto {
  @IsNotEmpty()
  @IsString()
  rut: string;

  @IsNotEmpty()
  @IsString()
  password: string;
}
