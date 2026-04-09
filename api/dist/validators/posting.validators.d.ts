import { z } from "zod";
export declare const createPostingSchema: z.ZodObject<{
    title: z.ZodString;
    shortDescription: z.ZodOptional<z.ZodString>;
    description: z.ZodString;
    postingType: z.ZodEnum<{
        [x: string]: string;
    }>;
    workMode: z.ZodEnum<{
        [x: string]: string;
    }>;
    compensationType: z.ZodEnum<{
        [x: string]: string;
    }>;
    experienceLevel: z.ZodEnum<{
        [x: string]: string;
    }>;
    duration: z.ZodString;
    budgetMin: z.ZodOptional<z.ZodNumber>;
    budgetMax: z.ZodOptional<z.ZodNumber>;
    currency: z.ZodOptional<z.ZodString>;
    requiredSkills: z.ZodOptional<z.ZodArray<z.ZodString>>;
    applicationDeadline: z.ZodOptional<z.ZodCoercedDate<unknown>>;
}, z.core.$strip>;
export declare const editPostingSchema: z.ZodObject<{
    title: z.ZodOptional<z.ZodString>;
    shortDescription: z.ZodOptional<z.ZodOptional<z.ZodString>>;
    description: z.ZodOptional<z.ZodString>;
    postingType: z.ZodOptional<z.ZodEnum<{
        [x: string]: string;
    }>>;
    workMode: z.ZodOptional<z.ZodEnum<{
        [x: string]: string;
    }>>;
    compensationType: z.ZodOptional<z.ZodEnum<{
        [x: string]: string;
    }>>;
    experienceLevel: z.ZodOptional<z.ZodEnum<{
        [x: string]: string;
    }>>;
    duration: z.ZodOptional<z.ZodString>;
    budgetMin: z.ZodOptional<z.ZodOptional<z.ZodNumber>>;
    budgetMax: z.ZodOptional<z.ZodOptional<z.ZodNumber>>;
    currency: z.ZodOptional<z.ZodOptional<z.ZodString>>;
    requiredSkills: z.ZodOptional<z.ZodOptional<z.ZodArray<z.ZodString>>>;
    applicationDeadline: z.ZodOptional<z.ZodOptional<z.ZodCoercedDate<unknown>>>;
}, z.core.$strip>;
export declare const updatePostingStatusSchema: z.ZodObject<{
    id: z.ZodString;
    status: z.ZodEnum<{
        [x: string]: string;
    }>;
}, z.core.$strip>;
export type CreatePostingInput = z.infer<typeof createPostingSchema>;
export type EditPostingInput = z.infer<typeof editPostingSchema>;
export type UpdatePostingStatusInput = z.infer<typeof updatePostingStatusSchema>;
//# sourceMappingURL=posting.validators.d.ts.map