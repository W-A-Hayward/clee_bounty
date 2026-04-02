import { Router } from "express";
import { requireAuth, requireRole } from "../middleware/auth.middleware.ts";
import { uploadResume, updateProfile } from "../controllers/student.controller.ts";
import { upload } from "../config/multer.ts";
import { studentProfileInput } from "../validators/student.validators.ts";
import { validate } from "../middleware/validate.middleware.ts";

const router = Router();

router.post(
  "/me/resume",
  requireAuth,
  requireRole("student"),
  upload.single("resume"),
  uploadResume,
);

router.patch("/:id", validate(studentProfileInput), requireAuth, requireRole("student"), updateProfile);

export default router;
