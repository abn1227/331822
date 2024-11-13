import { IsEmail, IsString, MinLength, IsEnum } from "class-validator";

export class CreateUserDto {
  @IsString()
  @MinLength(3)
  name: string;

  @IsEmail()
  email: string;

  @IsString()
  @MinLength(8)
  password: string;

  @IsEnum(["admin", "user"])
  role: "admin" | "user";
}

export class UpdateUserDto {
  @IsString()
  @MinLength(3)
  name?: string;

  @IsString()
  @MinLength(8)
  password?: string;
}
