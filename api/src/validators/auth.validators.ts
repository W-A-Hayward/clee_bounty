// TODO: Complete auth.validators.ts implementation
// Steps needed:
// 1. Import express-validator or zod for validation
// 2. Create validation rules for:
//    - registerCompany: name, email, password, companyName, website, industry, location, teamSize, description
//    - loginCompany: email, password
//    - logout
// 3. Validate email format
// 4. Validate password strength (min length, complexity if needed)
// 5. Sanitize inputs
// 6. Export validation chains/arrays for each endpoint

import { z } from "zod";

export const companyRegisterSchema = z.object({
  email: z.string().email(),
  password: z.string().min(8),
  firstName: z.string().min(1),
  lastName: z.string().min(1),
  companyName: z.string().min(1),
});

export const companyLoginSchema = z.object({
  email: z.string().email(),
  password: z.string(),
});

export const studentMicrosoftSchema = z.object({
  accessToken: z.string(),
});

export type CompanyRegisterInput = z.infer<typeof companyRegisterSchema>;
export type CompanyLoginInput = z.infer<typeof companyLoginSchema>;
export type StudentMicrosoftInput = z.infer<typeof studentMicrosoftSchema>;
