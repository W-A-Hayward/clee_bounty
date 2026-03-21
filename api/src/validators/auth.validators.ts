import { z } from "zod";

export const companyRegisterSchema = z.object({
  email: z.email(),
  password: z.string().min(8),
  firstName: z.string().min(1),
  lastName: z.string().min(1),
  companyName: z.string().min(1),
});

export const companyLoginSchema = z.object({
  email: z.email(),
  password: z.string(),
});

export const studentMicrosoftSchema = z.object({
  accessToken: z.string(),
});

export type CompanyRegisterInput = z.infer<typeof companyRegisterSchema>;
export type CompanyLoginInput = z.infer<typeof companyLoginSchema>;
export type StudentMicrosoftInput = z.infer<typeof studentMicrosoftSchema>;
