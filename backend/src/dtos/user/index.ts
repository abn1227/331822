import { IsEmail, IsString, MinLength, IsEnum } from "class-validator";

export class CreateUserDto {
  @IsString()
  @MinLength(3)
  firstName: string;

  @IsString()
  @MinLength(3)
  lastName: string;

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
  firstName?: string;

  @IsString()
  @MinLength(3)
  lastName?: string;

  @IsString()
  @MinLength(8)
  password?: string;
}
