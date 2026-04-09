import { z } from "zod";
export const updateUserStatusSchema = z.object({
    isActive: z.boolean(),
});
export const verifyCompanySchema = z.object({
    isVerified: z.boolean(),
});
//# sourceMappingURL=admin.validators.js.map