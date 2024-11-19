import { IsArray, IsString, MinLength } from "class-validator";

/** 
 * @swagger
 * components:
 *  schemas:
 *    CreateHandyManDto:
 *      type: object
 *      required:
 *        - firstName
 *        - lastName
 *        - phone
 *        - expertise
 *        - availability
 *        - services
 *      properties:
 *        firstName:
 *          type: string
 *          minLength: 3
 *        lastName:
 *          type: string
 *          minLength: 3
 *        phone:
 *          type: string
 *        expertise:
 *          type: string
 *        availability:
 *          type: array
 *          items:
 *            type: string
 *        services:
 *          type: array
 *          items:
 *            type: string
 * 
 *    CreateHandyManResponse:
 *      type: object
 *      allOf:
 *        - type: object
 *          properties:
 *            _id:
 *              type: string
 *        - $ref: '#/components/schemas/CreateHandyManDto'
 */
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

/** 
 * @swagger
 * components:
 *  schemas:
 *    UpdateHandyManDto:
 *      type: object
 *      properties:
 *        firstName:
 *          type: string
 *          minLength: 3
 *        lastName:
 *          type: string
 *          minLength: 3
 *        phone:
 *          type: string
 *        expertise:
 *          type: string
 *        availability:
 *          type: array
 *          items:
 *            type: string
 *        services:
 *          type: array
 *          items:
 *            type: string
 * 
 *    UpdateHandyManResponse:
 *      type: object
 *      allOf:
 *        - type: object
 *          properties:
 *            _id:
 *              type: string
 *        - $ref: '#/components/schemas/UpdateHandyManDto'
 */
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

/** 
 * @swagger
 * components:
 *  schemas:
 *    HandymanListResponse:
 *      type: object
 *      properties:
 *        data:
 *          type: array
 *          items:
 *            $ref: '#/components/schemas/CreateHandyManResponse'
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