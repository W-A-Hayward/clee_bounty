import { Router } from "express";
import { requireAuth, requireRole } from "../middleware/auth.middleware.js";
import { validate } from "../middleware/validate.middleware.js";
import { updateUserStatusSchema, verifyCompanySchema } from "../validators/admin.validators.js";
import * as AdminController from "../controllers/admin.controller.js";
const router = Router();
// all admin routes require auth and platform_admin role
router.use(requireAuth, requireRole("platform_admin"));
router.get("/users", AdminController.getUsers);
router.patch("/users/:id/status", validate(updateUserStatusSchema), AdminController.updateUserStatus);
router.get("/companies", AdminController.getCompanies);
router.patch("/companies/:id/verify", validate(verifyCompanySchema), AdminController.verifyCompany);
router.get("/postings", AdminController.getPostings);
router.get("/audit-logs", AdminController.getAuditLogs);
export default router;
//# sourceMappingURL=admin.routes.js.map