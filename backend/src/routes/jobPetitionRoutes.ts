import { Router } from "express";

import { JobPetitionController } from "@/controller/JobPetitionController";
import { AuthMiddleware } from "@/middlewares/authMiddleware";

const router = Router();

const jobPetitionController = new JobPetitionController();
const authMiddleware = new AuthMiddleware();

router.post(
  "/",
  authMiddleware.authenticate,
  authMiddleware.requireRole(["admin"]),
  jobPetitionController.create.bind(jobPetitionController)
);

router.get(
  "/my-petitions",
  authMiddleware.authenticate,
  authMiddleware.requireRole(["user"]),
  jobPetitionController.getCurrentUserJobPetitions.bind(jobPetitionController)
);

router.get(
  "/:id",
  authMiddleware.authenticate,
  jobPetitionController.getJobPetitionById.bind(jobPetitionController)
);

router.put(
  "/:id",
  authMiddleware.authenticate,
  jobPetitionController.update.bind(jobPetitionController)
);

router.put(
  "/:id/status",
  authMiddleware.authenticate,
  authMiddleware.requireRole(["admin"]),
  jobPetitionController.changeStatus.bind(jobPetitionController)
);

router.put(
  "/:id/handyman",
  authMiddleware.authenticate,
  authMiddleware.requireRole(["admin"]),
  jobPetitionController.changeHandyMan.bind(jobPetitionController)
);

export default router;
