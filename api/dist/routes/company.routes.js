import { Router } from "express";
import { companyUpdate, companyPublicProfile, companyInviteMember, companyGetMembers, } from "../controllers/company.controller.js";
import { validate } from "../middleware/validate.middleware.js";
import { updateCompanySchema, inviteMemberSchema, } from "../validators/company.validators.js";
import { requireAuth, requireRole } from "../middleware/auth.middleware.js";
const router = Router();
router.patch("/", requireAuth, requireRole("company_admin"), validate(updateCompanySchema), companyUpdate);
router.get("/:slug", companyPublicProfile);
router.post("/:slug/invite", requireAuth, requireRole("company_admin"), validate(inviteMemberSchema), companyInviteMember);
router.get("/:slug/list-members", requireAuth, companyGetMembers);
export default router;
//# sourceMappingURL=company.routes.js.map