import { Router } from "express";
import { companyUpdate, companyPublicProfile, companyInviteMember } from "../controllers/company.controller.ts";
import { validate } from "../middleware/validate.middleware.ts";
import { updateCompanySchema, inviteMemberSchema } from "../validators/company.validators.ts";
import { requireAuth, requireRole } from "../middleware/auth.middleware.ts";

const router = Router();

router.patch(
  "/",
  requireAuth,
  requireRole("company_admin"),
  validate(updateCompanySchema),
  companyUpdate,
);
router.get("/:slug", requireAuth, companyPublicProfile);
router.post("/:slug/invite", requireAuth, requireRole("company_admin"), validate(inviteMemberSchema), companyInviteMember);

export default router;
