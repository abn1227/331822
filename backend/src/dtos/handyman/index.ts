import { IsArray, IsString, MinLength } from "class-validator";

export class CreateHandyManDto {
  @IsString()
  @MinLength(3)
  firstName: string;

  @IsString()
  @MinLength(3)
  lastName: string;

  @IsString()
  phone: string;

  @IsString()
  expertise: string;

  @IsArray()
  availability: string[];

  @IsArray()
  services: string[];
}

export class UpdateHandyManDto {
  @IsString()
  @MinLength(3)
  firstName?: string;

  @IsString()
  @MinLength(3)
  lastName?: string;

  @IsString()
  phone?: string;

  @IsString()
  expertise?: string;

  @IsArray()
  availability?: string[];

  @IsArray()
  services?: string[];
}
