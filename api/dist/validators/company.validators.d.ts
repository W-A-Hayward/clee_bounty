import { z } from "zod";
export declare const updateCompanySchema: z.ZodObject<{
    name: z.ZodOptional<z.ZodString>;
    logoUrl: z.ZodOptional<z.ZodURL>;
    website: z.ZodOptional<z.ZodURL>;
    industry: z.ZodOptional<z.ZodString>;
    companySize: z.ZodOptional<z.ZodString>;
    description: z.ZodOptional<z.ZodString>;
}, z.core.$strip>;
export declare const inviteMemberSchema: z.ZodObject<{
    email: z.ZodEmail;
}, z.core.$strip>;
export type UpdateCompanyInput = z.infer<typeof updateCompanySchema>;
export type InviteMemberInput = z.infer<typeof inviteMemberSchema>;
//# sourceMappingURL=company.validators.d.ts.map