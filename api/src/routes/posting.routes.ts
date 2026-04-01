import { Router } from "express";
import { validate } from "../middleware/validate.middleware.ts";
import {
  createPostingSchema,
  editPostingSchema,
  updatePostingStatusSchema,
} from "../validators/posting.validators.ts";
import { requireAuth, requireRole } from "../middleware/auth.middleware.ts";
import {
  getPostings,
  getPostingById,
  createPosting,
  editPostingById,
  patchPostingStatus,
  deletePosting,
} from "../controllers/posting.controller.ts";

const router = Router();

router.get("/", requireAuth, getPostings);
router.get("/:id", requireAuth, getPostingById);
router.post(
  "/",
  requireAuth,
  requireRole("company_admin"),
  validate(createPostingSchema),
  createPosting,
);
router.patch(
  "/:id",
  requireAuth,
  requireRole("company_admin"),
  validate(editPostingSchema),
  editPostingById,
);
router.patch(
  "/:id/status",
  requireAuth,
  requireRole("company_admin"),
  validate(updatePostingStatusSchema),
  patchPostingStatus,
);
router.delete("/:id", requireAuth, requireRole("company_admin"), deletePosting);
