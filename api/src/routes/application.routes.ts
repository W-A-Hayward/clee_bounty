import { Router } from "express";
import {
  applicationWithdraw,
  getApplications,
  updateApplicationStatus,
} from "../controllers/application.controller.ts";
import { requireAuth, requireRole } from "../middleware/auth.middleware.ts";
import { updateApplicationStatusSchema } from "../validators/application.validators.ts";
import { validate } from "../middleware/validate.middleware.ts";

const router = Router();

router.get("/me", requireAuth, requireRole("student"), getApplications);
router.patch("/:id/status", requireAuth, requireRole("company_admin"), validate(updateApplicationStatusSchema),  updateApplicationStatus);
router.delete("/:id", requireAuth, requireRole("student"), applicationWithdraw);

export default router;
