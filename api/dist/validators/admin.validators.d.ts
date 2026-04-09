import { z } from "zod";
export declare const updateUserStatusSchema: z.ZodObject<{
    isActive: z.ZodBoolean;
}, z.core.$strip>;
export declare const verifyCompanySchema: z.ZodObject<{
    isVerified: z.ZodBoolean;
}, z.core.$strip>;
export type UpdateUserStatusInput = z.infer<typeof updateUserStatusSchema>;
export type VerifyCompanyInput = z.infer<typeof verifyCompanySchema>;
//# sourceMappingURL=admin.validators.d.ts.map