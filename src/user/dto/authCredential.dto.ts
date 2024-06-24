import {
  IsEmail,
  IsString,
  MaxLength,
  MinLength,
} from 'class-validator';

export class AuthCredentialDto {
  @IsEmail()
  username: string;

  @IsString()
  @MinLength(6)
  @MaxLength(20, { message: 'Password is to long' }) // we add custom message
  password: string;
}
