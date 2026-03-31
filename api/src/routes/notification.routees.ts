import { Router } from "express";
import { requireAuth } from "../middleware/auth.middleware.ts";
import * as notifController from "../controllers/notification.controller.ts";

const router = Router();

router.get("/", requireAuth, notifController.getAll);
router.patch("/read-all", requireAuth, notifController.markAllRead);
router.patch("/:id/read", requireAuth, notifController.markOneRead);
