import { z } from "zod";

export const studentProfileInput = z.object({
  schoolName : z.string().min(1),
  programName : z.string().min(1),
  graduationYear : z.number().min(1900).max(3000),
  bio : z.string().min(1),
  location : z.string().min(1),
  skills : z.string().min(1),
  portfolioUrl : z.string().min(1),
  linkedinUrl : z.string().min(1),
  githubUrl : z.string().min(1),
  availability : z.string().min(1),
  hourlyRate : z.number().min(0),
  createdAt : z.date(),
  updatedAt : z.date(),
}).partial();

export type StudentProfileSchema = z.infer<typeof studentProfileInput>;
              
