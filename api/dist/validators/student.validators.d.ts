import { z } from "zod";
export declare const updateStudentSchema: z.ZodObject<{
    schoolName: z.ZodOptional<z.ZodString>;
    programName: z.ZodOptional<z.ZodString>;
    graduationYear: z.ZodOptional<z.ZodNumber>;
    bio: z.ZodOptional<z.ZodString>;
    location: z.ZodOptional<z.ZodString>;
    skills: z.ZodOptional<z.ZodArray<z.ZodString>>;
    portfolioUrl: z.ZodOptional<z.ZodURL>;
    linkedinUrl: z.ZodOptional<z.ZodURL>;
    githubUrl: z.ZodOptional<z.ZodURL>;
    availability: z.ZodOptional<z.ZodString>;
    hourlyRate: z.ZodOptional<z.ZodNumber>;
}, z.core.$strip>;
export type UpdateStudentInput = z.infer<typeof updateStudentSchema>;
//# sourceMappingURL=student.validators.d.ts.map