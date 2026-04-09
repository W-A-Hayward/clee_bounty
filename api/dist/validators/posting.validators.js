import { z } from "zod";
import { PostingType, WorkMode, CompensationType, ExperienceLevel, PostingStatus, } from "@prisma/client";
export const createPostingSchema = z.object({
    title: z.string().min(1),
    shortDescription: z.string().min(1).max(100).optional(),
    description: z.string().min(1),
    postingType: z.enum(Object.values(PostingType)),
    workMode: z.enum(Object.values(WorkMode)),
    compensationType: z.enum(Object.values(CompensationType)),
    experienceLevel: z.enum(Object.values(ExperienceLevel)),
    duration: z.string().min(1),
    budgetMin: z.number().positive().optional(),
    budgetMax: z.number().positive().optional(),
    currency: z.string().optional(),
    requiredSkills: z.array(z.string()).optional(),
    applicationDeadline: z.coerce.date().optional(),
});
export const editPostingSchema = createPostingSchema.partial();
export const updatePostingStatusSchema = z.object({
    id: z.string().min(1),
    status: z.enum(Object.values(PostingStatus)),
});
//# sourceMappingURL=posting.validators.js.map