import { Router } from "express";

import { CategoryController } from "../controller/CategoryController";

const router = Router();
const categoryController = new CategoryController();

router.get("/", categoryController.list.bind(categoryController));

export default router;
