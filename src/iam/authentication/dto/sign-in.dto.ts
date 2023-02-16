import { IsNotEmpty, MinLength } from "class-validator";

export class SignInDto {
  email: string;

  @IsNotEmpty()
  @MinLength(10)
  password: string;
}
