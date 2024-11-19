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
 *             $ref: '#/components/schemas/CreateHandyManDto'
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

/**
 * @swagger
 * /handyman:
 *   get:
 *     summary: List handymans
 *     tags: [HandyMan]
 *     parameters:
 *       - name: limit
 *         in: query
 *         description: Number of items per page
 *         required: false
 *         schema:
 *           type: number
 *           default: 10
 *       - name: offset
 *         in: query
 *         description: Number of items to skip
 *         required: false
 *         schema:
 *           type: number
 *           default: 0
 *       - name: search
 *         in: query
 *         description: Search by name
 *         required: false
 *         schema:
 *           type: string
 *       - name: expertise
 *         in: query
 *         description: Search by expertise
 *         required: false
 *         schema:
 *           type: string
 *       - name: services
 *         in: query
 *         description: Search by services
 *         required: false
 *         schema:
 *           type: array
 *           items:
 *             type: string
 *       - name: availability
 *         in: query
 *         description: Search by availability
 *         required: false
 *         schema:
 *           type: array
 *           items:
 *             type: string
 *     responses:
 *       200:
 *         description: Handymans list
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/HandymanListResponse'
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
router.get(
  "/",
  authMiddleware.authenticate,
  authMiddleware.requireRole(["admin"]),
  handyManController.list.bind(handyManController)
);

/**
 * @swagger
 * /handyman/{id}:
 *   put:
 *     summary: Update handyman
 *     tags: [HandyMan]
 *     parameters:
 *       - name: id
 *         in: path
 *         description: Handyman ID
 *         required: true
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/UpdateHandyManDto'
 *     responses:
 *       200:
 *         description: Handyman updated successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/UpdateHandyManResponse'
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
router.put(
  "/:id",
  authMiddleware.authenticate,
  authMiddleware.requireRole(["admin"]),
  handyManController.update.bind(handyManController)
);

export default router;
