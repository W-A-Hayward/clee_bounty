import { Router } from "express";
import authRoutes from "./auth.routes.js";
import companyRoutes from "./company.routes.js";
import postingRoutes from "./posting.routes.js";
import studentRoutes from "./student.routes.js";
import adminRoutes from "./admin.routes.js";
import applicationRoutes from "./application.routes.js";
import notificationRoutes from "./notification.routes.js";
const router = Router();
router.use("/auth", authRoutes);
router.use("/company", companyRoutes);
router.use("/posting", postingRoutes);
router.use("/student", studentRoutes);
router.use("/admin", adminRoutes);
router.use("/application", applicationRoutes);
router.use("/notification", notificationRoutes);
export default router;
//# sourceMappingURL=index.js.map