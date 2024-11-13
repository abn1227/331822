import { Router } from "express";

import { AuthController } from "@/controller/AuthController";
import { LoginDto } from "@/dtos/auth";
import { validateDto } from "@/middlewares/validateDto";
// import { validateDto } from "@/middlewares/validateDto";

const router = Router();
const authController = new AuthController();

router.post("/login", validateDto(LoginDto), authController.login.bind(authController));

export default router;
