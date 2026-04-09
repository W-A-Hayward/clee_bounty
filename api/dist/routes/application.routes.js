import { Router } from "express";
import { applicationWithdraw, getApplications, updateApplicationStatus, } from "../controllers/application.controller.js";
import { requireAuth, requireRole } from "../middleware/auth.middleware.js";
import { updateApplicationStatusSchema } from "../validators/application.validators.js";
import { validate } from "../middleware/validate.middleware.js";
const router = Router();
router.get("/me", requireAuth, requireRole("student"), getApplications);
router.patch("/:id/status", requireAuth, requireRole("company_admin"), validate(updateApplicationStatusSchema), updateApplicationStatus);
router.delete("/:id", requireAuth, requireRole("student"), applicationWithdraw);
export default router;
//# sourceMappingURL=application.routes.js.map