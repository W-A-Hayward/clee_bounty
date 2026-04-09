import { Router } from "express";
import { requireAuth, requireRole } from "../middleware/auth.middleware.js";
import { validate } from "../middleware/validate.middleware.js";
import { updateStudentSchema } from "../validators/student.validators.js";
import { upload } from "../config/multer.js";
import * as StudentController from "../controllers/student.controller.js";
const router = Router();
router.patch("/me", requireAuth, requireRole("student"), validate(updateStudentSchema), StudentController.updateProfile);
router.post("/me/resume", requireAuth, requireRole("student"), upload.single("resume"), StudentController.uploadResume);
router.get("/:id", StudentController.getPublicProfile);
export default router;
//# sourceMappingURL=student.routes.js.map