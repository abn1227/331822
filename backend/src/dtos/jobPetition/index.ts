import { IsNumber, IsString } from "class-validator";

/**
 * @swagger
 * components:
 *  schemas:
 *    CreateJobPetitionDto:
 *      type: object
 *      required:
 *        - userId
 *        - handyManId
 *        - status
 *        - description
 *        - service
 *        - date
 *        - time
 *      properties:
 *        userId:
 *          type: string
 *        handyManId:
 *          type: string
 *        status:
 *          type: string
 *          enum: [pending, assignated, rejected, completed]
 *        description:
 *          type: string
 *        service:
 *          type: string
 *        date:
 *          type: string
 *        time:
 *          type: string
 */
export class CreateJobPetitionDto {
  @IsString()
  userId: string;

  @IsString()
  handyManId?: string;

  @IsString()
  status: "pending" | "assignated" | "rejected" | "completed";

  @IsString()
  description: string;

  @IsString()
  availability: string;

  @IsString()
  service: string;

  @IsString()
  date: string;

  @IsString()
  time: string;
}

/**
 * @swagger
 * components:
 *  schemas:
 *    UpdateJobPetitionDto:
 *      type: object
 *      properties:
 *        handyManId:
 *          type: string
 *        status:
 *          type: string
 *          enum: [pending, assignated, rejected, completed]
 *        description:
 *          type: string
 *        date:
 *          type: string
 *        time:
 *          type: string
 */
export class UpdateJobPetitionDto {
  @IsString()
  handyManId?: string;

  @IsString()
  handyManName?: string;

  @IsString()
  status?: "pending" | "assignated" | "rejected" | "completed";

  @IsString()
  description?: string;

  @IsString()
  date?: string;

  @IsString()
  time?: string;

  @IsNumber()
  rating?: number;
}

/**
 * @swagger
 * components:
 *  schemas:
 *    UpdateJobPetitionHandyManDto:
 *      type: object
 *      properties:
 *        handyManId:
 *          type: string
 */
export class UpdateJobPetitionHandyManDto {
  @IsString()
  handyManId?: string;
}

/**
 * @swagger
 * components:
 *  schemas:
 *    UpdateJobPetitionStatusDto:
 *      type: object
 *      properties:
 *        status:
 *          type: string
 *          enum: [pending, assignated, rejected, completed]
 */
export class UpdateJobPetitionStatusDto {
  @IsString()
  status?: "pending" | "assignated" | "rejected" | "completed";
}

/**
 * @swagger
 * components:
 *  schemas:
 *    UpdateJobPetitionRatingDto:
 *      type: object
 *      properties:
 *        rating:
 *          type: number
 */
export class UpdateJobPetitionRatingDto {
  @IsNumber()
  rating?: number;
}

/**
 * @swagger
 * components:
 *  schemas:
 *    JobPetitionResponse:
 *      type: object
 *      properties:
 *        _id:
 *          type: string
 *        userId:
 *          type: string
 *        handyManId:
 *          type: string
 *        status:
 *          type: string
 *          enum: [pending, assignated, rejected, completed]
 *        description:
 *          type: string
 *        service:
 *          type: string
 *        date:
 *          type: string
 *        time:
 *          type: string
 *        rating:
 *          type: number
 *          default: 0
 *        createdAt:
 *          type: string
 *        updatedAt:
 *          type: string
 *    JobPetitionListResponse:
 *      type: object
 *      properties:
 *        data:
 *          type: array
 *          items:
 *            $ref: '#/components/schemas/JobPetitionResponse'
 *        pagination:
 *          type: object
 *          properties:
 *            total:
 *              type: number
 *            totalPages:
 *              type: number
 *            limit:
 *              type: number
 *            offset:
 *              type: number 
 */