// TODO: Complete auth.routes.ts implementation
// Steps needed:
// 1. Import express Router, auth controller, validators, rate limiter
// 2. Create router instance
// 3. Define routes:
//    - POST /register/student - register student (use authLimiter, validate registration data)
//    - POST /register/company - register company (use authLimiter, validate registration data)
//    - POST /login/student - student login (use authLimiter, validate login data)
//    - POST /login/company - company login (use authLimiter, validate login data)
//    - POST /logout - logout (use requireAuth middleware)
//    - POST /refresh - refresh token (validate refresh token)
//    - GET /me - get current user (use requireAuth middleware)
// 4. Apply validation middleware to routes that need it
// 5. Apply rate limiting to auth routes
// 6. Export router as default

import { Router } from "express";
import { companyRegister, companyLogin, logout, me } from "../controllers/auth.controller.js";
import { validate } from "../middleware/validate.ts";
import { requireAuth } from "../middleware/auth.middleware.js";
import { companyRegisterSchema, companyLoginSchema } from "../validators/auth.validators.js";

const router = Router();

router.post("/company/register", validate(companyRegisterSchema), companyRegister);
router.post("/company/login", validate(companyLoginSchema), companyLogin);
router.post("/logout", logout);
router.get("/me", requireAuth, me);

export default router;
