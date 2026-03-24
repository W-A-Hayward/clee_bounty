import { Router } from "express";
import {
  companyUpdate,
  companyPublicProfile,
  companyInviteMember,
  companyGetMembers,
} from "../controllers/company.controller.ts";
import { validate } from "../middleware/validate.middleware.ts";
import {
  updateCompanySchema,
  inviteMemberSchema,
} from "../validators/company.validators.ts";
import { requireAuth, requireRole } from "../middleware/auth.middleware.ts";

const router = Router();

router.patch(
  "/",
  requireAuth,
  requireRole("company_admin"),
  validate(updateCompanySchema),
  companyUpdate,
);
router.get("/:slug", companyPublicProfile);
router.post(
  "/:slug/invite",
  requireAuth,
  requireRole("company_admin"),
  validate(inviteMemberSchema),
  companyInviteMember,
);
router.get("/:slug/list-members", requireAuth, companyGetMembers);

export default router;
