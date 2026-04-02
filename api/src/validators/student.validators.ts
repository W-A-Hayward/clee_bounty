import { z } from "zod";

export const updateStudentSchema = z.object({
  schoolName: z.string().min(1).optional(),
  programName: z.string().min(1).optional(),
  graduationYear: z.number().int().min(2000).max(2035).optional(),
  bio: z.string().optional(),
  location: z.string().optional(),
  skills: z.array(z.string()).optional(),
  portfolioUrl: z.url().optional(),
  linkedinUrl: z.url().optional(),
  githubUrl: z.url().optional(),
  availability: z.string().optional(),
  hourlyRate: z.number().positive().optional(),
});

export type UpdateStudentInput = z.infer<typeof updateStudentSchema>;
              
