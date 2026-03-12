import express from "express";
import authRoutes from "./auth.routes.js";
import adminRoutes from "./admin.routes.js";
import applicationRoutes from "./application.routes.js";
import companyRoutes from "./company.routes.js";
import conversationRoutes from "./conversation.routes.js";
import deliverableRoutes from "./deliverable.routes.js";
import matchRoutes from "./match.routes.js";
import milestoneRoutes from "./milestone.routes.js";
import notificationRoutes from "./notification.routes.js";
import projectRoutes from "./project.routes.js";
import reviewRoutes from "./review.routes.js";
import studentRoutes from "./student.routes.js";

const router = express.Router();

router.use("/auth", authRoutes);
router.use("/admin", adminRoutes);
router.use("/applications", applicationRoutes);
router.use("/companies", companyRoutes);
router.use("/conversations", conversationRoutes);
router.use("/deliverables", deliverableRoutes);
router.use("/matches", matchRoutes);
router.use("/milestones", milestoneRoutes);
router.use("/notifications", notificationRoutes);
router.use("/projects", projectRoutes);
router.use("/reviews", reviewRoutes);
router.use("/students", studentRoutes);

export default router;
