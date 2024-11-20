import { IsNotEmpty, IsNumber, IsString } from "class-validator";

export class CreateJobStatsDto {
  @IsString()
  @IsNotEmpty()
  handyManId: string;

  @IsString()
  @IsNotEmpty()
  jobPetitionId: string;

  @IsNumber()
  @IsNotEmpty()
  rating: number;
}

export class UpdateJobStatsDto {
  handyManId?: string;

  @IsNumber()
  rating?: number;
}
