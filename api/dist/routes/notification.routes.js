import { Router } from "express";
import { requireAuth } from "../middleware/auth.middleware.js";
import * as notifController from "../controllers/notification.controller.js";
const router = Router();
router.get("/", requireAuth, notifController.getAll);
router.patch("/read-all", requireAuth, notifController.markAllRead);
router.patch("/:id/read", requireAuth, notifController.markOneRead);
export default router;
//# sourceMappingURL=notification.routes.js.map