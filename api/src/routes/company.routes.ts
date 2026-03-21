import { Router } from "express";
import { companyUpdate } from "../controllers/company.controller.ts";
import { validate } from "../middleware/validate.middleware.ts";
import { requireAuth, requireRole } from "../middleware/auth.middleware.ts";
import { updateCompanySchema } from "../validators/company.validators.ts";

const router = Router();

router.patch(
  "/",
  requireAuth,
  requireRole("company_admin"),
  validate(updateCompanySchema),
  companyUpdate,
);

export default router;
