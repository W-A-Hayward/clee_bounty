import { z } from "zod";
import { ApplicationStatus } from "@prisma/client";
export const updateApplicationStatusSchema = z.object({
    status: z.enum(Object.values(ApplicationStatus)),
});
//# sourceMappingURL=application.validators.js.map