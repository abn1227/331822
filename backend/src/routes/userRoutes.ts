import { Router } from "express";

import { UserController } from "@/controller/UserController";
import { CreateUserDto } from "@/dtos/user";
import { validateDto } from "@/middlewares/validateDto";

const router = Router();
const userController = new UserController();


/** 
 * @swagger
 * /user:
 *   post:
 *     summary: Create user
 *     tags: [Users]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/CreateUserRequest'
 *     responses:
 *       201:
 *         description: User created successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/CreateUserResponse'
 *       400:
 *         description: Invalid request
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 *       500:
 *         description: Server error
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 */
router.post(
  "/",
  validateDto(CreateUserDto),
  userController.create.bind(userController)
);

export default router;
