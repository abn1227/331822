import { IsNotEmpty, IsNumber, IsString } from "class-validator";

/**
 * @swagger
 * components:
 *  schemas:
 *    CreateJobStatsDto:
 *      type: object
 *      required:
 *        - handyManId
 *        - jobPetitionId
 *        - rating
 *      properties:
 *        handyManId:
 *          type: string
 *        jobPetitionId:
 *          type: string
 *        rating:
 *          type: number  
 */
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

/**
 * @swagger
 * components:
 *  schemas:
 *    UpdateJobStatsDto:
 *      type: object
 *      properties:
 *        handyManId:
 *          type: string
 *        rating:
 *          type: number
 */
export class UpdateJobStatsDto {
  handyManId?: string;

  @IsNumber()
  rating?: number;
}


/**
 * @swagger
 * components:
 *  schemas:
 *    JobStatsResponse:
 *      type: object
 *      properties:
 *        _id:
 *          type: string
 *        handyManId:
 *          type: string
 *        jobPetitionId:
 *          type: string
 *        rating:
 *          type: number
 *          default: 0
 *        createdAt:
 *          type: string
 *        updatedAt:
 *          type: string
 */