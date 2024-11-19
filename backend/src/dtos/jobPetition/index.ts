import { IsString } from "class-validator";

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
}
