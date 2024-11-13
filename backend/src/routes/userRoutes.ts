import { Router } from "express";

import { UserController } from "@/controller/UserController";
import { CreateUserDto } from "@/dtos/user";
import { validateDto } from "@/middlewares/validateDto";

const router = Router();
const userController = new UserController();

router.post(
  "/",
  validateDto(CreateUserDto),
  userController.create.bind(userController)
);

export default router;
