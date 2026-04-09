import { z } from "zod";
export declare const updateApplicationStatusSchema: z.ZodObject<{
    status: z.ZodEnum<{
        [x: string]: string;
    }>;
}, z.core.$strip>;
export type UpdateApplicationStatusSchema = z.infer<typeof updateApplicationStatusSchema>;
//# sourceMappingURL=application.validators.d.ts.map