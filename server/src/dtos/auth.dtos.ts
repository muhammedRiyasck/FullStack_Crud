import { IsEmail, IsNotEmpty, MinLength, IsEnum } from 'class-validator';

export class RegisterDTO {
  @IsNotEmpty()
   name!: string;

  @IsEmail()
  email!: string;

  @MinLength(6)
  password!: string;

  // @IsEnum(['user', 'admin'])
  role!: 'user' | 'admin';
}

export class LoginDTO {
  @IsEmail()
  email!: string;

  @IsNotEmpty()
  password!: string;
  
}
