import { Router } from "express";

import { AuthController } from "@/controller/AuthController";
import { LoginDto, RegisterDto } from "@/dtos/auth";
import { AuthMiddleware } from "@/middlewares/authMiddleware";
import { validateDto } from "@/middlewares/validateDto";

const router = Router();
const authController = new AuthController();
const authMiddleware = new AuthMiddleware();

/**
 * @swagger
 * /auth/login:
 *   post:
 *     summary: Login user
 *     tags: [Auth]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/LoginRequest'
 *     responses:
 *       200:
 *         description: Login successful
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/LoginResponse'
 *       400:
 *         description: Invalid credentials
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
  "/login",
  validateDto(LoginDto),
  authController.login.bind(authController)
);

router.post(
  "/register",
  validateDto(RegisterDto),
  authController.register.bind(authController)
);

router.get(
  "/check",
  authMiddleware.authenticate,
  authController.check.bind(authController)
);

export default router;
