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
  getPostingsById,
  createPosting,
  editPostingById,
  patchPostingStatus,
  deletePosting,
} from "../controllers/posting.controller.ts";

const router = Router();

router.get("/postings", requireAuth, getPostings);
router.get("/postings/:id", requireAuth, getPostingsById);
router.post(
  "/postings",
  requireAuth,
  requireRole("company_admin"),
  validate(createPostingSchema),
  createPosting,
);
router.patch(
  "/postings/:id",
  requireAuth,
  requireRole("company_admin"),
  validate(editPostingSchema),
  editPostingById,
);
router.patch(
  "/postings/:id/status",
  requireAuth,
  requireRole("company_admin"),
  validate(updatePostingStatusSchema),
  patchPostingStatus,
);
router.delete(
  "/postings/:id",
  requireAuth,
  requireRole("company_admin"),
  deletePosting,
);
