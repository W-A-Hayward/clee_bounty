import { z } from "zod";
import {
  PostingType,
  WorkMode,
  CompensationType,
  ExperienceLevel,
  PostingStatus,
} from "@prisma/client";

export const createPostingSchema = z.object({
  title: z.string().min(1),
  shortDescription: z.string().min(1).max(100).optional(),
  description: z.string().min(1),
  postingType: z.enum(Object.values(PostingType) as [string, ...string[]]),
  workMode: z.enum(Object.values(WorkMode) as [string, ...string[]]),
  compensationType: z.enum(
    Object.values(CompensationType) as [string, ...string[]],
  ),
  experienceLevel: z.enum(
    Object.values(ExperienceLevel) as [string, ...string[]],
  ),
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
  status: z.enum(Object.values(PostingStatus) as [string, ...string[]]),
});

export type CreatePostingInput = z.infer<typeof createPostingSchema>;
export type EditPostingInput = z.infer<typeof editPostingSchema>;
export type UpdatePostingStatusInput = z.infer<
  typeof updatePostingStatusSchema
>;
