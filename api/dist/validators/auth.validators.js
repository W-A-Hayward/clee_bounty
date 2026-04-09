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
//# sourceMappingURL=auth.validators.js.map