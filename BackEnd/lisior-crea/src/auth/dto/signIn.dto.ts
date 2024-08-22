import { IsEmail, IsNotEmpty, IsString, MaxLength } from 'class-validator';

export class SignInDto {
  @IsEmail()
  @IsNotEmpty()
  @MaxLength(100)
  email: string;

  @MaxLength(255)
  @IsNotEmpty()
  password: string;
}
