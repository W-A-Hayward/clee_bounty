import { Router } from "express";
import demoRoutes from "./demo.routes.ts";
import authRoutes from "./auth.routes.ts";
import companyRoutes from "./company.routes.ts";
import postingRoutes from "./posting.routes.ts";
import studentRoutes from "./student.routes.ts";
import adminRoutes from "./admin.routes.ts";
import applicationRoutes from "./application.routes.ts";
import notificationRoutes from "./notification.routes.ts";

const router = Router();

router.use("/", demoRoutes);
router.use("/auth", authRoutes);
router.use("/company", companyRoutes);
router.use("/posting", postingRoutes);
router.use("/student", studentRoutes);
router.use("/admin", adminRoutes);
router.use("/application", applicationRoutes);
router.use("/notification", notificationRoutes);

export default router;
