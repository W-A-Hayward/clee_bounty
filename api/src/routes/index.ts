import { Router } from "express";
import authRoutes from "./auth.routes.ts";
import companyRoutes from "./company.routes.ts";

const router = Router();

router.use("/auth", authRoutes);
router.use("/company", companyRoutes);

export default router;
