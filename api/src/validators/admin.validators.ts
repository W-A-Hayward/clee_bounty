import { z } from "zod";

export const updateUserStatusSchema = z.object({
  isActive: z.boolean(),
});

export const verifyCompanySchema = z.object({
  isVerified: z.boolean(),
});

export type UpdateUserStatusInput = z.infer<typeof updateUserStatusSchema>;
export type VerifyCompanyInput = z.infer<typeof verifyCompanySchema>;
