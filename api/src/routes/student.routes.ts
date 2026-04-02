import { Router } from "express";
import { requireAuth, requireRole } from "../middleware/auth.middleware.ts";
import { validate } from "../middleware/validate.middleware.ts";
import { updateStudentSchema } from "../validators/student.validators.ts";
import { upload } from "../config/multer.ts";
import * as StudentController from "../controllers/student.controller.ts";

const router = Router();

router.patch(
  "/me",
  requireAuth,
  requireRole("student"),
  validate(updateStudentSchema),
  StudentController.updateProfile,
);

router.post(
  "/me/resume",
  requireAuth,
  requireRole("student"),
  upload.single("resume"),
  StudentController.uploadResume,
);

router.get(
  "/:id",
  StudentController.getPublicProfile,
);

export default router;
