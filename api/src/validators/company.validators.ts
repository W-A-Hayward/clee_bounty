import { z } from "zod";

export const updateCompanySchema = z.object({
  name: z.string().min(1).optional(),
  logoUrl: z.url().optional(),
  website: z.url().optional(),
  industry: z.string().optional(),
  companySize: z.string().optional(),
  description: z.string().optional(),
});

export const inviteMemberSchema = z.object({
  email: z.email(),
});

export type UpdateCompanyInput = z.infer<typeof updateCompanySchema>;
export type InviteMemberInput = z.infer<typeof inviteMemberSchema>;
