import { IsEmail, IsString, MinLength } from "class-validator";

/** 
 * @swagger
 * components:
 *  schemas:
 *    LoginDto:
 *      type: object
 *      required:
 *        - email
 *        - password
 *      properties:
 *        email:
 *          type: string
 *          format: email
 *        password:
 *          type: string
 *          format: password
 */
export class LoginDto {
  @IsEmail()
  email: string;

  @IsString()
  @MinLength(8)
  password: string;
}

/** 
 * @swagger
 * components:
 *  schemas:
 *    RegisterDto:
 *      type: object
 *      required:
 *        - email
 *        - password
 *        - firstName
 *        - lastName
 *      properties:
 *        email:
 *          type: string
 *          format: email
 *        password:
 *          type: string
 *          format: password
 *        firstName:
 *          type: string
 *        lastName:
 *          type: string    
 */
export class RegisterDto {
  @IsEmail()
  email: string;

  @IsString()
  @MinLength(8)
  password: string;

  @IsString()
  @MinLength(2)
  firstName: string;

  @IsString()
  @MinLength(2)
  lastName: string;
}

/**
 * @swagger
 * components:
 *  schemas:
 *    AuthResponse:
 *      type: object
 *      properties:
 *        token:
 *          type: string
 *        user:
 *          type: object
 *          properties:
 *            id:
 *              type: string
 *              description: User ID
 *            email:
 *              type: string
 *              format: email
 *            firstName:
 *              type: string
 *            lastName:
 *              type: string
 *            role:
 *              type: string
 *              enum: [admin, user]
 *              description: User role
 *    CheckResponse:
 *      type: object
 *      properties:
 *        id:
 *          type: string
 *          description: User ID
 *        email:
 *          type: string
 *          format: email
 *        role:
 *          type: string
 *          enum: [admin, user]
 *          description: User role
 */