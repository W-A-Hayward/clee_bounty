import { z } from "zod";
const schema = z.object({
    DATABASE_URL: z.string(),
    JWT_SECRET: z.string().min(32),
    FRONTEND_URL: z.string().url(),
    NODE_ENV: z.enum(["development", "production", "test"]).default("development"),
    PORT: z.coerce.number().default(3000),
});
export const env = schema.parse(process.env);
//# sourceMappingURL=env.js.map