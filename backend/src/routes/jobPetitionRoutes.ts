import { Router } from "express";

import { JobPetitionController } from "@/controller/JobPetitionController";
import { AuthMiddleware } from "@/middlewares/authMiddleware";

const router = Router();

const jobPetitionController = new JobPetitionController();
const authMiddleware = new AuthMiddleware();

/**
 * @swagger
 * /job-petition:
 *   post:
 *     summary: Create job petition
 *     tags: [JobPetition]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/CreateJobPetitionDto'
 *     responses:
 *       201:
 *         description: Job petition created successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/JobPetitionResponse'
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
  authMiddleware.authenticate,
  jobPetitionController.create.bind(jobPetitionController)
);

/**
 * @swagger
 * /job-petition/my-petitions:
 *   get:
 *     summary: List my job petitions
 *     tags: [JobPetition]
 *     responses:
 *       200:
 *         description: My job petitions list
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/JobPetitionListResponse'
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
  "/my-petitions",
  authMiddleware.authenticate,
  authMiddleware.requireRole(["user"]),
  jobPetitionController.getCurrentUserJobPetitions.bind(jobPetitionController)
);

/**
 * @swagger
 * /job-petition:
 *   get:
 *     summary: List job petitions
 *     tags: [JobPetition]
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
 *       - name: status
 *         in: query
 *         description: Search by status
 *         required: false
 *         schema:
 *           type: array
 *           items:
 *             type: string
 *       - name: service
 *         in: query
 *         description: Search by service
 *         required: false
 *         schema:
 *           type: array
 *           items:
 *             type: string
 *       - name: handyman
 *         in: query
 *         description: Search by handyman
 *         required: false
 *         schema:
 *           type: string
 *       - name: date
 *         in: query
 *         description: Search by date
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
 *         description: Job petitions list
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/JobPetitionListResponse'
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
  jobPetitionController.list.bind(jobPetitionController)
);

/**
 * @swagger
 * /job-petition/{id}:
 *   get:
 *     summary: Get job petition by ID
 *     tags: [JobPetition]
 *     parameters:
 *       - name: id
 *         in: path
 *         description: Job petition ID
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Job petition
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/JobPetitionResponse'
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
  "/:id",
  authMiddleware.authenticate,
  authMiddleware.requireRole(["admin"]),
  jobPetitionController.getJobPetitionById.bind(jobPetitionController)
);

/**
 * @swagger
 * /job-petition/{id}/detailed:
 *   get:
 *     summary: Get detailed job petition by ID
 *     tags: [JobPetition]
 *     parameters:
 *       - name: id
 *         in: path
 *         description: Job petition ID
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Detailed job petition
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/JobPetitionResponse'
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
  "/:id/detailed",
  authMiddleware.authenticate,
  authMiddleware.requireRole(["admin"]),
  jobPetitionController.getDetailedJobPetition.bind(jobPetitionController)
);

/**
 * @swagger
 * /job-petition/{id}:
 *   put:
 *     summary: Update job petition
 *     tags: [JobPetition]
 *     parameters:
 *       - name: id
 *         in: path
 *         description: Job petition ID
 *         required: true
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/UpdateJobPetitionDto'
 *     responses:
 *       200:
 *         description: Job petition updated successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/JobPetitionResponse'
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
  jobPetitionController.update.bind(jobPetitionController)
);

/**
 * @swagger
 * /job-petition/{id}/status:
 *   put:
 *     summary: Change job petition status
 *     tags: [JobPetition]
 *     parameters:
 *       - name: id
 *         in: path
 *         description: Job petition ID
 *         required: true
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/UpdateJobPetitionStatusDto'
 *     responses:
 *       200:
 *         description: Job petition status changed successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/JobPetitionResponse'
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
  "/:id/status",
  authMiddleware.authenticate,
  authMiddleware.requireRole(["admin"]),
  jobPetitionController.changeStatus.bind(jobPetitionController)
);

/**
 * @swagger
 * /job-petition/{id}/handyman:
 *   put:
 *     summary: Change job petition handyman
 *     tags: [JobPetition]
 *     parameters:
 *       - name: id
 *         in: path
 *         description: Job petition ID
 *         required: true
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/UpdateJobPetitionHandyManDto'
 *     responses:
 *       200:
 *         description: Job petition handyman changed successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/JobPetitionResponse'
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
  "/:id/handyman",
  authMiddleware.authenticate,
  authMiddleware.requireRole(["admin"]),
  jobPetitionController.changeHandyMan.bind(jobPetitionController)
);

/**
 * @swagger
 * /job-petition/{id}/change-rating:
 *   put:
 *     summary: Change job petition rating
 *     tags: [JobPetition]
 *     parameters:
 *       - name: id
 *         in: path
 *         description: Job petition ID
 *         required: true
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/UpdateJobPetitionRatingDto'
 *     responses:
 *       200:
 *         description: Job petition rating changed successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/JobPetitionResponse'
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
  authMiddleware.authenticate,
  jobPetitionController.changeRating.bind(jobPetitionController)
);

export default router;
