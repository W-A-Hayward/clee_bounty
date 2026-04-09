import { z } from "zod";
export declare const companyRegisterSchema: z.ZodObject<{
    email: z.ZodEmail;
    password: z.ZodString;
    firstName: z.ZodString;
    lastName: z.ZodString;
    companyName: z.ZodString;
}, z.core.$strip>;
export declare const companyLoginSchema: z.ZodObject<{
    email: z.ZodEmail;
    password: z.ZodString;
}, z.core.$strip>;
export declare const studentMicrosoftSchema: z.ZodObject<{
    accessToken: z.ZodString;
}, z.core.$strip>;
export type CompanyRegisterInput = z.infer<typeof companyRegisterSchema>;
export type CompanyLoginInput = z.infer<typeof companyLoginSchema>;
export type StudentMicrosoftInput = z.infer<typeof studentMicrosoftSchema>;
//# sourceMappingURL=auth.validators.d.ts.map