import { Router } from "express";

import { JobStatsController } from "@/controller/JobStatsController";
import { CreateJobStatsDto, UpdateJobStatsDto } from "@/dtos/jobStats";
import { validateDto } from "@/middlewares/validateDto";

const router = Router();

const jobStatsController = new JobStatsController();

/**
 * @swagger
 * /job-stats/create-or-update:
 *   post:
 *     summary: Create or update job stats
 *     tags: [JobStats]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/CreateJobStatsDto'
 *     responses:
 *       201:
 *         description: Job stats created successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/JobStatsResponse'
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
  "/create-or-update",
  validateDto(CreateJobStatsDto),
  jobStatsController.create.bind(jobStatsController)
);

/**
 * @swagger
 * /job-stats/{id}:
 *   put:
 *     summary: Update job stats
 *     tags: [JobStats]
 *     parameters:
 *       - name: id
 *         in: path
 *         description: Job stats ID
 *         required: true
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/UpdateJobStatsDto'
 *     responses:
 *       200:
 *         description: Job stats updated successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/JobStatsResponse'
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
  validateDto(UpdateJobStatsDto),
  jobStatsController.update.bind(jobStatsController)
);

/**
 * @swagger
 * /job-stats/{id}/change-rating:
 *   put:
 *     summary: Change job stats rating
 *     tags: [JobStats]
 *     parameters:
 *       - name: id
 *         in: path
 *         description: Job stats ID
 *         required: true
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/UpdateJobStatsDto'
 *     responses:
 *       200:
 *         description: Job stats rating changed successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/JobStatsResponse'
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
  "/:id/change-rating",
  validateDto(UpdateJobStatsDto),
  jobStatsController.changeRating.bind(jobStatsController)
);

export default router;
