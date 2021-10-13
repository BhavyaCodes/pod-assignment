import { IsAlphanumeric, IsString, Length } from 'class-validator';

export class SignupDto {
  @IsAlphanumeric()
  @Length(3, 20)
  username: string;

  @IsString()
  @Length(3, 100)
  password: string;
}
