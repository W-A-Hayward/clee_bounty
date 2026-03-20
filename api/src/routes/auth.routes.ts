import { Router } from "express";
import {
  companyRegister,
  companyLogin,
  logout,
  me,
  refresh,
  studentMicrosoftLogin,
} from "../controllers/auth.controller.ts";
import { validate } from "../middleware/validate.middleware.ts";
import { requireAuth } from "../middleware/auth.middleware.ts";
import {
  companyRegisterSchema,
  companyLoginSchema,
  studentMicrosoftSchema,
} from "../validators/auth.validators.ts";

const router = Router();

router.post(
  "/company/register",
  validate(companyRegisterSchema),
  companyRegister,
);
router.post("/company/login", validate(companyLoginSchema), companyLogin);
router.post("/logout", logout);
router.get("/me", requireAuth, me);
router.post("/refresh", refresh);
router.post(
  "/student/microsoft",
  validate(studentMicrosoftSchema),
  studentMicrosoftLogin,
);

export default router;
