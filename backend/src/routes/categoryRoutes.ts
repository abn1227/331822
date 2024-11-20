import { Router } from "express";

import { CategoryController } from "../controller/CategoryController";

const router = Router();
const categoryController = new CategoryController();

/**
 * @swagger
 * /category:
 *   get:
 *     summary: List all categories
 *     tags: [Category]
 *     responses:
 *       200:
 *         description: List of categories
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Category'
 *       500:
 *         description: Internal server error
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'     
 */
router.get("/", categoryController.list.bind(categoryController));

export default router;

/**
 * @swagger
 * components:
 *  schemas:
 *    Category:
 *      type: object
 *      properties:
 *        _id:
 *          type: string
 *        type:
 *          type: string
 *        options:
 *          type: array
 *          items:
 *            type: object
 *            properties:
 *              value:
 *                type: string
 *              label:
 *                type: string 
 */