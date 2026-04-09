import { Router } from "express";
import { validate } from "../middleware/validate.middleware.js";
import { createPostingSchema, editPostingSchema, updatePostingStatusSchema, } from "../validators/posting.validators.js";
import { requireAuth, requireRole } from "../middleware/auth.middleware.js";
import { getPostings, getPostingById, createPosting, editPostingById, patchPostingStatus, deletePosting, } from "../controllers/posting.controller.js";
const router = Router();
router.get("/", requireAuth, getPostings);
router.get("/:id", requireAuth, getPostingById);
router.post("/", requireAuth, requireRole("company_admin"), validate(createPostingSchema), createPosting);
router.patch("/:id", requireAuth, requireRole("company_admin"), validate(editPostingSchema), editPostingById);
router.patch("/:id/status", requireAuth, requireRole("company_admin"), validate(updatePostingStatusSchema), patchPostingStatus);
router.delete("/:id", requireAuth, requireRole("company_admin"), deletePosting);
export default router;
//# sourceMappingURL=posting.routes.js.map