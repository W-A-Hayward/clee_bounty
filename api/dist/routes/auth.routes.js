import { Router } from "express";
import { companyRegister, companyLogin, logout, me, refresh, studentMicrosoftLogin, } from "../controllers/auth.controller.js";
import { validate } from "../middleware/validate.middleware.js";
import { requireAuth } from "../middleware/auth.middleware.js";
import { companyRegisterSchema, companyLoginSchema, studentMicrosoftSchema, } from "../validators/auth.validators.js";
const router = Router();
router.post("/company/register", validate(companyRegisterSchema), companyRegister);
router.post("/company/login", validate(companyLoginSchema), companyLogin);
router.post("/logout", logout);
router.get("/me", requireAuth, me);
router.post("/refresh", refresh);
router.post("/student/microsoft", validate(studentMicrosoftSchema), studentMicrosoftLogin);
export default router;
//# sourceMappingURL=auth.routes.js.map