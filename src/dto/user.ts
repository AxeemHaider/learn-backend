import { IsNotEmpty, IsString } from "class-validator";

export class UserCreateRequest {
  @IsNotEmpty()
  @IsString()
  name: string;

  @IsNotEmpty()
  email: string;

  @IsNotEmpty()
  password: string;
}

export class UserLoginRequest {
  @IsNotEmpty()
  email: string;

  @IsNotEmpty()
  password: string;
}
