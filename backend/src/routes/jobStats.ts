import { Router } from "express";

import { JobStatsController } from "@/controller/JobStatsController";
import { CreateJobStatsDto, UpdateJobStatsDto } from "@/dtos/jobStats";
import { validateDto } from "@/middlewares/validateDto";

const router = Router();

const jobStatsController = new JobStatsController();

router.post(
  "/create-or-update",
  validateDto(CreateJobStatsDto),
  jobStatsController.create.bind(jobStatsController)
);

router.put(
  "/:id",
  validateDto(UpdateJobStatsDto),
  jobStatsController.update.bind(jobStatsController)
);

router.put(
  "/:id/change-rating",
  validateDto(UpdateJobStatsDto),
  jobStatsController.changeRating.bind(jobStatsController)
);

export default router;
