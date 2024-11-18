import { Router } from "express";

import { HandyManController } from "@/controller/HandyManController";
import { CreateHandyManDto } from "@/dtos/handyman";
import { AuthMiddleware } from "@/middlewares/authMiddleware";
import { validateDto } from "@/middlewares/validateDto";

const router = Router();
const handyManController = new HandyManController();
const authMiddleware = new AuthMiddleware();

/**
 * @swagger
 * /handyman:
 *   post:
 *     summary: Create handyman
 *     tags: [HandyMan]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/CreateHandyManRequest'
 *     responses:
 *       201:
 *         description: Handyman created successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/CreateHandyManResponse'
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
  validateDto(CreateHandyManDto),
  handyManController.create.bind(handyManController)
);

router.get(
  "/",
  authMiddleware.authenticate,
  authMiddleware.requireRole(["admin"]),
  handyManController.list.bind(handyManController)
);

export default router;
